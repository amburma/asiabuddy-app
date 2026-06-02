import { getThailandTourData, formatTourDataForAI, getThailandPolicyData, formatPolicyDataForAI } from './services/googleSheets';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

/**
 * Test script to verify Tours and Policies integration
 * This script will:
 * 1. Connect to Google Drive using service account
 * 2. Find the Thailand folder
 * 3. Locate the Tours subfolder and read all Google Docs
 * 4. Locate the Policies subfolder and read all PDFs
 * 5. Display the data in a readable format
 */
async function testToursAndPoliciesIntegration() {
  console.log('=== Tours and Policies Integration Test ===\n');

  try {
    // Check if environment variables are set
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set');
    }

    console.log('✓ Environment variables loaded');
    console.log('✓ Service account credentials found\n');

    // Test Tours
    console.log('--- Testing Tours Integration ---\n');
    const tourData = await getThailandTourData();

    console.log('\n=== Tour Results ===\n');
    console.log(`Found ${Object.keys(tourData).length} tour documents:\n`);

    for (const [docName, content] of Object.entries(tourData)) {
      console.log(`📄 ${docName}`);
      console.log(`   Characters: ${content.length}`);
      console.log(`   Preview: ${content.substring(0, 200)}...`);
      console.log('');
    }

    // Format for AI
    console.log('=== Formatted Tour Data for AI ===\n');
    const formattedTourData = formatTourDataForAI(tourData);
    console.log(formattedTourData.substring(0, 1500)); // Show first 1500 chars
    if (formattedTourData.length > 1500) {
      console.log(`\n... (${formattedTourData.length - 1500} more characters)`);
    }

    // Test Policies
    console.log('\n--- Testing Policies Integration ---\n');
    const policyData = await getThailandPolicyData();

    console.log('\n=== Policy Results ===\n');
    console.log(`Found ${Object.keys(policyData).length} policy documents:\n`);

    for (const [pdfName, content] of Object.entries(policyData)) {
      console.log(`📋 ${pdfName}`);
      console.log(`   Characters: ${content.length}`);
      console.log(`   Preview: ${content.substring(0, 200)}...`);
      console.log('');
    }

    // Format for AI
    console.log('=== Formatted Policy Data for AI ===\n');
    const formattedPolicyData = formatPolicyDataForAI(policyData);
    console.log(formattedPolicyData.substring(0, 1500)); // Show first 1500 chars
    if (formattedPolicyData.length > 1500) {
      console.log(`\n... (${formattedPolicyData.length - 1500} more characters)`);
    }

    console.log('\n✓ Test completed successfully!');
    console.log('\nThe tour and policy data is now ready to be used by Gemini AI.');
    console.log('When users ask about tours or policies, the AI will reference this data.\n');

  } catch (error) {
    console.error('\n✗ Test failed:', error);
    console.error('\nPlease check:');
    console.error('1. GOOGLE_SERVICE_ACCOUNT_JSON is set in .env.local');
    console.error('2. Service account has access to Thailand folder');
    console.error('3. Tours and Policies folders exist and contain files');
    console.error('4. Google Drive and Sheets APIs are enabled in Google Cloud Console');
    console.error('5. pdf-parse package is installed (npm install pdf-parse)\n');
    process.exit(1);
  }
}

// Run the test
testToursAndPoliciesIntegration();
