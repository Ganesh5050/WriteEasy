// Test Supabase Connection
const { supabaseAdmin } = require('./config/supabase');

async function testSupabaseConnection() {
  try {
    console.log('🧪 Testing Supabase Connection...');
    
    // Test basic connection
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('📊 Database tables are accessible');
    
    // Test table existence
    const tables = ['users', 'projects', 'api_specs', 'notifications', 'generated_artifacts'];
    
    for (const table of tables) {
      try {
        const { error: tableError } = await supabaseAdmin
          .from(table)
          .select('*')
          .limit(1);
        
        if (tableError) {
          console.log(`❌ Table '${table}' not found or not accessible`);
        } else {
          console.log(`✅ Table '${table}' is ready`);
        }
      } catch (err) {
        console.log(`❌ Error checking table '${table}':`, err.message);
      }
    }
    
    console.log('\n🎉 Supabase integration test completed!');
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

// Run test if called directly
if (require.main === module) {
  testSupabaseConnection().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = testSupabaseConnection;
