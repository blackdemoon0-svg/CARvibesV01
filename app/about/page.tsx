'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Zap, Award, Globe2, Heart } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/Section';
import { brands, vehicles } from '@/data';

export default function AboutPage() {
  const values = [
    { icon: Target, title: 'Our Mission', desc: 'Help every car enthusiast find their perfect vehicle through intelligent recommendations and comprehensive data.' },
    { icon: Eye, title: 'Our Vision', desc: 'To become the world\'s most beautiful and trusted automotive discovery platform, serving millions of users.' },
    { icon: Zap, title: 'Why CarVibes?', desc: 'We combine passion for cars with cutting-edge technology to create an experience that feels like talking to an expert.' },
    { icon: Award, title: 'Quality First', desc: 'Every spec, every score, every recommendation is backed by real data. No fake information, ever.' },
  ];

  return (
    <SectionWrapper className="py-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl font-bold tracking-tight text-white">About CarVibes</h1>
        <p className="mt-4 text-lg leading-relaxed text-white/60">
          CarVibes is an automotive discovery platform built for enthusiasts, by enthusiasts.
          We believe cars are more than transportation — they represent passion, engineering,
          lifestyle, and emotion. Our mission is to help you find the vehicle that matches your story.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Brands', value: `${brands.length}+` },
          { label: 'Vehicles', value: `${vehicles.length}+` },
          { label: 'Categories', value: '15+' },
          { label: 'CarVibes Score', value: '10/10' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-white/40">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Values */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-2xl p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00A3FF]/15 text-[#00A3FF]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{v.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Future goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass mt-8 rounded-2xl p-8"
      >
        <h2 className="text-xl font-bold text-white">Future Goals</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          CarVibes is designed to evolve. We&apos;re building toward an AI-powered car advisor,
          a garage customization studio, a marketplace, community reviews, and a mobile app.
          The platform is architecturally ready for thousands of vehicles and millions of users.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {['AI Car Advisor', 'Garage Studio', 'Marketplace', 'Community Reviews', 'Mobile App', 'Insurance Calculator'].map((f) => (
            <span key={f} className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-medium text-[#D4AF37]">
              {f}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
