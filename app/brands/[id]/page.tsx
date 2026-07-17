'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe2, Building2, Calendar, User, ExternalLink } from 'lucide-react';
import { brands, getBrand, getVehiclesByBrand } from '@/data';
import { VehicleCard } from '@/components/cars/VehicleCard';
import { SectionWrapper } from '@/components/layout/Section';

interface PageProps {
  params: { id: string };
}

export default function BrandPage({ params }: PageProps) {
  const { id } = params;
  const brand = getBrand(id);

  if (!brand) notFound();

  const brandVehicles = getVehiclesByBrand(id);
  const categories = [...new Set(brandVehicles.map((v) => v.category))];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8 py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div
            className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
            style={{ backgroundColor: brand.brandColor + '20' }}
          />
        </div>
        <SectionWrapper className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white"
                style={{
                  backgroundColor: brand.brandColor + '30',
                  border: `1px solid ${brand.brandColor}50`,
                }}
              >
                {brand.name.charAt(0)}
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-white">{brand.name}</h1>
              <p className="mt-3 text-lg text-white/60">{brand.description}</p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <InfoChip icon={<Globe2 className="h-4 w-4" />} label="Country" value={brand.country} />
                <InfoChip icon={<Calendar className="h-4 w-4" />} label="Founded" value={String(brand.founded)} />
                <InfoChip icon={<Building2 className="h-4 w-4" />} label="HQ" value={brand.headquarters} />
                <InfoChip icon={<User className="h-4 w-4" />} label="Founder" value={brand.founder} />
              </div>
            </div>

            <div className="glass rounded-2xl p-6 lg:w-80">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">History</h3>
              <p className="text-sm leading-relaxed text-white/60">{brand.history}</p>
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#00A3FF] hover:text-[#33B5FF]"
              >
                Official Website <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </SectionWrapper>
      </section>

      {/* Stats */}
      <SectionWrapper className="py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatBox label="Total Models" value={String(brandVehicles.length)} />
          <StatBox label="Categories" value={String(categories.length)} />
          <StatBox
            label="Top Score"
            value={Math.max(...brandVehicles.map((v) => v.overallScore)).toFixed(1)}
          />
          <StatBox
            label="Most Powerful"
            value={`${Math.max(...brandVehicles.map((v) => v.horsepower))} hp`}
          />
        </div>
      </SectionWrapper>

      {/* Vehicle categories */}
      {categories.map((cat) => {
        const catVehicles = brandVehicles.filter((v) => v.category === cat);
        return (
          <SectionWrapper key={cat} className="py-6">
            <h2 className="mb-6 text-xl font-bold text-white">{cat}s</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {catVehicles.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>
          </SectionWrapper>
        );
      })}

      {/* All vehicles */}
      <SectionWrapper className="py-6">
        <h2 className="mb-6 text-xl font-bold text-white">All {brand.name} Vehicles</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brandVehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

function InfoChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/40">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-wide text-white/40">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-4 text-center">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-white/40">{label}</p>
    </div>
  );
}
