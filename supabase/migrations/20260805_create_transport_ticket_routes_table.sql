-- =============================================
-- AsiaBuddy — Transport Ticket Routes Schema
-- Created: August 5, 2026
-- Purpose: Store popular transport routes for 12Go affiliate links
-- =============================================

CREATE TABLE IF NOT EXISTS transport_ticket_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL,
  origin_slug TEXT NOT NULL,
  origin_display TEXT NOT NULL,
  destination_slug TEXT NOT NULL,
  destination_display TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE transport_ticket_routes ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read transport_ticket_routes" ON transport_ticket_routes FOR SELECT USING (true);

-- Authenticated write access (admin panel)
CREATE POLICY "Auth users can insert transport_ticket_routes" ON transport_ticket_routes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update transport_ticket_routes" ON transport_ticket_routes FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can delete transport_ticket_routes" ON transport_ticket_routes FOR DELETE USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_transport_ticket_routes_country ON transport_ticket_routes(country);
CREATE INDEX IF NOT EXISTS idx_transport_ticket_routes_is_active ON transport_ticket_routes(is_active);
CREATE INDEX IF NOT EXISTS idx_transport_ticket_routes_display_order ON transport_ticket_routes(display_order);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_transport_ticket_routes_updated_at BEFORE UPDATE ON transport_ticket_routes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
