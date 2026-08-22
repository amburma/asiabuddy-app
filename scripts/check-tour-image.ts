#!/usr/bin/env tsx
/**
 * Check tour images field for specific tour
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTourImage() {
  const slug = 'bangkok-temple-premier-mall-discovery-tour';
  
  console.log(`Checking tour with slug: ${slug}`);
  
  const { data, error } = await supabase
    .from('tours')
    .select('id, title, slug, images')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching tour:', error);
    process.exit(1);
  }
  
  if (!data) {
    console.log('No tour found with that slug');
    process.exit(0);
  }
  
  console.log('\n=== Tour Data ===');
  console.log('ID:', data.id);
  console.log('Title:', data.title);
  console.log('Slug:', data.slug);
  console.log('images (JSONB):', JSON.stringify(data.images, null, 2));
  
  // Check if images array has content
  if (Array.isArray(data.images) && data.images.length > 0) {
    console.log('\n✅ First image from images array:', data.images[0]);
    console.log('Total images:', data.images.length);
  } else {
    console.log('\n❌ No images found in images array');
  }
}

checkTourImage();