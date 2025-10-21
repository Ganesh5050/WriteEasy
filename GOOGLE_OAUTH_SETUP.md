# Google OAuth Setup Guide

## 🔐 **How to Set Up Google Authentication**

### **Step 1: Create Google OAuth Credentials**

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project:**
   - Click "Select a project" → "New Project"
   - Name: "Speakeasy Clone" (or any name you prefer)
   - Click "Create"

3. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click "Enable"

4. **Create OAuth Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Speakeasy Clone Web Client"

5. **Configure Authorized URLs:**
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (for development)
     - `http://localhost:8080` (if using different port)
     - `https://yourdomain.com` (for production)
   
   - **Authorized redirect URIs:**
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)

6. **Get Your Credentials:**
   - Copy the **Client ID** (looks like: `123456789-abcdefg.apps.googleusercontent.com`)

### **Step 2: Configure Your Application**

1. **Backend Configuration (.env file):**
   ```env
   GOOGLE_CLIENT_ID=your-client-id-here
   ```

2. **Frontend Configuration (.env file):**
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id-here
   ```

### **Step 3: Test Google Authentication**

1. **Start your servers:**
   ```bash
   # Backend
   cd backend
   npm run dev
   
   # Frontend
   npm run dev
   ```

2. **Test the login:**
   - Go to: `http://localhost:3000/login`
   - Click "Google" button
   - Complete Google authentication
   - You should be logged in!

### **Step 4: Production Deployment**

1. **Update Google Console:**
   - Add your production domain to authorized origins
   - Update redirect URIs for production

2. **Environment Variables:**
   - Set `GOOGLE_CLIENT_ID` in your production environment
   - Set `VITE_GOOGLE_CLIENT_ID` in your frontend build

## 🎯 **What Happens When User Clicks "Google" Button:**

1. **Frontend:** Loads Google Identity Services
2. **Google:** Shows authentication popup
3. **User:** Signs in with Google account
4. **Google:** Returns authentication token
5. **Frontend:** Sends token to your backend
6. **Backend:** Verifies token with Google
7. **Backend:** Creates/updates user account
8. **Backend:** Returns JWT token
9. **Frontend:** Stores token and redirects to home

## 🔧 **Features You Get:**

- ✅ **One-click login** with Google account
- ✅ **Automatic user creation** for new users
- ✅ **Profile picture** from Google
- ✅ **Email verification** (Google handles this)
- ✅ **Secure token verification** on backend
- ✅ **JWT token generation** for session management

## 🚨 **Security Notes:**

- Never expose your Google Client Secret in frontend code
- Always verify tokens on the backend
- Use HTTPS in production
- Regularly rotate your OAuth credentials

## 📱 **Mobile Support:**

The Google OAuth integration works on:
- ✅ Desktop browsers
- ✅ Mobile browsers  
- ✅ Progressive Web Apps (PWA)
- ✅ React Native (with additional setup)

## 🎉 **You're All Set!**

Once configured, users can:
- Click "Google" button on login page
- Sign in with their Google account
- Get automatically logged into your Speakeasy clone
- Access all features with their Google profile
