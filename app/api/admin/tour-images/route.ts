import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// DELETE - Remove a file from the tour-images Storage bucket
export async function DELETE(req: NextRequest) {
  try {
    // Auth check - server-side session validation
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing session' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { imageUrl } = body;

    // Validate required field
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Missing required field: imageUrl' },
        { status: 400 }
      );
    }

    // Extract storage path from the public URL
    // The URL format is: https://[project].supabase.co/storage/v1/object/public/tour-images/[filename]
    const marker = '/public/tour-images/';
    const markerIndex = imageUrl.indexOf(marker);
    
    if (markerIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid image URL format - cannot extract storage path' },
        { status: 400 }
      );
    }

    const storagePath = imageUrl.substring(markerIndex + marker.length);
    console.log('[DELETE TOUR IMAGE] Extracted storage path:', storagePath);

    // Delete the file from Storage
    const { data: deleteData, error: deleteError } = await supabase
      .storage
      .from('tour-images')
      .remove([storagePath]);

    console.log('[DELETE TOUR IMAGE] Storage remove result:', {
      data: deleteData,
      error: deleteError
    });

    if (deleteError) {
      console.error('[DELETE TOUR IMAGE] Error deleting file from Storage:', deleteError);
      return NextResponse.json(
        { error: `Failed to delete file from Storage: ${deleteError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully from tour-images bucket'
    });

  } catch (error) {
    console.error('[DELETE TOUR IMAGE] Internal server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
