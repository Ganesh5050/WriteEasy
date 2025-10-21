import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Server, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Download,
  Play,
  Globe,
  Code2,
  Shield,
  Clock,
  Users,
  Brain,
  Cpu,
  Database,
  MessageSquare,
  Lightbulb,
  Target,
  ArrowLeft
} from "lucide-react";

export const McpHub = () => {
  const features = [
    {
      title: "MCP Server Generation",
      description: "Generate MCP servers from your OpenAPI specifications",
      icon: Server,
      benefits: ["Auto-generated tools", "Multiple languages", "Type safety", "Error handling"]
    },
    {
      title: "Hosted MCP Platform",
      description: "Deploy and manage MCP servers with Gram",
      icon: Globe,
      benefits: ["Zero configuration", "Auto-scaling", "Monitoring", "Team collaboration"]
    },
    {
      title: "AI Agent Integration",
      description: "Connect AI agents to your tools and services",
      icon: Bot,
      benefits: ["Claude integration", "GPT compatibility", "Custom agents", "Tool discovery"]
    },
    {
      title: "Tool Development",
      description: "Build custom tools for AI agents",
      icon: Code2,
      benefits: ["Rich tool schemas", "Async operations", "File handling", "Streaming support"]
    },
    {
      title: "Security & Auth",
      description: "Secure your MCP servers with proper authentication",
      icon: Shield,
      benefits: ["API key auth", "OAuth support", "Rate limiting", "Access control"]
    },
    {
      title: "Monitoring & Analytics",
      description: "Monitor your MCP servers and track usage",
      icon: Target,
      benefits: ["Real-time metrics", "Usage analytics", "Error tracking", "Performance monitoring"]
    }
  ];

  const examples = [
    {
      title: "Weather Service MCP",
      description: "Get weather data for any location",
      tools: 3,
      language: "Python",
      link: "/mcp-generator?example=weather"
    },
    {
      title: "Database Query MCP",
      description: "Execute SQL queries safely",
      tools: 5,
      language: "TypeScript",
      link: "/mcp-generator?example=database"
    },
    {
      title: "File Management MCP",
      description: "Upload, download, and manage files",
      tools: 8,
      language: "Go",
      link: "/mcp-generator?example=files"
    },
    {
      title: "Email Service MCP",
      description: "Send and manage emails",
      tools: 4,
      language: "Python",
      link: "/mcp-generator?example=email"
    },
    {
      title: "Calendar Integration MCP",
      description: "Manage calendar events and schedules",
      tools: 6,
      language: "JavaScript",
      link: "/mcp-generator?example=calendar"
    },
    {
      title: "Payment Processing MCP",
      description: "Process payments and manage transactions",
      tools: 7,
      language: "TypeScript",
      link: "/mcp-generator?example=payment"
    }
  ];

  const tutorials = [
    {
      title: "Getting Started with MCP",
      description: "Learn the basics of Model-Compatible Protocol",
      duration: "10 min",
      difficulty: "Beginner",
      link: "/guides"
    },
    {
      title: "Building Your First MCP Server",
      description: "Create a simple MCP server from scratch",
      duration: "20 min",
      difficulty: "Intermediate",
      link: "/guides"
    },
    {
      title: "Advanced MCP Patterns",
      description: "Learn advanced patterns and best practices",
      duration: "30 min",
      difficulty: "Advanced",
      link: "/guides"
    }
  ];

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
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">MCP HUB</span>
              Connect agents to tools
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight">
              MCP Hub
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Build and deploy Model-Compatible Protocol servers that connect AI agents to your tools and services.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/mcp-generator'}
              >
                <Server className="w-4 h-4 mr-2" />
                Build MCP Server
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/gram'}
              >
                <Globe className="w-4 h-4 mr-2" />
                Deploy with Gram
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
                Everything you need
              </h2>
              <p className="text-lg text-muted-foreground">
                Complete toolkit for MCP server development and deployment
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Example MCP Servers
              </h2>
              <p className="text-lg text-muted-foreground">
                Learn from real-world MCP server implementations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples.map((example, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-xs">
                        {example.language}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {example.tools} tools
                      </span>
                    </div>
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{example.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = example.link}
                    >
                      <Code2 className="w-4 h-4 mr-2" />
                      View Source
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Learn MCP Development
              </h2>
              <p className="text-lg text-muted-foreground">
                Step-by-step tutorials to get you started
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {tutorials.map((tutorial, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {tutorial.difficulty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {tutorial.duration}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = tutorial.link}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Tutorial
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Get Started
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose your development path
              </p>
            </div>
            
            <Tabs defaultValue="generator" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="generator">Generator</TabsTrigger>
                <TabsTrigger value="hosted">Hosted</TabsTrigger>
                <TabsTrigger value="docs">Documentation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="generator" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="w-5 h-5" />
                      MCP Server Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Generate MCP servers from your OpenAPI specifications.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = '/mcp-generator'}
                    >
                      <Server className="w-4 h-4 mr-2" />
                      Generate MCP Server
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="hosted" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Gram (Hosted MCP)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Deploy and manage MCP servers with our hosted platform.
                    </p>
                    <Button className="w-full" asChild>
                      <a href="/gram">
                        <Globe className="w-4 h-4 mr-2" />
                        Deploy with Gram
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="docs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      MCP Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Learn about MCP protocol and best practices.
                    </p>
                    <Button className="w-full" asChild>
                      <a href="/docs">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Read Documentation
                      </a>
                    </Button>
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
              Ready to build MCP servers?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Connect AI agents to your tools and services
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/mcp-generator'}
              >
                <Server className="w-4 h-4 mr-2" />
                Build Your First MCP Server
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/guides'}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Examples
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default McpHub;
