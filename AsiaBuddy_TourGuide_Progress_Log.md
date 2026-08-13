# AsiaBuddy "Tour Guide" — Build Progress Log
> Started: 12 August 2026 (session continuing from AsiaBuddy_TourGuide_Project_Plan.md)
> Last verified against live codebase: 13 August 2026 — see "Auth + Gate services" entry under Phase 0
> This file is the running source of truth for what's actually been built and verified,
> as opposed to what the original plan documents *proposed*. Where this log and the
> plan documents disagree, this log wins — it reflects verified reality.

---

## Phase 0 — Foundation: ✅ COMPLETE (core cost-enforcement logic)

### Schema conflicts found vs. original plan (§3 of AsiaBuddy_TourGuide_Project_Plan.md)

| Plan assumption | Reality (verified) | Resolution |
|---|---|---|
| `admin_users` table exists, `created_by_admin_id references admin_users(id)` | No `admin_users` table. Admin auth is Supabase Auth + `auth.role()='authenticated'` checks. | Changed FK to `references auth.users(id)` |
| `bookings` has a duration/tour-days column, or a `tour_id` FK to `tours` | Neither exists. `bookings.tour_type` is a category label (`'tour'`, `'flight'`, `'car'`, `'taxi'`), not a duration or FK. No link from `bookings` to `tours` at all. | Added nullable `bookings.tour_days integer` column (migration `20260813`). **Superseded 13 Aug 2026** — see "Plan Deviation" section below: this column is no longer part of the active flow; `tour_days` is instead entered directly on the Tour Guide admin account-creation form. The `bookings.tour_days` column itself is harmless and left in place, just unused by the current flow. |
| User-scoped RLS (`auth.uid()`) pattern | Existing project convention uses `auth.role()='authenticated'` for admin access; no `auth.uid()`-scoped policies exist anywhere in the codebase. | Followed existing convention. Also identified that `tour_guide_accounts` customers authenticate via custom username/password stored in that table — they are **not** Supabase Auth users, so `auth.uid()` would be null for them regardless. All customer-facing access must go through API routes using the service role key; RLS only grants admin (`auth.role()='authenticated'`) access, no anon/public policy on any of the 4 tables. |
| `increment_tour_guide_usage()` (§3.2) is a plain increment, no cap check | §2.3 explicitly requires check-and-deduct to be atomic to prevent concurrent-tab budget overshoot; a plain increment doesn't satisfy that. | Rebuilt with `SELECT ... FOR UPDATE` row lock + cap check inside the same transaction. Verified via 20-way concurrent test (see below). |
| Plan doesn't specify where `p_cap_usd` comes from for the increment function | — | Decided to compute the cap **inside** the SQL function (not in app code) by reading `tour_guide_accounts.source` + `total_hours_allocated` and applying the §1.2 tier rates. Keeps the one source of truth in the DB. Trade-off: rates are hardcoded in the function body — a pricing change requires a new migration (`CREATE OR REPLACE FUNCTION`), not a config-table edit. Acceptable for v1; revisit if pricing changes become frequent (Phase 6). |
| `tour_guide_trial_usage` has no described atomic function | — | Added `increment_tour_guide_trial_usage()`, same lock pattern, fixed 120s (2 min) cap, and raises an error if called against a non-`trial` account (verified). |

### Migrations applied (in order) — all verified against live DB

1. **`20260811_create_tour_guide_foundation.sql`**
   Creates `tour_guide_accounts`, `tour_guide_usage`, `tour_guide_trial_usage`, `feature_cost_config`. RLS enabled on all 4, single "admin full access" policy per table (`auth.role()='authenticated'`), no anon/public policy.
   ✅ Verified: 4 tables exist, RLS `true` on all 4, 4 policies exist.

2. **`20260812_create_increment_tour_guide_usage_function.sql`**
   First version of `increment_tour_guide_usage(p_account_id, p_feature, p_amount, p_cap_usd)` — atomic, caller-supplied cap.
   ✅ Applied and sanity-tested, later **superseded** by migration 4 below (signature changed).

