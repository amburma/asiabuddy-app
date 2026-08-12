## Phase 0 — UI + Build Verification (13 August 2026, continued)

### Navbar entry
Applied via Windsurf diff (not terminal — terminal paste of a diff caused a
PowerShell parsing error, corrected mid-session, no file impact from that
mistake). `/tourguide` nav link added to Navbar.tsx, confirmed present in
build output.

### Color convention investigation
Hypothesized a "structural vs CTA" color-family split between #C9A84C and
#D4AF37 — disproven. Actual finding: #D4AF37 is a named Tailwind token
(`gold-deep`) under a "Sacred Aesthetic Palette" section (paired with
`sacred-bg`, `sacred-green`), while #C9A84C has no named token and is used
as the de facto default gold via raw hex throughout the codebase (154
occurrences, no token). `TourGuideLoginForm.tsx` had no import tying it to
the sacred theme, so its 4 raw #D4AF37 occurrences were changed to #C9A84C
to match Navbar.tsx (the codebase's actual default), not fixed to a "correct"
token.

**Follow-up identified, not yet actioned:** #C9A84C is used as a raw hex
everywhere with no Tailwind token — formalizing it as a named token (e.g.
`gold-primary`) is a low-priority refactor, not required for Phase 0.

### Async cookies() build failure (found + fixed)
`npm run build` failed on `app/tourguide/page.tsx` — `cookieStore.get()` 
called without `await` on `cookies()`. Root cause: Next.js 15 made `cookies()` 
async; this tour-guide code predates that migration or was never updated.
Fixed to `const cookieStore = await cookies()`. Scope was limited to
tour-guide files only — investigation confirmed the sync pattern did not
appear used elsewhere in a way that needed touching for this task.

### Hover shade (TourGuideLoginForm.tsx button)
Investigated whether #C9A84C has an existing paired darkened hover shade
anywhere in the codebase — none found. Navbar.tsx and other #C9A84C usages
pair it with opacity-based hover (`hover:bg-[#C9A84C]/10`, `/5`), which is
correct for text/icon links but not applicable to a solid filled button.
Decision: left `hover:bg-[#b8942f]` unchanged (no invented hex value) —
logged as a low-priority cosmetic backlog item, not a Phase 0 blocker.

### Final build result
`npm run build` — clean, 0 errors. All tour-guide routes present in output:
`/tourguide`, `/api/tour-guide/login`, `/api/tour-guide/logout`. Pre-existing
`react/display-name` ESLint rule-loading error on `app/about/page.tsx` 
confirmed unrelated to tour-guide work, does not block build, left as
separate backlog item.

## Phase 0 — ✅ FULLY COMPLETE (schema, functions, auth/gate services, UI, build)

## Backlog (non-blocking, carried forward)
- [ ] Formalize #C9A84C as a named Tailwind token (currently raw hex only)
- [ ] Normalize TourGuideLoginForm.tsx button hover shade to a true #C9A84C-derived darken (currently an inherited #D4AF37-derived shade)
- [ ] Pre-existing `react/display-name` ESLint config error (app/about/page.tsx) — unrelated to tour-guide, project-wide issue

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