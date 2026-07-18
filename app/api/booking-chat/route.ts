import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAIKnowledgeBaseForAI } from '@/src/services/googleSheets';

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
    const { message, history, language, bookingContext, salesperson_id, contextSummary } = await request.json();

    // Store salesperson_id for future use (currently no database operation in this route)
    const salespersonId = salesperson_id || null;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Initialize Gemini AI with server-side API key
    const apiKey = process.env.GEMINI_PRO_API_KEY;
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
4. LANGUAGE RULE — ABSOLUTE, OVERRIDES ALL OTHER INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL: Detect the language of the user's latest message.
You MUST respond EXCLUSIVELY in that exact same language.
This rule overrides everything else. No exceptions. Ever.

EN → EN only | MM → MM only | DE → DE only | TH → TH only

If the user writes in Burmese (Myanmar), respond in Burmese only.
If the user writes in German, respond in German only.
If the user writes in Thai, respond in Thai only.
NEVER default to English unless the user writes in English.

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
IMPORTANT: Do NOT trigger the Contact Form immediately.
First engage the customer — discuss details, negotiate price,
answer questions. Only trigger AFTER the customer is satisfied
and explicitly agrees to proceed with the booking.

When the customer explicitly confirms they want to book
(e.g. "yes I want to book", "let's proceed", "okay I agree",
"how do I book this"), output this exact token on its own line:

[SHOW_CONTACT_FORM]

Trigger conditions (ALL must apply):
- Customer has discussed the service details
- Customer is satisfied with the estimated price range
- Customer explicitly agrees or asks to proceed with booking

Do NOT trigger for:
- First message inquiries
- Price or availability questions only
- General information requests
- Any message that does not contain explicit booking intent

After triggering, say:
"Great! Please fill in your contact details below and our
operator will confirm the exact price and availability for
you right away."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. RESPONSE FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Standard Markdown.
- Bold key terms, package names, and estimated prices.
- Bullet points for options and comparisons.
- Concise and scannable. No filler. No lengthy intros.
- Never show structural labels:
  [Hook] [Problem] [Benefit] [Offer] [CTA] — invisible always.

${contextSummary ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. SURVEY CONTEXT — DO NOT RE-ASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The user already provided this information during their survey: ${contextSummary}.
Do not re-ask these questions. Briefly confirm the details are correct, then proceed directly to next steps.` : ''}

🌐 Language context: The user is communicating in ${language || 'English'}.`;


    // Initialize the model with Gemini Pro
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    let responseText: string;

    // If history is provided, use startChat with history
    if (history && history.length > 0) {
      const chat = model.startChat({ history });
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
