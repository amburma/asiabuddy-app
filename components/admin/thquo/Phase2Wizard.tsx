'use client';

import React, { useState, useEffect } from 'react';

interface Traveler {
  name: string;
  passport_number?: string;
  nationality?: string;
}

interface PriceCategory {
  id: string;
  category_label: string;
  age_range_min?: number;
  age_range_max?: number;
  unit_price: number;
  pax_count: number;
  category_subtotal: number;
}

interface Activity {
  id: string;
  day_number: number;
  date: string;
  activity_name: string;
  location?: string;
  notes_source?: string;
  price_categories: PriceCategory[];
  activity_subtotal: number;
}

interface FormData {
  // Step 1: Room breakdown (computed from totalPax or manual override)
  twin_rooms?: number;
  double_rooms?: number;
  extra_beds?: number;
  room_override?: boolean;
  
  // Step 2: 4-category pax breakdown
  adults?: number;
  child_with_bed?: number;
  child_no_bed?: number;
  infants?: number;
  // FOC (Free of Charge) pax count, nested under Adult category (added 2026-08-31).
  // Deliberately NOT included in the live-sum-vs-Phase-1-total validation — FOC pax
  // ride along an existing paying group rather than adding headcount (Roadmap § Survey
  // Wizard Phase 2, Step 2). Feeds the still-pending FOC-divisor pricing decision.
  foc_count?: number;
  
  // Step 3: Meal restrictions
  meal_restrictions?: string[];
  dietary_notes?: string;
  // "No Food Service" option (added 2026-08-31) — when true, Final Calculation must
  // exclude the Meals line entirely, same exclude-the-line pattern as Phase 1's
  // "No Hotel Service"/"No Transport Service" (Roadmap § Survey Wizard Phase 1).
  // NOTE: calculateQuotationPrice.ts and CostInputPanel.tsx's running subtotal both
  // need a follow-up change to actually read this flag — out of scope for this file.
  no_food_service?: boolean;
  
  // Step 4: Elderly/special-needs flags
  has_elderly?: boolean;
  elderly_count?: number;
  has_special_needs?: boolean;
  special_needs_notes?: string;
  
  // Step 5: Currency
  currency?: 'USD' | 'THB' | 'MMK' | 'EUR' | 'SGD' | null;
  
  // Step 6: Passport/traveler name list
  travelers?: Traveler[];
  // "Fill in later" deferred-entry toggle (added 2026-08-31) — this toggle already
  // existed as "Will provide later" in the original locked spec (Roadmap § Survey
  // Wizard Phase 2, Step 6); this is the implementation of it, not a new design.
  travelers_deferred?: boolean;
  
  // Step 7: Day-by-Day Program/Activities Survey
  activities?: Activity[];
}

export interface Phase2WizardProps {
  totalPax?: number;
  quotationId?: string;
  tourCode?: string;
  startDate?: string;
  endDate?: string;
  hotelLevel?: string | null;
  onBack?: () => void;
  onComplete?: (id: string, phase2Data?: FormData) => void;
  onIdUpdate?: (newId: string) => void;
}

