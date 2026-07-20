-- =============================================
-- AsiaBuddy — Kiwitaxi Transfer Links Seed Data
-- Created: July 18, 2026
-- Purpose: Populate transfer_links with real Kiwitaxi deep-links
-- =============================================

-- Note: Replace YOUR_KIWITAXI_MARKER with your actual Travelpayouts affiliate marker
-- Format: https://kiwitaxi.com/en?marker=YOUR_MARKER
-- Example: https://kiwitaxi.com/en?marker=12345

INSERT INTO transfer_links (city, route_name, provider, booking_url, price_from, transport_type, image_url, is_placeholder) VALUES
-- Bangkok Airport Transfers
('bangkok', 'Suvarnabhumi Airport to Bangkok City Center', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=airport&to=bangkok', '$25', 'sedan', NULL, false),
('bangkok', 'Suvarnabhumi Airport to Bangkok City Center', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=airport&to=bangkok&type=van', '$45', 'van', NULL, false),
('bangkok', 'Don Mueang Airport to Bangkok City Center', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=dmk&to=bangkok', '$20', 'sedan', NULL, false),
('bangkok', 'Don Mueang Airport to Bangkok City Center', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=dmk&to=bangkok&type=van', '$40', 'van', NULL, false),

-- Bangkok Hotel Transfers
('bangkok', 'Bangkok City Center to Suvarnabhumi Airport', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=bangkok&to=airport', '$25', 'sedan', NULL, false),
('bangkok', 'Bangkok City Center to Suvarnabhumi Airport', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=bangkok&to=airport&type=van', '$45', 'van', NULL, false),
('bangkok', 'Bangkok City Center to Don Mueang Airport', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=bangkok&to=dmk', '$20', 'sedan', NULL, false),

-- Bangkok Inter-City Transfers
('bangkok', 'Bangkok to Pattaya', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=bangkok&to=pattaya', '$55', 'sedan', NULL, false),
('bangkok', 'Bangkok to Pattaya', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=bangkok&to=pattaya&type=van', '$85', 'van', NULL, false),
('bangkok', 'Bangkok to Hua Hin', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=bangkok&to=huahin', '$75', 'sedan', NULL, false),
('bangkok', 'Bangkok to Ayutthaya', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=bangkok&to=ayutthaya', '$45', 'sedan', NULL, false),

-- Phuket Transfers (for future expansion)
('phuket', 'Phuket Airport to Patong Beach', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=hkt&to=patong', '$30', 'sedan', NULL, false),
('phuket', 'Phuket Airport to Patong Beach', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=hkt&to=patong&type=van', '$50', 'van', NULL, false),
('phuket', 'Phuket Airport to Karon Beach', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=hkt&to=karon', '$35', 'sedan', NULL, false),
('phuket', 'Phuket Airport to Kamala Beach', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=hkt&to=kamala', '$40', 'sedan', NULL, false),

-- Chiang Mai Transfers (for future expansion)
('chiang-mai', 'Chiang Mai Airport to City Center', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=cnx&to=city', '$20', 'sedan', NULL, false),
('chiang-mai', 'Chiang Mai Airport to Old City', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=cnx&to=oldcity', '$25', 'sedan', NULL, false),
('chiang-mai', 'Chiang Mai to Chiang Rai', 'kiwitaxi', 'https://kiwitaxi.com/en?marker=YOUR_KIWITAXI_MARKER&from=cnx&to=cei', '$120', 'sedan', NULL, false);
