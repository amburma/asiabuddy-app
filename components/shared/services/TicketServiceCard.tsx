'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../../lib/i18n';
import { SupportedLanguage } from '../../../types/country';

interface TicketData {
  activity_name: string;
  image_url: string | null;
  price_from: string | null;
  rating: string | null;
  reviews_count: string | null;
  duration: string | null;
  klook_url: string;
  is_placeholder: string;
}

interface TicketServiceCardProps {
  ticket: TicketData;
  language?: SupportedLanguage;
}

export default function TicketServiceCard({ ticket, language = 'EN' }: TicketServiceCardProps) {
  const t = UI_TRANSLATIONS[language].serviceCards;
  const isPlaceholder = ticket.is_placeholder === 'true';

  return (
    <div className="bg-[#0D0D0D] border border-[#0D0D0D] hover:border-[#C9A84C] rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col">
      {/* Image Container - 16:9 aspect ratio */}
      <div className="relative w-full pt-[56.25%] bg-gray-800 overflow-hidden">
        {ticket.image_url ? (
          <Image
            src={ticket.image_url}
            alt={ticket.activity_name}
            fill
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <span className="text-4xl">🎫</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Activity Name */}
        <h3 className="font-playfair text-lg sm:text-xl text-[#F5F0E8] mb-3 line-clamp-2">
          {ticket.activity_name}
        </h3>

        {/* Rating Badge - only show if rating exists */}
        {ticket.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-[#C9A84C] bg-opacity-20 px-2.5 py-1.5 rounded">
              <Star size={14} className="text-[#C9A84C] fill-[#C9A84C] flex-shrink-0" />
              <span className="font-dm-mono text-sm text-[#C9A84C] font-medium">
                {ticket.rating}
              </span>
              {ticket.reviews_count && (
                <span className="text-[#F5F0E8] text-xs opacity-75">
                  ({ticket.reviews_count})
                </span>
              )}
            </div>
          </div>
        )}

        {/* Duration Badge - only show if duration exists */}
        {ticket.duration && (
          <div className="flex items-center gap-1.5 bg-[#C9A84C] bg-opacity-20 px-2.5 py-1.5 rounded mb-4">
            <Clock size={14} className="text-[#C9A84C] flex-shrink-0" />
            <span className="text-[#F5F0E8] text-xs sm:text-sm font-medium">
              {ticket.duration}
            </span>
          </div>
        )}

        {/* Price and CTA - Spacer between content and button */}
        <div className="mt-auto">
          {/* Price - only show if price_from exists */}
          {ticket.price_from && (
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="font-dm-mono text-2xl sm:text-3xl text-[#C9A84C] font-bold">
                  ${ticket.price_from}
                </span>
                <span className="text-[#F5F0E8] text-sm opacity-75">{t.perPerson || 'per person'}</span>
              </div>
            </div>
          )}

          {/* Book Now Button - extra bottom padding on mobile to avoid FloatingChatButton overlap */}
          {isPlaceholder ? (
            <button
              type="button"
              disabled
              onClick={(e) => e.preventDefault()}
              className="block w-full border border-[#C9A84C]/60 bg-[#1A1A1A] text-[#F5F0E8] text-center py-2.5 sm:py-3 rounded font-medium cursor-not-allowed opacity-90 text-sm sm:text-base pb-8 sm:pb-3"
            >
              Coming Soon
            </button>
          ) : (
            <Link
              href={ticket.klook_url}
              target="_blank"
              rel="nofollow noopener sponsored"
              className="block w-full bg-[#C9A84C] text-[#0D0D0D] text-center py-2.5 sm:py-3 rounded font-medium hover:bg-opacity-90 transition-all duration-200 text-sm sm:text-base pb-8 sm:pb-3"
            >
              {t.bookNow}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
