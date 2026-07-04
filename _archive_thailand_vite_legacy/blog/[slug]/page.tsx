// app/thailand/blog/page.tsx
// Blog listing page — AsiaBuddy Thailand

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thailand Travel Blog – AsiaBuddy',
  description: 'Insider stories, travel tips and guides for Thailand by AsiaBuddy.',
  openGraph: {
    title: 'Thailand Travel Blog – AsiaBuddy',
    description: 'Insider stories, travel tips and guides for Thailand.',
    url: 'https://asiabuddy.app/thailand/blog',
  },
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  category: string | null
  published_at: string | null
  read_time: number | null
}

async function getPosts(): Promise<Post[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, cover_image, category, published_at, read_time')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    return []
  }
  return data ?? []
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Hero post (first item) ───────────────────────────────────────────────────
function HeroPost({ post }: { post: Post }) {
  return (
    <Link href={`/thailand/blog/${post.slug}`} className="group block">
      <article className="relative rounded-3xl overflow-hidden min-h-[520px] md:min-h-[600px] flex items-end">
        {/* Background image */}
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sacred-green to-emerald-950" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 w-full">
          {post.category && (
            <span className="inline-block mb-4 text-[10px] uppercase tracking-[0.35em] font-bold text-gold-soft border border-gold-soft/40 rounded-full px-4 py-1 backdrop-blur-sm bg-black/20">
              {post.category}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4 max-w-3xl group-hover:text-gold-soft transition-colors duration-300">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-white/70 text-sm md:text-base max-w-2xl leading-relaxed font-light mb-6 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-6 text-white/50 text-xs uppercase tracking-widest font-medium">
            {post.published_at && <span>{formatDate(post.published_at)}</span>}
            {post.read_time && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>{post.read_time} min read</span>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-gold-soft group-hover:underline underline-offset-4 transition-all">
              Read story →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// ─── Regular post card ────────────────────────────────────────────────────────
function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/thailand/blog/${post.slug}`} className="group block">
      <article className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        {/* Cover */}
        <div className="relative aspect-[16/10] overflow-hidden bg-sacred-bg">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sacred-green/10 to-gold-deep/10 flex items-center justify-center">
              <span className="text-4xl opacity-20">✦</span>
            </div>
          )}
          {post.category && (
            <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.3em] font-bold text-sacred-green bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
              {post.category}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-grow p-5">
          <h3 className="text-base md:text-lg font-serif text-sacred-green group-hover:text-gold-deep transition-colors leading-snug mb-2 line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-400 font-medium pt-3 border-t border-gray-100">
            {post.published_at && <span>{formatDate(post.published_at)}</span>}
            {post.read_time && <span>{post.read_time} min</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-16 h-16 rounded-full bg-sacred-bg flex items-center justify-center mb-6">
        <span className="text-2xl text-gold-deep">✦</span>
      </div>
      <h3 className="text-xl font-serif text-sacred-green mb-2">Stories coming soon</h3>
      <p className="text-gray-400 text-sm max-w-xs">
        Our writers are exploring Thailand. Check back shortly for insider stories and guides.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPage() {
  const posts = await getPosts()
  const [hero, ...rest] = posts

  return (
    <div className="min-h-screen bg-sacred-bg/30">
      {/* ── Page header ─────────────────────── */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-10 h-[1px] bg-gold-deep/30" />
          <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-sacred-green">
            AsiaBuddy — Thailand
          </span>
          <span className="w-10 h-[1px] bg-gold-deep/30" />
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif text-sacred-green leading-none tracking-tight">
              The Blog
            </h1>
            <p className="text-gray-400 text-sm italic font-light mt-3 tracking-wide">
              Stories, tips and guides from across Thailand
            </p>
          </div>
          {posts.length > 0 && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium pb-2">
              {posts.length} {posts.length === 1 ? 'story' : 'stories'}
            </p>
          )}
        </div>
        {/* Decorative rule */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-gold-deep/30 to-transparent" />
          <span className="text-gold-deep/40 text-xs">✦</span>
          <div className="w-16 h-[1px] bg-gold-deep/20" />
        </div>
      </header>

      {/* ── Main content ─────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Hero */}
            {hero && (
              <section className="mb-16">
                <HeroPost post={hero} />
              </section>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
                    More stories
                  </h2>
                  <div className="flex-grow h-[1px] bg-gray-100" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* ── Footer strip ─────────────────────── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-sacred-green font-serif tracking-widest">
              AsiaBuddy
            </span>
            <span className="w-[1px] h-4 bg-gray-200" />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
              Thailand Travel Blog
            </span>
          </div>
          <Link
            href="/thailand"
            className="text-[10px] uppercase tracking-widest text-gold-deep font-bold hover:text-sacred-green transition-colors"
          >
            ← Back to Thailand Guide
          </Link>
        </div>
      </footer>
    </div>
  )
}