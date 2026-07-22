'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '../../lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Pencil, Trash2, X, ChevronDown, ChevronRight, GripVertical, Upload, ArrowUp, ArrowDown, ImagePlus } from 'lucide-react';

export const dynamic = 'force-dynamic';

const COUNTRIES = [
  { id: 'thailand', name: 'Thailand', flag: 'TH' },
  { id: 'singapore', name: 'Singapore', flag: 'SG' },
  { id: 'japan', name: 'Japan', flag: 'JP' },
];

const CURRENCIES = ['USD', 'THB', 'SGD', 'JPY', 'EUR'];

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function generateSlug(text: string): string {
  return text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toArray(text: string): string[] {
  return text.split('\n').map(s => s.trim()).filter(Boolean);
}

function extractStoragePath(url: string, bucketName: string): string | null {
  if (!url) return null;
  const marker = `/public/${bucketName}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.substring(index + marker.length);
}

export default function GlobalAdminPage() {
  const router = useRouter();
  const supabase = useMemo(() => {
    console.log('ENV_CHECK_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('ENV_CHECK_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'KEY_PRESENT' : 'KEY_MISSING')
    console.log('MEMO_RUNNING: useMemo executed')
    return createClient()
  }, []);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('thailand');
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Tours state
  const [toursItems, setToursItems] = useState<any[]>([]);
  const [showToursForm, setShowToursForm] = useState(true);
  const [toursTitle, setToursTitle] = useState('');
  const [toursSlug, setToursSlug] = useState('');
  const [toursCountry, setToursCountry] = useState('thailand');
  const [toursShortDesc, setToursShortDesc] = useState('');
  const [toursPriceFrom, setToursPriceFrom] = useState('');
  const [toursCurrency, setToursCurrency] = useState('USD');
  const [toursDurationDays, setToursDurationDays] = useState('');
  const [toursDurationNights, setToursDurationNights] = useState('');
  const [toursGroupSizeMax, setToursGroupSizeMax] = useState('');
  const [toursFeatured, setToursFeatured] = useState(false);
  const [toursDestinationId, setToursDestinationId] = useState('');
  const [toursHighlights, setToursHighlights] = useState<string[]>([]);
  const [toursHighlightsInput, setToursHighlightsInput] = useState('');
  const [toursInclusions, setToursInclusions] = useState<string[]>([]);
  const [toursInclusionsInput, setToursInclusionsInput] = useState('');
  const [toursExclusions, setToursExclusions] = useState<string[]>([]);
  const [toursExclusionsInput, setToursExclusionsInput] = useState('');
  const [toursStatus, setToursStatus] = useState('draft');
  const [tourImageUrls, setTourImageUrls] = useState<string[]>([]);
  const [tourImageInput, setTourImageInput] = useState('');
  const [tourUploadStatus, setTourUploadStatus] = useState<'idle' | 'uploading' | 'done'>('idle');
  const [itineraryDays, setItineraryDays] = useState<any[]>([]);
  const [tourSectionOpen, setTourSectionOpen] = useState<Record<string, boolean>>({
    basics: true,
    pricing: true,
    highlights: true,
    images: true,
    itinerary: true,
  });
  const [tourValidationErrors, setTourValidationErrors] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Destinations state
  const [destinationsItems, setDestinationsItems] = useState<any[]>([]);
  const [showDestForm, setShowDestForm] = useState(false);
  const [destName, setDestName] = useState('');
  const [destSlug, setDestSlug] = useState('');
  const [destShortDescription, setDestShortDescription] = useState('');
  const [destDescription, setDestDescription] = useState('');
  const [destMustVisit, setDestMustVisit] = useState('');
  const [destActivities, setDestActivities] = useState('');
  const [destDining, setDestDining] = useState('');
  const [destHiddenGems, setDestHiddenGems] = useState('');
  const [destExperiences, setDestExperiences] = useState('');
  const [destImages, setDestImages] = useState('');
  const [destImagePreview, setDestImagePreview] = useState('');
  const [destFeatured, setDestFeatured] = useState(false);
  const [destNameMm, setDestNameMm] = useState('');
  const [destNameTh, setDestNameTh] = useState('');
  const [destDescMm, setDestDescMm] = useState('');
  const [destDescTh, setDestDescTh] = useState('');

  // Posts state
  const [postsItems, setPostsItems] = useState<any[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postAuthor, setPostAuthor] = useState('AsiaBuddy Team');
  const [postCoverImage, setPostCoverImage] = useState('');
  const [postImages, setPostImages] = useState('');
  const [blogImagePreview, setBlogImagePreview] = useState('');
  const [postPublished, setPostPublished] = useState(false);

  // Itineraries state
  const [itineraryItems, setItineraryItems] = useState<any[]>([]);
  const [showItinForm, setShowItinForm] = useState(false);
  const [itinTourId, setItinTourId] = useState('');
  const [itinDayNumber, setItinDayNumber] = useState('');
  const [itinSortOrder, setItinSortOrder] = useState('');
  const [itinTitle, setItinTitle] = useState('');
  const [itinContent, setItinContent] = useState('');
  const [itinHighlights, setItinHighlights] = useState('');
  const [itinMeals, setItinMeals] = useState('');
  const [itinAccommodation, setItinAccommodation] = useState('');
  // Two image states: user-provided URL and uploaded file URL (file takes priority)
  const [itinImageUrlInput, setItinImageUrlInput] = useState('');
  const [itinUploadedUrl, setItinUploadedUrl] = useState('');
  const [itinUploadSuccess, setItinUploadSuccess] = useState(false);

  // Auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: any) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  // Fetch all data when selectedCountry changes
  useEffect(() => {
    fetchTours();
    fetchDestinations();
    fetchPosts();
    fetchItineraries();
  }, [selectedCountry]);

  const fetchTours = async () => {
    const { data } = await supabase
      .from('tours')
      .select('*')
      .eq('country', selectedCountry)
      .order('created_at', { ascending: false });
    setToursItems(data || []);
  };

  const fetchDestinations = async () => {
    const { data } = await supabase
      .from('destinations')
      .select('*')
      .eq('country', selectedCountry)
      .order('display_order', { ascending: true });
    setDestinationsItems(data || []);
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('country', selectedCountry)
      .order('created_at', { ascending: false });
    setPostsItems(data || []);
  };

  const fetchItineraries = async () => {
    const { data } = await supabase
      .from('itineraries')
      .select('*, tours(title, country)')
      .order('tour_id', { ascending: true })
      .order('day_number', { ascending: true });
    setItineraryItems(data || []);
  };

  const uploadImageToStorage = async (file: File, bucket: string, folder?: string): Promise<string | null> => {
    setUploadingImage(true);
    try {
      const ext = file.name.split('.').pop();
      const sanitizedBase = file.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
      const uniqueFileName = `${Date.now()}-${sanitizedBase}.${ext}`;
      const uploadPath = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

      const { error: uploadError } = await supabase.storage.from(bucket).upload(uploadPath, file, { upsert: true });
      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        setError(`Upload failed: ${uploadError.message}`);
        return null;
      }
      
      const { data } = supabase.storage.from(bucket).getPublicUrl(uploadPath);
      return data.publicUrl;
    } catch (e: any) {
      console.error('uploadImageToStorage error:', e);
      setError(`Upload error: ${e.message}`);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const resetToursForm = () => {
    setToursTitle('');
    setToursSlug('');
    setToursCountry(selectedCountry);
    setToursShortDesc('');
    setToursPriceFrom('');
    setToursCurrency('USD');
    setToursDurationDays('');
    setToursDurationNights('');
    setToursGroupSizeMax('');
    setToursFeatured(false);
    setToursDestinationId('');
    setToursHighlights([]);
    setToursHighlightsInput('');
    setToursInclusions([]);
    setToursInclusionsInput('');
    setToursExclusions([]);
    setToursExclusionsInput('');
    setToursStatus('draft');
    setTourImageUrls([]);
    setTourImageInput('');
    setTourUploadStatus('idle');
    setItineraryDays([]);
    setTourSectionOpen({ basics: true, pricing: true, highlights: true, images: true, itinerary: true });
    setShowToursForm(true);
    setEditing(null);
    setSuccess('');
    setError('');
    setTourValidationErrors({});
    setSaveSuccess(false);
  };

  const resetDestForm = () => {
    setDestName(''); setDestSlug(''); setDestShortDescription('');
    setDestDescription(''); setDestMustVisit(''); setDestDining('');
    setDestActivities(''); setDestHiddenGems(''); setDestExperiences('');
    setDestImages(''); setDestImagePreview(''); setDestFeatured(false);
    setShowDestForm(false); setEditing(null);
    setSuccess(''); setError('');
  };

  const resetPostForm = () => {
    setPostTitle(''); setPostSlug(''); setPostExcerpt('');
    setPostContent(''); setPostAuthor('AsiaBuddy Team');
    setPostCoverImage(''); setPostImages(''); setBlogImagePreview(''); setPostPublished(false);
    setShowPostForm(false); setEditing(null);
    setSuccess(''); setError('');
  };

  const saveTour = async () => {
    setPublishing(true);
    setError('');
    setSuccess('');
    setTourValidationErrors({});
    setSaveSuccess(false);

    // Step 1: Validation
    const errors: Record<string, string> = {};
    if (!toursTitle.trim()) errors.title = 'Tour title is required';
    if (!toursSlug.trim()) errors.slug = 'Slug is required';
    if (!toursPriceFrom || parseFloat(toursPriceFrom) <= 0) errors.price_from = 'Price is required';
    const country = toursCountry.trim() || 'thailand';
    const durationDays = parseInt(toursDurationDays);
    if (!durationDays || durationDays < 1) errors.duration_days = 'Duration must be at least 1 day';

    if (Object.keys(errors).length > 0) {
      setTourValidationErrors(errors);
      setPublishing(false);
      return;
    }

    try {
      // Step 2: Save tour to Supabase
      const tourData = {
        title: toursTitle.trim(),
        slug: toursSlug.trim(),
        short_description: toursShortDesc.trim() || null,
        description: null,
        price_from: parseFloat(toursPriceFrom),
        currency: toursCurrency || 'USD',
        duration_days: durationDays,
        duration_nights: parseInt(toursDurationNights) || 0,
        group_size_max: parseInt(toursGroupSizeMax) || null,
        images: tourImageUrls,
        highlights: toursHighlights,
        inclusions: toursInclusions,
        exclusions: toursExclusions,
        featured: toursFeatured,
        destination_id: toursDestinationId || null,
        country: country,
        status: toursStatus || 'draft',
      };

      let tourId: string;
      if (editing) {
        // EDIT mode
        const { data, error: updateError } = await supabase
          .from('tours')
          .update(tourData)
          .eq('id', editing.id)
          .select();
        if (updateError) {
          setError(`Failed to update tour: ${updateError.message}`);
          setPublishing(false);
          return;
        }
        tourId = editing.id;
      } else {
        // CREATE mode
        const { data, error: insertError } = await supabase
          .from('tours')
          .insert([tourData])
          .select();
        if (insertError) {
          setError(`Failed to create tour: ${insertError.message}`);
          setPublishing(false);
          return;
        }
        tourId = data[0].id;
      }

      // Step 3: Save itinerary days
      if (editing) {
        // Delete existing itinerary rows first
        await supabase.from('itineraries').delete().eq('tour_id', tourId);
      }

      const itineraryRows = itineraryDays.map((day, index) => ({
        tour_id: tourId,
        day_number: day.day_number,
        title: day.title || '',
        content: day.content || '',
        highlights: day.highlights || [],
        meals_included: Object.entries(day.meals || {})
          .filter(([_, checked]) => checked)
          .map(([meal]) => meal.charAt(0).toUpperCase() + meal.slice(1))
          .join(','),
        accommodation: day.accommodation || '',
        image_url: day.image_url || null,
        sort_order: index,
      }));

      if (itineraryRows.length > 0) {
        const { error: itinError } = await supabase
          .from('itineraries')
          .insert(itineraryRows);
        if (itinError) {
          setError(`Failed to save itinerary: ${itinError.message}`);
          setPublishing(false);
          return;
        }
      }

      // Step 4: After successful save
      setSaveSuccess(true);
      setSuccess('✅ Tour saved successfully!');
      fetchTours();
      
      if (!editing) {
        resetToursForm();
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(`An error occurred: ${err?.message || 'Unknown error'}`);
    } finally {
      setPublishing(false);
    }
  };

  const resetItinForm = () => {
    setItinTourId(''); setItinDayNumber(''); setItinSortOrder('');
    setItinTitle(''); setItinContent(''); setItinHighlights('');
    setItinMeals(''); setItinAccommodation(''); setItinImageUrlInput(''); setItinUploadedUrl(''); setItinUploadSuccess(false);
    setShowItinForm(false); setEditing(null);
    setSuccess(''); setError('');
  };

  const handleDestinationReorder = async (index: number, direction: 'up' | 'down') => {
    const list = [...destinationsItems];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= list.length) return;

    const itemA = list[index];
    const itemB = list[swapIndex];

    const orderA = itemA.display_order ?? index;
    const orderB = itemB.display_order ?? swapIndex;

    const newList = [...list];
    newList[index] = { ...itemA, display_order: orderB };
    newList[swapIndex] = { ...itemB, display_order: orderA };
    newList.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    setDestinationsItems(newList);

    const [resA, resB] = await Promise.all([
      supabase.from('destinations').update({ display_order: orderB }).eq('id', itemA.id),
      supabase.from('destinations').update({ display_order: orderA }).eq('id', itemB.id),
    ]);

    if (resA.error || resB.error) {
      console.error('Reorder failed:', resA.error || resB.error);
      fetchDestinations();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) {
        setLoginError(error.message);
      } else if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
        setLoginEmail('');
        setLoginPassword('');
      }
    } catch (err: any) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!isLoggedIn) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">AsiaBuddy Admin</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to access the admin dashboard</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              placeholder="admin@example.com"
              className={inputCls}
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              className={inputCls}
              required
            />
          </div>
          
          {loginError && (
            <p className="text-red-500 text-sm">{loginError}</p>
          )}
          
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50"
          >
            {loginLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div>
          <h1 className="text-lg font-bold text-gray-800">AsiaBuddy Admin</h1>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-red-400 font-medium hover:underline"
        >
          <LogOut size={13} /> Logout
        </button>
      </header>

      {/* COUNTRY SELECTOR */}
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 mb-6">
          <label className="text-sm font-bold text-gray-700 whitespace-nowrap">
            Managing Country:
          </label>
          <select
            value={selectedCountry}
            onChange={e => {
              setSelectedCountry(e.target.value);
              resetToursForm();
              resetDestForm();
              resetPostForm();
              resetItinForm();
            }}
            className={inputCls}
          >
            {COUNTRIES.map(c => (
              <option key={c.id} value={c.id}>
                [{c.flag}] {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TOURS + ITINERARY EDITOR */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Tour + Itinerary Editor</h2>
              <p className="text-sm text-gray-500">A unified workspace for tour basics, pricing, highlights, images, and day-by-day itinerary planning.</p>
            </div>
            <button
              onClick={() => {
                resetToursForm();
                setShowToursForm(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              <Plus size={16} /> Add New Tour
            </button>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_0.9fr]">
              <div className="space-y-4">
                {saveSuccess && (
                  <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    <span>✅ Tour saved successfully!</span>
                    <button onClick={() => setSaveSuccess(false)} className="rounded-full p-1 hover:bg-emerald-100">
                      <X size={15} />
                    </button>
                  </div>
                )}
                {editing && (
                  <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    <span>Editing: {editing.title}</span>
                    <button onClick={resetToursForm} className="rounded-full p-1 hover:bg-amber-100">
                      <X size={15} />
                    </button>
                  </div>
                )}

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-gray-800 px-4 py-3 text-left text-sm font-semibold text-white"
                    onClick={() => setTourSectionOpen(prev => ({ ...prev, basics: !prev.basics }))}
                  >
                    <span>📋 Tour Basics</span>
                    {tourSectionOpen.basics ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {tourSectionOpen.basics && (
                    <div className="space-y-4 bg-white p-5">
                      <Field label="Title *">
                        <input
                          value={toursTitle}
                          onChange={e => {
                            setToursTitle(e.target.value);
                            setToursSlug(generateSlug(e.target.value));
                            if (tourValidationErrors.title) {
                              setTourValidationErrors(prev => ({ ...prev, title: '' }));
                            }
                          }}
                          placeholder="e.g. Pattaya–Khao Yai–Bangkok 5D4N"
                          className={`${inputCls} text-base ${tourValidationErrors.title ? 'border-red-300 focus:ring-red-400' : ''}`}
                        />
                        {tourValidationErrors.title && <p className="mt-1 text-sm text-red-500">{tourValidationErrors.title}</p>}
                      </Field>

                      <Field label="Slug">
                        <input value={toursSlug} onChange={e => { setToursSlug(generateSlug(e.target.value)); if (tourValidationErrors.slug) { setTourValidationErrors(prev => ({ ...prev, slug: '' })); } }} placeholder="pattaya-khao-yai-bangkok-5d4n" className={`${inputCls} bg-gray-50 ${tourValidationErrors.slug ? 'border-red-300 focus:ring-red-400' : ''}`} />
                        {tourValidationErrors.slug && <p className="mt-1 text-sm text-red-500">{tourValidationErrors.slug}</p>}
                      </Field>

                      <Field label="Short Description">
                        <textarea value={toursShortDesc} onChange={e => setToursShortDesc(e.target.value)} rows={2} placeholder="A short summary for the tour card" className={`${inputCls} resize-none`} />
                      </Field>

                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Country">
                          <input value={toursCountry} onChange={e => setToursCountry(e.target.value)} placeholder="thailand" className={inputCls} />
                        </Field>
                        <Field label="Status">
                          <select value={toursStatus} onChange={e => setToursStatus(e.target.value)} className={inputCls}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </Field>
                      </div>

                      <Field label="Featured">
                        <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700">
                          <input type="checkbox" checked={toursFeatured} onChange={e => setToursFeatured(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400" />
                          Show in Featured Tours
                        </label>
                      </Field>
                    </div>
                  )}
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-gray-800 px-4 py-3 text-left text-sm font-semibold text-white"
                    onClick={() => setTourSectionOpen(prev => ({ ...prev, pricing: !prev.pricing }))}
                  >
                    <span>💰 Pricing & Details</span>
                    {tourSectionOpen.pricing ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {tourSectionOpen.pricing && (
                    <div className="space-y-4 bg-white p-5">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Field label="Price From">
                          <input type="number" value={toursPriceFrom} onChange={e => { setToursPriceFrom(e.target.value); if (tourValidationErrors.price_from) { setTourValidationErrors(prev => ({ ...prev, price_from: '' })); } }} placeholder="299" className={`${inputCls} ${tourValidationErrors.price_from ? 'border-red-300 focus:ring-red-400' : ''}`} />
                          {tourValidationErrors.price_from && <p className="mt-1 text-sm text-red-500">{tourValidationErrors.price_from}</p>}
                        </Field>
                        <Field label="Currency">
                          <select value={toursCurrency} onChange={e => setToursCurrency(e.target.value)} className={inputCls}>
                            {CURRENCIES.filter(currency => ['USD', 'THB', 'SGD', 'JPY'].includes(currency)).map(currency => (
                              <option key={currency} value={currency}>{currency}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Duration Days">
                          <input type="number" value={toursDurationDays} onChange={e => { setToursDurationDays(e.target.value); if (tourValidationErrors.duration_days) { setTourValidationErrors(prev => ({ ...prev, duration_days: '' })); } }} placeholder="5" className={`${inputCls} ${tourValidationErrors.duration_days ? 'border-red-300 focus:ring-red-400' : ''}`} />
                          {tourValidationErrors.duration_days && <p className="mt-1 text-sm text-red-500">{tourValidationErrors.duration_days}</p>}
                        </Field>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Field label="Duration Nights">
                          <input type="number" value={toursDurationNights} onChange={e => setToursDurationNights(e.target.value)} placeholder="4" className={inputCls} />
                        </Field>
                        <Field label="Max Group Size">
                          <input type="number" value={toursGroupSizeMax} onChange={e => setToursGroupSizeMax(e.target.value)} placeholder="12" className={inputCls} />
                        </Field>
                        <Field label="Destination">
                          <select value={toursDestinationId} onChange={e => setToursDestinationId(e.target.value)} className={inputCls}>
                            <option value="">Select destination</option>
                            {destinationsItems.map(destination => (
                              <option key={destination.id} value={destination.id}>{destination.name}</option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    </div>
                  )}
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-gray-800 px-4 py-3 text-left text-sm font-semibold text-white"
                    onClick={() => setTourSectionOpen(prev => ({ ...prev, highlights: !prev.highlights }))}
                  >
                    <span>✅ What&apos;s Included</span>
                    {tourSectionOpen.highlights ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {tourSectionOpen.highlights && (
                    <div className="space-y-5 bg-white p-5">
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">Highlights</label>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <input value={toursHighlightsInput} onChange={e => setToursHighlightsInput(e.target.value)} placeholder="Temple visit" className={inputCls} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const value = toursHighlightsInput.trim(); if (value) { setToursHighlights(prev => [...prev, value]); setToursHighlightsInput(''); } } }} />
                          <button type="button" onClick={() => { const value = toursHighlightsInput.trim(); if (value) { setToursHighlights(prev => [...prev, value]); setToursHighlightsInput(''); } }} className="rounded-lg border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-600 transition hover:bg-amber-50">Add</button>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {toursHighlights.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700">
                              {tag}
                              <button type="button" onClick={() => setToursHighlights(prev => prev.filter(item => item !== tag))}>
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">Inclusions</label>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <input value={toursInclusionsInput} onChange={e => setToursInclusionsInput(e.target.value)} placeholder="Airport transfer" className={inputCls} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const value = toursInclusionsInput.trim(); if (value) { setToursInclusions(prev => [...prev, value]); setToursInclusionsInput(''); } } }} />
                          <button type="button" onClick={() => { const value = toursInclusionsInput.trim(); if (value) { setToursInclusions(prev => [...prev, value]); setToursInclusionsInput(''); } }} className="rounded-lg border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-600 transition hover:bg-amber-50">Add</button>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {toursInclusions.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
                              {tag}
                              <button type="button" onClick={() => setToursInclusions(prev => prev.filter(item => item !== tag))}>
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">Exclusions</label>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <input value={toursExclusionsInput} onChange={e => setToursExclusionsInput(e.target.value)} placeholder="International flight" className={inputCls} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const value = toursExclusionsInput.trim(); if (value) { setToursExclusions(prev => [...prev, value]); setToursExclusionsInput(''); } } }} />
                          <button type="button" onClick={() => { const value = toursExclusionsInput.trim(); if (value) { setToursExclusions(prev => [...prev, value]); setToursExclusionsInput(''); } }} className="rounded-lg border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-600 transition hover:bg-amber-50">Add</button>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {toursExclusions.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-sm text-rose-700">
                              {tag}
                              <button type="button" onClick={() => setToursExclusions(prev => prev.filter(item => item !== tag))}>
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-gray-800 px-4 py-3 text-left text-sm font-semibold text-white"
                    onClick={() => setTourSectionOpen(prev => ({ ...prev, images: !prev.images }))}
                  >
                    <span>🖼️ Tour Images</span>
                    {tourSectionOpen.images ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {tourSectionOpen.images && (
                    <div className="space-y-4 bg-white p-5">
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <input value={tourImageInput} onChange={e => setTourImageInput(e.target.value)} placeholder="Paste an image URL" className={inputCls} />
                        <button type="button" onClick={() => { const value = tourImageInput.trim(); if (value) { setTourImageUrls(prev => prev.includes(value) ? prev : [...prev, value]); setTourImageInput(''); } }} className="rounded-lg border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-600 transition hover:bg-amber-50">Add Image</button>
                      </div>
                      <div className="rounded-lg border border-dashed border-gray-200 p-3">
                        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
                          <Upload size={16} />
                          Upload from device
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setTourUploadStatus('uploading');
                              const url = await uploadImageToStorage(file, 'tour-images');
                              if (url) {
                                setTourImageUrls(prev => prev.includes(url) ? prev : [...prev, url]);
                                setTourUploadStatus('done');
                              } else {
                                setTourUploadStatus('idle');
                              }
                            }}
                            disabled={uploadingImage}
                          />
                        </label>
                        {tourUploadStatus === 'uploading' && <p className="mt-2 text-xs font-medium text-amber-600">Uploading...</p>}
                        {tourUploadStatus === 'done' && <p className="mt-2 text-xs font-medium text-emerald-600">✓ Done</p>}
                      </div>
                      {tourImageUrls.length > 0 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {tourImageUrls.map((image, index) => (
                            <div key={`${image}-${index}`} className="relative shrink-0">
                              <img src={image} alt={`Tour preview ${index + 1}`} className="h-24 w-32 rounded-lg border border-gray-200 object-cover" />
                              <button type="button" onClick={() => setTourImageUrls(prev => prev.filter(item => item !== image))} className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white">
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-gray-800 px-4 py-3 text-left text-sm font-semibold text-white"
                    onClick={() => setTourSectionOpen(prev => ({ ...prev, itinerary: !prev.itinerary }))}
                  >
                    <span>🗓️ Day-by-Day Itinerary</span>
                    {tourSectionOpen.itinerary ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {tourSectionOpen.itinerary && (
                    <div className="space-y-4 bg-white p-5">
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                        Build your itinerary below. Reorder days with the arrow buttons.
                      </div>
                      {itineraryDays.map((day, index) => (
                        <div key={day.id} className="rounded-lg border border-l-4 border-l-amber-400 bg-white p-4 shadow-sm">
                          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                              <GripVertical size={16} className="text-gray-400" />
                              <span className="text-sm font-semibold text-gray-700">Day {String(day.day_number).padStart(2, '0')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button type="button" className="rounded-lg border border-gray-200 px-2 py-1 text-gray-500 hover:text-gray-700" onClick={() => { const list = [...itineraryDays]; const swapIndex = index - 1; if (swapIndex < 0) return; [list[index], list[swapIndex]] = [list[swapIndex], list[index]]; list.forEach((item, itemIndex) => { item.day_number = itemIndex + 1; }); setItineraryDays(list); }}>
                                <ArrowUp size={14} />
                              </button>
                              <button type="button" className="rounded-lg border border-gray-200 px-2 py-1 text-gray-500 hover:text-gray-700" onClick={() => { const list = [...itineraryDays]; const swapIndex = index + 1; if (swapIndex >= list.length) return; [list[index], list[swapIndex]] = [list[swapIndex], list[index]]; list.forEach((item, itemIndex) => { item.day_number = itemIndex + 1; }); setItineraryDays(list); }}>
                                <ArrowDown size={14} />
                              </button>
                              <button type="button" className="rounded-lg border border-red-200 px-2 py-1 text-red-500 hover:bg-red-50" onClick={() => setItineraryDays(prev => prev.filter(item => item.id !== day.id).map((item, itemIndex) => ({ ...item, day_number: itemIndex + 1 }))) }>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <Field label="Day Title">
                            <input value={day.title} onChange={e => setItineraryDays(prev => prev.map(item => item.id === day.id ? { ...item, title: e.target.value } : item))} placeholder="e.g. Bangkok temple & food trail" className={inputCls} />
                          </Field>
                          <Field label="Content">
                            <textarea value={day.content} onChange={e => setItineraryDays(prev => prev.map(item => item.id === day.id ? { ...item, content: e.target.value } : item))} rows={4} placeholder="Describe the day in detail" className={`${inputCls} resize-none`} />
                          </Field>

                          <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">Highlights</label>
                            <div className="flex flex-col gap-2 sm:flex-row">
                              <input value={day.highlightsInput || ''} onChange={e => setItineraryDays(prev => prev.map(item => item.id === day.id ? { ...item, highlightsInput: e.target.value } : item))} placeholder="Add a highlight" className={inputCls} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const value = (day.highlightsInput || '').trim(); if (!value) return; setItineraryDays(prev => prev.map(item => item.id === day.id ? { ...item, highlights: [...item.highlights, value], highlightsInput: '' } : item)); } }} />
                              <button type="button" onClick={() => { const value = (day.highlightsInput || '').trim(); if (!value) return; setItineraryDays(prev => prev.map(item => item.id === day.id ? { ...item, highlights: [...item.highlights, value], highlightsInput: '' } : item)); }} className="rounded-lg border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-600 transition hover:bg-amber-50">Add</button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {(day.highlights || []).map((tag: string) => (
                                <span key={tag} className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700">
                                  {tag}
                                  <button type="button" onClick={() => setItineraryDays(prev => prev.map(item => item.id === day.id ? { ...item, highlights: item.highlights.filter((entry: string) => entry !== tag) } : item))}>
                                    <X size={12} />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>

                          <Field label="Meals">
                            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                              {(['Breakfast', 'Lunch', 'Dinner'] as const).map(meal => (
                                <label key={meal} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                                  <input type="checkbox" checked={day.meals?.[meal.toLowerCase() as keyof typeof day.meals] || false} onChange={e => setItineraryDays(prev => prev.map(item => item.id === day.id ? { ...item, meals: { ...item.meals, [meal.toLowerCase()]: e.target.checked } } : item))} className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400" />
                                  {meal}
                                </label>
                              ))}
                            </div>
                          </Field>

                          <Field label="Accommodation">
                            <input value={day.accommodation || ''} onChange={e => setItineraryDays(prev => prev.map(item => item.id === day.id ? { ...item, accommodation: e.target.value } : item))} placeholder="Hotel name or Not included" className={inputCls} />
                          </Field>

                          <Field label="Image URL">
                            <div className="flex flex-col gap-2 sm:flex-row">
                              <input value={day.image_url || ''} onChange={e => setItineraryDays(prev => prev.map(item => item.id === day.id ? { ...item, image_url: e.target.value } : item))} placeholder="Paste a day image URL" className={inputCls} />
                              <button type="button" className="rounded-lg border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-600 transition hover:bg-amber-50">
                                <span className="flex items-center gap-2"><ImagePlus size={14} /> Preview</span>
                              </button>
                            </div>
                          </Field>
                        </div>
                      ))}

                      <button type="button" onClick={() => setItineraryDays(prev => [...prev, { id: `${Date.now()}-${prev.length}`, day_number: prev.length + 1, title: '', content: '', highlights: [], highlightsInput: '', meals: { breakfast: false, lunch: false, dinner: false }, accommodation: '', image_url: '' }])} className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-amber-400 px-4 py-3 text-sm font-semibold text-amber-600 transition hover:bg-amber-50">
                        <Plus size={16} /> Add Next Day
                      </button>
                    </div>
                  )}
                </div>

                <div className="sticky bottom-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button type="button" onClick={resetToursForm} className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">Cancel</button>
                    <button type="button" disabled={publishing} onClick={saveTour} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-amber-600 disabled:opacity-60">
                      {publishing ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" /> : null}
                      {publishing ? 'Saving...' : 'Save Tour + Itinerary →'}
                    </button>
                  </div>
                  {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
                  {success && <p className="mt-3 text-sm font-medium text-emerald-600">{success}</p>}
                </div>
              </div>

              <aside className="hidden md:block">
                <div className="sticky top-4 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">👁️ Live Preview</h3>
                    <p className="text-sm text-gray-500">Updates as you type</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toursStatus === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                        {toursStatus === 'published' ? 'Published' : 'Draft'}
                      </span>
                      {toursFeatured && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Featured</span>}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{toursTitle || 'Tour title preview'}</h4>
                    <p className="mt-2 text-sm text-gray-600">{toursShortDesc || 'A polished short description will appear here.'}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span className="rounded-full bg-gray-100 px-3 py-1">{toursPriceFrom ? `${toursCurrency} ${toursPriceFrom}` : 'Price from TBD'}</span>
                      <span className="rounded-full bg-gray-100 px-3 py-1">{toursDurationDays ? `${toursDurationDays} days` : 'Duration TBD'}</span>
                    </div>
                    {tourImageUrls[0] ? (
                      <img src={tourImageUrls[0]} alt="Preview hero" className="mt-4 h-40 w-full rounded-lg object-cover" />
                    ) : (
                      <div className="mt-4 flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-400">
                        Add an image to preview your tour hero
                      </div>
                    )}
                    <div className="mt-4">
                      <h5 className="text-sm font-semibold text-gray-800">Highlights</h5>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        {toursHighlights.slice(0, 3).map(highlight => <li key={highlight} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />{highlight}</li>)}
                        {toursHighlights.length > 3 && <li className="text-amber-600">+ {toursHighlights.length - 3} more</li>}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-sm font-semibold text-gray-800">Itinerary</h5>
                      <div className="mt-2 space-y-2 text-sm text-gray-600">
                        {itineraryDays.length === 0 ? (
                          <p className="text-gray-400">Add itinerary days for a live timeline.</p>
                        ) : itineraryDays.slice(0, 4).map(day => (
                          <div key={day.id} className="rounded-lg bg-gray-50 px-3 py-2">Day {String(day.day_number).padStart(2, '0')} • {day.title || 'Untitled day'}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Tours List</h3>
              <p className="text-sm text-gray-500">Edit an existing tour or remove it from the catalog.</p>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100 pt-6">
            {toursItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 py-12 text-center text-sm text-gray-400">No tours found for {selectedCountry}</div>
            ) : (
              <div className="space-y-3">
                {toursItems.map(item => (
                  <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>{item.status || 'draft'}</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.currency} {item.price_from} · {item.duration_days} days · {item.duration_nights || 0} nights
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          setEditing(item);
                          setToursTitle(item.title || '');
                          setToursSlug(item.slug || '');
                          setToursCountry(item.country || selectedCountry);
                          setToursShortDesc(item.short_description || '');
                          setToursPriceFrom(String(item.price_from || ''));
                          setToursCurrency(item.currency || 'USD');
                          setToursDurationDays(String(item.duration_days || ''));
                          setToursDurationNights(String(item.duration_nights || ''));
                          setToursGroupSizeMax(String(item.group_size_max || ''));
                          setToursFeatured(Boolean(item.featured));
                          setToursDestinationId(item.destination_id || '');
                          setToursHighlights(Array.isArray(item.highlights) ? item.highlights : []);
                          setToursInclusions(Array.isArray(item.inclusions) ? item.inclusions : []);
                          setToursExclusions(Array.isArray(item.exclusions) ? item.exclusions : []);
                          setToursStatus(item.status || 'draft');
                          setTourImageUrls(Array.isArray(item.images) ? item.images : (item.image_url ? [item.image_url] : []));
                          setTourImageInput('');
                          setTourUploadStatus('idle');
                          
                          // Fetch existing itinerary days
                          const { data: itineraryData } = await supabase
                            .from('itineraries')
                            .select('*')
                            .eq('tour_id', item.id)
                            .order('sort_order', { ascending: true });
                          
                          if (itineraryData && itineraryData.length > 0) {
                            const parsedDays = itineraryData.map((day: any) => ({
                              id: day.id,
                              day_number: day.day_number,
                              title: day.title || '',
                              content: day.content || '',
                              highlights: Array.isArray(day.highlights) ? day.highlights : [],
                              highlightsInput: '',
                              meals: {
                                breakfast: day.meals_included?.toLowerCase().includes('breakfast') || false,
                                lunch: day.meals_included?.toLowerCase().includes('lunch') || false,
                                dinner: day.meals_included?.toLowerCase().includes('dinner') || false,
                              },
                              accommodation: day.accommodation || '',
                              image_url: day.image_url || '',
                            }));
                            setItineraryDays(parsedDays);
                          } else {
                            setItineraryDays([]);
                          }
                          
                          setShowToursForm(true);
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-amber-100"
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (!window.confirm('Delete this tour and all its itinerary days?')) return;
                          
                          // Delete itinerary rows first
                          await supabase.from('itineraries').delete().eq('tour_id', item.id);
                          
                          // Delete tour images from storage
                          const tourImageForDelete = item.image_url || (Array.isArray(item.images) ? item.images[0] : item.images) || null;
                          if (tourImageForDelete) {
                            const filePath = extractStoragePath(tourImageForDelete, 'tour-images');
                            if (filePath) {
                              const { error: storageError } = await supabase.storage.from('tour-images').remove([filePath]);
                              if (storageError) console.error('Tour storage delete error:', storageError);
                            }
                          }
                          
                          // Delete the tour
                          await supabase.from('tours').delete().eq('id', item.id);
                          fetchTours();
                          setSuccess('🗑️ Tour deleted.');
                          setTimeout(() => setSuccess(''), 3000);
                        }}
                        className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-100"
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DESTINATIONS MANAGEMENT */}
      <div className="max-w-3xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Destinations Management</h2>
            <button
              onClick={() => { resetDestForm(); setShowDestForm(!showDestForm); }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm"
            >
              <Plus size={16} /> Add New Destination
            </button>
          </div>

          {showDestForm && (
            <div className="border-t border-gray-100 pt-6 space-y-4">

              {editing && (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  <span>Editing: {editing.name}</span>
                  <button onClick={resetDestForm}><X size={15} /></button>
                </div>
              )}

              <Field label="Name *">
                <input
                  value={destName}
                  onChange={e => {
                    setDestName(e.target.value);
                    setDestSlug(generateSlug(e.target.value));
                  }}
                  placeholder="Destination name..."
                  className={inputCls}
                />
              </Field>

              <Field label="Name (မြန်မာ)">
                <input value={destNameMm} onChange={e => setDestNameMm(e.target.value)} className={inputCls} />
              </Field>

              <Field label="Name (ภาษาไทย)">
                <input value={destNameTh} onChange={e => setDestNameTh(e.target.value)} className={inputCls} />
              </Field>

              <Field label="Slug (auto-generated)">
                <input value={destSlug} readOnly className={`${inputCls} bg-gray-50 text-gray-400`} />
              </Field>

              <Field label="Description (မြန်မာ)">
                <textarea value={destDescMm} onChange={e => setDestDescMm(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Description (ภาษาไทย)">
                <textarea value={destDescTh} onChange={e => setDestDescTh(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Short Description">
                <textarea value={destShortDescription} onChange={e => setDestShortDescription(e.target.value)} rows={3} placeholder="Brief summary..." className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Description">
                <textarea value={destDescription} onChange={e => setDestDescription(e.target.value)} rows={6} placeholder="Full description..." className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Must Visit (comma-separated)">
                <textarea value={destMustVisit} onChange={e => setDestMustVisit(e.target.value)} rows={3} placeholder="Grand Palace, Wat Pho, Wat Arun" className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Dining (comma-separated)">
                <textarea value={destDining} onChange={e => setDestDining(e.target.value)} rows={3} placeholder="Pad Thai, Tom Yum Goong, Mango Sticky Rice" className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Activities (comma-separated)">
                <textarea value={destActivities} onChange={e => setDestActivities(e.target.value)} rows={3} placeholder="River cruise, Tuk-tuk tour, Muay Thai show" className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Hidden Gems (comma-separated)">
                <textarea value={destHiddenGems} onChange={e => setDestHiddenGems(e.target.value)} rows={3} placeholder="Talat Noi, Bang Krachao, Wat Prayoon" className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Experiences (comma-separated)">
                <textarea value={destExperiences} onChange={e => setDestExperiences(e.target.value)} rows={3} placeholder="Floating market, Cooking class, Night market" className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Images (comma-separated URLs)">
                <input value={destImages} onChange={e => { setDestImages(e.target.value); setDestImagePreview(e.target.value); }} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" className={inputCls} />
              </Field>
              <Field label="Or Upload Image">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const publicUrl = await uploadImageToStorage(file, 'destination-images');
                      if (publicUrl) {
                        setDestImages(publicUrl);
                        setDestImagePreview(publicUrl);
                      }
                    }}
                    disabled={uploadingImage}
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  {uploadingImage && (
                    <span className="text-xs text-emerald-600 font-medium">Uploading...</span>
                  )}
                </div>
                {destImagePreview && (
                  <img
                    src={destImagePreview}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-200"
                    onError={() => setDestImagePreview('')}
                  />
                )}
              </Field>

              <Field label="Featured">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={destFeatured} onChange={e => setDestFeatured(e.target.checked)} className="w-4 h-4 text-emerald-500 rounded" />
                  <span className="text-sm text-gray-600">Mark as featured destination</span>
                </div>
              </Field>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}

              <button
                disabled={publishing}
                onClick={async () => {
                  setPublishing(true); setError(''); setSuccess('');
                  try {
                    if (!destName) { setError('Name is required.'); return; }
                    const payload = {
                      name: destName.trim(),
                      country: selectedCountry.trim().toLowerCase(),
                      slug: destSlug.trim().toLowerCase(),
                      description: destDescription.trim() || null,
                      short_description: destShortDescription.trim() || null,
                      name_mm: destNameMm || null,
                      name_th: destNameTh || null,
                      description_mm: destDescMm || null,
                      description_th: destDescTh || null,
                      featured: destFeatured,
                      image_url: destImages || null,
                      must_visit: destMustVisit.split(',').map(s => s.trim()).filter(Boolean),
                      activities: destActivities.split(',').map(s => s.trim()).filter(Boolean),
                      dining: destDining.split(',').map(s => s.trim()).filter(Boolean),
                      hidden_gems: destHiddenGems.split(',').map(s => s.trim()).filter(Boolean),
                      experiences: destExperiences.split(',').map(s => s.trim()).filter(Boolean),
                      display_order: destinationsItems.length,
                    };
                    console.log('DEST SAVE PAYLOAD:', payload);
                    if (editing) {
                      const { error } = await supabase.from('destinations').update(payload).eq('id', editing.id);
                      if (error) {
                        setError(`Update failed: ${error.message}`);
                        return;
                      }
                      setSuccess('Destination updated successfully');
                    } else {
                      const { data, error } = await supabase.from('destinations').insert([payload]).select();
                      console.log('DEST INSERT RESULT:', data, error);
                      if (error) {
                        console.error('Insert failed:', error.message);
                        setError(`Insert failed: ${error.message}`);
                        return;
                      }
                      setSuccess('Destination created successfully');
                    }
                    resetDestForm();
                    fetchDestinations();
                  } catch (err: any) {
                    console.error('DEST SAVE ERROR:', err);
                    setError(`An error occurred: ${err?.message || 'Unknown error'}`);
                  } finally {
                    setPublishing(false);
                  }
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50"
              >
                {publishing ? 'Processing...' : editing ? 'Update Destination' : 'Save Destination'}
              </button>
            </div>
          )}

          {/* Destinations List */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Destinations List</h3>
            {destinationsItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">No destinations found for {selectedCountry}</div>
            ) : (
              <div className="space-y-3">
                {destinationsItems.map((item, index) => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDestinationReorder(index, 'up')}
                        disabled={index === 0}
                        style={{ opacity: index === 0 ? 0.3 : 1 }}
                        className="px-2 py-1 text-gray-600 hover:text-emerald-600 disabled:cursor-not-allowed"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleDestinationReorder(index, 'down')}
                        disabled={index === destinationsItems.length - 1}
                        style={{ opacity: index === destinationsItems.length - 1 ? 0.3 : 1 }}
                        className="px-2 py-1 text-gray-600 hover:text-emerald-600 disabled:cursor-not-allowed"
                      >
                        ▼
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.featured ? 'Featured' : 'Not featured'} · {item.slug}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(item);
                          setDestName(item.name || '');
                          setDestSlug(item.slug || '');
                          setDestShortDescription(item.short_description || '');
                          setDestDescription(item.description || '');
                          setDestNameMm(item.name_mm || '');
                          setDestNameTh(item.name_th || '');
                          setDestDescMm(item.description_mm || '');
                          setDestDescTh(item.description_th || '');
                          setDestMustVisit(Array.isArray(item.must_visit) ? item.must_visit.join(', ') : '');
                          setDestActivities(Array.isArray(item.activities) ? item.activities.join(', ') : '');
                          setDestDining(Array.isArray(item.dining) ? item.dining.join(', ') : '');
                          setDestHiddenGems(Array.isArray(item.hidden_gems) ? item.hidden_gems.join(', ') : '');
                          setDestExperiences(Array.isArray(item.experiences) ? item.experiences.join(', ') : '');
                          setDestImages(item.image_url || '');
                          setDestImagePreview(item.image_url || '');
                          setDestFeatured(item.featured || false);
                          setShowDestForm(true);
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-medium hover:bg-amber-100"
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm('Delete this destination?')) return;
                          const destImageForDelete = item.image_url || (typeof item.images === 'string' ? item.images : null) || null;
                          if (destImageForDelete) {
                            const filePath = extractStoragePath(destImageForDelete, 'destination-images');
                            if (filePath) {
                              const { error: storageError } = await supabase.storage.from('destination-images').remove([filePath]);
                              if (storageError) console.error('Dest storage delete error:', storageError);
                            }
                          }
                          await supabase.from('destinations').delete().eq('id', item.id);
                          fetchDestinations();
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-medium hover:bg-red-100"
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* POSTS MANAGEMENT */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Posts Management</h2>
            <button
              onClick={() => { resetPostForm(); setShowPostForm(!showPostForm); }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm"
            >
              <Plus size={16} /> Add New Post
            </button>
          </div>

          {showPostForm && (
            <div className="border-t border-gray-100 pt-6 space-y-4">

              {editing && (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  <span>Editing: {editing.title}</span>
                  <button onClick={resetPostForm}><X size={15} /></button>
                </div>
              )}

              <Field label="Title *">
                <input
                  value={postTitle}
                  onChange={e => {
                    setPostTitle(e.target.value);
                    setPostSlug(generateSlug(e.target.value));
                  }}
                  placeholder="Post title..."
                  className={inputCls}
                />
              </Field>

              <Field label="Slug (auto-generated)">
                <input value={postSlug} readOnly className={`${inputCls} bg-gray-50 text-gray-400`} />
              </Field>

              <Field label="Excerpt">
                <textarea value={postExcerpt} onChange={e => setPostExcerpt(e.target.value)} rows={3} placeholder="Brief summary..." className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Content *">
                <textarea value={postContent} onChange={e => setPostContent(e.target.value)} rows={12} placeholder="Write your content here..." className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Author">
                <input value={postAuthor} onChange={e => setPostAuthor(e.target.value)} placeholder="AsiaBuddy Team" className={inputCls} />
              </Field>

              <Field label="Cover Image URL">
                <input value={postCoverImage} onChange={e => setPostCoverImage(e.target.value)} placeholder="https://example.com/cover.jpg" className={inputCls} />
                {blogImagePreview && (
                  <div className="mt-2">
                    <img
                      src={blogImagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                      onError={() => setBlogImagePreview('')}
                    />
                  </div>
                )}
              </Field>
              <Field label="Or Upload Cover Image">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const publicUrl = await uploadImageToStorage(file, 'blog-images');
                      if (publicUrl) {
                        setPostCoverImage(publicUrl);
                        setBlogImagePreview(publicUrl);
                      }
                    }}
                    disabled={uploadingImage}
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  {uploadingImage && (
                    <span className="text-xs text-emerald-600 font-medium">Uploading...</span>
                  )}
                </div>
              </Field>

              <Field label="Images (comma-separated URLs)">
                <input value={postImages} onChange={e => setPostImages(e.target.value)} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" className={inputCls} />
              </Field>

              <Field label="Published">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={postPublished} onChange={e => setPostPublished(e.target.checked)} className="w-4 h-4 text-emerald-500 rounded" />
                  <span className="text-sm text-gray-600">Mark as published</span>
                </div>
              </Field>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}

              <button
                disabled={publishing}
                onClick={async () => {
                  setPublishing(true); setError(''); setSuccess('');
                  try {
                    if (!postTitle || !postContent) {
                      setError('Title and Content are required.');
                      return;
                    }
                    console.log('POSTS_SAVE_selectedCountry:', selectedCountry);
                    const payload = {
                      country: selectedCountry,
                      title: postTitle,
                      slug: editing?.slug || postSlug,
                      excerpt: postExcerpt || null,
                      content: postContent,
                      author: postAuthor,
                      cover_image: postCoverImage || null,
                      images: postImages 
                        ? postImages.split(',').map((s: string) => s.trim()).filter(Boolean) 
                        : null,
                      published: postPublished,
                      updated_at: new Date().toISOString(),
                    };
                    if (editing) {
                      await supabase.from('posts').update(payload).eq('id', editing.id);
                      setSuccess('Post updated successfully');
                    } else {
                      await supabase.from('posts').insert(payload);
                      setSuccess('Post created successfully');
                    }
                    resetPostForm();
                    fetchPosts();
                  } catch {
                    setError('An error occurred.');
                  } finally {
                    setPublishing(false);
                  }
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50"
              >
                {publishing ? 'Processing...' : editing ? 'Update Post' : 'Save Post'}
              </button>
            </div>
          )}

          {/* Posts List */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Posts List</h3>
            {postsItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">No posts found for {selectedCountry}</div>
            ) : (
              <div className="space-y-3">
                {postsItems.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.published ? 'Published' : 'Draft'} · {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(item);
                          setPostTitle(item.title || '');
                          setPostSlug(item.slug || '');
                          setPostExcerpt(item.excerpt || '');
                          setPostContent(item.content || '');
                          setPostAuthor(item.author || 'AsiaBuddy Team');
                          setPostCoverImage(item.cover_image || '');
                          setPostImages(Array.isArray(item.images) ? item.images.join(', ') : '');
                          setPostPublished(item.published || false);
                          setShowPostForm(true);
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-medium hover:bg-amber-100"
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm('Delete this post?')) return;
                          if (item.cover_image) {
                            const filePath = extractStoragePath(item.cover_image, 'blog-images');
                            if (filePath) {
                              const { error: storageError } = await supabase.storage.from('blog-images').remove([filePath]);
                              if (storageError) console.error('Post storage delete error:', storageError);
                            }
                          }
                          await supabase.from('posts').delete().eq('id', item.id);
                          fetchPosts();
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-medium hover:bg-red-100"
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
