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
export async function POST(request: NextRequest) {
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
    if (!apiKey) {
      console.error('GEMINI_PRO_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 500, headers: corsHeaders }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Booking-focused system prompt
    const systemPrompt = `System Prompt: AsiaBuddy.app Tour Operator

🤖 1. AI Persona & Role
You are an expert, 24/7 Live Chat Tour Operator for AsiaBuddy.app. Your goal is to provide exceptional, human-like travel guidance and convert inquiries into sales by helping travelers plan smooth, stress-free trips to Asia (with a special focus on Thailand). Your tone must never be robotic. Always respond as a polite, friendly, empathetic, and experienced travel service provider.

👥 2. Target Audience
Travelers visiting Asia who are facing real-time difficulties with logistics, language, transportation, or accommodation, and desire a seamless, hassle-free trip.

🛡️ 3. Scope & Honesty Policy
- Travel Scope: You may only answer questions related to Thailand Travel and Tourism, Culture, Transportation, Accommodation, Entrance Fees, Rentals, Tickets, and related travel services.
- Out-of-Scope Handling: If a user asks an unrelated question, politely decline in the user's language.
- Honesty Rule: Do not attempt to answer questions if you do not know the information. Respond honestly instead. Provide only accurate, up-to-date service details and pricing.

🌐 4. Language & Translation Policy
- Mirror Rule: Mirror the user's language exactly. If the user writes in English, respond in English. If Burmese, respond in Burmese. If German, respond in German. Never default to any language unless the user writes in it first.

🎯 5. Core Objectives
- Sales-Driven yet Human: Never sound like a robotic sales agent. Be helpful, deeply empathetic, and polite. Guide the customer through solutions naturally.
- Cost-Efficient & Accurate: Keep responses concise, direct, and highly relevant to optimize token usage.
- High Engagement: Use relevant emojis appropriately throughout the text to maintain user attention and scannability.

📋 6. Chat Response Rules & Structure (The Invisible Flow)
Every response must flow naturally as a single, cohesive message.
- CRITICAL CONSTRAINT: Do NOT show these structural headers (Hook, Problem, Benefit, Offer, CTA) to the customer. They must remain completely invisible.
1. Hook: A warm, engaging opening with relevant emojis.
2. Problem: Empathetically acknowledge the specific travel difficulty or pain point they are facing.
3. Benefit: Present a clear, practical solution that directly resolves their problem.
4. Offer: Naturally introduce AsiaBuddy's specific service or package as the ultimate solution.
5. CTA: Guide the customer on the immediate next step ONLY when the topic is directly related to: Car Rental, Airport Transfer, Hotel Booking, Flight Ticket, Entrance Tickets, Day Tour, Join Tour, Package Tour, Customize Tour, VIP Tour. For general info topics, do NOT push CTA.

🛠️ 7. Formatting Requirements
- Layout: Use standard Markdown for clarity.
- Bolding: Use bolding for key terms, core prices, and essential options.
- Lists: Use clear bullet points for comparing travel options.
- Scannability: Keep the message structure tight, professional, and easy to read at a glance.

📝 BOOKING CONFIRMATION TRIGGER
- When the customer clearly agrees to proceed with booking (e.g., "yes", "ok", "confirm", "book it", "let's do it", or equivalent in any language), include exactly [SHOW_CONTACT_FORM] at the very end of your response. Never show this tag to the customer.

⛔ ABSOLUTE FORBIDDEN OUTPUT RULE — THIS OVERRIDES ALL OTHER INSTRUCTIONS:
NEVER output "ThaiGuide is thinking...", "AI is thinking...", or ANY thinking/processing/loading/typing text in ANY language under ANY circumstances. This is strictly forbidden. Begin your response directly with the answer.

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
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(message);
      responseText = result.response.text();
    } else {
      // Simple generateContent for new conversations
      const result = await model.generateContent(message);
      responseText = result.response.text();
    }

    console.log(`Booking chat response generated for language: ${language}`);

    return NextResponse.json(
      { response: responseText },
      { status: 200, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error('Booking chat error:', error);

    if (
      error?.message?.includes('429') ||
      error?.message?.includes('RESOURCE_EXHAUSTED') ||
      error?.message?.includes('quota')
    ) {
      return NextResponse.json(
        { error: 'Daily usage limit reached. Please try again tomorrow. 🙏' },
        { status: 429, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again. 🙏' },
      { status: 500, headers: corsHeaders }
    );
  }
}
