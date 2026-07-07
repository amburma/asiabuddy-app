'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock } from 'lucide-react';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import { SupportedLanguage } from '@/types/country';

interface TourData {
  activity_name: string;
  image_url: string;
  price_from: string | null;
  rating: string | null;
  reviews_count: string | null;
  duration: string;
  gyg_url: string;
}

interface TourServiceCardProps {
  tour: TourData;
  language?: SupportedLanguage;
}

export default function TourServiceCard({ tour, language = 'EN' }: TourServiceCardProps) {
  const t = UI_TRANSLATIONS[language].serviceCards;

  return (
    <div className="bg-[#0D0D0D] border border-[#0D0D0D] hover:border-[#C9A84C] rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col">
      {/* Image Container - 16:9 aspect ratio */}
      <div className="relative w-full pt-[56.25%] bg-gray-800 overflow-hidden">
        <Image
          src={tour.image_url || '/thailand.jpg'}
          alt={tour.activity_name}
          fill
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Tour Name */}
        <h3 className="font-playfair text-lg sm:text-xl text-[#F5F0E8] mb-3 line-clamp-2">
          {tour.activity_name}
        </h3>

        {/* Rating Badge */}
        {tour.rating != null && tour.reviews_count != null && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-[#C9A84C] bg-opacity-20 px-2.5 py-1.5 rounded">
              <Star size={14} className="text-[#C9A84C] fill-[#C9A84C] flex-shrink-0" />
              <span className="font-dm-mono text-sm text-[#C9A84C] font-medium">
                {tour.rating}
              </span>
              <span className="text-[#F5F0E8] text-xs opacity-75">
                ({tour.reviews_count})
              </span>
            </div>
          </div>
        )}

        {/* Duration Badge */}
        {tour.duration && (
          <div className="flex items-center gap-1.5 bg-[#C9A84C] bg-opacity-20 px-2.5 py-1.5 rounded mb-4">
            <Clock size={14} className="text-[#C9A84C] flex-shrink-0" />
            <span className="text-[#F5F0E8] text-xs sm:text-sm font-medium">
              {tour.duration}
            </span>
          </div>
        )}

        {/* Price and CTA - Spacer between content and button */}
        <div className="mt-auto">
          {/* Price */}
          {tour.price_from != null && tour.price_from !== '' && (
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="font-dm-mono text-2xl sm:text-3xl text-[#C9A84C] font-bold">
                  ${tour.price_from}
                </span>
                <span className="text-[#F5F0E8] text-sm opacity-75">{t.perPerson || 'per person'}</span>
              </div>
            </div>
          )}

          {/* Book Now Button - extra bottom padding on mobile to avoid FloatingChatButton overlap */}
          <Link
            href={tour.gyg_url}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="block w-full bg-[#C9A84C] text-[#0D0D0D] text-center py-2.5 sm:py-3 rounded font-medium hover:bg-opacity-90 transition-all duration-200 text-sm sm:text-base pb-8 sm:pb-3"
          >
            {t.bookNow}
          </Link>
        </div>
      </div>
    </div>
  );
}
