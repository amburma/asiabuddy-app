// Test script to compare authenticated vs public client query results
const { createClient: createServerClient } = require('@supabase/ssr')
const { createClient: createSupabaseClient } = require('@supabase/supabase-js')

require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Testing RLS policies on tours table...')
console.log('Supabase URL:', supabaseUrl)
console.log('Anon Key:', supabaseAnonKey ? 'Set' : 'Not set')

// Test 1: Public client (anon key)
console.log('\n=== TEST 1: Public Client (Anon Key) ===')
const publicClient = createSupabaseClient(supabaseUrl, supabaseAnonKey)

publicClient
  .from('tours')
  .select('slug, country, status')
  .limit(10)
  .then(({ data, error }) => {
    if (error) {
      console.error('Public client error:', error)
    } else {
      console.log('Public client results:', data.length, 'rows')
      console.log('Public client data:', JSON.stringify(data, null, 2))
    }
  })

// Test 2: Simulate authenticated client (same anon key but with auth context)
// Since we can't easily simulate the cookie-based auth in a simple script,
// we'll test with the anon key and check if results differ
console.log('\n=== TEST 2: Check if any tours exist ===')
publicClient
  .from('tours')
  .select('count', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error('Count error:', error)
    } else {
      console.log('Total tours in database:', count)
    }
  })

// Test 3: Try a specific query for Thailand tours
console.log('\n=== TEST 3: Thailand tours only ===')
publicClient
  .from('tours')
  .select('slug, country, status')
  .eq('country', 'thailand')
  .limit(5)
  .then(({ data, error }) => {
    if (error) {
      console.error('Thailand tours error:', error)
    } else {
      console.log('Thailand tours:', data.length, 'rows')
      console.log('Thailand tours data:', JSON.stringify(data, null, 2))
    }
  })
