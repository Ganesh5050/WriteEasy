import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Globe, 
  Download, 
  Copy, 
  CheckCircle, 
  Play,
  Settings,
  Code2,
  FileText,
  Eye,
  Palette,
  Share,
  Search,
  ArrowLeft
} from "lucide-react";

export const DocsGenerator = () => {
  const [apiTitle, setApiTitle] = useState("Sample API");
  const [apiVersion, setApiVersion] = useState("1.0.0");
  const [apiDescription, setApiDescription] = useState("A sample API for demonstration");
  const [baseUrl, setBaseUrl] = useState("https://api.example.com/v1");
  const [theme, setTheme] = useState("default");
  const [selectedTemplate, setSelectedTemplate] = useState("swagger");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const themes = [
    { value: "default", label: "Default", description: "Clean and professional" },
    { value: "dark", label: "Dark", description: "Dark theme for better readability" },
    { value: "minimal", label: "Minimal", description: "Simple and focused" },
    { value: "modern", label: "Modern", description: "Contemporary design" }
  ];

  const templates = [
    { value: "swagger", label: "Swagger UI", description: "Interactive API explorer" },
    { value: "redoc", label: "ReDoc", description: "Clean documentation layout" },
    { value: "custom", label: "Custom", description: "Fully customizable" }
  ];

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const generateSwaggerHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${apiTitle} Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
    <style>
        html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }
        *, *:before, *:after {
            box-sizing: inherit;
        }
        body {
            margin:0;
            background: #fafafa;
        }
        ${theme === "dark" ? `
        .swagger-ui {
            filter: invert(88%) hue-rotate(180deg);
        }
        .swagger-ui .microlight {
            filter: invert(100%) hue-rotate(180deg);
        }
        ` : ""}
        ${theme === "minimal" ? `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info { margin: 20px 0; }
        ` : ""}
        ${theme === "modern" ? `
        .swagger-ui {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .swagger-ui .info .title {
            color: #3b82f6;
            font-weight: 600;
        }
        ` : ""}
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                url: '${baseUrl}/openapi.json',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout",
                tryItOutEnabled: true,
                requestInterceptor: (req) => {
                    // Add authentication headers if needed
                    req.headers['Authorization'] = 'Bearer your-api-key';
                    return req;
                }
            });
        };
    </script>
</body>
</html>`;
  };

  const generateRedocHtml = () => {
    return `<!DOCTYPE html>
<html>
<head>
    <title>${apiTitle} Documentation</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        ${theme === "dark" ? `
        redoc {
            --redoc-color-primary: #3b82f6;
            --redoc-color-secondary: #64748b;
            --redoc-color-text: #f1f5f9;
            --redoc-color-text-secondary: #94a3b8;
            --redoc-color-border: #334155;
            --redoc-color-background: #0f172a;
        }
        ` : ""}
        ${theme === "minimal" ? `
        redoc {
            --redoc-color-primary: #000000;
            --redoc-color-secondary: #666666;
            --redoc-color-text: #333333;
            --redoc-color-text-secondary: #666666;
            --redoc-color-border: #e5e5e5;
            --redoc-color-background: #ffffff;
        }
        ` : ""}
        ${theme === "modern" ? `
        redoc {
            --redoc-color-primary: #3b82f6;
            --redoc-color-secondary: #64748b;
            --redoc-color-text: #1e293b;
            --redoc-color-text-secondary: #64748b;
            --redoc-color-border: #e2e8f0;
            --redoc-color-background: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        ` : ""}
    </style>
</head>
<body>
    <redoc spec-url='${baseUrl}/openapi.json'></redoc>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
