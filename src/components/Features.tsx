import { Code2, Layers, Zap, Bot, Wrench, Globe, Shield, GitBranch } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Native APIs",
      description: "Build APIs that LLMs can understand and consume directly through MCP servers and semantic schemas."
    },
    {
      icon: Code2,
      title: "Auto SDK Generation",
      description: "Generate type-safe SDKs in 10+ languages with automatic pagination, auth, and error handling."
    },
    {
      icon: Layers,
      title: "MCP Server Builder",
      description: "Convert your APIs into AI-compatible tools that GPT, Claude, and other LLMs can use natively."
    },
    {
      icon: Wrench,
      title: "Terraform Providers",
      description: "Automatically generate Terraform providers from your OpenAPI specs for infrastructure as code."
    },
    {
      icon: Globe,
      title: "Interactive Docs",
      description: "Create beautiful, interactive API documentation with try-it-out functionality and AI-enhanced descriptions."
    },
    {
      icon: Shield,
      title: "Version Control",
      description: "Track API changes, detect breaking changes, and generate semantic version updates automatically."
    }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-normal mb-6">
              AI-Native API Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build APIs that both humans and AI agents can seamlessly consume
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl bg-card"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="h-7 w-7 text-accent" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-medium mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
