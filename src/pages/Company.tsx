import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Heart, Target, Award, Mail, MapPin, Calendar } from "lucide-react";

export const Company = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium animate-stagger-1">
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">COMPANY</span>
              Building the future of API development
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight animate-stagger-2">
              About writeasy
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-stagger-3">
              We're on a mission to make API development faster, easier, and more enjoyable for developers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-stagger-1">
                <h2 className="text-3xl md:text-4xl font-serif font-normal mb-6">
                  Our mission
            </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We believe that great APIs are the foundation of modern software. Our mission is to empower developers to create exceptional API experiences that delight users and enable innovation.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  By providing intuitive tools for API design, SDK generation, and AI integration, we're helping teams focus on what matters most: building amazing products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-foreground text-background hover:bg-foreground/90">
                    Join our team
                  </Button>
                  <Button variant="outline">
                    Learn more
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-background rounded-lg p-6 border border-border text-center animate-stagger-2">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold mb-2">10,000+</div>
                  <div className="text-sm text-muted-foreground">Active developers</div>
                </div>
                
                <div className="bg-background rounded-lg p-6 border border-border text-center animate-stagger-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
                
                <div className="bg-background rounded-lg p-6 border border-border text-center animate-stagger-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Customer satisfaction</div>
                </div>
                
                <div className="bg-background rounded-lg p-6 border border-border text-center animate-stagger-5">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Team members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 animate-stagger-1">
                Our values
            </h2>
              <p className="text-lg text-muted-foreground animate-stagger-2">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Developer-first</h3>
                <p className="text-muted-foreground">
                  Every decision we make is guided by what's best for developers. We build tools that developers actually want to use.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality over quantity</h3>
                <p className="text-muted-foreground">
                  We focus on building fewer features exceptionally well rather than many features poorly. Quality is our obsession.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-5">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in open communication, honest feedback, and building trust through transparency in everything we do.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly pushing the boundaries of what's possible in API development, always looking for better ways to solve problems.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-7">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-accent" />
                  </div>
                <h3 className="text-xl font-semibold mb-4">Community</h3>
                <p className="text-muted-foreground">
                  We believe in the power of community and actively contribute to open source projects and developer communities worldwide.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-8">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Simplicity</h3>
                <p className="text-muted-foreground">
                  Complex problems deserve simple solutions. We strive to make the complex world of API development accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 animate-stagger-1">
                Meet our team
              </h2>
              <p className="text-lg text-muted-foreground animate-stagger-2">
                The people behind writeasy
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 border border-border text-center animate-stagger-3">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-2">Sarah Chen</h3>
                <div className="text-sm text-accent font-medium mb-2">CEO & Co-founder</div>
                <p className="text-sm text-muted-foreground">
                  Former API architect at Google. Passionate about developer experience and building tools that make developers' lives easier.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border text-center animate-stagger-4">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-2">Marcus Rodriguez</h3>
                <div className="text-sm text-accent font-medium mb-2">CTO & Co-founder</div>
                <p className="text-sm text-muted-foreground">
                  Ex-Twitter engineer with 10+ years building scalable systems. Loves solving complex technical challenges.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border text-center animate-stagger-5">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-2">Emily Watson</h3>
                <div className="text-sm text-accent font-medium mb-2">Head of Product</div>
                <p className="text-sm text-muted-foreground">
                  Product strategist with a background in developer tools. Focused on creating intuitive user experiences.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border text-center animate-stagger-6">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-2">David Kim</h3>
                <div className="text-sm text-accent font-medium mb-2">Lead Engineer</div>
                <p className="text-sm text-muted-foreground">
                  Full-stack engineer with expertise in API design and developer tooling. Always learning and experimenting.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border text-center animate-stagger-7">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-2">Lisa Thompson</h3>
                <div className="text-sm text-accent font-medium mb-2">Head of Design</div>
                <p className="text-sm text-muted-foreground">
                  Designer with a passion for creating beautiful, functional interfaces. Believes good design makes complex things simple.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border text-center animate-stagger-8">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-2">Alex Johnson</h3>
                <div className="text-sm text-accent font-medium mb-2">Head of Marketing</div>
                <p className="text-sm text-muted-foreground">
                  Marketing strategist focused on developer communities. Believes in authentic storytelling and community building.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 animate-stagger-1">
                Join our team
            </h2>
              <p className="text-lg text-muted-foreground animate-stagger-2">
                We're always looking for talented people to join our mission
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-3">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-accent mr-3" />
                  <span className="text-sm text-muted-foreground">Open positions</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Senior Frontend Engineer</h3>
                <p className="text-muted-foreground mb-4">
                  Help us build the next generation of API development tools. React, TypeScript, and modern web technologies.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-medium">
                  View details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                  </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-4">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-accent mr-3" />
                  <span className="text-sm text-muted-foreground">Open positions</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Developer Advocate</h3>
                <p className="text-muted-foreground mb-4">
                  Help developers succeed with writeasy. Create content, speak at conferences, and build our developer community.
                </p>
                <Button variant="ghost" className="p-0 h-auto font-medium">
                  View details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                View all positions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Get in touch
              </h2>
              <p className="text-lg text-muted-foreground">
                We'd love to hear from you
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Email us</h3>
                <p className="text-sm text-muted-foreground mb-4">hello@writeasy.com</p>
                <Button variant="ghost" size="sm">Send email</Button>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Visit us</h3>
                <p className="text-sm text-muted-foreground mb-4">San Francisco, CA</p>
                <Button variant="ghost" size="sm">Get directions</Button>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Join community</h3>
                <p className="text-sm text-muted-foreground mb-4">Discord & GitHub</p>
                <Button variant="ghost" size="sm">Join now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;