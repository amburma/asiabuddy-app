import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { resolveAccountFromRequest } from '@/lib/tour-guide/auth';
import { recordUsage, recordTrialUsage, getAccountStatus, TourGuideSource, BASE_RATE_USD_PER_HOUR } from '@/lib/tour-guide/costGateService';

// Live Translate cost basis: ~$2.22/hour ≈ $0.0006167/second
// This is the actual measured cost basis from pilot data
const LIVE_TRANSLATE_COST_PER_SECOND = 0.0006167;

const usageSchema = z.object({
  durationSeconds: z.number().min(0),
  isFinal: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Step 1: Verify session token from cookie
    const session = await resolveAccountFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized — valid session required' },
        { status: 401 }
      );
    }

    // Step 2: Parse and validate request body
    const body = await req.json();
    const parsed = usageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { durationSeconds, isFinal = false } = parsed.data;

    // Step 3: Calculate cost based on duration
    const costUsd = durationSeconds * LIVE_TRANSLATE_COST_PER_SECOND;

    // Step 4: Record usage based on account source
    let usageResult;
    if (session.source === 'trial') {
      usageResult = await recordTrialUsage(session.accountId, Math.ceil(durationSeconds));
    } else {
      usageResult = await recordUsage(session.accountId, 'live-translate', costUsd);
    }

    // Step 5: Get updated account status
    const status = await getAccountStatus(session.accountId);

    // Step 6: Return updated balance and exhaustion status
    const isExhausted = session.source === 'trial'
      ? (status.trialSecondsRemaining ?? 0) <= 0
      : !status.isActive;

    // Calculate remaining USD in current window for package/purchased accounts
    const remainingUsd = session.source === 'trial' 
      ? undefined 
      : Math.max(0, BASE_RATE_USD_PER_HOUR - status.currentWindowCostUsd);

    return NextResponse.json({
      success: true,
      usageRecorded: usageResult.success,
      costUsd: session.source === 'trial' ? undefined : costUsd,
      durationSeconds,
      accountStatus: {
        remainingHours: status.remainingHours,
        remainingUsd,
        remainingSeconds: status.trialSecondsRemaining,
        warning: status.warning,
      },
      isExhausted,
      isFinal,
    });
  } catch (error) {
    console.error('Live translate usage error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
