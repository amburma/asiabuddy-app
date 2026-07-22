'use client';

import { useEffect, useRef, useState } from 'react';
import { THAILAND_CITIES, normalizeCityName } from '../../../src/config/thailandCities';

interface AgodaSearchWidgetProps {
  cityName?: string;
}

export default function AgodaSearchWidget({ cityName = "Bangkok" }: AgodaSearchWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!containerRef.current) {
      return;
    }

    // Clear container before creating new elements to prevent duplicates
    containerRef.current.innerHTML = '';

    // Debug: Check for any existing Agoda-related window state
    console.log('[Agoda Debug] Window state before script load:');
    Object.keys(window).forEach(key => {
      if (key.toLowerCase().includes('adgshp') || key.toLowerCase().includes('sherpa') || key.toLowerCase().includes('agoda')) {
        console.log(`[Agoda Debug] Found window.${key}:`, (window as any)[key]);
      }
    });

    // Normalize city name to handle language variants (e.g., Burmese "ချင်းမိုင်" -> "Chiang Mai")
    const normalizedCityName = normalizeCityName(cityName);
    // Lookup Agoda city ID from config
    const cityData = THAILAND_CITIES[normalizedCityName] || THAILAND_CITIES['Bangkok'];
    const agodaCityId = cityData.agodaCityId;

    // Generate unique widget id/name/crt per city to bypass Agoda's internal caching
    // Compute timestamp ONCE to ensure id consistency across the entire effect run
    const timestamp = Date.now();
    const uniqueId = `adgshp-1464895098-${agodaCityId}-${timestamp}`;
    const uniqueCrt = `${timestamp}`;

    const targetDiv = document.createElement('div');
    targetDiv.id = uniqueId;
    containerRef.current.appendChild(targetDiv);

    const script = document.createElement('script');
    // Add cache-busting query param to force script re-execution (use same timestamp)
    script.src = `//cdn0.agoda.net/images/sherpa/js/sherpa_init1_08.min.js?_t=${timestamp}`;
    script.async = true;

    script.onload = () => {
      // Skip if this effect run was cancelled (cleanup ran before script loaded)
      if (cancelled) {
        console.log('[Agoda Debug] Script load cancelled, skipping initialization');
        return;
      }

      try {
        const stg: any = {};
        stg.crt = uniqueCrt;
        stg.version = "1.04";
        stg.id = stg.name = uniqueId;
        stg.width = "320px";
        stg.height = "420px";
        stg.ReferenceKey = "e1IOCeHvP7CUMNuPpzIPqA==";
        stg.Layout = "SquareCalendar";
        stg.Language = "en-us";
        stg.Cid = "1968300";
        stg.City = agodaCityId.toString();
        stg.DestinationName = `${normalizedCityName}, Thailand`;
        stg.OverideConf = false;

        if (typeof (window as any).AgdSherpa === 'function') {
          console.log('Agoda widget init config:', stg);
          new (window as any).AgdSherpa(stg).initialize();
          setScriptLoaded(true);

          // Debug: Inspect DOM state immediately after widget init
          const debugDestinationInput = () => {
            if (!containerRef.current) {
              console.log('[Agoda Debug] containerRef.current is null');
              return;
            }

            console.log('[Agoda Debug] Full container innerHTML:', containerRef.current.innerHTML);

            // Search for input elements in the container
            const allInputs = containerRef.current.querySelectorAll('input');
            console.log(`[Agoda Debug] Found ${allInputs.length} input elements in container`);

            allInputs.forEach((input, index) => {
              console.log(`[Agoda Debug] Input ${index}:`, {
                value: input.value,
                placeholder: input.placeholder,
                type: input.type,
                name: input.name,
                id: input.id,
                className: input.className,
                outerHTML: input.outerHTML
              });
            });

            // Also search for any text/spans that might contain the destination text
            const allSpans = containerRef.current.querySelectorAll('span');
            console.log(`[Agoda Debug] Found ${allSpans.length} span elements in container`);
            allSpans.forEach((span, index) => {
              if (span.textContent && span.textContent.includes('Thailand')) {
                console.log(`[Agoda Debug] Span ${index} contains Thailand:`, {
                  textContent: span.textContent,
                  className: span.className,
                  outerHTML: span.outerHTML
                });
              }
            });
          };

          // Run debug immediately after init
          setTimeout(debugDestinationInput, 100);

          // Run debug again after 1500ms to catch async re-renders
          setTimeout(debugDestinationInput, 1500);
        } else {
          setScriptError(true);
        }
      } catch (e) {
        console.error('Agoda widget init failed:', e);
        setScriptError(true);
      }
    };

    script.onerror = () => setScriptError(true);
    containerRef.current.appendChild(script);

    return () => {
      cancelled = true;
      if (containerRef.current) {
        // Clear all content to ensure complete cleanup
        containerRef.current.innerHTML = '';
      }
    };
  }, [cityName]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-serif text-lg font-bold text-gray-900">Search Agoda</h3>
      </div>

      {/* Widget Container */}
      <div className="p-4 flex justify-center items-center min-h-[440px]">
        {scriptError ? (
          <div className="text-center">
            <p className="text-gray-600 mb-3">Widget failed to load</p>
            <a
              href="https://www.agoda.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#C9A84C] text-white px-4 py-2 rounded font-medium hover:bg-opacity-90 transition-colors"
            >
              Visit Agoda
            </a>
          </div>
        ) : (
          <div ref={containerRef} className="w-full flex justify-center" />
        )}
      </div>
    </div>
  );
}
