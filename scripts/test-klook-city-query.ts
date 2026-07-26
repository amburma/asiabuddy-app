import { config } from 'dotenv';
import { getKlookLinksByCity } from '../lib/queries/klookLinks';

// Load environment variables
config({ path: '.env.local' });
config();

async function testKlookCityQuery() {
  console.log('=== TESTING getKlookLinksByCity WITH SPACED CITY NAMES ===\n');
  
  const testCases = [
    'Hua Hin',
    'Chiang Rai',
    'Hat Yai',
    'Ko Chang',
    'Ko Samui',
    'Pak Chong'
  ];
  
  for (const city of testCases) {
    console.log(`Testing: "${city}"`);
    const results = await getKlookLinksByCity(city);
    console.log(`  Results: ${results.length} records found`);
    if (results.length > 0) {
      console.log(`  First result city: "${results[0].city}"`);
      console.log(`  First result activity: "${results[0].activity_name}"`);
    }
    console.log('');
  }
}

testKlookCityQuery();
