import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Load environment variables
config({ path: '.env.local' });
config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const PKGTEST2_ACCOUNT_ID = 'f2396e12-3ee4-48ae-afd5-a979cfc44427';

async function fixPkgtest2Account() {
  try {
    console.log('Step 1: Checking for tour_guide_usage row for pkgtest2...\n');

    // Check for usage row
    const { data: usageRow, error: usageError } = await supabaseAdmin
      .from('tour_guide_usage')
      .select('*')
      .eq('account_id', PKGTEST2_ACCOUNT_ID)
      .maybeSingle();

    if (usageError) {
      console.error('Error checking tour_guide_usage:', usageError);
      process.exit(1);
    }

    if (usageRow) {
      console.log('Found tour_guide_usage row:', JSON.stringify(usageRow, null, 2));
      console.log('\nStep 2: Deleting tour_guide_usage row...\n');

      const { error: deleteUsageError } = await supabaseAdmin
        .from('tour_guide_usage')
        .delete()
        .eq('account_id', PKGTEST2_ACCOUNT_ID);

      if (deleteUsageError) {
        console.error('Error deleting tour_guide_usage:', deleteUsageError);
        process.exit(1);
      }

      console.log('✅ tour_guide_usage row deleted successfully\n');
    } else {
      console.log('No tour_guide_usage row found for pkgtest2 (proceeding to account deletion)\n');
    }

    console.log('Step 3: Deleting tour_guide_accounts row for pkgtest2...\n');

    const { error: deleteAccountError } = await supabaseAdmin
      .from('tour_guide_accounts')
      .delete()
      .eq('id', PKGTEST2_ACCOUNT_ID);

    if (deleteAccountError) {
      console.error('Error deleting tour_guide_accounts:', deleteAccountError);
      process.exit(1);
    }

    console.log('✅ tour_guide_accounts row deleted successfully\n');

    console.log('Step 4: Recreating pkgtest2 account with proper bcrypt hash...\n');

    // Generate proper bcrypt hash
    const password = 'YourTestPassword123';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    console.log('Generated bcrypt hash:', passwordHash);
    console.log('Hash length:', passwordHash.length, 'characters\n');

    // Create new account with proper data
    const newAccountData = {
      username: 'pkgtest2',
      password_hash: passwordHash,
      source: 'package',
      booking_id: null,
      phone_or_whatsapp: null,
      created_by_admin_id: null, // Manual creation, no admin session
      total_hours_allocated: 25,
      status: 'active',
    };

    const { data: newAccount, error: createError } = await supabaseAdmin
      .from('tour_guide_accounts')
      .insert(newAccountData)
      .select()
      .single();

    if (createError) {
      console.error('Error creating new account:', createError);
      process.exit(1);
    }

    console.log('✅ New account created successfully:\n');
    console.log(JSON.stringify(newAccount, null, 2));

    console.log('\nStep 5: Creating tour_guide_usage row for pkgtest2...\n');

    const { error: createUsageError } = await supabaseAdmin
      .from('tour_guide_usage')
      .insert({
        account_id: newAccount.id,
        total_cost_usd: 0,
        feature_breakdown: {},
        live_session_seconds: 0,
        status: 'active',
      });

    if (createUsageError) {
      console.error('Error creating tour_guide_usage:', createUsageError);
      // Rollback account creation
      await supabaseAdmin
        .from('tour_guide_accounts')
        .delete()
        .eq('id', newAccount.id);
      process.exit(1);
    }

    console.log('✅ tour_guide_usage row created successfully\n');

    console.log('='.repeat(60));
    console.log('PKGTEST2 ACCOUNT FIX COMPLETE');
    console.log('='.repeat(60));
    console.log('\nAccount credentials:');
    console.log('Username: pkgtest2');
    console.log('Password: YourTestPassword123');
    console.log('Hours allocated: 25');
    console.log('Account ID:', newAccount.id);
    console.log('\nThe account can now be used for testing with proper authentication.\n');

  } catch (error) {
    console.error('Script error:', error);
    process.exit(1);
  }
}

fixPkgtest2Account();