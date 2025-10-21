// Frontend configuration
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Speakeasy Clone',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:8081',
};
