import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import bot from './bot';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  console.log('Starting bot in Long Polling mode...');
  bot.start();
} else {
  console.log('Bot ready for Webhook mode...');
}