3. **`20260813_add_tour_days_to_bookings.sql`**
   Adds `bookings.tour_days integer` (nullable, `check (tour_days is null or tour_days > 0)`).
   ✅ Verified: column exists, type `integer`, nullable.

4. **`20260814_redefine_tour_guide_functions.sql`**
   - Drops the 4-arg `increment_tour_guide_usage()` from migration 2, replaces with 3-arg version `(p_account_id, p_feature, p_amount)` that computes the cap internally (package: `hours × $0.15`, purchased: `hours × $1.50`, trial: raises an error).
   - Adds `increment_tour_guide_trial_usage(p_account_id, p_seconds)` — same atomic pattern, fixed 120s cap, rejects non-trial accounts.
   ✅ Verified: both functions exist with correct signatures.

### Test results (all against live Supabase DB, via SQL Editor + one Windsurf-run Node script)

| Test | Result |
|---|---|
| Package tier: $1.00 call then $0.60 call against $1.50 cap (10hr × $0.15) | `true/1.00/0.50` then `false/1.00/0.50` (unchanged) — ✅ |
| Purchased tier: $1.50 call against $1.50 cap (1hr × $1.50) | `true/1.50/0.00` — ✅ |
| Trial: 100s call then 30s call against 120s cap | `true/100/20` then `false/100/20` (unchanged) — ✅ |
| Guard: trial account calling `increment_tour_guide_usage()` (the cost function) | Raises `increment_tour_guide_usage() is not valid for source=trial; ...` as designed — ✅ |
| Concurrency: 20 parallel calls, $0.10 each, $1.05 cap, via Node script (`@supabase/supabase-js`, service role key) | Exactly 10 successes, 10 rejections, 0 errors, final `total_cost_usd = 1.00` (never exceeded cap) — ✅ |

**Note on test methodology:** several early test runs gave inconsistent results (e.g. Test B `purchased` tier) — root cause was leftover rows from earlier failed/duplicate test runs, not a function bug. Lesson for future testing in this project: always run a full cleanup of fixed test UUIDs *before* a fresh test attempt, not only after.

### Auth + Gate services (found already built, now verified + committed)

The following were discovered already implemented in a prior session but not yet
reflected in this log:

- `lib/tour-guide/auth.ts` — bcryptjs password hashing, jose-based JWT session
  tokens (30-day expiry), httpOnly `tg_session` cookie, `verifyCredentials()` 
  against `tour_guide_accounts` 
- `lib/tour-guide/costGateService.ts` — `assertBudgetAvailable()`,
  `getAccountStatus()`, `recordUsage()`, `recordTrialUsage()` — this IS the
  CostGateService listed as an open item below; it already exists
- `lib/tour-guide/featureGateService.ts` — `checkFeatureAccess()`, trial tier
  restricted to `TRIAL_ALLOWED_FEATURES = ['live']` — this IS the
  FeatureGateService listed as an open item below; it already exists
- `lib/tour-guide/gate.ts` — `gateFeatureRequest()`, unified cost+feature gate
  combining the two services above
- `lib/tour-guide/supabaseAdmin.ts` — service-role client for this subsystem
- `app/api/tour-guide/login/route.ts` — POST endpoint, validates credentials
  via `verifyCredentials()`, issues `tg_session` cookie
- `app/api/tour-guide/logout/route.ts` — POST endpoint, clears the session
  cookie

No git history existed for these files as of verification — they were
untracked. Committed as `7fdf66ef` (git log confirms this; run
`git show --stat 7fdf66ef` for the exact file list). Not yet pushed to origin
as of this log entry.

Confirmed NOT to exist yet (verified by searching `components/` and `app/`):
"Tour Guide" nav entry, login form UI, any dashboard page. This remains the
actual Phase 0 blocker.

---

## Plan Deviation — `package` account creation is now manual (13 Aug 2026)

Investigation of the paid-invoice flow found: (1) "booking confirmation" is a
Telegram bot approve/reject callback, not an admin form — no code hook point
exists there without modifying the bot; (2) `paid_invoices` table has no
`booking_id` column and no FK to `bookings` — it's a fully freeform invoice
creator matched on typed-in customer details, not a booking row.

