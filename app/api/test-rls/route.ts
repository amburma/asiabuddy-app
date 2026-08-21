import { createClient } from '@/lib/supabase/server'
import { createPublicClient } from '@/lib/supabase/public-server'
import { NextResponse } from 'next/server'

export async function GET() {
  const results = {
    timestamp: new Date().toISOString(),
    tests: {} as Record<string, any>
  }

  // Test 1: Authenticated client (original)
  try {
    const authClient = await createClient()
    const { data: authData, error: authError } = await authClient
      .from('tours')
      .select('slug, country, status')
      .limit(10)
    
    results.tests.authenticated = {
      success: !authError,
      count: authData?.length || 0,
      data: authData,
      error: authError?.message
    }
  } catch (error: any) {
    results.tests.authenticated = {
      success: false,
      error: error.message
    }
  }

  // Test 2: Public client (new)
  try {
    const publicClient = createPublicClient()
    const { data: publicData, error: publicError } = await publicClient
      .from('tours')
      .select('slug, country, status')
      .limit(10)
    
    results.tests.public = {
      success: !publicError,
      count: publicData?.length || 0,
      data: publicData,
      error: publicError?.message
    }
  } catch (error: any) {
    results.tests.public = {
      success: false,
      error: error.message
    }
  }

  // Test 3: Count total tours
  try {
    const publicClient = createPublicClient()
    const { count, error: countError } = await publicClient
      .from('tours')
      .select('count', { count: 'exact', head: true })
    
    results.tests.totalCount = {
      success: !countError,
      count: count || 0,
      error: countError?.message
    }
  } catch (error: any) {
    results.tests.totalCount = {
      success: false,
      error: error.message
    }
  }

  // Test 4: Thailand tours specifically
  try {
    const publicClient = createPublicClient()
    const { data: thailandData, error: thailandError } = await publicClient
      .from('tours')
      .select('slug, country, status')
      .eq('country', 'thailand')
      .limit(5)
    
    results.tests.thailandTours = {
      success: !thailandError,
      count: thailandData?.length || 0,
      data: thailandData,
      error: thailandError?.message
    }
  } catch (error: any) {
    results.tests.thailandTours = {
      success: false,
      error: error.message
    }
  }

  return NextResponse.json(results)
}
