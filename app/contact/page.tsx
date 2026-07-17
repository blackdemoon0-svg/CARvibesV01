'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Youtube, Instagram, Send, CheckCircle2 } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/Section';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <SectionWrapper className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <h1 className="text-3xl font-bold text-white">Contact Us</h1>
        <p className="mt-2 text-sm text-white/50">
          Have a question, suggestion, or partnership idea? We&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="mb-4 h-12 w-12 text-[#00C853]" />
              <p className="text-lg font-bold text-white">Message Sent!</p>
              <p className="mt-1 text-sm text-white/50">We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/40">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#00A3FF]/40 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/40">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#00A3FF]/40 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/40">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#00A3FF]/40 focus:outline-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0077CC] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="glass rounded-2xl p-6">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-white/40">Connect</h3>
            <div className="space-y-3">
              <a href="mailto:hello@carvibes.com" className="flex items-center gap-3 text-sm text-white/70 hover:text-white">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5"><Mail className="h-4 w-4" /></div>
                hello@carvibes.com
              </a>
              <a href="http://www.youtube.com/@CarVibes-m6i" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/70 hover:text-white">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5"><Youtube className="h-4 w-4" /></div>
                @CarVibes-m6i
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/70 hover:text-white">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5"><Instagram className="h-4 w-4" /></div>
                @carvibes
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
