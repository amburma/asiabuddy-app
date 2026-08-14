-- =============================================
-- Landmark Photo Library Migration
-- Created: August 10, 2026
-- =============================================

-- 1. Create landmarks table
CREATE TABLE IF NOT EXISTS landmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  alt_text TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  image_storage_path TEXT NOT NULL,
  country TEXT DEFAULT 'thailand',
  city TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add landmark_id foreign key to itineraries (preserves existing image_url as fallback)
ALTER TABLE itineraries 
ADD COLUMN IF NOT EXISTS landmark_id UUID REFERENCES landmarks(id) ON DELETE SET NULL;

-- 3. Create indexes for efficient search
CREATE INDEX IF NOT EXISTS idx_landmarks_slug ON landmarks(slug);
CREATE INDEX IF NOT EXISTS idx_landmarks_name ON landmarks(name);
CREATE INDEX IF NOT EXISTS idx_landmarks_country ON landmarks(country);
CREATE INDEX IF NOT EXISTS idx_landmarks_city ON landmarks(city);
CREATE INDEX IF NOT EXISTS idx_itineraries_landmark ON itineraries(landmark_id);

-- 4. Enable RLS
ALTER TABLE landmarks ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
CREATE POLICY "Public can read landmarks" ON landmarks FOR SELECT USING (true);
CREATE POLICY "Auth users can insert landmarks" ON landmarks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update landmarks" ON landmarks FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can delete landmarks" ON landmarks FOR DELETE USING (auth.role() = 'authenticated');

-- 6. Function to auto-generate slug from name
CREATE OR REPLACE FUNCTION generate_landmark_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(NEW.name, '[^a-zA-Z0-9\s-]', '', 'g'));
    NEW.slug := regexp_replace(NEW.slug, '\s+', '-', 'g');
    NEW.slug := regexp_replace(NEW.slug, '-+', '-', 'g');
    NEW.slug := trim(both '-' from NEW.slug);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger to auto-generate slug
CREATE TRIGGER before_landmark_insert_or_update
  BEFORE INSERT OR UPDATE ON landmarks
  FOR EACH ROW
  EXECUTE FUNCTION generate_landmark_slug();

-- 8. Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_landmark_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Trigger for updated_at
CREATE TRIGGER before_landmark_update
  BEFORE UPDATE ON landmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_landmark_updated_at();
