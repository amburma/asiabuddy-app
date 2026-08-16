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

async function checkAccounts() {
  try {
    console.log('Checking tour_guide_accounts for pkgtest and pkgtest2...\n');

    // Query for pkgtest
    const { data: pkgtestAccount, error: pkgtestError } = await supabaseAdmin
      .from('tour_guide_accounts')
      .select('*')
      .eq('username', 'pkgtest')
      .maybeSingle();

    if (pkgtestError) {
      console.error('Error querying pkgtest:', pkgtestError);
    } else {
      console.log('=== pkgtest account ===');
      if (pkgtestAccount) {
        console.log(JSON.stringify(pkgtestAccount, null, 2));
        console.log('\nPassword field format:', pkgtestAccount.password_hash.length > 50 ? 'HASHED (bcrypt)' : 'PLAINTEXT');
        console.log('Status:', pkgtestAccount.status);
      } else {
        console.log('NOT FOUND');
      }
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Query for pkgtest2
    const { data: pkgtest2Account, error: pkgtest2Error } = await supabaseAdmin
      .from('tour_guide_accounts')
      .select('*')
      .eq('username', 'pkgtest2')
      .maybeSingle();

    if (pkgtest2Error) {
      console.error('Error querying pkgtest2:', pkgtest2Error);
    } else {
      console.log('=== pkgtest2 account ===');
      if (pkgtest2Account) {
        console.log(JSON.stringify(pkgtest2Account, null, 2));
        console.log('\nPassword field format:', pkgtest2Account.password_hash.length > 50 ? 'HASHED (bcrypt)' : 'PLAINTEXT');
        console.log('Status:', pkgtest2Account.status);
      } else {
        console.log('NOT FOUND');
      }
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Query tour_guide_usage for pkgtest
    if (pkgtestAccount) {
      const { data: pkgtestUsage, error: pkgtestUsageError } = await supabaseAdmin
        .from('tour_guide_usage')
        .select('*')
        .eq('account_id', pkgtestAccount.id)
        .maybeSingle();

      if (pkgtestUsageError) {
        console.error('Error querying pkgtest usage:', pkgtestUsageError);
      } else {
        console.log('=== pkgtest tour_guide_usage ===');
        if (pkgtestUsage) {
          console.log(JSON.stringify(pkgtestUsage, null, 2));
        } else {
          console.log('NOT FOUND');
        }
      }
    }

  } catch (error) {
    console.error('Script error:', error);
    process.exit(1);
  }
}

checkAccounts();