"use client"; // Client-side animation (framer-motion) အတွက် လိုအပ်သည်

import { motion } from 'framer-motion'; // motion/react အစား framer-motion ကို သုံးပါ
import { ShieldAlert, Phone } from 'lucide-react';

interface Props {
  title: string;
  policeLabel: string;
  assistanceLabel: string;
}

export default function EmergencyBanner({ title, policeLabel, assistanceLabel }: Props) {
  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="bg-red-600 text-white shadow-lg overflow-hidden" // အရောင်ကို red-600 သို့ အနည်းငယ်မြှင့်ထားသည်
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldAlert size={18} className="shrink-0 text-red-100" />
          <p className="text-[10px] font-bold uppercase tracking-widest">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-serif">
            <span className="opacity-80 tracking-tight">{policeLabel}:</span>
            <a 
              href="tel:1155" 
              className="font-bold underline flex items-center gap-1 hover:text-red-100 transition-colors"
            >
              <Phone size={12} />
              1155
            </a>
          </div>
          <div className="hidden md:block w-[1px] h-4 bg-white/20" />
          <p className="hidden md:block text-[10px] uppercase font-medium opacity-80">{assistanceLabel}</p>
        </div>
      </div>
    </motion.div>
  );
}