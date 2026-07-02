import { getSupabase } from '@/lib/supabase';

export interface GygLink {
  id: string;
  city: string;
  activity_name: string;
  gyg_url: string;
  price_from: string | null;
  rating: string | null;
  reviews_count: string | null;
  duration: string | null;
  image_url: string | null;
  created_at: string;
}

export async function getGygLinksByCity(city: string): Promise<GygLink[]> {
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('gyg_links')
    .select('*')
    .eq('city', city)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getGygLinksByCity] Error fetching gyg_links:', error);
    return [];
  }

  return (data as GygLink[]) || [];
}

export interface GygLinksSummary {
  count: number;
  minPrice: string | null;
}

export async function getGygLinksSummary(): Promise<GygLinksSummary> {
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('gyg_links')
    .select('price_from');

  if (error) {
    console.error('[getGygLinksSummary] Error fetching gyg_links:', error);
    return { count: 0, minPrice: null };
  }

  if (!data || data.length === 0) {
    return { count: 0, minPrice: null };
  }

  // Parse numeric values from price_from strings (e.g., "$12" -> 12)
  const numericPrices: number[] = [];
  for (const row of data) {
    if (row.price_from) {
      const match = row.price_from.match(/[\d,]+\.?\d*/);
      if (match) {
        const numericValue = parseFloat(match[0].replace(/,/g, ''));
        if (!isNaN(numericValue)) {
          numericPrices.push(numericValue);
        }
      }
    }
  }

  if (numericPrices.length === 0) {
    return { count: data.length, minPrice: null };
  }

  const minNumericPrice = Math.min(...numericPrices);
  
  // Find the original price_from string that matches this minimum value
  let minPriceString: string | null = null;
  for (const row of data) {
    if (row.price_from) {
      const match = row.price_from.match(/[\d,]+\.?\d*/);
      if (match) {
        const numericValue = parseFloat(match[0].replace(/,/g, ''));
        if (numericValue === minNumericPrice) {
          minPriceString = row.price_from;
          break;
        }
      }
    }
  }

  return { count: data.length, minPrice: minPriceString };
}

export async function getAllGygLinks(): Promise<GygLink[]> {
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('gyg_links')
    .select('*')
    .order('city', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getAllGygLinks] Error fetching gyg_links:', error);
    return [];
  }

  return (data as GygLink[]) || [];
}
