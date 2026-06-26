'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Pencil, Trash2, X } from 'lucide-react';

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
  const [showToursForm, setShowToursForm] = useState(false);
  const [toursTitle, setToursTitle] = useState('');
  const [toursSlug, setToursSlug] = useState('');
  const [toursShortDesc, setToursShortDesc] = useState('');
  const [toursDesc, setToursDesc] = useState('');
  const [toursPriceFrom, setToursPriceFrom] = useState('');
  const [toursCurrency, setToursCurrency] = useState('USD');
  const [toursDurationDays, setToursDurationDays] = useState('');
  const [toursDurationNights, setToursDurationNights] = useState('');
  const [toursGroupSizeMax, setToursGroupSizeMax] = useState('');
  const [toursImages, setToursImages] = useState('');
  const [toursImageFile, setToursImageFile] = useState<File | null>(null);
  const [toursImagePreview, setToursImagePreview] = useState('');
  const [toursFeatured, setToursFeatured] = useState(false);
  const [toursDestinationId, setToursDestinationId] = useState('');
  const [toursSalespersonId, setToursSalespersonId] = useState('');
  const [toursHighlights, setToursHighlights] = useState('');
  const [toursInclusions, setToursInclusions] = useState('');
  const [toursExclusions, setToursExclusions] = useState('');
  const [toursStatus, setToursStatus] = useState('active');

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
  const [itinImageUrl, setItinImageUrl] = useState('');

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

  const uploadImageToStorage = async (file: File, bucket: string): Promise<string | null> => {
    setUploadingImage(true);
    try {
      const ext = file.name.split('.').pop();
      const sanitizedBase = file.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
      const uniqueFileName = `${Date.now()}-${sanitizedBase}.${ext}`;
      
      const { error: uploadError } = await supabase.storage.from(bucket).upload(uniqueFileName, file, { upsert: true });
      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        setError(`Upload failed: ${uploadError.message}`);
        return null;
      }
      
      const { data } = supabase.storage.from(bucket).getPublicUrl(uniqueFileName);
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
    setToursTitle(''); setToursSlug(''); setToursShortDesc('');
    setToursDesc(''); setToursPriceFrom(''); setToursCurrency('USD');
    setToursDurationDays(''); setToursDurationNights('');
    setToursGroupSizeMax(''); setToursImages(''); setToursImageFile(null); setToursImagePreview(''); setToursFeatured(false);
    setToursDestinationId(''); setToursSalespersonId('');
    setToursHighlights(''); setToursInclusions(''); setToursExclusions('');
    setToursStatus('active'); setShowToursForm(false);
    setEditing(null); setSuccess(''); setError('');
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

  const resetItinForm = () => {
    setItinTourId(''); setItinDayNumber(''); setItinSortOrder('');
    setItinTitle(''); setItinContent(''); setItinHighlights('');
    setItinMeals(''); setItinAccommodation(''); setItinImageUrl('');
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

      {/* TOURS MANAGEMENT */}
      <div className="max-w-3xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

          {/* Section header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Tours Management</h2>
            <button
              onClick={() => { resetToursForm(); setShowToursForm(!showToursForm); }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm"
            >
              <Plus size={16} /> Add New Tour
            </button>
          </div>

          {/* Tours Form */}
          {showToursForm && (
            <div className="border-t border-gray-100 pt-6 space-y-4">

              {editing && (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  <span>Editing: {editing.title}</span>
                  <button onClick={resetToursForm}><X size={15} /></button>
                </div>
              )}

              <Field label="Title *">
                <input
                  value={toursTitle}
                  onChange={e => {
                    setToursTitle(e.target.value);
                    setToursSlug(generateSlug(e.target.value));
                  }}
                  placeholder="Tour name..."
                  className={inputCls}
                />
              </Field>

              <Field label="Slug (auto-generated)">
                <input value={toursSlug} readOnly className={`${inputCls} bg-gray-50 text-gray-400`} />
              </Field>

              <Field label="Short Description">
                <textarea value={toursShortDesc} onChange={e => setToursShortDesc(e.target.value)} rows={3} placeholder="Brief summary..." className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Description">
                <textarea value={toursDesc} onChange={e => setToursDesc(e.target.value)} rows={6} placeholder="Full tour description..." className={`${inputCls} resize-none`} />
              </Field>

              <div className="grid grid-cols-3 gap-4">
                <Field label="Price From *">
                  <input type="number" value={toursPriceFrom} onChange={e => setToursPriceFrom(e.target.value)} placeholder="299" className={inputCls} />
                </Field>
                <Field label="Currency">
                  <select value={toursCurrency} onChange={e => setToursCurrency(e.target.value)} className={inputCls}>
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Duration Days *">
                  <input type="number" value={toursDurationDays} onChange={e => setToursDurationDays(e.target.value)} placeholder="3" className={inputCls} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Duration Nights">
                  <input type="number" value={toursDurationNights} onChange={e => setToursDurationNights(e.target.value)} placeholder="2" className={inputCls} />
                </Field>
                <Field label="Group Size Max">
                  <input type="number" value={toursGroupSizeMax} onChange={e => setToursGroupSizeMax(e.target.value)} placeholder="12" className={inputCls} />
                </Field>
              </div>

              <Field label="Image URL">
                <input value={toursImages} onChange={e => setToursImages(e.target.value)} placeholder="https://example.com/image.jpg" className={inputCls} />
              </Field>
              <Field label="Or Upload Image">
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Or upload image from PC / Mobile
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = await uploadImageToStorage(file, 'tour-images');
                      if (url) {
                        setToursImages(url);
                        setToursImagePreview(url);
                      }
                    }}
                    disabled={uploadingImage}
                    className="w-full text-sm"
                  />
                  {uploadingImage && (
                    <span className="text-xs text-emerald-600 font-medium">Uploading...</span>
                  )}
                  {toursImagePreview && (
                    <img
                      src={toursImagePreview}
                      alt="Preview"
                      className="mt-2 w-full max-h-48 object-cover rounded border"
                    />
                  )}
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Destination ID">
                  <input value={toursDestinationId} onChange={e => setToursDestinationId(e.target.value)} placeholder="UUID" className={inputCls} />
                </Field>
                <Field label="Salesperson ID">
                  <input value={toursSalespersonId} onChange={e => setToursSalespersonId(e.target.value)} placeholder="UUID" className={inputCls} />
                </Field>
              </div>

              <Field label="Featured">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={toursFeatured} onChange={e => setToursFeatured(e.target.checked)} className="w-4 h-4 text-emerald-500 rounded" />
                  <span className="text-sm text-gray-600">Mark as featured tour</span>
                </div>
              </Field>

              <Field label="Highlights (one per line)">
                <textarea value={toursHighlights} onChange={e => setToursHighlights(e.target.value)} rows={4} placeholder={"Temple visit\nBeach tour\nLocal food"} className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Inclusions (one per line)">
                <textarea value={toursInclusions} onChange={e => setToursInclusions(e.target.value)} rows={4} placeholder={"Hotel accommodation\nAirport transfers\nBreakfast daily"} className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Exclusions (one per line)">
                <textarea value={toursExclusions} onChange={e => setToursExclusions(e.target.value)} rows={4} placeholder={"International flights\nPersonal expenses"} className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Status">
                <select value={toursStatus} onChange={e => setToursStatus(e.target.value)} className={inputCls}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </Field>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}

              <button
                disabled={publishing}
                onClick={async () => {
                  setPublishing(true); setError(''); setSuccess('');
                  try {
                    if (!toursTitle || !toursPriceFrom || !toursDurationDays) {
                      setError('Title, Price From, and Duration Days are required.');
                      return;
                    }
                    const payload = {
                      country: selectedCountry,
                      title: toursTitle,
                      slug: editing?.slug || toursSlug,
                      short_description: toursShortDesc || null,
                      description: toursDesc || null,
                      price_from: parseFloat(toursPriceFrom),
                      currency: toursCurrency,
                      duration_days: parseInt(toursDurationDays),
                      duration_nights: toursDurationNights ? parseInt(toursDurationNights) : null,
                      group_size_max: toursGroupSizeMax ? parseInt(toursGroupSizeMax) : null,
                      images: toursImages ? [toursImages] : null,
                      image_url: toursImages || null,
                      featured: toursFeatured,
                      destination_id: toursDestinationId || null,
                      salesperson_id: toursSalespersonId || null,
                      highlights: toArray(toursHighlights),
                      inclusions: toArray(toursInclusions),
                      exclusions: toArray(toursExclusions),
                      status: toursStatus,
                      updated_at: new Date().toISOString(),
                    };
                    if (editing) {
                      await supabase.from('tours').update(payload).eq('id', editing.id);
                      setSuccess('Tour updated successfully');
                    } else {
                      console.log('TOUR_INSERT_PAYLOAD_KEYS', Object.keys(payload))
                      console.log('TOUR_INSERT_PAYLOAD_FULL', payload)
                      const { data, error } = await supabase.from('tours').insert(payload).select();
                      console.log('INSERT_RESULT:', JSON.stringify(data), 'ERROR:', JSON.stringify(error))
                      setSuccess('Tour created successfully');
                    }
                    resetToursForm();
                    fetchTours();
                  } catch (error) {
                    console.error('Error saving tour:', error);
                    setError('Failed to save tour. Please try again.');
                  } finally {
                    setPublishing(false);
                  }
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50"
              >
                {publishing ? 'Processing...' : editing ? 'Update Tour' : 'Save Tour'}
              </button>
            </div>
          )}

          {/* Tours List */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Tours List</h3>
            {toursItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">No tours found for {selectedCountry}</div>
            ) : (
              <div className="space-y-3">
                {toursItems.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.currency} {item.price_from} · {item.duration_days} days · {item.status}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(item);
                          setToursTitle(item.title || '');
                          setToursSlug(item.slug || '');
                          setToursShortDesc(item.short_description || '');
                          setToursDesc(item.description || '');
                          setToursPriceFrom(String(item.price_from || ''));
                          setToursCurrency(item.currency || 'USD');
                          setToursDurationDays(String(item.duration_days || ''));
                          setToursDurationNights(String(item.duration_nights || ''));
                          setToursGroupSizeMax(String(item.group_size_max || ''));
                          setToursImages(Array.isArray(item.images) ? item.images[0] : '');
                          setToursFeatured(item.featured || false);
                          setToursDestinationId(item.destination_id || '');
                          setToursSalespersonId(item.salesperson_id || '');
                          setToursHighlights(Array.isArray(item.highlights) ? item.highlights.join('\n') : '');
                          setToursInclusions(Array.isArray(item.inclusions) ? item.inclusions.join('\n') : '');
                          setToursExclusions(Array.isArray(item.exclusions) ? item.exclusions.join('\n') : '');
                          setToursStatus(item.status || 'active');
                          setShowToursForm(true);
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-medium hover:bg-amber-100"
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm('Delete this tour?')) return;
                          const tourImageForDelete = item.image_url || (Array.isArray(item.images) ? item.images[0] : item.images) || null;
                          if (tourImageForDelete) {
                            const filePath = extractStoragePath(tourImageForDelete, 'tour-images');
                            if (filePath) {
                              const { error: storageError } = await supabase.storage.from('tour-images').remove([filePath]);
                              if (storageError) console.error('Tour storage delete error:', storageError);
                            }
                          }
                          await supabase.from('tours').delete().eq('id', item.id);
                          fetchTours();
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

      {/* ITINERARY MANAGEMENT */}
      <div className="max-w-3xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Itinerary Management</h2>
            <button
              onClick={() => { resetItinForm(); setShowItinForm(!showItinForm); }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm"
            >
              <Plus size={16} /> Add New Day
            </button>
          </div>

          {showItinForm && (
            <div className="border-t border-gray-100 pt-6 space-y-4">

              {editing && (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  <span>Editing: Day {editing.day_number} — {editing.title}</span>
                  <button onClick={resetItinForm}><X size={15} /></button>
                </div>
              )}

              <Field label="Select Tour *">
                <select value={itinTourId} onChange={e => setItinTourId(e.target.value)} className={inputCls}>
                  <option value="">-- Select a Tour --</option>
                  {toursItems.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Day Number *">
                  <input type="number" value={itinDayNumber} onChange={e => setItinDayNumber(e.target.value)} placeholder="1" className={inputCls} />
                </Field>
                <Field label="Sort Order">
                  <input type="number" value={itinSortOrder} onChange={e => setItinSortOrder(e.target.value)} placeholder="auto" className={inputCls} />
                </Field>
              </div>

              <Field label="Title *">
                <input value={itinTitle} onChange={e => setItinTitle(e.target.value)} placeholder="Day 1: Bangkok Temple Discovery" className={inputCls} />
              </Field>

              <Field label="Content">
                <textarea value={itinContent} onChange={e => setItinContent(e.target.value)} rows={6} placeholder="Full day description..." className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Highlights (one per line)">
                <textarea value={itinHighlights} onChange={e => setItinHighlights(e.target.value)} rows={4} placeholder={"Visit Wat Pho\nTuk-tuk ride\nRiver cruise"} className={`${inputCls} resize-none`} />
              </Field>

              <Field label="Meals Included">
                <input value={itinMeals} onChange={e => setItinMeals(e.target.value)} placeholder="Breakfast, Lunch" className={inputCls} />
              </Field>

              <Field label="Accommodation">
                <input value={itinAccommodation} onChange={e => setItinAccommodation(e.target.value)} placeholder="Hotel name or Not included" className={inputCls} />
              </Field>

              <Field label="Image URL">
                <input value={itinImageUrl} onChange={e => setItinImageUrl(e.target.value)} placeholder="https://example.com/day1.jpg" className={inputCls} />
              </Field>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}

              <button
                disabled={publishing}
                onClick={async () => {
                  setPublishing(true); setError(''); setSuccess('');
                  try {
                    if (!itinTourId || !itinDayNumber || !itinTitle) {
                      setError('Tour, Day Number, and Title are required.');
                      return;
                    }
                    const payload = {
                      tour_id: itinTourId,
                      day_number: parseInt(itinDayNumber),
                      sort_order: itinSortOrder ? parseInt(itinSortOrder) : parseInt(itinDayNumber),
                      title: itinTitle,
                      content: itinContent || null,
                      highlights: toArray(itinHighlights),
                      meals_included: itinMeals || null,
                      accommodation: itinAccommodation || null,
                      image_url: itinImageUrl || null,
                      updated_at: new Date().toISOString(),
                    };
                    if (editing) {
                      await supabase.from('itineraries').update(payload).eq('id', editing.id);
                      setSuccess('Itinerary day updated successfully');
                    } else {
                      await supabase.from('itineraries').insert(payload);
                      setSuccess('Itinerary day created successfully');
                    }
                    resetItinForm();
                    fetchItineraries();
                  } catch {
                    setError('An error occurred.');
                  } finally {
                    setPublishing(false);
                  }
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-50"
              >
                {publishing ? 'Processing...' : editing ? 'Update Day' : 'Save Day'}
              </button>
            </div>
          )}

          {/* Itinerary List */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Itinerary List</h3>
            {itineraryItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">No itinerary days found</div>
            ) : (
              <div className="space-y-3">
                {itineraryItems.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm">Day {item.day_number} — {item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Tour: {item.tours?.title || item.tour_id}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Meals: {item.meals_included || 'N/A'} · Stay: {item.accommodation || 'N/A'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(item);
                          setItinTourId(item.tour_id || '');
                          setItinDayNumber(String(item.day_number || ''));
                          setItinSortOrder(String(item.sort_order || ''));
                          setItinTitle(item.title || '');
                          setItinContent(item.content || '');
                          setItinHighlights(Array.isArray(item.highlights) ? item.highlights.join('\n') : '');
                          setItinMeals(item.meals_included || '');
                          setItinAccommodation(item.accommodation || '');
                          setItinImageUrl(item.image_url || '');
                          setShowItinForm(true);
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-medium hover:bg-amber-100"
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm('Delete this itinerary day?')) return;
                          await supabase.from('itineraries').delete().eq('id', item.id);
                          fetchItineraries();
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

              <Field label="Slug (auto-generated)">
                <input value={destSlug} readOnly className={`${inputCls} bg-gray-50 text-gray-400`} />
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
                <input value={destImages} onChange={e => setDestImages(e.target.value)} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" className={inputCls} />
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
                          setDestMustVisit(Array.isArray(item.must_visit) ? item.must_visit.join(', ') : '');
                          setDestActivities(Array.isArray(item.activities) ? item.activities.join(', ') : '');
                          setDestDining(Array.isArray(item.dining) ? item.dining.join(', ') : '');
                          setDestHiddenGems(Array.isArray(item.hidden_gems) ? item.hidden_gems.join(', ') : '');
                          setDestExperiences(Array.isArray(item.experiences) ? item.experiences.join(', ') : '');
                          setDestImages(item.image_url || '');
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
