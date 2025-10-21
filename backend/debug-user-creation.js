const { supabaseAdmin } = require('./config/supabase');

async function testUserCreation() {
  console.log('🧪 Testing Supabase Auth User Creation...');
  
  try {
    // Test creating a user in Supabase Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: 'test-debug@example.com',
      password: 'test123456',
      user_metadata: { name: 'Test Debug User' }
    });
    
    if (authError) {
      console.error('❌ Supabase Auth Error:', authError);
      return;
    }
    
    console.log('✅ Supabase Auth user created:', authUser.user.id);
    
    // Test creating user in our database
    const { User } = require('./models');
    const userModel = new User();
    
    const user = await userModel.create({
      id: authUser.user.id,
      email: 'test-debug@example.com',
      name: 'Test Debug User',
      provider: 'email'
    });
    
    console.log('✅ Database user created:', user.id);
    
    // Clean up - delete the test user
    await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
    console.log('🧹 Test user cleaned up');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testUserCreation();
