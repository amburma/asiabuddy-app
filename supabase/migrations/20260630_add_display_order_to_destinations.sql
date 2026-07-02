-- Add display_order column to destinations table for reordering functionality
ALTER TABLE destinations 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Update existing destinations to have sequential display_order values
-- This sets display_order based on the current order of destinations by name
WITH numbered_destinations AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY name ASC) - 1 as row_num
  FROM destinations
)
UPDATE destinations
SET display_order = numbered_destinations.row_num
FROM numbered_destinations
WHERE destinations.id = numbered_destinations.id;

-- Create index for better query performance on display_order
CREATE INDEX IF NOT EXISTS idx_destinations_display_order ON destinations(display_order);
