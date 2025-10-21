import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Server, Database, Cloud, Copy, CheckCircle, Play, ArrowRight } from "lucide-react";

export const TerraformProviderShowcase = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const openApiSpec = `openapi: 3.0.0
info:
  title: Cloud Infrastructure API
  version: 1.0.0
paths:
  /servers:
    post:
      summary: Create a new server
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                name: { type: string }
                region: { type: string }
                instance_type: { type: string }
      responses:
        '201':
          description: Server created
          content:
            application/json:
              schema:
                type: object
                properties:
                  id: { type: string }
                  status: { type: string }`;

  const terraformProvider = `resource "writeasy_server" "web_server" {
  name          = "web-server-prod"
  region        = "us-west-2"
  instance_type = "t3.medium"
  
  tags = {
    Environment = "production"
    Project     = "web-app"
  }
}

resource "writeasy_database" "main_db" {
  name     = "main-database"
  engine   = "postgresql"
  version  = "13.7"
  instance_class = "db.t3.micro"
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
}

output "server_id" {
  value = writeasy_server.web_server.id
}

output "database_endpoint" {
  value = writeasy_database.main_db.endpoint
}`;

  const terraformPlan = `Terraform will perform the following actions:

  # writeasy_database.main_db will be created
  + resource "writeasy_database" "main_db" {
      + backup_retention_period = 7
      + backup_window          = "03:00-04:00"
      + engine                 = "postgresql"
      + id                     = (known after apply)
      + instance_class         = "db.t3.micro"
      + name                   = "main-database"
      + version                = "13.7"
    }

  # writeasy_server.web_server will be created
  + resource "writeasy_server" "web_server" {
      + id            = (known after apply)
      + instance_type = "t3.medium"
      + name          = "web-server-prod"
      + region        = "us-west-2"
      + tags          = {
          + "Environment" = "production"
          + "Project"     = "web-app"
        }
    }

Plan: 2 to add, 0 to change, 0 to destroy.`;

  const useCases = [
    {
      icon: Server,
      title: "Server Management",
      description: "Create and manage cloud servers through Terraform",
      example: `resource "writeasy_server" "api_server" {
  name          = "api-server"
  region        = "us-east-1"
  instance_type = "t3.large"
}`
    },
    {
      icon: Database,
      title: "Database Provisioning",
      description: "Automate database creation and configuration",
      example: `resource "writeasy_database" "analytics_db" {
  name     = "analytics-db"
  engine   = "postgresql"
  version  = "14.2"
  instance_class = "db.r5.large"
}`
    },
    {
      icon: Cloud,
      title: "Cloud Resources",
      description: "Manage any cloud resource through your API",
      example: `resource "writeasy_storage" "data_bucket" {
  name      = "data-storage"
  region    = "us-west-2"
  storage_class = "STANDARD"
}`
    }
  ];

  return (
    <section className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-normal mb-6">
              Infrastructure as Code
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Turn your APIs into Terraform providers for seamless infrastructure management
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - OpenAPI to Terraform */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5" />
                    Your OpenAPI Spec
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono">
                      <code>{openApiSpec}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">writeasy generates Terraform provider</span>
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-5 h-5" />
                      Generated Terraform Provider
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(terraformProvider, "terraform")}
                    >
                      {copiedCode === "terraform" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-orange-400 text-sm font-mono">
                      <code>{terraformProvider}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Terraform Plan */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Terraform Plan Output
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-blue-400 text-sm font-mono">
                      <code>{terraformPlan}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-medium">Benefits:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-muted-foreground">Infrastructure as Code from your API</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-muted-foreground">Automatic resource management</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-muted-foreground">State management and drift detection</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-muted-foreground">CI/CD integration ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-serif font-medium text-center mb-12">
              Common Use Cases
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <useCase.icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{useCase.description}</p>
                    <div className="bg-black rounded-lg p-3 overflow-x-auto">
                      <pre className="text-green-400 text-xs font-mono">
                        <code>{useCase.example}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-serif font-medium mb-4">
                Ready to automate your infrastructure?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Generate Terraform providers from your OpenAPI specs and manage your infrastructure as code
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90"
                  onClick={() => window.location.href = '/terraform-generator'}
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  Generate Provider
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => window.location.href = '/docs'}
                >
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
