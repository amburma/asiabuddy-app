import { Bot, InputFile } from 'grammy';
import { getBooking, updateBookingStatus, updateBooking, getChatHistory } from '../../../lib/database';
import { generateAndUploadInvoicePDF } from '../../../lib/pdfGenerator';
import { sendInvoiceEmail } from '../../../lib/emailService';
import { getSupabaseAdmin, getSupabase } from '../../../lib/supabase';
import { createTourGuideAccountForBooking } from '../../../lib/tour-guide/accountCreation';

let operatorBot: Bot | null = null;
let customerBot: Bot | null = null;

// Helper function to get target chat ID based on salesperson_id
async function getTargetChatId(salespersonId: string | null | undefined): Promise<string | number> {
  if (!salespersonId) {
    return process.env.OPERATOR_GROUP_CHAT_ID!;
  }

  try {
    const supabase = getSupabase();
    const { data: salesperson } = await supabase
      .from('salespersons')
      .select('telegram_id')
      .eq('id', salespersonId)
      .single();

    return salesperson?.telegram_id ?? process.env.OPERATOR_GROUP_CHAT_ID!;
  } catch (error) {
    console.error('[getTargetChatId] Error fetching salesperson:', error);
    return process.env.OPERATOR_GROUP_CHAT_ID!;
  }
}

// Helper function to handle supergroup migration errors
async function sendMessageWithMigrationRetry(
  bot: Bot,
  chatId: string | number,
  text: string,
  options?: any
): Promise<void> {
  try {
    await bot.api.sendMessage(chatId, text, options);
  } catch (error: any) {
    // Check if error is due to group migration to supergroup
    if (error?.parameters?.migrate_to_chat_id) {
      console.log('[MIGRATION] Group migrated to supergroup, retrying with new chat_id:', error.parameters.migrate_to_chat_id);
      await bot.api.sendMessage(error.parameters.migrate_to_chat_id, text, options);
    } else {
      throw error;
    }
  }
}

