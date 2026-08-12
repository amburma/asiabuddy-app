import { createClient } from '@supabase/supabase-js';

/**
 * Service-role client, dedicated to the Tour Guide subsystem.
 *
 * Why service-role and not the anon/session client (Pattern A/C in the
 * codebase): RLS on tour_guide_accounts / tour_guide_usage /
 * tour_guide_trial_usage / feature_cost_config grants access only via
 * `auth.role() = 'authenticated'` (i.e. admin dashboard sessions). Tour
 * Guide customers authenticate with a custom username/password stored in
 * tour_guide_accounts itself — they are NOT Supabase Auth users, so
 * `auth.uid()` is null for them and no anon/public policy exists on any of
 * the 4 tables. Every customer-facing read/write must therefore go through
 * server-side API routes using the service role key, exactly like
 * app/api/inquiry/route.ts and app/api/upload-payment-proof/route.ts do
 * (Pattern B). See AsiaBuddy_TourGuide_Progress_Log.md, Phase 0 table.
 *
 * Do not import this client into anything that runs in the browser.
 */
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
