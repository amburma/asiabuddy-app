# AsiaBuddy — Technical Roadmap & Architecture Guide
> Last Updated: 26 June 2026 — Session 13

---

## 📁 Project Structure

```
asiabuddy-main/
├── app/
│   ├── page.tsx                    ← Main Landing (Country List)
│   ├── api/
│   │   ├── web-chat/               ← Free Tier Chat API (9 chat boxes)
│   │   ├── booking-chat/           ← Pay-as-you-go HumanOperatorChat API
│   │   ├── chat/                   ← Country Chat API
│   │   ├── webhook/                ← Customer Telegram Bot
│   │   ├── operator-webhook/       ← Operator Telegram Bot
│   │   └── inquiry/                ← Booking Inquiry + Telegram Alert
│   ├── [country]/                  ← Dynamic Country Routes (Next.js)
│   │   ├── layout.tsx              ← Country Layout
│   │   ├── page.tsx                ← Destination Page
│   │   ├── tours/
│   │   │   ├── page.tsx            ← Tours Listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx        ← Tour Itinerary (SSR)
│   │   └── not-found.tsx
│   └── sitemap.ts                  ← Auto-generated from Supabase
│
├── src/
│   ├── services/
│   │   └── gemini.ts               ← AI Core (getSystemInstruction, generateAIResponse)
│   └── bot.ts                      ← Telegram Bot
│
├── components/
│   ├── shared/                     ← Shared Components
│   └── countries/
│       ├── thailand/
│       └── singapore/
│
├── lib/
│   ├── supabase.ts                 ← Lazy Init (Do NOT change)
│   ├── database.ts
│   └── pdfGenerator.ts
│
├── data/
│   ├── countries.ts                ← ★ Edit this file only (country list)
│   ├── thailand/
│   └── singapore/
│
├── next.config.js                  ← Redirects defined here
├── vercel.json                     ← framework: nextjs only
└── .env.local                      ← Local env (never commit to Git)
```

---

## 🌐 Domain & Deployment Architecture

| Domain | Framework | Route | Status |
|--------|-----------|-------|--------|
| `asiabuddy.app` | Next.js | `/` | ✅ Live |
| `asiabuddy.app/thailand` | Next.js SSR | `/[country]` | 🔄 Migrating |
| `asiabuddy.app/singapore` | Next.js SSR | `/[country]` | 🔜 Planned |
| `asiabuddy.app/japan` | Next.js SSR | `/[country]` | 🔜 Planned |
| `asiabuddy.app/vietnam` | Next.js SSR | `/[country]` | 🔜 Planned |
| `thailand.asiabuddy.app` | Vite (deprecated) | — | 🔄 Remove after migration |

> ⚠️ Subdomain architecture deprecated. All countries now served under `asiabuddy.app/[country]` via Next.js dynamic routing.
> Adding a new country = add data to Supabase only. No new Vercel project needed.

---

## � Migration Plan — Monorepo + Dynamic Country Routing

### Why Migrating
`thailand.asiabuddy.app` was built on Vite (SPA). Google Bot cannot render JavaScript → pages not indexed → SEO impossible. Since AsiaBuddy is a product sales platform, SEO is the primary revenue channel. Decision: migrate to Next.js Monorepo.

### Architecture Change
BEFORE                               AFTER

─────────────────────────────────────────────────

thailand.asiabuddy.app (Vite)   →   asiabuddy.app/thailand (Next.js SSR)

singapore.asiabuddy.app (none)  →   asiabuddy.app/singapore (data only)

vietnam.asiabuddy.app (none)    →   asiabuddy.app/vietnam (data only)

### Adding a New Country (New Process)
1. Supabase → insert data with `country='singapore'` 
2. Done ✅ — No new Vercel project. No new codebase. No new deploy.

### Migration Phases

| Phase | Task | Owner | Est. Time |
|-------|------|-------|-----------|
| Phase 1 | Audit Vite codebase — inventory components | User | 2 hrs |
| Phase 2 | Next.js `app/[country]/` dynamic routing + middleware | Windsurf | 1 day |
| Phase 3 | Chat boxes (9) + HumanOperatorChat migration | Windsurf | 1 day |
| Phase 4 | SEO — generateMetadata + ISR + sitemap.ts | Windsurf | 4 hrs |
| Phase 5 | next.config.js redirects + Vercel + DNS | User | 2 hrs |
| Phase 6 | Destination Page + Tours Listing + Tour Itinerary + Admin CRUD | Windsurf | 3–4 days |
| Phase 7 | Local full test → git push → Production verify → Remove Vite project | User | 1 day |

### Files That Must NOT Change During Migration
| File/Route | Reason |
|-----------|--------|
| `app/api/` — all routes | Chat + Booking backend — do not touch |
| `lib/supabase.ts` | Lazy init — do not modify |
| `src/services/gemini.ts` | AI core — do not modify |
| `.env.local` | Windsurf must never read this |
| API URL `https://asiabuddy.app/api/web-chat` | Must remain absolute — do not change |

### Migration Success Criteria
- `asiabuddy.app/thailand` → Destination Page renders
- `asiabuddy.app/thailand/tours` → Tours Listing renders
- `asiabuddy.app/thailand/tours/[slug]` → SSR Itinerary renders
- All 9 chat boxes working with `country=thailand` 
- HumanOperatorChat → Telegram alert delivered
- `asiabuddy.app/singapore` → renders (data only, no code change)
- Invalid country → redirects correctly
- Google Bot can index all tour pages

---

## 📁 Vite Codebase Audit (Phase 1 — Completed)

### Vite Project Root
`app/thailand/` is the Vite project root.

### Full Structure
app/thailand/

├── src/

│   ├── components/         ← All components (Chat boxes + shared)

│   │   ├── AccommodationChat.tsx

│   │   ├── ConciergeChat.tsx

│   │   ├── FoodChat.tsx

│   │   ├── MedicalChat.tsx

│   │   ├── NightlifeChat.tsx

│   │   ├── PhrasesChat.tsx

│   │   ├── ShoppingChat.tsx

│   │   ├── TransportChat.tsx

│   │   ├── TripPlannerChat.tsx    ← 9 Chat boxes ✅

│   │   ├── HumanOperatorChat.tsx  ← Booking chat ✅

│   │   ├── BookingChat.tsx

│   │   ├── BookingWebForm.tsx

│   │   ├── CookieBanner.tsx

│   │   ├── CurrencyConverter.tsx

│   │   ├── DestinationExplorer.tsx

│   │   ├── EmergencyBanner.tsx

│   │   ├── EtiquetteGuide.tsx

│   │   ├── GuideModal.tsx

│   │   ├── InstallBanner.tsx

│   │   ├── IOSInstallBanner.tsx

│   │   ├── LanguageSelector.tsx

│   │   ├── LanguageWelcome.tsx

│   │   ├── LawsGuide.tsx

│   │   ├── MarkdownRenderer.tsx

│   │   ├── TravelToolbox.tsx

│   │   ├── TripChecklist.tsx

│   │   └── (others)

│   ├── config/

│   ├── data/

│   ├── lib/                ← Supabase client (Vite)

│   ├── services/           ← geminiService.ts

│   ├── App.tsx             ← 60KB — All routes + logic

│   ├── main.tsx

│   ├── i18n.ts             ← 87KB — All translations

│   ├── types.ts

│   ├── bot.ts

│   └── index.css

├── admin/                  ← Next.js page (DO NOT TOUCH) ✅

├── blog/                   ← Next.js page (DO NOT TOUCH) ✅

├── clogin/                 ← Next.js page (DO NOT TOUCH) ✅

├── public/

├── index.html

├── vite.config.ts          ← DELETE after migration

├── package.json            ← Vite deps (separate from root)

└── .env.local              ← Windsurf must NEVER read this

### Migration Rules for This Structure

| Item | Action | Reason |
|------|--------|--------|
| `src/components/` — Chat boxes (9) | Migrate → `components/thailand/` | Reuse in Next.js |
| `src/components/` — HumanOperatorChat | Migrate → `components/thailand/` | Reuse in Next.js |
| `src/components/` — Shared components | Migrate → `components/shared/` | Reuse across countries |
| `src/services/geminiService.ts` | Migrate → `src/services/` (root) | Already exists — merge carefully |
| `src/lib/` — Supabase client | Check conflict with root `lib/supabase.ts` | Root lazy init must NOT change |
| `src/App.tsx` (60KB) | Read carefully — extract routes + logic | Do not copy blindly |
| `src/i18n.ts` (87KB) | Migrate → root `src/` or `lib/` | Large file — handle carefully |
| `src/data/` | Migrate → root `data/` | Merge with existing |
| `admin/`, `blog/`, `clogin/` | DO NOT TOUCH | Already Next.js pages — live ✅ |
| `vite.config.ts` | DELETE after migration complete | Vite no longer needed |
| `.env.local` | DO NOT READ | User manages keys only |

### Key Observations

