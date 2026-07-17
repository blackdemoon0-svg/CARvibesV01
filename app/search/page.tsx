'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { vehicles } from '@/data';
import { VehicleCard } from '@/components/cars/VehicleCard';
import { SectionWrapper } from '@/components/layout/Section';

const popularSearches = ['BMW', 'Ferrari', 'M5', 'Electric', 'SUV', 'Porsche', 'GT-R', 'Tesla'];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return vehicles.filter((v) =>
      v.brand.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      String(v.year).includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.fuelType.toLowerCase().includes(q) ||
      v.bodyStyle.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <SectionWrapper className="py-8">
      <h1 className="text-3xl font-bold text-white">Search</h1>
      <p className="mt-1 text-sm text-white/50">Find vehicles by brand, model, year, category, and more</p>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
        <Search className="h-5 w-5 text-white/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by brand, model, year, category..."
          className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
          autoFocus
        />
        {query && (
          <button onClick={() => setQuery('')} className="rounded-lg p-1 text-white/40 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {!query && (
        <div className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/40">Popular Searches</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-[#00A3FF]/30 hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && (
        <div className="mt-6">
          <p className="mb-4 text-sm text-white/50">{results.length} results for &quot;{query}&quot;</p>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl py-16 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-white/20" />
              <p className="text-white/40">No vehicles found for &quot;{query}&quot;</p>
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1440px] px-4 py-20 text-center text-white/40">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
