"use client";

import Image from 'next/image';

export default function Home() {
  return (
    <main style={{ 
      backgroundColor: '#0a0c10', 
      color: '#f4e8c1', 
      minHeight: '100vh', 
      width: '100%', 
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      margin: 0,
      padding: 0,
      fontFamily: 'sans-serif'
    }}>
      
      {/* Background Image & Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/AB_Web_Background.jpg"
          alt="AsiaBuddy Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'bottom' }}
          priority
        />
        {/* Dark Gradient Overlay for Legibility */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(180deg, rgba(10,12,16,0.2) 0%, rgba(10,12,16,0.4) 40%, rgba(10,12,16,0.85) 85%, rgba(10,12,16,1) 100%)' 
        }} />
      </div>

      {/* Content Section */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '960px', padding: '0 24px' }}>
        
        <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '15px' }}>
          Your Gateway to Asia
        </p>

        <h1 style={{ fontSize: 'clamp(38px, 6vw, 62px)', lineHeight: 1.1, marginBottom: '20px', fontWeight: 'normal' }}>
          Unveil the Soul of Asia<br />
          <span style={{ fontStyle: 'italic', color: '#D4AF37', display: 'block', fontSize: '0.65em', marginTop: '8px', letterSpacing: '0.05em' }}>
            Explore Asia Like a Local
          </span>
        </h1>

        <p style={{ fontSize: '16px', fontWeight: 300, color: 'rgba(244, 232, 193, 0.8)', maxWidth: '680px', lineHeight: 1.7, marginBottom: '55px', marginLeft: 'auto', marginRight: 'auto' }}>
          One hub. Trusted guides, visa support, travel plans, and on-ground services—tailored for every destination across the continent.
        </p>

        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(212, 175, 55, 0.7)', marginBottom: '30px' }}>
            Select Your Destination
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            {/* Thailand */}
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', 
              background: 'rgba(255, 255, 255, 0.07)', border: '1px solid rgba(212, 175, 55, 0.25)', 
              color: '#f4e8c1', borderRadius: '4px', cursor: 'pointer' 
            }}>
              <span style={{ fontSize: '20px' }}>🇹🇭</span> Thailand
            </button>

            {/* Myanmar */}
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', 
              background: 'rgba(255, 255, 255, 0.07)', border: '1px solid rgba(212, 175, 55, 0.25)', 
              color: '#f4e8c1', borderRadius: '4px', cursor: 'pointer' 
            }}>
              <span style={{ fontSize: '20px' }}>🇲🇲</span> Myanmar
            </button>

            {/* Blank Buttons */}
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ 
                minWidth: '130px', minHeight: '52px', background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '4px', opacity: 0.5 
              }} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}