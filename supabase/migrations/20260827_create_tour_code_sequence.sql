-- =============================================
-- AsiaBuddy — Tour Code Sequence Function
-- Created: August 27, 2026
-- Purpose: Generate sequential tour codes with race-safe counter
-- =============================================

-- Create a table to track daily tour code sequences
CREATE TABLE IF NOT EXISTS tour_code_sequences (
  date_code TEXT PRIMARY KEY,  -- Format: DDMMYY
  last_sequence INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create function to get next tour code sequence
CREATE OR REPLACE FUNCTION get_next_tour_code_sequence(date_code TEXT)
RETURNS INTEGER AS $$
DECLARE
  next_seq INTEGER;
BEGIN
  -- Lock the row for this date to prevent race conditions
  INSERT INTO tour_code_sequences (date_code, last_sequence, updated_at)
  VALUES (date_code, 0, NOW())
  ON CONFLICT (date_code) 
  DO UPDATE SET 
    last_sequence = tour_code_sequences.last_sequence + 1,
    updated_at = NOW()
  RETURNING tour_code_sequences.last_sequence
  INTO next_seq;
  
  RETURN next_seq;
END;
$$ LANGUAGE plpgsql;

-- Create function to generate complete tour code
CREATE OR REPLACE FUNCTION generate_tour_code()
RETURNS TEXT AS $$
DECLARE
  date_code TEXT;
  sequence_num INTEGER;
  sequence_str TEXT;
  tour_code TEXT;
BEGIN
  -- Generate date code (DDMMYY)
  date_code := TO_CHAR(NOW(), 'DDMMYY');
  
  -- Get next sequence number for this date
  sequence_num := get_next_tour_code_sequence(date_code);
  
  -- Format sequence as 2-digit string with leading zero
  sequence_str := LPAD(sequence_num::TEXT, 2, '0');
  
  -- Generate full tour code
  tour_code := 'ABT-TPQ-' || date_code || '-' || sequence_str;
  
  RETURN tour_code;
END;
$$ LANGUAGE plpgsql;

-- Add comment to document the function
COMMENT ON FUNCTION generate_tour_code() IS 
'Generates tour codes in ABT-TPQ-DDMMYY-NN format with race-safe sequential counter per date';
