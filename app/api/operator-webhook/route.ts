import { Bot, InputFile } from 'grammy';
import { getBooking, updateBookingStatus } from '@/lib/database';
import { generateAndUploadInvoicePDF } from '@/lib/pdfGenerator';
import { sendInvoiceEmail } from '@/lib/emailService';
import { getSupabaseAdmin } from '@/lib/supabase';

let operatorBot: Bot | null = null;
let customerBot: Bot | null = null;

function getOperatorBot(): Bot {
  if (!operatorBot) {
    operatorBot = new Bot(process.env.OPERATOR_BOT_TOKEN!);

    // ✅ Approve
    operatorBot.callbackQuery(/^approve_(.+)$/, async (ctx) => {
      const bookingId = ctx.match[1];
      console.log("[APPROVE] Callback received for booking:", bookingId);
      try {
        console.log("[APPROVE] Answering callback query...");
        await ctx.answerCallbackQuery({ text: '⏳ Processing...' });
        console.log("[APPROVE] Callback query answered");

        console.log("[APPROVE] Fetching booking...");
        const booking = await getBooking(bookingId);
        console.log("[APPROVE] Booking fetched:", booking ? "found" : "not found");
        if (!booking) {
          await ctx.answerCallbackQuery({ text: '❌ Booking not found.' });
          return;
        }
        console.log("BOOKING SOURCE:", booking.source, "BOOKING DATA:", JSON.stringify(booking));

        console.log("[APPROVE] Updating booking status to confirmed...");
        await updateBookingStatus(bookingId, 'confirmed');
        console.log("[APPROVE] Booking status updated");

        console.log("[APPROVE] Generating and uploading invoice PDF...");
        const { buffer: pdfBuffer, driveUrl: pdfUrl } = await generateAndUploadInvoicePDF({ booking, amount: 0, customerName: booking.customer_name });
        console.log("[APPROVE] PDF generated and uploaded, URL:", pdfUrl);
        
        console.log("[APPROVE] Inserting invoice into Supabase...");
        const supabaseAdmin = getSupabaseAdmin();
        await supabaseAdmin
          .from('invoices')
          .insert({
            booking_id: bookingId,
            amount: 0,
            status: 'unpaid',
            pdf_url: pdfUrl || null
          });
        console.log("[APPROVE] Invoice inserted into Supabase");

        // Check if this is a web inquiry (has customer_email) or telegram booking
        if (booking.source === 'web' && booking.customer_email) {
          // Send email for web inquiries
          const gmailUser = process.env.GMAIL_USER;
          if (!gmailUser) {
            throw new Error('GMAIL_USER environment variable is not set');
          }
          const salesEmail = process.env.SALES_EMAIL || gmailUser;
          const adminEmail = process.env.ADMIN_EMAIL || gmailUser;

          console.log("[APPROVE] Sending invoice email...");
          await sendInvoiceEmail({
            customerEmail: booking.customer_email,
            salesEmail,
            adminEmail,
            bookingId,
            pdfBuffer,
            customerName: booking.customer_name,
          });
          console.log("[APPROVE] Invoice email sent");

          console.log("[APPROVE] Editing message text (web with email)...");
          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — Invoice sent via email.',
            { parse_mode: 'HTML' }
          );
          console.log("[APPROVE] Message text edited (web with email)");

          console.log(`Booking ${bookingId} approved. Invoice sent via email to ${booking.customer_email}`);
        } else if (booking.source === 'web' && !booking.customer_email) {
          // No email provided - send special alert to operator group
          const socialHandles = booking.details?.socials?.[0] || 'Not provided';
          const alertMessage =
            `⚠️ <b>No email provided. Manually contact customer:</b>\n\n` +
            `👤 <b>Name:</b> ${booking.customer_name || 'N/A'}\n` +
            `📞 <b>Phone:</b> ${booking.customer_phone || 'N/A'}\n` +
            `💬 <b>Social:</b> ${socialHandles}\n` +
            `🆔 <b>Booking ID:</b> ...${bookingId.slice(-8)}`;

          console.log("[APPROVE] Sending alert to operator group (web no email)...");
          await getOperatorBot().api.sendMessage(
            process.env.OPERATOR_GROUP_CHAT_ID!,
            alertMessage,
            { parse_mode: 'HTML' }
          );
          console.log("[APPROVE] Alert sent to operator group (web no email)");

          console.log("[APPROVE] Editing message text (web no email)...");
          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — No email. Manual contact alert sent.',
            { parse_mode: 'HTML' }
          );
          console.log("[APPROVE] Message text edited (web no email)");

          console.log(`Booking ${bookingId} approved. No email provided. Manual contact alert sent.`);
        } else if (booking.telegram_id) {
          // Send via Telegram for telegram bookings
          console.log("[APPROVE] Sending invoice document to customer (telegram)...");
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
          console.log("[APPROVE] Invoice document sent to customer (telegram)");

          console.log("[APPROVE] Editing message text (telegram)...");
          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — Invoice sent to customer.',
            { parse_mode: 'HTML' }
          );
          console.log("[APPROVE] Message text edited (telegram)");

          console.log(`Booking ${bookingId} approved. Invoice sent to ${booking.telegram_id}`);
        } else {
          console.log("[APPROVE] Editing message text (no contact)...");
          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — No contact method available.',
            { parse_mode: 'HTML' }
          );
          console.log("[APPROVE] Message text edited (no contact)");
        }

        // PHASE 4: Ops Handover - forward booking summary to @asiabuddy_bot ops group
        const opsGroupChatId = process.env.OPS_GROUP_CHAT_ID || process.env.OPERATOR_GROUP_CHAT_ID;
        if (opsGroupChatId) {
          const handoverMessage =
            `📋 <b>New Booking — Ops Handover</b>\n\n` +
            `🆔 <b>Booking ID:</b> ...${bookingId.slice(-8)}\n` +
            `👤 <b>Name:</b> ${booking.customer_name || 'N/A'} | 📞 <b>Phone:</b> ${booking.customer_phone || 'N/A'}\n` +
            `📧 <b>Email:</b> ${booking.customer_email || 'Not provided'}\n` +
            `✅ <b>Status:</b> Confirmed`;

          try {
            console.log("[APPROVE] Sending ops handover message...");
            await getCustomerBot().api.sendMessage(
              opsGroupChatId,
              handoverMessage,
              { parse_mode: 'HTML' }
            );
            console.log(`[APPROVE] Ops handover sent for booking ${bookingId}`);
          } catch (error) {
            console.error('[APPROVE] Failed to send ops handover:', error);
          }
        }

      } catch (err) {
        console.error('Approval error:', err);
        await ctx.answerCallbackQuery({ text: '❌ Error. Check logs.' });
      }
    });

    // ❌ Reject
    operatorBot.callbackQuery(/^reject_(.+)$/, async (ctx) => {
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
  }
  return operatorBot;
}

function getCustomerBot(): Bot {
  if (!customerBot) {
    customerBot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
  }
  return customerBot;
}

export async function POST(req: Request) {
  console.log("WEBHOOK HANDLER ENTERED", Date.now());
  try {
    const bot = getOperatorBot();
    await bot.init();
    const text = await req.text();
    console.log("RAW BODY:", text);
    const body = JSON.parse(text);
    console.log("UPDATE RECEIVED:", JSON.stringify(body));
    await bot.handleUpdate(body);
    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return new Response('Error', { status: 500 });
  }
}
