import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Code2, 
  Download, 
  Copy, 
  CheckCircle, 
  Zap,
  Settings,
  Play,
  FileText,
  Package,
  Loader2,
  Upload,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { apiClient } from "../lib/api";
import { toast } from "sonner";

export const SdkGenerator = () => {
  const { isAuthenticated } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [sdkVersion, setSdkVersion] = useState("1.0.0");
  const [packageName, setPackageName] = useState("my-api-sdk");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedSpec, setUploadedSpec] = useState<any>(null);
  const [generatedFiles, setGeneratedFiles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const languages = [
    { value: "python", label: "Python", extension: "py", description: "Most popular for data science and APIs" },
    { value: "javascript", label: "JavaScript", extension: "js", description: "Web and Node.js applications" },
    { value: "typescript", label: "TypeScript", extension: "ts", description: "Type-safe JavaScript for large projects" },
    { value: "go", label: "Go", extension: "go", description: "High-performance backend services" },
    { value: "java", label: "Java", extension: "java", description: "Enterprise applications and Android" },
    { value: "csharp", label: "C#", extension: "cs", description: "Microsoft ecosystem and .NET" },
    { value: "php", label: "PHP", extension: "php", description: "Web development and WordPress" },
    { value: "ruby", label: "Ruby", extension: "rb", description: "Web applications and scripting" },
    { value: "rust", label: "Rust", extension: "rs", description: "Systems programming and performance" },
    { value: "kotlin", label: "Kotlin", extension: "kt", description: "Android and JVM applications" },
    { value: "swift", label: "Swift", extension: "swift", description: "iOS and macOS applications" },
    { value: "dart", label: "Dart", extension: "dart", description: "Flutter mobile applications" }
  ];

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isAuthenticated) {
      toast.error("Please log in to upload OpenAPI specifications");
      return;
    }

    try {
      setError(null);
      const result = await apiClient.uploadSpec(file);
      setUploadedSpec(result);
      toast.success("OpenAPI specification uploaded successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleGenerateSdk = async () => {
    if (!uploadedSpec) {
      toast.error("Please upload an OpenAPI specification first");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Please log in to generate SDKs");
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      
      const result = await apiClient.generateSdk(
        uploadedSpec.specId,
        selectedLanguage,
        packageName,
        sdkVersion
      );
      
      setGeneratedFiles(result.files);
      toast.success(`${selectedLanguage} SDK generated successfully!`);
      
      // Create notification
      await apiClient.createNotification(
        'success',
        `${selectedLanguage} SDK generated successfully!`
      );
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "SDK generation failed";
      setError(errorMessage);
      toast.error(errorMessage);
      
      // Create error notification
      await apiClient.createNotification(
        'error',
        `Failed to generate ${selectedLanguage} SDK: ${errorMessage}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadSdk = async () => {
    if (!uploadedSpec) return;

    try {
      await apiClient.downloadSdk(uploadedSpec.specId, selectedLanguage);
      toast.success("SDK downloaded successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Download failed";
      toast.error(errorMessage);
    }
  };

  const generatePythonSdk = () => {
    return `"""
${packageName} - Python SDK
Generated by writeasy
Version: ${sdkVersion}
"""

import requests
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
import json

@dataclass
class User:
    id: int
    name: str
    email: str

class WriteEasyClient:
    def __init__(self, api_key: str, base_url: str = "https://api.example.com/v1"):
        self.api_key = api_key
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        })
    
    def _make_request(self, method: str, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        url = f"{self.base_url}{endpoint}"
        response = self.session.request(method, url, json=data)
        response.raise_for_status()
        return response.json()
    
    class Users:
        def __init__(self, client: 'WriteEasyClient'):
            self.client = client
        
        def get_all(self) -> List[User]:
            """Get all users"""
            data = self.client._make_request("GET", "/users")
            return [User(**user) for user in data]
        
        def create(self, name: str, email: str) -> User:
            """Create a new user"""
            data = self.client._make_request("POST", "/users", {
                "name": name,
                "email": email
            })
            return User(**data)
        
        def get_by_id(self, user_id: int) -> User:
            """Get user by ID"""
            data = self.client._make_request("GET", f"/users/{user_id}")
            return User(**data)
    
    @property
    def users(self) -> Users:
        return self.Users(self)

# Usage example
if __name__ == "__main__":
    client = WriteEasyClient(api_key="your-api-key")
    
    # Get all users
    users = client.users.get_all()
    print(f"Found {len(users)} users")
    
    # Create a new user
    new_user = client.users.create(
        name="John Doe",
        email="john@example.com"
    )
    print(f"Created user: {new_user.name}")
    
    # Get user by ID
    user = client.users.get_by_id(1)
    print(f"User: {user.name} ({user.email})")`;
  };

  const generateJavaScriptSdk = () => {
    return `/**
 * ${packageName} - JavaScript SDK
 * Generated by writeasy
 * Version: ${sdkVersion}
 */

class WriteEasyClient {
    constructor(options = {}) {
        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl || 'https://api.example.com/v1';
        this.headers = {
            'Authorization': \`Bearer \${this.apiKey}\`,
            'Content-Type': 'application/json'
        };
    }

    async _makeRequest(method, endpoint, data = null) {
        const url = \`\${this.baseUrl}\${endpoint}\`;
        const options = {
            method,
            headers: this.headers
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        return await response.json();
    }

    get users() {
        return {
            getAll: async () => {
                const data = await this._makeRequest('GET', '/users');
                return data;
            },

            create: async (userData) => {
                const data = await this._makeRequest('POST', '/users', userData);
                return data;
            },

            getById: async (userId) => {
                const data = await this._makeRequest('GET', \`/users/\${userId}\`);
                return data;
            }
        };
    }
}

// Usage example
const client = new WriteEasyClient({
    apiKey: 'your-api-key'
});

// Get all users
client.users.getAll()
    .then(users => console.log('Users:', users))
    .catch(error => console.error('Error:', error));

// Create a new user
client.users.create({
    name: 'John Doe',
    email: 'john@example.com'
})
    .then(user => console.log('Created user:', user))
    .catch(error => console.error('Error:', error));

// Get user by ID
client.users.getById(1)
    .then(user => console.log('User:', user))
    .catch(error => console.error('Error:', error));

export default WriteEasyClient;`;
  };

  const generateTypeScriptSdk = () => {
    return `/**
 * ${packageName} - TypeScript SDK
 * Generated by writeasy
 * Version: ${sdkVersion}
 */

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
}

export interface WriteEasyClientOptions {
    apiKey: string;
    baseUrl?: string;
}

export class WriteEasyClient {
    private apiKey: string;
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(options: WriteEasyClientOptions) {
        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl || 'https://api.example.com/v1';
        this.headers = {
            'Authorization': \`Bearer \${this.apiKey}\`,
            'Content-Type': 'application/json'
        };
    }

    private async makeRequest<T>(method: string, endpoint: string, data?: any): Promise<T> {
        const url = \`\${this.baseUrl}\${endpoint}\`;
        const options: RequestInit = {
            method,
            headers: this.headers
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        return await response.json();
    }

    get users() {
        return {
            getAll: async (): Promise<User[]> => {
                return this.makeRequest<User[]>('GET', '/users');
            },

            create: async (userData: CreateUserRequest): Promise<User> => {
                return this.makeRequest<User>('POST', '/users', userData);
            },

            getById: async (userId: number): Promise<User> => {
                return this.makeRequest<User>('GET', \`/users/\${userId}\`);
            }
        };
    }
}

// Usage example
const client = new WriteEasyClient({
    apiKey: 'your-api-key'
});

// Get all users
client.users.getAll()
    .then(users => console.log('Users:', users))
    .catch(error => console.error('Error:', error));

// Create a new user
client.users.create({
    name: 'John Doe',
    email: 'john@example.com'
})
    .then(user => console.log('Created user:', user))
    .catch(error => console.error('Error:', error));

// Get user by ID
client.users.getById(1)
    .then(user => console.log('User:', user))
    .catch(error => console.error('Error:', error));`;
  };

  const generateGoSdk = () => {
    return `// ${packageName} - Go SDK
// Generated by writeasy
// Version: ${sdkVersion}

package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "time"
)

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

type CreateUserRequest struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

type WriteEasyClient struct {
    apiKey  string
    baseURL string
    client  *http.Client
}

func NewWriteEasyClient(apiKey, baseURL string) *WriteEasyClient {
    if baseURL == "" {
        baseURL = "https://api.example.com/v1"
    }
    
    return &WriteEasyClient{
        apiKey:  apiKey,
        baseURL: baseURL,
        client: &http.Client{
            Timeout: 30 * time.Second,
        },
    }
}

func (c *WriteEasyClient) makeRequest(method, endpoint string, data interface{}) ([]byte, error) {
    var body io.Reader
    
    if data != nil {
        jsonData, err := json.Marshal(data)
        if err != nil {
            return nil, err
        }
        body = bytes.NewBuffer(jsonData)
    }
    
    req, err := http.NewRequest(method, c.baseURL+endpoint, body)
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Authorization", "Bearer "+c.apiKey)
    req.Header.Set("Content-Type", "application/json")
    
    resp, err := c.client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 400 {
        return nil, fmt.Errorf("HTTP error: %d", resp.StatusCode)
    }
    
    return io.ReadAll(resp.Body)
}

func (c *WriteEasyClient) GetUsers() ([]User, error) {
    data, err := c.makeRequest("GET", "/users", nil)
    if err != nil {
        return nil, err
    }
    
    var users []User
    err = json.Unmarshal(data, &users)
    return users, err
}

func (c *WriteEasyClient) CreateUser(req CreateUserRequest) (*User, error) {
    data, err := c.makeRequest("POST", "/users", req)
    if err != nil {
        return nil, err
    }
    
    var user User
    err = json.Unmarshal(data, &user)
    return &user, err
}

func (c *WriteEasyClient) GetUserByID(id int) (*User, error) {
    endpoint := fmt.Sprintf("/users/%d", id)
    data, err := c.makeRequest("GET", endpoint, nil)
    if err != nil {
        return nil, err
    }
    
    var user User
    err = json.Unmarshal(data, &user)
    return &user, err
}

// Usage example
func main() {
    client := NewWriteEasyClient("your-api-key", "")
    
    // Get all users
    users, err := client.GetUsers()
    if err != nil {
        fmt.Printf("Error getting users: %v\\n", err)
        return
    }
    fmt.Printf("Found %d users\\n", len(users))
    
    // Create a new user
    newUser, err := client.CreateUser(CreateUserRequest{
        Name:  "John Doe",
        Email: "john@example.com",
    })
    if err != nil {
        fmt.Printf("Error creating user: %v\\n", err)
        return
    }
    fmt.Printf("Created user: %s\\n", newUser.Name)
    
    // Get user by ID
    user, err := client.GetUserByID(1)
    if err != nil {
        fmt.Printf("Error getting user: %v\\n", err)
        return
    }
    fmt.Printf("User: %s (%s)\\n", user.Name, user.Email)
}`;
  };

  const generateJavaSdk = () => {
    return `package com.writeasy.sdk;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Duration;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

/**
 * ${packageName} - Java SDK
 * Generated by writeasy
 * Version: ${sdkVersion}
 */
public class WriteEasyClient {
    private final String apiKey;
    private final String baseUrl;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public WriteEasyClient(String apiKey) {
        this(apiKey, "https://api.writeasy.com/v1");
    }

    public WriteEasyClient(String apiKey, String baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(30))
            .build();
        this.objectMapper = new ObjectMapper();
    }

    private HttpRequest.Builder createRequest(String method, String endpoint) {
        return HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + endpoint))
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .header("User-Agent", "${packageName}-java/${sdkVersion}")
            .method(method, HttpRequest.BodyPublishers.noBody());
    }

    private HttpRequest.Builder createRequestWithBody(String method, String endpoint, Object body) {
        try {
            String jsonBody = objectMapper.writeValueAsString(body);
            return HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + endpoint))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .header("User-Agent", "${packageName}-java/${sdkVersion}")
                .method(method, HttpRequest.BodyPublishers.ofString(jsonBody));
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize request body", e);
        }
    }

    public List<User> getUsers() throws IOException, InterruptedException {
        HttpRequest request = createRequest("GET", "/users").build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() >= 400) {
            throw new RuntimeException("API request failed: " + response.statusCode());
        }
        
        return objectMapper.readValue(response.body(), 
            objectMapper.getTypeFactory().constructCollectionType(List.class, User.class));
    }

    public User createUser(CreateUserRequest request) throws IOException, InterruptedException {
        HttpRequest httpRequest = createRequestWithBody("POST", "/users", request).build();
        HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() >= 400) {
            throw new RuntimeException("API request failed: " + response.statusCode());
        }
        
        return objectMapper.readValue(response.body(), User.class);
    }

    public User getUserById(int id) throws IOException, InterruptedException {
        HttpRequest request = createRequest("GET", "/users/" + id).build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() >= 400) {
            throw new RuntimeException("API request failed: " + response.statusCode());
        }
        
        return objectMapper.readValue(response.body(), User.class);
    }

    // Data models
    public static class User {
        @JsonProperty("id")
        private int id;
        
        @JsonProperty("name")
        private String name;
        
        @JsonProperty("email")
        private String email;

        // Getters and setters
        public int getId() { return id; }
        public void setId(int id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class CreateUserRequest {
        @JsonProperty("name")
        private String name;
        
        @JsonProperty("email")
        private String email;

        public CreateUserRequest(String name, String email) {
            this.name = name;
            this.email = email;
        }

        // Getters and setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
}`;
  };

  const generateRustSdk = () => {
    return `//! ${packageName} - Rust SDK
//! Generated by writeasy
//! Version: ${sdkVersion}

use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: u32,
    pub name: String,
    pub email: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateUserRequest {
    pub name: String,
    pub email: String,
}

#[derive(Debug)]
pub enum WriteEasyError {
    RequestError(reqwest::Error),
    ParseError(serde_json::Error),
    ApiError { status: u16, message: String },
}

impl std::fmt::Display for WriteEasyError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            WriteEasyError::RequestError(e) => write!(f, "Request error: {}", e),
            WriteEasyError::ParseError(e) => write!(f, "Parse error: {}", e),
            WriteEasyError::ApiError { status, message } => write!(f, "API error {}: {}", status, message),
        }
    }
}

impl std::error::Error for WriteEasyError {}

pub struct WriteEasyClient {
    client: Client,
    base_url: String,
    api_key: String,
}

impl WriteEasyClient {
    pub fn new(api_key: String) -> Self {
        Self::with_base_url(api_key, "https://api.writeasy.com/v1".to_string())
    }

    pub fn with_base_url(api_key: String, base_url: String) -> Self {
        Self {
            client: Client::new(),
            base_url,
            api_key,
        }
    }

    async fn make_request<T>(&self, method: &str, endpoint: &str, body: Option<&T>) -> Result<String, WriteEasyError>
    where
        T: Serialize,
    {
        let url = format!("{}{}", self.base_url, endpoint);
        let mut request = self.client
            .request(method.parse().unwrap(), &url)
            .header("Authorization", format!("Bearer {}", self.api_key))
            .header("Content-Type", "application/json")
            .header("User-Agent", format!("{}-rust/{}", "${packageName}", "${sdkVersion}"));

        if let Some(body) = body {
            request = request.json(body);
        }

        let response = request.send().await.map_err(WriteEasyError::RequestError)?;
        
        let status = response.status();
        let text = response.text().await.map_err(WriteEasyError::RequestError)?;
        
        if !status.is_success() {
            return Err(WriteEasyError::ApiError {
                status: status.as_u16(),
                message: text,
            });
        }

        Ok(text)
    }

    pub async fn get_users(&self) -> Result<Vec<User>, WriteEasyError> {
        let response = self.make_request("GET", "/users", None::<&()>).await?;
        let users: Vec<User> = serde_json::from_str(&response).map_err(WriteEasyError::ParseError)?;
        Ok(users)
    }

    pub async fn create_user(&self, request: CreateUserRequest) -> Result<User, WriteEasyError> {
        let response = self.make_request("POST", "/users", Some(&request)).await?;
        let user: User = serde_json::from_str(&response).map_err(WriteEasyError::ParseError)?;
        Ok(user)
    }

    pub async fn get_user_by_id(&self, id: u32) -> Result<User, WriteEasyError> {
        let endpoint = format!("/users/{}", id);
        let response = self.make_request("GET", &endpoint, None::<&()>).await?;
        let user: User = serde_json::from_str(&response).map_err(WriteEasyError::ParseError)?;
        Ok(user)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_client_creation() {
        let client = WriteEasyClient::new("test-api-key".to_string());
        assert_eq!(client.api_key, "test-api-key");
    }
}`;
  };

  const generateSwiftSdk = () => {
    return `//
//  WriteEasyClient.swift
//  ${packageName}
//
//  Generated by writeasy
//  Version: ${sdkVersion}
//

import Foundation

public struct User: Codable {
    public let id: Int
    public let name: String
    public let email: String
    
    public init(id: Int, name: String, email: String) {
        self.id = id
        self.name = name
        self.email = email
    }
}

public struct CreateUserRequest: Codable {
    public let name: String
    public let email: String
    
    public init(name: String, email: String) {
        self.name = name
        self.email = email
    }
}

public enum WriteEasyError: Error {
    case invalidURL
    case noData
    case decodingError(Error)
    case networkError(Error)
    case apiError(Int, String)
}

public class WriteEasyClient {
    private let apiKey: String
    private let baseURL: String
    private let session: URLSession
    
    public init(apiKey: String, baseURL: String = "https://api.writeasy.com/v1") {
        self.apiKey = apiKey
        self.baseURL = baseURL
        self.session = URLSession.shared
    }
    
    private func createRequest(method: String, endpoint: String, body: Data? = nil) throws -> URLRequest {
        guard let url = URL(string: baseURL + endpoint) else {
            throw WriteEasyError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("Bearer \\(apiKey)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("\\(packageName)-swift/\\(sdkVersion)", forHTTPHeaderField: "User-Agent")
        
        if let body = body {
            request.httpBody = body
        }
        
        return request
    }
    
    public func getUsers() async throws -> [User] {
        let request = try createRequest(method: "GET", endpoint: "/users")
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw WriteEasyError.noData
        }
        
        guard httpResponse.statusCode == 200 else {
            let errorMessage = String(data: data, encoding: .utf8) ?? "Unknown error"
            throw WriteEasyError.apiError(httpResponse.statusCode, errorMessage)
        }
        
        do {
            let users = try JSONDecoder().decode([User].self, from: data)
            return users
        } catch {
            throw WriteEasyError.decodingError(error)
        }
    }
    
    public func createUser(_ request: CreateUserRequest) async throws -> User {
        let body = try JSONEncoder().encode(request)
        let urlRequest = try createRequest(method: "POST", endpoint: "/users", body: body)
        
        let (data, response) = try await session.data(for: urlRequest)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw WriteEasyError.noData
        }
        
        guard httpResponse.statusCode == 201 else {
            let errorMessage = String(data: data, encoding: .utf8) ?? "Unknown error"
            throw WriteEasyError.apiError(httpResponse.statusCode, errorMessage)
        }
        
        do {
            let user = try JSONDecoder().decode(User.self, from: data)
            return user
        } catch {
            throw WriteEasyError.decodingError(error)
        }
    }
    
    public func getUserById(_ id: Int) async throws -> User {
        let request = try createRequest(method: "GET", endpoint: "/users/\\(id)")
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw WriteEasyError.noData
        }
        
        guard httpResponse.statusCode == 200 else {
            let errorMessage = String(data: data, encoding: .utf8) ?? "Unknown error"
            throw WriteEasyError.apiError(httpResponse.statusCode, errorMessage)
        }
        
        do {
            let user = try JSONDecoder().decode(User.self, from: data)
            return user
        } catch {
            throw WriteEasyError.decodingError(error)
        }
    }
}`;
  };

  const generateCSharpSdk = () => {
    return `using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace WriteEasy.Sdk
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class CreateUserRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class WriteEasyClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _baseUrl;

        public WriteEasyClient(string apiKey, string baseUrl = "https://api.writeasy.com/v1")
        {
            _apiKey = apiKey;
            _baseUrl = baseUrl;
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "${packageName}-csharp/${sdkVersion}");
        }

        public async Task<List<User>> GetUsersAsync()
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/users");
            response.EnsureSuccessStatusCode();
            
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<User>>(json);
        }

        public async Task<User> CreateUserAsync(CreateUserRequest request)
        {
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync($"{_baseUrl}/users", content);
            response.EnsureSuccessStatusCode();
            
            var responseJson = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<User>(responseJson);
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/users/{id}");
            response.EnsureSuccessStatusCode();
            
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<User>(json);
        }
    }
}`;
  };

  const generatePhpSdk = () => {
    return `<?php
/**
 * ${packageName} - PHP SDK
 * Generated by writeasy
 * Version: ${sdkVersion}
 */

class WriteEasyClient
{
    private $apiKey;
    private $baseUrl;
    private $httpClient;

    public function __construct($apiKey, $baseUrl = 'https://api.writeasy.com/v1')
    {
        $this->apiKey = $apiKey;
        $this->baseUrl = $baseUrl;
        $this->httpClient = curl_init();
    }

    public function __destruct()
    {
        curl_close($this->httpClient);
    }

    private function makeRequest($method, $endpoint, $data = null)
    {
        $url = $this->baseUrl . $endpoint;
        
        curl_setopt_array($this->httpClient, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $this->apiKey,
                'Content-Type: application/json',
                'User-Agent: ${packageName}-php/${sdkVersion}'
            ]
        ]);

        if ($data !== null) {
            curl_setopt($this->httpClient, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($this->httpClient);
        $httpCode = curl_getinfo($this->httpClient, CURLINFO_HTTP_CODE);

        if ($httpCode >= 400) {
            throw new Exception("API request failed: " . $httpCode);
        }

        return json_decode($response, true);
    }

    public function getUsers()
    {
        return $this->makeRequest('GET', '/users');
    }

    public function createUser($name, $email)
    {
        $data = [
            'name' => $name,
            'email' => $email
        ];
        return $this->makeRequest('POST', '/users', $data);
    }

    public function getUserById($id)
    {
        return $this->makeRequest('GET', '/users/' . $id);
    }
}

// Usage example
$client = new WriteEasyClient('your-api-key');

try {
    $users = $client->getUsers();
    echo "Found " . count($users) . " users\n";
    
    $newUser = $client->createUser('John Doe', 'john@example.com');
    echo "Created user: " . $newUser['name'] . "\n";
    
    $user = $client->getUserById(1);
    echo "User: " . $user['name'] . " (" . $user['email'] . ")\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}`;
  };

  const generateRubySdk = () => {
    return `# ${packageName} - Ruby SDK
# Generated by writeasy
# Version: ${sdkVersion}

require 'net/http'
require 'json'
require 'uri'

class WriteEasyClient
  def initialize(api_key, base_url = 'https://api.writeasy.com/v1')
    @api_key = api_key
    @base_url = base_url
  end

  private

  def make_request(method, endpoint, body = nil)
    uri = URI("#{@base_url}#{endpoint}")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = case method.upcase
              when 'GET'
                Net::HTTP::Get.new(uri)
              when 'POST'
                Net::HTTP::Post.new(uri)
              when 'PUT'
                Net::HTTP::Put.new(uri)
              when 'DELETE'
                Net::HTTP::Delete.new(uri)
              end

    request['Authorization'] = "Bearer #{@api_key}"
    request['Content-Type'] = 'application/json'
    request['User-Agent'] = "${packageName}-ruby/${sdkVersion}"
    
    request.body = JSON.generate(body) if body

    response = http.request(request)
    
    unless response.code.to_i < 400
      raise "API request failed: #{response.code}"
    end

    JSON.parse(response.body)
  end

  public

  def get_users
    make_request('GET', '/users')
  end

  def create_user(name, email)
    body = {
      name: name,
      email: email
    }
    make_request('POST', '/users', body)
  end

  def get_user_by_id(id)
    make_request('GET', "/users/#{id}")
  end
end

# Usage example
client = WriteEasyClient.new('your-api-key')

begin
  users = client.get_users
  puts "Found #{users.length} users"
  
  new_user = client.create_user('John Doe', 'john@example.com')
  puts "Created user: #{new_user['name']}"
  
  user = client.get_user_by_id(1)
  puts "User: #{user['name']} (#{user['email']})"
rescue => e
  puts "Error: #{e.message}"
end`;
  };

  const generateKotlinSdk = () => {
    return `package com.writeasy.sdk

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import java.net.HttpURLConnection
import java.net.URL

@Serializable
data class User(
    val id: Int,
    val name: String,
    val email: String
)

@Serializable
data class CreateUserRequest(
    val name: String,
    val email: String
)

class WriteEasyClient(
    private val apiKey: String,
    private val baseUrl: String = "https://api.writeasy.com/v1"
) {
    private val json = Json { ignoreUnknownKeys = true }

    private suspend fun makeRequest(
        method: String,
        endpoint: String,
        body: String? = null
    ): String = withContext(Dispatchers.IO) {
        val url = URL("$baseUrl$endpoint")
        val connection = url.openConnection() as HttpURLConnection
        
        connection.requestMethod = method
        connection.setRequestProperty("Authorization", "Bearer $apiKey")
        connection.setRequestProperty("Content-Type", "application/json")
        connection.setRequestProperty("User-Agent", "${packageName}-kotlin/${sdkVersion}")
        
        if (body != null) {
            connection.doOutput = true
            connection.outputStream.use { it.write(body.toByteArray()) }
        }

        val responseCode = connection.responseCode
        if (responseCode >= 400) {
            throw Exception("API request failed: $responseCode")
        }

        connection.inputStream.bufferedReader().use { it.readText() }
    }

    suspend fun getUsers(): List<User> {
        val response = makeRequest("GET", "/users")
        return json.decodeFromString(response)
    }

    suspend fun createUser(request: CreateUserRequest): User {
        val body = json.encodeToString(request)
        val response = makeRequest("POST", "/users", body)
        return json.decodeFromString(response)
    }

    suspend fun getUserById(id: Int): User {
        val response = makeRequest("GET", "/users/$id")
        return json.decodeFromString(response)
    }
}`;
  };

  const generateDartSdk = () => {
    return `// ${packageName} - Dart SDK
// Generated by writeasy
// Version: ${sdkVersion}

import 'dart:convert';
import 'dart:io';

class User {
  final int id;
  final String name;
  final String email;

  User({required this.id, required this.name, required this.email});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
    };
  }
}

class CreateUserRequest {
  final String name;
  final String email;

  CreateUserRequest({required this.name, required this.email});

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'email': email,
    };
  }
}

class WriteEasyClient {
  final String apiKey;
  final String baseUrl;
  final HttpClient _httpClient;

  WriteEasyClient(this.apiKey, {String? baseUrl})
      : baseUrl = baseUrl ?? 'https://api.writeasy.com/v1',
        _httpClient = HttpClient();

  Future<HttpClientRequest> _createRequest(String method, String endpoint) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final request = await _httpClient.openUrl(method, uri);
    
    request.headers.set('Authorization', 'Bearer $apiKey');
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('User-Agent', '${packageName}-dart/${sdkVersion}');
    
    return request;
  }

  Future<List<User>> getUsers() async {
    final request = await _createRequest('GET', '/users');
    final response = await request.close();
    
    if (response.statusCode >= 400) {
      throw Exception('API request failed: \${response.statusCode}');
    }
    
    final responseBody = await response.transform(utf8.decoder).join();
    final List<dynamic> jsonList = json.decode(responseBody);
    return jsonList.map((json) => User.fromJson(json)).toList();
  }

  Future<User> createUser(CreateUserRequest request) async {
    final httpRequest = await _createRequest('POST', '/users');
    httpRequest.write(json.encode(request.toJson()));
    final response = await httpRequest.close();
    
    if (response.statusCode >= 400) {
      throw Exception('API request failed: \${response.statusCode}');
    }
    
    final responseBody = await response.transform(utf8.decoder).join();
    return User.fromJson(json.decode(responseBody));
  }

  Future<User> getUserById(int id) async {
    final request = await _createRequest('GET', '/users/$id');
    final response = await request.close();
    
    if (response.statusCode >= 400) {
      throw Exception('API request failed: \${response.statusCode}');
    }
    
    final responseBody = await response.transform(utf8.decoder).join();
    return User.fromJson(json.decode(responseBody));
  }

  void close() {
    _httpClient.close();
  }
}`;
  };

  const getGeneratedCode = () => {
    switch (selectedLanguage) {
      case "python":
        return generatePythonSdk();
      case "javascript":
        return generateJavaScriptSdk();
      case "typescript":
        return generateTypeScriptSdk();
      case "go":
        return generateGoSdk();
      case "java":
        return generateJavaSdk();
      case "rust":
        return generateRustSdk();
      case "swift":
        return generateSwiftSdk();
      case "csharp":
        return generateCSharpSdk();
      case "php":
        return generatePhpSdk();
      case "ruby":
        return generateRubySdk();
      case "kotlin":
        return generateKotlinSdk();
      case "dart":
        return generateDartSdk();
      default:
        return generatePythonSdk();
    }
  };

  const downloadSdk = () => {
    const code = getGeneratedCode();
    const language = languages.find(l => l.value === selectedLanguage);
    const filename = `${packageName}.${language?.extension || 'txt'}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPackage = () => {
    const language = languages.find(l => l.value === selectedLanguage);
    const code = getGeneratedCode();
    
    // Create package files based on language
    const packageFiles = generatePackageFiles(language, code);
    
    // Download main file
    downloadSdk();
    
    // Download additional files
    setTimeout(() => {
      packageFiles.forEach((file, index) => {
        setTimeout(() => {
          const blob = new Blob([file.content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, index * 200);
      });
    }, 500);
  };

  const generatePackageFiles = (language: any, code: string) => {
    const files = [];
    
    switch (language.value) {
      case 'python':
        files.push(
          { name: 'requirements.txt', content: generatePythonRequirements() },
          { name: 'setup.py', content: generatePythonSetup() },
          { name: 'README.md', content: generatePythonReadme() },
          { name: 'example.py', content: generatePythonExample() }
        );
        break;
      case 'javascript':
      case 'typescript':
        files.push(
          { name: 'package.json', content: generateNodePackageJson() },
          { name: 'README.md', content: generateNodeReadme() },
          { name: 'example.js', content: generateNodeExample() }
        );
        break;
      case 'go':
        files.push(
          { name: 'go.mod', content: generateGoMod() },
          { name: 'README.md', content: generateGoReadme() },
          { name: 'example.go', content: generateGoExample() }
        );
        break;
      case 'java':
        files.push(
          { name: 'pom.xml', content: generateMavenPom() },
          { name: 'README.md', content: generateJavaReadme() },
          { name: 'Example.java', content: generateJavaExample() }
        );
        break;
      case 'csharp':
        files.push(
          { name: 'WriteasyClient.csproj', content: generateCSharpProject() },
          { name: 'README.md', content: generateCSharpReadme() },
          { name: 'Example.cs', content: generateCSharpExample() }
        );
        break;
      case 'php':
        files.push(
          { name: 'composer.json', content: generateComposerJson() },
          { name: 'README.md', content: generatePhpReadme() },
          { name: 'example.php', content: generatePhpExample() }
        );
        break;
      case 'ruby':
        files.push(
          { name: 'Gemfile', content: generateRubyGemfile() },
          { name: 'writeasy_client.gemspec', content: generateRubyGemspec() },
          { name: 'README.md', content: generateRubyReadme() },
          { name: 'example.rb', content: generateRubyExample() }
        );
        break;
      case 'rust':
        files.push(
          { name: 'Cargo.toml', content: generateRustCargo() },
          { name: 'README.md', content: generateRustReadme() },
          { name: 'examples/basic.rs', content: generateRustExample() }
        );
        break;
      case 'kotlin':
        files.push(
          { name: 'build.gradle.kts', content: generateKotlinGradle() },
          { name: 'README.md', content: generateKotlinReadme() },
          { name: 'Example.kt', content: generateKotlinExample() }
        );
        break;
      case 'swift':
        files.push(
          { name: 'Package.swift', content: generateSwiftPackage() },
          { name: 'README.md', content: generateSwiftReadme() },
          { name: 'Example.swift', content: generateSwiftExample() }
        );
        break;
      case 'dart':
        files.push(
          { name: 'pubspec.yaml', content: generateDartPubspec() },
          { name: 'README.md', content: generateDartReadme() },
          { name: 'example.dart', content: generateDartExample() }
        );
        break;
    }
    
    return files;
  };

  const generatePythonRequirements = () => {
    return `requests>=2.31.0
typing-extensions>=4.7.0
pydantic>=2.0.0
`;
  };

  const generatePythonSetup = () => {
    return `from setuptools import setup, find_packages

setup(
    name="${packageName}",
    version="${sdkVersion}",
    description="API client generated by writeasy",
    author="writeasy",
    author_email="support@writeasy.com",
    packages=find_packages(),
    install_requires=[
        "requests>=2.31.0",
        "typing-extensions>=4.7.0",
        "pydantic>=2.0.0",
    ],
    python_requires=">=3.8",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
)
`;
  };

  const generatePythonReadme = () => {
    return `# ${packageName}

A Python SDK for the API, generated by writeasy.

## Installation

\`\`\`bash
pip install -r requirements.txt
\`\`\`

Or install from source:

\`\`\`bash
python setup.py install
\`\`\`

## Usage

\`\`\`python
from ${packageName} import WriteasyClient

# Initialize the client
client = WriteasyClient(api_key="YOUR_API_KEY")

# Get all users
users = client.get_users()
print(f"Found {len(users)} users")

# Create a new user
new_user = client.create_user(name="John Doe", email="john@example.com")
print(f"Created user: {new_user}")

# Get user by ID
user = client.get_user_by_id(user_id=1)
print(f"User details: {user}")
\`\`\`

## Configuration

The client can be configured with custom settings:

\`\`\`python
client = WriteasyClient(
    api_key="YOUR_API_KEY",
    base_url="https://api.example.com/v1",  # Optional custom base URL
    timeout=30  # Optional timeout in seconds
)
\`\`\`

## Error Handling

The SDK includes comprehensive error handling:

\`\`\`python
try:
    users = client.get_users()
except Exception as e:
    print(f"Error: {e}")
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generatePythonExample = () => {
    return `#!/usr/bin/env python3
"""
Example usage of the ${packageName} SDK
"""

from ${packageName} import WriteasyClient
import os

def main():
    # Get API key from environment variable
    api_key = os.getenv('WRITEASY_API_KEY')
    if not api_key:
        print("Please set WRITEASY_API_KEY environment variable")
        return
    
    # Initialize client
    client = WriteasyClient(api_key=api_key)
    
    try:
        # Get all users
        print("Fetching all users...")
        users = client.get_users()
        print(f"Found {len(users)} users: {users}")
        
        # Create a new user
        print("\\nCreating a new user...")
        new_user = client.create_user(
            name="Alice Smith",
            email="alice@example.com"
        )
        print(f"Created user: {new_user}")
        
        # Get user by ID
        print("\\nFetching user by ID...")
        user = client.get_user_by_id(user_id=1)
        print(f"User details: {user}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
`;
  };

  const generateNodePackageJson = () => {
    return JSON.stringify({
      name: packageName,
      version: sdkVersion,
      description: "API client generated by writeasy",
      main: "index.js",
      scripts: {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "jest"
      },
      dependencies: {
        "axios": "^1.6.0",
        "dotenv": "^16.3.0"
      },
      devDependencies: {
        "nodemon": "^3.0.0",
        "jest": "^29.7.0",
        "@types/node": "^20.0.0"
      },
      keywords: ["api", "client", "sdk", "writeasy"],
      author: "writeasy",
      license: "MIT",
      repository: {
        type: "git",
        url: "https://github.com/writeasy/sdk-examples"
      }
    }, null, 2);
  };

  const generateNodeReadme = () => {
    return `# ${packageName}

A JavaScript/TypeScript SDK for the API, generated by writeasy.

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`javascript
const WriteasyClient = require('./index.js');

// Initialize the client
const client = new WriteasyClient('YOUR_API_KEY');

// Get all users
client.getUsers()
  .then(users => {
    console.log(\`Found \${users.length} users\`, users);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Create a new user
client.createUser('John Doe', 'john@example.com')
  .then(newUser => {
    console.log('Created user:', newUser);
  })
  .catch(error => {
    console.error('Error:', error);
  });
\`\`\`

## TypeScript Usage

\`\`\`typescript
import { WriteasyClient } from './index';

const client = new WriteasyClient('YOUR_API_KEY');

async function main() {
  try {
    const users = await client.getUsers();
    console.log(\`Found \${users.length} users\`, users);
    
    const newUser = await client.createUser('John Doe', 'john@example.com');
    console.log('Created user:', newUser);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
\`\`\`

## Configuration

\`\`\`javascript
const client = new WriteasyClient('YOUR_API_KEY', {
  baseUrl: 'https://api.example.com/v1',  // Optional custom base URL
  timeout: 30000  // Optional timeout in milliseconds
});
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generateNodeExample = () => {
    return `const WriteasyClient = require('./index.js');
require('dotenv').config();

async function main() {
  const apiKey = process.env.WRITEASY_API_KEY;
  if (!apiKey) {
    console.log('Please set WRITEASY_API_KEY environment variable');
    return;
  }
  
  const client = new WriteasyClient(apiKey);
  
  try {
    // Get all users
    console.log('Fetching all users...');
    const users = await client.getUsers();
    console.log(\`Found \${users.length} users:\`, users);
    
    // Create a new user
    console.log('\\nCreating a new user...');
    const newUser = await client.createUser('Alice Smith', 'alice@example.com');
    console.log('Created user:', newUser);
    
    // Get user by ID
    console.log('\\nFetching user by ID...');
    const user = await client.getUserById(1);
    console.log('User details:', user);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
`;
  };

  const generateGoMod = () => {
    return `module ${packageName}

go 1.21

require (
    github.com/stretchr/testify v1.8.4
)

require (
    github.com/davecgh/go-spew v1.1.1 // indirect
    github.com/pmezard/go-difflib v1.0.0 // indirect
    gopkg.in/yaml.v3 v3.0.1 // indirect
)
`;
  };

  const generateGoReadme = () => {
    return `# ${packageName}

A Go SDK for the API, generated by writeasy.

## Installation

\`\`\`bash
go mod tidy
go build
\`\`\`

## Usage

\`\`\`go
package main

import (
    "fmt"
    "log"
    "${packageName}"
)

func main() {
    client := writeasy.NewWriteasyClient("YOUR_API_KEY", "")
    
    // Get all users
    users, err := client.GetUsers()
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Found %d users: %+v\\n", len(users), users)
    
    // Create a new user
    req := writeasy.CreateUserRequest{
        Name:  "John Doe",
        Email: "john@example.com",
    }
    newUser, err := client.CreateUser(req)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Created user: %+v\\n", newUser)
    
    // Get user by ID
    user, err := client.GetUserByID(1)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("User details: %+v\\n", user)
}
\`\`\`

## Configuration

\`\`\go
client := writeasy.NewWriteasyClient("YOUR_API_KEY", "https://api.example.com/v1")
\`\`\`

## Error Handling

\`\`\go
users, err := client.GetUsers()
if err != nil {
    log.Printf("Error getting users: %v", err)
    return
}
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generateGoExample = () => {
    return `package main

import (
    "fmt"
    "log"
    "os"
    "${packageName}"
)

func main() {
    apiKey := os.Getenv("WRITEASY_API_KEY")
    if apiKey == "" {
        fmt.Println("Please set WRITEASY_API_KEY environment variable")
        return
    }
    
    client := writeasy.NewWriteasyClient(apiKey, "")
    
    // Get all users
    fmt.Println("Fetching all users...")
    users, err := client.GetUsers()
    if err != nil {
        log.Printf("Error getting users: %v", err)
        return
    }
    fmt.Printf("Found %d users: %+v\\n", len(users), users)
    
    // Create a new user
    fmt.Println("\\nCreating a new user...")
    req := writeasy.CreateUserRequest{
        Name:  "Alice Smith",
        Email: "alice@example.com",
    }
    newUser, err := client.CreateUser(req)
    if err != nil {
        log.Printf("Error creating user: %v", err)
        return
    }
    fmt.Printf("Created user: %+v\\n", newUser)
    
    // Get user by ID
    fmt.Println("\\nFetching user by ID...")
    user, err := client.GetUserByID(1)
    if err != nil {
        log.Printf("Error getting user by ID: %v", err)
        return
    }
    fmt.Printf("User details: %+v\\n", user)
}
`;
  };

  const generateMavenPom = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.writeasy</groupId>
    <artifactId>${packageName}</artifactId>
    <version>${sdkVersion}</version>
    <packaging>jar</packaging>
    
    <name>${packageName}</name>
    <description>API client generated by writeasy</description>
    
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.15.2</version>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.9.3</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
`;
  };

  const generateJavaReadme = () => {
    return `# ${packageName}

A Java SDK for the API, generated by writeasy.

## Installation

### Maven

Add to your \`pom.xml\`:

\`\`\`xml
<dependency>
    <groupId>com.writeasy</groupId>
    <artifactId>${packageName}</artifactId>
    <version>${sdkVersion}</version>
</dependency>
\`\`\`

### Gradle

Add to your \`build.gradle\`:

\`\`\`gradle
implementation 'com.writeasy:${packageName}:${sdkVersion}'
\`\`\`

## Usage

\`\`\`java
import com.writeasy.sdk.WriteasyClient;

public class Example {
    public static void main(String[] args) {
        WriteasyClient client = new WriteasyClient("YOUR_API_KEY");
        
        try {
            // Get all users
            List<User> users = client.getUsers();
            System.out.println("Found " + users.size() + " users: " + users);
            
            // Create a new user
            CreateUserRequest request = new CreateUserRequest("John Doe", "john@example.com");
            User newUser = client.createUser(request);
            System.out.println("Created user: " + newUser.getName());
            
            // Get user by ID
            User user = client.getUserById(1);
            System.out.println("User details: " + user.getName() + " (" + user.getEmail() + ")");
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

## Configuration

\`\`\`java
WriteasyClient client = new WriteasyClient("YOUR_API_KEY", "https://api.example.com/v1");
\`\`\`

## Error Handling

\`\`\`java
try {
    List<User> users = client.getUsers();
} catch (IOException | InterruptedException e) {
    System.err.println("Error: " + e.getMessage());
}
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generateJavaExample = () => {
    return `package com.writeasy.example;

import com.writeasy.sdk.WriteasyClient;
import com.writeasy.sdk.WriteasyClient.User;
import com.writeasy.sdk.WriteasyClient.CreateUserRequest;
import java.util.List;

public class Example {
    public static void main(String[] args) {
        String apiKey = System.getenv("WRITEASY_API_KEY");
        if (apiKey == null) {
            System.out.println("Please set WRITEASY_API_KEY environment variable");
            return;
        }
        
        WriteasyClient client = new WriteasyClient(apiKey);
        
        try {
            // Get all users
            System.out.println("Fetching all users...");
            List<User> users = client.getUsers();
            System.out.println("Found " + users.size() + " users: " + users);
            
            // Create a new user
            System.out.println("\\nCreating a new user...");
            CreateUserRequest request = new CreateUserRequest("Alice Smith", "alice@example.com");
            User newUser = client.createUser(request);
            System.out.println("Created user: " + newUser.getName());
            
            // Get user by ID
            System.out.println("\\nFetching user by ID...");
            User user = client.getUserById(1);
            System.out.println("User details: " + user.getName() + " (" + user.getEmail() + ")");
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
`;
  };

  const generateCSharpProject = () => {
    return `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <PackageId>${packageName}</PackageId>
    <Version>${sdkVersion}</Version>
    <Authors>writeasy</Authors>
    <Description>API client generated by writeasy</Description>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
    <PackageProjectUrl>https://github.com/writeasy/sdk-examples</PackageProjectUrl>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
    <PackageReference Include="System.Net.Http" Version="4.3.4" />
  </ItemGroup>

</Project>
`;
  };

  const generateCSharpReadme = () => {
    return `# ${packageName}

A C# SDK for the API, generated by writeasy.

## Installation

### NuGet Package Manager

\`\`\`bash
Install-Package ${packageName}
\`\`\`

### .NET CLI

\`\`\`bash
dotnet add package ${packageName}
\`\`\`

## Usage

\`\`\`csharp
using Writeasy.Sdk;

class Program
{
    static async Task Main(string[] args)
    {
        var client = new WriteasyClient("YOUR_API_KEY");
        
        try
        {
            // Get all users
            var users = await client.GetUsersAsync();
            Console.WriteLine($"Found {users.Count} users: {string.Join(", ", users)}");
            
            // Create a new user
            var request = new CreateUserRequest("John Doe", "john@example.com");
            var newUser = await client.CreateUserAsync(request);
            Console.WriteLine($"Created user: {newUser.Name}");
            
            // Get user by ID
            var user = await client.GetUserByIdAsync(1);
            Console.WriteLine($"User details: {user.Name} ({user.Email})");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");
        }
    }
}
\`\`\`

## Configuration

\`\`\`csharp
var client = new WriteasyClient("YOUR_API_KEY", "https://api.example.com/v1");
\`\`\`

## Error Handling

\`\`\`csharp
try
{
    var users = await client.GetUsersAsync();
}
catch (HttpRequestException e)
{
    Console.WriteLine($"HTTP Error: {e.Message}");
}
catch (Exception e)
{
    Console.WriteLine($"Error: {e.Message}");
}
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generateCSharpExample = () => {
    return `using System;
using System.Threading.Tasks;
using Writeasy.Sdk;

class Program
{
    static async Task Main(string[] args)
    {
        string apiKey = Environment.GetEnvironmentVariable("WRITEASY_API_KEY");
        if (string.IsNullOrEmpty(apiKey))
        {
            Console.WriteLine("Please set WRITEASY_API_KEY environment variable");
            return;
        }
        
        var client = new WriteasyClient(apiKey);
        
        try
        {
            // Get all users
            Console.WriteLine("Fetching all users...");
            var users = await client.GetUsersAsync();
            Console.WriteLine($"Found {users.Count} users: {string.Join(", ", users)}");
            
            // Create a new user
            Console.WriteLine("\\nCreating a new user...");
            var request = new CreateUserRequest("Alice Smith", "alice@example.com");
            var newUser = await client.CreateUserAsync(request);
            Console.WriteLine($"Created user: {newUser.Name}");
            
            // Get user by ID
            Console.WriteLine("\\nFetching user by ID...");
            var user = await client.GetUserByIdAsync(1);
            Console.WriteLine($"User details: {user.Name} ({user.Email})");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");
        }
    }
}
`;
  };

  const generateComposerJson = () => {
    return JSON.stringify({
      name: `writeasy/${packageName}`,
      description: "API client generated by writeasy",
      type: "library",
      license: "MIT",
      authors: [
        {
          name: "writeasy",
          email: "support@writeasy.com"
        }
      ],
      require: {
        "php": ">=7.4",
        "guzzlehttp/guzzle": "^7.0"
      },
      "require-dev": {
        "phpunit/phpunit": "^9.0"
      },
      autoload: {
        "psr-4": {
          "Writeasy\\\\": "src/"
        }
      },
      "autoload-dev": {
        "psr-4": {
          "Writeasy\\\\Tests\\\\": "tests/"
        }
      },
      "minimum-stability": "stable",
      "prefer-stable": true
    }, null, 2);
  };

  const generatePhpReadme = () => {
    return `# ${packageName}

A PHP SDK for the API, generated by writeasy.

## Installation

### Composer

\`\`\`bash
composer require writeasy/${packageName}
\`\`\`

## Usage

\`\`\`php
<?php
require_once 'vendor/autoload.php';

use Writeasy\\WriteasyClient;

$client = new WriteasyClient('YOUR_API_KEY');

try {
    // Get all users
    $users = $client->getUsers();
    echo "Found " . count($users) . " users: " . json_encode($users) . "\\n";
    
    // Create a new user
    $request = ['name' => 'John Doe', 'email' => 'john@example.com'];
    $newUser = $client->createUser($request);
    echo "Created user: " . json_encode($newUser) . "\\n";
    
    // Get user by ID
    $user = $client->getUserById(1);
    echo "User details: " . json_encode($user) . "\\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}
?>
\`\`\`

## Configuration

\`\`\`php
$client = new WriteasyClient('YOUR_API_KEY', 'https://api.example.com/v1');
\`\`\`

## Error Handling

\`\`\`php
try {
    $users = $client->getUsers();
} catch (GuzzleHttp\\Exception\\RequestException $e) {
    echo "HTTP Error: " . $e->getMessage() . "\\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generatePhpExample = () => {
    return `<?php
require_once 'vendor/autoload.php';

use Writeasy\\WriteasyClient;

$apiKey = getenv('WRITEASY_API_KEY');
if (!$apiKey) {
    echo "Please set WRITEASY_API_KEY environment variable\\n";
    exit(1);
}

$client = new WriteasyClient($apiKey);

try {
    // Get all users
    echo "Fetching all users...\\n";
    $users = $client->getUsers();
    echo "Found " . count($users) . " users: " . json_encode($users) . "\\n";
    
    // Create a new user
    echo "\\nCreating a new user...\\n";
    $request = ['name' => 'Alice Smith', 'email' => 'alice@example.com'];
    $newUser = $client->createUser($request);
    echo "Created user: " . json_encode($newUser) . "\\n";
    
    // Get user by ID
    echo "\\nFetching user by ID...\\n";
    $user = $client->getUserById(1);
    echo "User details: " . json_encode($user) . "\\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}
?>
`;
  };

  const generateRubyGemfile = () => {
    return `source 'https://rubygems.org'

gem 'faraday', '~> 2.0'
gem 'json', '~> 2.6'

group :development, :test do
  gem 'rspec', '~> 3.12'
  gem 'webmock', '~> 3.18'
end
`;
  };

  const generateRubyGemspec = () => {
    return `Gem::Specification.new do |spec|
  spec.name          = "${packageName}"
  spec.version       = "${sdkVersion}"
  spec.authors       = ["writeasy"]
  spec.email         = ["support@writeasy.com"]

  spec.summary       = "API client generated by writeasy"
  spec.description   = "A Ruby SDK for the API"
  spec.homepage      = "https://github.com/writeasy/sdk-examples"
  spec.license       = "MIT"

  spec.files         = Dir.glob("lib/**/*") + %w[README.md LICENSE]
  spec.require_paths = ["lib"]

  spec.add_dependency "faraday", "~> 2.0"
  spec.add_dependency "json", "~> 2.6"

  spec.add_development_dependency "rspec", "~> 3.12"
  spec.add_development_dependency "webmock", "~> 3.18"

  spec.required_ruby_version = ">= 2.7"
end
`;
  };

  const generateRubyReadme = () => {
    return `# ${packageName}

A Ruby SDK for the API, generated by writeasy.

## Installation

Add this line to your application's Gemfile:

\`\`\`ruby
gem '${packageName}'
\`\`\`

And then execute:

\`\`\`bash
bundle install
\`\`\`

Or install it yourself as:

\`\`\`bash
gem install ${packageName}
\`\`\`

## Usage

\`\`\`ruby
require '${packageName}'

client = WriteasyClient.new('YOUR_API_KEY')

begin
  # Get all users
  users = client.get_users
  puts "Found #{users.length} users: #{users}"
  
  # Create a new user
  request = { name: 'John Doe', email: 'john@example.com' }
  new_user = client.create_user(request)
  puts "Created user: #{new_user}"
  
  # Get user by ID
  user = client.get_user_by_id(1)
  puts "User details: #{user}"
  
rescue => e
  puts "Error: #{e.message}"
end
\`\`\`

## Configuration

\`\`\`ruby
client = WriteasyClient.new('YOUR_API_KEY', base_url: 'https://api.example.com/v1')
\`\`\`

## Error Handling

\`\`\`ruby
begin
  users = client.get_users
rescue Faraday::Error => e
  puts "HTTP Error: #{e.message}"
rescue => e
  puts "Error: #{e.message}"
end
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generateRubyExample = () => {
    return `#!/usr/bin/env ruby
require '${packageName}'

api_key = ENV['WRITEASY_API_KEY']
if api_key.nil?
  puts "Please set WRITEASY_API_KEY environment variable"
  exit 1
end

client = WriteasyClient.new(api_key)

begin
  # Get all users
  puts "Fetching all users..."
  users = client.get_users
  puts "Found #{users.length} users: #{users}"
  
  # Create a new user
  puts "\\nCreating a new user..."
  request = { name: 'Alice Smith', email: 'alice@example.com' }
  new_user = client.create_user(request)
  puts "Created user: #{new_user}"
  
  # Get user by ID
  puts "\\nFetching user by ID..."
  user = client.get_user_by_id(1)
  puts "User details: #{user}"
  
rescue => e
  puts "Error: #{e.message}"
end
`;
  };

  const generateRustCargo = () => {
    return `[package]
name = "${packageName}"
version = "${sdkVersion}"
edition = "2021"
authors = ["writeasy <support@writeasy.com>"]
description = "API client generated by writeasy"
license = "MIT"
repository = "https://github.com/writeasy/sdk-examples"

[dependencies]
reqwest = { version = "0.11", features = ["json"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1.0", features = ["full"] }

[dev-dependencies]
tokio-test = "0.4"
`;
  };

  const generateRustReadme = () => {
    return `# ${packageName}

A Rust SDK for the API, generated by writeasy.

## Installation

Add this to your \`Cargo.toml\`:

\`\`\`toml
[dependencies]
${packageName} = "${sdkVersion}"
\`\`\`

## Usage

\`\`\`rust
use ${packageName}::WriteasyClient;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = WriteasyClient::new("YOUR_API_KEY");
    
    // Get all users
    let users = client.get_users().await?;
    println!("Found {} users: {:?}", users.len(), users);
    
    // Create a new user
    let request = CreateUserRequest {
        name: "John Doe".to_string(),
        email: "john@example.com".to_string(),
    };
    let new_user = client.create_user(request).await?;
    println!("Created user: {:?}", new_user);
    
    // Get user by ID
    let user = client.get_user_by_id(1).await?;
    println!("User details: {:?}", user);
    
    Ok(())
}
\`\`\`

## Configuration

\`\`\`rust
let client = WriteasyClient::new("YOUR_API_KEY")
    .with_base_url("https://api.example.com/v1");
\`\`\`

## Error Handling

\`\`\`rust
match client.get_users().await {
    Ok(users) => println!("Users: {:?}", users),
    Err(e) => eprintln!("Error: {}", e),
}
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generateRustExample = () => {
    return `use ${packageName}::WriteasyClient;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let api_key = env::var("WRITEASY_API_KEY")
        .expect("Please set WRITEASY_API_KEY environment variable");
    
    let client = WriteasyClient::new(&api_key);
    
    // Get all users
    println!("Fetching all users...");
    let users = client.get_users().await?;
    println!("Found {} users: {:?}", users.len(), users);
    
    // Create a new user
    println!("\\nCreating a new user...");
    let request = CreateUserRequest {
        name: "Alice Smith".to_string(),
        email: "alice@example.com".to_string(),
    };
    let new_user = client.create_user(request).await?;
    println!("Created user: {:?}", new_user);
    
    // Get user by ID
    println!("\\nFetching user by ID...");
    let user = client.get_user_by_id(1).await?;
    println!("User details: {:?}", user);
    
    Ok(())
}
`;
  };

  const generateKotlinGradle = () => {
    return `plugins {
    kotlin("jvm") version "1.9.0"
    application
}

group = "com.writeasy"
version = "${sdkVersion}"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.squareup.moshi:moshi:1.15.0")
    implementation("com.squareup.moshi:moshi-kotlin:1.15.0")
    
    testImplementation("org.jetbrains.kotlin:kotlin-test")
    testImplementation("org.junit.jupiter:junit-jupiter:5.9.3")
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(11)
}

application {
    mainClass.set("MainKt")
}
`;
  };

  const generateKotlinReadme = () => {
    return `# ${packageName}

A Kotlin SDK for the API, generated by writeasy.

## Installation

### Gradle

Add to your \`build.gradle.kts\`:

\`\`\`kotlin
dependencies {
    implementation("com.writeasy:${packageName}:${sdkVersion}")
}
\`\`\`

### Maven

Add to your \`pom.xml\`:

\`\`\`xml
<dependency>
    <groupId>com.writeasy</groupId>
    <artifactId>${packageName}</artifactId>
    <version>${sdkVersion}</version>
</dependency>
\`\`\`

## Usage

\`\`\`kotlin
import com.writeasy.WriteasyClient

suspend fun main() {
    val client = WriteasyClient("YOUR_API_KEY")
    
    try {
        // Get all users
        val users = client.getUsers()
        println("Found ${users.size} users: $users")
        
        // Create a new user
        val request = CreateUserRequest("John Doe", "john@example.com")
        val newUser = client.createUser(request)
        println("Created user: ${newUser.name}")
        
        // Get user by ID
        val user = client.getUserById(1)
        println("User details: ${user.name} (${user.email})")
        
    } catch (e: Exception) {
        println("Error: ${e.message}")
    }
}
\`\`\`

## Configuration

\`\`\`kotlin
val client = WriteasyClient("YOUR_API_KEY", "https://api.example.com/v1")
\`\`\`

## Error Handling

\`\`\`kotlin
try {
    val users = client.getUsers()
} catch (e: IOException) {
    println("Network error: ${e.message}")
} catch (e: Exception) {
    println("Error: ${e.message}")
}
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generateKotlinExample = () => {
    return `import com.writeasy.WriteasyClient

suspend fun main() {
    val apiKey = System.getenv("WRITEASY_API_KEY")
        ?: run {
            println("Please set WRITEASY_API_KEY environment variable")
            return
        }
    
    val client = WriteasyClient(apiKey)
    
    try {
        // Get all users
        println("Fetching all users...")
        val users = client.getUsers()
        println("Found ${users.size} users: $users")
        
        // Create a new user
        println("\\nCreating a new user...")
        val request = CreateUserRequest("Alice Smith", "alice@example.com")
        val newUser = client.createUser(request)
        println("Created user: ${newUser.name}")
        
        // Get user by ID
        println("\\nFetching user by ID...")
        val user = client.getUserById(1)
        println("User details: ${user.name} (${user.email})")
        
    } catch (e: Exception) {
        println("Error: ${e.message}")
    }
}
`;
  };

  const generateSwiftPackage = () => {
    return `// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "${packageName}",
    platforms: [
        .macOS(.v10_15),
        .iOS(.v13),
        .watchOS(.v6),
        .tvOS(.v13)
    ],
    products: [
        .library(
            name: "${packageName}",
            targets: ["${packageName}"]
        ),
    ],
    dependencies: [
        .package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.8.0"),
    ],
    targets: [
        .target(
            name: "${packageName}",
            dependencies: ["Alamofire"]
        ),
        .testTarget(
            name: "${packageName}Tests",
            dependencies: ["${packageName}"]
        ),
    ]
)
`;
  };

  const generateSwiftReadme = () => {
    return `# ${packageName}

A Swift SDK for the API, generated by writeasy.

## Installation

### Swift Package Manager

Add this to your \`Package.swift\`:

\`\`\`swift
dependencies: [
    .package(url: "https://github.com/writeasy/sdk-examples.git", from: "${sdkVersion}")
]
\`\`\`

### CocoaPods

Add this to your \`Podfile\`:

\`\`\`ruby
pod '${packageName}', '~> ${sdkVersion}'
\`\`\`

## Usage

\`\`\`swift
import ${packageName}

let client = WriteasyClient(apiKey: "YOUR_API_KEY")

// Get all users
client.getUsers { result in
    switch result {
    case .success(let users):
        print("Found \\(users.count) users: \\(users)")
    case .failure(let error):
        print("Error: \\(error)")
    }
}

// Create a new user
let request = CreateUserRequest(name: "John Doe", email: "john@example.com")
client.createUser(request) { result in
    switch result {
    case .success(let newUser):
        print("Created user: \\(newUser.name)")
    case .failure(let error):
        print("Error: \\(error)")
    }
}

// Get user by ID
client.getUserById(id: 1) { result in
    switch result {
    case .success(let user):
        print("User details: \\(user.name) (\\(user.email))")
    case .failure(let error):
        print("Error: \\(error)")
    }
}
\`\`\`

## Configuration

\`\`\`swift
let client = WriteasyClient(
    apiKey: "YOUR_API_KEY",
    baseURL: "https://api.example.com/v1"
)
\`\`\`

## Error Handling

\`\`\`swift
client.getUsers { result in
    switch result {
    case .success(let users):
        // Handle success
        break
    case .failure(let error):
        print("Error: \\(error)")
    }
}
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generateSwiftExample = () => {
    return `import ${packageName}

let apiKey = ProcessInfo.processInfo.environment["WRITEASY_API_KEY"]
guard let apiKey = apiKey else {
    print("Please set WRITEASY_API_KEY environment variable")
    exit(1)
}

let client = WriteasyClient(apiKey: apiKey)

// Get all users
print("Fetching all users...")
client.getUsers { result in
    switch result {
    case .success(let users):
        print("Found \\(users.count) users: \\(users)")
        
        // Create a new user
        print("\\nCreating a new user...")
        let request = CreateUserRequest(name: "Alice Smith", email: "alice@example.com")
        client.createUser(request) { result in
            switch result {
            case .success(let newUser):
                print("Created user: \\(newUser.name)")
                
                // Get user by ID
                print("\\nFetching user by ID...")
                client.getUserById(id: 1) { result in
                    switch result {
                    case .success(let user):
                        print("User details: \\(user.name) (\\(user.email))")
                    case .failure(let error):
                        print("Error: \\(error)")
                    }
                }
            case .failure(let error):
                print("Error: \\(error)")
            }
        }
    case .failure(let error):
        print("Error: \\(error)")
    }
}
`;
  };

  const generateDartPubspec = () => {
    return `name: ${packageName}
description: API client generated by writeasy
version: ${sdkVersion}
homepage: https://github.com/writeasy/sdk-examples

environment:
  sdk: '>=2.17.0 <4.0.0'

dependencies:
  http: ^1.1.0
  json_annotation: ^4.8.1

dev_dependencies:
  test: ^1.24.0
  json_serializable: ^6.7.1
  build_runner: ^2.4.6

# The following section is specific to Flutter packages.
flutter:

# The following section is specific to Dart packages.
# Uncomment the following section if this package will not be used with Flutter.
# dart:
#   - lib/
`;
  };

  const generateDartReadme = () => {
    return `# ${packageName}

A Dart SDK for the API, generated by writeasy.

## Installation

Add this to your \`pubspec.yaml\`:

\`\`\`yaml
dependencies:
  ${packageName}: ^${sdkVersion}
\`\`\`

Then run:

\`\`\`bash
dart pub get
\`\`\`

## Usage

\`\`\`dart
import 'package:${packageName}/${packageName}.dart';

void main() async {
  final client = WriteasyClient(apiKey: 'YOUR_API_KEY');
  
  try {
    // Get all users
    final users = await client.getUsers();
    print('Found \${users.length} users: \$users');
    
    // Create a new user
    final request = CreateUserRequest(
      name: 'John Doe',
      email: 'john@example.com',
    );
    final newUser = await client.createUser(request);
    print('Created user: \${newUser.name}');
    
    // Get user by ID
    final user = await client.getUserById(1);
    print('User details: \${user.name} (\${user.email})');
    
  } catch (e) {
    print('Error: \$e');
  }
}
\`\`\`

## Configuration

\`\`\`dart
final client = WriteasyClient(
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://api.example.com/v1',
);
\`\`\`

## Error Handling

\`\`\`dart
try {
  final users = await client.getUsers();
} on HttpException catch (e) {
  print('HTTP Error: \$e');
} catch (e) {
  print('Error: \$e');
}
\`\`\`

## License

MIT License - see LICENSE file for details.

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generateDartExample = () => {
    return `import 'dart:io';
import 'package:${packageName}/${packageName}.dart';

void main() async {
  final apiKey = Platform.environment['WRITEASY_API_KEY'];
  if (apiKey == null) {
    print('Please set WRITEASY_API_KEY environment variable');
    exit(1);
  }
  
  final client = WriteasyClient(apiKey: apiKey);
  
  try {
    // Get all users
    print('Fetching all users...');
    final users = await client.getUsers();
    print('Found \${users.length} users: \$users');
    
    // Create a new user
    print('\\nCreating a new user...');
    final request = CreateUserRequest(
      name: 'Alice Smith',
      email: 'alice@example.com',
    );
    final newUser = await client.createUser(request);
    print('Created user: \${newUser.name}');
    
    // Get user by ID
    print('\\nFetching user by ID...');
    final user = await client.getUserById(1);
    print('User details: \${user.name} (\${user.email})');
    
  } catch (e) {
    print('Error: \$e');
  }
}
`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
            <h1 className="text-4xl font-serif font-normal mb-2">SDK Generator</h1>
            <p className="text-muted-foreground">Generate production-ready SDKs from your OpenAPI specifications</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* File Upload Section */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">OpenAPI Specification</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept=".json,.yaml,.yml"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="spec-upload"
                      />
                      <label htmlFor="spec-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {uploadedSpec ? uploadedSpec.fileName : "Click to upload OpenAPI spec"}
                        </p>
                        <p className="text-xs text-gray-400">Supports JSON and YAML files</p>
                      </label>
                    </div>
                    {uploadedSpec && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                        ✓ {uploadedSpec.fileName} uploaded successfully
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Programming Language</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Package Name</Label>
                    <Input
                      type="text"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      placeholder="my-api-sdk"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">SDK Version</Label>
                    <Input
                      type="text"
                      value={sdkVersion}
                      onChange={(e) => setSdkVersion(e.target.value)}
                      placeholder="1.0.0"
                    />
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <div className="pt-4 space-y-2">
                    <Button 
                      onClick={handleGenerateSdk} 
                      disabled={!uploadedSpec || isGenerating}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating SDK...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Generate SDK
                        </>
                      )}
                    </Button>
                    
                    {generatedFiles.length > 0 && (
                      <Button 
                        onClick={handleDownloadSdk} 
                        variant="outline" 
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download SDK
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Features Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Type-safe client</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Error handling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Authentication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Request/Response models</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Usage examples</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Documentation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Generated Code */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      Generated {languages.find(l => l.value === selectedLanguage)?.label} SDK
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(getGeneratedCode(), "sdk")}
                    >
                      {copiedCode === "sdk" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono">
                      <code>{getGeneratedCode()}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Instructions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Usage Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Installation</h4>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <code className="text-sm">
                          {selectedLanguage === "python" && "pip install " + packageName}
                          {selectedLanguage === "javascript" && "npm install " + packageName}
                          {selectedLanguage === "typescript" && "npm install " + packageName}
                          {selectedLanguage === "go" && "go get github.com/yourorg/" + packageName}
                          {selectedLanguage === "java" && "Add to your pom.xml or build.gradle"}
                          {selectedLanguage === "csharp" && "dotnet add package " + packageName}
                          {selectedLanguage === "php" && "composer require yourorg/" + packageName}
                          {selectedLanguage === "ruby" && "gem install " + packageName}
                          {selectedLanguage === "rust" && "cargo add " + packageName}
                          {selectedLanguage === "kotlin" && "Add to your build.gradle.kts"}
                          {selectedLanguage === "swift" && "Add to your Package.swift"}
                          {selectedLanguage === "dart" && "dart pub add " + packageName}
                        </code>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Quick Start</h4>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <pre className="text-sm">
                          <code>
{selectedLanguage === "python" && `from ${packageName} import WriteEasyClient

client = WriteEasyClient(api_key="your-api-key")
users = client.users.get_all()`}
{selectedLanguage === "javascript" && `import WriteEasyClient from '${packageName}';

const client = new WriteEasyClient({ apiKey: 'your-api-key' });
const users = await client.users.getAll();`}
{selectedLanguage === "typescript" && `import { WriteEasyClient } from '${packageName}';

const client = new WriteEasyClient({ apiKey: 'your-api-key' });
const users = await client.users.getAll();`}
{selectedLanguage === "go" && `package main

import "${packageName}"

func main() {
    client := NewWriteEasyClient("your-api-key", "")
    users, _ := client.GetUsers()
}`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
