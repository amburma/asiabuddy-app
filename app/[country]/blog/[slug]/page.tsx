import { createClient } from '../../../../lib/supabase/server'
import { createPublicClient } from '../../../../lib/supabase/public-server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import Image from 'next/image'
import MarkdownRenderer from '../../../../components/shared/MarkdownRenderer'
import KeyTakeawayBox from './KeyTakeawayBox'
import PhotoGallery from './PhotoGallery'
import StickyCTA from './StickyCTA'

// ─── Types ────────────────────────────────────────────────────
interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  author: string
  cover_image: string | null
  images: string[] | null
  published: boolean
  country: string
  created_at: string
  updated_at: string
}

// ─── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; slug: string }>
}): Promise<Metadata> {
  const { country: countrySlug, slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select('title, excerpt, cover_image')
    .eq('slug', slug)
    .eq('country', countrySlug)
    .eq('published', true)
    .single()

  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)

  if (!data) return { title: 'Blog Post – AsiaBuddy' }

  return {
    title: `${data.title} – AsiaBuddy ${country}`,
    description: data.excerpt ?? undefined,
    openGraph: {
      title: `${data.title} – AsiaBuddy ${country}`,
      description: data.excerpt ?? undefined,
      images: data.cover_image ? [data.cover_image] : [],
      url: `https://asiabuddy.app/${countrySlug}/blog/${slug}`,
    },
  }
}

// ─── Cached Data Fetching Functions ───────────────────────────
function getCachedPost(slug: string, country: string) {
  return unstable_cache(
    async () => {
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('country', country)
        .eq('published', true)
        .single()
      return { data, error }
    },
    [`post-${slug}-${country}`],
    { revalidate: 3600, tags: [`post-${slug}`] }
  )
}

// ─── Helper Functions ──────────────────────────────────────────
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.round(words / 200) || 1
}

function extractFirstBlockquote(content: string): { firstBlockquote: string; remainingContent: string } {
  const blockquoteRegex = /^>\s+(.+)$/m
  const match = content.match(blockquoteRegex)
  
  if (match) {
    const firstBlockquote = match[1]
    const remainingContent = content.replace(blockquoteRegex, '').trim()
    return { firstBlockquote, remainingContent }
  }
  
  return { firstBlockquote: '', remainingContent: content }
}

// ─── Main Page Component ───────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ country: string; slug: string }>
}) {
  const { country: countrySlug, slug } = await params
  const { data: post, error } = await getCachedPost(slug, countrySlug)()

  if (error || !post) {
    notFound()
  }

  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)
  const { firstBlockquote, remainingContent } = extractFirstBlockquote(post.content)
  const readingTime = calculateReadingTime(post.content)
  const formattedDate = formatDate(post.created_at)

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Category/Tag Pill */}
        <div className="mb-4">
          <span className="inline-block bg-[#F5F0E8] border border-[#D4AF37] text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {country} Travel
          </span>
        </div>

        {/* H1 Title */}
        <h1 className="text-[#0D0D0D] font-bold text-[24px] md:text-[32px] lg:text-[36px] leading-tight mb-4 max-w-3xl">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.excerpt && (
          <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-2xl">
            {post.excerpt}
          </p>
        )}

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6">
          <span className="font-medium">{post.author}</span>
          <span>•</span>
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="mb-8">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-sm object-cover max-h-[500px]"
            />
          </div>
        )}

        {/* Key Takeaway Box */}
        {firstBlockquote && (
          <KeyTakeawayBox content={firstBlockquote} />
        )}

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={remainingContent} />
        </div>

        {/* Photo Gallery */}
        {post.images && post.images.length > 0 && (
          <PhotoGallery images={post.images} />
        )}

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
          <Link href={`/${countrySlug}`} className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:underline">
            ← Back to {country} Guide
          </Link>
          <Link href={`/${countrySlug}/blog`} className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:underline">
            Back to Blog →
          </Link>
        </div>
      </article>

      {/* Sticky CTA Bar (Mobile) */}
      <StickyCTA 
        postTitle={post.title}
        postSlug={post.slug}
        country={countrySlug}
      />
    </div>
  )
}