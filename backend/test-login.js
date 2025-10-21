const { supabaseAdmin } = require('./config/supabase');

async function testLogin() {
  console.log('🧪 Testing Login...');
  
  try {
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email: 'test-fixed@example.com',
      password: 'test123'
    });
    
    if (authError) {
      console.error('❌ Supabase Auth Login Error:', authError);
      return;
    }
    
    console.log('✅ Supabase Auth Login Success:', authData.user.email);
    
  } catch (error) {
    console.error('❌ Login test failed:', error);
  }
}

testLogin();
