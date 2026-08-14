import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkOrphanedLandmarks() {
  console.log('Checking for orphaned landmarks...');
  
  // Get all landmarks
  const { data: landmarks, error: landmarksError } = await supabase
    .from('landmarks')
    .select('id, name, image_url, created_at');
  
  if (landmarksError) {
    console.error('Error fetching landmarks:', landmarksError);
    return;
  }
  
  console.log(`Total landmarks: ${landmarks?.length || 0}`);
  
  // Check each landmark if it's referenced by any itinerary
  const orphanedLandmarks = [];
  
  for (const landmark of landmarks || []) {
    const { data: references, error: refError } = await supabase
      .from('itineraries')
      .select('id')
      .eq('landmark_id', landmark.id);
    
    if (refError) {
      console.error(`Error checking references for landmark ${landmark.id}:`, refError);
      continue;
    }
    
    if (!references || references.length === 0) {
      orphanedLandmarks.push({
        ...landmark,
        reference_count: 0
      });
    }
  }
  
  console.log(`\nOrphaned landmarks (${orphanedLandmarks.length}):`);
  if (orphanedLandmarks.length === 0) {
    console.log('No orphaned landmarks found.');
  } else {
    orphanedLandmarks.forEach((landmark, index) => {
      console.log(`\n${index + 1}. ID: ${landmark.id}`);
      console.log(`   Name: ${landmark.name}`);
      console.log(`   Image URL: ${landmark.image_url}`);
      console.log(`   Created: ${landmark.created_at}`);
    });
  }
}

checkOrphanedLandmarks().then(() => process.exit(0));
