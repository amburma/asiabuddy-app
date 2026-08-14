import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { gateFeatureRequestFromReq } from '@/lib/tour-guide/gate';
import { recordUsage, getAccountStatus } from '@/lib/tour-guide/costGateService';
import { getGeminiClient, computeCostUsd, TOUR_GUIDE_MODELS } from '@/lib/tour-guide/geminiConfig';

// NOTE on payload size: this route expects `audio` as a raw base64 string
// (no `data:audio/...;base64,` prefix — strip that client-side). Vercel
// serverless functions cap request bodies around 4.5MB, and a base64
// string runs ~33% larger than the original file. A reasonable audio
// duration limit (e.g. ~30 seconds for webm/opus at typical bitrates)
// should be enforced client-side before base64-encoding to avoid opaque
// Vercel failures.
const voiceQASchema = z.object({
  audio: z.string().min(1),
  mimeType: z.string().refine((v) => v.startsWith('audio/webm'), {
    message: 'mimeType must be audio/webm or audio/webm;codecs=...',
  }),
  targetLanguage: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    // Cost Gate + Feature Gate. Trial accounts never get past this for
    // feature='voice-qa' (featureGateService.ts restricts trial to 'live' only).
    const gate = await gateFeatureRequestFromReq(req, 'voice-qa');
    if (!gate.ok) return gate.response;
    const { accountId } = gate;

    const body = await req.json();
    const parsed = voiceQASchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { audio, mimeType, targetLanguage } = parsed.data;

    // Enforce a reasonable audio size limit to avoid opaque Vercel failures.
    // Base64 is ~33% larger than binary, so a 4.5MB Vercel cap translates to
    // roughly 3.4MB of binary audio. At typical webm/opus bitrates (~24-32 kbps),
    // this allows for ~15-20 minutes of audio — we cap at 30 seconds to be
    // conservative and leave headroom for other request overhead.
    const MAX_AUDIO_BASE64_SIZE = 4_500_000; // 4.5MB in bytes
    if (audio.length > MAX_AUDIO_BASE64_SIZE) {
      return NextResponse.json(
        { error: 'Audio is too large — please limit to 30 seconds or less' },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();
    const model = TOUR_GUIDE_MODELS.voiceQA;

    const prompt = `Listen to the audio and transcribe exactly what was said. Pay close attention to short phrases and compound words — a short utterance is often a complete travel-related question or request (e.g. asking for a location, price, or direction), not separate unrelated words.

Then translate that transcription into ${targetLanguage}.

Respond in EXACTLY this format with no extra text:
ORIGINAL: <the original transcript>
TRANSLATION: <the translation>

If the audio is completely silent or unintelligible, respond with exactly: UNCLEAR AUDIO`;

    let result;
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Gemini API timeout')), 25000); // 25-second timeout
      });

      const geminiPromise = ai.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [{ inlineData: { mimeType, data: audio } }, { text: prompt }],
          },
        ],
        config: { temperature: 0.3 },
      });

      result = await Promise.race([geminiPromise, timeoutPromise]);
    } catch (apiErr) {
      console.error('Gemini API error (voice-qa):', apiErr);
      if (apiErr instanceof Error && apiErr.message === 'Gemini API timeout') {
        return NextResponse.json({ error: 'Voice Q&A service timed out — please try again' }, { status: 504 });
      }
      return NextResponse.json({ error: 'Voice Q&A service is temporarily unavailable' }, { status: 502 });
    }

    const responseText = result.text?.trim();
    if (!responseText) {
      return NextResponse.json({ error: 'Voice Q&A failed — empty response' }, { status: 502 });
    }

    // Compute cost and record usage before response handling
    // (API call costs money even if audio is unclear)
    const amountUsd = computeCostUsd(
      {
        promptTokenCount: result.usageMetadata?.promptTokenCount,
        candidatesTokenCount: result.usageMetadata?.candidatesTokenCount,
      },
      model,
      { inputType: 'audio' }
    );

    const usage = await recordUsage(accountId, 'voice-qa', amountUsd);

    if (!usage.success) {
      // Same race-condition handling as translate/route.ts — see that
      // file's comment. Rare in practice.
      return NextResponse.json({ error: 'Hours have been used up' }, { status: 429 });
    }

    const updatedStatus = await getAccountStatus(accountId);

    // Handle UNCLEAR AUDIO sentinel
    if (responseText === 'UNCLEAR AUDIO') {
      return NextResponse.json(
        { error: 'Could not understand the audio. Please try again.' },
        { status: 400 }
      );
    }

    // Parse ORIGINAL:/TRANSLATION: format
    const originalMatch = responseText.match(/ORIGINAL:\s*(.*)/);
    const translationMatch = responseText.match(/TRANSLATION:\s*(.*)/);

    if (!originalMatch || !translationMatch) {
      return NextResponse.json({ error: 'Voice Q&A failed — invalid response format' }, { status: 502 });
    }

    const original = originalMatch[1].trim();
    const translation = translationMatch[1].trim();

    return NextResponse.json({
      success: true,
      data: { question: original, answer: translation },
      remainingHours: updatedStatus.source === 'trial' ? undefined : updatedStatus.remainingHours,
      warning: usage.warning,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
