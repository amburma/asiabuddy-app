'use client';

import { useState } from 'react';

interface LandingScreenProps {
  onNewQuotation: () => void;
  onFollowUpQuotation: (quotation: any) => void;
}

export default function LandingScreen({ onNewQuotation, onFollowUpQuotation }: LandingScreenProps) {
  const [tourCode, setTourCode] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!tourCode.trim()) {
      setSearchError('Please enter a Tour Code');
      return;
    }

    setIsSearching(true);
    setSearchError('');

    try {
      const response = await fetch(`/api/quotations?tour_code=${encodeURIComponent(tourCode.trim())}`);
      
      if (response.status === 404) {
        setSearchError('Tour Code not found');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setSearchError(errorData.error || 'Failed to search quotation');
        return;
      }

      const data = await response.json();
      // Pass the full quotation object to parent
      onFollowUpQuotation(data);
    } catch (error) {
      setSearchError('Failed to search quotation');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tour Quotation</h1>
          <p className="text-gray-600">Create new quotations or follow up on existing ones</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onNewQuotation}
            className="p-6 rounded-xl border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 transition-all text-center"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="font-semibold text-emerald-700">New Quotation</div>
            <div className="text-xs text-emerald-600 mt-1">Start from scratch</div>
          </button>

          <button
            onClick={() => {}}
            className="p-6 rounded-xl border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 transition-all text-center"
          >
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-semibold text-blue-700">Follow-up Quotation</div>
            <div className="text-xs text-blue-600 mt-1">Search by Tour Code</div>
          </button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tour Code
              </label>
              <input
                type="text"
                value={tourCode}
                onChange={(e) => {
                  setTourCode(e.target.value);
                  setSearchError('');
                }}
                onKeyPress={handleKeyPress}
                placeholder="e.g., ABT-TPQ-310826"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>

            {searchError && (
              <div className="text-sm text-red-600 font-medium">
                {searchError}
              </div>
            )}

            <button
              onClick={handleSearch}
              disabled={isSearching || !tourCode.trim()}
              className={`w-full px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                isSearching || !tourCode.trim()
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
              }`}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}