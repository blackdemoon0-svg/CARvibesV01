'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  Car,
  Fuel,
  Cog,
  Users,
  Mountain,
  Heart,
  Gauge,
  DollarSign,
} from 'lucide-react';
import { vehicles, brands, formatPrice, getGalleryUrl } from '@/data';
import { Vehicle } from '@/types';
import { SectionWrapper } from '@/components/layout/Section';
import { ScoreRing } from '@/components/cars/ScoreDisplay';
import { BadgeGroup } from '@/components/cars/Badges';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Answers {
  budget?: [number, number];
  category?: string;
  use?: string;
  fuel?: string;
  transmission?: string;
  seats?: number;
  priorities?: string[];
  brands?: string[];
  climate?: string;
  drivingStyle?: string;
  maintenance?: string;
  used?: string;
}

const budgetOptions = [
  { label: 'Under $10,000', range: [0, 10000] as [number, number] },
  { label: '$10K - $20K', range: [10000, 20000] as [number, number] },
  { label: '$20K - $35K', range: [20000, 35000] as [number, number] },
  { label: '$35K - $50K', range: [35000, 50000] as [number, number] },
  { label: '$50K - $75K', range: [50000, 75000] as [number, number] },
  { label: '$75K - $100K', range: [75000, 100000] as [number, number] },
  { label: '$100K+', range: [100000, 10000000] as [number, number] },
];

const categoryOptions = [
  'Sports Car', 'Luxury Sedan', 'SUV', 'Pickup', 'Hatchback',
  'Coupe', 'Convertible', 'Family Car', 'Electric Vehicle', 'Hybrid',
  'Hypercar', 'Supercar', 'Off Road', 'City Car',
];

const useOptions = [
  'Daily Commute', 'Weekend Fun', 'Road Trips', 'Family', 'Track Days',
  'Business', 'Adventure', 'Luxury', 'City Driving', 'Highway',
];

const fuelOptions = ['Gasoline', 'Diesel', 'Hybrid', 'Plug-in Hybrid', 'Electric', 'Hydrogen', 'No Preference'];
const transmissionOptions = ['Automatic', 'Manual', 'No Preference'];
const seatOptions = [2, 4, 5, 7, 8];
const priorityOptions = [
  'Performance', 'Comfort', 'Luxury', 'Reliability', 'Technology',
  'Fuel Economy', 'Low Maintenance', 'Sound', 'Safety', 'Cargo Space', 'Style', 'Daily Driving',
];
const climateOptions = ['Snow', 'Hot', 'Rain', 'Mixed', 'No Preference'];
const drivingStyleOptions = ['Relaxed', 'Balanced', 'Aggressive', 'Sporty'];
const maintenanceOptions = ['Low', 'Medium', 'High', 'Unlimited'];
const usedOptions = ['Yes', 'No', 'Either'];

const steps = [
  { key: 'budget', title: 'What is your budget?', icon: DollarSign },
  { key: 'category', title: 'Choose vehicle type', icon: Car },
  { key: 'use', title: 'Primary use', icon: Gauge },
  { key: 'fuel', title: 'Fuel preference', icon: Fuel },
  { key: 'transmission', title: 'Transmission', icon: Cog },
  { key: 'seats', title: 'How many seats?', icon: Users },
  { key: 'priorities', title: 'What matters most?', icon: Heart, multi: true },
  { key: 'brands', title: 'Favorite brands', icon: Car, multi: true },
  { key: 'climate', title: 'Your climate', icon: Mountain },
  { key: 'drivingStyle', title: 'Driving style', icon: Gauge },
  { key: 'maintenance', title: 'Maintenance budget', icon: DollarSign },
  { key: 'used', title: 'Would you buy used?', icon: Check },
];

