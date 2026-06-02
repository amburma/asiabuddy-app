# AsiaBuddy - Digital Concierge Telegram Bot

A premium travel and concierge service Telegram bot specializing in Southeast Asia (Myanmar, Thailand, and other Asian destinations) powered by AI.

## Features

- **AI-Powered Travel Assistance**: Uses Gemini 2.5 Flash Lite for intelligent travel recommendations
- **Chat History Context**: Remembers conversation history for personalized assistance
- **File Upload Support**: Upload photos and documents for AI analysis
- **Google Drive Integration**: Securely stores uploaded files in Google Drive
- **Supabase Database**: Stores user data and chat history
- **Vercel Deployment**: Serverless webhook deployment for production
- **Dual Bot System**: Customer bot for users and operator bot for staff alerts
- **Booking System**: Tour, flight, car, and taxi booking with PDF invoice generation

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
OPERATOR_BOT_TOKEN=your_operator_bot_token_here
OPERATOR_GROUP_CHAT_ID=your_operator_group_chat_id_here

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Drive
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id_here

# Vercel Deployment URL (for webhook registration)
VERCEL_URL=https://your-project.vercel.app
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
2. Set your Vercel deployment URL as an environment variable:

```bash
export VERCEL_URL=https://your-project.vercel.app
```

3. Register the webhooks with Telegram using the provided script:

```bash
npm run register-webhook
```

This will register both the customer bot and operator bot webhooks automatically.

4. Verify the webhooks are set correctly:

```bash
npm run webhook-info
```

5. If you need to delete the webhooks (e.g., to switch back to long polling):

```bash
npm run delete-webhook
```

## Project Structure

- `src/bot.ts` - Telegram bot logic with grammy framework (customer + operator bots)
- `src/services/gemini.ts` - Gemini AI integration
- `src/services/googleDrive.ts` - Google Drive file upload
- `src/services/pdfGenerator.ts` - PDF invoice generation
- `src/lib/database.ts` - Supabase database operations
- `app/api/webhook/route.ts` - Vercel webhook endpoint for customer bot
- `app/api/operator-webhook/route.ts` - Vercel webhook endpoint for operator bot
- `src/index.ts` - Bot entry point (development mode)
- `src/scripts/setWebhook.ts` - Webhook registration script

## Bot Commands

- `/start` - Initialize the bot and get welcome message
- `/help` - Show usage instructions and available features
- `/book` - Start a new booking (Tour, Flight, Car, Taxi)
- `/mybookings` - View your booking history
- `/cancel` - Cancel current booking flow

## Deployment on Vercel

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new).

The project uses:
- **Node.js 20.x** runtime for webhook functions
- **Webhook mode** for production (handled by Vercel API routes)
- **Long polling** for local development

### Deployment Steps

1. Push your code to GitHub
2. Import the project in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy the project
5. After deployment, set the VERCEL_URL environment variable locally and run:
   ```bash
   npm run register-webhook
   ```

### Webhook Endpoints

- Customer Bot: `https://your-project.vercel.app/api/webhook`
- Operator Bot: `https://your-project.vercel.app/api/operator-webhook`

Both webhooks are automatically registered when you run the registration script.
