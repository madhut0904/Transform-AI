'use client';

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Layers,
  FileCheck,
  CheckCircle2,
  PieChart,
  ShieldCheck,
  Users,
  Languages,
  DollarSign
} from 'lucide-react';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total Transformations', value: '18', sub: '+33% vs last month', icon: Layers, color: 'text-brand-400' },
    { label: 'Deliverables Synthesized', value: '114', sub: 'Across 10 formats', icon: FileCheck, color: 'text-emerald-400' },
    { label: 'Time Saved', value: '85.5 Hrs', sub: '~$14,200 ROI Value', icon: Clock, color: 'text-amber-400' },
    { label: 'Avg Generation Speed', value: '3.8s', sub: 'Neural pipeline latency', icon: TrendingUp, color: 'text-indigo-400' },
  ];

  const formatDistribution = [
    { name: 'Executive Summary', count: 18, pct: 100, color: 'bg-brand-500' },
    { name: 'Official Advisory', count: 16, pct: 88, color: 'bg-rose-500' },
    { name: 'LinkedIn Posts', count: 15, pct: 83, color: 'bg-blue-500' },
    { name: 'X / Twitter Threads', count: 14, pct: 77, color: 'bg-sky-500' },
    { name: 'Slide Decks', count: 14, pct: 77, color: 'bg-indigo-500' },
    { name: 'Infographic Blueprints', count: 13, pct: 72, color: 'bg-pink-500' },
    { name: 'Video Storyboards', count: 12, pct: 66, color: 'bg-red-500' },
    { name: 'Press Releases', count: 10, pct: 55, color: 'bg-emerald-500' },
  ];

  const audienceBreakdown = [
    { label: 'Executives & C-Suite', pct: 38 },
    { label: 'General Public', pct: 26 },
    { label: 'Technical Experts', pct: 18 },
    { label: 'Government Officials', pct: 12 },
    { label: 'Enterprise Employees', pct: 6 },
  ];

  const languageBreakdown = [
    { label: 'English', pct: 62 },
    { label: 'Hindi', pct: 16 },
    { label: 'Kannada', pct: 8 },
    { label: 'Tamil', pct: 6 },
    { label: 'Telugu', pct: 4 },
    { label: 'Others', pct: 4 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              PLATFORM TELEMETRY
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Enterprise ROI & Usage Insights
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Analytics & Impact Report
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Quantify time saved, output distribution, and cross-channel communication reach.
          </p>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">{m.label}</span>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">{m.value}</div>
                <div className="text-[11px] text-emerald-400 mt-1 font-mono">{m.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Output Format Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Output Format Distribution</h3>
              <p className="text-xs text-slate-400">Deliverables generated per communication channel</p>
            </div>
            <span className="text-xs font-mono text-brand-400 font-semibold">114 Total Outputs</span>
          </div>

          <div className="space-y-3 pt-2">
            {formatDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">{item.name}</span>
                  <span className="text-slate-400">{item.count} jobs ({item.pct}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI & Time Saved Calculator */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-brand-950/30 to-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Enterprise ROI Calculator</h3>
              <p className="text-xs text-slate-400">Based on manual copywriting & graphic drafting benchmarks</p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5 font-mono">
                <span className="text-[10px] text-slate-400 uppercase">Manual Drafting Hours Required</span>
                <div className="text-sm font-bold text-slate-300">92.0 Hours</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5 font-mono">
                <span className="text-[10px] text-slate-400 uppercase">TransformAI Generation Time</span>
                <div className="text-sm font-bold text-brand-300">6.5 Minutes (0.11 Hours)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-0.5 font-mono">
                <span className="text-[10px] text-emerald-300 uppercase font-bold">Net Enterprise Savings</span>
                <div className="text-lg font-extrabold text-emerald-400">$14,200 USD Saved</div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono text-center pt-2">
            ⚡ 99.8% workflow turnaround compression
          </div>
        </div>
      </div>

      {/* Audience & Language Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audience Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Users className="w-4 h-4 text-brand-400" />
            <h3 className="text-sm font-bold text-white">Target Audience Distribution</h3>
          </div>
          <div className="space-y-2.5">
            {audienceBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300 font-medium">{item.label}</span>
                <span className="font-mono text-brand-400 font-bold">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Language Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Languages className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Multi-Lingual Synthesis</h3>
          </div>
          <div className="space-y-2.5">
            {languageBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300 font-medium">{item.label}</span>
                <span className="font-mono text-emerald-400 font-bold">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
