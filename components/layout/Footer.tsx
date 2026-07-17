'use client';

import Link from 'next/link';
import { Car, Youtube, Instagram, Mail, Github } from 'lucide-react';

const footerLinks = {
  Discover: [
    { href: '/brands', label: 'All Brands' },
    { href: '/cars', label: 'All Cars' },
    { href: '/find-my-car', label: 'Find My Car' },
    { href: '/compare', label: 'Compare' },
  ],
  Account: [
    { href: '/favorites', label: 'Favorites' },
    { href: '/garage', label: 'My Garage' },
    { href: '/search', label: 'Search' },
    { href: '/news', label: 'News' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/youtube', label: 'YouTube' },
  ],
};

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/8 bg-[#0B0B0B]">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#00A3FF] to-[#0077CC]">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Car<span className="text-[#00A3FF]">Vibes</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Find your perfect car. Discover, compare, and explore hundreds of vehicles
              on the world&apos;s most beautiful automotive platform.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="http://www.youtube.com/@CarVibes-m6i"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-white/20 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-white/20 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@carvibes.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-white/20 hover:text-white"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} CarVibes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-white/40 hover:text-white/70">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-xs text-white/40 hover:text-white/70">
              Terms of Service
            </Link>
            <Link href="/about" className="text-xs text-white/40 hover:text-white/70">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
