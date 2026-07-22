'use client';

import Link from 'next/link';
import { Plane, MapPin } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../../lib/i18n';
import { SupportedLanguage } from '../../../types/country';

interface FlightData {
  airline: string;
  departure_city: string;
  arrival_city: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  stops: number;
  price: number | null;
  price_checked_at: string;
  affiliate_url: string;
}

interface FlightServiceCardProps {
  flight: FlightData;
  language?: SupportedLanguage;
  is_placeholder?: boolean;
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  // Use fixed format to prevent hydration mismatch (guaranteed byte-identical between server and client)
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

const stopsLabel = (stops: number): string => {
  if (stops === 0) return 'Direct';
  return `${stops} stop${stops > 1 ? 's' : ''}`;
};

export default function FlightServiceCard({ flight, language = 'EN', is_placeholder = false }: FlightServiceCardProps) {
  const t = UI_TRANSLATIONS[language].serviceCards;
  const relativeTime = getRelativeTime(flight.price_checked_at);
  // Check both the prop AND the URL pattern for safety
  const isPlaceholder = is_placeholder === true || flight.affiliate_url.startsWith('#placeholder-');

  return (
    <div className={`bg-[#0D0D0D] border border-[#0D0D0D] hover:border-[#D4AF37] rounded-lg overflow-hidden transition-all duration-300 p-4 sm:p-6 ${isPlaceholder ? 'opacity-75' : ''}`}>
      {/* Airline Header */}
      <div className="flex items-center gap-2 mb-6">
        <Plane size={18} className="text-[#D4AF37]" />
        <h3 className="font-playfair text-lg text-[#F5F0E8]">{flight.airline}</h3>
      </div>

      {/* Route Visualization */}
      <div className="mb-6">
        {/* Desktop: Horizontal Layout */}
        <div className="hidden sm:block">
          {/* Duration Label Above Line */}
          <div className="text-center mb-3">
            <span className="font-dm-mono text-xs text-[#F5F0E8] opacity-75 bg-[#1A1A1A] px-2 py-1 rounded inline-block">
              {flight.duration}
            </span>
          </div>

          {/* Route Line */}
          <div className="flex items-center gap-4">
            {/* Departure */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-3 h-3 bg-[#D4AF37] rounded-full mb-2"></div>
              <h4 className="font-playfair text-base sm:text-lg text-[#F5F0E8] mb-1">
                {flight.departure_city}
              </h4>
              <p className="font-dm-mono text-sm text-[#D4AF37]">
                {flight.departure_time}
              </p>
            </div>

            {/* Dotted Line with Stops Badge */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full border-b-2 border-dotted border-[#D4AF37] border-opacity-50 mb-2"></div>
              <div className="bg-[#0D0D0D] border border-[#D4AF37] text-[#D4AF37] text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                {stopsLabel(flight.stops)}
              </div>
            </div>

            {/* Arrival */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-3 h-3 bg-[#D4AF37] rounded-full mb-2"></div>
              <h4 className="font-playfair text-base sm:text-lg text-[#F5F0E8] mb-1">
                {flight.arrival_city}
              </h4>
              <p className="font-dm-mono text-sm text-[#D4AF37]">
                {flight.arrival_time}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Layout */}
        <div className="sm:hidden space-y-4">
          {/* Departure */}
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <h4 className="font-playfair text-base text-[#F5F0E8]">
                {flight.departure_city}
              </h4>
              <p className="font-dm-mono text-sm text-[#D4AF37]">
                {flight.departure_time}
              </p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 border-l-2 border-dotted border-[#D4AF37] border-opacity-50"></div>
          </div>

          {/* Duration and Stops */}
          <div className="flex gap-2 justify-center">
            <span className="font-dm-mono text-xs text-[#F5F0E8] opacity-75 bg-[#1A1A1A] px-2 py-1 rounded">
              {flight.duration}
            </span>
            <span className="bg-[#0D0D0D] border border-[#D4AF37] text-[#D4AF37] text-xs font-medium px-2 py-1 rounded-full">
              {stopsLabel(flight.stops)}
            </span>
          </div>

          {/* Vertical Line */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 border-l-2 border-dotted border-[#D4AF37] border-opacity-50"></div>
          </div>

          {/* Arrival */}
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <h4 className="font-playfair text-base text-[#F5F0E8]">
                {flight.arrival_city}
              </h4>
              <p className="font-dm-mono text-sm text-[#D4AF37]">
                {flight.arrival_time}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-4 pt-4 border-t border-[#1A1A1A]">
        <div className="mb-2">
          <span className="font-dm-mono text-3xl sm:text-4xl text-[#D4AF37] font-bold">
            {flight.price && flight.price > 0 ? `$${flight.price}` : 'See live prices'}
          </span>
        </div>
        <p className="text-xs text-[#F5F0E8] opacity-60">
          {t.priceChecked} {relativeTime}
        </p>
      </div>

      {/* Book Now Button */}
      {isPlaceholder ? (
        <button
          type="button"
          disabled
          onClick={(e) => e.preventDefault()}
          className="block w-full border border-[#D4AF37]/60 bg-[#1A1A1A] text-[#F5F0E8] text-center py-2.5 sm:py-3 rounded font-medium cursor-not-allowed opacity-90 text-sm sm:text-base"
        >
          Coming Soon
        </button>
      ) : (
        <Link
          href={flight.affiliate_url}
          target="_blank"
          rel="nofollow noopener sponsored"
          className="block w-full bg-[#D4AF37] text-[#0D0D0D] text-center py-2.5 sm:py-3 rounded font-medium hover:bg-opacity-90 transition-all duration-200 text-sm sm:text-base"
        >
          {t.bookNow}
        </Link>
      )}
    </div>
  );
}
