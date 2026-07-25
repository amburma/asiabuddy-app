import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateInvoiceNo } from '@/lib/invoice/generateInvoiceNo';
import { generatePaidInvoicePDF } from '@/lib/pdf/generatePaidInvoicePDF';
import { uploadInvoicePDF } from '@/lib/storage/uploadInvoicePDF';
import { appendPaidInvoiceRow } from '@/lib/sheets/appendPaidInvoiceRow';
import { sendPaidInvoiceEmail } from '@/lib/email/sendPaidInvoiceEmail';
import { z } from 'zod';

// ==========================================
// Zod Schema for Request Body Validation
// ==========================================
const paidInvoiceSchema = z.object({
  invoice_date: z.string(),
  country: z.string(),
  customer_name: z.string(),
  customer_contact: z.string(),
  customer_email: z.string().optional(),
  service_type: z.enum(['tour', 'flight', 'hotel', 'airport_transfer', 'tickets_activities', 'car_rental']),
  currency: z.string(),
  base_price: z.number().nonnegative(),
  service_fee: z.number().nonnegative().optional().default(0),
  vat_amount: z.number().nonnegative().optional().default(0),
  payment_method: z.string(),
  remarks: z.string().optional(),
  details: z.object({
    flight: z.object({
      airline: z.string().optional(),
      flightNumber: z.string().optional(),
      departure: z.string().optional(),
      arrival: z.string().optional(),
      date: z.string().optional(),
      passengers: z.array(z.object({
        name: z.string(),
        passport: z.string().optional(),
      })).optional(),
    }).optional(),
    hotel: z.object({
      hotelName: z.string().optional(),
      checkIn: z.string().optional(),
      checkOut: z.string().optional(),
      guests: z.array(z.object({
        name: z.string(),
      })).optional(),
    }).optional(),
    description: z.string().optional(),
  }).optional(),
});

