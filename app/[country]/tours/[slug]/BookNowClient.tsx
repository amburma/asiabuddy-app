'use client';

import Link from 'next/link';
import { ThaiLanguage } from '../../../../types/country';

interface Props {
  tourSlug: string;
  country: string;
  salesperson_id?: string;
  language?: ThaiLanguage;
}

export default function BookNowClient({ 
  tourSlug, 
  country, 
  salesperson_id,
  language = 'EN' as ThaiLanguage
}: Props) {
  // Navigate to country-specific contact page with tour reference
  const contactUrl = `/${country}/contact?tour=${encodeURIComponent(tourSlug)}&source=tour_detail`;

  return (
    <Link
      id="book-now-btn"
      href={contactUrl}
      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-lg py-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-orange-500/40 text-center block"
    >
      Book Now
    </Link>
  );
}
