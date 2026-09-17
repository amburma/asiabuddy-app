#!/usr/bin/env tsx
/**
 * One-time script to populate JSONB translation columns for tour detail pages
 * Usage: npx tsx scripts/populate-tour-detail-translations.ts
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import { translateTourBatch } from '../lib/translate';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const TARGET_LANGUAGES = ['mm', 'th', 'de', 'fr', 'es'] as const;
const DELAY_MS = 500; // 500ms delay between API calls to avoid rate limits
const API_CALL_LOG_INTERVAL = 20; // Log progress every 20 API calls

interface Tour {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  description: string | null;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  translations_mm?: any;
  translations_th?: any;
  translations_de?: any;
  translations_fr?: any;
  translations_es?: any;
}

interface Itinerary {
  id: string;
  tour_id: string;
  day_number: number;
  title: string;
  content: string | null;
  highlights: string[];
  meals_included: string[];
  accommodation: string | null;
  translations_mm?: any;
  translations_th?: any;
  translations_de?: any;
  translations_fr?: any;
  translations_es?: any;
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function populateTourDetailTranslations() {
  console.log('Starting tour detail translation population...');
  console.log('Target languages:', TARGET_LANGUAGES.join(', '));
  console.log('');

  // Fetch all active tours
  const { data: tours, error: fetchError } = await supabase
    .from('tours')
    .select('id, slug, title, short_description, description, highlights, inclusions, exclusions, translations_mm, translations_th, translations_de, translations_fr, translations_es')
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

  let totalTourTranslationsWritten = 0;
  let totalTourTranslationsSkipped = 0;
  let totalItineraryTranslationsWritten = 0;
  let totalItineraryTranslationsSkipped = 0;
  let totalItinerariesProcessed = 0;
  let apiCallCount = 0;

  for (const tour of tours) {
    console.log(`Processing tour: ${tour.slug} (${tour.title.substring(0, 50)}...)`);
    
    // Fetch itineraries for this tour
    const { data: itineraries, error: itineraryError } = await supabase
      .from('itineraries')
      .select('id, tour_id, day_number, title, content, highlights, meals_included, accommodation, translations_mm, translations_th, translations_de, translations_fr, translations_es')
      .eq('tour_id', tour.id)
      .order('day_number', { ascending: true });

    if (itineraryError) {
      console.error(`  ❌ Error fetching itineraries for tour ${tour.slug}:`, itineraryError);
      continue;
    }

    const tourItineraries = itineraries || [];
    console.log(`  Found ${tourItineraries.length} itineraries for this tour.`);

    // Process tour-level translations
    for (const lang of TARGET_LANGUAGES) {
      const translationColumn = `translations_${lang}` as keyof Tour;
      
      // Check if translation already exists
      if (tour[translationColumn] && tour[translationColumn] !== null) {
        console.log(`  [${lang.toUpperCase()}] Tour translation already exists, skipping`);
        totalTourTranslationsSkipped++;
      } else {
        console.log(`  [${lang.toUpperCase()}] Translating tour details...`);
        
        // Prepare data for translation (description, highlights, inclusions, exclusions)
        const tourData = {
          title: tour.title || '',
          short_description: tour.short_description || '',
          description: tour.description || '',
          highlights: Array.isArray(tour.highlights) ? tour.highlights : [],
          inclusions: Array.isArray(tour.inclusions) ? tour.inclusions : [],
          exclusions: Array.isArray(tour.exclusions) ? tour.exclusions : [],
          itineraries: [] // Empty itineraries for tour-level translation
        };

        const translatedData = await translateTourBatch(tourData, lang.toUpperCase());
        apiCallCount++;

        if (apiCallCount % API_CALL_LOG_INTERVAL === 0) {
          console.log(`  📊 Progress: ${apiCallCount} API calls made so far...`);
        }

        // Extract just the fields we need for the JSONB column
        const translationObject = {
          description: translatedData.description || tour.description || '',
          highlights: translatedData.highlights || tour.highlights || [],
          inclusions: translatedData.inclusions || tour.inclusions || [],
          exclusions: translatedData.exclusions || tour.exclusions || []
        };

        const { error: updateError } = await supabase
          .from('tours')
          .update({ [translationColumn]: translationObject })
          .eq('id', tour.id);

        if (updateError) {
          console.error(`  ❌ Error updating tour translation for ${tour.slug} [${lang.toUpperCase()}]:`, updateError);
        } else {
          console.log(`  ✅ Updated tour translation for ${tour.slug} [${lang.toUpperCase()}]`);
          totalTourTranslationsWritten++;
        }

        await delay(DELAY_MS);
      }
    }

    // Process itinerary-level translations
    for (const itinerary of tourItineraries) {
      console.log(`    Processing itinerary day ${itinerary.day_number}...`);
      totalItinerariesProcessed++;

      for (const lang of TARGET_LANGUAGES) {
        const translationColumn = `translations_${lang}` as keyof Itinerary;
        
        // Check if translation already exists
        if (itinerary[translationColumn] && itinerary[translationColumn] !== null) {
          console.log(`    [${lang.toUpperCase()}] Itinerary day ${itinerary.day_number} translation already exists, skipping`);
          totalItineraryTranslationsSkipped++;
        } else {
          console.log(`    [${lang.toUpperCase()}] Translating itinerary day ${itinerary.day_number}...`);
          
          // Prepare data for translation (single itinerary)
          const itineraryData = {
            title: itinerary.title || '',
            short_description: '',
            description: itinerary.content || '',
            highlights: Array.isArray(itinerary.highlights) ? itinerary.highlights : [],
            inclusions: [],
            exclusions: [],
            itineraries: [{
              title: itinerary.title || '',
              content: itinerary.content || '',
              highlights: Array.isArray(itinerary.highlights) ? itinerary.highlights : [],
              meals_included: Array.isArray(itinerary.meals_included) ? itinerary.meals_included : [],
              accommodation: itinerary.accommodation || null
            }]
          };

          const translatedData = await translateTourBatch(itineraryData, lang.toUpperCase());
          apiCallCount++;

          if (apiCallCount % API_CALL_LOG_INTERVAL === 0) {
            console.log(`    📊 Progress: ${apiCallCount} API calls made so far...`);
          }

          // Extract just the itinerary fields we need from the translated data
          const translatedItinerary = translatedData.itineraries?.[0] || {};
          const translationObject = {
            title: translatedItinerary.title || itinerary.title || '',
            content: translatedItinerary.content || itinerary.content || '',
            highlights: translatedItinerary.highlights || itinerary.highlights || [],
            meals_included: translatedItinerary.meals_included || itinerary.meals_included || [],
            accommodation: translatedItinerary.accommodation || itinerary.accommodation || null
          };

          const { error: updateError } = await supabase
            .from('itineraries')
            .update({ [translationColumn]: translationObject })
            .eq('id', itinerary.id);

          if (updateError) {
            console.error(`    ❌ Error updating itinerary translation for day ${itinerary.day_number} [${lang.toUpperCase()}]:`, updateError);
          } else {
            console.log(`    ✅ Updated itinerary translation for day ${itinerary.day_number} [${lang.toUpperCase()}]`);
            totalItineraryTranslationsWritten++;
          }

          await delay(DELAY_MS);
        }
      }
    }

    console.log('');
  }

  console.log('========================================');
  console.log('Tour Detail Translation Population Complete');
  console.log('========================================');
  console.log(`Total tours processed: ${tours.length}`);
  console.log(`Tour translations written: ${totalTourTranslationsWritten}`);
  console.log(`Tour translations skipped (already exist): ${totalTourTranslationsSkipped}`);
  console.log(`Total itineraries processed: ${totalItinerariesProcessed}`);
  console.log(`Itinerary translations written: ${totalItineraryTranslationsWritten}`);
  console.log(`Itinerary translations skipped (already exist): ${totalItineraryTranslationsSkipped}`);
  console.log(`Total API calls made: ${apiCallCount}`);
  console.log('========================================');
}

populateTourDetailTranslations().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