// ==========================================
// POST Handler - Paid Invoice Orchestration
// ==========================================
export async function POST(request: NextRequest) {
  try {
    // a. Auth check - server-side session validation
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing session' },
        { status: 401 }
      );
    }

    // b. Parse and validate request body
    const body = await request.json();
    const validationResult = paidInvoiceSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // c. Dedup guard - check for duplicate submission within 10 seconds
    const total_amount = validatedData.base_price + validatedData.service_fee + validatedData.vat_amount;
    const tenSecondsAgo = new Date(Date.now() - 10000).toISOString();

    const { data: existingInvoice, error: dedupCheckError } = await supabase
      .from('paid_invoices')
      .select('id')
      .eq('customer_name', validatedData.customer_name)
      .eq('total_amount', total_amount)
      .eq('service_type', validatedData.service_type)
      .gte('created_at', tenSecondsAgo)
      .maybeSingle();

    if (dedupCheckError) {
      console.error('Dedup check error:', dedupCheckError);
    }

    if (existingInvoice) {
      return NextResponse.json(
        { error: 'Duplicate submission detected - please wait before submitting again' },
        { status: 409 }
      );
    }

    // d. Generate invoice number (race-safe via RPC)
    const invoice_no = await generateInvoiceNo();

    // e. Insert row into paid_invoices table
    const issued_by = user.email || 'Unknown';

    const { data: insertedRow, error: insertError } = await supabase
      .from('paid_invoices')
      .insert({
        invoice_no,
        invoice_date: validatedData.invoice_date,
        country: validatedData.country,
        customer_name: validatedData.customer_name,
        customer_contact: validatedData.customer_contact,
        customer_email: validatedData.customer_email || null,
        service_type: validatedData.service_type,
        currency: validatedData.currency,
        base_price: validatedData.base_price,
        service_fee: validatedData.service_fee,
        vat_amount: validatedData.vat_amount,
        total_amount,
        payment_method: validatedData.payment_method,
        issued_by,
        remarks: validatedData.remarks || null,
        details: validatedData.details || {},
        status: 'issued',
        sheet_status: 'pending',
        email_status: 'pending',
      })
      .select('id')
      .single();

    if (insertError || !insertedRow) {
      console.error('Failed to insert paid invoice:', insertError);
      return NextResponse.json(
        { error: 'Failed to create invoice record' },
        { status: 500 }
      );
    }

    const invoiceId = insertedRow.id;

    // f. Generate PDF (CRITICAL PATH)
    let pdfBuffer: Buffer;
    let pdf_url: string | null = null;

    try {
      const pdfData = {
        invoice_no,
        invoice_date: validatedData.invoice_date,
        country: validatedData.country,
        service_type: validatedData.service_type,
        customer_name: validatedData.customer_name,
        customer_contact: validatedData.customer_contact,
        customer_email: validatedData.customer_email,
        currency: validatedData.currency,
        base_price: validatedData.base_price,
        service_fee: validatedData.service_fee,
        vat_amount: validatedData.vat_amount,
        total_amount,
        payment_method: validatedData.payment_method,
        issued_by,
        remarks: validatedData.remarks,
        details: validatedData.details || {},
      };

      pdfBuffer = generatePaidInvoicePDF(pdfData);
      pdf_url = await uploadInvoicePDF(pdfBuffer, invoice_no);

      // Update row with PDF URL
      const { error: updatePdfError } = await supabase
        .from('paid_invoices')
        .update({ pdf_url })
        .eq('id', invoiceId);

      if (updatePdfError) {
        console.error('Failed to update PDF URL:', updatePdfError);
      }
    } catch (pdfError) {
      console.error('PDF generation or upload failed:', pdfError);

      // Update row to failed status
      await supabase
        .from('paid_invoices')
        .update({ status: 'failed' })
        .eq('id', invoiceId);

      return NextResponse.json(
        { error: 'PDF generation failed' },
        { status: 500 }
      );
    }

    // g. Append to Google Sheets (BEST-EFFORT, NON-BLOCKING)
    let sheetSuccess = false;
    try {
      const sheetData = {
        invoice_no,
        invoice_date: validatedData.invoice_date,
        country: validatedData.country,
        customer_name: validatedData.customer_name,
        customer_contact: validatedData.customer_contact,
        customer_email: validatedData.customer_email,
        service_type: validatedData.service_type,
        currency: validatedData.currency,
        base_price: validatedData.base_price,
        service_fee: validatedData.service_fee,
        vat_amount: validatedData.vat_amount,
        total_amount,
        payment_method: validatedData.payment_method,
        issued_by,
        remarks: validatedData.remarks,
      };

      const sheetResult = await appendPaidInvoiceRow(sheetData);
      sheetSuccess = sheetResult.success;

      // Update sheet_status
      await supabase
        .from('paid_invoices')
        .update({ sheet_status: sheetSuccess ? 'success' : 'failed' })
        .eq('id', invoiceId);
    } catch (sheetError) {
      console.error('Sheet append failed (non-blocking):', sheetError);
      await supabase
        .from('paid_invoices')
        .update({ sheet_status: 'failed' })
        .eq('id', invoiceId);
    }

    // h. Send email (BEST-EFFORT, NON-BLOCKING)
    let emailSuccess = false;
    if (validatedData.customer_email) {
      try {
        const emailData = {
          invoice_no,
          invoice_date: validatedData.invoice_date,
          country: validatedData.country,
          customer_name: validatedData.customer_name,
          customer_contact: validatedData.customer_contact,
          customer_email: validatedData.customer_email,
          service_type: validatedData.service_type,
          currency: validatedData.currency,
          base_price: validatedData.base_price,
          service_fee: validatedData.service_fee,
          vat_amount: validatedData.vat_amount,
          total_amount,
          payment_method: validatedData.payment_method,
          issued_by,
          remarks: validatedData.remarks,
        };

        const emailResult = await sendPaidInvoiceEmail(emailData, pdfBuffer);
        emailSuccess = emailResult.success;

        // Update email_status
        await supabase
          .from('paid_invoices')
          .update({ email_status: emailSuccess ? 'success' : 'failed' })
          .eq('id', invoiceId);
      } catch (emailError) {
        console.error('Email send failed (non-blocking):', emailError);
        await supabase
          .from('paid_invoices')
          .update({ email_status: 'failed' })
          .eq('id', invoiceId);
      }
    } else {
      // No customer email - skip email and mark as skipped
      await supabase
        .from('paid_invoices')
        .update({ email_status: 'skipped' })
        .eq('id', invoiceId);
    }

    // i. Return success response
    return NextResponse.json({
      success: true,
      invoice_no,
      pdf_url,
      sheet_success: sheetSuccess,
      email_success: emailSuccess,
    });

  } catch (error) {
    console.error('Paid invoice API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
