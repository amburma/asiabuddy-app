import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAIKnowledgeBaseForAI } from '../../../src/services/googleSheets';
import { getSupabase } from '../../../lib/supabase';

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
    const { message, history, language, bookingContext, salesperson_id, contextSummary, isCarRentalFlow } = await request.json();

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

    // Fetch real transfer pricing from Supabase
    let transferPricingString = '';
    try {
      const supabase = getSupabase();
      const { data: transferPricing, error } = await supabase
        .from('transfer_links')
        .select('provider, price_from, city, route_name, transport_type')
        .eq('is_placeholder', false);


      if (error) {
        console.error('Error fetching transfer pricing:', error);
        transferPricingString = '';
      } else if (transferPricing && transferPricing.length > 0) {
        let relevantPricing = transferPricing;
        let contextMatched = false;
        
        if (bookingContext || contextSummary) {
          const context = (bookingContext || contextSummary || '').toLowerCase();
          // Try to match city from context
          const cityMatch = transferPricing.filter((p: any) => 
            context.includes(p.city) || 
            context.includes(p.city.replace('-', ' '))
          );
          if (cityMatch.length > 0) {
            relevantPricing = cityMatch;
            contextMatched = true;
          } else {
            relevantPricing = []; // no match — don't show unrelated pricing
          }
        } else {
          contextMatched = true; // no context to filter by — show all
        }
        
        // Format pricing data: "kiwitaxi: from $25 (Bangkok - Suvarnabhumi Airport to City Center, sedan)"
        if (relevantPricing.length > 0) {
          transferPricingString = relevantPricing
            .map((p: any) => `${p.provider}: from ${p.price_from} (${p.city} - ${p.route_name}, ${p.transport_type})`)
            .join(', ');
        }
      }
    } catch (error) {
      console.error('Exception fetching transfer pricing:', error);
      transferPricingString = '';
    }

    // Fetch real car rental pricing from Supabase if this is a car rental flow
    let carRentalPricingString = '';
    if (isCarRentalFlow) {
      try {
        const supabase = getSupabase();
        const { data: carRentalPricing, error } = await supabase
          .from('car_rental_links')
          .select('provider, price_from, city, location_name, vehicle_type, rental_type')
          .eq('is_placeholder', false);

        if (error) {
          console.error('Error fetching car rental pricing:', error);
          carRentalPricingString = '';
        } else if (carRentalPricing && carRentalPricing.length > 0) {
          let relevantPricing = carRentalPricing;
          let contextMatched = false;
          
          if (bookingContext || contextSummary) {
            const context = (bookingContext || contextSummary || '').toLowerCase();
            // Try to match city from context
            const cityMatch = carRentalPricing.filter((p: any) => 
              context.includes(p.city) || 
              context.includes(p.city.replace('-', ' '))
            );
            if (cityMatch.length > 0) {
              relevantPricing = cityMatch;
              contextMatched = true;
            } else {
              relevantPricing = []; // no match — don't show unrelated pricing
            }
          } else {
            contextMatched = true; // no context to filter by — show all
          }
          
          // Format pricing data: "qeeq: from $30 (Bangkok - Suvarnabhumi Airport, self-drive, SUV)"
          if (relevantPricing.length > 0) {
            carRentalPricingString = relevantPricing
              .map((p: any) => `${p.provider}: from ${p.price_from} (${p.city} - ${p.location_name}, ${p.rental_type}, ${p.vehicle_type})`)
              .join(', ');
          }
        }
      } catch (error) {
        console.error('Exception fetching car rental pricing:', error);
        carRentalPricingString = '';
      }
    }

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
- NEVER guarantee availability or rates.
- NEVER confirm a final price on behalf of AsiaBuddy.
- Final pricing is ALWAYS confirmed by the human operator
  after the customer submits the Contact Form.

TRANSFER PRICING (REAL DATA FROM DATABASE):
${transferPricingString ? `Use ONLY these real figures when discussing transfer pricing: ${transferPricingString}.` : 'Pricing will be confirmed by the operator.'}
NEVER invent, guess, or estimate a transfer price number not derived from this data.
If no matching real price exists for what the customer is asking about, say pricing will be confirmed by the operator instead of quoting a number.

