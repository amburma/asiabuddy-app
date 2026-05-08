"use client"; // ဒါလေး ထည့်ပေးရပါမယ်

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0c10] font-sans text-[#f4e8c1]">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/AB_Web_Background.jpg"
          alt="AsiaBuddy Background"
          fill
          className="object-cover object-bottom"
          priority
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/20 via-[#0a0c10]/40 via-[#0a0c10]/85 to-[#0a0c10]" />
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[960px] px-6 mt-5 w-full">
        
        {/* Logo */}
        <div className="mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <Image src="/AsiaBuddy_Logo.png" alt="AsiaBuddy Logo" width={120} height={120} className="mx-auto opacity-90" />
        </div>

        <p className="text-[13px] font-medium tracking-[0.4em] uppercase text-[#D4AF37] mb-[15px] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-forwards opacity-0">
          Your Gateway to Asia
        </p>

        <h1 className="font-serif text-[clamp(34px,6vw,62px)] leading-[1.1] mb-5 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 fill-mode-forwards opacity-0">
          Unveil the Soul of Asia<br />
          <span className="block italic text-[#D4AF37] text-[0.65em] mt-2 tracking-[0.05em]">Explore Asia Like a Local</span>
        </h1>

        <p className="text-[16px] font-light text-[#f4e8c1]/80 max-w-[680px] leading-[1.7] mb-[55px] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-700 fill-mode-forwards opacity-0">
          One hub. Trusted guides, visa support, travel plans, and on-ground services—tailored for every destination across the continent.
        </p>

        <div className="w-full animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-1000 fill-mode-forwards opacity-0">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#D4AF37]/70 mb-[30px]">
            Select Your Destination
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/thailand">
              <button className="flex items-center gap-[10px] px-7 py-[14px] bg-white/5 border border-[#D4AF37]/25 rounded hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
                <span className="text-[20px]">🇹🇭</span> Thailand
              </button>
            </Link>

            <Link href="/myanmar">
              <button className="flex items-center gap-[10px] px-7 py-[14px] bg-white/5 border border-[#D4AF37]/25 rounded hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
                <span className="text-[20px]">🇲🇲</span> Myanmar
              </button>
            </Link>

            {/* Blank Buttons */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="min-w-[130px] min-h-[52px] bg-white/5 border border-[#D4AF37]/10 opacity-30 rounded backdrop-blur-md" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}