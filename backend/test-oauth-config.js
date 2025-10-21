#!/usr/bin/env node

/**
 * OAuth Configuration Test Script
 * Tests if all OAuth environment variables are properly configured
 */

const config = require('./config');

console.log('🔐 OAuth Configuration Test');
console.log('============================\n');

// Test Google OAuth
console.log('🌐 Google OAuth:');
console.log(`   Client ID: ${config.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing'}`);
console.log('');

// Test GitHub OAuth
console.log('🐙 GitHub OAuth:');
console.log(`   Client ID: ${config.GITHUB_CLIENT_ID ? '✅ Set' : '❌ Missing'}`);
console.log(`   Client Secret: ${config.GITHUB_CLIENT_SECRET ? '✅ Set' : '❌ Missing'}`);
console.log('');

// Test Microsoft OAuth
console.log('🔵 Microsoft OAuth:');
console.log(`   Client ID: ${config.MICROSOFT_CLIENT_ID ? '✅ Set' : '❌ Missing'}`);
console.log(`   Client Secret: ${config.MICROSOFT_CLIENT_SECRET ? '✅ Set' : '❌ Missing'}`);
console.log(`   Redirect URI: ${config.MICROSOFT_REDIRECT_URI ? '✅ Set' : '❌ Missing'}`);
console.log('');

// Test Discord OAuth
console.log('🎮 Discord OAuth:');
console.log(`   Client ID: ${config.DISCORD_CLIENT_ID ? '✅ Set' : '❌ Missing'}`);
console.log(`   Client Secret: ${config.DISCORD_CLIENT_SECRET ? '✅ Set' : '❌ Missing'}`);
console.log(`   Redirect URI: ${config.DISCORD_REDIRECT_URI ? '✅ Set' : '❌ Missing'}`);
console.log('');

// Summary
const totalProviders = 4;
const configuredProviders = [
  config.GOOGLE_CLIENT_ID,
  config.GITHUB_CLIENT_ID && config.GITHUB_CLIENT_SECRET,
  config.MICROSOFT_CLIENT_ID && config.MICROSOFT_CLIENT_SECRET && config.MICROSOFT_REDIRECT_URI,
  config.DISCORD_CLIENT_ID && config.DISCORD_CLIENT_SECRET && config.DISCORD_REDIRECT_URI
].filter(Boolean).length;

console.log('📊 Summary:');
console.log(`   Configured Providers: ${configuredProviders}/${totalProviders}`);

if (configuredProviders === totalProviders) {
  console.log('   🎉 All OAuth providers are configured!');
} else {
  console.log('   ⚠️  Some OAuth providers need configuration.');
  console.log('   📖 See OAUTH_SETUP_GUIDE.md for setup instructions.');
}

console.log('\n🚀 Ready to test OAuth authentication!');
