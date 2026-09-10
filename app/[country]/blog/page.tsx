import { createPublicClient } from '../../../lib/supabase/public-server'
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
  }
}

// ─── Cached Data Fetching Functions ───────────────────────────
function getCachedPosts(country: string) {
  return unstable_cache(
    async () => {
      const supabase = createPublicClient()
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, cover_image, author, created_at')
        .eq('country', country)
        .eq('published', true)
        .order('created_at', { ascending: false })
      return { data, error }
    },
    [`posts-${country}`],
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
}: {
  params: Promise<{ country: string }>
}) {
  const { country: countrySlug } = await params
  const { data: posts, error } = await getCachedPosts(countrySlug)()

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
        {error || !posts || posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No posts yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/${countrySlug}/blog/${post.slug}`}
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
      </div>
    </div>
  )
}
