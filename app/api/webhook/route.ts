import { webhookCallback } from 'grammy';
import bot from '../../../src/bot';
import { operatorBot } from '../../../src/bot';

// Create webhook handler for customer bot
const customerHandler = webhookCallback(bot, 'std/http');

// Create webhook handler for operator bot
const operatorHandler = webhookCallback(operatorBot, 'std/http');

// Export GET and POST handlers for Vercel (Customer Bot)
export async function GET(req: Request) {
  return customerHandler(req);
}

export async function POST(req: Request) {
  return customerHandler(req);
}
