'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, X, Scale, Search } from 'lucide-react';
import { vehicles, getVehicle } from '@/data';
import { VehicleCard } from '@/components/cars/VehicleCard';
import { SectionWrapper } from '@/components/layout/Section';
import { useFavorites, useRecentlyViewed } from '@/hooks/useFavorites';
import { useCompare } from '@/hooks/useCompare';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const favVehicles = favorites.map(getVehicle).filter(Boolean) as typeof vehicles;
  const recentVehicles = recentlyViewed.map(getVehicle).filter(Boolean) as typeof vehicles;

  return (
    <SectionWrapper className="py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
            <Heart className="h-7 w-7 text-red-400" />
            Favorites
          </h1>
          <p className="mt-1 text-sm text-white/50">{favVehicles.length} saved vehicles</p>
        </div>
        {favVehicles.length > 0 && (
          <button
            onClick={clearFavorites}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 hover:text-white"
          >
            Clear All
          </button>
        )}
      </div>

      {favVehicles.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favVehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl py-16 text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-white/20" />
          <p className="text-white/40">No favorites yet</p>
          <Link href="/cars" className="mt-4 inline-block rounded-lg bg-[#00A3FF] px-4 py-2 text-sm font-semibold text-white">
            Browse Cars
          </Link>
        </div>
      )}

      {/* Recently viewed */}
      {recentVehicles.length > 0 && (
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recently Viewed</h2>
            <button
              onClick={clearRecentlyViewed}
              className="text-xs font-medium text-white/50 hover:text-white"
            >
              Clear
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentVehicles.slice(0, 8).map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
