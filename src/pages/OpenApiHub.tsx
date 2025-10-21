import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  FileText, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Download,
  Upload,
  Play,
  Globe,
  BookOpen,
  Lightbulb,
  Target,
  Shield,
  Clock,
  ArrowLeft
} from "lucide-react";

export const OpenApiHub = () => {
  const features = [
    {
      title: "Specification Editor",
      description: "Visual editor for creating and editing OpenAPI specifications",
      icon: FileText,
      benefits: ["Syntax highlighting", "Real-time validation", "Auto-completion", "Error detection"]
    },
    {
      title: "Code Generation",
      description: "Generate SDKs, servers, and clients from your OpenAPI spec",
      icon: Code,
      benefits: ["Multiple languages", "Framework support", "Custom templates", "Batch generation"]
    },
    {
      title: "Documentation",
      description: "Auto-generate beautiful API documentation",
      icon: BookOpen,
      benefits: ["Interactive docs", "Try-it-out features", "Custom themes", "Export options"]
    },
    {
      title: "Validation",
      description: "Validate your OpenAPI specifications against standards",
      icon: Shield,
      benefits: ["Syntax validation", "Semantic checks", "Best practices", "Compliance testing"]
    },
    {
      title: "Testing",
      description: "Test your API endpoints directly from the specification",
      icon: Play,
      benefits: ["Mock servers", "Contract testing", "Performance testing", "Integration tests"]
    },
    {
      title: "Collaboration",
      description: "Share and collaborate on API specifications with your team",
      icon: Globe,
      benefits: ["Version control", "Comments", "Reviews", "Team sharing"]
    }
  ];

  const languages = [
    { name: "Python", icon: "🐍", description: "FastAPI, Flask, Django" },
    { name: "JavaScript", icon: "🟨", description: "Express, Fastify, Koa" },
    { name: "TypeScript", icon: "🔷", description: "NestJS, Express, Fastify" },
    { name: "Go", icon: "🐹", description: "Gin, Echo, Fiber" },
    { name: "Java", icon: "☕", description: "Spring Boot, Quarkus" },
    { name: "C#", icon: "🔷", description: "ASP.NET Core, Minimal APIs" },
    { name: "PHP", icon: "🐘", description: "Laravel, Symfony" },
    { name: "Ruby", icon: "💎", description: "Rails, Sinatra" },
    { name: "Rust", icon: "🦀", description: "Axum, Warp, Actix" },
    { name: "Kotlin", icon: "🟣", description: "Ktor, Spring Boot" },
    { name: "Swift", icon: "🦉", description: "Vapor, Perfect" },
    { name: "Dart", icon: "🎯", description: "Shelf, Angel" }
  ];

  const examples = [
    {
      title: "E-commerce API",
      description: "Complete OpenAPI spec for an e-commerce platform",
      endpoints: 25,
      complexity: "Advanced",
      link: "/openapi-editor?example=ecommerce"
    },
    {
      title: "Weather Service",
      description: "Simple weather API with real-time data",
      endpoints: 8,
      complexity: "Beginner",
      link: "/openapi-editor?example=weather"
    },
    {
      title: "Payment Gateway",
      description: "Payment processing API with webhooks",
      endpoints: 15,
      complexity: "Intermediate",
      link: "/openapi-editor?example=payment"
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
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">OPENAPI HUB</span>
              OpenAPI, demystified
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight">
              OpenAPI Hub
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to work with OpenAPI specifications. From creation to code generation, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/openapi-editor'}
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Specification
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/openapi-editor'}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Existing Spec
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
                Complete toolkit for OpenAPI specification development
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

      {/* Languages Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Supported Languages
              </h2>
              <p className="text-lg text-muted-foreground">
                Generate code in 12+ programming languages
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {languages.map((lang, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{lang.icon}</div>
                    <h3 className="font-semibold text-lg mb-1">{lang.name}</h3>
                    <p className="text-sm text-muted-foreground">{lang.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Example Specifications
              </h2>
              <p className="text-lg text-muted-foreground">
                Learn from real-world OpenAPI specifications
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {examples.map((example, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-xs">
                        {example.complexity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {example.endpoints} endpoints
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
                      <Globe className="w-4 h-4 mr-2" />
                      View Specification
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
                Choose your starting point
              </p>
            </div>
            
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="generator">Generator</TabsTrigger>
                <TabsTrigger value="docs">Documentation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      OpenAPI Editor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Create and edit OpenAPI specifications with our visual editor.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = '/openapi-editor'}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Open Editor
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="generator" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      SDK Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Generate SDKs in multiple languages from your OpenAPI spec.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = '/sdk-generator'}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      Generate SDKs
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="docs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Documentation Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Generate beautiful API documentation from your OpenAPI spec.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = '/docs-generator'}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Generate Docs
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
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers using OpenAPI specifications
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/openapi-editor'}
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Your First Spec
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

export default OpenApiHub;
