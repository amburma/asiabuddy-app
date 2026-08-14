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

---

## Phase 3 — Voice Translator (formerly "Voice Q&A"): ✅ COMPLETE

### Context correction vs. original Progress Log

The original Progress Log (Phase 0) predates significant work that had
already landed by the start of this session:

- `lib/tour-guide/auth.ts` — JWT session auth (jose library, httpOnly
  `tg_session` cookie, 30-day expiry) for `tour_guide_accounts` 
  customers. Confirmed via investigation; this was not reflected in
  the original log.
- Phase 3 backend for the voice feature (then called "Voice Q&A") had
  already been pushed to origin (commit `b82e4feb`) along with an
  earlier Progress Log entry (commit `e23b3643`), with frontend UI
  built but held back locally due to an active audio bug — resolved
  this session (see below).

### Bug 1 — Audio capture (TWO separate bugs, found and fixed sequentially)

**Documentation correction:** an earlier draft of this log described
Bug 1 as a single "stale closure" issue. On review, this was actually
**two distinct bugs**, found one after the other:

**Bug 1a — Silent/near-empty audio reaching Gemini (RMS issue)**

- **Symptom:** Speaking "what is 2 plus 2" returned a completely
  unrelated answer (e.g. about the nearest metro station to the
  Eiffel Tower), despite Gemini's `usageMetadata` showing a non-zero
  `AUDIO` token count — meaning some audio data *did* reach the model,
  but the model appears to have hallucinated a plausible-sounding
  "tour guide" answer rather than admitting it couldn't understand the
  input, because the prompt at the time forbade any "notes" or
  "explanations."
- **Root cause:** `blob.size` was being used as a proxy for "did the
  user actually say something," but WebM/Opus encodes silence at a
  roughly constant bitrate — so a silent clip and a spoken clip of the
  same duration can be nearly the same file size. A near-silent
  recording was passing the size check and reaching Gemini as valid
  audio.
- **Fix:** Replaced the byte-size heuristic with real silence
  detection: decode the recorded audio via the Web Audio API and
  compute RMS (root-mean-square) loudness across the whole clip. If
  RMS falls under an empirically-set threshold, the recording is
  rejected client-side before ever calling Gemini (saves cost and
  removes the hallucination risk at the root).

**Bug 1b — Stale closure dropping/truncating chunks (found in a later test)**

- **Symptom:** After the RMS fix, a different test scenario (found
  separately, not the same "what is 2 plus 2" case above) still
  produced empty/truncated blobs — audio base64 payloads suspiciously
  short (1,312–7,724 chars) for the spoken content.
- **Root cause:** `ondataavailable` pushed chunks via `setAudioChunks()` 
  (React state), while `onstop` read `audioChunks` from a stale
  closure scope instead of the updated state.
- **Fix:** Replaced state-based chunk collection with `useRef` 
  (`audioChunksRef`) in `TourGuideVoiceQAForm.tsx`. Verified: base64
  lengths after the fix ranged 32,684–151,196 chars, with
  transcriptions correctly matching spoken audio.

**Both fixes are required and complementary** — 1a prevents cost/
hallucination from near-silent input reaching Gemini at all; 1b
ensures that when there *is* real speech, the full recording (not a
truncated fragment) is what gets sent.

### Bug 2 — Single/short-word mistranslation

**Symptom:** Isolated short words (e.g. "အိမ်သာ" = toilet) mistranslated
to unrelated English words ("Still", "Subway").

**Root cause:** No minimum recording duration was enforced — a quick
press-release could produce a sub-second, effectively empty clip.

