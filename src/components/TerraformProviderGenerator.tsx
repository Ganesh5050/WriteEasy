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
  Wrench, 
  Download, 
  Copy, 
  CheckCircle, 
  Play,
  Settings,
  Code2,
  FileText,
  Server,
  Cloud,
  ArrowLeft
} from "lucide-react";

export const TerraformProviderGenerator = () => {
  const [providerName, setProviderName] = useState("writeasy");
  const [providerVersion, setProviderVersion] = useState("1.0.0");
  const [baseUrl, setBaseUrl] = useState("https://api.example.com/v1");
  const [authType, setAuthType] = useState("bearer");
  const [selectedLanguage, setSelectedLanguage] = useState("go");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const languages = [
    { value: "go", label: "Go", extension: "go" },
    { value: "python", label: "Python", extension: "py" }
  ];

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const generateProviderSchema = () => {
    return `{
  "provider": {
    "${providerName}": {
      "version": "${providerVersion}",
      "source": "hashicorp/${providerName}",
      "configuration": {
        "base_url": "${baseUrl}",
        "auth_type": "${authType}"
      }
    }
  },
  "resources": {
    "${providerName}_user": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "The ID of the user"
        },
        "name": {
          "type": "string",
          "description": "The name of the user",
          "required": true
        },
        "email": {
          "type": "string",
          "description": "The email of the user",
          "required": true
        }
      },
      "required": ["name", "email"]
    }
  },
  "data_sources": {
    "${providerName}_users": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {"type": "string"},
          "name": {"type": "string"},
          "email": {"type": "string"}
        }
      }
    }
  }
}`;
  };

  const generateGoProvider = () => {
    return `package main

import (
    "context"
    "fmt"
    "net/http"
    "time"

    "github.com/hashicorp/terraform-plugin-sdk/v2/diag"
    "github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema"
    "github.com/hashicorp/terraform-plugin-sdk/v2/plugin"
)

// Provider returns a terraform provider
func Provider() *schema.Provider {
    return &schema.Provider{
        Schema: map[string]*schema.Schema{
            "base_url": {
                Type:        schema.TypeString,
                Required:    true,
                DefaultFunc: schema.EnvDefaultFunc("${providerName.toUpperCase()}_BASE_URL", "${baseUrl}"),
                Description: "The base URL for the API",
            },
            "api_key": {
                Type:        schema.TypeString,
                Required:    true,
                Sensitive:   true,
                DefaultFunc: schema.EnvDefaultFunc("${providerName.toUpperCase()}_API_KEY", nil),
                Description: "The API key for authentication",
            },
        },
        ResourcesMap: map[string]*schema.Resource{
            "${providerName}_user": resourceUser(),
        },
        DataSourcesMap: map[string]*schema.Resource{
            "${providerName}_users": dataSourceUsers(),
        },
        ConfigureContextFunc: providerConfigure,
    }
}

func providerConfigure(ctx context.Context, d *schema.ResourceData) (interface{}, diag.Diagnostics) {
    baseURL := d.Get("base_url").(string)
    apiKey := d.Get("api_key").(string)

    client := &APIClient{
        BaseURL: baseURL,
        APIKey:  apiKey,
        HTTPClient: &http.Client{
            Timeout: 30 * time.Second,
        },
    }

    return client, nil
}

type APIClient struct {
    BaseURL    string
    APIKey     string
    HTTPClient *http.Client
}

func (c *APIClient) makeRequest(method, endpoint string, data interface{}) (*http.Response, error) {
    url := c.BaseURL + endpoint
    req, err := http.NewRequest(method, url, nil)
    if err != nil {
        return nil, err
    }

    req.Header.Set("Authorization", "Bearer "+c.APIKey)
    req.Header.Set("Content-Type", "application/json")

    return c.HTTPClient.Do(req)
}

func resourceUser() *schema.Resource {
    return &schema.Resource{
        CreateContext: resourceUserCreate,
        ReadContext:   resourceUserRead,
        UpdateContext: resourceUserUpdate,
        DeleteContext: resourceUserDelete,
        Schema: map[string]*schema.Schema{
            "id": {
                Type:     schema.TypeString,
                Computed: true,
            },
            "name": {
                Type:        schema.TypeString,
                Required:    true,
                Description: "The name of the user",
            },
            "email": {
                Type:        schema.TypeString,
                Required:    true,
                Description: "The email of the user",
            },
        },
    }
}

func resourceUserCreate(ctx context.Context, d *schema.ResourceData, m interface{}) diag.Diagnostics {
    client := m.(*APIClient)

    name := d.Get("name").(string)
    email := d.Get("email").(string)

    // Create user via API
    resp, err := client.makeRequest("POST", "/users", map[string]string{
        "name":  name,
        "email": email,
    })
    if err != nil {
        return diag.FromErr(err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusCreated {
        return diag.Errorf("Failed to create user: %s", resp.Status)
    }

    // For this example, we'll use a generated ID
    // In a real implementation, you'd parse the response
    d.SetId(fmt.Sprintf("user-%d", time.Now().Unix()))

    return resourceUserRead(ctx, d, m)
}

func resourceUserRead(ctx context.Context, d *schema.ResourceData, m interface{}) diag.Diagnostics {
    client := m.(*APIClient)

    userID := d.Id()
    resp, err := client.makeRequest("GET", "/users/"+userID, nil)
    if err != nil {
        return diag.FromErr(err)
    }
    defer resp.Body.Close()

    if resp.StatusCode == http.StatusNotFound {
        d.SetId("")
        return nil
    }

    if resp.StatusCode != http.StatusOK {
        return diag.Errorf("Failed to read user: %s", resp.Status)
    }

    // Parse response and set attributes
    // This is simplified - in reality you'd parse JSON
    d.Set("name", d.Get("name"))
    d.Set("email", d.Get("email"))

    return nil
}

func resourceUserUpdate(ctx context.Context, d *schema.ResourceData, m interface{}) diag.Diagnostics {
    client := m.(*APIClient)

    userID := d.Id()
    name := d.Get("name").(string)
    email := d.Get("email").(string)

    resp, err := client.makeRequest("PUT", "/users/"+userID, map[string]string{
        "name":  name,
        "email": email,
    })
    if err != nil {
        return diag.FromErr(err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return diag.Errorf("Failed to update user: %s", resp.Status)
    }

    return resourceUserRead(ctx, d, m)
}

func resourceUserDelete(ctx context.Context, d *schema.ResourceData, m interface{}) diag.Diagnostics {
    client := m.(*APIClient)

    userID := d.Id()
    resp, err := client.makeRequest("DELETE", "/users/"+userID, nil)
    if err != nil {
        return diag.FromErr(err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusNoContent && resp.StatusCode != http.StatusNotFound {
        return diag.Errorf("Failed to delete user: %s", resp.Status)
    }

    d.SetId("")
    return nil
}

func dataSourceUsers() *schema.Resource {
    return &schema.Resource{
        ReadContext: dataSourceUsersRead,
        Schema: map[string]*schema.Schema{
            "users": {
                Type:     schema.TypeList,
                Computed: true,
                Elem: &schema.Resource{
                    Schema: map[string]*schema.Schema{
                        "id": {
                            Type:     schema.TypeString,
                            Computed: true,
                        },
                        "name": {
                            Type:     schema.TypeString,
                            Computed: true,
                        },
                        "email": {
                            Type:     schema.TypeString,
                            Computed: true,
                        },
                    },
                },
            },
        },
    }
}

func dataSourceUsersRead(ctx context.Context, d *schema.ResourceData, m interface{}) diag.Diagnostics {
    client := m.(*APIClient)

    resp, err := client.makeRequest("GET", "/users", nil)
    if err != nil {
        return diag.FromErr(err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return diag.Errorf("Failed to read users: %s", resp.Status)
    }

    // Parse response and set users
    // This is simplified - in reality you'd parse JSON
    users := []map[string]interface{}{
        {
            "id":    "1",
            "name":  "John Doe",
            "email": "john@example.com",
        },
    }

    d.Set("users", users)
    d.SetId("users")

    return nil
}

func main() {
    plugin.Serve(&plugin.ServeOpts{
        ProviderFunc: Provider,
    })
}`;
  };

  const generatePythonProvider = () => {
    return `"""
${providerName} - Terraform Provider Implementation
Generated by writeasy
Version: ${providerVersion}
"""

import json
import requests
from typing import Dict, Any, List, Optional
from terraform_provider import TerraformProvider, Resource, DataSource

class ${providerName.replace('-', '_').replace(' ', '_').title()}Provider(TerraformProvider):
    def __init__(self):
        super().__init__()
        self.base_url = "${baseUrl}"
        self.api_key = None
        self.session = requests.Session()
    
    def configure(self, config: Dict[str, Any]) -> None:
        """Configure the provider with user settings"""
        self.base_url = config.get("base_url", self.base_url)
        self.api_key = config.get("api_key")
        
        if not self.api_key:
            raise ValueError("API key is required")
        
        self.session.headers.update({
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        })
    
    def make_request(self, method: str, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        """Make HTTP request to the API"""
        url = f"{self.base_url}{endpoint}"
        try:
            response = self.session.request(method, url, json=data)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            raise Exception(f"API request failed: {e}")

class UserResource(Resource):
    def __init__(self):
        super().__init__("${providerName}_user")
        self.schema = {
            "id": {"type": "string", "computed": True},
            "name": {"type": "string", "required": True, "description": "The name of the user"},
            "email": {"type": "string", "required": True, "description": "The email of the user"},
        }
    
    def create(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new user"""
        provider = self.get_provider()
        
        name = config["name"]
        email = config["email"]
        
        result = provider.make_request("POST", "/users", {
            "name": name,
            "email": email
        })
        
        return {
            "id": result.get("id", f"user-{int(time.time())}"),
            "name": name,
            "email": email
        }
    
    def read(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Read user data"""
        provider = self.get_provider()
        user_id = state["id"]
        
        try:
            result = provider.make_request("GET", f"/users/{user_id}")
            return {
                "id": result.get("id", user_id),
                "name": result.get("name", state.get("name")),
                "email": result.get("email", state.get("email"))
            }
        except Exception:
            # Resource not found
            return {}
    
    def update(self, state: Dict[str, Any], config: Dict[str, Any]) -> Dict[str, Any]:
        """Update user data"""
        provider = self.get_provider()
        user_id = state["id"]
        
        result = provider.make_request("PUT", f"/users/{user_id}", {
            "name": config["name"],
            "email": config["email"]
        })
        
        return {
            "id": user_id,
            "name": config["name"],
            "email": config["email"]
        }
    
    def delete(self, state: Dict[str, Any]) -> None:
        """Delete user"""
        provider = self.get_provider()
        user_id = state["id"]
        
        provider.make_request("DELETE", f"/users/{user_id}")

class UsersDataSource(DataSource):
    def __init__(self):
        super().__init__("${providerName}_users")
        self.schema = {
            "users": {
                "type": "list",
                "computed": True,
                "elem": {
                    "type": "object",
                    "schema": {
                        "id": {"type": "string"},
                        "name": {"type": "string"},
                        "email": {"type": "string"}
                    }
                }
            }
        }
    
    def read(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Read all users"""
        provider = self.get_provider()
        
        result = provider.make_request("GET", "/users")
        
        return {
            "users": result if isinstance(result, list) else []
        }

# Register the provider
provider = ${providerName.replace('-', '_').replace(' ', '_').title()}Provider()
provider.register_resource(UserResource())
provider.register_data_source(UsersDataSource())

if __name__ == "__main__":
    provider.run()`;
  };

  const generateTerraformExample = () => {
    return `# Configure the ${providerName} Provider
terraform {
  required_providers {
    ${providerName} = {
      source  = "hashicorp/${providerName}"
      version = "${providerVersion}"
    }
  }
}

provider "${providerName}" {
  base_url = "${baseUrl}"
  api_key  = var.api_key
}

# Create a user
resource "${providerName}_user" "example" {
  name  = "John Doe"
  email = "john@example.com"
}

# Data source to get all users
data "${providerName}_users" "all" {}

# Output the created user
output "user_id" {
  value = ${providerName}_user.example.id
}

output "user_name" {
  value = ${providerName}_user.example.name
}

output "all_users" {
  value = data.${providerName}_users.all.users
}`;
  };

  const getGeneratedCode = () => {
    switch (selectedLanguage) {
      case "go":
        return generateGoProvider();
      case "python":
        return generatePythonProvider();
      default:
        return generateGoProvider();
    }
  };

  const downloadProvider = () => {
    const schema = generateProviderSchema();
    const providerCode = getGeneratedCode();
    const example = generateTerraformExample();
    const language = languages.find(l => l.value === selectedLanguage);
    
    // Download the main provider file
    const blob = new Blob([providerCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${providerName}-provider.${language?.extension || 'go'}`;
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
            <h1 className="text-4xl font-serif font-normal mb-2">Terraform Provider Generator</h1>
            <p className="text-muted-foreground">Generate Terraform providers from your OpenAPI specifications for Infrastructure as Code</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Provider Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="provider-name">Provider Name</Label>
                    <Input
                      id="provider-name"
                      value={providerName}
                      onChange={(e) => setProviderName(e.target.value)}
                      placeholder="writeasy"
                    />
                  </div>

                  <div>
                    <Label htmlFor="provider-version">Version</Label>
                    <Input
                      id="provider-version"
                      value={providerVersion}
                      onChange={(e) => setProviderVersion(e.target.value)}
                      placeholder="1.0.0"
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
                    <Label htmlFor="auth-type">Authentication Type</Label>
                    <Select value={authType} onValueChange={setAuthType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bearer">Bearer Token</SelectItem>
                        <SelectItem value="api-key">API Key</SelectItem>
                        <SelectItem value="basic">Basic Auth</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Implementation Language</Label>
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

                  <div className="pt-4">
                    <Button onClick={downloadProvider} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Provider
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    Infrastructure Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Resource management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Data sources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>State management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Plan & Apply</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Import existing resources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Validation & Error handling</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Generated Code */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="schema" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="schema">Provider Schema</TabsTrigger>
                  <TabsTrigger value="provider">Provider Code</TabsTrigger>
                  <TabsTrigger value="example">Terraform Example</TabsTrigger>
                </TabsList>

                <TabsContent value="schema" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Provider Schema Definition
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generateProviderSchema(), "schema")}
                        >
                          {copiedCode === "schema" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black rounded-lg p-4 overflow-x-auto">
                        <pre className="text-purple-400 text-sm font-mono">
                          <code>{generateProviderSchema()}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="provider" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-5 h-5" />
                          {languages.find(l => l.value === selectedLanguage)?.label} Provider Implementation
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(getGeneratedCode(), "provider")}
                        >
                          {copiedCode === "provider" ? (
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
                          <code>{getGeneratedCode()}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="example" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Play className="w-5 h-5" />
                          Terraform Usage Example
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generateTerraformExample(), "example")}
                        >
                          {copiedCode === "example" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black rounded-lg p-4 overflow-x-auto">
                        <pre className="text-orange-400 text-sm font-mono">
                          <code>{generateTerraformExample()}</code>
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