- **App.tsx is 60KB** — all routing and page logic lives here. Must be read fully before migration.
- **i18n.ts is 87KB** — translation file. Must be preserved exactly.
- **lib/ in Vite** may conflict with root `lib/supabase.ts` — lazy init must be kept.
- **admin/, blog/, clogin/** are already Next.js pages under `app/thailand/` — do not modify.

---

## 🤖 AI Chat Box — API Flow

### Free Tier (9 Chat Boxes)

```
AccommodationChat, ConciergeChat, FoodChat, MedicalChat,
NightlifeChat, PhrasesChat, ShoppingChat, TransportChat, TripPlannerChat

    thailand.asiabuddy.app (Vite)
         ↓
    geminiService.ts → getConciergeResponse()
         ↓  [sends: message, sessionId, systemInstruction]
    https://asiabuddy.app/api/web-chat
         ↓  [reads: message, sessionId, systemInstruction]
    src/services/gemini.ts → generateAIResponse()
         ↓  [model: gemini-2.5-flash-lite]
    GEMINI_API_KEY (Free Tier)
         ↓
    Supabase → chat_histories (country='thailand')
```

### Pay-as-you-go (HumanOperatorChat)

```
HumanOperatorChat  ← (triggered by Book Now button)

    thailand.asiabuddy.app (Vite)
         ↓
    getConciergeResponse() via geminiService.ts
         ↓
    https://asiabuddy.app/api/booking-chat
         ↓  [model: gemini-2.5-flash]
    GEMINI_PRO_API_KEY (Pay-as-you-go)
```

---

## 🤖 AI Models

| Route | Model | API Key | Purpose |
|-------|-------|---------|---------|
| `/api/web-chat` | `gemini-2.5-flash-lite` | `GEMINI_API_KEY_1/2/3` (rotation) | Info chat (9 boxes) |
| `/api/booking-chat` | `gemini-2.5-flash` | `GEMINI_PRO_API_KEY` | HumanOperatorChat (negotiate) |

### Free Tier Key Rotation Strategy

**Current (Startup Phase):** 3 Free Tier keys → Round Robin rotation → 60 requests/day total

```
Request 1 → GEMINI_API_KEY_1
Request 2 → GEMINI_API_KEY_2
Request 3 → GEMINI_API_KEY_3
Request 4 → GEMINI_API_KEY_1  (repeats)
...
```

**Future (Scale Phase):** Replace with single Pay-as-you-go key → no code change needed

```
GEMINI_API_KEY_1 = [Pay-as-you-go key]
# GEMINI_API_KEY_2, GEMINI_API_KEY_3 → remove from Vercel
```

> ⚠️ Rotation logic lives in `src/services/gemini.ts` only. Never touch Vite/frontend.

---

## 🧠 System Instruction (ThaiGuide)

File: `src/services/gemini.ts` → `getSystemInstruction()` 

Key rules enforced in system instruction:

| Rule | Description |
|------|-------------|
| Language detection | Mirror user's language — English → English, Burmese → Burmese, German → German. Never default to Thai unless user writes Thai. |
| Thinking state | Never display "ThaiGuide is thinking..." or any variation. Process silently. |
| Structural labels | Never show [Hook], [Problem], [Benefit], [Offer], [CTA] in response. Invisible only. |
| Token optimization | Direct, concise answers only. No filler. 1-line intro max. |
| Sales approach | Natural, non-pushy. Guide toward Book Now only when it feels helpful. |
| Scope | Thailand travel only. Decline unrelated questions politely. |

**Language override in `app/api/web-chat/route.ts`:**
```ts
const finalInstruction = systemInstruction
  ? `${systemInstruction}\n\nABSOLUTE LANGUAGE RULE — THIS OVERRIDES ALL OTHER INSTRUCTIONS:
     Detect the language of the user's latest message and respond EXCLUSIVELY in that same language.`
  : getSystemInstruction(country)
```

---

## 🌐 Translation Architecture

| Content Type | Method | Reason |
|---|---|---|
| UI Text (buttons, menus, labels) | `i18n.ts` static file | Fast, Offline, accurate |
| Chat responses | Gemini AI (auto language detect) | Dynamic, natural language |
| Blog, Tours, Destinations (long content) | Google Translate API | Long content, cost-effective |

### Rules
- Database stores English only — no multi-language columns needed
- User selects language → stored in preference → applied app-wide
- Google Translate API translates DB content (descriptions, tours, blog) to user's selected language at render time
- `i18n.ts` handles all UI text — never use Google Translate for UI elements
- Chat API already detects user language automatically via ABSOLUTE LANGUAGE RULE in `web-chat/route.ts` 

### Google Translate API — Integration Point
- Trigger: when user's selected language ≠ `en` 
- Apply to: `destinations.description`, `destinations.short_description`, `tours.title`, `tours.description`, `tours.short_description`, `tours.highlights`, `tours.inclusion`, `tours.exclusions` 
- Do NOT apply to: slugs, IDs, prices, dates, status fields
- Environment variable: `GOOGLE_TRANSLATE_API_KEY` (to be added to `.env.local` and Vercel)

### Updated Last: 17 June 2026

---

## 🔑 Environment Variables

### Next.js → `asiabuddy-main/.env.local` 

```env
# AI — Free Tier Key Rotation (web-chat, 9 chat boxes)
GEMINI_API_KEY_1=            # Free Tier Key 1 — Round Robin rotation
GEMINI_API_KEY_2=            # Free Tier Key 2 — Round Robin rotation
GEMINI_API_KEY_3=            # Free Tier Key 3 — Round Robin rotation
# Total: 60 requests/day (3 × 20)
# Future: set GEMINI_API_KEY_1 to Pay-as-you-go, remove _2 and _3

# AI — Pay-as-you-go (booking-chat only)
GEMINI_PRO_API_KEY=          # Pay-as-you-go — /api/booking-chat (HumanOperatorChat)

# Supabase (Frontend)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase (Backend)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Telegram
TELEGRAM_BOT_TOKEN=          # @asiabuddy_bot (Customer Bot)
OPERATOR_BOT_TOKEN=          # @asiabuddy_ops_bot (Operator Bot)
OPERATOR_GROUP_CHAT_ID=      # Sales Inquire Telegram Group ID
OPS_GROUP_CHAT_ID=           # Operator Telegram Group ID

# Google Drive
GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_SERVICE_ACCOUNT_JSON=

# Email
GMAIL_USER=
GMAIL_APP_PASSWORD=
ADMIN_EMAIL=

# Environment
NODE_ENV=development
```

### Vite → `asiabuddy-main/app/thailand/.env.local` 

```env
# AI
VITE_GEMINI_PRO_API_KEY=     # Pay-as-you-go — BookNowChat only

# Supabase (Frontend only)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## 🗄️ Database Design (Supabase)

```
users
├── telegram_id     (PK, nullable)
├── username
└── created_at

chat_histories
├── id
├── telegram_id     (FK → users)
├── role            "user" | "model"
├── message_text
├── country         "thailand" | "singapore" | "japan"
└── timestamp

bookings
├── id
├── telegram_id     (FK → users)
├── tour_type       "tour" | "flight" | "car" | "taxi"
├── status          "pending" | "confirmed" | "cancelled"
├── details         (JSON)
└── created_at

invoices
├── id
├── booking_id      (FK → bookings)
├── amount
├── status          "unpaid" | "paid"
└── pdf_url
```

> ⚠️ Never create duplicate tables. Use `country` column to separate data per country.

### RLS Policies (Required)

Both tables need RLS policies or INSERT will fail with error `42501`.

```sql
-- chat_histories
CREATE POLICY "Allow all operations on chat_histories"
ON chat_histories FOR ALL
USING (true) WITH CHECK (true);

-- bookings
CREATE POLICY "Allow all operations on bookings"
ON bookings FOR ALL
USING (true) WITH CHECK (true);
```

---

## 📦 Booking Workflow — System Architecture

### Phase 1 — Customer Interaction & Lead Generation

```
Step 1: Customer clicks "Book Now" button
Step 2: BookNowChat opens (Pay-as-you-go AI)
        → AI reads Google Sheets Knowledge Base and negotiates pricing
Step 3: Customer agrees to terms
        → AI triggers Contact Details Information Form
```

### Phase 2 — Data Submission & Sales Alert

```
Step 4: Customer completes Contact Details Form
        Fields: name, phone, email (optional), social handles
        → Agreement Checkbox required before submit
        → Chat history + form data bundled together
        → POST /api/inquiry → Supabase bookings table

Step 5: Instant alert sent to Sales Telegram Group
        → Bot: @asiabuddy_ops_bot
```

### Phase 3 — Approval & Invoice Automation

```
Step 6: Sales team reviews alert in Telegram
        → Clicks [Approve ✅]

Step 7: System generates PDF Invoice automatically
```
Step 7 execution order:
1. updateBookingStatus → confirmed
2. generateAndUploadInvoicePDF
3. ctx.editMessageText → Telegram responds immediately
4. sendMessageWithMigrationRetry → Ops group handover
5. await sendInvoiceEmail → Customer + Admin email (reliable, after response)

| Customer Scenario | System Action | Team Action Required |
|-------------------|---------------|----------------------|
| Email provided | Auto-email PDF Invoice to customer | None — fully automated |
| Email NOT provided | Special alert triggered in Telegram | Urgent: contact customer manually via Phone / Telegram / Viber / WhatsApp / Messenger |

> 💡 UX Rule: Contact form UI must display this message clearly:
> *"If you provide an email, your invoice will be sent automatically.
> If you leave the email blank, we will send the invoice via your provided social contact/messaging handles."*

### Phase 4 — Operations Handover

```
Step 8: Data forwarded to Operations Group (@asiabuddy_bot)
        → Operations team manually processes booking to completion
```

---

## ➕ Adding a New Country (New Process — Monorepo)

> ⚠️ Old process (separate Vite project per country) is deprecated.

### Step 1 — Supabase
Insert destinations and tours data with `country='[country_slug]'` 

### Step 2 — data/countries.ts
```ts
{
  id: "singapore",
  name: "Singapore",
  status: "coming_soon",
  slug: "/singapore",
  flag: "🇸🇬"
}
```
> Note: `slug` is now a relative path (e.g. `/singapore`), not a subdomain URL.

### Step 3 — Verify
Visit `asiabuddy.app/singapore` — page renders automatically via `app/[country]/page.tsx` 

### Step 4 — When Ready to Go Live
Change `status: "coming_soon"` → `status: "live"` in `data/countries.ts`

---

## ✅ Country Deploy Checklist

- [ ] Vercel — new project created
- [ ] `vite.config.ts` → `base: "/"` 
- [ ] Deployment Protection → OFF
- [ ] Domain → `[country].asiabuddy.app` linked
- [ ] Porkbun DNS → CNAME record added
- [ ] `next.config.js` → 2 redirect rules added
- [ ] `data/countries.ts` → subdomain URL used for slug
- [ ] Env vars set in Vite Vercel project
- [ ] `geminiService.ts` → absolute URL confirmed
- [ ] Vercel → 🟢 Ready confirmed
- [ ] Browser test: ChatBox + Booking both working

---

## 🔴 Strict Rules — Never Break These

| Rule | Reason |
|------|--------|
| Never use relative API path `/api/...` in Vite | Must use absolute `https://asiabuddy.app/api/...` |
| Never use `process.env` in Vite | Use `import.meta.env.VITE_...` only |
| Never use `NEXT_PUBLIC_` prefix in Vite | Vite does not recognize it |
| Never use `SUPABASE_SERVICE_ROLE_KEY` in Vite | Exposed in browser → security risk |
| Never commit `.env.local` to Git | Security |
| Never hardcode API keys in code | Use Vercel Dashboard only |
| Never let Windsurf read `.env.local` | Keys will be exposed |
| Never git push without local test passing | Live site will break |
| One domain per Vercel project only | Avoid domain conflicts |
| `lib/` → always use lazy Supabase init | Prevents build-time crash |
| `data/countries.ts` is the only source of truth | Never hardcode country list |
| Never use separate Vite project per country | All countries must use Next.js Monorepo `app/[country]/` |
| Never use subdomain URLs in `data/countries.ts` slug | Use relative paths e.g. `/singapore` |
| Never create middleware.ts | Next.js deprecated — use proxy.ts only |
| Never use params.country directly in generateMetadata | params is a Promise in Next.js — always await params first |
| tours table price column is price_from | Never use tour.price — use tour.price_from |
| app/[country]/page.tsx is Server Component | Never add "use client" — SEO requires SSR |
| DestinationTabs.tsx is Client Component | "use client" must always be present |
| TripChecklistModal.tsx is Client Component | "use client" required for useState modal |
| City names from Supabase only | Never hardcode city names in DestinationTabs or page |
| Windsurf quota exhausted | Close All → provide fresh prompt — never continue broken session |

---

## 🐛 Known Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Chat responds in Thai only | `systemInstruction` not passed to backend | Added `systemInstruction` field in request body |
| `[Problem]` / `[Benefit]` visible in response | System instruction not hiding structural labels | Updated `getSystemInstruction()` |
| `booking-chat` 500 error | Model `gemini-1.5-pro` deprecated | Changed to `gemini-2.0-flash` |
| Free tier quota exceeded | 20 req/day limit on `gemini-2.5-flash-lite` | Use Pay-as-you-go key for `GEMINI_API_KEY` in production |
| `chat_histories` INSERT error `42501` | RLS enabled but no INSERT policy | Add RLS policy (see Database section) |
| `/thailand` not working | Vercel rewrite cannot handle external URLs | Use `next.config.js` redirects instead |
| CORS error | Origin restriction | Add `Access-Control-Allow-Origin: '*'` |
| Assets not loading | `vite.config.ts` base wrong | Set `base: "/"` |
| Ops group message not delivered | OPS_GROUP_CHAT_ID was set to old group ID (-5265245735) which migrated to supergroup | Updated OPS_GROUP_CHAT_ID to -1003883899557 in Vercel |
| Approve took 40+ seconds | sendInvoiceEmail() was awaited before ops handover | Moved email to after ops handover + ctx.editMessageText |
| Email not sending on Vercel | Fire-and-forget email killed when Vercel function ended | Changed back to await — placed after ops handover so Telegram responds fast |
| Chat history missing in Ops handover | Web bookings have telegram_id=null — getChatHistory() returned nothing | Use booking.details.chatSummary for web bookings instead |
| HumanOperatorChat flow | Phase 1-4 fully implemented | ✅ Completed — June 2026 |
| HumanOperatorChat welcome message in Thai | .slice(0,2) on language prop caused wrong key match | Replaced with explicit if/else language matching |
| middleware.ts conflicts with proxy.ts | Next.js deprecated middleware.ts | Always use proxy.ts only — never create middleware.ts |
| generateMetadata params error | params is Promise in Next.js app router | Always type as Promise<{...}> and await before use |
| DestinationTabs "Coming soon..." | destinations table had "Thailand" row (null content) at index 0; DestinationTabs defaulted to first result | Filter out null-content destinations in app/[country]/page.tsx before passing to DestinationTabs |

---

## 📝 Variable Rules Quick Reference

| | Next.js | Vite |
|--|---------|------|
| Frontend prefix | `NEXT_PUBLIC_` | `VITE_` |
| Access method | `process.env.X` | `import.meta.env.X` |
| Backend prefix | none needed | ❌ not available |
| `NODE_ENV` | ✅ use | ❌ do not set (Vite handles automatically) |

## 🗄️ Google Drive Knowledge Base

### Folder Structure
J:\My Drive\AsiaBuddy_App\Thailand\
├── Tours\ (Pricing, Itineraries, Policies, Request_Invoice)
├── Airport_Transfer\ (Pricing, Policies, Request_Invoice)
├── Hotel\ (Pricing, Policies, Request_Invoice)
├── Flights\ (Pricing, Policies, Request_Invoice)
├── Tickets_Activities\ (Pricing, Policies, Request_Invoice)
└── _AI_Knowledge_Base\
    ├── master_packages (Google Sheets) — Headers done ✅
    ├── master_pricing (Google Sheets) — Headers done ✅
    ├── master_policies (Google Sheets) — Headers done ✅
    ├── master_faq (Google Sheets) — Headers done ✅
    └── ai_rules (Google Sheets) — Rules RULE001-RULE008 added ✅

### Notes
- Same folder structure applies to all future countries (Singapore, Japan, Vietnam)
- Partner data comes in any format → use Claude Partner Data Converter System Prompt → paste into Sheets
- AI reads _AI_Knowledge_Base only (not individual service folders)
- Google Sheets API integration: pending
- AI negotiation + Contact Form trigger: pending

---

## � Operator Panel (Clogin)

### Existing
| Path | Purpose | Status |
|------|---------|--------|
| `app/thailand/clogin/page.tsx` | Content creator login (Supabase Auth) | ✅ Live |
| `app/thailand/admin/page.tsx` | Blog / Destination / Tour management | ✅ Live |

### Phase 5 — To Build
| Path | Purpose | Status |
|------|---------|--------|
| `app/[country]/page.tsx` | Destination Page — Hero, Dual CTA, Trust Strip, Featured Tours | 🔜 Pending |
| `app/[country]/tours/page.tsx` | Tours Listing Page with filter pills | 🔜 Pending |
| `app/[country]/tours/[slug]/page.tsx` | Tour Itinerary Page — SSR, Day accordion, Sticky booking widget | 🔜 Pending |
| `app/sitemap.ts` | Auto sitemap from Supabase tours + destinations | 🔜 Pending |
| `middleware.ts` | Country validation — invalid country → redirect | 🔜 Pending |
| `app/thailand/admin/bookings/page.tsx` | View bookings + Payment Proof images | 🔜 Pending |
| `app/api/operator/confirm-booking/route.ts` | Service Confirm + Payment Received submit | 🔜 Pending |
| `app/api/operator/send-confirmation/route.ts` | Final email → Customer + Ground Operation | 🔜 Pending |
| `app/thailand/admin/page.tsx` | Add Tours + Itineraries CRUD operations | 🔜 Pending |

### Notes
- Same folder structure applies to all future countries (Singapore, Japan, Vietnam)
- Partner data comes in any format → use Claude Partner Data Converter System Prompt → paste into Sheets
- AI reads _AI_Knowledge_Base only (not individual service folders)
- Google Sheets API integration: pending
- AI negotiation + Contact Form trigger: pending

---

## 🗺️ Excellent Tours & Destinations — Architecture

### Sub-Routes (thailand.asiabuddy.app)

| Route | Page | Status |
|-------|------|--------|
| `/` | Destination Page (Dual-CTA, Featured Tours, Trust Strip) | 🔜 To Build |
| `/tours` | Excellent Tours Listing Page | 🔜 To Build |
| `/tours/:slug` | Individual Tour Itinerary Page | 🔜 To Build |

### Vite Router Rules (app/thailand/src/main.tsx or router config)
- Use React Router v6 with `createBrowserRouter`
- Route `/tours` → `<ToursListPage />`
- Route `/tours/:slug` → `<TourItineraryPage />`
- All routes under `thailand.asiabuddy.app` — no Next.js involvement

### Booking Widget → Backend Flow
Tour Itinerary Page (Sticky Widget)
↓ [captures: tour_slug, salesperson_id]
HumanOperatorChat (existing — no changes)
↓
/api/booking-chat (existing — no changes)
↓
Telegram Operator Alert (existing — no changes)
The Reserve Your Journey button ONLY triggers existing HumanOperatorChat.
Do NOT modify /api/booking-chat or Telegram routing logic.

---

## 📋 Current Task Status — Phase 3 Chat Migration

### ✅ Completed (this session)
- Supabase Setup: tables tours, destinations, itineraries ✅
- Phase 1 Audit results ✅
- Phase 2 — Next.js Structure (proxy.ts, app/[country]/ routes, thailand redirects removed) ✅
- Phase 3 — data files (14) → data/thailand/ ✅
- Phase 3 — i18n.ts → lib/i18n.ts (byte-identical) ✅
- Phase 3 — 9 chat components → components/thailand/ (byte-perfect) ✅
- Phase 3 — HumanOperatorChat.tsx → components/thailand/ (byte-identical) ✅
- Phase 3 — 16 shared components → components/shared/ (byte-perfect) ✅
- Phase 3 — ChatWidgets.tsx wrapper (485 lines) created and integrated into app/[country]/page.tsx ✅ (type-check passed)

### ✅ Completed (15 June 2026 — Session 2)
- Import path fix — components/thailand/ (11 files): AccommodationChat, ConciergeChat, FoodChat,
  MedicalChat, NightlifeChat, PhrasesChat, ShoppingChat, TransportChat, TripPlannerChat,
  HumanOperatorChat, ChatWidgets ✅
- Import path fix — components/shared/ (9 files): TripChecklist, TravelToolbox, LawsGuide,
  LanguageWelcome, LanguageSelector, EtiquetteGuide, DestinationExplorer, CurrencyConverter,
  BookingChat ✅
- Import path fix — services/geminiService.ts ✅
- "use client" directive added — chat components (9 files) ✅
- Phase 3 build test passed — ConciergeChat renders + AI response confirmed ✅
- Fix mapping confirmed:
  - `../types` / `../../app/thailand/src/types` → `@/types/country` 
  - `../i18n` → `@/lib/i18n` 
  - `../data/X` / `../../app/thailand/src/data/X` → `@/data/thailand/X` 
  - `../services/geminiService` → `@/services/geminiService` 
  - `./HumanOperatorChat` (from shared/) → `../thailand/HumanOperatorChat` 
  - `./TransportChat` (from shared/) → `../thailand/TransportChat` 

### ✅ Completed (17 June 2026 — Session 3)
- Production Verify — Landing page, Thailand page, Chat, Book Now, Telegram Alert ✅
- next.config.js — root redirect rule for thailand.asiabuddy.app added ✅
- app/thailand/vercel.json — redirect rule added ✅
- Roadmap — Translation Architecture section added ✅
- Supabase — destinations table: Thailand row inserted ✅
- Supabase — tours table: Bangkok Temple Tour inserted ✅
- Supabase — itineraries table: Day 1 Bangkok Temple Discovery inserted ✅
- app/[country]/tours/page.tsx — Premium Tours Listing Page built ✅
- app/[country]/tours/[slug]/page.tsx — WOW Level Tour Itinerary Page built ✅
- app/[country]/tours/[slug]/BookNowClient.tsx — HumanOperatorChat + localStorage language ✅

### ✅ Completed (18 June 2026 — Session 4)
- HumanOperatorChat.tsx — language detection fixed:
  .slice(0,2) bug removed, explicit if/else language matching added,
  English default when localStorage is null ✅
- HumanOperatorChat.tsx — Contact Detail Box labels i18n added
  (MY/TH/DE/FR/ES/EN) via getFormLabels() function ✅
- BookNowClient.tsx — localStorage empty → explicit 'EN' fallback ✅
- Full booking flow tested: Book Now → HumanOperatorChat → 
  Telegram Alert → Approve → Email Invoice ✅
- Production verified: /thailand/tours + 
  /thailand/tours/bangkok-temple-tour ✅
- middleware.ts created then merged into proxy.ts 
  (Next.js deprecated middleware.ts — proxy.ts is correct) ✅
- middleware.ts deleted — proxy.ts is single source of truth ✅
- Invalid country redirect: /korea → / confirmed working ✅
- app/[country]/destination/page.tsx — Premium Destination Page built:
  5 sections (Hero, Stats Bar, Why AsiaBuddy, Featured Tours, 
  Bottom CTA), cream/green/orange design matching existing site,
  animated orange underline signature element ✅
- app/[country]/destination/ route confirmed: 
  does NOT replace /[country] ChatWidgets page ✅
- Supabase tours table — price_from column confirmed 
  (not price), currency=USD hardcoded ✅
- app/sitemap.ts — Auto sitemap from Supabase tours + 
  destinations, static + dynamic routes, graceful fallback ✅
- generateMetadata added to 3 files:
  app/[country]/tours/page.tsx
  app/[country]/tours/[slug]/page.tsx  
  app/[country]/destination/page.tsx ✅
- ISR revalidate = 3600 added to all 3 pages ✅
- params async fix — Next.js requires await params 
  (Promise type) in generateMetadata ✅

### ⏳ Pending
- app/thailand/admin/page.tsx — Tours + Destinations + Blog 
  CRUD UI for Content Creator data entry
- Google Translate API integration
- Vercel Vite project delete (Cleanup)
- Cookie Consent Banner — GDPR update

---

## ✅ Session 5 — 19 June 2026

### Completed
- app/thailand/admin/page.tsx — Old broken Tab forms removed ✅
- app/thailand/admin/page.tsx — blog_posts → posts table name fixed ✅
- app/thailand/admin/page.tsx — Dead state variables removed ✅
- app/thailand/admin/page.tsx — country: 'thailand' hardcode removed ✅
- app/admin/page.tsx — Country dropdown (dynamic) ✅
- app/admin/page.tsx — Tours / Destinations / Posts / Itinerary sections ✅
- app/admin/page.tsx — Auth → redirect to /thailand/clogin ✅
- HumanOperatorChat — Mobile h-[100dvh] full height fix ✅
  desktop: md:h-[min(600px,85vh)] ✅
- Cookie Consent Banner — Decline button equal styling (bg-slate-500) ✅
- Cookie Consent Banner — Collapsible Privacy Policy (showGDPRInfo state) ✅
- Cookie Consent Banner — Data Controller field added ✅
- Cookie Consent Banner — Your Rights field added ✅
- Cookie Consent Banner — Data Retention field added ✅
- proxy.ts — /admin whitelist added (country check bypass) ✅
- app/admin/page.tsx — Supabase import fixed: @/lib/supabase → @supabase/supabase-js createClient ✅
- app/admin/page.tsx — NEXT_PUBLIC_ env vars (browser-safe client) ✅
- lib/supabase-browser.ts — createBrowserClient file created ✅
- app/admin/page.tsx — Auth check getSession() → getUser() ✅
- app/admin/page.tsx — useMemo stable supabase instance ✅

### ⏳ Pending Verify
- Tour Create → Save → Supabase tours table — 400 Bad Request fix applied
  (useMemo + getUser), browser verify မလုပ်ရသေး

### ⏳ Remaining Work (Priority Order)

**Priority 4 — Local Full Test**
- /admin → Tour Create/Edit/Delete → Supabase ❌
- /admin → Destination Create/Edit/Delete → Supabase ❌
- /admin → Post Create/Edit/Delete → Supabase ❌
- /admin → Itinerary Create/Edit/Delete → Supabase ❌
- /admin → Image Upload (URL input + File Upload to Supabase Storage) ❌ not built yet
- /thailand/tours → Tours list display ❌
- /thailand/tours/[slug] → Itinerary page ❌
- HumanOperatorChat → Book Now → Telegram Alert ❌
- Cookie Consent Banner → Accept/Decline/GDPR toggle ❌

**Priority 4 — Image Upload Feature (not built)**
- Tour form — Image URL input option
- Tour form — File Upload (Computer/Mobile)
- Upload to Supabase Storage bucket

**Priority 5 — Git Push → Production**
- All local tests ✅ before git push
- Vercel production verify

**Priority 6 — Cleanup**
- Vercel Vite project delete
- app/thailand/ Vite codebase cleanup

---

## ✅ Session 6 — 20-21 June 2026

### Completed
- Posts Save 23502 error (null value in column "country") — root cause diagnosed: app/thailand/admin/page.tsx Posts Save payload was missing the "country" field entirely ✅
- Investigated app/admin/page.tsx (newer admin page, route /admin) — confirmed its Tours/Destinations/Posts payloads already correctly include "country: selectedCountry" — this file was NOT the source of the bug
- Discovered TWO parallel admin pages exist in the project:
  - app/admin/page.tsx → route /admin (has "Managing Country" dropdown UI, currently NOT the page in active daily use, login flow currently broken)
  - app/thailand/admin/page.tsx → route /thailand/admin (legacy page, currently the page actively used and tested by the team)
- app/thailand/clogin/page.tsx (line 21) — post-login redirect fixed: changed hardcoded router.push("/thailand/admin") to router.push("/admin") — intended to make /admin the canonical post-login destination, but see Pending below
- app/thailand/admin/page.tsx — added "country: selectedCountry" to Posts Save payload ✅
- app/thailand/admin/page.tsx — added "country: selectedCountry" to Tours Save payload (preventive fix, same missing-field pattern found) ✅
- app/thailand/admin/page.tsx — added "country: selectedCountry" to Destinations Save payload (preventive fix, same missing-field pattern found) ✅
- Posts Save verified working: POST /rest/v1/posts → 201 Created, row confirmed present in Supabase posts table ✅
- app/thailand/admin/page.tsx — Itinerary Save payload investigated: itineraries table does NOT have a "country" column (PGRST204 error confirmed this — country is implicit via tour_id foreign key relationship to tours table). Initial preventive "country" field addition was reverted/removed. Itinerary Save verified working: POST /rest/v1/itineraries → 201 Created, row confirmed in Supabase itineraries table ✅
- Admin Full CRUD test — Tours/Posts Delete confirmed working (existing "Allow all" RLS policy, cmd=ALL, roles=public, qual=true) ✅
- Admin Full CRUD test — Destinations/Itineraries Delete was silently failing (204 No Content returned but row not removed) — root cause: missing RLS DELETE policy on these two tables ✅
- Supabase RLS — Added "Allow all" policy (FOR ALL TO public USING (true)) on destinations table, matching the existing working pattern from posts/tours ✅
- Supabase RLS — Added "Allow all" policy (FOR ALL TO public USING (true)) on itineraries table, matching the existing working pattern from posts/tours ✅
- Verified: Destinations Delete and Itineraries Delete now correctly remove rows from Supabase ✅

### ⏳ Pending / In Progress
- /admin route login flow (app/thailand/clogin → /admin) — currently broken, user cannot successfully log in via this path; needs separate investigation
- Architecture decision needed: should app/admin/page.tsx eventually become the sole canonical admin page (replacing app/thailand/admin/page.tsx), or should the legacy page remain in use? Currently app/thailand/admin/page.tsx is the one in active use.

### Remaining Work (Priority Order)
- Priority 3 — Image Upload feature (URL input ✅ done; File Upload → Supabase Storage ❌ not built)
- Priority 4 — Frontend verify: /thailand/tours, /thailand/tours/[slug]
- Priority 5 — Fix /admin login flow (new, lower priority — app/thailand/admin/page.tsx works as the current workaround)
- Priority 6 — Git Push → Production (ONLY after all local tests above pass)

---

## 🔜 နောက်ဆက်တွဲ

- /admin Tour Save → browser verify (useMemo + getUser fix)
- /admin Full CRUD test (Tours, Destinations, Posts, Itinerary)
- Image Upload feature build (URL + File Upload → Supabase Storage)
- git push → Production deploy (after all local tests pass)
- Production verify — /thailand/tours + /thailand/tours/[slug]
- Google Translate API integration
- Vercel Vite project delete (Cleanup)

---

## ✅ Session 7 — 21 June 2026

### Completed
- Supabase Storage bucket name fix — uploadImageToStorage() was targeting non-existent "images" bucket; fixed to use correct buckets: tour-images / destination-images / blog-images ✅
- Image upload — Tours form: file upload → tour-images bucket → public URL saved to tours.image_url ✅
- Image upload — Destinations form: file upload → destination-images bucket ✅
- Image upload — Posts/Blog form: cover image upload → blog-images bucket ✅
- Thumbnail preview fix — added separate preview state variables (toursImagePreview, destImagePreview, blogImagePreview); preview now appears after upload in all 3 forms ✅
- Supabase tours table — added image_url (TEXT) column via SQL: ALTER TABLE tours ADD COLUMN image_url TEXT ✅
- next.config.js — added remotePatterns for ysntqbakmqwuxljknwjg.supabase.co to allow Next.js Image/img rendering from Supabase Storage ✅
- Tours List page (app/[country]/tours/page.tsx) — added image_url to Tour interface; replaced palm tree placeholder with conditional <img> tag rendering tour.image_url ✅
- Tour Detail page (app/[country]/tours/[slug]/page.tsx) — added image_url to Tour interface; hero section now displays tour image with gradient overlay (from-black/60 via-black/20 to-black/60) ✅
- Hero overlay tuning — adjusted overlay opacity so image is visible while breadcrumb and badge text remain readable with text-white ✅
- Book Now modal — Close button was not working; fixed onClick handler in BookNowClient.tsx to correctly set modal state to false ✅
- Storage orphan fix — Tours delete handler: extracts file path from image_url and calls supabase.storage.from('tour-images').remove([filePath]) ✅
- Storage orphan fix — Destinations delete handler: same pattern for destination-images bucket ✅
- Storage orphan fix — Posts delete handler: same pattern for blog-images bucket using cover_image field ✅
- extractStoragePath helper function created (shared across all 3 delete handlers): extracts filename from Supabase public URL using /public/{bucketName}/ marker ✅
- Supabase Storage RLS — Added DELETE policy "Allow public delete" to blog-images, tour-images, destination-images buckets (SELECT + INSERT existed; DELETE was missing causing silent storage delete failure) ✅
- posts table fetch query fixed — changed to .select('*') so cover_image field is included in post objects at delete time ✅
- Debug console.log lines removed from admin page ✅

### ⏳ Pending
- Edit function verify — Tours/Destinations/Posts/Itinerary edit → save → Supabase confirm (not yet tested)
- /admin login flow fix — /thailand/clogin → login → /admin redirect still broken; /thailand/admin remains the working workaround
- Git Push → Production (ONLY after Edit verify passes)
- Vercel Vite project delete (Cleanup)
- Google Translate API integration

### Architecture Notes
- Storage delete requires both: (1) RLS DELETE policy on the bucket AND (2) correct file path extraction from public URL
- posts table must use .select('*') — partial select omits cover_image causing storage cleanup to silently skip
- extractStoragePath uses /public/{bucketName}/ as marker (not /object/public/{bucketName}/)

---

## ✅ Session 8 — 23 June 2026

### Completed

- Priority 1 — Destinations Add fix:
  Supabase SQL: ALTER TABLE destinations ADD COLUMN image_url TEXT ✅
  app/thailand/admin/page.tsx — Destinations Save payload confirmed 
  image_url field present ✅

- Priority 2 — Destinations Delete + Storage fix:
  app/thailand/admin/page.tsx — Delete handler fixed:
  item.images (array) → item.image_url (string) ✅
  extractStoragePath() null check + return null fix ✅

- Priority 3 — /admin Login Flow fix:
  Root cause: app/admin/page.tsx used different Supabase client 
  than /thailand/clogin (session not shared)
  Fix: changed import from createSupabaseBrowserClient 
  (@/lib/supabase-browser) → createClient (@/lib/supabase/client)
  useMemo: createSupabaseBrowserClient() → createClient() ✅
  /thailand/clogin → login → /admin redirect now works ✅

- Priority 4 — /thailand/tours + /thailand/tours/[slug] image fix:
  app/[country]/tours/page.tsx — image_url?: string added to 
  Tour interface; image rendering updated to use image_url 
  with images[0] fallback ✅
  app/[country]/tours/[slug]/page.tsx — image_url?: string added 
  to Tour interface; hero image updated to use image_url 
  with images[0] fallback ✅
  Itinerary section confirmed already correctly implemented ✅

- app/admin/page.tsx — Image upload feature ported from 
  app/thailand/admin/page.tsx:
  uploadImageToStorage() function ✅
  extractStoragePath() function ✅
  Tours: file input UI + onChange → uploadImageToStorage() 
  + tour-images bucket ✅
  Destinations: file input UI + onChange → uploadImageToStorage() 
  + destination-images bucket ✅
  Posts: file input UI + onChange → uploadImageToStorage() 
  + blog-images bucket ✅
  Thumbnail preview for all 3 forms ✅
  Reset state after save for all 3 forms ✅

- app/admin/page.tsx — Tours onChange bug fix:
  Was creating local blob preview only (URL.createObjectURL) 
  without calling uploadImageToStorage()
  Fixed: now calls uploadImageToStorage(file, 'tour-images') ✅

- app/admin/page.tsx — uploadImageToStorage() fix:
  Added upsert: true to .upload() call ✅
  Added console.error in catch block ✅

- app/admin/page.tsx — Save payload image_url fix:
  Tours Save: added image_url: toursImages || null 
  alongside existing images array ✅
  Destinations Save: added image_url: destImages || null 
  alongside existing images field ✅

- app/admin/page.tsx — Delete handler image field fix:
  Tours Delete: item.image_url → 
  tourImageForDelete = item.image_url || item.images[0] 
  (fallback for legacy rows) ✅
  Destinations Delete: item.image_url → 
  destImageForDelete = item.image_url || item.images 
  (fallback for legacy rows) ✅
  Posts Delete: confirmed using item.cover_image correctly ✅

- Local full test passed — all 10 items verified ✅
- git push → Production ✅

### Architecture Notes
- app/admin/page.tsx is now the canonical admin page ✅
- app/thailand/admin/page.tsx remains as legacy fallback ✅
- image_url (TEXT) is the single image field for Tours 
  and Destinations in app/admin/page.tsx
- Delete handlers use fallback pattern: 
  item.image_url || item.images[0/string] to handle both 
  new rows (image_url set) and legacy rows (images only)
- tours table: both images (array) and image_url (TEXT) 
  columns now populated on save
- destinations table: both images (string) and image_url (TEXT) 
  columns now populated on save

### ⏳ Remaining Work
- Vercel Vite project delete (Cleanup)
- Google Translate API integration
- Edit function verify — Tours/Destinations/Posts/Itinerary
  edit → save → Supabase confirm
- Cookie Consent Banner — production verify

---

## ✅ Session 9 — 24 June 2026

### Completed
- Book Now modal bug fix — HumanOperatorChat not displaying
  fullscreen on mobile/tablet:
  Root cause 1: HumanOperatorChat.tsx outer container had
  overflow-hidden causing height collapse on mobile ✅
  Root cause 2: BookNowClient rendered inside sticky bottom
  bar (z-50) — modal z-[9999] was trapped inside parent
  stacking context ✅
  Fix 1: HumanOperatorChat.tsx — rounded-2xl → md:rounded-2xl
  (mobile: no radius, fills full screen) ✅
  Fix 2: BookNowClient.tsx — React createPortal implemented,
  modal now renders at document.body level, outside z-50
  stacking context ✅
  Fix 3: page.tsx — BookNowClient import was missing,
  JSX opening tags were broken in both desktop card and
  mobile sticky bar sections ✅
  Fix 4: Body scroll lock useEffect added in
  BookNowClient.tsx ✅
- Local test passed — Book Now fullscreen confirmed ✅
- git push → Production ✅

### ⏳ Remaining Work (carried forward)
- Edit function verify — Tours/Destinations/Posts/Itinerary
- Cookie Consent Banner — production verify
- Vercel Vite project delete (Cleanup)
- Google Translate API integration

---

## ✅ Session 10 — 24 June 2026

### Completed

- app/[country]/page.tsx — Full luxury overhaul (Server Component, no "use client"):
  Design system: Obsidian #0D0D0D + Ivory #F5F0E8 + Gold #C9A84C ✅
  Fonts: Playfair Display (headings) + Inter (body) + DM Mono (badges) ✅

- Section 1 — Hero:
  Full-viewport Thailand temple image (Unsplash — replaced Alps mountain image) ✅
  Giant Playfair Display title with gold underline ✅
  Primary CTA: [Explore Tours] → /[country]/tours ✅
  Secondary CTA: [Trip Checklist] → opens TripChecklistModal ✅
  Stats bar (Destinations, Expert Guides, Tours, Happy Travelers) ✅

- Section 2 — Destinations:
  Playfair Display heading + gold decorative rule ✅
  DestinationTabs component integrated (Client Component) ✅

- Section 3 — Featured Tours:
  Supabase server-side fetch — tours WHERE featured = true ✅
  Luxury dark cards with image, gold border, price, View Details CTA ✅
  [See All Tours] → /[country]/tours ✅

- Section 4 — Chat Widgets:
  ThailandApp / ChatWidgets component — dark obsidian wrapper ✅
  No changes to existing chat component logic ✅

- Section 5 — Footer:
  Brand name + links + copyright ✅

- components/shared/TripChecklistModal.tsx — New Client Component built:
  useState modal open/close ✅
  Gold border outlined trigger button style ✅
  Fixed overlay backdrop (z-50) ✅
  Close (✕) button ✅
  Renders existing TripChecklist component inside modal ✅

### 🔴 Priority 1 — DestinationTabs Data Bug (Pending Fix)
- Problem: Supabase destinations table has country='thailand' data ✅
  but DestinationTabs component shows "Coming soon..." — data not rendering
- Suspected causes:
  (a) country prop being passed incorrectly to DestinationTabs, OR
  (b) Query hardcoded as 'Thailand' (capital T) instead of 'thailand'
- Fix: Add console.log inside DestinationTabs to log received prop +
  Supabase query result → verify in Windsurf browser console

### ⏳ Remaining Work (carried forward → see Session 11)

### Architecture Notes
- app/[country]/page.tsx is SSR Server Component — "use client" must NEVER be added
- DestinationTabs.tsx is Client Component — "use client" must be present
- TripChecklistModal.tsx is Client Component — "use client" required (useState)
- City names must always come from Supabase — never hardcode
- Featured Tours fetch is server-side (Supabase query in Server Component)
- lib/supabase.ts must NOT be modified
- app/api/ routes must NOT be modified
- .env.local must NOT be read by Windsurf
- If Windsurf quota exhausted: Close All → provide fresh prompt

---

## ✅ Next.js Country Page — Rebuild Plan (Completed Session 10, Extended Session 11)

> Status: app/[country]/page.tsx luxury overhaul COMPLETE ✅
> Vite (thailand.asiabuddy.app) deprecation pending Priority 6 cleanup.

### Final Page Structure (Built)

SECTION 1 — HERO ✅
  Headline: Explore [Country] — Playfair Display, gold underline
  Thailand temple image (Unsplash) — full viewport
  PRIMARY CTA: [Explore Tours] → /[country]/tours
  SECONDARY CTA: [Trip Checklist] → TripChecklistModal
  Stats bar: Destinations / Expert Guides / Tours / Happy Travelers

SECTION 2 — DESTINATIONS ✅
  Playfair Display heading + gold decorative rule
  DestinationTabs — Client Component (city tabs from Supabase)
  ⚠️ Data bug pending fix (Priority 1 — "Coming soon..." shown)

SECTION 3 — FEATURED TOURS ✅
  Server-side Supabase fetch: tours WHERE featured = true
  Luxury dark cards — image, gold border, price, View Details
  [See All Tours] → /[country]/tours

SECTION 4 — CHAT BOXES ✅
  ChatWidgets (ThailandApp) — obsidian dark wrapper
  No changes to existing chat logic

SECTION 5 — FOOTER ✅
  Brand + links + copyright

### New Component Built
- components/shared/TripChecklistModal.tsx ✅
  Client Component, useState open/close, gold border button,
  fixed overlay backdrop, ✕ close button, renders TripChecklist

### Design System Applied
- Obsidian #0D0D0D + Ivory #F5F0E8 + Gold #C9A84C
- Fonts: Playfair Display (headings) + Inter (body) + DM Mono (badges)

### Architecture Rules (Permanent)
- app/[country]/page.tsx — Server Component — "use client" NEVER allowed
- DestinationTabs.tsx — Client Component — "use client" required
- TripChecklistModal.tsx — Client Component — "use client" required
- City names always from Supabase — never hardcode
- Featured Tours always fetched server-side
- ChatWidgets — no changes allowed ever
- lib/supabase.ts — do not modify
- app/api/ — do not modify
- .env.local — Windsurf must never read

---

## ✅ Session 11 — 25 June 2026

### Completed

- Country Page crash fix:
  app/[country]/page.tsx — Supabase query column mismatch fixed:
  price → price_from ✅
  duration → duration_days ✅
  /thailand page renders successfully again ✅

- Vite legacy config cleanup:
  vite.config.ts deleted ✅
  Vite-specific package.json deleted ✅
  Vite lockfile deleted ✅
  Legacy Vite workspace fully cleaned from monorepo ✅

- lib/translate.ts — Gemini JSON Batch Translation system built:
  All translatable strings on a page collected into single JSON payload ✅
  Single Gemini API call per page render (replaces per-string calls) ✅
  503 Service Unavailable (API overload) errors eliminated ✅
  Graceful fallback: on API error → return original text (no crash) ✅
  Note: translate.ts line 65 console.error is expected fallback logging —
  not a crash. Page renders with original text when Gemini is unavailable.

- LanguageSelector.tsx — Myanmar language added:
  🇲🇲 Myanmar (မြန်မာ) option added to language bar ✅
  Selection writes to NEXT_LOCALE cookie ✅
  Auto-refresh triggered on selection ✅

- app/[country]/tours/page.tsx — Tours Listing UI/UX overhaul:
  Design system: Obsidian/Amber/Orange gradient header retained ✅
  Blob decorations, existing card layout preserved 100% ✅
  LanguageSelector injected top-right corner (non-destructive) ✅
  Auto-translate wired to batch translation system ✅

### ⚠️ Known Issue (Non-Critical)
- lib/translate.ts line 65: console.error logs Gemini 503 errors
  This is intentional fallback logging — NOT a crash
  Page always renders (with original text if translation fails)
  Root cause: Gemini free tier rate limits during high load
  Fix when needed: upgrade to Pay-as-you-go key for translation calls

### ⏳ Remaining Work (Priority Order)

**🔴 Priority 1 — DestinationTabs Data Bug Fix ✅ FIXED (25 June 2026)**
- Root cause: Supabase destinations table had 2 rows:
  "Thailand" (all content fields null) + "Bangkok" (fully populated)
  DestinationTabs defaulted to index 0 = "Thailand" → "Coming soon..." shown
- Fix: app/[country]/page.tsx (lines 35-43) — filter added to exclude
  destinations with empty content before passing to DestinationTabs
- Result: Bangkok destination cards render correctly
  (Must Visit / Dining / Activities / Hidden Gems / Experiences) ✅
- Architecture note: Always filter out null-content destinations at
  page level before passing to DestinationTabs — never rely on index 0

**🔴 Priority 2 — Tour Detail Page UI/UX Overhaul**
- app/[country]/tours/[slug]/page.tsx
- Full-viewport hero (tour image + dark gradient overlay)
- Overview section (2-column: description + Quick Facts card)
- Itinerary — vertical gold timeline (Day 01, Day 02...)
- Bottom sticky bar — price_from + Book Now CTA
- BookNowClient component reuse (no changes to booking logic)

**🟡 Priority 3 — Destination Data Entry**
- Add via /admin ONLY after DestinationTabs bug fix verified:
  Phuket, Chiang Mai, Pattaya, Krabi, Ayutthaya, Koh Samui
- Bangkok already in Supabase ✅

**🟡 Priority 4 — Local Full Test + git push**
- npm run dev → /thailand / /thailand/tours / /thailand/tours/[slug]
- All sections render with real Supabase data
- TripChecklistModal opens/closes correctly
- Language selector switches language correctly
- git push → Production verify

**🟢 Priority 5 — Cleanup & Integration**
- Edit function verify — Tours/Destinations/Posts/Itinerary
- Cookie Consent Banner — production verify
- Google Translate API integration (replace Gemini batch translate with
  Google Translate API per Translation Architecture spec)
- Vercel Vite project (thailand.asiabuddy.app) delete

### Architecture Notes
- lib/translate.ts: Gemini batch translation is a temporary solution
  Final architecture: Google Translate API (see Translation Architecture section)
  Migration path: swap translate.ts implementation only — no page changes needed
- LanguageSelector writes to NEXT_LOCALE cookie — consistent with i18n architecture
- Tours Listing page: LanguageSelector is overlay-injected — original UI untouched
- app/[country]/page.tsx Server Component rule remains — "use client" NEVER allowed
- price_from is the correct column name in tours table — NEVER use price
- duration_days is the correct column name in tours table — NEVER use duration

---

## ✅ Session 12 — 26 June 2026

### Completed
- TripChecklist Close Button — root cause confirmed:
  Parent Hero section had CSS transform/filter properties causing
  `fixed inset-0` positioning to break (modal clipped behind parent)
  Fix: `createPortal` added to `TripChecklistModal.tsx` →
  renders directly to `document.body` → outside all parent containers ✅

- TripChecklist Title Bar — text color fix:
  `text-[#D4AF37]` gold color added to `<h2>` in TripChecklist.tsx header ✅

- TripChecklist i18n — root cause identified:
  `TripChecklistModal` rendered in `page.tsx` without `language` prop →
  defaulting to `'EN'` always
  Fix applied: `language` prop passed from `page.tsx` via NEXT_LOCALE cookie ✅

- Landing Page — assessment complete:
  Issues identified: low contrast hero, washed image, equal CTA hierarchy
  Decision: defer full redesign to Session 14 as dedicated session
  Reason: avoid repeat of Session 10/11 overhaul errors ✅

### ⚠️ Carry Forward
- TripChecklist i18n — browser verify pending (Myanmar/FR/DE/ES)
- git push pending (after i18n verify)

### Architecture Notes
- TripChecklistModal.tsx: always use createPortal → document.body
  Never render TripChecklist directly inside a Hero/section with
  transform, filter, or will-change CSS — fixed positioning will break
- page.tsx must always pass language prop to TripChecklistModal:
  `<TripChecklistModal language={language as SupportedLanguage} />`
- language must be read from NEXT_LOCALE cookie in Server Component:
  `const language = (cookies().get('NEXT_LOCALE')?.value ?? 'EN') as SupportedLanguage`

### Landing Page Redesign Plan (Session 14)
- Reference: Viator, GetYourGuide, Klook, Airbnb Experiences
- Required changes:
  (1) Hero image — dark overlay (bg-black/50) for contrast
  (2) Hero text — switch to white (text-white) from dark
  (3) CTA hierarchy — Explore Tours = primary (filled), Trip Checklist = secondary (outlined)
  (4) Overall energy — remove ivory/cream wash, use deeper dark tones
- Rule: change ONE section at a time, verify screenshot before next section
- Rule: never full-page overhaul in single session

---

## ✅ Session 13 — 27 June 2026

### Completed
- lib/translate.ts — GEMINI_PRO_API_KEY fix:
  Root cause: translate.ts was using empty GEMINI_PRO_API_KEY
  Fix: confirmed correct key in .env.local and Vercel ✅
  Model updated to gemini-2.5-flash ✅

- app/[country]/tours/page.tsx — Language switching fix:
  Added export const dynamic = 'force-dynamic' ✅
  Fixed default language from 'en' to 'EN' (uppercase) ✅
  Language map added to convert codes to full names for Gemini prompt ✅
  Translation now works correctly on /thailand/tours ✅

- app/[country]/page.tsx — Services Strip added:
  New OUR SERVICES section below Hero ✅
  6 service cards: Hotel, Flight, Tickets, Transfer, Car Rental, Tours ✅
  Desktop: 6 columns, Mobile: 3 columns grid ✅
  Placed between Hero and Destinations sections ✅

- app/[country]/page.tsx — Essential Guides redesign:
  Old "Thailand Essentials Guide" standalone section removed ✅
  New ESSENTIAL GUIDES card grid (bg-amber-50, 8 cards) ✅
  Cards: General Info, Travel Types, Visa Info, Transport,
  Accommodation, Food & Dining, Culture & Etiquette, Budget Tips ✅
  Weather & Seasons card removed ✅
  Extracted to components/shared/EssentialGuides.tsx (Client Component) ✅
  Cards dispatch openGuideModal custom events → ChatWidgetGrid modals ✅
  Language prop passed from page.tsx → EssentialGuides → modal trigger ✅

- data/thailand/transportGuide.ts — Created:
  New transport guide data file ✅
  Languages: EN, MM, TH, DE, FR, ES ✅
  MM content: full Myanmar translation ✅
  TH content: full Thai translation ✅
  DE content: full German translation ✅
  FR content: full French translation ✅
  ES content: full Spanish translation ✅

- components/shared/ChatWidgetGrid.tsx — Transport modal fix:
  Transport modal content was empty string ✅
  Fixed: TRANSPORT_GUIDE[language] content added ✅
  TransportChat component added below guide content ✅

- components/thailand/TransportChat.tsx — Text alignment fix:
  AI response text was center-aligned ✅
  Fixed to text-left ✅

- components/thailand/AccommodationChat.tsx — Fixes:
  AI response text alignment fixed to text-left ✅
  Book Now createPortal fix applied ✅

- components/thailand/FoodChat.tsx — Fixes:
  AI response text alignment fixed to text-left ✅
  Book Now createPortal fix applied ✅

- components/thailand/TripPlannerChat.tsx — Fixes:
  AI response text alignment fixed to text-left ✅
  Book Now createPortal fix applied ✅

- components/shared/FloatingChatButton.tsx — Created:
  New floating concierge button (bottom-right, z-9999) ✅
  Animated 🛎️ icon with pulse rings on load ✅
  Tooltip: "✈️ Plan your trip now!" ✅
  Live Support badge with green pulse dot ✅
  createPortal used → HumanOperatorChat renders at document.body ✅
  Fullscreen HumanOperatorChat confirmed working ✅

- app/[country]/layout.tsx — FloatingChatButton integration:
  FloatingChatButton added to layout (visible on all /thailand pages) ✅
  NEXT_LOCALE cookie read via cookies() → language passed to button ✅
  HumanOperatorChat welcome messages now display in correct language ✅

- Admin — Tour + Itinerary unified editor (app/admin/page.tsx):
  Tours Management and Itinerary Management merged into one editor ✅
  Two-column layout: Editor (60%) + Live Preview panel (40%) ✅
  Section A: Tour Basics (title, slug auto-generate, country, status, featured) ✅
  Section B: Pricing & Details (price, currency, duration, group size, destination) ✅
  Section C: What's Included (highlights, inclusions, exclusions — tag inputs) ✅
  Section D: Tour Images (URL input + file upload, thumbnail preview) ✅
  Section E: Day-by-Day Itinerary (day cards, ↑↓ reorder, Add Next Day) ✅
  Live Preview panel: real-time tour preview as user types ✅
  Save Tour + Itinerary button: saves tours table then itineraries table ✅
  Edit mode: loads existing tour + itinerary days into editor ✅
  Delete: removes itinerary rows first then tour row ✅
  Success toast auto-dismiss after 3 seconds ✅

- Itinerary Management — image upload:
  image_url field added to itinerary form ✅
  URL input + file upload to tour-images/itinerary/ path ✅
  Image preview thumbnail shown after upload ✅
  image_url saved to itineraries table ✅

- app/[country]/tours/[slug]/page.tsx — Itinerary image display:
  image_url rendered per day in timeline ✅
  next.config.js remotePatterns updated for external image hosts ✅

- app/thailand/guides/ — 8 Essential Guide pages created:
  travel-types, visa, transport, accommodation,
  food, culture, budget, weather ✅
  Each page: Navbar + hero + card grid + Back button ✅
  Note: These pages are superseded by modal system —
  Essential Guides now use ChatWidgetGrid modals instead ✅

### ⏳ Remaining Work (Priority Order)

**🔴 Priority 1 — git push → Production**
- Local full test: /thailand, /thailand/tours, /thailand/tours/[slug]
- Language switching verify: MM/TH/DE/FR/ES
- FloatingChatButton verify on mobile
- Essential Guides modals verify all 7 cards
- git push → Vercel production deploy

**🟡 Priority 2 — Destination Data Entry**
- Add via /admin: Phuket, Chiang Mai, Pattaya, Krabi, Ayutthaya, Koh Samui
- Bangkok already in Supabase ✅

**🟡 Priority 3 — Admin Tour Editor verify**
- Create new tour with itinerary → Supabase confirm
- Edit existing tour → save → verify
- Delete tour → itinerary cascade confirm

**🟢 Priority 4 — Cleanup**
- Edit function verify: Tours/Destinations/Posts/Itinerary
- Cookie Consent Banner production verify
- Google Translate API integration
- Vercel Vite project (thailand.asiabuddy.app) delete

### Architecture Notes
- EssentialGuides.tsx is Client Component — dispatches openGuideModal events
- ChatWidgetGrid.tsx handles all guide modal state — do not duplicate
- FloatingChatButton.tsx uses createPortal → document.body (z-99999)
- layout.tsx reads NEXT_LOCALE cookie → passes to FloatingChatButton
- transportGuide.ts pattern: Record<string, string> with EN/MM/TH/DE/FR/ES keys
- Supported languages: EN, MM, TH, DE, FR, ES only
- app/thailand/guides/* pages exist but are unused — modals are the UX

---

## ✅ Session 14 — 28 June 2026

### Completed
- lib/translate.ts — GEMINI_PRO_API_KEY fix:
  Root cause: translate.ts was using empty GEMINI_PRO_API_KEY
  Fix: confirmed correct key in .env.local and Vercel ✅
  Model updated to gemini-2.5-flash ✅

- app/[country]/tours/page.tsx — Language switching fix:
  Added export const dynamic = 'force-dynamic' ✅
  Fixed default language from 'en' to 'EN' (uppercase) ✅
  Language map added to convert codes to full names for Gemini prompt ✅
  Translation now works correctly on /thailand/tours ✅

- app/[country]/page.tsx — Services Strip added:
  New OUR SERVICES section below Hero ✅
  6 service cards: Hotel, Flight, Tickets, Transfer, Car Rental, Tours ✅
  Desktop: 6 columns, Mobile: 3 columns grid ✅
  Placed between Hero and Destinations sections ✅

- app/[country]/page.tsx — Essential Guides redesign:
  Old "Thailand Essentials Guide" standalone section removed ✅
  New ESSENTIAL GUIDES card grid (bg-amber-50, 8 cards) ✅
  Cards: General Info, Travel Types, Visa Info, Transport,
  Accommodation, Food & Dining, Culture & Etiquette, Budget Tips ✅
  Weather & Seasons card removed ✅
  Extracted to components/shared/EssentialGuides.tsx (Client Component) ✅
  Cards dispatch openGuideModal custom events → ChatWidgetGrid modals ✅
  Language prop passed from page.tsx → EssentialGuides → modal trigger ✅

- data/thailand/transportGuide.ts — Created:
  New transport guide data file ✅
  Languages: EN, MM, TH, DE, FR, ES ✅
  MM content: full Myanmar translation ✅
  TH content: full Thai translation ✅
  DE content: full German translation ✅
  FR content: full French translation ✅
  ES content: full Spanish translation ✅

- components/shared/ChatWidgetGrid.tsx — Transport modal fix:
  Transport modal content was empty string ✅
  Fixed: TRANSPORT_GUIDE[language] content added ✅
  TransportChat component added below guide content ✅

- components/thailand/TransportChat.tsx — Text alignment fix:
  AI response text was center-aligned ✅
  Fixed to text-left ✅

- components/thailand/AccommodationChat.tsx — Fixes:
  AI response text alignment fixed to text-left ✅
  Book Now createPortal fix applied ✅

- components/thailand/FoodChat.tsx — Fixes:
  AI response text alignment fixed to text-left ✅
  Book Now createPortal fix applied ✅

- components/thailand/TripPlannerChat.tsx — Fixes:
  AI response text alignment fixed to text-left ✅
  Book Now createPortal fix applied ✅

- components/shared/FloatingChatButton.tsx — Created:
  New floating concierge button (bottom-right, z-9999) ✅
  Animated 🛎️ icon with pulse rings on load ✅
  Tooltip: "✈️ Plan your trip now!" ✅
  Live Support badge with green pulse dot ✅
  createPortal used → HumanOperatorChat renders at document.body ✅
  Fullscreen HumanOperatorChat confirmed working ✅

- app/[country]/layout.tsx — FloatingChatButton integration:
  FloatingChatButton added to layout (visible on all /thailand pages) ✅
  NEXT_LOCALE cookie read via cookies() → language passed to button ✅
  HumanOperatorChat welcome messages now display in correct language ✅

- Admin — Tour + Itinerary unified editor (app/admin/page.tsx):
  Tours Management and Itinerary Management merged into one editor ✅
  Two-column layout: Editor (60%) + Live Preview panel (40%) ✅
  Section A: Tour Basics (title, slug auto-generate, country, status, featured) ✅
  Section B: Pricing & Details (price, currency, duration, group size, destination) ✅
  Section C: What's Included (highlights, inclusions, exclusions — tag inputs) ✅
  Section D: Tour Images (URL input + file upload, thumbnail preview) ✅
  Section E: Day-by-Day Itinerary (day cards, ↑↓ reorder, Add Next Day) ✅
  Live Preview panel: real-time tour preview as user types ✅
  Save Tour + Itinerary button: saves tours table then itineraries table ✅
  Edit mode: loads existing tour + itinerary days into editor ✅
  Delete: removes itinerary rows first then tour row ✅
  Success toast auto-dismiss after 3 seconds ✅

- Itinerary Management — image upload:
  image_url field added to itinerary form ✅
  URL input + file upload to tour-images/itinerary/ path ✅
  Image preview thumbnail shown after upload ✅
  image_url saved to itineraries table ✅

- app/[country]/tours/[slug]/page.tsx — Itinerary image display:
  image_url rendered per day in timeline ✅
  next.config.js remotePatterns updated for external image hosts ✅

- app/thailand/guides/ — 8 Essential Guide pages created:
  travel-types, visa, transport, accommodation,
  food, culture, budget, weather ✅
  Each page: Navbar + hero + card grid + Back button ✅
  Note: These pages are superseded by modal system —
  Essential Guides now use ChatWidgetGrid modals instead ✅

### ⏳ Remaining Work (Priority Order)

**🔴 Priority 1 — git push → Production**
- Local full test: /thailand, /thailand/tours, /thailand/tours/[slug]
- Language switching verify: MM/TH/DE/FR/ES
- FloatingChatButton verify on mobile
- Essential Guides modals verify all 7 cards
- git push → Vercel production deploy

**🟡 Priority 2 — Destination Data Entry**
- Add via /admin: Phuket, Chiang Mai, Pattaya, Krabi, Ayutthaya, Koh Samui
- Bangkok already in Supabase ✅

**🟡 Priority 3 — Admin Tour Editor verify**
- Create new tour with itinerary → Supabase confirm
- Edit existing tour → save → verify
- Delete tour → itinerary cascade confirm

**🟢 Priority 4 — Cleanup**
- Edit function verify: Tours/Destinations/Posts/Itinerary
- Cookie Consent Banner production verify
- Google Translate API integration
- Vercel Vite project (thailand.asiabuddy.app) delete

### Architecture Notes
- EssentialGuides.tsx is Client Component — dispatches openGuideModal events
- ChatWidgetGrid.tsx handles all guide modal state — do not duplicate
- FloatingChatButton.tsx uses createPortal → document.body (z-99999)
- layout.tsx reads NEXT_LOCALE cookie → passes to FloatingChatButton
- transportGuide.ts pattern: Record<string, string> with EN/MM/TH/DE/FR/ES keys
- Supported languages: EN, MM, TH, DE, FR, ES only
- app/thailand/guides/* pages exist but are unused — modals are the UX
---

## Session 14 Continued / Session 15 — 2026-06-28

### ✅ Budget Tips Modal — Complete
- Created `data/thailand/budgetGuide.ts` with BUDGET_GUIDE Record<string, string>
- EN content: full luxury travel budget guide (currency, transport, food, VAT refund, shopping)
- MM/TH/DE/FR/ES keys: empty strings (pending manual translation)
- ChatWidgetGrid.tsx: added BUDGET_GUIDE import, showBudgetModal state, case 'budget' handler, GuideModal render
- EssentialGuides.tsx: fixed Budget Tips card modalId from 'information' → 'budget'
- TravelToolbox.tsx: removed duplicate hardcoded guides section (replaced by EssentialGuides.tsx card grid)
- ShoppingChat recommended for Budget modal chat component (pending implementation)

### ✅ Essential Guides — Duplicate Section Fixed
- Root cause: TravelToolbox.tsx toolsBySection had a 'guides' section duplicating EssentialGuides.tsx
- Fix: deleted entire first section (guides) from toolsBySection, kept tools section only
- EssentialGuides.tsx now sole renderer of 8 guide cards

### ✅ Destination Data — Complete
- All 7 destinations added via Admin: Bangkok, Phuket, Chiang Mai, Pattaya, Krabi, Ayutthaya, Koh Samui
- image_url: Unsplash URLs added for all destinations
- must_visit, activities, dining, hidden_gems, experiences: populated for all destinations
- DestinationTabs.tsx: fixed `other_experiences` → `experiences` field name mismatch
- DestinationTabs.tsx: added image_url hero render above content tabs
- Admin page.tsx: fixed destImagePreview not setting on URL input change and on Edit load

### ✅ Destination Tabs i18n — Complete
- lib/i18n.ts: added `destinationTabs` key to all 6 languages (EN, MM, TH, DE, FR, ES)
  - mustVisit, dining, experiences, activities, hiddenGems
- DestinationTabs.tsx: accepts language prop, uses UI_TRANSLATIONS[language].destinationTabs
- page.tsx: passes language prop to DestinationTabs

### ✅ Static Translations for Destinations — Complete
- Architecture decision: Option A (Static) chosen over Option B (Cache)
  - Reason: Free, instant, offline-compatible, no API dependency
- Supabase destinations table: added 15 new columns
  - name_mm, name_th, name_de, name_fr, name_es
  - description_mm, description_th, description_de, description_fr, description_es
  - short_description_mm, short_description_th, short_description_de, short_description_fr, short_description_es
- page.tsx: removed Gemini translateText() for destinations entirely
  - Replaced with static column lookup: dest[`name_${lang}`] || dest.name
- Admin page.tsx: added MM and TH name/description fields for destinations

### ✅ TypeScript Fixes
- app/admin/page.tsx: `itineraryData.map(day: any)` 
- components/shared/ChatWidgetGrid.tsx: TransportChat destination="" prop added
- components/thailand/TripPlannerChat.tsx: added createPortal import from 'react-dom'

### ⏳ Pending
- Budget Tips: MM/TH/DE/FR/ES translations (manual)
- Budget Tips: ShoppingChat integration inside modal
- Destinations: name/description translations for MM/TH/DE/FR/ES via Admin
- Tours: static translation columns (same pattern as destinations)
- PWA Offline feature (next priority after translations)
- Vite legacy Vercel project: DELETE (causing deploy errors)
- Cookie Consent Banner
- B2B bank transfer details for PDF invoice Phase 3

### Architecture Rules (additions)
- Destination/Tour translations: static multilingual columns in Supabase, NOT Gemini API
- Column naming pattern: `fieldname_languagecode` (e.g. name_mm, description_th)
- page.tsx lookup pattern: dest[`field_${lang}`] || dest.field (EN fallback)
- TravelToolbox: guides section permanently removed — EssentialGuides.tsx handles all guide cards

---

## Session 16 — 30 June 2026

### ✅ Completed — GYG Affiliate + Tours Service Card Integration

- Supabase: Created `gyg_links` table manually via SQL Editor (NOT via migration file):
  Columns: id (uuid), city (text), activity_name (text), gyg_url (text),
  price_from (text), rating (text), reviews_count (text), duration (text),
  image_url (text), created_at (timestamptz) ✅
  RLS Policy: "Allow all" FOR ALL TO public USING (true) ✅
  Inserted test row: city='bangkok', activity_name='Bangkok Temple Tour' ✅

- lib/queries/gygLinks.ts — Created:
  getGygLinksByCity(city: string) function querying gyg_links table
  using existing Supabase client from lib/supabase.ts ✅

- components/shared/services/TourServiceCard.tsx — Created:
  Follows TicketServiceCard pattern — Obsidian #0D0D0D bg, Ivory #F5F0E8 text,
  Gold #C9A84C accent, Playfair Display headings, Inter body, DM Mono price ✅
  Props: { activity_name, image_url, price_from, rating, reviews_count, duration, gyg_url } ✅
  Accepts language prop, uses UI_TRANSLATIONS[language].serviceCards.bookNow ✅

- app/[country]/page.tsx — Tours slot wired in OUR SERVICES grid:
  Imports getGygLinksByCity and TourServiceCard ✅
  Fetches tourLinks server-side using defaultCity = 'bangkok' (HARDCODED — see Known Issues) ✅
  Renders horizontal scroll row of up to 3 TourServiceCard when data exists ✅
  Falls back to original static Tours icon link when tourLinks is empty ✅

- next.config.js — Added images.unsplash.com to images.remotePatterns
  (fixed "Invalid src prop" runtime error for next/image) ✅

### ⚠️ Known Issues / Technical Debt

- defaultCity in app/[country]/page.tsx Tours slot is HARDCODED to 'bangkok'.
  It does NOT dynamically follow the user's selected city tab
  (DestinationTabs selectedDestination state is client-side only,
  not accessible from the server component page.tsx).
  Only Bangkok currently has gyg_links data, so this works for now.
  TODO when more cities have gyg_links data: refactor to make Tours slot
  dynamic per selected city (may require converting fetch to a client-side
  call triggered by tab selection, or lifting state up).

- TourServiceCard sizing/styling needs further polish:
  Card width/height did not initially match the other 5 static service slots
  (Hotel/Flight/Tickets/Transfer/CarRental) — partially fixed, verify final state.
  Price text visibility, rating star icon visibility, and "Book Now" button
  text being cut off / overlapped by FloatingChatButton — these were flagged
  for fixing, confirm current state before considering this fully done.

- gyg_links table has only 1 row (Bangkok Temple Tour) with a PLACEHOLDER
  affiliate URL — must be replaced with a real GYG "Create short url" link
  from partner.getyourguide.com before this can generate real commission.
  Real price/rating/reviews/duration data also needs to be pulled from
  the actual GYG activity page to replace placeholder values.

### ⏳ Remaining Work (Priority Order)

**🔴 Priority 1 — GYG Real Data**
- Replace placeholder gyg_url in gyg_links table with real affiliate link
  from GYG dashboard (Tools → Links → Bangkok → Create short url)
- Update price_from, rating, reviews_count, duration with real GYG data
- Add gyg_links rows for remaining cities: Chiang Mai, Phuket, Pattaya, Krabi, Ayutthaya

**🟡 Priority 2 — Affiliate Program Registrations (not yet started)**
- Klook (Tickets) — apply at affiliate.klook.com
- Agoda (Hotel) — apply directly or via CJ Affiliate/Travelpayouts
- 12Go / WayAway (Transfer/Flight) — apply via Travelpayouts

**🟡 Priority 3 — UI Polish**
- Finalize TourServiceCard sizing to match other 5 service slots exactly
- Confirm price text, rating stars, and CTA button text are all fully visible
  and not overlapped by FloatingChatButton
- Consider adding icons to Destination sub-tabs (Must Visit / Dining /
  Experiences / Activities / Hidden Gems) to match Services Strip icon pattern

**🟢 Priority 4 — Future Service Cards (once affiliates approved)**
- Wire HotelServiceCard to Agoda data (Supabase table TBD, e.g. agoda_links)
- Wire FlightServiceCard + TransferServiceCard to 12Go/WayAway data
- Wire TicketServiceCard to Klook data
- Each new service follows the same Supabase table → query function →
  service card → page.tsx wiring pattern established with GYG/Tours

### Architecture Notes (additions)
- gyg_links table created via Supabase SQL Editor directly — NOT via
  a migration file in supabase/migrations/. Any future schema changes
  to this table must also be done via SQL Editor unless a migration
  workflow is explicitly set up.
- Service card components (HotelServiceCard, FlightServiceCard,
  TransferServiceCard, CarRentalServiceCard, TicketServiceCard,
  TourServiceCard) all live in components/shared/services/ and follow
  an identical prop/design pattern — new affiliate integrations should
  reuse this pattern.

---

## Session 17 — 01 July 2026

### 🔄 Carried Over — Hardcoded `/thailand/services` href Fix

- Fix applied per `Windsurf_Prompt_Fix_Hardcoded_Services_Href.md`: 5 static
  OUR SERVICES slots (Hotel/Flight/Transfer/Tickets/CarRental) in
  `app/[country]/page.tsx` now use dynamic `` `/${country}/services` ``
  instead of hardcoded `/thailand/services`.
- `app/[country]/services/page.tsx` created as placeholder ("Coming Soon")
  page, i18n keys added to `lib/i18n.ts` for all 6 languages.
- ⚠️ **Unverified before logging as done**: Windsurf's reversion pass
  reported updating placeholder colors to `bg-sacred-bg`, `text-sacred-green`,
  `bg-gold-deep` class names. These token names do **not** appear anywhere
  else in this roadmap — every other session documents the design system as
  raw hex (Obsidian `#0D0D0D`, Ivory `#F5F0E8`, Gold `#C9A84C`), not named
  Tailwind tokens. **TODO before marking this session complete:** confirm
  `tailwind.config.js` actually defines `sacred-bg` / `sacred-green` /
  `gold-deep` mapped to the correct hex values, and visually compare the
  services placeholder against the live MainPage hero section. If the
  tokens are undefined, the classes will silently no-op and the page may
  not actually match the design system despite the build passing.

### ⏳ Priority 1 — GYG Real Data (still open, detail to be added)

- Placeholder for now — full checklist/detail to be filled in next update.
  Carried over unchanged from Session 16:
  - Replace placeholder `gyg_url` in `gyg_links` with real GYG affiliate
    link (Tools → Links → Bangkok → Create short url)
  - Update `price_from`, `rating`, `reviews_count`, `duration` with real data
  - Add `gyg_links` rows for Chiang Mai, Phuket, Pattaya, Krabi, Ayutthaya

### 🟡 Priority 2 — Affiliate Program Registrations — Sample/Placeholder Data Added

- **Status: registrations NOT started.** Klook (Tickets), Agoda (Hotel), and
  12Go/WayAway (Transfer/Flight) affiliate applications are still pending —
  will apply once ready, per plan below.
- In the meantime, placeholder **sample data** has been scoped (see
  `Windsurf_Prompt_Add_Sample_Service_Cards.md`) so the existing
  `HotelServiceCard`, `TicketServiceCard`, `TransferServiceCard`, and
  `FlightServiceCard` components (already built in
  `components/shared/services/`, currently unused per Session 16 notes)
  can render real-looking sample content instead of sitting dark/unused,
  following the exact same pattern used for `gyg_links` → `TourServiceCard`.
- This is placeholder-only — no real affiliate URLs, no commission-generating
  links. Once each affiliate program is approved, swap sample rows for real
  data (same pattern as the GYG Priority 1 task above).

### Architecture Notes (additions)
- Placeholder/sample affiliate data must be clearly marked (e.g. a
  `is_placeholder boolean` column or a naming convention) so it can't
  accidentally go live as a real bookable link before affiliate approval.

---

## Session 17 Continued — 01 July 2026

### 🟡 Priority 2 — Sample Service Cards (Hotel/Tickets/Transfer/Flight) — Reported Complete, NOT Yet Verified

- Windsurf executed `Windsurf_Prompt_Add_Sample_Service_Cards.md`:
  - Created `agoda_links`, `klook_links`, `transfer_links` tables via Supabase
    SQL Editor, each with `is_placeholder boolean default true` and RLS
    "Allow all" policy — matches `gyg_links` precedent ✅
  - 4 sample rows inserted (city='bangkok'), all `*_url` fields set to
    `#placeholder-*` strings, no real affiliate credentials ✅
  - `lib/queries/agodaLinks.ts`, `klookLinks.ts`, `transferLinks.ts` created,
    following `gygLinks.ts` pattern ✅
  - `app/[country]/page.tsx` — imports + server-side data fetching for all
    4 sources added (defaultCity = 'bangkok', same hardcoded pattern as
    Tours — tracked technical debt, not fixed here) ✅
  - Build reported passing (TypeScript + static generation, no errors) ✅

### ⚠️ NOT confirmed before this can be marked done — TODO

1. **Full `page.tsx` JSX for the 4 slots was not actually pasted in the
   report** (only referenced by line range). Must get the real snippet and
   confirm it genuinely mirrors the Tours fallback-to-static-icon pattern
   before trusting the wiring is correct.
2. **Placeholder links are not yet inert.** `href="#placeholder-*"` is a
   real clickable anchor — will scroll/jump on click, not visibly disabled.
   Needs `e.preventDefault()` (or equivalent) + a visible "Coming Soon" /
   disabled-state cue, especially since `is_placeholder = true` exists in
   the DB but it's unconfirmed whether the UI actually reads and displays it.
   **Do not deploy to production until this is fixed** — a dead "Book Now"
   button is a bad user experience and could look broken to real visitors.
3. **Flight slot component choice (`FlightServiceCard` vs
   `TransferServiceCard`) was not justified** — prompt asked for a props
   comparison before choosing; report just states the choice was made.
   Confirm no prop mismatch / runtime error.

### Architecture Notes (additions)
- Placeholder rows now exist in `agoda_links`, `klook_links`,
  `transfer_links` — do not let these reach production-visible state
  without either (a) real affiliate URLs, or (b) visibly disabled/inert
  placeholder styling. This mirrors the reversion-report caution from
  earlier in Session 17: verify before marking "done."

---

## Session 17 Continued (2) — 01 July 2026

### 🐛 New Bug Found — Service Card Layout Mixing + Coming Soon Regression

- Supabase tables (`agoda_links`, `klook_links`, `transfer_links`) created
  successfully via SQL Editor ✅ — resolved the earlier `{}` console error.
- Visual verification on `localhost:3000/thailand` revealed 2 new issues:
  1. Hotel/Tickets/Transfer sample cards render in one merged, unlabeled
     vertical list below the OUR SERVICES strip — no visual separation by
     category, contradicting the expected per-category organization.
  2. CarRental (no sample data table yet) no longer falls back to the
     `/[country]/services` "Coming Soon" placeholder when clicked — this
     regressed as a side effect of the sample-card wiring.
- Root cause still unconfirmed because **the real `page.tsx` JSX has still
  never been delivered by Windsurf** despite being requested twice. Sent a
  new prompt (`Windsurf_Prompt_Fix_Service_Card_Layout.md`) that makes
  pasting the actual current + updated code a hard requirement, not
  optional, before this can be marked fixed.

### Architecture Notes (additions)
- Established pattern going forward: any service card section (Hotel/
  Tickets/Transfer/Flight/Tours) must have a visible category label/heading
  and use the horizontal-scroll-row pattern — never an unlabeled full-width
  vertical stack mixing multiple categories.
- CarRental has no backing table/query — must unconditionally fall back to
  the Coming Soon placeholder until a real integration is built for it.

---

## Session 17 Continued (3) — 01 July 2026

### ✅ Confirmed Fixed — Category Labels + Horizontal Card Layout

- Screenshot verified: "HOTELS IN BANGKOK", "TICKETS & ACTIVITIES IN BANGKOK"
  headings now render correctly above each card section, matching the
  requested labeled/separated format.

### 🐛 New Bug Found — All Sections Render Simultaneously (No Click-to-Reveal)

- Hotel/Tickets/Transfer/Flight sections all render unconditionally and
  stack on the page at once. The OUR SERVICES icons link to in-page anchors
  (`#hotels-section` etc.) which only scroll to already-visible content —
  they do not control show/hide.
- Desired behavior: clicking an icon should show ONLY that service's
  section, hiding the others (single active section at a time).
- Sent `Windsurf_Prompt_Click_To_Reveal_Sections.md` — requires extracting
  the icon strip + sections into a new Client Component (following the
  existing `DestinationTabs.tsx` pattern: `"use client"`, `useState` for
  active tab, receives server-fetched data as props) since
  `app/[country]/page.tsx` must remain a Server Component per project rules.
- Car Rental fallback to Coming Soon was reported fixed by Windsurf but
  **not yet visually confirmed by the user** — still needs a click-test
  screenshot.

### Architecture Notes (additions)
- New pattern precedent: any future click-driven show/hide UI on
  `app/[country]/page.tsx` should follow the same approach — a dedicated
  Client Component receiving server-fetched props, never `"use client"`
  on `page.tsx` itself.

---

## Session 17 Continued (4) — 01 July 2026

### 🎯 Architecture Decision — Dedicated Listing Pages (Replaces Click-to-Reveal Plan)

- User requested a different UX direction than the previously-planned
  click-to-reveal inline sections: each service category (Hotel/Flight/
  Transfer/Tickets) should get its own dedicated listing page, mirroring
  the existing, working `app/[country]/tours/page.tsx` pattern exactly.
  OUR SERVICES icons become plain links to these pages (same as Tours/
  CarRental already work), not inline show/hide state.
- Naming convention agreed: **plural**, matching `tours` — `hotels`,
  `flights`, `transfers`, `tickets`.
- "Promotion at the top" sorting logic explicitly deferred to a future
  phase (no `is_promoted`/`sort_order` column yet — not enough real data
  to make this meaningful until affiliate integrations are live).

### 🐛 Confirmed Bug — Tours Icon 404s

- Read-only investigation confirmed: `app/[country]/activities/` folder
  exists but has **no `page.tsx`**. `ServicesStrip.tsx`'s Tours icon links
  to `/${country}/activities` (404), while the homepage hero CTA correctly
  links to `/${country}/tours` (which works). This inconsistency likely
  originated when `ServicesStrip.tsx` was extracted from `page.tsx` in an
  earlier session. Fix bundled into the dedicated-pages prompt
  (`Windsurf_Prompt_Build_Dedicated_Service_Pages.md`).

### Next
- Sent build prompt for 4 new pages (`hotels`, `flights`, `transfers`,
  `tickets`) + `ServicesStrip.tsx` simplification (remove inline sections,
  fix all hrefs) + Tours 404 fix. Awaiting Windsurf report.

---

## Session 17 Continued (5) — 01 July 2026

### ⚠️ Report Rejected — Missing Required Code + Verification (repeat pattern)

- Windsurf reported creating `app/[country]/hotels/page.tsx`,
  `flights/page.tsx`, `tickets/page.tsx`, `transfers/page.tsx`, and
  simplifying `ServicesStrip.tsx` (315 → 130 lines), with `npm run build`
  passing after fixing 2 type errors along the way.
- **Not accepted as complete** — report contained no actual code (despite
  repeated explicit requirement), described the flights page as using a
  "placeholder" without clarifying whether it's wired to real
  `getTransferLinksByCity(..., 'wayaway')` data or dummy content, and
  offered no evidence of manual browser click-testing (only build-time
  route generation, which is not the same thing). Homepage inline-section
  removal and the Tours `/activities` → `/tours` href fix were also not
  explicitly confirmed.
- Sent a firm follow-up requiring: full code paste, clarification on the
  flights placeholder, and real click-through browser testing of all 6
  OUR SERVICES icons before this can be logged as done.

### Note for future sessions
- This is a recurring pattern in this task thread — Windsurf repeatedly
  substitutes descriptions/build success for the actually-requested full
  code + manual verification. Consider requiring screenshots as standard
  practice for any UI-facing task going forward, not just code.

---

## Session 17 Continued (6) — 01 July 2026

### ✅ Verified — Hotels/Tickets/Transfers Pages Working with Real Data

- Browser click-through confirmed (this time with real evidence, not just
  build success): `/thailand/hotels`, `/thailand/tickets`,
  `/thailand/transfers` all load correctly with real sample data from
  `agoda_links`/`klook_links`/`transfer_links`, no 404s. Car Rental still
  correctly falls back to `/thailand/services` Coming Soon. Old inline
  "Hotels in Bangkok" homepage sections confirmed removed.

### 🎯 Architecture Correction — Two Separate "Tours" Concepts

- Clarified that `/tours` (own `tours` table, hero "Explore Tours" CTA) and
  a to-be-built `/activities` (GYG **affiliate** tours from `gyg_links`,
  OUR SERVICES strip "Tours" icon) are two intentionally separate routes —
  the earlier fix that pointed the strip's Tours icon to `/tours` was a
  misdiagnosis; `/activities` was never actually the wrong destination,
  it was just missing a `page.tsx`.

### 🐛 Confirmed Bug — Flights Page Uses Hardcoded Placeholder, Not Real Data

- `app/[country]/flights/page.tsx` renders one hardcoded sample card into
  `FlightServiceCard` instead of querying
  `getTransferLinksByCity(defaultCity, 'wayaway')`. Needs fixing to match
  the pattern already correctly used by the transfers page (`'12go'`).

### Next
- Sent `Windsurf_Prompt_Build_Activities_Fix_Flights.md`: build
  `app/[country]/activities/page.tsx` (GYG affiliate tours listing),
  re-point the Tours icon href to `/activities`, and wire real data into
  the flights page. Awaiting report.

---

## Session 17 Continued (7) — 01 July 2026 — PAUSED FOR HANDOFF

### ⚠️ Latest Report — Not Yet Accepted (evidence gap, same recurring pattern)

- Windsurf reports: `app/[country]/activities/page.tsx` created (GYG-backed
  data), `ServicesStrip.tsx` Tours icon repointed to `/activities`,
  `app/[country]/flights/page.tsx` switched to real Wayaway
  (`transfer_links`, provider='wayaway') data. `npm run build` passed;
  `/thailand/activities` and `/thailand/flights` both returned HTTP 200.
- **Not yet confirmed as done.** HTTP 200 is a status-code check, not the
  browser-rendered-content verification the prompt explicitly required
  (visually confirm the GYG card renders on `/activities`, confirm the
  Tours icon really navigates there and not `/tours`, confirm "Explore
  Tours" hero CTA still correctly goes to `/tours` unaffected, confirm
  `/flights` shows real `transfer_links` data not the old hardcoded card).
  No code was pasted either, despite being a stated hard requirement again.
- **Session paused here for a break** — nothing further sent to Windsurf
  yet. Next action when resuming: re-send the same 4-point verification
  ask (browser content check, not just status code) before accepting.

---

## Session 17 Continued (8) — 01 July 2026

### 🎨 New Task — Unify Header Styling Across All Service Pages

- User wants the page-title/header area on Hotel/Flight/Tickets/Transfer/
  Car Rental (services)/Tours/Activities pages to visually match the
  homepage's "OUR SERVICES" section (gold uppercase label + underline +
  Playfair Display heading in the site's green) — color/typography only,
  no text or layout changes, no hero background photos added.
- Sent `Windsurf_Prompt_Unify_Page_Headers.md`, which requires confirming
  the real Tailwind color token names first (Step 0) rather than assuming
  `sacred-green`/`gold-deep` are correct, given the earlier unresolved
  token-naming concern from the `/services` placeholder page reversion.
- Awaiting report.

---

## Session 17 Continued (9) — 01 July 2026 — Design System Consolidation Decision

### 📐 Historical Context Confirmed (nothing was broken — this documents a known legacy split)

- Investigation confirmed the Tours Listing page's "Obsidian/Amber/Orange
  gradient header" (large hero banner + top-right `LanguageSelector.tsx`
  overlay) was a **deliberate, documented design decision** from an
  earlier session — not a bug. See the original Tours Listing UI/UX
  overhaul entry: "Design system: Obsidian/Amber/Orange gradient header
  retained" + "LanguageSelector injected top-right corner (non-destructive)."
- When Windsurf used `tours/page.tsx` as the template for the new
  `hotels`/`flights`/`tickets`/`transfers` pages in this session, it
  correctly inherited this same orange banner + LanguageSelector overlay
  pattern — this was accurate copying of the existing template, not a
  mistake. The visual mismatch flagged earlier in this session (vs. the
  newer homepage "Sacred Aesthetic" gold/cream look) is a **real,
  pre-existing design-language split across two eras of this site**, not
  something introduced by this session's work.
- Separately, it's still unconfirmed whether the main site Navbar (logo +
  MENU + globe icon + home icon, visible on the homepage) shares the same
  underlying language-switching/navigation logic as the Tours page's
  `LanguageSelector.tsx` overlay, or whether they are two independent
  components from different site eras. This needs live testing
  (click-through), not assumption, before deciding whether any
  breadcrumb/dropdown/back-link can be safely removed as redundant.

### 🎯 Strategic Direction Decided — Unify Site-Wide to "Sacred Aesthetic"

- **Business goal clarified**: the app should compete on UI/UX polish with
  Viator, GetYourGuide, Klook, and Airbnb Experiences — not just match
  functionality, but match/exceed the premium, cohesive feel of those
  platforms.
- **Decision**: rather than keeping the Obsidian/Amber/Orange banner as
  Tours-only legacy styling, the site should unify around the newer
  homepage "Sacred Aesthetic" (gold/cream palette, Playfair Display
  headings, understated gold-label + underline pattern) across **all**
  pages, including Tours — this better supports the "boutique travel
  concierge" brand positioning implied by the ThaiGuide name and
  Playfair Display typography.
- This supersedes the earlier framing of "remove the banner because it's
  a mismatch" — the banner isn't a mistake, but the decision is still to
  retire it in favor of one consistent design language site-wide.

### 🚀 Future Scope — Competitor-Level UX Ideas (not started, separate phase)

Captured for later prioritization, not part of the current header/color
unification work:
- More prominent trust signals on cards (rating/review count sizing,
  consistent "Free Cancellation" / "Instant Confirmation" badge styling)
- Higher-quality, curated destination photography (replace Unsplash
  placeholders)
- Filter/sort controls on listing pages (price, rating, duration) —
  standard on Viator/Airbnb Experiences
- Social proof / urgency indicators (e.g. "X booked this month")
- Mobile-first checkout flow audit, minimizing steps to book

### Architecture Notes (additions)
- Any future page-level template work should default to the "Sacred
  Aesthetic" (homepage) pattern, not the legacy Obsidian/Amber/Orange
  pattern, unless explicitly decided otherwise.
- Before removing any UI element for being "redundant" with the main
  Navbar, confirm via live browser testing (not documentation, since this
  isn't documented) whether the two components actually share logic.

---

## Session 18 — 02 July 2026 — Navbar/Breadcrumb Architecture Investigation & Unification

### 🔍 Investigation Completed — Navbar Component Architecture Confirmed

- **Navbar component location**: `components/shared/Navbar.tsx` (Client Component, `"use client"`).
  Props: `{ country?: string; language?: string }`.
- **NOT rendered via layout**: `app/[country]/layout.tsx` does NOT import or render `Navbar.tsx`. 
  The layout only wraps children in a `<div>` and conditionally renders `FloatingChatButton` for Thailand.
- **Only manually rendered on**: `app/[country]/page.tsx` (homepage), via 
  `<Navbar country={lowerCountry} language={targetLanguage.toUpperCase()} />`.
- **Globe icon confirmed**: opens `LanguageWelcome.tsx` (full-page takeover modal) via 
  `onClick={() => setShowLanguageWelcome(true)}` — NOT the lightweight `LanguageSelector.tsx` dropdown. 
  This resolves the open question from Session 17 Continued (9) about whether these share logic — they do not; only `LanguageWelcome.tsx` is wired to the navbar.
- **Home icon confirmed**: navigates to `/${country}` (country homepage), not `/`. 
  Source: `<Link href={`/${country}`}>` in `Navbar.tsx`.
- **Confirmed: all 7 service pages currently lack the sticky Navbar entirely**, showing only a text breadcrumb 
  (`"Home / {countryName} / {service}"`) instead:
  - `app/[country]/tours/page.tsx`
  - `app/[country]/hotels/page.tsx`
  - `app/[country]/flights/page.tsx`
  - `app/[country]/tickets/page.tsx`
  - `app/[country]/transfers/page.tsx`
  - `app/[country]/activities/page.tsx`
  - `app/[country]/services/page.tsx`
- **Variable naming confirmed identical across all 7 files** (all Server Components):
  - Country slug variable: `country` (from `const { country } = await params`)
  - Language variable: `targetLanguage` (from `const targetLanguage = (cookieStore.get('NEXT_LOCALE')?.value ?? 'EN').toUpperCase()`)
  - `app/[country]/services/page.tsx` additionally has `lowerCountry` and uses hardcoded breadcrumb text (not `translatedData`-driven like the other 6).

### 🎯 Decision — Unify Navbar Across All Service Pages

- **Decision**: Replace the text breadcrumb on all 7 service pages with the same sticky `Navbar.tsx` component used on the homepage — `<Navbar country={country} language={targetLanguage} />` — inserted as the first child inside `<div className="min-h-screen bg-white">`, before the existing gold-label/title header block. The breadcrumb `<div>` block is removed; the gold-label + Playfair title block underneath is preserved unchanged.
- This supersedes the earlier "breadcrumb-only, no navbar" approach documented in Step 4 of the Sacred Aesthetic Unification report — that approach is now retired in favor of full Navbar consistency with the homepage.
- Implementation prompt sent to Windsurf covering all 7 files. **Status: awaiting Windsurf implementation report + build output + manual browser verification before this is marked complete.**

### Next
- Awaiting Windsurf's implementation report for the 7-file Navbar replacement.
- After code is accepted, manual browser click-through verification required on all 7 `/thailand/{service}` routes to confirm: Navbar renders correctly, Menu/Globe/Home icons all function, gold-label/title block still renders correctly below it, no layout/spacing regressions.

---

## Session 19 — 02 July 2026 — Consolidated Backlog Review & Affiliate Signup Decision

### 📋 Full Roadmap Review — Consolidated Remaining Work

A full pass through every prior session's "Pending" / "Remaining Work" / "TODO" entries was done to compile a single accurate backlog, since several items had been carried over silently across multiple sessions without a consolidated view.

**🔴 Blocking / Safety-Critical (must fix before production traffic grows):**
- Placeholder affiliate links (`href="#placeholder-*"` in `agoda_links`, `klook_links`, `transfer_links`) are live/clickable, not visibly disabled — needs `e.preventDefault()` + "Coming Soon" UI cue before real users see them (carried from Session 17 Continued).
- Flight slot component choice (`FlightServiceCard` vs `TransferServiceCard`) was never confirmed prop-compatible (carried from Session 17 Continued).
- Tailwind design tokens (`sacred-bg`, `sacred-green`, `gold-deep`) — never confirmed to actually be defined in `tailwind.config.js` with correct hex mappings (carried from Session 17).
- Session 18 Navbar-on-service-pages work — code and build both confirmed correct, but manual browser click-test across all 7 `/thailand/{service}` routes is still outstanding.

**🟡 GYG / Affiliate Data:**
- Replace placeholder `gyg_url` + price/rating/reviews/duration in `gyg_links` with real data from GYG partner dashboard (carried from Session 16).
- Add `gyg_links` rows for Chiang Mai, Phuket, Pattaya, Krabi, Ayutthaya (Bangkok is currently the only city with data).
- `defaultCity` is hardcoded to `'bangkok'` across all service page data fetches — not yet dynamic per selected city tab (carried from Session 16).

**🟢 UI Polish:**
- `TourServiceCard` sizing/styling still not confirmed to exactly match the other 5 service card components (carried from Session 16).

**⚪ Older Carry-Over (open since Session 14–15, still unresolved):**
- Cookie Consent Banner — production verify still outstanding.
- Vercel legacy Vite project (`thailand.asiabuddy.app`) — deletion still pending; previously noted as causing deploy errors.
- Destination name/description translations (MM/TH/DE/FR/ES) — static columns exist in Supabase but translation content itself is still empty/pending, to be filled via Admin.
- Tours table — static translation columns (same pattern as destinations) not yet implemented.
- Budget Tips modal — MM/TH/DE/FR/ES translations still pending (EN-only currently).
- PWA Offline feature — not started.
- B2B bank transfer details for PDF invoice (Phase 3) — not started.

### 🎯 Decision — Begin Affiliate Program Signups Now (Parallel Track)

- **Decision**: Klook and Agoda affiliate program signups will begin now, in parallel with the remaining GYG real-data work above — these are independent tracks and affiliate approval turnaround (days, per each program's public documentation) means starting early avoids idle waiting later.
- 12Go/WayAway affiliate signup will follow the same pattern once Klook/Agoda are underway.
- Once each program is approved, real affiliate data replaces the corresponding placeholder table (`agoda_links`, `klook_links`, `transfer_links`) — same pattern already established for `gyg_links`.
- This does not change the priority order of the 🔴 Blocking items above — those should still be addressed independently of affiliate signup status.

### Next
- User to complete Klook affiliate signup (affiliate.klook.com) and Agoda affiliate signup (partners.agoda.com).
- Separately: address the 🔴 Blocking items, starting with making placeholder links visibly inert (highest user-facing risk).

---

## Session 20 — 02 July 2026 — SSR Chat Widget Verification Closed

### ✅ Status: CLOSED — 13/16 widgets fully verified, 3 known non-blocking

- Playwright script `scripts/verify-widgets.js` tests 16 chat/guide
  widgets total (script list confirmed authoritative — prior assumption
  of "15" widgets was incorrect).
- **13/16 widgets: PASS** — trigger found, modal visible via real CSS
  selector (`.fixed.inset-0` / `[class*="modal"]`), screenshot saved,
  no console errors, no failed network requests. Verified fresh this
  session (file timestamps cross-checked against session start time,
  not stale data from a prior run).
- **3/16 widgets: FAIL in automated test, but root cause confirmed
  non-blocking:**
  - **BookingChat** — component (`BookingChat.tsx`) confirmed to exist,
    correctly imported and rendered in `ThailandApp.tsx`, trigger button
    `id="menu-booking-btn"` confirmed present in code. Automated script
    selector does not match actual click interaction — test-tooling
    issue, not a product bug.
  - **ConciergeChat** — confirmed to be a full-page view component
    (`activeView === 'chat'` state), NOT a modal. Script was built
    assuming a modal-based trigger/selector pattern, which does not
    apply to this widget. Component itself works correctly.
  - **HumanOperatorChat** — component confirmed to make a real POST
    request to `/api/booking-chat` (verified in source, line ~252).
    Automated trigger ("Book Now" button, requires scroll) was not
    found by the script; live click-through of the actual request
    firing was not performed in this session. Component code is wired
    correctly; only the automated trigger-finding failed.
- **Decision:** These 3 are test-tooling/selector limitations on
  components that are confirmed working in code — not rendering, SSR,
  or product bugs. Deferred to 🟢 backlog (not blocking). Full JSON
  report saved to `debug-output/widget-verification.json`.

### Next
- Moving to 🔴 blocking item: placeholder affiliate link
  (`#placeholder-*`) preventDefault + "Coming Soon" UI treatment.
- Separately: complete Session 18 browser click-test verification for the 7 service pages.

---

## Session 21 — 03 July 2026 — i18n/Localization Fixes

### ✅ Completed and Verified (code written, type-checked, NOT yet committed/pushed)

- **lib/i18n.ts** — Added new i18n keys across all 6 languages (EN/TH/MM/ES/FR/DE):
  - `visa.modalSubtitle`
  - `budget`
  - `budgetSubtitle`
  - `learnMore`
  - New `essentialGuides` object with:
    - `sectionTitle`
    - `learnMore`
    - `cards` object with 8 sub-keys: `generalInfo`, `travelTypes`, `visaInfo`, `transport`, `accommodation`, `foodDining`, `cultureEtiquette`, `budgetTips` ✅

- **lib/i18n.ts** — Fixed MM (Myanmar/Burmese) mistranslations:
  - `accommodation.title`: was "အိမ်ယာ" (housing/real estate) → fixed to "တည်းခိုနေထိုင်ရေး" ✅
  - `food` card label: was redundant "စားသောက်နှင့် အစားအသောက်" → fixed to "အစားအစာ" ✅
  - `travelTypes.title`: was English → fixed to proper Burmese ✅
  - `visa.title`: was English → fixed to proper Burmese ✅
  - `transport.title`: was English → fixed to proper Burmese ✅
  - `tools.etiquette`: was English → fixed to proper Burmese ✅

- **lib/i18n.ts** — Fixed CRITICAL TH (Thai) bug:
  - TH language block's `essentialGuides` key contained Burmese/Myanmar script instead of Thai script
  - (likely from accidental copy-paste in earlier session)
  - Thai-language site visitors were seeing Burmese text in Essential Guides section ✅
  - Corrected with accurate Thai translations ✅
  - Removed duplicate `essentialGuides` key that existed in TH block ✅

- **components/shared/EssentialGuides.tsx** — Replaced all hardcoded English strings:
  - 8 card titles → `UI_TRANSLATIONS[language]` lookups ✅
  - "ESSENTIAL GUIDES" section heading → localized ✅
  - "Learn more" label → localized ✅
  - Essential Guides card grid now properly localized ✅

- **components/shared/ChatWidgetGrid.tsx** — Connected guide modal titles/subtitles to translation keys:
  - Travel Types, Visa, Transport, Accommodation, Food, Budget, General Info modal titles/subtitles ✅
  - Etiquette section header/subtitle → localized ✅
  - All hardcoded English strings replaced with `UI_TRANSLATIONS[language]` lookups ✅

- **Verification performed:**
  - `npx tsc --noEmit` passed with 0 errors ✅
  - All 3 changed files (lib/i18n.ts, EssentialGuides.tsx, ChatWidgetGrid.tsx) manually diff-reviewed line by line ✅
  - Confirmed no unintended scope changes ✅

- **STATUS:** Confirmed committed as 65c7ad77 (verified 04 July 2026) ✅

### ⏳ Known Remaining Bug (not yet fixed — scoped for follow-up task)

- **Modal title fields untranslated for MM and TH specifically:**
  - `transport.modalTitle` (MM/TH)
  - `visa.modalTitle` (MM/TH)
  - `travelTypes.modalTitle` (MM/TH)
  - `accommodation.modalTitle` (MM/TH)
  - `food.modalTitle` (MM/TH)
  - `infoModalTitle` (MM/TH)
  - `labels.culturalSubtitle` (MM/TH)
  - Note: ES/FR/DE do NOT have this bug — already correctly translated ✅

- **TH `food` object untranslated internal fields (lower priority):**
  - `title`, `chatTitle`, `statusActive`, `suggestionsLabel`, `detailsTitle`
  - Some may not be user-facing — lower priority ✅

- **Structural gap — `food.modalSubtitle` key does not exist:**
  - Code currently falls back to `food.detailsTitle` (untranslated in MM/TH)
  - New key should be added across all 6 languages ✅

- **Structural gap — Budget modal lacks dedicated title:**
  - Budget modal reuses short card-label key (`budget`) as modal title across all languages
  - Other guides have distinct modalTitle (e.g., Visa uses "Thailand Visa Guide")
  - Consider adding new `budgetModalTitle` key ✅

### Architecture Notes (additions)
- EssentialGuides.tsx and ChatWidgetGrid.tsx now fully i18n-compliant — no hardcoded English strings
- TH language block critical bug fixed: Burmese script contamination removed from Thai translations
- MM mistranslations corrected: accommodation.title and food card label now use proper Burmese terms
- Modal title translation gap identified: MM/TH modal titles remain untranslated (ES/FR/DE are correct)
- Structural gaps documented: food.modalSubtitle and budgetModalTitle keys missing across all languages

---

## Session 22 — 04 July 2026 — Language Switch Bug, First-Visit Language Picker, Visa Content Update

### ✅ Completed and Verified

**Language switch bug (root cause + fix):**
- Root cause: `router.refresh()` in Navbar.tsx's handleLanguageChange did not reliably propagate the newly-set NEXT_LOCALE cookie to the server on re-render
- Fix: replaced `router.refresh()` with `window.location.reload()` (same pattern already used in LanguageWelcome.tsx)
- Added `export const dynamic = 'force-dynamic'` to app/[country]/page.tsx and app/[country]/layout.tsx ONLY (not root app/layout.tsx, to preserve static generation site-wide for performance)
- Verified via console logs: FR language now correctly flows from server cookie → page.tsx → Navbar.tsx → EssentialGuides.tsx
- Committed as 4fde4a87 ✅

**Google Translate auto-intervention (root cause of "content stays English" reports):**
- Root cause: root `<html>` tag had hardcoded `lang="en"` regardless of selected language, causing Chrome/Edge to detect French content but see English declared, triggering inconsistent browser auto-translate that missed dynamically-rendered widgets
- Fix: made `lang` attribute dynamic in the root layout (reads NEXT_LOCALE cookie), and added `<meta name="google" content="notranslate" />` to prevent browser interference with the site's own i18n system
- Confirmed: this was the actual cause of the "Essential Guides content not fully in French" reports — NOT missing translation data. All 16 files in data/thailand/ and all language blocks in lib/i18n.ts were already confirmed complete ✅

**Data file audit — no gaps found:**
- Confirmed all 16 files in data/thailand/ (including visaGuide.ts) have complete FR (and all 6 language) keys ✅
- Confirmed data/thailand/etiquetteData.ts is intentionally deprecated and empty — etiquette content now lives in lib/i18n.ts under `etiquetteSections` and related keys, fully translated across all 6 languages. Future sessions should NOT re-investigate this file as a translation gap ✅

**First-visit language picker (new feature, per original product intent):**
- Root cause: LanguageWelcome.tsx (the "SAWASDEE" full-page language picker) was only reachable via manual Globe icon click (`onClick={() => setShowLanguageWelcome(true)}`) — there was no auto-trigger for first-time visitors with no NEXT_LOCALE cookie
- Fix: app/[country]/page.tsx now computes `isFirstVisit = !cookieStore.has('NEXT_LOCALE')` and passes it to Navbar as a prop; Navbar.tsx initializes `useState(isFirstVisit || false)` for `showLanguageWelcome`
- Behavior confirmed: first-time visitors (no cookie) now see the language picker automatically; returning visitors with a cookie skip it; manual Globe icon re-trigger still works ✅
- English remains the correct fallback default if an invalid/error language state occurs — this was confirmed as intentional, not a bug ✅
- Committed as [pending commit hash — will be added after current changes are committed] ✅

**Visa/immigration content — major 2026 rules rewrite:**
- data/thailand/visaGuide.ts ENGLISH_GUIDE completely rewritten to reflect updated 2026 Thai immigration framework: 30-day exemption for 54 countries, 15-day exemption for Maldives/Mauritius/Seychelles, Visa on Arrival reduced to 4 countries (India, Serbia, Azerbaijan, Belarus), and existing bilateral agreements (90/30/14 day categories) documented separately
- Committed as 9e60e3a9 ✅

**Environment/tooling notes learned this session:**
- PowerShell's `Test-Path` and other path cmdlets treat `[...]` in paths like `app\[country]\` as a wildcard character class, not a literal folder name — always use `-LiteralPath` when checking paths containing `[country]`, `[slug]`, etc. (A false "file missing" 404 investigation this session was actually just this PowerShell quirk)
- PowerShell does not support bash-style `rm -rf`; use `Remove-Item -Recurse -Force` or `rm -r -force` instead ✅

**Commits this session:** 4fde4a87, 9e60e3a9, 6bbdc3d6 (MarkdownRenderer GFM tables), and one additional commit for the isFirstVisit feature

### Session 22 Continued — Post-Fix Backlog Sweep

**Google Translate auto-intervention fix (re-confirmed):**
- Root `<html>` tag `lang` attribute made dynamic (reads NEXT_LOCALE cookie) instead of hardcoded "en"
- Added `<meta name="google" content="notranslate" />` in root layout
- Confirmed as the actual root cause of earlier "Essential Guides French content incomplete" reports — NOT missing translation data ✅

**Live clock hydration fix:**
- components/shared/TravelToolbox.tsx — the "Heure Locale" timestamp widget was computing Date values during SSR render, causing a mismatch with client hydration
- Fixed with client-only mount pattern (useEffect + mounted state) ✅

**First-visit language picker feature (re-confirmed):**
- app/[country]/page.tsx now computes `isFirstVisit = !cookieStore.has('NEXT_LOCALE')` and passes it to Navbar
- Navbar.tsx initializes `useState(isFirstVisit || false)` for `showLanguageWelcome`
- New visitors with no cookie see the "SAWASDEE" language picker automatically; returning visitors and manual Globe-icon trigger are unaffected ✅

**MarkdownRenderer.tsx — GFM table support (orphaned uncommitted change, now committed):**
- Added `remark-gfm` plugin and styled table/thead/tbody/tr/th/td components matching the site's gold/sacred color scheme
- Unrelated to i18n work — a separate feature enhancement that had never been committed
- Committed as 6bbdc3d6 ✅

**CRITICAL BUG FOUND & FIXED — Flights page showed mislabeled transfer data:**
- app/[country]/flights/page.tsx was calling `getTransferLinksByCity(defaultCity, 'wayaway')` (the TRANSFER data table, filtered by provider) and mapping transfer fields onto FlightServiceCard with hardcoded placeholders (departure_time: 'Flexible', stops: 0, airline: flight.provider || 'Wayaway')
- This meant real users visiting /thailand/flights saw ground transfer routes/prices mislabeled as flights
- No `flight_links` table or flight-specific query function exists in Supabase
- RESOLUTION: flights page temporarily disabled and replaced with a "Coming Soon" placeholder (same pattern as other pending affiliate services) until real flight data is available
- FlightServiceCard.tsx itself was NOT deleted — only its rendering with transfer data was removed ✅

**FlightServiceCard / TransferServiceCard prop compatibility — investigated, confirmed NOT an issue:**
- The two components have intentionally different, independent prop interfaces (FlightData: 10 fields; TransferData: 7 fields; only 3 fields overlap by type)
- TransferServiceCard is correctly wired in app/[country]/transfers/page.tsx with real transfer_links data
- No further action needed for this item — remove it from any "pending" list ✅

**Uncommitted-work audit closed:**
- All previously-uncommitted files from this session (app/layout.tsx, TravelToolbox.tsx, Navbar.tsx, page.tsx, MarkdownRenderer.tsx + its dependencies, placeholder affiliate link fixes, flights page fix) have been committed
- Note: `git status` should be checked at the start of every future session before beginning new work, since this session found multiple critical fixes had been sitting uncommitted for extended periods ✅

### ⏳ Remaining Work / Backlog

**High priority:**
- 🔴 Tailwind design tokens verification (sacred-bg, sacred-green, gold-deep, gold-soft) — NOT YET DONE. If any of these custom classes are missing from tailwind.config.js/ts theme.extend.colors, Tailwind will silently ignore them in production with no build error, causing invisible site-wide styling failures. This is the next task to pick up.

**Long-term (not blocking):**
- 🟡 Real flight_links Supabase table + getFlightLinksByCity() query function — needed before flights page can be re-enabled with real data

---

## Session 23 — 06 July 2026 — Klook Real Affiliate Data Wired (Tickets)

### ✅ Completed and Verified

**Klook affiliate account + real links generated:**
- Klook affiliate account (AID 126322) approved and active
- Generated 12 real affiliate links via affiliate.klook.com Method 1
  (individual generation) for: Bangkok, Pattaya, Phuket, Krabi, Hua Hin,
  Hat Yai, Kanchanaburi, Pak Chong, Ko Chang, Satun, Chiang Rai, Ko Samui
- Custom tag naming convention applied: <city>_destination (e.g.
  bangkok_destination, pattaya_destination, etc.)
- Shortened links (not full redirect URLs) used for storage — functionally
  identical for commission tracking, cleaner for DB/UI

**klook_links table — created (did NOT already exist despite earlier
notes suggesting otherwise):**
- Columns confirmed via information_schema query: id (uuid), city (text),
  activity_name (text), klook_url (text), price_from (text), rating (text),
  reviews_count (text), duration (text), image_url (text),
  is_placeholder (text — NOTE: stored as TEXT, not boolean, unlike what
  the naming implies; must be string-compared as 'true'/'false'),
  created_at (timestamptz)
- 12 rows inserted with real klook_url values, is_placeholder = 'false'
  for all rows (real, non-placeholder links)
- price_from, rating, reviews_count, image_url left NULL — no real
  pricing/rating data pulled from Klook activity pages yet (same gap as
  documented for gyg_links in Session 16/17)

**Integration — Tickets service slot wired to real data:**
- lib/queries/klookLinks.ts — getKlookLinksByCity() confirmed working
- components/shared/services/TicketServiceCard.tsx — confirmed existing,
  correct null handling, correct design tokens, correct CTA logic
  (clickable when is_placeholder = 'false', disabled "Coming Soon" when
  'true')
- app/[country]/page.tsx — added "FEATURED TICKETS" horizontal scroll
  section (homepage teaser, top 3 tickets, "View All" link to
  /[country]/tickets)
- app/[country]/tickets/page.tsx — dedicated full-listing page, fixed to
  accept `searchParams.city` (was previously hardcoded to 'bangkok' only)
  and now renders a 12-city selector (Bangkok, Pattaya, Phuket, Krabi,
  Hua Hin, Hat Yai, Kanchanaburi, Pak Chong, Ko Chang, Satun, Chiang Rai,
  Ko Samui), each linking to /[country]/tickets?city=<slug>. Verified
  working for both Bangkok (default) and Pattaya (via ?city=pattaya).
- Homepage "FEATURED TICKETS" teaser intentionally stays hardcoded to
  bangkok only (matches existing hardcoded-city precedent from the Tours
  teaser) — this is scoped/acceptable, only the dedicated listing page
  needed the city-param fix.

### 🐛 Bugs Found and Fixed This Session

1. **"$N/A" price text bug** — components/shared/services/ServicesStrip.tsx
   (lines ~49/64/79/94) used `price_from || 'N/A'` fallback, showing
   "1 tickets from $N/A" (and same for hotels/flights/transfers) whenever
   price_from was null. Fixed to conditionally omit the price segment
   entirely using `price_from != null && price_from !== ''` (explicit
   null/empty check, not truthy check — truthy would incorrectly hide a
   legitimate "$0" price). Fixed across all 4 service tiles (Hotels,
   Flights, Tickets, Transfers), not just Tickets, since all 4 shared the
   same bug pattern.

2. **Tickets listing page showing only 3 of 12 potential rows** —
   app/[country]/tickets/page.tsx line 122 incorrectly used
   `klookLinks.slice(0, 3)` — a 3-item preview limit that belongs only on
   the homepage teaser section, not the dedicated full-listing page.
   Fixed to `klookLinks.map(...)` to show all available tickets for the city.

3. **/thailand/tickets hardcoded to defaultCity = 'bangkok'** — same
   hardcoded-city technical debt pattern documented for the Tours slot in
   Session 16. Fixed by adding searchParams.city support + city selector
   UI. Verified working with ?city=pattaya. All 12 cities' real Klook
   links are now reachable through the UI (previously only Bangkok's was,
   despite 12 rows existing in the database).

