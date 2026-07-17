'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScoreRingProps {
  score: number;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

export function ScoreRing({ score, size = 64, className, showLabel = true }: ScoreRingProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (score / 10) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={4}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#0077CC" />
          </linearGradient>
        </defs>
      </svg>
      {showLabel && (
        <span className="absolute text-sm font-bold text-white">
          {score.toFixed(1)}
        </span>
      )}
    </div>
  );
}

interface ScoreBarProps {
  label: string;
  value: number;
  max?: number;
  icon?: React.ReactNode;
}

export function ScoreBar({ label, value, max = 10, icon }: ScoreBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-white/70">
          {icon}
          {label}
        </span>
        <span className="font-semibold text-white">{value.toFixed(1)}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#00A3FF] to-[#0077CC]"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  );
}

interface RatingStarsProps {
  score: number;
  max?: number;
  size?: number;
}

export function RatingStars({ score, max = 10, size = 14 }: RatingStarsProps) {
  const stars = 5;
  const filled = (score / max) * stars;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: stars }).map((_, i) => {
        const fillLevel = Math.max(0, Math.min(1, filled - i));
        return (
          <div key={i} className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="rgba(255,255,255,0.15)"
              />
            </svg>
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillLevel * 100}%` }}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="#D4AF37"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
