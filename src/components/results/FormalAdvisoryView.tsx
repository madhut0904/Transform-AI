'use client';

import React from 'react';
import {
  ShieldAlert,
  Calendar,
  AlertOctagon,
  FileCheck,
  CheckCircle2,
  Terminal,
  PhoneCall,
  Download,
  Printer
} from 'lucide-react';
import { AdvisoryContent } from '@/types';

interface FormalAdvisoryViewProps {
  content: AdvisoryContent;
}

export default function FormalAdvisoryView({ content }: FormalAdvisoryViewProps) {
  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/40';
      case 'High':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40';
      case 'Medium':
        return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/40';
      default:
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Official Government & Enterprise Advisory</div>
            <div className="text-[10px] text-slate-400 font-mono">
              Classification: TLP:AMBER | Ref: {content.advisoryId}
            </div>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Official Advisory Document Sheet */}
      <div className="rounded-2xl bg-slate-950 border-2 border-slate-800 p-8 shadow-2xl space-y-7 max-w-4xl mx-auto font-sans">
        {/* Document Header */}
        <div className="border-b-2 border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-brand-400 font-bold mb-1">
              OFFICIAL SECURITY & COMPLIANCE DIRECTIVE
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {content.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {content.date}
              </span>
              <span>ID: {content.advisoryId}</span>
            </div>
          </div>

          <div className="shrink-0">
            <div className={`px-4 py-2 rounded-xl border text-center font-mono ${getSeverityStyle(content.severity)}`}>
              <div className="text-[10px] uppercase font-bold tracking-wider">Severity Level</div>
              <div className="text-base font-extrabold">{content.severity.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* Section: Summary */}
        <div className="space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            1. Executive Summary
          </h2>
          <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
            {content.summary}
          </p>
        </div>

        {/* Section: Background & What Happened */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              2. Technical Background
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60">
              {content.background}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              3. Incident Breakdown
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60">
              {content.whatHappened}
            </p>
          </div>
        </div>

        {/* Section: Potential Impact */}
        <div className="space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            4. Impact Assessment & Perimeter Status
          </h2>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{content.potentialImpact}</span>
          </div>
        </div>

        {/* Section: Recommended Actions */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            5. Mandatory Operator Actions
          </h2>
          <div className="space-y-2">
            {content.recommendedActions.map((action, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
              >
                <span className="w-5 h-5 rounded bg-brand-600/20 text-brand-400 font-mono font-bold flex items-center justify-center text-xs shrink-0">
                  {idx + 1}
                </span>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Indicators / IOCs */}
        <div className="space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-brand-400" />
            <span>6. Technical Indicators of Compromise (IoCs)</span>
          </h2>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-brand-300 space-y-1">
            {content.indicators.map((ioc, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-slate-500">&gt;</span>
                <span>{ioc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Contact & Verification */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
            <span>{content.contactInfo}</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-bold">
            DIGITALLY SIGNED & VERIFIED
          </div>
        </div>
      </div>
    </div>
  );
}
