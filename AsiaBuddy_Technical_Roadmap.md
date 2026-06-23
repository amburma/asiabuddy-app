# AsiaBuddy — Technical Roadmap & Architecture Guide
> Last Updated: 20-21 June 2026 — Session 6

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
