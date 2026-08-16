-- ============================================================================
-- Migration: 20260814_migrate_voice_qa_to_voice_translate.sql
--
-- PURPOSE: Rename legacy 'voice-qa' feature key to 'voice-translate' in
-- tour_guide_usage.feature_breakdown JSONB column.
--
-- CONTEXT: The Tour Guide "Voice" feature was renamed from 'voice-qa' to
-- 'voice-translate' in commit ec6ec95a. This migration updates any existing
-- usage history rows that still reference the old feature key.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1: Check how many rows currently have 'voice-qa' in feature_breakdown
-- Run this SELECT query manually in Supabase SQL editor before proceeding
-- with the UPDATE to verify the count.
-- ----------------------------------------------------------------------------
-- SELECT COUNT(*)
-- FROM tour_guide_usage
-- WHERE feature_breakdown ? 'voice-qa';

-- ----------------------------------------------------------------------------
-- STEP 2: Update 'voice-qa' keys to 'voice-translate' in feature_breakdown
-- This renames the JSON key while preserving the associated cost value.
-- ----------------------------------------------------------------------------
UPDATE tour_guide_usage
SET feature_breakdown = feature_breakdown - 'voice-qa' || jsonb_build_object('voice-translate', feature_breakdown->'voice-qa'),
    updated_at = now()
WHERE feature_breakdown ? 'voice-qa';
