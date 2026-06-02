'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Script from 'next/script';
import { Globe, Calendar, ArrowRight } from 'lucide-react';
import FloatingBackButton from '@/components/FloatingBackButton';

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

// ─── Hero Post ─────────────────────────────────────────────
function HeroPost({ post }: { post: Post }) {
  return (
    <Link href={`/thailand/blog/${post.slug}`} className="group block mb-12">
      <article className="relative rounded-3xl overflow-hidden h-[420px] md:h-[520px]">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a5c3a] to-[#0d2218]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <span className="inline-block mb-4 text-[10px] uppercase tracking-[0.35em] font-bold text-[#d4a843] border border-[#d4a843]/40 rounded-full px-4 py-1">
            Featured Story
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-3 max-w-2xl group-hover:text-[#d4a843] transition-colors duration-300">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-white/60 text-sm max-w-xl leading-relaxed mb-5 line-clamp-2 hidden md:block">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-5 text-white/40 text-[11px] uppercase tracking-widest font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[#d4a843] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Read story <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Post Card ─────────────────────────────────────────────
function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/thailand/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden aspect-[16/10] bg-[#f5f3ec]">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl text-[#1a5c3a]/10">✦</span>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-base font-bold text-[#1a5c3a] group-hover:text-[#c49a2e] transition-colors leading-snug mb-2 line-clamp-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[10px] uppercase tracking-widest">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Calendar size={10} />
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric',
              })}
            </span>
            <span className="text-[#c49a2e] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              Read <ArrowRight size={10} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Skeleton Loader ───────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="aspect-[16/10] bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      </div>
    </div>
  );
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

  const [hero, ...rest] = posts;

  return (
    <>
      {/* ── Google Translate (hidden) ── */}
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

      <div className="min-h-screen" style={{ background: '#faf9f5' }}>

        {/* ── Header ── */}
        <header style={{ background: '#faf9f5' }} className="w-full">
          <div className="max-w-5xl mx-auto px-6 md:px-10 pt-14 pb-8">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-px" style={{ background: 'rgba(212,168,67,0.4)' }} />
              <span className="text-[9px] uppercase tracking-[0.45em] font-bold" style={{ color: '#1a5c3a' }}>
                AsiaBuddy — Thailand
              </span>
              <span className="w-8 h-px" style={{ background: 'rgba(212,168,67,0.4)' }} />
            </div>

            {/* Title */}
            <div className="flex flex-col items-center text-center gap-4 mb-6">
              <div>
                <h1
                  className="text-4xl sm:text-5xl md:text-7xl leading-none tracking-tight"
                  style={{ fontFamily: 'Georgia, serif', color: '#1a5c3a' }}
                >
                  The Blog
                </h1>
                <p className="text-sm italic font-light mt-2" style={{ color: '#aaa', letterSpacing: '0.04em' }}>
                  Stories, tips and guides from across Thailand
                </p>
              </div>

              {/* Language selector */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                <Globe size={12} style={{ color: '#ccc' }} />
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => translateTo(lang.code, setActiveLang)}
                    title={lang.name}
                    className="transition-all text-[10px] font-bold tracking-wide rounded-full px-3 py-1.5 border"
                    style={
                      activeLang === lang.code
                        ? { background: '#1a5c3a', color: '#fff', borderColor: '#1a5c3a' }
                        : { background: '#fff', color: '#888', borderColor: '#e5e5e5' }
                    }
                  >
                    {lang.flag} {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-grow h-px" style={{ background: 'linear-gradient(to right, rgba(212,168,67,0.35), transparent)' }} />
              <span style={{ color: 'rgba(212,168,67,0.4)', fontSize: 11 }}>✦</span>
              <div className="w-12 h-px" style={{ background: 'rgba(212,168,67,0.15)' }} />
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <main className="max-w-5xl mx-auto px-4 pb-24">
          {loading ? (
            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden animate-pulse bg-gray-100 h-[420px]" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: '#f0ede4' }}>
                <span style={{ color: '#c49a2e', fontSize: 22 }}>✦</span>
              </div>
              <h3 className="text-xl mb-2" style={{ fontFamily: 'Georgia, serif', color: '#1a5c3a' }}>
                Stories coming soon
              </h3>
              <p className="text-sm max-w-xs" style={{ color: '#bbb' }}>
                Our writers are exploring Thailand. Check back shortly for insider stories and guides.
              </p>
            </div>
          ) : (
            <>
              {hero && <HeroPost post={hero} />}
              {rest.length > 0 && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold whitespace-nowrap" style={{ color: '#bbb' }}>
                      More stories
                    </span>
                    <div className="flex-grow h-px" style={{ background: '#eee' }} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </main>

        {/* ── Footer ── */}
        <footer className="border-t bg-white" style={{ borderColor: '#f0ede4' }}>
          <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-3">
            <span className="text-sm tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#1a5c3a' }}>
              AsiaBuddy
            </span>
            <span className="w-px h-4" style={{ background: '#eee' }} />
            <span className="text-[9px] uppercase tracking-widest" style={{ color: '#bbb' }}>
              Thailand Travel Blog
            </span>
          </div>
        </footer>

        {/* ── Floating Back Button ── */}
        <FloatingBackButton
          href="https://asiabuddy.app/thailand"
          label="Thailand Guide"
        />

      </div>
    </>
  );
}