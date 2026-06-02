import { webhookCallback } from 'grammy';
import bot from '../../../src/bot';

// Create webhook handler for Vercel
const handler = webhookCallback(bot, 'std/http');

// Export GET and POST handlers for Vercel
export async function GET(req: Request) {
  return handler(req);
}

export async function POST(req: Request) {
  return handler(req);
}
