import { createClient } from '@supabase/supabase-js';

// ==========================================
// Upload Invoice PDF to Supabase Storage
// ==========================================
export async function uploadInvoicePDF(
  pdfBuffer: Buffer,
  invoiceNo: string
): Promise<string> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const fileName = `${invoiceNo}.pdf`;

  const { data, error } = await supabase.storage
    .from('paid-invoices')
    .upload(fileName, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (error) {
    throw new Error(`Failed to upload invoice PDF: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from('paid-invoices')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}
