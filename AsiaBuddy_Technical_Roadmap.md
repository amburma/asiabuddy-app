# AsiaBuddy — Technical Roadmap & Architecture Guide
> Last Updated: 7 August 2026 — Session 46 completed — Domain Infrastructure: Email Forwarding, SSL Fix, DMARC & Canonical Domain

---

## 🆕 Session 43 — eSIM Affiliate Integration (Airalo) — PLANNED (Not Started)

### Problem Statement
AsiaBuddy customers arranging trips (tours, transport tickets via 12Go, hotels) often
also need mobile data connectivity in the destination country. No eSIM offering exists
in the app currently. Airalo affiliate program (10% base commission via Travelpayouts network [Corrected in Session 45 — see below],
sub_id/click tracking supported) was evaluated and approved for integration, following
the same affiliate-link pattern already proven with 12Go Transport Tickets in Session 42.

### Decision: APPROVED — eSIM Affiliate CTA, Reusing Existing Patterns
No new architecture invented. Reuses three patterns already live in the codebase:
1. Country-aware CTA pattern from Session 42's "Get [Country] Payment Info" button
   (`HowToPayInteractive.tsx`) → adapted to "Get [Country] eSIM" button.
2. Affiliate link generator pattern from `generate12GoLink()` (`lib/twelveGo.ts`)
   → new `generateAiraloLink()` in `lib/airalo.ts`.
3. Dynamic country sourcing from `data/countries.ts` (already status-filtered to
   `'live'` countries as of Session 42's build fix) → same source, no duplication.

Explicitly rejected: building a custom eSIM checkout/cart flow in-app. Airalo checkout
stays on Airalo's site/app; AsiaBuddy is a referral surface only (link-out + affiliate ID),
matching the 12Go integration's ground-transport-ticket model.

### Architecture Plan

**Affiliate link handling**
- `lib/airalo.ts` — new file, mirrors `lib/twelveGo.ts` structure
  - `generateAiraloLink({ subId }: { subId?: string }): string` [Corrected in Session 45 — see below] 
  - Base affiliate link: `https://airalo.tpo.lu/CMO35G2k` + query params for sub_id
    where Airalo's link structure supports it (to confirm against Travelpayouts dashboard docs [Corrected in Session 45 — see below]
    before hardcoding param names)
  - `SUPPORTED_AIRALO_COUNTRIES` — validation list (Airalo covers 200+ destinations,
    far wider than AsiaBuddy's current live countries, so no fallback-language issue like
    the 12Go `mm` case — but still validate against `data/countries.ts` `'live'` list only)

**UI integration points**
- Homepage `ServicesStrip` — new eSIM card (📶 icon), same grid pattern as the Session 42
  Transport card (`lg:grid-cols-7` → adjust to accommodate 8th card)
- `app/[country]/esim/page.tsx` — new standalone route, mirrors
  `app/[country]/transport-tickets/page.tsx` structure (Server Component, i18n, SEO metadata)
