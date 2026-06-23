import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function createSupabaseBrowserClient() {
  console.log('SUPABASE_BROWSER_INIT_CALLED', {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  })
  if (client) return client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  console.log('Creating Supabase client. URL:', supabaseUrl, 'Key exists:', !!supabaseAnonKey)
  client = createClient(supabaseUrl, supabaseAnonKey)
  return client
}
