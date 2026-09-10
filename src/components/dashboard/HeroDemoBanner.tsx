'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  Play,
  Layers,
  FileCheck,
  Zap,
  ShieldAlert,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeroDemoBanner() {
  const router = useRouter();

  const handleRunDemo = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.3 }
      });
    } catch {
      // ignore
    }
    router.push('/transform?demo=true');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8 shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute -right-16 -top-16 w-80 h-80 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        {/* Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-4">
          <Zap className="w-3.5 h-3.5 text-brand-400" />
          <span>ONE SOURCE. EVERY COMMUNICATION FORMAT.</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          Good evening 👋
        </h1>
        <p className="text-base text-slate-300 leading-relaxed mb-6">
          Transform raw intelligence, incident reports, research, or policy documents into tailored, high-fidelity deliverables across executive, technical, and public communication channels.
        </p>

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/transform"
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all shadow-lg shadow-brand-600/25 group"
          >
            <Sparkles className="w-4 h-4 text-brand-200 group-hover:rotate-12 transition-transform" />
            <span>+ New Transformation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={handleRunDemo}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-semibold text-sm transition-all shadow-md group"
          >
            <Play className="w-4 h-4 fill-amber-300 group-hover:scale-110 transition-transform" />
            <span>Try 1-Click Interactive Demo</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 font-mono">
              Cybersecurity Incident
            </span>
          </button>

          <Link
            href="/templates"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm border border-slate-700/60 transition-all"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Browse Templates</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