Decision: abandon auto-issuance of `package` tour_guide_accounts at booking
confirmation (as originally specified in Project Plan §3.1). All three
sources (`package`, `purchased`, `trial`) are now created through the single
manual Admin Panel form originally scoped for `purchased`/`trial` only
(§7.1) — admin enters `tour_days` by hand for package customers (looking up
the actual booking manually), with an optional free-text `booking_id` field
for record-keeping only, not a functional dependency.

Impact: the Admin Panel creation form (originally Phase 5) is now a Phase 0/1
blocker, not a later-phase item — no tour_guide_accounts row of ANY source
can exist without it. Roadmap reordered accordingly.

Cancelled: adding a `tour_days` field to the paid-invoice Zod
schema/UI (previously planned Task 1.1) — no longer needed.

---

## Task 0.8 — Dashboard Shell: ✅ COMPLETE (14 Aug 2026)

- `app/tourguide/dashboard/page.tsx` — server component, checks `tg_session` 
  cookie via `verifySessionToken`, redirects to `/tourguide` if invalid.
  Fetches account data via `supabaseAdmin`. For package/purchased, computes
  `hours_remaining = total_hours_allocated - (total_cost_usd / rate)` 
  (rate: package=0.15, purchased=1.5) — code comment added flagging that
  these rate constants must stay in sync with `increment_tour_guide_usage()` 
  in migration `20260814` if pricing ever changes. For trial, shows
  `seconds_used / 120`. 2x2 feature grid, Obsidian/Ivory/Gold palette
  matching the login form, trial accounts see only Live Translator enabled.
  Logout route (`app/api/tour-guide/logout/route.ts`) confirmed to already
  exist from a prior session — was not recreated.

- **Process note:** this commit (`5b9b7c36`) also swept in 4 unrelated files
  from prior sessions via a wildcard `git add` — all turned out to be
  pre-existing and harmless on inspection, but going forward, prompts to
  Windsurf must specify exact filenames for `git add`, never a wildcard.

### Bug found + fixed: package accounts got `total_hours_allocated = 0` 

Discovered while auditing the commit above. `app/api/admin/tour-guide/create-account/route.ts` 
hardcoded `total_hours_allocated = 0` for `source='package'`, with a stale
comment referencing the abandoned "auto-issuance at booking confirmation"
flow (see the Plan Deviation entry above — that flow was abandoned on 13 Aug
2026 in favor of manual admin entry, but the code was never updated to
match). Net effect: every package account was created with a $0 cap,
meaning `increment_tour_guide_usage()` would reject every single call
immediately (`0 + amount > 0` cap) — the feature would have been completely
unusable for package customers.

**Fix (commit `b1611923`):**
- `app/admin/tour-guide/page.tsx`: package account form now requires a
  `tour_days` number input; `booking_id` is now optional (record-keeping
  only, matches the documented decision that it's not a functional
  dependency)
- `app/api/admin/tour-guide/create-account/route.ts`: Zod schema now
  validates `tour_days` as a positive integer for package accounts;
  `total_hours_allocated = tour_days * 2` computed server-side; stale
  comment removed

**Lesson for future audits:** always check hardcoded/placeholder values
(`= 0`, `= null`, `// TODO`) left behind when a planned flow gets abandoned
mid-build — the surrounding code doesn't always get updated to match the new
plan, and this class of bug won't throw an error, it just silently produces
wrong data.

### Progress log now tracked in git (commit `e75b5792`)

This file was untracked until 14 Aug 2026 — meaning a fresh Windsurf session
starting from a different local checkout would not have had any of this
history available, including the plan-deviation decision that caused the
bug above. Now committed and pushed.

---

## Phase 3 — Voice Q&A: ✅ COMPLETE (13 Aug 2026)

### What was built

- `app/api/tour-guide/voice-qa/route.ts` — new API endpoint following the established translate/ocr pattern (gate → parse → generateContent → recordUsage). Text-only output, package/purchased sources only (trial excluded via feature gate). Accepts audio input (base64-encoded) and returns text responses.

