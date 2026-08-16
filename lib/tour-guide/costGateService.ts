import { supabaseAdmin } from './supabaseAdmin';

// ---------------------------------------------------------------------------
// Rates
// ---------------------------------------------------------------------------
//
// IMPORTANT: BASE_RATE_USD_PER_HOUR MUST stay in sync with the backend cost
// basis. This is the single source of truth for all duration<->cost conversion.
// Update here if the underlying AI model changes.
export const BASE_RATE_USD_PER_HOUR = 2.20; // Gemini-based backend cost basis. Single source of truth for all duration<->cost conversion. Update here if the underlying AI model changes.

export const WINDOW_MINUTES = 60;

// Gemini 3.5 Live Translate Preview pricing, verified against 
// https://ai.google.dev/gemini-api/docs/pricing on 2026-08-14.
// PREVIEW MODEL — pricing has changed before without notice (see 
// https://discuss.ai.google.dev/t/gemini-3-5-live-translate-preview-sudden-price-increase/176416).
// Re-verify against the live pricing page before this constant is 
// trusted for production billing decisions.
export const LIVE_TRANSLATE_RATES = {
  inputUsdPerMinute: 0.0053,
  outputUsdPerMinute: 0.0315,
} as const;

export const TRIAL_CAP_SECONDS = 120;
export const TRIAL_WARNING_AT_SECONDS = 90;
export const BUDGET_WARNING_THRESHOLD = 0.8; // 80%, per plan §4.1 step 8 / §4.2 step 5

export type TourGuideSource = 'package' | 'purchased' | 'trial';

// NOTE: 'live-translate' does not use BASE_RATE_USD_PER_HOUR — its dollar 
// cost is computed per-tick via computeLiveTranslatorCostUsd() and passed 
// directly to recordUsage(). See that function's docstring.
export type TourGuideFeature = 'text' | 'ocr' | 'voice' | 'voice-translate' | 'live-translate';

export interface AccountStatus {
  accountId: string;
  source: TourGuideSource;
  isActive: boolean;
  totalHoursAllocated: number; // not meaningful for 'trial' — see trialSeconds*
  hoursConsumed: number;
  remainingHours: number; // total_hours_allocated - hoursConsumed
  currentWindowCostUsd: number;
  currentWindowStartAt: string | null; // ISO timestamp, null = no window open yet
  isWindowBlocked: boolean; // true if currentWindowCostUsd >= BASE_RATE_USD_PER_HOUR
  trialSecondsUsed?: number;
  trialSecondsRemaining?: number;
  warning: boolean; // >=80% of budget used, or >=90s for trial
}

export class CostGateError extends Error {
  constructor(
    public code: 'NOT_FOUND' | 'DISABLED' | 'CAPPED' | 'TRIAL_EXHAUSTED',
    message: string
  ) {
    super(message);
    this.name = 'CostGateError';
  }
}

/**
 * Reads current account + usage rows and computes remaining budget.
 * Pure read — does not enforce or deduct anything.
 */
export async function getAccountStatus(accountId: string): Promise<AccountStatus> {
  const { data: account, error: accErr } = await supabaseAdmin
    .from('tour_guide_accounts')
    .select('id, source, status, total_hours_allocated')
    .eq('id', accountId)
    .maybeSingle();

  if (accErr) throw accErr;
  if (!account) {
    throw new CostGateError('NOT_FOUND', 'Tour Guide account not found');
  }

  if (account.source === 'trial') {
    const { data: trialUsage, error: tuErr } = await supabaseAdmin
      .from('tour_guide_trial_usage')
      .select('seconds_used, status')
      .eq('account_id', accountId)
      .maybeSingle();
    if (tuErr) throw tuErr;

    const secondsUsed = trialUsage?.seconds_used ?? 0;
    const remaining = Math.max(0, TRIAL_CAP_SECONDS - secondsUsed);

    return {
      accountId,
      source: 'trial',
      isActive: account.status === 'active' && trialUsage?.status !== 'exhausted',
      totalHoursAllocated: account.total_hours_allocated,
      hoursConsumed: 0,
      remainingHours: 0,
      currentWindowCostUsd: 0,
      currentWindowStartAt: null,
      isWindowBlocked: false,
      trialSecondsUsed: secondsUsed,
      trialSecondsRemaining: remaining,
      warning: secondsUsed >= TRIAL_WARNING_AT_SECONDS,
    };
  }

  const { data: usage, error: usageErr } = await supabaseAdmin
    .from('tour_guide_usage')
    .select('hours_consumed, current_window_start_at, current_window_cost_usd')
    .eq('account_id', accountId)
    .maybeSingle();
  if (usageErr) throw usageErr;

  const source = account.source as 'package' | 'purchased';
  const hoursConsumed = usage?.hours_consumed ?? 0;
  const remainingHours = Math.max(0, account.total_hours_allocated - hoursConsumed);
  const currentWindowCostUsd = usage?.current_window_cost_usd ?? 0;
  const isWindowBlocked = currentWindowCostUsd >= BASE_RATE_USD_PER_HOUR;

  return {
    accountId,
    source,
    isActive: account.status === 'active' && remainingHours > 0 && !isWindowBlocked,
    totalHoursAllocated: account.total_hours_allocated,
    hoursConsumed,
    remainingHours,
    currentWindowCostUsd,
    currentWindowStartAt: usage?.current_window_start_at ?? null,
    isWindowBlocked,
    warning: account.total_hours_allocated > 0 ? hoursConsumed / account.total_hours_allocated >= BUDGET_WARNING_THRESHOLD : false,
  };
}

