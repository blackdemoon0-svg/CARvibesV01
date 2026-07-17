'use client';

import { motion } from 'framer-motion';
import { Zap, Crown, Gauge, Cpu, Globe2, TrendingUp } from 'lucide-react';
import { SectionWrapper, SectionHeading } from '@/components/layout/Section';
import Link from 'next/link';

const newsArticles = [
  {
    id: 1,
    category: 'Electric',
    title: 'The EV Revolution: 2026\'s Most Anticipated Electric Cars',
    excerpt: 'From the Tesla Cybertruck to the Hyundai IONIQ 5 N, electric vehicles are reshaping the automotive landscape at unprecedented speed.',
    date: '2025-01-15',
    readTime: 5,
    featured: true,
  },
  {
    id: 2,
    category: 'Performance',
    title: 'Hypercar Wars: Bugatti, Koenigsegg, and the 500 km/h Barrier',
    excerpt: 'The quest for 500 km/h continues as Bugatti and Koenigsegg push the boundaries of what\'s mechanically possible.',
    date: '2025-01-12',
    readTime: 7,
  },
  {
    id: 3,
    category: 'Luxury',
    title: 'Rolls-Royce Spectre: Is This the Ultimate Electric Luxury Car?',
    excerpt: 'A 3-ton electric Rolls-Royce with 520 km of range and absolute silence. We examine whether luxury and electricity can truly coexist.',
    date: '2025-01-10',
    readTime: 6,
  },
  {
    id: 4,
    category: 'Industry',
    title: 'The Death of the V8: Why Manufacturers Are Saying Goodbye',
    excerpt: 'As emissions regulations tighten, the V8 engine is becoming endangered. Which brands are keeping the flame alive?',
    date: '2025-01-08',
    readTime: 8,
  },
  {
    id: 5,
    category: 'Technology',
    title: 'AI Car Advisors: How Artificial Intelligence Is Changing Car Buying',
    excerpt: 'Platforms like CarVibes are using AI to match buyers with their perfect vehicle. Is this the end of traditional dealerships?',
    date: '2025-01-05',
    readTime: 5,
  },
  {
    id: 6,
    category: 'SUV',
    title: 'Super SUVs: When 600+ Horsepower Meets Family Practicality',
    excerpt: 'The Porsche Cayenne Turbo GT, Lamborghini Urus Performante, and Aston Martin DBX707 prove that SUVs can be genuinely exciting.',
    date: '2025-01-03',
    readTime: 6,
  },
];

const categories = ['Electric', 'Luxury', 'Performance', 'Industry', 'Technology', 'SUV'];

export default function NewsPage() {
  const featured = newsArticles.find((a) => a.featured)!;
  const rest = newsArticles.filter((a) => !a.featured);

  return (
    <SectionWrapper className="py-8">
      <h1 className="text-3xl font-bold text-white">Automotive News</h1>
      <p className="mt-1 text-sm text-white/50">The latest from the world of automobiles</p>

      {/* Category pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span key={cat} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60">
            {cat}
          </span>
        ))}
      </div>

      {/* Featured article */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass mt-8 overflow-hidden rounded-3xl p-8 lg:p-12"
      >
        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-[#00A3FF]/10 blur-[100px]" />
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00A3FF]/30 bg-[#00A3FF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#00A3FF]">
            Featured · {featured.category}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">{featured.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">{featured.excerpt}</p>
          <div className="mt-6 flex items-center gap-4 text-xs text-white/40">
            <span>{featured.date}</span>
            <span>·</span>
            <span>{featured.readTime} min read</span>
          </div>
        </div>
      </motion.div>

      {/* Article grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass glow-blue-hover rounded-2xl p-6"
          >
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/60">
              {article.category}
            </span>
            <h3 className="mt-3 text-lg font-bold leading-tight text-white">{article.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{article.excerpt}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-white/40">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
