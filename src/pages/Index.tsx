import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { Features } from "@/components/Features";
import { ApiDemo } from "@/components/ApiDemo";
import { McpServerShowcase } from "@/components/McpServerShowcase";
import { TerraformProviderShowcase } from "@/components/TerraformProviderShowcase";
import { DeveloperPortalPreview } from "@/components/DeveloperPortalPreview";
import Footer from "@/components/Footer";
import { HomePageSEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomePageSEO />
      <Navigation />
      <Hero />
      <TrustedBy />
      <Features />
      <ApiDemo />
      <McpServerShowcase />
      <TerraformProviderShowcase />
      <DeveloperPortalPreview />
      <Footer />
    </div>
  );
};

export default Index;
