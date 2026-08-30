'use client';

interface Step4TotalPaxProps {
  totalPax?: number;
  setFormData: (update: (prev: any) => any) => void;
}

export default function Step4TotalPax({ totalPax, setFormData }: Step4TotalPaxProps) {
  // Handle pax increment
  const incrementPax = () => {
    const currentPax = totalPax || 0;
    const newPax = currentPax + 1;
    setFormData((prev: any) => ({ ...prev, totalPax: newPax }));
  };

  // Handle pax decrement
  const decrementPax = () => {
    const currentPax = totalPax || 0;
    if (currentPax > 1) {
      setFormData((prev: any) => ({ ...prev, totalPax: currentPax - 1 }));
    }
  };

  // Check if soft warning should show
  const showSoftWarning = (totalPax || 0) > 50;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        ခရီးသွားစုစုပေါင်း လူဦးရေ
      </h2>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={decrementPax}
          disabled={!totalPax || totalPax <= 1}
          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-medium transition-all ${
            !totalPax || totalPax <= 1
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50 cursor-pointer'
          }`}
        >
          −
        </button>

        <div className="w-24 text-center">
          <div className="text-3xl font-bold text-gray-800">
            {totalPax || '-'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            ဦး
          </div>
        </div>

        <button
          onClick={incrementPax}
          className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-medium transition-all border-emerald-500 text-emerald-600 hover:bg-emerald-50 cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Soft warning for large groups */}
      {showSoftWarning && (
        <div className="mt-2 text-xs text-amber-600 flex items-center justify-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Large group (50+ pax) — may require special pricing
        </div>
      )}

      {/* Selection Info */}
      {totalPax && totalPax > 0 && (
        <div className="mt-4 text-sm text-emerald-600 font-medium text-center">
          ရွေးချယ်ထားသော လူဦးရေ: {totalPax} ဦး
        </div>
      )}
    </div>
  );
}