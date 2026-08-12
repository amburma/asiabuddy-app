-- ============================================================================
-- Migration: 20260811_create_tour_guide_foundation.sql
-- Phase 0 — Tour Guide Voice Translator Suite (§3 of AsiaBuddy_TourGuide_Project_Plan.md)
--
-- ⚠️ ASSUMPTIONS THAT STILL NEED CONFIRMATION AGAINST THE LIVE DB BEFORE APPLYING:
--   1. `update_updated_at_column()` trigger function exists (referenced in the
--      12Go session summary as re-created) — used below for updated_at columns.
--      If it doesn't exist, this migration will fail; create it first or swap
--      for a plpgsql block.
--   2. `bookings.id` is UUID (confirmed by investigation) ✅
--   3. `auth.users(id)` is used instead of `admin_users(id)` — no admin_users
--      table exists (confirmed by investigation) ✅
--   4. total_hours_allocated auto-computation (tour_days * 2) is NOT done here —
--      it belongs in application/API code at booking-confirmation time, and
--      requires confirming bookings has a tour_id (or equivalent) FK to tours
--      before that code can join to tours.duration_days. NOT YET VERIFIED.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 3.1 tour_guide_accounts
-- ----------------------------------------------------------------------------
create table tour_guide_accounts (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  source text not null check (source in ('package', 'purchased', 'trial')),
  booking_id uuid references bookings(id),                 -- only set when source = 'package'
  phone_or_whatsapp text,                                   -- only set when source in ('purchased','trial')
  created_by_admin_id uuid references auth.users(id),       -- CHANGED from admin_users(id): no such table exists;
                                                              -- admin identity comes from Supabase Auth. Null only
                                                              -- for auto-issued 'package' accounts.
  total_hours_allocated numeric(6,2) not null,
  status text not null default 'active' check (status in ('active', 'capped', 'disabled')),
  created_at timestamptz not null default now()
);

create index idx_tour_guide_accounts_booking_id on tour_guide_accounts(booking_id);
create index idx_tour_guide_accounts_source on tour_guide_accounts(source);

-- ----------------------------------------------------------------------------
-- 3.2 tour_guide_usage (one row per account, lifetime — not per day)
-- ----------------------------------------------------------------------------
create table tour_guide_usage (
  account_id uuid primary key references tour_guide_accounts(id),
  total_cost_usd numeric(8,4) not null default 0,
  feature_breakdown jsonb not null default '{}',
  live_session_seconds int not null default 0,   -- resets per session, not lifetime
  status text not null default 'active' check (status in ('active', 'warned', 'capped')),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at_tour_guide_usage
  before update on tour_guide_usage
  for each row execute function update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 3.3 tour_guide_trial_usage (kept separate from tour_guide_usage on purpose —
-- time-based trial cap must not tangle with cost-based logic elsewhere)
-- ----------------------------------------------------------------------------
create table tour_guide_trial_usage (
  account_id uuid primary key references tour_guide_accounts(id),
  seconds_used int not null default 0,
  status text not null default 'active' check (status in ('active', 'exhausted')),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at_tour_guide_trial_usage
  before update on tour_guide_trial_usage
  for each row execute function update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 3.4 feature_cost_config
-- ----------------------------------------------------------------------------
create table feature_cost_config (
  feature text primary key,
  cost_model jsonb not null,
  updated_at timestamptz not null default now()
);

create trigger set_updated_at_feature_cost_config
  before update on feature_cost_config
  for each row execute function update_updated_at_column();

-- ============================================================================
-- RLS — follows the EXISTING project convention (auth.role() = 'authenticated'
-- for admin access), NOT a user-scoped auth.uid() pattern. Rationale:
-- tour_guide_accounts customers authenticate via a custom username/password
-- against this table, not via Supabase Auth — auth.uid() would be null for
-- them. All customer-facing reads/writes must go through API routes using the
-- service role key (which bypasses RLS entirely); no anon/public policy is
-- granted on any of these four tables.
-- ============================================================================

alter table tour_guide_accounts enable row level security;
alter table tour_guide_usage enable row level security;
alter table tour_guide_trial_usage enable row level security;
alter table feature_cost_config enable row level security;

create policy "Admin full access - tour_guide_accounts"
  on tour_guide_accounts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access - tour_guide_usage"
  on tour_guide_usage for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access - tour_guide_trial_usage"
  on tour_guide_trial_usage for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access - feature_cost_config"
  on feature_cost_config for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- No anon/public policies on any table above — intentional. Customer-facing
-- reads/writes (login, balance check, usage increment) happen exclusively via
-- server-side API routes using the Supabase service role key.
