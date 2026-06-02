'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Props {
  href: string;
  label?: string;
}

export default function FloatingBackButton({ href, label = 'Back' }: Props) {
  return (
    <Link
      href={href}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 group"
      style={{ background: '#2D4A3E', color: '#D4AF37' }}
    >
      <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold hidden sm:block">
        {label}
      </span>
    </Link>
  );
}