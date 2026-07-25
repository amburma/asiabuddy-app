-- Create paid_invoices table
-- NOTE: This table was created directly in Supabase dashboard before this migration was written.
-- This migration file is for documentation/schema-drift prevention only.
-- DO NOT run this against the live database as the table already exists.

CREATE TABLE IF NOT EXISTS paid_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no TEXT NOT NULL UNIQUE,
  invoice_date TEXT NOT NULL,
  country TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_contact TEXT NOT NULL,
  customer_email TEXT,
  service_type TEXT NOT NULL CHECK (service_type IN ('tour', 'flight', 'hotel', 'airport_transfer', 'tickets_activities', 'car_rental')),
  currency TEXT NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  service_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
  vat_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  issued_by TEXT NOT NULL,
  remarks TEXT,
  details JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'issued' CHECK (status IN ('issued', 'failed')),
  sheet_status TEXT NOT NULL DEFAULT 'pending' CHECK (sheet_status IN ('pending', 'success', 'failed')),
  email_status TEXT NOT NULL DEFAULT 'pending' CHECK (email_status IN ('pending', 'success', 'failed', 'skipped')),
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_paid_invoices_invoice_no ON paid_invoices(invoice_no);
CREATE INDEX IF NOT EXISTS idx_paid_invoices_issued_by ON paid_invoices(issued_by);
CREATE INDEX IF NOT EXISTS idx_paid_invoices_invoice_date ON paid_invoices(invoice_date);
CREATE INDEX IF NOT EXISTS idx_paid_invoices_created_at ON paid_invoices(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_paid_invoices_status ON paid_invoices(status);
CREATE INDEX IF NOT EXISTS idx_paid_invoices_customer_name ON paid_invoices(customer_name);

-- Add RLS policy (allow all operations for now - adjust as needed)
CREATE POLICY "Allow all operations on paid_invoices"
ON paid_invoices FOR ALL
USING (true) WITH CHECK (true);
