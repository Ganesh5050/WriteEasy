// Environment configuration
module.exports = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:8081',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  
  // Supabase Configuration
  SUPABASE_URL: process.env.SUPABASE_URL || 'https://qembjtttxajfruxnwcwo.supabase.co',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbWJqdHR0eGFqZnJ1eG53Y3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MjQyNDMsImV4cCI6MjA3NjQwMDI0M30.7SazdNL4ECwBFoXBDRB7qOan-p7xf83kS2diIYk4CL0',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbWJqdHR0eGFqZnJ1eG53Y3dvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDgyNDI0MywiZXhwIjoyMDc2NDAwMjQzfQ.Ue_1IvtkDAzSEcEJVM362STiFd9jsWYzCl3aEAAVzs8',
  
  // Legacy Database URL (keeping for compatibility)
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/speakeasy_clone',
  
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || '',
  OPENAPI_GENERATOR_VERSION: process.env.OPENAPI_GENERATOR_VERSION || '7.0.0',
  // OAuth Configuration
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID,
  MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET,
  MICROSOFT_REDIRECT_URI: process.env.MICROSOFT_REDIRECT_URI,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI
};
