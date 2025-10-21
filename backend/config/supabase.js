// Supabase Configuration
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://qembjtttxajfruxnwcwo.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbWJqdHR0eGFqZnJ1eG53Y3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MjQyNDMsImV4cCI6MjA3NjQwMDI0M30.7SazdNL4ECwBFoXBDRB7qOan-p7xf83kS2diIYk4CL0';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbWJqdHR0eGFqZnJ1eG53Y3dvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDgyNDI0MywiZXhwIjoyMDc2NDAwMjQzfQ.Ue_1IvtkDAzSEcEJVM362STiFd9jsWYzCl3aEAAVzs8';

// Create Supabase clients
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

module.exports = {
  supabase,
  supabaseAdmin,
  supabaseUrl,
  supabaseAnonKey,
  supabaseServiceKey
};
