import { NextRequest, NextResponse } from 'next/server';

// POST /api/inquiry
// Receives web inquiry form data and forwards a formatted alert
// to the Telegram Operator Group using OPERATOR_BOT_TOKEN + GROUP_CHAT_ID.
export async function POST(req: NextRequest) {
  // ── 1. Parse body ──────────────────────────────────────────────────────────
  let body: {
    name: string;
    phone: string;
    email?: string;
    socials: string[];
    services: string[];
    otherService?: string;
    qa: { question: string; answer: string }[];
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, phone, email, socials, services, otherService, qa } = body;

  // Basic validation
  if (!name || !phone || !services?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 });
  }

  // ── 2. Build Telegram message ──────────────────────────────────────────────
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
    `\n\n━━━━━━━━━━━━━━━━━━\n` +
    `⏰ Received at: ${new Date().toUTCString()}\n` +
    `🌐 Source: AsiaBuddy Web Inquiry (No Telegram)`;

  // ── 3. Send to Telegram Operator Group ────────────────────────────────────
  const BOT_TOKEN = process.env.OPERATOR_BOT_TOKEN;
  const CHAT_ID   = process.env.GROUP_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('[inquiry] Missing OPERATOR_BOT_TOKEN or GROUP_CHAT_ID env vars');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  // Return 200 to client immediately (Vercel serverless timeout safety)
  // Then fire the Telegram request in the background.
  const telegramPayload = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
    // Inline button: quick reply link back to the customer if they have Telegram
    reply_markup: {
      inline_keyboard: [
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

  return NextResponse.json({ ok: true }, { status: 200 });
}
