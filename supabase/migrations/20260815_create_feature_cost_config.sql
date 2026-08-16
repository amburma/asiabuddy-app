-- ============================================================================
-- Migration: 20260815_create_feature_cost_config.sql
--
-- Creates feature_cost_config table to store per-feature cost configuration
-- as database-driven config instead of hardcoded values.
-- ============================================================================

CREATE TABLE feature_cost_config (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_key            text UNIQUE NOT NULL,
  unit_type              text NOT NULL,
  cost_hours             numeric(10,4) NOT NULL,
  tick_interval_seconds  integer,
  is_active              boolean NOT NULL DEFAULT true,
  updated_at             timestamptz NOT NULL DEFAULT now(),
  updated_by             text,
  CONSTRAINT chk_tick_interval CHECK (
    (unit_type = 'per_tick' AND tick_interval_seconds IS NOT NULL) OR
    (unit_type = 'per_request' AND tick_interval_seconds IS NULL)
  )
);

-- Seed data with initial feature costs provided by project owner
INSERT INTO feature_cost_config (feature_key, unit_type, cost_hours, tick_interval_seconds, is_active, updated_by)
VALUES
  ('text_translate',   'per_request', 0.0010, NULL, true, 'system_seed'),
  ('photo_ocr',        'per_request', 0.0020, NULL, true, 'system_seed'),
  ('voice-translate',  'per_request', 0.0030, NULL, true, 'system_seed'),
  ('live_translator',  'per_tick',    0.0185, 30,   true, 'system_seed');
