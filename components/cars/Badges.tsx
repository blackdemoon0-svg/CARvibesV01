import { VehicleBadge } from '@/types';
import { Flame, Zap, Trophy, Crown, Flag, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';

const badgeConfig: Record<VehicleBadge, { icon: typeof Flame; color: string; bg: string }> = {
  'New': { icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/30' },
  'Electric': { icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-500/15 border-cyan-500/30' },
  'Best Seller': { icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/15 border-yellow-500/30' },
  'Luxury': { icon: Crown, color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/15 border-[#D4AF37]/30' },
  'Track Focused': { icon: Flag, color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/30' },
  'Limited Edition': { icon: Gem, color: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/30' },
};

export function Badge({ badge, className }: { badge: VehicleBadge; className?: string }) {
  const config = badgeConfig[badge];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
        config.bg,
        config.color,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {badge}
    </span>
  );
}

export function BadgeGroup({ badges, className }: { badges: VehicleBadge[]; className?: string }) {
  if (!badges.length) return null;
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {badges.map((badge) => (
        <Badge key={badge} badge={badge} />
      ))}
    </div>
  );
}

const colorNames: Record<string, string> = {
  '#0B0B0B': 'Black',
  '#FFFFFF': 'White',
  '#1C3A5C': 'Blue',
  '#8B0000': 'Red',
  '#FFD700': 'Gold',
  '#C0C0C0': 'Silver',
  '#2F4F4F': 'Gray',
  '#006600': 'Green',
  '#02584B': 'Teal',
  '#E10600': 'Red',
  '#9B1C26': 'Burgundy',
  '#1A2A3A': 'Navy',
  '#FF8000': 'Orange',
  '#C5B358': 'Bronze',
  '#8B7355': 'Bronze',
  '#FFCC33': 'Yellow',
};

export function ColorCircles({ colors, max = 6 }: { colors: string[]; max?: number }) {
  if (!colors.length) return null;
  const display = colors.slice(0, max);

  return (
    <div className="flex items-center gap-1.5">
      {display.map((color, i) => {
        const name = colorNames[color] || 'Custom';
        const isLight = color === '#FFFFFF' || color === '#C0C0C0' || color === '#FFD700' || color === '#C5B358' || color === '#FFCC33';
        return (
          <div
            key={i}
            className={`h-5 w-5 rounded-full border ${isLight ? 'border-white/20' : 'border-white/10'}`}
            style={{ backgroundColor: color }}
            title={name}
            aria-label={name}
          />
        );
      })}
      {colors.length > max && (
        <span className="text-[10px] text-white/50">+{colors.length - max}</span>
      )}
    </div>
  );
}
