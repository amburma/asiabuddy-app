import { NextRequest, NextResponse } from 'next/server';
import { createClient as createClientFromSupabase } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET /api/car-rental-lookup
// Looks up car rental KB rates based on route and vehicle parameters
export async function GET(request: NextRequest) {
  try {
    // Auth check - get admin session
    const supabaseAuth = await createServerClient();
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing session' },
        { status: 401, headers: corsHeaders }
      );
    }

    // Check if user is on the thquo allowlist
    const { data: allowlistEntry, error: allowlistError } = await supabaseAuth
      .from('thquo_allowlist')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle();

    if (allowlistError || !allowlistEntry) {
      return NextResponse.json(
        { error: 'Forbidden - Not on thquo allowlist' },
        { status: 403, headers: corsHeaders }
      );
    }

    // Extract query parameters
    const url = new URL(request.url);
    const route_from = url.searchParams.get('route_from');
    const route_to = url.searchParams.get('route_to');
    const trip_type = url.searchParams.get('trip_type');
    const vehicle_category = url.searchParams.get('vehicle_category');
    const duration_hours = url.searchParams.get('duration_hours');

    // Validate required parameters
    if (!route_from) {
      return NextResponse.json(
        { error: 'Missing required parameter: route_from' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!route_to) {
      return NextResponse.json(
        { error: 'Missing required parameter: route_to' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!trip_type) {
      return NextResponse.json(
        { error: 'Missing required parameter: trip_type' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!vehicle_category) {
      return NextResponse.json(
        { error: 'Missing required parameter: vehicle_category' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Create Supabase client with service role key
    const supabase = createClientFromSupabase(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Build query
    let query = supabase
      .from('car_rental_kb_rates')
      .select('*')
      .eq('is_active', true)
      .eq('route_from', route_from)
      .eq('route_to', route_to)
      .eq('trip_type', trip_type)
      .eq('vehicle_category', vehicle_category);

    // Add duration_hours filter if provided
    if (duration_hours) {
      query = query.eq('duration_hours', Number(duration_hours));
    }

    // Execute query
    const { data, error } = await query;

    if (error) {
      console.error('Error querying car_rental_kb_rates:', error);
      return NextResponse.json(
        { error: 'Database query failed', details: error.message },
        { status: 500, headers: corsHeaders }
      );
    }

    // Handle response based on number of results
    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Route not found in KB' },
        { status: 404, headers: corsHeaders }
      );
    }

    if (data.length === 1) {
      // Single match - return the rate
      return NextResponse.json(
        { rate: data[0] },
        { status: 200, headers: corsHeaders }
      );
    }

    // Multiple matches - return options (needs duration_hours specification)
    return NextResponse.json(
      { 
        needs_duration_hours: true, 
        options: data 
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Unexpected error in GET /api/car-rental-lookup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
