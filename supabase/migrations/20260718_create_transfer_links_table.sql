-- =============================================
-- AsiaBuddy — Transfer Links Schema
-- Created: July 18, 2026
-- Purpose: Store affiliate deep-link data for transfer services
-- =============================================

CREATE TABLE IF NOT EXISTS transfer_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  route_name TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'kiwitaxi',
  booking_url TEXT NOT NULL,
  price_from TEXT,
  transport_type TEXT,
  image_url TEXT,
  is_placeholder BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE transfer_links ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read transfer_links" ON transfer_links FOR SELECT USING (true);

-- Authenticated write access (admin panel)
CREATE POLICY "Auth users can insert transfer_links" ON transfer_links FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update transfer_links" ON transfer_links FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can delete transfer_links" ON transfer_links FOR DELETE USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_transfer_links_city ON transfer_links(city);
CREATE INDEX IF NOT EXISTS idx_transfer_links_provider ON transfer_links(provider);
CREATE INDEX IF NOT EXISTS idx_transfer_links_is_placeholder ON transfer_links(is_placeholder);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_transfer_links_updated_at BEFORE UPDATE ON transfer_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
