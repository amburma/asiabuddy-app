'use client';

import { useState } from 'react';
import Phase1Wizard, { Phase1WizardProps } from '@/components/admin/thquo/Phase1Wizard';
import Phase2Wizard, { Phase2WizardProps } from '@/components/admin/thquo/Phase2Wizard';
import CostInputPanel, { CostInputPanelProps } from '@/components/admin/thquo/CostInputPanel';

export default function ThquoPage() {
  const [currentPhase, setCurrentPhase] = useState<'phase1' | 'phase2' | 'cost_input'>('phase1');
  const [quotationId, setQuotationId] = useState<string | null>(null);
  const [totalPax, setTotalPax] = useState<number | null>(null);
  const [phase1Data, setPhase1Data] = useState<{ duration_days?: number; transport_mode?: 'private' | 'public' }>({});

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

  const handlePhase2Complete = (id: string) => {
    setQuotationId(id); // Update with the new revision ID
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
          onBack={() => setCurrentPhase('phase2')}
          onIdUpdate={handleIdUpdate}
        />
      ) : null}
    </div>
  );
}