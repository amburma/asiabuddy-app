# Supabase Backup Setup Guide

This guide walks you through setting up automated weekly backups of your Supabase database to Cloudflare R2, ensuring your data is protected even on the free tier.

## Overview

The backup system consists of:
- **Backup Script**: `scripts/backup-supabase.ts` - Performs pg_dump and uploads to R2
- **GitHub Actions**: `.github/workflows/weekly-backup.yml` - Runs weekly via cron
- **Retention Policy**: Keeps only the last 4 backups to manage storage costs

## Prerequisites

1. **Cloudflare R2 Account**: Create a free Cloudflare account and enable R2
2. **GitHub Repository**: Your project must be on GitHub for Actions
3. **Supabase Database**: Your existing Supabase project

## Step 1: Set Up Cloudflare R2

### 1.1 Create R2 Bucket

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2** → **Overview**
3. Click **Create bucket**
4. Choose a bucket name (e.g., `asiabuddy-backups`)
5. Select a location (choose closest to your users)
6. Click **Create bucket**

### 1.2 Create R2 API Token

1. In Cloudflare Dashboard, go to **R2** → **Overview**
2. Click **Manage R2 API Tokens**
3. Click **Create API Token**
4. Use these settings:
   - **Permissions**: `Object Read & Write`
   - **TTL**: Choose appropriate expiration (or "Never" for permanent)
5. Click **Create API Token**
6. **IMPORTANT**: Save the following information:
   - **Access Key ID** (store as GitHub Secret `R2_ACCESS_KEY_ID`)
   - **Secret Access Key** (store as GitHub Secret `R2_SECRET_ACCESS_KEY`)
   - **Account ID** (visible in URL or dashboard, store as `R2_ACCOUNT_ID`)

### 1.3 Note Your Bucket Name

The bucket name you created (e.g., `asiabuddy-backups`) will be stored as GitHub Secret `R2_BUCKET_NAME`.

## Step 2: Get Supabase Database Connection String

### 2.1 Find Your Database URL

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Settings** → **Database**
4. Find **Connection string** → **URI**
5. Copy the connection string in this format:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### 2.2 Test the Connection (Optional)

You can test the connection string locally:
```bash
# Install PostgreSQL client if needed
# On Ubuntu/Debian: sudo apt-get install postgresql-client
# On macOS: brew install postgresql

# Test connection
pg_dump "postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" --schema-only > test.sql
```

## Step 3: Configure GitHub Secrets

Add the following secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each:

### Required Secrets

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SUPABASE_DATABASE_URL` | Full PostgreSQL connection string | `postgresql://postgres:***@db.abc.supabase.co:5432/postgres` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://abc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `R2_ACCOUNT_ID` | Cloudflare account ID | `1234567890abcdef` |
| `R2_ACCESS_KEY_ID` | R2 access key ID | `abc123def456` |
| `R2_SECRET_ACCESS_KEY` | R2 secret access key | `xyz789uvw012` |
| `R2_BUCKET_NAME` | R2 bucket name | `asiabuddy-backups` |

## Step 4: Install Dependencies

The backup script requires the AWS SDK for S3 (compatible with R2). Install it:

```bash
npm install @aws-sdk/client-s3
```

This dependency has already been added to `package.json` in this implementation.

## Step 5: Test the Backup Locally

Before relying on the automated schedule, test the backup script locally:

1. Set the required environment variables locally:
   ```bash
   export SUPABASE_DATABASE_URL="postgresql://postgres:***@db.abc.supabase.co:5432/postgres"
   export NEXT_PUBLIC_SUPABASE_URL="https://abc.supabase.co"
   export NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   export R2_ACCOUNT_ID="your-account-id"
   export R2_ACCESS_KEY_ID="your-access-key-id"
   export R2_SECRET_ACCESS_KEY="your-secret-access-key"
   export R2_BUCKET_NAME="asiabuddy-backups"
   ```

2. Run the backup script:
   ```bash
   npm run backup
   ```

3. Verify the backup:
   - Check that the script completes without errors
   - Log in to Cloudflare R2 and verify the backup file appears
   - The file should be named: `supabase-backup-YYYY-MM-DD.sql`

## Step 6: Enable GitHub Actions

1. Commit the changes to your repository:
   ```bash
   git add scripts/backup-supabase.ts .github/workflows/weekly-backup.yml package.json
   git commit -m "Add automated Supabase backup to Cloudflare R2"
   git push
   ```

2. The GitHub Actions workflow will automatically run:
   - **Schedule**: Every Monday at 00:00 UTC
   - **Manual**: You can also trigger it manually from the Actions tab

3. Monitor the first run:
   - Go to **Actions** tab in your GitHub repository
   - Click on the "Weekly Supabase Backup" workflow
   - Verify the workflow completes successfully

## Step 7: Verify Retention Policy

The backup script automatically manages retention by keeping only the last 4 backups. You can verify this:

1. After several weeks, check your R2 bucket
2. You should see only the 4 most recent backups
3. Older backups are automatically deleted

## Manual Backup Execution

If you need to run a backup outside the schedule:

### Via GitHub Actions
1. Go to **Actions** tab
2. Select "Weekly Supabase Backup"
3. Click **Run workflow** → **Run workflow**

### Via Local Command
```bash
npm run backup
```

## Backup Restoration

To restore from a backup:

1. Download the backup file from R2 (via Cloudflare Dashboard or CLI)
2. Restore to your Supabase database:
   ```bash
   psql "postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" < supabase-backup-YYYY-MM-DD.sql
   ```

**WARNING**: Restoration will overwrite existing data. Use with caution and consider testing on a staging environment first.

## Troubleshooting

### Error: "SUPABASE_DATABASE_URL environment variable is not set"
- Ensure all required GitHub Secrets are configured
- Check that secret names match exactly (case-sensitive)

### Error: "pg_dump: command not found"
- The GitHub Actions workflow installs PostgreSQL client automatically
- For local testing, install PostgreSQL client tools

### Error: "Access Denied" from R2
- Verify R2 credentials are correct
- Check that the API token has "Object Read & Write" permissions
- Ensure the bucket name is correct

### Error: "Connection refused" from Supabase
- Verify the database connection string is correct
- Check that Supabase project is not paused
- Ensure your IP is not blocked (Supabase has IP restrictions)

### Backup file too large
- Consider excluding unnecessary tables/data in the pg_dump command
- Monitor your R2 storage usage (Cloudflare R2 has generous free tier)

## Security Notes

- **Never commit** credentials to version control
- Use GitHub Secrets for all sensitive data
- Rotate R2 API tokens periodically
- Use Supabase's service role key only for trusted environments
- The backup script uses `--no-owner` and `--no-acl` to avoid permission issues

## Cost Considerations

- **Cloudflare R2**: First 10GB/month free, then $0.015/GB/month
- **GitHub Actions**: 2,000 free minutes/month for public repos, 500 for private
- **Supabase**: No additional cost for backups (you're using your own storage)

With 4 weekly backups of a typical small database, you'll likely stay within free tiers.

## Next Steps

After successful setup:
1. Monitor the first few automated backups
2. Test restoration process in a non-production environment
3. Set up alerts for backup failures (GitHub Actions can notify on failure)
4. Consider backup encryption for sensitive data
5. Document your restoration procedure for your team

## Additional Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Supabase Database Connection Strings](https://supabase.com/docs/guides/platform/connecting-to-postgres)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)