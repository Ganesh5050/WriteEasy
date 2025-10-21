import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Book, Code, Zap, Shield, Globe, Download, ArrowLeft } from "lucide-react";

export const Docs = () => {
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
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium animate-stagger-1">
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">DOCUMENTATION</span>
              Complete API reference and guides
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight animate-stagger-2">
              writeasy Documentation
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-stagger-3">
              Everything you need to build exceptional APIs with writeasy. From quick start guides to advanced API reference.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative animate-stagger-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 animate-stagger-1">
                Quick start
              </h2>
              <p className="text-lg text-muted-foreground animate-stagger-2">
                Get up and running with writeasy in minutes
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Download className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">1. Install writeasy</h3>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <code className="text-sm">npm install @writeasy/cli</code>
                </div>
                <p className="text-muted-foreground mb-4">
                  Install the writeasy CLI tool to get started with API development.
                </p>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-medium"
                  onClick={() => window.location.href = '/guides'}
                >
                  Installation guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">2. Create your API</h3>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <code className="text-sm">writeasy init my-api</code>
                </div>
                <p className="text-muted-foreground mb-4">
                  Initialize a new API project with our OpenAPI editor.
                </p>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-medium"
                  onClick={() => window.location.href = '/guides'}
                >
                  API creation guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-5">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">3. Generate SDKs</h3>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <code className="text-sm">writeasy generate sdk</code>
                </div>
                <p className="text-muted-foreground mb-4">
                  Generate type-safe SDKs in multiple languages from your OpenAPI spec.
                </p>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-medium"
                  onClick={() => window.location.href = '/guides'}
                >
                  SDK generation guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 animate-stagger-1">
                Documentation sections
              </h2>
              <p className="text-lg text-muted-foreground animate-stagger-2">
                Explore our comprehensive documentation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Getting Started */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Book className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
                <p className="text-muted-foreground mb-6">
                  Learn the basics of writeasy and build your first API in minutes.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-sm text-muted-foreground">• Installation</li>
                  <li className="text-sm text-muted-foreground">• First API</li>
                  <li className="text-sm text-muted-foreground">• Basic concepts</li>
                  <li className="text-sm text-muted-foreground">• Common patterns</li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/guides'}
                >
                  Start learning
                </Button>
              </div>

              {/* API Reference */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">API Reference</h3>
                <p className="text-muted-foreground mb-6">
                  Complete reference for all writeasy APIs, endpoints, and parameters.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-sm text-muted-foreground">• REST API</li>
                  <li className="text-sm text-muted-foreground">• CLI commands</li>
                  <li className="text-sm text-muted-foreground">• Configuration</li>
                  <li className="text-sm text-muted-foreground">• Error codes</li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/docs'}
                >
                  View reference
                </Button>
              </div>

              {/* SDKs */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-5">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">SDK Generation</h3>
                <p className="text-muted-foreground mb-6">
                  Generate and customize SDKs for your APIs in multiple programming languages.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-sm text-muted-foreground">• Supported languages</li>
                  <li className="text-sm text-muted-foreground">• Customization</li>
                  <li className="text-sm text-muted-foreground">• Best practices</li>
                  <li className="text-sm text-muted-foreground">• Troubleshooting</li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/sdk-generator'}
                >
                  Learn more
                </Button>
              </div>

              {/* MCP Servers */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">MCP Servers</h3>
                <p className="text-muted-foreground mb-6">
                  Transform your APIs into MCP servers for AI platform integration.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-sm text-muted-foreground">• MCP basics</li>
                  <li className="text-sm text-muted-foreground">• Server generation</li>
                  <li className="text-sm text-muted-foreground">• AI integration</li>
                  <li className="text-sm text-muted-foreground">• Deployment</li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/mcp-generator'}
                >
                  Get started
                </Button>
              </div>

              {/* Documentation */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-7">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Documentation</h3>
                <p className="text-muted-foreground mb-6">
                  Generate beautiful, interactive API documentation from your OpenAPI specs.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-sm text-muted-foreground">• Documentation generation</li>
                  <li className="text-sm text-muted-foreground">• Customization</li>
                  <li className="text-sm text-muted-foreground">• Hosting options</li>
                  <li className="text-sm text-muted-foreground">• SEO optimization</li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/docs-generator'}
                >
                  Learn more
                </Button>
              </div>

              {/* Terraform */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-8">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Terraform Providers</h3>
                <p className="text-muted-foreground mb-6">
                  Generate Terraform providers from your OpenAPI specifications.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-sm text-muted-foreground">• Provider generation</li>
                  <li className="text-sm text-muted-foreground">• Resource mapping</li>
                  <li className="text-sm text-muted-foreground">• Testing</li>
                  <li className="text-sm text-muted-foreground">• Publishing</li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/terraform-generator'}
                >
                  Get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Examples & tutorials
              </h2>
              <p className="text-lg text-muted-foreground">
                Learn by example with our comprehensive tutorials
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-8 border border-border">
                <h3 className="text-xl font-semibold mb-4">Building a REST API</h3>
                <p className="text-muted-foreground mb-6">
                  Step-by-step tutorial on building a complete REST API with writeasy, from design to deployment.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">15 min read</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-auto font-medium"
                    onClick={() => window.location.href = '/guides'}
                  >
                    Read tutorial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border">
                <h3 className="text-xl font-semibold mb-4">MCP Server Integration</h3>
                <p className="text-muted-foreground mb-6">
                  Learn how to integrate your API with AI platforms using MCP servers generated by writeasy.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">20 min read</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-auto font-medium"
                    onClick={() => window.location.href = '/guides'}
                  >
                    Read tutorial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border">
                <h3 className="text-xl font-semibold mb-4">SDK Customization</h3>
                <p className="text-muted-foreground mb-6">
                  Advanced guide on customizing generated SDKs to match your specific requirements and coding standards.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">25 min read</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-auto font-medium"
                    onClick={() => window.location.href = '/guides'}
                  >
                    Read tutorial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border">
                <h3 className="text-xl font-semibold mb-4">Documentation Best Practices</h3>
                <p className="text-muted-foreground mb-6">
                  Learn how to create comprehensive, user-friendly API documentation that developers love.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">18 min read</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-auto font-medium"
                    onClick={() => window.location.href = '/guides'}
                  >
                    Read tutorial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Need help?
              </h2>
              <p className="text-lg text-muted-foreground">
                We're here to help you succeed
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-8 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Book className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Community Forum</h3>
                <p className="text-muted-foreground mb-6">
                  Get help from our community of developers and writeasy experts.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => window.open('https://github.com/writeasy/community', '_blank')}
                >
                  Visit forum
                </Button>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Code className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">GitHub Issues</h3>
                <p className="text-muted-foreground mb-6">
                  Report bugs, request features, or contribute to our open source projects.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => window.open('https://github.com/writeasy/writeasy/issues', '_blank')}
                >
                  View issues
                </Button>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Enterprise Support</h3>
                <p className="text-muted-foreground mb-6">
                  Get dedicated support for your enterprise needs with priority assistance.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start building exceptional APIs with writeasy today
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

export default Docs;
