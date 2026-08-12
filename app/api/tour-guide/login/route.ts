import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  verifyCredentials,
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from '@/lib/tour-guide/auth';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { username, password } = parsed.data;
    const check = await verifyCredentials(username, password);

    if (!check.ok) {
      // Same generic message for not_found / bad_password / disabled —
      // standard practice, don't tell an attacker which part was wrong.
      // check.reason is still available above for server-side logging if
      // you want to add rate-limiting/lockout later.
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = await createSessionToken(check.result);

    const response = NextResponse.json({
      success: true,
      data: { source: check.result.source },
    });
    response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
