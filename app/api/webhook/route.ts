import { Bot, webhookCallback } from 'grammy';
import { NextRequest, NextResponse } from 'next/server';

let customerHandler: ((req: NextRequest) => Promise<NextResponse>) | null = null;

function getCustomerHandler() {
  if (!customerHandler) {
    const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
    const cb = webhookCallback(bot, 'std/http');
    customerHandler = async (req: NextRequest) => {
      return cb(req) as Promise<NextResponse>;
    };
  }
  return customerHandler!;
}

export async function GET(req: NextRequest) {
  return getCustomerHandler()(req);
}

export async function POST(req: NextRequest) {
  return getCustomerHandler()(req);
}
