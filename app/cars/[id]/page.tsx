'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
Heart,
Scale,
Camera,
Gauge,
Zap,
Fuel,
Cog,
Weight,
Ruler,
Route,
Award,
CheckCircle2,
XCircle,
ChevronRight,
} from 'lucide-react';

import {
getVehicle,
getRelatedVehicles,
getGalleryUrl,
formatPrice,
getBrand,
} from '@/data';

import {
ScoreRing,
ScoreBar,
RatingStars,
} from '@/components/cars/ScoreDisplay';

import {
BadgeGroup,
ColorCircles,
} from '@/components/cars/Badges';

import { VehicleCard } from '@/components/cars/VehicleCard';
import { SectionWrapper } from '@/components/layout/Section';
import { useFavorites } from '@/hooks/useFavorites';
import { useCompare } from '@/hooks/useCompare';
import { useRecentlyViewed } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface PageProps {
params: {
id: string;
};
}

export default function VehicleDetailPage({ params }: PageProps) {
const { id } = params;

const {
isFavorite,
toggleFavorite,
} = useFavorites();

const {
isInCompare,
toggleCompare,
compareCount,
} = useCompare();

const {
addRecentlyViewed,
} = useRecentlyViewed();

const vehicle = getVehicle(id);

useEffect(() => {
if (vehicle) {
addRecentlyViewed(vehicle.id);
}
}, [vehicle, addRecentlyViewed]);

if (!vehicle) {
notFound();
}

const brand = getBrand(vehicle.brandId);
const related = getRelatedVehicles(vehicle, 4);

const fav = isFavorite(vehicle.id);
const inCompare = isInCompare(vehicle.id);

const specGroups = [
{
title: 'Performance',
icon: <Gauge className="h-4 w-4" />,
specs: [
{
label: 'Horsepower',
value: `${vehicle.horsepower} hp`,
},
{
label: 'Torque',
value: `${vehicle.torque} Nm`,
},
{
label: '0-100 km/h',
value: `${vehicle.zeroToHundred}s`,
},
...(vehicle.zeroToTwoHundred
? [
{
label: '0-200 km/h',
value: `${vehicle.zeroToTwoHundred}s`,
},
]
: []),
...(vehicle.quarterMile
? [
{
label: 'Quarter Mile',
value: `${vehicle.quarterMile}s`,
},
]
: []),
{
label: 'Top Speed',
value: `${vehicle.topSpeed} km/h`,
},
...(vehicle.brakingDistance
? [
{
label: 'Braking 100-0',
value: `${vehicle.brakingDistance} m`,
},
]
: []),
],
},

```
{
  title: 'Engine',
  icon: <Zap className="h-4 w-4" />,
  specs: [
    {
      label: 'Engine',
      value: vehicle.engine,
    },
    {
      label: 'Engine Code',
      value: vehicle.engineCode,
    },
    {
      label: 'Type',
      value: vehicle.engineType,
    },
    {
      label: 'Displacement',
      value: vehicle.displacement,
    },
    {
      label: 'Turbocharged',
      value: vehicle.turbocharged ? 'Yes' : 'No',
    },
    {
      label: 'Transmission',
      value: vehicle.transmission,
    },
    {
      label: 'Drivetrain',
      value: vehicle.drivetrain,
    },
  ],
},

{
  title: 'Fuel & Efficiency',
  icon: <Fuel className="h-4 w-4" />,
  specs: [
    {
      label: 'Fuel Type',
      value: vehicle.fuelType,
    },
    {
      label: 'Fuel Tank',
      value:
        vehicle.fuelTank > 0
          ? `${vehicle.fuelTank} L`
          : 'N/A',
    },
    ...(vehicle.fuelEconomy
      ? [
          {
            label: 'Fuel Economy',
            value: `${vehicle.fuelEconomy} mpg`,
          },
        ]
      : []),
    ...(vehicle.co2Emissions
      ? [
          {
            label: 'CO₂ Emissions',
            value: `${vehicle.co2Emissions} g/km`,
          },
        ]
      : []),
    ...(vehicle.batteryCapacity
      ? [
          {
            label: 'Battery',
            value: `${vehicle.batteryCapacity} kWh`,
          },
        ]
      : []),
    ...(vehicle.range
      ? [
          {
            label: 'Range',
            value: `${vehicle.range} km`,
          },
        ]
      : []),
    ...(vehicle.chargingSpeed
      ? [
          {
            label: 'Charging',
            value: vehicle.chargingSpeed,
          },
        ]
      : []),
  ],
},

{
  title: 'Dimensions',
  icon: <Ruler className="h-4 w-4" />,
  specs: [
    {
      label: 'Body Style',
      value: vehicle.bodyStyle,
    },
    {
      label: 'Doors',
      value: String(vehicle.doors),
    },
    {
      label: 'Seats',
      value: String(vehicle.seats),
    },
    {
      label: 'Length',
      value: `${vehicle.length} mm`,
    },
    {
      label: 'Width',
      value: `${vehicle.width} mm`,
    },
    {
      label: 'Height',
      value: `${vehicle.height} mm`,
    },
    {
      label: 'Wheelbase',
      value: `${vehicle.wheelbase} mm`,
    },
    {
      label: 'Cargo Volume',
      value: `${vehicle.cargoVolume} L`,
    },
    ...(vehicle.towingCapacity
      ? [
          {
            label: 'Towing',
            value: `${vehicle.towingCapacity} kg`,
          },
        ]
      : []),
  ],
},

{
  title: 'Weight',
  icon: <Weight className="h-4 w-4" />,
  specs: [
    {
      label: 'Curb Weight',
      value: `${vehicle.weight} kg`,
    },
    {
      label: 'Power-to-Weight',
      value: `${(
        (vehicle.horsepower / vehicle.weight) *
        1000
      ).toFixed(0)} hp/ton`,
    },
  ],
},
```

];

const scoreBars = [
{
label: 'Performance',
value: vehicle.performanceScore,
},
{
label: 'Luxury',
value: vehicle.luxuryScore,
},
{
label: 'Comfort',
value: vehicle.comfortScore,
},
{
label: 'Technology',
value: vehicle.technologyScore,
},
{
label: 'Reliability',
value: vehicle.reliabilityScore,
},
{
label: 'Safety',
value: vehicle.safetyScore,
},
{
label: 'Daily Driving',
value: vehicle.dailyDrivingScore,
},
{
label: 'Fuel Economy',
value: vehicle.fuelEconomyScore,
},
{
label: 'Sound',
value: vehicle.soundScore,
},
{
label: 'Fun Factor',
value: vehicle.funFactorScore,
},
];

const performanceBars = [
{
label: 'Power',
value: Math.min(vehicle.horsepower / 10, 10),
},
{
label: 'Acceleration',
value: Math.max(0, 10 - vehicle.zeroToHundred),
},
{
label: 'Top Speed',
value: Math.min(vehicle.topSpeed / 35, 10),
},
{
label: 'Comfort',
value: vehicle.comfortScore,
},
{
label: 'Luxury',
value: vehicle.luxuryScore,
},
{
label: 'Efficiency',
value: vehicle.fuelEconomyScore,
},
{
label: 'Technology',
value: vehicle.technologyScore,
},
{
label: 'Handling',
value: vehicle.funFactorScore,
},
];

return (
<> <section className="relative overflow-hidden border-b border-white/8"> <div className="absolute inset-0"> <div className="absolute inset-0 grid-bg opacity-30" />

```
      <div className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#00A3FF]/10 blur-[120px]" />

      <div className="absolute bottom-0 left-0 h-[200px] w-full bg-gradient-to-t from-[#0B0B0B] to-transparent" />
    </div>

    <SectionWrapper className="relative z-10 py-10">
      <div className="mb-8 flex items-center gap-2 text-xs text-white/40">
        <Link href="/" className="hover:text-white">
          Home
        </Link>

        <span>/</span>

        <Link href="/cars" className="hover:text-white">
          Cars
        </Link>

        <span>/</span>

        <Link
          href={`/brands/${vehicle.brandId}`}
          className="hover:text-white"
        >
          {brand?.name ?? vehicle.brand}
        </Link>

        <span>/</span>

        <span className="text-white/60">
          {vehicle.model}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-medium text-white/50">
              {vehicle.brand}
            </span>

            <span className="text-white/30">·</span>

            <span className="text-sm text-white/50">
              {vehicle.year}
            </span>

            <span className="text-white/30">·</span>

            <span className="text-sm text-white/50">
              {vehicle.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {vehicle.brand} {vehicle.model}
          </h1>

          {vehicle.badges?.length > 0 && (
            <div className="mt-4">
              <BadgeGroup badges={vehicle.badges} />
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <QuickSpec
              icon={<Zap className="h-4 w-4" />}
              label="Power"
              value={`${vehicle.horsepower} hp`}
            />

            <QuickSpec
              icon={<Gauge className="h-4 w-4" />}
              label="0-100"
              value={`${vehicle.zeroToHundred}s`}
            />

            <QuickSpec
              icon={<Route className="h-4 w-4" />}
              label="Top Speed"
              value={`${vehicle.topSpeed} km/h`}
            />

            <QuickSpec
              icon={<Cog className="h-4 w-4" />}
              label="Drivetrain"
              value={vehicle.drivetrain}
            />
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
              Available Colors
            </p>

            <ColorCircles colors={vehicle.availableColors} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="glass w-full rounded-2xl p-6 lg:w-80"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/40">
                CarVibes Score
              </p>

              <div className="mt-1 flex items-center gap-2">
                <RatingStars score={vehicle.overallScore} />
              </div>
            </div>

            <ScoreRing
              score={vehicle.overallScore}
              size={64}
            />
          </div>

          <div className="my-5 h-px bg-white/8" />

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/40">
                Starting Price
              </p>

              <p className="text-2xl font-bold text-white">
                {formatPrice(vehicle.startingPrice)}
              </p>
            </div>

            {vehicle.highestTrimPrice >
              vehicle.startingPrice && (
              <p className="text-xs text-white/40">
                up to {formatPrice(vehicle.highestTrimPrice)}
              </p>
            )}
          </div>

          <div className="mt-5 space-y-2">
            <button
              onClick={() =>
                toggleFavorite(vehicle.id)
              }
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all',
                fav
                  ? 'border-red-500/40 bg-red-500/15 text-red-400'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              )}
            >
              <Heart
                className={cn(
                  'h-4 w-4',
                  fav && 'fill-current'
                )}
              />

              {fav
                ? 'Saved to Favorites'
                : 'Save to Favorites'}
            </button>

            <button
              onClick={() => {
                if (
                  !inCompare &&
                  compareCount >= 3
                ) {
                  return;
                }

                toggleCompare(vehicle.id);
              }}
              disabled={
                !inCompare &&
                compareCount >= 3
              }
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all',
                inCompare
                  ? 'border-[#00A3FF]/40 bg-[#00A3FF]/15 text-[#00A3FF]'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10',
                !inCompare &&
                  compareCount >= 3 &&
                  'cursor-not-allowed opacity-40'
              )}
            >
              <Scale className="h-4 w-4" />

              {inCompare
                ? 'In Comparison'
                : 'Add to Compare'}
            </button>

            <a
              href={getGalleryUrl(vehicle)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0077CC] px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              <Camera className="h-4 w-4" />

              Explore Gallery

              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  </section>

  <SectionWrapper className="py-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass max-w-3xl rounded-2xl p-6"
    >
      <p className="text-base leading-relaxed text-white/70">
        {vehicle.description}
      </p>
    </motion.div>
  </SectionWrapper>

  <SectionWrapper className="py-8">
    <div className="grid gap-6 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <div className="mb-6 flex items-center gap-2">
          <Award className="h-5 w-5 text-[#D4AF37]" />

          <h2 className="text-lg font-bold text-white">
            CarVibes Score Breakdown
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {scoreBars.map((score) => (
            <ScoreBar
              key={score.label}
              label={score.label}
              value={score.value}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <div className="mb-6 flex items-center gap-2">
          <Gauge className="h-5 w-5 text-[#00A3FF]" />

          <h2 className="text-lg font-bold text-white">
            Performance Metrics
          </h2>
        </div>

        <div className="space-y-4">
          {performanceBars.map((score) => (
            <ScoreBar
              key={score.label}
              label={score.label}
              value={score.value}
            />
          ))}
        </div>
      </motion.div>
    </div>
  </SectionWrapper>

  <SectionWrapper className="py-8">
    <h2 className="mb-6 text-2xl font-bold text-white">
      Specifications
    </h2>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {specGroups.map((group, index) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.08,
          }}
          className="glass rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[#00A3FF]">
              {group.icon}
            </span>

            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              {group.title}
            </h3>
          </div>

          <dl className="space-y-2.5">
            {group.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <dt className="text-white/50">
                  {spec.label}
                </dt>

                <dd className="text-right font-semibold text-white">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>

  <SectionWrapper className="py-8">
    <div className="grid gap-4 sm:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <CheckCircle2 className="h-5 w-5 text-[#00C853]" />

          Advantages
        </h3>

        <ul className="space-y-3">
          {vehicle.pros.map((pro, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-white/70"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00C853]" />

              {pro}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <XCircle className="h-5 w-5 text-[#FF3D57]" />

          Disadvantages
        </h3>

        <ul className="space-y-3">
          {vehicle.cons.map((con, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-white/70"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF3D57]" />

              {con}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </SectionWrapper>

  <SectionWrapper className="py-8">
    <h2 className="mb-6 text-2xl font-bold text-white">
      Similar Vehicles
    </h2>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {related.map((relatedVehicle, index) => (
        <VehicleCard
          key={relatedVehicle.id}
          vehicle={relatedVehicle}
          index={index}
        />
      ))}
    </div>
  </SectionWrapper>
</>
```

);
}

function QuickSpec({
icon,
label,
value,
}: {
icon: React.ReactNode;
label: string;
value: string;
}) {
return ( <div className="rounded-lg border border-white/8 bg-black/20 p-3"> <div className="flex items-center gap-1.5 text-white/40">
{icon}

```
    <span className="text-[10px] uppercase tracking-wide">
      {label}
    </span>
  </div>

  <p className="mt-1 text-sm font-bold text-white">
    {value}
  </p>
</div>
```

);
}
