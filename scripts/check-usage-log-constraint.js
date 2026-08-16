require('dotenv').config({ path: '.env.local' });
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkUsageLogConstraint() {
  try {
    console.log('Checking if tour_guide_usage_log table exists...');
    
    // Try to select from the table to see if it exists
    const { data: testData, error: testError } = await supabaseAdmin
      .from('tour_guide_usage_log')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.log('tour_guide_usage_log table does not exist or is not accessible:', testError.message);
      console.log('This suggests the table may not exist in the live database.');
      return;
    }
    
    console.log('tour_guide_usage_log table exists!');
    console.log('\n=== Sample data from tour_guide_usage_log ===');
    console.log(JSON.stringify(testData, null, 2));
    
    // Try to insert a test record with 'live-translate' to check constraint
    console.log('\nTesting constraint by attempting to insert with live-translate feature...');
    const testAccountId = '66dd9629-0570-4084-b23e-0dfd5d74381b'; // Use the real account ID we know exists
    
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('tour_guide_usage_log')
      .insert({
        account_id: testAccountId,
        feature: 'live-translate',
        cost_usd: 0.01,
        duration_seconds: 1
      })
      .select();
    
    if (insertError) {
      console.log('Insert failed with error:', insertError.message);
      if (insertError.message.includes('violates check constraint')) {
        console.log('⚠️ CHECK constraint on feature column is rejecting live-translate!');
        console.log('This is a BUG - live-translate needs to be added to the allowed feature values');
      } else {
        console.log('Insert failed for other reason (not feature constraint):', insertError.message);
      }
    } else {
      console.log('✅ Insert succeeded - live-translate is accepted by the constraint');
      console.log('Inserted record:', JSON.stringify(insertData, null, 2));
      // Clean up the test record
      console.log('Cleaning up test record...');
      await supabaseAdmin
        .from('tour_guide_usage_log')
        .delete()
        .eq('id', insertData[0].id);
      console.log('Test record cleaned up');
    }
    
  } catch (error) {
    console.error('Script error:', error);
    process.exit(1);
  }
}

checkUsageLogConstraint();