### Audio pricing bug found + fixed

Discovered that `lib/tour-guide/geminiConfig.ts`'s `PRICING_PER_M_TOKENS` only had text input rates. According to Google's official pricing page (ai.google.dev/gemini-api/docs/pricing, verified 13 Aug 2026), audio input on `gemini-3.1-flash-lite` costs $0.50/M tokens vs $0.25/M for text (2x). 

**Fix:** Updated `PRICING_PER_M_TOKENS` structure to `{ input: { text: number; audio: number }, output: number }` and modified `computeCostUsd()` to accept an optional `inputType` parameter (defaults to `'text'` for backward compatibility with existing translate/ocr routes). The voice-qa route now calls `computeCostUsd(usage, model, { inputType: 'audio' })` to bill at the correct audio rate.

### TourGuideFeature type extended

- File: `lib/tour-guide/costGateService.ts`
- Change: Added `'voice-qa'` to the `TourGuideFeature` union type: `export type TourGuideFeature = 'text' | 'ocr' | 'voice' | 'voice-qa' | 'live';`

**Step 2C investigation results:** No exhaustive switch/lookup updates were needed. The type is used in:
- `gate.ts` — only as parameter types, no exhaustive switches
- `featureGateService.ts` — `TRIAL_ALLOWED_FEATURES` array (checked via `.includes()`) and `checkFeatureAccess()` function (no exhaustive pattern matching)

The new `'voice-qa'` member integrates automatically with existing gate logic; trial accounts are correctly blocked (not in `TRIAL_ALLOWED_FEATURES`) and package/purchased accounts can access it without code changes.

### Commit

- **Hash:** `b82e4feb`
- **Message:** "Phase 3 (Voice Q&A): Add voice-qa feature with audio pricing fix"
- **Files:** `lib/tour-guide/geminiConfig.ts`, `lib/tour-guide/costGateService.ts`, `app/api/tour-guide/voice-qa/route.ts`

### Open items carried forward

- [ ] **Frontend UI for voice-qa** — recording button, audio upload flow, displaying the text response. Only the API route exists now (backend-first approach, matching how OCR/translate were implemented).

---

## Open items carried forward (not yet built)

- [ ] **Phase 0:** genuinely complete as of 14 Aug 2026 — schema, atomic
      functions, auth, gate services, admin creation form (all 3 sources,
      package bug fixed), customer dashboard. Nothing known outstanding.
- [ ] **Phase 3:** Frontend UI for voice-qa (recording button, upload flow, response display) — backend route complete.
- [ ] Whether `feature_cost_config` (currently unused by the increment functions, which hardcode their own rates) should later drive the tier rates instead of the hardcoded `0.15` / `1.50` constants — deferred, not blocking
- [ ] All other Phase 1–6 items exactly as listed in `AsiaBuddy_TourGuide_Project_Plan.md` §8, unchanged (Phase 1's `tour_days`-on-invoice task is cancelled per the Plan Deviation entry above — do not resurrect it)

---

## Cross-session working note

**This file must stay tracked in git and be read at the start of every new
session** (Windsurf or otherwise) before making any Tour Guide changes — it
is the only place decisions like the Plan Deviation (13 Aug) are recorded.
The Project Plan document (`AsiaBuddy_TourGuide_Project_Plan.md`) is now
stale in several places (§3.1 auto-issuance, §7.1 form scope) and should not
be treated as current truth where this log contradicts it.

---

## Working conventions established this session (for future Windsurf prompts)

- Migration filenames: `YYYYMMDD_description.sql`, one purpose per file
- Every migration gets applied via Supabase SQL Editor (not CLI — not installed on this machine) and verified with a follow-up `information_schema`/`pg_proc`/`pg_policies` query before moving on
- Windsurf is used for: file creation/editing in the repo, git commit/push, and read-only investigation of the codebase — **never** for direct DB access (no CLI, no stored credentials given to it for this purpose)
- Test data uses fixed placeholder UUIDs (`...a1`, `...b1`, `...c1` pattern) — must be cleaned up **before**, not just after, each test run