</body>
</html>`;
  };

  const generateCustomHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${apiTitle} Documentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: ${theme === "dark" ? "#0f172a" : "#ffffff"};
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            padding: 40px 0;
            border-bottom: 1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"};
            margin-bottom: 40px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: ${theme === "dark" ? "#f1f5f9" : "#1e293b"};
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.2rem;
            color: ${theme === "dark" ? "#94a3b8" : "#64748b"};
            margin-bottom: 20px;
        }
        
        .version {
            display: inline-block;
            background: #3b82f6;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .endpoints {
            display: grid;
            gap: 20px;
        }
        
        .endpoint {
            background: ${theme === "dark" ? "#1e293b" : "#ffffff"};
            border: 1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"};
            border-radius: 8px;
            padding: 20px;
            transition: all 0.2s ease;
        }
        
        .endpoint:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }
        
        .endpoint-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }
        
        .method {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .method.get { background: #10b981; color: white; }
        .method.post { background: #3b82f6; color: white; }
        .method.put { background: #f59e0b; color: white; }
        .method.delete { background: #ef4444; color: white; }
        
        .path {
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 1.1rem;
            font-weight: 600;
            color: ${theme === "dark" ? "#f1f5f9" : "#1e293b"};
        }
        
        .description {
            color: ${theme === "dark" ? "#94a3b8" : "#64748b"};
            margin-bottom: 16px;
        }
        
        .try-button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: background 0.2s ease;
        }
        
        .try-button:hover {
            background: #2563eb;
        }
        
        .info-section {
            background: ${theme === "dark" ? "#1e293b" : "#f8fafc"};
            border: 1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"};
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .info-section h3 {
            color: ${theme === "dark" ? "#f1f5f9" : "#1e293b"};
            margin-bottom: 12px;
        }
        
        .info-section p {
            color: ${theme === "dark" ? "#94a3b8" : "#64748b"};
            margin-bottom: 8px;
        }
        
        .code {
            background: ${theme === "dark" ? "#0f172a" : "#f1f5f9"};
            border: 1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"};
            border-radius: 6px;
            padding: 12px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9rem;
            color: ${theme === "dark" ? "#f1f5f9" : "#1e293b"};
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${apiTitle}</h1>
            <p>${apiDescription}</p>
            <span class="version">v${apiVersion}</span>
        </div>
        
        <div class="info-section">
            <h3>Base URL</h3>
            <p><code class="code">${baseUrl}</code></p>
            
            <h3>Authentication</h3>
            <p>This API uses Bearer token authentication. Include your API key in the Authorization header:</p>
            <code class="code">Authorization: Bearer your-api-key</code>
        </div>
        
        <div class="endpoints">
            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method get">GET</span>
                    <span class="path">/users</span>
                </div>
                <div class="description">Get all users from the system</div>
                <button class="try-button" onclick="tryEndpoint('GET', '/users')">Try it out</button>
            </div>
            
            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method post">POST</span>
                    <span class="path">/users</span>
                </div>
                <div class="description">Create a new user</div>
                <button class="try-button" onclick="tryEndpoint('POST', '/users')">Try it out</button>
            </div>
            
            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method get">GET</span>
                    <span class="path">/users/{id}</span>
                </div>
                <div class="description">Get a specific user by ID</div>
                <button class="try-button" onclick="tryEndpoint('GET', '/users/1')">Try it out</button>
            </div>
            
            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method put">PUT</span>
                    <span class="path">/users/{id}</span>
                </div>
                <div class="description">Update a user</div>
                <button class="try-button" onclick="tryEndpoint('PUT', '/users/1')">Try it out</button>
            </div>
            
            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method delete">DELETE</span>
                    <span class="path">/users/{id}</span>
                </div>
                <div class="description">Delete a user</div>
                <button class="try-button" onclick="tryEndpoint('DELETE', '/users/1')">Try it out</button>
            </div>
        </div>
    </div>
    
    <script>
        function tryEndpoint(method, path) {
            const url = '${baseUrl}' + path;
            const options = {
                method: method,
                headers: {
                    'Authorization': 'Bearer your-api-key',
                    'Content-Type': 'application/json'
                }
            };
            
            if (method === 'POST' || method === 'PUT') {
                options.body = JSON.stringify({
                    name: 'John Doe',
                    email: 'john@example.com'
                });
            }
            
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    alert('Response: ' + JSON.stringify(data, null, 2));
                })
                .catch(error => {
                    alert('Error: ' + error.message);
                });
        }
    </script>
</body>
</html>`;
  };

  const generateOpenApiSpec = () => {
    return `openapi: 3.0.0
info:
  title: ${apiTitle}
  version: ${apiVersion}
  description: ${apiDescription}
servers:
  - url: ${baseUrl}
    description: Production server
paths:
  /users:
    get:
      summary: Get all users
      description: Retrieve a list of all users
      responses:
        '200':
          description: List of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    post:
      summary: Create a new user
      description: Create a new user in the system
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
  /users/{id}:
    get:
      summary: Get user by ID
      description: Retrieve a specific user by their ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: User details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found
    put:
      summary: Update user
      description: Update an existing user
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateUserRequest'
      responses:
        '200':
          description: User updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
    delete:
      summary: Delete user
      description: Delete a user from the system
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: User deleted successfully
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          description: Unique identifier for the user
        name:
          type: string
          description: User's full name
        email:
          type: string
          format: email
          description: User's email address
        created_at:
          type: string
          format: date-time
          description: When the user was created
      required:
        - id
        - name
        - email
    CreateUserRequest:
      type: object
      properties:
        name:
          type: string
          description: User's full name
        email:
          type: string
          format: email
          description: User's email address
      required:
        - name
        - email
    UpdateUserRequest:
      type: object
      properties:
        name:
          type: string
          description: User's full name
        email:
          type: string
          format: email
          description: User's email address
security:
  - bearerAuth: []
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT`;
  };

  const getGeneratedCode = () => {
    switch (selectedTemplate) {
      case "swagger":
        return generateSwaggerHtml();
      case "redoc":
        return generateRedocHtml();
      case "custom":
        return generateCustomHtml();
      default:
        return generateSwaggerHtml();
    }
  };

  const downloadDocs = () => {
    const html = getGeneratedCode();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${apiTitle.toLowerCase().replace(/\s+/g, '-')}-docs.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadOpenApiSpec = () => {
    const spec = generateOpenApiSpec();
    const blob = new Blob([spec], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${apiTitle.toLowerCase().replace(/\s+/g, '-')}-openapi.yaml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            <h1 className="text-4xl font-serif font-normal mb-2">API Documentation Generator</h1>
            <p className="text-muted-foreground">Create beautiful, interactive API documentation with multiple themes and templates</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Documentation Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="api-title">API Title</Label>
                    <Input
                      id="api-title"
                      value={apiTitle}
                      onChange={(e) => setApiTitle(e.target.value)}
                      placeholder="Sample API"
                    />
                  </div>

                  <div>
                    <Label htmlFor="api-version">Version</Label>
                    <Input
                      id="api-version"
                      value={apiVersion}
                      onChange={(e) => setApiVersion(e.target.value)}
                      placeholder="1.0.0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="api-description">Description</Label>
                    <Textarea
                      id="api-description"
                      value={apiDescription}
                      onChange={(e) => setApiDescription(e.target.value)}
                      placeholder="A sample API for demonstration"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="base-url">Base URL</Label>
                    <Input
                      id="base-url"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="https://api.example.com/v1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="template">Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.value} value={template.value}>
                            <div>
                              <div className="font-medium">{template.label}</div>
                              <div className="text-sm text-muted-foreground">{template.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((themeOption) => (
                          <SelectItem key={themeOption.value} value={themeOption.value}>
                            <div>
                              <div className="font-medium">{themeOption.label}</div>
                              <div className="text-sm text-muted-foreground">{themeOption.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button onClick={downloadDocs} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Documentation
                    </Button>
                    <Button onClick={downloadOpenApiSpec} variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Download OpenAPI Spec
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Features Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Interactive API explorer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Try-it-out functionality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Multiple themes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Responsive design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Authentication support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Code examples</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Generated Documentation */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="preview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="preview">Live Preview</TabsTrigger>
                  <TabsTrigger value="html">HTML Code</TabsTrigger>
                  <TabsTrigger value="openapi">OpenAPI Spec</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Documentation Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/30 p-4 border-b">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{apiTitle}</h3>
                              <p className="text-sm text-muted-foreground">{apiDescription}</p>
                            </div>
                            <Badge variant="secondary">v{apiVersion}</Badge>
                          </div>
                        </div>
                        <div className="p-4 space-y-4">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-600">GET</Badge>
                            <code className="text-sm">/users</code>
                            <span className="text-sm text-muted-foreground">Get all users</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-600">POST</Badge>
                            <code className="text-sm">/users</code>
                            <span className="text-sm text-muted-foreground">Create user</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-600">GET</Badge>
                            <code className="text-sm">/users/{`{id}`}</code>
                            <span className="text-sm text-muted-foreground">Get user by ID</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-600">PUT</Badge>
                            <code className="text-sm">/users/{`{id}`}</code>
                            <span className="text-sm text-muted-foreground">Update user</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-red-600">DELETE</Badge>
                            <code className="text-sm">/users/{`{id}`}</code>
                            <span className="text-sm text-muted-foreground">Delete user</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="html" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-5 h-5" />
                          Generated HTML Documentation
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(getGeneratedCode(), "html")}
                        >
                          {copiedCode === "html" ? (
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
                </TabsContent>

                <TabsContent value="openapi" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          OpenAPI Specification
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generateOpenApiSpec(), "openapi")}
                        >
                          {copiedCode === "openapi" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black rounded-lg p-4 overflow-x-auto">
                        <pre className="text-blue-400 text-sm font-mono">
                          <code>{generateOpenApiSpec()}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
