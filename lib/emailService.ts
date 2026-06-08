import nodemailer from 'nodemailer';

interface SendInvoiceEmailParams {
  customerEmail: string;
  salesEmail: string;
  adminEmail: string;
  bookingId: string;
  pdfBuffer: Buffer;
  customerName?: string;
  chatSummary?: string;
  customerLanguage?: string;
}


// Helper function to format chat summary with proper styling
function formatChatSummary(chatSummary: string): string {
  const lines = chatSummary.split('\n').filter(line => line.trim());
  return lines.map(line => {
    if (line.startsWith('AsiaBuddy:')) {
      return `<p style="font-weight: bold; margin: 8px 0;">${line}</p>`;
    } else if (line.startsWith('Customer:')) {
      return `<p style="font-weight: normal; margin: 8px 0;">${line}</p>`;
    } else {
      return `<p style="margin: 8px 0;">${line}</p>`;
    }
  }).join('');
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
    headers: {
      'X-Priority': '3',
      'X-Mailer': 'AsiaBuddy Booking System',
    },
  });
}

export async function sendInvoiceEmail(params: SendInvoiceEmailParams): Promise<void> {
  const { customerEmail, salesEmail, adminEmail, bookingId, pdfBuffer, customerName, chatSummary, customerLanguage } = params;
  const transporter = createTransporter();
  const bookingIdShort = bookingId.slice(-8);

  // Language detection from booking data
  const lang = customerLanguage?.toLowerCase() || 'en';
  const isEnglish = lang === 'en';

  // Email to customer - bilingual subject
  const subjectTranslations: Record<string, string> = {
    th: `ใบแจ้งหนี้ของคุณ / Your Invoice - AsiaBuddy Booking #${bookingIdShort}`,
    mm: `သင့်ပြေစာ / Your Invoice - AsiaBuddy Booking #${bookingIdShort}`,
    es: `Su Factura / Your Invoice - AsiaBuddy Booking #${bookingIdShort}`,
    fr: `Votre Facture / Your Invoice - AsiaBuddy Booking #${bookingIdShort}`,
    de: `Ihre Rechnung / Your Invoice - AsiaBuddy Booking #${bookingIdShort}`,
    en: `Your AsiaBuddy Invoice - Booking #${bookingIdShort}`,
  };
  const customerSubject = subjectTranslations[lang] || subjectTranslations.en;
  
  let customerHtmlBody = '';

  // Bilingual greeting translations
  const greetingTranslations: Record<string, { native: string; english: string }> = {
    th: { native: 'สวัสดีครับ/ค่ะ', english: 'Hello' },
    mm: { native: 'မင်္ဂလာပါ', english: 'Hello' },
    es: { native: 'Hola', english: 'Hello' },
    fr: { native: 'Bonjour', english: 'Hello' },
    de: { native: 'Hallo', english: 'Hello' },
    en: { native: 'Hello', english: 'Hello' },
  };
  const greeting = greetingTranslations[lang] || greetingTranslations.en;

  if (isEnglish) {
    // English only for English customers
    customerHtmlBody += `
      <p>Dear ${customerName || 'Customer'},</p>
      <p>Thank you for choosing AsiaBuddy.</p>
      <p>Your booking has been confirmed. Please find your invoice attached.</p>
      <p><strong>Booking ID:</strong> ${bookingIdShort}<br>
      <strong>Invoice #:</strong> INV-${bookingIdShort}</p>
    `;
  } else {
    // Bilingual content for non-English customers
    customerHtmlBody += `
      <p>${greeting.native} ${customerName || 'Customer'} / ${greeting.english} ${customerName || 'Customer'},</p>
      <p>Thank you for choosing AsiaBuddy.</p>
      <p>Your booking has been confirmed. Please find your invoice attached.</p>
      <p><strong>Booking ID:</strong> ${bookingIdShort}<br>
      <strong>Invoice #:</strong> INV-${bookingIdShort}</p>
    `;
  }

  // Add Chat Summary section if available
  if (chatSummary) {
    customerHtmlBody += `
      <hr style="margin: 20px 0;">
      <p><strong>Chat Summary:</strong></p>
      <div style="font-family: monospace; font-size: 14px; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
        ${formatChatSummary(chatSummary)}
      </div>
    `;
  }

  if (isEnglish) {
    customerHtmlBody += `
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>AsiaBuddy Team</p>
    `;
  } else {
    customerHtmlBody += `
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>AsiaBuddy Team</p>
    `;
  }

  const customerMailOptions = {
    from: `"AsiaBuddy Bookings" <${process.env.GMAIL_USER}>`,
    replyTo: process.env.SALES_EMAIL || process.env.GMAIL_USER,
    to: customerEmail,
    subject: customerSubject,
    text: isEnglish
      ? `Dear ${customerName || 'Customer'},\n\nThank you for choosing AsiaBuddy.\n\nYour booking has been confirmed. Please find your invoice attached.\n\nBooking ID: ${bookingIdShort}\nInvoice #: INV-${bookingIdShort}\n\n${chatSummary ? `Chat Summary:\n${chatSummary}\n\n` : ''}If you have any questions, please don't hesitate to contact us.\n\nBest regards,\nAsiaBuddy Team`
      : `${greeting.native} ${customerName || 'Customer'} / ${greeting.english} ${customerName || 'Customer'}\n\nThank you for choosing AsiaBuddy.\n\nYour booking has been confirmed. Please find your invoice attached.\n\nBooking ID: ${bookingIdShort}\nInvoice #: INV-${bookingIdShort}\n\n${chatSummary ? `Chat Summary:\n${chatSummary}\n\n` : ''}If you have any questions, please don't hesitate to contact us.\n\nBest regards,\nAsiaBuddy Team`,
    html: customerHtmlBody,
    attachments: [
      {
        filename: `invoice_${bookingIdShort}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  // Email to sales (copy)
  const salesSubject = `[Sales Copy] Invoice INV-${bookingIdShort} - ${customerName || 'Customer'}`;
  
  const salesHtmlBody = `
    <p>Sales Team,</p>
    <p>A new booking has been confirmed.</p>
    <p><strong>Customer:</strong> ${customerName || 'N/A'}<br>
    <strong>Email:</strong> ${customerEmail}<br>
    <strong>Booking ID:</strong> ${bookingIdShort}<br>
    <strong>Invoice #:</strong> INV-${bookingIdShort}</p>
    <p>Please find the invoice attached for your records.</p>
    <p>AsiaBuddy System</p>
  `;

  const salesMailOptions = {
    from: `"AsiaBuddy Bookings" <${process.env.GMAIL_USER}>`,
    replyTo: process.env.SALES_EMAIL || process.env.GMAIL_USER,
    to: salesEmail,
    subject: salesSubject,
    text: `Sales Team,\n\nA new booking has been confirmed.\n\nCustomer: ${customerName || 'N/A'}\nEmail: ${customerEmail}\nBooking ID: ${bookingIdShort}\nInvoice #: INV-${bookingIdShort}\n\nPlease find the invoice attached for your records.\n\nAsiaBuddy System`,
    html: salesHtmlBody,
    attachments: [
      {
        filename: `invoice_${bookingIdShort}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  // Email to admin (copy)
  const adminSubject = `[Admin Copy] Invoice INV-${bookingIdShort} - ${customerName || 'Customer'}`;
  
  const adminHtmlBody = `
    <p>Admin,</p>
    <p>A new booking has been confirmed.</p>
    <p><strong>Customer:</strong> ${customerName || 'N/A'}<br>
    <strong>Email:</strong> ${customerEmail}<br>
    <strong>Booking ID:</strong> ${bookingIdShort}<br>
    <strong>Invoice #:</strong> INV-${bookingIdShort}</p>
    <p>Please find the invoice attached for your records.</p>
    <p>AsiaBuddy System</p>
  `;

  const adminMailOptions = {
    from: `"AsiaBuddy Bookings" <${process.env.GMAIL_USER}>`,
    replyTo: process.env.SALES_EMAIL || process.env.GMAIL_USER,
    to: adminEmail,
    subject: adminSubject,
    text: `Admin,\n\nA new booking has been confirmed.\n\nCustomer: ${customerName || 'N/A'}\nEmail: ${customerEmail}\nBooking ID: ${bookingIdShort}\nInvoice #: INV-${bookingIdShort}\n\nPlease find the invoice attached for your records.\n\nAsiaBuddy System`,
    html: adminHtmlBody,
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
