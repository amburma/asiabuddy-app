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

function getCachedRelatedPosts(country: string, currentSlug: string) {
  return unstable_cache(
    async () => {
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, cover_image, author, created_at')
        .eq('country', country)
        .eq('published', true)
        .neq('slug', currentSlug)
        .order('created_at', { ascending: false })
        .limit(3)
      return { data, error }
    },
    [`related-posts-${country}-${currentSlug}`],
    { revalidate: 3600, tags: [`posts-${country}`] }
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

function truncateExcerpt(excerpt: string | null, maxLength: number = 120): string {
  if (!excerpt) return ''
  if (excerpt.length <= maxLength) return excerpt
  return excerpt.slice(0, maxLength).trim() + '...'
}

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

function extractHeadings(content: string): { text: string; id: string }[] {
  const headingRegex = /^##\s+(.+)$/gm
  const headings: { text: string; id: string }[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1].trim()
    headings.push({ text, id: slugify(text) })
  }
  return headings
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
  const { data: relatedPosts } = await getCachedRelatedPosts(countrySlug, slug)()

  if (error || !post) {
    notFound()
  }

  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)
  const { firstBlockquote, remainingContent } = extractFirstBlockquote(post.content)
  const { firstParagraph, remainingContent: bodyContent } = extractFirstParagraph(remainingContent)
  const faqItems = extractFaqItems(post.content)
  const headings = extractHeadings(bodyContent)
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

        {/* Table of Contents */}
        {headings.length >= 3 && (
          <nav className="mb-8 p-6 bg-white border border-gray-100 rounded-xl">
            <h3 className="text-sm font-semibold text-[#0D0D0D] uppercase tracking-wide mb-4">
              Table of Contents
            </h3>
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-[#D4AF37] hover:underline text-sm">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={bodyContent} />
        </div>

        {/* Photo Gallery */}
        {post.images && post.images.length > 0 && (
          <PhotoGallery images={post.images} />
        )}

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-[#0D0D0D] uppercase tracking-wide mb-6">
              More from {country} Travel
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/${lang}/${countrySlug}/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    {/* Cover Image */}
                    {relatedPost.cover_image ? (
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        <Image
                          src={relatedPost.cover_image}
                          alt={relatedPost.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h2 className="text-[#0D0D0D] font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                        {relatedPost.title}
                      </h2>

                      {relatedPost.excerpt && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                          {truncateExcerpt(relatedPost.excerpt)}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-2 text-gray-500 text-xs pt-4 border-t border-gray-100">
                        <span className="font-medium">{relatedPost.author}</span>
                        <span>•</span>
                        <span>{formatDate(relatedPost.created_at)}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
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

        {/* Author Bio */}
        {post.author === 'AsiaBuddy Team' && (
          <div className="mt-8 p-6 bg-white border border-gray-100 rounded-xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#0D0D0D] flex items-center justify-center flex-shrink-0">
              <span className="text-[#D4AF37] font-bold text-lg">AB</span>
            </div>
            <div>
              <p className="text-[#0D0D0D] font-bold text-sm">AsiaBuddy Team</p>
              <p className="text-gray-600 text-sm mt-1">
                Local experts helping travelers explore Southeast Asia with confidence — trusted guides, curated tours, and real destination knowledge.
              </p>
            </div>
          </div>
        )}
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