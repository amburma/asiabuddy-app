import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { gateFeatureRequestFromReq } from '@/lib/tour-guide/gate';
import { recordUsage, getAccountStatus } from '@/lib/tour-guide/costGateService';
import { getGeminiClient, computeCostUsd, TOUR_GUIDE_MODELS } from '@/lib/tour-guide/geminiConfig';

// NOTE on payload size: this route expects `image` as a raw base64 string
// (no `data:image/...;base64,` prefix — strip that client-side). Vercel
// serverless functions cap request bodies around 4.5MB, and a base64
// string runs ~33% larger than the original file, so a client-side resize/
// compress step (e.g. downscale to ~1600px longest edge, JPEG quality
// ~0.8, before base64-encoding) is not optional for phone-camera photos —
// see TourGuidePhotoOCRForm.tsx, which does this before every upload.
const ocrSchema = z.object({
  image: z.string().min(1),
  mimeType: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  targetLanguage: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    // Cost Gate + Feature Gate. Trial accounts never get past this for
    // feature='ocr' (featureGateService.ts restricts trial to 'live' only).
    const gate = await gateFeatureRequestFromReq(req, 'ocr');
    if (!gate.ok) return gate.response;
    const { accountId } = gate;

    const body = await req.json();
    const parsed = ocrSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { image, mimeType, targetLanguage } = parsed.data;

    const ai = getGeminiClient();
    const model = TOUR_GUIDE_MODELS.ocr;

    const prompt = `You are an OCR + translation engine. Look at the image and:
1. Extract all visible text exactly as written.
2. Translate that text to ${targetLanguage}.

If there is no readable text in the image, respond with exactly this JSON:
{"extractedText": "", "translation": "No text found in image"}

Otherwise respond with ONLY this JSON object, nothing else — no markdown code fences, no commentary:
{"extractedText": "<the original text you found, preserving line breaks as \\n>", "translation": "<the translation>"}`;

    let result;
    try {
      result = await ai.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [{ inlineData: { mimeType, data: image } }, { text: prompt }],
          },
        ],
        config: { temperature: 0.2, responseMimeType: 'application/json' },
      });
    } catch (apiErr) {
      console.error('Gemini API error (ocr):', apiErr);
      return NextResponse.json({ error: 'OCR service is temporarily unavailable' }, { status: 502 });
    }

    const raw = result.text?.trim();
    if (!raw) {
      return NextResponse.json({ error: 'OCR failed — empty response' }, { status: 502 });
    }

    let extractedText = '';
    let translation = '';
    try {
      const jsonResult = JSON.parse(raw);
      extractedText = typeof jsonResult.extractedText === 'string' ? jsonResult.extractedText : '';
      translation = typeof jsonResult.translation === 'string' ? jsonResult.translation : '';
    } catch {
      // Model didn't return valid JSON despite responseMimeType — fall
      // back to treating the whole response as the translation rather
      // than failing the request outright.
      translation = raw;
    }

    if (!translation) {
      return NextResponse.json({ error: 'OCR failed — could not parse response' }, { status: 502 });
    }

    const amountUsd = computeCostUsd(
      {
        promptTokenCount: result.usageMetadata?.promptTokenCount,
        candidatesTokenCount: result.usageMetadata?.candidatesTokenCount,
      },
      model
    );

    const usage = await recordUsage(accountId, 'ocr', amountUsd);

    if (!usage.success) {
      // Same race-condition handling as translate/route.ts — see that
      // file's comment. Rare in practice.
      return NextResponse.json({ error: 'Hours have been used up' }, { status: 429 });
    }

    const updatedStatus = await getAccountStatus(accountId);

    return NextResponse.json({
      success: true,
      data: { extractedText, translation },
      remainingHours: updatedStatus.source === 'trial' ? undefined : updatedStatus.remainingHours,
      warning: usage.warning,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
