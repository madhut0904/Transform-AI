'use client';

import React, { useState, useEffect } from 'react';
import HeroDemoBanner from '@/components/dashboard/HeroDemoBanner';
import StatsOverview from '@/components/dashboard/StatsOverview';
import RecentTransformations from '@/components/dashboard/RecentTransformations';
import {
  deleteTransformation,
  getOverallStats,
  getStoredTransformations
} from '@/lib/storage';
import { Transformation, TransformationStats } from '@/types';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  FileCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function DashboardPage() {
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [stats, setStats] = useState<TransformationStats>({
    totalTransformations: 18,
    documentsProcessed: 24,
    outputsGenerated: 114,
    timeSavedHours: 85,
    avgGenerationTimeSeconds: 3.8,
    consistencyScoreAvg: 96.4
  });

  useEffect(() => {
    const list = getStoredTransformations();
    setTransformations(list);
    setStats(getOverallStats(list));
  }, []);

  const handleDelete = (id: string) => {
    deleteTransformation(id);
    const updated = transformations.filter((t) => t.id !== id);
    setTransformations(updated);
    setStats(getOverallStats(updated));
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner with Quick Demo Button */}
      <HeroDemoBanner />

      {/* Metrics Overview */}
      <StatsOverview stats={stats} />

      {/* Value Proposition Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500/15 text-brand-400 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Canonical Content Model</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Eliminates hallucination and drift by structuring a single factual graph before generating deliverables.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Cross-Deliverable Verification</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automated factual consistency validation checks numbers, dates, organizations, and claims across all formats.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">10 Enterprise Deliverables</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Instantly generate Executive Summaries, Advisories, Slide Decks, Infographics, Videos, Threads & Press Releases.
          </p>
        </div>
      </div>

      {/* Recent Transformations Table */}
      <RecentTransformations
        transformations={transformations}
        onDelete={handleDelete}
      />
    </div>
  );
}
