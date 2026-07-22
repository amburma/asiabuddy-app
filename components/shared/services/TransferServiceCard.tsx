'use client';

import Link from 'next/link';
import { Car, Bus, Users } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../../lib/i18n';
import { SupportedLanguage } from '../../../types/country';

interface TransferData {
  vehicle_type: 'sedan' | 'van' | 'shared';
  pickup_location: string;
  dropoff_location: string;
  price: number;
  duration: string;
  max_passengers: number;
  affiliate_url: string;
}

interface TransferServiceCardProps {
  transfer: TransferData;
  language?: SupportedLanguage;
  is_placeholder?: boolean;
}

function getVehicleIcon(vehicleType: string) {
  switch (vehicleType) {
    case 'sedan':
      return <Car size={32} className="text-[#B8945A]" />;
    case 'van':
      return <Bus size={32} className="text-[#B8945A]" />;
    case 'shared':
      return <Users size={32} className="text-[#B8945A]" />;
    default:
      return <Car size={32} className="text-[#B8945A]" />;
  }
}

function getVehicleLabel(vehicleType: string): string {
  switch (vehicleType) {
    case 'sedan':
      return 'Sedan';
    case 'van':
      return 'Van';
    case 'shared':
      return 'Shared';
    default:
      return 'Transfer';
  }
}

export default function TransferServiceCard({ transfer, language = 'EN', is_placeholder = false }: TransferServiceCardProps) {
  const t = UI_TRANSLATIONS[language].serviceCards;
  // Check both the prop AND the URL pattern for safety
  const isPlaceholder = is_placeholder === true || transfer.affiliate_url.startsWith('#placeholder-');
  return (
    <div className={`bg-[#0D0D0D] border border-[#0D0D0D] hover:border-[#B8945A] rounded-lg overflow-hidden transition-all duration-300 p-4 sm:p-6 flex flex-col h-full ${isPlaceholder ? 'opacity-75' : ''}`}>
      {/* Header with Vehicle Icon and Type */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getVehicleIcon(transfer.vehicle_type)}
          <h3 className="font-playfair text-lg sm:text-xl text-[#F5F0E8]">
            {getVehicleLabel(transfer.vehicle_type)}
          </h3>
        </div>
      </div>

      {/* Route Information */}
      <div className="mb-6 space-y-2">
        <div className="text-sm text-[#F5F0E8] font-inter">
          <span className="opacity-75">From:</span>{' '}
          <span className="font-medium">{transfer.pickup_location}</span>
        </div>
        <div className="flex items-center text-[#B8945A] text-xs font-medium mb-2">
          <div className="flex-1 border-t border-[#B8945A] border-opacity-50"></div>
          <span className="px-2">→</span>
          <div className="flex-1 border-t border-[#B8945A] border-opacity-50"></div>
        </div>
        <div className="text-sm text-[#F5F0E8] font-inter">
          <span className="opacity-75">To:</span>{' '}
          <span className="font-medium">{transfer.dropoff_location}</span>
        </div>
      </div>

      {/* Details Row */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 pb-4 border-b border-[#1A1A1A]">
        {/* Duration */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#F5F0E8] opacity-75">Duration:</span>
          <span className="font-dm-mono text-sm text-[#B8945A] font-medium">
            {transfer.duration}
          </span>
        </div>

        {/* Max Passengers */}
        <div className="flex items-center gap-2 bg-[#B8945A] bg-opacity-10 px-2.5 py-1.5 rounded">
          <Users size={16} className="text-[#B8945A]" />
          <span className="font-dm-mono text-sm text-[#B8945A] font-medium">
            {transfer.max_passengers}
          </span>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-auto">
        {/* Price */}
        <div>
          <span className="font-dm-mono text-2xl sm:text-3xl text-[#B8945A] font-bold">
            ${transfer.price}
          </span>
        </div>

        {/* Book Now Button */}
        {isPlaceholder ? (
          <button
            type="button"
            disabled
            onClick={(e) => e.preventDefault()}
            className="block flex-1 sm:flex-none border border-[#B8945A]/60 bg-[#1A1A1A] text-[#F5F0E8] text-center py-2.5 sm:py-3 px-4 rounded font-medium cursor-not-allowed opacity-90 text-sm sm:text-base whitespace-nowrap"
          >
            Coming Soon
          </button>
        ) : (
          <Link
            href={transfer.affiliate_url}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="block flex-1 sm:flex-none bg-[#B8945A] text-[#0D0D0D] text-center py-2.5 sm:py-3 px-4 rounded font-medium hover:bg-opacity-90 transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
          >
            {t.bookNow}
          </Link>
        )}
      </div>
    </div>
  );
}
