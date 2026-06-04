import nodemailer from 'nodemailer';

interface SendInvoiceEmailParams {
  customerEmail: string;
  salesEmail: string;
  adminEmail: string;
  bookingId: string;
  pdfBuffer: Buffer;
  customerName?: string;
}

// Create Gmail SMTP transporter
function createTransporter() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables');
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });
}

export async function sendInvoiceEmail(params: SendInvoiceEmailParams): Promise<void> {
  const { customerEmail, salesEmail, adminEmail, bookingId, pdfBuffer, customerName } = params;
  const transporter = createTransporter();
  const bookingIdShort = bookingId.slice(-8);

  // Email to customer
  const customerMailOptions = {
    from: process.env.GMAIL_USER,
    to: customerEmail,
    subject: `Your AsiaBuddy Invoice - INV-${bookingIdShort}`,
    text: `Dear ${customerName || 'Customer'},\n\nThank you for choosing AsiaBuddy!\n\nYour booking has been confirmed. Please find your invoice attached.\n\nBooking ID: ${bookingIdShort}\nInvoice #: INV-${bookingIdShort}\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nAsiaBuddy Team`,
    attachments: [
      {
        filename: `invoice_${bookingIdShort}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  // Email to sales (copy)
  const salesMailOptions = {
    from: process.env.GMAIL_USER,
    to: salesEmail,
    subject: `[Sales Copy] Invoice - INV-${bookingIdShort} - ${customerName || 'Customer'}`,
    text: `Sales Team,\n\nA new booking has been confirmed.\n\nCustomer: ${customerName || 'N/A'}\nEmail: ${customerEmail}\nBooking ID: ${bookingIdShort}\nInvoice #: INV-${bookingIdShort}\n\nPlease find the invoice attached for your records.\n\nAsiaBuddy System`,
    attachments: [
      {
        filename: `invoice_${bookingIdShort}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  // Email to admin (copy)
  const adminMailOptions = {
    from: process.env.GMAIL_USER,
    to: adminEmail,
    subject: `[Admin Copy] Invoice - INV-${bookingIdShort} - ${customerName || 'Customer'}`,
    text: `Admin,\n\nA new booking has been confirmed.\n\nCustomer: ${customerName || 'N/A'}\nEmail: ${customerEmail}\nBooking ID: ${bookingIdShort}\nInvoice #: INV-${bookingIdShort}\n\nPlease find the invoice attached for your records.\n\nAsiaBuddy System`,
    attachments: [
      {
        filename: `invoice_${bookingIdShort}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  try {
    // Send all emails
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(salesMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);
    console.log(`[emailService] Invoice emails sent successfully for booking ${bookingIdShort}`);
  } catch (error) {
    console.error('[emailService] Error sending invoice emails:', error);
    throw error;
  }
}