### 🔍 Investigated — Not a Bug, Data Gap (new backlog item)

- **Homepage "FEATURED JOURNEYS" (Tours) section not rendering:**
  Initially suspected as a regression/bug during this session's
  investigation. Root cause confirmed via direct query:
  `SELECT id, title, country, featured, slug FROM tours WHERE country = 'thailand'` 
  returned 30 rows, ALL with `featured: false`. The section's conditional
  `{translatedTours && translatedTours.length > 0 && (...)}` correctly
  returns nothing because the query filters `featured = true`. This is
  NOT a code bug — no tour has ever been marked featured.
  CORRECTION to prior assumption: this homepage Tours section queries the
  `tours` table directly (filtered by country + featured), NOT the
  `gyg_links` table as earlier session notes/reports implied. `gyg_links` 
  appears to be a separate, currently-unused-on-homepage data source —
  worth clarifying its actual current purpose in a future session.
  **Action deferred by user request** — see backlog below.

### ⏳ Backlog (new items from this session)

- 🟡 **Mark tours as featured** — pick 2-6 tours from the 30 existing
  `country='thailand'` rows and run `UPDATE tours SET featured = true
  WHERE slug IN (...)` so the homepage "FEATURED JOURNEYS" section
  renders. Purely a content decision, no code change needed.
