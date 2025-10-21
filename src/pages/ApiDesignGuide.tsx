import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PenTool, 
  Code2, 
  Zap, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Shield,
  Clock,
  Users,
  Globe,
  ArrowLeft
} from "lucide-react";

export const ApiDesignGuide = () => {
  const principles = [
    {
      title: "RESTful Design",
      description: "Follow REST conventions for predictable and intuitive APIs",
      icon: Globe,
      examples: ["Use HTTP methods correctly", "Design resource-based URLs", "Return appropriate status codes"]
    },
    {
      title: "Consistent Naming",
      description: "Use consistent naming conventions across your API",
      icon: Target,
      examples: ["Use snake_case for URLs", "Use camelCase for JSON", "Use plural nouns for collections"]
    },
    {
      title: "Versioning Strategy",
      description: "Plan for API evolution with proper versioning",
      icon: Clock,
      examples: ["Use URL versioning (/v1/)", "Include version in headers", "Maintain backward compatibility"]
    },
    {
      title: "Error Handling",
      description: "Provide clear, actionable error messages",
      icon: AlertCircle,
      examples: ["Use standard HTTP status codes", "Include error details", "Provide troubleshooting guidance"]
    },
    {
      title: "Authentication",
      description: "Secure your API with proper authentication",
      icon: Shield,
      examples: ["Use OAuth 2.0", "Implement API keys", "Support JWT tokens"]
    },
    {
      title: "Rate Limiting",
      description: "Protect your API with appropriate rate limits",
      icon: Users,
      examples: ["Set reasonable limits", "Include rate limit headers", "Provide clear error messages"]
    }
  ];

  const bestPractices = [
    {
      title: "Use OpenAPI Specification",
      description: "Document your API with OpenAPI 3.0 specification",
      code: `openapi: 3.0.0
info:
  title: My API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get all users
      responses:
        '200':
          description: List of users`
    },
    {
      title: "Design for AI Consumption",
      description: "Make your API AI-friendly with clear descriptions",
      code: `paths:
  /users:
    get:
      summary: Retrieve a list of all users in the system
      description: Returns a paginated list of users with their basic information
      parameters:
        - name: page
          in: query
          description: Page number for pagination
          schema:
            type: integer
            minimum: 1`
    },
    {
      title: "Include Comprehensive Examples",
      description: "Provide request/response examples for all endpoints",
      code: `responses:
  '200':
    description: Successful response
    content:
      application/json:
        example:
          - id: 1
            name: "John Doe"
            email: "john@example.com"`
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
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">DESIGN GUIDE</span>
              Craft scalable APIs with intent
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight">
              API Design Guide
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn the principles and best practices for designing APIs that both humans and AI agents can seamlessly consume.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/openapi-editor'}
              >
                <PenTool className="w-4 h-4 mr-2" />
                Start Designing
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/guides'}
              >
                <Code2 className="w-4 h-4 mr-2" />
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Core Design Principles
              </h2>
              <p className="text-lg text-muted-foreground">
                Fundamental principles for building exceptional APIs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <principle.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{principle.description}</p>
                    <ul className="space-y-2">
                      {principle.examples.map((example, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {example}
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

      {/* Best Practices Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Best Practices
              </h2>
              <p className="text-lg text-muted-foreground">
                Practical examples and code snippets
              </p>
            </div>
            
            <Tabs defaultValue="openapi" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="openapi">OpenAPI Spec</TabsTrigger>
                <TabsTrigger value="ai-friendly">AI-Friendly</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
              
              <TabsContent value="openapi" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      Use OpenAPI Specification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Document your API with OpenAPI 3.0 specification for better tooling and AI consumption.
                    </p>
                    <div className="bg-black rounded-lg p-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        <code>{bestPractices[0].code}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ai-friendly" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Design for AI Consumption
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Make your API AI-friendly with clear descriptions and comprehensive documentation.
                    </p>
                    <div className="bg-black rounded-lg p-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        <code>{bestPractices[1].code}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="examples" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Include Comprehensive Examples
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Provide request/response examples for all endpoints to improve developer experience.
                    </p>
                    <div className="bg-black rounded-lg p-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        <code>{bestPractices[2].code}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Design Tools
              </h2>
              <p className="text-lg text-muted-foreground">
                Use our tools to design and validate your APIs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <PenTool className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>OpenAPI Editor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Design and edit your OpenAPI specifications with our visual editor.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/openapi-editor'}
                  >
                    Open Editor
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>SDK Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Generate SDKs in multiple languages from your OpenAPI spec.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/sdk-generator'}
                  >
                    Generate SDKs
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>API Tester</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Test your API endpoints and validate responses.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/api-tester'}
                  >
                    Test API
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
              Ready to design your API?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start building APIs that both humans and AI agents can consume
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/openapi-editor'}
              >
                <PenTool className="w-4 h-4 mr-2" />
                Start Designing
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/guides'}
              >
                <Code2 className="w-4 h-4 mr-2" />
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiDesignGuide;
