'use client';

import { useState, useEffect } from 'react';
import Phase1Wizard, { Phase1WizardProps } from '@/components/admin/thquo/Phase1Wizard';
import Phase2Wizard, { Phase2WizardProps } from '@/components/admin/thquo/Phase2Wizard';
import CostInputPanel, { CostInputPanelProps } from '@/components/admin/thquo/CostInputPanel';

export default function ThquoPage() {
  const [currentPhase, setCurrentPhase] = useState<'phase1' | 'phase2' | 'cost_input'>('phase1');
  const [quotationId, setQuotationId] = useState<string | null>(null);
  
  // TEMPORARY TEST SCAFFOLD — remove after rehydration verification
  useEffect(() => {
    const testId = new URLSearchParams(window.location.search).get('testQuotationId');
    if (testId) setQuotationId(testId);
  }, []);
  
  const [totalPax, setTotalPax] = useState<number | null>(null);
  const [phase1Data, setPhase1Data] = useState<{ duration_days?: number; transport_mode?: 'private' | 'public' }>({});
  const [phase2Data, setPhase2Data] = useState<any>(null);

  const handleIdUpdate = (newId: string) => {
    setQuotationId(newId);
  };

  const handlePhase1Complete = (id: string, totalPaxValue: number, phase1Data?: { duration_days?: number; transport_mode?: 'private' | 'public' }) => {
    setQuotationId(id);
    setTotalPax(totalPaxValue);
    setPhase1Data(phase1Data || {});
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
        <Phase1Wizard onComplete={handlePhase1Complete} onIdUpdate={handleIdUpdate} />
      ) : currentPhase === 'phase2' ? (
        <Phase2Wizard 
          quotationId={quotationId || undefined} 
          totalPax={totalPax || undefined}
          onBack={handleBackToPhase1}
          onComplete={handlePhase2Complete}
          onIdUpdate={handleIdUpdate}
        />
      ) : currentPhase === 'cost_input' ? (
        <CostInputPanel
          quotationId={quotationId || ''}
          duration_days={phase1Data.duration_days}
          transport_mode={phase1Data.transport_mode}
          phase2Data={phase2Data ? {
            twin_rooms: phase2Data.twin_rooms,
            double_rooms: phase2Data.double_rooms,
            extra_beds: phase2Data.extra_beds,
          } : undefined}
          hotelLevel={phase2Data?.hotel_level}
          onBack={() => setCurrentPhase('phase2')}
          onIdUpdate={handleIdUpdate}
        />
      ) : null}
    </div>
  );
}