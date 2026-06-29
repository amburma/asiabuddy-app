'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-sacred-bg flex flex-col items-center justify-center px-4 text-center">
      
      {/* Decorative top line */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="w-16 h-[1px] bg-gold-deep/30" />
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-sacred-green">
          AsiaBuddy Services
        </span>
        <span className="w-16 h-[1px] bg-gold-deep/30" />
      </div>

      {/* Icon */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-6xl mb-6"
      >
        🏗️
      </motion.div>

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold text-sacred-green mb-4 tracking-tight">
        Coming Soon
      </h1>

      {/* Subtext */}
      <p className="text-gray-500 font-light italic text-sm md:text-base max-w-md mb-2">
        We are working hard to bring you the best travel services in Thailand.
      </p>
      <p className="text-gold-deep font-semibold text-sm mb-10">
        Hotel • Flight • Tickets • Transfer • Car Rental • Tours
      </p>

      {/* Divider */}
      <div className="w-12 h-0.5 bg-gold-deep/40 mb-10" />

      {/* CTA */}
      <Link
        href="/thailand"
        className="bg-gradient-to-r from-sacred-green to-emerald-950 text-white px-10 py-4 rounded-full shadow-xl flex items-center gap-3 font-bold transition-all hover:shadow-2xl border border-gold-deep/20"
      >
        <span className="bg-gold-deep p-1.5 rounded-full text-white text-xs">🏠</span>
        <span>Back to Home</span>
      </Link>

      {/* Bottom note */}
      <p className="mt-8 text-[11px] text-gray-400 italic">
        For bookings & inquiries, use our Live Support Chat on the home page.
      </p>

    </div>
  )
}
