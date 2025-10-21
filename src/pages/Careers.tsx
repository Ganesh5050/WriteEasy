import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MapPin, 
  Clock, 
  ArrowRight,
  Heart,
  Zap,
  Code2,
  Globe,
  Shield,
  Rocket,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Coffee,
  Lightbulb,
  ArrowLeft
} from "lucide-react";

export const Careers = () => {
  const benefits = [
    {
      title: "Competitive Salary",
      description: "Top-tier compensation with equity options",
      icon: Award
    },
    {
      title: "Flexible Work",
      description: "Remote-first with flexible hours",
      icon: Globe
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision",
      icon: Heart
    },
    {
      title: "Learning Budget",
      description: "$2,000 annual learning and development",
      icon: GraduationCap
    },
    {
      title: "Top Equipment",
      description: "Latest MacBook Pro and accessories",
      icon: Code2
    },
    {
      title: "Team Retreats",
      description: "Quarterly team building events",
      icon: Users
    }
  ];

  const openPositions = [
    {
      title: "Senior Full-Stack Engineer",
      location: "Remote",
      type: "Full-time",
      department: "Engineering",
      description: "Build the core platform that powers API generation and documentation"
    },
    {
      title: "AI/ML Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      department: "Engineering",
      description: "Work on AI-native API design and agent integration features"
    },
    {
      title: "Developer Relations",
      location: "Remote",
      type: "Full-time",
      department: "Community",
      description: "Help developers succeed with our platform and build community"
    },
    {
      title: "Product Designer",
      location: "New York, NY",
      type: "Full-time",
      department: "Design",
      description: "Design intuitive experiences for developers and AI agents"
    },
    {
      title: "Sales Engineer",
      location: "Remote",
      type: "Full-time",
      department: "Sales",
      description: "Help enterprise customers implement our platform"
    },
    {
      title: "Marketing Manager",
      location: "Remote",
      type: "Full-time",
      department: "Marketing",
      description: "Drive growth and brand awareness in the developer community"
    }
  ];

  const culture = [
    {
      title: "Innovation First",
      description: "We encourage experimentation and bold ideas",
      icon: Lightbulb
    },
    {
      title: "Developer Obsessed",
      description: "Everything we build is for developers, by developers",
      icon: Code2
    },
    {
      title: "AI-Native Thinking",
      description: "We think about AI agents as first-class users",
      icon: Zap
    },
    {
      title: "Open Source",
      description: "We contribute to and maintain open source projects",
      icon: Globe
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
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">CAREERS</span>
              Join our team
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight">
              Build the future with us
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're building the platform that will power the next generation of AI-native APIs. 
              Join us in creating tools that developers love and AI agents can seamlessly consume.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => {
                  const positionsSection = document.getElementById('open-positions');
                  if (positionsSection) {
                    positionsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                View Open Positions
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => {
                  const cultureSection = document.getElementById('culture-section');
                  if (cultureSection) {
                    cultureSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Learn About Culture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section id="culture-section" className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Our Culture
              </h2>
              <p className="text-lg text-muted-foreground">
                What makes writeasy a great place to work
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {culture.map((item, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
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
                Benefits & Perks
              </h2>
              <p className="text-lg text-muted-foreground">
                We take care of our team so they can do their best work
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Open Positions Section */}
      <section id="open-positions" className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Open Positions
              </h2>
              <p className="text-lg text-muted-foreground">
                Join our growing team
              </p>
            </div>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{position.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {position.type}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {position.department}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{position.description}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="ml-4"
                        onClick={() => window.open('mailto:careers@writeasy.com?subject=Application for ' + position.title, '_blank')}
                      >
                        Apply Now
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

      {/* Why Join Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-normal mb-6">
                  Why join writeasy?
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">🚀 High Impact</h3>
                    <p className="text-muted-foreground">
                      You'll be building tools that thousands of developers use every day to create better APIs.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">🧠 Cutting Edge</h3>
                    <p className="text-muted-foreground">
                      Work on the intersection of AI and APIs, one of the most exciting areas in tech today.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">👥 Great Team</h3>
                    <p className="text-muted-foreground">
                      Join a team of experienced engineers and designers who are passionate about developer experience.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black rounded-lg p-8">
                <div className="text-center">
                  <Rocket className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">Ready to Apply?</h4>
                  <p className="text-gray-400 mb-6">
                    We'd love to hear from you. Send us your resume and tell us why you're excited about writeasy.
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => window.open('mailto:careers@writeasy.com?subject=General Application', '_blank')}
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Start Your Application
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
              Don't see the right role?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented people. Send us your resume and let's chat about how you can contribute to our mission.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.open('mailto:careers@writeasy.com?subject=Resume Submission', '_blank')}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Send Your Resume
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/about'}
              >
                <Users className="w-4 h-4 mr-2" />
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
