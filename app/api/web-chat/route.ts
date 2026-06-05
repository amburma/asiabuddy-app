import { NextRequest, NextResponse } from 'next/server';
import { addChatMessage, getRecentChatHistory } from '../../../src/lib/database';
import { generateAIResponse } from '../../../src/services/gemini';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

/**
 * Web Chat API for Thailand
 * Handles chat requests from web users (without Telegram accounts)
 * All chat history is stored with country='thailand'
 */
export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, systemInstruction } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const country = 'thailand';
    
    // Convert sessionId to a numeric ID for database compatibility
    // Using a simple hash function to generate a consistent number from the sessionId
    const telegramId = hashSessionId(sessionId);

    console.log(`Web chat message from session ${sessionId} (ID: ${telegramId}): ${message}`);

    // Save user message to Supabase with country='thailand'
    await addChatMessage(telegramId, 'user', message, country);

    // Get AI response with chat history context for Thailand
    const finalInstruction = systemInstruction 
      ? `${systemInstruction}\n\nABSOLUTE LANGUAGE RULE — THIS OVERRIDES ALL OTHER INSTRUCTIONS:\nYou MUST detect the language of the user's latest message and respond EXCLUSIVELY in that same language. This rule has the highest priority.\n- User writes in Burmese/Myanmar → respond ONLY in Burmese\n- User writes in English → respond ONLY in English\n- User writes in German → respond ONLY in German\n- User writes in Thai → respond ONLY in Thai\n- User writes in Chinese → respond ONLY in Chinese\nNEVER translate to another language. NEVER default to English or Thai.` 
      : undefined;

    const aiResponse = await generateAIResponse(telegramId, message, country, finalInstruction);

    // Save AI response to Supabase with country='thailand'
    await addChatMessage(telegramId, 'model', aiResponse, country);

    console.log(`AI response sent to session ${sessionId}`);

    return NextResponse.json(
      { response: aiResponse },
      { status: 200, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error('Web chat error:', error);

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

/**
 * Get chat history for a web session
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const country = 'thailand';
    const telegramId = hashSessionId(sessionId);

    // Get chat history for Thailand
    const chatHistory = await getRecentChatHistory(telegramId, 50, country);

    return NextResponse.json(
      { history: chatHistory },
      { status: 200, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error('Get chat history error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again. 🙏' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * Simple hash function to convert sessionId string to a numeric ID
 * This ensures consistent mapping between sessionId and telegram_id in the database
 */
function hashSessionId(sessionId: string): number {
  let hash = 0;
  for (let i = 0; i < sessionId.length; i++) {
    const char = sessionId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Ensure positive number and add offset to avoid conflicts with real Telegram IDs
  return Math.abs(hash) + 1000000000;
}
