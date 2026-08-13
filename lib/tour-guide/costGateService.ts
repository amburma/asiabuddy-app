import { supabaseAdmin } from './supabaseAdmin';

// ---------------------------------------------------------------------------
// Rates
// ---------------------------------------------------------------------------
//
// IMPORTANT: these constants MUST stay in sync with
// `20260814_redefine_tour_guide_functions.sql`, which hardcodes the same
// numbers inside `increment_tour_guide_usage()` (verified live, see Progress
// Log Phase 0 test table). That migration is the source of truth for
// enforcement.
//
// This deliberately does NOT match §1.2 / §4.2 of
// AsiaBuddy_TourGuide_Project_Plan.md, which says package = $0.2/hr. The
// Progress Log explicitly overrides the plan doc where they disagree, and
// the verified DB function uses $0.15. Also note `tour_guide_account_status()`
// (plan §3.5) still hardcodes $0.2 and was never listed as redefined in the
// Progress Log — it's stale/inconsistent with the real cap. This service
// intentionally does NOT call that SQL function; it reads the two base
// tables directly and computes remaining budget here, using the rates below,
// so there's exactly one place (this file + the migration) that needs to
// agree, not three.
//
// TODO(before Phase 1 ships): either fix `tour_guide_account_status()` to
// use these same rates or drop it, so nothing in the codebase still reads
// the stale $0.2 figure.
export const TOUR_GUIDE_RATES = {
  package: 0.15, // $/hour real-cost ceiling, package tier
  purchased: 1.50, // $/hour real-cost ceiling, purchased tier
} as const;

export const TRIAL_CAP_SECONDS = 120;
export const TRIAL_WARNING_AT_SECONDS = 90;
export const BUDGET_WARNING_THRESHOLD = 0.8; // 80%, per plan §4.1 step 8 / §4.2 step 5

export type TourGuideSource = 'package' | 'purchased' | 'trial';
export type TourGuideFeature = 'text' | 'ocr' | 'voice' | 'voice-qa' | 'live';

export interface AccountStatus {
  accountId: string;
  source: TourGuideSource;
  isActive: boolean;
  totalHoursAllocated: number; // not meaningful for 'trial' — see trialSeconds*
  totalCostUsd: number; // 0 for 'trial'
  ceilingUsd: number; // 0 for 'trial'
  remainingUsd: number; // 0 for 'trial'
  remainingHours: number; // 0 for 'trial' — for "X / Y hours" display, never show $ (plan §1.2)
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
      totalCostUsd: 0,
      ceilingUsd: 0,
      remainingUsd: 0,
      remainingHours: 0,
      trialSecondsUsed: secondsUsed,
      trialSecondsRemaining: remaining,
      warning: secondsUsed >= TRIAL_WARNING_AT_SECONDS,
    };
  }

  const { data: usage, error: usageErr } = await supabaseAdmin
    .from('tour_guide_usage')
    .select('total_cost_usd, status')
    .eq('account_id', accountId)
    .maybeSingle();
  if (usageErr) throw usageErr;

  const source = account.source as 'package' | 'purchased';
  const rate = TOUR_GUIDE_RATES[source];
  const ceilingUsd = account.total_hours_allocated * rate;
  const totalCostUsd = usage?.total_cost_usd ?? 0;
  const remainingUsd = Math.max(0, ceilingUsd - totalCostUsd);

  return {
    accountId,
    source,
    isActive: account.status === 'active' && usage?.status !== 'capped',
    totalHoursAllocated: account.total_hours_allocated,
    totalCostUsd,
    ceilingUsd,
    remainingUsd,
    remainingHours: remainingUsd / rate,
    warning: ceilingUsd > 0 ? totalCostUsd / ceilingUsd >= BUDGET_WARNING_THRESHOLD : false,
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
  } else if (status.remainingUsd <= 0) {
    throw new CostGateError('CAPPED', 'Hours have been used up');
  }

  return status;
}

export interface UsageRecordResult {
  success: boolean; // false = DB rejected the deduction, cap would be exceeded
  totalCostUsd: number;
  remainingUsd: number;
  warning: boolean;
}

/**
 * Atomic check-and-deduct against `increment_tour_guide_usage(p_account_id,
 * p_feature, p_amount)` (migration 20260814 — SELECT ... FOR UPDATE + cap
 * check inside one transaction, verified for 20-way concurrency with 0
 * overshoot in the Progress Log). Call AFTER computing the real cost of the
 * external API response (plan §4.1 step 7), or every 5-10s during a Live
 * session (§4.2 step 2).
 *
 * NOTE: the exact result column names below (`success` / `total_cost_usd` /
 * `remaining_usd`) are inferred from the Progress Log's test-result
 * shorthand ("true/1.00/0.50" = success/total/remaining) — the actual body
 * of `20260814_redefine_tour_guide_functions.sql` wasn't among the docs
 * available when this was written. Confirm the real return shape with
 * `select proname, prorettype::regtype from pg_proc where proname =
 * 'increment_tour_guide_usage';` (or just re-view the migration file)
 * before wiring this into a live route, and adjust the destructuring below
 * if the names differ.
 */
export async function recordUsage(
  accountId: string,
  feature: TourGuideFeature,
  amountUsd: number
): Promise<UsageRecordResult> {
  const { data, error } = await supabaseAdmin
    .rpc('increment_tour_guide_usage', {
      p_account_id: accountId,
      p_feature: feature,
      p_amount: amountUsd,
    })
    .single();

  if (error) throw error;

  // TODO(verify): confirm field names against the live function signature.
  const row = data as { success: boolean; total_cost_usd: number; remaining_usd: number };

  const status = await getAccountStatus(accountId);
  const warning =
    status.ceilingUsd > 0 ? row.total_cost_usd / status.ceilingUsd >= BUDGET_WARNING_THRESHOLD : false;

  return {
    success: row.success,
    totalCostUsd: row.total_cost_usd,
    remainingUsd: row.remaining_usd,
    warning,
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

  // TODO(verify): confirm field names against the live function signature.
  const row = data as { success: boolean; seconds_used: number; remaining_seconds: number };

  return {
    success: row.success,
    secondsUsed: row.seconds_used,
    remainingSeconds: row.remaining_seconds,
    warning: row.seconds_used >= TRIAL_WARNING_AT_SECONDS,
    ended: row.remaining_seconds <= 0,
  };
}
