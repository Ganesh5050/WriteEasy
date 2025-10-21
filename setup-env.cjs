#!/usr/bin/env node

/**
 * Environment Setup Script
 * Creates the necessary .env files with the correct configuration
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment files...\n');

// Backend .env content
const backendEnv = `# Backend Environment Variables
PORT=3001
NODE_ENV=development

# JWT Secret (from Supabase)
JWT_SECRET=hsrokUUyxZ0rsF7005hF1Qz/YdQff2ehVcpoAuD9qHNj1Nsfq6wnKdPThIdzuNrhAtNR40JCpSIOpzQWPODB9w==

# Supabase Configuration
SUPABASE_URL=https://qembjtttxajfruxnwcwo.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbWJqdHR0eGFqZnJ1eG53Y3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MjQyNDMsImV4cCI6MjA3NjQwMDI0M30.7SazdNL4ECwBFoXBDRB7qOan-p7xf83kS2diIYk4CL0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbWJqdHR0eGFqZnJ1eG53Y3dvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDgyNDI0MywiZXhwIjoyMDc2NDAwMjQzfQ.Ue_1IvtkDAzSEcEJVM362STiFd9jsWYzCl3aEAAVzs8

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Google OAuth
GOOGLE_CLIENT_ID=872177698361-3lkqn96f8gduf87fp18lcqieulvttnqr.apps.googleusercontent.com

# OAuth Configuration (add your keys here when you get them)
# GITHUB_CLIENT_ID=your_github_client_id_here
# GITHUB_CLIENT_SECRET=your_github_client_secret_here
# MICROSOFT_CLIENT_ID=your_microsoft_client_id_here
# MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret_here
# MICROSOFT_REDIRECT_URI=http://localhost:8081/auth/microsoft/callback
# DISCORD_CLIENT_ID=your_discord_client_id_here
# DISCORD_CLIENT_SECRET=your_discord_client_secret_here
# DISCORD_REDIRECT_URI=http://localhost:8081/auth/discord/callback

# Database URL (legacy, keeping for compatibility)
DATABASE_URL=postgresql://username:password@localhost:5432/speakeasy_clone

# Email Configuration (optional)
EMAIL_USER=
EMAIL_PASS=

# Stripe Configuration (optional)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# OpenAPI Generator Version
OPENAPI_GENERATOR_VERSION=7.0.0`;

// Frontend .env content
const frontendEnv = `# Frontend Environment Variables
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Speakeasy Clone
VITE_APP_VERSION=1.0.0
VITE_FRONTEND_URL=http://localhost:8081

# Supabase Configuration
VITE_SUPABASE_URL=https://qembjtttxajfruxnwcwo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbWJqdHR0eGFqZnJ1eG53Y3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MjQyNDMsImV4cCI6MjA3NjQwMDI0M30.7SazdNL4ECwBFoXBDRB7qOan-p7xf83kS2diIYk4CL0

# Google OAuth
VITE_GOOGLE_CLIENT_ID=872177698361-3lkqn96f8gduf87fp18lcqieulvttnqr.apps.googleusercontent.com

# OAuth Configuration (add your keys here when you get them)
# VITE_GITHUB_CLIENT_ID=your_github_client_id_here
# VITE_MICROSOFT_CLIENT_ID=your_microsoft_client_id_here
# VITE_DISCORD_CLIENT_ID=your_discord_client_id_here`;

try {
  // Create backend .env
  const backendPath = path.join(__dirname, '.env');
  fs.writeFileSync(backendPath, backendEnv);
  console.log('✅ Backend .env file created');

  // Create frontend .env
  const frontendPath = path.join(__dirname, '..', 'frontend', '.env');
  fs.writeFileSync(frontendPath, frontendEnv);
  console.log('✅ Frontend .env file created');

  console.log('\n🎉 Environment files created successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Restart your backend server: npm run dev');
  console.log('2. Restart your frontend server: npm run dev');
  console.log('3. Test the authentication system');
  console.log('\n🔑 Your Supabase JWT secret is now configured!');

} catch (error) {
  console.error('❌ Error creating environment files:', error.message);
  console.log('\n📝 Manual setup required:');
  console.log('1. Create backend/.env with the JWT secret');
  console.log('2. Create frontend/.env with the configuration');
  console.log('3. Restart both servers');
}
