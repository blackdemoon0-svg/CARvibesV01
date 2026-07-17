'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Heart, Scale, Share2, X } from 'lucide-react';
import { getVehicle, formatPrice, vehicles } from '@/data';
import { SectionWrapper } from '@/components/layout/Section';
import { ScoreRing } from '@/components/cars/ScoreDisplay';
import { useFavorites } from '@/hooks/useFavorites';
import { useCompare } from '@/hooks/useCompare';
import { cn } from '@/lib/utils';

export default function GaragePage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { toggleCompare, isInCompare, compareCount } = useCompare();
  const garageVehicles = favorites.map(getVehicle).filter(Boolean) as typeof vehicles;

  return (
    <SectionWrapper className="py-8">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
          <Home className="h-7 w-7 text-[#00A3FF]" />
          My Garage
        </h1>
        <p className="mt-1 text-sm text-white/50">
          {garageVehicles.length} {garageVehicles.length === 1 ? 'dream car' : 'dream cars'} in your garage
        </p>
      </div>

      {garageVehicles.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {garageVehicles.map((v, i) => {
            const inCompare = isInCompare(v.id);
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass glow-blue-hover overflow-hidden rounded-2xl"
              >
                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="text-xs text-white/40">{v.brand}</p>
                      <h3 className="text-lg font-bold text-white">{v.model}</h3>
                      <p className="text-xs text-white/40">{v.year} · {v.category}</p>
                    </div>
                    <ScoreRing score={v.overallScore} size={48} />
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg border border-white/8 bg-black/20 p-2 text-center">
                      <p className="text-[10px] text-white/40">Price</p>
                      <p className="text-xs font-bold text-white">{formatPrice(v.startingPrice)}</p>
                    </div>
                    <div className="rounded-lg border border-white/8 bg-black/20 p-2 text-center">
                      <p className="text-[10px] text-white/40">Power</p>
                      <p className="text-xs font-bold text-white">{v.horsepower}hp</p>
                    </div>
                    <div className="rounded-lg border border-white/8 bg-black/20 p-2 text-center">
                      <p className="text-[10px] text-white/40">0-100</p>
                      <p className="text-xs font-bold text-white">{v.zeroToHundred}s</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/cars/${v.id}`}
                      className="flex-1 rounded-lg bg-gradient-to-r from-[#00A3FF] to-[#0077CC] py-2.5 text-center text-xs font-semibold text-white"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => {
                        if (!inCompare && compareCount >= 3) return;
                        toggleCompare(v.id);
                      }}
                      disabled={!inCompare && compareCount >= 3}
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg border transition-all',
                        inCompare ? 'border-[#00A3FF]/40 bg-[#00A3FF]/15 text-[#00A3FF]' : 'border-white/10 text-white/60 hover:text-white'
                      )}
                    >
                      <Scale className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(v.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-red-400 transition-all hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="glass rounded-2xl py-16 text-center">
          <Home className="mx-auto mb-4 h-12 w-12 text-white/20" />
          <p className="text-white/40">Your garage is empty</p>
          <p className="mt-1 text-sm text-white/30">Save vehicles to your favorites to build your dream garage</p>
          <Link href="/cars" className="mt-4 inline-block rounded-lg bg-[#00A3FF] px-4 py-2 text-sm font-semibold text-white">
            Browse Cars
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
}
