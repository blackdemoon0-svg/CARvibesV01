'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Globe2 } from 'lucide-react';
import { brands, getVehicleCountByBrand } from '@/data';
import { SectionWrapper } from '@/components/layout/Section';

type SortOption = 'alphabetical' | 'country' | 'vehicles';

export default function BrandsPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('alphabetical');

  const filtered = useMemo(() => {
    let result = brands.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.country.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === 'alphabetical') result = result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'country') result = result.sort((a, b) => a.country.localeCompare(b.country));
    if (sort === 'vehicles')
      result = result.sort((a, b) => getVehicleCountByBrand(b.id) - getVehicleCountByBrand(a.id));

    return result;
  }, [search, sort]);

  return (
    <SectionWrapper className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-white">All Brands</h1>
        <p className="mt-2 text-sm text-white/50">
          Explore {brands.length} legendary manufacturers from around the world
        </p>
      </motion.div>

      {/* Controls */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 sm:w-80">
          <Search className="h-4 w-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          {(['alphabetical', 'country', 'vehicles'] as SortOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              className={`rounded-lg px-3 py-2 text-xs font-medium capitalize transition-colors ${
                sort === opt
                  ? 'bg-[#00A3FF]/15 text-[#00A3FF]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((brand, i) => {
          const count = getVehicleCountByBrand(brand.id);
          return (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4) }}
            >
              <Link href={`/brands/${brand.id}`}>
                <div className="glass glow-blue-hover group h-full rounded-2xl p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                      style={{
                        backgroundColor: brand.brandColor + '30',
                        border: `1px solid ${brand.brandColor}50`,
                      }}
                    >
                      {brand.name.charAt(0)}
                    </div>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/50">
                      {count} {count === 1 ? 'model' : 'models'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{brand.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-white/40">
                    <Globe2 className="h-3 w-3" />
                    {brand.country} · est. {brand.founded}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-white/40">No brands found for &quot;{search}&quot;</p>
        </div>
      )}
    </SectionWrapper>
  );
}
