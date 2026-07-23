import { ShieldCheck, Lock, Headphones, Eye } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../lib/i18n';
import { SupportedLanguage } from '../../types/country';

interface FlightTrustBadgesProps {
  language?: SupportedLanguage;
}

export default function FlightTrustBadges({ language = 'EN' }: FlightTrustBadgesProps) {
  const t = UI_TRANSLATIONS[language].flightTrustBadges;

  const badges = [
    {
      icon: ShieldCheck,
      text: t.verifiedAirlines,
    },
    {
      icon: Lock,
      text: t.securePayment,
    },
    {
      icon: Headphones,
      text: t.customerSupport,
    },
    {
      icon: Eye,
      text: t.transparentPricing,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0">
                <Icon className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <p className="text-sm text-gray-700 leading-snug">
                {badge.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
