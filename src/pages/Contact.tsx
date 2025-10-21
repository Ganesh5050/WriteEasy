import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight,
  Send,
  MessageSquare,
  Users,
  Globe,
  Shield,
  Zap,
  Heart,
  ArrowLeft
} from "lucide-react";

export const Contact = () => {
  const contactMethods = [
    {
      title: "Email Support",
      description: "Get help with technical questions",
      contact: "support@writeasy.com",
      icon: Mail,
      responseTime: "Within 24 hours"
    },
    {
      title: "Sales Inquiries",
      description: "Questions about enterprise plans",
      contact: "sales@writeasy.com",
      icon: Users,
      responseTime: "Within 4 hours"
    },
    {
      title: "Partnership",
      description: "Let's work together",
      contact: "partners@writeasy.com",
      icon: Globe,
      responseTime: "Within 48 hours"
    },
    {
      title: "Press & Media",
      description: "Media inquiries and press",
      contact: "press@writeasy.com",
      icon: MessageSquare,
      responseTime: "Within 24 hours"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Mission Street, Suite 100",
      zip: "San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri, 9AM-6PM PST"
    },
    {
      city: "New York",
      address: "456 Broadway, Floor 12",
      zip: "New York, NY 10013",
      phone: "+1 (555) 987-6543",
      hours: "Mon-Fri, 9AM-6PM EST"
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
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">CONTACT US</span>
              Let's chat
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight">
              Get in touch
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions about writeasy? Need help with your API? Want to discuss a partnership? 
              We'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => {
                  const formSection = document.getElementById('contact-form');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/demo'}
              >
                <Phone className="w-4 h-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Send us a message
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="mt-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Acme Corp"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="sales">Sales Inquiry</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="press">Press & Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    onClick={(e) => {
                      e.preventDefault();
                      // In a real app, this would submit the form to a backend
                      alert('Message sent! We\'ll get back to you as soon as possible.');
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Other ways to reach us
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the method that works best for you
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{method.description}</p>
                    <p className="font-semibold text-white mb-2">{method.contact}</p>
                    <p className="text-sm text-gray-400">{method.responseTime}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Our Offices
              </h2>
              <p className="text-lg text-muted-foreground">
                Visit us in person or schedule a meeting
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {offices.map((office, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-xl">{office.city}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-white">{office.address}</p>
                        <p className="text-muted-foreground">{office.zip}</p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">How quickly do you respond?</h3>
                  <p className="text-muted-foreground">
                    We typically respond to all inquiries within 24 hours. For urgent technical issues, 
                    we have priority support channels available.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Do you offer custom integrations?</h3>
                  <p className="text-muted-foreground">
                    Yes! We work with enterprise customers to create custom integrations and features. 
                    Contact our sales team to discuss your specific needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Can I schedule a demo?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! We'd love to show you how writeasy can help with your API development. 
                    Use the "Book a demo" button above to schedule a personalized demo.
                  </p>
                </CardContent>
              </Card>
            </div>
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
              Join thousands of developers who are already building better APIs with writeasy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/login'}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Start Building
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/demo'}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
