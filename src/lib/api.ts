// API Client for connecting frontend to backend
import { config } from '../config';

const API_BASE = config.API_BASE_URL;

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('speakeasy_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('speakeasy_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('speakeasy_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE}${endpoint}`;
    const token = this.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    return response.json();
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Authentication methods
  async register(email: string, password: string, name: string) {
    const result = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    if (result.token) {
      this.setToken(result.token);
    }
    
    return result;
  }

  async login(email: string, password: string) {
    const result = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (result.token) {
      this.setToken(result.token);
    }
    
    return result;
  }

  logout() {
    this.clearToken();
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Spec management
  async uploadSpec(file: File) {
    const formData = new FormData();
    formData.append('spec', file);

    const token = this.getToken();
    const response = await fetch(`${API_BASE}/specs/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(errorData.error || 'Upload failed');
    }

    return response.json();
  }

  async getSpecs() {
    return this.request('/specs');
  }

  // SDK Generation
  async generateSdk(specId: string, language: string, packageName: string, version: string = '1.0.0') {
    return this.request('/generate/sdk', {
      method: 'POST',
      body: JSON.stringify({ specId, language, packageName, version }),
    });
  }

  // MCP Generation
  async generateMcp(specId: string, config: any) {
    return this.request('/generate/mcp', {
      method: 'POST',
      body: JSON.stringify({ specId, config }),
    });
  }

  // Project management
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(name: string, description: string, specId: string) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify({ name, description, specId }),
    });
  }

  async updateProject(id: string, updates: { name?: string; description?: string; gitUrl?: string }) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Notifications
  async getNotifications() {
    return this.request('/notifications');
  }

  async createNotification(type: string, message: string, projectId?: string) {
    return this.request('/notifications', {
      method: 'POST',
      body: JSON.stringify({ type, message, projectId }),
    });
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  // Download methods
  async downloadSdk(specId: string, language: string) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE}/download/${specId}/${language}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sdk-${language}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  async downloadMcp(specId: string) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE}/download/mcp/${specId}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mcp-server.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

export const apiClient = new ApiClient();
export default apiClient;
