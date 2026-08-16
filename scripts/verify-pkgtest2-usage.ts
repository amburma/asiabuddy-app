import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

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

const PKGTEST2_ACCOUNT_ID = 'a7a8141f-da4c-428d-98c1-e92455c7b5fa';

async function verifyPkgtest2Usage() {
  try {
    console.log('Verifying usage logging for pkgtest2 account...\n');
    console.log('Account ID:', PKGTEST2_ACCOUNT_ID);
    console.log('='.repeat(60) + '\n');

    // Query 1: tour_guide_usage row
    console.log('QUERY 1: tour_guide_usage row\n');

    const { data: usageRow, error: usageError } = await supabaseAdmin
      .from('tour_guide_usage')
      .select('*')
      .eq('account_id', PKGTEST2_ACCOUNT_ID)
      .maybeSingle();

    if (usageError) {
      console.error('Error querying tour_guide_usage:', usageError);
      process.exit(1);
    }

    if (usageRow) {
      console.log('✅ tour_guide_usage row found:\n');
      console.log(JSON.stringify(usageRow, null, 2));
      console.log('\nKey fields:');
      console.log('- hours_consumed:', usageRow.hours_consumed);
      console.log('- current_window_cost_usd:', usageRow.current_window_cost_usd);
      console.log('- total_cost_usd:', usageRow.total_cost_usd);
      console.log('- status:', usageRow.status);
      console.log('- updated_at:', usageRow.updated_at);
    } else {
      console.log('❌ No tour_guide_usage row found for pkgtest2');
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Query 2: tour_guide_usage_log rows
    console.log('QUERY 2: tour_guide_usage_log rows (all for this account)\n');

    const { data: logRows, error: logError } = await supabaseAdmin
      .from('tour_guide_usage_log')
      .select('*')
      .eq('account_id', PKGTEST2_ACCOUNT_ID)
      .order('created_at', { ascending: false });

    if (logError) {
      console.error('Error querying tour_guide_usage_log:', logError);
      process.exit(1);
    }

    if (logRows && logRows.length > 0) {
      console.log(`✅ Found ${logRows.length} usage log row(s):\n`);
      logRows.forEach((row, index) => {
        console.log(`--- Log Entry ${index + 1} ---`);
        console.log(JSON.stringify(row, null, 2));
        console.log();
      });

      // Check for text feature specifically
      const textLogs = logRows.filter(row => row.feature === 'text');
      if (textLogs.length > 0) {
        console.log('✅ Found text translation log(s):');
        textLogs.forEach((row, index) => {
          console.log(`\nText Log ${index + 1}:`);
          console.log('- Feature:', row.feature);
          console.log('- Cost USD:', row.cost_usd);
          console.log('- Created at:', row.created_at);
          console.log('- Request details:', row.request_details);
        });
      } else {
        console.log('❌ No text translation logs found');
      }
    } else {
      console.log('❌ No tour_guide_usage_log rows found for pkgtest2');
    }

    console.log('\n' + '='.repeat(60));
    console.log('VERIFICATION COMPLETE');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('Script error:', error);
    process.exit(1);
  }
}

verifyPkgtest2Usage();