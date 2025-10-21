import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const VersionControlSimple = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
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
            <h1 className="text-4xl font-serif font-normal mb-2 animate-stagger-1">Version Control</h1>
            <p className="text-muted-foreground animate-stagger-2">Manage your Git repositories, branches, commits, and pull requests</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Repository Sidebar */}
            <div className="space-y-6">
              <Card className="animate-stagger-3">
                <CardHeader>
                  <CardTitle>Repositories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">writeasy-platform</h4>
                      <p className="text-sm text-muted-foreground">AI-native API platform for developers</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">writeasy-docs</h4>
                      <p className="text-sm text-muted-foreground">Documentation and guides</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">writeasy-examples</h4>
                      <p className="text-sm text-muted-foreground">Code examples and tutorials</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="animate-stagger-4">
                <CardHeader>
                  <CardTitle>Recent Commits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">feat: add AI model integration to MCP server</h4>
                      <p className="text-sm text-muted-foreground">John Doe • 2 hours ago</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">fix: resolve authentication issues with OAuth</h4>
                      <p className="text-sm text-muted-foreground">Jane Smith • 3 hours ago</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">docs: update API documentation</h4>
                      <p className="text-sm text-muted-foreground">Bob Johnson • 1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
