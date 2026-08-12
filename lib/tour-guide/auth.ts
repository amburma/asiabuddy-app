import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';
import { supabaseAdmin } from './supabaseAdmin';
import type { TourGuideSource } from './costGateService';

// ---------------------------------------------------------------------------
// Password hashing
// ---------------------------------------------------------------------------
// bcryptjs (pure JS) chosen over native bcrypt so this works in both the
// Node and Edge runtimes with no native build step. This subsystem's
// account-creation volume is low and manual (admin hand-creates
// purchased/trial accounts; package accounts are auto-issued one at a time
// at booking confirmation), so bcryptjs's slower hashing speed is not a
// concern here.
//
// npm install bcryptjs   (+ npm install -D @types/bcryptjs)
const SALT_ROUNDS = 10;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ---------------------------------------------------------------------------
// Session token (signed JWT in an httpOnly cookie)
// ---------------------------------------------------------------------------
// This is genuinely new territory for the codebase: investigation confirmed
// there was no customer-facing session mechanism before Tour Guide (admin
// dashboard uses Supabase Auth; every other customer surface — inquiry,
// booking, web chat — is unauthenticated or Telegram-identified).
//
// Design chosen: self-contained signed JWT ({accountId, source}) in an
// httpOnly cookie, verified with `jose` (Web Crypto based — works in both
// the Node and Edge runtimes App Router routes can run in), rather than a
// server-side session table. Every feature route already has to hit
// CostGateService's account-status lookup on every request regardless
// (plan §4.1 step 4), so a DB-backed session would just be a second,
// redundant round-trip for no real benefit here.
//
// Known trade-off: this means there's no way to force-revoke one specific
// session early. An admin disabling an account mid-session still works —
// CostGateService's `status === 'active'` check catches it on the very
// next feature call — but the browser will hold a technically-still-valid
// token until it expires. Acceptable for v1. If a "force logout now" admin
// action is ever needed, add a `token_version` column to
// tour_guide_accounts and check it in verifySessionToken() — don't try to
// solve it by shortening SESSION_DURATION_SECONDS, that just makes package/
// purchased customers re-login constantly instead.
//
// npm install jose

const COOKIE_NAME = 'tg_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSecretKey() {
  const secret = process.env.TOUR_GUIDE_JWT_SECRET;
  if (!secret) {
    throw new Error('TOUR_GUIDE_JWT_SECRET env var is not set');
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  accountId: string;
  source: TourGuideSource;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.accountId !== 'string' || typeof payload.source !== 'string') {
      return null;
    }
    return { accountId: payload.accountId, source: payload.source as TourGuideSource };
  } catch {
    return null; // expired / tampered / malformed — all treated as "not logged in"
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_DURATION_SECONDS,
};

/**
 * Reads + verifies the session cookie from an incoming request.
 * Returns null (never throws) when there's no valid session — callers
 * decide whether that should be a 401.
 */
export async function resolveAccountFromRequest(req: NextRequest): Promise<SessionPayload | null> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// ---------------------------------------------------------------------------
// Credential lookup (used by the login route)
// ---------------------------------------------------------------------------

export interface LoginResult {
  accountId: string;
  source: TourGuideSource;
}

export type LoginFailureReason = 'not_found' | 'disabled' | 'bad_password';

/**
 * Looks up a tour_guide_accounts row by username and verifies the password.
 * Deliberately returns a distinguishable reason internally (for logging)
 * but the login route should surface the same generic "Invalid username or
 * password" message for all failure reasons — don't leak which one.
 */
export async function verifyCredentials(
  username: string,
  password: string
): Promise<{ ok: true; result: LoginResult } | { ok: false; reason: LoginFailureReason }> {
  const { data: account, error } = await supabaseAdmin
    .from('tour_guide_accounts')
    .select('id, source, status, password_hash')
    .eq('username', username)
    .maybeSingle();

  if (error) throw error;
  if (!account) return { ok: false, reason: 'not_found' };
  if (account.status !== 'active') return { ok: false, reason: 'disabled' };

  const passwordOk = await verifyPassword(password, account.password_hash);
  if (!passwordOk) return { ok: false, reason: 'bad_password' };

  return {
    ok: true,
    result: { accountId: account.id, source: account.source as TourGuideSource },
  };
}
