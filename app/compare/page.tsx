'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, Plus, Trophy, Camera } from 'lucide-react';
import { vehicles, getVehicle, formatPrice, getGalleryUrl } from '@/data';
import { Vehicle } from '@/types';
import { SectionWrapper } from '@/components/layout/Section';
import { ScoreRing } from '@/components/cars/ScoreDisplay';
import { useCompare } from '@/hooks/useCompare';
import { cn } from '@/lib/utils';

const comparisonMetrics = [
  { key: 'startingPrice', label: 'Starting Price', format: (v: Vehicle) => formatPrice(v.startingPrice), lower: true },
  { key: 'horsepower', label: 'Horsepower', format: (v: Vehicle) => `${v.horsepower} hp`, lower: false },
  { key: 'torque', label: 'Torque', format: (v: Vehicle) => `${v.torque} Nm`, lower: false },
  { key: 'topSpeed', label: 'Top Speed', format: (v: Vehicle) => `${v.topSpeed} km/h`, lower: false },
  { key: 'zeroToHundred', label: '0-100 km/h', format: (v: Vehicle) => `${v.zeroToHundred}s`, lower: true },
  { key: 'weight', label: 'Weight', format: (v: Vehicle) => `${v.weight} kg`, lower: true },
  { key: 'fuelEconomy', label: 'Fuel Economy', format: (v: Vehicle) => v.fuelEconomy ? `${v.fuelEconomy} mpg` : 'N/A', lower: false },
  { key: 'range', label: 'Range', format: (v: Vehicle) => v.range ? `${v.range} km` : 'N/A', lower: false },
  { key: 'seats', label: 'Seats', format: (v: Vehicle) => String(v.seats), lower: false },
  { key: 'cargoVolume', label: 'Cargo', format: (v: Vehicle) => `${v.cargoVolume} L`, lower: false },
];

