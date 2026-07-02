import { getSupabase } from '@/lib/supabase';

export interface AgodaLink {
  id: string;
  city: string;
  hotel_name: string;
  agoda_url: string;
  price_from: string | null;
  rating: string | null;
  reviews_count: string | null;
  image_url: string | null;
  is_placeholder: boolean;
  created_at: string;
}

export async function getAgodaLinksByCity(city: string): Promise<AgodaLink[]> {
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('agoda_links')
    .select('*')
    .eq('city', city)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getAgodaLinksByCity] Supabase error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data as AgodaLink[]) || [];
}
