-- Add content fields to destinations table
ALTER TABLE destinations 
ADD COLUMN IF NOT EXISTS must_visit JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS dining JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS activities JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS hidden_gems JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS other_experiences JSONB DEFAULT '[]';
