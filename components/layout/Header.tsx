'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Search,
  Heart,
  Scale,
  Sparkles,
  Car,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/useFavorites';
import { useCompare } from '@/hooks/useCompare';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/brands', label: 'Brands' },
  { href: '/cars', label: 'Cars' },
  { href: '/find-my-car', label: 'Find My Car' },
  { href: '/compare', label: 'Compare' },
  { href: '/news', label: 'News' },
  { href: '/garage', label: 'Garage' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites } = useFavorites();
  const { compareCount } = useCompare();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass-strong border-b border-white/8 py-3'
            : 'border-b border-transparent py-5'
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#00A3FF] to-[#0077CC]">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Car<span className="text-[#00A3FF]">Vibes</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/8"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/8 hover:text-white"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/favorites"
              className="relative hidden h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/8 hover:text-white sm:flex"
              aria-label="Favorites"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E10600] px-1 text-[10px] font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              href="/compare"
              className="relative hidden h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/8 hover:text-white sm:flex"
              aria-label="Compare"
            >
              <Scale className="h-5 w-5" />
              {compareCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#00A3FF] px-1 text-[10px] font-bold text-white">
                  {compareCount}
                </span>
              )}
            </Link>

            <Link
              href="/find-my-car"
              className="hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#00A3FF] to-[#0077CC] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 md:flex"
            >
              <Sparkles className="h-4 w-4" />
              Find My Car
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/8 hover:text-white lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mx-auto max-w-[1440px] px-4 pt-3 sm:px-6 lg:px-8">
                <form
                  action="/search"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                >
                  <Search className="h-5 w-5 text-white/40" />
                  <input
                    name="q"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by brand, model, year..."
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
                    autoFocus
                  />
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="rounded-lg bg-[#00A3FF] px-3 py-1.5 text-sm font-semibold text-white"
                  >
                    Search
                  </Link>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass-strong absolute right-0 top-0 h-full w-72 overflow-y-auto p-6 pt-24"
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                ))}
                <Link
                  href="/favorites"
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
                >
                  Favorites ({favorites.length})
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
                <Link
                  href="/find-my-car"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#00A3FF] to-[#0077CC] px-4 py-3 text-sm font-semibold text-white"
                >
                  <Sparkles className="h-4 w-4" />
                  Find My Car
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
