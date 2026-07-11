import { NextRequest, NextResponse } from 'next/server';
import { addChatMessage, getRecentChatHistory } from '../../../src/lib/database';
import { generateAIResponse, getSystemInstruction } from '../../../src/services/gemini';

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
    const { message, sessionId } = await request.json();

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
    let aiResponse: string;
    try {
      aiResponse = await generateAIResponse(telegramId, message, country, `${getSystemInstruction('thailand')}\n\nABSOLUTE LANGUAGE RULE — HIGHEST PRIORITY — NO EXCEPTIONS:\nDetect the language of the user's latest message.\nRespond EXCLUSIVELY in that same language. No mixing. No switching.\nBurmese/Myanmar input → Burmese reply ONLY.\nEnglish input → English reply ONLY.\nThai input → Thai reply ONLY.\nGerman input → German reply ONLY.\nSpanish input → Spanish reply ONLY.\nFrench input → French reply ONLY.\nAny other language → reply in that same language ONLY.\nNever default to English or Thai.\nEven decline messages must be in user's language.`);
    } catch (geminiError: any) {
      // Detect if all 3 API keys failed (Gemini API error)
      const errorMessage = geminiError?.message || String(geminiError);
      if (errorMessage.includes('All API keys exhausted') || 
          errorMessage.includes('503') ||
          errorMessage.includes('SERVICE_UNAVAILABLE') ||
          errorMessage.includes('Gemini API')) {
        // Return fallback response instead of throwing
        return NextResponse.json(
          { success: false, fallback: true, reason: 'ai_unavailable' },
          { status: 200, headers: corsHeaders }
        );
      }
      // For other errors, let them propagate to the outer catch block
      throw geminiError;
    }

    // Save AI response to Supabase with country='thailand'
    await addChatMessage(telegramId, 'model', aiResponse, country);

    console.log(`AI response sent to session ${sessionId}`);

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
      { response: stripThinkingText(aiResponse) },
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
      { error: 'Server အရမ်း Busy ဖြစ်နေလို့ ခဏနေမှ ပြန်အသုံးပြုပေးပါ။' },
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
