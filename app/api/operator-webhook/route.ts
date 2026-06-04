import { Bot, webhookCallback, InputFile } from 'grammy';
import { getBooking, updateBookingStatus, createInvoice } from '@/lib/database';
import { generateInvoicePDF } from '@/lib/pdfGenerator';
import { sendInvoiceEmail } from '@/lib/emailService';

let operatorBot: Bot | null = null;
let customerBot: Bot | null = null;
let handler: any = null;

function getOperatorBot(): Bot {
  if (!operatorBot) {
    operatorBot = new Bot(process.env.OPERATOR_BOT_TOKEN!);
  }
  return operatorBot;
}

function getCustomerBot(): Bot {
  if (!customerBot) {
    customerBot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
  }
  return customerBot;
}

function getHandler() {
  if (!handler) {
    const bot = getOperatorBot();

    // ✅ Approve
    bot.callbackQuery(/^approve_(.+)$/, async (ctx) => {
      const bookingId = ctx.match[1];
      try {
        await ctx.answerCallbackQuery({ text: '⏳ Processing...' });

        const booking = await getBooking(bookingId);
        if (!booking) {
          await ctx.answerCallbackQuery({ text: '❌ Booking not found.' });
          return;
        }

        await updateBookingStatus(bookingId, 'confirmed');
        await createInvoice(bookingId, 0);

        const pdfBuffer = await generateInvoicePDF({ booking, amount: 0, customerName: booking.customer_name });

        // Check if this is a web inquiry (has customer_email) or telegram booking
        if (booking.source === 'web' && booking.customer_email) {
          // Send email for web inquiries
          const gmailUser = process.env.GMAIL_USER;
          if (!gmailUser) {
            throw new Error('GMAIL_USER environment variable is not set');
          }
          const salesEmail = process.env.SALES_EMAIL || gmailUser;
          const adminEmail = process.env.ADMIN_EMAIL || gmailUser;

          await sendInvoiceEmail({
            customerEmail: booking.customer_email,
            salesEmail,
            adminEmail,
            bookingId,
            pdfBuffer,
            customerName: booking.customer_name,
          });

          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — Invoice sent via email.',
            { parse_mode: 'HTML' }
          );

          console.log(`Booking ${bookingId} approved. Invoice sent via email to ${booking.customer_email}`);
        } else if (booking.telegram_id) {
          // Send via Telegram for telegram bookings
          await getCustomerBot().api.sendDocument(
            booking.telegram_id,
            new InputFile(pdfBuffer, `invoice_${bookingId.slice(-8)}.pdf`),
            {
              caption:
                `✅ Booking confirmed!\n` +
                `📋 ID: ...${bookingId.slice(-8)}\n\n` +
                `Thank you for choosing AsiaBuddy! 🌟`,
            }
          );

          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — Invoice sent to customer.',
            { parse_mode: 'HTML' }
          );

          console.log(`Booking ${bookingId} approved. Invoice sent to ${booking.telegram_id}`);
        } else {
          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — No contact method available.',
            { parse_mode: 'HTML' }
          );
        }

      } catch (err) {
        console.error('Approval error:', err);
        await ctx.answerCallbackQuery({ text: '❌ Error. Check logs.' });
      }
    });

    // ❌ Reject
    bot.callbackQuery(/^reject_(.+)$/, async (ctx) => {
      const bookingId = ctx.match[1];
      try {
        await ctx.answerCallbackQuery({ text: 'Rejected.' });
        await updateBookingStatus(bookingId, 'cancelled');

        const booking = await getBooking(bookingId);
        if (booking) {
          // Check if this is a web inquiry or telegram booking
          if (booking.source === 'web' && booking.customer_email) {
            // For web inquiries, we could send an email rejection notification
            // For now, just log it since email rejection notification is not required
            console.log(`Web booking ${bookingId} rejected. Customer email: ${booking.customer_email}`);
          } else if (booking.telegram_id) {
            // Send via Telegram for telegram bookings
            await getCustomerBot().api.sendMessage(
              booking.telegram_id,
              `❌ Booking (...${bookingId.slice(-8)}) could not be confirmed.\n\nPlease use /book to try again.`
            );
          }
        }

        await ctx.editMessageText(
          (ctx.msg?.text ?? '') + '\n\n❌ <b>REJECTED</b> — Customer notified.',
          { parse_mode: 'HTML' }
        );

      } catch (err) {
        console.error('Rejection error:', err);
      }
    });

    handler = webhookCallback(bot, 'std/http');
  }
  return handler;
}

export async function POST(req: Request) { return getHandler()(req); }
export async function GET(req: Request)  { return getHandler()(req); }
