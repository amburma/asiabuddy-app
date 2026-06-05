import PDFDocument from 'pdfkit';
import { Booking } from './database';
import { uploadTelegramFileToDrive } from '../src/services/googleDrive';

interface InvoiceData {
  booking: Booking;
  amount: number;
  customerName?: string;
}

export async function generateInvoicePDF(invoiceData: InvoiceData): Promise<{ buffer: Buffer; driveUrl: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        const bookingIdShort = invoiceData.booking.id.slice(-8);
        const fileName = `invoice_${bookingIdShort}.pdf`;
        
        const driveUrl = await uploadTelegramFileToDrive(
          buffer,
          fileName,
          'application/pdf',
          'thailand'
        );
        
        resolve({ buffer, driveUrl: driveUrl || '' });
      });
      doc.on('error', reject);

      // Header
      doc.fontSize(20).font('Helvetica-Bold').text('AsiaBuddy', 50, 50);
      doc.fontSize(12).font('Helvetica').text('Digital Concierge Services', 50, 75);
      doc.fontSize(10).text('Invoice', 50, 95);

      // Invoice details
      const bookingIdShort = invoiceData.booking.id.slice(-8);
      doc.fontSize(10).text(`Invoice #: INV-${bookingIdShort}`, 400, 50);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 400, 65);
      doc.text(`Booking ID: ${bookingIdShort}`, 400, 80);

      // Line
      doc.moveTo(50, 120).lineTo(550, 120).stroke();

      // Customer Information
      doc.fontSize(12).font('Helvetica-Bold').text('Bill To:', 50, 140);
      doc.fontSize(10).font('Helvetica').text(`Telegram ID: ${invoiceData.booking.telegram_id}`, 50, 160);
      if (invoiceData.customerName) {
        doc.text(`Name: ${invoiceData.customerName}`, 50, 175);
      }

      // Service Details
      doc.fontSize(12).font('Helvetica-Bold').text('Service Details:', 50, 210);
      
      const serviceEmoji = invoiceData.booking.tour_type === 'tour' ? '🎫' :
                          invoiceData.booking.tour_type === 'flight' ? '✈️' :
                          invoiceData.booking.tour_type === 'car' ? '🚗' : '🚕';
      
      doc.fontSize(10).font('Helvetica');
      doc.text(`Service Type: ${serviceEmoji} ${invoiceData.booking.tour_type.toUpperCase()}`, 50, 230);
      doc.text(`Status: ${invoiceData.booking.status.toUpperCase()}`, 50, 245);
      doc.text(`Booking Date: ${new Date(invoiceData.booking.created_at).toLocaleDateString()}`, 50, 260);

      // Booking Details
      doc.fontSize(12).font('Helvetica-Bold').text('Booking Details:', 50, 290);
      doc.fontSize(10).font('Helvetica');
      
      const details = invoiceData.booking.details;
      let detailY = 310;
      
      if (details.user_input) {
        doc.text(`Request: ${details.user_input}`, 50, detailY, { width: 450 });
        detailY += 40;
      }

      // Amount section
      doc.moveTo(50, detailY + 20).lineTo(550, detailY + 20).stroke();
      
      doc.fontSize(12).font('Helvetica-Bold').text('Amount Due:', 400, detailY + 30);
      doc.fontSize(16).font('Helvetica-Bold').text(`$${invoiceData.amount.toFixed(2)}`, 400, detailY + 50);

      // Footer
      doc.fontSize(8).font('Helvetica').text(
        'Thank you for choosing AsiaBuddy! For questions, contact us via Telegram.',
        50,
        doc.page.height - 50,
        { align: 'center' }
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export async function generateAndUploadInvoicePDF(invoiceData: InvoiceData): Promise<{ buffer: Buffer; driveUrl: string | null }> {
  const { buffer, driveUrl } = await generateInvoicePDF(invoiceData);
  return { buffer, driveUrl: driveUrl || null };
}
