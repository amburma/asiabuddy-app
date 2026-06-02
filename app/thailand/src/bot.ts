import { Bot, GrammyError } from 'grammy';
import { getOrCreateUser, addChatMessage } from './lib/database';
import { generateAIResponse } from './services/gemini';
import { uploadTelegramFileToDrive } from './services/googleDrive';

// Utility function to strip Markdown formatting for plain text output
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold (**text**)
    .replace(/\*(.*?)\*/g, '$1')      // Remove italic (*text*)
    .replace(/__(.*?)__/g, '$1')     // Remove bold (__text__)
    .replace(/_(.*?)_/g, '$1');      // Remove italic (_text_)
}

// Initialize Telegram Bot
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

// Welcome message for /start command
const WELCOME_MESSAGE = `
🌏 Welcome to AsiaBuddy Digital Concierge!

I'm your personal travel assistant specializing in Southeast Asia (Myanmar, Thailand, and other Asian destinations).

What I can help you with:
✈️ Travel planning and recommendations
🏨 Hotel and restaurant suggestions
📍 Local attractions and activities
📋 Visa requirements and travel tips
🎭 Cultural information and etiquette
📝 Itinerary planning

Just send me a message to get started!

Use /help to see all available commands.
`;

// Help message for /help command
const HELP_MESSAGE = `
🤖 AsiaBuddy Bot Help

📝 Available Commands:
/start - Start the bot and get welcome message
/help - Show this help message

💬 How to use me:
• Simply send me a text message with your travel questions
• I'll provide personalized recommendations and assistance
• I remember our conversation context for better assistance

📎 File Upload:
• Send me photos or documents (passport, visa, etc.)
• I'll analyze them and provide relevant assistance

🌍 My Expertise:
• Myanmar, Thailand, and Southeast Asian destinations
• Local cultures, customs, and etiquette
• Attractions, restaurants, hotels, transportation
• Practical travel tips and visa information

Feel free to ask me anything about your travel plans!
`;

// /start command - Initialize user and send welcome message
bot.command('start', async (ctx) => {
  try {
    const telegramId = ctx.from!.id;
    const username = ctx.from!.username;

    // Get or create user in Supabase
    const user = await getOrCreateUser(telegramId, username);
    
    if (user) {
      console.log(`User created/retrieved: ${telegramId}`);
    } else {
      console.error(`Failed to create/retrieve user: ${telegramId}`);
    }

    // Send welcome message
    await ctx.reply(WELCOME_MESSAGE);
  } catch (error) {
    console.error('Error in /start command:', error);
    await ctx.reply('Sorry, there was an error starting the bot. Please try again.');
  }
});

// /help command - Show usage instructions
bot.command('help', async (ctx) => {
  try {
    await ctx.reply(HELP_MESSAGE);
  } catch (error) {
    console.error('Error in /help command:', error);
    await ctx.reply('Sorry, there was an error showing help. Please try again.');
  }
});

// Text message handling
bot.on('message:text', async (ctx) => {
  try {
    const telegramId = ctx.from!.id;
    const userMessage = ctx.message.text;
    const country = 'thailand'; // Default to Thailand, can be made configurable per user in future

    console.log(`Text message from ${telegramId}: ${userMessage}`);

    // Save user message to Supabase
    await addChatMessage(telegramId, 'user', userMessage, country);

    // Get AI response with chat history context
    const aiResponse = await generateAIResponse(telegramId, userMessage, country);

    // Send AI response to user (strip Markdown for plain text)
    await ctx.reply(stripMarkdown(aiResponse));

    // Save AI response to Supabase (keep original Markdown)
    await addChatMessage(telegramId, 'model', aiResponse, country);

    console.log(`AI response sent to ${telegramId}`);
  } catch (error) {
    console.error('Error handling text message:', error);
    await ctx.reply('Sorry, I encountered an error processing your message. Please try again.');
  }
});

// Photo handling
bot.on('message:photo', async (ctx) => {
  try {
    const telegramId = ctx.from!.id;
    const photo = ctx.message.photo[ctx.message.photo.length - 1]; // Get largest photo
    const fileId = photo.file_id;
    const country = 'thailand'; // Default to Thailand, can be made configurable per user in future

    console.log(`Photo received from ${telegramId}, file_id: ${fileId}`);

    // Get file info from Telegram
    const file = await ctx.api.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;

    // Download file as buffer
    const response = await fetch(fileUrl);
    const buffer = Buffer.from(await response.arrayBuffer());

    // Upload to Google Drive
    const fileName = `photo_${Date.now()}.jpg`;
    const mimeType = 'image/jpeg';
    const driveLink = await uploadTelegramFileToDrive(buffer, fileName, mimeType);

    if (driveLink) {
      console.log(`Photo uploaded to Google Drive: ${driveLink}`);

      // Save user message to Supabase
      await addChatMessage(telegramId, 'user', `[Photo uploaded: ${driveLink}]`, country);

      // Get AI response with context about the photo
      const aiResponse = await generateAIResponse(
        telegramId,
        `I've uploaded a photo for you to analyze. The photo is available at: ${driveLink}. Please examine this photo and provide relevant assistance or analysis.`,
        country
      );

      // Send AI response to user (strip Markdown for plain text)
      await ctx.reply(stripMarkdown(aiResponse));

      // Save AI response to Supabase (keep original Markdown)
      await addChatMessage(telegramId, 'model', aiResponse, country);
    } else {
      await ctx.reply('Sorry, I encountered an error uploading your photo. Please try again.');
    }
  } catch (error) {
    console.error('Error handling photo:', error);
    await ctx.reply('Sorry, I encountered an error processing your photo. Please try again.');
  }
});

// Document handling
bot.on('message:document', async (ctx) => {
  try {
    const telegramId = ctx.from!.id;
    const document = ctx.message.document;
    const fileId = document.file_id;
    const fileName = document.file_name || `document_${Date.now()}`;
    const mimeType = document.mime_type || 'application/octet-stream';
    const country = 'thailand'; // Default to Thailand, can be made configurable per user in future

    console.log(`Document received from ${telegramId}, file_id: ${fileId}, name: ${fileName}`);

    // Get file info from Telegram
    const file = await ctx.api.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;

    // Download file as buffer
    const response = await fetch(fileUrl);
    const buffer = Buffer.from(await response.arrayBuffer());

    // Upload to Google Drive
    const driveLink = await uploadTelegramFileToDrive(buffer, fileName, mimeType);

    if (driveLink) {
      console.log(`Document uploaded to Google Drive: ${driveLink}`);

      // Save user message to Supabase
      await addChatMessage(telegramId, 'user', `[Document uploaded: ${fileName} - ${driveLink}]`, country);

      // Get AI response with context about the document
      const aiResponse = await generateAIResponse(
        telegramId,
        `I've uploaded a document for you to analyze. The document "${fileName}" is available at: ${driveLink}. Please examine this document and provide relevant assistance or analysis.`,
        country
      );

      // Send AI response to user (strip Markdown for plain text)
      await ctx.reply(stripMarkdown(aiResponse));

      // Save AI response to Supabase (keep original Markdown)
      await addChatMessage(telegramId, 'model', aiResponse, country);
    } else {
      await ctx.reply('Sorry, I encountered an error uploading your document. Please try again.');
    }
  } catch (error) {
    console.error('Error handling document:', error);
    await ctx.reply('Sorry, I encountered an error processing your document. Please try again.');
  }
});

// Global error handler
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof Error) {
    console.error('Unknown error:', e.message);
  } else {
    console.error('Unknown error:', e);
  }
});

// Export bot instance
export default bot;
