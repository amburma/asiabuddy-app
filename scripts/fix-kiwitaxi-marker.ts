import { getSupabaseAdmin } from '../lib/supabase';

async function fixKiwitaxiMarker() {
  console.log('STEP 1: Finding rows with YOUR_KIWITAXI_MARKER placeholder...');
  
  const { data: beforeData, error: beforeError } = await getSupabaseAdmin()
    .from('transfer_links')
    .select('id, city, route_name, booking_url')
    .like('booking_url', '%YOUR_KIWITAXI_MARKER%');

  if (beforeError) {
    console.error('Error querying before update:', beforeError);
    process.exit(1);
  }

  console.log(`Found ${beforeData?.length || 0} rows with placeholder marker`);
  
  if (beforeData && beforeData.length > 0) {
    console.log('Sample rows BEFORE update:');
    beforeData.slice(0, 3).forEach(row => {
      console.log(`  - ${row.city}: ${row.route_name}`);
      console.log(`    URL: ${row.booking_url}`);
    });
  }

  console.log('\nSTEP 2: Running UPDATE to replace placeholder with 746660...');
  
  // We'll fetch all, update locally, and write back since Supabase JS client doesn't support SQL REPLACE directly
  console.log('Fetching all affected rows...');
  
  const { data: rowsToUpdate, error: fetchError } = await getSupabaseAdmin()
    .from('transfer_links')
    .select('*')
    .like('booking_url', '%YOUR_KIWITAXI_MARKER%');

  if (fetchError) {
    console.error('Error fetching rows to update:', fetchError);
    process.exit(1);
  }

  if (!rowsToUpdate || rowsToUpdate.length === 0) {
    console.log('No rows found with placeholder - nothing to update');
    process.exit(0);
  }

  console.log(`Updating ${rowsToUpdate.length} rows...`);
  
  const updates = rowsToUpdate.map(row => ({
    id: row.id,
    booking_url: row.booking_url.replace('YOUR_KIWITAXI_MARKER', '746660')
  }));

  // Update each row
  for (const update of updates) {
    const { error } = await getSupabaseAdmin()
      .from('transfer_links')
      .update({ booking_url: update.booking_url })
      .eq('id', update.id);
    
    if (error) {
      console.error(`Error updating row ${update.id}:`, error);
    }
  }

  console.log(`Successfully updated ${updates.length} rows`);

  console.log('\nSTEP 3: Verifying update...');
  const { data: afterData, error: afterError } = await getSupabaseAdmin()
    .from('transfer_links')
    .select('id, city, route_name, booking_url')
    .like('booking_url', '%746660%')
    .limit(3);

  if (afterError) {
    console.error('Error querying after update:', afterError);
    process.exit(1);
  }

  console.log('Sample rows AFTER update:');
  afterData?.forEach(row => {
    console.log(`  - ${row.city}: ${row.route_name}`);
    console.log(`    URL: ${row.booking_url}`);
  });

  console.log('\nSTEP 4: Checking for any remaining placeholders...');
  const { data: remainingData, error: remainingError } = await getSupabaseAdmin()
    .from('transfer_links')
    .select('id, city, route_name, booking_url')
    .like('booking_url', '%YOUR_KIWITAXI_MARKER%');

  if (remainingError) {
    console.error('Error checking for remaining placeholders:', remainingError);
  } else if (remainingData && remainingData.length > 0) {
    console.log(`WARNING: ${remainingData.length} rows still have placeholder marker`);
  } else {
    console.log('SUCCESS: No placeholder markers remaining in database');
  }
}

fixKiwitaxiMarker();
