import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// PUT - Link an existing library photo to this itinerary day
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ itinerary_id: string }> }
) {
  try {
    const { itinerary_id } = await params;

    // Auth check - server-side session validation
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing session' },
        { status: 401 }
      );
    }

    const itineraryId = itinerary_id;

    // Parse request body
    const body = await req.json();
    const { photo_id } = body;

    // Validate required field
    if (!photo_id) {
      return NextResponse.json(
        { error: 'Missing required field: photo_id' },
        { status: 400 }
      );
    }

    // Verify that the landmark photo exists
    const { data: landmark, error: landmarkError } = await supabase
      .from('landmarks')
      .select('id, image_url')
      .eq('id', photo_id)
      .single();

    if (landmarkError || !landmark) {
      return NextResponse.json(
        { error: 'Landmark photo not found' },
        { status: 404 }
      );
    }

    // Verify that the itinerary exists
    const { data: itinerary, error: itineraryError } = await supabase
      .from('itineraries')
      .select('id')
      .eq('id', itineraryId)
      .single();

    if (itineraryError || !itinerary) {
      return NextResponse.json(
        { error: 'Itinerary not found' },
        { status: 404 }
      );
    }

    // Update itinerary to link the landmark photo
    const { data: updatedItinerary, error: updateError } = await supabase
      .from('itineraries')
      .update({ 
        landmark_id: photo_id,
        image_url: landmark.image_url // Also update image_url for backwards compatibility
      })
      .eq('id', itineraryId)
      .select()
      .single();

    if (updateError) {
      console.error('Error linking photo to itinerary:', updateError);
      return NextResponse.json(
        { error: 'Failed to link photo to itinerary' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedItinerary
    });

  } catch (error) {
    console.error('PUT itineraries/[itinerary_id]/photo error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Unlink photo from itinerary and clean up orphaned landmarks
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ itinerary_id: string }> }
) {
  try {
    const { itinerary_id } = await params;

    // Auth check - server-side session validation
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing session' },
        { status: 401 }
      );
    }

    const itineraryId = itinerary_id;

    // Verify that the itinerary exists and capture the current landmark_id
    const { data: itinerary, error: itineraryError } = await supabase
      .from('itineraries')
      .select('id, landmark_id')
      .eq('id', itineraryId)
      .single();

    if (itineraryError || !itinerary) {
      return NextResponse.json(
        { error: 'Itinerary not found' },
        { status: 404 }
      );
    }

    const currentLandmarkId = itinerary.landmark_id;
    console.log('[DELETE PHOTO] Captured landmark_id before unlinking:', currentLandmarkId);

    // Update itinerary to unlink the landmark photo
    const { data: updatedItinerary, error: updateError } = await supabase
      .from('itineraries')
      .update({ 
        landmark_id: null,
        image_url: null // Also clear image_url for consistency
      })
      .eq('id', itineraryId)
      .select()
      .single();

    console.log('[DELETE PHOTO] Unlink update result:', { 
      success: !updateError, 
      error: updateError, 
      data: updatedItinerary 
    });

    if (updateError) {
      console.error('Error unlinking photo from itinerary:', updateError);
      return NextResponse.json(
        { error: 'Failed to unlink photo from itinerary' },
        { status: 500 }
      );
    }

    // If there was a landmark linked, check if it's orphaned
    if (currentLandmarkId) {
      console.log('[DELETE PHOTO] Checking for other itineraries referencing landmark_id:', currentLandmarkId);
      
      // Check if any other itineraries still reference this landmark
      const { data: otherReferences, error: refError } = await supabase
        .from('itineraries')
        .select('id')
        .eq('landmark_id', currentLandmarkId);

      console.log('[DELETE PHOTO] Reference check query result:', {
        query: `SELECT id FROM itineraries WHERE landmark_id = '${currentLandmarkId}'`,
        data: otherReferences,
        count: otherReferences?.length || 0,
        error: refError
      });

      if (refError) {
        console.error('Error checking landmark references:', refError);
        // Continue anyway - we've already unlinked successfully
      }

      const isOrphaned = !otherReferences || otherReferences.length === 0;
      console.log('[DELETE PHOTO] Is landmark orphaned?', isOrphaned);

      if (isOrphaned) {
        // Get the landmark details including storage path
        const { data: landmark, error: landmarkError } = await supabase
          .from('landmarks')
          .select('id, image_storage_path')
          .eq('id', currentLandmarkId)
          .single();

        if (!landmarkError && landmark) {
          console.log('[DELETE PHOTO] About to delete landmark from landmarks table, id:', currentLandmarkId);
          
          // Delete from landmarks table
          const { data: deleteData, error: deleteError } = await supabase
            .from('landmarks')
            .delete()
            .eq('id', currentLandmarkId);

          console.log('[DELETE PHOTO] Landmarks table delete result:', {
            data: deleteData,
            error: deleteError
          });

          if (deleteError) {
            console.error('Error deleting landmark from table:', deleteError);
          } else {
            console.log('[DELETE PHOTO] About to delete file from Storage bucket, path:', landmark.image_storage_path);
            
            // Create admin Supabase client for storage operations
            const supabaseAdmin = createSupabaseClient(
              process.env.SUPABASE_URL!,
              process.env.SUPABASE_SERVICE_ROLE_KEY!
            );
            
            // Delete from Storage bucket
            const { data: storageData, error: storageError } = await supabaseAdmin
              .storage
              .from('landmark-photos')
              .remove([landmark.image_storage_path]);

            console.log('[DELETE PHOTO] Storage remove result:', {
              data: storageData,
              error: storageError
            });

            if (storageError) {
              console.error('Error deleting file from Storage:', storageError);
            }
          }
        }

        const response = {
          success: true,
          data: updatedItinerary,
          unlinked: true,
          deleted: true,
          message: 'Photo unlinked and deleted from library'
        };
        console.log('[DELETE PHOTO] Returning response to client (orphaned deleted):', response);
        return NextResponse.json(response);
      } else {
        // Landmark is still used by other itineraries
        const response = {
          success: true,
          data: updatedItinerary,
          unlinked: true,
          deleted: false,
          reason: 'still used by another tour',
          message: 'Photo unlinked but kept in library (used by another tour)'
        };
        console.log('[DELETE PHOTO] Returning response to client (not orphaned):', response);
        return NextResponse.json(response);
      }
    }

    const response = {
      success: true,
      data: updatedItinerary,
      unlinked: true,
      deleted: false,
      message: 'Photo unlinked from itinerary successfully'
    };
    console.log('[DELETE PHOTO] Returning response to client (no landmark was linked):', response);
    return NextResponse.json(response);

  } catch (error) {
    console.error('DELETE itineraries/[itinerary_id]/photo error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}