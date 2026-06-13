import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const booking_id = formData.get('booking_id') as string;
    const file = formData.get('file') as File;

    // Validate required fields
    if (!booking_id || !file) {
      return NextResponse.json(
        { error: 'Missing booking_id or file' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and PDF allowed' },
        { status: 400 }
      );
    }

    // Generate file path
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const filePath = `${booking_id}/${filename}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('payment_proofs')
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      console.error('[upload] Supabase storage error:', JSON.stringify(uploadError));
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('payment_proofs')
      .getPublicUrl(filePath);

    const fileUrl = urlData.publicUrl;

    // Update bookings table
    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        details: {
          payment_proof_url: fileUrl,
          payment_proof_uploaded_at: new Date().toISOString(),
        },
      })
      .eq('id', booking_id);

    if (updateError) {
      console.error('Supabase update error:', updateError);
      // Don't fail the request if booking update fails, just log it
    }

    // Send Telegram notification to ops group
    const telegramMessage = `💳 Payment Proof Received\n\nBooking ID: ${booking_id}\nUploaded at: ${new Date().toISOString()}\n\nPlease review in the operator panel.`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.OPERATOR_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.OPS_GROUP_CHAT_ID,
          text: telegramMessage,
        }),
      }
    );

    if (!telegramResponse.ok) {
      console.error('Telegram notification failed:', await telegramResponse.text());
      // Don't fail the request if Telegram fails, just log it
    }

    return NextResponse.json({
      success: true,
      url: fileUrl,
    });
  } catch (error) {
    console.error('Upload payment proof error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
