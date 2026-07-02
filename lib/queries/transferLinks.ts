import { getSupabase } from '@/lib/supabase';

export interface TransferLink {
  id: string;
  city: string;
  route_name: string;
  provider: string;
  booking_url: string;
  price_from: string | null;
  transport_type: string | null;
  image_url: string | null;
  is_placeholder: boolean;
  created_at: string;
}

export async function getTransferLinksByCity(city: string, provider?: string): Promise<TransferLink[]> {
  const supabase = getSupabase();
  
  let query = supabase
    .from('transfer_links')
    .select('*')
    .eq('city', city);
  
  if (provider) {
    query = query.eq('provider', provider);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('[getTransferLinksByCity] Supabase error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data as TransferLink[]) || [];
}
