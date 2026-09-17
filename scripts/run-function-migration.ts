#!/usr/bin/env tsx
/**
 * Direct SQL execution for function migrations
 * Usage: npx tsx scripts/run-function-migration.ts <sql-file>
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

const sqlFile = process.argv[2];
if (!sqlFile) {
  console.error('Usage: npx tsx scripts/run-function-migration.ts <sql-file>');
  process.exit(1);
}

const sqlPath = path.join(process.cwd(), sqlFile);
if (!fs.existsSync(sqlPath)) {
  console.error(`Error: SQL file not found: ${sqlPath}`);
  process.exit(1);
}

async function runMigration() {
  console.log(`Running SQL migration: ${sqlFile}`);
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Use the PostgreSQL client directly via a connection string
    // We'll use pg_dump style direct connection
    const { Client } = require('pg');
    
    // Parse connection string from SUPABASE_URL
    const dbUrl = process.env.SUPABASE_DATABASE_URL || 
                   `postgresql://postgres:${supabaseServiceKey}@${supabaseUrl.replace('https://', '').replace('http://', '')}:5432/postgres`;
    
    const client = new Client({ connectionString: dbUrl });
    
    await client.connect();
    console.log('Connected to database');
    
    await client.query(sql);
    console.log('SQL executed successfully');
    
    await client.end();
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
