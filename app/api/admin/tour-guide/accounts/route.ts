import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/tour-guide/supabaseAdmin';

export async function GET(req: NextRequest) {
  try {
    // Auth check - get admin session
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing session' },
        { status: 401 }
      );
    }

    // Fetch all tour guide accounts with usage data
    const { data: accounts, error: accountsError } = await supabaseAdmin
      .from('tour_guide_accounts')
      .select(`
        id,
        username,
        source,
        status,
        total_hours_allocated,
        booking_id,
        created_at,
        tour_guide_usage (
          hours_consumed
        )
      `)
      .order('created_at', { ascending: false });

    if (accountsError) {
      console.error('Error fetching tour guide accounts:', accountsError);
      return NextResponse.json(
        { error: 'Failed to fetch accounts' },
        { status: 500 }
      );
    }

    // Flatten the data structure
    const flattenedAccounts = accounts.map(account => ({
      id: account.id,
      username: account.username,
      source: account.source,
      status: account.status,
      total_hours_allocated: account.total_hours_allocated,
      hours_consumed: account.tour_guide_usage?.[0]?.hours_consumed || 0,
      booking_id: account.booking_id,
      created_at: account.created_at,
    }));

    return NextResponse.json({
      success: true,
      data: flattenedAccounts,
    });

  } catch (error) {
    console.error('GET accounts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