- 🟡 **Clarify gyg_links' actual current role** — it was documented in
  Session 16/17 as the data source for a Tours homepage slot, but that
  slot actually reads from the `tours` table instead. Determine whether
  gyg_links is dead/unused, meant for a different page, or needs to be
  wired somewhere — don't assume it's connected to the homepage Tours
  section going forward.

### Architecture Notes (additions)
- klook_links.is_placeholder is stored as TEXT, not boolean — any future
  service table created via Supabase SQL Editor's default UI flow should
  have its column types double-checked before writing query/comparison
  code; do not assume boolean just because a column name implies it.
- The "$N/A" placeholder-text bug pattern (raw fallback string shown to
  users when a DB field is null) applies broadly across all 4 service
  tiles in ServicesStrip.tsx — worth checking for the same anti-pattern
  in any newly added service tile in the future (e.g. when agoda_links
  or transfer_links get real data).
- A browser console error referencing https://emrldtp.com/chunk.*.js
  ("config is not valid") was investigated during this session and
  confirmed to originate from a browser extension, not app code — not an
  AsiaBuddy bug, no action taken.
- Confirmed service→provider mapping for future reference: Tours →
  gyg_links (or tours table, role TBD — see backlog) / Tickets →
  klook_links / Hotel → agoda_links (placeholder only) / Transfer →
  transfer_links (placeholder only) / Flight → no table yet.

