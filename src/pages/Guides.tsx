import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Code2, 
  Zap, 
  ArrowRight,
  Play,
  Download,
  ExternalLink,
  FileText,
  Terminal,
  Database,
  Server,
  Globe,
  ArrowLeft
} from "lucide-react";

export const Guides = () => {
  const guides = [
    {
      title: "Getting Started with SDKs",
      description: "Learn how to generate SDKs for your API in multiple programming languages",
      icon: Code2,
      category: "SDK Generation",
      time: "5 min read",
      link: "/sdk-generator"
    },
    {
      title: "Building MCP Servers",
      description: "Create Model-Compatible Protocol servers for AI agents",
      icon: Server,
      category: "MCP Development",
      time: "10 min read",
      link: "/mcp-generator"
    },
    {
      title: "OpenAPI Specification Guide",
      description: "Master the art of writing comprehensive OpenAPI specs",
      icon: FileText,
      category: "API Design",
      time: "15 min read",
      link: "/editor"
    },
    {
      title: "Terraform Provider Creation",
      description: "Generate Terraform providers from your API specifications",
      icon: Database,
      category: "Infrastructure",
      time: "12 min read",
      link: "/terraform-generator"
    },
    {
      title: "API Documentation Best Practices",
      description: "Create beautiful, comprehensive API documentation",
      icon: BookOpen,
      category: "Documentation",
      time: "8 min read",
      link: "/docs-generator"
    },
    {
      title: "Testing Your APIs",
      description: "Comprehensive guide to API testing and validation",
      icon: Terminal,
      category: "Testing",
      time: "7 min read",
      link: "/api-tester"
    }
  ];

  const examples = [
    {
      title: "E-commerce API SDK",
      description: "Complete example of generating SDKs for an e-commerce API",
      language: "TypeScript",
      link: "/sdk-generator?example=ecommerce"
    },
    {
      title: "Weather Service MCP",
      description: "Real-world MCP server for weather data integration",
      language: "Python",
      link: "/mcp-generator?example=weather"
    },
    {
      title: "Payment Gateway Provider",
      description: "Terraform provider for payment gateway management",
      language: "Go",
      link: "/terraform-generator?example=payment"
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
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">GUIDES</span>
              Build faster. Ship smarter
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight">
              Guides & Examples
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to build exceptional APIs with writeasy. From quick start guides to advanced examples.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/login'}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Building
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

      {/* Guides Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Step-by-step guides
              </h2>
              <p className="text-lg text-muted-foreground">
                Learn how to build APIs that both humans and AI agents can consume
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <guide.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {guide.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{guide.time}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.location.href = guide.link}
                      >
                        Read Guide
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
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
                Real-world examples
              </h2>
              <p className="text-lg text-muted-foreground">
                See how others are building AI-native APIs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {examples.map((example, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-xs">
                        {example.language}
                      </Badge>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{example.description}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.location.href = example.link}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      View Example
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
              Ready to start building?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers building AI-native APIs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/login'}
              >
                <Zap className="w-4 h-4 mr-2" />
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/guides'}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse All Guides
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guides;
