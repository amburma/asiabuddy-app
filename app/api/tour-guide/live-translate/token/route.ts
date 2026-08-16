import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { resolveAccountFromRequest } from '@/lib/tour-guide/auth';
import { assertBudgetAvailable, getAccountStatus, BASE_RATE_USD_PER_HOUR } from '@/lib/tour-guide/costGateService';

// Ephemeral token lifetime: 5 minutes
const EPHEMERAL_TOKEN_DURATION_SECONDS = 5 * 60;

function getEphemeralSecretKey() {
  const secret = process.env.TOUR_GUIDE_JWT_SECRET;
  if (!secret) {
    throw new Error('TOUR_GUIDE_JWT_SECRET env var is not set');
  }
  return new TextEncoder().encode(secret);
}

export interface EphemeralTokenPayload {
  accountId: string;
  source: string;
  exp: number;
  iat: number;
}

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

    // Step 2: Check budget availability (pre-flight gate)
    const status = await assertBudgetAvailable(session.accountId);

    // Step 3: Determine token expiry based on remaining budget
    // For trial accounts, expire sooner to force re-check of remaining seconds
    // For package/purchased, use standard 5-minute duration
    let tokenDuration = EPHEMERAL_TOKEN_DURATION_SECONDS;
    
    if (status.source === 'trial') {
      // Trial accounts get shorter-lived tokens (2 minutes) to ensure
      // frequent re-verification of remaining seconds
      tokenDuration = 2 * 60;
    } else {
      const windowBudgetRemaining = BASE_RATE_USD_PER_HOUR - status.currentWindowCostUsd;
      if (windowBudgetRemaining < 0.50) {
        // Low budget accounts get shorter-lived tokens (2 minutes) to prevent
        // running significantly over cap during a long session
        tokenDuration = 2 * 60;
      }
    }

    // Step 4: Mint ephemeral token
    const ephemeralToken = await new SignJWT({
      accountId: session.accountId,
      source: session.source,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${tokenDuration}s`)
      .sign(getEphemeralSecretKey());

    // Step 5: Return token with metadata
    const remainingUsd = BASE_RATE_USD_PER_HOUR - status.currentWindowCostUsd;
    
    return NextResponse.json({
      success: true,
      token: ephemeralToken,
      expiresIn: tokenDuration,
      accountStatus: {
        remainingHours: status.remainingHours,
        remainingUsd: Math.max(0, remainingUsd),
        warning: status.warning,
      },
    });
  } catch (error) {
    // Handle CostGateError specifically
    if (error instanceof Error && error.name === 'CostGateError') {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    console.error('Live translate token error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
