import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/tour-guide/supabaseAdmin';
import { hashPassword } from '@/lib/tour-guide/auth';

// Validation schemas for different sources
const packageSchema = z.object({
  source: z.literal('package'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  tour_days: z.number().int().positive('Tour days must be a positive integer'),
  booking_id: z.string().uuid('Invalid booking ID').optional(),
});

const purchasedSchema = z.object({
  source: z.literal('purchased'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone_or_whatsapp: z.string().min(1, 'Phone/WhatsApp is required'),
  total_hours_allocated: z.number().positive('Total hours must be positive'),
});

const trialSchema = z.object({
  source: z.literal('trial'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone_or_whatsapp: z.string().min(1, 'Phone/WhatsApp is required'),
});

const createAccountSchema = z.discriminatedUnion('source', [
  packageSchema,
  purchasedSchema,
  trialSchema,
]);

export async function POST(req: NextRequest) {
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

    const adminId = user.id;

    // Parse and validate request body
    const body = await req.json();
    const parsed = createAccountSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessages = parsed.error.issues.map(e => e.message).join(', ');
      return NextResponse.json(
        { error: `Validation error: ${errorMessages}` },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Prepare account data
    const accountData: any = {
      username: data.username,
      password_hash: passwordHash,
      source: data.source,
      created_by_admin_id: adminId,
      status: 'active',
    };

    // Add source-specific fields
    if (data.source === 'package') {
      accountData.booking_id = data.booking_id || null;
      accountData.phone_or_whatsapp = null;
      accountData.total_hours_allocated = data.tour_days * 2;
    } else if (data.source === 'purchased') {
      accountData.booking_id = null;
      accountData.phone_or_whatsapp = data.phone_or_whatsapp;
      accountData.total_hours_allocated = data.total_hours_allocated;
    } else if (data.source === 'trial') {
      accountData.booking_id = null;
      accountData.phone_or_whatsapp = data.phone_or_whatsapp;
      accountData.total_hours_allocated = 0; // unused for trial — enforcement is via tour_guide_trial_usage's fixed 120s cap, not this field
    }

    // Insert account
    const { data: account, error: accountError } = await supabaseAdmin
      .from('tour_guide_accounts')
      .insert(accountData)
      .select('id')
      .single();

    if (accountError) {
      console.error('Error creating tour guide account:', accountError);
      
      // Check for unique constraint violation on username
      if (accountError.code === '23505') {
        return NextResponse.json(
          { error: 'Username already exists' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      );
    }

    // Insert usage record based on source
    if (data.source === 'trial') {
      // Insert into tour_guide_trial_usage
      const { error: trialUsageError } = await supabaseAdmin
        .from('tour_guide_trial_usage')
        .insert({
          account_id: account.id,
          seconds_used: 0,
          status: 'active',
        });

      if (trialUsageError) {
        console.error('Error creating trial usage record:', trialUsageError);
        // Rollback account creation
        await supabaseAdmin
          .from('tour_guide_accounts')
          .delete()
          .eq('id', account.id);
        
        return NextResponse.json(
          { error: 'Failed to create trial usage record' },
          { status: 500 }
        );
      }
    } else {
      // Insert into tour_guide_usage for package and purchased
      const { error: usageError } = await supabaseAdmin
        .from('tour_guide_usage')
        .insert({
          account_id: account.id,
          total_cost_usd: 0,
          feature_breakdown: {},
          live_session_seconds: 0,
          status: 'active',
        });

      if (usageError) {
        console.error('Error creating usage record:', usageError);
        // Rollback account creation
        await supabaseAdmin
          .from('tour_guide_accounts')
          .delete()
          .eq('id', account.id);
        
        return NextResponse.json(
          { error: 'Failed to create usage record' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        accountId: account.id,
        source: data.source,
        username: data.username,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('POST create-account error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
