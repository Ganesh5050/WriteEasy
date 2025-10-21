import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium animate-stagger-1">
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">PRICING</span>
              Simple, transparent pricing
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight animate-stagger-2">
              AI-Native API Plans
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-stagger-3">
              Build APIs that both humans and AI agents can consume. Start free, scale as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-1">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">Free</h3>
                  <div className="text-4xl font-bold mb-2">$0</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Up to 3 APIs</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Basic SDK generation (3 languages)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Community support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Basic documentation</span>
                  </li>
                  <li className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-3" />
                    <span className="text-sm text-muted-foreground">MCP servers</span>
                  </li>
                  <li className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-3" />
                    <span className="text-sm text-muted-foreground">Terraform providers</span>
                  </li>
                </ul>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.location.href = '/login'}
                >
                  Get started free
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="bg-background rounded-lg p-8 border border-border relative animate-stagger-2">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground px-4 py-1">
                      Most Popular
                  </Badge>
                  </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                  <div className="text-4xl font-bold mb-2">$29</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Up to 25 APIs</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Advanced SDK generation (10+ languages)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Custom documentation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">MCP servers (AI-native APIs)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Terraform providers</span>
                  </li>
                </ul>
                
                <Button 
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                  onClick={() => window.location.href = '/login'}
                >
                  Start Pro trial
                </Button>
                  </div>

              {/* Enterprise Plan */}
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-3">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold mb-2">Custom</div>
                  <div className="text-muted-foreground">contact sales</div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Unlimited APIs</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">White-label SDKs</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Advanced MCP servers</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">On-premise deployment</span>
                    </li>
                </ul>

                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 animate-stagger-1">
                Feature comparison
              </h2>
              <p className="text-lg text-muted-foreground animate-stagger-2">
                See what's included in each plan
              </p>
            </div>
            
            <div className="bg-background rounded-lg border border-border overflow-hidden animate-stagger-3">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-6 font-semibold">Features</th>
                      <th className="text-center p-6 font-semibold">Free</th>
                      <th className="text-center p-6 font-semibold">Pro</th>
                      <th className="text-center p-6 font-semibold">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-6 font-medium">APIs per account</td>
                      <td className="p-6 text-center">3</td>
                      <td className="p-6 text-center">25</td>
                      <td className="p-6 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-6 font-medium">SDK generation</td>
                      <td className="p-6 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-6 font-medium">MCP servers (AI-native APIs)</td>
                      <td className="p-6 text-center">
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-6 font-medium">Terraform providers</td>
                      <td className="p-6 text-center">
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-6 font-medium">Custom documentation</td>
                      <td className="p-6 text-center">
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-6 font-medium">Support</td>
                      <td className="p-6 text-center">Community</td>
                      <td className="p-6 text-center">Priority</td>
                      <td className="p-6 text-center">24/7 Dedicated</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-6 font-medium">On-premise deployment</td>
                      <td className="p-6 text-center">
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 animate-stagger-1">
                Frequently asked questions
              </h2>
              <p className="text-lg text-muted-foreground animate-stagger-2">
                Everything you need to know about our pricing
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-3">
                <h3 className="text-xl font-semibold mb-4">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-4">
                <h3 className="text-xl font-semibold mb-4">What happens if I exceed my API limit?</h3>
                <p className="text-muted-foreground">
                  We'll notify you when you're approaching your limit. You can upgrade your plan or contact us to discuss custom solutions for your needs.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-5">
                <h3 className="text-xl font-semibold mb-4">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-6">
                <h3 className="text-xl font-semibold mb-4">Is there a free trial for paid plans?</h3>
                <p className="text-muted-foreground">
                  Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border border-border animate-stagger-7">
                <h3 className="text-xl font-semibold mb-4">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise customers. All payments are processed securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-6 animate-stagger-1">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 animate-stagger-2">
              Join thousands of developers building better APIs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-stagger-3">
              <Button 
                size="lg" 
                className="text-base px-8 py-6 bg-foreground text-background hover:bg-foreground/90 font-medium"
                onClick={() => window.location.href = '/login'}
              >
                Start free trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6 font-medium border-2"
                onClick={() => window.location.href = '/contact'}
              >
                Contact sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;