**Fix:** Added a 700ms minimum-duration guard in `handleRecordStop` 
(delays `mediaRecorder.stop()` via `setTimeout` if recording is under
700ms, rather than rejecting the attempt). Also added a short-phrase
hint in the transcription prompt ("a short utterance is often a
complete travel-related question... not separate unrelated words").

**Known limitation (not a bug, not fully solved):** very short,
isolated single-word utterances remain somewhat more error-prone than
full phrases/sentences even after the 700ms duration guard — inherent
to the underlying audio model's need for context. Full travel
questions/sentences (the feature's primary intended use case) tested
reliably accurate, including a verified 6-sentence, multi-clause
Burmese question (hunger → restaurant hours → bus schedule) translated
with full fidelity to English.

### Bug 3 — `targetLanguage` missing from request (400 "Missing required fields")

**Root cause:** `handleVoiceSubmit(audio, mimeType)` never accepted
`targetLanguage` as a parameter and relied on non-working closure
access, sending `targetLanguage: undefined`.

**Fix:** Added `targetLanguage` as an explicit third parameter, passed
from the `onstop` call site.

### Bug 4 — `mimeType` schema mismatch (400 "Missing required fields")

**Root cause:** Zod schema required `mimeType: z.literal('audio/webm')` 
(exact match) but the client always sends `'audio/webm;codecs=opus'` 
(required for valid WebM/Opus encoding).

**Fix:** Relaxed the schema to
`z.string().refine(v => v.startsWith('audio/webm'))`.

### Bug 5 — Output format: Q&A vs. Translation-only

**Documentation correction:** an earlier draft of this log stated the
backend was changed to return `{ question: original, answer:
translation }`, rendered as "Q:" / "A:" bubbles in the UI. **This is
NOT the final design and should not be treated as current behavior.**

The confirmed, final, intentional design (per explicit product
decision) is: **translation-only output**. The feature takes spoken
audio in one language and returns *only* a faithful translation of
what was said into `targetLanguage` — it does **not** answer questions
using Gemini's own knowledge, and does **not** echo back the original-
language transcript to the user. This mirrors the existing Text
Translate feature's behavior exactly, with voice as the input method
instead of typing.

- Frontend: `QAEntry { question, answer }` → `TranslationEntry
  { translation, timestamp }`; history UI shows a single translation
  bubble per recording ("Recording N: <translation>"), not "Q:"/"A:"
  pairs.
- Backend: Gemini prompt instructs transcribe-then-translate, output
  the translation only; response shape is `{ translation }`, not
  `{ question, answer }`.
- **CONFIRMED: resolved in commits `8147023e` (backend) and
  `7649aec8` (frontend)** — verified by reading the raw, current file
  content of both `route.ts` and `TourGuideVoiceQAForm.tsx` directly
  (not trusting a diff summary alone), confirming the response shape,
  prompt, and rendered UI all match the translation-only design. Also
  confirmed usage is recorded via `recordUsage()` *before* the
  `UNCLEAR_AUDIO` early-return, so real Gemini API cost is tracked
  even when the audio is unclear.

### Production prompt (translation-only design, confirmed live)

```
Listen to the audio and transcribe exactly what was said internally.
Pay close attention to short phrases and compound words — a short
utterance is often a complete travel-related question or request
(e.g. asking for a location, price, or direction), not separate
unrelated words.

Translate what was said into ${targetLanguage}.

Output ONLY the translation — do not answer any question implied by
the speech, do not add advice or extra information, do not include
the original-language transcript, no notes, no quotation marks.

If the audio is completely silent or unintelligible, respond with
exactly: UNCLEAR_AUDIO
```

*(Verify this matches what's actually deployed — see the
re-verification note under Bug 5 above.)*

### UI additions (Voice, Text, Photo pages — all 3)

- **Home button** — relative link to `/thailand` (not a hardcoded
  localhost/absolute URL, so it works correctly in production) — top
  header row, all 3 pages.
- **Log out button** — `POST /api/tour-guide/logout` (existing route,
  clears `tg_session` cookie) then redirect to `/tourguide` — top
  header row, all 3 pages, matching the dashboard's existing logout
  pattern.
- **Clear button** — right-aligned on the "Translate to" /
  "Response language" row (NOT in the top header — corrected after an
  initial placement mistake):
  - Voice: "Clear History" — `setHistory([])` 
  - Text: "Clear" — resets `sourceText`, `translation`, `error` 
  - Photo: "Clear" — calls existing `clearImage()` (already resets
    `previewUrl`/`pendingImage`) plus `setExtractedText('')` and
    `setTranslation('')` 
- **Floating widgets** — `FloatingContactButtonLoader` (bottom-left)
  and `FloatingChatButtonLoader` (bottom-right), the same Quick
  Inquiry / HumanOperatorChat widgets used on `/thailand`, added to
  all 3 tour-guide pages at the `page.tsx` level using the same
  `normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)` language
  pattern as `app/[country]/layout.tsx`, with `country="thailand"` 
  hardcoded (tour-guide is Thailand-only for now).

### Naming/label update (display only — NOT the route/feature-key rename)

- Dashboard card: "Voice Q&A" → **"Voice Translator"**; description
  "Ask questions and get voice answers" → **"Record your voice
  clearly to translate."**
- Voice page header title: "Voice Q&A" → **"Voice Translator"**

This is purely a UI-label change. The underlying route
(`/api/tour-guide/voice-qa`), feature key (`'voice-qa'` in
`TourGuideFeature` type and `TRIAL_ALLOWED_FEATURES`), component file
name (`TourGuideVoiceQAForm.tsx`), and any DB usage-history rows under
the old key are all **still pending** — see Open Items below.

---

## Phase 4 — Live Translator: architecture & pricing decisions (planning, not yet built)

### Budget architecture decision

**Decision: keep the existing hours-based system as-is (Option B).**
Rather than introducing a parallel budget model for Live Translator,
its actual Gemini cost is computed and deducted from the same
dollar-denominated budget via the existing `recordUsage(accountId,
feature, amountUsd)` call — no new conversion-factor logic needed in
code, since the function already takes a raw USD amount. This avoids
having two different budget systems to keep in sync and doesn't
disturb existing package/purchased-hour accounts.

### Security/enforcement — ephemeral token strategy

Because Live Translator requires a persistent client-side WebSocket
connection directly to Gemini (see the earlier architecture note on
why this can't run through a standard Vercel serverless function),
budget enforcement can't rely solely on a single request-time check.
Decision:

- Client requests a short-lived **ephemeral token** from the backend
  (Vercel) before connecting directly to Gemini — never exposes the
  real API key to the client.
- Token `expireTime` is set short (e.g. 1–5 minutes) based on
  remaining budget, and the client must periodically request a new
  token to continue the session — this keeps the actual hard-cap
  enforcement server-side even though the audio stream itself bypasses
  the backend.
- Client-reported usage ticks are used only for billing/logging
  granularity, not as the security boundary — the token expiry is the
  real enforcement mechanism.

### Model decision

**`gemini-3.5-live-translate-preview`** (native speech-to-speech, not
separate STT→translate→TTS calls) — single WebSocket session,
simultaneous output audio + two-column transcript. Chosen for lower
cost and better session resilience than a chained pipeline.

**Preview-model pricing risk:** since this is a Google preview model,
pricing is subject to change without notice. Before writing
production code and before launch, re-verify current pricing directly
against Google's official pricing page. A circuit-breaker/alert
mechanism on the backend is planned so the system can pause Live
Translator automatically if actual cost per session spikes
unexpectedly.

### Pricing — clarified (two figures, not a conflict)

**Documentation correction:** an earlier draft of this log stated two
different "real cost" figures ($1.50/hr and $2.22/hr) without
distinguishing them, which reads as a contradiction. Clarified:

- **$1.50/hr** — the **original budgeting assumption**, set early in
  the project based on Flash-Lite-tier models used for Text/OCR/
  Voice Translator (the package tier's existing hardcoded cap in
  `geminiConfig.ts`/the increment-function's cost formula).
- **$2.22/hr** — the **actual, measured cost basis** for Live
  Translator specifically, computed from Google's official
  `gemini-3.5-live-translate-preview` pricing (~$0.0053/min input
  audio + ~$0.0315/min output audio ≈ $0.037/min × 60 = ~$2.22/hr).
  This is the correct figure to use for Live Translator's actual cost
  — it is **not comparable** to the $1.50/hr package-tier cap, which
  was set for a different (cheaper, non-live) model tier and was never
  meant to bound Live Translator's real cost.

**Business pricing (customer-facing):**
- Actual Gemini cost: ~$2.22/hr (see above)
- Customer price: **$2.00/hr** was an earlier proposal, but is **below
  actual cost** and was superseded — a repricing decision is pending
  pilot data (see below). Do not treat $2.00/hr as final.
- A repricing range of **$2.80–$3.00/hr** (Option 1) was discussed as
  a candidate if pilot data confirms the ~$2.22/hr cost basis, but the
  final decision is **deliberately deferred** until real pilot usage
  data is collected (see next section) — do not lock in a customer
  price yet.

### Pilot testing plan (decided, not yet executed)

- Dollar-native deduction: no new conversion-factor logic in code —
  compute Live Translator's actual Gemini cost (audio duration ×
  real per-minute rate) and pass it directly to the existing
  `recordUsage(accountId, feature, amountUsd)`.
- Add dedicated backend logging during the pilot/dev period to
  capture real-world $/hour from actual sessions (not just the
  theoretical per-minute rate) — accounts for connection overhead,
  idle time, retries, etc. that the theoretical rate doesn't capture.
- Repricing decision (whether to move to the $2.80–$3.00/hr range) is
  **explicitly deferred** until this real pilot data is reviewed —
  this is a deliberate "measure before deciding" approach, not an
  oversight.

**Status: planning/decisions only — no Live Translator code has been
written yet.** This section documents the agreed architecture and
pricing approach so the next session can start implementation directly
without re-litigating these decisions.
