import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "writeasy - AI-Native API Platform",
  description = "Build, test, and deploy AI-native APIs with ease. Generate SDKs, MCP servers, and Terraform providers from OpenAPI specifications.",
  keywords = "API, OpenAPI, SDK, MCP, Terraform, AI, developer tools, API testing, code generation",
  image = "/logo.png",
  url = "https://writeasy.com",
  type = "website",
  author = "writeasy",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  canonical
}) => {
  const fullTitle = title.includes('writeasy') ? title : `${title} | writeasy`;
  const fullUrl = canonical || url;
  const fullImage = image.startsWith('http') ? image : `https://writeasy.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="writeasy" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@writeasy" />
      <meta name="twitter:creator" content="@writeasy" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Article Meta Tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-title" content="writeasy" />
      <meta name="application-name" content="writeasy" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'WebSite',
          "name": fullTitle,
          "description": description,
          "url": fullUrl,
          "image": fullImage,
          "author": {
            "@type": "Organization",
            "name": author
          },
          "publisher": {
            "@type": "Organization",
            "name": "writeasy",
            "logo": {
              "@type": "ImageObject",
              "url": "https://writeasy.com/logo.png"
            }
          },
          ...(type === 'article' && {
            "datePublished": publishedTime,
            "dateModified": modifiedTime,
            "articleSection": section,
            "keywords": tags.join(', ')
          })
        })}
      </script>
    </Helmet>
  );
};

// Page-specific SEO components
export const HomePageSEO = () => (
  <SEO
    title="writeasy - AI-Native API Platform"
    description="Build, test, and deploy AI-native APIs with ease. Generate SDKs, MCP servers, and Terraform providers from OpenAPI specifications."
    keywords="API development, OpenAPI, SDK generation, MCP servers, Terraform providers, AI APIs, developer tools"
    url="https://writeasy.com"
  />
);

export const ProductsPageSEO = () => (
  <SEO
    title="Products - writeasy"
    description="Explore our comprehensive suite of API development tools including OpenAPI editor, SDK generator, MCP server generator, and more."
    keywords="API tools, OpenAPI editor, SDK generator, MCP generator, Terraform generator, API testing"
    url="https://writeasy.com/products"
  />
);

export const PricingPageSEO = () => (
  <SEO
    title="Pricing - writeasy"
    description="Choose the perfect plan for your API development needs. Flexible pricing options for individuals, teams, and enterprises."
    keywords="API pricing, developer tools pricing, subscription plans, enterprise API tools"
    url="https://writeasy.com/pricing"
  />
);

export const DocsPageSEO = () => (
  <SEO
    title="Documentation - writeasy"
    description="Comprehensive documentation for writeasy API development platform. Learn how to build, test, and deploy AI-native APIs."
    keywords="API documentation, developer docs, API guides, tutorials, API best practices"
    url="https://writeasy.com/docs"
  />
);

export const EditorPageSEO = () => (
  <SEO
    title="OpenAPI Editor - writeasy"
    description="Powerful OpenAPI specification editor with real-time validation, preview, and code generation capabilities."
    keywords="OpenAPI editor, API specification, Swagger editor, API validation, code generation"
    url="https://writeasy.com/editor"
  />
);

export const DashboardPageSEO = () => (
  <SEO
    title="Project Dashboard - writeasy"
    description="Manage your API projects with our comprehensive dashboard. Track progress, collaborate with teams, and monitor performance."
    keywords="API project management, developer dashboard, project collaboration, API monitoring"
    url="https://writeasy.com/dashboard"
  />
);

// SEO utility functions
export const generatePageTitle = (pageName: string, baseTitle: string = "writeasy") => {
  return `${pageName} | ${baseTitle}`;
};

export const generateMetaDescription = (content: string, maxLength: number = 160) => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength - 3) + '...';
};

export const generateKeywords = (tags: string[]): string => {
  const baseKeywords = ['API', 'OpenAPI', 'SDK', 'MCP', 'Terraform', 'AI', 'developer tools'];
  return [...baseKeywords, ...tags].join(', ');
};
