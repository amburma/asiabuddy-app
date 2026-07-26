import { config } from 'dotenv';
import { getKlookLinksByCity } from '../lib/queries/klookLinks';

// Load environment variables
config({ path: '.env.local' });
config();

async function testKlookQueryAnon() {
  console.log('=== TESTING getKlookLinksByCity WITH ANON KEY (Node context) ===\n');
  
  const testCities = ['bangkok', 'huahin', 'chiangrai'];
  
  for (const city of testCities) {
    console.log(`Testing city: "${city}"`);
    const results = await getKlookLinksByCity(city);
    console.log(`  Results: ${results.length} records found`);
    if (results.length > 0) {
      console.log(`  First result city: "${results[0].city}"`);
      console.log(`  First result activity: "${results[0].activity_name}"`);
    }
    console.log('');
  }
}

testKlookQueryAnon();
