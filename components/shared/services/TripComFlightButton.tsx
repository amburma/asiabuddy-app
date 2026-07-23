'use client';

import { ExternalLink } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../../lib/i18n';
import { SupportedLanguage } from '../../../types/country';

interface TripComFlightButtonProps {
  departureCity?: string;
  departureIata?: string;
  arrivalCity?: string;
  arrivalIata?: string;
  language?: SupportedLanguage;
}

export default function TripComFlightButton({ 
  departureCity = 'Yangon',
  departureIata = 'RGN',
  arrivalCity = 'Bangkok',
  arrivalIata = 'BKK',
  language = 'EN'
}: TripComFlightButtonProps) {
  const t = UI_TRANSLATIONS[language].flights;
  // Build Trip.com flight search URL using confirmed deeplink format from Partner Center
  // Format: https://www.trip.com/flights/{DepartureCity}-to-{ArrivalCity}/tickets-{DCITY}-{ACITY}?flighttype=S&dcity={DCITY}&acity={ACITY}&Allianceid=9417346&SID=325250647&trip_sub1=&trip_sub3=D18866801
  const tripComUrl = `https://www.trip.com/flights/${departureCity}-to-${arrivalCity}/tickets-${departureIata}-${arrivalIata}?flighttype=S&dcity=${departureIata}&acity=${arrivalIata}&Allianceid=9417346&SID=325250647&trip_sub1=&trip_sub3=D18866801`;

  return (
    <a
      href={tripComUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex items-center justify-center gap-2 bg-[#0D0D0D] text-[#D4AF37] border border-[#D4AF37] font-semibold py-3 px-7 rounded-lg hover:bg-[#1A1A1A] hover:shadow-lg transition-all duration-200 text-sm"
    >
      <ExternalLink size={16} />
      {t.compareOnTripCom}
    </a>
  );
}
