import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { ThaiLanguage } from '@/types/country';
import { UI_TRANSLATIONS } from '@/lib/i18n';

interface Props {
  language: ThaiLanguage;
}

export default function CurrencyConverter({ language }: Props) {
  const [val1, setVal1] = useState('100');
  const [val2, setVal2] = useState('');
  const [curr1, setCurr1] = useState('USD');
  const [curr2, setCurr2] = useState('THB');

  const rates: Record<string, number> = {
    USD: 36.75,
    EUR: 39.38,
    GBP: 45.89,
    MMK: 0.0175,
    THB: 1.0
  };

  const calculate = (amount: string, from: string, to: string) => {
    const numeric = parseFloat(amount);
    if (isNaN(numeric)) return '';
    const result = (numeric * rates[from]) / rates[to];
    return result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '');
  };

  const handleVal1Change = (v: string) => {
    setVal1(v);
    setVal2(calculate(v, curr1, curr2));
  };

  const handleCurr1Change = (c: string) => {
    setCurr1(c);
    setVal2(calculate(val1, c, curr2));
  };

  const handleVal2Change = (v: string) => {
    setVal2(v);
    setVal1(calculate(v, curr2, curr1));
  };

  const handleCurr2Change = (c: string) => {
    setCurr2(c);
    setVal1(calculate(val2, c, curr1));
  };

  if (val2 === '' && val1 !== '') {
    setVal2(calculate(val1, curr1, curr2));
  }

  const uiT = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.EN;
  const enT = UI_TRANSLATIONS.EN;
  const t = uiT.tools || enT.tools;

  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-1">
        <div className="flex gap-2">
          <select 
            value={curr1}
            onChange={(e) => handleCurr1Change(e.target.value)}
            className="w-16 bg-sacred-bg border border-gray-100 rounded-lg p-1.5 text-[9px] font-bold focus:outline-none focus:border-gold-soft cursor-pointer appearance-none"
          >
            {Object.keys(rates).sort().map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
          <input 
            type="number"
            step="any"
            inputMode="decimal"
            value={val1} 
            onChange={(e) => handleVal1Change(e.target.value)}
            onFocus={(e) => e.target.select()}
            className="flex-1 bg-sacred-bg border border-gray-100 rounded-lg p-1.5 text-xs focus:outline-none focus:border-gold-soft font-medium"
          />
        </div>
      </div>

      <div className="flex justify-center -my-2 relative z-10 text-gray-300">
        <Calculator size={10} className="rotate-90" />
      </div>

      <div className="space-y-1">
        <div className="flex gap-2">
          <select 
            value={curr2}
            onChange={(e) => handleCurr2Change(e.target.value)}
            className="w-16 bg-sacred-bg border border-gray-100 rounded-lg p-1.5 text-[9px] font-bold focus:outline-none focus:border-gold-soft cursor-pointer appearance-none"
          >
            {Object.keys(rates).sort().map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
          <input 
            type="number"
            step="any"
            inputMode="decimal"
            value={val2} 
            onChange={(e) => handleVal2Change(e.target.value)}
            onFocus={(e) => e.target.select()}
            className="flex-1 bg-sacred-bg border border-gray-100 rounded-lg p-1.5 text-xs focus:outline-none focus:border-gold-soft font-medium"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
        <p className="text-[9px] uppercase tracking-tighter text-gray-500 font-bold">
          1 {curr1} = {calculate('1', curr1, curr2)} {curr2}
        </p>
      </div>
    </div>
  );
}
