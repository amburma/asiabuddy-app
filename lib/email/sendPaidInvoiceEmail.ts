import nodemailer from 'nodemailer';

// ==========================================
// Types (matching paid_invoices table shape)
// ==========================================
interface PaidInvoiceData {
  invoice_no: string;
  invoice_date: string;
  country: string;
  customer_name: string;
  customer_contact: string;
  customer_email?: string;
  service_type: string;
  currency: string;
  base_price: number;
  service_fee: number;
  vat_amount: number;
  total_amount: number;
  payment_method: string;
  issued_by: string;
  remarks?: string;
  details?: any;
}

interface SuccessResult {
  success: true;
}

interface FailureResult {
  success: false;
  error: string;
}

type EmailResult = SuccessResult | FailureResult;

// ==========================================
// Create Gmail SMTP transporter (same pattern as emailService.ts)
// ==========================================
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
      'X-Mailer': 'AsiaBuddy Paid Invoice System',
    },
  });
}

// ==========================================
// Send Paid Invoice Email
// ==========================================
export async function sendPaidInvoiceEmail(
  data: PaidInvoiceData,
  pdfBuffer: Buffer
): Promise<EmailResult> {
  try {
    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      return { success: false, error: 'ADMIN_EMAIL environment variable is not set' };
    }

    const formattedDate = new Date(data.invoice_date).toLocaleDateString('en-US');

    // Build service details HTML
    let serviceDetailsHtml = '';
    if (data.service_type === 'flight' && data.details?.flight) {
      const flight = data.details.flight;
      serviceDetailsHtml = `
        <p><strong>Flight Booking Details:</strong></p>
        <ul>
          <li><strong>Airline:</strong> ${flight.airline || 'N/A'}</li>
          <li><strong>Flight Number:</strong> ${flight.flightNumber || 'N/A'}</li>
          <li><strong>Departure:</strong> ${flight.departure || 'N/A'}</li>
          <li><strong>Arrival:</strong> ${flight.arrival || 'N/A'}</li>
          <li><strong>Date:</strong> ${flight.date || 'N/A'}</li>
          ${flight.passengers && flight.passengers.length > 0 ? `
          <li><strong>Passengers:</strong></li>
          ${flight.passengers.map((p: any, idx: number) => `<li>&nbsp;&nbsp;${idx + 1}. ${p.name}${p.passport ? ` (${p.passport})` : ''}</li>`).join('')}
          ` : ''}
        </ul>
      `;
    } else if (data.service_type === 'hotel' && data.details?.hotel) {
      const hotel = data.details.hotel;
      serviceDetailsHtml = `
        <p><strong>Hotel Booking Details:</strong></p>
        <ul>
          <li><strong>Hotel Name:</strong> ${hotel.hotelName || 'N/A'}</li>
          <li><strong>Check-in:</strong> ${hotel.checkIn || 'N/A'}</li>
          <li><strong>Check-out:</strong> ${hotel.checkOut || 'N/A'}</li>
          ${hotel.guests && hotel.guests.length > 0 ? `
          <li><strong>Guests:</strong></li>
          ${hotel.guests.map((g: any, idx: number) => `<li>&nbsp;&nbsp;${idx + 1}. ${g.name}</li>`).join('')}
          ` : ''}
        </ul>
      `;
    } else if (data.service_type === 'car_rental' && data.details?.rental) {
      const rental = data.details.rental;
      const bookingTypeLabels: Record<string, string> = {
        'airport_pickup': 'Airport Pick-up (Airport → Hotel)',
        'drop_off': 'Drop-off (Hotel → Airport)',
        'full_day_tour': 'Full Day Tour',
        'half_day_tour': 'Half Day Tour',
        'package_tour': 'Package Tour',
      };
      const socialAppLabels: Record<string, string> = {
        'whatsapp': 'WhatsApp',
        'line': 'LINE',
        'wechat': 'WeChat',
        'viber': 'Viber',
      };
      
      serviceDetailsHtml = `
        <p><strong>Car Rental Details:</strong></p>
        <ul>
          <li><strong>Country:</strong> ${rental.country || 'N/A'}</li>
          <li><strong>City:</strong> ${rental.city || 'N/A'}</li>
          <li><strong>Booking Type:</strong> ${bookingTypeLabels[rental.booking_type || ''] || rental.booking_type || 'N/A'}</li>
          ${rental.flight_no ? `<li><strong>Flight No.:</strong> ${rental.flight_no}</li>` : ''}
          <li><strong>Pick-up Time:</strong> ${rental.pickup_time || 'N/A'}</li>
          <li><strong>Pick-up Place:</strong> ${rental.pickup_place || 'N/A'}</li>
          <li><strong>No. of Persons:</strong> ${rental.no_of_persons || 'N/A'}</li>
          <li><strong>Destination:</strong> ${rental.destination_place || 'N/A'}</li>
          <li><strong>Destination Address:</strong> ${rental.destination_address || 'N/A'}</li>
          <li><strong>Preferred Contact:</strong> ${socialAppLabels[rental.social_app || ''] || rental.social_app || 'N/A'}</li>
        </ul>
      `;
    } else if (data.details?.description) {
      // Generic fallback for tour, airport_transfer, tickets_activities, or any other service type
      serviceDetailsHtml = `
        <p><strong>Service Details:</strong></p>
        <p>${data.details.description}</p>
      `;
    }

    // Build email HTML body
    const htmlBody = `
      <p>Dear ${data.customer_name},</p>
      <p>Thank you for your payment. Your invoice has been generated and is attached to this email.</p>
      <p><strong>Invoice Details:</strong></p>
      <ul>
        <li><strong>Invoice No:</strong> ${data.invoice_no}</li>
        <li><strong>Date:</strong> ${formattedDate}</li>
        <li><strong>Country:</strong> ${data.country}</li>
        <li><strong>Service Type:</strong> ${data.service_type}</li>
        <li><strong>Currency:</strong> ${data.currency}</li>
        <li><strong>Base Price:</strong> ${data.currency} ${data.base_price.toFixed(2)}</li>
        <li><strong>Service Fee:</strong> ${data.currency} ${data.service_fee.toFixed(2)}</li>
        ${data.vat_amount > 0 ? `<li><strong>VAT:</strong> ${data.currency} ${data.vat_amount.toFixed(2)}</li>` : ''}
        <li><strong>Total Amount:</strong> ${data.currency} ${data.total_amount.toFixed(2)}</li>
        <li><strong>Payment Method:</strong> ${data.payment_method}</li>
      </ul>
      ${serviceDetailsHtml}
      ${data.remarks ? `<p><strong>Remarks:</strong> ${data.remarks}</p>` : ''}
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>AsiaBuddy Team</p>
    `;

    // Build service details text
    let serviceDetailsText = '';
    if (data.service_type === 'flight' && data.details?.flight) {
      const flight = data.details.flight;
      serviceDetailsText = `
Flight Booking Details:
- Airline: ${flight.airline || 'N/A'}
- Flight Number: ${flight.flightNumber || 'N/A'}
- Departure: ${flight.departure || 'N/A'}
- Arrival: ${flight.arrival || 'N/A'}
- Date: ${flight.date || 'N/A'}
${flight.passengers && flight.passengers.length > 0 ? flight.passengers.map((p: any, idx: number) => `- Passenger ${idx + 1}: ${p.name}${p.passport ? ` (${p.passport})` : ''}`).join('\n') : ''}
      `;
    } else if (data.service_type === 'hotel' && data.details?.hotel) {
      const hotel = data.details.hotel;
      serviceDetailsText = `
Hotel Booking Details:
- Hotel Name: ${hotel.hotelName || 'N/A'}
- Check-in: ${hotel.checkIn || 'N/A'}
- Check-out: ${hotel.checkOut || 'N/A'}
${hotel.guests && hotel.guests.length > 0 ? hotel.guests.map((g: any, idx: number) => `- Guest ${idx + 1}: ${g.name}`).join('\n') : ''}
      `;
    } else if (data.service_type === 'car_rental' && data.details?.rental) {
      const rental = data.details.rental;
      const bookingTypeLabels: Record<string, string> = {
        'airport_pickup': 'Airport Pick-up (Airport → Hotel)',
        'drop_off': 'Drop-off (Hotel → Airport)',
        'full_day_tour': 'Full Day Tour',
        'half_day_tour': 'Half Day Tour',
        'package_tour': 'Package Tour',
      };
      const socialAppLabels: Record<string, string> = {
        'whatsapp': 'WhatsApp',
        'line': 'LINE',
        'wechat': 'WeChat',
        'viber': 'Viber',
      };
      serviceDetailsText = `
Car Rental Details:
- Country: ${rental.country || 'N/A'}
- City: ${rental.city || 'N/A'}
- Booking Type: ${bookingTypeLabels[rental.booking_type || ''] || rental.booking_type || 'N/A'}
${rental.flight_no ? `- Flight No.: ${rental.flight_no}` : ''}
- Pick-up Time: ${rental.pickup_time || 'N/A'}
- Pick-up Place: ${rental.pickup_place || 'N/A'}
- No. of Persons: ${rental.no_of_persons || 'N/A'}
- Destination: ${rental.destination_place || 'N/A'}
- Destination Address: ${rental.destination_address || 'N/A'}
- Preferred Contact: ${socialAppLabels[rental.social_app || ''] || rental.social_app || 'N/A'}`;
    } else if (data.details?.description) {
      // Generic fallback for tour, airport_transfer, tickets_activities, or any other service type
      serviceDetailsText = `
Service Details:
${data.details.description}`;
    }

    const textBody = `
Dear ${data.customer_name},

Thank you for your payment. Your invoice has been generated and is attached to this email.

Invoice Details:
- Invoice No: ${data.invoice_no}
- Date: ${formattedDate}
- Country: ${data.country}
- Service Type: ${data.service_type}
- Currency: ${data.currency}
- Base Price: ${data.currency} ${data.base_price.toFixed(2)}
- Service Fee: ${data.currency} ${data.service_fee.toFixed(2)}
${data.vat_amount > 0 ? `- VAT: ${data.currency} ${data.vat_amount.toFixed(2)}` : ''}
- Total Amount: ${data.currency} ${data.total_amount.toFixed(2)}
- Payment Method: ${data.payment_method}
${data.remarks ? `- Remarks: ${data.remarks}` : ''}
${serviceDetailsText}

If you have any questions, please don't hesitate to contact us.

Best regards,
AsiaBuddy Team
    `;

    const attachment = {
      filename: `${data.invoice_no}.pdf`,
      content: pdfBuffer,
    };

    const mailOptionsBase = {
      from: `"AsiaBuddy Invoices" <${process.env.GMAIL_USER}>`,
      replyTo: process.env.GMAIL_USER,
      attachments: [attachment],
    };

    // Send emails based on customer email availability
    if (data.customer_email) {
      // Send to customer and admin
      const customerSubject = `Invoice ${data.invoice_no} - AsiaBuddy`;
      const adminSubject = `[Admin Copy] Invoice ${data.invoice_no} - ${data.customer_name}`;

      await Promise.all([
        transporter.sendMail({
          ...mailOptionsBase,
          to: data.customer_email,
          subject: customerSubject,
          text: textBody,
          html: htmlBody,
        }),
        transporter.sendMail({
          ...mailOptionsBase,
          to: adminEmail,
          subject: adminSubject,
          text: `[Admin Copy]\n\n${textBody}\n\nCustomer Email: ${data.customer_email}`,
          html: `<p><strong>[Admin Copy]</strong></p>${htmlBody}<p><strong>Customer Email:</strong> ${data.customer_email}</p>`,
        }),
      ]);
    } else {
      // Send to admin only with warning prefix
      const adminSubject = `⚠️ No Customer Email — Contact Manually - Invoice ${data.invoice_no} - ${data.customer_name}`;

      await transporter.sendMail({
        ...mailOptionsBase,
        to: adminEmail,
        subject: adminSubject,
        text: `[WARNING: No customer email provided. Please contact customer manually.]\n\nCustomer Contact: ${data.customer_contact}\n\n${textBody}`,
        html: `<p style="color: red;"><strong>⚠️ WARNING: No customer email provided. Please contact customer manually.</strong></p><p><strong>Customer Contact:</strong> ${data.customer_contact}</p>${htmlBody}`,
      });
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending paid invoice email:', error);
    return { success: false, error: errorMessage };
  }
}
