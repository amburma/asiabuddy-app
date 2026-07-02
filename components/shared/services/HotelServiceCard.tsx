'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import { SupportedLanguage } from '@/types/country';

interface HotelData {
  name: string;
  image_url: string;
  price_per_night: number;
  rating: number;
  reviews_count: number;
  location: string;
  free_cancellation: boolean;
  affiliate_url: string;
}

interface HotelServiceCardProps {
  hotel: HotelData;
  language?: SupportedLanguage;
  is_placeholder?: boolean;
}

export default function HotelServiceCard({ hotel, language = 'EN', is_placeholder = false }: HotelServiceCardProps) {
  const t = UI_TRANSLATIONS[language].serviceCards;
  const isPlaceholder = is_placeholder === true;
  return (
    <div className={`bg-[#0D0D0D] border border-[#0D0D0D] hover:border-[#C9A84C] rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col ${isPlaceholder ? 'opacity-75' : ''}`}>
      {/* Image Container - 16:9 aspect ratio */}
      <div className="relative w-full pt-[56.25%] bg-gray-800 overflow-hidden">
        <Image
          src={hotel.image_url}
          alt={hotel.name}
          fill
          className={`absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${isPlaceholder ? 'grayscale contrast-90' : ''}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Hotel Name */}
        <h3 className="font-playfair text-lg sm:text-xl text-[#F5F0E8] mb-2 line-clamp-2">
          {hotel.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[#F5F0E8] text-sm mb-3 opacity-90">
          <MapPin size={16} className="text-[#C9A84C] flex-shrink-0" />
          <span className="line-clamp-1">{hotel.location}</span>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-[#C9A84C] bg-opacity-20 px-2.5 py-1 rounded">
            <Star size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
            <span className="font-dm-mono text-sm text-[#C9A84C] font-medium">
              {hotel.rating.toFixed(1)}
            </span>
            <span className="text-[#F5F0E8] text-xs opacity-75">
              ({hotel.reviews_count})
            </span>
          </div>

          {/* Free Cancellation Badge */}
          {hotel.free_cancellation && (
            <div className="border border-[#C9A84C] px-2.5 py-1 rounded">
              <span className="text-xs text-[#C9A84C] font-medium">
                {t.freeCancellation}
              </span>
            </div>
          )}
        </div>

        {/* Price and CTA - Spacer between content and button */}
        <div className="mt-auto">
          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <span className="font-dm-mono text-2xl sm:text-3xl text-[#C9A84C] font-bold">
                ${hotel.price_per_night}
              </span>
              <span className="text-[#F5F0E8] text-sm opacity-75">{t.perNight}</span>
            </div>
          </div>

          {/* Book Now Button */}
          {isPlaceholder ? (
            <div
              aria-disabled="true"
              className="block w-full border border-[#C9A84C]/60 bg-[#1A1A1A] text-[#F5F0E8] text-center py-2.5 sm:py-3 rounded font-medium cursor-not-allowed opacity-90 text-sm sm:text-base"
            >
              Coming Soon
            </div>
          ) : (
            <Link
              href={hotel.affiliate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#C9A84C] text-[#0D0D0D] text-center py-2.5 sm:py-3 rounded font-medium hover:bg-opacity-90 transition-all duration-200 text-sm sm:text-base"
            >
              {t.bookNow}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
