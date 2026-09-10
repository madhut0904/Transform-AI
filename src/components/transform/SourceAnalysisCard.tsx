'use client';

import React, { useState } from 'react';
import {
  Brain,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  Tag,
  ChevronDown,
  ChevronUp,
  Cpu,
  Target,
  Sparkles,
  Calendar,
  Building,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { CanonicalModel } from '@/types';

interface SourceAnalysisCardProps {
  canonicalModel: CanonicalModel;
}

export default function SourceAnalysisCard({ canonicalModel }: SourceAnalysisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { analysis } = canonicalModel;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'High':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Medium':
        return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'org':
        return <Building className="w-3 h-3 text-blue-400" />;
      case 'location':
        return <MapPin className="w-3 h-3 text-emerald-400" />;
      case 'threat':
        return <ShieldAlert className="w-3 h-3 text-rose-400" />;
      case 'date':
        return <Calendar className="w-3 h-3 text-amber-400" />;
      case 'metric':
        return <TrendingUp className="w-3 h-3 text-purple-400" />;
      default:
        return <Cpu className="w-3 h-3 text-indigo-400" />;
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">AI Source Analysis</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                CANONICAL MODEL READY
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Single structured truth extracted to ensure cross-deliverable consistency
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/60 transition-colors"
        >
          <span>{isExpanded ? 'Collapse' : 'View Full Model'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Core Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Main Topic */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
          <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <Target className="w-3 h-3 text-brand-400" />
            <span>Main Topic</span>
          </div>
          <div className="text-xs font-semibold text-white">
            {analysis.mainTopic}
          </div>
        </div>

        {/* Intent */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
          <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
            <Info className="w-3 h-3 text-blue-400" />
            <span>Strategic Intent</span>
          </div>
          <div className="text-xs font-medium text-slate-200 line-clamp-1">
            {analysis.intent}
          </div>
        </div>

        {/* Risk Level & Sentiment */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400">Assessed Risk</div>
            <div className="text-xs font-bold text-white mt-0.5">{analysis.riskLevel} Severity</div>
          </div>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${getRiskColor(analysis.riskLevel)}`}>
            {analysis.riskLevel.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Executive Synthesis
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {analysis.summary}
        </p>
      </div>

      {/* Extracted Key Entities */}
      <div>
        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <span>Identified Canonical Entities</span>
          <span className="text-[10px] text-slate-400 font-mono">({analysis.keyEntities.length} items)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.keyEntities.map((ent, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200"
              title={ent.context || ent.name}
            >
              {getEntityIcon(ent.type)}
              <span className="font-medium">{ent.name}</span>
              <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-slate-900 text-slate-400">
                {ent.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Section */}
      {isExpanded && (
        <div className="pt-4 border-t border-slate-800 space-y-4 animate-fade-in">
          {/* Important Facts */}
          <div>
            <div className="text-xs font-semibold text-slate-300 mb-2">
              Verified Factual Claims
            </div>
            <div className="space-y-1.5">
              {analysis.importantFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-950/40 border border-slate-800/50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords & Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                Key Metrics & Statistics
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.statistics.map((stat, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-mono font-medium"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                Semantic Keywords
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
