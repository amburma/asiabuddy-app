import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import fs from 'fs';
import path from 'path';

// ==========================================
// Logo Base64
// ==========================================
const LOGO_BASE64 = fs.readFileSync(path.join(process.cwd(), 'public/logo-compressed.png')).toString('base64');

// ==========================================
// Design Palette (reused from pdfGenerator.ts)
// ==========================================
const colors = {
  primary:   [15, 45, 33]   as [number, number, number],  // Sacred Green (#0F2D21)
  accent:    [181, 148, 16] as [number, number, number],  // Gold Deep (#B59410)
  textDark:  [40, 40, 40]   as [number, number, number],  // Charcoal Gray
  textLight: [120, 120, 120] as [number, number, number], // Light Gray
  bgLight:   [247, 245, 240] as [number, number, number]  // Off-White
};

// ==========================================
// Types (matching paid_invoices table shape)
// ==========================================
interface Passenger {
  name: string;
  passport?: string;
}

interface Guest {
  name: string;
}

interface FlightDetails {
  airline?: string;
  flightNumber?: string;
  departure?: string;
  arrival?: string;
  date?: string;
  passengers?: Passenger[];
}

interface HotelDetails {
  hotelName?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: Guest[];
}

interface ServiceDetails {
  flight?: FlightDetails;
  hotel?: HotelDetails;
  description?: string;
  [key: string]: unknown;
}

interface PaidInvoiceData {
  invoice_no: string;
  invoice_date: string;
  country: string;
  service_type: 'flight' | 'hotel' | string;
  customer_name: string;
  customer_contact: string;
  customer_email?: string;
  currency: string;
  base_price: number;
  service_fee: number;
  vat_amount: number;
  total_amount: number;
  payment_method: string;
  issued_by: string;
  remarks?: string;
  details: ServiceDetails;
}

// ==========================================
// Main PDF Generator for Paid Invoices
// ==========================================
export function generatePaidInvoicePDF(data: PaidInvoiceData): Buffer {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const logoDataUrl = `data:image/png;base64,${LOGO_BASE64}`;

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

  const formattedDate = new Date(data.invoice_date).toLocaleDateString('en-US');

  doc.text(`Invoice No : ${data.invoice_no}`, 195, 30, { align: 'right' });
  doc.text(`Date       : ${formattedDate}`, 195, 35, { align: 'right' });
  doc.text(`Country    : ${data.country}`, 195, 40, { align: 'right' });

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

  const billLines = [data.customer_name, `Phone: ${data.customer_contact}`];
  if (data.customer_email) billLines.push(`Email: ${data.customer_email}`);
  doc.text(billLines, 120, 60);

  // ── Service Details Table (conditional by service_type) ─────────
  let serviceTableBody: (string | number)[][] = [];
  let startY = 100;

  if (data.service_type === 'flight' && data.details.flight) {
    const flight = data.details.flight;
    serviceTableBody = [
      ['Service Type', 'Flight Booking'],
      ['Airline', flight.airline || 'N/A'],
      ['Flight Number', flight.flightNumber || 'N/A'],
      ['Departure', flight.departure || 'N/A'],
      ['Arrival', flight.arrival || 'N/A'],
      ['Date', flight.date || 'N/A'],
    ];

    // Add passengers if available
    if (flight.passengers && flight.passengers.length > 0) {
      serviceTableBody.push(['Passengers', '']);
      flight.passengers.forEach((p, idx) => {
        serviceTableBody.push([`  ${idx + 1}. ${p.name}`, p.passport || '']);
      });
    }
  } else if (data.service_type === 'hotel' && data.details.hotel) {
    const hotel = data.details.hotel;
    serviceTableBody = [
      ['Service Type', 'Hotel Booking'],
      ['Hotel Name', hotel.hotelName || 'N/A'],
      ['Check-in', hotel.checkIn || 'N/A'],
      ['Check-out', hotel.checkOut || 'N/A'],
    ];

    // Add guests if available
    if (hotel.guests && hotel.guests.length > 0) {
      serviceTableBody.push(['Guests', '']);
      hotel.guests.forEach((g, idx) => {
        serviceTableBody.push([`  ${idx + 1}. ${g.name}`, '']);
      });
    }
  } else {
    // Generic service description
    serviceTableBody = [
      ['Service Type', data.service_type],
      ['Description', data.details.description || 'N/A'],
    ];
  }

  autoTable(doc, {
    startY,
    head: [['Field', 'Details']],
    body: serviceTableBody,
    theme: 'striped',
    headStyles: {
      fillColor:  colors.primary,
      textColor:  [255, 255, 255],
      fontStyle:  'bold',
      halign:     'left',
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 140 },
    },
    styles: { font: 'Helvetica', fontSize: 9, cellPadding: 4 },
    alternateRowStyles: { fillColor: colors.bgLight },
    margin: { left: 15, right: 15 },
  });

  // ── Amount Breakdown Table ─────────────────────────────
  const finalY = (doc as any).lastAutoTable?.finalY + 10 || 150;

  const amountBody = [
    ['Base Price', `${data.currency} ${data.base_price.toFixed(2)}`],
    ['Service Fee', `${data.currency} ${data.service_fee.toFixed(2)}`],
  ];

  // Only add VAT row if vat_amount > 0
  if (data.vat_amount > 0) {
    amountBody.push(['VAT', `${data.currency} ${data.vat_amount.toFixed(2)}`]);
  }

  amountBody.push(['Total Amount', `${data.currency} ${data.total_amount.toFixed(2)}`]);

  autoTable(doc, {
    startY: finalY,
    head: [['Description', 'Amount']],
    body: amountBody,
    theme: 'plain',
    headStyles: {
      fillColor:  colors.primary,
      textColor:  [255, 255, 255],
      fontStyle:  'bold',
      halign:     'left',
    },
    columnStyles: {
      0: { cellWidth: 140 },
      1: { cellWidth: 40, halign: 'right', fontStyle: 'bold' },
    },
    styles: { font: 'Helvetica', fontSize: 10, cellPadding: 4 },
    margin: { left: 15, right: 15 },
    showHead: false,
  });

  // ── Remarks (if any) ───────────────────────────────────
  const amountFinalY = (doc as any).lastAutoTable?.finalY + 10 || finalY + 40;
  if (data.remarks) {
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...colors.primary);
    doc.text('Remarks:', 15, amountFinalY);

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(...colors.textDark);
    doc.text(data.remarks, 15, amountFinalY + 6);
  }

  // ── Footer ────────────────────────────────────────────
  const pageH = doc.internal.pageSize.height;

  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.3);
  doc.line(15, pageH - 35, 195, pageH - 35);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...colors.textDark);
  doc.text(`Payment Method: ${data.payment_method}`, 15, pageH - 28);
  doc.text(`Issued By: ${data.issued_by}`, 15, pageH - 22);

  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...colors.textLight);
  doc.text(
    'This is a computer-generated invoice. No signature required.',
    105, pageH - 15, { align: 'center' }
  );

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...colors.textLight);
  doc.text(
    'AsiaBuddy • Eisenbahnstraße 2b, 48341 Altenberge, Germany',
    105, pageH - 10, { align: 'center' }
  );

  // ── Return as Buffer (server-side) ────────────────────
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
