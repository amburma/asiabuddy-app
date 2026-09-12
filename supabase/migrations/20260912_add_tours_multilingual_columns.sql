-- Add multilingual columns to tours table for title and short_description
-- Following the same naming convention as destinations table: fieldname_${lang}
-- Languages: MM (Myanmar), TH (Thai), DE (German), FR (French), ES (Spanish)
-- The existing title and short_description columns serve as English content

ALTER TABLE tours
ADD COLUMN IF NOT EXISTS title_mm TEXT,
ADD COLUMN IF NOT EXISTS title_th TEXT,
ADD COLUMN IF NOT EXISTS title_de TEXT,
ADD COLUMN IF NOT EXISTS title_fr TEXT,
ADD COLUMN IF NOT EXISTS title_es TEXT,
ADD COLUMN IF NOT EXISTS short_description_mm TEXT,
ADD COLUMN IF NOT EXISTS short_description_th TEXT,
ADD COLUMN IF NOT EXISTS short_description_de TEXT,
ADD COLUMN IF NOT EXISTS short_description_fr TEXT,
ADD COLUMN IF NOT EXISTS short_description_es TEXT;

-- Add comment to document the multilingual structure
COMMENT ON COLUMN tours.title_mm IS 'Myanmar (Burmese) translation of tour title';
COMMENT ON COLUMN tours.title_th IS 'Thai translation of tour title';
COMMENT ON COLUMN tours.title_de IS 'German translation of tour title';
COMMENT ON COLUMN tours.title_fr IS 'French translation of tour title';
COMMENT ON COLUMN tours.title_es IS 'Spanish translation of tour title';
COMMENT ON COLUMN tours.short_description_mm IS 'Myanmar (Burmese) translation of tour short description';
COMMENT ON COLUMN tours.short_description_th IS 'Thai translation of tour short description';
COMMENT ON COLUMN tours.short_description_de IS 'German translation of tour short description';
COMMENT ON COLUMN tours.short_description_fr IS 'French translation of tour short description';
COMMENT ON COLUMN tours.short_description_es IS 'Spanish translation of tour short description';
