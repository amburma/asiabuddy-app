-- Migration: document_car_rental_kb_rates
-- Created: 2026-09-03
--
-- IMPORTANT CONTEXT: The car_rental_kb_rates table already exists in
-- production. It was created directly via the Supabase SQL Editor at
-- some earlier point and was NEVER captured in a migration file until
-- now. This migration documents its current live schema for
-- disaster-recovery purposes (so it can be reconstructed from git
-- history if the Supabase project is ever lost/reset).
--
-- Schema confirmed via direct information_schema.columns +
-- pg_constraint query against the live production table on 2026-09-03.
--
-- IF NOT EXISTS makes this safe to run even though the table already
-- exists — it will not error and will not modify existing data.

CREATE TABLE IF NOT EXISTS car_rental_kb_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_from text NOT NULL,
  route_to text,
  trip_type text NOT NULL,
  vehicle_category text NOT NULL,
  pax_capacity_min integer NOT NULL,
  pax_capacity_max integer NOT NULL,
  price_thb numeric NOT NULL,
  agent_name text,
  agent_contact text,
  notes text,
  is_active boolean DEFAULT true,
  updated_by uuid REFERENCES auth.users(id),
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  duration_hours integer
);

-- NOTE: as of 2026-09-03, this table has NO CHECK constraints on
-- trip_type or vehicle_category (despite earlier working assumptions
-- that they existed), and NO UNIQUE constraint (which is why a
-- double-INSERT went silently undetected earlier this session).
-- See the separate proposed hardening migration for optional fixes —
-- NOT included here, and NOT to be run without Aung's explicit
-- separate authorization, per project policy on schema changes.
