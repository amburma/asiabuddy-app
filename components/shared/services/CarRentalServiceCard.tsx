'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Settings, Users } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../../lib/i18n';
import { SupportedLanguage } from '../../../types/country';

interface CarData {
  car_model: string;
  image_url: string;
  price_per_day: number;
  transmission: 'automatic' | 'manual';
  seats: number;
  min_driver_age: number;
  license_requirement_note: string;
  affiliate_url: string;
}

interface CarRentalServiceCardProps {
  car: CarData;
  language?: SupportedLanguage;
}

export default function CarRentalServiceCard({ car, language = 'EN' }: CarRentalServiceCardProps) {
  const t = UI_TRANSLATIONS[language].serviceCards;
  return (
    <div className="bg-[#0D0D0D] border border-[#0D0D0D] hover:border-[#A88B4A] rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col">
      {/* Image Container - 16:9 aspect ratio */}
      <div className="relative w-full pt-[56.25%] bg-gray-800 overflow-hidden">
        <Image
          src={car.image_url}
          alt={car.car_model}
          fill
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Car Model Name */}
        <h3 className="font-playfair text-lg sm:text-xl text-[#F5F0E8] mb-3 line-clamp-2">
          {car.car_model}
        </h3>

        {/* Transmission and Seats Badges */}
        <div className="flex items-center gap-2 mb-4">
          {/* Transmission Badge */}
          <div className="flex items-center gap-1.5 bg-[#A88B4A] bg-opacity-20 px-2.5 py-1.5 rounded">
            <Settings size={14} className="text-[#A88B4A]" />
            <span className="text-[#F5F0E8] text-xs sm:text-sm font-medium capitalize">
              {car.transmission}
            </span>
          </div>

          {/* Seats Badge */}
          <div className="flex items-center gap-1.5 bg-[#A88B4A] bg-opacity-20 px-2.5 py-1.5 rounded">
            <Users size={14} className="text-[#A88B4A]" />
            <span className="text-[#F5F0E8] text-xs sm:text-sm font-medium">
              {car.seats} Seats
            </span>
          </div>
        </div>

        {/* Gold-bordered Info Box - Always Visible */}
        <div className="border border-[#A88B4A] bg-[#A88B4A] bg-opacity-10 px-3 py-2.5 rounded mb-4">
          <p className="text-[#F5F0E8] text-xs sm:text-sm leading-relaxed">
            <span className="font-medium">{t.minDriverAge}:</span> {car.min_driver_age} | {car.license_requirement_note}
          </p>
        </div>

        {/* Price and CTA - Spacer between content and button */}
        <div className="mt-auto">
          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <span className="font-dm-mono text-2xl sm:text-3xl text-[#A88B4A] font-bold">
                ${car.price_per_day}
              </span>
              <span className="text-[#F5F0E8] text-sm opacity-75">{t.perDay}</span>
            </div>
          </div>

          {/* Book Now Button */}
          <Link
            href={car.affiliate_url}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="block w-full bg-[#A88B4A] text-[#0D0D0D] text-center py-2.5 sm:py-3 rounded font-medium hover:bg-opacity-90 transition-all duration-200 text-sm sm:text-base"
          >
            {t.bookNow}
          </Link>
        </div>
      </div>
    </div>
  );
}
