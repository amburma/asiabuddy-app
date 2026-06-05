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
    const systemPrompt = `You are a specialized Booking Assistant for AsiaBuddy Thailand travel services.

Your scope is STRICTLY LIMITED to:
1. Car rentals
2. Bus tickets
3. Flight tickets
4. Attraction entrance fees/tickets

IMPORTANT RULES:
- If the user asks about anything outside these 4 categories, politely redirect them to booking-related services only
- All price information MUST be presented as estimates only
- Start or include a note that prices are estimates
- Every response must end with a disclaimer that prices are estimates and may vary
- Be helpful, friendly, and professional
- Respond in the same language as the user's message (English, Thai, Burmese, German, French, or Spanish)
- Keep responses concise and relevant to booking inquiries

Language context: The user is communicating in ${language || 'English'}.`;

    // Initialize the model with Gemini Pro
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
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
