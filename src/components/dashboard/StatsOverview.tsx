'use client';

import React from 'react';
import {
  Sparkles,
  FileText,
  Layers,
  Clock,
  CheckCircle2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { TransformationStats } from '@/types';

interface StatsOverviewProps {
  stats: TransformationStats;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      title: 'Transformations',
      value: stats.totalTransformations.toString(),
      subtext: '+4 this week',
      icon: Sparkles,
      color: 'text-brand-400',
      bg: 'bg-brand-500/10',
      border: 'border-brand-500/20'
    },
    {
      title: 'Documents Processed',
      value: stats.documentsProcessed.toString(),
      subtext: 'PDF, DOCX, OCR, Audio',
      icon: FileText,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      title: 'Outputs Generated',
      value: stats.outputsGenerated.toString(),
      subtext: '10 output formats supported',
      icon: Layers,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20'
    },
    {
      title: 'Time Saved',
      value: `${stats.timeSavedHours} Hours`,
      subtext: '~$14,200 Enterprise Value',
      icon: Clock,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`p-5 rounded-xl bg-slate-900/80 border ${card.border} flex flex-col justify-between transition-all hover:bg-slate-900/95 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">{card.title}</span>
              <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">{card.value}</div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{card.subtext}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
