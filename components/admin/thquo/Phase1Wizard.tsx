'use client';

import React, { useState, useEffect } from 'react';
// CONFIRMED against lib/supabase/client.ts: the module exports a factory function
// createClient(), not a 'supabase' singleton. Instantiate it once per component below.
import { createClient } from '@/lib/supabase/client';

// =====================================================================================
// REBUILD SPEC — Phase1Wizard.tsx
// Replaces the temporary stub (last real commit: 67303f0c) after the 2026-08-31
// uncommitted-work-loss incident (see Roadmap v5 § Process Discipline — Commit Rule).
//
// Bundles ALL approved Phase 1 backlog items into a single rebuild so this never has to
// be half-redone again:
//   1. Step 1 — "Add Destination" free-type option alongside the checklist
//   2. Step 4 — "No Hotel Service" option (resolves Hotel Level Consolidation, see Roadmap)
//   3. Step 5 — "Add Attraction" free-type option alongside the chips (same pattern as #1)
//   4. Step 6 — "No Transport Service" option
// Plus the already-diagnosed rehydration fix (initialData prop) so Phase 2 → Phase 1
// back-navigation stops losing data.
//
// PROCESS REMINDER (Roadmap § Process Discipline): once this file builds + passes
// browser test, COMMIT IMMEDIATELY before issuing any further Windsurf instruction —
// especially before any "revert" or "clean up" instruction touching this file or
// page.tsx. Do not let this sit uncommitted across a session boundary.
// =====================================================================================

export type HotelLevel = 'no_hotel' | 'budget' | 'standard' | 'deluxe' | 'luxury';
export type TransportMode = 'no_transport' | 'private' | 'public';

export interface Phase1Data {
  destinations: string[];       // DB-sourced picks + free-typed custom entries, mixed
  duration_days: number;
  start_date: string;           // ISO yyyy-mm-dd
  end_date: string;             // ISO yyyy-mm-dd
  total_pax: number;
  hotel_level: HotelLevel | null;
  themes: string[];             // DB-sourced/preset chips + free-typed custom entries
  transport_mode: TransportMode | null;
  budget: number | null;
  skip_budget: boolean;
}

export interface Phase1WizardProps {
  /** Pre-fills all 8 fields — required for Phase 2 → Phase 1 back-navigation
   *  to stop losing already-entered data (Roadmap § Survey Wizard, Rehydration requirement). */
  initialData?: Partial<Phase1Data>;
  /** If a quotation row already exists (e.g. re-entering Phase 1 via back-nav,
   *  or via the Follow-up Quotation landing flow), pass its id so handleComplete
   *  updates the existing row instead of creating a duplicate one. */
  quotationId?: string;
  onComplete?: (id: string, totalPax: number, phase1Data: Phase1Data, tourCode?: string) => void;
  onIdUpdate?: (newId: string) => void;
}

const HOTEL_LEVELS: { value: HotelLevel; label: string }[] = [
  { value: 'no_hotel', label: 'Hotel Service မလိုပါ' },
  { value: 'budget', label: 'Budget' },
  { value: 'standard', label: 'Standard' },
  { value: 'deluxe', label: 'Deluxe' },
  { value: 'luxury', label: 'Luxury' },
];

const TRANSPORT_MODES: { value: TransportMode; label: string }[] = [
  { value: 'no_transport', label: 'Transport Service မလိုပါ' },
  { value: 'private', label: 'Private' },
  { value: 'public', label: 'Public' },
];

const TOTAL_STEPS = 7;

const emptyDefaults: Phase1Data = {
  destinations: [],
  duration_days: 1,
  start_date: '',
  end_date: '',
  total_pax: 1,
  hotel_level: null,
  themes: [],
  transport_mode: null,
  budget: null,
  skip_budget: false,
};

