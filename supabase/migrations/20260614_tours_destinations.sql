-- =============================================
-- AsiaBuddy — Tours & Destinations Schema
-- Created: June 2026
-- =============================================

-- 1. Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  images JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  country TEXT DEFAULT 'thailand',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tours Table
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  price_from NUMERIC(10,2),
  currency TEXT DEFAULT 'USD',
  duration_days INTEGER,
  duration_nights INTEGER,
  group_size_max INTEGER,
  images JSONB DEFAULT '[]',
  highlights JSONB DEFAULT '[]',
  inclusions JSONB DEFAULT '[]',
  exclusions JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  salesperson_id TEXT,
  country TEXT DEFAULT 'thailand',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Itineraries Table
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  highlights JSONB DEFAULT '[]',
  meals_included JSONB DEFAULT '[]',
  accommodation TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RLS Policies
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public can read tours" ON tours FOR SELECT USING (true);
CREATE POLICY "Public can read itineraries" ON itineraries FOR SELECT USING (true);

-- Authenticated write access (admin panel)
CREATE POLICY "Auth users can insert destinations" ON destinations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update destinations" ON destinations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can insert tours" ON tours FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update tours" ON tours FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can insert itineraries" ON itineraries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update itineraries" ON itineraries FOR UPDATE USING (auth.role() = 'authenticated');

-- 5. Indexes
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);
CREATE INDEX IF NOT EXISTS idx_tours_featured ON tours(featured);
CREATE INDEX IF NOT EXISTS idx_tours_destination ON tours(destination_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_tour ON itineraries(tour_id);
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON destinations(slug);
