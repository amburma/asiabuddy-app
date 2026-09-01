'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Phase1Wizard, { Phase1WizardProps, Phase1Data } from '@/components/admin/thquo/Phase1Wizard';
import Phase2Wizard, { Phase2WizardProps } from '@/components/admin/thquo/Phase2Wizard';
import CostInputPanel, { CostInputPanelProps } from '@/components/admin/thquo/CostInputPanel';

export default function ThquoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasInitializedFromUrl = useRef(false);
  
  const [currentPhase, setCurrentPhase] = useState<'phase1' | 'phase2' | 'cost_input'>('phase1');
  const [quotationId, setQuotationId] = useState<string | null>(null);
  
  // TEMPORARY TEST SCAFFOLD — remove after rehydration verification
  useEffect(() => {
    const testId = new URLSearchParams(window.location.search).get('testQuotationId');
    if (testId) {
      setQuotationId(testId);
      setCurrentPhase('cost_input'); // skip Phase1/Phase2 stub flow entirely for rehydration testing
    }
  }, []);
  
  // URL sync: initialize from URL on first run, then sync state changes to URL
  useEffect(() => {
    if (!hasInitializedFromUrl.current) {
      // First run: read from URL (or scaffold, which already ran and may
      // have set state) — do NOT write to the URL in this same pass.
      const urlId = searchParams.get('id');
      const urlPhase = searchParams.get('phase') as 'phase1' | 'phase2' | 'cost_input' | null;
      if (!quotationId && urlId) setQuotationId(urlId);
      if (currentPhase === 'phase1' && urlPhase && ['phase1','phase2','cost_input'].includes(urlPhase)) {
        setCurrentPhase(urlPhase);
      }
      hasInitializedFromUrl.current = true;
      return; // skip writing to URL this pass — let the next effect run (after
              // the above setState calls commit) do the write, with fresh values.
    }

    // Subsequent runs only: sync current state to the URL.
    const params = new URLSearchParams(searchParams.toString());
    quotationId ? params.set('id', quotationId) : params.delete('id');
    currentPhase ? params.set('phase', currentPhase) : params.delete('phase');
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(newUrl);
  }, [quotationId, currentPhase, searchParams, router]);
  
  const [totalPax, setTotalPax] = useState<number | null>(null);
  const [phase1Data, setPhase1Data] = useState<Partial<Phase1Data>>({});
  const [phase2Data, setPhase2Data] = useState<any>(null);

  const handleIdUpdate = (newId: string) => {
    setQuotationId(newId);
  };

  const handlePhase1Complete = (id: string, totalPaxValue: number, phase1Data: Phase1Data) => {
    setQuotationId(id);
    setTotalPax(totalPaxValue);
    setPhase1Data(phase1Data);
    setCurrentPhase('phase2');
  };

  const handleBackToPhase1 = () => {
    setCurrentPhase('phase1');
  };

  const handlePhase2Complete = (id: string, phase2DataValue?: any) => {
    setQuotationId(id); // Update with the new revision ID
    setPhase2Data(phase2DataValue);
    setCurrentPhase('cost_input');
  };

  return (
    <div>
      {currentPhase === 'phase1' ? (
        <Phase1Wizard
          quotationId={quotationId || undefined}
          onComplete={handlePhase1Complete}
          onIdUpdate={handleIdUpdate}
          initialData={phase1Data}
        />
      ) : currentPhase === 'phase2' ? (
        <Phase2Wizard
          quotationId={quotationId || undefined}
          totalPax={totalPax || undefined}
          startDate={phase1Data.start_date}
          endDate={phase1Data.end_date}
          hotelLevel={phase1Data.hotel_level}
          onBack={handleBackToPhase1}
          onComplete={handlePhase2Complete}
          onIdUpdate={handleIdUpdate}
        />
      ) : currentPhase === 'cost_input' ? (
        <CostInputPanel
          quotationId={quotationId || ''}
          duration_days={phase1Data.duration_days}
          transport_mode={phase1Data.transport_mode ?? undefined}
          phase2Data={phase2Data ? {
            twin_rooms: phase2Data.twin_rooms,
            double_rooms: phase2Data.double_rooms,
            extra_beds: phase2Data.extra_beds,
            currency: phase2Data.currency,
          } : undefined}
          hotelLevel={phase2Data?.hotel_level}
          onBack={() => setCurrentPhase('phase2')}
          onIdUpdate={handleIdUpdate}
        />
      ) : null}
    </div>
  );
}