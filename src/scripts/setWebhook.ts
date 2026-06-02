/**
 * Webhook Registration Script
 * 
 * This script registers Telegram webhooks for both the customer bot and operator bot.
 * Run this script after deploying to Vercel to set up the webhooks.
 * 
 * Usage:
 *   1. Set your Vercel deployment URL as an environment variable:
 *      export VERCEL_URL=https://your-project.vercel.app
 *   
 *   2. Run the script:
 *      npm run register-webhook
 *      or
 *      tsx src/scripts/setWebhook.ts
 */

import { Bot } from 'grammy';

// Load environment variables
const VERCEL_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OPERATOR_BOT_TOKEN = process.env.OPERATOR_BOT_TOKEN;

if (!VERCEL_URL) {
  console.error('❌ Error: VERCEL_URL environment variable is not set.');
  console.error('Please set it to your Vercel deployment URL (e.g., https://your-project.vercel.app)');
  process.exit(1);
}

if (!TELEGRAM_BOT_TOKEN) {
  console.error('❌ Error: TELEGRAM_BOT_TOKEN environment variable is not set.');
  process.exit(1);
}

if (!OPERATOR_BOT_TOKEN) {
  console.error('❌ Error: OPERATOR_BOT_TOKEN environment variable is not set.');
  process.exit(1);
}

// Remove trailing slash from URL if present
const baseUrl = VERCEL_URL.replace(/\/$/, '');

console.log('🚀 Starting webhook registration...');
console.log(`📡 Base URL: ${baseUrl}`);

// Initialize bot instances
const customerBot = new Bot(TELEGRAM_BOT_TOKEN);
const operatorBot = new Bot(OPERATOR_BOT_TOKEN);

// Webhook URLs
const customerWebhookUrl = `${baseUrl}/api/webhook`;
const operatorWebhookUrl = `${baseUrl}/api/operator-webhook`;

async function registerWebhook() {
  try {
    // Register customer bot webhook
    console.log('\n📝 Registering customer bot webhook...');
    console.log(`   URL: ${customerWebhookUrl}`);
    
    await customerBot.api.setWebhook(customerWebhookUrl, {
      drop_pending_updates: true
    });
    
    console.log('✅ Customer bot webhook registered successfully!');
    
    // Verify customer bot webhook
    const customerWebhookInfo = await customerBot.api.getWebhookInfo();
    console.log(`   Webhook URL: ${customerWebhookInfo.url}`);
    console.log(`   Pending updates: ${customerWebhookInfo.pending_update_count}`);

    // Register operator bot webhook
    console.log('\n📝 Registering operator bot webhook...');
    console.log(`   URL: ${operatorWebhookUrl}`);
    
    await operatorBot.api.setWebhook(operatorWebhookUrl, {
      drop_pending_updates: true
    });
    
    console.log('✅ Operator bot webhook registered successfully!');
    
    // Verify operator bot webhook
    const operatorWebhookInfo = await operatorBot.api.getWebhookInfo();
    console.log(`   Webhook URL: ${operatorWebhookInfo.url}`);
    console.log(`   Pending updates: ${operatorWebhookInfo.pending_update_count}`);

    console.log('\n🎉 All webhooks registered successfully!');
    console.log('\n📋 Summary:');
    console.log(`   Customer Bot: ${customerWebhookUrl}`);
    console.log(`   Operator Bot: ${operatorWebhookUrl}`);
    console.log('\n✨ Your bots are now ready to receive updates via webhook!');
    
  } catch (error) {
    console.error('\n❌ Error registering webhooks:', error);
    process.exit(1);
  }
}

async function deleteWebhook() {
  try {
    console.log('\n🗑️  Deleting webhooks...');
    
    await customerBot.api.deleteWebhook({ drop_pending_updates: true });
    console.log('✅ Customer bot webhook deleted!');
    
    await operatorBot.api.deleteWebhook({ drop_pending_updates: true });
    console.log('✅ Operator bot webhook deleted!');
    
    console.log('\n🎉 All webhooks deleted successfully!');
    
  } catch (error) {
    console.error('\n❌ Error deleting webhooks:', error);
    process.exit(1);
  }
}

async function getWebhookInfo() {
  try {
    console.log('\n📋 Getting webhook info...');
    
    const customerWebhookInfo = await customerBot.api.getWebhookInfo();
    console.log('\n🤖 Customer Bot:');
    console.log(`   Webhook URL: ${customerWebhookInfo.url}`);
    console.log(`   Has custom certificate: ${customerWebhookInfo.has_custom_certificate}`);
    console.log(`   Pending updates: ${customerWebhookInfo.pending_update_count}`);
    console.log(`   Last error date: ${customerWebhookInfo.last_error_date}`);
    console.log(`   Last error message: ${customerWebhookInfo.last_error_message}`);
    
    const operatorWebhookInfo = await operatorBot.api.getWebhookInfo();
    console.log('\n🤖 Operator Bot:');
    console.log(`   Webhook URL: ${operatorWebhookInfo.url}`);
    console.log(`   Has custom certificate: ${operatorWebhookInfo.has_custom_certificate}`);
    console.log(`   Pending updates: ${operatorWebhookInfo.pending_update_count}`);
    console.log(`   Last error date: ${operatorWebhookInfo.last_error_date}`);
    console.log(`   Last error message: ${operatorWebhookInfo.last_error_message}`);
    
  } catch (error) {
    console.error('\n❌ Error getting webhook info:', error);
    process.exit(1);
  }
}

// Main execution
const command = process.argv[2];

switch (command) {
  case 'delete':
    deleteWebhook();
    break;
  case 'info':
    getWebhookInfo();
    break;
  case 'register':
  default:
    registerWebhook();
    break;
}