---

## Session 24 — 07 July 2026 — GYG Activities Real Data (IN PROGRESS — paused)

### ✅ Completed This Session

**GYG affiliate real links generated (29 activities across 12 cities):**
- Researched and curated "activities popular with Myanmar tourists" list
  (Grand Palace, Safari World, Alcazar Show, Phi Phi Island, Khao Yai,
  White Temple, etc.) across: Bangkok, Pattaya, Phuket, Krabi, Hua Hin,
  Hat Yai, Kanchanaburi, Pak Chong, Ko Chang, Chiang Mai, Chiang Rai,
  Ko Samui (Satun skipped — no activities found, replaced by Chiang Mai
  per user decision)
- Generated real GYG affiliate links via partner.getyourguide.com Link
  Builder (partner_id CSMXKHM), with per-activity campaign tags following
  <city>_<activity> naming convention
- Caught and fixed several data-quality issues before inserting: city
  naming inconsistency (mixed case/spaces vs. klook_links convention),
  a duplicate-URL issue on two different "Krabi" activities, an activity
  mislabeled under the wrong city (Ko Chang activities tagged as
  "pakchong"), and one activity whose URL didn't match its stated name
  (Hat Yai "Municipal Park" was actually an airport transfer ticket —
  renamed to match the real product)

**gyg_links table updated:**
- Deleted old placeholder row (id 2f313649-cdc4-475d-ba97-aeb1411b487a,
  "Bangkok Temple Tour" with non-specific URL bangkok-l84-tw and a
  malformed "€56" price display)
