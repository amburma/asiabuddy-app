-- =============================================
-- AsiaBuddy — Seed Transport Ticket Routes for Thailand
-- Created: August 5, 2026
-- Purpose: Seed initial popular transport routes for Thailand
-- =============================================

INSERT INTO transport_ticket_routes (country, origin_slug, origin_display, destination_slug, destination_display, display_order, is_active) VALUES
('thailand', 'bangkok', 'Bangkok', 'phuket', 'Phuket', 1, true),
('thailand', 'phuket', 'Phuket', 'bangkok', 'Bangkok', 2, true),
('thailand', 'bangkok', 'Bangkok', 'chiang-mai', 'Chiang Mai', 3, true),
('thailand', 'chiang-mai', 'Chiang Mai', 'bangkok', 'Bangkok', 4, true),
('thailand', 'bangkok', 'Bangkok', 'pattaya', 'Pattaya', 5, true),
('thailand', 'pattaya', 'Pattaya', 'bangkok', 'Bangkok', 6, true),
('thailand', 'bangkok', 'Bangkok', 'krabi', 'Krabi', 7, true),
('thailand', 'krabi', 'Krabi', 'bangkok', 'Bangkok', 8, true),
('thailand', 'bangkok', 'Bangkok', 'koh-samui', 'Koh Samui', 9, true),
('thailand', 'koh-samui', 'Koh Samui', 'bangkok', 'Bangkok', 10, true)
ON CONFLICT DO NOTHING;
