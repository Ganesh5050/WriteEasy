import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Globe,
  Code2,
  Database,
  Zap,
  Send,
  Download,
  RefreshCw,
  Settings,
  History,
  Save,
  Loader2,
  Eye,
  EyeOff,
  FileText,
  BarChart3,
  Timer,
  Network,
  Shield,
  Bug,
  TestTube,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Trash2,
  Edit,
  Check,
  X
} from "lucide-react";

interface ApiResponse {
  status: number;
  data: any;
  headers: Record<string, string>;
  time: number;
  size: number;
  error?: string;
  warnings?: string[];
}

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    example?: any;
  }>;
  body?: {
    type: string;
    example: any;
    schema?: any;
  };
  responses: Array<{
    status: number;
    description: string;
    example: any;
    headers?: Record<string, string>;
  }>;
  auth?: {
    type: string;
    description: string;
  };
}

interface TestCase {
  id: string;
  name: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: any;
  expectedStatus?: number;
  expectedResponseTime?: number;
  description?: string;
}

interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: TestCase[];
  createdAt: Date;
  lastRun?: Date;
  results?: {
    passed: number;
    failed: number;
    total: number;
    duration: number;
  };
}

export const ApiTester = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("tester");
  const [baseUrl, setBaseUrl] = useState("https://api.writeasy.com/v1");
  const [customHeaders, setCustomHeaders] = useState<Record<string, string>>({});
  const [authToken, setAuthToken] = useState("");
  const [timeout, setTimeout] = useState(30);
  const [followRedirects, setFollowRedirects] = useState(true);
  const [validateSSL, setValidateSSL] = useState(true);
  const [requestHistory, setRequestHistory] = useState<ApiResponse[]>([]);
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [currentTestSuite, setCurrentTestSuite] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errorSimulation, setErrorSimulation] = useState(false);
  const [simulatedDelay, setSimulatedDelay] = useState(0);
  const [simulatedErrorRate, setSimulatedErrorRate] = useState(0);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    averageResponseTime: 0,
    successRate: 100,
    totalRequests: 0,
    errorCount: 0
  });

  // Enhanced endpoints with more realistic data
  const endpoints: ApiEndpoint[] = [
    {
      method: "GET",
      path: "/users",
      description: "Retrieve all users with pagination and filtering",
      parameters: [
        { name: "page", type: "integer", required: false, description: "Page number", example: 1 },
        { name: "limit", type: "integer", required: false, description: "Items per page", example: 10 },
        { name: "search", type: "string", required: false, description: "Search term", example: "john" },
        { name: "sort", type: "string", required: false, description: "Sort field", example: "created_at" },
        { name: "order", type: "string", required: false, description: "Sort order", example: "desc" }
      ],
      responses: [
        {
          status: 200,
          description: "Successfully retrieved users",
          example: {
            data: [
              {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                created_at: "2024-01-15T10:30:00Z",
                updated_at: "2024-01-20T14:22:00Z",
                status: "active",
                role: "user",
                avatar_url: "https://api.writeasy.com/avatars/1.jpg"
              },
              {
                id: 2,
                name: "Jane Smith",
                email: "jane@example.com",
                created_at: "2024-01-16T09:15:00Z",
                updated_at: "2024-01-21T16:45:00Z",
                status: "active",
                role: "admin",
                avatar_url: "https://api.writeasy.com/avatars/2.jpg"
              }
            ],
            pagination: {
              page: 1,
              limit: 10,
              total: 2,
              pages: 1
            },
            meta: {
              request_id: "req_123456789",
              timestamp: "2024-01-22T12:00:00Z",
              version: "v1"
            }
          },
          headers: {
            "Content-Type": "application/json",
            "X-Rate-Limit-Remaining": "999",
            "X-Rate-Limit-Reset": "1642876800"
          }
        },
        {
          status: 400,
          description: "Bad request - invalid parameters",
          example: {
            error: {
              code: "INVALID_PARAMETERS",
              message: "Invalid pagination parameters",
              details: {
                page: "Must be a positive integer",
                limit: "Must be between 1 and 100"
              }
            },
            request_id: "req_123456789"
          }
        },
        {
          status: 401,
          description: "Unauthorized - invalid or missing authentication",
          example: {
            error: {
              code: "UNAUTHORIZED",
              message: "Authentication required",
              details: {
                hint: "Include a valid API key in the Authorization header"
              }
            },
            request_id: "req_123456789"
          }
        },
        {
          status: 429,
          description: "Rate limit exceeded",
          example: {
            error: {
              code: "RATE_LIMIT_EXCEEDED",
              message: "Too many requests",
              details: {
                retry_after: 60,
                limit: 1000,
                remaining: 0
              }
            },
            request_id: "req_123456789"
          }
        }
      ],
      auth: {
        type: "Bearer Token",
        description: "API key required in Authorization header"
      }
    },
    {
      method: "POST",
      path: "/users",
      description: "Create a new user account",
      body: {
        type: "application/json",
        example: {
          name: "Alice Johnson",
          email: "alice@example.com",
          password: "securepassword123",
          role: "user",
          preferences: {
            notifications: true,
            theme: "light"
          }
        },
        schema: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100 },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 8 },
            role: { type: "string", enum: ["user", "admin"] },
            preferences: { type: "object" }
          }
        }
      },
      responses: [
        {
          status: 201,
          description: "User created successfully",
          example: {
            data: {
              id: 3,
              name: "Alice Johnson",
              email: "alice@example.com",
              role: "user",
              status: "active",
              created_at: "2024-01-22T12:00:00Z",
              updated_at: "2024-01-22T12:00:00Z",
              avatar_url: null
            },
            meta: {
              request_id: "req_123456789",
              timestamp: "2024-01-22T12:00:00Z"
            }
          },
          headers: {
            "Content-Type": "application/json",
            "Location": "/users/3"
          }
        },
        {
          status: 400,
          description: "Validation error",
          example: {
            error: {
              code: "VALIDATION_ERROR",
              message: "Invalid input data",
              details: {
                name: "Name is required",
                email: "Invalid email format",
                password: "Password must be at least 8 characters"
              }
            },
            request_id: "req_123456789"
          }
        },
        {
          status: 409,
          description: "Email already exists",
          example: {
            error: {
              code: "EMAIL_EXISTS",
              message: "User with this email already exists",
              details: {
                email: "alice@example.com"
              }
            },
            request_id: "req_123456789"
          }
        }
      ],
      auth: {
        type: "Bearer Token",
        description: "Admin API key required"
      }
    },
    {
      method: "GET",
      path: "/users/{id}",
      description: "Get user by ID with detailed information",
      parameters: [
        { name: "id", type: "integer", required: true, description: "User ID", example: 1 },
        { name: "include", type: "string", required: false, description: "Include related data", example: "profile,settings" }
      ],
      responses: [
        {
          status: 200,
          description: "User found",
          example: {
            data: {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              role: "user",
              status: "active",
              created_at: "2024-01-15T10:30:00Z",
              updated_at: "2024-01-20T14:22:00Z",
              last_login: "2024-01-21T18:30:00Z",
              profile: {
                bio: "Software developer passionate about APIs",
                location: "San Francisco, CA",
                website: "https://johndoe.dev",
                social_links: {
                  twitter: "@johndoe",
                  github: "johndoe"
                }
              },
              settings: {
                notifications: {
                  email: true,
                  push: false,
                  sms: false
                },
                privacy: {
                  profile_visibility: "public",
                  show_email: false
                }
              },
              stats: {
                api_calls: 1250,
                projects: 5,
                last_activity: "2024-01-21T18:30:00Z"
              }
            },
            meta: {
              request_id: "req_123456789",
              timestamp: "2024-01-22T12:00:00Z"
            }
          }
        },
        {
          status: 404,
          description: "User not found",
          example: {
            error: {
              code: "USER_NOT_FOUND",
              message: "User with ID 999 does not exist",
              details: {
                id: 999
              }
            },
            request_id: "req_123456789"
          }
        }
      ],
      auth: {
        type: "Bearer Token",
        description: "API key required"
      }
    },
    {
      method: "PUT",
      path: "/users/{id}",
      description: "Update user information",
      parameters: [
        { name: "id", type: "integer", required: true, description: "User ID", example: 1 }
      ],
      body: {
        type: "application/json",
        example: {
          name: "John Updated",
          email: "john.updated@example.com",
          preferences: {
            notifications: false,
            theme: "dark"
          }
        }
      },
      responses: [
        {
          status: 200,
          description: "User updated successfully",
          example: {
            data: {
              id: 1,
              name: "John Updated",
              email: "john.updated@example.com",
              role: "user",
              status: "active",
              created_at: "2024-01-15T10:30:00Z",
              updated_at: "2024-01-22T12:00:00Z",
              preferences: {
                notifications: false,
                theme: "dark"
              }
            },
            meta: {
              request_id: "req_123456789",
              timestamp: "2024-01-22T12:00:00Z"
            }
          }
        }
      ],
      auth: {
        type: "Bearer Token",
        description: "User's own API key or admin key required"
      }
    },
    {
      method: "DELETE",
      path: "/users/{id}",
      description: "Delete user account",
      parameters: [
        { name: "id", type: "integer", required: true, description: "User ID", example: 1 },
        { name: "confirm", type: "boolean", required: true, description: "Confirmation flag", example: true }
      ],
      responses: [
        {
          status: 204,
          description: "User deleted successfully",
          headers: {
            "X-Deleted-At": "2024-01-22T12:00:00Z"
          }
        },
        {
          status: 400,
          description: "Missing confirmation",
          example: {
            error: {
              code: "CONFIRMATION_REQUIRED",
              message: "Deletion requires confirmation",
              details: {
                confirm: "Must be true to confirm deletion"
              }
            },
            request_id: "req_123456789"
          }
        }
      ],
      auth: {
        type: "Bearer Token",
        description: "Admin API key required"
      }
    }
  ];

  // Enhanced API testing functions
  const simulateApiCall = async (endpoint: ApiEndpoint, body?: any): Promise<ApiResponse> => {
    const startTime = Date.now();
    
    // Simulate network delay
    if (simulatedDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, simulatedDelay));
    }
    
    // Simulate error based on error rate
    if (errorSimulation && Math.random() < simulatedErrorRate / 100) {
      const errorResponses = [
        { status: 500, message: "Internal Server Error" },
        { status: 503, message: "Service Unavailable" },
        { status: 504, message: "Gateway Timeout" },
        { status: 429, message: "Rate Limit Exceeded" }
      ];
      const error = errorResponses[Math.floor(Math.random() * errorResponses.length)];
      
      return {
        status: error.status,
        data: { error: { message: error.message } },
        headers: { "Content-Type": "application/json" },
        time: Date.now() - startTime,
        size: JSON.stringify({ error: { message: error.message } }).length,
        error: error.message
      };
    }
    
    // Simulate realistic response times based on endpoint complexity
    const baseDelay = endpoint.method === 'GET' ? 100 : 200;
    const complexityDelay = endpoint.path.includes('{id}') ? 50 : 0;
    const totalDelay = baseDelay + complexityDelay + Math.random() * 100;
    
    await new Promise(resolve => setTimeout(resolve, totalDelay));
    
    const responseTime = Date.now() - startTime;
    const selectedResponse = endpoint.responses[Math.floor(Math.random() * endpoint.responses.length)];
    const responseData = JSON.stringify(selectedResponse.example);
    
    return {
      status: selectedResponse.status,
      data: selectedResponse.example,
      headers: selectedResponse.headers || { "Content-Type": "application/json" },
      time: responseTime,
      size: responseData.length,
      warnings: responseTime > 1000 ? ["Slow response time detected"] : undefined
    };
  };

  const executeRequest = async () => {
    setIsLoading(true);
    
    try {
      const endpoint = endpoints[selectedEndpoint];
      const body = requestBody ? JSON.parse(requestBody) : undefined;
      
      const result = await simulateApiCall(endpoint, body);
      setResponse(result);
      
      // Add to history
      setRequestHistory(prev => [result, ...prev.slice(0, 49)]); // Keep last 50 requests
      
      // Update performance metrics
      setPerformanceMetrics(prev => ({
        averageResponseTime: (prev.averageResponseTime * prev.totalRequests + result.time) / (prev.totalRequests + 1),
        successRate: result.status < 400 ? 
          (prev.successRate * prev.totalRequests + 100) / (prev.totalRequests + 1) :
          (prev.successRate * prev.totalRequests) / (prev.totalRequests + 1),
        totalRequests: prev.totalRequests + 1,
        errorCount: result.status >= 400 ? prev.errorCount + 1 : prev.errorCount
      }));
      
    } catch (err) {
      console.error("Request failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCodeExample = (language: string) => {
    const endpoint = endpoints[selectedEndpoint];
    const url = `${baseUrl}${endpoint.path}`;
    const headers = {
      ...customHeaders,
      ...(authToken && { "Authorization": `Bearer ${authToken}` }),
      ...(endpoint.body && { "Content-Type": "application/json" })
    };
    
    switch (language) {
      case "curl":
        let curlCmd = `curl -X ${endpoint.method} "${url}"`;
        Object.entries(headers).forEach(([key, value]) => {
          curlCmd += ` \\\n  -H "${key}: ${value}"`;
        });
        if (endpoint.body && requestBody) {
          curlCmd += ` \\\n  -d '${requestBody}'`;
        }
        return curlCmd;
        
      case "javascript":
        return `const response = await fetch("${url}", {
  method: "${endpoint.method}",
  headers: ${JSON.stringify(headers, null, 2)},
  ${endpoint.body && requestBody ? `body: ${requestBody}` : ''}
});

const data = await response.json();
console.log(data);`;
        
      case "python":
        return `import requests

response = requests.${endpoint.method.toLowerCase()}(
    "${url}",
    headers=${JSON.stringify(headers, null, 2)},
    ${endpoint.body && requestBody ? `json=${requestBody}` : ''}
)

print(response.json())`;
        
      case "php":
        return `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "${url}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${endpoint.method}");
curl_setopt($ch, CURLOPT_HTTPHEADER, ${JSON.stringify(Object.entries(headers).map(([k, v]) => "$k: $v"), null, 2)});
${endpoint.body && requestBody ? `curl_setopt($ch, CURLOPT_POSTFIELDS, ${requestBody});` : ''}

$response = curl_exec($ch);
curl_close($ch);

echo $response;`;
        
      default:
        return "";
    }
  };

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const createTestSuite = () => {
    const newSuite: TestSuite = {
      id: Date.now().toString(),
      name: `Test Suite ${testSuites.length + 1}`,
      description: "Automated test suite",
      tests: [],
      createdAt: new Date()
    };
    setTestSuites(prev => [...prev, newSuite]);
    setCurrentTestSuite(newSuite.id);
  };

  const addTestCase = () => {
    if (!currentTestSuite) return;
    
    const endpoint = endpoints[selectedEndpoint];
    const newTest: TestCase = {
      id: Date.now().toString(),
      name: `${endpoint.method} ${endpoint.path}`,
      method: endpoint.method,
      url: `${baseUrl}${endpoint.path}`,
      headers: {
        ...customHeaders,
        ...(authToken && { "Authorization": `Bearer ${authToken}` })
      },
      body: requestBody ? JSON.parse(requestBody) : undefined,
      expectedStatus: 200,
      expectedResponseTime: 1000,
      description: endpoint.description
    };
    
    setTestSuites(prev => prev.map(suite => 
      suite.id === currentTestSuite 
        ? { ...suite, tests: [...suite.tests, newTest] }
        : suite
    ));
  };

  const runTestSuite = async (suiteId: string) => {
    const suite = testSuites.find(s => s.id === suiteId);
    if (!suite) return;
    
    let passed = 0;
    let failed = 0;
    const startTime = Date.now();
    
    for (const test of suite.tests) {
      try {
        const endpoint = endpoints.find(ep => 
          ep.method === test.method && ep.path === test.url.replace(baseUrl, '')
        );
        
        if (endpoint) {
          const result = await simulateApiCall(endpoint, test.body);
          
          if (result.status === test.expectedStatus && 
              result.time <= (test.expectedResponseTime || 1000)) {
            passed++;
          } else {
            failed++;
          }
        }
      } catch {
        failed++;
      }
    }
    
    const duration = Date.now() - startTime;
    
    setTestSuites(prev => prev.map(s => 
      s.id === suiteId 
        ? { 
            ...s, 
            lastRun: new Date(),
            results: { passed, failed, total: suite.tests.length, duration }
          }
        : s
    ));
  };

  const exportTestSuite = (suiteId: string) => {
    const suite = testSuites.find(s => s.id === suiteId);
    if (!suite) return;
    
    const exportData = {
      name: suite.name,
      description: suite.description,
      tests: suite.tests.map(test => ({
        name: test.name,
        method: test.method,
        url: test.url,
        headers: test.headers,
        body: test.body,
        expectedStatus: test.expectedStatus,
        expectedResponseTime: test.expectedResponseTime
      }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${suite.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Initialize with example request body
  useEffect(() => {
    const endpoint = endpoints[selectedEndpoint];
    if (endpoint.body) {
      setRequestBody(JSON.stringify(endpoint.body.example, null, 2));
    } else {
      setRequestBody("");
    }
  }, [selectedEndpoint]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-serif font-normal mb-2">API Testing Console</h1>
                <p className="text-muted-foreground">Test your APIs with realistic responses and comprehensive error simulation</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Network className="w-3 h-3" />
                  {performanceMetrics.totalRequests} requests
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Timer className="w-3 h-3" />
                  {Math.round(performanceMetrics.averageResponseTime)}ms avg
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {Math.round(performanceMetrics.successRate)}% success
                </Badge>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tester">API Tester</TabsTrigger>
              <TabsTrigger value="history">Request History</TabsTrigger>
              <TabsTrigger value="test-suites">Test Suites</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="tester" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Request Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Request Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                      <Label htmlFor="auth-token">Authentication Token</Label>
                      <Input
                        id="auth-token"
                        type="password"
                        value={authToken}
                        onChange={(e) => setAuthToken(e.target.value)}
                        placeholder="Bearer token or API key"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="timeout">Timeout (seconds)</Label>
                      <div className="flex items-center gap-2 w-32">
                        <Slider
                          value={[timeout]}
                          onValueChange={(value) => setTimeout(value[0])}
                          max={60}
                          min={1}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground w-8">{timeout}s</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="follow-redirects">Follow Redirects</Label>
                      <Switch
                        id="follow-redirects"
                        checked={followRedirects}
                        onCheckedChange={setFollowRedirects}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="validate-ssl">Validate SSL</Label>
                      <Switch
                        id="validate-ssl"
                        checked={validateSSL}
                        onCheckedChange={setValidateSSL}
                      />
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="w-full"
                    >
                      {showAdvanced ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                      Advanced Settings
                    </Button>

                    {showAdvanced && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="error-simulation">Error Simulation</Label>
                          <Switch
                            id="error-simulation"
                            checked={errorSimulation}
                            onCheckedChange={setErrorSimulation}
                          />
                        </div>

                        {errorSimulation && (
                          <>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="error-rate">Error Rate (%)</Label>
                              <div className="flex items-center gap-2 w-32">
                                <Slider
                                  value={[simulatedErrorRate]}
                                  onValueChange={(value) => setSimulatedErrorRate(value[0])}
                                  max={50}
                                  min={0}
                                  step={5}
                                  className="flex-1"
                                />
                                <span className="text-sm text-muted-foreground w-8">{simulatedErrorRate}%</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <Label htmlFor="simulated-delay">Simulated Delay (ms)</Label>
                              <div className="flex items-center gap-2 w-32">
                                <Slider
                                  value={[simulatedDelay]}
                                  onValueChange={(value) => setSimulatedDelay(value[0])}
                                  max={2000}
                                  min={0}
                                  step={100}
                                  className="flex-1"
                                />
                                <span className="text-sm text-muted-foreground w-12">{simulatedDelay}ms</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Endpoint Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Select Endpoint
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {endpoints.map((endpoint, index) => (
                        <div
                          key={index}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedEndpoint === index
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-accent/50"
                          }`}
                          onClick={() => setSelectedEndpoint(index)}
                        >
                          <div className="flex items-center gap-3 mb-2">
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
                          </div>
                          <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                          {endpoint.auth && (
                            <div className="mt-2">
                              <Badge variant="outline" className="text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                {endpoint.auth.type}
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Request Body */}
              {endpoints[selectedEndpoint].body && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Request Body
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="min-h-[200px] font-mono text-sm"
                      placeholder="Enter JSON request body..."
                    />
                    <div className="mt-2 text-xs text-muted-foreground">
                      Schema: {JSON.stringify(endpoints[selectedEndpoint].body?.schema, null, 2)}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Execute Request */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Execute Request
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={executeRequest} 
                      disabled={isLoading}
                      className="flex-1"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {isLoading ? "Executing..." : "Send Request"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={addTestCase}
                      disabled={!currentTestSuite}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Test Suite
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Response */}
              {response && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        Response
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={
                            response.status < 200 ? 'bg-gray-100 text-gray-800' :
                            response.status < 300 ? 'bg-green-100 text-green-800' :
                            response.status < 400 ? 'bg-blue-100 text-blue-800' :
                            response.status < 500 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {response.status}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {response.time}ms
                        </Badge>
                        <Badge variant="outline">
                          {response.size} bytes
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {response.error && (
                      <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <AlertCircle className="w-4 h-4" />
                          <span className="font-medium">Error:</span>
                          <span>{response.error}</span>
                        </div>
                      </div>
                    )}
                    
                    {response.warnings && response.warnings.length > 0 && (
                      <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                          <AlertCircle className="w-4 h-4" />
                          <span className="font-medium">Warnings:</span>
                          <span>{response.warnings.join(", ")}</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Headers</h4>
                        <pre className="bg-muted/30 p-3 rounded text-xs overflow-x-auto">
                          {JSON.stringify(response.headers, null, 2)}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Body</h4>
                        <pre className="bg-muted/30 p-3 rounded text-xs overflow-x-auto max-h-96">
                          {JSON.stringify(response.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Code Examples */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Code Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="curl" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="php">PHP</TabsTrigger>
                    </TabsList>
                    
                    {["curl", "javascript", "python", "php"].map((lang) => (
                      <TabsContent key={lang} value={lang}>
                        <div className="relative">
                          <div className="absolute top-2 right-2 z-10">
                            <Button 
                              onClick={() => copyToClipboard(generateCodeExample(lang), lang)} 
                              variant="outline" 
                              size="sm"
                            >
                              {copiedCode === lang ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <pre className="bg-muted/30 p-4 rounded text-sm overflow-x-auto">
                            <code>{generateCodeExample(lang)}</code>
                          </pre>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Request History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {requestHistory.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No requests made yet</p>
                      <p className="text-sm">Make your first API request to see it here</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {requestHistory.map((req, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge 
                                className={
                                  req.status < 200 ? 'bg-gray-100 text-gray-800' :
                                  req.status < 300 ? 'bg-green-100 text-green-800' :
                                  req.status < 400 ? 'bg-blue-100 text-blue-800' :
                                  req.status < 500 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }
                              >
                                {req.status}
                              </Badge>
                              <span className="text-sm font-mono">{endpoints[selectedEndpoint].method} {endpoints[selectedEndpoint].path}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {req.time}ms
                              <span>•</span>
                              {req.size} bytes
                            </div>
                          </div>
                          {req.error && (
                            <div className="text-sm text-red-600 dark:text-red-400">
                              Error: {req.error}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="test-suites" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TestTube className="w-5 h-5" />
                      Test Suites
                    </div>
                    <div className="flex items-center gap-2">
                      <Button onClick={createTestSuite} variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        New Suite
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {testSuites.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <TestTube className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No test suites created yet</p>
                      <p className="text-sm">Create a test suite to organize your API tests</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {testSuites.map((suite) => (
                        <div key={suite.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold">{suite.name}</h3>
                              <p className="text-sm text-muted-foreground">{suite.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {suite.results && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Badge variant="outline">
                                    <Check className="w-3 h-3 mr-1" />
                                    {suite.results.passed} passed
                                  </Badge>
                                  <Badge variant="outline">
                                    <X className="w-3 h-3 mr-1" />
                                    {suite.results.failed} failed
                                  </Badge>
                                  <Badge variant="outline">
                                    <Timer className="w-3 h-3 mr-1" />
                                    {suite.results.duration}ms
                                  </Badge>
                                </div>
                              )}
                              <Button 
                                onClick={() => runTestSuite(suite.id)}
                                size="sm"
                                disabled={suite.tests.length === 0}
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Run
                              </Button>
                              <Button 
                                onClick={() => exportTestSuite(suite.id)}
                                variant="outline"
                                size="sm"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {suite.tests.map((test) => (
                              <div key={test.id} className="p-2 bg-muted/30 rounded text-sm">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{test.method}</Badge>
                                  <span className="font-mono">{test.url}</span>
                                  {test.expectedStatus && (
                                    <Badge variant="outline">Expected: {test.expectedStatus}</Badge>
                                  )}
                                </div>
                                {test.description && (
                                  <p className="text-muted-foreground mt-1">{test.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {suite.tests.length === 0 && (
                            <div className="text-center py-4 text-muted-foreground">
                              <p className="text-sm">No tests in this suite</p>
                              <p className="text-xs">Add tests from the API Tester tab</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performanceMetrics.totalRequests}</div>
                    <p className="text-xs text-muted-foreground">All time</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Average Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.round(performanceMetrics.averageResponseTime)}ms</div>
                    <p className="text-xs text-muted-foreground">Last {performanceMetrics.totalRequests} requests</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.round(performanceMetrics.successRate)}%</div>
                    <p className="text-xs text-muted-foreground">HTTP 2xx responses</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Error Count</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{performanceMetrics.errorCount}</div>
                    <p className="text-xs text-muted-foreground">HTTP 4xx/5xx responses</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Performance charts coming soon</p>
                    <p className="text-sm">Track response times and success rates over time</p>
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