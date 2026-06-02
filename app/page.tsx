import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center px-6 overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/AB_Web_Background.jpg"
          alt="AsiaBuddy Background"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-amber-900/20" />
      </div>

      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent z-20" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto py-20">

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/Logo.png"
            alt="AsiaBuddy Logo"
            width={90}
            height={90}
            className="drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]"
          />
        </div>

        {/* Eyebrow label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-amber-400/60" />
          <p className="text-[11px] uppercase tracking-[0.5em] font-bold text-amber-400">
            Your Gateway to Asia
          </p>
          <div className="h-px w-12 bg-amber-400/60" />
        </div>

        {/* Main Headline */}
        <h1
          className="text-5xl md:text-7xl font-black text-center leading-[1.1] mb-6 tracking-tight"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
        >
          <span className="text-white">Unveil the </span>
          <span className="text-amber-400">Soul</span>
          <br />
          <span className="text-white">of </span>
          <span className="text-amber-400">Asia</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-white/70 font-light text-center max-w-lg leading-relaxed mb-14">
          Explore Asia Like a Local —{" "}
          <span className="text-white/90">
            trusted guides, visa support & premium on-ground services.
          </span>
        </p>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">

          {/* Thailand Card */}
          <Link href="/thailand" className="group block">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl p-7 transition-all duration-500 hover:border-amber-400/50 hover:bg-white/15 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-400/10 to-transparent rounded-2xl" />
              
              {/* Flag + Country */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300 inline-block">
                  🇹🇭
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white leading-none mb-1">
                    Thailand
                  </h2>
                  <p className="text-xs text-amber-400/80 font-medium uppercase tracking-widest">
                    Land of Smiles
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-4" />

              {/* Description */}
              <p className="text-sm text-white/55 leading-relaxed mb-5">
                Temples, beaches, street food & vibrant culture await you.
              </p>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                  Explore Guide
                </span>
                <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center group-hover:bg-amber-400 transition-all duration-300">
                  <span className="text-amber-400 group-hover:text-black text-sm font-bold transition-colors">→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Shwedagon Card */}
          <Link href="/shwedagon" className="group block">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl p-7 transition-all duration-500 hover:border-amber-400/50 hover:bg-white/15 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-400/10 to-transparent rounded-2xl" />

              {/* Flag + Country */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300 inline-block">
                  🇲🇲
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white leading-none mb-1">
                    Shwedagon
                  </h2>
                  <p className="text-xs text-amber-400/80 font-medium uppercase tracking-widest">
                    The Golden Wonder
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-4" />

              {/* Description */}
              <p className="text-sm text-white/55 leading-relaxed mb-5">
                Sacred pagoda, spiritual rituals & Myanmar's golden heritage.
              </p>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                  Explore Guide
                </span>
                <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center group-hover:bg-amber-400 transition-all duration-300">
                  <span className="text-amber-400 group-hover:text-black text-sm font-bold transition-colors">→</span>
                </div>
              </div>
            </div>
          </Link>
          */}

        </div>

        {/* Bottom select label */}
        <p className="mt-8 text-[11px] uppercase tracking-[0.3em] font-bold text-white/30">
          Select Your Destination
        </p>

      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 z-10 text-center">
        <p className="text-[10px] text-white/25 uppercase tracking-[0.3em] font-bold">
          AsiaBuddy Services · asiabuddy.app
        </p>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent z-20" />

    </main>
  );
}