function getOperatorBot(): Bot {
  if (!operatorBot) {
    operatorBot = new Bot(process.env.OPERATOR_BOT_TOKEN!);

    // ✅ Approve
    operatorBot.callbackQuery(/^approve_(.+)$/, async (ctx) => {
      const bookingId = ctx.match[1];
      console.log("[APPROVE] Callback received for booking:", bookingId);
      try {
        console.log("[APPROVE] Answering callback query...");
        const t1 = Date.now();
        await ctx.answerCallbackQuery({ text: '⏳ Processing...' });
        console.log("[APPROVE] Callback query answered - took", Date.now() - t1, "ms");

        console.log("[APPROVE] Fetching booking...");
        const t2 = Date.now();
        const booking = await getBooking(bookingId);
        console.log("[APPROVE] Booking fetched - took", Date.now() - t2, "ms:", booking ? "found" : "not found");
        console.log("[APPROVE] BOOKING OBJECT:", JSON.stringify(booking));
        console.log("[APPROVE] BOOKING TELEGRAM_ID:", booking?.telegram_id);
        if (!booking) {
          await ctx.answerCallbackQuery({ text: '❌ Booking not found.' });
          return;
        }
        console.log("BOOKING SOURCE:", booking.source, "BOOKING DATA:", JSON.stringify(booking));
        console.log("BOOKING SOURCE CHECK:", booking.source);
        console.log("BOOKING EMAIL CHECK:", booking.customer_email);

        // For tour bookings, ask for tour_days before confirming
        if (booking.tour_type === 'tour') {
          console.log("[APPROVE] Tour booking detected - requesting tour_days input");
          
          // Check for concurrency risk: ensure no other booking is already pending for this operator chat
          const supabase = getSupabase();
          const { data: existingPending, error: checkError } = await supabase
            .from('bookings')
            .select('id, customer_name')
            .eq('pending_tour_days_approval', true)
            .eq('details->>operator_chat_id', String(ctx.chat?.id))
            .limit(1);
          
          if (checkError) {
            console.error('[APPROVE] Error checking existing pending approvals:', checkError);
            await ctx.answerCallbackQuery({ text: '❌ Error checking pending approvals.' });
            return;
          }
          
          if (existingPending && existingPending.length > 0) {
            const existingBooking = existingPending[0];
            console.log('[APPROVE] Concurrency check failed - existing pending approval for booking:', existingBooking.id);
            await ctx.answerCallbackQuery({ 
              text: `⚠️ Another tour booking (${existingBooking.customer_name || existingBooking.id.slice(-8)}) is already awaiting tour_days input. Please complete that first.`,
              show_alert: true 
            });
            return;
          }
          
          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n⏳ <b>Tour booking detected.</b>\n\nPlease reply with the number of tour days (e.g., "3" for 3 days) to confirm this booking.',
            { parse_mode: 'HTML' }
          );
          
          // Set pending approval flag in database for persistent state
          // Store operator chat ID in details to match incoming messages
          const updatedDetails = {
            ...booking.details,
            operator_chat_id: ctx.chat?.id,
            pending_tour_days_booking_id: bookingId
          };
          await updateBooking(bookingId, { 
            pending_tour_days_approval: true,
            details: updatedDetails
          });
          console.log("[APPROVE] Set pending_tour_days_approval flag for booking:", bookingId);
          return;
        }

        console.log("[APPROVE] Updating booking status to confirmed...");
        const t3 = Date.now();
        await updateBookingStatus(bookingId, 'confirmed');
        console.log("[APPROVE] Booking status updated - took", Date.now() - t3, "ms");

        console.log("[APPROVE] Generating and uploading invoice PDF...");
        const t4 = Date.now();
        const { buffer, driveUrl } = await generateAndUploadInvoicePDF(booking);
        console.log("[APPROVE] PDF generated and uploaded - took", Date.now() - t4, "ms, URL:", driveUrl);
        
        console.log("[APPROVE] Inserting invoice into Supabase...");
        const t5 = Date.now();
        const supabaseAdmin = getSupabaseAdmin();
        await supabaseAdmin
          .from('invoices')
          .insert({
            booking_id: bookingId,
            amount: 0,
            status: 'unpaid',
            pdf_url: driveUrl || null
          });
        console.log("[APPROVE] Invoice inserted into Supabase - took", Date.now() - t5, "ms");

        // Track if this is a web booking with email for sending after ops handover
        const isWebWithEmail = booking.source === 'web' && booking.customer_email;

        // Check if this is a web inquiry (has customer_email) or telegram booking
        console.log("ENTERING BRANCH: web with email check");
        console.log("CONDITION (booking.source === 'web' && booking.customer_email):", booking.source === 'web' && booking.customer_email);
        if (isWebWithEmail) {
          console.log("[APPROVE] Editing message text (web with email)...");
          const t7 = Date.now();
          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — Invoice sent via email.',
            { parse_mode: 'HTML' }
          );
          console.log("[APPROVE] Message text edited (web with email) - took", Date.now() - t7, "ms");

          console.log(`Booking ${bookingId} approved. Invoice sent via email to ${booking.customer_email}`);
        } else if (booking.source === 'web' && !booking.customer_email) {
          console.log("ENTERING BRANCH: web without email check");
          console.log("CONDITION (booking.source === 'web' && !booking.customer_email):", booking.source === 'web' && !booking.customer_email);
          // No email provided - send special alert to operator group
          const socialHandles = booking.details?.socials?.[0] || 'Not provided';
          const alertMessage =
            `⚠️ <b>No email provided. Manually contact customer:</b>\n\n` +
            `👤 <b>Name:</b> ${booking.customer_name || 'N/A'}\n` +
            `📞 <b>Phone:</b> ${booking.customer_phone || 'N/A'}\n` +
            `💬 <b>Social:</b> ${socialHandles}\n` +
            `🆔 <b>Booking ID:</b> ...${bookingId.slice(-8)}`;

          console.log("[APPROVE] Sending alert to operator group (web no email)...");
          const t8 = Date.now();
          const targetChatId = await getTargetChatId(booking.salesperson_id);
          await sendMessageWithMigrationRetry(
            getOperatorBot(),
            targetChatId,
            alertMessage,
            { parse_mode: 'HTML' }
          );
          console.log("[APPROVE] Alert sent to operator group (web no email) - took", Date.now() - t8, "ms");

          console.log("[APPROVE] Editing message text (web no email)...");
          const t9 = Date.now();
          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — No email. Manual contact alert sent.',
            { parse_mode: 'HTML' }
          );
          console.log("[APPROVE] Message text edited (web no email) - took", Date.now() - t9, "ms");

          console.log(`Booking ${bookingId} approved. No email provided. Manual contact alert sent.`);
        } else if (booking.telegram_id) {
          console.log("ENTERING BRANCH: telegram check");
          console.log("CONDITION (booking.telegram_id):", booking.telegram_id);
          // Send via Telegram for telegram bookings
          console.log("[APPROVE] Sending invoice document to customer (telegram)...");
          const t10 = Date.now();
          await getCustomerBot().api.sendDocument(
            booking.telegram_id,
            new InputFile(buffer, `invoice_${bookingId.slice(-8)}.pdf`),
            {
              caption:
                `✅ Booking confirmed!\n` +
                `📋 ID: ...${bookingId.slice(-8)}\n\n` +
                `Thank you for choosing AsiaBuddy! 🌟`,
            }
          );
          console.log("[APPROVE] Invoice document sent to customer (telegram) - took", Date.now() - t10, "ms");

          console.log("[APPROVE] Editing message text (telegram)...");
          const t11 = Date.now();
          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — Invoice sent to customer.',
            { parse_mode: 'HTML' }
          );
          console.log("[APPROVE] Message text edited (telegram) - took", Date.now() - t11, "ms");

          console.log(`Booking ${bookingId} approved. Invoice sent to ${booking.telegram_id}`);
        } else {
          console.log("ENTERING BRANCH: no contact method");
          console.log("[APPROVE] Editing message text (no contact)...");
          const t12 = Date.now();
          await ctx.editMessageText(
            (ctx.msg?.text ?? '') + '\n\n✅ <b>APPROVED</b> — No contact method available.',
            { parse_mode: 'HTML' }
          );
          console.log("[APPROVE] Message text edited (no contact) - took", Date.now() - t12, "ms");
        }

        // PHASE 4: Ops Handover - forward booking summary to @asiabuddy_bot ops group
        const opsGroupChatId = process.env.OPS_GROUP_CHAT_ID;
        console.log("ENTERING BRANCH: ops handover check");
        console.log("CONDITION (opsGroupChatId):", opsGroupChatId);
        if (opsGroupChatId) {
          let handoverMessage =
            `📋 <b>New Booking — Ops Handover</b>\n\n` +
            `🆔 <b>Booking ID:</b> ...${bookingId.slice(-8)}\n` +
            `👤 <b>Name:</b> ${booking.customer_name || 'N/A'} | 📞 <b>Phone:</b> ${booking.customer_phone || 'N/A'}\n` +
            `📧 <b>Email:</b> ${booking.customer_email || 'Not provided'}\n` +
            `✅ <b>Status:</b> Confirmed`;

          // Fetch and include chat history
          if (booking.source === 'telegram' && booking.telegram_id) {
            try {
              console.log("[APPROVE] Fetching chat history for telegram_id:", booking.telegram_id);
              const t13 = Date.now();
              const chatHistory = await getChatHistory(booking.telegram_id, 50, 'thailand');
              console.log("[APPROVE] getChatHistory() returned - took", Date.now() - t13, "ms");
              console.log("[APPROVE] getChatHistory() result - messages count:", chatHistory?.length || 0);
              if (chatHistory && chatHistory.length > 0) {
                console.log(`[APPROVE] Found ${chatHistory.length} chat history messages`);
                handoverMessage += `\n\n💬 <b>Chat History:</b>\n`;
                chatHistory.forEach((msg, index) => {
                  const role = msg.role === 'user' ? '👤' : '🤖';
                  const text = msg.message_text.substring(0, 200) + (msg.message_text.length > 200 ? '...' : '');
                  handoverMessage += `${role} ${text}\n`;
                });
              } else {
                console.log("[APPROVE] No chat history found");
              }
            } catch (historyError) {
              console.error('[APPROVE] Failed to fetch chat history:', historyError);
            }
          } else if (booking.source === 'web' && booking.details?.chatSummary) {
            // Use chatSummary for web bookings
            console.log("[APPROVE] Using chatSummary for web booking");
            handoverMessage += `\n\n💬 <b>Chat Summary:</b>\n${booking.details.chatSummary}`;
          }

          try {
            console.log("[APPROVE] Sending ops handover message...");
            console.log('[OPS] opsGroupChatId:', opsGroupChatId);
            console.log('[OPS] bot token prefix:', process.env.TELEGRAM_BOT_TOKEN?.slice(0, 10));
            const t14 = Date.now();
            await sendMessageWithMigrationRetry(
              getCustomerBot(),
              opsGroupChatId,
              handoverMessage,
              { parse_mode: 'HTML' }
            );
            console.log(`[APPROVE] Ops handover sent for booking ${bookingId} - took`, Date.now() - t14, "ms");
          } catch (error) {
            console.error('[APPROVE] Failed to send ops handover:', error);
          }
        }

        // Send email for web bookings with email (after user response and ops handover)
        if (isWebWithEmail) {
          const gmailUser = process.env.GMAIL_USER;
          if (!gmailUser) {
            throw new Error('GMAIL_USER environment variable is not set');
          }
          const salesEmail = process.env.SALES_EMAIL || gmailUser;
          const adminEmail = process.env.ADMIN_EMAIL || gmailUser;

          try {
            console.log("[EMAIL] Sending email to: " + booking.customer_email);
            const t15 = Date.now();
            await sendInvoiceEmail({
              customerEmail: booking.customer_email!,
              salesEmail,
              adminEmail,
              bookingId,
              pdfBuffer: buffer,
              customerName: booking.customer_name,
              chatSummary: booking.details?.chatSummary,
              customerLanguage: booking.details?.language?.toLowerCase(),
            });
            console.log("[APPROVE] Email sent successfully - took", Date.now() - t15, "ms");
          } catch (emailErr) {
            console.error('[APPROVE] Email failed:', emailErr);
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
          console.log("ENTERING BRANCH: reject web with email check");
          console.log("CONDITION (booking.source === 'web' && booking.customer_email):", booking.source === 'web' && booking.customer_email);
          if (booking.source === 'web' && booking.customer_email) {
            // For web inquiries, we could send an email rejection notification
            // For now, just log it since email rejection notification is not required
            console.log(`Web booking ${bookingId} rejected. Customer email: ${booking.customer_email}`);
          } else if (booking.telegram_id) {
            console.log("ENTERING BRANCH: reject telegram check");
            console.log("CONDITION (booking.telegram_id):", booking.telegram_id);
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

    // Handle tour_days input for pending tour booking approvals
    operatorBot.on('message:text', async (ctx) => {
      const text = ctx.message.text.trim();
      const chatId = ctx.chat.id;
      
      // Query database for pending tour_days approvals from this operator chat
      // Use order by updated_at DESC to get the most recent pending approval
      const supabase = getSupabase();
      const { data: pendingBookings, error: queryError } = await supabase
        .from('bookings')
        .select('*')
        .eq('pending_tour_days_approval', true)
        .eq('details->>operator_chat_id', String(chatId))
        .order('updated_at', { ascending: false })
        .limit(1);
      
      if (queryError) {
        console.error('[TOUR_DAYS] Error querying pending approvals:', queryError);
        return;
      }
      
      if (!pendingBookings || pendingBookings.length === 0) {
        return; // No pending approvals for this chat
      }
      
      const booking = pendingBookings[0];
      const bookingId = booking.id;
      console.log(`[TOUR_DAYS] Found pending booking: ${bookingId} (${booking.customer_name}) for chat: ${chatId}`);
      
      // Parse the number of tour days
      const tourDays = parseInt(text, 10);
      if (isNaN(tourDays) || tourDays <= 0) {
        await ctx.reply('❌ Invalid input. Please enter a positive number for tour days (e.g., "3").');
        return;
      }
      
      console.log(`[TOUR_DAYS] Received tour_days: ${tourDays} for booking: ${bookingId}`);
      
      try {
        // Update booking with tour_days, status, and clear pending flag
        await updateBooking(bookingId, {
          status: 'confirmed',
          tour_days: tourDays,
          pending_tour_days_approval: false
        });
        
        console.log(`[TOUR_DAYS] Booking updated with tour_days: ${tourDays}, status: confirmed`);
        
        // Auto-create Tour Guide account for package-tier bookings
        try {
          const accountResult = await createTourGuideAccountForBooking(
            bookingId,
            tourDays,
            {
              customer_name: booking.customer_name,
              customer_phone: booking.customer_phone,
              customer_email: booking.customer_email,
            }
          );
          
          if (accountResult.success) {
            console.log(`[TOUR_DAYS] Auto-created Tour Guide account ${accountResult.accountId} for booking ${bookingId}`);
            if (accountResult.username && accountResult.password) {
              console.log(`[TOUR_DAYS] Account credentials - Username: ${accountResult.username}, Password: ${accountResult.password}`);
            }
          } else {
            console.error(`[TOUR_DAYS] Failed to auto-create Tour Guide account for booking ${bookingId}:`, accountResult.error);
            // Log error but don't block the booking confirmation - admin can create manually as fallback
          }
        } catch (accountError) {
          console.error(`[TOUR_DAYS] Exception creating Tour Guide account for booking ${bookingId}:`, accountError);
          // Log error but don't block the booking confirmation
        }
        
        // Continue with the rest of the approval flow
        console.log("[APPROVE] Generating and uploading invoice PDF...");
        const { buffer, driveUrl } = await generateAndUploadInvoicePDF(booking);
        console.log("[APPROVE] PDF generated and uploaded - URL:", driveUrl);
        
        console.log("[APPROVE] Inserting invoice into Supabase...");
        const supabaseAdmin = getSupabaseAdmin();
        await supabaseAdmin
          .from('invoices')
          .insert({
            booking_id: bookingId,
            amount: 0,
            status: 'unpaid',
            pdf_url: driveUrl || null
          });
        console.log("[APPROVE] Invoice inserted into Supabase");
        
        // Track if this is a web booking with email for sending after ops handover
        const isWebWithEmail = booking.source === 'web' && booking.customer_email;
        
        // Send confirmation to operator chat
        if (isWebWithEmail) {
          await ctx.reply(`✅ Booking ...${bookingId.slice(-8)} approved with ${tourDays} tour days. Invoice sent via email to ${booking.customer_email}.`);
          console.log(`Booking ${bookingId} approved with ${tourDays} tour days. Invoice sent via email to ${booking.customer_email}`);
        } else if (booking.source === 'web' && !booking.customer_email) {
          const socialHandles = booking.details?.socials?.[0] || 'Not provided';
          const alertMessage =
            `⚠️ <b>No email provided. Manually contact customer:</b>\n\n` +
            `👤 <b>Name:</b> ${booking.customer_name || 'N/A'}\n` +
            `📞 <b>Phone:</b> ${booking.customer_phone || 'N/A'}\n` +
            `💬 <b>Social:</b> ${socialHandles}\n` +
            `🆔 <b>Booking ID:</b> ...${bookingId.slice(-8)}\n` +
            `📅 <b>Tour Days:</b> ${tourDays}`;

          const targetChatId = await getTargetChatId(booking.salesperson_id);
          await sendMessageWithMigrationRetry(
            getOperatorBot(),
            targetChatId,
            alertMessage,
            { parse_mode: 'HTML' }
          );

          await ctx.reply(`✅ Booking ...${bookingId.slice(-8)} approved with ${tourDays} tour days. No email. Manual contact alert sent.`);
          console.log(`Booking ${bookingId} approved with ${tourDays} tour days. No email provided. Manual contact alert sent.`);
        } else if (booking.telegram_id) {
          await getCustomerBot().api.sendDocument(
            booking.telegram_id,
            new InputFile(buffer, `invoice_${bookingId.slice(-8)}.pdf`),
            {
              caption:
                `✅ Booking confirmed!\n` +
                `📋 ID: ...${bookingId.slice(-8)}\n` +
                `📅 Tour Days: ${tourDays}\n\n` +
                `Thank you for choosing AsiaBuddy! 🌟`,
            }
          );

          await ctx.reply(`✅ Booking ...${bookingId.slice(-8)} approved with ${tourDays} tour days. Invoice sent to customer.`);
          console.log(`Booking ${bookingId} approved with ${tourDays} tour days. Invoice sent to ${booking.telegram_id}`);
        } else {
          await ctx.reply(`✅ Booking ...${bookingId.slice(-8)} approved with ${tourDays} tour days. No contact method available.`);
        }
        
      } catch (error) {
        console.error('[TOUR_DAYS] Error processing tour_days:', error);
        await ctx.reply('❌ Error processing tour days. Please try again.');
        // Clear pending flag on error to allow retry
        await updateBooking(bookingId, { pending_tour_days_approval: false });
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
    const body = await req.json();
    console.log("UPDATE RECEIVED:", JSON.stringify(body).substring(0, 100));
    
    const bot = getOperatorBot();
    await bot.init();
    await bot.handleUpdate(body);
    
    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return new Response('OK', { status: 200 });
  }
}
