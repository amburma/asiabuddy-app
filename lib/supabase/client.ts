// lib/supabase/client.ts
// Browser-side Supabase client for Client Components ('use client')

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Only initialize in browser environment
  if (typeof window === 'undefined') {
    return null as any;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not set. Returning null client.');
    return null as any;
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}