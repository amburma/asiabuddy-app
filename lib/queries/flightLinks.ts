import { getSupabase } from '@/lib/supabase';

export interface FlightLink {
  id: string;
  city: string;
  provider: string;
  flight_url: string;
  airline: string | null;
  departure_city: string | null;
  arrival_city: string | null;
  departure_time: string | null;
  arrival_time: string | null;
  duration: string | null;
  stops: number | null;
  price: string | null;
  created_at: string;
}

export async function getFlightLinksByCity(city: string): Promise<FlightLink[]> {
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('flight_links')
    .select('*')
    .eq('city', city)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getFlightLinksByCity] Supabase error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data as FlightLink[]) || [];
}
