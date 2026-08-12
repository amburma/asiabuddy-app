import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// GET - Search/list landmark photos (typeahead with ?q=)
export async function GET(req: NextRequest) {
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

    // Get search query parameter
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const country = searchParams.get('country');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query
    let dbQuery = supabase
      .from('landmarks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Add search filter if query provided
    if (query) {
      dbQuery = dbQuery.or(`name.ilike.%${query}%,alt_text.ilike.%${query}%,description.ilike.%${query}%`);
    }

    // Add country filter if provided
    if (country) {
      dbQuery = dbQuery.eq('country', country);
    }

    const { data: landmarks, error: fetchError } = await dbQuery;

    if (fetchError) {
      console.error('Error fetching landmarks:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch landmark photos' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: landmarks || [],
      count: landmarks?.length || 0
    });

  } catch (error) {
    console.error('GET landmark-photos error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Upload new landmark photo (multipart form-data: file + displayName + country)
export async function POST(req: NextRequest) {
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

    // Parse form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const displayName = formData.get('displayName') as string;
    const country = formData.get('country') as string;
    const altText = formData.get('altText') as string | null;
    const description = formData.get('description') as string | null;
    const city = formData.get('city') as string | null;
    const category = formData.get('category') as string | null;

    // Validate required fields
    if (!file || !displayName || !country) {
      return NextResponse.json(
        { error: 'Missing required fields: file, displayName, or country' },
        { status: 400 }
      );
    }

    // Validate file type (images only)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images allowed (JPEG, PNG, GIF, WebP, SVG)' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Generate slug from display name (mimicking the database trigger logic)
    let slug = displayName.toLowerCase();
    slug = slug.replace(/[^a-z0-9\s-]/g, ''); // Remove special chars except spaces and hyphens
    slug = slug.replace(/\s+/g, '-'); // Replace spaces with hyphens
    slug = slug.replace(/-+/g, '-'); // Replace multiple hyphens with single
    slug = slug.trim(); // Trim whitespace and hyphens

    // Check if landmark with this slug already exists
    const { data: existingLandmark, error: fetchError } = await supabase
      .from('landmarks')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking for existing landmark:', fetchError);
      return NextResponse.json(
        { error: 'Failed to check for existing landmark' },
        { status: 500 }
      );
    }

    // If landmark already exists, reuse it
    if (existingLandmark) {
      return NextResponse.json({
        success: true,
        data: existingLandmark,
        reused: true
      }, { status: 200 });
    }

    // Create admin Supabase client for storage operations
    const supabaseAdmin = createSupabaseClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Generate file path
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const filename = `${timestamp}_${displayName.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExtension}`;
    const filePath = `landmarks/${country}/${filename}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('landmark-photos')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Supabase storage error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file to storage' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('landmark-photos')
      .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    // Insert into landmarks table
    const { data: landmark, error: insertError } = await supabase
      .from('landmarks')
      .insert({
        name: displayName,
        alt_text: altText,
        description: description,
        image_url: imageUrl,
        image_storage_path: filePath,
        country: country.toLowerCase(),
        city: city || null,
        category: category || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting landmark record:', insertError);
      
      // Rollback: delete the uploaded file if database insert fails
      await supabaseAdmin.storage
        .from('landmark-photos')
        .remove([filePath]);
      
      return NextResponse.json(
        { error: 'Failed to create landmark record' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: landmark,
      reused: false
    }, { status: 201 });

  } catch (error) {
    console.error('POST landmark-photos error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}