import Link from 'next/link'
import Navbar from '@/components/shared/Navbar'

export default function ToursComingSoon({ country }: { country: string }) {
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  return (
    <div className="min-h-screen bg-white">
      <Navbar country={country} language="EN" />
      <div className="border-b border-gold-soft/20 bg-sacred-bg/70">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <div className="mt-6">
            <div className="inline-flex flex-col items-start gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
                TOURS
              </span>
              <span className="h-[1px] w-16 bg-gold-deep/70" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-sacred-green leading-tight">
              Excellent Tours — Coming Soon
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-24">
            <div className="text-8xl mb-6">🌏</div>
            <h3 className="text-3xl font-black text-gray-800 mb-3">
              We're hand-picking the best tours in {countryName} for you
            </h3>
            <p className="text-gray-400 text-lg max-w-md mb-8">
              Check back soon for curated experiences.
            </p>
            <Link
              href={`/${country}/activities`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Explore Activities →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