/**
 * Pre-flight gate. Call BEFORE hitting the external API (Translate/Vision/
 * Gemini/TTS) — plan §4.1 step 4 / §4.2 "Check account status". Throws
 * CostGateError if the request should not proceed at all.
 *
 * This is a courtesy check only, to avoid paying for external calls that
 * will be rejected anyway. It is NOT the enforcement mechanism — two
 * concurrent tabs can both pass this check. Real enforcement is the atomic
 * DB function called from recordUsage()/recordTrialUsage() below (§2.3:
 * check-and-deduct must be one atomic operation; verified via the 20-way
 * concurrency test in the Progress Log).
 */
export async function assertBudgetAvailable(accountId: string): Promise<AccountStatus> {
  const status = await getAccountStatus(accountId);

  if (!status.isActive) {
    throw new CostGateError('DISABLED', 'This Tour Guide account is not active');
  }

  if (status.source === 'trial') {
    if ((status.trialSecondsRemaining ?? 0) <= 0) {
      throw new CostGateError('TRIAL_EXHAUSTED', 'Trial time has been used up');
    }
  } else if (status.remainingHours <= 0) {
    throw new CostGateError('CAPPED', 'Hours have been used up');
  } else if (status.isWindowBlocked) {
    throw new CostGateError('CAPPED', 'Hourly usage limit reached — access will resume when the current hour window rolls over');
  }

  return status;
}

/**
 * Computes the real dollar cost of a Live Translator tick from actual 
 * audio duration, using LIVE_TRANSLATE_RATES. Unlike the other Tour 
 * Guide features, Live Translator does not use a flat $/hour ceiling — 
 * its cost is computed directly from real input/output audio seconds 
 * and passed to recordUsage() as amountUsd, same as any other feature.
 */
export function computeLiveTranslatorCostUsd(
  inputAudioSeconds: number,
  outputAudioSeconds: number
): number {
  const inputCost = (inputAudioSeconds / 60) * LIVE_TRANSLATE_RATES.inputUsdPerMinute;
  const outputCost = (outputAudioSeconds / 60) * LIVE_TRANSLATE_RATES.outputUsdPerMinute;
  return inputCost + outputCost;
}

export interface UsageRecordResult {
  success: boolean;
  hoursConsumed: number;
  remainingHours: number;
  currentWindowCostUsd: number;
  isWindowBlocked: boolean;
  warning: boolean;
}

/**
 * Atomic check-and-deduct against `increment_tour_guide_usage(p_account_id,
 * p_feature, p_amount)` (migration 20260814 — SELECT ... FOR UPDATE + cap
 * check inside one transaction, verified for 20-way concurrency with 0
 * overshoot in the Progress Log). Call AFTER computing the real cost of the
 * external API response (plan §4.1 step 7), or every 5-10s during a Live
 * session (§4.2 step 2).
 */
export async function recordUsage(
  accountId: string,
  feature: TourGuideFeature,
  amountUsd: number,
  durationSeconds?: number
): Promise<UsageRecordResult> {
  const { data, error } = await supabaseAdmin
    .rpc('increment_tour_guide_usage', {
      p_account_id: accountId,
      p_feature: feature,
      p_amount: amountUsd,
      p_duration_seconds: durationSeconds ?? null,
    })
    .single();
  if (error) throw error;
  const row = data as {
    success: boolean;
    hours_consumed: number;
    remaining_hours: number;
    current_window_cost_usd: number;
    is_window_blocked: boolean;
  };
  return {
    success: row.success,
    hoursConsumed: row.hours_consumed,
    remainingHours: row.remaining_hours,
    currentWindowCostUsd: row.current_window_cost_usd,
    isWindowBlocked: row.is_window_blocked,
    warning: row.remaining_hours > 0
      ? row.hours_consumed / (row.hours_consumed + row.remaining_hours) >= BUDGET_WARNING_THRESHOLD
      : true,
  };
}

export interface TrialUsageRecordResult {
  success: boolean;
  secondsUsed: number;
  remainingSeconds: number;
  warning: boolean; // >=90s
  ended: boolean; // remaining <= 0
}

/**
 * Atomic check-and-deduct against `increment_tour_guide_trial_usage(
 * p_account_id, p_seconds)`. Same row-lock pattern, fixed 120s cap, raises
 * a DB error if called against a non-'trial' account (verified in Progress
 * Log). Call once per tick (§4.4: "every second") while a trial Live
 * session is open.
 *
 * Same caveat as recordUsage() above re: inferred column names — verify
 * against the migration before shipping.
 */
export async function recordTrialUsage(
  accountId: string,
  seconds: number
): Promise<TrialUsageRecordResult> {
  const { data, error } = await supabaseAdmin
    .rpc('increment_tour_guide_trial_usage', {
      p_account_id: accountId,
      p_seconds: seconds,
    })
    .single();

  if (error) throw error;

  const row = data as { success: boolean; new_seconds_used: number; remaining_seconds: number };

  return {
    success: row.success,
    secondsUsed: row.new_seconds_used,
    remainingSeconds: row.remaining_seconds,
    warning: row.new_seconds_used >= TRIAL_WARNING_AT_SECONDS,
    ended: row.remaining_seconds <= 0,
  };
}

// PILOT LOGGING TODO (Phase 4 build): when the Live Translator 
// tick-reporting endpoint (/api/tour-guide/live/usage) is built, log 
// each tick with: accountId, inputAudioSeconds, outputAudioSeconds, 
// computed amountUsd, and session elapsed time, using a distinct 
// prefix (e.g. [PILOT-DATA live-translator]) so real-world $/hour can 
// be aggregated from logs during the pilot period before any repricing 
// decision is made.
