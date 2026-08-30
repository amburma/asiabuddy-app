'use client';

interface Step7bBudgetProps {
  budgetPerAdult?: number | null;
  budgetNote?: string;
  setFormData: (update: (prev: any) => any) => void;
}

export default function Step7bBudget({ budgetPerAdult, budgetNote, setFormData }: Step7bBudgetProps) {
  const handleBudgetChange = (value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setFormData((prev: any) => ({ ...prev, budgetPerAdult: numValue }));
  };

  const handleNoteChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, budgetNote: value }));
  };

  // Check if either field has a value (for assumption note visibility)
  const hasAnyBudgetInput = budgetPerAdult !== null && budgetPerAdult !== undefined && budgetPerAdult > 0;
  const hasAnyNote = budgetNote && budgetNote.trim().length > 0;
  const showAssumptionNote = !hasAnyBudgetInput && !hasAnyNote;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        ခန့်မှန်း ဘတ်ဂျက် (ရှိပါက)
      </h2>

      {/* Budget Per Adult Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          တစ်ယောက်လျှင် ခန့်မှန်း ဘတ်ဂျက် (USD)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            $
          </span>
          <input
            type="number"
            value={budgetPerAdult === null || budgetPerAdult === undefined ? '' : budgetPerAdult}
            onChange={(e) => handleBudgetChange(e.target.value)}
            placeholder="ဥပမာ - 500"
            className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all text-sm"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            /adult အထိ
          </span>
        </div>
      </div>

      {/* Budget Note Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          မှတ်ချက် (ရှိပါက)
        </label>
        <textarea
          value={budgetNote || ''}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder="ဥပမာ - Total $2000 အတွက် လူ ၅ ယောက်"
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all text-sm resize-none"
        />
      </div>

      {/* Disclosed Assumption Note (shown when no budget input) */}
      {showAssumptionNote && (
        <div className="mt-3 text-sm text-gray-600 flex items-start gap-2">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            ဘတ်ဂျက် မသတ်မှတ်ပါက စံသတ်မှတ်ထားသည့် Hotel/Transport အဆင့်များအတိုင်း စျေးနှုန်းတွက်ချက်ပေးပါမည်
          </span>
        </div>
      )}

      {/* Selection Info */}
      {(hasAnyBudgetInput || hasAnyNote) && (
        <div className="mt-4 text-sm text-emerald-600 font-medium">
          {hasAnyBudgetInput && `ခန့်မှန်း ဘတ်ဂျက်: $${budgetPerAdult} /adult`}
          {hasAnyBudgetInput && hasAnyNote && ' • '}
          {hasAnyNote && 'မှတ်ချက် ထည့်သွင်းထားပါသည်'}
        </div>
      )}
    </div>
  );
}
