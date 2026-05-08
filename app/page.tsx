"use client";

import Image from 'next/image';

const activeDestinations = [
  { flag: '🇹🇭', name: 'Thailand' },
  { flag: '🇲🇲', name: 'Myanmar' },
];

const pendingDestinations = [
  'Japan', 'Vietnam', 'Indonesia', 'India', 'South Korea', 'Malaysia'
];

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Jost:wght@300;400;500;600&display=swap');

        :root {
          --gold-bright:  #F0D060;
          --gold-italic:  #E8C84A;
          --gold-ui:      #C8A832;
          --cream:        #F5EED8;
          --cream-dim:    rgba(245,238,216,0.72);
          --btn-border:   rgba(232,200,74,0.40);
          --btn-bg:       rgba(0,0,0,0.25);
          --btn-hover-bg: rgba(232,200,74,0.18);
          --btn-hover-border: rgba(232,200,74,0.9);
          --shadow-text:  0 2px 18px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,1);
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-sans:  'Jost', system-ui, sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080a0c; overflow-x: hidden; }

        .ab-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 28px;
          background: var(--btn-bg);
          border: 1px solid var(--btn-border);
          color: var(--cream);
          border-radius: 4px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.08em;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .ab-btn:hover {
          background: var(--btn-hover-bg);
          border-color: var(--btn-hover-border);
          transform: translateY(-3px);
          color: var(--gold-bright);
          box-shadow: 0 8px 25px rgba(0,0,0,0.4);
        }

        .ab-btn-blank {
          padding: 14px 28px;
          background: rgba(255,255,255,0.03);
          border: 1px dashed rgba(245,238,216,0.15);
          color: rgba(245,238,216,0.25);
          border-radius: 4px;
          font-family: var(--font-sans);
          font-size: 13px;
          letter-spacing: 0.08em;
          min-width: 140px;
          text-align: center;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .anim-hero  { animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .anim-btns  { animation: fadeUp 1.2s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>

      <main style={{
        backgroundColor: '#0a0c10',
        color: 'var(--cream)',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* ── Background Image ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/AB_Web_Background.jpg"
            alt="Asian Skyline Background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 50%' }}
            priority
          />
          {/* Elegant Overlay Gradients */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at center, rgba(10,12,16,0.2) 0%, rgba(10,12,16,0.8) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,12,16,0.4) 0%, transparent 30%, rgba(10,12,16,0.9) 100%)',
          }} />
        </div>

        {/* ── Logo Section ── */}
        <header style={{ position: 'absolute', top: '40px', zIndex: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--gold-bright)',
              textShadow: 'var(--shadow-text)',
            }}>
              Asia<span style={{ color: 'var(--cream)', fontWeight: 300 }}>Buddy</span>
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold-ui)', marginTop: '8px', opacity: 0.6 }} />
          </div>
        </header>

        {/* ── Main Content ── */}
        <section className="anim-hero" style={{
          position: 'relative', zIndex: 10,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 24px',
          marginTop: '60px'
        }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(48px, 8vw, 84px)',
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--gold-bright)',
            marginBottom: '10px',
            textShadow: 'var(--shadow-text)',
          }}>
            Unveil the Soul of Asia
          </h1>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 4vw, 42px)',
            fontStyle: 'italic',
            color: 'var(--gold-italic)',
            marginBottom: '40px',
            textShadow: 'var(--shadow-text)',
            opacity: 0.9,
          }}>
            Explore the Continent Like a Local
          </p>

          <div style={{ 
            fontSize: '11px', 
            fontWeight: 600, 
            letterSpacing: '0.4em', 
            textTransform: 'uppercase', 
            color: 'var(--gold-ui)',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px'
          }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--gold-ui)' }} />
            Select Your Journey
            <span style={{ width: '20px', height: '1px', background: 'var(--gold-ui)' }} />
          </div>
        </section>

        {/* ── Buttons Section ── */}
        <section className="anim-btns" style={{
          position: 'relative', zIndex: 10,
          width: '100%',
          maxWidth: '1000px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          padding: '0 40px 60px'
        }}>
          {/* Active Buttons */}
          {activeDestinations.map(({ flag, name }) => (
            <button key={name} className="ab-btn">
              <span style={{ fontSize: '22px' }}>{flag}</span>
              <span>{name}</span>
            </button>
          ))}

          {/* Placeholder Buttons */}
          {pendingDestinations.map((name) => (
            <div key={name} className="ab-btn-blank">
              {name}
            </div>
          ))}
        </section>

        {/* ── Footer ── */}
        <footer style={{
          position: 'absolute',
          bottom: '30px',
          zIndex: 10,
          textAlign: 'center',
          width: '100%',
          opacity: 0.5
        }}>
          <p style={{ 
            fontSize: '10px', 
            letterSpacing: '0.25em', 
            textTransform: 'uppercase',
            fontFamily: 'var(--font-sans)' 
          }}>
            © 2026 AsiaBuddy Travel · Tailored Excellence
          </p>
        </footer>
      </main>
    </>
  );
}