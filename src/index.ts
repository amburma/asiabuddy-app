import bot from './bot';
import { operatorBot } from './bot';

// Check if running in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  // Development mode: Use long polling
  console.log('Starting AsiaBuddy Telegram Bot in development mode (long polling)...');
  bot.start();
  
  console.log('Starting AsiaBuddy Operator Bot in development mode (long polling)...');
  operatorBot.start();
} else {
  // Production mode: Webhook is handled by Vercel API route
  console.log('AsiaBuddy Telegram Bot is running in production mode (webhook)');
  console.log('Webhook endpoint: /api/webhook');
  console.log('AsiaBuddy Operator Bot is running in production mode (webhook)');
}
