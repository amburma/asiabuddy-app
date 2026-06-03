import { Bot, GrammyError, InputFile } from 'grammy';
import { getOrCreateUser, addChatMessage, createBooking, getUserBookings, updateBookingStatus, getBooking } from '../lib/database';
import { generateAIResponse } from './services/gemini';
import { uploadTelegramFileToDrive } from './services/googleDrive';
import { generateInvoicePDF } from '../lib/pdfGenerator';

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

// Initialize Operator Bot for alerts
export const operatorBot = new Bot(process.env.OPERATOR_BOT_TOKEN!);

// Thailand Sales Telegram Group Chat ID
const OPERATOR_GROUP_CHAT_ID = process.env.OPERATOR_GROUP_CHAT_ID!;

// Booking session state management
interface BookingSession {
  step: 'select_type' | 'collect_details' | 'confirm' | 'completed';
  tourType?: 'tour' | 'flight' | 'car' | 'taxi';
  details: Record<string, any>;
}

const bookingSessions = new Map<number, BookingSession>();

// Helper function to get or create booking session
function getBookingSession(telegramId: number): BookingSession {
  if (!bookingSessions.has(telegramId)) {
    bookingSessions.set(telegramId, {
      step: 'select_type',
      details: {}
    });
  }
  return bookingSessions.get(telegramId)!;
}

// Helper function to clear booking session
function clearBookingSession(telegramId: number): void {
  bookingSessions.delete(telegramId);
}

async function sendOperatorAlert(booking: any): Promise<void> {
  try {
    const bookingIdShort = booking.id.slice(-8);
    const serviceEmoji = booking.tour_type === 'tour' ? '🎫' :
                        booking.tour_type === 'flight' ? '✈️' :
                        booking.tour_type === 'car' ? '🚗' : '🚕';

    const alertMessage =
      `🔔 <b>New Booking Request</b>\n\n` +
      `👤 <b>Customer ID:</b> ${booking.telegram_id}\n` +
      `${serviceEmoji} <b>Service:</b> ${booking.tour_type.toUpperCase()}\n` +
      `📋 <b>Booking ID:</b> ...${bookingIdShort}\n` +
      `📅 <b>Date:</b> ${new Date(booking.created_at).toLocaleString()}\n\n` +
      `📝 <b>Details:</b> ${booking.details?.user_input || 'N/A'}`;

    await operatorBot.api.sendMessage(
      OPERATOR_GROUP_CHAT_ID,
      alertMessage,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[
            { text: '✅ Approve', callback_data: `approve_${booking.id}` },
            { text: '❌ Reject',  callback_data: `reject_${booking.id}` }
          ]]
        }
      }
    );

    console.log(`Operator alert sent for booking: ${booking.id}`);
  } catch (error) {
    console.error('Error sending operator alert:', error);
  }
}

// Function to generate and send PDF invoice
async function generateAndSendInvoicePDF(booking: any, customerTelegramId: number, amount: number = 0): Promise<void> {
  try {
    const pdfBuffer = await generateInvoicePDF({
      booking,
      amount
    });

    const fileName = `invoice_${booking.id.slice(-8)}.pdf`;
    
    await bot.api.sendDocument(customerTelegramId, new InputFile(pdfBuffer, fileName), {
      caption: `📄 Here's your invoice for booking ${booking.id.slice(-8)}`
    });

    console.log(`Invoice PDF sent to customer ${customerTelegramId}`);
  } catch (error) {
    console.error('Error generating/sending invoice PDF:', error);
  }
}

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
/book - Start a new booking (Tour, Flight, Car, Taxi)
/mybookings - View your booking history
/cancel - Cancel current booking flow

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

