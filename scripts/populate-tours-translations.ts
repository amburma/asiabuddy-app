#!/usr/bin/env tsx
/**
 * One-time script to populate multilingual columns in the tours table
 * Usage: npx tsx scripts/populate-tours-translations.ts
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import { translateText } from '../lib/translate';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const TARGET_LANGUAGES = ['mm', 'th', 'de', 'fr', 'es'] as const;
const DELAY_MS = 500; // 500ms delay between API calls to avoid rate limits

interface Tour {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  title_mm?: string | null;
  title_th?: string | null;
  title_de?: string | null;
  title_fr?: string | null;
  title_es?: string | null;
  short_description_mm?: string | null;
  short_description_th?: string | null;
  short_description_de?: string | null;
  short_description_fr?: string | null;
  short_description_es?: string | null;
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function populateTourTranslations() {
  console.log('Starting tours translation population...');
  console.log('Target languages:', TARGET_LANGUAGES.join(', '));
  console.log('');

  // Fetch all active tours
  const { data: tours, error: fetchError } = await supabase
    .from('tours')
    .select('id, slug, title, short_description, title_mm, title_th, title_de, title_fr, title_es, short_description_mm, short_description_th, short_description_de, short_description_fr, short_description_es')
    .eq('status', 'active');

  if (fetchError) {
    console.error('Error fetching tours:', fetchError);
    process.exit(1);
  }

  if (!tours || tours.length === 0) {
    console.log('No active tours found.');
    return;
  }

  console.log(`Found ${tours.length} active tours.`);
  console.log('');

  let totalTranslationsWritten = 0;
  let totalSkipped = 0;
  let toursUpdated = 0;

  for (const tour of tours) {
    console.log(`Processing tour: ${tour.slug} (${tour.title.substring(0, 50)}...)`);
    
    const updates: Record<string, string> = {};
    let tourHasUpdates = false;

    for (const lang of TARGET_LANGUAGES) {
      const titleColumn = `title_${lang}` as keyof Tour;
      const descColumn = `short_description_${lang}` as keyof Tour;

      // Check and translate title
      if (tour[titleColumn] && tour[titleColumn].trim()) {
        console.log(`  [${lang.toUpperCase()}] Title already exists, skipping`);
        totalSkipped++;
      } else {
        console.log(`  [${lang.toUpperCase()}] Translating title...`);
        const translatedTitle = await translateText(tour.title, lang.toUpperCase());
        if (translatedTitle && translatedTitle !== tour.title) {
          updates[titleColumn] = translatedTitle;
          totalTranslationsWritten++;
          tourHasUpdates = true;
        }
        await delay(DELAY_MS);
      }

      // Check and translate short description
      if (tour[descColumn] && tour[descColumn].trim()) {
        console.log(`  [${lang.toUpperCase()}] Short description already exists, skipping`);
        totalSkipped++;
      } else if (tour.short_description && tour.short_description.trim()) {
        console.log(`  [${lang.toUpperCase()}] Translating short description...`);
        const translatedDesc = await translateText(tour.short_description, lang.toUpperCase());
        if (translatedDesc && translatedDesc !== tour.short_description) {
          updates[descColumn] = translatedDesc;
          totalTranslationsWritten++;
          tourHasUpdates = true;
        }
        await delay(DELAY_MS);
      } else {
        console.log(`  [${lang.toUpperCase()}] No short description to translate`);
      }
    }

    // Update the tour if we have any translations
    if (tourHasUpdates) {
      const { error: updateError } = await supabase
        .from('tours')
        .update(updates)
        .eq('id', tour.id);

      if (updateError) {
        console.error(`  ❌ Error updating tour ${tour.slug}:`, updateError);
      } else {
        console.log(`  ✅ Updated tour ${tour.slug} with ${Object.keys(updates).length} translations`);
        toursUpdated++;
      }
    } else {
      console.log(`  ℹ️  No new translations needed for ${tour.slug}`);
    }

    console.log('');
  }

  console.log('========================================');
  console.log('Translation Population Complete');
  console.log('========================================');
  console.log(`Total tours processed: ${tours.length}`);
  console.log(`Tours updated: ${toursUpdated}`);
  console.log(`Total translations written: ${totalTranslationsWritten}`);
  console.log(`Total translations skipped (already exist): ${totalSkipped}`);
  console.log('========================================');
}

populateTourTranslations().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
