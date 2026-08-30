'use client';

import React, { useState } from 'react';

// TEMPORARY STUB — full reconstruction pending
// This is a minimal placeholder to unblock the build for testing hotel pricing fix
// DO NOT use this for production - full Phase1Wizard reconstruction is required

export interface Phase1WizardProps {
  onComplete?: (id: string, totalPax: number, phase1Data?: { duration_days?: number; transport_mode?: 'private' | 'public' }) => void;
  onIdUpdate?: (newId: string) => void;
}

const Phase1WizardComponent: React.FC<Phase1WizardProps> = ({ onComplete, onIdUpdate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleComplete = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Placeholder test data for hotel pricing fix testing
      const testPhase1Data = {
        duration_days: 3,
        transport_mode: 'private' as const,
        totalPax: 4,
        start_date: new Date().toISOString().split('T')[0], // Today's date as placeholder
        end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
      };

      const testTotalPax = 4;

      // Create real quotation row in database via POST /api/quotations
      const response = await fetch('/api/quotations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phase1_data: testPhase1Data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create quotation');
      }

      const realId = result.id;

      if (onIdUpdate) {
        onIdUpdate(realId);
      }

      if (onComplete) {
        onComplete(realId, testTotalPax, testPhase1Data);
      }

    } catch (error) {
      console.error('Error creating quotation:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Phase 1 - Temporary Stub</h1>
          <p className="text-gray-600 text-sm">Phase 1 Wizard reconstruction in progress</p>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800 font-medium mb-2">
            TEMPORARY PLACEHOLDER
          </p>
          <p className="text-xs text-amber-700">
            This is a minimal stub to unblock the build for testing the hotel pricing fix.
            Full Phase1Wizard reconstruction is pending.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            Test Data (for hotel pricing fix testing):
          </p>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• Total Pax: 4</li>
            <li>• Duration Days: 3</li>
            <li>• Transport Mode: Private</li>
          </ul>
        </div>

        {submitError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-700 font-medium mb-2">
              Error creating quotation
            </p>
            <p className="text-xs text-red-600">{submitError}</p>
            <button
              onClick={handleComplete}
              className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
            >
              Retry
            </button>
          </div>
        )}

        <button
          onClick={handleComplete}
          disabled={isSubmitting}
          className={`w-full px-6 py-3 rounded-xl font-medium text-sm transition-all ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer'
          }`}
        >
          {isSubmitting ? 'Creating quotation...' : 'Continue to Phase 2 (Test Mode)'}
        </button>
      </div>
    </div>
  );
};

export default Phase1WizardComponent;