import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageSquare, Zap, ArrowRight, Play, CheckCircle, Copy } from "lucide-react";

export const McpServerShowcase = () => {
  const [activeDemo, setActiveDemo] = useState("gpt");

  const demos = {
    gpt: {
      title: "GPT Integration",
      description: "Your API becomes a native tool for GPT-4",
      icon: Bot,
      prompt: "Hey GPT, can you help me create a chat completion using the AI Chat API?",
      response: "I'll help you create a chat completion! I can see you have access to the AI Chat API through the MCP server. Let me use the create_chat_completion tool for you.",
      code: `// GPT automatically calls your API
const completion = await mcp.create_chat_completion({
  messages: [
    { role: "user", content: "Hello, how are you?" }
  ],
  model: "gpt-4"
});`
    },
    claude: {
      title: "Claude Integration", 
      description: "Claude can directly interact with your APIs",
      icon: MessageSquare,
      prompt: "Claude, I need to analyze customer sentiment from our chat logs",
      response: "I can help analyze customer sentiment! I'll use your Chat API to process the logs and provide insights.",
      code: `// Claude uses your API as a native tool
const analysis = await mcp.create_chat_completion({
  messages: [
    { role: "system", content: "Analyze sentiment in this text" },
    { role: "user", content: customerMessage }
  ],
  model: "claude-3"
});`
    },
    custom: {
      title: "Custom AI Agents",
      description: "Build AI agents that use your APIs",
      icon: Zap,
      prompt: "Agent, monitor our API usage and alert if there are issues",
      response: "I'll monitor your API usage patterns and alert you to any anomalies using the Chat API for notifications.",
      code: `// Custom agent using your API
const agent = new AIAgent({
  tools: [mcp.create_chat_completion],
  instructions: "Monitor API usage and send alerts"
});`
    }
  };

  const mcpConfig = `{
  "name": "ai-chat-server",
  "version": "1.0.0",
  "description": "AI Chat API MCP Server",
  "tools": [
    {
      "name": "create_chat_completion",
      "description": "Create a chat completion with AI",
      "inputSchema": {
        "type": "object",
        "properties": {
          "messages": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "role": {"type": "string", "enum": ["user", "assistant", "system"]},
                "content": {"type": "string"}
              }
            }
          },
          "model": {"type": "string", "default": "gpt-4"}
        },
        "required": ["messages"]
      }
    }
  ]
}`;

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-normal mb-6">
              AI Agents Meet Your APIs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert your APIs into tools that LLMs can use natively through MCP servers
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - MCP Configuration */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    MCP Server Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono">
                      <code>{mcpConfig}</code>
                    </pre>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="secondary">Auto-generated</Badge>
                    <Badge variant="secondary">AI-compatible</Badge>
                    <Badge variant="secondary">Type-safe</Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-medium">How it works:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-accent">1</span>
                    </div>
                    <p className="text-muted-foreground">writeasy analyzes your OpenAPI spec</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-accent">2</span>
                    </div>
                    <p className="text-muted-foreground">Generates MCP server configuration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-accent">3</span>
                    </div>
                    <p className="text-muted-foreground">AI agents can now use your API as a tool</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Live Demos */}
            <div className="space-y-6">
              <div className="flex gap-2 mb-6">
                {Object.entries(demos).map(([key, demo]) => (
                  <Button
                    key={key}
                    variant={activeDemo === key ? "default" : "outline"}
                    onClick={() => setActiveDemo(key)}
                    className="flex items-center gap-2"
                  >
                    <demo.icon className="w-4 h-4" />
                    {demo.title}
                  </Button>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {React.createElement(demos[activeDemo].icon, { className: "w-5 h-5" })}
                    {demos[activeDemo].title} Demo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">User Prompt:</h4>
                    <div className="bg-muted/50 rounded-lg p-3 text-sm">
                      "{demos[activeDemo].prompt}"
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">AI Agent Response:</span>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 text-sm">
                    "{demos[activeDemo].response}"
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Generated Code:</h4>
                    <div className="bg-black rounded-lg p-4 overflow-x-auto">
                      <pre className="text-blue-400 text-sm font-mono">
                        <code>{demos[activeDemo].code}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  <Play className="w-4 h-4 mr-2" />
                  Try Live Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">Native AI Integration</h3>
              <p className="text-muted-foreground">Your APIs become native tools for GPT, Claude, and custom AI agents</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">Automatic Generation</h3>
              <p className="text-muted-foreground">MCP servers generated automatically from your OpenAPI specifications</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">Seamless Communication</h3>
              <p className="text-muted-foreground">AI agents understand your API structure and can use it intelligently</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
