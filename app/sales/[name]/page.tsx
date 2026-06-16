import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getSupabase } from '../../../lib/supabase';
import SalespersonClient from './SalespersonClient';

interface Salesperson {
  id: string;
  name: string;
  display_name: string;
  avatar_url: string | null;
  telegram_id: string;
}

interface PageProps {
  params: Promise<{ name: string }>;
}

async function getSalesperson(name: string): Promise<Salesperson | null> {
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('salespersons')
    .select('*')
    .eq('id', name)
    .single();
  console.log('[DEBUG] page.tsx - name param:', name, '| data:', data, '| error:', error);

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function SalespersonPage({ params }: PageProps) {
  const { name } = await params;
  const salesperson = await getSalesperson(name);

  if (!salesperson) {
    notFound();
  }

  return (
    <main className="min-h-screen relative flex flex-col bg-sacred-bg">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/AB_Web_Background.jpg"
          alt="AsiaBuddy Background"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-gold-deep/20 via-transparent to-gold-deep/20" />
      </div>

      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-deep to-transparent z-20" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-6 py-12 flex-grow">

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/Logo.png"
            alt="AsiaBuddy Logo"
            width={80}
            height={80}
            className="drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]"
          />
        </div>

        {/* Salesperson Profile Header */}
        <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-deep to-gold-soft flex items-center justify-center overflow-hidden border-4 border-white/30 shadow-2xl">
              {salesperson.avatar_url ? (
                <img
                  src={salesperson.avatar_url}
                  alt={salesperson.display_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {salesperson.display_name.charAt(0)}
                </span>
              )}
            </div>

            {/* Salesperson Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                {salesperson.display_name}
              </h1>
              <p className="text-gold-light text-lg font-medium mb-3">
                Your Personal Travel Consultant
              </p>
              <div className="inline-block px-4 py-1.5 bg-gold-deep/30 backdrop-blur-sm rounded-full border border-gold-deep/50">
                <span className="text-gold-light text-sm font-semibold uppercase tracking-wider">
                  AsiaBuddy — Asia Travel Expert
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust/Feature Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 text-center">
            <div className="text-3xl mb-2">🕐</div>
            <h3 className="text-white font-semibold mb-1">24/7 Live Support</h3>
            <p className="text-white/70 text-sm">Always available for you</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 text-center">
            <div className="text-3xl mb-2">🇹🇭</div>
            <h3 className="text-white font-semibold mb-1">Thailand Expert</h3>
            <p className="text-white/70 text-sm">Local knowledge & insights</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-white font-semibold mb-1">Instant Confirmation</h3>
            <p className="text-white/70 text-sm">Quick booking process</p>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-gold-deep to-gold-soft px-6 py-5">
            <h2 className="text-white font-bold text-xl mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
              Chat with {salesperson.display_name}
            </h2>
            <p className="text-white/80 text-sm">
              Get personalized travel assistance for your Thailand trip
            </p>
          </div>

          {/* Chat Interface */}
          <div className="p-8 min-h-[350px] flex flex-col items-center justify-center text-center" data-salesperson-id={salesperson.id}>
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Chat with {salesperson.display_name}
            </h3>
            <p className="text-white/70 max-w-md mb-6">
              Get personalized travel assistance for your Thailand trip
            </p>
            <SalespersonClient
              id={salesperson.id}
              display_name={salesperson.display_name}
              avatar_url={salesperson.avatar_url}
            />
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-6 px-6">
        <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">
          AsiaBuddy Services · asiabuddy.app
        </p>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-deep/40 to-transparent z-20" />

    </main>
  );
}