- Inserted 29 real rows with confirmed columns: city, activity_name,
  gyg_url, price_from (NULL), rating (NULL), reviews_count (NULL),
  duration (NULL), image_url (NULL)
- NOTE: gyg_links has NO is_placeholder column (unlike klook_links) —
  do not assume that column exists here.
- Verified live on localhost:3000/thailand/activities — Bangkok's 3
  activities (Grand Palace, Safari World, Asiatique) render correctly.

**Architecture clarification (closes a Session 23 backlog item):**
- Confirmed gyg_links IS actively used — by app/[country]/activities/page.tsx
  (NOT by the homepage "Featured Journeys" section, which reads from a
  separate `tours` table). These are two distinct, unrelated data sources
  serving two different pages.
- Also discovered the `destinations` table (used for homepage "Discover
  Thailand" city tabs) uses a DIFFERENT city list and slug format
  (hyphenated, e.g. "chiang-mai", "koh-samui") than gyg_links/klook_links
  (no-hyphen, e.g. "chiangmai", "kosamui"). "Chiang Rai" doesn't exist in
  destinations at all. Decision: activities page will follow the same
  pattern as the Tickets page — a custom-built city selector matching
  the klook_links/gyg_links convention, NOT pulled from destinations —
  to stay consistent with the working Tickets implementation.

### 🐛 New Bugs Found — NOT yet fixed (blocking, must fix before this
task is considered done)

