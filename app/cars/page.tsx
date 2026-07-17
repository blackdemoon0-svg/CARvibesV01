'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { vehicles, brands, getAllCategories, getAllFuelTypes, formatPrice } from '@/data';
import { VehicleCard } from '@/components/cars/VehicleCard';
import { SectionWrapper } from '@/components/layout/Section';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'power' | 'score' | 'year-new' | 'acceleration';

function CarsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialBrand = searchParams.get('brand') || '';

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFuel, setSelectedFuel] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [minHorsepower, setMinHorsepower] = useState(0);
  const [sort, setSort] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const categories = getAllCategories();
  const fuelTypes = getAllFuelTypes();

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      if (search) {
        const q = search.toLowerCase();
        if (!v.brand.toLowerCase().includes(q) && !v.model.toLowerCase().includes(q) && !String(v.year).includes(q))
          return false;
      }
      if (selectedBrand && v.brandId !== selectedBrand) return false;
      if (selectedCategory && v.category !== selectedCategory) return false;
      if (selectedFuel && v.fuelType !== selectedFuel) return false;
      if (v.startingPrice < priceRange[0] || v.startingPrice > priceRange[1]) return false;
      if (v.horsepower < minHorsepower) return false;
      return true;
    });

    switch (sort) {
      case 'price-low': result = result.sort((a, b) => a.startingPrice - b.startingPrice); break;
      case 'price-high': result = result.sort((a, b) => b.startingPrice - a.startingPrice); break;
      case 'power': result = result.sort((a, b) => b.horsepower - a.horsepower); break;
      case 'score': result = result.sort((a, b) => b.overallScore - a.overallScore); break;
      case 'year-new': result = result.sort((a, b) => b.year - a.year); break;
      case 'acceleration': result = result.sort((a, b) => a.zeroToHundred - b.zeroToHundred); break;
      case 'featured': result = result.sort((a, b) => Number(!!b.featured) - Number(!!a.featured)); break;
    }
    return result;
  }, [search, selectedBrand, selectedCategory, selectedFuel, priceRange, minHorsepower, sort]);

  const clearFilters = () => {
    setSearch('');
    setSelectedBrand('');
    setSelectedCategory('');
    setSelectedFuel('');
    setPriceRange([0, 5000000]);
    setMinHorsepower(0);
  };

  const activeFilterCount = [selectedBrand, selectedCategory, selectedFuel].filter(Boolean).length +
    (priceRange[0] > 0 || priceRange[1] < 5000000 ? 1 : 0) +
    (minHorsepower > 0 ? 1 : 0);

  return (
    <SectionWrapper className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-white">All Cars</h1>
        <p className="mt-2 text-sm text-white/50">
          {filtered.length} of {vehicles.length} vehicles
        </p>
      </motion.div>

      {/* Search + sort */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 sm:w-96">
          <Search className="h-4 w-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by brand, model, year..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors',
              showFilters || activeFilterCount > 0
                ? 'border-[#00A3FF]/30 bg-[#00A3FF]/10 text-[#00A3FF]'
                : 'border-white/10 text-white/60 hover:text-white'
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-[#00A3FF] px-1.5 text-[10px] text-white">{activeFilterCount}</span>
            )}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-white/10 bg-[#141414] px-3 py-2 text-xs font-medium text-white focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="power">Most Powerful</option>
            <option value="score">Highest Rated</option>
            <option value="year-new">Newest</option>
            <option value="acceleration">Fastest 0-100</option>
          </select>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 overflow-hidden"
        >
          <div className="glass rounded-2xl p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Brand filter */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/40">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#141414] px-3 py-2 text-sm text-white focus:outline-none"
                >
                  <option value="">All Brands</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Category filter */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/40">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#141414] px-3 py-2 text-sm text-white focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Fuel filter */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/40">Fuel Type</label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#141414] px-3 py-2 text-sm text-white focus:outline-none"
                >
                  <option value="">All Fuels</option>
                  {fuelTypes.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Price range */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/40">
                  Max Price: {formatPrice(priceRange[1])}
                </label>
                <input
                  type="range"
                  min={50000}
                  max={5000000}
                  step={50000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-[#00A3FF]"
                />
              </div>

              {/* Min horsepower */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/40">
                  Min Horsepower: {minHorsepower} hp
                </label>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={50}
                  value={minHorsepower}
                  onChange={(e) => setMinHorsepower(Number(e.target.value))}
                  className="w-full accent-[#00A3FF]"
                />
              </div>

              {/* Clear */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results grid */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-lg text-white/40">No vehicles match your filters</p>
          <button
            onClick={clearFilters}
            className="mt-4 rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 hover:text-white"
          >
            Clear Filters
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1440px] px-4 py-20 text-center text-white/40">Loading...</div>}>
      <CarsContent />
    </Suspense>
  );
}
