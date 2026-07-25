import { createClient } from '../supabase/server';

/**
 * Generates a race-safe invoice number using Supabase RPC function.
 * Calls the Postgres function `next_invoice_no()` which uses a sequence.
 * Format: "AB-INV-0001"
 * 
 * @returns Promise<string> - The generated invoice number
 * @throws Error if RPC call fails
 */
export async function generateInvoiceNo(): Promise<string> {
  const supabase = await createClient();
  
  const { data, error } = await supabase.rpc('next_invoice_no');
  
  if (error) {
    throw new Error(`Failed to generate invoice number: ${error.message}`);
  }
  
  if (!data) {
    throw new Error('Invoice number generation returned null');
  }
  
  return data as string;
}