const Phase2WizardComponent: React.FC<Phase2WizardProps> = ({ totalPax: propTotalPax, quotationId: propQuotationId, tourCode, startDate, endDate, hotelLevel, onBack, onComplete, onIdUpdate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    adults: 0,
    child_with_bed: 0,
    child_no_bed: 0,
    infants: 0,
    foc_count: 0,
    meal_restrictions: [],
    no_food_service: false,
    has_elderly: false,
    elderly_count: 0,
    has_special_needs: false,
    travelers: [],
    travelers_deferred: false,
    room_override: false,
    activities: [],
  });

  // Currency symbol mapping
  const getCurrencySymbol = (currency: string | null | undefined): string => {
    const symbols: Record<string, string> = {
      USD: '$',
      THB: '฿',
      MMK: 'Ks',
      EUR: '€',
      SGD: 'S$',
    };
    return symbols[currency || ''] || '';
  };
  
  const totalPax = propTotalPax || 2; // Default to 2 if not provided
  const [quotationId, setQuotationId] = useState<string | null>(propQuotationId || null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update local quotationId when prop changes
  useEffect(() => {
    if (propQuotationId) {
      setQuotationId(propQuotationId);
    }
  }, [propQuotationId]);

  // Rehydrate phase2_data from existing quotation on mount (F5 refresh support)
  useEffect(() => {
    if (!quotationId) return;

    // Only rehydrate if local state is still at default/empty values
    // (avoids overwriting in-memory state during normal Back/Forward navigation)
    const isDefaultState =
      formData.adults === 0 &&
      formData.child_with_bed === 0 &&
      formData.child_no_bed === 0 &&
      formData.infants === 0 &&
      formData.foc_count === 0 &&
      (formData.meal_restrictions?.length ?? 0) === 0 &&
      !formData.no_food_service &&
      !formData.has_elderly &&
      formData.elderly_count === 0 &&
      !formData.has_special_needs &&
      (formData.travelers?.length ?? 0) === 0 &&
      !formData.travelers_deferred &&
      !formData.room_override &&
      (formData.activities?.length ?? 0) === 0;

    if (!isDefaultState) return;

    const rehydratePhase2Data = async () => {
      try {
        const response = await fetch(`/api/quotations?id=${quotationId}`, { method: 'GET' });

        if (!response.ok) {
          console.error('Failed to rehydrate phase2_data:', response.status, response.statusText);
          return;
        }

        const data = await response.json();

        if (data.phase2_data) {
          setFormData(data.phase2_data);
        }
      } catch (error) {
        console.error('Error rehydrating phase2_data:', error);
        // Leave fields at default/empty state on failure
      }
    };

    rehydratePhase2Data();
  }, [quotationId, formData]);

  // Handle input changes
  // FIX (2026-08-31): was setFormData({ ...formData, [field]: value }) using the stale
  // `formData` closure. Calling this more than once inside the same synchronous handler
  // (e.g. the Staff Override toggle below) caused every call but the last to be silently
  // overwritten — this was the actual root cause of "Staff Override completely
  // non-functional" (Session Update 2026-08-30 backlog #5). Functional update form fixes it.
  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle array changes (for meal_restrictions)
  const toggleMealRestriction = (restriction: string) => {
    const current = formData.meal_restrictions || [];
    const updated = current.includes(restriction)
      ? current.filter(r => r !== restriction)
      : [...current, restriction];
    setFormData({ ...formData, meal_restrictions: updated });
  };

  // Handle traveler list changes
  const addTraveler = () => {
    const travelers = formData.travelers || [];
    setFormData({
      ...formData,
      travelers: [...travelers, { name: '', passport_number: '', nationality: '' }]
    });
  };

  const updateTraveler = (index: number, field: keyof Traveler, value: string) => {
    const travelers = formData.travelers || [];
    const updated = [...travelers];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, travelers: updated });
  };

  const removeTraveler = (index: number) => {
    const travelers = formData.travelers || [];
    setFormData({
      ...formData,
      travelers: travelers.filter((_, i) => i !== index)
    });
  };

  // Handle activities list changes
  const addActivity = () => {
    const activities = formData.activities || [];
    const nextDayNumber = activities.length + 1;
    
    // Auto-calculate date from startDate + day_number
    let autoDate = '';
    if (startDate) {
      const startDateObj = new Date(startDate);
      startDateObj.setDate(startDateObj.getDate() + (nextDayNumber - 1));
      autoDate = startDateObj.toISOString().split('T')[0];
    }
    
    setFormData({
      ...formData,
      activities: [
        ...activities,
        {
          id: crypto.randomUUID(),
          day_number: nextDayNumber,
          date: autoDate,
          activity_name: '',
          location: '',
          notes_source: '',
          price_categories: [],
          activity_subtotal: 0
        }
      ]
    });
  };

  const updateActivity = (index: number, field: keyof Activity, value: any) => {
    const activities = formData.activities || [];
    const updated = [...activities];
    updated[index] = { ...updated[index], [field]: value };
    
    // Recalculate activity subtotal when price categories change
    if (field === 'price_categories') {
      const subtotal = updated[index].price_categories.reduce(
        (sum, cat) => sum + cat.category_subtotal,
        0
      );
      updated[index].activity_subtotal = subtotal;
    }
    
    setFormData({ ...formData, activities: updated });
  };

  const removeActivity = (index: number) => {
    const activities = formData.activities || [];
    setFormData({
      ...formData,
      activities: activities.filter((_, i) => i !== index)
    });
  };

  // Handle price category changes within an activity
  const addPriceCategory = (activityIndex: number) => {
    const activities = formData.activities || [];
    const updated = [...activities];
    const activity = updated[activityIndex];
    
    const newCategory: PriceCategory = {
      id: crypto.randomUUID(),
      category_label: '',
      age_range_min: undefined,
      age_range_max: undefined,
      unit_price: 0,
      pax_count: 0,
      category_subtotal: 0
    };
    
    activity.price_categories = [...(activity.price_categories || []), newCategory];
    updated[activityIndex] = activity;
    
    setFormData({ ...formData, activities: updated });
  };

  const updatePriceCategory = (activityIndex: number, categoryIndex: number, field: keyof PriceCategory, value: any) => {
    const activities = formData.activities || [];
    const updated = [...activities];
    const activity = updated[activityIndex];
    const categories = activity.price_categories || [];
    const updatedCategories = [...categories];
    
    updatedCategories[categoryIndex] = { ...updatedCategories[categoryIndex], [field]: value };
    
    // Recalculate category subtotal when unit_price or pax_count changes
    if (field === 'unit_price' || field === 'pax_count') {
      const category = updatedCategories[categoryIndex];
      category.category_subtotal = category.unit_price * category.pax_count;
    }
    
    activity.price_categories = updatedCategories;
    
    // Recalculate activity subtotal
    activity.activity_subtotal = activity.price_categories.reduce(
      (sum, cat) => sum + cat.category_subtotal,
      0
    );
    
    updated[activityIndex] = activity;
    setFormData({ ...formData, activities: updated });
  };

  const removePriceCategory = (activityIndex: number, categoryIndex: number) => {
    const activities = formData.activities || [];
    const updated = [...activities];
    const activity = updated[activityIndex];
    
    activity.price_categories = (activity.price_categories || []).filter((_, i) => i !== categoryIndex);
    
    // Recalculate activity subtotal
    activity.activity_subtotal = activity.price_categories.reduce(
      (sum, cat) => sum + cat.category_subtotal,
      0
    );
    
    updated[activityIndex] = activity;
    setFormData({ ...formData, activities: updated });
  };

  // Computed room breakdown from totalPax
  const computedRoomBreakdown = () => {
    if (totalPax % 2 === 0) {
      // Even: total_pax / 2 Twin rooms, 0 Extra Beds
      return {
        twin_rooms: totalPax / 2,
        extra_beds: 0,
      };
    } else {
      // Odd: (total_pax - 1) / 2 Twin rooms + 1 Extra Bed
      return {
        twin_rooms: (totalPax - 1) / 2,
        extra_beds: 1,
      };
    }
  };

  // Check if current step is valid
  const isStepValid = () => {
    if (currentStep === 1) {
      // Step 1 is always valid since we have computed defaults
      return true;
    }
    if (currentStep === 2) {
      const total = (formData.adults || 0) + (formData.child_with_bed || 0) + 
                   (formData.child_no_bed || 0) + (formData.infants || 0);
      return total > 0;
    }
    if (currentStep === 3) {
      // Meal restrictions are optional
      return true;
    }
    if (currentStep === 4) {
      // Elderly/special-needs are optional
      return true;
    }
    if (currentStep === 5) {
      return formData.currency !== null && formData.currency !== undefined;
    }
    if (currentStep === 6) {
      // Deferred entry: staff can defer traveler info entirely.
      if (formData.travelers_deferred) return true;
      // Otherwise, at least one traveler should be added
      const travelers = formData.travelers || [];
      return travelers.length > 0 && travelers.every(t => t.name.trim() !== '');
    }
    if (currentStep === 7) {
      // Activities are optional for now
      return true;
    }
    return false;
  };

  // Handle next button
  const handleNext = () => {
    if (isStepValid()) {
      if (currentStep === 7) {
        // Phase 2 complete - submit
        handlePhase2Complete();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // Handle previous button
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle Phase 2 completion - submit to API
  const handlePhase2Complete = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Resolve room values: use override values if enabled, otherwise use computed values
      const roomValues = formData.room_override
        ? {
            twin_rooms: formData.twin_rooms,
            double_rooms: formData.double_rooms,
            extra_beds: formData.extra_beds,
          }
        : computedRoomBreakdown();

      const response = await fetch('/api/quotations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: quotationId || '',
          action: 'complete_phase2',
          phase2_data: {
            ...formData,
            ...roomValues,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to complete Phase 2');
      }

      // Update local and parent state with the new revision ID
      if (result.id) {
        setQuotationId(result.id);
        if (onIdUpdate) {
          onIdUpdate(result.id);
        }
      }

      // Call onComplete callback with the new ID and phase2Data
      if (onComplete) {
        onComplete(result.id, { ...formData, ...roomValues });
      }

      // Move to confirmation summary
      setCurrentStep(7);

    } catch (error) {
      console.error('Error completing Phase 2:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        {/* Wizard Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Phase 2 - Pricing Details</h1>
          <p className="text-gray-600 text-sm">အဆင့် {currentStep} မှ 7</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`flex-1 h-1 mx-1 rounded ${
                step <= currentStep ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Room Breakdown */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              အခန်းခွဲခြားမှု (Room Breakdown)
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
              <div className="text-sm text-gray-600 mb-2">
                စုစုပေါင်း ခရီးသည် (Total Pax): <span className="font-semibold text-gray-800">{totalPax}</span>
              </div>
              
              {!formData.room_override ? (
                <div className="mt-3">
                  <div className="text-sm font-medium text-emerald-700 mb-1">
                    တွက်ချက်ထားသော အခန်းခွဲခြားမှု (Computed):
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {computedRoomBreakdown().twin_rooms} Twin Rooms + {computedRoomBreakdown().extra_beds} Extra Bed{computedRoomBreakdown().extra_beds !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {totalPax % 2 === 0 
                      ? `${totalPax} ÷ 2 = ${computedRoomBreakdown().twin_rooms} Twin rooms`
                      : `(${totalPax} - 1) ÷ 2 = ${computedRoomBreakdown().twin_rooms} Twin rooms + 1 Extra bed`
                    }
                  </div>
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  <div className="text-sm font-medium text-amber-700 mb-1">
                    လက်ရေးဖြင့် ပြင်ဆင်ထားသော အခန်းခွဲခြားမှု (Manual Override):
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Twin Rooms
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.twin_rooms || 0}
                        onChange={(e) => handleInputChange('twin_rooms', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Double Rooms
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.double_rooms || 0}
                        onChange={(e) => handleInputChange('double_rooms', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Extra Beds
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.extra_beds || 0}
                        onChange={(e) => handleInputChange('extra_beds', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Staff Override Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
              <div>
                <div className="font-medium text-gray-800">Staff Override</div>
                <div className="text-xs text-gray-500">အခန်းခွဲခြားမှုကို လက်ရေးဖြင့် ပြင်ဆင်မည်</div>
              </div>
              <button
                onClick={() => {
                  const newOverride = !formData.room_override;
                  handleInputChange('room_override', newOverride);
                  if (newOverride) {
                    // Initialize with computed values when enabling override
                    const computed = computedRoomBreakdown();
                    handleInputChange('twin_rooms', computed.twin_rooms);
                    handleInputChange('double_rooms', 0);
                    handleInputChange('extra_beds', computed.extra_beds);
                  }
                }}
                className={`w-16 h-8 rounded-full transition-all ${
                  formData.room_override ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-all ${
                    formData.room_override ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pax Breakdown */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ခရီးသည်အရေအတွက် (အမျိုးအစားခွဲခြား)
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
                <div>
                  <div className="font-medium text-gray-800">လူကြီး (Adults)</div>
                  <div className="text-xs text-gray-500">12 နှစ်နှင့်အထက်</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleInputChange('adults', Math.max(0, (formData.adults || 0) - 1))}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{formData.adults || 0}</span>
                  <button
                    onClick={() => handleInputChange('adults', (formData.adults || 0) + 1)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* FOC (Free of Charge) pax count — nested under Adult category, added 2026-08-31 */}
              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 ml-4">
                <div>
                  <div className="font-medium text-gray-800 text-sm">FOC (အခမဲ့) — Adult အောက်</div>
                  <div className="text-xs text-gray-500">Free of Charge pax — စုစုပေါင်း အရေအတွက်ထဲ မထည့်ပါ</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleInputChange('foc_count', Math.max(0, (formData.foc_count || 0) - 1))}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{formData.foc_count || 0}</span>
                  <button
                    onClick={() => handleInputChange('foc_count', (formData.foc_count || 0) + 1)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
                <div>
                  <div className="font-medium text-gray-800">ကလေး (အိပ်ရာပါ) - Child with Bed</div>
                  <div className="text-xs text-gray-500">2-11 နှစ် (အိပ်ရာသီးသန့်)</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleInputChange('child_with_bed', Math.max(0, (formData.child_with_bed || 0) - 1))}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{formData.child_with_bed || 0}</span>
                  <button
                    onClick={() => handleInputChange('child_with_bed', (formData.child_with_bed || 0) + 1)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
                <div>
                  <div className="font-medium text-gray-800">ကလေး (အိပ်ရာမပါ) - Child No Bed</div>
                  <div className="text-xs text-gray-500">2-11 နှစ် (မိဘများနှင့်အတူအိပ်)</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleInputChange('child_no_bed', Math.max(0, (formData.child_no_bed || 0) - 1))}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{formData.child_no_bed || 0}</span>
                  <button
                    onClick={() => handleInputChange('child_no_bed', (formData.child_no_bed || 0) + 1)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
                <div>
                  <div className="font-medium text-gray-800">နို့စို့ကလေး (Infants)</div>
                  <div className="text-xs text-gray-500">2 နှစ်အောက်</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleInputChange('infants', Math.max(0, (formData.infants || 0) - 1))}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{formData.infants || 0}</span>
                  <button
                    onClick={() => handleInputChange('infants', (formData.infants || 0) + 1)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-emerald-600 font-medium">
              စုစုပေါင်း: {(formData.adults || 0) + (formData.child_with_bed || 0) + (formData.child_no_bed || 0) + (formData.infants || 0)} ဦး
              {(formData.foc_count || 0) > 0 && (
                <span className="text-amber-600 font-normal"> {' '}+ FOC {formData.foc_count} ဦး (အပေါ်ကစုစုပေါင်းထဲ မပါ)</span>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Meal Restrictions */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              အစားအသောက် ကန့်သတ်ချက်များ
            </h2>

            {/* "No Food Service" option (added 2026-08-31) — same exclude-the-line
                pattern as Phase 1's No Hotel/No Transport options */}
            <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
              <div>
                <div className="font-medium text-gray-800">Food Service မလိုပါ</div>
                <div className="text-xs text-gray-500">No Food Service — Final Calculation မှာ Meals line ကို ဖယ်ထားမည်</div>
              </div>
              <button
                onClick={() => handleInputChange('no_food_service', !formData.no_food_service)}
                className={`w-16 h-8 rounded-full transition-all ${
                  formData.no_food_service ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-all ${
                    formData.no_food_service ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {!formData.no_food_service && (
            <div className="space-y-3">
              {[
                { value: 'vegetarian', label: 'ဟင်းလျာသက်သက် (Vegetarian)', label_mm: 'ဟင်းလျာသက်သက်' },
                { value: 'vegan', label: 'အခွံမပါ (Vegan)', label_mm: 'အခွံမပါ' },
                { value: 'halal', label: 'ဟာလာလ် (Halal)', label_mm: 'ဟာလာလ်' },
                { value: 'gluten_free', label: 'Gluten Free', label_mm: 'Gluten Free' },
                { value: 'no_pork', label: 'ဝက်သားမပါ (No Pork)', label_mm: 'ဝက်သားမပါ' },
                { value: 'no_seafood', label: 'ပင်လယ်စာမပါ (No Seafood)', label_mm: 'ပင်လယ်စာမပါ' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleMealRestriction(option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    (formData.meal_restrictions || []).includes(option.value)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-medium text-sm">{option.label_mm}</div>
                  <div className="text-xs text-gray-500 mt-1">{option.label}</div>
                </button>
              ))}
            </div>
            )}

            {!formData.no_food_service && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                အခြားမှတ်ချက်များ (ရှိလျှင်)
              </label>
              <textarea
                value={formData.dietary_notes || ''}
                onChange={(e) => handleInputChange('dietary_notes', e.target.value)}
                placeholder="အခြားအစားအသောက်ဆိုင်ရာမှတ်ချက်များရေးသားပါ..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all resize-none"
              />
            </div>
            )}
          </div>
        )}

        {/* Step 4: Elderly/Special Needs */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              လူကြီးများ / အထူးလိုအပ်ချက်များ
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl border-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">လူကြီးများ ပါဝင်ပါသလား?</div>
                    <div className="text-xs text-gray-500">65 နှစ်နှင့်အထက်</div>
                  </div>
                  <button
                    onClick={() => handleInputChange('has_elderly', !formData.has_elderly)}
                    className={`w-16 h-8 rounded-full transition-all ${
                      formData.has_elderly ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-all ${
                        formData.has_elderly ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {formData.has_elderly && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      လူကြီးအရေအတွက်
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.elderly_count || 0}
                      onChange={(e) => handleInputChange('elderly_count', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl border-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">အထူးလိုအပ်ချက်များ ရှိပါသလား?</div>
                    <div className="text-xs text-gray-500">ဥပမာ - အသွားအလာခက်ခဲခြင်း, ဆေးဝါးလိုအပ်ခြင်း</div>
                  </div>
                  <button
                    onClick={() => handleInputChange('has_special_needs', !formData.has_special_needs)}
                    className={`w-16 h-8 rounded-full transition-all ${
                      formData.has_special_needs ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-all ${
                        formData.has_special_needs ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {formData.has_special_needs && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      အထူးလိုအပ်ချက်များ ရေးသားပါ
                    </label>
                    <textarea
                      value={formData.special_needs_notes || ''}
                      onChange={(e) => handleInputChange('special_needs_notes', e.target.value)}
                      placeholder="အထူးလိုအပ်ချက်များကို အသေးစိတ်ရေးသားပါ..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all resize-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Currency */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ငွေကြေးအမျိုးအစား
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { value: 'USD', label: 'US Dollar', symbol: '$' },
                { value: 'THB', label: 'Thai Baht', symbol: '฿' },
                { value: 'MMK', label: 'Myanmar Kyat', symbol: 'Ks' },
                { value: 'EUR', label: 'Euro', symbol: '€' },
                { value: 'SGD', label: 'Singapore Dollar', symbol: 'S$' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange('currency', option.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.currency === option.value
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-medium text-sm">{option.symbol}</div>
                  <div className="text-xs text-gray-500 mt-1">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Traveler Information */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ခရီးသည်အချက်အလက်များ
            </h2>

            {/* "Fill in later" deferred-entry toggle (added 2026-08-31) —
                implements the "Will provide later" option already in the locked spec */}
            <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
              <div>
                <div className="font-medium text-gray-800">နောက်မှ ဖြည့်မည်</div>
                <div className="text-xs text-gray-500">Fill in later — ခရီးသွား အချက်အလက်များကို ယခု မထည့်ဘဲ ဆက်သွားနိုင်သည်</div>
              </div>
              <button
                onClick={() => handleInputChange('travelers_deferred', !formData.travelers_deferred)}
                className={`w-16 h-8 rounded-full transition-all ${
                  formData.travelers_deferred ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-all ${
                    formData.travelers_deferred ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {!formData.travelers_deferred && (
            <div className="space-y-4">
              {(formData.travelers || []).map((traveler, index) => (
                <div key={index} className="p-4 rounded-xl border-2 border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-800">ခရီးသည် #{index + 1}</div>
                    {(formData.travelers || []).length > 1 && (
                      <button
                        onClick={() => removeTraveler(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        ဖျက်မည်
                      </button>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      အမည် *
                    </label>
                    <input
                      type="text"
                      value={traveler.name}
                      onChange={(e) => updateTraveler(index, 'name', e.target.value)}
                      placeholder="အမည်ရေးသားပါ"
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ပါစ်ပို့နံပါတ် (ရှိလျှင်)
                    </label>
                    <input
                      type="text"
                      value={traveler.passport_number || ''}
                      onChange={(e) => updateTraveler(index, 'passport_number', e.target.value)}
                      placeholder="ပါစ်ပို့နံပါတ်"
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      နိုင်ငံသား (ရှိလျှင်)
                    </label>
                    <input
                      type="text"
                      value={traveler.nationality || ''}
                      onChange={(e) => updateTraveler(index, 'nationality', e.target.value)}
                      placeholder="နိုင်ငံသား"
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              ))}
              
              <button
                onClick={addTraveler}
                className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                ခရီးသည်ထပ်ထည့်မည်
              </button>
            </div>
            )}
          </div>
        )}

        {/* Step 7: Day-by-Day Program/Activities Survey */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              နေ့စဉ် အစီအစဉ် / လှုပ်ရှားမှုများ
            </h2>
            
            <div className="space-y-6">
              {(formData.activities || []).map((activity, activityIndex) => (
                <div key={activity.id} className="p-4 rounded-xl border-2 border-gray-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-800">Day {activity.day_number}</div>
                    {(formData.activities || []).length > 1 && (
                      <button
                        onClick={() => removeActivity(activityIndex)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        ဖျက်မည်
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ရက်စွဲ
                      </label>
                      <input
                        type="date"
                        value={activity.date}
                        onChange={(e) => updateActivity(activityIndex, 'date', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        လှုပ်ရှားမှု အမည် *
                      </label>
                      <input
                        type="text"
                        value={activity.activity_name}
                        onChange={(e) => updateActivity(activityIndex, 'activity_name', e.target.value)}
                        placeholder="Grand Palace + Reclining Buddha"
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      တည်နေရာ (ရှိလျှင်)
                    </label>
                    <input
                      type="text"
                      value={activity.location || ''}
                      onChange={(e) => updateActivity(activityIndex, 'location', e.target.value)}
                      placeholder="Bangkok Old City"
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      မှတ်ချက် / ရင်းမြစ် (ရှိလျှင်)
                    </label>
                    <input
                      type="text"
                      value={activity.notes_source || ''}
                      onChange={(e) => updateActivity(activityIndex, 'notes_source', e.target.value)}
                      placeholder="https://klook.com/..."
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                  
                  {/* Price Categories */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-gray-700 text-sm">စျေးနှုန်း အမျိုးအစားများ</div>
                      <button
                        onClick={() => addPriceCategory(activityIndex)}
                        className="text-emerald-600 hover:text-emerald-700 text-sm"
                      >
                        + အမျိုးအစားထပ်ထည့်မည်
                      </button>
                    </div>
                    
                    {(activity.price_categories || []).map((category, categoryIndex) => (
                      <div key={category.id} className="p-3 rounded-lg border border-gray-200 space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">Category #{categoryIndex + 1}</div>
                          {(activity.price_categories || []).length > 1 && (
                            <button
                              onClick={() => removePriceCategory(activityIndex, categoryIndex)}
                              className="text-red-600 hover:text-red-700 text-xs"
                            >
                              ဖျက်မည်
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              အမည် *
                            </label>
                            <input
                              type="text"
                              value={category.category_label}
                              onChange={(e) => updatePriceCategory(activityIndex, categoryIndex, 'category_label', e.target.value)}
                              placeholder="Adult"
                              className="w-full px-3 py-1.5 rounded border border-gray-200 focus:border-emerald-500 focus:outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              ယူနစ် စျေး *
                            </label>
                            <input
                              type="number"
                              value={category.unit_price}
                              onChange={(e) => updatePriceCategory(activityIndex, categoryIndex, 'unit_price', parseFloat(e.target.value) || 0)}
                              placeholder="0"
                              className="w-full px-3 py-1.5 rounded border border-gray-200 focus:border-emerald-500 focus:outline-none text-sm"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              အသက် အနိမ့်
                            </label>
                            <input
                              type="number"
                              value={category.age_range_min || ''}
                              onChange={(e) => updatePriceCategory(activityIndex, categoryIndex, 'age_range_min', e.target.value ? parseFloat(e.target.value) : undefined)}
                              placeholder="-"
                              className="w-full px-3 py-1.5 rounded border border-gray-200 focus:border-emerald-500 focus:outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              အသက် အမြင့်
                            </label>
                            <input
                              type="number"
                              value={category.age_range_max || ''}
                              onChange={(e) => updatePriceCategory(activityIndex, categoryIndex, 'age_range_max', e.target.value ? parseFloat(e.target.value) : undefined)}
                              placeholder="-"
                              className="w-full px-3 py-1.5 rounded border border-gray-200 focus:border-emerald-500 focus:outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              ဦးရေ *
                            </label>
                            <input
                              type="number"
                              value={category.pax_count}
                              onChange={(e) => updatePriceCategory(activityIndex, categoryIndex, 'pax_count', parseInt(e.target.value) || 0)}
                              placeholder="0"
                              className="w-full px-3 py-1.5 rounded border border-gray-200 focus:border-emerald-500 focus:outline-none text-sm"
                            />
                          </div>
                        </div>
                        
                        <div className="text-right text-sm font-medium text-emerald-600">
                          {getCurrencySymbol(formData.currency)}{category.category_subtotal.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-right font-medium text-gray-800 pt-2 border-t border-gray-200">
                    Activity Subtotal: {getCurrencySymbol(formData.currency)}{activity.activity_subtotal.toFixed(2)}
                  </div>
                </div>
              ))}
              
              <button
                onClick={addActivity}
                className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                နေ့ထပ်ထည့်မည်
              </button>
            </div>
          </div>
        )}

        {/* Phase 2 Complete Summary */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Phase 2 ပြီးမြောက်ပါပြီ
            </h2>
            
            {isSubmitting ? (
              <div className="text-center py-8 text-gray-500">
                လုပ်ဆောင်နေသည်...
              </div>
            ) : submitError ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700 font-medium mb-2">
                  အမှားတစ်စုံတစ်ခု ဖြစ်ပါသည်
                </p>
                <p className="text-xs text-red-600">{submitError}</p>
                <button
                  onClick={handlePhase2Complete}
                  className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                >
                  ထပ်စမ်းကြည့်ရန်
                </button>
              </div>
            ) : (
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
                <p className="text-sm text-emerald-700 font-medium mb-2">
                  Phase 2 အချက်အလက်များ စုဆောင်းပြီးမြောက်ပါပြီ
                </p>
                <div className="text-xs text-emerald-600 space-y-1">
                  {tourCode && <p>Tour Code: {tourCode}</p>}
                  <p>Travel Dates: {startDate} to {endDate}</p>
                  <p>Room Breakdown: {formData.room_override 
                    ? `${formData.twin_rooms} Twin Rooms + ${formData.extra_beds} Extra Bed${formData.extra_beds !== 1 ? 's' : ''} (manual override)`
                    : `${computedRoomBreakdown().twin_rooms} Twin Rooms + ${computedRoomBreakdown().extra_beds} Extra Bed${computedRoomBreakdown().extra_beds !== 1 ? 's' : ''} (computed)`
                  }</p>
                  <p>Pax: Adults {formData.adults}, Child+Bed {formData.child_with_bed}, Child No Bed {formData.child_no_bed}, Infants {formData.infants}{(formData.foc_count || 0) > 0 ? `, FOC ${formData.foc_count}` : ''}</p>
                  <p>Meals: {formData.no_food_service ? 'No Food Service' : `${(formData.meal_restrictions || []).length} restriction(s) selected`}</p>
                  <p>Elderly: {formData.has_elderly ? `Yes (${formData.elderly_count})` : 'No'}</p>
                  <p>Special Needs: {formData.has_special_needs ? 'Yes' : 'No'}</p>
                  <p>Currency: {formData.currency}</p>
                  <p>Hotel Level: {hotelLevel === 'no_hotel' ? 'No Hotel' : hotelLevel === 'budget' ? 'Budget' : hotelLevel === 'standard' ? 'Standard' : hotelLevel === 'deluxe' ? 'Deluxe' : hotelLevel === 'luxury' ? 'Luxury' : 'Not specified'}</p>
                  <p>Travelers: {formData.travelers_deferred ? 'Deferred (Fill in later)' : `${(formData.travelers || []).length} registered`}</p>
                </div>
                {onComplete && quotationId && (
                  <button
                    onClick={() => onComplete(quotationId)}
                    className="mt-4 w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    Continue to Cost Input
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            {currentStep > 1 ? (
              <button
                onClick={handlePrevious}
                className="px-6 py-3 rounded-xl font-medium text-sm transition-all border-2 border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer"
              >
                နောက်သို့
              </button>
            ) : onBack ? (
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl font-medium text-sm transition-all border-2 border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer"
              >
                Phase 1 သို့
              </button>
            ) : (
              <div className="w-24" />
            )}
            <button
              onClick={handleNext}
              disabled={!isStepValid() || isSubmitting}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                isStepValid() && !isSubmitting
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'လုပ်ဆောင်နေသည်...' : (currentStep === 7 ? 'ပြီးမြောက်ပါပြီ' : 'ရှေ့သို့')}
            </button>
          </div>
      </div>
    </div>
  );
};

export default Phase2WizardComponent;
