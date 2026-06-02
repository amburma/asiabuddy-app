import { getThailandPricingData, formatPricingDataForAI } from './services/googleSheets';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

/**
 * Test script to verify Google Sheets integration
 * This script will:
 * 1. Connect to Google Drive using service account
 * 2. Find the Thailand folder
 * 3. Locate the Pricing subfolder
 * 4. Read all 6 pricing sheets
 * 5. Display the data in a readable format
 */
async function testGoogleSheetsIntegration() {
  console.log('=== Google Sheets Integration Test ===\n');

  try {
    // Check if environment variables are set
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set');
    }

    console.log('✓ Environment variables loaded');
    console.log('✓ Service account credentials found\n');

    // Fetch pricing data
    console.log('Fetching Thailand pricing data...');
    const pricingData = await getThailandPricingData();

    // Display results
    console.log('\n=== Results ===\n');
    console.log(`Found ${Object.keys(pricingData).length} pricing sheets:\n`);

    for (const [sheetName, rows] of Object.entries(pricingData)) {
      console.log(`📊 ${sheetName}`);
      console.log(`   Rows: ${rows.length}`);
      if (rows.length > 0) {
        console.log(`   Headers: ${rows[0].slice(0, 5).join(' | ')}${rows[0].length > 5 ? '...' : ''}`);
      }
      console.log('');
    }

    // Format for AI
    console.log('=== Formatted Data for AI ===\n');
    const formattedData = formatPricingDataForAI(pricingData);
    console.log(formattedData.substring(0, 2000)); // Show first 2000 chars
    if (formattedData.length > 2000) {
      console.log(`\n... (${formattedData.length - 2000} more characters)`);
    }

    console.log('\n✓ Test completed successfully!');
    console.log('\nThe pricing data is now ready to be used by Gemini AI.');
    console.log('When users ask about pricing, the AI will reference this data.\n');

  } catch (error) {
    console.error('\n✗ Test failed:', error);
    console.error('\nPlease check:');
    console.error('1. GOOGLE_SERVICE_ACCOUNT_JSON is set in .env.local');
    console.error('2. Service account has access to Thailand folder');
    console.error('3. Pricing folder exists and contains Google Sheets');
    console.error('4. Google Drive and Sheets APIs are enabled in Google Cloud Console\n');
    process.exit(1);
  }
}

// Run the test
testGoogleSheetsIntegration();
