# 🔐 OAuth Setup Guide

This guide will help you set up OAuth authentication for GitHub, Microsoft, Discord, and Google in your Speakeasy Clone project.

## 📋 **OVERVIEW**

Your app now supports 4 OAuth providers:
- 🐙 **GitHub** - For developers
- 🔵 **Microsoft** - For enterprise users  
- 🎮 **Discord** - For gaming communities
- 🌐 **Google** - For general users

## 🔑 **STEP-BY-STEP SETUP**

### **1. 🐙 GITHUB OAUTH SETUP**

#### **Step 1: Create GitHub OAuth App**
1. **Go to**: https://github.com/settings/developers
2. **Click**: "New OAuth App"
3. **Fill out the form**:
   ```
   Application name: Speakeasy Clone
   Homepage URL: http://localhost:8081
   Authorization callback URL: http://localhost:8081/auth/github/callback
   ```
4. **Click**: "Register application"

#### **Step 2: Get Your Keys**
- **Client ID**: Copy from the app page (e.g., `Ov23liABC123...`)
- **Client Secret**: Click "Generate a new client secret" and copy it

#### **Step 3: Add to Environment**
Add to your `backend/.env`:
```env
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

Add to your `frontend/.env`:
```env
VITE_GITHUB_CLIENT_ID=your_github_client_id_here
```

---

### **2. 🔵 MICROSOFT OAUTH SETUP**

#### **Step 1: Create Azure App Registration**
1. **Go to**: https://portal.azure.com/
2. **Search**: "App registrations"
3. **Click**: "New registration"

#### **Step 2: Register Your App**
```
Name: Speakeasy Clone
Supported account types: Accounts in any organizational directory and personal Microsoft accounts
Redirect URI: Web - http://localhost:8081/auth/microsoft/callback
```

#### **Step 3: Configure Authentication**
1. **Go to**: "Authentication" in your app
2. **Add Platform**: Web
3. **Redirect URIs**: `http://localhost:8081/auth/microsoft/callback`
4. **Implicit grant**: Check "Access tokens" and "ID tokens"

#### **Step 4: Get Your Keys**
- **Application (client) ID**: Copy from "Overview" page
- **Client Secret**: Go to "Certificates & secrets" → "New client secret"

#### **Step 5: Add to Environment**
Add to your `backend/.env`:
```env
MICROSOFT_CLIENT_ID=your_microsoft_client_id_here
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret_here
MICROSOFT_REDIRECT_URI=http://localhost:8081/auth/microsoft/callback
```

Add to your `frontend/.env`:
```env
VITE_MICROSOFT_CLIENT_ID=your_microsoft_client_id_here
```

---

### **3. 🎮 DISCORD OAUTH SETUP**

#### **Step 1: Create Discord Application**
1. **Go to**: https://discord.com/developers/applications
2. **Click**: "New Application"
3. **Name**: Speakeasy Clone

#### **Step 2: Set Up OAuth2**
1. **Go to**: "OAuth2" → "General"
2. **Add Redirect URI**: `http://localhost:8081/auth/discord/callback`
3. **Scopes**: Select `identify` and `email`

#### **Step 3: Get Your Keys**
- **Client ID**: Copy from "General Information"
- **Client Secret**: Copy from "General Information"

#### **Step 4: Add to Environment**
Add to your `backend/.env`:
```env
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here
DISCORD_REDIRECT_URI=http://localhost:8081/auth/discord/callback
```

Add to your `frontend/.env`:
```env
VITE_DISCORD_CLIENT_ID=your_discord_client_id_here
```

---

### **4. 🌐 GOOGLE OAUTH SETUP** (Already Done)

You already have Google OAuth set up! If you need to update it:

#### **Google Cloud Console**
1. **Go to**: https://console.cloud.google.com/
2. **Select**: Your project (logical-line-417018)
3. **Go to**: APIs & Services → Credentials
4. **Update**: Authorized JavaScript origins to include `http://localhost:8081`

---

## 🚀 **TESTING YOUR OAUTH SETUP**

### **1. Start Your Servers**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
npm run dev
```

### **2. Test Each Provider**
1. **Go to**: http://localhost:8081/login
2. **Click**: Each OAuth button (GitHub, Microsoft, Discord, Google)
3. **Complete**: The OAuth flow
4. **Verify**: You're redirected back and logged in

### **3. Check Console Logs**
Look for successful authentication messages in both frontend and backend consoles.

---

## 🔧 **TROUBLESHOOTING**

### **Common Issues:**

#### **"Origin not allowed" Error**
- **Solution**: Add `http://localhost:8081` to authorized origins in your OAuth provider settings

#### **"Invalid redirect URI" Error**
- **Solution**: Ensure redirect URIs match exactly: `http://localhost:8081/auth/{provider}/callback`

#### **"Client ID not found" Error**
- **Solution**: Check your environment variables are loaded correctly

#### **Backend Connection Error**
- **Solution**: Ensure backend is running on port 3001

---

## 📝 **ENVIRONMENT VARIABLES SUMMARY**

### **Backend (.env)**
```env
# GitHub
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Microsoft
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
MICROSOFT_REDIRECT_URI=http://localhost:8081/auth/microsoft/callback

# Discord
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:8081/auth/discord/callback

# Google (already set)
GOOGLE_CLIENT_ID=872177698361-3lkqn96f8gduf87fp18lcqieulvttnqr.apps.googleusercontent.com
```

### **Frontend (.env)**
```env
# GitHub
VITE_GITHUB_CLIENT_ID=your_github_client_id

# Microsoft
VITE_MICROSOFT_CLIENT_ID=your_microsoft_client_id

# Discord
VITE_DISCORD_CLIENT_ID=your_discord_client_id

# Google (already set)
VITE_GOOGLE_CLIENT_ID=872177698361-3lkqn96f8gduf87fp18lcqieulvttnqr.apps.googleusercontent.com
```

---

## 🎉 **YOU'RE ALL SET!**

Once you've added all the OAuth keys to your environment files, your users will be able to sign in with:

- 🐙 **GitHub** - Perfect for developers
- 🔵 **Microsoft** - Great for enterprise users
- 🎮 **Discord** - Ideal for gaming communities  
- 🌐 **Google** - Universal access

**Happy coding!** 🚀