const scoreMetrics = [
  { key: 'performanceScore', label: 'Performance' },
  { key: 'luxuryScore', label: 'Luxury' },
  { key: 'comfortScore', label: 'Comfort' },
  { key: 'technologyScore', label: 'Technology' },
  { key: 'reliabilityScore', label: 'Reliability' },
  { key: 'safetyScore', label: 'Safety' },
  { key: 'fuelEconomyScore', label: 'Fuel Economy' },
  { key: 'funFactorScore', label: 'Fun Factor' },
  { key: 'overallScore', label: 'Overall' },
];

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, maxCompare } = useCompare();
  const [showSelector, setShowSelector] = useState(false);
  const [search, setSearch] = useState('');

  const compareVehicles = compareList.map(getVehicle).filter(Boolean) as Vehicle[];
  const availableVehicles = vehicles
    .filter((v) => !compareList.includes(v.id))
    .filter((v) => search ? v.brand.toLowerCase().includes(search.toLowerCase()) || v.model.toLowerCase().includes(search.toLowerCase()) : true)
    .slice(0, 20);

  const getBest = (metric: typeof comparisonMetrics[number]): number[] => {
    const values = compareVehicles.map((v) => (v as any)[metric.key] as number);
    const best = metric.lower ? Math.min(...values.filter((x) => x > 0)) : Math.max(...values.filter((x) => x > 0));
    return compareVehicles.map((v) => (v as any)[metric.key] === best ? 1 : 0);
  };

  const getBestScore = (key: string): number[] => {
    const values = compareVehicles.map((v) => (v as any)[key] as number);
    const best = Math.max(...values);
    return compareVehicles.map((v) => (v as any)[key] === best ? 1 : 0);
  };

  if (compareVehicles.length === 0) {
    return (
      <SectionWrapper className="py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
            <Scale className="h-8 w-8 text-white/40" />
          </div>
          <h1 className="text-2xl font-bold text-white">Compare Vehicles</h1>
          <p className="mt-2 text-sm text-white/50">
            Select up to {maxCompare} vehicles to compare side by side. See specs, scores, and find the best value.
          </p>
          <button
            onClick={() => setShowSelector(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0077CC] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            Add First Vehicle
          </button>
        </div>

        {showSelector && (
          <VehicleSelector
            vehicles={availableVehicles}
            search={search}
            setSearch={setSearch}
            onSelect={() => {}}
            onClose={() => setShowSelector(false)}
            maxReached={false}
          />
        )}
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Compare Vehicles</h1>
          <p className="mt-1 text-sm text-white/50">{compareVehicles.length} of {maxCompare} vehicles selected</p>
        </div>
        <div className="flex gap-2">
          {compareVehicles.length < maxCompare && (
            <button
              onClick={() => setShowSelector(true)}
              className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              <Plus className="h-4 w-4" />
              Add Vehicle
            </button>
          )}
          <button
            onClick={clearCompare}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Vehicle headers */}
          <div className="mb-4 grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareVehicles.length}, 1fr)` }}>
            <div></div>
            {compareVehicles.map((v) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-4"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <Link href={`/cars/${v.id}`} className="block">
                      <p className="text-xs text-white/40">{v.brand}</p>
                      <h3 className="text-sm font-bold text-white">{v.model}</h3>
                      <p className="text-xs text-white/40">{v.year}</p>
                    </Link>
                  </div>
                  <button
                    onClick={() => removeFromCompare(v.id)}
                    className="rounded-lg p-1 text-white/40 hover:bg-white/10 hover:text-white"
                    aria-label="Remove from compare"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <ScoreRing score={v.overallScore} size={60} />
                </div>
                <div className="mt-3 flex gap-1.5">
                  <Link href={`/cars/${v.id}`} className="flex-1 rounded-lg border border-white/10 py-1.5 text-center text-xs font-medium text-white/70 hover:text-white">
                    View
                  </Link>
                  <a href={getGalleryUrl(v)} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-white/10 py-1.5 text-center text-xs font-medium text-white/70 hover:text-white">
                    Gallery
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Specs comparison */}
          <div className="glass rounded-2xl p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-white/60">Specifications</h2>
            {comparisonMetrics.map((metric) => {
              const bestFlags = getBest(metric);
              return (
                <div
                  key={metric.key}
                  className="grid items-center gap-4 border-b border-white/5 py-3 last:border-0"
                  style={{ gridTemplateColumns: `200px repeat(${compareVehicles.length}, 1fr)` }}
                >
                  <div className="text-sm text-white/50">{metric.label}</div>
                  {compareVehicles.map((v, i) => (
                    <div key={v.id} className="flex items-center gap-2">
                      <span className={cn('text-sm font-semibold', bestFlags[i] ? 'text-[#00A3FF]' : 'text-white')}>
                        {metric.format(v)}
                      </span>
                      {bestFlags[i] && <Trophy className="h-3.5 w-3.5 text-[#D4AF37]" />}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Score comparison */}
          <div className="glass mt-4 rounded-2xl p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-white/60">CarVibes Scores</h2>
            {scoreMetrics.map((metric) => {
              const bestFlags = getBestScore(metric.key);
              const max = Math.max(...compareVehicles.map((v) => (v as any)[metric.key]));
              return (
                <div
                  key={metric.key}
                  className="grid items-center gap-4 border-b border-white/5 py-3 last:border-0"
                  style={{ gridTemplateColumns: `200px repeat(${compareVehicles.length}, 1fr)` }}
                >
                  <div className="text-sm text-white/50">{metric.label}</div>
                  {compareVehicles.map((v, i) => {
                    const val = (v as any)[metric.key] as number;
                    const pct = (val / 10) * 100;
                    return (
                      <div key={v.id} className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={cn('text-sm font-semibold', bestFlags[i] ? 'text-[#00A3FF]' : 'text-white')}>
                            {val.toFixed(1)}
                          </span>
                          {bestFlags[i] && <Trophy className="h-3.5 w-3.5 text-[#D4AF37]" />}
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#00A3FF] to-[#0077CC]"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vehicle selector modal */}
      <AnimatePresence>
        {showSelector && (
          <VehicleSelector
            vehicles={availableVehicles}
            search={search}
            setSearch={setSearch}
            onSelect={() => setShowSelector(false)}
            onClose={() => setShowSelector(false)}
            maxReached={compareVehicles.length >= maxCompare}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

function VehicleSelector({
  vehicles,
  search,
  setSearch,
  onSelect,
  onClose,
  maxReached,
}: {
  vehicles: Vehicle[];
  search: string;
  setSearch: (s: string) => void;
  onSelect: () => void;
  onClose: () => void;
  maxReached: boolean;
}) {
  const { toggleCompare, compareCount, maxCompare } = useCompare();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-strong relative z-10 w-full max-w-lg rounded-2xl p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Add Vehicle to Compare</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-white/40 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        {maxReached ? (
          <p className="py-8 text-center text-sm text-white/50">You can compare up to {maxCompare} vehicles at a time.</p>
        ) : (
          <>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vehicles..."
              className="mb-4 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF]/40"
              autoFocus
            />
            <div className="max-h-80 space-y-1.5 overflow-y-auto scrollbar-thin">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    toggleCompare(v.id);
                    onSelect();
                  }}
                  className="flex w-full items-center justify-between rounded-lg border border-white/8 bg-white/5 px-4 py-3 text-left transition-colors hover:border-[#00A3FF]/30 hover:bg-[#00A3FF]/5"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{v.brand} {v.model}</p>
                    <p className="text-xs text-white/40">{v.year} · {v.horsepower} hp · {formatPrice(v.startingPrice)}</p>
                  </div>
                  <Plus className="h-4 w-4 text-[#00A3FF]" />
                </button>
              ))}
              {vehicles.length === 0 && (
                <p className="py-6 text-center text-sm text-white/40">No vehicles found</p>
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
