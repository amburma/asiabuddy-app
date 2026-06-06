import jsPDF from 'jspdf';
import { Booking } from './database';
import { uploadTelegramFileToDrive } from '../src/services/googleDrive';

interface InvoiceData {
  booking: Booking;
  amount: number;
  customerName?: string;
}

export async function generateInvoicePDF(invoiceData: InvoiceData): Promise<{ buffer: Buffer; driveUrl: string }> {
  const doc = new jsPDF();
  const bookingIdShort = invoiceData.booking.id.slice(-8);

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('AsiaBuddy', 20, 20);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Digital Concierge Services', 20, 30);
  doc.setFontSize(10);
  doc.text('Invoice', 20, 40);

  // Invoice details
  doc.setFontSize(10);
  doc.text(`Invoice #: INV-${bookingIdShort}`, 140, 20);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 30);
  doc.text(`Booking ID: ${bookingIdShort}`, 140, 40);

  // Line
  doc.line(20, 50, 190, 50);

  // Customer Information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 20, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Telegram ID: ${invoiceData.booking.telegram_id}`, 20, 70);
  if (invoiceData.customerName) {
    doc.text(`Name: ${invoiceData.customerName}`, 20, 80);
  }

  // Service Details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Service Details:', 20, 95);
  
  const serviceEmoji = invoiceData.booking.tour_type === 'tour' ? 'Tour' :
                      invoiceData.booking.tour_type === 'flight' ? 'Flight' :
                      invoiceData.booking.tour_type === 'car' ? 'Car' : 'Taxi';
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Service Type: ${serviceEmoji}`, 20, 105);
  doc.text(`Status: ${invoiceData.booking.status.toUpperCase()}`, 20, 115);
  doc.text(`Booking Date: ${new Date(invoiceData.booking.created_at).toLocaleDateString()}`, 20, 125);

  // Booking Details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Booking Details:', 20, 140);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const details = invoiceData.booking.details;
  let detailY = 150;
  
  if (details.user_input) {
    const splitText = doc.splitTextToSize(`Request: ${details.user_input}`, 170);
    doc.text(splitText, 20, detailY);
    detailY += splitText.length * 5 + 10;
  }

  // Amount section
  doc.line(20, detailY, 190, detailY);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Amount Due:', 140, detailY + 10);
  doc.setFontSize(16);
  doc.text(`$${invoiceData.amount.toFixed(2)}`, 140, detailY + 20);

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Thank you for choosing AsiaBuddy! For questions, contact us via Telegram.',
    105,
    280,
    { align: 'center' }
  );

  const pdfBytes = doc.output('arraybuffer');
  const buffer = Buffer.from(pdfBytes);
  
  const fileName = `invoice_${bookingIdShort}.pdf`;
  
  const driveUrl = await uploadTelegramFileToDrive(
    buffer,
    fileName,
    'application/pdf',
    'thailand'
  );
  
  return { buffer, driveUrl: driveUrl || '' };
}

export async function generateAndUploadInvoicePDF(invoiceData: InvoiceData): Promise<{ buffer: Buffer; driveUrl: string | null }> {
  const { buffer, driveUrl } = await generateInvoicePDF(invoiceData);
  return { buffer, driveUrl: driveUrl || null };
}
