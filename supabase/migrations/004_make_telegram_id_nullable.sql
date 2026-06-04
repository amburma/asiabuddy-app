-- Make telegram_id nullable to support web inquiries
ALTER TABLE bookings ALTER COLUMN telegram_id DROP NOT NULL;

-- Add columns for web inquiry contact information
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'telegram' CHECK (source IN ('telegram', 'web'));

-- Update foreign key constraint to be nullable
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS fk_telegram_id;
ALTER TABLE bookings ADD CONSTRAINT fk_telegram_id 
  FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE;
