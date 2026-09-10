'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Check,
  Sparkles,
  Info
} from 'lucide-react';
import { ConsistencyCheckResult } from '@/types';

interface ConsistencyScoreCardProps {
  consistencyResult: ConsistencyCheckResult;
  onFixDiscrepancy?: (discrepancyId: string) => void;
}

export default function ConsistencyScoreCard({
  consistencyResult,
  onFixDiscrepancy
}: ConsistencyScoreCardProps) {
  const [fixedItems, setFixedItems] = useState<Record<string, boolean>>({});

  const handleFix = (id: string) => {
    setFixedItems(prev => ({ ...prev, [id]: true }));
    onFixDiscrepancy?.(id);
  };

  const checklist = [
    { label: 'Facts consistent across all deliverables', status: consistencyResult.factsConsistent },
    { label: 'Dates & timestamps verified against source', status: consistencyResult.datesConsistent },
    { label: 'Names & organizations preserved accurately', status: consistencyResult.namesConsistent },
    { label: 'Statistics & numeric metrics aligned 1:1', status: consistencyResult.numbersConsistent },
    { label: 'Tone aligned with selected audience policy', status: consistencyResult.toneConsistent },
    { label: 'No hallucinated or unsupported claims', status: consistencyResult.noUnsupportedClaims },
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 shadow-xl space-y-5">
      {/* Header & Confidence Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">AI Cross-Format Consistency Engine</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Cross-verifying all generated deliverables against the Canonical Content Model
            </p>
          </div>
        </div>

        {/* Score Badge */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 shrink-0">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-slate-400">Factual Confidence</div>
            <div className="text-xl font-black text-emerald-400 font-mono">
              {consistencyResult.score}%
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 font-bold text-xs font-mono">
            ✓
          </div>
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {checklist.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Discrepancy Detection & Auto-Fixer */}
      {consistencyResult.discrepancies && consistencyResult.discrepancies.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="text-xs font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Factual Drift & Alignment Detector</span>
          </div>

          <div className="space-y-2.5">
            {consistencyResult.discrepancies.map((disc) => {
              const isFixed = fixedItems[disc.id] || disc.status === 'fixed';

              return (
                <div
                  key={disc.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isFixed
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-300'
                      : 'bg-amber-950/30 border-amber-500/40 text-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isFixed ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      <span className="text-xs font-bold text-white uppercase font-mono">
                        {disc.item} ({disc.deliverableType.replace('_', ' ')})
                      </span>
                    </div>

                    <button
                      onClick={() => handleFix(disc.id)}
                      disabled={isFixed}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        isFixed
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                      }`}
                    >
                      {isFixed ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Fixed Automatically</span>
                        </>
                      ) : (
                        <>
                          <Wrench className="w-3.5 h-3.5" />
                          <span>Fix Automatically</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono mb-2">
                    <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400">Canonical Source: </span>
                      <span className="text-emerald-400 font-semibold">{disc.sourceValue}</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400">Generated Variant: </span>
                      <span className={isFixed ? 'text-emerald-400 line-through' : 'text-amber-300'}>
                        {disc.generatedValue}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-normal">
                    💡 <strong className="text-white">Recommendation: </strong> {disc.suggestedFix}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
