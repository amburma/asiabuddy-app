import { getSupabase } from '@/lib/supabase';

export interface KlookLink {
  id: string;
  city: string;
  activity_name: string;
  klook_url: string;
  price_from: string | null;
  rating: string | null;
  reviews_count: string | null;
  duration: string | null;
  image_url: string | null;
  is_placeholder: string;
  created_at: string;
}

export async function getKlookLinksByCity(city: string): Promise<KlookLink[]> {
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('klook_links')
    .select('*')
    .eq('city', city)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getKlookLinksByCity] Supabase error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data as KlookLink[]) || [];
}
