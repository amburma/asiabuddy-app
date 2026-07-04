'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { MapPin, ArrowRight, Loader2, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ── Types ──────────────────────────────────────────────────────
interface Destination {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  location: string;
  gallery: string[];
  published: boolean;
  created_at: string;
}

// ── Floating Back Button (inline) ─────────────────────────────
function FloatingBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/thailand')}
      className="fixed top-5 left-5 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gold-soft/20 text-sacred-green text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all"
    >
      ← Back
    </button>
  );
}

// ── Skeleton Card ──────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white/60 border border-gold-soft/20 animate-pulse">
      <div className="h-56 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded-full w-1/3" />
        <div className="h-6 bg-gray-200 rounded-full w-2/3" />
        <div className="h-4 bg-gray-200 rounded-full w-full" />
        <div className="h-4 bg-gray-200 rounded-full w-4/5" />
      </div>
    </div>
  );
}

// ── Destination Card ───────────────────────────────────────────
function DestinationCard({ dest, index }: { dest: Destination; index: number }) {
  return (
    <motion.a
      href={`/thailand/thailand-destination/${dest.slug}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group block rounded-3xl overflow-hidden bg-white border border-gold-soft/20 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {dest.cover_image ? (
          <Image
            src={dest.cover_image}
            alt={dest.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sacred-green/20 to-gold-soft/20 flex items-center justify-center">
            <MapPin size={40} className="text-gold-deep/40" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Location pill */}
        {dest.location && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-sacred-green text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
              <MapPin size={10} />
              {dest.location}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-xl text-sacred-green font-bold mb-2 group-hover:text-gold-deep transition-colors leading-tight">
          {dest.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
          {dest.excerpt}
        </p>

        {/* Gallery count */}
        {dest.gallery && dest.gallery.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-sacred-green/8 text-sacred-green px-2.5 py-1 rounded-full border border-sacred-green/10">
              {dest.gallery.length} Photos
            </span>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-gold-deep font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
          <span>Explore</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
}

// ── Hero Card ──────────────────────────────────────────────────
function HeroCard({ dest }: { dest: Destination }) {
  return (
    <motion.a
      href={`/thailand/thailand-destination/${dest.slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="group col-span-full block relative rounded-3xl overflow-hidden h-[420px] md:h-[500px] shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {dest.cover_image ? (
        <Image
          src={dest.cover_image}
          alt={dest.title}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-sacred-green to-emerald-900" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-gold-deep text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            ✦ Top Destination
          </span>
          {dest.location && (
            <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
              <MapPin size={10} />
              {dest.location}
            </span>
          )}
        </div>

        <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-3 leading-tight">
          {dest.title}
        </h2>
        <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed mb-6 line-clamp-2">
          {dest.excerpt}
        </p>

        <div className="flex items-center gap-2 text-gold-deep font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
          <span>Discover More</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
}

// ── Empty State ────────────────────────────────────────────────
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-gold-soft/10 flex items-center justify-center mb-6">
        <MapPin size={36} className="text-gold-deep/40" />
      </div>
      <h3 className="font-serif text-2xl text-sacred-green mb-2">No Destinations Found</h3>
      <p className="text-sm text-gray-400 max-w-sm">
        Destinations will appear here once they are added to the system.
      </p>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function DestinationPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filtered, setFiltered] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeLocation, setActiveLocation] = useState('All');

  // Fetch
  useEffect(() => {
    async function fetchDestinations() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setDestinations(data);
        setFiltered(data);
      } else {
        console.error('Supabase error:', error);
      }
      setLoading(false);
    }
    fetchDestinations();
  }, []);

  // Search + location filter
  useEffect(() => {
    let result = destinations;
    if (activeLocation !== 'All') {
      result = result.filter(d => d.location === activeLocation);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(d =>
        d.title?.toLowerCase().includes(q) ||
        d.excerpt?.toLowerCase().includes(q) ||
        d.location?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, activeLocation, destinations]);

  // Unique locations
  const locations = ['All', ...Array.from(new Set(destinations.map(d => d.location).filter(Boolean)))];

  const heroDestination = filtered[0];
  const gridDestinations = filtered.slice(1);

  return (
    <div className="min-h-screen bg-sacred-bg">
      <FloatingBackButton />

      {/* ── Page Header ── */}
      <div className="relative overflow-hidden bg-white border-b border-gold-soft/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-soft/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-gold-deep/30" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold-deep">
                Explore Thailand
              </span>
              <span className="w-12 h-[1px] bg-gold-deep/30" />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-sacred-green font-bold mb-4 leading-none">
              Destinations
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              From ancient temples to pristine beaches — discover Thailand's most breathtaking places.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Search + Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gold-soft/20 rounded-2xl text-sm outline-none focus:border-gold-deep transition-colors shadow-sm"
            />
          </div>

          {/* Location filter pills */}
          {locations.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <Filter size={14} className="text-gray-400 shrink-0" />
              {locations.map(loc => (
                <button
                  key={loc}
                  onClick={() => setActiveLocation(loc)}
                  className={`shrink-0 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                    activeLocation === loc
                      ? 'bg-sacred-green text-white shadow-md'
                      : 'bg-white border border-gold-soft/20 text-gray-600 hover:border-gold-deep hover:text-gold-deep'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {heroDestination && <HeroCard dest={heroDestination} />}
              {gridDestinations.map((dest, i) => (
                <DestinationCard key={dest.id} dest={dest} index={i} />
              ))}
            </>
          )}
        </div>

        {/* Count */}
        {!loading && filtered.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest mt-12"
          >
            {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
          </motion.p>
        )}
      </div>
    </div>
  );
}