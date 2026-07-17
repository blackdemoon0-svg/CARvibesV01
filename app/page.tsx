'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Scale, LayoutGrid, ChevronRight, Car } from 'lucide-react';
import { vehicles, brands, formatPrice } from '@/data';
import { VehicleCard } from '@/components/cars/VehicleCard';
import { SectionWrapper, SectionHeading } from '@/components/layout/Section';
import { ScoreRing } from '@/components/cars/ScoreDisplay';
import { BadgeGroup } from '@/components/cars/Badges';

const stats = [
  { value: `${brands.length}+`, label: 'Brands' },
  { value: `${vehicles.length}+`, label: 'Vehicles' },
  { value: 'AI', label: 'Recommendations' },
  { value: '2-3', label: 'Fast Compare' },
];

const collections = [
  { title: 'Luxury Collection', category: 'Luxury Sedan', desc: 'Ultra-premium grand tourers' },
  { title: 'Sports Collection', category: 'Sports Car', desc: 'Pure driving excitement' },
  { title: 'Electric Collection', category: 'Electric Vehicle', desc: 'The future of driving' },
  { title: 'SUV Collection', category: 'SUV', desc: 'Power and practicality' },
];

export default function HomePage() {
  const trending = vehicles.filter((v) => v.trending).slice(0, 6);
  const featured = vehicles.filter((v) => v.featured).slice(0, 8);
  const carOfWeek = vehicles.find((v) => v.id === 'ferrari-sf90-stradale-2024') || featured[0];
  const topRated = [...vehicles].sort((a, b) => b.overallScore - a.overallScore).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#0B0B0B]/95 to-[#001628]" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A3FF]/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[300px] w-full bg-gradient-to-t from-[#0B0B0B] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#00A3FF]" />
              The Ultimate Automotive Discovery Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Find Your
              <br />
              <span className="text-gradient-blue">Perfect Car.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
            >
              Discover, compare, and explore hundreds of vehicles. From everyday
              commuters to hypercars — find the one that matches your passion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/find-my-car"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0077CC] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                <Sparkles className="h-4 w-4" />
                Start Finding
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/compare"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <Scale className="h-4 w-4" />
                Compare Cars
              </Link>
              <Link
                href="/brands"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <LayoutGrid className="h-4 w-4" />
                Browse Brands
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-xl px-4 py-3">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/50">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRENDING CARS */}
      <SectionWrapper>
        <SectionHeading
          title="Trending Cars"
          subtitle="The most talked-about vehicles right now"
          href="/cars"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trending.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* CAR OF THE WEEK */}
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="glass relative overflow-hidden rounded-3xl p-8 lg:p-12"
        >
          <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#E10600]/10 blur-[100px]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">
                Car of the Week
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
                {carOfWeek.brand} {carOfWeek.model}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {carOfWeek.description}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <SpecBox label="Power" value={`${carOfWeek.horsepower} hp`} />
                <SpecBox label="0-100" value={`${carOfWeek.zeroToHundred}s`} />
                <SpecBox label="Top Speed" value={`${carOfWeek.topSpeed} km/h`} />
              </div>
              <div className="mt-6">
                <BadgeGroup badges={carOfWeek.badges} />
              </div>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  href={`/cars/${carOfWeek.id}`}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0077CC] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
                >
                  Explore Vehicle
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <span className="text-lg font-bold text-white">{formatPrice(carOfWeek.startingPrice)}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/8 bg-black/30 p-8">
              <p className="text-xs uppercase tracking-wider text-white/40">CarVibes Score</p>
              <ScoreRing score={carOfWeek.overallScore} size={140} />
              <div className="grid w-full grid-cols-2 gap-2 text-center">
                <div>
                  <p className="text-xs text-white/40">Performance</p>
                  <p className="text-sm font-semibold text-white">{carOfWeek.performanceScore.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Luxury</p>
                  <p className="text-sm font-semibold text-white">{carOfWeek.luxuryScore.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* COLLECTIONS */}
      <SectionWrapper>
        <SectionHeading title="Explore Collections" subtitle="Curated selections for every passion" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((col, i) => {
            const count = vehicles.filter((v) => v.category === col.category).length;
            return (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/cars?category=${encodeURIComponent(col.category)}`}>
                  <div className="glass glow-blue-hover group relative h-44 overflow-hidden rounded-2xl p-6">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#00A3FF]/10 blur-[60px] transition-opacity group-hover:opacity-70" />
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">{col.title}</h3>
                        <p className="mt-1 text-xs text-white/50">{col.desc}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40">{count} vehicles</span>
                        <span className="flex items-center gap-1 text-xs font-medium text-[#00A3FF]">
                          Explore <ArrowRightSmall />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* FEATURED VEHICLES */}
      <SectionWrapper>
        <SectionHeading
          title="Featured Vehicles"
          subtitle="Editor's choice — the best of the best"
          href="/cars"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* POPULAR BRANDS */}
      <SectionWrapper>
        <SectionHeading
          title="Popular Brands"
          subtitle="Explore legendary manufacturers"
          href="/brands"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brands.slice(0, 12).map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={`/brands/${brand.id}`}>
                <div className="glass glow-blue-hover flex h-24 flex-col items-center justify-center rounded-xl p-4 text-center">
                  <div
                    className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: brand.brandColor + '40', border: `1px solid ${brand.brandColor}60` }}
                  >
                    {brand.name.charAt(0)}
                  </div>
                  <p className="text-xs font-semibold text-white">{brand.name}</p>
                  <p className="text-[10px] text-white/40">{brand.country}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* TOP RATED */}
      <SectionWrapper>
        <SectionHeading
          title="Top Rated"
          subtitle="The highest-scoring vehicles in our database"
          href="/cars"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topRated.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* FUTURE UPDATES */}
      <SectionWrapper>
        <SectionHeading title="Future Updates" subtitle="What's coming to CarVibes" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: '🤖', title: 'AI Car Advisor', desc: 'Chat with an AI automotive expert' },
            { icon: '🎨', title: 'Garage Studio', desc: 'Customize your dream car' },
            { icon: '🛡️', title: 'Insurance Calculator', desc: 'Estimate your costs' },
            { icon: '📱', title: 'Mobile App', desc: 'CarVibes on the go' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-2xl p-6"
            >
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="text-sm font-bold text-white">{f.title}</h3>
              <p className="mt-1 text-xs text-white/50">{f.desc}</p>
              <span className="mt-3 inline-block rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#D4AF37]">
                Coming Soon
              </span>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

function SpecBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-black/20 px-3 py-2.5 text-center">
      <p className="text-[10px] uppercase tracking-wide text-white/40">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function ArrowRightSmall() {
  return <span className="text-[#00A3FF]">→</span>;
}
