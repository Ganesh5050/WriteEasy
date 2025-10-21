const { supabaseAdmin } = require('./config/supabase');

async function checkExistingUsers() {
  console.log('🔍 Checking existing users in database...');
  
  try {
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .limit(10);
    
    if (error) {
      console.error('❌ Error fetching users:', error);
      return;
    }
    
    console.log(`📊 Found ${users.length} users in database:`);
    users.forEach(user => {
      console.log(`   - ${user.email} (${user.id}) - Provider: ${user.provider}`);
    });
    
    // Also check Supabase Auth users
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (authError) {
      console.error('❌ Error fetching auth users:', authError);
      return;
    }
    
    console.log(`🔐 Found ${authUsers.users.length} users in Supabase Auth:`);
    authUsers.users.forEach(user => {
      console.log(`   - ${user.email} (${user.id})`);
    });
    
  } catch (error) {
    console.error('❌ Check failed:', error);
  }
}

checkExistingUsers();
