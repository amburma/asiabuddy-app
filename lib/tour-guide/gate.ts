import { NextRequest, NextResponse } from 'next/server';
import {
  assertBudgetAvailable,
  CostGateError,
  type AccountStatus,
  type TourGuideFeature,
} from './costGateService';
import { checkFeatureAccess } from './featureGateService';
import { resolveAccountFromRequest } from './auth';

export interface GateSuccess {
  ok: true;
  accountId: string;
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
 * Most routes should use gateFeatureRequestFromReq() below, not this one
 * directly — it takes an already-resolved accountId, which is useful for
 * the Live Translator streaming tick loop (resolves session once at
 * connection time, not on every tick).
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

  return { ok: true, accountId, status };
}

/**
 * Convenience wrapper for the common case: resolve the session cookie
 * (lib/tour-guide/auth.ts) AND run the Cost Gate + Feature Gate, in one
 * call. Most /api/tour-guide/* routes should use this.
 */
export async function gateFeatureRequestFromReq(
  req: NextRequest,
  feature: TourGuideFeature
): Promise<GateResult> {
  const session = await resolveAccountFromRequest(req);
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Unauthorized - Invalid or missing session' },
        { status: 401 }
      ),
    };
  }
  return gateFeatureRequest(session.accountId, feature);
}
