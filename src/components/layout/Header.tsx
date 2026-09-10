'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Plus,
  Play,
  Search,
  Bell,
  Sun,
  Moon,
  ShieldAlert,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const router = useRouter();

  const handleRunDemo = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.2 }
      });
    } catch {
      // ignore
    }
    router.push('/transform?demo=true');
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
      {/* Title / Breadcrumb */}
      <div>
        {title ? (
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold text-white tracking-tight">{title}</h1>
            {subtitle && <span className="text-xs text-slate-400 font-normal">| {subtitle}</span>}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-brand-400 font-medium">TransformAI Enterprise</span>
            <span>/</span>
            <span className="text-slate-200">Autonomous Content Transformation</span>
          </div>
        )}
      </div>

      {/* Action Buttons & Fast Demo Launcher */}
      <div className="flex items-center gap-3">
        {/* Prominent Try Demo Button */}
        <button
          onClick={handleRunDemo}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:from-amber-500/30 hover:to-orange-500/30 hover:border-amber-400 text-xs font-semibold transition-all shadow-sm group"
          title="Instantly run the end-to-end Cyber Incident Demo with 7 deliverables"
        >
          <Play className="w-3.5 h-3.5 fill-amber-300 group-hover:scale-110 transition-transform" />
          <span>Try 1-Click Demo</span>
          <span className="text-[10px] bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded font-mono">
            LIVE
          </span>
        </button>

        {/* Primary CTA */}
        <Link
          href="/transform"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all shadow-md shadow-brand-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Transformation</span>
        </Link>
      </div>
    </header>
  );
}
