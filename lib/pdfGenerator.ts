import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import fs from 'fs';
import path from 'path';



// ==========================================
// Logo Base64
// ==========================================
const LOGO_BASE64 = fs.readFileSync(path.join(process.cwd(), 'public/logo-compressed.png')).toString('base64');

// ==========================================
// Design Palette
// ==========================================
const colors = {
  primary:   [15, 45, 33]   as [number, number, number],  // Sacred Green (#0F2D21)
  accent:    [181, 148, 16] as [number, number, number],  // Gold Deep (#B59410)
  textDark:  [40, 40, 40]   as [number, number, number],  // Charcoal Gray
  textLight: [120, 120, 120] as [number, number, number], // Light Gray
  bgLight:   [247, 245, 240] as [number, number, number]  // Off-White
};

// ==========================================
// Types
// ==========================================
interface InvoiceItem {
  name: string;
  qty: number;
  price: number;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

interface BookingData {
  id: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  source?: string;
  tour_type?: string;
  details?: {
    services?: string[];
    chatSummary?: string;
    socials?: string[];
    [key: string]: unknown;
  };
  created_at?: string;
}

// ==========================================
// Helper: Build invoice items from booking
// ==========================================
function buildItems(booking: BookingData): InvoiceItem[] {
  const services = booking.details?.services ?? [];
  if (services.length === 0) {
    return [{ name: booking.tour_type ?? 'Travel Service', qty: 1, price: 0 }];
  }
  return services.map((s) => ({ name: s, qty: 1, price: 0 }));
}

// ==========================================
// Main PDF Generator (server-side Buffer)
// ==========================================
export function generateInvoicePDF(
  booking: BookingData,
  invoiceNo: string,
  items?: InvoiceItem[]
): Buffer {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });


  const lineItems: InvoiceItem[] = items ?? buildItems(booking);
  const customer: CustomerInfo = {
    name:    booking.customer_name  ?? 'N/A',
    phone:   booking.customer_phone ?? 'N/A',
    email:   booking.customer_email ?? 'N/A',
    address: ''
  };

  const logoDataUrl = `data:image/png;base64,${LOGO_BASE64}`;

  console.log('[pdf] logoDataUrl length:', logoDataUrl?.length ?? 0);

  // ── Watermark ────────────────────────────────────────
  doc.saveGraphicsState();
  (doc as any).setGState((doc as any).GState({ opacity: 0.1 }));
  doc.addImage(logoDataUrl, 'PNG', 55, 110, 100, 100, 'watermark', 'FAST');
  doc.restoreGraphicsState();

  // ── Header: Logo + Company name ───────────────────────
  doc.addImage(logoDataUrl, 'PNG', 15, 15, 25, 25);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...colors.primary);
  doc.text('AsiaBuddy', 45, 22);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...colors.textLight);
  doc.text('Travel Services', 45, 27);

  // ── Header: Invoice title + meta ─────────────────────
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...colors.accent);
  doc.text('Invoice', 195, 22, { align: 'right' });

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...colors.textDark);

  const today   = new Date().toLocaleDateString('en-US');
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US');

  doc.text(`Invoice No : ${invoiceNo}`, 195, 30, { align: 'right' });
  doc.text(`Date       : ${today}`,     195, 35, { align: 'right' });
  doc.text(`Due Date   : ${dueDate}`,   195, 40, { align: 'right' });

  // ── Divider ───────────────────────────────────────────
  doc.setDrawColor(...colors.accent);
  doc.setLineWidth(0.5);
  doc.line(15, 45, 195, 45);

  // ── FROM block ────────────────────────────────────────
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...colors.primary);
  doc.text('FROM:', 15, 55);

  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colors.textDark);
  doc.text(
    [
      'AsiaBuddy.app',
      'Eisenbahnstraße 2b,',
      '48341 Altenberge, Germany.',
      '',
      'Mobile: +491793956759 (Viber, WhatsApp, Telegram)',
      'Email: asiabuddyapp@gmail.com',
      'Website: www.asiabuddy.app',
    ],
    15, 60
  );

  // ── BILL TO block ─────────────────────────────────────
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(...colors.primary);
  doc.text('BILL TO:', 120, 55);

  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(...colors.textDark);

  const billLines = [customer.name, `Phone: ${customer.phone}`];
  if (customer.email) billLines.push(`Email: ${customer.email}`);
  if (customer.address) billLines.push(customer.address);
  doc.text(billLines, 120, 60);

  // ── Items table ───────────────────────────────────────
  const subtotal   = lineItems.reduce((s, i) => s + i.qty * i.price, 0);
  const taxRate    = 0.19;
  const taxAmount  = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  const tableBody = lineItems.map((item, idx) => [
    idx + 1,
    item.name,
    item.qty,
    item.price > 0 ? `EUR ${item.price.toFixed(2)}` : '—',
    item.price > 0 ? `EUR ${(item.qty * item.price).toFixed(2)}` : '—',
  ]);

  autoTable(doc, {
    startY: 100,
    head: [['#', 'Item Description', 'Qty', 'Unit Price', 'Total']],
    body: tableBody,
    theme: 'striped',
    headStyles: {
      fillColor:  colors.primary,
      textColor:  [255, 255, 255],
      fontStyle:  'bold',
      halign:     'left',
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 90 },
      2: { cellWidth: 15, halign: 'center' },
      3: { cellWidth: 32, halign: 'right' },
      4: { cellWidth: 33, halign: 'right' },
    },
    styles: { font: 'Helvetica', fontSize: 9, cellPadding: 4 },
    alternateRowStyles: { fillColor: colors.bgLight },
    margin: { left: 15, right: 15 },
  });

  // ── Summary ───────────────────────────────────────────
  const finalY = (doc as any).lastAutoTable?.finalY + 10 || 150;

  if (subtotal > 0) {
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...colors.textDark);

    doc.text('Subtotal:',        140, finalY,     { align: 'right' });
    doc.text(`EUR ${subtotal.toFixed(2)}`, 195, finalY, { align: 'right' });

    doc.text('VAT / Tax (19%):', 140, finalY + 6, { align: 'right' });
    doc.text(`EUR ${taxAmount.toFixed(2)}`,  195, finalY + 6, { align: 'right' });

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...colors.primary);
    doc.text('Grand Total:', 140, finalY + 14, { align: 'right' });
    doc.setTextColor(...colors.accent);
    doc.text(`EUR ${grandTotal.toFixed(2)}`, 195, finalY + 14, { align: 'right' });
  }

  
  const pageH = doc.internal.pageSize.height;

  // ── Footer ────────────────────────────────────────────

  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.3);
  doc.line(15, pageH - 25, 195, pageH - 25);

  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...colors.primary);
  doc.text('Thank you for choosing AsiaBuddy.', 105, pageH - 18, { align: 'center' });

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...colors.textLight);
  doc.text(
    'AsiaBuddy • Eisenbahnstraße 2b, 48341 Altenberge, Germany',
    105, pageH - 12, { align: 'center' }
  );

  // ── Return as Buffer (server-side) ────────────────────
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}

// ==========================================
// generateAndUploadInvoicePDF
// (wraps the above + Supabase Storage upload)
// ==========================================
export async function generateAndUploadInvoicePDF(
  booking: BookingData
): Promise<{ buffer: Buffer; driveUrl: string | null }> {
  const shortId  = (booking.id ?? 'UNKNOWN').slice(-8).toUpperCase();
  const invoiceNo = `AB-${shortId}`;

  const buffer = generateInvoicePDF(booking, invoiceNo, undefined);

  // Supabase Storage upload
  let driveUrl: string | null = null;
  try {
    const { createClient } = await import('@supabase/supabase-js');

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const fileName = `invoices/${booking.id}_${Date.now()}.pdf`;
    const { data, error } = await supabase.storage
      .from('invoices')
      .upload(fileName, buffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (error) {
      console.error('Error uploading file to Supabase Storage:', error);
    } else {
      const { data: urlData } = supabase.storage
        .from('invoices')
        .getPublicUrl(fileName);

      driveUrl = urlData.publicUrl;
    }
  } catch (err) {
    console.error('Error uploading file to Supabase Storage:', err);
  }

  return { buffer, driveUrl };
}