const Phase1WizardComponent: React.FC<Phase1WizardProps> = ({
  initialData,
  quotationId,
  onComplete,
  onIdUpdate,
}) => {
  const [step, setStep] = useState(1);

  // createClient() returns null on the server or if env vars are missing (see client.ts),
  // so this must be instantiated inside the component body, not at module scope.
  const [supabase] = useState(() => createClient());

  // --- Form state, each initialized from initialData when provided (rehydration fix) ---
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    initialData?.destinations ?? emptyDefaults.destinations
  );
  const [durationDays, setDurationDays] = useState<number>(
    initialData?.duration_days ?? emptyDefaults.duration_days
  );
  const [startDate, setStartDate] = useState<string>(
    initialData?.start_date ?? emptyDefaults.start_date
  );
  const [endDate, setEndDate] = useState<string>(
    initialData?.end_date ?? emptyDefaults.end_date
  );
  const [totalPax, setTotalPax] = useState<number>(
    initialData?.total_pax ?? emptyDefaults.total_pax
  );
  const [hotelLevel, setHotelLevel] = useState<HotelLevel | null>(
    initialData?.hotel_level ?? emptyDefaults.hotel_level
  );
  const [selectedThemes, setSelectedThemes] = useState<string[]>(
    initialData?.themes ?? emptyDefaults.themes
  );
  const [transportMode, setTransportMode] = useState<TransportMode | null>(
    initialData?.transport_mode ?? emptyDefaults.transport_mode
  );
  const [budget, setBudget] = useState<number | null>(
    initialData?.budget ?? emptyDefaults.budget
  );
  const [skipBudget, setSkipBudget] = useState<boolean>(
    initialData?.skip_budget ?? emptyDefaults.skip_budget
  );

  // --- Auto-calculate end_date from start_date + duration_days ---
  useEffect(() => {
    if (!startDate || durationDays < 1) {
      setEndDate('');
      return;
    }
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(start);
    end.setDate(start.getDate() + (durationDays - 1));
    const yyyy = end.getFullYear();
    const mm = String(end.getMonth() + 1).padStart(2, '0');
    const dd = String(end.getDate()).padStart(2, '0');
    setEndDate(`${yyyy}-${mm}-${dd}`);
  }, [startDate, durationDays]);

  // --- Destinations fetch (Supabase-only, no hardcoded fallback) ---
  const [dbDestinations, setDbDestinations] = useState<string[]>([]);
  const [destinationsLoading, setDestinationsLoading] = useState(true);
  const [destinationsError, setDestinationsError] = useState<string | null>(null);
  const [customDestinationInput, setCustomDestinationInput] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setDestinationsLoading(true);
      setDestinationsError(null);
      if (!supabase) {
        if (!cancelled) {
          setDestinationsError('Supabase client unavailable (check env vars)');
          setDestinationsLoading(false);
        }
        return;
      }
      const { data, error } = await supabase.from('destinations').select('name');
      if (cancelled) return;
      if (error) {
        setDestinationsError(error.message);
      } else {
        setDbDestinations((data ?? []).map((row: { name: string }) => row.name));
      }
      setDestinationsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleDestination = (name: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(name) ? prev.filter((d) => d !== name) : [...prev, name]
    );
  };

  const addCustomDestination = () => {
    const trimmed = customDestinationInput.trim();
    if (!trimmed || selectedDestinations.includes(trimmed)) return;
    setSelectedDestinations((prev) => [...prev, trimmed]);
    setCustomDestinationInput('');
  };

  // --- Themes (preset chips + free-type add, same pattern as destinations) ---
  const PRESET_THEMES = [
    'Beach', 'Culture', 'Adventure', 'Nature', 'Food', 'Shopping', 'Family-friendly', 'Relaxation',
  ];
  const [customThemeInput, setCustomThemeInput] = useState('');

  const toggleTheme = (name: string) => {
    setSelectedThemes((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const addCustomTheme = () => {
    const trimmed = customThemeInput.trim();
    if (!trimmed || selectedThemes.includes(trimmed)) return;
    setSelectedThemes((prev) => [...prev, trimmed]);
    setCustomThemeInput('');
  };

  // --- Per-step validation (Next disabled until valid, per Roadmap § Survey Wizard) ---
  const stepIsValid = (): boolean => {
    switch (step) {
      case 1:
        return selectedDestinations.length > 0;
      case 2:
        return durationDays >= 1 && !!startDate && !!endDate && endDate >= startDate;
      case 3:
        return totalPax >= 1;
      case 4:
        return hotelLevel !== null;
      case 5:
        return true; // theme/interest optional
      case 6:
        return transportMode !== null;
      case 7:
        return skipBudget || (budget !== null && budget > 0);
      default:
        return false;
    }
  };

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  // --- Submit ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const buildPhase1Data = (): Phase1Data => ({
    destinations: selectedDestinations,
    duration_days: durationDays,
    start_date: startDate,
    end_date: endDate,
    total_pax: totalPax,
    hotel_level: hotelLevel,
    themes: selectedThemes,
    transport_mode: transportMode,
    budget: skipBudget ? null : budget,
    skip_budget: skipBudget,
  });

  const handleComplete = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    const phase1Data = buildPhase1Data();

    try {
      let id = quotationId;

      let tourCode: string | undefined;

      if (id) {
        // Existing row (back-nav or Follow-up flow) — update, never re-create.
        const response = await fetch(`/api/quotations`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, action: 'update_phase1_data', phase1_data: phase1Data }),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || 'Failed to update quotation');
        }
        tourCode = result.tour_code;
      } else {
        // New quotation — create the real DB row (fixes the fake-local-ID bug from 67303f0c).
        const response = await fetch('/api/quotations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phase1_data: phase1Data }),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || 'Failed to create quotation');
        }
        id = result.id;
        tourCode = result.tour_code;
        if (onIdUpdate && id) onIdUpdate(id);
      }

      if (onComplete && id) {
        onComplete(id, totalPax, phase1Data, tourCode);
      }
    } catch (error) {
      console.error('Error saving Phase 1 data:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Step content ---
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">ခရီးစဉ်နေရာများ ရွေးချယ်ပါ</h2>
            {destinationsLoading && <p className="text-sm text-gray-500">Loading destinations...</p>}
            {destinationsError && (
              <p className="text-sm text-red-600">Failed to load destinations: {destinationsError}</p>
            )}
            {!destinationsLoading && !destinationsError && (
              <div className="flex flex-wrap gap-2">
                {dbDestinations.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleDestination(name)}
                    className={`px-4 py-2 rounded-full text-sm border-2 transition-colors ${
                      selectedDestinations.includes(name)
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-400'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
            {/* Backlog item: Add Destination (free-type) */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={customDestinationInput}
                onChange={(e) => setCustomDestinationInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomDestination())}
                placeholder="အခြားနေရာ ထည့်ရန် (Add Destination)"
                className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"
              />
              <button
                type="button"
                onClick={addCustomDestination}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm"
              >
                Add
              </button>
            </div>
            {selectedDestinations.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedDestinations.map((d) => (
                  <span key={d} className="px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-xs text-emerald-800">
                    {d}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">ကြာချိန် နှင့် ခရီးစဉ်ရက်စွဲများ</h2>
            <label className="block text-sm text-gray-600">ကြာချိန် (ရက်)</label>
            <input
              type="number"
              min={1}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"
            />
            <label className="block text-sm text-gray-600">စတင်မည့်ရက်</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"
            />
            <label className="block text-sm text-gray-600">ပြီးဆုံးမည့်ရက်</label>
            <input
              type="date"
              value={endDate}
              readOnly
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm bg-gray-50"
            />
            <p className="text-xs text-gray-500">(Auto-calculated from ကြာချိန် + စတင်မည့်ရက်)</p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">ခရီးသွား စုစုပေါင်း</h2>
            <input
              type="number"
              min={1}
              value={totalPax}
              onChange={(e) => setTotalPax(Number(e.target.value))}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Hotel Level</h2>
            <div className="flex flex-col gap-2">
              {HOTEL_LEVELS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setHotelLevel(opt.value)}
                  className={`px-4 py-3 rounded-xl text-sm border-2 text-left transition-colors ${
                    hotelLevel === opt.value
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Theme / Interest</h2>
            <div className="flex flex-wrap gap-2">
              {PRESET_THEMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTheme(t)}
                  className={`px-4 py-2 rounded-full text-sm border-2 transition-colors ${
                    selectedThemes.includes(t)
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {/* Backlog item: Add Attraction (free-type), same pattern as Step 1 */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={customThemeInput}
                onChange={(e) => setCustomThemeInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTheme())}
                placeholder="အခြား စိတ်ဝင်စားမှု ထည့်ရန် (Add Attraction)"
                className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"
              />
              <button
                type="button"
                onClick={addCustomTheme}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm"
              >
                Add
              </button>
            </div>
            {selectedThemes.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedThemes.map((t) => (
                  <span key={t} className="px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-xs text-emerald-800">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Transport Mode</h2>
            <div className="flex flex-col gap-2">
              {TRANSPORT_MODES.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTransportMode(opt.value)}
                  className={`px-4 py-3 rounded-xl text-sm border-2 text-left transition-colors ${
                    transportMode === opt.value
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Budget (Optional)</h2>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={skipBudget}
                onChange={(e) => setSkipBudget(e.target.checked)}
              />
              Budget မသတ်မှတ်လိုပါ (Skip)
            </label>
            {!skipBudget && (
              <input
                type="number"
                min={0}
                value={budget ?? ''}
                onChange={(e) => setBudget(e.target.value === '' ? null : Number(e.target.value))}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"
                placeholder="Budget (USD)"
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div className="text-center mb-2">
          <p className="text-xs text-gray-400">Step {step} of {TOTAL_STEPS}</p>
        </div>

        {renderStep()}

        {submitError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-700 font-medium mb-1">Error saving quotation</p>
            <p className="text-xs text-red-600">{submitError}</p>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className={`px-5 py-2 rounded-lg text-sm font-medium ${
              step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            နောက်သို့
          </button>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!stepIsValid()}
              className={`px-5 py-2 rounded-lg text-sm font-medium ${
                stepIsValid() ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              ရှေ့သို့
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!stepIsValid() || isSubmitting}
              className={`px-5 py-2 rounded-lg text-sm font-medium ${
                !stepIsValid() || isSubmitting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Phase 2 သို့ ဆက်လက်လုပ်ဆောင်ရန်'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Phase1WizardComponent;

// =====================================================================================
// HANDOFF NOTES FOR WINDSURF (read before touching this file):
//
// 1. Confirm the Supabase client import path against an existing working file in
//    components/admin/thquo/ (e.g. CostInputPanel.tsx) — do not guess.
// 2. Confirm whether /api/quotations/[id] PATCH already exists. If not, it needs to be
//    built as part of this task (in-place update of phase1_data on a non-priced row —
//    NOT a new revision; revision-increment is only for already-priced quotations per
//    Roadmap § Case Lookup).
// 3. PRESET_THEMES is a placeholder list — confirm with Thuta whether themes should also
//    come from a Supabase table (matching the destinations pattern) instead of being
//    hardcoded here.
// 4. This is ONE FILE, ONE CHANGE per Roadmap § Process Discipline. Build this file only.
//    Do not touch page.tsx in the same instruction cycle — that dependency (the
//    initialData={phase1Data} wiring in page.tsx) is a separate, already-scoped follow-up.
// 5. Build pass (npm run build, user-run) + full Step 1–7 browser test by Aung/Thuta are
//    both required before this is marked ✅ anywhere. COMMIT IMMEDIATELY after both pass,
//    before any further instruction — see Roadmap § Process Discipline — Commit Rule.
// =====================================================================================
