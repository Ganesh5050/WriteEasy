import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Code2, 
  Eye, 
  Download, 
  Upload, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Play,
  Save,
  FileText,
  Zap,
  Settings,
  RefreshCw,
  Share,
  GitBranch,
  History,
  Search,
  Filter,
  Plus,
  Minus,
  Edit,
  Trash2,
  ExternalLink,
  BookOpen,
  Terminal,
  Database,
  Globe,
  Shield,
  Clock,
  Users,
  Activity
} from "lucide-react";

interface ValidationError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

interface ApiEndpoint {
  path: string;
  method: string;
  summary: string;
  description?: string;
  parameters?: any[];
  responses?: any;
  requestBody?: any;
}

export const OpenApiEditor = () => {
  const [openApiSpec, setOpenApiSpec] = useState(`openapi: 3.0.0
info:
  title: Sample API
  version: 1.0.0
  description: A sample API for demonstration
servers:
  - url: https://api.example.com/v1
    description: Production server
paths:
  /users:
    get:
      summary: Get all users
      responses:
        '200':
          description: List of users
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                    name:
                      type: string
                    email:
                      type: string
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                email:
                  type: string
              required:
                - name
                - email
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  email:
                    type: string
  /users/{id}:
    get:
      summary: Get user by ID
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
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  email:
                    type: string`);

  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("editor");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [autoSave, setAutoSave] = useState(true);
  const [formatOnSave, setFormatOnSave] = useState(true);

  const validateOpenApi = (spec: string) => {
    const errors: ValidationError[] = [];
    
    try {
      // Try to parse as YAML first, then JSON
      let parsed: any;
      try {
        parsed = JSON.parse(spec);
      } catch {
        // Simple YAML parsing for basic validation
        parsed = parseYamlLike(spec);
      }

      // Enhanced validation
      if (!parsed.openapi && !parsed.swagger) {
        errors.push({
          line: 1,
          column: 1,
          message: "Missing OpenAPI version. Add 'openapi: 3.0.0' at the top.",
          severity: 'error'
        });
      }

      if (!parsed.info) {
        errors.push({
          line: 2,
          column: 1,
          message: "Missing info section. Add basic API information.",
          severity: 'error'
        });
      } else {
        if (!parsed.info.title) {
          errors.push({
            line: 3,
            column: 1,
            message: "Missing API title in info section.",
            severity: 'warning'
          });
        }
        if (!parsed.info.version) {
          errors.push({
            line: 4,
            column: 1,
            message: "Missing API version in info section.",
            severity: 'warning'
          });
        }
      }

      if (!parsed.paths || Object.keys(parsed.paths).length === 0) {
        errors.push({
          line: 6,
          column: 1,
          message: "Missing paths section. Add at least one API endpoint.",
          severity: 'error'
        });
      }

      setIsValid(errors.length === 0);
      setValidationErrors(errors);
      setValidationError(errors.length > 0 ? errors[0].message : "");
      return errors.length === 0;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid YAML/JSON";
      errors.push({
        line: 1,
        column: 1,
        message: `Parse error: ${errorMessage}`,
        severity: 'error'
      });
      setIsValid(false);
      setValidationErrors(errors);
      setValidationError(errorMessage);
      return false;
    }
  };

  // Simple YAML-like parser for basic validation
  const parseYamlLike = (yaml: string): any => {
    const lines = yaml.split('\n');
    const result: any = {};
    const stack: any[] = [result];
    let currentIndent = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      const indent = line.length - line.trimStart().length;
      const colonIndex = trimmed.indexOf(':');
      
      if (colonIndex > 0) {
        const key = trimmed.substring(0, colonIndex).trim();
        const value = trimmed.substring(colonIndex + 1).trim();
        
        // Adjust stack based on indentation
        while (stack.length > 1 && indent <= currentIndent) {
          stack.pop();
          currentIndent -= 2;
        }
        
        const current = stack[stack.length - 1];
        
        if (value) {
          // Simple value
          if (value.startsWith('"') && value.endsWith('"')) {
            current[key] = value.slice(1, -1);
          } else if (value === 'true') {
            current[key] = true;
          } else if (value === 'false') {
            current[key] = false;
          } else if (!isNaN(Number(value))) {
            current[key] = Number(value);
          } else {
            current[key] = value;
          }
        } else {
          // Object or array
          current[key] = {};
          stack.push(current[key]);
          currentIndent = indent;
        }
      }
    }
    
    return result;
  };

  useEffect(() => {
    validateOpenApi(openApiSpec);
    
    // Auto-save functionality
    if (autoSave && isValid) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [openApiSpec, autoSave, isValid]);

  // Extract endpoints from the spec
  useEffect(() => {
    try {
      const parsed = JSON.parse(openApiSpec);
      if (parsed.paths) {
        const extractedEndpoints: ApiEndpoint[] = [];
        Object.entries(parsed.paths).forEach(([path, pathObj]: [string, any]) => {
          Object.entries(pathObj).forEach(([method, operation]: [string, any]) => {
            if (['get', 'post', 'put', 'delete', 'patch', 'head', 'options'].includes(method)) {
              extractedEndpoints.push({
                path,
                method: method.toUpperCase(),
                summary: operation.summary || `${method.toUpperCase()} ${path}`,
                description: operation.description,
                parameters: operation.parameters,
                responses: operation.responses,
                requestBody: operation.requestBody
              });
            }
          });
        });
        setEndpoints(extractedEndpoints);
      }
    } catch {
      setEndpoints([]);
    }
  }, [openApiSpec]);

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const generatePythonSdk = () => {
    return `from writeasy import WriteEasyClient

# Initialize the client
client = WriteEasyClient(api_key="your-api-key")

# Get all users
users = client.users.get_all()
print(users)

# Create a new user
new_user = client.users.create(
    name="John Doe",
    email="john@example.com"
)
print(new_user)

# Get user by ID
user = client.users.get_by_id(user_id=1)
print(user)`;
  };

  const generateJavaScriptSdk = () => {
    return `import { WriteEasyClient } from 'writeasy';

const client = new WriteEasyClient({
  apiKey: 'your-api-key'
});

// Get all users
const users = await client.users.getAll();
console.log(users);

// Create a new user
const newUser = await client.users.create({
  name: 'John Doe',
  email: 'john@example.com'
});
console.log(newUser);

// Get user by ID
const user = await client.users.getById(1);
console.log(user);`;
  };

  const generateMcpServer = () => {
    return `{
  "name": "sample-api-server",
  "version": "1.0.0",
  "description": "Sample API MCP Server",
  "tools": [
    {
      "name": "get_users",
      "description": "Get all users from the API",
      "inputSchema": {
        "type": "object",
        "properties": {},
        "required": []
      }
    },
    {
      "name": "create_user",
      "description": "Create a new user",
      "inputSchema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "User's name"
          },
          "email": {
            "type": "string",
            "description": "User's email"
          }
        },
        "required": ["name", "email"]
      }
    },
    {
      "name": "get_user_by_id",
      "description": "Get a user by their ID",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "description": "User ID"
          }
        },
        "required": ["id"]
      }
    }
  ]
}`;
  };

  const generateTerraformProvider = () => {
    return `resource "writeasy_user" "example" {
  name  = "John Doe"
  email = "john@example.com"
}

output "user_id" {
  value = writeasy_user.example.id
}

output "user_name" {
  value = writeasy_user.example.name
}`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setOpenApiSpec(content);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setValidationError("Failed to read file");
        setIsLoading(false);
      };
      setIsLoading(true);
      reader.readAsText(file);
    }
  };

  const downloadSpec = () => {
    const blob = new Blob([openApiSpec], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'openapi-spec.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadJsonSpec = () => {
    try {
      const parsed = JSON.parse(openApiSpec);
      const jsonString = JSON.stringify(parsed, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'openapi-spec.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      setValidationError("Failed to convert to JSON: " + (error as Error).message);
    }
  };

  const downloadZipPackage = () => {
    // Create a comprehensive package with all generated files
    const packageContent = {
      'openapi.yaml': openApiSpec,
      'README.md': generateReadme(),
      'package.json': generatePackageJson(),
      'docker-compose.yml': generateDockerCompose(),
      'examples/': generateExamples()
    };
    
    // For now, download as individual files
    downloadSpec();
    setTimeout(() => downloadJsonSpec(), 100);
  };

  const generateReadme = () => {
    return `# API Documentation

This package contains the OpenAPI specification and related files for the API.

## Files

- \`openapi.yaml\` - OpenAPI 3.0 specification
- \`openapi.json\` - JSON version of the specification
- \`examples/\` - Example requests and responses
- \`docker-compose.yml\` - Docker setup for local development

## Usage

### View Documentation

You can view the interactive documentation using Swagger UI:

\`\`\`bash
docker-compose up
\`\`\`

Then visit http://localhost:8080

### Generate SDKs

Use the OpenAPI specification to generate SDKs in various languages:

\`\`\`bash
# Generate Python SDK
openapi-generator generate -i openapi.yaml -g python -o ./sdk/python

# Generate JavaScript SDK  
openapi-generator generate -i openapi.yaml -g javascript -o ./sdk/javascript
\`\`\`

## API Endpoints

${endpoints.map(ep => `- **${ep.method}** \`${ep.path}\` - ${ep.summary}`).join('\n')}

Generated by writeasy on ${new Date().toLocaleDateString()}
`;
  };

  const generatePackageJson = () => {
    return JSON.stringify({
      name: packageName,
      version: sdkVersion,
      description: "API client generated from OpenAPI specification",
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
        "jest": "^29.7.0"
      },
      keywords: ["api", "client", "sdk", "openapi"],
      author: "writeasy",
      license: "MIT"
    }, null, 2);
  };

  const generateDockerCompose = () => {
    return `version: '3.8'

services:
  swagger-ui:
    image: swaggerapi/swagger-ui:latest
    ports:
      - "8080:8080"
    environment:
      SWAGGER_JSON: /app/openapi.json
    volumes:
      - ./openapi.json:/app/openapi.json:ro
    restart: unless-stopped

  api-server:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    restart: unless-stopped
`;
  };

  const generateExamples = () => {
    return endpoints.map(ep => {
      const example = {
        method: ep.method,
        path: ep.path,
        summary: ep.summary,
        description: ep.description,
        request: ep.requestBody ? {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY"
          },
          body: ep.requestBody.content?.['application/json']?.example || {}
        } : {
          headers: {
            "Authorization": "Bearer YOUR_API_KEY"
          }
        },
        response: ep.responses ? Object.entries(ep.responses).map(([status, response]: [string, any]) => ({
          status: parseInt(status),
          description: response.description,
          body: response.content?.['application/json']?.example || {}
        })) : []
      };
      return `# ${ep.method} ${ep.path}\n\`\`\`json\n${JSON.stringify(example, null, 2)}\n\`\`\`\n`;
    }).join('\n\n');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-serif font-normal mb-2">OpenAPI Editor</h1>
                <p className="text-muted-foreground">Design, validate, and generate from your API specifications</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={isValid ? "default" : "destructive"} className="flex items-center gap-1">
                  {isValid ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {isValid ? "Valid" : "Invalid"}
                </Badge>
                <div className="flex items-center gap-2">
                  <Button onClick={downloadSpec} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    YAML
                  </Button>
                  <Button onClick={downloadJsonSpec} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    JSON
                  </Button>
                  <Button onClick={downloadZipPackage} variant="outline" size="sm">
                    <Package className="w-4 h-4 mr-2" />
                    Package
                  </Button>
                </div>
              </div>
            </div>
            
            {validationErrors.length > 0 && (
              <div className="space-y-2 mb-4">
                {validationErrors.map((error, index) => (
                  <div 
                    key={index}
                    className={`border rounded-lg p-3 ${
                      error.severity === 'error' 
                        ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' 
                        : error.severity === 'warning'
                        ? 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800'
                        : 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'
                    }`}
                  >
                    <div className={`flex items-center gap-2 ${
                      error.severity === 'error' 
                        ? 'text-red-600 dark:text-red-400' 
                        : error.severity === 'warning'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium capitalize">{error.severity}:</span>
                      <span>{error.message}</span>
                      <span className="text-xs opacity-75 ml-auto">
                        Line {error.line}, Column {error.column}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Status Bar */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  {isValid ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className={isValid ? "text-green-600" : "text-red-600"}>
                    {isValid ? "Valid OpenAPI Spec" : `${validationErrors.length} Error${validationErrors.length > 1 ? 's' : ''}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {endpoints.length} endpoint{endpoints.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {lastSaved && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Saved {lastSaved.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setAutoSave(!autoSave)}>
                  <Save className="w-4 h-4 mr-2" />
                  Auto-save {autoSave ? "ON" : "OFF"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setFormatOnSave(!formatOnSave)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Format {formatOnSave ? "ON" : "OFF"}
                </Button>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="test">Test API</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      OpenAPI Specification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="file-upload" className="cursor-pointer">
                          <Button variant="outline" size="sm" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload File
                            </span>
                          </Button>
                        </Label>
                        <Input
                          id="file-upload"
                          type="file"
                          accept=".yaml,.yml,.json"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button 
                          onClick={() => copyToClipboard(openApiSpec, "spec")} 
                          variant="outline" 
                          size="sm"
                        >
                          {copiedCode === "spec" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <Textarea
                        value={openApiSpec}
                        onChange={(e) => setOpenApiSpec(e.target.value)}
                        className="min-h-[500px] font-mono text-sm"
                        placeholder="Enter your OpenAPI specification..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Live Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 rounded-lg p-4 min-h-[500px] overflow-auto">
                      {isValid ? (
                        <div className="space-y-4">
                          <div className="border-b pb-2">
                            <h3 className="font-semibold text-lg">Sample API</h3>
                            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Endpoints:</h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">GET</Badge>
                                <code className="text-sm">/users</code>
                                <span className="text-sm text-muted-foreground">Get all users</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">POST</Badge>
                                <code className="text-sm">/users</code>
                                <span className="text-sm text-muted-foreground">Create user</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">GET</Badge>
                                <code className="text-sm">/users/{`{id}`}</code>
                                <span className="text-sm text-muted-foreground">Get user by ID</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <div className="text-center">
                            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                            <p>Invalid OpenAPI specification</p>
                            <p className="text-sm">Fix the errors to see preview</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      API Endpoints Overview
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search endpoints..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                      <Badge variant="secondary">
                        {endpoints.filter(ep => 
                          ep.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ep.summary.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length} endpoints
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {endpoints
                      .filter(endpoint => 
                        endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        endpoint.summary.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((endpoint, index) => (
                        <div 
                          key={index}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedEndpoint === `${endpoint.method}-${endpoint.path}`
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-accent/50"
                          }`}
                          onClick={() => setSelectedEndpoint(
                            selectedEndpoint === `${endpoint.method}-${endpoint.path}` 
                              ? null 
                              : `${endpoint.method}-${endpoint.path}`
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge 
                                className={
                                  endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                                  endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                                  endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                  endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }
                              >
                                {endpoint.method}
                              </Badge>
                              <code className="font-mono text-sm font-medium">{endpoint.path}</code>
                              <span className="text-sm text-muted-foreground">{endpoint.summary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {endpoint.parameters && endpoint.parameters.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {endpoint.parameters.length} param{endpoint.parameters.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                              {endpoint.requestBody && (
                                <Badge variant="outline" className="text-xs">
                                  Body
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {Object.keys(endpoint.responses || {}).length} response{Object.keys(endpoint.responses || {}).length > 1 ? 's' : ''}
                              </Badge>
                            </div>
                          </div>
                          
                          {selectedEndpoint === `${endpoint.method}-${endpoint.path}` && (
                            <div className="mt-4 pt-4 border-t space-y-3">
                              {endpoint.description && (
                                <div>
                                  <h4 className="font-medium text-sm mb-1">Description</h4>
                                  <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                                </div>
                              )}
                              
                              {endpoint.parameters && endpoint.parameters.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-sm mb-2">Parameters</h4>
                                  <div className="space-y-1">
                                    {endpoint.parameters.map((param: any, paramIndex: number) => (
                                      <div key={paramIndex} className="flex items-center gap-2 text-sm">
                                        <code className="text-xs bg-muted px-2 py-1 rounded">{param.name}</code>
                                        <span className="text-muted-foreground">({param.in})</span>
                                        <span className="text-muted-foreground">{param.schema?.type || 'string'}</span>
                                        {param.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {endpoint.requestBody && (
                                <div>
                                  <h4 className="font-medium text-sm mb-2">Request Body</h4>
                                  <div className="bg-muted/30 p-2 rounded text-xs font-mono">
                                    {endpoint.requestBody.content?.['application/json']?.schema?.type || 'object'}
                                  </div>
                                </div>
                              )}
                              
                              {endpoint.responses && (
                                <div>
                                  <h4 className="font-medium text-sm mb-2">Responses</h4>
                                  <div className="space-y-1">
                                    {Object.entries(endpoint.responses).map(([status, response]: [string, any]) => (
                                      <div key={status} className="flex items-center gap-2 text-sm">
                                        <Badge 
                                          className={
                                            status.startsWith('2') ? 'bg-green-100 text-green-800' :
                                            status.startsWith('4') ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                          }
                                        >
                                          {status}
                                        </Badge>
                                        <span className="text-muted-foreground">{response.description}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    
                    {endpoints.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No endpoints found in the OpenAPI specification</p>
                        <p className="text-sm">Add some paths to see them here</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    API Documentation Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 min-h-[600px]">
                    <div className="space-y-6">
                      <div className="border-b pb-4">
                        <h1 className="text-3xl font-bold">Sample API</h1>
                        <p className="text-muted-foreground mt-2">A sample API for demonstration</p>
                        <div className="mt-4">
                          <Badge variant="secondary">Version 1.0.0</Badge>
                          <Badge variant="outline" className="ml-2">OpenAPI 3.0.0</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Endpoints</h2>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-600">GET</Badge>
                              <code className="font-mono">/users</code>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Get all users</p>
                            <Button size="sm" variant="outline">
                              <Play className="w-3 h-3 mr-1" />
                              Try it out
                            </Button>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-blue-600">POST</Badge>
                              <code className="font-mono">/users</code>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Create a new user</p>
                            <Button size="sm" variant="outline">
                              <Play className="w-3 h-3 mr-1" />
                              Try it out
                            </Button>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-600">GET</Badge>
                              <code className="font-mono">/users/{`{id}`}</code>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Get user by ID</p>
                            <Button size="sm" variant="outline">
                              <Play className="w-3 h-3 mr-1" />
                              Try it out
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="generate" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Generated Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="python" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="mcp">MCP Server</TabsTrigger>
                        <TabsTrigger value="terraform">Terraform</TabsTrigger>
                      </TabsList>

                      <TabsContent value="python" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Python SDK</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(generatePythonSdk(), "python")}
                          >
                            {copiedCode === "python" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="bg-black rounded-lg p-4 overflow-x-auto">
                          <pre className="text-blue-400 text-sm font-mono">
                            <code>{generatePythonSdk()}</code>
                          </pre>
                        </div>
                      </TabsContent>

                      <TabsContent value="javascript" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">JavaScript SDK</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(generateJavaScriptSdk(), "javascript")}
                          >
                            {copiedCode === "javascript" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="bg-black rounded-lg p-4 overflow-x-auto">
                          <pre className="text-yellow-400 text-sm font-mono">
                            <code>{generateJavaScriptSdk()}</code>
                          </pre>
                        </div>
                      </TabsContent>

                      <TabsContent value="mcp" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">MCP Server Config</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(generateMcpServer(), "mcp")}
                          >
                            {copiedCode === "mcp" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="bg-black rounded-lg p-4 overflow-x-auto">
                          <pre className="text-purple-400 text-sm font-mono">
                            <code>{generateMcpServer()}</code>
                          </pre>
                        </div>
                      </TabsContent>

                      <TabsContent value="terraform" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Terraform Provider</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(generateTerraformProvider(), "terraform")}
                          >
                            {copiedCode === "terraform" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="bg-black rounded-lg p-4 overflow-x-auto">
                          <pre className="text-orange-400 text-sm font-mono">
                            <code>{generateTerraformProvider()}</code>
                          </pre>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Test Your API
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="api-url">API Base URL</Label>
                        <Input
                          id="api-url"
                          placeholder="https://api.example.com/v1"
                          defaultValue="https://api.example.com/v1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="api-key">API Key (Optional)</Label>
                        <Input
                          id="api-key"
                          type="password"
                          placeholder="your-api-key"
                        />
                      </div>
                      <Button className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Test API Endpoints
                      </Button>
                      <div className="text-sm text-muted-foreground">
                        <p>• Validate all endpoints</p>
                        <p>• Check response schemas</p>
                        <p>• Test authentication</p>
                        <p>• Generate test reports</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="test" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    API Testing Console
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="method">Method</Label>
                        <select className="w-full p-2 border rounded-md" id="method">
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="PUT">PUT</option>
                          <option value="DELETE">DELETE</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="endpoint">Endpoint</Label>
                        <Input
                          id="endpoint"
                          placeholder="/users"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="request-body">Request Body (JSON)</Label>
                      <Textarea
                        id="request-body"
                        placeholder='{"name": "John Doe", "email": "john@example.com"}'
                        className="min-h-[100px] font-mono"
                      />
                    </div>
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Send Request
                    </Button>
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <h4 className="font-medium mb-2">Response</h4>
                      <pre className="text-sm text-muted-foreground">
                        Click "Send Request" to see the API response here...
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
