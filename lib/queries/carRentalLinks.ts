import { getSupabase } from '@/lib/supabase';

export interface CarRentalLink {
  id: string;
  city: string;
  location_name: string;
  provider: string;
  booking_url: string;
  price_from: string | null;
  vehicle_type: string | null;
  rental_type: 'self-drive' | 'with-driver';
  image_url: string | null;
  is_placeholder: boolean;
}

export async function getCarRentalLinksByCity(city: string): Promise<CarRentalLink[]> {
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('car_rental_links')
    .select('*')
    .eq('city', city)
    .eq('is_placeholder', false);

  if (error) {
    console.error('[getCarRentalLinksByCity] Supabase error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data as CarRentalLink[]) || [];
}
