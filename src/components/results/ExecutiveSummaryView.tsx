'use client';

import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ExecutiveSummaryContent } from '@/types';

interface ExecutiveSummaryViewProps {
  content: ExecutiveSummaryContent;
  isEditing?: boolean;
  onUpdate?: (content: ExecutiveSummaryContent) => void;
}

export default function ExecutiveSummaryView({
  content,
  isEditing,
  onUpdate
}: ExecutiveSummaryViewProps) {
  return (
    <div className="space-y-6">
      {/* Overview Block */}
      <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>Strategic Overview</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          {content.overview}
        </p>
      </div>

      {/* Key Findings */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Key Findings & Milestones</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.keyFindings.map((finding, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-3"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{finding}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Impact & Risk Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Business Impact */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Business Impact Assessment</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {content.businessImpact.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Identified Risks */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Risk Exposure & Criticalities</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {content.risks.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="p-5 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-brand-400" />
          <span>Recommended Executive Actions</span>
        </h3>
        <div className="space-y-2">
          {content.recommendedActions.map((action, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200"
            >
              <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono font-bold text-[11px]">
                ACTION {idx + 1}
              </span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
