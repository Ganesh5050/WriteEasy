// Frontend Supabase Configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qembjtttxajfruxnwcwo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbWJqdHR0eGFqZnJ1eG53Y3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MjQyNDMsImV4cCI6MjA3NjQwMDI0M30.7SazdNL4ECwBFoXBDRB7qOan-p7xf83kS2diIYk4CL0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
