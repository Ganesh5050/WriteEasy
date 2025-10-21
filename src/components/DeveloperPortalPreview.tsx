import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Code2, 
  Bot, 
  Wrench, 
  Globe, 
  Settings, 
  Users, 
  Activity,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

export const DeveloperPortalPreview = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const projects = [
    {
      name: "AI Chat API",
      status: "active",
      lastDeploy: "2 hours ago",
      endpoints: 12,
      sdkLanguages: ["Python", "JavaScript", "Go"],
      mcpEnabled: true,
      terraformEnabled: true
    },
    {
      name: "Payment Gateway API",
      status: "active", 
      lastDeploy: "1 day ago",
      endpoints: 8,
      sdkLanguages: ["Python", "JavaScript", "Java"],
      mcpEnabled: false,
      terraformEnabled: true
    },
    {
      name: "Analytics API",
      status: "draft",
      lastDeploy: "Never",
      endpoints: 5,
      sdkLanguages: ["Python"],
      mcpEnabled: false,
      terraformEnabled: false
    }
  ];

  const metrics = [
    { label: "Total APIs", value: "3", change: "+1 this month" },
    { label: "SDK Downloads", value: "12.4K", change: "+23%" },
    { label: "MCP Calls", value: "8.7K", change: "+156%" },
    { label: "Active Users", value: "1.2K", change: "+45%" }
  ];

  const recentActivity = [
    { action: "SDK Generated", project: "AI Chat API", language: "Python", time: "2 hours ago" },
    { action: "MCP Server Deployed", project: "AI Chat API", time: "3 hours ago" },
    { action: "Terraform Provider Updated", project: "Payment Gateway API", time: "1 day ago" },
    { action: "API Documentation Published", project: "Analytics API", time: "2 days ago" }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-normal mb-6">
              Developer Portal
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage all your APIs, SDKs, and AI integrations from one unified dashboard
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-muted/30 px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">writeasy Dashboard</h3>
                    <p className="text-sm text-muted-foreground">AI-Native API Platform</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Pro Plan</Badge>
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {metrics.map((metric, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{metric.label}</p>
                              <p className="text-2xl font-bold">{metric.value}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-green-600 dark:text-green-400">{metric.change}</p>
                              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Code2 className="w-5 h-5" />
                          <span className="text-sm">Generate SDK</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Bot className="w-5 h-5" />
                          <span className="text-sm">Create MCP Server</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Wrench className="w-5 h-5" />
                          <span className="text-sm">Terraform Provider</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Globe className="w-5 h-5" />
                          <span className="text-sm">Publish Docs</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  {projects.map((project, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                              <Code2 className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{project.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {project.endpoints} endpoints • Last deployed {project.lastDeploy}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={project.status === "active" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">SDK Languages</p>
                            <div className="flex flex-wrap gap-1 justify-center mt-1">
                              {project.sdkLanguages.map((lang, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">MCP Server</p>
                            <div className="mt-1">
                              {project.mcpEnabled ? (
                                <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                              )}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Terraform</p>
                            <div className="mt-1">
                              {project.terraformEnabled ? (
                                <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                              )}
                            </div>
                          </div>
                          <div className="text-center">
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => window.location.href = '/dashboard'}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5" />
                          SDK Usage
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Python SDK</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-muted rounded-full">
                                <div className="w-3/4 h-2 bg-accent rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">8.2K</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">JavaScript SDK</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-muted rounded-full">
                                <div className="w-1/2 h-2 bg-accent rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">4.2K</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Go SDK</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-muted rounded-full">
                                <div className="w-1/4 h-2 bg-accent rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">1.8K</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bot className="w-5 h-5" />
                          MCP Server Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">GPT-4 Calls</span>
                            <span className="text-sm font-medium">5.2K</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Claude Calls</span>
                            <span className="text-sm font-medium">2.1K</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Custom Agents</span>
                            <span className="text-sm font-medium">1.4K</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-accent" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-muted-foreground">
                                {activity.project} {activity.language && `• ${activity.language}`}
                              </p>
                            </div>
                            <span className="text-sm text-muted-foreground">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-serif font-medium mb-4">
                Ready to manage your APIs?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get started with writeasy and transform your APIs into AI-native, developer-friendly tools
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90"
                  onClick={() => window.location.href = '/login'}
                >
                  <Code2 className="w-4 h-4 mr-2" />
                  Start Building
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => window.location.href = '/demo'}
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
