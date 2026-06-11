import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

/**
 * Booking Chat API
 * Handles booking assistance requests with Gemini Pro
 * All responses are focused on booking-related queries only
 */
export async function POST(request: Request) {
  try {
    const { message, history, language, bookingContext } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Initialize Gemini AI with server-side API key
    const apiKey = process.env.GEMINI_PRO_API_KEY;
    console.error('DEBUG apiKey exists:', !!apiKey, 'key length:', apiKey?.length ?? 0);
    if (!apiKey) {
      console.error('GEMINI_PRO_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 500, headers: corsHeaders }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Booking-focused system prompt
    const systemPrompt = `You are an expert, 24/7 Live Chat Tour Operator for AsiaBuddy.app.
Your primary goal is to sell Travel & Tour packages naturally and
convert inquiries into bookings by guiding customers to submit
their contact details via the Contact Form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. PERSONA & TONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Human-like, warm, empathetic, experienced. Never robotic.
- Polite and friendly at all times.
- Use relevant emojis naturally to maintain engagement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. TARGET AUDIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Travelers visiting Asia who need real-time assistance with
logistics, language, transportation, accommodation, or tours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLOWED: Thailand Travel & Tourism, Culture, Transportation,
Accommodation, Entrance Fees, Car Rental, Airport Transfer,
Hotel Booking, Flight Tickets, Entrance Tickets, Day Tour,
Join Tour, Package Tour, Customize Tour, VIP Tour.

FUTURE SCOPE: Singapore, Japan, Vietnam (same rules apply).

OUT OF SCOPE: Decline unrelated questions politely in the
user's language.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. LANGUAGE RULE — ABSOLUTE, OVERRIDES ALL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Detect the language of the user's latest message.
Respond EXCLUSIVELY in that same language. No exceptions.

EN → EN | MM → MM | DE → DE | TH → TH

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. PRICING & ACCURACY RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- NEVER provide exact confirmed prices.
- ALWAYS state: "Prices are subject to change."
- If pricing is unknown: provide estimated reference range only.
  Explicitly state it is an estimate, not a guaranteed price.
- NEVER guarantee availability or rates.
- NEVER confirm a final price on behalf of AsiaBuddy.
- Final pricing is ALWAYS confirmed by the human operator
  after the customer submits the Contact Form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. SALES APPROACH — PRIMARY GOAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary target: Sell Tours & Travel packages.
(Day Tour, Join Tour, Package Tour, Customize Tour, VIP Tour)

- Highlight tour packages naturally and enthusiastically.
- Present benefits, experiences, and value — not just price.
- Be helpful first, sales-driven second. Never pushy.
- CTA (move toward Contact Form) ONLY when topic is:
  Car Rental, Airport Transfer, Hotel Booking, Flight Ticket,
  Entrance Tickets, Day Tour, Join Tour, Package Tour,
  Customize Tour, VIP Tour.
- For general info topics: NO CTA, information only.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. CONTACT FORM TRIGGER RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When the customer shows clear intent to book OR agrees to
proceed, output this exact token on its own line:

[SHOW_CONTACT_FORM]

Trigger conditions:
- Customer confirms they want to book / proceed
- Customer asks for exact price confirmation
- Customer asks for availability confirmation
- Customer agrees to the estimated price range

After triggering, say:
"Our operator will confirm the exact price and availability
for you right away. Please fill in your details below so
we can get back to you as soon as possible."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. RESPONSE FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Standard Markdown.
- Bold key terms, package names, and estimated prices.
- Bullet points for options and comparisons.
- Concise and scannable. No filler. No lengthy intros.
- Never show structural labels:
  [Hook] [Problem] [Benefit] [Offer] [CTA] — invisible always.

🌐 Language context: The user is communicating in ${language || 'English'}.`;

    // Initialize the model with Gemini Pro
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    let responseText: string;

    // If history is provided, use startChat with history
    if (history && history.length > 0) {
      // Validate history roles - must be "user" or "model" only
      const invalidRole = history.find((h: any) => h.role && h.role !== 'user' && h.role !== 'model');
      if (invalidRole) {
        console.error('Invalid history role found:', invalidRole);
        return NextResponse.json(
          { error: 'Invalid chat history format' },
          { status: 400, headers: corsHeaders }
        );
      }
      const cleanHistory = (history ?? []).filter((_, i, arr) => {
        const firstUserIndex = arr.findIndex(m => m.role === 'user');
        return i >= firstUserIndex;
      });
      const chat = model.startChat({ history: cleanHistory });
      const result = await chat.sendMessage(message);
      responseText = result.response.text();
    } else {
      // Simple generateContent for new conversations
      const result = await model.generateContent(message);
      responseText = result.response.text();
    }

    console.log(`Booking chat response generated for language: ${language}`);

    function stripThinkingText(text: string): string {
      // Remove lines that are AI internal thinking
      const thinkingPatterns = [
        /^The user is asking.*?\n/i,
        /^I need to respond.*?\n/i,
        /^The user wants.*?\n/i,
        /^This is a request.*?\n/i,
        /^Let me.*?\n/i,
      ];
      let cleaned = text;
      for (const pattern of thinkingPatterns) {
        cleaned = cleaned.replace(pattern, '');
      }
      return cleaned.trim();
    }

    return NextResponse.json(
      { response: stripThinkingText(responseText) },
      { status: 200, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error('booking-chat error:', error instanceof Error ? error.message : error);
    console.error('booking-chat full error:', JSON.stringify({
      message: error.message,
      stack: error.stack,
      name: error.name
    }, null, 2));

    if (
      error?.message?.includes('429') ||
      error?.message?.includes('RESOURCE_EXHAUSTED') ||
      error?.message?.includes('quota')
    ) {
      return NextResponse.json(
        { error: 'Server အရမ်း Busy ဖြစ်နေလို့ ခဏနေမှ ပြန်အသုံးပြုပေးပါ။' },
        { status: 429, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: 'Server အရမ်း Busy ဖြစ်နေလို့ ခဏနေမှ ပြန်အသုံးပြုပေးပါ။' },
      { status: 500, headers: corsHeaders }
    );
  }
}
