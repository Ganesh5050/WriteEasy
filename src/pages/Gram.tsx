import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Hexagon, 
  Zap, 
  Server, 
  Code2, 
  Play, 
  Download, 
  CheckCircle, 
  ArrowRight,
  Globe,
  Shield,
  Clock,
  Users,
  Upload,
  ArrowLeft
} from "lucide-react";

export const Gram = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Back Button */}
      <div className="container mx-auto px-6 pt-20">
        <div className="max-w-4xl mx-auto mb-8">
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
      </div>
      
      {/* Hero Section */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">GRAM</span>
              Hosted MCP Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight">
              Build MCP faster with Gram
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Gram is our hosted MCP platform that makes it easy to create, deploy, and manage Model-Compatible Protocol servers without infrastructure complexity.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-base px-8 py-6">
                <Play className="w-4 h-4 mr-2" />
                Start Building
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6">
                <Globe className="w-4 h-4 mr-2" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Why choose Gram?
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to build and deploy MCP servers at scale
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Instant Deployment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Deploy your MCP servers instantly with zero configuration. No Docker, no Kubernetes, no DevOps required.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Enterprise Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Built-in authentication, rate limiting, and monitoring. SOC2 compliant with enterprise-grade security.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Auto-scaling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automatically scale your MCP servers based on demand. Pay only for what you use with transparent pricing.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Code Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Generate MCP server code from your OpenAPI specs. Support for multiple languages and frameworks.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Real-time Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Monitor your MCP servers with real-time metrics, logs, and alerts. Debug issues before they impact users.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Collaborate with your team on MCP server development. Version control, code reviews, and deployment pipelines.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Get started in minutes
              </h2>
              <p className="text-lg text-muted-foreground">
                Deploy your first MCP server with Gram
              </p>
            </div>
            
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload">Upload Spec</TabsTrigger>
                <TabsTrigger value="generate">Generate MCP</TabsTrigger>
                <TabsTrigger value="deploy">Deploy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>1. Upload your OpenAPI specification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="api-spec">API Specification</Label>
                        <Input
                          id="api-spec"
                          placeholder="Paste your OpenAPI spec URL or upload a file"
                        />
                      </div>
                      <Button className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Specification
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="generate" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>2. Generate MCP server code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-black rounded-lg p-4">
                        <pre className="text-green-400 text-sm">
                          <code>{`{
  "name": "my-api-server",
  "version": "1.0.0",
  "description": "Generated MCP Server",
  "tools": [
    {
      "name": "get_users",
      "description": "Get all users",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    }
  ]
}`}</code>
                        </pre>
                      </div>
                      <Button className="w-full">
                        <Code2 className="w-4 h-4 mr-2" />
                        Generate MCP Server
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="deploy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>3. Deploy to Gram</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>MCP server generated successfully</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Deployed to Gram platform</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Server is live and ready</span>
                      </div>
                      <Button className="w-full">
                        <Globe className="w-4 h-4 mr-2" />
                        View Live Server
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
              Ready to build with Gram?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start building your MCP servers today with our hosted platform
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-base px-8 py-6">
                <ArrowRight className="w-4 h-4 mr-2" />
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6">
                <Download className="w-4 h-4 mr-2" />
                Download CLI
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gram;
