import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Modality } from '@google/genai';
import { resolveAccountFromRequest } from '@/lib/tour-guide/auth';
import { assertBudgetAvailable } from '@/lib/tour-guide/costGateService';

// Gemini ephemeral token lifetime: 30 minutes for message sending
// 1 minute for starting new sessions (default per Gemini docs)
const GEMINI_TOKEN_EXPIRE_MINUTES = 30;
const GEMINI_SESSION_EXPIRE_MINUTES = 1;

export interface GeminiTokenResponse {
  success: boolean;
  token: string;
  expireTime: string;
  newSessionExpireTime: string;
}

export async function POST(req: NextRequest) {
  try {
    // Step 1: Verify session token from cookie (same pattern as token/route.ts)
    const session = await resolveAccountFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized — valid session required' },
        { status: 401 }
      );
    }

    // Step 2: Check budget availability (same pattern as token/route.ts)
    await assertBudgetAvailable(session.accountId);

    // Step 2.5: Parse source and target languages from request body
    const body = await req.json();
    const sourceLanguage = body.sourceLanguage || 'Burmese'; // Default to Burmese if not provided
    const targetLanguage = body.targetLanguage || 'Thai'; // Default to Thai if not provided

    // Step 3: Get Gemini API key (server-side only, never returned to client)
    const geminiApiKey = process.env.GEMINI_TOUR_GUIDE_API_KEY;
    if (!geminiApiKey) {
      throw new Error('GEMINI_TOUR_GUIDE_API_KEY env var is not set');
    }

    // Step 4: Create Gemini client and mint ephemeral token
    const client = new GoogleGenAI({ apiKey: geminiApiKey });
    
    const expireTime = new Date(Date.now() + GEMINI_TOKEN_EXPIRE_MINUTES * 60 * 1000).toISOString();
    const newSessionExpireTime = new Date(Date.now() + GEMINI_SESSION_EXPIRE_MINUTES * 60 * 1000).toISOString();

    // Per official docs: Create ephemeral token with liveConnectConstraints
    // Using gemini-live-2.5-flash-native-audio with systemInstruction for translation
    // This model natively supports VAD-based turn detection via automaticActivityDetection
    
    const liveConnectConfig = {
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      config: {
        responseModalities: [Modality.AUDIO],
        inputAudioTranscription: {},
        outputAudioTranscription: {},
        systemInstruction: {
          parts: [{ 
            text: `You are a real-time interpreter. Listen to the user's speech in ${sourceLanguage}. Wait until the user has finished a complete sentence or thought — indicated by a natural pause — before responding. Translate what they said into ${targetLanguage} and speak the translation aloud. Do not translate partial or incomplete sentences. Do not add commentary, only the translation.` 
          }]
        },
        realtimeInputConfig: {
          automaticActivityDetection: {
            silenceDurationMs: 3000
          }
        },
      },
    };
    console.log('[GEMINI TOKEN] Live connect config with target language:', targetLanguage);
    console.log('[GEMINI TOKEN] Full liveConnectConstraints.config being sent to Gemini:', JSON.stringify(liveConnectConfig, null, 2));
    
    const token = await client.authTokens.create({
      config: {
        uses: 1, // The ephemeral token can only be used to start a single session
        expireTime: expireTime,
        newSessionExpireTime: newSessionExpireTime,
        liveConnectConstraints: liveConnectConfig,
      },
    });

    // Step 5: Return the ephemeral token (the token.name field contains the actual token)
    return NextResponse.json({
      success: true,
      token: token.name,
      expireTime: expireTime,
      newSessionExpireTime: newSessionExpireTime,
    } as GeminiTokenResponse);
  } catch (error) {
    // Handle CostGateError specifically
    if (error instanceof Error && error.name === 'CostGateError') {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    console.error('Gemini token minting error:', error);
    return NextResponse.json(
      { error: 'Failed to mint Gemini ephemeral token' },
      { status: 500 }
    );
  }
}
