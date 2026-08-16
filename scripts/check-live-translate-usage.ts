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

async function checkLiveTranslateUsage() {
  try {
    console.log('Checking live-translate usage for pkgtest2 account...\n');
    console.log('Account ID:', PKGTEST2_ACCOUNT_ID);
    console.log('='.repeat(60) + '\n');

    // Query tour_guide_usage row
    console.log('QUERY: tour_guide_usage row\n');

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
      
      console.log('\nKey fields for live-translate:\n');
      console.log('- current_window_cost_usd:', usageRow.current_window_cost_usd);
      console.log('- hours_consumed:', usageRow.hours_consumed);
      console.log('- total_cost_usd:', usageRow.total_cost_usd);
      console.log('- updated_at:', usageRow.updated_at);
      
      // Extract live-translate cost from feature_breakdown
      const liveTranslateCost = usageRow.feature_breakdown?.['live-translate'];
      console.log('- feature_breakdown->live-translate:', liveTranslateCost || 'NOT FOUND');
      
      // Calculate window remaining
      const windowRemaining = 2.20 - (usageRow.current_window_cost_usd || 0);
      console.log('- Window remaining ($2.20 - current_window_cost_usd):', windowRemaining.toFixed(4));
    } else {
      console.log('❌ No tour_guide_usage row found for pkgtest2');
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Query tour_guide_usage_log for live-translate entries
    console.log('QUERY: tour_guide_usage_log rows (live-translate only)\n');

    const { data: logRows, error: logError } = await supabaseAdmin
      .from('tour_guide_usage_log')
      .select('*')
      .eq('account_id', PKGTEST2_ACCOUNT_ID)
      .eq('feature', 'live-translate')
      .order('created_at', { ascending: false });

    if (logError) {
      console.error('Error querying tour_guide_usage_log:', logError);
      process.exit(1);
    }

    if (logRows && logRows.length > 0) {
      console.log(`✅ Found ${logRows.length} live-translate usage log row(s):\n`);
      logRows.forEach((row, index) => {
        console.log(`--- Log Entry ${index + 1} ---`);
        console.log(JSON.stringify(row, null, 2));
        console.log();
      });
    } else {
      console.log('❌ No live-translate usage log rows found for pkgtest2');
    }

    console.log('='.repeat(60));
    console.log('VERIFICATION COMPLETE');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('Script error:', error);
    process.exit(1);
  }
}

checkLiveTranslateUsage();