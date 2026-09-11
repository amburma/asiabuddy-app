'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bookmark, Share2 } from 'lucide-react'

export default function StickyCTA({ postTitle, postSlug, country }: { postTitle: string; postSlug: string; country: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroImage = document.querySelector('article img')
      if (heroImage) {
        const heroBottom = heroImage.getBoundingClientRect().bottom
        setIsVisible(heroBottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: postTitle,
        url: window.location.href,
      })
    }
  }

  if (!isVisible) return null

  const blogPostUrl = `https://asiabuddy.app/${country}/blog/${postSlug}`

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] p-4 z-50 md:hidden">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        {/* Secondary Actions */}
        <div className="flex gap-2">
          <button
            className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            aria-label="Save post"
          >
            <Bookmark size={20} />
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            aria-label="Share post"
            onClick={handleShare}
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Main CTA Button */}
        <Link
          href={`/${country}/contact?ref=${encodeURIComponent(blogPostUrl)}`}
          className="flex-1 bg-[#F59E0B] text-[#F5F0E8] font-bold py-3 px-6 rounded-lg text-center min-h-[44px] flex items-center justify-center hover:bg-[#E0890A] transition-colors"
        >
          Plan This Trip
        </Link>
      </div>
    </div>
  )
}