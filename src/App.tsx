import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { testApiConnection } from "@/lib/api-test";
import { useEffect } from "react";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Resources from "./pages/Resources";
import Company from "./pages/Company";
import Docs from "./pages/Docs";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import { OpenApiEditor } from "@/components/OpenApiEditor";
import { SdkGenerator } from "@/components/SdkGenerator";
import { McpServerGenerator } from "@/components/McpServerGenerator";
import { TerraformProviderGenerator } from "@/components/TerraformProviderGenerator";
import { DocsGenerator } from "@/components/DocsGenerator";
import { ApiTester } from "@/components/ApiTester";
import { ProjectDashboard } from "@/components/ProjectDashboard";
import { VersionControlSimple as VersionControl } from "@/components/VersionControlSimple";
import { NotificationSystemSimple as NotificationSystem } from "@/components/NotificationSystemSimple";
import Login from "@/pages/Login";
import ModernLogin from "@/pages/ModernLogin";
import SimpleLogin from "@/pages/SimpleLogin";
import Gram from "@/pages/Gram";
import Guides from "@/pages/Guides";
import ApiDesignGuide from "@/pages/ApiDesignGuide";
import OpenApiHub from "@/pages/OpenApiHub";
import McpHub from "@/pages/McpHub";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import Demo from "@/pages/Demo";
import { OpenAIChat } from "@/components/OpenAIChat";
import { OpenAITest } from "@/components/OpenAITest";
import OAuthCallback from "@/pages/OAuthCallback";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Test API connection on app startup
    testApiConnection().then(success => {
      if (success) {
        console.log('🚀 Backend API is ready!');
      } else {
        console.warn('⚠️ Backend API is not available. Some features may not work.');
      }
    });
  }, []);

  return (
    <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/company" element={<Company />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/editor" element={<OpenApiEditor />} />
                <Route path="/openapi-editor" element={<OpenApiEditor />} />
                <Route path="/sdk-generator" element={<SdkGenerator />} />
                <Route path="/mcp-generator" element={<McpServerGenerator />} />
                <Route path="/terraform-generator" element={<TerraformProviderGenerator />} />
                <Route path="/docs-generator" element={<DocsGenerator />} />
                <Route path="/api-tester" element={<ApiTester />} />
                <Route path="/dashboard" element={<ProjectDashboard />} />
                <Route path="/version-control" element={<VersionControl />} />
                <Route path="/notifications" element={<NotificationSystem />} />
                <Route path="/login" element={<ModernLogin />} />
                <Route path="/login-old" element={<Login />} />
                <Route path="/gram" element={<Gram />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/api-design-guide" element={<ApiDesignGuide />} />
                <Route path="/openapi-hub" element={<OpenApiHub />} />
                <Route path="/mcp-hub" element={<McpHub />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/openai-chat" element={<OpenAIChat />} />
                    <Route path="/openai-test" element={<OpenAITest />} />
                    {/* OAuth Callback Routes */}
                    <Route path="/auth/github/callback" element={<OAuthCallback />} />
                    <Route path="/auth/microsoft/callback" element={<OAuthCallback />} />
                    <Route path="/auth/discord/callback" element={<OAuthCallback />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
      <AccessibilityPanel />
    </ErrorBoundary>
  );
};

export default App;
