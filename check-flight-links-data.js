const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFlightLinks() {
  console.log('Querying flight_links table for Bangkok city...\n');
  
  const { data, error } = await supabase
    .from('flight_links')
    .select('*')
    .eq('city', 'bangkok')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error querying flight_links:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('No flight links found for Bangkok');
    return;
  }

  console.log(`Found ${data.length} flight links for Bangkok:\n`);
  
  data.forEach((flight, index) => {
    console.log(`--- Flight Link ${index + 1} ---`);
    console.log(`ID: ${flight.id}`);
    console.log(`City: ${flight.city}`);
    console.log(`Provider: ${flight.provider}`);
    console.log(`Airline: ${flight.airline}`);
    console.log(`Departure City: ${flight.departure_city}`);
    console.log(`Arrival City: ${flight.arrival_city}`);
    console.log(`Departure Time: ${flight.departure_time}`);
    console.log(`Arrival Time: ${flight.arrival_time}`);
    console.log(`Duration: ${flight.duration}`);
    console.log(`Stops: ${flight.stops}`);
    console.log(`Price: ${flight.price}`);
    console.log(`Flight URL: ${flight.flight_url}`);
    console.log(`Created At: ${flight.created_at}`);
    console.log('');
  });
}

checkFlightLinks().then(() => {
  console.log('Query complete');
  process.exit(0);
}).catch((err) => {
  console.error('Script error:', err);
  process.exit(1);
});
