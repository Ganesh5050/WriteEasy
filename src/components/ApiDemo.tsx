import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Play, CheckCircle, Code2, Bot, Wrench } from "lucide-react";

export const ApiDemo = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const openApiSpec = `openapi: 3.0.0
info:
  title: AI Chat API
  version: 1.0.0
  description: API for AI-powered chat functionality
paths:
  /chat/completions:
    post:
      summary: Create a chat completion
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                messages:
                  type: array
                  items:
                    type: object
                    properties:
                      role:
                        type: string
                        enum: [user, assistant, system]
                      content:
                        type: string
                model:
                  type: string
                  default: gpt-4
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  choices:
                    type: array
                    items:
                      type: object
                      properties:
                        message:
                          type: object
                          properties:
                            content:
                              type: string`;

  const pythonSdk = `from writeasy import WriteEasyClient

# Initialize the client
client = WriteEasyClient(api_key="your-api-key")

# Create a chat completion
response = client.chat.completions.create(
    messages=[
        {"role": "user", "content": "Hello, how are you?"}
    ],
    model="gpt-4"
)

print(response.choices[0].message.content)`;

  const javascriptSdk = `import { WriteEasyClient } from 'writeasy';

const client = new WriteEasyClient({
  apiKey: 'your-api-key'
});

// Create a chat completion
const response = await client.chat.completions.create({
  messages: [
    { role: 'user', content: 'Hello, how are you?' }
  ],
  model: 'gpt-4'
});

console.log(response.choices[0].message.content);`;

  const mcpServer = `# MCP Server Configuration
{
  "name": "ai-chat-server",
  "version": "1.0.0",
  "description": "AI Chat API MCP Server",
  "tools": [
    {
      "name": "create_chat_completion",
      "description": "Create a chat completion with AI",
      "inputSchema": {
        "type": "object",
        "properties": {
          "messages": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "role": {"type": "string"},
                "content": {"type": "string"}
              }
            }
          },
          "model": {"type": "string", "default": "gpt-4"}
        },
        "required": ["messages"]
      }
    }
  ]
}`;

  const terraformProvider = `resource "writeeasy_chat_completion" "example" {
  messages = [
    {
      role    = "user"
      content = "Hello, how are you?"
    }
  ]
  model = "gpt-4"
}

output "completion_id" {
  value = writeeasy_chat_completion.example.id
}`;

  return (
    <section className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-normal mb-6">
              From OpenAPI to Production
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how your OpenAPI spec transforms into SDKs, MCP servers, and Terraform providers
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Input Side */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Your OpenAPI Spec
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono">
                      <code>{openApiSpec}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Play className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">writeeasy processes your spec</span>
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className="space-y-6">
              <Tabs defaultValue="python" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="mcp">MCP Server</TabsTrigger>
                  <TabsTrigger value="terraform">Terraform</TabsTrigger>
                </TabsList>

                <TabsContent value="python" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bot className="w-5 h-5" />
                          Generated Python SDK
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(pythonSdk, "python")}
                        >
                          {copiedCode === "python" ? (
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
                          <code>{pythonSdk}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="javascript" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bot className="w-5 h-5" />
                          Generated JavaScript SDK
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(javascriptSdk, "javascript")}
                        >
                          {copiedCode === "javascript" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black rounded-lg p-4 overflow-x-auto">
                        <pre className="text-yellow-400 text-sm font-mono">
                          <code>{javascriptSdk}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="mcp" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bot className="w-5 h-5" />
                          Generated MCP Server
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(mcpServer, "mcp")}
                        >
                          {copiedCode === "mcp" ? (
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
                          <code>{mcpServer}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="terraform" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wrench className="w-5 h-5" />
                          Generated Terraform Provider
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(terraformProvider, "terraform")}
                        >
                          {copiedCode === "terraform" ? (
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
                          <code>{terraformProvider}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">Type-safe</Badge>
                <Badge variant="secondary">Auto-generated</Badge>
                <Badge variant="secondary">AI-compatible</Badge>
                <Badge variant="secondary">Production-ready</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
