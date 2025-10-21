import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Book, Video, FileText, Users, Calendar, Download } from "lucide-react";

export const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium animate-stagger-1">
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">RESOURCES</span>
              Learn and grow with writeasy
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight animate-stagger-2">
              Resources to help you succeed
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-stagger-3">
              Documentation, tutorials, guides, and best practices to help you build exceptional APIs.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 animate-stagger-1">
                Quick access
              </h2>
              <p className="text-lg text-muted-foreground animate-stagger-2">
                Get started quickly with these essential resources
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background rounded-lg p-6 border border-border hover:shadow-lg transition-shadow animate-stagger-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Book className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">Complete API reference and guides</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto font-medium"
                  onClick={() => window.location.href = '/docs'}
                >
                  View docs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border hover:shadow-lg transition-shadow animate-stagger-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Tutorials</h3>
                <p className="text-sm text-muted-foreground mb-4">Step-by-step video guides</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto font-medium"
                  onClick={() => window.location.href = '/guides'}
                >
                  Watch videos <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border hover:shadow-lg transition-shadow animate-stagger-5">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Examples</h3>
                <p className="text-sm text-muted-foreground mb-4">Real-world code samples</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto font-medium"
                  onClick={() => window.location.href = '/guides'}
                >
                  Browse examples <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border hover:shadow-lg transition-shadow animate-stagger-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground mb-4">Join our developer community</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto font-medium"
                  onClick={() => window.open('https://discord.gg/writeasy', '_blank')}
                >
                  Join community <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Learning paths
              </h2>
              <p className="text-lg text-muted-foreground">
                Structured learning journeys for different skill levels
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Beginner Path */}
              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-sm text-accent font-semibold mb-2">BEGINNER</div>
                <h3 className="text-xl font-semibold mb-4">Getting Started with APIs</h3>
                <p className="text-muted-foreground mb-6">
                  Learn the fundamentals of API design and development with writeasy.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-sm text-muted-foreground">• What is an API?</li>
                  <li className="text-sm text-muted-foreground">• OpenAPI basics</li>
                  <li className="text-sm text-muted-foreground">• Your first API</li>
                  <li className="text-sm text-muted-foreground">• Testing and validation</li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/guides'}
                >
                  Start learning
                </Button>
              </div>

              {/* Intermediate Path */}
              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-sm text-accent font-semibold mb-2">INTERMEDIATE</div>
                <h3 className="text-xl font-semibold mb-4">Building Production APIs</h3>
                <p className="text-muted-foreground mb-6">
                  Advanced techniques for building scalable, production-ready APIs.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-sm text-muted-foreground">• API versioning strategies</li>
                  <li className="text-sm text-muted-foreground">• Authentication & security</li>
                  <li className="text-sm text-muted-foreground">• Error handling</li>
                  <li className="text-sm text-muted-foreground">• Performance optimization</li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/guides'}
                >
                  Start learning
                </Button>
              </div>

              {/* Advanced Path */}
              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-sm text-accent font-semibold mb-2">ADVANCED</div>
                <h3 className="text-xl font-semibold mb-4">AI Integration & MCP</h3>
                <p className="text-muted-foreground mb-6">
                  Master AI integration and MCP server development.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-sm text-muted-foreground">• MCP server architecture</li>
                  <li className="text-sm text-muted-foreground">• AI tool integration</li>
                  <li className="text-sm text-muted-foreground">• Advanced SDK features</li>
                  <li className="text-sm text-muted-foreground">• Enterprise patterns</li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = '/guides'}
                >
                  Start learning
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Content */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Latest resources
              </h2>
              <p className="text-lg text-muted-foreground">
                Stay updated with our newest content
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">Dec 15, 2024</span>
                </div>
                <h3 className="font-semibold mb-3">Best Practices for API Design</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn the essential principles for designing APIs that developers love to use.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto font-medium"
                  onClick={() => window.location.href = '/guides'}
                >
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Blog Post 2 */}
              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">Dec 12, 2024</span>
                </div>
                <h3 className="font-semibold mb-3">MCP Servers: A Complete Guide</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Everything you need to know about building MCP servers for AI platforms.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto font-medium"
                  onClick={() => window.location.href = '/guides'}
                >
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Blog Post 3 */}
              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">Dec 10, 2024</span>
                </div>
                <h3 className="font-semibold mb-3">SDK Generation Deep Dive</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced techniques for generating high-quality SDKs from OpenAPI specs.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto font-medium"
                  onClick={() => window.location.href = '/guides'}
                >
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Downloads & tools
            </h2>
              <p className="text-lg text-muted-foreground">
                Essential tools and resources for your development workflow
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background rounded-lg p-6 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">CLI Tool</h3>
                <p className="text-sm text-muted-foreground mb-4">Command-line interface for writeasy</p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://github.com/writeasy/cli/releases', '_blank')}
                >
                  Download
                </Button>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Templates</h3>
                <p className="text-sm text-muted-foreground mb-4">Pre-built API templates</p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.location.href = '/guides'}
                >
                  Browse
                </Button>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Book className="h-6 w-6 text-accent" />
                  </div>
                <h3 className="font-semibold mb-2">Cheat Sheets</h3>
                <p className="text-sm text-muted-foreground mb-4">Quick reference guides</p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://github.com/writeasy/docs/releases', '_blank')}
                >
                  Download
                </Button>
                  </div>

              <div className="bg-background rounded-lg p-6 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground mb-4">Join our Discord server</p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://discord.gg/writeasy', '_blank')}
                >
                  Join
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
              Ready to start building?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get started with writeasy today
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

export default Resources;