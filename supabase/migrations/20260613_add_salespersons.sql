-- Migration: Add salespersons table and link to chat_histories & bookings
-- Date: 2026-06-13

-- 1. salespersons table အသစ် ဖန်တီး
CREATE TABLE IF NOT EXISTS salespersons (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  display_name  TEXT NOT NULL,
  avatar_url    TEXT,
  telegram_id   TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RLS enable + policy
ALTER TABLE salespersons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on salespersons"
ON salespersons FOR ALL
USING (true) WITH CHECK (true);

-- 3. chat_histories တွင် salesperson_id column တိုး
ALTER TABLE chat_histories
ADD COLUMN IF NOT EXISTS salesperson_id TEXT REFERENCES salespersons(id);

-- 4. bookings တွင် salesperson_id column တိုး
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS salesperson_id TEXT REFERENCES salespersons(id);

-- 5. Test data — kyaw-kyaw salesperson (dev/test အတွက်သာ)
INSERT INTO salespersons (id, name, display_name, avatar_url, telegram_id)
VALUES (
  'kyaw-kyaw',
  'kyaw-kyaw',
  'ကျော်ကျော်',
  '',
  'REPLACE_WITH_REAL_TELEGRAM_ID'
) ON CONFLICT (id) DO NOTHING;
