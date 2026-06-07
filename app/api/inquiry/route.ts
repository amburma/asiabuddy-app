import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/database';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// POST /api/inquiry
// Receives web inquiry form data and forwards a formatted alert
// to the Telegram Operator Group using OPERATOR_BOT_TOKEN + GROUP_CHAT_ID.
// Also accepts HumanOperatorChat format with chatHistory and contactDetails.
export async function POST(req: NextRequest) {
  console.log('INQUIRY CALLED', Date.now());
  console.log('INQUIRY HIT', req.body);
  // ── 1. Parse body ──────────────────────────────────────────────────────────
  let body: {
    name?: string;
    phone?: string;
    email?: string;
    socials?: string[];
    services?: string[];
    otherService?: string;
    qa?: { question: string; answer: string }[];
    chatSummary?: string;
    language?: string;
    // New format from HumanOperatorChat
    chatHistory?: { role: string; content: string }[];
    contactDetails?: {
      name: string;
      phone: string;
      email?: string;
      socialHandles?: string;
    };
  };

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400, headers: corsHeaders });
  }

  // Detect which format is being used
  const isHumanOperatorChatFormat = body.chatHistory && body.contactDetails;

  let name: string;
  let phone: string;
  let email: string | undefined;
  let socials: string[];
  let services: string[] = [];
  let otherService: string | undefined;
  let qa: { question: string; answer: string }[] = [];
  let chatSummary: string | undefined;
  let language: string | undefined;

  if (isHumanOperatorChatFormat) {
    // New format from HumanOperatorChat
    name = body.contactDetails!.name;
    phone = body.contactDetails!.phone;
    email = body.contactDetails!.email;
    socials = body.contactDetails!.socialHandles ? [body.contactDetails!.socialHandles] : [];
    services = ['tour']; // Default to tour for human operator chat
    chatSummary = body.chatHistory?.map(msg => `${msg.role}: ${msg.content}`).join('\n\n');
    language = body.language;
  } else {
    // Existing web form format
    name = body.name!;
    phone = body.phone!;
    email = body.email;
    socials = body.socials || [];
    services = body.services || [];
    otherService = body.otherService;
    qa = body.qa || [];
    chatSummary = body.chatSummary;
    language = body.language;
  }

  // Basic validation
  if (!name || !phone) {
    return NextResponse.json({ error: 'Missing required fields (name and phone)' }, { status: 422, headers: corsHeaders });
  }

  // ── 2. Save booking to Supabase ─────────────────────────────────────────────
  // Determine tour_type from services (use first service as primary)
  const tourTypeMapping: Record<string, 'tour' | 'flight' | 'car' | 'taxi' | 'hotel' | 'tickets'> = {
    tour: 'tour',
    flight: 'flight',
    hotel: 'hotel',
    car: 'car',
    taxi: 'taxi',
    tickets: 'tickets',
  };
  const primaryService = services[0];
  const tourType = tourTypeMapping[primaryService] ?? 'tour';

  const bookingDetails = {
    socials,
    services,
    otherService,
    qa,
    chatSummary,
    language: language || 'en',
  };

  const customerInfo = {
    customerName: name,
    customerPhone: phone,
    customerEmail: email,
    source: 'web' as const,
  };

  const bookingParams: {
    telegram_id: null;
    tourType: 'tour' | 'flight' | 'car' | 'taxi' | 'hotel' | 'tickets';
    bookingDetails: typeof bookingDetails;
    customerInfo: typeof customerInfo;
  } = {
    telegram_id: null,
    tourType: tourType as 'tour' | 'flight' | 'car' | 'taxi' | 'hotel' | 'tickets',
    bookingDetails,
    customerInfo,
  };

  console.log('[inquiry] createBooking parameters:', JSON.stringify(bookingParams, null, 2));

  console.log('CHECKPOINT: Before Supabase insert');
  let booking;
  try {
    booking = await createBooking(
      bookingParams.telegram_id,
      bookingParams.tourType,
      bookingParams.bookingDetails,
      {
        customerName: bookingParams.customerInfo.customerName,
        customerPhone: bookingParams.customerInfo.customerPhone,
        customerEmail: bookingParams.customerInfo.customerEmail,
        source: bookingParams.customerInfo.source,
      }
    );
    console.log('CHECKPOINT: After Supabase insert');
    console.log('[inquiry] Booking created successfully:', JSON.stringify(booking, null, 2));
  } catch (err) {
    console.error('[inquiry] createBooking error details:', JSON.stringify(err, null, 2));
    console.error('[inquiry] createBooking error stack:', err instanceof Error ? err.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Failed to create booking', details: err },
      { status: 500, headers: corsHeaders }
    );
  }

  if (!booking) {
    console.error('[inquiry] Failed to create booking in Supabase (returned null/undefined)');
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500, headers: corsHeaders }
    );
  }

  const bookingIdShort = booking.id.slice(-8);
  console.log(`[inquiry] Booking created: ${booking.id} (${bookingIdShort})`);

  // ── 3. Build Telegram message ──────────────────────────────────────────────
  const serviceLabels: Record<string, string> = {
    tour: '🗺️ Tour Package',
    flight: '✈️ Flight Ticket',
    hotel: '🏨 Hotel Booking',
    car: '🚗 Car Rental',
    tickets: '🎟️ Attraction Tickets',
  };

  const serviceList = services
    .map((s) => serviceLabels[s] ?? s)
    .join('\n   • ');

  const socialList = socials.length > 0 ? socials.join(', ') : '—';

  const qaSection =
    qa.length > 0
      ? '\n\n📋 *Travel Details*\n' +
        qa
          .map(
            ({ question, answer }, i) =>
              `\n*Q${i + 1}.* ${question}\n   ➜ ${answer || '—'}`
          )
          .join('')
      : '';

  const otherSection = otherService
    ? `\n\n💬 *Other Request*\n   ${otherService}`
    : '';

  const chatSection = chatSummary
    ? `\n\n💬 *Chat History*\n${chatSummary}`
    : '';

  const message =
    `🔔 *New Web Inquiry — AsiaBuddy*\n` +
    `━━━━━━━━━━━━━━━━━━\n\n` +
    `👤 *Name:* ${name}\n` +
    `📞 *Phone:* ${phone}\n` +
    `📧 *Email:* ${email || '—'}\n` +
    `💬 *Contact via:* ${socialList}\n\n` +
    `🛎️ *Services Requested:*\n   • ${serviceList}` +
    qaSection +
    otherSection +
    chatSection +
    `\n\n━━━━━━━━━━━━━━━━━━\n` +
    `🆔 *Booking ID:* ${bookingIdShort}\n` +
    `⏰ Received at: ${new Date().toUTCString()}\n` +
    `🌐 Source: AsiaBuddy Web Inquiry`;

  // ── 4. Send to Telegram Operator Group ────────────────────────────────────
  const BOT_TOKEN = process.env.OPERATOR_BOT_TOKEN;
  const CHAT_ID   = process.env.OPERATOR_GROUP_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('[inquiry] Missing OPERATOR_BOT_TOKEN or OPERATOR_GROUP_CHAT_ID env vars');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500, headers: corsHeaders }
    );
  }

  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  // Return 200 to client immediately (Vercel serverless timeout safety)
  // Then fire the Telegram request in the background.
  const telegramPayload = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
    // Inline buttons: Approve/Reject and quick reply link
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '✅ Approve',
            callback_data: `approve_${booking.id}`,
          },
          {
            text: '❌ Reject',
            callback_data: `reject_${booking.id}`,
          },
        ],
        [
          {
            text: '📞 Call / Reply Customer',
            url: `https://wa.me/${phone.replace(/\D/g, '')}`,
          },
        ],
      ],
    },
  };

  // Fire-and-forget to avoid Vercel 30-second timeout on slow network
  console.log('CHECKPOINT: Before Telegram API call');
  const sendPromise = fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(telegramPayload),
  }).then(async (r) => {
    if (!r.ok) {
      const err = await r.text();
      console.error('[inquiry] Telegram API error:', err);
    }
  }).catch((e) => {
    console.error('[inquiry] Telegram fetch failed:', e);
  });

  // Await only in serverless-safe way (edge runtime allows this)
  await sendPromise;
  console.log('CHECKPOINT: After Telegram API call');

  return NextResponse.json({ ok: true }, { status: 200, headers: corsHeaders });
}