1. **"$0 /person" price bug** — worse than the earlier "$N/A" bug fixed
   in Session 23. Null price_from is rendering as "$0", which is
   actively misleading (implies a real free price, not missing data).
   Likely a `price_from || 0` or similar fallback in the Activities card
   component (different from ServicesStrip.tsx, which was already fixed
   in Session 23 — this is a NEW location, probably in an
   ActivityCard/TourCard-style component under
   components/shared/services/ or app/[country]/activities/).
   Fix: use explicit `price_from != null && price_from !== ''` check
   (same pattern as the ServicesStrip fix) and hide the price line
   entirely when null — do not fall back to 0.

2. **"(0)" rating bug** — same root cause, different field. Null
   rating/reviews_count is rendering as "(0)", implying zero reviews
   exist. Fix: hide the rating badge entirely when rating/reviews_count
   is null, using the same explicit null-check pattern.

3. **No city selector on /thailand/activities** — page currently only
   ever shows Bangkok (hardcoded), same issue Tickets page had before
   the Session 23 fix. All 26 non-Bangkok activities (Pattaya, Phuket,
   Krabi, Hua Hin, Hat Yai, Kanchanaburi, Pak Chong, Ko Chang, Chiang Mai,
   Chiang Rai, Ko Samui) are in the database but currently unreachable
   through the UI.

