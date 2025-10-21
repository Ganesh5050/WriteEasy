import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Lightbulb, 
  ArrowRight,
  Globe,
  Heart,
  Zap,
  Shield,
  Code2,
  Rocket,
  Star,
  Award,
  ArrowLeft
} from "lucide-react";

export const About = () => {
  const values = [
    {
      title: "Developer-First",
      description: "We build tools that developers actually want to use",
      icon: Code2
    },
    {
      title: "AI-Native",
      description: "We believe APIs should work seamlessly with AI agents",
      icon: Zap
    },
    {
      title: "Open Source",
      description: "Transparency and community-driven development",
      icon: Globe
    },
    {
      title: "Quality",
      description: "We ship software that's reliable and well-tested",
      icon: Shield
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Co-Founder & CEO",
      description: "Former API architect at Stripe, passionate about developer experience"
    },
    {
      name: "Sarah Johnson",
      role: "Co-Founder & CTO",
      description: "Ex-Google engineer, expert in AI and machine learning systems"
    },
    {
      name: "Mike Rodriguez",
      role: "Head of Engineering",
      description: "Open source contributor, loves building scalable systems"
    },
    {
      name: "Emily Davis",
      role: "Head of Design",
      description: "Designer with a passion for creating intuitive developer tools"
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
              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">ABOUT US</span>
              Our story, mission, and vision
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 leading-tight">
              Building the future of APIs
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're on a mission to make APIs that both humans and AI agents can seamlessly consume. 
              Our platform helps developers build, document, and deploy APIs that work beautifully with modern AI tools.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/login'}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Join Our Mission
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => {
                  const teamSection = document.getElementById('team-section');
                  if (teamSection) {
                    teamSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Meet the Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We believe that APIs should be designed from the ground up to work seamlessly with AI agents, 
                while still providing an excellent experience for human developers.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-serif font-normal mb-4">The Problem</h3>
                <p className="text-muted-foreground mb-6">
                  Traditional APIs are designed for human consumption, but AI agents need structured, 
                  well-documented interfaces to work effectively. This creates friction and limits 
                  the potential of AI-powered applications.
                </p>
                
                <h3 className="text-2xl font-serif font-normal mb-4">Our Solution</h3>
                <p className="text-muted-foreground">
                  We provide tools and platforms that help developers create APIs that work beautifully 
                  for both humans and AI agents, with automatic SDK generation, comprehensive documentation, 
                  and AI-native design patterns.
                </p>
              </div>
              
              <div className="bg-black rounded-lg p-8">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">Developer Love</h4>
                  <p className="text-gray-400">
                    We're developers ourselves, building tools we wish we had
                  </p>
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
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team-section" className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground">
                The people behind writeasy
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-center text-lg">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-semibold text-blue-600 mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-muted-foreground">APIs Generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-muted-foreground">Happy Developers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
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
              Ready to join our mission?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're a developer looking for better API tools or want to join our team, 
              we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/login'}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6"
                onClick={() => window.location.href = '/careers'}
              >
                <Users className="w-4 h-4 mr-2" />
                View Careers
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
