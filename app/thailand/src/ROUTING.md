# Thailand App — Routing Architecture

## Router: React Router v6 (createBrowserRouter)

## Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `DestinationPage` | Updated home — Dual-CTA, Featured Tours |
| `/tours` | `ToursListPage` | Grid of all Excellent Tours |
| `/tours/:slug` | `TourItineraryPage` | Accordion timeline + Sticky widget |

## Data Fetching (Supabase)
- `ToursListPage` → `SELECT * FROM tours WHERE featured=true AND status='active'`
- `TourItineraryPage` → `SELECT * FROM tours WHERE slug=:slug` + `SELECT * FROM itineraries WHERE tour_id=:id ORDER BY day_number`
- `DestinationPage` → `SELECT * FROM tours WHERE featured=true LIMIT 3` + `SELECT * FROM destinations`

## Booking Widget → HumanOperatorChat Connection
- `Reserve Your Journey` button passes `{ tour_slug, tour_title, salesperson_id }` as initial context
- Opens existing `HumanOperatorChat` component — no new API needed
- `salesperson_id` comes from `tours.salesperson_id` column

## Rules
- All routes client-side only (Vite SPA)
- No SSR / no Next.js involvement
- Use `import.meta.env.VITE_SUPABASE_URL` for all Supabase calls
- Never use process.env in Vite
