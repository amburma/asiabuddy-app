-- =============================================
-- AsiaBuddy — CRITICAL BUG FIX: Replace Kiwitaxi Marker Placeholder
-- Created: July 27, 2026
-- Purpose: Replace YOUR_KIWITAXI_MARKER placeholder with actual Travelpayouts marker 746660
-- Impact: All existing transfer_links rows with Kiwitaxi URLs
-- =============================================

-- Update all transfer_links rows that still contain the placeholder marker
UPDATE transfer_links
SET booking_url = REPLACE(booking_url, 'YOUR_KIWITAXI_MARKER', '746660')
WHERE booking_url LIKE '%YOUR_KIWITAXI_MARKER%';

-- Verify the update (returns count of updated rows)
-- SELECT COUNT(*) FROM transfer_links WHERE booking_url LIKE '%746660%';
