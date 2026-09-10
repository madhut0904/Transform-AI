'use client';

import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Loader2,
  Brain,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

interface PipelineProgressModalProps {
  isOpen: boolean;
  currentStepIndex: number;
  stepMessage: string;
  totalOutputs: number;
}

export const PIPELINE_STEPS = [
  { id: 'extract', label: 'Extracting Content', desc: 'Parsing structure, stripping boilerplate, and segmenting tokens' },
  { id: 'context', label: 'Understanding Context & Intent', desc: 'Determining primary tone, risk severity, and audience posture' },
  { id: 'facts', label: 'Identifying Key Facts & Entities', desc: 'Extracting verified timelines, metrics, orgs, and critical claims' },
  { id: 'canonical', label: 'Building Canonical Content Model', desc: 'Synthesizing singular unified truth schema across channels' },
  { id: 'generate', label: 'Generating Tailored Deliverables', desc: 'Synthesizing output-specific formatting, syntax, and hooks' },
  { id: 'validate', label: 'Validating Cross-Format Consistency', desc: 'Cross-verifying entity metrics and eliminating factual drift' }
];

export default function PipelineProgressModal({
  isOpen,
  currentStepIndex,
  stepMessage,
  totalOutputs
}: PipelineProgressModalProps) {
  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / PIPELINE_STEPS.length) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-7 space-y-6 relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center mx-auto shadow-lg shadow-brand-500/30 animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            TransformAI is Analyzing Your Source...
          </h2>
          <p className="text-xs text-slate-300">
            Synthesizing <span className="text-brand-300 font-semibold">{totalOutputs} communication deliverables</span> from a single canonical understanding.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>Pipeline Progress</span>
            <span className="text-brand-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-indigo-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step-by-Step Checklist */}
        <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          {PIPELINE_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 text-xs transition-opacity ${
                  isCurrent
                    ? 'text-white font-medium'
                    : isCompleted
                    ? 'text-slate-300 opacity-90'
                    : 'text-slate-400 opacity-50'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-[10px] text-slate-400">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={isCurrent ? 'text-brand-300 font-semibold' : ''}>
                      {step.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 font-mono animate-pulse">
                        PROCESSING
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Current Sub-Status */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-center">
          <span className="text-xs text-slate-400 font-mono">
            Status: <span className="text-slate-200">{stepMessage || 'Executing neural pipeline...'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
