// Check RLS policies on tours and itineraries tables
const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const client = createSupabaseClient(supabaseUrl, supabaseAnonKey);

async function checkRLSPolicies() {
  console.log('=== Checking RLS Policies ===\n');
  
  // Check if RLS is enabled on tours table
  console.log('--- Tours Table RLS Status ---');
  let rlsEnabled, rlsError;
  try {
    const result = await client.rpc('check_rls_enabled', { table_name: 'tours' });
    rlsEnabled = result.data;
    rlsError = result.error;
  } catch (e) {
    rlsError = { message: 'RPC not available' };
  }
  
  if (rlsError) {
    console.log('Cannot check RLS status via RPC (need admin access)');
  } else {
    console.log('RLS Enabled:', rlsEnabled);
  }
  
  // Try to query pg_policies table (this might fail due to permissions)
  console.log('\n--- Attempting to query RLS policies ---');
  const { data: policies, error: policiesError } = await client
    .from('pg_policies')
    .select('*')
    .eq('tablename', 'tours');
  
  if (policiesError) {
    console.log('Cannot query pg_policies (expected - need admin access):');
    console.log('Error:', policiesError.message);
  } else {
    console.log('Policies found:', policies.length);
    console.log('Policies:', JSON.stringify(policies, null, 2));
  }
  
  // Test what happens with different queries
  console.log('\n--- Testing different query scenarios ---');
  
  // Test 1: Simple select
  console.log('Test 1: Simple SELECT slug, country, status FROM tours LIMIT 10');
  const { data: test1, error: error1 } = await client
    .from('tours')
    .select('slug, country, status')
    .limit(10);
  console.log('Result:', error1 ? `Error: ${error1.message}` : `${test1.length} rows`);
  
  // Test 2: Select with status filter
  console.log('\nTest 2: SELECT * FROM tours WHERE status = \'active\' LIMIT 10');
  const { data: test2, error: error2 } = await client
    .from('tours')
    .select('*')
    .eq('status', 'active')
    .limit(10);
  console.log('Result:', error2 ? `Error: ${error2.message}` : `${test2.length} rows`);
  
  // Test 3: Select with status filter for live
  console.log('\nTest 3: SELECT * FROM tours WHERE status = \'live\' LIMIT 10');
  const { data: test3, error: error3 } = await client
    .from('tours')
    .select('*')
    .eq('status', 'live')
    .limit(10);
  console.log('Result:', error3 ? `Error: ${error3.message}` : `${test3.length} rows`);
  
  console.log('\n=== Recommendation ===');
  console.log('The public client is being blocked by RLS policies.');
  console.log('You need to either:');
  console.log('1. Add a public-read policy for tours with status=\'live\' or status=\'active\'');
  console.log('2. Keep using the original authenticated server client for caching');
  console.log('3. Use service role key (NOT recommended for security reasons)');
}

checkRLSPolicies().then(() => console.log('\nRLS check completed.'));
