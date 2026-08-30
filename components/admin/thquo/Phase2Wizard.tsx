'use client';

import React, { useState, useEffect } from 'react';

interface Traveler {
  name: string;
  passport_number?: string;
  nationality?: string;
}

interface FormData {
  // Step 1: Exact travel dates
  exact_start_date?: string;
  exact_end_date?: string;
  
  // Step 2: Room breakdown (computed from totalPax or manual override)
  twin_rooms?: number;
  double_rooms?: number;
  extra_beds?: number;
  room_override?: boolean;
  
  // Step 3: 4-category pax breakdown
  adults?: number;
  child_with_bed?: number;
  child_no_bed?: number;
  infants?: number;
  
  // Step 4: Meal restrictions
  meal_restrictions?: string[];
  dietary_notes?: string;
  
  // Step 5: Elderly/special-needs flags
  has_elderly?: boolean;
  elderly_count?: number;
  has_special_needs?: boolean;
  special_needs_notes?: string;
  
  // Step 6: Currency
  currency?: 'USD' | 'THB' | 'MMK' | 'EUR' | 'SGD' | null;
  
  // Step 7: Hotel level
  hotel_level?: number;
  
  // Step 8: Passport/traveler name list
  travelers?: Traveler[];
}

export interface Phase2WizardProps {
  totalPax?: number;
  quotationId?: string;
  onBack?: () => void;
  onComplete?: (id: string, phase2Data?: FormData) => void;
  onIdUpdate?: (newId: string) => void;
}

const Phase2WizardComponent: React.FC<Phase2WizardProps> = ({ totalPax: propTotalPax, quotationId: propQuotationId, onBack, onComplete, onIdUpdate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    adults: 0,
    child_with_bed: 0,
    child_no_bed: 0,
    infants: 0,
    meal_restrictions: [],
    has_elderly: false,
    elderly_count: 0,
    has_special_needs: false,
    travelers: [],
    room_override: false,
    hotel_level: 3, // Default to mid-range hotel
  });
  
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

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
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
      return formData.exact_start_date && formData.exact_end_date;
    }
    if (currentStep === 2) {
      // Step 2 is always valid since we have computed defaults
      return true;
    }
    if (currentStep === 3) {
      const total = (formData.adults || 0) + (formData.child_with_bed || 0) + 
                   (formData.child_no_bed || 0) + (formData.infants || 0);
      return total > 0;
    }
    if (currentStep === 4) {
      // Meal restrictions are optional
      return true;
    }
    if (currentStep === 5) {
      // Elderly/special-needs are optional
      return true;
    }
    if (currentStep === 6) {
      return formData.currency !== null && formData.currency !== undefined;
    }
    if (currentStep === 7) {
      // Hotel level is required
      return formData.hotel_level !== undefined && formData.hotel_level !== null;
    }
    if (currentStep === 8) {
      // At least one traveler should be added
      const travelers = formData.travelers || [];
      return travelers.length > 0 && travelers.every(t => t.name.trim() !== '');
    }
    return false;
  };

  // Handle next button
  const handleNext = () => {
    if (isStepValid()) {
      if (currentStep === 8) {
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
      const response = await fetch('/api/quotations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: quotationId || '',
          action: 'complete_phase2',
          phase2_data: formData,
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
        onComplete(result.id, formData);
      }

      // Move to confirmation summary
      setCurrentStep(8);

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
          <p className="text-gray-600 text-sm">အဆင့် {currentStep} မှ 8</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
            <div
              key={step}
              className={`flex-1 h-1 mx-1 rounded ${
                step <= currentStep ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Exact Travel Dates */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              တိကျသော ခရီးစဉ်ရက်စွဲများ
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  စတင်ရက်စွဲ
                </label>
                <input
                  type="date"
                  value={formData.exact_start_date || ''}
                  onChange={(e) => handleInputChange('exact_start_date', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ပြီးဆုံးရက်စွဲ
                </label>
                <input
                  type="date"
                  value={formData.exact_end_date || ''}
                  onChange={(e) => handleInputChange('exact_end_date', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Room Breakdown */}
        {currentStep === 2 && (
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
                  <div className="grid grid-cols-2 gap-3">
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

        {/* Step 3: Pax Breakdown */}
        {currentStep === 3 && (
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
            </div>
          </div>
        )}

        {/* Step 4: Meal Restrictions */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              အစားအသောက် ကန့်သတ်ချက်များ
            </h2>
            
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
          </div>
        )}

        {/* Step 5: Elderly/Special Needs */}
        {currentStep === 5 && (
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

        {/* Step 6: Currency */}
        {currentStep === 6 && (
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

        {/* Step 7: Hotel Level */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ဟိုတယ်အဆင့် (Hotel Level)
            </h2>
            
            <div className="space-y-3">
              {[
                { value: 0, label: 'No Hotel', label_mm: 'ဟိုတယ်မပါ', description: 'Customers arrange their own accommodation' },
                { value: 1, label: 'Budget', label_mm: 'ဈေးသက်သာ', description: '2-3 star hotels, guesthouses' },
                { value: 2, label: 'Standard', label_mm: 'ပုံမှန်', description: '3-4 star hotels' },
                { value: 3, label: 'Mid-Range', label_mm: 'အလယ်အလတ်', description: '4 star hotels' },
                { value: 4, label: 'Premium', label_mm: 'အဆင့်မြင့်', description: '5 star hotels' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange('hotel_level', option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.hotel_level === option.value
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-medium text-sm">{option.label_mm}</div>
                  <div className="text-xs text-gray-500 mt-1">{option.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Traveler Information */}
        {currentStep === 8 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ခရီးသည်အချက်အလက်များ
            </h2>
            
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
          </div>
        )}

        {/* Phase 2 Complete Summary */}
        {currentStep === 9 && (
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
                  <p>Travel Dates: {formData.exact_start_date} to {formData.exact_end_date}</p>
                  <p>Room Breakdown: {formData.room_override 
                    ? `${formData.twin_rooms} Twin Rooms + ${formData.extra_beds} Extra Bed${formData.extra_beds !== 1 ? 's' : ''} (manual override)`
                    : `${computedRoomBreakdown().twin_rooms} Twin Rooms + ${computedRoomBreakdown().extra_beds} Extra Bed${computedRoomBreakdown().extra_beds !== 1 ? 's' : ''} (computed)`
                  }</p>
                  <p>Pax: Adults {formData.adults}, Child+Bed {formData.child_with_bed}, Child No Bed {formData.child_no_bed}, Infants {formData.infants}</p>
                  <p>Meal Restrictions: {(formData.meal_restrictions || []).length} selected</p>
                  <p>Elderly: {formData.has_elderly ? `Yes (${formData.elderly_count})` : 'No'}</p>
                  <p>Special Needs: {formData.has_special_needs ? 'Yes' : 'No'}</p>
                  <p>Currency: {formData.currency}</p>
                  <p>Hotel Level: {formData.hotel_level === 0 ? 'No Hotel' : formData.hotel_level === 1 ? 'Budget' : formData.hotel_level === 2 ? 'Standard' : formData.hotel_level === 3 ? 'Mid-Range' : 'Premium'}</p>
                  <p>Travelers: {(formData.travelers || []).length} registered</p>
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
        {currentStep !== 8 && (
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
        )}
      </div>
    </div>
  );
};

export default Phase2WizardComponent;