4. **No image placeholder** — image_url is NULL for all 29 new rows, so
   cards show only the dark navy background with an icon. Not broken,
   but a generic Thailand-themed placeholder image would look more
   finished than an empty box (lower priority than bugs 1-3).

### ⏳ Backlog (carried over + new)

- 🟡 Mark 2-6 tours as featured=true (from Session 23, still pending)
- 🟡 Fix "$0 /person" price bug on /activities (this session, priority)
- 🟡 Fix "(0)" rating bug on /activities (this session, priority)
- 🟡 Add city selector to /activities matching the Tickets page pattern
  (this session, priority — blocks 26 of 29 real activities from ever
  being visible)
- 🟢 Add placeholder image for activities with null image_url (low
  priority, cosmetic)
- 🟢 Find a real Satun activity/product on GYG (skipped this session,
  substituted with Chiang Mai instead)

---

## Session 25 — 07 July 2026 — Activities Bugs Closed Out

### ✅ Completed This Session

**All 4 blocking bugs fixed via Windsurf:**
- City selector (12 cities) — added to `/thailand/activities` following the `tickets/page.tsx` pattern, with searchParams.city handling and pill UI
- "$0 /person" price bug — fixed by removing `|| '0'` fallback in activities/page.tsx and adding explicit null check in TourServiceCard.tsx
- "(0)" rating bug — fixed by removing `|| '0'` fallbacks and adding explicit null check on both rating and reviews_count fields
- Empty image-box placeholder — replaced dark icon box with existing `/thailand.jpg` placeholder image

**Verification:**
- All fixes confirmed via screenshot verification on Bangkok and Hua Hin activities
- Build succeeded with no errors after each fix
- No regressions on activities with real data (price, rating, image_url all render correctly when present)

### ⏳ Remaining (non-blocking, data content only — not code)

- 🟢 All 29 GYG activities share one identical placeholder image — gyg_links.image_url is NULL for every row across all 12 cities. Task 4's placeholder fix works correctly; the sameness is because no real per-activity photos have been sourced yet. When time allows: find a real photo per activity (GYG dashboard / Google Places / licensed stock) and update gyg_links.image_url per row via Supabase SQL Editor.
- 🟢 Satun has no real GYG activity — substituted with an extra Chiang Mai activity in Session 24. Revisit later if a real Satun product becomes available on GYG.
