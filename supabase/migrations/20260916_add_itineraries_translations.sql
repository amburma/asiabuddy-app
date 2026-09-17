-- Add consolidated JSONB translation columns to itineraries table for daily content
-- Each column holds a JSON object with translated title, content, highlights, meals_included, accommodation
-- Languages: MM (Myanmar), TH (Thai), DE (German), FR (French), ES (Spanish)
-- The existing title, content, highlights, meals_included, accommodation columns serve as English content

ALTER TABLE itineraries
ADD COLUMN IF NOT EXISTS translations_mm JSONB,
ADD COLUMN IF NOT EXISTS translations_th JSONB,
ADD COLUMN IF NOT EXISTS translations_de JSONB,
ADD COLUMN IF NOT EXISTS translations_fr JSONB,
ADD COLUMN IF NOT EXISTS translations_es JSONB;

-- Add comments to document the multilingual structure
COMMENT ON COLUMN itineraries.translations_mm IS 'Myanmar (Burmese) translations: {title, content, highlights[], meals_included[], accommodation}';
COMMENT ON COLUMN itineraries.translations_th IS 'Thai translations: {title, content, highlights[], meals_included[], accommodation}';
COMMENT ON COLUMN itineraries.translations_de IS 'German translations: {title, content, highlights[], meals_included[], accommodation}';
COMMENT ON COLUMN itineraries.translations_fr IS 'French translations: {title, content, highlights[], meals_included[], accommodation}';
COMMENT ON COLUMN itineraries.translations_es IS 'Spanish translations: {title, content, highlights[], meals_included[], accommodation}';
