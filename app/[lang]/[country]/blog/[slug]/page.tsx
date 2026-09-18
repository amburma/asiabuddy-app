import { createClient } from '@/lib/supabase/server'
import { createPublicClient } from '@/lib/supabase/public-server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import Image from 'next/image'
import MarkdownRenderer from '@/components/shared/MarkdownRenderer'
import KeyTakeawayBox from './KeyTakeawayBox'
import PhotoGallery from './PhotoGallery'
import StickyCTA from './StickyCTA'
import ArticleShareButtons from './ArticleShareButtons'
import { buildAlternates } from '@/lib/seo-alternates'

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
  params: Promise<{ lang: string; country: string; slug: string }>
}): Promise<Metadata> {
  const { lang, country: countrySlug, slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select('title, excerpt, cover_image')
    .eq('slug', slug)
    .eq('country', countrySlug)
    .eq('published', true)
    .single()

  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)

  const alternates = buildAlternates(lang, `/${countrySlug}/blog/${slug}`)

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
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} – AsiaBuddy ${country}`,
      description: data.excerpt ?? undefined,
      images: data.cover_image ? [data.cover_image] : [],
    },
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
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

function extractFirstParagraph(content: string): { firstParagraph: string; remainingContent: string } {
  const lines = content.trim().split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line && !line.startsWith('>') && !line.startsWith('#') && !line.startsWith('!') && !line.startsWith('|')) {
      const remaining = [...lines.slice(0, i), ...lines.slice(i + 1)].join('\n').trim()
      return { firstParagraph: line, remainingContent: remaining }
    }
  }
  return { firstParagraph: '', remainingContent: content }
}

function extractFaqItems(content: string): { question: string; answer: string }[] {
  const faqSectionRegex = /^##\s*.*frequently asked questions.*$/im
  const match = content.match(faqSectionRegex)
  if (!match || match.index === undefined) return []

  const afterFaqHeading = content.slice(match.index + match[0].length)
  // Stop at the next H2 heading (##  not ###) if one exists
  const nextH2Match = afterFaqHeading.match(/^##\s+(?!#)/m)
  const faqSection = nextH2Match && nextH2Match.index !== undefined
    ? afterFaqHeading.slice(0, nextH2Match.index)
    : afterFaqHeading

  const items: { question: string; answer: string }[] = []
  const parts = faqSection.split(/^###\s+/m).slice(1) // drop text before first ###
  for (const part of parts) {
    const lines = part.trim().split('\n')
    const question = lines[0].trim()
    const answer = lines.slice(1).join('\n').trim()
    if (question && answer) {
      items.push({ question, answer })
    }
  }
  return items
}

// ─── Main Page Component ───────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; country: string; slug: string }>
}) {
  const { lang, country: countrySlug, slug } = await params
  const { data: post, error } = await getCachedPost(slug, countrySlug)()

  if (error || !post) {
    notFound()
  }

  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)
  const { firstBlockquote, remainingContent } = extractFirstBlockquote(post.content)
  const { firstParagraph, remainingContent: bodyContent } = extractFirstParagraph(remainingContent)
  const faqItems = extractFaqItems(post.content)
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
        <h1 className="font-serif text-[#0D0D0D] font-bold text-[24px] md:text-[32px] lg:text-[36px] leading-tight mb-4 max-w-3xl">
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
          <div className="mb-8 relative w-full h-[400px] md:h-[500px] rounded-lg shadow-sm overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Intro Paragraph */}
        {firstParagraph && (
          <p className="text-base md:text-lg text-[#0D0D0D] leading-relaxed mb-8 max-w-3xl">
            {firstParagraph}
          </p>
        )}

        {/* Key Takeaway Box */}
        {firstBlockquote && (
          <KeyTakeawayBox content={firstBlockquote} />
        )}

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={bodyContent} />
        </div>

        {/* Photo Gallery */}
        {post.images && post.images.length > 0 && (
          <PhotoGallery images={post.images} />
        )}

        {/* Share Buttons */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Share this post</h3>
          <ArticleShareButtons
            postTitle={post.title}
            postSlug={post.slug}
            country={countrySlug}
            lang={lang}
          />
        </div>

        {/* Back Button */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
          <Link href={`/${lang}/${countrySlug}`} className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:underline">
            ← Back to {country} Guide
          </Link>
          <Link href={`/${lang}/${countrySlug}/blog`} className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:underline">
            Back to Blog →
          </Link>
        </div>
      </article>

      {/* JSON-LD Structured Data */}
      <script
        id="structured-data-blog-post"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt || undefined,
            "image": post.cover_image ? [post.cover_image] : undefined,
            "datePublished": post.created_at,
            "dateModified": post.updated_at || post.created_at,
            "author": {
              "@type": "Organization",
              "name": post.author || "AsiaBuddy Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AsiaBuddy",
              "url": "https://asiabuddy.app"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://asiabuddy.app/${lang}/${countrySlug}/blog/${slug}`
            }
          })
        }}
      />

      {faqItems.length > 0 && (
        <script
          id="structured-data-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map((item) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })
          }}
        />
      )}

      {/* Sticky CTA Bar (Mobile) */}
      <StickyCTA lang={lang} country={countrySlug} />
    </div>
  )
}