${carRentalPricingString ? `CAR RENTAL PRICING (REAL DATA FROM DATABASE):
Use ONLY these real figures when discussing car rental pricing: ${carRentalPricingString}.
NEVER invent, guess, or estimate a car rental price number not derived from this data.
If no matching real price exists for what the customer is asking about, say pricing will be confirmed by the operator instead of quoting a number.` : ''}

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
8. FLIGHT SEARCH BUTTONS TRIGGER RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When the user has clearly stated (across the conversation) both a
departure city/country AND an arrival city in Thailand, output this token:

[SHOW_FLIGHT_BUTTONS:origin=XXX,destination=YYY]

Where XXX and YYY are IATA airport codes.

COMMON IATA CODES REFERENCE:
- Yangon: RGN
- Mandalay: MDL
- Bangkok: BKK
- Chiang Mai: CNX
- Phuket: HKT
- Singapore: SIN
- Kuala Lumpur: KUL
- Ho Chi Minh City: SGN
- Hanoi: HAN
- Hong Kong: HKG

RULES:
- If departure city is not mentioned, default origin to RGN
- If destination is ambiguous or not a Thai city, do NOT output the token — ask a clarifying question instead
- The token should be appended to your normal helpful text response, not replace it
- Only trigger when BOTH origin and destination are clearly identified

Example: User says "I want to fly from Yangon to Bangkok"
Your response: "I can help you find flights from Yangon to Bangkok. Here are search options:
[SHOW_FLIGHT_BUTTONS:origin=RGN,destination=BKK]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. HOTEL SEARCH BUTTONS TRIGGER RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When the user mentions hotel/accommodation/room-related intent
(keywords like ဟိုတယ်, အခန်း, tent, resort, "stay", "hotel", "room")
AND has stated (or you can reasonably infer) which Thai city they
want to stay in, output this token:

[SHOW_HOTEL_BUTTONS:city=CITYKEY]

Where CITYKEY must be one of these exact keys:
- Bangkok
- Chiang Mai
- Phuket
- Pattaya
- Krabi
- Ayutthaya
- Koh Samui

RULES:
- If the user hasn't specified which city, default city to "bangkok"
- If the message is ambiguous whether they mean hotels vs flights vs something else, do NOT output the token — ask a clarifying question
- The token should be appended to your normal helpful text response, not replace it
- Distinguish from flight intent — do not fire both tokens for a message that's clearly only about hotels or only about flights

Example: User says "I need a hotel in Phuket"
Your response: "I can help you find hotels in Phuket. Here are search options:
[SHOW_HOTEL_BUTTONS:city=Phuket]"

Example: User says "ဟိုတယ် ရှာချင်တယ်" (I want to find a hotel)
Your response: "ဘန်ကောက်မှာ ဟိုတယ်ရှာဖွေရန် ကူညီပေးပါမည်။
[SHOW_HOTEL_BUTTONS:city=Bangkok]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. RESPONSE FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Standard Markdown.
- Bold key terms, package names, and estimated prices.
- Bullet points for options and comparisons.
- Concise and scannable. No filler. No lengthy intros.
- Never show structural labels:
  [Hook] [Problem] [Benefit] [Offer] [CTA] — invisible always.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. FLIGHT FAQ GROUNDING DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When users ask about flight-related topics, use this specific information from the published FAQ:

Q1. Flight duration to Bangkok:
- From major Asian hubs: 2-4 hours direct
- From Europe: 11-13 hours direct
- From North America: 15-20 hours with layover

Q2. Airlines serving Thailand:
- Full-service: Thai Airways, Singapore Airlines, Emirates, Qatar, Cathay Pacific
- Budget: AirAsia, Nok Air (regional routes)

Q3. Visa requirements:
- Most nationalities get 30-day visa-exempt entry
- Some countries require advance application
- Check visa guide for latest requirements

Q4. BKK vs DMK airports:
- Suvarnabhumi (BKK): International flights, Airport Rail Link to city
- Don Mueang (DMK): Budget airlines, domestic flights, good transport connections

