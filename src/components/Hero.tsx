import { Button } from "@/components/ui/button";
import Particles from "./Particles";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-8">
      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6 animate-fade-in">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-xs font-medium border-border">
            <span className="bg-accent/10 text-accent px-2 py-0.5 rounded mr-2 text-xs font-semibold">AI-NATIVE</span>
            The platform for building APIs that LLMs understand
            <ArrowRight className="inline-block ml-2 h-3 w-3" />
          </Badge>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-normal leading-[0.95] tracking-tight">
            Make APIs
            <br />
            <span className="inline-block animate-fade-in-slow">AI-native.</span>
          </h1>

          <div className="max-w-2xl mx-auto space-y-4 animate-fade-in-slow">
            <p className="text-xl md:text-2xl font-semibold">
              Build APIs that both humans and AI agents can seamlessly consume.
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              Auto-generate SDKs, create MCP servers, and build AI-compatible APIs from your OpenAPI specs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-slow">
            <Button 
              size="lg" 
              className="text-base px-8 py-6 bg-foreground text-background hover:bg-foreground/90 font-medium"
              onClick={() => window.location.href = '/login'}
            >
              Start building
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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
