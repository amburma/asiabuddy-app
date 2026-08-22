-- =============================================
-- AsiaBuddy — Add Tour Code to Tours Table
-- Created: August 22, 2026
-- =============================================

-- Add tour_code column to tours table
ALTER TABLE tours 
ADD COLUMN IF NOT EXISTS tour_code TEXT;
