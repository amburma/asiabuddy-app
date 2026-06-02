# Google Drive API Integration Setup Guide

This guide walks you through setting up a Google Service Account to access your Thailand Pricing folder structure and integrate it with the AsiaBuddy bot.

## Prerequisites

- Google Cloud Project with Google Drive API and Google Sheets API enabled
- Access to your Thailand Google Drive folder structure
- The Pricing folder should contain 6 Google Sheets with pricing data

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Google Drive API
   - Google Sheets API

## Step 2: Create Service Account

1. In Google Cloud Console, navigate to:
   - **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Enter service account details:
   - Name: `asiabuddy-bot`
   - Description: `AsiaBuddy Telegram Bot Service Account`
4. Click **Create and Continue**
5. Skip adding roles for now (we'll add permissions directly in Google Drive)
6. Click **Done**

## Step 3: Generate Service Account Key

1. Click on the newly created service account
2. Go to the **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Select **JSON** format
5. Click **Create**
6. **IMPORTANT**: Download and securely store the JSON file. You'll need this for the next step.

## Step 4: Share Google Drive Folder with Service Account

1. Open your Google Drive and locate the **Thailand** folder
2. Right-click the Thailand folder → **Share**
3. Add the service account email (from the JSON file, field: `client_email`)
4. Grant **Editor** or **Viewer** permissions
5. Click **Send** (or just Share)
6. Repeat for the **Pricing** subfolder if it has separate sharing settings

## Step 5: Configure Environment Variables

Add the following to your `.env.local` file:

```bash
# Google Service Account JSON (entire JSON file as a string)
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"...","client_email":"asiabuddy-bot@your-project-id.iam.gserviceaccount.com","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'

# Google Drive Folder ID for Thailand (optional - can auto-detect)
GOOGLE_DRIVE_FOLDER_ID_THAILAND='your-thailand-folder-id'

# Gemini API Key (already configured)
GEMINI_API_KEY='your-gemini-api-key'

# Telegram Bot Token (already configured)
TELEGRAM_BOT_TOKEN='your-telegram-bot-token'
```

### How to Get Folder ID

1. Open the Thailand folder in Google Drive
2. Look at the URL: `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`
3. Copy the `YOUR_FOLDER_ID` part

## Step 6: Verify Folder Structure

Ensure your Google Drive has this structure:

```
Thailand/
├── Pricing/
│   ├── Sheet1 (e.g., Transport Rates)
│   ├── Sheet2 (e.g., Hotel Prices)
│   ├── Sheet3 (e.g., Tour Packages)
│   ├── Sheet4 (e.g., Service Fees)
│   ├── Sheet5 (e.g., Airport Transfers)
│   └── Sheet6 (e.g., Other Pricing)
├── Tours/
│   ├── Doc1 (e.g., Bangkok City Tour)
│   ├── Doc2 (e.g., Chiang Mai Adventure)
│   ├── Doc3 (e.g., Phuket Island Hopping)
│   └── ... (other tour itineraries)
└── Policies/
    ├── PDF1 (e.g., Hotel Cancellation Policy)
    ├── PDF2 (e.g., Booking Terms & Conditions)
    ├── PDF3 (e.g., Refund Policy)
    └── ... (other policy documents)
```

## Step 7: Test the Integration

### Test Pricing Sheets
```bash
npx tsx src/test-google-sheets.ts
```

### Test Tours and Policies
```bash
npx tsx src/test-tours-policies.ts
```

### Run the Full Bot
```bash
npm run dev:bot
```

The bot will:
1. Initialize the Google Drive and Sheets clients
2. Find the Thailand folder
3. Locate the Pricing subfolder and read all pricing sheets
4. Locate the Tours subfolder and read all Google Docs
5. Locate the Policies subfolder and read all PDFs
6. Format all data for Gemini AI
7. Include pricing, tour, and policy data in AI responses

## Troubleshooting

### Error: "GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set"
- Ensure the JSON is properly formatted in `.env.local`
- Make sure the JSON is on a single line or properly escaped

### Error: "Thailand folder not found"
- Check that `GOOGLE_DRIVE_FOLDER_ID_THAILAND` is correct
- Ensure the service account has access to the folder
- Try removing the folder ID to let the system auto-detect by name

### Error: "Pricing folder not found in Thailand folder"
- Verify the Pricing folder exists inside Thailand folder
- Check folder name spelling (case-sensitive)
- Ensure service account has permissions on both folders

### Error: "No sheets found in Pricing folder"
- Verify the Pricing folder contains Google Sheets files
- Check that files are not in Trash
- Ensure service account has read permissions

### Error: "Tours folder not found in Thailand folder"
- Verify the Tours folder exists inside Thailand folder
- Check folder name spelling (case-sensitive)
- Ensure service account has permissions on Tours folder

### Error: "No tour documents found in Tours folder"
- Verify the Tours folder contains Google Docs files
- Check that files are not in Trash
- Ensure service account has read permissions

### Error: "Policies folder not found in Thailand folder"
- Verify the Policies folder exists inside Thailand folder
- Check folder name spelling (case-sensitive)
- Ensure service account has permissions on Policies folder

### Error: "No PDF files found in Policies folder"
- Verify the Policies folder contains PDF files
- Check that files are not in Trash
- Ensure service account has read permissions

### Error: "pdf-parse package not found"
- Install the package: `npm install pdf-parse`
- Ensure it's in your package.json dependencies

### Error: "API key not valid. Please pass a valid API key"
- Verify Google Drive and Sheets APIs are enabled in Google Cloud Console
- Check that the service account key is valid and not expired

## Security Notes

- **Never commit** the service account JSON file to version control
- Add `.env.local` to `.gitignore`
- Rotate service account keys periodically
- Limit service account permissions to only what's needed (read-only for Drive/Sheets)
- Monitor service account usage in Google Cloud Console

## Expected Behavior

Once configured:
- The bot will fetch pricing data on startup and cache it for 30 minutes
- The bot will fetch tour data on startup and cache it for 1 hour
- The bot will fetch policy data on startup and cache it for 1 hour
- When users ask about pricing, rates, or costs, the AI will reference the actual data
- When users ask about tours or itineraries, the AI will reference tour documents
- When users ask about cancellation policies or booking rules, the AI will reference policy PDFs
- If specific information is not found, the bot will suggest contacting AsiaBuddy directly
- Data is automatically refreshed based on cache duration

## Next Steps

After successful setup:
1. Test the bot with pricing-related queries
2. Verify the AI responses include accurate pricing information
3. Monitor logs for any API errors
4. Consider adding more folders (Myanmar, Singapore, etc.) following the same pattern
