'use client';

import { ExternalLink } from 'lucide-react';
import { THAILAND_CITIES, buildTripComSearchValue, normalizeCityName } from '../../../src/config/thailandCities';

interface HotelProviderRedirectCardProps {
  city?: string;
}

export default function HotelProviderRedirectCard({ city = 'Bangkok' }: HotelProviderRedirectCardProps) {
  // Normalize city name to handle language variants (e.g., Burmese "ချင်းမိုင်" -> "Chiang Mai")
  const normalizedCity = normalizeCityName(city);

  // Build Trip.com URL dynamically
  const today = new Date();
  const checkin = new Date(today);
  checkin.setDate(today.getDate() + 7);
  const checkout = new Date(checkin);
  checkout.setDate(checkin.getDate() + 3);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  // Get city data from config
  const cityData = THAILAND_CITIES[normalizedCity] || THAILAND_CITIES['Bangkok'];
  const { cityId, provinceId, countryId } = cityData;
  const searchValue = buildTripComSearchValue(cityId);

  const tripComUrl = `https://www.trip.com/hotels/list?flexType=1&cityId=${cityId}&provinceId=${provinceId}&districtId=0&countryId=${countryId}&destName=${encodeURIComponent(normalizedCity)}&searchWord=${encodeURIComponent(normalizedCity)}&searchType=C&optionId=4&searchValue=${encodeURIComponent(searchValue)}&checkin=${formatDate(checkin)}&checkout=${formatDate(checkout)}&crn=1&adult=2&curr=USD&locale=en-XX&Allianceid=9417346&SID=325250647`;

  return (
    <div className="space-y-4">
      {/* Trip.com Card */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-serif text-lg font-bold text-gray-900">Search Trip.com</h3>
          <p className="text-sm text-gray-600 mt-1">Compare live prices</p>
          <p className="text-xs text-gold-deep font-semibold mt-2">Showing results for: {normalizedCity}, Thailand</p>
        </div>
        <div className="p-4">
          <a
            href={tripComUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#C9A84C] text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <ExternalLink size={18} />
            Search on Trip.com
          </a>
        </div>
      </div>

    </div>
  );
}
