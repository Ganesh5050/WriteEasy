# Demo Request Feature - Setup Instructions

## ✅ What Was Done

1. **Database Schema Updated** (`backend/database/schema.sql`)
   - Added `demo_requests` table to store demo submissions
   - Configured Row-Level Security (RLS) policies
   - Anyone can submit, users can view their own requests

2. **Backend API Created** (`backend/server.js`)
   - `POST /api/demo-requests` - Submit demo request
   - `GET /api/demo-requests` - View all requests (authenticated)

3. **Frontend Form Updated** (`src/pages/Demo.tsx`)
   - Connected form to backend API
   - Added proper validation
   - Real-time form state management
   - Success/error notifications

## 🗄️ Database Setup (REQUIRED)

**You MUST run this SQL in Supabase to create the demo_requests table:**

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste this SQL:

```sql
-- Demo Requests table
CREATE TABLE public.demo_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  demo_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for demo_requests
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (submit demo request)
CREATE POLICY "Anyone can submit demo requests" ON public.demo_requests
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view their own requests
CREATE POLICY "Users can view own demo requests" ON public.demo_requests
  FOR SELECT USING (auth.email() = email);

-- Add updated_at trigger for demo_requests
CREATE TRIGGER set_updated_at_demo_requests
  BEFORE UPDATE ON public.demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

6. Click **Run** (or press F5)
7. You should see: "Success. No rows returned"

## 🧪 Testing

### 1. Restart Backend Server

```bash
# Stop the current backend (Ctrl+C in the terminal)
cd backend
node server.js
```

### 2. Test the Demo Form

1. Open your browser to: http://localhost:8081/demo
2. Fill out the form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - (Optional fields)
3. Click "Schedule Demo"
4. You should see: "Demo Request Submitted! 🎉"

### 3. Verify in Supabase

1. Go to Supabase Dashboard
2. Click **Table Editor** (left sidebar)
3. Select `demo_requests` table
4. You should see your test submission!

## 📊 Viewing Demo Requests (Admin)

To view all demo requests, you'll need to be logged in:

```bash
# In your browser console or using Postman
GET http://localhost:3001/api/demo-requests
Headers: {
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

## ✅ Ready for Deployment

Once tested locally and working:

1. Commit changes:
```bash
git add .
git commit -m "Add working demo request feature with database integration"
git push origin main
```

2. The table will need to be created in production Supabase as well (run the same SQL)

3. Backend on Render will auto-deploy from GitHub

4. Frontend on Vercel will auto-deploy from GitHub

## 🎉 Done!

Your demo form now:
- ✅ Actually saves data to Supabase
- ✅ Shows real success/error messages
- ✅ Validates required fields
- ✅ Resets after successful submission
- ✅ Has proper loading states

