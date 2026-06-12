# AsiaBuddy — Technical Roadmap & Architecture Guide
> Last Updated: 09 June 2026

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
│   └── thailand/                   ← Vite App (Separate Project)
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

| Domain | Framework | Status |
|--------|-----------|--------|
| `asiabuddy.app` | Next.js | ✅ Live |
| `thailand.asiabuddy.app` | Vite + React | ✅ Live |
| `singapore.asiabuddy.app` | Vite + React | 🔜 Planned |
| `japan.asiabuddy.app` | Vite + React | 🔜 Planned |
| `vietnam.asiabuddy.app` | Vite + React | 🔜 Planned |

> ⚠️ `asiabuddy.app/thailand` redirects automatically to `thailand.asiabuddy.app`.
> Ads and marketing can use `asiabuddy.app/thailand` — redirect handles it.

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

## ➕ Adding a New Country (Step-by-Step)

### Step 1 — `data/countries.ts` 
```ts
{
  id: "singapore",
  name: "Singapore",
  status: "coming_soon",  // Change to "live" when ready
  slug: "https://singapore.asiabuddy.app",
  flag: "🇸🇬"
}
```

### Step 2 — `next.config.js` 
```js
{
  source: '/singapore',
  destination: 'https://singapore.asiabuddy.app',
  permanent: false,
},
{
  source: '/singapore/:path*',
  destination: 'https://singapore.asiabuddy.app/:path*',
  permanent: false,
},
```

### Step 3 — Vercel Setup
- [ ] Create new Vite project in Vercel
- [ ] `vite.config.ts` → `base: "/"` 
- [ ] Vercel → Deployment Protection → OFF
- [ ] Vercel → Domains → `singapore.asiabuddy.app` 
- [ ] Porkbun DNS → CNAME record

### Step 4 — Environment Variables (Vite Vercel project)
- [ ] `VITE_GEMINI_PRO_API_KEY` (Pay-as-you-go)
- [ ] `VITE_SUPABASE_URL` 
- [ ] `VITE_SUPABASE_ANON_KEY` 

### Step 5 — `src/services/gemini.ts` 
Add new country prompt inside `getSystemInstruction()` 

### Step 6 — Verify `geminiService.ts` 
```ts
const API_ENDPOINT = "https://asiabuddy.app/api/web-chat"; // Absolute URL only
```

### Step 7 — Deploy
```bash
git add . && git commit -m "feat: add Singapore"
git push origin main
```

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

## 🔜 နောက်ဆက်တွဲ

- Cookie Consent Banner — GDPR compliance update
  (Decline button equal styling, Privacy Policy GDPR fields: 
  data controller, user rights, retention period)
