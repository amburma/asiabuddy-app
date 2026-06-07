import nodemailer from 'nodemailer';

interface SendInvoiceEmailParams {
  customerEmail: string;
  salesEmail: string;
  adminEmail: string;
  bookingId: string;
  pdfBuffer: Buffer;
  customerName?: string;
  customerLanguage?: string;
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
  const { customerEmail, salesEmail, adminEmail, bookingId, pdfBuffer, customerName, customerLanguage = 'en' } = params;
  const transporter = createTransporter();
  const bookingIdShort = bookingId.slice(-8);

  // Email to customer
  const isThai = customerLanguage === 'th';
  const customerSubject = isThai 
    ? `ใบแจ้งหนี้ของคุณจาก AsiaBuddy / Your Invoice from AsiaBuddy (INV-${bookingIdShort})`
    : `Invoice for your AsiaBuddy booking (INV-${bookingIdShort})`;
  
  const customerHtmlBody = isThai
    ? `
      <p>เรียนคุณ ${customerName || 'ลูกค้า'}</p>
      <p>กรุณาดูใบแจ้งหนี้ที่แนบมาสำหรับการจองของคุณ</p>
      <p>ขอบคุณที่เลือกใช้บริการ AsiaBuddy</p>
      <p><strong>รหัสการจอง:</strong> ${bookingIdShort}<br>
      <strong>เลขที่ใบแจ้งหนี้:</strong> INV-${bookingIdShort}</p>
      <hr style="margin: 20px 0;">
      <p>Dear ${customerName || 'Customer'}</p>
      <p>Please find your invoice attached for your booking.</p>
      <p>Thank you for choosing AsiaBuddy.</p>
      <p><strong>Booking ID:</strong> ${bookingIdShort}<br>
      <strong>Invoice #:</strong> INV-${bookingIdShort}</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>AsiaBuddy Team</p>
    `
    : `
      <p>Dear ${customerName || 'Customer'},</p>
      <p>Thank you for choosing AsiaBuddy.</p>
      <p>Your booking has been confirmed. Please find your invoice attached.</p>
      <p><strong>Booking ID:</strong> ${bookingIdShort}<br>
      <strong>Invoice #:</strong> INV-${bookingIdShort}</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>AsiaBuddy Team</p>
    `;

  const customerMailOptions = {
    from: `"AsiaBuddy Bookings" <${process.env.GMAIL_USER}>`,
    replyTo: process.env.SALES_EMAIL || process.env.GMAIL_USER,
    to: customerEmail,
    subject: customerSubject,
    text: `Dear ${customerName || 'Customer'},\n\nThank you for choosing AsiaBuddy.\n\nYour booking has been confirmed. Please find your invoice attached.\n\nBooking ID: ${bookingIdShort}\nInvoice #: INV-${bookingIdShort}\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nAsiaBuddy Team`,
    html: customerHtmlBody,
    attachments: [
      {
        filename: `invoice_${bookingIdShort}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  // Email to sales (copy)
  const salesSubject = isThai
    ? `[Sales Copy] Invoice INV-${bookingIdShort} - ${customerName || 'Customer'} (Customer Language: ${customerLanguage})`
    : `[Sales Copy] Invoice INV-${bookingIdShort} - ${customerName || 'Customer'}`;
  
  const salesHtmlBody = isThai
    ? `
      <p><strong>Customer Language:</strong> ${customerLanguage}</p>
      <hr style="margin: 20px 0;">
      <p>ทีมงานฝ่ายขาย</p>
      <p>มีการจองใหม่ได้รับการยืนยันแล้ว</p>
      <p><strong>ลูกค้า:</strong> ${customerName || 'N/A'}<br>
      <strong>อีเมล:</strong> ${customerEmail}<br>
      <strong>รหัสการจอง:</strong> ${bookingIdShort}<br>
      <strong>เลขที่ใบแจ้งหนี้:</strong> INV-${bookingIdShort}</p>
      <p>กรุณาตรวจสอบใบแจ้งหนี้ที่แนบมาเพื่อบันทึกของท่าน</p>
      <hr style="margin: 20px 0;">
      <p>Sales Team,</p>
      <p>A new booking has been confirmed.</p>
      <p><strong>Customer:</strong> ${customerName || 'N/A'}<br>
      <strong>Email:</strong> ${customerEmail}<br>
      <strong>Booking ID:</strong> ${bookingIdShort}<br>
      <strong>Invoice #:</strong> INV-${bookingIdShort}</p>
      <p>Please find the invoice attached for your records.</p>
      <p>AsiaBuddy System</p>
    `
    : `
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
  const adminSubject = isThai
    ? `[Admin Copy] Invoice INV-${bookingIdShort} - ${customerName || 'Customer'} (Customer Language: ${customerLanguage})`
    : `[Admin Copy] Invoice INV-${bookingIdShort} - ${customerName || 'Customer'}`;
  
  const adminHtmlBody = isThai
    ? `
      <p><strong>Customer Language:</strong> ${customerLanguage}</p>
      <hr style="margin: 20px 0;">
      <p>ผู้ดูแลระบบ</p>
      <p>มีการจองใหม่ได้รับการยืนยันแล้ว</p>
      <p><strong>ลูกค้า:</strong> ${customerName || 'N/A'}<br>
      <strong>อีเมล:</strong> ${customerEmail}<br>
      <strong>รหัสการจอง:</strong> ${bookingIdShort}<br>
      <strong>เลขที่ใบแจ้งหนี้:</strong> INV-${bookingIdShort}</p>
      <p>กรุณาตรวจสอบใบแจ้งหนี้ที่แนบมาเพื่อบันทึกของท่าน</p>
      <hr style="margin: 20px 0;">
      <p>Admin,</p>
      <p>A new booking has been confirmed.</p>
      <p><strong>Customer:</strong> ${customerName || 'N/A'}<br>
      <strong>Email:</strong> ${customerEmail}<br>
      <strong>Booking ID:</strong> ${bookingIdShort}<br>
      <strong>Invoice #:</strong> INV-${bookingIdShort}</p>
      <p>Please find the invoice attached for your records.</p>
      <p>AsiaBuddy System</p>
    `
    : `
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
