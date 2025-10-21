# ✅ Deployment Checklist for WriteEasy

## Pre-Deployment

- [x] ✅ Authentication system working (login/signup/logout)
- [x] ✅ Frontend builds successfully (`npm run build`)
- [x] ✅ Backend runs without errors
- [x] ✅ Database schema deployed to Supabase
- [x] ✅ Environment variables documented
- [x] ✅ `.gitignore` configured
- [x] ✅ README.md created
- [x] ✅ Deployment guide created

## GitHub Setup

- [ ] 1. Initialize Git repository
  ```bash
  git init
  git add .
  git commit -m "Initial commit - WriteEasy ready for deployment"
  ```

- [ ] 2. Push to GitHub
  ```bash
  git remote add origin https://github.com/Ganesh5050/WriteEasy.git
  git branch -M main
  git push -u origin main
  ```

- [ ] 3. Enable GitHub Actions
  - Go to repository → Settings → Actions → Allow all actions

## Vercel Deployment (Frontend)

- [ ] 1. Connect Vercel to GitHub
  - Go to https://vercel.com
  - Click "Add New" → "Project"
  - Import `Ganesh5050/WriteEasy`

- [ ] 2. Configure Build Settings
  - Framework: `Vite`
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`

- [ ] 3. Add Environment Variables in Vercel
  ```
  VITE_API_URL=https://your-backend-url.onrender.com/api
  VITE_SUPABASE_URL=https://mtdulnmfevbtblvcfdoe.supabase.co
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
  VITE_GITHUB_CLIENT_ID=your_github_oauth_client_id
  ```

- [ ] 4. Deploy
  - Click "Deploy"
  - Wait for build to complete
  - Note your deployment URL

## Backend Deployment (Render)

- [ ] 1. Create Render Account
  - Go to https://render.com
  - Sign up with GitHub

- [ ] 2. Create New Web Service
  - Click "New" → "Web Service"
  - Connect your GitHub repository
  - Select `Ganesh5050/WriteEasy`

- [ ] 3. Configure Service
  - Name: `writeeasy-backend`
  - Root Directory: `backend`
  - Runtime: `Node`
  - Build Command: `npm install`
  - Start Command: `node server.js`
  - Instance Type: `Free`

- [ ] 4. Add Environment Variables
  ```
  JWT_SECRET=change_this_to_a_very_secure_random_string
  SUPABASE_URL=https://mtdulnmfevbtblvcfdoe.supabase.co
  SUPABASE_ANON_KEY=your_supabase_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
  PORT=3001
  NODE_ENV=production
  ```

- [ ] 5. Deploy
  - Click "Create Web Service"
  - Wait for deployment
  - Copy your backend URL

## Post-Deployment

- [ ] 1. Update Frontend Environment Variables
  - Go back to Vercel
  - Update `VITE_API_URL` with your Render backend URL
  - Example: `https://writeeasy-backend.onrender.com/api`
  - Redeploy frontend

- [ ] 2. Update OAuth Redirect URLs
  **Google OAuth:**
  - Go to Google Cloud Console
  - Add authorized redirect URIs:
    - `https://your-app.vercel.app/auth/google/callback`
    - `https://your-backend.onrender.com/api/auth/google/callback`

  **GitHub OAuth:**
  - Go to GitHub Settings → Developer settings → OAuth Apps
  - Update callback URL:
    - `https://your-app.vercel.app/auth/github/callback`

- [ ] 3. Test Production Deployment
  - [ ] Visit your Vercel URL
  - [ ] Try to sign up with email/password
  - [ ] Try to log in
  - [ ] Try OAuth login (Google/GitHub)
  - [ ] Upload an OpenAPI spec
  - [ ] Generate an SDK
  - [ ] Check if downloads work

## GitHub Actions (Optional)

- [ ] 1. Get Vercel Token
  - Go to Vercel → Settings → Tokens
  - Create a new token
  - Copy the token

- [ ] 2. Get Vercel Project IDs
  ```bash
  npm i -g vercel
  vercel login
  vercel link
  # Copy org_id and project_id from .vercel/project.json
  ```

- [ ] 3. Add GitHub Secrets
  - Go to GitHub → Settings → Secrets and variables → Actions
  - Add these secrets:
    ```
    VERCEL_TOKEN=your_vercel_token
    VERCEL_ORG_ID=your_org_id
    VERCEL_PROJECT_ID=your_project_id
    VITE_API_URL=your_backend_url
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_anon_key
    ```

## Final Verification

- [ ] ✅ Frontend is live and accessible
- [ ] ✅ Backend API is responding
- [ ] ✅ Authentication works
- [ ] ✅ Database queries work
- [ ] ✅ File uploads work
- [ ] ✅ SDK generation works
- [ ] ✅ No console errors
- [ ] ✅ Mobile responsive
- [ ] ✅ Fast load times

## 🎉 You're Live!

Your WriteEasy app should now be:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com

## Troubleshooting

### "Network Error" on frontend
- Check if backend URL is correct in Vercel env vars
- Check if backend is running on Render
- Check CORS settings in backend

### Authentication fails
- Verify Supabase credentials
- Check JWT_SECRET is set
- Check OAuth redirect URLs

### Backend crashes
- Check Render logs
- Verify all environment variables are set
- Check database connection

---

**Need help?** Check the full [DEPLOYMENT.md](DEPLOYMENT.md) guide!

