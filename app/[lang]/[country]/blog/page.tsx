import { createPublicClient } from '@/lib/supabase/public-server'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────
interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  author: string
  created_at: string
  is_featured?: boolean
}

// ─── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country: countrySlug } = await params
  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)

  return {
    title: `Blog – AsiaBuddy ${country}`,
    description: `Travel guides, tips, and stories for ${country}`,
    openGraph: {
      title: `Blog – AsiaBuddy ${country}`,
      description: `Travel guides, tips, and stories for ${country}`,
      url: `https://asiabuddy.app/${countrySlug}/blog`,
      images: [
        {
          url: 'https://asiabuddy.app/images/thailand-destination-hero.jpg',
          width: 1200,
          height: 630,
          alt: 'AsiaBuddy - Travel Asia Like a Local',
        },
      ],
    },
  }
}

// ─── Cached Data Fetching Functions ───────────────────────────
function getCachedPosts(country: string, page: number) {
  return unstable_cache(
    async () => {
      const supabase = createPublicClient()
      const from = (page - 1) * 9
      const to = from + 8
      const { data, error, count } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, cover_image, author, created_at, is_featured', { count: 'exact' })
        .eq('country', country)
        .eq('published', true)
        .eq('is_featured', false)
        .order('created_at', { ascending: false })
        .range(from, to)
      return { data, error, count }
    },
    [`posts-${country}-page-${page}`],
    { revalidate: 3600, tags: [`posts-${country}`] }
  )
}

function getCachedFeaturedPost(country: string) {
  return unstable_cache(
    async () => {
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, cover_image, author, created_at, is_featured')
        .eq('country', country)
        .eq('published', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(1)
      return { data, error }
    },
    [`featured-post-${country}`],
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

// ─── Main Page Component ───────────────────────────────────────
export default async function BlogListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; country: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { lang, country: countrySlug } = await params
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page || '1', 10))
  const POSTS_PER_PAGE = 9
  const { data: posts, error, count } = await getCachedPosts(countrySlug, currentPage)()
  const { data: featuredPost } = await getCachedFeaturedPost(countrySlug)()
  const totalPages = Math.ceil((count || 0) / 9)

  const country = countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-[#0D0D0D] font-bold text-[28px] md:text-[36px] mb-2">
          {country} Travel Blog
        </h1>
        <p className="text-gray-600 text-lg">
          Discover travel guides, tips, and stories
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {/* Featured Post Banner */}
        {featuredPost && featuredPost.length > 0 && (
          <Link
            href={`/${lang}/${countrySlug}/blog/${featuredPost[0].slug}`}
            className="group block mb-12"
          >
            <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Cover Image */}
              {featuredPost[0].cover_image ? (
                <div className="relative aspect-[21/9] overflow-hidden bg-gray-100">
                  <img
                    src={featuredPost[0].cover_image}
                    alt={featuredPost[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <span className="inline-block bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                      FEATURED
                    </span>
                    <h2 className="text-white font-bold text-2xl md:text-4xl mb-3 line-clamp-2 drop-shadow-md">
                      {featuredPost[0].title}
                    </h2>
                    {featuredPost[0].excerpt && (
                      <p className="text-white/90 text-base md:text-lg mb-6 line-clamp-2 max-w-3xl drop-shadow-md">
                        {truncateExcerpt(featuredPost[0].excerpt, 200)}
                      </p>
                    )}
                    <div className="inline-flex items-center gap-2 bg-white text-[#0D0D0D] font-bold px-6 py-3 rounded-xl hover:bg-[#D4AF37] hover:text-white transition-colors">
                      Read Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-[21/9] bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
              )}
            </article>
          </Link>
        )}

        {error || !posts || posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No posts yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/${lang}/${countrySlug}/blog/${post.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  {/* Cover Image */}
                  {post.cover_image ? (
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                        {truncateExcerpt(post.excerpt)}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-2 text-gray-500 text-xs pt-4 border-t border-gray-100">
                      <span className="font-medium">{post.author}</span>
                      <span>•</span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/${countrySlug}/blog?page=${pageNum}`}
                className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition ${
                  pageNum === currentPage
                    ? 'bg-[#D4AF37] text-white'
                    : 'bg-white text-[#0D0D0D] border border-gray-200 hover:border-[#D4AF37]'
                }`}
              >
                {pageNum}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
