import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quote, Star, Users, TrendingUp } from "lucide-react";

const Customers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium animate-stagger-1">
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">CUSTOMERS</span>
              Trusted by leading companies
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight animate-stagger-2">
              Our customers love us
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-stagger-3">
              From startups to enterprises, thousands of teams rely on writeasy to build exceptional API experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-1">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-muted-foreground">Active developers</div>
              </div>
              
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-2">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-muted-foreground">Companies</div>
              </div>
              
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 animate-stagger-1">
              What our customers say
            </h2>
              <p className="text-lg text-muted-foreground animate-stagger-2">
                Real feedback from real teams
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-3">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  "writeasy has transformed how we build APIs. The SDK generation is incredible and saves us weeks of development time."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">CTO, TechCorp</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-4">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  "The MCP server generation is a game-changer. Our AI integrations are now seamless and our developers love the experience."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Marcus Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Lead Developer, InnovateLab</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-5">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  "The documentation generation is outstanding. Our API docs look professional and our users find them incredibly helpful."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Emily Watson</div>
                    <div className="text-sm text-muted-foreground">Product Manager, DataFlow</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  "We've reduced our API development time by 70% since using writeasy. The OpenAPI editor is intuitive and powerful."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">David Kim</div>
                    <div className="text-sm text-muted-foreground">Engineering Lead, CloudScale</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-7">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  "The Terraform provider generation has streamlined our infrastructure management. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Lisa Thompson</div>
                    <div className="text-sm text-muted-foreground">DevOps Engineer, InfraTech</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 6 */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  "writeasy's support team is exceptional. They helped us migrate our entire API ecosystem seamlessly."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Alex Johnson</div>
                    <div className="text-sm text-muted-foreground">VP Engineering, ScaleUp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Success stories
              </h2>
              <p className="text-lg text-muted-foreground">
                See how companies transformed their API development
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Case Study 1 */}
              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-sm text-accent font-semibold mb-2">CASE STUDY</div>
                <h3 className="text-xl font-semibold mb-4">TechCorp: 70% Faster API Development</h3>
                <p className="text-muted-foreground mb-6">
                  TechCorp reduced their API development time from 6 weeks to 2 weeks using writeasy's SDK generation and OpenAPI editor.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Read full case study</div>
                  <Button variant="ghost" size="sm">→</Button>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-background rounded-lg p-8 border border-border">
                <div className="text-sm text-accent font-semibold mb-2">CASE STUDY</div>
                <h3 className="text-xl font-semibold mb-4">InnovateLab: Seamless AI Integration</h3>
                <p className="text-muted-foreground mb-6">
                  InnovateLab integrated their APIs with AI platforms using writeasy's MCP server generation, improving developer experience by 80%.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Read full case study</div>
                  <Button variant="ghost" size="sm">→</Button>
                </div>
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
              Join our growing community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start building better APIs today
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-base px-8 py-6 bg-foreground text-background hover:bg-foreground/90 font-medium">
                Get started free
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 font-medium border-2">
                Book a demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customers;