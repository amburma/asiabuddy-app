// app/page.tsx
import Link from 'next/link';
import './globals.css'; // This is essential!

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="tagline-small">Your Gateway to Asia</p>
        <h1 className="hero-title">
          Unveil the Soul of Asia<br />
          Explore Asia Like a Local
        </h1>
        <p className="hero-subtitle">
          Your single hub for trusted guides, visa support, and premium on-ground services.
        </p>
        <div className="country-section">
          <p className="country-label">Select Your Destination</p>
          <div className="country-grid">
            {/* Same Window အတွက် Link component သုံးပါ */}
            <Link href="/thailand" className="country-btn">
              <span className="flag">🇹🇭</span> Thailand
            </Link>
            <div className="country-btn blank"></div>
            <div className="country-btn blank"></div>
            <div className="country-btn blank"></div>
          </div>
        </div>
      </div>
    </section>
  );
}