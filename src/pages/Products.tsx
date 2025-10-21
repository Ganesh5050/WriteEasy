import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Code, Zap, Shield, Globe, Bot, Wrench, Play, Copy, CheckCircle, FileText, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const pythonExample = `from writeasy import WriteEasyClient

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

  const javascriptExample = `import { WriteEasyClient } from 'writeasy';

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

  const mcpExample = `{
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
          }
        }
      }
    }
  ]
}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium animate-stagger-1">
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">PRODUCTS</span>
              AI-Native API Development Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight animate-stagger-2">
              Build APIs that AI agents understand
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-stagger-3">
              Transform your OpenAPI specs into SDKs, MCP servers, and Terraform providers. Make your APIs AI-native and developer-friendly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-stagger-4">
              <Button size="lg" className="text-base px-8 py-6 bg-foreground text-background hover:bg-foreground/90 font-medium">
                Start building
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 font-medium border-2">
                View documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 animate-stagger-1">
                AI-Native Product Suite
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-stagger-2">
                Everything you need to design, develop, and distribute AI-compatible APIs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* OpenAPI Editor */}
              <div className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow animate-stagger-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">OpenAPI Editor</h3>
                <p className="text-muted-foreground mb-4">
                  Design and edit OpenAPI specifications with our intuitive editor. Real-time validation and collaboration features.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
                  <Link to="/editor">
                    Try OpenAPI Editor <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* SDK Generator */}
              <div className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow animate-stagger-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">SDK Generator</h3>
                <p className="text-muted-foreground mb-4">
                  Generate type-safe SDKs in 8+ languages from your OpenAPI spec. Production-ready and fully customizable.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
                  <Link to="/sdk-generator">
                    Generate SDK <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* MCP Servers */}
              <div className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow animate-stagger-5">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">MCP Server Generator</h3>
                <p className="text-muted-foreground mb-4">
                  Transform your APIs into MCP servers for AI platforms. Works with Claude, Cursor, and other AI tools.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
                  <Link to="/mcp-generator">
                    Generate MCP Server <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Documentation */}
              <div className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow animate-stagger-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Documentation</h3>
                <p className="text-muted-foreground mb-4">
                  Generate beautiful, interactive API documentation. SEO-friendly and optimized for both humans and AI.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-medium">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Terraform Providers */}
              <div className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow animate-stagger-1">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Wrench className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Terraform Provider Generator</h3>
                <p className="text-muted-foreground mb-4">
                  Generate Terraform providers from your OpenAPI spec. Infrastructure as code made simple.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
                  <Link to="/terraform-generator">
                    Generate Provider <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Documentation Generator */}
              <div className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow animate-stagger-2">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Documentation Generator</h3>
                <p className="text-muted-foreground mb-4">
                  Create beautiful, interactive API documentation with multiple themes and templates.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
                  <Link to="/docs-generator">
                    Generate Docs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Project Dashboard */}
              <div className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow animate-stagger-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Project Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  Monitor your API projects, track performance, and manage deployments.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
                  <Link to="/dashboard">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* API Testing */}
              <div className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow animate-stagger-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">API Testing Console</h3>
                <p className="text-muted-foreground mb-4">
                  Test your APIs with real-time requests, responses, and code examples.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
                  <Link to="/api-tester">
                    Test APIs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Generation Demo */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-serif font-normal mb-6 animate-stagger-1">
                See SDK Generation in Action
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-stagger-2">
                Watch how your OpenAPI spec transforms into production-ready SDKs
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Input Side */}
              <div className="space-y-6">
                <Card className="animate-stagger-3">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Your OpenAPI Spec
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm font-mono">
                        <code>{`openapi: 3.0.0
info:
  title: AI Chat API
  version: 1.0.0
paths:
  /chat/completions:
    post:
      summary: Create a chat completion
      requestBody:
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
                      role: { type: string }
                      content: { type: string }`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center justify-center animate-stagger-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">writeeasy generates SDKs</span>
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Output Side */}
              <div className="space-y-6">
                <Tabs defaultValue="python" className="w-full animate-stagger-5">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="python">Python SDK</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript SDK</TabsTrigger>
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
                            onClick={() => copyToClipboard(pythonExample, "python")}
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
                            <code>{pythonExample}</code>
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
                            onClick={() => copyToClipboard(javascriptExample, "javascript")}
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
                            <code>{javascriptExample}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Type-safe</Badge>
                  <Badge variant="secondary">Auto-generated</Badge>
                  <Badge variant="secondary">Production-ready</Badge>
                  <Badge variant="secondary">AI-compatible</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Server Demo */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-serif font-normal mb-6">
                MCP Server Generation
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Convert your APIs into tools that AI agents can use natively
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      Generated MCP Server Config
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black rounded-lg p-4 overflow-x-auto">
                      <pre className="text-purple-400 text-sm font-mono">
                        <code>{mcpExample}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      AI Agent Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">GPT-4 Usage:</h4>
                      <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 text-sm">
                        "I can now use your Chat API directly through the MCP server. Let me create a completion for you."
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Claude Usage:</h4>
                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-sm">
                        "I'll analyze your chat logs using the MCP server integration."
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-6">
              Ready to build better APIs?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers building exceptional API experiences
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6 bg-foreground text-background hover:bg-foreground/90 font-medium"
                onClick={() => window.location.href = '/login'}
              >
                Get started free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6 font-medium border-2"
                onClick={() => window.location.href = '/demo'}
              >
                Book a demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;