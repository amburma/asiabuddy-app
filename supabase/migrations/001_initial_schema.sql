-- Create users table
CREATE TABLE IF NOT EXISTS users (
  telegram_id BIGINT PRIMARY KEY,
  username TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create chat_histories table
CREATE TABLE IF NOT EXISTS chat_histories (
  id BIGSERIAL PRIMARY KEY,
  telegram_id BIGINT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'model')),
  message_text TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'thailand',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT fk_telegram_id FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_histories_telegram_id ON chat_histories(telegram_id);
CREATE INDEX IF NOT EXISTS idx_chat_histories_timestamp ON chat_histories(timestamp);
