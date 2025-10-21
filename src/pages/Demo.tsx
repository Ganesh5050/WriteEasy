import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { config } from "@/config";
import { 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Code2,
  Globe,
  Shield,
  Rocket,
  Star,
  MessageSquare,
  Video,
  Phone,
  ArrowLeft
} from "lucide-react";

export const Demo = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    demoType: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name and email)",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${config.API_BASE_URL}/demo-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Demo Request Submitted! 🎉",
          description: "Thank you! We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          role: '',
          demoType: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Failed to submit demo request');
      }
    } catch (error) {
      console.error('Demo request error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const demoTypes = [
    {
      title: "Platform Overview",
      description: "See how writeasy works end-to-end",
      duration: "30 minutes",
      icon: Play,
      features: ["SDK Generation", "API Documentation", "MCP Servers", "Team Collaboration"]
    },
    {
      title: "Technical Deep Dive",
      description: "Dive into the technical details",
      duration: "45 minutes",
      icon: Code2,
      features: ["OpenAPI Integration", "Custom Templates", "CI/CD Pipeline", "Enterprise Features"]
    },
    {
      title: "AI Integration",
      description: "Learn about AI-native API design",
      duration: "30 minutes",
      icon: Zap,
      features: ["MCP Server Creation", "Agent Integration", "AI-Friendly APIs", "Best Practices"]
    }
  ];

  const benefits = [
    {
      title: "See it in Action",
      description: "Watch live demonstrations of our platform",
      icon: Play
    },
    {
      title: "Ask Questions",
      description: "Get answers from our product experts",
      icon: MessageSquare
    },
    {
      title: "Custom Use Case",
      description: "Discuss your specific API needs",
      icon: Users
    },
    {
      title: "Implementation Plan",
      description: "Learn how to get started quickly",
      icon: Rocket
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Engineering Manager",
      company: "TechCorp",
      quote: "The demo showed us exactly how writeasy could streamline our API development process. We were up and running in days, not weeks."
    },
    {
      name: "Mike Rodriguez",
      role: "CTO",
      company: "StartupXYZ",
      quote: "The AI integration features blew our minds. We can now build APIs that work seamlessly with our AI agents."
    },
    {
      name: "Emily Davis",
      role: "Lead Developer",
      company: "DevTools Inc",
      quote: "The documentation generation alone saved us months of work. The demo convinced us to switch immediately."
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
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">BOOK A DEMO</span>
              Let's chat about your API needs
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight">
              See writeasy in action
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a personalized demo to see how writeasy can transform your API development workflow. 
              Our team will show you exactly how our platform works for your use case.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => {
                  const formSection = document.getElementById('demo-form');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.open('https://www.youtube.com/watch?v=demo', '_blank')}
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Video Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Types Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Choose your demo type
              </h2>
              <p className="text-lg text-muted-foreground">
                Pick the demo that best fits your needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {demoTypes.map((demo, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <demo.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{demo.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {demo.duration}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{demo.description}</p>
                    <ul className="space-y-2">
                      {demo.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => {
                        const formSection = document.getElementById('demo-form');
                        if (formSection) {
                          formSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule This Demo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                What to expect
              </h2>
              <p className="text-lg text-muted-foreground">
                Your demo will be tailored to your specific needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Form Section */}
      <section id="demo-form" className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Schedule your demo
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="mt-2"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="mt-2"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-2"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Acme Corp"
                      className="mt-2"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineer">Software Engineer</SelectItem>
                        <SelectItem value="manager">Engineering Manager</SelectItem>
                        <SelectItem value="cto">CTO</SelectItem>
                        <SelectItem value="architect">Solution Architect</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="demoType">Demo Type</Label>
                    <Select value={formData.demoType} onValueChange={(value) => handleInputChange('demoType', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose demo type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overview">Platform Overview</SelectItem>
                        <SelectItem value="technical">Technical Deep Dive</SelectItem>
                        <SelectItem value="ai">AI Integration</SelectItem>
                        <SelectItem value="custom">Custom Demo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Tell us about your API needs</Label>
                    <Textarea
                      id="message"
                      placeholder="What APIs are you building? What challenges are you facing?"
                      className="mt-2 min-h-[120px]"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Schedule Demo'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                What our customers say
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from teams who've seen writeasy in action
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
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
              Ready to see writeasy in action?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers who are already building better APIs with writeasy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => {
                  const formSection = document.getElementById('demo-form');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Your Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/login'}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;
