'use client'

import { Share2 } from 'lucide-react'

interface ArticleShareButtonsProps {
  postTitle: string
  postSlug: string
  country: string
  lang: string
}

export default function ArticleShareButtons({ postTitle, postSlug, country, lang }: ArticleShareButtonsProps) {
  const blogPostUrl = `https://asiabuddy.app/${lang}/${country}/blog/${postSlug}`

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: postTitle,
        url: blogPostUrl,
      })
    }
  }

  const canNativeShare = typeof navigator !== 'undefined' && navigator.share

  return (
    <div className="flex items-center gap-3">
      {/* Native Share Button */}
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 px-4 py-2 bg-[#0D0D0D] text-white rounded-lg hover:bg-[#1a1a1a] transition-colors"
          aria-label="Share this post"
        >
          <Share2 size={18} />
          <span className="text-sm font-medium">Share</span>
        </button>
      )}

      {/* Facebook Share Button */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogPostUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
        aria-label="Share on Facebook"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span className="text-sm font-medium">Facebook</span>
      </a>
    </div>
  )
}
