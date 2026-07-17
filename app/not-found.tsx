'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E10600]/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-8xl font-bold tracking-tight text-white/10">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-white">Oops... This road doesn&apos;t exist.</h2>
        <p className="mt-2 text-sm text-white/50">The page you&apos;re looking for has taken a wrong turn.</p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0077CC] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            <Search className="h-4 w-4" />
            Search Vehicles
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