export default function FindMyCarPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<{ vehicle: Vehicle; match: number; reason: string }[]>([]);
  const { isFavorite, toggleFavorite } = useFavorites();

  const totalSteps = steps.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const setAnswer = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMulti = (key: string, value: string) => {
    setAnswers((prev) => {
      const current = (prev as any)[key] as string[] | undefined;
      if (!current) return { ...prev, [key]: [value] };
      if (current.includes(value)) return { ...prev, [key]: current.filter((v) => v !== value) };
      return { ...prev, [key]: [...current, value] };
    });
  };

  const canProceed = () => {
    const stepKey = steps[step].key;
    const val = (answers as any)[stepKey];
    if (steps[step].multi) return Array.isArray(val) && val.length > 0;
    return val !== undefined && val !== '';
  };

  const calculateMatch = (vehicle: Vehicle, a: Answers): { match: number; reason: string } => {
    let score = 0;
    const reasons: string[] = [];

    if (a.budget) {
      if (vehicle.startingPrice >= a.budget[0] && vehicle.startingPrice <= a.budget[1]) {
        score += 20;
        reasons.push('fits your budget perfectly');
      } else if (vehicle.startingPrice > a.budget[1] && vehicle.startingPrice < a.budget[1] * 1.2) {
        score += 10;
      }
    }

    if (a.category && vehicle.category === a.category) {
      score += 20;
      reasons.push('matches your preferred vehicle type');
    } else if (a.category) {
      const similar = a.category.includes('Sports') && vehicle.category.includes('Sports');
      if (similar) { score += 10; }
    }

    if (a.fuel && a.fuel !== 'No Preference' && vehicle.fuelType === a.fuel) {
      score += 15;
      reasons.push(`runs on ${a.fuel.toLowerCase()}`);
    } else if (a.fuel === 'No Preference') {
      score += 5;
    }

    if (a.transmission && a.transmission !== 'No Preference' && vehicle.transmission === a.transmission) {
      score += 10;
    }

    if (a.seats && vehicle.seats >= a.seats) {
      score += 10;
      reasons.push(`has ${vehicle.seats} seats`);
    }

    if (a.priorities && a.priorities.length > 0) {
      a.priorities.forEach((p) => {
        if (p === 'Performance' && vehicle.performanceScore >= 8.5) score += 3;
        if (p === 'Comfort' && vehicle.comfortScore >= 8.5) score += 3;
        if (p === 'Luxury' && vehicle.luxuryScore >= 8.5) score += 3;
        if (p === 'Reliability' && vehicle.reliabilityScore >= 8.5) score += 3;
        if (p === 'Technology' && vehicle.technologyScore >= 8.5) score += 3;
        if (p === 'Fuel Economy' && vehicle.fuelEconomyScore >= 8) score += 3;
        if (p === 'Safety' && vehicle.safetyScore >= 8.5) score += 3;
        if (p === 'Daily Driving' && vehicle.dailyDrivingScore >= 8.5) score += 3;
      });
    }

    if (a.brands && a.brands.length > 0 && a.brands.includes(vehicle.brandId)) {
      score += 15;
      reasons.push('from one of your favorite brands');
    }

    if (a.drivingStyle === 'Sporty' || a.drivingStyle === 'Aggressive') {
      if (vehicle.performanceScore >= 8.5) score += 5;
      if (vehicle.funFactorScore >= 8.5) score += 3;
    }
    if (a.drivingStyle === 'Relaxed') {
      if (vehicle.comfortScore >= 8.5) score += 5;
    }

    if (a.climate === 'Snow' && (vehicle.drivetrain === 'AWD' || vehicle.drivetrain === '4WD')) {
      score += 5;
      reasons.push('AWD for snow conditions');
    }

    if (a.use === 'Track Days' && vehicle.performanceScore >= 9) score += 5;
    if (a.use === 'Family' && vehicle.seats >= 5) score += 5;
    if (a.use === 'City Driving' && vehicle.length < 4600) score += 5;

    const match = Math.min(Math.round((score / 80) * 100), 99);
    const reason = reasons.length > 0
      ? `This ${vehicle.brand} ${vehicle.model} ${reasons.slice(0, 3).join(', ')}.`
      : `A solid match for your preferences with a CarVibes Score of ${vehicle.overallScore}.`;

    return { match, reason };
  };

  const generateResults = () => {
    const scored = vehicles
      .map((v) => ({ vehicle: v, ...calculateMatch(v, answers) }))
      .sort((a, b) => b.match - a.match)
      .slice(0, 6);
    setResults(scored);
  };

  const next = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      generateResults();
      setStep(totalSteps);
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setAnswers({});
    setResults([]);
    setStep(0);
  };

  // Results page
  if (step === totalSteps && results.length > 0) {
    const best = results[0];
    const alternatives = results.slice(1, 5);
    const fav = isFavorite(best.vehicle.id);

    return (
      <SectionWrapper className="py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" /> Your Perfect Match
            </span>
            <h1 className="mt-4 text-4xl font-bold text-white">{best.vehicle.brand} {best.vehicle.model}</h1>
            <p className="mt-2 text-lg text-[#00A3FF]">{best.match}% Match</p>
          </div>

          {/* Best match card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass relative overflow-hidden rounded-3xl p-8 lg:p-12"
          >
            <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#00A3FF]/10 blur-[100px]" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <ScoreRing score={best.vehicle.overallScore} size={80} />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">Match Score</p>
                    <p className="text-3xl font-bold text-[#00A3FF]">{best.match}%</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/70">{best.reason}</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <SpecBox label="Power" value={`${best.vehicle.horsepower} hp`} />
                  <SpecBox label="0-100" value={`${best.vehicle.zeroToHundred}s`} />
                  <SpecBox label="Price" value={formatPrice(best.vehicle.startingPrice)} />
                </div>
                <div className="mt-4">
                  <BadgeGroup badges={best.vehicle.badges} />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/cars/${best.vehicle.id}`} className="rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0077CC] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">
                    View Vehicle
                  </Link>
                  <button
                    onClick={() => toggleFavorite(best.vehicle.id)}
                    className={cn('flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all', fav ? 'border-red-500/40 bg-red-500/15 text-red-400' : 'border-white/10 text-white hover:bg-white/5')}
                  >
                    <Heart className={cn('h-4 w-4', fav && 'fill-current')} />
                    {fav ? 'Saved' : 'Save'}
                  </button>
                  <a href={getGalleryUrl(best.vehicle)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">
                    Gallery
                  </a>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">Why This Car?</h3>
                <div className="space-y-2">
                  {best.vehicle.pros.slice(0, 4).map((pro, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="h-4 w-4 text-[#00C853]" /> {pro}
                    </div>
                  ))}
                </div>
                <div className="pt-3">
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/40">Consider</h3>
                  {best.vehicle.cons.slice(0, 2).map((con, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FFB300]" /> {con}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Alternatives */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Top Alternatives</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {alternatives.map((r, i) => (
                <motion.div
                  key={r.vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link href={`/cars/${r.vehicle.id}`}>
                    <div className="glass glow-blue-hover rounded-2xl p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/40">{r.vehicle.brand}</p>
                          <h3 className="text-sm font-bold text-white">{r.vehicle.model}</h3>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#00A3FF]">{r.match}%</p>
                          <p className="text-[10px] text-white/40">match</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-white/40">Power:</span> <span className="font-semibold text-white">{r.vehicle.horsepower}hp</span></div>
                        <div><span className="text-white/40">0-100:</span> <span className="font-semibold text-white">{r.vehicle.zeroToHundred}s</span></div>
                        <div><span className="text-white/40">Price:</span> <span className="font-semibold text-white">{formatPrice(r.vehicle.startingPrice)}</span></div>
                        <div><span className="text-white/40">Score:</span> <span className="font-semibold text-white">{r.vehicle.overallScore.toFixed(1)}</span></div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={reset}
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Start Over
            </button>
          </div>
        </motion.div>
      </SectionWrapper>
    );
  }

  // Wizard
  const currentStep = steps[step];
  const StepIcon = currentStep.icon;

  return (
    <SectionWrapper className="py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Find Your Perfect Car</h1>
          <p className="mt-2 text-sm text-white/50">Answer a few questions and we&apos;ll match you with the ideal vehicle</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs text-white/50">
            <span>Step {step + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#00A3FF] to-[#0077CC]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-2xl p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00A3FF]/15 text-[#00A3FF]">
              <StepIcon className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-white">{currentStep.title}</h2>
          </div>

          {/* Budget step */}
          {currentStep.key === 'budget' && (
            <div className="grid gap-2">
              {budgetOptions.map((opt) => (
                <OptionButton
                  key={opt.label}
                  selected={JSON.stringify(answers.budget) === JSON.stringify(opt.range)}
                  onClick={() => setAnswer('budget', opt.range)}
                  label={opt.label}
                />
              ))}
            </div>
          )}

          {/* Category step */}
          {currentStep.key === 'category' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {categoryOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={answers.category === opt}
                  onClick={() => setAnswer('category', opt)}
                  label={opt}
                  compact
                />
              ))}
            </div>
          )}

          {/* Use step */}
          {currentStep.key === 'use' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {useOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={answers.use === opt}
                  onClick={() => setAnswer('use', opt)}
                  label={opt}
                  compact
                />
              ))}
            </div>
          )}

          {/* Fuel step */}
          {currentStep.key === 'fuel' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {fuelOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={answers.fuel === opt}
                  onClick={() => setAnswer('fuel', opt)}
                  label={opt}
                  compact
                />
              ))}
            </div>
          )}

          {/* Transmission step */}
          {currentStep.key === 'transmission' && (
            <div className="grid grid-cols-3 gap-2">
              {transmissionOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={answers.transmission === opt}
                  onClick={() => setAnswer('transmission', opt)}
                  label={opt}
                  compact
                />
              ))}
            </div>
          )}

          {/* Seats step */}
          {currentStep.key === 'seats' && (
            <div className="grid grid-cols-5 gap-2">
              {seatOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={answers.seats === opt}
                  onClick={() => setAnswer('seats', opt)}
                  label={`${opt} seats`}
                  compact
                />
              ))}
            </div>
          )}

          {/* Priorities step (multi) */}
          {currentStep.key === 'priorities' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {priorityOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={answers.priorities?.includes(opt) || false}
                  onClick={() => toggleMulti('priorities', opt)}
                  label={opt}
                  compact
                />
              ))}
            </div>
          )}

          {/* Brands step (multi) */}
          {currentStep.key === 'brands' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {brands.map((b) => (
                <OptionButton
                  key={b.id}
                  selected={answers.brands?.includes(b.id) || false}
                  onClick={() => toggleMulti('brands', b.id)}
                  label={b.name}
                  compact
                />
              ))}
            </div>
          )}

          {/* Climate step */}
          {currentStep.key === 'climate' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {climateOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={answers.climate === opt}
                  onClick={() => setAnswer('climate', opt)}
                  label={opt}
                  compact
                />
              ))}
            </div>
          )}

          {/* Driving style step */}
          {currentStep.key === 'drivingStyle' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {drivingStyleOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={answers.drivingStyle === opt}
                  onClick={() => setAnswer('drivingStyle', opt)}
                  label={opt}
                  compact
                />
              ))}
            </div>
          )}

          {/* Maintenance step */}
          {currentStep.key === 'maintenance' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {maintenanceOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={answers.maintenance === opt}
                  onClick={() => setAnswer('maintenance', opt)}
                  label={opt}
                  compact
                />
              ))}
            </div>
          )}

          {/* Used step */}
          {currentStep.key === 'used' && (
            <div className="grid grid-cols-3 gap-2">
              {usedOptions.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={answers.used === opt}
                  onClick={() => setAnswer('used', opt)}
                  label={opt}
                  compact
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <button
            onClick={next}
            disabled={!canProceed()}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0077CC] px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            {step === totalSteps - 1 ? 'Get Results' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}

function OptionButton({ selected, onClick, label, compact }: { selected: boolean; onClick: () => void; label: string; compact?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-xl border text-sm font-medium transition-all',
        compact ? 'px-3 py-2.5' : 'px-4 py-3.5',
        selected
          ? 'border-[#00A3FF]/50 bg-[#00A3FF]/15 text-white glow-blue'
          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white'
      )}
    >
      {label}
    </button>
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
