-- ============================================================================
-- Migration: 20260813_add_tour_days_to_bookings.sql
--
-- Resolves open item: bookings has no link to tours (no tour_id, no duration
-- column — confirmed by investigation). tour_days is added directly to
-- bookings as a nullable column, populated manually by admin at booking
-- confirmation time for tour_type = 'tour' bookings only.
--
-- Nullable (not NOT NULL) so this migration does not fail against existing
-- rows. Application-layer validation (Phase 1 booking confirmation form)
-- should require it when tour_type = 'tour'.
-- ============================================================================

alter table bookings
  add column tour_days integer
  check (tour_days is null or tour_days > 0);

comment on column bookings.tour_days is
  'Number of tour days, entered by admin at booking confirmation for tour_type=''tour'' bookings. Used to auto-compute tour_guide_accounts.total_hours_allocated = tour_days * 2. NULL for non-tour bookings (flight/car/taxi) and for tour bookings not yet confirmed with this field.';
