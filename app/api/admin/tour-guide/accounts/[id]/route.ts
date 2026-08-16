import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/tour-guide/supabaseAdmin';
import { z } from 'zod';

// Validation schema for PATCH requests
const patchSchema = z.object({
  action: z.enum(['terminate', 'reactivate', 'topup']),
  hours: z.number().positive().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const accountId = id;

    // Parse and validate request body
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessages = parsed.error.issues.map(e => e.message).join(', ');
      return NextResponse.json(
        { error: `Validation error: ${errorMessages}` },
        { status: 400 }
      );
    }

    const { action, hours } = parsed.data;

    // Handle different actions
    if (action === 'terminate') {
      const { error } = await supabaseAdmin
        .from('tour_guide_accounts')
        .update({ status: 'disabled' })
        .eq('id', accountId);

      if (error) {
        console.error('Error terminating account:', error);
        return NextResponse.json(
          { error: 'Failed to terminate account' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Account terminated successfully',
      });

    } else if (action === 'reactivate') {
      const { error } = await supabaseAdmin
        .from('tour_guide_accounts')
        .update({ status: 'active' })
        .eq('id', accountId);

      if (error) {
        console.error('Error reactivating account:', error);
        return NextResponse.json(
          { error: 'Failed to reactivate account' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Account reactivated successfully',
      });

    } else if (action === 'topup') {
      if (!hours) {
        return NextResponse.json(
          { error: 'Hours parameter is required for topup action' },
          { status: 400 }
        );
      }

      // First get current total_hours_allocated
      const { data: currentAccount, error: fetchError } = await supabaseAdmin
        .from('tour_guide_accounts')
        .select('total_hours_allocated')
        .eq('id', accountId)
        .single();

      if (fetchError) {
        console.error('Error fetching account for topup:', fetchError);
        return NextResponse.json(
          { error: 'Failed to fetch account details' },
          { status: 500 }
        );
      }

      // Increment total_hours_allocated
      const newTotal = (currentAccount.total_hours_allocated || 0) + hours;
      const { error } = await supabaseAdmin
        .from('tour_guide_accounts')
        .update({ total_hours_allocated: newTotal })
        .eq('id', accountId);

      if (error) {
        console.error('Error topping up account:', error);
        return NextResponse.json(
          { error: 'Failed to top up account' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Account topped up with ${hours} hours successfully`,
      });
    }

  } catch (error) {
    console.error('PATCH account error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const accountId = id;

    // First check if this is a package-tier account
    const { data: account, error: fetchError } = await supabaseAdmin
      .from('tour_guide_accounts')
      .select('booking_id')
      .eq('id', accountId)
      .single();

    if (fetchError) {
      console.error('Error fetching account for deletion:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch account details' },
        { status: 500 }
      );
    }

    const isPackageTier = !!account.booking_id;

    // Delete the account
    const { error: deleteError } = await supabaseAdmin
      .from('tour_guide_accounts')
      .delete()
      .eq('id', accountId);

    if (deleteError) {
      console.error('Error deleting account:', deleteError);
      
      // Check for foreign key constraint violations
      if (deleteError.code === '23503') {
        return NextResponse.json(
          { error: 'Cannot delete account due to existing references' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to delete account' },
        { status: 500 }
      );
    }

    const response: any = {
      success: true,
      message: 'Account deleted successfully',
    };

    // Add warning if it was a package-tier account
    if (isPackageTier) {
      response.warning = 'This was a package-tier account linked to a booking';
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('DELETE account error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
