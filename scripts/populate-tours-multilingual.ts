#!/usr/bin/env tsx
/**
 * One-time script to populate multilingual columns in the tours table
 * 
 * This script fetches all tours from the database and translates the title and 
 * short_description fields into 5 target languages (MM, TH, DE, FR, ES) using 
 * the existing translateText function. It skips already-translated fields to be 
 * safely re-runnable.
 * 
 * Requirements:
 * - SUPABASE_URL: Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Supabase service role key for admin access
 * - GEMINI_PRO_API_KEY: Google Gemini API key for translation
 * 
 * Usage:
 *   npx tsx scripts/populate-tours-multilingual.ts
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { translateText } from '../lib/translate';

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

// Target languages for translation
const TARGET_LANGUAGES = ['mm', 'th', 'de', 'fr', 'es'] as const;

// Statistics tracking
let stats = {
  totalTours: 0,
  translatedFields: 0,
  skippedFields: 0,
  failedFields: 0,
  errors: [] as Array<{ tour: string; field: string; lang: string; error: string }>
};

/**
 * Delay function to avoid rate limiting
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if a field is already translated (non-empty)
 */
function isTranslated(value: string | null | undefined): boolean {
  return value !== null && value !== undefined && value.trim() !== '';
}

/**
 * Translate a single field and update the database
 */
async function translateAndUpdateField(
  tourId: string,
  tourTitle: string,
  fieldName: 'title' | 'short_description',
  englishText: string,
  targetLang: string
): Promise<boolean> {
  const columnName = `${fieldName}_${targetLang}`;
  
  try {
    // Check if already translated
    const { data: existingValue, error: checkError } = await supabaseAdmin
      .from('tours')
      .select(columnName)
      .eq('id', tourId)
      .single();
    
    if (checkError) {
      throw new Error(`Failed to check existing translation: ${checkError.message}`);
    }
    
    if (isTranslated(existingValue[columnName])) {
      console.log(`  ✓ Skipping ${columnName} (already translated)`);
      stats.skippedFields++;
      return true;
    }
    
    // Translate the text
    console.log(`  → Translating ${columnName}...`);
    const translatedText = await translateText(englishText, targetLang.toUpperCase(), { raw: false });
    
    // Update the database
    const { error: updateError } = await supabaseAdmin
      .from('tours')
      .update({ [columnName]: translatedText })
      .eq('id', tourId);
    
    if (updateError) {
      throw new Error(`Failed to update database: ${updateError.message}`);
    }
    
    console.log(`  ✓ Successfully translated ${columnName}`);
    stats.translatedFields++;
    
    // Small delay to avoid rate limiting
    await delay(800);
    
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`  ✗ Failed to translate ${columnName}: ${errorMessage}`);
    stats.failedFields++;
    stats.errors.push({
      tour: tourTitle,
      field: fieldName,
      lang: targetLang,
      error: errorMessage
    });
    return false;
  }
}

/**
 * Process a single tour
 */
async function processTour(tour: any): Promise<void> {
  console.log(`\n--- Processing tour: ${tour.title} (${tour.slug}) ---`);
  
  // Process each target language
  for (const lang of TARGET_LANGUAGES) {
    // Translate title if needed
    if (tour.title) {
      await translateAndUpdateField(
        tour.id,
        tour.title,
        'title',
        tour.title,
        lang
      );
    }
    
    // Translate short_description if needed
    if (tour.short_description) {
      await translateAndUpdateField(
        tour.id,
        tour.title,
        'short_description',
        tour.short_description,
        lang
      );
    }
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  console.log('=== Tours Multilingual Population Script ===');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Target languages: ${TARGET_LANGUAGES.join(', ')}`);
  console.log('');
  
  try {
    // Fetch all tours (all columns, all countries/statuses)
    console.log('Fetching all tours from database...');
    const { data: tours, error: fetchError } = await supabaseAdmin
      .from('tours')
      .select('*');
    
    if (fetchError) {
      throw new Error(`Failed to fetch tours: ${fetchError.message}`);
    }
    
    if (!tours || tours.length === 0) {
      console.log('No tours found in database. Exiting.');
      return;
    }
    
    stats.totalTours = tours.length;
    console.log(`Found ${tours.length} tour(s) to process`);
    console.log('');
    
    // Process each tour
    for (const tour of tours) {
      await processTour(tour);
    }
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('=== SUMMARY ===');
    console.log(`Total tours processed: ${stats.totalTours}`);
    console.log(`Fields successfully translated: ${stats.translatedFields}`);
    console.log(`Fields skipped (already translated): ${stats.skippedFields}`);
    console.log(`Fields failed: ${stats.failedFields}`);
    
    if (stats.errors.length > 0) {
      console.log('\n=== ERRORS ===');
      stats.errors.forEach((err, index) => {
        console.log(`${index + 1}. Tour: "${err.tour}" - ${err.field}_${err.lang}: ${err.error}`);
      });
    }
    
    console.log('\n=== Script completed ===');
    
  } catch (error) {
    console.error('\n=== Script failed ===');
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Run the script
main();
