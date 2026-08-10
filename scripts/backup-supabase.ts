#!/usr/bin/env tsx
/**
 * Supabase Backup Script for Cloudflare R2
 * 
 * This script performs a weekly backup of the Supabase database and uploads it to Cloudflare R2.
 * It maintains a retention policy of keeping only the last 4 backups to manage storage costs.
 * 
 * Requirements:
 * - SUPABASE_DATABASE_URL: Full PostgreSQL connection string
 * - R2_ACCOUNT_ID: Cloudflare account ID
 * - R2_ACCESS_KEY_ID: Cloudflare R2 access key ID
 * - R2_SECRET_ACCESS_KEY: Cloudflare R2 secret access key
 * - R2_BUCKET_NAME: Cloudflare R2 bucket name for backups
 * 
 * Usage:
 *   npx tsx scripts/backup-supabase.ts
 */

import { execSync } from 'child_process';
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const BACKUP_FILENAME = `supabase-backup-${new Date().toISOString().split('T')[0]}.sql`;
const BACKUP_FILE_PATH = path.join(process.cwd(), BACKUP_FILENAME);
const MAX_BACKUPS = 4;

// Validate required environment variables
const requiredEnvVars = [
  'SUPABASE_DATABASE_URL',
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET_NAME'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} environment variable is not set`);
    process.exit(1);
  }
}

// Initialize Cloudflare R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/**
 * Perform database backup using pg_dump
 */
async function performBackup(): Promise<void> {
  console.log('Starting Supabase database backup...');
  
  try {
    // Use pg_dump to create a backup
    // --no-owner and --no-acl to avoid permission issues on restore
    // --format=plain for SQL text output
    const command = `pg_dump "${process.env.SUPABASE_DATABASE_URL}" --no-owner --no-acl --format=plain > "${BACKUP_FILE_PATH}"`;
    
    execSync(command, { stdio: 'inherit' });
    
    const fileSize = fs.statSync(BACKUP_FILE_PATH).size;
    console.log(`Backup completed successfully. File size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  }
}

/**
 * Upload backup file to Cloudflare R2
 */
async function uploadToR2(): Promise<void> {
  console.log('Uploading backup to Cloudflare R2...');
  
  try {
    const fileContent = fs.readFileSync(BACKUP_FILE_PATH);
    
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: BACKUP_FILENAME,
      Body: fileContent,
      ContentType: 'application/sql',
    });
    
    await r2Client.send(command);
    console.log(`Backup uploaded successfully: ${BACKUP_FILENAME}`);
  } catch (error) {
    console.error('Upload to R2 failed:', error);
    throw error;
  }
}

/**
 * Clean up local backup file
 */
function cleanupLocalFile(): void {
  try {
    if (fs.existsSync(BACKUP_FILE_PATH)) {
      fs.unlinkSync(BACKUP_FILE_PATH);
      console.log('Local backup file cleaned up');
    }
  } catch (error) {
    console.error('Error cleaning up local file:', error);
  }
}

/**
 * List existing backups in R2
 */
async function listExistingBackups(): Promise<string[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: 'supabase-backup-',
    });
    
    const response = await r2Client.send(command);
    const backups = response.Contents
      ?.filter(obj => obj.Key && obj.Key.startsWith('supabase-backup-'))
      .map(obj => obj.Key!)
      .sort() || [];
      
    return backups;
  } catch (error) {
    console.error('Error listing existing backups:', error);
    return [];
  }
}

/**
 * Delete old backups exceeding retention policy
 */
async function cleanupOldBackups(existingBackups: string[]): Promise<void> {
  if (existingBackups.length <= MAX_BACKUPS) {
    console.log('No old backups to clean up');
    return;
  }
  
  const backupsToDelete = existingBackups.slice(0, existingBackups.length - MAX_BACKUPS);
  console.log(`Cleaning up ${backupsToDelete.length} old backup(s)...`);
  
  for (const backupKey of backupsToDelete) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: backupKey,
      });
      
      await r2Client.send(command);
      console.log(`Deleted old backup: ${backupKey}`);
    } catch (error) {
      console.error(`Error deleting backup ${backupKey}:`, error);
    }
  }
}

/**
 * Verify database connectivity before backup
 */
async function verifyDatabaseConnection(): Promise<void> {
  console.log('Verifying Supabase database connection...');
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Warning: Supabase URL/Anon key not set, skipping connection check');
      return;
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from('transfer_links').select('id').limit(1);
    
    if (error) {
      console.warn('Warning: Database connection check failed, but proceeding with backup:', error.message);
    } else {
      console.log('Database connection verified');
    }
  } catch (error) {
    console.warn('Warning: Database connection check failed, but proceeding with backup:', error);
  }
}

/**
 * Main backup workflow
 */
async function main(): Promise<void> {
  console.log('=== Supabase Backup to Cloudflare R2 ===');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Retention policy: Keep last ${MAX_BACKUPS} backups`);
  console.log('');
  
  try {
    // Verify database connection
    await verifyDatabaseConnection();
    
    // Perform backup
    await performBackup();
    
    // Upload to R2
    await uploadToR2();
    
    // Clean up local file
    cleanupLocalFile();
    
    // Manage retention
    const existingBackups = await listExistingBackups();
    console.log(`Current backups in R2: ${existingBackups.length}`);
    await cleanupOldBackups(existingBackups);
    
    console.log('');
    console.log('=== Backup completed successfully ===');
  } catch (error) {
    console.error('');
    console.error('=== Backup failed ===');
    console.error('Error:', error);
    
    // Clean up local file if backup failed
    cleanupLocalFile();
    
    process.exit(1);
  }
}

// Run the backup
main();