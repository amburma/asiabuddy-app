import type { TourGuideFeature, TourGuideSource } from './costGateService';

/**
 * Confirmed decision (plan §1.1): Free Trial only ever unlocks Live
 * Translator — Text/OCR/Voice Q&A are freely available via mainstream AI
 * tools already, so a trial there proves nothing; Live Translator is the
 * actual differentiator and the intended conversion funnel.
 */
export const TRIAL_ALLOWED_FEATURES: readonly TourGuideFeature[] = ['live'] as const;

export interface FeatureGateResult {
  allowed: boolean;
  upsell?: {
    reason: 'trial_live_only';
    message: string;
    messageMm: string;
    cta: { label: string; action: 'request_full_access' };
  };
}

/**
 * plan §2.2 / §4.1 step 3 / §6.1: trial accounts asking for a non-Live
 * feature are rejected with an upsell payload rather than a hard "locked"
 * response — the confirmed dashboard UX keeps all 4 cards visible (for
 * discoverability) and shows a small inline "Full version only" message
 * under Text/Photo/Voice for trial users, rather than hiding those cards.
 * The 403 body here is what that inline message is driven by.
 */
export function checkFeatureAccess(
  source: TourGuideSource,
  feature: TourGuideFeature
): FeatureGateResult {
  if (source === 'trial' && !TRIAL_ALLOWED_FEATURES.includes(feature)) {
    return {
      allowed: false,
      upsell: {
        reason: 'trial_live_only',
        message:
          'This feature is part of full Tour Guide access. Your trial only includes Live Translator.',
        messageMm:
          'ဒီ feature ကတော့ Full Tour Guide access အတွက်ပါ။ Trial version မှာတော့ Live Translator ပဲ ရနိုင်ပါတယ်။',
        cta: { label: 'Get full access', action: 'request_full_access' },
      },
    };
  }
  return { allowed: true };
}
