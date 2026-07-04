'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Zap, QrCode, Smartphone, CheckCircle2 } from 'lucide-react';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import { SupportedLanguage } from '@/types/country';

interface TicketData {
  attraction_name: string;
  image_url: string;
  price: number;
  rating: number;
  reviews_count: number;
  skip_the_line: boolean;
  instant_confirmation: boolean;
  delivery_method: 'qr' | 'voucher' | 'mobile';
  affiliate_url: string;
}

interface TicketServiceCardProps {
  ticket: TicketData;
  language?: SupportedLanguage;
  is_placeholder?: boolean;
}

export default function TicketServiceCard({ ticket, language = 'EN', is_placeholder = false }: TicketServiceCardProps) {
  const t = UI_TRANSLATIONS[language].serviceCards;
  // Check both the prop AND the URL pattern for safety
  const isPlaceholder = is_placeholder === true || ticket.affiliate_url.startsWith('#placeholder-');
  const getDeliveryIcon = () => {
    switch (ticket.delivery_method) {
      case 'qr':
        return <QrCode size={14} className="text-[#E0B952]" />;
      case 'mobile':
        return <Smartphone size={14} className="text-[#E0B952]" />;
      case 'voucher':
        return <QrCode size={14} className="text-[#E0B952]" />;
      default:
        return <QrCode size={14} className="text-[#E0B952]" />;
    }
  };

  const getDeliveryLabel = () => {
    switch (ticket.delivery_method) {
      case 'qr':
        return 'QR Code';
      case 'mobile':
        return 'Mobile';
      case 'voucher':
        return 'Voucher';
      default:
        return 'QR Code';
    }
  };

  return (
    <div className={`bg-[#0D0D0D] border border-[#0D0D0D] hover:border-[#E0B952] rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col ${isPlaceholder ? 'opacity-75' : ''}`}>
      {/* Image Container - 16:9 aspect ratio */}
      <div className="relative w-full pt-[56.25%] bg-gray-800 overflow-hidden">
        <Image
          src={ticket.image_url}
          alt={ticket.attraction_name}
          fill
          className={`absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${isPlaceholder ? 'grayscale contrast-90' : ''}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Attraction Name */}
        <h3 className="font-playfair text-lg sm:text-xl text-[#F5F0E8] mb-3 line-clamp-2">
          {ticket.attraction_name}
        </h3>

        {/* Rating Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-[#E0B952] bg-opacity-20 px-2.5 py-1.5 rounded">
            <Star size={14} className="text-[#E0B952] fill-[#E0B952]" />
            <span className="font-dm-mono text-sm text-[#E0B952] font-medium">
              {ticket.rating.toFixed(1)}
            </span>
            <span className="text-[#F5F0E8] text-xs opacity-75">
              ({ticket.reviews_count})
            </span>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Skip the Line Badge */}
          {ticket.skip_the_line && (
            <div className="flex items-center gap-1.5 bg-[#E0B952] bg-opacity-20 px-2.5 py-1.5 rounded">
              <Zap size={14} className="text-[#E0B952]" />
              <span className="text-[#F5F0E8] text-xs sm:text-sm font-medium">
                {t.skipTheLine}
              </span>
            </div>
          )}

          {/* Instant Confirmation */}
          {ticket.instant_confirmation && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded">
              <CheckCircle2 size={14} className="text-green-500" />
              <span className="text-[#F5F0E8] text-xs sm:text-sm font-medium">
                {t.instantConfirmation}
              </span>
            </div>
          )}

          {/* Delivery Method */}
          <div className="flex items-center gap-1.5 bg-[#E0B952] bg-opacity-20 px-2.5 py-1.5 rounded">
            {getDeliveryIcon()}
            <span className="text-[#F5F0E8] text-xs sm:text-sm font-medium">
              {getDeliveryLabel()}
            </span>
          </div>
        </div>

        {/* Price and CTA - Spacer between content and button */}
        <div className="mt-auto">
          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <span className="font-dm-mono text-2xl sm:text-3xl text-[#E0B952] font-bold">
                ${ticket.price}
              </span>
              <span className="text-[#F5F0E8] text-sm opacity-75">{t.perPerson}</span>
            </div>
          </div>

          {/* Book Now Button */}
          {isPlaceholder ? (
            <button
              type="button"
              disabled
              onClick={(e) => e.preventDefault()}
              className="block w-full border border-[#E0B952]/60 bg-[#1A1A1A] text-[#F5F0E8] text-center py-2.5 sm:py-3 rounded font-medium cursor-not-allowed opacity-90 text-sm sm:text-base"
            >
              Coming Soon
            </button>
          ) : (
            <Link
              href={ticket.affiliate_url}
              target="_blank"
              rel="nofollow noopener sponsored"
              className="block w-full bg-[#E0B952] text-[#0D0D0D] text-center py-2.5 sm:py-3 rounded font-medium hover:bg-opacity-90 transition-all duration-200 text-sm sm:text-base"
            >
              {t.bookNow}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
