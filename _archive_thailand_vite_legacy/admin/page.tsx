'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, List, Eye, Trash2, Pencil, X } from 'lucide-react';
import { countries } from '@/data/countries';

export const dynamic = 'force-dynamic';

// ─── Types ─────────────────────────────────────────────────────
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author: string;
  cover_image: string | null;
  images: string | null;
  published: boolean;
  country: string;
  created_at: string;
  updated_at: string;
}

// ─── Slug Generator ────────────────────────────────────────────
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ─── Helper: Extract Storage Path from URL ───────────────────────
const extractStoragePath = (url: string, bucketName: string): string => {
  const marker = `/public/${bucketName}/`;
  const index = url.indexOf(marker);
  if (index === -1) return '';
  return url.substring(index + marker.length);
};

// ─── Main Component ────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('thailand');
  const [toursItems, setToursItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // ── Auth check ──
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (!session) {
        router.push('/thailand/clogin');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });
  }, []);


  // ── Tours (new schema) fields ──
  const [toursTitle, setToursTitle] = useState('');
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
  const [toursSlug, setToursSlug] = useState('');
  const [showToursForm, setShowToursForm] = useState(false);

  // ── Destinations fields ──
  const [destName, setDestName] = useState('');
  const [destShortDesc, setDestShortDesc] = useState('');
  const [destDesc, setDestDesc] = useState('');
  const [destImages, setDestImages] = useState('');
  const [destImagePreview, setDestImagePreview] = useState('');
  const [destFeatured, setDestFeatured] = useState(false);
  const [destSlug, setDestSlug] = useState('');
  const [showDestForm, setShowDestForm] = useState(false);
  const [destinationsItems, setDestinationsItems] = useState<any[]>([]);

  // ── Blog Posts fields ──
  const [blogPostTitle, setBlogPostTitle] = useState('');
  const [blogPostExcerpt, setBlogPostExcerpt] = useState('');
  const [blogPostContent, setBlogPostContent] = useState('');
  const [blogPostAuthor, setBlogPostAuthor] = useState('AsiaBuddy Team');
  const [blogPostPublished, setBlogPostPublished] = useState(false);
  const [blogPostCoverImage, setBlogPostCoverImage] = useState('');
  const [blogImagePreview, setBlogImagePreview] = useState('');
  const [blogPostImages, setBlogPostImages] = useState('');
  const [blogPostSlug, setBlogPostSlug] = useState('');
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogPostsItems, setBlogPostsItems] = useState<any[]>([]);

  // ── Itinerary fields ──
  const [itineraryItems, setItineraryItems] = useState<any[]>([]);
  const [showItineraryForm, setShowItineraryForm] = useState(false);
  const [itinTourId, setItinTourId] = useState('');
  const [itinDayNumber, setItinDayNumber] = useState('');
  const [itinTitle, setItinTitle] = useState('');
  const [itinContent, setItinContent] = useState('');
  const [itinHighlights, setItinHighlights] = useState('');
  const [itinMeals, setItinMeals] = useState('');
  const [itinAccommodation, setItinAccommodation] = useState('');
  const [itinImageUrl, setItinImageUrl] = useState('');
  const [itinSortOrder, setItinSortOrder] = useState('');

  // ── Auth check ──
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (!session) {
        router.push('/thailand/clogin');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });
  }, []);

  // ── Fetch tours for standalone section ──
  useEffect(() => {
    const fetchTours = async () => {
      const { data } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false });
      setToursItems(data || []);
    };
    fetchTours();
  }, [selectedCountry]);

  // ── Fetch destinations for standalone section ──
  useEffect(() => {
    const fetchDestinations = async () => {
      const { data } = await supabase
        .from('destinations')
        .select('*')
        .order('created_at', { ascending: false });
      setDestinationsItems(data || []);
    };
    fetchDestinations();
  }, [selectedCountry]);

  // ── Fetch blog posts for standalone section ──
  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      setBlogPostsItems(data || []);
    };
    fetchBlogPosts();
  }, [selectedCountry]);

  // ── Fetch itineraries ──
  useEffect(() => {
    const fetchItineraries = async () => {
      const { data } = await supabase
        .from('itineraries')
        .select('*, tours(title, country)')
        .order('tour_id', { ascending: true })
        .order('day_number', { ascending: true });
      setItineraryItems(data || []);
    };
    fetchItineraries();
  }, [selectedCountry]);

  // ── Upload image ──
  const uploadImage = async (file: File, bucket: string): Promise<string> => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) return '';
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  // ── Upload image to Supabase Storage ──
  const uploadImageToStorage = async (file: File, bucket: string): Promise<string | null> => {
    setUploadingImage(true);
    try {
      const ext = file.name.split('.').pop();
      const sanitizedBase = file.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
      const uniqueFileName = `${Date.now()}-${sanitizedBase}.${ext}`;
      
      const { error: uploadError } = await supabase.storage.from(bucket).upload(uniqueFileName, file);
      if (uploadError) {
        setError(`Upload failed: ${uploadError.message}`);
        return null;
      }
      
      const { data } = supabase.storage.from(bucket).getPublicUrl(uniqueFileName);
      return data.publicUrl;
    } catch (e: any) {
      setError(`Upload error: ${e.message}`);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // ── Reset forms ──
  const resetForms = () => {
    setEditing(null);
    setToursTitle(''); setToursShortDesc(''); setToursDesc(''); setToursPriceFrom('');
    setToursCurrency('USD'); setToursDurationDays(''); setToursDurationNights('');
    setToursGroupSizeMax(''); setToursImages(''); setToursImageFile(null); setToursImagePreview(''); setToursFeatured(false);
    setToursDestinationId(''); setToursSalespersonId(''); setToursHighlights('');
    setToursInclusions(''); setToursExclusions(''); setToursStatus('active');
    setToursSlug(''); setShowToursForm(false);
    setDestName(''); setDestShortDesc(''); setDestDesc('');
    setDestImages(''); setDestImagePreview(''); setDestFeatured(false);
    setDestSlug(''); setShowDestForm(false);
    setBlogPostTitle(''); setBlogPostExcerpt(''); setBlogPostContent('');
    setBlogPostAuthor('AsiaBuddy Team'); setBlogPostPublished(false);
    setBlogPostCoverImage(''); setBlogImagePreview(''); setBlogPostImages('');
    setBlogPostSlug(''); setShowBlogForm(false);
    setSuccess(''); setError('');
  };

  // ── Reset itinerary form ──
  const resetItineraryForm = () => {
    setItinTourId('');
    setItinDayNumber('');
    setItinTitle('');
    setItinContent('');
    setItinHighlights('');
    setItinMeals('');
    setItinAccommodation('');
    setItinImageUrl('');
    setItinSortOrder('');
    setShowItineraryForm(false);
  };


  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/thailand/clogin');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div>
          <h1 className="text-lg font-bold text-gray-800">AsiaBuddy Admin</h1>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-red-400 font-medium hover:underline">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      {/* ── Country Selector ── */}
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
            Country
          </label>
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
          >
            {countries.map(c => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>


      {/* ── Tours Management Section (New Schema) ── */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">🗺️ Tours Management</h2>
            <button
              onClick={() => setShowToursForm(!showToursForm)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors"
            >
              <Plus size={16} /> Add New Tour
            </button>
          </div>

          {/* ── Tours Form (Inline) ── */}
          {showToursForm && (
            <div className="border-t border-gray-100 pt-6 space-y-4">
              {editing && (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  <span>✏️ Editing: <strong>{editing.title}</strong></span>
                  <button onClick={() => { setEditing(null); resetForms(); setShowToursForm(false); }}><X size={15} /></button>
                </div>
              )}

              <Field label="Title *">
                <input 
                  value={toursTitle} 
                  onChange={e => {
                    setToursTitle(e.target.value);
                    setToursSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
                  }} 
                  placeholder="Tour name..." 
                  className={inputCls} 
                />
              </Field>
              <Field label="Slug (auto-generated)">
                <input 
                  value={toursSlug} 
                  readOnly 
                  className={`${inputCls} bg-gray-50 text-gray-500`} 
                />
              </Field>
              <Field label="Short Description">
                <textarea 
                  value={toursShortDesc} 
                  onChange={e => setToursShortDesc(e.target.value)} 
                  rows={3} 
                  placeholder="Brief summary..." 
                  className={`${inputCls} resize-none`} 
                />
              </Field>
              <Field label="Description">
                <textarea 
                  value={toursDesc} 
                  onChange={e => setToursDesc(e.target.value)} 
                  rows={6} 
                  placeholder="Full tour description..." 
                  className={`${inputCls} resize-none`} 
                />
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Price From *">
                  <input 
                    type="number" 
                    value={toursPriceFrom} 
                    onChange={e => setToursPriceFrom(e.target.value)} 
                    placeholder="299" 
                    className={inputCls} 
                  />
                </Field>
                <Field label="Currency">
                  <select 
                    value={toursCurrency} 
                    onChange={e => setToursCurrency(e.target.value)} 
                    className={inputCls}
                  >
                    <option value="USD">USD</option>
                    <option value="THB">THB</option>
                    <option value="EUR">EUR</option>
                  </select>
                </Field>
                <Field label="Duration Days *">
                  <input 
                    type="number" 
                    value={toursDurationDays} 
                    onChange={e => setToursDurationDays(e.target.value)} 
                    placeholder="3" 
                    className={inputCls} 
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Duration Nights">
                  <input 
                    type="number" 
                    value={toursDurationNights} 
                    onChange={e => setToursDurationNights(e.target.value)} 
                    placeholder="2" 
                    className={inputCls} 
                  />
                </Field>
                <Field label="Group Size Max">
                  <input 
                    type="number" 
                    value={toursGroupSizeMax} 
                    onChange={e => setToursGroupSizeMax(e.target.value)} 
                    placeholder="10" 
                    className={inputCls} 
                  />
                </Field>
              </div>
              <Field label="Image URL">
                <input 
                  value={toursImages} 
                  onChange={e => setToursImages(e.target.value)} 
                  placeholder="https://example.com/image.jpg" 
                  className={inputCls} 
                />
              </Field>
              <Field label="Or Upload Image">
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Or upload image from PC / Mobile
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setToursImageFile(file);
                        setToursImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="w-full text-sm"
                  />
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
                  <input 
                    value={toursDestinationId} 
                    onChange={e => setToursDestinationId(e.target.value)} 
                    placeholder="Destination UUID" 
                    className={inputCls} 
                  />
                </Field>
                <Field label="Salesperson ID">
                  <input 
                    value={toursSalespersonId} 
                    onChange={e => setToursSalespersonId(e.target.value)} 
                    placeholder="Salesperson UUID" 
                    className={inputCls} 
                  />
                </Field>
              </div>
              <Field label="Featured">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={toursFeatured} 
                    onChange={e => setToursFeatured(e.target.checked)} 
                    className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-400"
                  />
                  <span className="text-sm text-gray-600">Mark as featured tour</span>
                </div>
              </Field>
              <Field label="Highlights (one per line)">
                <textarea 
                  value={toursHighlights} 
                  onChange={e => setToursHighlights(e.target.value)} 
                  rows={4} 
                  placeholder="Temple visit\nBeach tour\nLocal food experience" 
                  className={`${inputCls} resize-none`} 
                />
              </Field>
              <Field label="Inclusions (one per line)">
                <textarea 
                  value={toursInclusions} 
                  onChange={e => setToursInclusions(e.target.value)} 
                  rows={4} 
                  placeholder="Hotel accommodation\nAirport transfers\nBreakfast daily" 
                  className={`${inputCls} resize-none`} 
                />
              </Field>
              <Field label="Exclusions (one per line)">
                <textarea 
                  value={toursExclusions} 
                  onChange={e => setToursExclusions(e.target.value)} 
                  rows={4} 
                  placeholder="International flights\nPersonal expenses\nTravel insurance" 
                  className={`${inputCls} resize-none`} 
                />
              </Field>
              <Field label="Status">
                <select 
                  value={toursStatus} 
                  onChange={e => setToursStatus(e.target.value)} 
                  className={inputCls}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </Field>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}

              <button
                onClick={async () => {
                  setPublishing(true);
                  setError(''); setSuccess('');
                  try {
                    if (!toursTitle || !toursPriceFrom || !toursDurationDays) {
                      setError('Title, Price From, and Duration Days are required.');
                      return;
                    }
                    const highlightsArr = toursHighlights
                      ? toursHighlights.split('\n').map(h => h.trim()).filter(Boolean)
                      : [];
                    const inclusionsArr = toursInclusions
                      ? toursInclusions.split('\n').map(h => h.trim()).filter(Boolean)
                      : [];
                    const exclusionsArr = toursExclusions
                      ? toursExclusions.split('\n').map(h => h.trim()).filter(Boolean)
                      : [];
                    let finalImageUrl = toursImages || '';

                    if (toursImageFile) {
                      const uploadedUrl = await uploadImageToStorage(toursImageFile, 'tour-images');
                      if (uploadedUrl) {
                        finalImageUrl = uploadedUrl;
                      }
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
                      image_url: finalImageUrl || null,
                      images: finalImageUrl ? [finalImageUrl] : [],
                      featured: toursFeatured,
                      destination_id: toursDestinationId || null,
                      salesperson_id: toursSalespersonId || null,
                      highlights: highlightsArr,
                      inclusions: inclusionsArr,
                      exclusions: exclusionsArr,
                      status: toursStatus,
                    };
                    if (editing) {
                      await supabase.from('tours').update(payload).eq('id', editing.id);
                      setSuccess('Tour updated successfully ✅');
                    } else {
                      await supabase.from('tours').insert(payload);
                      setSuccess('Tour created successfully ✅');
                    }
                    resetForms();
                    setToursImageFile(null);
                    setToursImagePreview('');
                    const { data } = await supabase
                      .from('tours')
                      .select('*')
                      .order('created_at', { ascending: false });
                    setToursItems(data || []);
                  } catch (e) {
                    setError('An error occurred.');
                  } finally {
                    setPublishing(false);
                  }
                }}
                disabled={publishing}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
              >
                {publishing ? 'Processing...' : editing ? 'Update Tour' : 'Save Tour'}
              </button>
            </div>
          )}

          {/* ── Tours List ── */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Tours List</h3>
            {toursItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">No tours found</div>
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
                          setToursPriceFrom(item.price_from || '');
                          setToursCurrency(item.currency || 'USD');
                          setToursDurationDays(item.duration_days || '');
                          setToursDurationNights(item.duration_nights || '');
                          setToursGroupSizeMax(item.group_size_max || '');
                          setToursImages(item.image_url || '');
                          setToursImagePreview(item.image_url || '');
                          setToursFeatured(item.featured || false);
                          setToursDestinationId(item.destination_id || '');
                          setToursSalespersonId(item.salesperson_id || '');
                          setToursHighlights(Array.isArray(item.highlights) ? item.highlights.join('\n') : item.highlights || '');
                          setToursInclusions(Array.isArray(item.inclusions) ? item.inclusions.join('\n') : item.inclusions || '');
                          setToursExclusions(Array.isArray(item.exclusions) ? item.exclusions.join('\n') : item.exclusions || '');
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
                          if (!confirm('Are you sure you want to delete this tour?')) return;
                          
                          // Delete image from Storage if exists
                          if (item.image_url) {
                            const filePath = extractStoragePath(item.image_url, 'tour-images');
                            if (filePath) {
                              const { error: storageError } = await supabase.storage.from('tour-images').remove([filePath]);
                              if (storageError) {
                                console.error('Error deleting image from storage:', storageError);
                              }
                            }
                          }
                          
                          const { error } = await supabase.from('tours').delete().eq('id', item.id);
                          if (error) {
                            setError('Error deleting tour.');
                            return;
                          }
                          setSuccess('Tour deleted successfully ✅');
                          const { data } = await supabase
                            .from('tours')
                            .select('*')
                            .order('created_at', { ascending: false });
                          setToursItems(data || []);
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

      {/* ── Itinerary Management Section ── */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">📅 Itinerary Management</h2>
            <button
              onClick={() => setShowItineraryForm(!showItineraryForm)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors"
            >
              <Plus size={16} /> Add New Day
            </button>
          </div>

          {/* ── Itinerary Form (Inline) ── */}
          {showItineraryForm && (
            <div className="border-t border-gray-100 pt-6 space-y-4">
              {editing && (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  <span>✏️ Editing: <strong>{editing.title}</strong></span>
                  <button onClick={() => { setEditing(null); resetItineraryForm(); }}><X size={15} /></button>
                </div>
              )}

              <Field label="Select Tour *">
                <select
                  value={itinTourId}
                  onChange={e => setItinTourId(e.target.value)}
                  className={inputCls}
                >
                  <option value="">-- Select a Tour --</option>
                  {toursItems.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Day Number *">
                  <input
                    type="number"
                    value={itinDayNumber}
                    onChange={e => setItinDayNumber(e.target.value)}
                    placeholder="1"
                    className={inputCls}
                  />
                </Field>
                <Field label="Sort Order">
                  <input
                    type="number"
                    value={itinSortOrder}
                    onChange={e => setItinSortOrder(e.target.value)}
                    placeholder="1"
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="Title *">
                <input
                  value={itinTitle}
                  onChange={e => setItinTitle(e.target.value)}
                  placeholder="Day 1: Bangkok Temple Discovery"
                  className={inputCls}
                />
              </Field>
              <Field label="Content">
                <textarea
                  value={itinContent}
                  onChange={e => setItinContent(e.target.value)}
                  rows={6}
                  placeholder="Full day description..."
                  className={`${inputCls} resize-none`}
                />
              </Field>
              <Field label="Highlights (one per line)">
                <textarea
                  value={itinHighlights}
                  onChange={e => setItinHighlights(e.target.value)}
                  rows={4}
                  placeholder="Temple visit\nMarket tour\nCooking class"
                  className={`${inputCls} resize-none`}
                />
              </Field>
              <Field label="Meals Included">
                <input
                  value={itinMeals}
                  onChange={e => setItinMeals(e.target.value)}
                  placeholder="Breakfast, Lunch"
                  className={inputCls}
                />
              </Field>
              <Field label="Accommodation">
                <input
                  value={itinAccommodation}
                  onChange={e => setItinAccommodation(e.target.value)}
                  placeholder="Hotel name or Included/Not included"
                  className={inputCls}
                />
              </Field>
              <Field label="Image URL">
                <input
                  value={itinImageUrl}
                  onChange={e => setItinImageUrl(e.target.value)}
                  placeholder="https://example.com/day1.jpg"
                  className={inputCls}
                />
              </Field>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}

              <button
                onClick={async () => {
                  setPublishing(true);
                  setError(''); setSuccess('');
                  try {
                    if (!itinTourId || !itinDayNumber || !itinTitle) {
                      setError('Tour, Day Number, and Title are required.');
                      return;
                    }
                    const highlightsArr = itinHighlights
                      ? itinHighlights.split('\n').map(h => h.trim()).filter(Boolean)
                      : [];
                    let finalImageUrl = itinImageUrl || null;
                    // Handle image upload if a new file was selected
                    if (editing && editing.image_url !== itinImageUrl && itinImageUrl) {
                      // If the image URL changed and it's not empty, it might be a new upload
                      // The uploadImageToStorage is already called in the file input onChange
                      finalImageUrl = itinImageUrl;
                    }

                    const payload = {
                      tour_id: itinTourId,
                      day_number: parseInt(itinDayNumber),
                      sort_order: itinSortOrder ? parseInt(itinSortOrder) : parseInt(itinDayNumber),
                      title: itinTitle,
                      content: itinContent || null,
                      highlights: highlightsArr,
                      meals_included: itinMeals || null,
                      accommodation: itinAccommodation || null,
                      image_url: finalImageUrl,
                      updated_at: new Date().toISOString(),
                    };
                    if (editing) {
                      await supabase.from('itineraries').update(payload).eq('id', editing.id);
                      setSuccess('Itinerary updated successfully ✅');
                    } else {
                      await supabase.from('itineraries').insert(payload);
                      setSuccess('Itinerary created successfully ✅');
                    }
                    resetItineraryForm();
                    setEditing(null);
                    const { data } = await supabase
                      .from('itineraries')
                      .select('*, tours(title, country)')
                      .order('tour_id', { ascending: true })
                      .order('day_number', { ascending: true });
                    setItineraryItems(data || []);
                  } catch (e) {
                    setError('An error occurred.');
                  } finally {
                    setPublishing(false);
                  }
                }}
                disabled={publishing}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
              >
                {publishing ? 'Processing...' : editing ? 'Update Day' : 'Save Day'}
              </button>
            </div>
          )}

          {/* ── Itinerary List ── */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Itinerary Days List</h3>
            {itineraryItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">No itinerary days found</div>
            ) : (
              <div className="space-y-3">
                {itineraryItems.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm">
                        {item.tours?.title || 'Unknown Tour'} — Day {item.day_number}: {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Meals: {item.meals_included || 'Not specified'} | Stay: {item.accommodation || 'Not specified'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(item);
                          setItinTourId(item.tour_id || '');
                          setItinDayNumber(item.day_number?.toString() || '');
                          setItinSortOrder(item.sort_order?.toString() || '');
                          setItinTitle(item.title || '');
                          setItinContent(item.content || '');
                          setItinHighlights(Array.isArray(item.highlights) ? item.highlights.join('\n') : item.highlights || '');
                          setItinMeals(item.meals_included || '');
                          setItinAccommodation(item.accommodation || '');
                          setItinImageUrl(item.image_url || '');
                          setShowItineraryForm(true);
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-medium hover:bg-amber-100"
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm('Are you sure you want to delete this itinerary day?')) return;
                          const { error } = await supabase.from('itineraries').delete().eq('id', item.id);
                          if (error) {
                            setError('Error deleting itinerary day.');
                            return;
                          }
                          setSuccess('Itinerary day deleted successfully ✅');
                          const { data } = await supabase
                            .from('itineraries')
                            .select('*, tours(title, country)')
                            .order('tour_id', { ascending: true })
                            .order('day_number', { ascending: true });
                          setItineraryItems(data || []);
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

      {/* ── Destinations Management Section ── */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">📍 Destinations Management</h2>
            <button
              onClick={() => setShowDestForm(!showDestForm)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors"
            >
              <Plus size={16} /> Add New Destination
            </button>
          </div>

          {/* ── Destinations Form (Inline) ── */}
          {showDestForm && (
            <div className="border-t border-gray-100 pt-6 space-y-4">
              {editing && editing.name && (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  <span>✏️ Editing: <strong>{editing.name}</strong></span>
                  <button onClick={() => { setEditing(null); resetForms(); setShowDestForm(false); }}><X size={15} /></button>
                </div>
              )}

              <Field label="Name *">
                <input 
                  value={destName} 
                  onChange={e => {
                    setDestName(e.target.value);
                    setDestSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
                  }} 
                  placeholder="Destination name..." 
                  className={inputCls} 
                />
              </Field>
              <Field label="Slug (auto-generated)">
                <input 
                  value={destSlug} 
                  readOnly 
                  className={`${inputCls} bg-gray-50 text-gray-500`} 
                />
              </Field>
              <Field label="Short Description">
                <textarea 
                  value={destShortDesc} 
                  onChange={e => setDestShortDesc(e.target.value)} 
                  rows={3} 
                  placeholder="Brief summary..." 
                  className={`${inputCls} resize-none`} 
                />
              </Field>
              <Field label="Description">
                <textarea 
                  value={destDesc} 
                  onChange={e => setDestDesc(e.target.value)} 
                  rows={6} 
                  placeholder="Full destination description..." 
                  className={`${inputCls} resize-none`} 
                />
              </Field>
              <Field label="Images">
                <input 
                  value={destImages} 
                  onChange={e => setDestImages(e.target.value)} 
                  placeholder="https://example.com/image.jpg" 
                  className={inputCls} 
                />
                {destImagePreview && (
                  <div className="mt-2">
                    <img 
                      src={destImagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200" 
                      onError={() => setDestImagePreview('')}
                    />
                  </div>
                )}
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
              </Field>
              <Field label="Featured">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={destFeatured} 
                    onChange={e => setDestFeatured(e.target.checked)} 
                    className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-400"
                  />
                  <span className="text-sm text-gray-600">Mark as featured destination</span>
                </div>
              </Field>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}

              <button
                onClick={async () => {
                  setPublishing(true);
                  setError(''); setSuccess('');
                  try {
                    if (!destName) {
                      setError('Name is required.');
                      return;
                    }
                    let finalImageUrl = destImages || null;
                    // Handle image upload if a new file was selected
                    if (editing && editing.images !== destImages && destImages) {
                      // If the image URL changed and it's not empty, it might be a new upload
                      // The uploadImageToStorage is already called in the file input onChange
                      finalImageUrl = destImages;
                    }

                    const payload = {
                      country: selectedCountry,
                      name: destName,
                      slug: editing?.slug || destSlug,
                      short_description: destShortDesc || null,
                      description: destDesc || null,
                      images: finalImageUrl ? [finalImageUrl] : [],
                      image_url: finalImageUrl || null,
                      featured: destFeatured,
                    };
                    if (editing && editing.name) {
                      await supabase.from('destinations').update(payload).eq('id', editing.id);
                      setSuccess('Destination updated successfully ✅');
                    } else {
                      await supabase.from('destinations').insert(payload);
                      setSuccess('Destination created successfully ✅');
                    }
                    resetForms();
                    const { data } = await supabase
                      .from('destinations')
                      .select('*')
                      .order('created_at', { ascending: false });
                    setDestinationsItems(data || []);
                  } catch (e) {
                    setError('An error occurred.');
                  } finally {
                    setPublishing(false);
                  }
                }}
                disabled={publishing}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
              >
                {publishing ? 'Processing...' : editing ? 'Update Destination' : 'Save Destination'}
              </button>
            </div>
          )}

          {/* ── Destinations List ── */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Destinations List</h3>
            {destinationsItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">No destinations found</div>
            ) : (
              <div className="space-y-3">
                {destinationsItems.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.featured ? '⭐ Featured' : ''} · {item.slug}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditing(item);
                          setDestName(item.name || '');
                          setDestSlug(item.slug || '');
                          setDestShortDesc(item.short_description || '');
                          setDestDesc(item.description || '');
                          const existingImage = Array.isArray(item.images) ? item.images[0] : item.images || '';
                          setDestImages(existingImage);
                          setDestImagePreview(existingImage);
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
                          if (!confirm('Are you sure you want to delete this destination?')) return;
                          
                          // Delete image from Storage if exists
                          if (item.image_url) {
                            const filePath = extractStoragePath(item.image_url, 'destination-images');
                            if (filePath) {
                              const { error: storageError } = await supabase.storage.from('destination-images').remove([filePath]);
                              if (storageError) {
                                console.error('Error deleting image from storage:', storageError);
                              }
                            }
                          }
                          
                          const { error } = await supabase.from('destinations').delete().eq('id', item.id);
                          if (error) {
                            setError('Error deleting destination.');
                            return;
                          }
                          setSuccess('Destination deleted successfully ✅');
                          const { data } = await supabase
                            .from('destinations')
                            .select('*')
                            .order('created_at', { ascending: false });
                          setDestinationsItems(data || []);
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

      {/* ── Blog Management Section ── */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">📝 Blog Management</h2>
            <button
              onClick={() => setShowBlogForm(!showBlogForm)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors"
            >
              <Plus size={16} /> Add New Post
            </button>
          </div>

          {/* ── Blog Form (Inline) ── */}
          {showBlogForm && (
            <div className="border-t border-gray-100 pt-6 space-y-4">
              {editing && editing.title && (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  <span>✏️ Editing: <strong>{editing.title}</strong></span>
                  <button onClick={() => { setEditing(null); resetForms(); setShowBlogForm(false); }}><X size={15} /></button>
                </div>
              )}

              <Field label="Title *">
                <input 
                  value={blogPostTitle} 
                  onChange={e => {
                    setBlogPostTitle(e.target.value);
                    setBlogPostSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
                  }} 
                  placeholder="Blog post title..." 
                  className={inputCls} 
                />
              </Field>
              <Field label="Slug (auto-generated)">
                <input 
                  value={blogPostSlug} 
                  readOnly 
                  className={`${inputCls} bg-gray-50 text-gray-500`} 
                />
              </Field>
              <Field label="Excerpt">
                <textarea 
                  value={blogPostExcerpt} 
                  onChange={e => setBlogPostExcerpt(e.target.value)} 
                  rows={3} 
                  placeholder="Brief summary..." 
                  className={`${inputCls} resize-none`} 
                />
              </Field>
              <Field label="Content *">
                <textarea 
                  value={blogPostContent} 
                  onChange={e => setBlogPostContent(e.target.value)} 
                  rows={12} 
                  placeholder="Write your blog content here..." 
                  className={`${inputCls} resize-none`} 
                />
              </Field>
              <Field label="Author">
                <input 
                  value={blogPostAuthor} 
                  onChange={e => setBlogPostAuthor(e.target.value)} 
                  placeholder="AsiaBuddy Team" 
                  className={inputCls} 
                />
              </Field>
              <Field label="Cover Image">
                <input 
                  value={blogPostCoverImage} 
                  onChange={e => setBlogPostCoverImage(e.target.value)} 
                  placeholder="https://example.com/cover-image.jpg" 
                  className={inputCls} 
                />
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
                        setBlogPostCoverImage(publicUrl);
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
              <Field label="Images">
                <input 
                  value={blogPostImages} 
                  onChange={e => setBlogPostImages(e.target.value)} 
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" 
                  className={inputCls} 
                />
              </Field>
              <Field label="Or Upload Additional Image">
                <div className="flex items-center gap-3">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const publicUrl = await uploadImageToStorage(file, 'blog-images');
                      if (publicUrl) {
                        setBlogPostImages(blogPostImages ? `${blogPostImages}, ${publicUrl}` : publicUrl);
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
              <Field label="Published">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={blogPostPublished} 
                    onChange={e => setBlogPostPublished(e.target.checked)} 
                    className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-400"
                  />
                  <span className="text-sm text-gray-600">Mark as published</span>
                </div>
              </Field>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}

              <button
                onClick={async () => {
                  setPublishing(true);
                  setError(''); setSuccess('');
                  try {
                    if (!blogPostTitle || !blogPostContent) {
                      setError('Title and Content are required.');
                      return;
                    }
                    let finalCoverImage = blogPostCoverImage || null;
                    // Handle image upload if a new file was selected
                    if (editing && editing.cover_image !== blogPostCoverImage && blogPostCoverImage) {
                      // If the cover image URL changed and it's not empty, it might be a new upload
                      // The uploadImageToStorage is already called in the file input onChange
                      finalCoverImage = blogPostCoverImage;
                    }

                    const payload = {
                      country: selectedCountry,
                      title: blogPostTitle,
                      slug: editing?.slug || blogPostSlug,
                      content: blogPostContent,
                      excerpt: blogPostExcerpt || null,
                      author: blogPostAuthor,
                      cover_image: finalCoverImage,
                      images: blogPostImages || null,
                      published: blogPostPublished,
                    };
                    if (editing && editing.title) {
                      await supabase.from('posts').update(payload).eq('id', editing.id);
                      setSuccess('Blog post updated successfully ✅');
                    } else {
                      await supabase.from('posts').insert(payload);
                      setSuccess('Blog post created successfully ✅');
                    }
                    resetForms();
                    const { data } = await supabase
                      .from('posts')
                      .select('*')
                      .order('created_at', { ascending: false });
                    setBlogPostsItems(data || []);
                  } catch (e) {
                    setError('An error occurred.');
                  } finally {
                    setPublishing(false);
                  }
                }}
                disabled={publishing}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
              >
                {publishing ? 'Processing...' : editing ? 'Update Post' : 'Save Post'}
              </button>
            </div>
          )}

          {/* ── Blog Posts List ── */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Blog Posts List</h3>
            {blogPostsItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">No blog posts found</div>
            ) : (
              <div className="space-y-3">
                {blogPostsItems.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.published ? '✅ Published' : '📝 Draft'} · {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditing(item);
                          setBlogPostTitle(item.title || '');
                          setBlogPostSlug(item.slug || '');
                          setBlogPostExcerpt(item.excerpt || '');
                          setBlogPostContent(item.content || '');
                          setBlogPostAuthor(item.author || 'AsiaBuddy Team');
                          setBlogPostPublished(item.published || false);
                          setBlogPostCoverImage(item.cover_image || '');
                          setBlogImagePreview(item.cover_image || '');
                          setBlogPostImages(item.images || '');
                          setShowBlogForm(true);
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-medium hover:bg-amber-100"
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button 
                        onClick={async () => {
                          if (!confirm('Are you sure you want to delete this blog post?')) return;
                          
                          const filePath = extractStoragePath(item.cover_image, 'blog-images');
                          if (filePath) {
                            const { data, error } = await supabase.storage.from('blog-images').remove([filePath]);
                          }
                          
                          const { error } = await supabase.from('posts').delete().eq('id', item.id);
                          if (error) {
                            setError('Error deleting blog post.');
                            return;
                          }
                          setSuccess('Blog post deleted successfully ✅');
                          const { data } = await supabase
                            .from('posts')
                            .select('*')
                            .order('created_at', { ascending: false });
                          setBlogPostsItems(data || []);
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

// ─── Helper Components ─────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white';
