import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// PUT - Edit landmark photo metadata (display name, country, attribution)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ photo_id: string }> }
) {
  try {
    const { photo_id } = await params;

    // Auth check - server-side session validation
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing session' },
        { status: 401 }
      );
    }

    const photoId = photo_id;

    // Parse request body
    const body = await req.json();
    const { displayName, country, altText, description, city, category } = body;

    // Validate that at least one field is provided
    if (!displayName && !country && !altText && !description && !city && !category) {
      return NextResponse.json(
        { error: 'No fields provided for update' },
        { status: 400 }
      );
    }

    // Build update object
    const updateData: Record<string, any> = {};
    if (displayName !== undefined) updateData.name = displayName;
    if (country !== undefined) updateData.country = country.toLowerCase();
    if (altText !== undefined) updateData.alt_text = altText;
    if (description !== undefined) updateData.description = description;
    if (city !== undefined) updateData.city = city;
    if (category !== undefined) updateData.category = category;

    // Update landmark record
    const { data: landmark, error: updateError } = await supabase
      .from('landmarks')
      .update(updateData)
      .eq('id', photoId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating landmark:', updateError);
      return NextResponse.json(
        { error: 'Failed to update landmark photo' },
        { status: 500 }
      );
    }

    if (!landmark) {
      return NextResponse.json(
        { error: 'Landmark photo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: landmark
    });

  } catch (error) {
    console.error('PUT landmark-photos/[photo_id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove landmark photo (blocked if still linked to any itineraries row)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ photo_id: string }> }
) {
  try {
    const { photo_id } = await params;

    // Auth check - server-side session validation
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing session' },
        { status: 401 }
      );
    }

    const photoId = photo_id;

    // Check if landmark exists
    const { data: landmark, error: fetchError } = await supabase
      .from('landmarks')
      .select('*')
      .eq('id', photoId)
      .single();

    if (fetchError || !landmark) {
      return NextResponse.json(
        { error: 'Landmark photo not found' },
        { status: 404 }
      );
    }

    // Check if landmark is linked to any itineraries
    const { data: linkedItineraries, error: checkError } = await supabase
      .from('itineraries')
      .select('id')
      .eq('landmark_id', photoId)
      .limit(1);

    if (checkError) {
      console.error('Error checking itineraries:', checkError);
      return NextResponse.json(
        { error: 'Failed to check landmark usage' },
        { status: 500 }
      );
    }

    if (linkedItineraries && linkedItineraries.length > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete landmark photo - it is still linked to one or more itineraries',
          linkedCount: linkedItineraries.length
        },
        { status: 409 }
      );
    }

    // Create admin Supabase client for storage operations
    const supabaseAdmin = createSupabaseClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Delete file from storage
    if (landmark.image_storage_path) {
      const { error: storageError } = await supabaseAdmin.storage
        .from('landmark-photos')
        .remove([landmark.image_storage_path]);

      if (storageError) {
        console.error('Error deleting file from storage:', storageError);
        // Continue with database deletion even if storage deletion fails
      }
    }

    // Delete landmark record from database
    const { error: deleteError } = await supabase
      .from('landmarks')
      .delete()
      .eq('id', photoId);

    if (deleteError) {
      console.error('Error deleting landmark from database:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete landmark photo' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Landmark photo deleted successfully'
    });

  } catch (error) {
    console.error('DELETE landmark-photos/[photo_id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}