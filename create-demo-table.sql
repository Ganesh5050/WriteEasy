-- Run this in Supabase SQL Editor to create the demo_requests table

-- Demo Requests table
CREATE TABLE IF NOT EXISTS public.demo_requests (
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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can submit demo requests" ON public.demo_requests;
DROP POLICY IF EXISTS "Users can view own demo requests" ON public.demo_requests;

-- Allow anyone to insert (submit demo request)
CREATE POLICY "Anyone can submit demo requests" ON public.demo_requests
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view their own requests
CREATE POLICY "Users can view own demo requests" ON public.demo_requests
  FOR SELECT USING (auth.email() = email);

-- Add updated_at trigger for demo_requests
DROP TRIGGER IF EXISTS set_updated_at_demo_requests ON public.demo_requests;
CREATE TRIGGER set_updated_at_demo_requests
  BEFORE UPDATE ON public.demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Demo requests table created successfully!' as result;

