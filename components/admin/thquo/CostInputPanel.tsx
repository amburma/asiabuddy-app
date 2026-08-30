'use client';

import React, { useState, useMemo, useEffect } from 'react';

interface TicketActivity {
  name: string;
  cost: number;
}

interface CostComponents {
  hotel: {
    per_night_rate: number;
    nights: number;
    notes: string;
  };
  transport: {
    mode: 'private' | 'public';
    total_cost: number;
    car_rental_kb_rate?: number; // TODO: KB lookup placeholder
  };
  meals: {
    per_person_per_day_rate: number;
    notes: string;
  };
  tickets_activities: TicketActivity[];
  guide: {
    rate_type: 'flat' | 'per_day';
    amount: number;
  };
}

export interface CostInputPanelProps {
  quotationId: string;
  duration_days?: number;
  transport_mode?: 'private' | 'public';
  phase2Data?: {
    twin_rooms?: number;
    double_rooms?: number;
    extra_beds?: number;
  };
  hotelLevel?: number | null;
  onBack?: () => void;
  onComplete?: () => void;
  onIdUpdate?: (newId: string) => void;
}

const CostInputPanelComponent: React.FC<CostInputPanelProps> = ({
  quotationId: propQuotationId,
  duration_days,
  transport_mode,
  phase2Data,
  hotelLevel,
  onBack,
  onComplete,
  onIdUpdate,
}) => {
  const [quotationId, setQuotationId] = useState<string>(propQuotationId);
  
  // Update local quotationId when prop changes
  useEffect(() => {
    if (propQuotationId) {
      setQuotationId(propQuotationId);
    }
  }, [propQuotationId]);

  // Rehydrate cost components from existing quotation on mount
  useEffect(() => {
    if (!quotationId) return;

    const rehydrateCostComponents = async () => {
      try {
        const response = await fetch(`/api/quotations?id=${quotationId}`, { method: 'GET' });
        
        if (!response.ok) {
          console.error('Failed to rehydrate cost components:', response.status, response.statusText);
          return;
        }

        const data = await response.json();
        
        if (data.cost_components) {
          setCostComponents(data.cost_components);
        }
      } catch (error) {
        console.error('Error rehydrating cost components:', error);
        // Leave fields at default/empty state on failure
      }
    };

    rehydrateCostComponents();
  }, [quotationId]);

  const [costComponents, setCostComponents] = useState<CostComponents>({
    hotel: {
      per_night_rate: 0,
      nights: duration_days ? Math.max(duration_days - 1, 1) : 1,
      notes: '',
    },
    transport: {
      mode: transport_mode || 'private',
      total_cost: 0,
      car_rental_kb_rate: undefined,
    },
    meals: {
      per_person_per_day_rate: 0,
      notes: '',
    },
    tickets_activities: [],
    guide: {
      rate_type: 'flat',
      amount: 0,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pricingSnapshot, setPricingSnapshot] = useState<any>(null);
  const [pricingError, setPricingError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Computed running subtotal (excluding contingency and currency buffers)
  const runningSubtotal = useMemo(() => {
    const fullRooms = (phase2Data?.twin_rooms || 0) + (phase2Data?.double_rooms || 0);
    const extraBeds = phase2Data?.extra_beds || 0;
    const isHotelExcluded = hotelLevel === 0;
    const hotelTotal = isHotelExcluded ? 0 : costComponents.hotel.per_night_rate * costComponents.hotel.nights * (fullRooms + extraBeds * 0.5);
    const transportTotal = costComponents.transport.total_cost;
    const mealsTotal = costComponents.meals.per_person_per_day_rate * costComponents.hotel.nights;
    const ticketsTotal = costComponents.tickets_activities.reduce((sum, item) => sum + item.cost, 0);
    const guideTotal = costComponents.guide.amount;
    return hotelTotal + transportTotal + mealsTotal + ticketsTotal + guideTotal;
  }, [costComponents, phase2Data, hotelLevel]);

  // Computed contingency (2% of running subtotal)
  const contingency = useMemo(() => {
    return runningSubtotal * 0.02;
  }, [runningSubtotal]);

  // Computed currency risk buffer (2% of running subtotal)
  const currencyRiskBuffer = useMemo(() => {
    return runningSubtotal * 0.02;
  }, [runningSubtotal]);

  // Grand total
  const grandTotal = useMemo(() => {
    return runningSubtotal + contingency + currencyRiskBuffer;
  }, [runningSubtotal, contingency, currencyRiskBuffer]);

  const handleInputChange = (section: keyof CostComponents, field: string, value: any) => {
    setCostComponents({
      ...costComponents,
      [section]: {
        ...costComponents[section],
        [field]: value,
      },
    });
  };

  const addTicketActivity = () => {
    setCostComponents({
      ...costComponents,
      tickets_activities: [...costComponents.tickets_activities, { name: '', cost: 0 }],
    });
  };

  const updateTicketActivity = (index: number, field: keyof TicketActivity, value: string | number) => {
    const updated = [...costComponents.tickets_activities];
    updated[index] = { ...updated[index], [field]: value };
    setCostComponents({
      ...costComponents,
      tickets_activities: updated,
    });
  };

  const removeTicketActivity = (index: number) => {
    setCostComponents({
      ...costComponents,
      tickets_activities: costComponents.tickets_activities.filter((_, i) => i !== index),
    });
  };

  const calculatePricing = async () => {
    setIsCalculating(true);
    setPricingError(null);

    try {
      const response = await fetch('/api/quotations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: quotationId,
          action: 'calculate_pricing',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to calculate pricing');
      }

      // Update local and parent state with the new revision ID
      if (result.id) {
        setQuotationId(result.id);
        if (onIdUpdate) {
          onIdUpdate(result.id);
        }
      }

      setPricingSnapshot(result.pricing_snapshot);
    } catch (error) {
      console.error('Error calculating pricing:', error);
      setPricingError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/quotations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: quotationId,
          action: 'update_cost_components',
          cost_components: costComponents,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update cost components');
      }

      // Update local and parent state with the new revision ID (if returned)
      if (result.id) {
        setQuotationId(result.id);
        if (onIdUpdate) {
          onIdUpdate(result.id);
        }
      }

      // Automatically calculate pricing after successful cost update
      await calculatePricing();

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error updating cost components:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Cost Input Panel</h1>
          <p className="text-gray-600 text-sm">Quotation ID: {quotationId}</p>
        </div>

        {/* Hotel Section */}
        <div className="space-y-4 p-4 rounded-xl border-2 border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Hotel</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Per-Night Rate
              </label>
              <input
                type="number"
                min="0"
                value={costComponents.hotel.per_night_rate}
                onChange={(e) => handleInputChange('hotel', 'per_night_rate', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nights
              </label>
              <input
                type="number"
                min="1"
                value={costComponents.hotel.nights}
                onChange={(e) => handleInputChange('hotel', 'nights', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes/Source
            </label>
            <textarea
              value={costComponents.hotel.notes}
              onChange={(e) => handleInputChange('hotel', 'notes', e.target.value)}
              placeholder="Hotel name, booking source, etc."
              rows={2}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Transport Section */}
        <div className="space-y-4 p-4 rounded-xl border-2 border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Transport</h2>
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-600">
              Mode: <span className="font-semibold text-gray-800 capitalize">{costComponents.transport.mode}</span>
            </p>
          </div>
          
          {costComponents.transport.mode === 'private' ? (
            <div className="space-y-4">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 font-medium mb-2">
                  Car Rental (KB rate) - TODO placeholder
                </p>
                <input
                  type="number"
                  min="0"
                  value={costComponents.transport.car_rental_kb_rate || ''}
                  onChange={(e) => handleInputChange('transport', 'car_rental_kb_rate', parseFloat(e.target.value) || undefined)}
                  placeholder="KB rate lookup not yet implemented"
                  className="w-full px-4 py-2 rounded-lg border-2 border-amber-300 bg-amber-50 focus:border-emerald-500 focus:outline-none transition-all"
                  disabled
                />
                <p className="text-xs text-amber-600 mt-2">
                  KB lookup will be implemented in a future update
                </p>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                12Go Fare (Total Trip Cost)
              </label>
              <input
                type="number"
                min="0"
                value={costComponents.transport.total_cost}
                onChange={(e) => handleInputChange('transport', 'total_cost', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
          )}
        </div>

        {/* Meals Section */}
        <div className="space-y-4 p-4 rounded-xl border-2 border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Meals</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Per-Person-Per-Day Rate
            </label>
            <input
              type="number"
              min="0"
              value={costComponents.meals.per_person_per_day_rate}
              onChange={(e) => handleInputChange('meals', 'per_person_per_day_rate', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={costComponents.meals.notes}
              onChange={(e) => handleInputChange('meals', 'notes', e.target.value)}
              placeholder="Meal plan details, dietary accommodations, etc."
              rows={2}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Tickets/Activities Section */}
        <div className="space-y-4 p-4 rounded-xl border-2 border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Tickets/Activities</h2>
          <div className="space-y-3">
            {costComponents.tickets_activities.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateTicketActivity(index, 'name', e.target.value)}
                    placeholder="Activity name"
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    min="0"
                    value={item.cost}
                    onChange={(e) => updateTicketActivity(index, 'cost', parseFloat(e.target.value) || 0)}
                    placeholder="Cost"
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <button
                  onClick={() => removeTicketActivity(index)}
                  className="px-3 py-2 rounded-lg border-2 border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 transition-all"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addTicketActivity}
              className="w-full p-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Ticket/Activity
            </button>
          </div>
        </div>

        {/* Guide Section */}
        <div className="space-y-4 p-4 rounded-xl border-2 border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Guide</h2>
          <div className="space-y-3">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="flat"
                  checked={costComponents.guide.rate_type === 'flat'}
                  onChange={(e) => handleInputChange('guide', 'rate_type', e.target.value)}
                  className="w-4 h-4 text-emerald-500"
                />
                <span className="text-sm text-gray-700">Flat Rate</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="per_day"
                  checked={costComponents.guide.rate_type === 'per_day'}
                  onChange={(e) => handleInputChange('guide', 'rate_type', e.target.value)}
                  className="w-4 h-4 text-emerald-500"
                />
                <span className="text-sm text-gray-700">Per-Day Rate</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                min="0"
                value={costComponents.guide.amount}
                onChange={(e) => handleInputChange('guide', 'amount', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Computed Buffers Section */}
        <div className="space-y-4 p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Computed Buffers (Read-Only)</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Running Subtotal</span>
              <span className="text-sm font-semibold text-gray-800">${runningSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Contingency (2%)</span>
              <span className="text-sm font-semibold text-emerald-700">${contingency.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Currency Risk Buffer (2%)</span>
              <span className="text-sm font-semibold text-emerald-700">${currencyRiskBuffer.toFixed(2)}</span>
            </div>
            <div className="border-t border-emerald-300 pt-3 flex justify-between items-center">
              <span className="text-base font-semibold text-gray-800">Grand Total</span>
              <span className="text-base font-bold text-emerald-800">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Pricing Snapshot Section */}
        {pricingSnapshot && (
          <div className="space-y-4 p-4 rounded-xl border-2 border-blue-200 bg-blue-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Pricing Snapshot</h2>
              <button
                onClick={calculatePricing}
                disabled={isCalculating}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isCalculating ? 'Recalculating...' : 'Recalculate'}
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Total Direct Cost</span>
                <span className="text-sm font-semibold text-gray-800">${pricingSnapshot.total_direct_cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Contingency</span>
                <span className="text-sm font-semibold text-blue-700">${pricingSnapshot.contingency.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Currency Buffer</span>
                <span className="text-sm font-semibold text-blue-700">${pricingSnapshot.currency_buffer.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Subtotal</span>
                <span className="text-sm font-semibold text-gray-800">${pricingSnapshot.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Gross Tour Price</span>
                <span className="text-sm font-semibold text-gray-800">${pricingSnapshot.gross_tour_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Group Discounted Price</span>
                <span className="text-sm font-semibold text-blue-700">${pricingSnapshot.group_discounted_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Adult Price Per Person</span>
                <span className="text-sm font-semibold text-gray-800">${pricingSnapshot.adult_price_per_person.toFixed(2)}</span>
              </div>
              {pricingSnapshot.child_no_bed_price_per_person !== null && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Child (No Bed) Price Per Person</span>
                  <span className="text-sm font-semibold text-blue-700">${pricingSnapshot.child_no_bed_price_per_person.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
                <span className="text-base font-semibold text-gray-800">Total Package Price</span>
                <span className="text-base font-bold text-blue-800">${pricingSnapshot.total_package_price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Error Display */}
        {pricingError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-700 font-medium">
              Pricing Calculation Error: {pricingError}
            </p>
          </div>
        )}

        {/* Error Display */}
        {submitError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-700 font-medium">
              {submitError}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl font-medium text-sm transition-all border-2 border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer"
            >
              Back
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer'
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Cost Components'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostInputPanelComponent;
