import { GoogleGenAI } from '@google/genai';

// ---------------------------------------------------------------------------
// Model selection — SINGLE SOURCE OF TRUTH (Progress Log, "Project-wide
// Gemini model strategy", 14 Aug 2026). Every Tour Guide route imports the
// model name from here — never hardcode a model string inline in a route
// file. This file exists specifically because `lib/translate.ts` (the
// existing, unrelated site-wide translator) hardcodes `'gemini-2.5-flash'`
// inline at its call site, which is exactly what made that file's
// retirement-driven migration (both 2.5 models retire 16 Oct 2026) harder
// than it needed to be — do not repeat that mistake here.
// ---------------------------------------------------------------------------
export const TOUR_GUIDE_MODELS = {
  textTranslate: 'gemini-3.1-flash-lite',
  ocr: 'gemini-3.1-flash-lite',
  voiceQA: 'gemini-3.1-flash-lite',
  liveTranslate: 'gemini-3.1-flash-live-preview',
} as const;

// $ per 1,000,000 tokens — as researched 14 Aug 2026 (see Progress Log).
// RE-VERIFY before Phase 4 (Live): pricing changes, and Live's per-minute
// audio billing doesn't map onto this token table anyway — Phase 4's route
// must compute Live cost separately, not via computeCostUsd() below.
// Audio input costs 2x text input on gemini-3.1-flash-lite (confirmed against
// Google's official pricing page, ai.google.dev/gemini-api/docs/pricing, 13 Aug 2026).
const PRICING_PER_M_TOKENS: Record<string, { input: { text: number; audio: number }; output: number }> = {
  'gemini-3.1-flash-lite': { input: { text: 0.25, audio: 0.50 }, output: 1.5 },
};

/**
 * NOTE — verify before first real call: this assumes the `@google/genai`
 * SDK (`GoogleGenAI` client, `.models.generateContent()`), the current
 * unified Google GenAI JS SDK. `lib/translate.ts` wasn't available to
 * check when this was written — if it imports a different package (e.g.
 * the older `@google/generative-ai`), decide whether to align this file to
 * match it or keep both (this subsystem already uses its own dedicated API
 * key per the Progress Log, so a different SDK major is lower-risk than a
 * shared key would be — but note the inconsistency somewhere so it isn't
 * mistaken for an accident later).
 *
 * npm install @google/genai
 */
let client: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!client) {
    const apiKey = process.env.GEMINI_TOUR_GUIDE_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_TOUR_GUIDE_API_KEY env var is not set');
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

export interface GeminiUsage {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
}

export interface ComputeCostOptions {
  inputType?: 'text' | 'audio';
}

/**
 * Converts a Gemini response's token usage into a real USD amount, for
 * `recordUsage()` in costGateService.ts. Text/OCR/Voice Translate (Phases 1-3)
 * all route through this — Live (Phase 4) is exempt, see note above.
 */
export function computeCostUsd(usage: GeminiUsage, model: string, options?: ComputeCostOptions): number {
  const rates = PRICING_PER_M_TOKENS[model];
  if (!rates) {
    throw new Error(`No pricing entry for model "${model}" in PRICING_PER_M_TOKENS`);
  }
  const inputType = options?.inputType ?? 'text';
  const inputRate = rates.input[inputType];
  const inputCost = ((usage.promptTokenCount ?? 0) / 1_000_000) * inputRate;
  const outputCost = ((usage.candidatesTokenCount ?? 0) / 1_000_000) * rates.output;
  return inputCost + outputCost;
}
