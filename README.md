# AsiaBuddy - Digital Concierge Telegram Bot

A premium travel and concierge service Telegram bot specializing in Southeast Asia (Myanmar, Thailand, and other Asian destinations) powered by AI.

## Features

- **AI-Powered Travel Assistance**: Uses Gemini 2.5 Flash Lite for intelligent travel recommendations
- **Chat History Context**: Remembers conversation history for personalized assistance
- **File Upload Support**: Upload photos and documents for AI analysis
- **Google Drive Integration**: Securely stores uploaded files in Google Drive
- **Supabase Database**: Stores user data and chat history
- **Vercel Deployment**: Serverless webhook deployment for production

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Drive
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id_here
```

## Getting Started

### Local Development (Long Polling)

Run the development server:

```bash
npm run dev:bot
```

The bot will use long polling to receive updates from Telegram.

### Production Deployment (Webhook)

Deploy to Vercel and set up the webhook:

1. Deploy your project to Vercel
2. After deployment, register the webhook with Telegram:

```bash
curl -F "url=https://your-vercel-domain.vercel.app/api/webhook" https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/setWebhook
```

Replace `<YOUR_TELEGRAM_BOT_TOKEN>` with your actual bot token and `your-vercel-domain.vercel.app` with your Vercel deployment URL.

3. Verify the webhook is set:

```bash
curl https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/getWebhookInfo
```

## Project Structure

- `src/bot.ts` - Telegram bot logic with grammy framework
- `src/services/gemini.ts` - Gemini AI integration
- `src/services/googleDrive.ts` - Google Drive file upload
- `src/lib/database.ts` - Supabase database operations
- `app/api/webhook/route.ts` - Vercel webhook endpoint
- `src/index.ts` - Bot entry point (development mode)

## Bot Commands

- `/start` - Initialize the bot and get welcome message
- `/help` - Show usage instructions and available features

## Deployment on Vercel

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new).

The project uses:
- **Node.js 20.x** runtime for webhook functions
- **Webhook mode** for production (handled by Vercel API routes)
- **Long polling** for local development

After deployment, remember to register the webhook with Telegram using the command above.
