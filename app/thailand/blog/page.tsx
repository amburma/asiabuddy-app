'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Script from 'next/script';
import { Globe, Calendar } from 'lucide-react';

// ─── Language Config ───────────────────────────────────────
const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'th', label: 'TH', flag: '🇹🇭', name: 'Thai' },
  { code: 'my', label: 'MM', flag: '🇲🇲', name: 'Myanmar' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Spanish' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'French' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
];

// ─── Translate Function ────────────────────────────────────
function translateTo(langCode: string, setActiveLang: (l: string) => void) {
  if (langCode === 'en') {
    const googCookie = document.cookie.match(/googtrans=([^;]+)/);
    if (googCookie) {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname;
      window.location.reload();
      return;
    }
    setActiveLang('en');
    return;
  }
  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
    setActiveLang(langCode);
  } else {
    setTimeout(() => {
      const retrySelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (retrySelect) {
        retrySelect.value = langCode;
        retrySelect.dispatchEvent(new Event('change'));
        setActiveLang(langCode);
      }
    }, 1000);
  }
}

// ─── Types ─────────────────────────────────────────────────
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  created_at: string;
}

// ─── Main Component ────────────────────────────────────────
export default function ThailandBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLang, setActiveLang] = useState('en');

  useEffect(() => {
async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      setPosts(data || []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <>
      {/* ── Google Translate Widget (hidden) ── */}
      <div id="google_translate_element" className="hidden" />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <Script id="google-translate-init" strategy="afterInteractive">{`
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,th,my,es,fr,de',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, 'google_translate_element');
        }
      `}</Script>
      <style>{`
        .goog-te-banner-frame, .skiptranslate { display: none !important; }
        body { top: 0 !important; }
        .goog-te-combo { visibility: hidden; position: absolute; }
      `}</style>

      <div className="min-h-screen bg-gray-50">

        {/* ── Header ── */}
        <header className="bg-white border-b border-gray-200 px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Thailand Travel Blog</h1>
          <p className="text-gray-500 mt-2">Tips, guides, and experiences from Thailand</p>

          {/* Translation Buttons */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <Globe size={13} className="text-gray-300" />
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => translateTo(lang.code, setActiveLang)}
                title={lang.name}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all border ${
                  activeLang === lang.code
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>
        </header>

        {/* ── Posts Grid ── */}
        <main className="max-w-5xl mx-auto px-4 py-10">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">Post မရှိသေးပါ။</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/thailand/blog/${post.slug}`}>
                  <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full">
                    {post.cover_image && (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-5 space-y-2">
                      <h2 className="text-lg font-bold text-gray-800 line-clamp-2">{post.title}</h2>
                      <p className="text-gray-500 text-sm line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar size={11} />
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric',
                          })}
                        </span>
                        <span className="text-xs text-emerald-600 font-medium">Read more →</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}