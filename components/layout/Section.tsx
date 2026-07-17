'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, href, hrefLabel = 'View All', className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-8 flex items-end justify-between gap-4', className)}>
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-sm text-white/50"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 text-sm font-medium text-[#00A3FF] transition-colors hover:text-[#33B5FF]"
        >
          {hrefLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8', className)}>
      {children}
    </section>
  );
}
