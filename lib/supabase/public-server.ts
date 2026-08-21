// lib/supabase/public-server.ts
// Server-side Supabase client for public data reads without cookie dependency
// This can be safely used inside unstable_cache since it doesn't call cookies()

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables not set')
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