- `components/[country]/AiraloWidget.tsx` OR simple CTA button — decide after checking
  whether Airalo offers an embeddable widget (like 12Go's) or affiliate-link-only;
  confirm via Airalo partner docs before committing to widget vs. plain-link approach
- Optional: eSIM CTA button added to `/how-to-pay` or booking-confirmation flow as a
  cross-sell ("Need data for your trip? Get an eSIM") — decide placement after core route ships

**Chat bot trigger (optional, Phase 2)**
- If approved later: reuse Session 42's "GROUND TRANSPORT TICKETS TRIGGER RULE (12GO)"
  system-prompt pattern to add an "ESIM TRIGGER RULE" section, with the same button-persistence
  and duplicate-link-prevention fixes already solved for 12Go — do not re-solve these bugs,
  copy the working pattern.

**i18n**
- New `esim` namespace across all 6 languages (EN/TH/MM/ES/FR/DE) in `lib/i18n.ts`,
  following the `transportTickets` namespace structure (title, intro, FAQ) as template.
  MM translation must be done natively (not EN mirror) per the lesson learned fixing
  `transportTickets` MM/DE/FR/ES in the 12Go session.

**Tracking**
- Confirm whether Airalo supports `sub_id`-equivalent parameters (like 12Go) before
  building any per-click/per-country tracking logic — check Travelpayouts dashboard link [Corrected in Session 45 — see below]
  builder, do not assume URL structure.
- Flag open question: Airalo native-app deep-link attribution (same unresolved caveat
  as 12Go's native-app checkout — confirm with Airalo/Travelpayouts support whether [Corrected in Session 45 — see below]
  affiliate ID survives a web-to-app handoff before relying on it for revenue reporting).

### Implementation Steps (PART breakdown, for sequencing in future sessions)
- PART 1 — `lib/airalo.ts`: link generator + country validation (no UI yet)
- PART 2 — i18n `esim` namespace, all 6 languages
- PART 3 — `app/[country]/esim/page.tsx` route (Server Component) + SEO metadata
- PART 4 — Homepage `ServicesStrip` eSIM card + grid layout adjustment
- PART 5 — Widget/CTA decision + build (pending Airalo docs check)
- PART 6 — Build verification (`npm run build`, 0 errors) + manual click/link test
- PART 7 (optional, later) — Chat bot trigger rule, cross-sell placement on
  `/how-to-pay` or booking confirmation

### Open Questions Before Implementation Starts
- [ ] Does Airalo provide an embeddable widget, or affiliate-link-only? (affects PART 5 design)
- [ ] Does Airalo support sub_id/click-level tracking params like 12Go? (affects PART 1 + tracking)
- [ ] Native app deep-link affiliate attribution — confirmed or not? (email Airalo/Travelpayouts support [Corrected in Session 45 — see below])
- [ ] Any commission-rate confirmation needed once actually registered on Travelpayouts dashboard [Corrected in Session 45 — see below]
      (public sources cite 10% standard, "dynamic" per some aggregators — verify in-account)

### Status
🆕 PLANNED — documentation only, PART 1 not yet started. No code written this session.

---

## ✅ Session 44 — eSIM Chatbot Promotion Fix — COMPLETED

### Background / Problem
The in-app chatbot (all chat widgets, including the "Live Chat" widget) was telling users eSIM is "outside AsiaBuddy's service scope" and never showing any CTA, even though the Airalo eSIM landing page and affiliate link infrastructure already existed from Session 43. Two separate root causes were found:
1. The shared system prompt (getSystemInstruction in src/services/gemini.ts) didn't list eSIM as a sold service.
2. The "Live Chat" widget (HumanOperatorChat.tsx) doesn't use the shared prompt at all — it calls its own separate API route (app/api/booking-chat/route.ts) with its own independent hardcoded system prompt, which also lacked eSIM language. This was found only after the first fix pass (which covered 11 other chat components) didn't fix the Live Chat widget.

### What Was Done
1. Updated system prompt in src/services/gemini.ts (getSystemInstruction) to list eSIM/Mobile Internet as a sold service and instruct the AI to recommend Airalo eSIM with a [SHOW_ESIM_CTA] tag instead of declining.
2. Updated the separate hardcoded system prompt in app/api/booking-chat/route.ts (added as new numbered section, "eSIM PROMOTION TRIGGER RULE") with the same eSIM-positive language and [SHOW_ESIM_CTA] tag, since this route doesn't share code with gemini.ts.
3. Added multi-language eSIM keyword detection (esim, e-sim, internet, wifi, wi-fi, connection, sim card, data plan — in English, Myanmar, Thai, Chinese, Japanese, Korean, German, French, Spanish) plus [SHOW_ESIM_CTA] tag detection to all 12 chat components.
4. Added a new `showEsimCTA` state (kept separate from the existing `showBookNow` state, since the destination and button style differ) to each component, reset on new messages.
5. Added an orange "Get eSIM 📶" CTA button (bg-[#f59e0b]) to each component, rendered when showEsimCTA is true, linking directly to the Airalo affiliate URL via generateAiraloLink({ subId: 'chatbot-thailand' }) from lib/airalo.ts (reused from Session 43, no new file created). Opens in a new tab (target="_blank", rel="noopener noreferrer") since it's an external affiliate link.

### Files Changed
| File | Change |
|---|---|
| src/services/gemini.ts | Added eSIM to service list + [SHOW_ESIM_CTA] instruction in getSystemInstruction() |
| app/api/booking-chat/route.ts | Added separate eSIM promotion section to its own independent system prompt |
| components/thailand/ConciergeChat.tsx | Added eSIM keyword detection + showEsimCTA + Get eSIM button |
| components/thailand/FoodChat.tsx | Same as above |
| components/thailand/TripPlannerChat.tsx | Same as above |
| components/thailand/ShoppingChat.tsx | Same as above |
| components/thailand/NightlifeChat.tsx | Same as above |
| components/thailand/MedicalChat.tsx | Same as above |
| components/thailand/TransportChat.tsx | Same as above |
| components/thailand/TransferChat.tsx | Same as above |
| components/thailand/PhrasesChat.tsx | Same as above |
| components/thailand/CarRentalChat.tsx | Same as above |
| components/thailand/AccommodationChat.tsx | Same as above |
| components/thailand/HumanOperatorChat.tsx | Same as above (this is the "Live Chat" widget) |

### Verified
- `npm run build` passes locally, no errors.
- Confirmed working live: Live Chat widget now correctly responds to eSIM questions and shows the Get eSIM button linking to Airalo.
- Checked for other chat surfaces beyond these 12 components: components/shared/BookingChat.tsx is a wrapper that delegates to HumanOperatorChat, so no separate logic was needed there. Legacy/archive folder (_archive_thailand_vite_legacy) is unused and was not touched.

### Open Items Carried Forward
- Currently the CTA links use `subId: 'chatbot-thailand'` for tracking — not yet confirmed in the Travelpayouts dashboard whether sub_id tracking is actually reported for this program. (Note: Travelpayouts uses sub_id parameter, not Impact.com's subid1 convention.)
- Non-Thailand country pages/chat components (if any exist outside the components/thailand/ directory) were not in scope for this session — confirm whether other country chat widgets need the same fix.

---

## ✅ Session 45 — Affiliate Network Correction (Travelpayouts, not Impact.com) — COMPLETED

### Background / Problem
The original Session 43 entry incorrectly assumed the Airalo affiliate link (https://airalo.tpo.lu/CMO35G2k) ran on the Impact.com network, and lib/airalo.ts was built using Impact.com's parameter conventions (`subid1` for tracking, `u` for deep-link override). This was discovered to be wrong: the link is actually a Travelpayouts link (tpo.lu is Travelpayouts' redirect domain). This was verified two ways: (1) confirmed in the user's own Travelpayouts dashboard at app.travelpayouts.com — the link appears in Tools > Links > Recent with Sub ID "eSIM" and destination page https://airalo.com, and (2) confirmed in the Travelpayouts dashboard's "Top performing programs" report, which showed real click counts against "Airalo" increasing as the fixed links were tested — confirming both that this is genuinely a Travelpayouts-tracked program and that the corrected tracking format works.

### What Was Corrected
1. lib/airalo.ts: removed the `countryId` parameter and `u` deep-link override entirely — the verified base link always points to the generic https://airalo.com homepage, there is no per-country deep link for this program, and none was created (to avoid risking attribution breakage on a link already confirmed working).
2. lib/airalo.ts: changed the tracking parameter from `subid1` to `sub_id` — Travelpayouts' actual documented SubID override parameter, which overrides the SubID baked into the link at creation time ("eSIM" by default).
3. Updated all 13 call sites (the /esim landing page + all 12 chat components) to drop the countryId argument and keep only a descriptive subId (e.g. 'chatbot-thailand', 'esim-page-thailand').
4. Verified end-to-end: click counts in the Travelpayouts dashboard increased after testing the corrected links, confirming the sub_id parameter format is being read correctly by Travelpayouts.

### Still Open
- Bookings/earnings still show $0 in the dashboard — expected, since only click-testing has been done so far, not a real purchase. A real test purchase would be needed to confirm commission attribution end-to-end.
- Per-SubID breakdown (e.g. confirming 'chatbot-thailand' clicks are distinguishable from 'esim-page-thailand' clicks in Travelpayouts reports) has not been separately verified yet — only the aggregate Airalo click count was checked.
- No per-country deep link exists for this program; if the user later wants to send eSIM traffic straight to a country-specific Airalo page rather than the generic homepage, a new short link would need to be generated per country in the Travelpayouts dashboard first.

### Files Changed
| File | Change |
|---|---|
| lib/airalo.ts | Removed countryId + u param, changed subid1 → sub_id, removed deep-linking |
| app/[country]/esim/page.tsx | Updated generateAiraloLink call site |
| components/thailand/*.tsx (12 files) | Updated generateAiraloLink call sites |

---

## ✅ Session 46 — Domain Infrastructure: Email Forwarding, SSL Fix, DMARC & Canonical Domain — COMPLETED

### Background / Problem
While setting up free email forwarding (info@asiabuddy.app) via Porkbun's email forwarding wizard, the root domain's DNS record for asiabuddy.app was unexpectedly reset from pointing to Vercel to pointing at Porkbun's own pixie.porkbun.com (Porkbun's URL forwarding target). This broke the live site entirely, producing ERR_SSL_VERSION_OR_CIPHER_MISMATCH on https://asiabuddy.app — Vercel's dashboard showed the domain as "Invalid Configuration". This was diagnosed by comparing Vercel's expected DNS records against the actual Porkbun DNS records.

### What Was Done

#### 1. Fixed the broken root domain record (SSL outage)
Changed the root domain record for asiabuddy.app from an ALIAS pointing to pixie.porkbun.com to an A record pointing to Vercel's IP (216.198.79.1), matching what Vercel's dashboard specified. This restored the live site.

#### 2. Added www.asiabuddy.app as a proper Vercel domain
Previously www.asiabuddy.app was unintentionally caught by a wildcard CNAME (*.asiabuddy.app → pixie.porkbun.com) meant for other purposes, which also caused an SSL error on the www subdomain. Fixed by:
- Adding www.asiabuddy.app as a separate domain entry in Vercel (Connect to an environment → Production)
- Adding a specific CNAME record in Porkbun DNS for host "www" pointing to the unique target Vercel provided (a specific-per-domain *.vercel-dns-017.com value) — this specific record takes priority over the existing wildcard CNAME, so it does not conflict

#### 3. Set canonical domain (SEO)
Decided asiabuddy.app (no www) as the canonical domain, since it's already used in all marketing material and the info@asiabuddy.app email address. Configured www.asiabuddy.app in Vercel as a 301 Moved Permanently redirect to asiabuddy.app, so both versions work but SEO authority consolidates on the canonical version.

#### 4. Verified free email forwarding (Porkbun)
Set up info@asiabuddy.app to forward to an existing Gmail account using Porkbun's free email forwarding (up to 20 free forward addresses per domain, receive-only — replies show as sent from the Gmail address, not info@asiabuddy.app; a paid hosted inbox would be needed for that). This added MX records (fwd1.porkbun.com prio 10, fwd2.porkbun.com prio 20) and an SPF TXT record (v=spf1 include:_spf.porkbun.com ~all). Verified end-to-end with a real test email — received successfully in Gmail, not flagged as spam.

#### 5. Added DMARC record (security)
Added a DMARC TXT record at _dmarc.asiabuddy.app with value "v=DMARC1; p=none; rua=mailto:info@asiabuddy.app; pct=100" to reduce the risk of email spoofing using the asiabuddy.app domain. Deliberately used p=none (monitor-only) rather than p=quarantine/reject, since DKIM is not set up (forwarding-only, not a full hosted mailbox) — a stricter policy risked blocking legitimate mail. Verified via MXToolbox: record published correctly, valid syntax, no errors (the "Policy Not Enabled" note is expected and intentional given p=none).

### Final DNS State (Porkbun, asiabuddy.app) — 7 records
| Type | Host | Value |
|---|---|---|
| A | asiabuddy.app | 216.198.79.1 |
| CNAME | *.asiabuddy.app | pixie.porkbun.com |
| CNAME | www.asiabuddy.app | [unique vercel-dns-017.com target] |
| MX (prio 10) | asiabuddy.app | fwd1.porkbun.com |
| MX (prio 20) | asiabuddy.app | fwd2.porkbun.com |
| TXT | asiabuddy.app | v=spf1 include:_spf.porkbun.com ~all |
| TXT | _dmarc.asiabuddy.app | v=DMARC1; p=none; rua=mailto:info@asiabuddy.app; pct=100 |

### Verified
- https://asiabuddy.app loads correctly, no SSL errors
- https://www.asiabuddy.app redirects (301) to https://asiabuddy.app correctly
- Vercel Domains dashboard shows "Valid Configuration" for both asiabuddy.app and www.asiabuddy.app
- DMARC record confirmed valid via MXToolbox
- Test email to info@asiabuddy.app successfully forwarded to Gmail, landed in inbox (not spam)

### Open Items Carried Forward
- Email forwarding is receive-only — replies from Gmail won't show as sent from info@asiabuddy.app. If sending as info@asiabuddy.app is ever needed, a paid hosted email inbox would be required (~$2/month per address on Porkbun), which would also enable proper DKIM signing.
- DMARC is currently in monitor-only mode (p=none). After a few weeks of reviewing aggregate reports sent to info@asiabuddy.app with no unexpected failures, consider tightening to p=quarantine.
- admin@ and sales@ forwarding addresses were discussed but not yet created — only info@ is currently set up. Add if/when needed (up to 20 free forwards allowed per domain).

### Files Changed
This session was infrastructure/DNS configuration only — no application code files were changed. Changes were made directly in Porkbun's DNS dashboard and Vercel's Domains settings.

---

## 🔄 Session 42 — 27 July 2026 (IN PROGRESS — Payment Trust Page, Part A implemented)

### Problem Statement
Customers who want to purchase services seen on the Facebook Page need to send payment via bank transfer, since no payment gateway exists yet. As a newly-established company, trust is a concern when asking customers to transfer money. Initial idea considered: a single public page under asiabuddy.app listing full bank account details for all countries/sales agents, styled elegantly for trust.

### Decision: REJECTED — Public Static Bank Details Page
Rejected due to four identified risks:
1. Clone/Phishing risk — a public, indexable page with static account numbers can be screenshotted/cloned by scammers onto fake pages, and customers have no way to distinguish real vs fake.
2. Reconciliation risk — a single shared static account number across all customers makes it impossible to match incoming transfers to specific orders without a reference number, creating payment disputes with no proof on either side.
3. Sales agent privacy/doxxing risk — publishing individual agents' personal address/contact details publicly exposes staff to impersonation and safety risks.
4. Elegant UI alone does not establish trust — scam pages can also be well-designed. Real trust requires verifiable, personalized, non-public payment information tied to a specific transaction.

### Decision: APPROVED — Two-Part Alternative Architecture

**Part A — Public Generic Trust Page** (e.g. /how-to-pay or /about/payment, public + SEO-indexable):
- Company registration/business license display (if available)
- Physical office address + Google Maps embed
- Single official company contact channel (NOT individual agent personal numbers)
- Payment method icons only (Bank Transfer / KBZPay / Wave / Card) — NO full account numbers displayed publicly
- "How It Works" step process: Inquiry -> Invoice Generated -> Payment Detail Sent Privately -> Confirmation
- Customer testimonials / Facebook reviews embed
- Explicit security notice: "We will never ask you to pay to an account not listed on your official invoice"

**Part B — Secure Per-Customer Payment Detail** (extends existing Paid Invoice System, PART 0-10, paid_invoices table):
- New admin-only (not public) bank_accounts table, one row per country/currency, referenced via bank_account_id FK from paid_invoices
- Invoice generation auto-selects correct bank account by country/currency at generation time
- Full account details + unique invoice_no + exact amount delivered ONLY via the generated PDF invoice + Email/Telegram to that specific customer — never posted publicly
- OPTIONAL future addition: an auth-light /verify/[invoiceNo] lookup page so a customer can confirm "this invoice/amount is genuine" without exposing all invoices publicly

### Status
🔄 IN PROGRESS — Part A functionally complete, pending final content + new country-payment-info sub-feature. Part B not started.

### Part A — Payment Trust Page (`/how-to-pay`) — COMPLETED WORK LOG
- Built `app/how-to-pay/page.tsx` (Server Component) + `components/how-to-pay/HowToPayInteractive.tsx` (Client Component), global/country-agnostic route (not nested under `[country]`), added to `EXCLUDED_PATHS` in `proxy.ts` as public/indexable.
- Design system used: Obsidian `#0D0D0D` / Ivory `#F5F0E8` / Gold `#C9A84C` via raw Tailwind arbitrary hex values (NOT the unverified `sacred-bg`/`gold-deep` token names — note this as a confirmed working pattern for future pages, since those custom token names remain unverified in `tailwind.config`).
- i18n: added `howToPay` namespace across all 6 languages (EN/TH/MM/ES/FR/DE) to `lib/i18n.ts`.
- Sections built: Hero, 5-step "How It Works" (Inquiry → Invoice Generated → Payment Detail Sent Privately → Upload Payment Proof → Confirmation — note the 5th step was added specifically to reflect the existing `/payment-proof/[booking_id]` + `/api/upload-payment-proof` Telegram-notify flow, which already existed independently of this session), Security Notice callout, Company Details block (Altenberge, Germany address + Google Maps embed, single tri-channel official contact +49 179 3956759 as WhatsApp/Telegram/Phone), Payment Methods icon row (Bank Transfer/KBZPay/Wave/Card, no account numbers), Social Proof block (950K Facebook followers headline + screenshot placeholder + Facebook Page link placeholder — Facebook Page URL and screenshot file still pending from KIM).
- Home button added to top-right of the shared Navbar via a new optional `showRootHomeButton?: boolean` prop on `components/shared/Navbar.tsx`, enabled only from `HowToPayInteractive.tsx` — no other page affected.
- Bugs found and fixed during this session (record for future reference, since these are reusable lessons):
  1. Cannot export `generateMetadata` from a file with `"use client"` — resolved by keeping `page.tsx` a Server Component and moving interactivity into a separate Client Component.
  2. `lucide-react` does not export a `Facebook` icon (no brand icons in that package) — replaced with `ExternalLink`.
  3. Passing a function (render-prop / function-as-children pattern) from a Server Component into a Client Component's children throws "Functions are not valid as a child of Client Components" — root cause was traced to a stray, untracked `app/how-to-pay/page_backup.tsx` file containing this pattern; deleting it and refactoring `page.tsx` to pass plain props (not a render function) fixed it. Lesson: always check for stray backup/leftover `.tsx` files in the route folder when debugging Server/Client boundary errors, since Next.js type-checks every `.tsx` file in the project regardless of whether Next.js treats it as an actual route.
- Discovered and removed an abandoned duplicate: `app/payment-info/page.tsx` (untracked, zero references anywhere, excluded from SEO, never committed — an earlier uncommitted attempt at the same trust-page concept). Deleted, and removed from `EXCLUDED_PATHS` in `proxy.ts`. Confirmed `app/payment-proof/[booking_id]/page.tsx` and `app/api/upload-payment-proof/route.ts` are unrelated, active, correctly-functioning infrastructure (uses `bookings` table, not `invoices`/`paid_invoices`) and were left untouched.

### Part A — Remaining before considered fully done
- [x] KIM supplied real Facebook Page URL: `https://www.facebook.com/asiabuddyapp` (previous placeholder link on the Social Proof block was pointing to a broken local `localhost:3000/[TODO...]` href — needs swapping in `HowToPayInteractive.tsx`)
- [ ] Screenshot image file for `/public/images/facebook-950k-followers.png` — still pending from KIM
- [x] New sub-feature (see below): country-aware payment info — implemented, build fix pending (see below)

### New sub-feature: Country-Aware Payment Info CTA — IMPLEMENTED (build error pending fix)
- User requested the ability to select a country under "Accepted Payment Methods" so customers can conveniently find country-specific payment info as more countries launch (currently only Thailand is live; Vietnam, Singapore, etc. planned per `data/countries.ts`).
- IMPORTANT SECURITY DECISION (explicitly discussed and agreed): full bank account numbers must NOT be shown publicly per country, even behind a country selector — this would reintroduce the exact public-bank-details risk (phishing/impersonation, account profiling, no leak traceability) that Session 42's original architecture decision (Part A vs Part B split) was designed to avoid. Explicitly rejected: showing real account numbers on the public trust page.
- Agreed design: country selector shows only which payment methods (icons) are available for that country → a "Get [Country] Payment Info" button opens WhatsApp/Telegram with a pre-filled inquiry message → staff verifies the customer and sends real payment details privately per invoice, consistent with the existing Part B design (admin-only `bank_accounts` table, per-invoice private delivery).
- Country list sourced dynamically from `data/countries.ts`, so future country launches don't require code changes to this section.
- **Implementation completed this session:**
  - `data/countries.ts`: `active: boolean` → `status: 'live' | 'coming-soon'` (Thailand only `'live'` for now)
  - `app/api/inquiry/route.ts` and `app/sitemap.ts`: updated to filter on `status === 'live'`
  - `components/how-to-pay/HowToPayInteractive.tsx`: country selector (live countries only) + "Get [Country] Payment Info" CTA → opens WhatsApp with pre-filled, `encodeURIComponent`-escaped message, new tab, proper `rel` security attributes
  - i18n: added `paymentMethods.getInfoButton` (`{country}` placeholder) across all 6 languages (EN/TH/MM/ES/FR/DE)
  - Verified no real or fake bank account numbers are rendered anywhere in the payment methods section — CTA is message-flow only, not a data-reveal flow
- **Build error found post-implementation (fix identified, not yet applied):** the `active` → `status` rename was not propagated to `app/[country]/layout.tsx` line 80 (`countries.filter(c => c.active)` — `active` no longer exists on `Country`). Same class of bug as prior sessions' "stray reference after a rename" lesson. Fix: update `app/[country]/layout.tsx` line 80 to filter on `c.status === 'live'` instead of `c.active`.

### Build Status
- 1 build error pending fix (see above)

---

## 📋 PART 0-10 — Paid Invoice System (Design Freeze: Approved, Implementation NOT Started)

### Motivation
Paid customers (tour packages, flights, hotels, airport transfers, etc.) currently receive no formal invoice/receipt. Manual payment reconciliation is fragile, prone to disputes, and lacks audit trails. Sales agents waste time manually copying bank account details into WhatsApp/Telegram messages. Need a system where invoice generation → bank account auto-selection → PDF email/Telegram delivery → payment proof upload → reconciliation traceability is automated.

### Architecture Overview
- **New Supabase tables:** `bank_accounts` (admin-only), `paid_invoices` (invoice records), `invoice_payments` (payment proofs), `invoice_payment_proofs` (file attachments)
- **New admin UI:** `/admin/invoices` (invoice list, search, filter, generate invoice, view invoice, download PDF, mark paid/partially paid, view payment proofs)
- **New customer UI:** `/payment-proof/[booking_id]` (upload payment proof, view status), optional auth-light `/verify/[invoiceNo]` (invoice authenticity lookup)
- **PDF generation:** `jspdf` + `jspdf-autotable` library, template-based PDF invoice with company header, line items, bank details, QR code placeholder
- **Integration with existing `bookings` table:** invoices linked to `bookings.booking_id` FK, but paid_invoices is standalone (invoices can exist without bookings, e.g., custom services not in the tours database)

### PART 0 — Supabase Table Setup (Manual, 1-time)
**⚠️ NOT STARTED — Schema locked, waiting for manual Supabase setup**

#### `bank_accounts` table (admin-only, never exposed via API)
| Column | Type | Notes |
|--------|------|-------|
| bank_account_id | uuid (PK) | auto-generated |
| country | text | Myanmar / Thailand / Singapore / Japan / South Korea / Vietnam / etc. |
| currency | text | MMK / USD / THB / SGD / JPY / KRW / VND / etc. |
| bank_name | text | e.g., KBZ Bank, Bangkok Bank, DBS Bank |
| account_name | text | Beneficiary name |
| account_number | text | Account number (IMPORTANT: never exposed via public API) |
| swift_code | text (optional) | International transfer |
| routing_number | text (optional) | US transfer |
| bank_address | text (optional) | Full bank address |
| phone_number | text (optional) | Bank phone for verification |
| notes | text (optional) | Admin-only notes |
| is_active | boolean | Default true |
| created_at | timestamptz | auto |
| updated_at | timestamptz | auto |

#### `paid_invoices` table
| Column | Type | Notes |
|--------|------|-------|
| invoice_id | uuid (PK) | auto-generated |
| invoice_no | text | Unique, human-readable (e.g., INV-2024-000001) |
| booking_id | uuid (FK, nullable) | Links to `bookings.booking_id` if applicable |
| bank_account_id | uuid (FK) | Links to `bank_accounts.bank_account_id` |
| customer_name | text | |
| customer_contact | text | Phone/Telegram/Viber/WhatsApp |
| customer_email | text (optional) | |
| service_type | text | Tour / Flight / Hotel / Airport Transfer / Tickets & Activities / Car Rental / Other |
| service_description | text | Brief description of service |
| currency | text | MMK / USD / THB / SGD / JPY / KRW / VND / etc. |
| base_price | numeric | |
| service_fee | numeric | |
| vat_amount | numeric (optional, default 0) | Fixed amount, manual entry |
| total_amount | numeric | base_price + service_fee + vat_amount |
| paid_amount | numeric (default 0) | Cumulative payments tracked |
| payment_status | text | pending / partially_paid / paid / overpaid / cancelled |
| payment_method | text (optional) | Cash / KBZPay / Wave / Bank Transfer / Card / Other |
| issued_by | text | Admin username who created invoice |
| issued_at | timestamptz | auto |
| due_date | timestamptz (optional) | Payment due date |
| paid_at | timestamptz (nullable) | When fully paid |
| notes | text (optional) | Internal notes |
| created_at | timestamptz | auto |
| updated_at | timestamptz | auto |

#### `invoice_payments` table (tracks each payment, e.g., partial payments)
| Column | Type | Notes |
|--------|------|-------|
| payment_id | uuid (PK) | auto-generated |
| invoice_id | uuid (FK) | Links to `paid_invoices.invoice_id` |
| amount | numeric | Payment amount |
| payment_method | text | Cash / KBZPay / Wave / Bank Transfer / Card / Other |
| payment_date | timestamptz | When payment received |
| transaction_ref | text (optional) | Bank transaction reference |
| notes | text (optional) | Payment notes |
| uploaded_by | text | Admin username who recorded payment |
| created_at | timestamptz | auto |
| updated_at | timestamptz | auto |

#### `invoice_payment_proofs` table (file attachments for each payment)
| Column | Type | Notes |
|--------|------|-------|
| proof_id | uuid (PK) | auto-generated |
| payment_id | uuid (FK) | Links to `invoice_payments.payment_id` |
| file_url | text | Supabase Storage URL |
| file_name | text | Original filename |
| file_type | text | image/pdf/etc |
| file_size | numeric | Bytes |
| uploaded_by | text | Admin username or customer email |
| uploaded_via | text | admin_panel / customer_portal |
| created_at | timestamptz | auto |

### PART 1 — Supabase Client Helpers (TypeScript)
**NOT STARTED**
- `lib/supabase/admin/invoices.ts` — CRUD operations for paid_invoices
- `lib/supabase/admin/bank-accounts.ts` — CRUD operations for bank_accounts
- `lib/supabase/admin/invoice-payments.ts` — CRUD operations for invoice_payments
- `lib/supabase/admin/invoice-payment-proofs.ts` — CRUD operations for invoice_payment_proofs
- Helper functions: `generateInvoiceNo()`, `autoSelectBankAccount(country, currency)`, `updatePaymentStatus(invoice_id)`

### PART 2 — PDF Invoice Template
**NOT STARTED**
- `lib/pdf/invoice-template.ts` — PDF generation using `jspdf` + `jspdf-autotable`
- Template sections: Header (logo, company name, address), Invoice Meta (invoice_no, date, due_date), Customer Info (name, contact, email), Bank Details (auto-selected from bank_accounts), Line Items (service_type, description, base_price, service_fee, vat_amount, total_amount), Payment Summary (subtotal, vat, total, paid_amount, balance_due), Terms & Conditions, Footer (contact info)
- QR code placeholder for future "scan to verify" feature
- Multi-language support (EN/TH/MM/ES/FR/DE) via i18n integration

### PART 3 — Admin API Routes
**NOT STARTED**
- `app/api/admin/invoices/route.ts` — GET (list, search, filter), POST (create invoice)
- `app/api/admin/invoices/[invoice_id]/route.ts` — GET (view invoice), PUT (update invoice), DELETE (cancel invoice)
- `app/api/admin/invoices/[invoice_id]/pdf/route.ts` — GET (download PDF)
- `app/api/admin/invoices/[invoice_id]/payments/route.ts` — GET (list payments), POST (record payment)
- `app/api/admin/bank-accounts/route.ts` — GET (list), POST (create), PUT (update), DELETE (deactivate)
- All routes protected by `lib/middleware/admin-auth.ts` (session-based admin auth)

### PART 4 — Admin UI — Invoice List Page
**NOT STARTED**
- `app/admin/invoices/page.tsx` — Server Component, table with pagination, search (invoice_no, customer_name, customer_contact), filter (payment_status, country, currency, date range), sort
- Columns: invoice_no, customer_name, service_type, total_amount, currency, payment_status, issued_at, issued_by, actions (view, download PDF, mark paid, cancel)
- Status badges: pending (yellow), partially_paid (orange), paid (green), overpaid (blue), cancelled (gray)
- Export to CSV button (admin-only)

### PART 5 — Admin UI — Create Invoice Form
**NOT STARTED**
- `app/admin/invoices/create/page.tsx` — Server Component, form with validation
- Form fields:
  - Select existing booking (optional) — autocomplete search from `bookings` table, auto-fills customer info
  - Manual customer info (if no booking selected): customer_name, customer_contact, customer_email
  - Country + Currency dropdown (auto-selects bank account)
  - Service type + Description
  - Base price, Service fee, VAT amount (optional)
  - Total amount (auto-calculated)
  - Due date (optional)
  - Notes (optional)
- Submit action: creates invoice in `paid_invoices`, generates invoice_no, auto-selects bank_account_id by country/currency, returns redirect to invoice view page

### PART 6 — Admin UI — View Invoice Page
**NOT STARTED**
- `app/admin/invoices/[invoice_id]/page.tsx` — Server Component, read-only view
- Sections: Invoice header (invoice_no, dates, status), Customer info, Bank details (auto-selected), Line items, Payment summary, Payment history (list of payments with proof attachments), Internal notes
- Actions: Download PDF, Mark as Paid (opens modal to record payment), Cancel Invoice (with confirmation), Email PDF to customer (button, opens mailto: with subject/body), Send via Telegram (button, opens Telegram with pre-filled message + PDF upload prompt)
- Payment history table: payment_date, amount, payment_method, transaction_ref, proof attachments (clickable links to download), uploaded_by

### PART 7 — Admin UI — Record Payment Modal
**NOT STARTED**
- Modal component triggered from View Invoice page
- Form fields: amount, payment_method, payment_date, transaction_ref (optional), notes (optional), upload payment proof (file input, uploads to Supabase Storage, creates invoice_payment_proofs record)
- Submit action: creates invoice_payments record, uploads file, updates paid_invoices.paid_amount, recalculates payment_status, returns to View Invoice page

### PART 8 — Customer UI — Payment Proof Upload Page
**NOT STARTED**
- `app/payment-proof/[booking_id]/page.tsx` — Public/semi-public (no auth required, but booking_id must be valid)
- Validates booking_id exists in `bookings` table
- Shows invoice summary (if invoice exists for this booking): invoice_no, total_amount, payment_status, bank details (auto-selected)
- Form: customer_name, customer_contact, payment_method, payment_date, transaction_ref (optional), upload payment proof (file input), notes (optional)
- Submit action: creates invoice_payments record (if invoice exists), uploads file, sends Telegram notification to admin channel with payment proof file
- This page already exists independently for `bookings` (not `paid_invoices`) — needs extension to support both tables

### PART 9 — Admin UI — Bank Accounts Management
**NOT STARTED**
- `app/admin/bank-accounts/page.tsx` — Server Component, table with pagination
- Columns: country, currency, bank_name, account_name, account_number (masked: ****1234), is_active, actions (edit, deactivate)
- Create/Edit form: all fields except account_number masked in list view (full number shown only in edit modal)
- Audit trail: created_at, updated_at, last_updated_by (track who modified bank account details)

### PART 10 — Optional: Invoice Verification Page (Auth-Light)
**NOT STARTED**
- `app/verify/[invoiceNo]/page.tsx` — Public, no auth required
- User enters invoice_no (e.g., INV-2024-000001)
- Shows invoice summary (customer_name redacted, full details only if invoice_no matches): invoice_no, service_type, total_amount, payment_status, issue_date
- "This invoice is genuine" badge if invoice_no exists in `paid_invoices`
- Purpose: customers can verify invoice authenticity without needing login
- Design: simple, minimal, trust-focused (matches /how-to-pay design system)

### Additional Considerations
- **Invoice numbering scheme:** INV-YYYY-NNNNNN (6-digit sequential, reset yearly), or INV-YYYYMM-NNNNN (monthly reset), configurable via env var
- **Multi-currency handling:** bank_accounts table selects correct account by country + currency, invoice amounts stored in selected currency, PDF shows currency symbol
- **Telegram integration:** reuse existing `lib/telegram.ts` for payment proof notifications (admin channel), future: auto-send PDF invoice to customer Telegram if phone number provided
- **Email integration:** future: add Nodemailer/Resend for PDF invoice email delivery, optional for now
- **Security:** bank_accounts table never exposed via public API, all admin routes protected by session auth, invoice_payment_proofs file access restricted to admin and invoice owner
- **Audit trail:** track who created/modified invoices, bank accounts, payments (issued_by, uploaded_by fields)
- **Testing:** manual testing with Supabase local dev environment, test with real bank account details (sandbox), PDF generation test with multiple languages

### Schema Addendum (Session 42)
**Missing field discovered during Part 9 spec:** `country` field was missing from original PART 9 spec but is required for bank account auto-selection logic. Added to schema below:

#### paid_invoices table — additional column
| Column | Type | Notes |
|--------|------|-------|
| country | text | Myanmar / Thailand / Singapore / Japan / South Korea / Vietnam / etc. — **NEW field, was missing from original PART 9 spec, must be added to Zod schema + form + paid_invoices table** |

#### Admin Invoice Form (PART 5) — additional field
| Field | Type | Notes |
|-------|------|-------|
| country | dropdown | Myanmar / Thailand / Singapore / Japan / South Korea / Vietnam / etc. — **NEW field, was missing from original PART 9 spec, must be added to Zod schema + form + paid_invoices table** |

**Impact on PART 0-10 build plan**: `country` field ကို အောက်ပါနေရာတွေမှာ ထည့်ရန် လိုအပ်:
- PART 0: `paid_invoices` table SQL ထဲ `country` column ထည့်ရန်
- PART 7: API route Zod schema ထဲ `country` validation ထည့်ရန်
- PART 9: Form component ထဲ country dropdown field ထည့်ရန် (service_type dropdown အနီးတွင်)
- PART 2 (PDF template): invoice header/customer info block ထဲ country ကို ပြရန် (optional placement — KIM ကို template layout အဆင့်တွင် ပြန်စစ်ရန်)

**Status**: Schema locked, PART 0 (Supabase manual setup) မစသေး — schema ဒီအတိုင်း confirm ဖြစ်ပြီးမှသာ Windsurf ကို PART 1 စ ပို့ပါမည်.

---

📋 AsiaBuddy — 12Go Transport Tickets Integration: Session Completion Summary (Aug 6, 2026)

✅ ပြီးစီးပြီးသား အလုပ်များ (Build clean, git push အောင်မြင်ပြီး)

1. Bug Fixes
- servicesStrip.activities i18n key error fix (destinationTabs.activities သို့ ပြောင်း)
- lib/i18n.ts ထဲက transportTickets duplicate objects (TH locale block, 56 lines) ဖျက်ခြင်း
- MM locale ထဲက "ဥဿရဓ" → "ဇိမ်ခံ", "VIP" → "အထူးဝန်ဆောင်မှု" terminology fix
- MM locale transportTickets namespace ကို attached reference content အတိုင်း ပြန်ရေး (title, intro, FAQ x5)
- DE/FR/ES locales — EN mirror ဖြစ်နေခဲ့တဲ့ transportTickets namespace ကို real native-language translation အဖြစ် ပြောင်းလဲပြီးပါပြီ

2. Slug Verification + Fix
- chiangmai → chiang-mai, suratthani → koh-samui (12go.asia live pages နဲ့ verify ပြီးသား)
- Bangkok/Phuket/Pattaya/Krabi slugs အားလုံး individually re-verified ပြီး correct ဖြစ်ကြောင်း confirm ပြီး
- Supabase production database ထဲ migration apply ပြီးပြီး (update_updated_at_column() function ပျောက်နေခဲ့တာကို ပြန် create, duplicate seed rows 20→10 ကို cleanup ပြီး)

3. 12Go City Widget — Real Widget Embed
- Widget colors ပြောင်းလို့ မရနိုင်ကြောင်း confirm ပြီး (Shadow DOM, no color/theme attributes exposed)
- components/thailand/TwelveGoWidget.tsx client component အသစ် ဆောက်ပြီး, branded container ထဲ embed လုပ်ပြီး
- Currency ကို USD → THB ပြောင်းပြီး (fxcode="THB")
- Mobile overflow-x-auto safety ပါ ထည့်ပြီးပြီး

4. Homepage ServicesStrip — Transport Card
- Grid layout lg:grid-cols-7 ပြောင်းပြီး, Transport card (🚌) ကို /${country}/transport-tickets link နဲ့ ထည့်ပြီးပြီး

5. Chat Bot — 12Go Trigger System Prompt (major fix)
- Root cause: [SHOW_12GO_BUTTONS] client-side detection ရှိပေမယ့် system prompt ထဲ AI instruction လုံးဝ မထည့်ရသေးခဲ့ (half-implemented feature)
- Section 11 "GROUND TRANSPORT TICKETS TRIGGER RULE (12GO)" ကို Klook pattern အတိုင်း system prompt ထဲ ထည့်ပြီး
- Button persistence bug fix — follow-up questions (ဈေးနှုန်း၊ availability မေးခွန်းများ) မှာ button ပျောက်နေခဲ့တာကို fix ပြီး (route topic ပြောင်းမှသာ clear ဖြစ်တော့မယ်)
- Contact Form ground-transport queries အတွက် NEVER trigger ဖြစ်အောင် exclusion rule ထည့်ပြီး
- AI ကိုယ်တိုင် markdown link ရေးတာ (duplicate link issue) ကို ရပ်တန့်အောင် instruction ထည့်ပြီး

6. Language/URL Bug Fix (critical)
- 12go.asia ဟာ language 9 ခုပဲ support (en/de/fr/es/zh/ja/th/vi/ru) — Myanmar "mm" မပါ
- MM site language အသုံးပြုသူများအတွက် Popular Routes links အားလုံး 404 ဖြစ်နေခဲ့တာ root cause တွေ့ပြီး
- lib/twelveGo.ts ထဲ SUPPORTED_12GO_LANGS validation + safeLang fallback (unsupported lang → 'en') ထည့်ပြီး fix ပြီးပြီး

7. Affiliate Commission Tracking — Verified ✅ (with caveat)
- Desktop/mobile web browser cookie tracking confirmed working (Network tab, cookie inspection နဲ့ verify ပြီးပြီး)
- ⚠️ UNRESOLVED CAVEAT: Customer ရဲ့ phone ထဲမှာ 12Go native app install ထားရင်, affiliate link click ဟာ app ထဲကို ပွင့်သွားနိုင်ပြီး, app checkout ကို affiliate ID တွဲမတွဲ 12Go public documentation ထဲမှာ တိတိကျကျ မဖော်ပြပါ — 12Go affiliate support (affiliate@12go.asia) ကို confirm-request mail ပို့ရန် လိုနေဆဲ (action item အောက်ကြည့်ပါ)
- Codebase-wide sweep လုပ်ပြီး, 12Go link ထုတ်ပေးတဲ့ code path အားလုံး (generate12GoLink() + TwelveGoWidget.tsx) မှာ affiliate ID 16583584 အမြဲပါနေကြောင်း 100% confirm ပြီးပြီး

8. Build Status
- npm run build ကို session အတွင်း ၈ ကြိမ်ကျော် run ခဲ့ပြီး, final state clean (0 errors)
- git push အောင်မြင်ပြီးပြီး

---

🔴 ကျန်နေသေးတဲ့ Action Items
1. Sub-ID tracking test — generate12GoLink() ထဲ sub_id parameter ထည့်ပြီး test click လုပ်ကြည့်ရန် (affiliate dashboard ထဲ click/booking log ခွဲသိနိုင်ရန်)
2. Live production monitoring — Supabase migration apply ပြီးနောကျ transport-tickets page ရဲ့ route cards, chat bot 12Go trigger, widget အားလုံး production ပေါ်တွင် functional check

---

🟢 ဆုံးဖြတ်ပြီးသား Decisions
- 12Go widget internal styling ကို ပြောင်းလို့ မရ (technical limitation) — branded container frame approach လက်ခံပြီးသား
- Route architecture: /thailand/transport-tickets standalone route ဆက်လက်တည်မြဲ
- Widget currency: THB (Thai Baht) အဖြစ် သတ်မှတ်ပြီးပြီး
- Color system: #D4AF37 primary gold source of truth ဆက်သုံး

---

## Session — 10 August 2026 — Tours Page Redesign (Finalized Plan) + Gemini Gems Refinement Status

### Tours Page (`/thailand/tours` + `/thailand/tours/[slug]`) — Finalized Strategy
- Existing built infrastructure is being KEPT, not rebuilt: SSR pages with `generateMetadata` SEO, the Google Translate API pipeline translating `tours.title`/`description`/`highlights`/`inclusion`/`exclusions` at render time across all 6 languages (EN/MM/TH/DE/FR/ES), `app/sitemap.ts` auto-generation from Supabase `tours`, and the SSR Day accordion structure on the itinerary page.
- DECISION — Remove `price_from` from the sticky booking widget entirely. Pricing will never be shown publicly on the site; it is considered too volatile/risky to display. Price is only given to a customer when they specifically request it, and only by staff responding manually (using the internal Gemini Gems).
- DECISION — Upgrade the existing Day accordion visually by adding a real curated photo to each day, sourced from a new reusable "Landmark Photo Library" (real stock photos, e.g. Unsplash/Pexels with commercial-use licenses, or AsiaBuddy's own photos — NOT AI-generated composites), keyed by landmark/location name so the same photo can be reused across multiple tours that visit the same place (e.g. Grand Palace, Floating Market). The existing translated text stays as real HTML from Supabase — only a photo layer is added alongside it. This preserves full SEO indexability and all 6 languages.
- REJECTED APPROACH (do not build this) — A single flattened AI-generated poster image per day with the day title/description text baked into the image pixels. Rejected because baked-in text cannot be language-mirrored (breaks the 6-language requirement) and is not crawlable by search engines. Photo and text must always remain separate layers.
- DECISION — The "More Details/Book Now" CTA on the tour detail page will route to the Contact Us page (not to the existing `HumanOperatorChat` widget), with the specific tour's page URL automatically attached to the inquiry submission. This is important so operators can see which tour page a customer was viewing when they follow up and respond to the inquiry.
- Confirmed Supabase (not a static file) remains the right backing store given ~15-20 tours for Thailand, reusing the existing `tours`/`itineraries` tables and Admin CRUD rather than building a parallel static content system.
- Note: two Supabase free-tier protective measures are already in place (implemented via Windsurf/Claude Code in a prior session) — a keep-alive endpoint at `app/api/keep-alive/route.ts` (needs an external cron ping every 2-3 days to prevent project auto-pause) and a weekly automated Postgres backup to Cloudflare R2 via GitHub Actions (`scripts/backup-supabase.ts`, `.github/workflows/weekly-backup.yml`, 4-backup retention). Note the R2 backup covers Postgres tables only (via `pg_dump`) — it does NOT back up Supabase Storage image files, which will matter once the Landmark Photo Library is built.
- Next step (not yet started): design the exact Supabase schema for the Landmark Photo Library and the day-to-landmark linking mechanism, then build the actual UI changes as separate staged Windsurf prompts, one file per part, per this project's usual workflow convention.

### Gemini Gems Refinement — Status (documentation only; these Gems are edited manually in the Gemini Gems UI, not via Windsurf/codebase changes)
- Revised and drafted (pending KIM's final review/manual paste into Gemini Gems): Hotel Inquire, Flight Ticket Inquire, Ticket and Activities Inquire, Car Rental Inquire — all four now follow a shared auto-detected-stage pattern (Discovery/Verification/Booking Confirmation, or KB-lookup + fuzzy-match for Car Rental) while preserving each Gem's own pre-existing unique business rules (e.g. the Flight/Activities highest-cross-platform-price quoting rule; Car Rental's fixed Knowledge Base price list).
- In progress: Follow up Inquire Gem — the first-touch responder that parses a raw web inquiry (arriving via the Contact Us form, including the tour page link when a customer inquires from a tour detail page) and sends a tailored greeting plus follow-up questions per service category. Being expanded from the original flat 4-question-per-category template to fuller, more carefully reasoned question sets per category, matching the depth of the already-expanded Hotel survey.
- Also in progress: Tour Itinerary Generator Gem — converts a tour poster/program into a full Burmese-language day-by-day itinerary (Brief Itinerary, Itinerary Details, Travel Tips, Do's and Don'ts sections), to be used by staff to generate a tailored itinerary in response to a customer inquiry.

---

## Session — 22 August 2026 — Tour Detail Page Hero Fix + Redesign, Landmark Photo System Removal

### 1. Hero Image Bug Fix — COMPLETED
- Root cause: app/[country]/tours/[slug]/page.tsx Hero section read `t.image_url` (a string field) but the `tours` table schema only has an `images` JSONB array column — no `image_url` column exists. This caused the Hero to always fall back to the gradient placeholder, on every tour, site-wide.
- Fix: Hero now reads `t.images[0]` as the cover photo. Tour TypeScript interface updated to drop the non-existent `image_url` field and reflect `images: string[]`. generateMetadata's Supabase select + OpenGraph image also updated to use `images` instead of `image_url`.
- scripts/check-tour-image.ts updated to verify against the correct field.

### 2. Loading Skeleton — COMPLETED
- Added app/[country]/tours/[slug]/loading.tsx (Next.js App Router loading UI convention) to give visual feedback during page navigation.
- Context: investigation found the perceived slow-load was not a bug — it's the synchronous Gemini/Google Translate API call for non-English languages on cache miss (translation cached 1hr via unstable_cache). English users and cached non-English visits are fast (150-500ms); first-visit non-English can take 650-2500ms with zero loading feedback previously. Skeleton addresses the UX gap; actual translation latency was left as-is (acceptable given caching).

### 3. Hero Section Full Redesign — COMPLETED
Applies automatically to all 25 tours (shared single Hero component).
- Readability: stronger gradient overlay (black/85 → black/50 → black/10), added drop-shadow on title/description text, responsive title sizing (text-2xl through xl:text-6xl so titles fit 1-2 lines on mobile instead of wrapping 3+), responsive hero height (h-[42vh] on mobile up to h-[65vh] desktop).
- Premium polish: Ken Burns slow zoom/pan animation on hero image (new @keyframes ken-burns in app/globals.css), restyled duration badge (backdrop-blur, border, shadow), bouncing scroll-down chevron cue, radial vignette overlay. Fallback (no-image) gradient state gets the same treatment so tours without a photo yet still look intentional.
- eslint.config.mjs updated (react/display-name rule disabled) to resolve an unrelated ESLint v9 compatibility build error encountered mid-session.

### 4. Landmark Photo Library System — REMOVED (decision confirmed this session, implemented in a prior session but not previously logged here)
- The Landmark Photo Library plan described in the 10 August 2026 entry above (Supabase schema for day-to-landmark photo linking, `components/[country]/LandmarkPhotoPicker.tsx`) has been SUPERSEDED. That approach was built, then deliberately removed.
- components/admin/LandmarkPhotoPicker.tsx deleted entirely.
- app/admin/page.tsx simplified: removed landmark photo picker UI, `image_url`/`landmark_id`/`landmark_photo` fields from itinerary day data structures, and related Supabase queries.
- Replaced with: simpler direct image upload in the admin panel, organized by `country/slug` folder structure, with a guard requiring country + slug to be filled before upload is allowed. This connects directly to the still-open Task C below.
- Note for future sessions: any reference to "Landmark Photo Library" or "day-to-landmark linking mechanism" in the 10 August entry above is OBSOLETE — do not resume that plan without re-confirming with KIM.

### Known Open / Deferred Items (carried forward)
- Task C (tour-images upload path restructure to tour-images/{country}/{tour-slug}/{filename}, country passed through upload handler) — IN PROGRESS, connects to the admin upload changes in section 4 above.
- Task D (manual production verification: Book Now → Contact form → Telegram notification includes referrer link) — NOT YET DONE.
- Task E (stale refresh token, cosmetic log noise only) — optional, low priority, not started.
- Floating widget overlap bug: FloatingChatButton (bottom-right) and FloatingContactButton (bottom-left), both fixed/z-9999, overlap page content ("About This Tour" heading, "RESERVE YOUR SPOT" card) on the tour detail page at certain viewport heights — likely site-wide since both are injected in app/[country]/layout.tsx. Investigated, root cause identified (content lacks bottom clearance for the fixed-position widgets), NOT YET FIXED — deferred as a separate task.

---

## Session — 22 August 2026 (continued) — Floating Widget Fix + Tour Code Field

### 1. Floating Widget Overlap Bug — FIXED (revised from earlier same-day fix)
- Earlier same-day attempt added pb-[160px] bottom padding to the tour detail page's content container — this was INSUFFICIENT and the bug recurred, because FloatingChatButton and FloatingContactButton are position:fixed relative to the viewport, not the page bottom. On short-height browser windows (header + hero already filling most visible height), content immediately after the hero could sit under the widgets with zero scrolling — the earlier fix only helped when scrolled to the true page bottom.
- Real fix: both widgets' always-visible tooltip ("Plan your trip now!") and badge ("LIVE SUPPORT" / "QUICK INQUIRY") now only render on hover (desktop) / tap-to-reveal (mobile), shrinking the default footprint from ~150px to just the 64px button. This resolves the overlap at any viewport height, not just specific breakpoints — a more robust fix than the padding approach.
- Note for future sessions: if any lingering references to the pb-[160px] tour-detail-page workaround are found, they can likely be simplified/removed now that the root cause (widget footprint) is fixed at the source.

### 2. New Feature — Tour Code Field
- Purpose: reference code (e.g. "ABT-TP") for ground operations staff to use when creating bookings — not customer-facing marketing content.
- DB: nullable `tour_code` TEXT column added to `tours` table (supabase/migrations/20260822_add_tour_code.sql). Applied manually via Supabase Dashboard SQL Editor (Supabase CLI not installed in this dev environment — note for future migrations, same manual process will be needed unless CLI is set up).
- Admin panel (app/admin/page.tsx): text input added in the Tour Basic Info section, positioned directly above the Title field. Optional/nullable — not all tours need one.
- Display: plain text on the tour detail page's Overview section, directly above the "About This Tour" heading (format: "Tour Code: ABT-TP"). Deliberately placed outside the Hero section per KIM's direction — Hero stays purely visual, Overview is where operational/reference info belongs. Only renders when a tour has a tour_code set.
- First tour populated: bangkok-temple-premier-mall-discovery-tour → "ABT-TP". Remaining 24 tours do not have a code yet — to be filled in via admin panel as needed.

### Status: All items from this full session (Hero image fix, loading skeleton, Hero redesign, landmark photo system removal, Task C folder restructure + migration, Task D verified, Task E closed, widget overlap fix, Tour Code field) are complete and pushed.

---
