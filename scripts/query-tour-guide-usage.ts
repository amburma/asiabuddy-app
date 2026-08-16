import { config } from 'dotenv';
import { supabaseAdmin } from '../lib/tour-guide/supabaseAdmin';

// Load environment variables
config({ path: '.env.local' });
config();

const ACCOUNT_ID = '66dd9629-0570-4084-b23e-0dfd5d74381b';

async function queryTourGuideUsage() {
  try {
    console.log('Querying tour_guide_usage for account:', ACCOUNT_ID);
    
    const { data: usage, error: usageError } = await supabaseAdmin
      .from('tour_guide_usage')
      .select('account_id, hours_consumed, current_window_start_at, current_window_cost_usd, total_cost_usd, feature_breakdown, status, updated_at')
      .eq('account_id', ACCOUNT_ID)
      .maybeSingle();
    
    if (usageError) {
      console.error('Error querying tour_guide_usage:', usageError);
      process.exit(1);
    }
    
    console.log('\n=== tour_guide_usage row ===');
    console.log(JSON.stringify(usage, null, 2));
    
    console.log('\nQuerying tour_guide_accounts for account:', ACCOUNT_ID);
    
    const { data: account, error: accountError } = await supabaseAdmin
      .from('tour_guide_accounts')
      .select('id, source, total_hours_allocated, status, created_at')
      .eq('id', ACCOUNT_ID)
      .maybeSingle();
    
    if (accountError) {
      console.error('Error querying tour_guide_accounts:', accountError);
      process.exit(1);
    }
    
    console.log('\n=== tour_guide_accounts row ===');
    console.log(JSON.stringify(account, null, 2));
    
  } catch (error) {
    console.error('Script error:', error);
    process.exit(1);
  }
}

queryTourGuideUsage();