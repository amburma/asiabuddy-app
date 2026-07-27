'use client';

import { useState } from 'react';
import { findProviderByUrl, findAllProvidersByUrl, AFFILIATE_PROVIDERS } from '../../lib/linkConverter/providers';

export default function LinkConverterPage() {
  const [inputUrl, setInputUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [selectedProviderId, setSelectedProviderId] = useState<string>('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setError('');
    setConvertedUrl('');
    setCopied(false);

    if (!inputUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    try {
      new URL(inputUrl);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    const allMatches = findAllProvidersByUrl(inputUrl);
    
    if (allMatches.length === 0) {
      setError('Unsupported provider or link format. This tool supports full brand URLs (e.g. aviasales.com/...) for: Agoda, Trip.com, Klook, GetYourGuide, Kiwitaxi, and Aviasales. Already-shortened links (e.g. tpo.lu) are not supported — please use the original full URL.');
      return;
    }

    // For Klook, use selected provider if available, otherwise default to first match
    const provider = findProviderByUrl(inputUrl, selectedProviderId || undefined);
    
    if (!provider) {
      setError('No matching provider found');
      return;
    }

    if (provider.mode === 'manual') {
      // Manual mode - show portal link instead of converting
      setConvertedUrl(provider.portalUrl || '');
    } else if (provider.convert) {
      // Auto mode - convert the URL
      setConvertedUrl(provider.convert(inputUrl));
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const allMatches = findAllProvidersByUrl(inputUrl);
  const currentProvider = selectedProviderId 
    ? AFFILIATE_PROVIDERS.find(p => p.id === selectedProviderId)
    : allMatches[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Link Converter</h1>
          <p className="text-gray-600 mb-6">
            Convert raw brand URLs into affiliate-tracking links for Agoda, Trip.com, Klook, GetYourGuide, Kiwitaxi, and Aviasales.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
                Paste URL
              </label>
              <input
                id="url-input"
                type="text"
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  setError('');
                  setConvertedUrl('');
                  setSelectedProviderId('');
                }}
                placeholder="https://www.agoda.com/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Klook provider toggle */}
            {allMatches.length > 1 && allMatches.some(p => p.id.startsWith('klook')) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Klook Account
                </label>
                <div className="flex gap-4">
                  {allMatches.filter(p => p.id.startsWith('klook')).map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => setSelectedProviderId(provider.id)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedProviderId === provider.id || (!selectedProviderId && provider.id === 'klook')
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {provider.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleConvert}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Convert
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {convertedUrl && currentProvider && (
              <div className="space-y-3">
                {currentProvider.mode === 'manual' ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">{currentProvider.name}</h3>
                    <p className="text-yellow-700 text-sm mb-3">
                      {currentProvider.instructions?.en}
                    </p>
                    <p className="text-yellow-700 text-sm mb-4">
                      {currentProvider.instructions?.mm}
                    </p>
                    <a
                      href={currentProvider.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Open Partner Portal
                    </a>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">
                      Converted Link ({currentProvider.name})
                    </h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={convertedUrl}
                        readOnly
                        className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-lg text-sm text-green-800"
                      />
                      <button
                        onClick={handleCopy}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Supported Providers</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div><strong>Hotels:</strong> Agoda, Trip.com</div>
              <div><strong>Activities:</strong> Klook, GetYourGuide</div>
              <div><strong>Transfers:</strong> Kiwitaxi</div>
              <div><strong>Flights:</strong> Aviasales</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
