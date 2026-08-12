import { NextResponse } from 'next/server';
import {
  assertBudgetAvailable,
  CostGateError,
  type AccountStatus,
  type TourGuideFeature,
} from './costGateService';
import { checkFeatureAccess } from './featureGateService';

export interface GateSuccess {
  ok: true;
  status: AccountStatus;
}
export interface GateFailure {
  ok: false;
  response: NextResponse;
}
export type GateResult = GateSuccess | GateFailure;

/**
 * The single chokepoint every /api/tour-guide/* route calls before doing
 * anything else, matching the plan §2.1 flow:
 *   [Cost Gate] --(exhausted)--> blocked, "limit reached"
 *       |
 *   [Feature Gate] --(trial + non-live)--> blocked, upsell
 *
 * Response shapes follow the existing route conventions used elsewhere in
 * the codebase ({ error }, { status }) — see app/api/inquiry/route.ts etc.
 *
 * Usage in a feature route:
 *
 *   export async function POST(req: NextRequest) {
 *     try {
 *       const accountId = await resolveAccountId(req); // Phase 1 concern, see note below
 *       const gate = await gateFeatureRequest(accountId, 'text');
 *       if (!gate.ok) return gate.response;
 *
 *       // ... call Translate API, compute amountUsd from the response ...
 *       const usage = await recordUsage(accountId, 'text', amountUsd);
 *       if (!usage.success) {
 *         // lost the race against another tab between assertBudgetAvailable()
 *         // and recordUsage() — surface the same "limit reached" response
 *         return NextResponse.json({ error: 'Hours have been used up' }, { status: 429 });
 *       }
 *
 *       return NextResponse.json({
 *         success: true,
 *         data: { translation: '...' },
 *         remainingHours: gate.status.source === 'trial' ? undefined : usage.remainingUsd,
 *         warning: usage.warning,
 *       });
 *     } catch (err) {
 *       console.error(err);
 *       return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 *     }
 *   }
 *
 * NOTE on resolveAccountId(): session/credential validation for
 * tour_guide_accounts (booking-credential or admin-issued username/password)
 * is genuinely new territory in this codebase — there is currently no
 * customer login mechanism at all (see investigation notes: admin-only
 * Supabase Auth, no cookies/JWT for customers). That's Phase 1 scope per
 * the roadmap, not part of this Phase 0 gate. gateFeatureRequest() takes a
 * resolved accountId so it stays decoupled from however that ends up being
 * built (signed cookie, JWT, etc.).
 */
export async function gateFeatureRequest(
  accountId: string,
  feature: TourGuideFeature
): Promise<GateResult> {
  let status: AccountStatus;
  try {
    status = await assertBudgetAvailable(accountId);
  } catch (err) {
    if (err instanceof CostGateError) {
      const httpStatus = err.code === 'NOT_FOUND' ? 401 : 429;
      return {
        ok: false,
        response: NextResponse.json({ error: err.message }, { status: httpStatus }),
      };
    }
    throw err;
  }

  const featureCheck = checkFeatureAccess(status.source, feature);
  if (!featureCheck.allowed) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Feature not available on this account', upsell: featureCheck.upsell },
        { status: 403 }
      ),
    };
  }

  return { ok: true, status };
}
