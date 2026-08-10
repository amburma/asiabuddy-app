import { NextResponse } from 'next/server';
import { getSupabase } from '../../../lib/supabase';

/**
 * Keep-Alive Endpoint for Supabase Free Tier
 * 
 * This endpoint performs a lightweight read query against Supabase to prevent
 * the free-tier project from auto-pausing after 7 days of inactivity.
 * 
 * IMPORTANT: This endpoint needs to be pinged externally every 2-3 days to maintain
 * activity. Use a free service like cron-job.org or UptimeRobot configured to hit
 * this endpoint on a regular schedule (e.g., every 2 days).
 * 
 * Example URL to ping: https://your-domain.com/api/keep-alive
 * 
 * Recommended cron services:
 * - cron-job.org (free, no account required)
 * - UptimeRobot (free, requires account)
 * - GitHub Actions (if you already have CI/CD setup)
 */
export async function GET() {
  try {
    const supabase = getSupabase();
    
    // Perform a lightweight read query to keep the database active
    // Using SELECT 1 is the most efficient way to check connectivity
    const { data, error } = await supabase
      .from('transfer_links')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Keep-alive query failed:', error);
      return NextResponse.json(
        { status: 'error', message: 'Database query failed' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      status: 'ok',
      message: 'Keep-alive successful',
      timestamp: new Date().toISOString(),
      database_active: true
    });
  } catch (error) {
    console.error('Keep-alive endpoint error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}