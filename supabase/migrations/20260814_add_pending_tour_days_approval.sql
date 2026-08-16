-- ============================================================================
-- Migration: 20260814_add_pending_tour_days_approval.sql
--
-- PURPOSE: Add persistent state for tour_days approval workflow
--
-- CONTEXT: The Telegram bot approval flow for tour bookings needs to capture
-- tour_days input from operators. This column provides persistent state
-- (instead of in-memory state) to track which bookings are awaiting tour_days
-- input, which is necessary for Vercel serverless function environments.
-- ============================================================================

alter table bookings
  add column pending_tour_days_approval boolean default false;

comment on column bookings.pending_tour_days_approval is
  'Flag indicating whether a tour booking is awaiting tour_days input from the operator during the approval workflow. Used to enable persistent state across serverless function invocations.';
