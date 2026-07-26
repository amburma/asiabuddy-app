import { config } from 'dotenv';
import { getSupabase } from '../lib/supabase';

// Load environment variables
config({ path: '.env.local' });
config(); // Also try .env as fallback

async function checkKlookCities() {
  const supabase = getSupabase();
  
  try {
    const { data, error } = await supabase
      .from('klook_links')
      .select('city')
      .order('city');
    
    if (error) {
      console.error('Error fetching klook_links:', error);
      process.exit(1);
    }
    
    if (!data || data.length === 0) {
      console.log('No data found in klook_links table');
      process.exit(0);
    }
    
    // Get distinct city values
    const distinctCities = [...new Set(data.map((item: any) => item.city))];
    
    console.log('=== DISTINCT CITY VALUES IN klook_links TABLE ===');
    distinctCities.forEach((city) => {
      console.log(`- "${city}"`);
    });
    
    console.log(`\nTotal distinct cities: ${distinctCities.length}`);
    console.log(`Total records: ${data.length}`);
    
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

checkKlookCities();
