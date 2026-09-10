'use client';

import React from 'react';
import {
  PieChart,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Network,
  Activity,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';
import { InfographicContent } from '@/types';

interface InfographicBlueprintViewProps {
  content: InfographicContent;
}

export default function InfographicBlueprintView({ content }: InfographicBlueprintViewProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-brand-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-indigo-400" />;
      default:
        return <Cpu className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Visual Infographic Blueprint & Layout</div>
            <div className="text-[10px] text-slate-400 font-mono">
              Ready for Figma / Canva / Adobe Illustrator Export
            </div>
          </div>
        </div>
      </div>

      {/* Visual Infographic Card Canvas */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-slate-800 p-8 shadow-2xl space-y-7 max-w-4xl mx-auto font-sans relative overflow-hidden">
        {/* Glow */}
        <div className="absolute right-0 top-0 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Infographic Header */}
        <div className="text-center space-y-2 relative z-10">
          <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-mono font-bold uppercase tracking-wider border border-brand-500/30">
            INFOGRAPHIC BLUEPRINT
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {content.headline}
          </h1>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Hero Metric Callout */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-brand-500/40 text-center space-y-1 relative z-10 shadow-xl">
          <div className="text-xs font-mono uppercase text-brand-300 tracking-wider font-semibold">
            {content.keyMetric.label}
          </div>
          <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-200 to-emerald-400 font-mono tracking-tight">
            {content.keyMetric.value}
          </div>
          {content.keyMetric.trend && (
            <div className="text-xs text-emerald-400 font-medium">
              ⚡ {content.keyMetric.trend}
            </div>
          )}
        </div>

        {/* 4 Quadrant Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {content.dataPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                    {getIcon(point.icon)}
                  </div>
                  <h3 className="text-xs font-bold text-white">{point.title}</h3>
                </div>
                {point.highlight && (
                  <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 text-[10px] font-mono font-bold">
                    {point.highlight}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Message Seal */}
        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400 font-mono relative z-10">
          🔒 {content.footerMessage}
        </div>
      </div>

      {/* Recommended Visual Hierarchy & Chart Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-white flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-brand-400" />
            <span>Recommended Visual Hierarchy</span>
          </div>
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            {content.visualHierarchy.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-brand-400 font-bold">{idx + 1}.</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-white flex items-center gap-2">
            <PieChart className="w-3.5 h-3.5 text-pink-400" />
            <span>Chart & Graphical Elements</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {content.chartRecommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
