const { supabaseAdmin } = require('./config/supabase');
const { User } = require('./models');

async function testRegistrationFlow() {
  console.log('🧪 Testing Complete Registration Flow...');
  
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'test123456';
  const testName = 'Test User';
  
  try {
    console.log(`📧 Testing with email: ${testEmail}`);
    
    // Step 1: Check if user exists (should not exist)
    const userModel = new User();
    const existingUser = await userModel.findByEmail(testEmail);
    if (existingUser) {
      console.log('❌ User already exists, this should not happen');
      return;
    }
    console.log('✅ User does not exist, proceeding...');
    
    // Step 2: Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      user_metadata: { name: testName }
    });
    
    if (authError) {
      console.error('❌ Supabase Auth Error:', authError);
      return;
    }
    
    console.log('✅ Supabase Auth user created:', authUser.user.id);
    
    // Step 3: Create user in our database
    const user = await userModel.create({
      id: authUser.user.id,
      email: testEmail,
      name: testName,
      provider: 'email'
    });
    
    console.log('✅ Database user created:', user.id);
    
    // Step 4: Verify the user exists
    const verifyUser = await userModel.findByEmail(testEmail);
    if (verifyUser) {
      console.log('✅ User verification successful:', verifyUser.email);
    } else {
      console.log('❌ User verification failed');
    }
    
    // Step 5: Clean up
    await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
    console.log('🧹 Test user cleaned up');
    
    console.log('🎉 Registration flow test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    
    // Try to clean up on error
    try {
      const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers();
      const testUser = authUsers.users.find(u => u.email === testEmail);
      if (testUser) {
        await supabaseAdmin.auth.admin.deleteUser(testUser.id);
        console.log('🧹 Cleaned up test user after error');
      }
    } catch (cleanupError) {
      console.error('❌ Cleanup failed:', cleanupError);
    }
  }
}

testRegistrationFlow();