// /start command handler — handles deep-link payload
bot.command('start', async (ctx) => {
  try {
    const telegramId = ctx.from!.id;
    const username = ctx.from!.username;
    const payload = ctx.match; // Will receive "book"
    const lang = ctx.from?.language_code || 'en';

    // Get or create user in Supabase
    const user = await getOrCreateUser(telegramId, username);

    if (user) {
      console.log(`User created/retrieved: ${telegramId}`);
    } else {
      console.error(`Failed to create/retrieve user: ${telegramId}`);
    }

    const welcomeMsg = `Welcome to AsiaBuddy.app Support 🌟\nHow may we assist you today?`;
    if (payload === 'book') {
      await ctx.reply(welcomeMsg, {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🗺️ Tour Inquiry', callback_data: 'inquiry_tour' }],
            [{ text: '🏨 Hotel / Transfer', callback_data: 'inquiry_hotel' }],
            [{ text: '📞 Talk to Operator', callback_data: 'inquiry_operator' }],
          ],
        },
      });
    } else {
      await ctx.reply(WELCOME_MESSAGE);
    }
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

// /book command - Start booking flow
bot.command('book', async (ctx) => {
  try {
    const telegramId = ctx.from!.id;

    // Initialize booking session
    const session = getBookingSession(telegramId);
    session.step = 'select_type';
    session.tourType = undefined;
    session.details = {};

    await ctx.reply(`
🎫 Let's book your travel service!

Please select the type of service you want to book:

1️⃣ Tour - Guided tours and excursions
2️⃣ Flight - Flight bookings
3️⃣ Car - Car rentals
4️⃣ Taxi - Taxi/ride-hailing services

Reply with the number (1-4) or the name (tour, flight, car, taxi) to proceed.
    `);
  } catch (error) {
    console.error('Error in /book command:', error);
    await ctx.reply('Sorry, there was an error starting the booking flow. Please try again.');
  }
});

// /mybookings command - View user's bookings
bot.command('mybookings', async (ctx) => {
  try {
    const telegramId = ctx.from!.id;

    const bookings = await getUserBookings(telegramId);

    if (bookings.length === 0) {
      await ctx.reply('You have no bookings yet. Use /book to create your first booking!');
      return;
    }

    let message = '📋 Your Bookings:\n\n';

    bookings.forEach((booking, index) => {
      const emoji = booking.tour_type === 'tour' ? '🎫' :
                   booking.tour_type === 'flight' ? '✈️' :
                   booking.tour_type === 'car' ? '🚗' : '🚕';
      const statusEmoji = booking.status === 'pending' ? '⏳' :
                         booking.status === 'confirmed' ? '✅' :
                         booking.status === 'cancelled' ? '❌' : '🎉';

      message += `${index + 1}. ${emoji} ${booking.tour_type.toUpperCase()} - ${statusEmoji} ${booking.status.toUpperCase()}\n`;
      message += `   ID: ${booking.id}\n`;
      message += `   Date: ${new Date(booking.created_at).toLocaleDateString()}\n\n`;
    });

    await ctx.reply(message);
  } catch (error) {
    console.error('Error in /mybookings command:', error);
    await ctx.reply('Sorry, there was an error fetching your bookings. Please try again.');
  }
});

// /cancel command - Cancel current booking flow
bot.command('cancel', async (ctx) => {
  try {
    const telegramId = ctx.from!.id;

    if (bookingSessions.has(telegramId)) {
      clearBookingSession(telegramId);
      await ctx.reply('❌ Booking flow cancelled. You can start a new booking with /book.');
    } else {
      await ctx.reply('No active booking flow to cancel.');
    }
  } catch (error) {
    console.error('Error in /cancel command:', error);
    await ctx.reply('Sorry, there was an error cancelling the booking flow. Please try again.');
  }
});

// Callback query handler for operator approve/reject actions
operatorBot.on('callback_query:data', async (ctx) => {
  try {
    const callbackData = ctx.callbackQuery.data;
    const [action, bookingId] = callbackData.split('_');

    if (action === 'approve' || action === 'reject' || action === 'complete') {
      const booking = await getBooking(bookingId);

      if (!booking) {
        await ctx.answerCallbackQuery({ text: 'Booking not found', show_alert: true });
        return;
      }

      if (action === 'approve') {
        // Update booking status to confirmed
        const updatedBooking = await updateBookingStatus(bookingId, 'confirmed');

        if (updatedBooking) {
          // Generate and send invoice PDF to customer
          await generateAndSendInvoicePDF(updatedBooking, booking.telegram_id, 0);

          // Send confirmation message to customer
          await bot.api.sendMessage(booking.telegram_id, `
✅ Your booking has been confirmed!

Booking ID: ${booking.id.slice(-8)}
Service: ${booking.tour_type.toUpperCase()}
Status: CONFIRMED

📄 Your invoice has been sent to you.
Our team will contact you shortly with further details.

Thank you for choosing AsiaBuddy!
          `);

          await ctx.answerCallbackQuery({ text: 'Booking approved and invoice sent' });
          await ctx.editMessageText(`✅ Booking ${booking.id.slice(-8)} approved by ${ctx.from?.username || 'operator'}`);
        } else {
          await ctx.answerCallbackQuery({ text: 'Failed to approve booking', show_alert: true });
        }
      } else if (action === 'complete') {
        // Update booking status to completed
        const updatedBooking = await updateBookingStatus(bookingId, 'completed');

        if (updatedBooking) {
          // Generate and send invoice PDF to customer
          await generateAndSendInvoicePDF(updatedBooking, booking.telegram_id, 0);

          // Send completion message to customer
          await bot.api.sendMessage(booking.telegram_id, `
🎉 Your booking has been completed!

Booking ID: ${booking.id.slice(-8)}
Service: ${booking.tour_type.toUpperCase()}
Status: COMPLETED

📄 Your invoice has been sent to you.
Thank you for choosing AsiaBuddy!
          `);

          await ctx.answerCallbackQuery({ text: 'Booking completed and invoice sent' });
          await ctx.editMessageText(`🎉 Booking ${booking.id.slice(-8)} completed by ${ctx.from?.username || 'operator'}`);
        } else {
          await ctx.answerCallbackQuery({ text: 'Failed to complete booking', show_alert: true });
        }
      } else if (action === 'reject') {
        // Update booking status to cancelled
        const updatedBooking = await updateBookingStatus(bookingId, 'cancelled');

        if (updatedBooking) {
          // Send rejection message to customer
          await bot.api.sendMessage(booking.telegram_id, `
❌ Your booking has been cancelled.

Booking ID: ${booking.id.slice(-8)}
Service: ${booking.tour_type.toUpperCase()}
Status: CANCELLED

If you have any questions, please contact our support team.
          `);

          await ctx.answerCallbackQuery({ text: 'Booking rejected' });
          await ctx.editMessageText(`❌ Booking ${booking.id.slice(-8)} rejected by ${ctx.from?.username || 'operator'}`);
        } else {
          await ctx.answerCallbackQuery({ text: 'Failed to reject booking', show_alert: true });
        }
      }
    }
  } catch (error) {
    console.error('Error handling callback query:', error);
    await ctx.answerCallbackQuery({ text: 'Error processing request', show_alert: true });
  }
});

// Text message handling
bot.on('message:text', async (ctx) => {
  try {
    const telegramId = ctx.from!.id;
    const userMessage = ctx.message.text;
    const country = 'thailand'; // Default to Thailand, can be made configurable per user in future

    console.log(`Text message from ${telegramId}: ${userMessage}`);

    // Check if user is in a booking session
    const session = bookingSessions.get(telegramId);
    if (session) {
      await handleBookingFlow(ctx, telegramId, userMessage, session);
      return;
    }

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

// Booking flow handler
async function handleBookingFlow(
  ctx: any,
  telegramId: number,
  userMessage: string,
  session: BookingSession
) {
  const message = userMessage.toLowerCase().trim();

  switch (session.step) {
    case 'select_type':
      // Handle tour type selection
      let tourType: 'tour' | 'flight' | 'car' | 'taxi' | null = null;

      if (['1', 'tour'].includes(message)) {
        tourType = 'tour';
      } else if (['2', 'flight'].includes(message)) {
        tourType = 'flight';
      } else if (['3', 'car'].includes(message)) {
        tourType = 'car';
      } else if (['4', 'taxi'].includes(message)) {
        tourType = 'taxi';
      }

      if (tourType) {
        session.tourType = tourType;
        session.step = 'collect_details';

        const prompts = {
          tour: '🎫 Please provide the following details for your Tour booking:\n\n• Destination\n• Date\n• Number of travelers\n• Any specific requirements or preferences',
          flight: '✈️ Please provide the following details for your Flight booking:\n\n• Departure city\n• Destination city\n• Departure date\n• Return date (if round-trip)\n• Number of passengers',
          car: '🚗 Please provide the following details for your Car rental:\n\n• Pickup location\n• Pickup date\n• Return date\n• Car type preference (economy, sedan, SUV, etc.)',
          taxi: '🚕 Please provide the following details for your Taxi booking:\n\n• Pickup location\n• Destination\n• Pickup date and time\n• Number of passengers'
        };

        await ctx.reply(prompts[tourType]);
      } else {
        await ctx.reply('Invalid selection. Please reply with 1-4 or the service name (tour, flight, car, taxi).');
      }
      break;

    case 'collect_details':
      // Collect booking details
      session.details.user_input = userMessage;
      session.step = 'confirm';

      const summary = `
📋 Booking Summary:

Service Type: ${session.tourType?.toUpperCase()}
Details: ${userMessage}

Please confirm:
✅ Type "confirm" to proceed with this booking
❌ Type "cancel" to cancel this booking
✏️ Type "edit" to modify the details
      `;

      await ctx.reply(summary);
      break;

    case 'confirm':
      // Handle confirmation
      if (message === 'confirm') {
        // Save booking to database
        const booking = await createBooking(
          telegramId,
          session.tourType!,
          session.details
        );

        if (booking) {
          session.step = 'completed';
          await ctx.reply(`
✅ Booking successfully created!

Booking ID: ${booking.id}
Service: ${booking.tour_type.toUpperCase()}
Status: ${booking.status.toUpperCase()}
Date: ${new Date(booking.created_at).toLocaleString()}

Our team will review your booking and contact you shortly.
Use /mybookings to view all your bookings.
          `);
          
          // Send operator alert
          await sendOperatorAlert(booking);
          
          clearBookingSession(telegramId);
        } else {
          await ctx.reply('❌ Failed to create booking. Please try again or contact support.');
          clearBookingSession(telegramId);
        }
      } else if (message === 'cancel') {
        await ctx.reply('❌ Booking cancelled. Use /book to start a new booking.');
        clearBookingSession(telegramId);
      } else if (message === 'edit') {
        session.step = 'collect_details';
        await ctx.reply('Please provide your updated booking details:');
      } else {
        await ctx.reply('Invalid option. Please type "confirm", "cancel", or "edit".');
      }
      break;

    case 'completed':
      // Session should be cleared, but handle edge case
      clearBookingSession(telegramId);
      await ctx.reply('Your booking is already completed. Use /book to create a new booking or /mybookings to view your bookings.');
      break;
  }
}

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
