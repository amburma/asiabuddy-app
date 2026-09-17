#!/usr/bin/env tsx
/**
 * Simple migration runner for Supabase
 * Usage: npx tsx scripts/run-migration.ts <migration-file>
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables must be set');
  process.exit(1);
}

const migrationFile = process.argv[2];
if (!migrationFile) {
  console.error('Usage: npx tsx scripts/run-migration.ts <migration-file>');
  process.exit(1);
}

const migrationPath = path.join(process.cwd(), migrationFile);
if (!fs.existsSync(migrationPath)) {
  console.error(`Error: Migration file not found: ${migrationPath}`);
  process.exit(1);
}

async function runMigration() {
  console.log(`Running migration: ${migrationFile}`);
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Execute the SQL using supabase.rpc with a raw SQL query
    const { data, error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
