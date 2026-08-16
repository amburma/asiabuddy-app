import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { gateFeatureRequestFromReq } from '@/lib/tour-guide/gate';
import { recordUsage, getAccountStatus } from '@/lib/tour-guide/costGateService';
import { getGeminiClient, computeCostUsd, TOUR_GUIDE_MODELS } from '@/lib/tour-guide/geminiConfig';

const translateSchema = z.object({
  text: z.string().min(1).max(5000),
  targetLanguage: z.string().min(1),
  sourceLanguage: z.string().optional(), // omit → auto-detect
});

export async function POST(req: NextRequest) {
  try {
    // Cost Gate + Feature Gate. Trial accounts never get past this for
    // feature='text' (featureGateService.ts restricts trial to 'live-translate'
    // only) — so this route never needs to touch recordTrialUsage(), only
    // the package/purchased path (recordUsage()) below.
    const gate = await gateFeatureRequestFromReq(req, 'text');
    if (!gate.ok) return gate.response;
    const { accountId } = gate;

    const body = await req.json();
    const parsed = translateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { text, targetLanguage, sourceLanguage } = parsed.data;

    const ai = getGeminiClient();
    const model = TOUR_GUIDE_MODELS.textTranslate;

    const prompt = sourceLanguage
      ? `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Return ONLY the translated text, nothing else — no notes, no quotation marks, no explanations.\n\nText: ${text}`
      : `Translate the following text to ${targetLanguage}. Detect the source language automatically. Return ONLY the translated text, nothing else — no notes, no quotation marks, no explanations.\n\nText: ${text}`;

    let result;
    try {
      result = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { temperature: 0.2 }, // low temperature — translation wants consistency, not creativity
      });
    } catch (apiErr) {
      console.error('Gemini API error (translate):', apiErr);
      return NextResponse.json({ error: 'Translation service is temporarily unavailable' }, { status: 502 });
    }

    const translation = result.text?.trim();
    if (!translation) {
      return NextResponse.json({ error: 'Translation failed — empty response' }, { status: 502 });
    }

    const amountUsd = computeCostUsd(
      {
        promptTokenCount: result.usageMetadata?.promptTokenCount,
        candidatesTokenCount: result.usageMetadata?.candidatesTokenCount,
      },
      model
    );

    const usage = await recordUsage(accountId, 'text', amountUsd);

    if (!usage.success) {
      // Lost the race against another tab between the pre-flight check
      // (inside gateFeatureRequestFromReq) and recordUsage() here. The
      // Gemini call already happened and AsiaBuddy already paid for it —
      // that can't be undone — but the translation is withheld anyway, to
      // keep the $-cap enforcement boundary hard rather than "soft after
      // the fact". This should be rare: it only fires if two tabs finish
      // their last-affordable request within the same few hundred ms.
      return NextResponse.json({ error: 'Hours have been used up' }, { status: 429 });
    }

    // Re-fetch status rather than recomputing hours here, so the rate
    // constants stay defined in exactly one place (costGateService.ts) —
    // see that file's header comment on why this matters.
    const updatedStatus = await getAccountStatus(accountId);

    return NextResponse.json({
      success: true,
      data: { translation },
      remainingHours: updatedStatus.source === 'trial' ? undefined : updatedStatus.remainingHours,
      warning: usage.warning,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
