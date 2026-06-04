'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, List, Eye, Trash2, Pencil, X } from 'lucide-react';

export const dynamic = 'force-dynamic';

// ─── Types ─────────────────────────────────────────────────────
type TabType = 'blog' | 'destination' | 'tour';
type ModeType = 'create' | 'manage';

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

// ─── Main Component ────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabType>('blog');
  const [mode, setMode] = useState<ModeType>('create');
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

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

  // ── Blog fields ──
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogCover, setBlogCover] = useState<File | null>(null);

  // ── Destination fields ──
  const [destTitle, setDestTitle] = useState('');
  const [destExcerpt, setDestExcerpt] = useState('');
  const [destContent, setDestContent] = useState('');
  const [destLocation, setDestLocation] = useState('');
  const [destVideoUrl, setDestVideoUrl] = useState('');
  const [destCover, setDestCover] = useState<File | null>(null);

  // ── Tour fields ──
  const [tourTitle, setTourTitle] = useState('');
  const [tourExcerpt, setTourExcerpt] = useState('');
  const [tourDuration, setTourDuration] = useState('');
  const [tourPrice, setTourPrice] = useState('');
  const [tourHighlights, setTourHighlights] = useState('');
  const [tourItinerary, setTourItinerary] = useState('');
  const [tourVideoUrl, setTourVideoUrl] = useState('');
  const [tourCover, setTourCover] = useState<File | null>(null);

  // ── Auth check ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (!session) {
        router.push('/thailand/clogin');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });
  }, []);

  // ── Fetch items ──
  useEffect(() => {
    fetchItems();
  }, [tab]);

  const fetchItems = async () => {
    const table = tab === 'blog' ? 'posts' : tab === 'destination' ? 'destinations' : 'tours';
    const { data } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });
    setItems(data || []);
  };

  // ── Upload image ──
  const uploadImage = async (file: File, bucket: string): Promise<string> => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) return '';
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  // ── Reset forms ──
  const resetForms = () => {
    setEditing(null);
    setBlogTitle(''); setBlogContent(''); setBlogCategory(''); setBlogCover(null);
    setDestTitle(''); setDestExcerpt(''); setDestContent(''); setDestLocation('');
    setDestVideoUrl(''); setDestCover(null);
    setTourTitle(''); setTourExcerpt(''); setTourDuration(''); setTourPrice('');
    setTourHighlights(''); setTourItinerary(''); setTourVideoUrl(''); setTourCover(null);
    setSuccess(''); setError('');
  };

  // ── Load editing item ──
  const handleEdit = (item: any) => {
    setEditing(item);
    setMode('create');
    if (tab === 'blog') {
      setBlogTitle(item.title || '');
      setBlogContent(item.content || '');
      setBlogCategory(item.category || '');
    } else if (tab === 'destination') {
      setDestTitle(item.title || '');
      setDestExcerpt(item.excerpt || '');
      setDestContent(item.content || '');
      setDestLocation(item.location || '');
      setDestVideoUrl(item.video_url || '');
    } else {
      setTourTitle(item.title || '');
      setTourExcerpt(item.excerpt || '');
      setTourDuration(item.duration || '');
      setTourPrice(item.price || '');
      setTourHighlights(Array.isArray(item.highlights) ? item.highlights.join('\n') : item.highlights || '');
      setTourItinerary(typeof item.itinerary === 'object' ? JSON.stringify(item.itinerary, null, 2) : item.itinerary || '');
      setTourVideoUrl(item.video_url || '');
    }
    window.scrollTo(0, 0);
  };

  // ── Delete ──
  const handleDelete = async (id: string) => {
    if (!confirm('ဖျက်မှာ သေချာလား?')) return;
    const table = tab === 'blog' ? 'posts' : tab === 'destination' ? 'destinations' : 'tours';
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) { setError('ဖျက်ရာတွင် အမှားရှိသည်။'); return; }
    fetchItems();
  };

  // ── Publish / Update ──
  const handlePublish = async () => {
    setPublishing(true);
    setError(''); setSuccess('');

    try {
      if (tab === 'blog') {
        if (!blogTitle || !blogContent) { setError('Title နှင့် Content ထည့်ပါ။'); return; }
        let coverUrl = editing?.cover_image || '';
        if (blogCover) coverUrl = await uploadImage(blogCover, 'blog-images');
        const payload = {
          title: blogTitle,
          content: blogContent,
          excerpt: blogContent.slice(0, 150) + '...',
          category: blogCategory || null,
          cover_image: coverUrl,
          slug: editing?.slug || generateSlug(blogTitle),
          published: true,
          published_at: new Date().toISOString(),
        };
        if (editing) {
          await supabase.from('posts').update(payload).eq('id', editing.id);
        } else {
          await supabase.from('posts').insert(payload);
        }

      } else if (tab === 'destination') {
        if (!destTitle) { setError('Title ထည့်ပါ။'); return; }
        let coverUrl = editing?.cover_image || '';
        if (destCover) coverUrl = await uploadImage(destCover, 'blog-images');
        const payload = {
          title: destTitle,
          excerpt: destExcerpt || null,
          content: destContent || null,
          location: destLocation || null,
          video_url: destVideoUrl || null,
          cover_image: coverUrl,
          slug: editing?.slug || generateSlug(destTitle),
          published: true,
        };
        if (editing) {
          await supabase.from('destinations').update(payload).eq('id', editing.id);
        } else {
          await supabase.from('destinations').insert(payload);
        }

      } else {
        if (!tourTitle) { setError('Title ထည့်ပါ။'); return; }
        let coverUrl = editing?.cover_image || '';
        if (tourCover) coverUrl = await uploadImage(tourCover, 'blog-images');
        const highlightsArr = tourHighlights
          ? tourHighlights.split('\n').map(h => h.trim()).filter(Boolean)
          : [];
        let itineraryData: any = tourItinerary;
        try { itineraryData = JSON.parse(tourItinerary); } catch {}
        const payload = {
          title: tourTitle,
          excerpt: tourExcerpt || null,
          duration: tourDuration || null,
          price: tourPrice || null,
          highlights: highlightsArr,
          itinerary: itineraryData || null,
          video_url: tourVideoUrl || null,
          cover_image: coverUrl,
          slug: editing?.slug || generateSlug(tourTitle),
          published: true,
        };
        if (editing) {
          await supabase.from('tours').update(payload).eq('id', editing.id);
        } else {
          await supabase.from('tours').insert(payload);
        }
      }

      setSuccess(editing ? 'အောင်မြင်စွာ ပြင်ပြီးပါပြီ ✅' : 'အောင်မြင်စွာ တင်ပြီးပါပြီ ✅');
      resetForms();
      fetchItems();
    } catch (e) {
      setError('အမှားတစ်ခု ဖြစ်ပေါ်သည်။');
    } finally {
      setPublishing(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/thailand/clogin');
  };

  const tabLabel = { blog: 'Blog', destination: 'Destination', tour: 'Tour' };
  const viewUrl = {
    blog: '/thailand/blog',
    destination: '/thailand/thailand-destination',
    tour: '/thailand/tour',
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
          <a href={viewUrl[tab]} target="_blank" className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium hover:underline">
            <Eye size={13} /> View {tabLabel[tab]}
          </a>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-red-400 font-medium hover:underline">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      {/* ── Type Tabs ── */}
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <div className="flex gap-2 mb-4">
          {(['blog', 'destination', 'tour'] as TabType[]).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); resetForms(); setMode('create'); }}
              className={`px-5 py-2 rounded-xl font-bold text-sm transition-all capitalize ${
                tab === t ? 'bg-sacred-green text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:border-sacred-green'
              }`}
            >
              {t === 'blog' ? '📝' : t === 'destination' ? '📍' : '🗺️'} {tabLabel[t]}
            </button>
          ))}
        </div>

        {/* ── Mode Tabs ── */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setMode('create'); resetForms(); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'create' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            <Plus size={14} />
            {editing ? `Edit ${tabLabel[tab]}` : `${tabLabel[tab]} အသစ်`}
          </button>
          <button
            onClick={() => setMode('manage')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'manage' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            <List size={14} />
            စီမံရန် ({items.length})
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16">

        {/* ── Create / Edit Form ── */}
        {mode === 'create' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">

            {editing && (
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                <span>✏️ Editing: <strong>{editing.title}</strong></span>
                <button onClick={resetForms}><X size={15} /></button>
              </div>
            )}

            {/* ── BLOG FORM ── */}
            {tab === 'blog' && (
              <>
                <Field label="Title *">
                  <input value={blogTitle} onChange={e => setBlogTitle(e.target.value)} placeholder="Blog post title..." className={inputCls} />
                </Field>
                <Field label="Category">
                  <input value={blogCategory} onChange={e => setBlogCategory(e.target.value)} placeholder="Travel Tips, Guide, Food..." className={inputCls} />
                </Field>
                <Field label="Cover Image">
                  <input type="file" accept="image/*" onChange={e => setBlogCover(e.target.files?.[0] || null)} className={inputCls} />
                </Field>
                <Field label="Content (HTML) *">
                  <textarea value={blogContent} onChange={e => setBlogContent(e.target.value)} rows={14} placeholder="HTML content ကို ဒီနေရာမှာ paste လုပ်ပါ..." className={`${inputCls} resize-none`} />
                </Field>
              </>
            )}

            {/* ── DESTINATION FORM ── */}
            {tab === 'destination' && (
              <>
                <Field label="Title *">
                  <input value={destTitle} onChange={e => setDestTitle(e.target.value)} placeholder="Destination name..." className={inputCls} />
                </Field>
                <Field label="Location">
                  <input value={destLocation} onChange={e => setDestLocation(e.target.value)} placeholder="Bangkok, Chiang Mai, Phuket..." className={inputCls} />
                </Field>
                <Field label="Excerpt">
                  <input value={destExcerpt} onChange={e => setDestExcerpt(e.target.value)} placeholder="Short description..." className={inputCls} />
                </Field>
                <Field label="Cover Image">
                  <input type="file" accept="image/*" onChange={e => setDestCover(e.target.files?.[0] || null)} className={inputCls} />
                </Field>
                <Field label="Video URL (YouTube)">
                  <input value={destVideoUrl} onChange={e => setDestVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className={inputCls} />
                </Field>
                <Field label="Content (HTML)">
                  <textarea value={destContent} onChange={e => setDestContent(e.target.value)} rows={14} placeholder="HTML content..." className={`${inputCls} resize-none`} />
                </Field>
              </>
            )}

            {/* ── TOUR FORM ── */}
            {tab === 'tour' && (
              <>
                <Field label="Title *">
                  <input value={tourTitle} onChange={e => setTourTitle(e.target.value)} placeholder="Tour name..." className={inputCls} />
                </Field>
                <Field label="Excerpt">
                  <input value={tourExcerpt} onChange={e => setTourExcerpt(e.target.value)} placeholder="Short description..." className={inputCls} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Duration">
                    <input value={tourDuration} onChange={e => setTourDuration(e.target.value)} placeholder="3 Days 2 Nights" className={inputCls} />
                  </Field>
                  <Field label="Price">
                    <input value={tourPrice} onChange={e => setTourPrice(e.target.value)} placeholder="$299" className={inputCls} />
                  </Field>
                </div>
                <Field label="Cover Image">
                  <input type="file" accept="image/*" onChange={e => setTourCover(e.target.files?.[0] || null)} className={inputCls} />
                </Field>
                <Field label="Video URL (YouTube)">
                  <input value={tourVideoUrl} onChange={e => setTourVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className={inputCls} />
                </Field>
                <Field label="Highlights (တစ်ကြောင်းချင်း ရေးပါ)">
                  <textarea value={tourHighlights} onChange={e => setTourHighlights(e.target.value)} rows={5} placeholder={"Temple visit\nBeach tour\nLocal food experience"} className={`${inputCls} resize-none`} />
                </Field>
                <Field label="Itinerary (JSON သို့မဟုတ် Text)">
                  <textarea value={tourItinerary} onChange={e => setTourItinerary(e.target.value)} rows={8} placeholder={'Day 1: Arrive Bangkok...\nDay 2: Temple tour...'} className={`${inputCls} resize-none font-mono text-xs`} />
                </Field>
              </>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}

            <button
              onClick={handlePublish}
              disabled={publishing}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
            >
              {publishing ? 'Processing...' : editing ? `Update ${tabLabel[tab]}` : `Publish ${tabLabel[tab]}`}
            </button>
          </div>
        )}

        {/* ── Manage List ── */}
        {mode === 'manage' && (
          <div className="space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-20 text-gray-400">{tabLabel[tab]} မရှိသေးပါ။</div>
            ) : (
              items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-start">
                  {item.cover_image && (
                    <img src={item.cover_image} alt={item.title} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 truncate text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.location || item.duration || item.category || '—'} · {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{item.excerpt}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button onClick={() => handleEdit(item)} className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-medium hover:bg-amber-100">
                      <Pencil size={11} /> Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-medium hover:bg-red-100">
                      <Trash2 size={11} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
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
