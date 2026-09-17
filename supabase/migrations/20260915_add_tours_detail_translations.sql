-- Add consolidated JSONB translation columns to tours table for detail page content
-- Each column holds a JSON object with translated description, highlights, inclusions, exclusions
-- Languages: MM (Myanmar), TH (Thai), DE (German), FR (French), ES (Spanish)
-- The existing description, highlights, inclusions, exclusions columns serve as English content

ALTER TABLE tours
ADD COLUMN IF NOT EXISTS translations_mm JSONB,
ADD COLUMN IF NOT EXISTS translations_th JSONB,
ADD COLUMN IF NOT EXISTS translations_de JSONB,
ADD COLUMN IF NOT EXISTS translations_fr JSONB,
ADD COLUMN IF NOT EXISTS translations_es JSONB;

-- Add comments to document the multilingual structure
COMMENT ON COLUMN tours.translations_mm IS 'Myanmar (Burmese) translations: {description, highlights[], inclusions[], exclusions[]}';
COMMENT ON COLUMN tours.translations_th IS 'Thai translations: {description, highlights[], inclusions[], exclusions[]}';
COMMENT ON COLUMN tours.translations_de IS 'German translations: {description, highlights[], inclusions[], exclusions[]}';
COMMENT ON COLUMN tours.translations_fr IS 'French translations: {description, highlights[], inclusions[], exclusions[]}';
COMMENT ON COLUMN tours.translations_es IS 'Spanish translations: {description, highlights[], inclusions[], exclusions[]}';
