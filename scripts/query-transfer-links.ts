import { getSupabaseAdmin } from '../lib/supabase';

async function queryTransferLinks() {
  const { data, error } = await getSupabaseAdmin()
    .from('transfer_links')
    .select('city, route_name, provider, booking_url')
    .limit(5);

  if (error) {
    console.error('Error querying transfer_links:', error);
    process.exit(1);
  }

  console.log('Transfer Links Data:');
  console.log(JSON.stringify(data, null, 2));
}

queryTransferLinks();
