// Test script to compare authenticated vs public Supabase clients
const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing database access with different clients...\n');

// Test 1: Public client (same as createPublicClient)
console.log('=== TEST 1: Public Client (createPublicClient) ===');
const publicClient = createSupabaseClient(supabaseUrl, supabaseAnonKey);

async function testPublicClient() {
  try {
    const result = await publicClient
      .from('tours')
      .select('slug, country, status')
      .limit(10);
    
    const { data, error } = result;
    
    if (error) {
      console.log('Error:', error);
      return 0;
    } else {
      console.log('Rows returned:', data ? data.length : 0);
      console.log('Data:', JSON.stringify(data, null, 2));
      return data ? data.length : 0;
    }
  } catch (err) {
    console.log('Exception:', err);
    return 0;
  }
}

// Test 2: Simulate the original server client behavior
// Note: The original server.ts actually uses the same anon key, but with cookie handling
// Since we can't replicate cookie handling in a simple script, we'll test with anon key
console.log('\n=== TEST 2: Anon Key (same as original server.ts uses) ===');
const anonClient = createSupabaseClient(supabaseUrl, supabaseAnonKey);

async function testAnonClient() {
  try {
    const result = await anonClient
      .from('tours')
      .select('slug, country, status')
      .limit(10);
    
    const { data, error } = result;
    
    if (error) {
      console.log('Error:', error);
      return 0;
    } else {
      console.log('Rows returned:', data ? data.length : 0);
      console.log('Data:', JSON.stringify(data, null, 2));
      return data ? data.length : 0;
    }
  } catch (err) {
    console.log('Exception:', err);
    return 0;
  }
}

async function runTests() {
  const publicRows = await testPublicClient();
  const anonRows = await testAnonClient();
  
  console.log('\n=== COMPARISON ===');
  console.log(`Public Client: ${publicRows} rows`);
  console.log(`Anon Client: ${anonRows} rows`);
  
  if (publicRows === 0 && anonRows > 0) {
    console.log('\n⚠️ CONFIRMED: RLS policy is blocking public client reads');
    console.log('This means the caching change would break public tour pages.');
  } else if (publicRows === anonRows) {
    console.log('\n✓ Both clients return the same number of rows');
    console.log('RLS does not appear to be blocking public reads.');
  } else {
    console.log('\n? Unexpected result - needs investigation');
  }
}

runTests().then(() => console.log('\nTests completed.'));
