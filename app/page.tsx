"use client";

import Image from 'next/image';

const destinations = [
  { flag: '🇹🇭', name: 'Thailand',    code: 'TH' },
  { flag: '🇲🇲', name: 'Myanmar',     code: 'MM' },
  { flag: '🇯🇵', name: 'Japan',        code: 'JP' },
  { flag: '🇻🇳', name: 'Vietnam',      code: 'VN' },
  { flag: '🇮🇩', name: 'Indonesia',    code: 'ID' },
  { flag: '🇮🇳', name: 'India',        code: 'IN' },
  { flag: '🇰🇷', name: 'South Korea', code: 'KR' },
  { flag: '🇲🇾', name: 'Malaysia',     code: 'MY' },
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
          --btn-border:   rgba(232,200,74,0.30);
          --btn-bg:       rgba(255,255,255,0.06);
          --btn-hover-bg: rgba(232,200,74,0.12);
          --btn-hover-border: rgba(232,200,74,0.65);
          --shadow-text:  0 2px 18px rgba(0,0,0,0.75), 0 1px 4px rgba(0,0,0,0.9);
          --shadow-light: 0 1px 10px rgba(0,0,0,0.6);
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-sans:  'Jost', system-ui, sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0c10; overflow-x: hidden; }

        .ab-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 26px;
          background: var(--btn-bg);
          border: 1px solid var(--btn-border);
          color: var(--cream);
          border-radius: 3px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.06em;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        .ab-btn:hover {
          background: var(--btn-hover-bg);
          border-color: var(--btn-hover-border);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .ab-nav-link {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,238,216,0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ab-nav-link:hover { color: var(--gold-bright); }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .anim-nav   { animation: fadeDown 0.7s ease both; }
        .anim-copy  { animation: fadeUp  0.9s 0.25s ease both; }
        .anim-btns  { animation: fadeUp  0.9s 0.50s ease both; }

        .ornament { animation: pulse 3.5s ease-in-out infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
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
        fontFamily: 'var(--font-sans)',
      }}>

        {/* ── Background Image ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/AB_Web_Background.jpg"
            alt="Asian landmark skyline background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
            priority
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,10,8,0.25) 0%, rgba(8,10,8,0.42) 35%, rgba(8,10,8,0.78) 68%, rgba(8,10,8,0.97) 100%)',
          }} />
        </div>

        {/* ── Navbar ── */}
        <nav className="anim-nav" style={{
          position: 'relative', zIndex: 20,
          width: '100%', maxWidth: '1200px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '28px 48px',
        }}>
          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Image 
              src="/AsiaBuddy_Logo.png" 
              alt="AsiaBuddy Logo" 
              width={40} 
              height={40} 
              style={{ objectFit: 'contain' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: 'var(--gold-bright)',
                textShadow: 'var(--shadow-light)',
              }}>Asia<span style={{ color: 'var(--cream)', fontWeight: 300 }}>Buddy</span></span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold-ui)',
                marginTop: '3px',
              }}>Travel Guide</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            {['Destinations', 'Experiences', 'Visas', 'About'].map(item => (
              <a key={item} href="#" className="ab-nav-link">{item}</a>
            ))}
            <button style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '9px 20px',
              border: '1px solid var(--gold-ui)',
              background: 'transparent',
              color: 'var(--gold-bright)',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>Plan My Trip</button>
          </div>
        </nav>

        {/* ── Hero Content ── */}
        <div className="anim-copy" style={{
          position: 'relative', zIndex: 10,
          textAlign: 'center',
          maxWidth: '860px',
          padding: '60px 32px 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.38em',
            textTransform: 'uppercase', color: 'var(--gold-ui)',
            marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ width: 32, height: 1, background: 'var(--gold-ui)', opacity: 0.5 }} />
            Your Gateway to Asia
            <span style={{ width: 32, height: 1, background: 'var(--gold-ui)', opacity: 0.5 }} />
          </p>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: 'var(--gold-bright)',
            marginBottom: '12px',
            textShadow: 'var(--shadow-text)',
          }}>
            Unveil the Soul of Asia
          </h1>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 3.5vw, 38px)',
            fontStyle: 'italic',
            color: 'var(--gold-italic)',
            marginBottom: '32px',
            textShadow: 'var(--shadow-text)',
          }}>
            Explore Asia Like a Local
          </p>

          <div style={{ width: 60, height: 1, background: 'var(--gold-ui)', opacity: 0.4, marginBottom: '28px' }} />

          <p style={{
            fontSize: '16px', fontWeight: 300, color: 'var(--cream-dim)',
            lineHeight: 1.8, maxWidth: '640px', marginBottom: '55px',
          }}>
            One hub. Trusted guides, visa support, travel plans, and on-ground services —
            tailored for every destination across the continent.
          </p>
        </div>

        {/* ── Destinations ── */}
        <div className="anim-btns" style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '900px',
          padding: '0 32px 100px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: 'var(--gold-ui)', marginBottom: '30px',
          }}>
            ✦ Select Your Destination ✦
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
            {destinations.map(({ flag, name }) => (
              <button key={name} className="ab-btn">
                <span style={{ fontSize: '20px' }}>{flag}</span>
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer style={{
          position: 'relative', zIndex: 10,
          width: '100%',
          borderTop: '1px solid rgba(200,168,50,0.15)',
          padding: '30px 32px 40px',
          textAlign: 'center',
        }}>
          <div className="ornament" style={{ marginBottom: '15px' }}>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#C8A832"/>
            </svg>
          </div>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,238,216,0.3)' }}>
            <span style={{ color: 'rgba(200,168,50,0.6)', fontWeight: 600 }}>AsiaBuddy</span> &nbsp;·&nbsp; Authentic Asian Journeys &nbsp;·&nbsp; © 2026
          </p>
        </footer>
      </main>
    </>
  );
}