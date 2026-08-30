'use client';

interface Step5HotelLevelProps {
  hotelLevel?: number | null;
  setFormData: (update: (prev: any) => any) => void;
}

interface HotelLevelOption {
  value: number;
  label: string;
  subLabel: string;
  isExcluded?: boolean; // Flag for the self-arranged/excluded option
}

// hotelLevel === 0 means Hotel is excluded from TDC entirely — Cost Input Panel must
// skip/disable the Hotel cost field when this value is present, and Room & Vehicle
// Allocation (Gem STEP 4) must skip room allocation logic for this quote.
const hotelLevelOptions: HotelLevelOption[] = [
  { value: 1, label: '၁ ကြယ်', subLabel: 'Basic / Economy' },
  { value: 2, label: '၂ ကြယ်', subLabel: 'Standard / Value' },
  { value: 3, label: '၃ ကြယ်', subLabel: 'Mid-Range' },
  { value: 4, label: '၄ ကြယ်', subLabel: 'Upscale' },
  { value: 5, label: '၅ ကြယ်', subLabel: 'Luxury' },
  { value: 0, label: 'ကိုယ်ပိုင် စီစဉ်မည် (Hotel Service မလိုအပ်ပါ)', subLabel: 'Self-Arranged / Hotel Excluded', isExcluded: true },
];

export default function Step5HotelLevel({ hotelLevel, setFormData }: Step5HotelLevelProps) {
  const handleLevelSelect = (value: number) => {
    setFormData((prev: any) => ({ ...prev, hotelLevel: value }));
  };

  // Separate star tiers from excluded option for different layout
  const starTierOptions = hotelLevelOptions.filter(opt => !opt.isExcluded);
  const excludedOption = hotelLevelOptions.find(opt => opt.isExcluded);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        ဟိုတယ် အဆင့်
      </h2>

      {/* Star Tier Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {starTierOptions.map((option) => {
          const isSelected = hotelLevel === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleLevelSelect(option.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
              }`}
            >
              <div className="font-medium text-sm">
                {option.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {option.subLabel}
              </div>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4" />

      {/* Hotel Excluded Option */}
      {excludedOption && (
        <button
          onClick={() => handleLevelSelect(excludedOption.value)}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
            hotelLevel === excludedOption.value
              ? 'border-amber-500 bg-amber-50 text-amber-700'
              : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300'
          }`}
        >
          <div className="font-medium text-sm">
            {excludedOption.label}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {excludedOption.subLabel}
          </div>
        </button>
      )}

      {/* Exclusion Confirmation Note */}
      {hotelLevel === 0 && (
        <div className="mt-3 text-sm text-amber-600 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Hotel ကို quotation ထဲမှ လုံးဝ ဖယ်ထားပါမည်
        </div>
      )}

      {/* Selection Info */}
      {hotelLevel !== null && hotelLevel !== undefined && hotelLevel !== 0 && (
        <div className="mt-4 text-sm text-emerald-600 font-medium">
          ရွေးချယ်ထားသော အဆင့်: {hotelLevelOptions.find(opt => opt.value === hotelLevel)?.label}
        </div>
      )}
    </div>
  );
}
