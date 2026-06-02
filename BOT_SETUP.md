# AsiaBuddy Bot Environment Variables Setup

This document describes the required environment variables for running the AsiaBuddy Telegram Bot with the new Operator Alert System and Invoice PDF Generation features.

## Required Environment Variables

### Main Bot Configuration
- `TELEGRAM_BOT_TOKEN` - The token for your main AsiaBuddy Telegram bot (obtained from @BotFather)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

### Operator Bot Configuration (NEW)
- `OPERATOR_BOT_TOKEN` - The token for the operator bot (@asiabuddy_ops_bot) obtained from @BotFather
- `OPERATOR_GROUP_CHAT_ID` - The chat ID of the "Thailand Sales Telegram Group" where operator alerts will be sent

## How to Get These Values

### 1. Main Bot Token
1. Open Telegram and search for @BotFather
2. Send `/newbot` and follow the instructions to create your main bot
3. Copy the token provided by BotFather
4. Set it as `TELEGRAM_BOT_TOKEN`

### 2. Operator Bot Token
1. Open Telegram and search for @BotFather
2. Send `/newbot` and create a separate bot for operator alerts (e.g., @asiabuddy_ops_bot)
3. Copy the token provided by BotFather
4. Set it as `OPERATOR_BOT_TOKEN`

### 3. Operator Group Chat ID
1. Create a Telegram group for your Thailand Sales team
2. Add your operator bot (@asiabuddy_ops_bot) to the group as an administrator
3. Send a message to the group from any account
4. Visit `https://api.telegram.org/bot<OPERATOR_BOT_TOKEN>/getUpdates` in your browser
5. Look for the `chat.id` field in the response
6. Set it as `OPERATOR_GROUP_CHAT_ID`

### 4. Supabase Credentials
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and set it as `SUPABASE_URL`
4. Copy the anon/public key and set it as `SUPABASE_ANON_KEY`

## Setting Environment Variables

### Development (.env file)
Create a `.env` file in the root of your project:

```env
TELEGRAM_BOT_TOKEN=your_main_bot_token_here
OPERATOR_BOT_TOKEN=your_operator_bot_token_here
OPERATOR_GROUP_CHAT_ID=your_group_chat_id_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
NODE_ENV=development
```

### Production (Vercel)
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable with its value
4. Redeploy your application

## Database Migration

After setting up the environment variables, you need to run the database migration to add the 'completed' status to the bookings table:

```bash
# Apply the migration to your Supabase database
# The migration file is located at: supabase/migrations/002_create_bookings_table.sql
# It has been updated to include 'completed' in the status check constraint
```

If you already have the bookings table created, you may need to manually update the constraint:

```sql
ALTER TABLE bookings 
DROP CONSTRAINT bookings_status_check;

ALTER TABLE bookings 
ADD CONSTRAINT bookings_status_check 
CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'));
```

## Features Overview

### 1. Invoice PDF Generation
- When a booking is approved or completed, a PDF invoice is automatically generated
- The invoice includes booking details, UUID (last 8 characters), and amount
- The PDF is sent directly to the customer's Telegram chat

### 2. Operator Alert System
- When a user submits a booking (status: 'pending'), an alert is sent to the operator group
- The alert displays:
  - Customer Telegram ID
  - Service Type (Tour/Flight/Car/Taxi)
  - Booking details
  - Booking UUID (last 8 characters for clean display)
- Inline keyboard buttons: [Approve ✅], [Complete 🎉], [Reject ❌]

### 3. Callback Query Handler
- **Approve ✅**: Updates booking status to 'confirmed', generates PDF invoice, sends confirmation to customer
- **Complete 🎉**: Updates booking status to 'completed', generates PDF invoice, sends completion message to customer
- **Reject ❌**: Updates booking status to 'cancelled', sends rejection message to customer

## Testing

1. Start the bot in development mode:
   ```bash
   npm run dev:bot
   ```

2. Test the booking flow:
   - Send `/book` to your main bot
   - Complete the booking process
   - Verify that an operator alert appears in the group
   - Click the approve/complete/reject buttons
   - Verify that the customer receives the appropriate message and PDF invoice

## Troubleshooting

### Operator bot not sending messages
- Verify the operator bot token is correct
- Ensure the operator bot is added to the group as an administrator
- Check the group chat ID is correct

### PDF generation fails
- Ensure pdfkit is installed: `npm install pdfkit`
- Check that the bot has proper permissions to send documents

### Callback queries not working
- Verify the operator bot is running
- Check that the callback data format matches the handler logic
