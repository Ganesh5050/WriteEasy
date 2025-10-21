# 🚀 WriteEasy Deployment Guide

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- Supabase account (already set up)

## 📋 Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - WriteEasy ready for deployment"
   ```

2. **Add remote and push**:
   ```bash
   git remote add origin https://github.com/Ganesh5050/WriteEasy.git
   git branch -M main
   git push -u origin main
   ```

## 🌐 Step 2: Deploy Frontend to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Import Project**: Click "Add New" → "Project"
3. **Import from GitHub**: Select `Ganesh5050/WriteEasy`
4. **Configure Project**:
   - Framework Preset: `Vite`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Add Environment Variables**:
   ```
   VITE_API_URL=your_backend_url_here
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_GITHUB_CLIENT_ID=your_github_client_id
   ```

6. **Deploy**: Click "Deploy"

## 🔧 Step 3: Deploy Backend

### Option A: Deploy to Render (Recommended for Node.js)

1. **Go to Render**: https://render.com
2. **New Web Service**: Click "New" → "Web Service"
3. **Connect Repository**: Select `Ganesh5050/WriteEasy`
4. **Configure**:
   - Name: `writeasy-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Instance Type: `Free`

5. **Environment Variables**:
   ```
   JWT_SECRET=your_super_secret_jwt_key_here_change_this
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PORT=3001
   OPENAI_API_KEY=your_openai_api_key (optional)
   ```

6. **Deploy**: Click "Create Web Service"

### Option B: Deploy to Railway

1. **Go to Railway**: https://railway.app
2. **New Project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select Repository**: `Ganesh5050/WriteEasy`
4. **Add Service**: Add a service for the backend
5. **Configure Root Directory**: Set to `backend`
6. **Add Environment Variables** (same as above)
7. **Deploy**

## 🔐 Step 4: Update Environment Variables

Once backend is deployed, update your Vercel frontend environment variables:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Then **redeploy** the frontend in Vercel.

## 📝 Step 5: GitHub Actions Setup

1. **Go to GitHub Repository Settings** → **Secrets and variables** → **Actions**
2. **Add Repository Secrets**:
   ```
   VERCEL_TOKEN=your_vercel_token
   VERCEL_ORG_ID=your_vercel_org_id
   VERCEL_PROJECT_ID=your_vercel_project_id
   VITE_API_URL=your_backend_url
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Get Vercel Token**:
   - Go to Vercel → Settings → Tokens
   - Create a new token
   
4. **Get Vercel IDs**:
   ```bash
   npm i -g vercel
   vercel login
   vercel link
   ```
   - Copy the `.vercel/project.json` values

## ✅ Verification

1. **Frontend**: Visit your Vercel URL (e.g., `https://writeeasy.vercel.app`)
2. **Backend**: Test API endpoint (e.g., `https://your-backend.onrender.com/api/health`)
3. **Authentication**: Try to sign up/login
4. **Features**: Test SDK generation, docs generation

## 🔄 Auto-Deployment

Every push to `main` branch will automatically:
- ✅ Build and deploy frontend to Vercel (via GitHub Actions)
- ✅ Deploy backend to Render/Railway (via platform integration)

## 🐛 Troubleshooting

### Frontend shows "Network Error"
- Check if `VITE_API_URL` is set correctly in Vercel
- Ensure backend is running

### Backend crashes
- Check environment variables are set
- Check Supabase credentials are correct
- Check logs in Render/Railway dashboard

### Authentication fails
- Verify Supabase URL and keys
- Check JWT_SECRET is set on backend
- Ensure CORS is configured correctly

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

**🎉 Congratulations! Your WriteEasy app is now live!**

