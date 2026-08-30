'use client';

interface Step7TransportModeProps {
  transportMode?: 'private' | 'public' | null;
  setFormData: (update: (prev: any) => any) => void;
}

interface TransportModeOption {
  value: 'private' | 'public';
  label: string;
  subLabel: string;
  description: string;
}

const transportModeOptions: TransportModeOption[] = [
  { 
    value: 'private', 
    label: 'ကိုယ်ပိုင်ယာဉ် (Agency)', 
    subLabel: 'Private (Agency Vehicle)', 
    description: 'ကားငှားရမ်းခ (Car Rental KB) ဖြင့် သီးသန့်ယာဉ်' 
  },
  { 
    value: 'public', 
    label: 'အများသုံးယာဉ်', 
    subLabel: 'Public Transport', 
    description: '12Go မှတစ်ဆင့် လက်မှတ်ဝယ်ယူမှု' 
  },
];

export default function Step7TransportMode({ transportMode, setFormData }: Step7TransportModeProps) {
  const handleModeSelect = (value: 'private' | 'public') => {
    setFormData((prev: any) => ({ ...prev, transportMode: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        သွားလာရေး နည်းလမ်း
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {transportModeOptions.map((option) => {
          const isSelected = transportMode === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleModeSelect(option.value)}
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
              <div className="text-xs text-gray-600 mt-2">
                {option.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selection Info */}
      {transportMode !== null && transportMode !== undefined && (
        <div className="mt-4 text-sm text-emerald-600 font-medium">
          ရွေးချယ်ထားသော နည်းလမ်း: {transportModeOptions.find(opt => opt.value === transportMode)?.label}
        </div>
      )}
    </div>
  );
}
