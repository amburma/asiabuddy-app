"use client";

import React from "react";

interface FooterProps {
  langCode: string;
}

export default function Footer({ langCode }: FooterProps) {
  return (
    <div className="w-full text-center py-6 text-[10px] font-bold text-gold-soft/60 uppercase tracking-widest border-t border-gold-soft/5 mt-8 select-none">
      {langCode === "my" 
        ? "✦ အာရှဗဒ္ဒီ ခရီးသွားလမ်းညွှန် — ရွှေတိဂုံစေတီတော်မြတ်ကြီး ပရီမီယံဗားရှင်း ✦" 
        : "✦ AsiaBuddy Sacred Travel Guide — Shwedagon Pagoda Premium Edition ✦"}
    </div>
  );
}