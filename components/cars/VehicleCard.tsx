'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Scale, Gauge, Zap } from 'lucide-react';
import { Vehicle } from '@/types';
import { formatPrice } from '@/data';
import { ScoreRing } from './ScoreDisplay';
import { BadgeGroup, ColorCircles } from './Badges';
import { useFavorites } from '@/hooks/useFavorites';
import { useCompare } from '@/hooks/useCompare';
import { cn } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  className?: string;
}

export function VehicleCard({ vehicle, index = 0, className }: VehicleCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare, compareCount } = useCompare();
  const fav = isFavorite(vehicle.id);
  const inCompare = isInCompare(vehicle.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      className={cn('group', className)}
    >
      <Link href={`/cars/${vehicle.id}`} className="block">
        <div className="glass glow-blue-hover relative h-full overflow-hidden rounded-2xl p-5">
          {/* Top row: brand + score */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/50">{vehicle.brand}</p>
              <h3 className="mt-1 text-lg font-bold leading-tight text-white">
                {vehicle.model}
              </h3>
              <p className="mt-0.5 text-xs text-white/40">{vehicle.year} · {vehicle.category}</p>
            </div>
            <ScoreRing score={vehicle.overallScore} size={52} />
          </div>

          {/* Spec highlights */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            <SpecChip icon={<Gauge className="h-3.5 w-3.5" />} label="0-100" value={`${vehicle.zeroToHundred}s`} />
            <SpecChip icon={<Zap className="h-3.5 w-3.5" />} label="Power" value={`${vehicle.horsepower}hp`} />
            <SpecChip icon={<span className="text-[10px] font-bold">$</span>} label="Price" value={formatPrice(vehicle.startingPrice)} />
          </div>

          {/* Badges */}
          {vehicle.badges.length > 0 && (
            <div className="mb-3">
              <BadgeGroup badges={vehicle.badges} />
            </div>
          )}

          {/* Colors */}
          <div className="mb-4 flex items-center justify-between">
            <ColorCircles colors={vehicle.availableColors} />
            <span className="text-xs text-white/40">{vehicle.fuelType}</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(vehicle.id);
              }}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border transition-all',
                fav
                  ? 'border-red-500/40 bg-red-500/15 text-red-400'
                  : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white'
              )}
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={cn('h-4 w-4', fav && 'fill-current')} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!inCompare && compareCount >= 3) return;
                toggleCompare(vehicle.id);
              }}
              disabled={!inCompare && compareCount >= 3}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border transition-all',
                inCompare
                  ? 'border-[#00A3FF]/40 bg-[#00A3FF]/15 text-[#00A3FF]'
                  : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white',
                !inCompare && compareCount >= 3 && 'cursor-not-allowed opacity-40'
              )}
              aria-label={inCompare ? 'Remove from compare' : 'Add to compare'}
            >
              <Scale className="h-4 w-4" />
            </button>
            <div className="ml-auto flex items-center gap-1 text-xs font-medium text-[#00A3FF] opacity-0 transition-opacity group-hover:opacity-100">
              View Details
              <span className="text-[#00A3FF]">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SpecChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-black/20 px-2.5 py-2">
      <div className="flex items-center gap-1 text-white/40">
        {icon}
        <span className="text-[10px] uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
