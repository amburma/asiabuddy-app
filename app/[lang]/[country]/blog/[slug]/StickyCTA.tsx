'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'

export default function StickyCTA({ country, lang }: { country: string; lang: string }) {
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

  if (!isVisible) return null

  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] p-4 z-50 md:hidden">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Back to Country Guide */}
        <Link
          href={`/${lang}/${country}`}
          className="flex items-center gap-2 text-white text-sm font-medium hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to {countryName}</span>
        </Link>

        {/* Middle: Page Numbers */}
        <div className="flex items-center gap-2">
          <Link
            href={`/${lang}/${country}/blog?page=1`}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
          >
            1
          </Link>
          <Link
            href={`/${lang}/${country}/blog?page=2`}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
          >
            2
          </Link>
          <Link
            href={`/${lang}/${country}/blog?page=3`}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
          >
            3
          </Link>
        </div>

        {/* Right: Back to Blog */}
        <Link
          href={`/${lang}/${country}/blog`}
          className="flex items-center gap-2 text-white text-sm font-medium hover:text-[#D4AF37] transition-colors"
        >
          <span>Back to Blog</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  )
}
