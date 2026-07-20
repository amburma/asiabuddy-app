import Link from 'next/link'
import { UI_TRANSLATIONS } from '@/lib/i18n'
import { SupportedLanguage } from '@/types/country'
import { GygLinksSummary } from '@/lib/queries/gygLinks'
import { AgodaLink } from '@/lib/queries/agodaLinks'
import { KlookLink } from '@/lib/queries/klookLinks'
import { TransferLink } from '@/lib/queries/transferLinks'

interface ServicesStripProps {
  country: string
  language: SupportedLanguage
  agodaLinks: AgodaLink[]
  klookLinks: KlookLink[]
  transfer12goLinks: TransferLink[]
  transferWayawayLinks: TransferLink[]
  gygSummary: GygLinksSummary
}

export default function ServicesStrip({
  country,
  language,
  agodaLinks,
  klookLinks,
  transfer12goLinks,
  transferWayawayLinks,
  gygSummary,
}: ServicesStripProps) {
  const uiT = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN

  return (
    <section className="bg-white pt-8 pb-4 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase text-center">
          OUR SERVICES
        </h2>
        <div className="w-12 h-0.5 bg-amber-500 mt-2 mb-6 mx-auto" />

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <Link
            href={`/${country}/hotels`}
            className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl py-4 px-2 shadow-sm hover:shadow-md hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 cursor-pointer"
          >
            <span className="text-3xl mb-2 hover:scale-110 transition-transform">🏨</span>
            <span className="text-xs font-semibold text-gray-700 text-center whitespace-nowrap">
              {uiT.servicesStrip.hotel}
            </span>
            {agodaLinks.length > 0 && (
              <span className="text-[10px] text-gray-500 text-center mt-1">
                {agodaLinks.length} hotels{agodaLinks[0]?.price_from != null && agodaLinks[0].price_from !== '' ? ` from $${agodaLinks[0].price_from}` : ''}
              </span>
            )}
          </Link>

          <Link
            href={`/${country}/flights`}
            className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl py-4 px-2 shadow-sm hover:shadow-md hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 cursor-pointer"
          >
            <span className="text-3xl mb-2 hover:scale-110 transition-transform">✈️</span>
            <span className="text-xs font-semibold text-gray-700 text-center whitespace-nowrap">
              {uiT.servicesStrip.flight}
            </span>
            {transferWayawayLinks.length > 0 && (
              <span className="text-[10px] text-gray-500 text-center mt-1">
                {transferWayawayLinks.length} flights{transferWayawayLinks[0]?.price_from != null && transferWayawayLinks[0].price_from !== '' ? ` from $${transferWayawayLinks[0].price_from}` : ''}
              </span>
            )}
          </Link>

          <Link
            href={`/${country}/tickets`}
            className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl py-4 px-2 shadow-sm hover:shadow-md hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 cursor-pointer"
          >
            <span className="text-3xl mb-2 hover:scale-110 transition-transform">🎫</span>
            <span className="text-xs font-semibold text-gray-700 text-center whitespace-nowrap">
              {uiT.servicesStrip.tickets}
            </span>
            {klookLinks.length > 0 && (
              <span className="text-[10px] text-gray-500 text-center mt-1">
                {klookLinks.length} tickets{klookLinks[0]?.price_from != null && klookLinks[0].price_from !== '' ? ` from $${klookLinks[0].price_from}` : ''}
              </span>
            )}
          </Link>

          <Link
            href={`/${country}/transfers`}
            className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl py-4 px-2 shadow-sm hover:shadow-md hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 cursor-pointer"
          >
            <span className="text-3xl mb-2 hover:scale-110 transition-transform">🚗</span>
            <span className="text-xs font-semibold text-gray-700 text-center whitespace-nowrap">
              {uiT.servicesStrip.transfer}
            </span>
            {transfer12goLinks.length > 0 && (
              <span className="text-[10px] text-gray-500 text-center mt-1">
                {transfer12goLinks.length} transfers{transfer12goLinks[0]?.price_from != null && transfer12goLinks[0].price_from !== '' ? ` from $${transfer12goLinks[0].price_from}` : ''}
              </span>
            )}
          </Link>

          <Link
            href={`/${country}/rental`}
            className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl py-4 px-2 shadow-sm hover:shadow-md hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 cursor-pointer"
          >
            <span className="text-3xl mb-2 hover:scale-110 transition-transform">🚙</span>
            <span className="text-xs font-semibold text-gray-700 text-center whitespace-nowrap">
              {uiT.servicesStrip.carRental}
            </span>
          </Link>

          <Link
            href={`/${country}/activities`}
            className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl py-4 px-2 shadow-sm hover:shadow-md hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 cursor-pointer"
          >
            <span className="text-3xl mb-2 hover:scale-110 transition-transform">🗺️</span>
            <span className="text-xs font-semibold text-gray-700 text-center whitespace-nowrap">
              Tours
            </span>
            {gygSummary.count > 0 && gygSummary.minPrice && (
              <span className="text-[10px] text-gray-500 text-center mt-1">
                {gygSummary.count} activities from {gygSummary.minPrice}
              </span>
            )}
          </Link>
        </div>

        <hr className="border-gray-100 mt-8" />
      </div>
    </section>
  )
}