Q5. Best booking timing:
- Peak season (Dec-Feb): book 2-3 months ahead
- Shoulder seasons (Mar-May, Sep-Nov): better prices, less crowds

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. HOTELS FAQ GROUNDING DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When users ask about hotel/accommodation topics, use this specific information from the published FAQ:

Q1. Best areas to stay in Bangkok:
- Sukhumvit: nightlife and shopping with easy BTS access
- Siam/Pratunam: family-friendly shopping and markets
- Silom/Sathorn: business district with upscale dining
- Riverside: luxury hotels with cultural sightseeing nearby

Q2. Booking in advance during high season:
- Yes, booking 2-3 months ahead recommended for peak season (December-February)
- Especially for popular destinations like Phuket, Krabi, Chiang Mai
- Shoulder seasons offer better rates and more availability with shorter booking windows

Q3. Direct booking vs agent:
- Both options are generally safe
- Direct booking can sometimes offer better rates or flexible cancellation
- Reputable agents provide bundled deals and local support
- Always check reviews and cancellation policies regardless of booking method

Q4. Budget range per night:
- Budget guesthouses/hostels: 500-1,500 THB ($15-45)
- Mid-range hotels: 1,500-4,000 THB ($45-120)
- Luxury resorts: 4,000-10,000+ THB ($120-300+)
- Prices vary significantly by location and season

Q5. Beachfront hotels worth extra cost:
- Beachfront properties offer convenience and views but command premium prices
- Hotels within walking distance (5-10 minutes) often provide better value
- Consider time spent at beach vs exploring other attractions when deciding

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
13. TICKETS/ACTIVITIES (KLOOK) FAQ GROUNDING DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When users ask about tickets/activities topics, use this specific information from the published FAQ:

Q1. Booking tickets in advance:
- For popular attractions (Grand Palace tours, island hopping, cultural shows): book 1-2 weeks ahead
- Especially during peak season (December-February)
- Guarantees your spot and often includes skip-the-line access

Q2. E-tickets accepted at attractions:
- Yes, most Klook partners accept mobile e-tickets
- Simply show your QR code at entrance
- Some attractions may require physical tickets (collect at designated counters)
- Check booking confirmation for specific instructions

Q3. Cancellation policies:
- Policies vary by attraction
- Many tickets offer free cancellation up to 24-48 hours before activity
- Always review cancellation policy before booking
- Refunds typically processed back to original payment method

Q4. Combo tickets for multiple attractions:
- Yes, combo passes available for popular destinations (Bangkok city tours, island packages)
- Often provide better value than individual tickets
- Include transportation between attractions
- Look for 'combo' or 'pass' options when browsing

Q5. On-site vs online booking:
- Online booking through Klook typically 10-30% cheaper than on-site prices
- Avoid queues and guarantee availability
- Some attractions offer exclusive online discounts and add-ons not available at gate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
14. ACTIVITIES (GETYOURGUIDE) FAQ GROUNDING DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When users ask about tours/activities topics, use this specific information from the published FAQ:

Q1. Activity types available:
- Cultural tours, cooking classes, zipline and kayaking adventures
- Day trips to islands, historical site tours, food tours
- Wide variety available; options vary by city and season

Q2. Booking confirmation:
- Receive email confirmation after booking
- Most activities accept mobile vouchers—show phone at meeting point
- Some tours require printed vouchers (specified in confirmation)

Q3. Cancellation policy:
- Policies vary by activity
- Most tours offer free cancellation up to 24-72 hours before start time
- Always check specific policy on activity page when booking
- Refunds processed back to original payment method

Q4. Language availability:
- Yes, most tours available in English, Chinese, Japanese, Korean, and European languages
- Check activity details for available language options
- Select preferred language when booking

Q5. Booking activities in advance:
- Recommended 1-2 weeks ahead for popular experiences and small group tours
- Especially during peak season (November-February)
- Guarantees availability and often includes better prices
- Last-minute booking may have limited selection

${contextSummary ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
15. SURVEY CONTEXT — DO NOT RE-ASK
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
