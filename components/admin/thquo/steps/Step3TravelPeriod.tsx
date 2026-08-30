'use client';

interface Step3TravelPeriodProps {
  start_date?: string;
  end_date?: string;
  duration_days?: number;
  setFormData: (update: (prev: any) => any) => void;
}

export default function Step3TravelPeriod({ 
  start_date, 
  end_date, 
  duration_days, 
  setFormData 
}: Step3TravelPeriodProps) {
  // Calculate end date from start date and duration
  const calculateEndDate = (startDate: string, duration: number): string => {
    if (!startDate || !duration) return '';
    
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + (duration - 1)); // duration - 1 because start day counts as day 1
    
    return end.toISOString().split('T')[0];
  };

  // Get current calculated end date
  const calculatedEndDate = start_date && duration_days 
    ? calculateEndDate(start_date, duration_days) 
    : '';

  // Handle start date change
  const handleStartDateChange = (value: string) => {
    const newEndDate = calculateEndDate(value, duration_days || 0);
    setFormData((prev: any) => ({ 
      ...prev, 
      start_date: value,
      end_date: newEndDate 
    }));
  };

  // Get date validation error message (only past-date check now)
  const getDateValidationError = () => {
    if (!start_date) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDate = new Date(start_date);
    startDate.setHours(0, 0, 0, 0);

    // Check if start date is in the past
    if (startDate < today) {
      return "စတင်ရက်သည် ယနေ့ (သို့) နောက်ပိုင်းသာ ဖြစ်ရမည်";
    }

    return null;
  };

  const validationError = getDateValidationError();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        ခရီးစဉ် ကာလ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            စတင်မည့်ရက်
          </label>
          <input
            type="date"
            value={start_date || ''}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ပြီးဆုံးမည့်ရက်
            <span className="text-xs text-gray-500 ml-2">
              (Duration အလိုက် အလိုအလျောက်တွက်ချက်သည်)
            </span>
          </label>
          <div className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-600 text-sm flex items-center">
            {calculatedEndDate || '-'}
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Validation Error */}
      {validationError && (
        <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {validationError}
        </div>
      )}

      {/* Selection Info */}
      {start_date && calculatedEndDate && !validationError && (
        <div className="mt-4 text-sm text-emerald-600 font-medium">
          ရွေးချယ်ထားသော ကာလ: {start_date} မှ {calculatedEndDate} အထိ
        </div>
      )}
    </div>
  );
}