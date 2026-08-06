import { getSupabase } from '../supabase';

export interface TransportTicketRoute {
  id: string;
  country: string;
  origin_slug: string;
  origin_display: string;
  destination_slug: string;
  destination_display: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getTransportTicketRoutesByCountry(country: string): Promise<TransportTicketRoute[]> {
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('transport_ticket_routes')
    .select('*')
    .eq('country', country)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[getTransportTicketRoutesByCountry] Supabase error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data as TransportTicketRoute[]) || [];
}

export async function getAllTransportTicketRoutes(): Promise<TransportTicketRoute[]> {
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('transport_ticket_routes')
    .select('*')
    .order('country', { ascending: true })
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[getAllTransportTicketRoutes] Supabase error:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  return (data as TransportTicketRoute[]) || [];
}
