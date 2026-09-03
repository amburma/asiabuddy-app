import { NextRequest, NextResponse } from 'next/server';
import { createClient as createClientFromSupabase } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { calculateQuotationPrice } from '@/lib/pricing/calculateQuotationPrice';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, PATCH, GET',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET /api/quotations
// Retrieves a quotation by ID
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

    // Extract id from URL search params
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400, headers: corsHeaders }
      );
    }

    const supabase = createClientFromSupabase(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Query the quotations table for the row matching the id
    const { data: quotation, error: fetchError } = await supabase
      .from('quotations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !quotation) {
      return NextResponse.json(
        { error: 'Quotation not found', details: fetchError },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      quotation,
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Unexpected error in GET /api/quotations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Generate tour code using PostgreSQL function with race-safe sequential counter
async function generateTourCode(supabase: any): Promise<string> {
  const { data, error } = await supabase.rpc('generate_tour_code');
  
  if (error) {
    console.error('Error generating tour code:', error);
    throw new Error('Failed to generate tour code');
  }
  
  return data;
}

// POST /api/quotations
// Creates a new quotation with Phase 1 data
export async function POST(req: NextRequest) {
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

    // Use verified user ID as staff_id
    const staff_id = user.id;

    const body = await req.json();
    const { phase1_data, action } = body;

    // Validate required fields
    if (!phase1_data) {
      return NextResponse.json(
        { error: 'Missing required field: phase1_data' },
        { status: 400, headers: corsHeaders }
      );
    }

    const supabase = createClientFromSupabase(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Try to insert with retry logic for UNIQUE constraint violations
    let lastError: any = null;
    const maxRetries = 2; // Initial attempt + 1 retry

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Generate tour code using PostgreSQL function
        const tour_code = await generateTourCode(supabase);

        // Insert new quotation with status='phase1'
        const { data: quotation, error: insertError } = await supabase
          .from('quotations')
          .insert({
            tour_code,
            revision: 1,
            country: 'Thailand',
            status: 'phase1',
            phase1_data,
            phase2_data: null,
            cost_components: null,
            margin_pct: null,
            pricing_snapshot: null,
            staff_id: staff_id || null,
            revision_note: null,
          })
          .select('id, tour_code')
          .single();

        if (insertError) {
          // Check if it's a UNIQUE constraint violation
          if (insertError.code === '23505' && attempt < maxRetries - 1) {
            // UNIQUE violation - retry with next sequence number
            console.log(`UNIQUE constraint violation on attempt ${attempt + 1}, retrying...`);
            lastError = insertError;
            continue;
          }
          // Other error or max retries reached
          throw insertError;
        }

        // Success - return the created quotation
        return NextResponse.json(
          { id: quotation.id, tour_code: quotation.tour_code },
          { status: 201, headers: corsHeaders }
        );

      } catch (error) {
        if (attempt === maxRetries - 1) {
          // Last attempt failed
          throw error;
        }
        // Continue to next retry
        lastError = error;
      }
    }

    // If we get here, all retries failed
    console.error('Error inserting quotation after retries:', lastError);
    return NextResponse.json(
      { error: 'Failed to create quotation after retries', details: lastError },
      { status: 500, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Unexpected error in POST /api/quotations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PATCH /api/quotations
// Updates quotation status and/or data
export async function PATCH(req: NextRequest) {
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

    const body = await req.json();
    const { id, action, phase1_data, phase2_data, status, cost_components, margin_pct } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!action) {
      return NextResponse.json(
        { error: 'Missing required field: action' },
        { status: 400, headers: corsHeaders }
      );
    }

    const supabase = createClientFromSupabase(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Shared status-conditional rule for all quotation modification actions
    // Define draft statuses that allow in-place updates
    const draftStatuses = ['phase1', 'phase1_confirmed', 'phase2', 'cost_input_complete'];
    // Define statuses that require revision creation (frozen/amendment states)
    const frozenStatuses = ['priced', 'sent', 'amended'];

    // Fetch current quotation to check status and get required data
    const { data: currentQuotation, error: fetchError } = await supabase
      .from('quotations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !currentQuotation) {
      return NextResponse.json(
        { error: 'Failed to fetch quotation', details: fetchError },
        { status: 404, headers: corsHeaders }
      );
    }

    // Handle all actions based on current status
    if (frozenStatuses.includes(currentQuotation.status)) {
      // Create new revision for frozen/amendment states
      // Get the maximum revision for this tour_code
      const { data: maxRevisionData, error: maxRevisionError } = await supabase
        .from('quotations')
        .select('revision')
        .eq('tour_code', currentQuotation.tour_code)
        .order('revision', { ascending: false })
        .limit(1)
        .single();

      if (maxRevisionError) {
        return NextResponse.json(
          { error: 'Failed to fetch max revision', details: maxRevisionError },
          { status: 500, headers: corsHeaders }
        );
      }

      const nextRevision = (maxRevisionData?.revision || 0) + 1;

      // Prepare new revision data - copy forward all existing data
      let insertData: any = {
        tour_code: currentQuotation.tour_code,
        revision: nextRevision,
        country: currentQuotation.country,
        status: currentQuotation.status,
        phase1_data: currentQuotation.phase1_data,
        phase2_data: currentQuotation.phase2_data,
        cost_components: currentQuotation.cost_components,
        margin_pct: currentQuotation.margin_pct,
        pricing_snapshot: currentQuotation.pricing_snapshot,
        staff_id: currentQuotation.staff_id,
        revision_note: null,
      };

      // Apply action-specific changes
      if (action === 'confirm_phase1') {
        insertData.status = 'phase1_confirmed';
      } else if (action === 'complete_phase2') {
        if (!phase2_data) {
          return NextResponse.json(
            { error: 'Missing phase2_data for complete_phase2 action' },
            { status: 400, headers: corsHeaders }
          );
        }
        insertData.status = 'phase2';
        insertData.phase2_data = phase2_data;
      } else if (action === 'calculate_pricing') {
        if (!currentQuotation.phase1_data || !currentQuotation.phase2_data || !currentQuotation.cost_components) {
          return NextResponse.json(
            { error: 'Cannot calculate pricing before Phase 1, Phase 2, and Cost Input are complete' },
            { status: 400, headers: corsHeaders }
          );
        }

        // Derive inputs for pricing calculation
        const total_pax = currentQuotation.phase1_data.total_pax || 0;
        const child_no_bed_count = currentQuotation.phase2_data.child_no_bed || 0;
        const foc_count = currentQuotation.phase2_data.foc_count || 0;
        const full_rooms = (currentQuotation.phase2_data.twin_rooms || 0) + (currentQuotation.phase2_data.double_rooms || 0);
        const extra_beds = currentQuotation.phase2_data.extra_beds || 0;

        const pricingInput = {
          cost_components: {
            hotel: currentQuotation.cost_components.hotel,
            transport: currentQuotation.cost_components.transport,
            meals: currentQuotation.cost_components.meals,
            tickets_activities: currentQuotation.cost_components.tickets_activities,
            guide: currentQuotation.cost_components.guide,
          },
          total_pax,
          child_no_bed_count,
          foc_count,
          margin_pct: margin_pct,
        };

        const pricingResult = calculateQuotationPrice(pricingInput);
        insertData.status = 'priced';
        insertData.pricing_snapshot = pricingResult;
      } else if (action === 'update_cost_components') {
        if (!cost_components) {
          return NextResponse.json(
            { error: 'Missing cost_components for update_cost_components action' },
            { status: 400, headers: corsHeaders }
          );
        }
        insertData.cost_components = cost_components;
        insertData.pricing_snapshot = null;
      } else if (action === 'update_phase1_data') {
        if (!phase1_data) {
          return NextResponse.json(
            { error: 'Missing phase1_data for update_phase1_data action' },
            { status: 400, headers: corsHeaders }
          );
        }
        insertData.phase1_data = phase1_data;
        insertData.pricing_snapshot = null;
      } else if (action === 'update_status') {
        if (!status) {
          return NextResponse.json(
            { error: 'Missing status field for update_status action' },
            { status: 400, headers: corsHeaders }
          );
        }
        insertData.status = status;
      } else {
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400, headers: corsHeaders }
        );
      }

      // Insert the new revision row
      const { data: quotation, error: insertError } = await supabase
        .from('quotations')
        .insert(insertData)
        .select('id, tour_code, status, pricing_snapshot')
        .single();

      if (insertError) {
        console.error('Error inserting new revision:', insertError);
        return NextResponse.json(
          { error: 'Failed to create new revision', details: insertError },
          { status: 500, headers: corsHeaders }
        );
      }

      return NextResponse.json(
        { 
          id: quotation.id, 
          tour_code: quotation.tour_code, 
          status: quotation.status,
          pricing_snapshot: quotation.pricing_snapshot 
        },
        { status: 200, headers: corsHeaders }
      );
    }

    // In-place update for draft statuses
    let updateData: any = {};

    if (action === 'confirm_phase1') {
      updateData.status = 'phase1_confirmed';
    } else if (action === 'complete_phase2') {
      if (!phase2_data) {
        return NextResponse.json(
          { error: 'Missing phase2_data for complete_phase2 action' },
          { status: 400, headers: corsHeaders }
        );
      }
      updateData.status = 'phase2';
      updateData.phase2_data = phase2_data;
    } else if (action === 'calculate_pricing') {
      if (!currentQuotation.phase1_data || !currentQuotation.phase2_data || !currentQuotation.cost_components) {
        return NextResponse.json(
          { error: 'Cannot calculate pricing before Phase 1, Phase 2, and Cost Input are complete' },
          { status: 400, headers: corsHeaders }
        );
      }

      // Derive inputs for pricing calculation
      const total_pax = currentQuotation.phase1_data.total_pax || 0;
      const child_no_bed_count = currentQuotation.phase2_data.child_no_bed || 0;
      const foc_count = currentQuotation.phase2_data.foc_count || 0;
      const full_rooms = (currentQuotation.phase2_data.twin_rooms || 0) + (currentQuotation.phase2_data.double_rooms || 0);
      const extra_beds = currentQuotation.phase2_data.extra_beds || 0;

      const pricingInput = {
        cost_components: {
          hotel: currentQuotation.cost_components.hotel,
          transport: currentQuotation.cost_components.transport,
          meals: currentQuotation.cost_components.meals,
          tickets_activities: currentQuotation.cost_components.tickets_activities,
          guide: currentQuotation.cost_components.guide,
        },
        total_pax,
        child_no_bed_count,
        foc_count,
        margin_pct: margin_pct,
      };

      const pricingResult = calculateQuotationPrice(pricingInput);
      updateData.status = 'priced';
      updateData.pricing_snapshot = pricingResult;
    } else if (action === 'update_cost_components') {
      if (!cost_components) {
        return NextResponse.json(
          { error: 'Missing cost_components for update_cost_components action' },
          { status: 400, headers: corsHeaders }
        );
      }
      updateData.status = 'cost_input_complete';
      updateData.cost_components = cost_components;
    } else if (action === 'update_phase1_data') {
      if (!phase1_data) {
        return NextResponse.json(
          { error: 'Missing phase1_data for update_phase1_data action' },
          { status: 400, headers: corsHeaders }
        );
      }
      updateData.phase1_data = phase1_data;
    } else if (action === 'update_status') {
      if (!status) {
        return NextResponse.json(
          { error: 'Missing status field for update_status action' },
          { status: 400, headers: corsHeaders }
        );
      }
      updateData.status = status;
    } else {
      return NextResponse.json(
        { error: `Unknown action: ${action}` },
        { status: 400, headers: corsHeaders }
      );
    }

    const { data: quotation, error: updateError } = await supabase
      .from('quotations')
      .update(updateData)
      .eq('id', id)
      .select('id, tour_code, status, pricing_snapshot')
      .single();

    if (updateError) {
      console.error('Error updating quotation:', updateError);
      return NextResponse.json(
        { error: 'Failed to update quotation', details: updateError },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { 
        id: quotation.id, 
        tour_code: quotation.tour_code, 
        status: quotation.status,
        pricing_snapshot: quotation.pricing_snapshot 
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Unexpected error in PATCH /api/quotations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
