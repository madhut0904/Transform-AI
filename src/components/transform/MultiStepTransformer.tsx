'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  Brain,
  Layers,
  Zap,
  Sliders,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  CanonicalModel,
  GenerationSettings,
  OutputType,
  SourceContent,
  Transformation
} from '@/types';
import { SAMPLE_CYBERSECURITY_REPORT } from '@/lib/sample-data';
import { aiService } from '@/lib/ai/ai-service';
import { buildCanonicalModel } from '@/lib/ai/mock-engine';
import { getTransformationById, saveTransformation } from '@/lib/storage';
import SourceInputTabs from './SourceInputTabs';
import SourceAnalysisCard from './SourceAnalysisCard';
import GenerationControlsCard from './GenerationControlsCard';
import OutputSelectionGrid, { OUTPUT_OPTIONS } from './OutputSelectionGrid';
import PipelineProgressModal from './PipelineProgressModal';
import ResultsWorkspace from '../results/ResultsWorkspace';

export default function MultiStepTransformer() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [source, setSource] = useState<SourceContent>(SAMPLE_CYBERSECURITY_REPORT);
  const [canonicalModel, setCanonicalModel] = useState<CanonicalModel>(() =>
    buildCanonicalModel(SAMPLE_CYBERSECURITY_REPORT)
  );
  const [settings, setSettings] = useState<GenerationSettings>({
    audience: 'general_public',
    tone: 'professional',
    language: 'en',
    detailLevel: 'standard',
    objective: 'inform',
    style: 'corporate',
    selectedOutputs: [
      'executive_summary',
      'advisory',
      'linkedin',
      'twitter_thread',
      'presentation',
      'infographic',
      'video_package'
    ]
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepMessage, setStepMessage] = useState('');
  const [completedTransformation, setCompletedTransformation] = useState<Transformation | null>(null);

  // Auto-analyze when source changes
  useEffect(() => {
    if (source && source.rawContent) {
      const model = buildCanonicalModel(source);
      setCanonicalModel(model);
    }
  }, [source]);

  // Handle URL query parameters (?demo=true or ?id=tf-xyz)
  useEffect(() => {
    const isDemo = searchParams.get('demo') === 'true';
    const existingId = searchParams.get('id');

    if (existingId) {
      const loaded = getTransformationById(existingId);
      if (loaded) {
        setSource(loaded.source);
        setCanonicalModel(loaded.canonicalModel);
        setSettings(loaded.settings);
        setCompletedTransformation(loaded);
        return;
      }
    }

    if (isDemo) {
      handleRunFullDemo();
    }
  }, [searchParams]);

  const handleRunFullDemo = async () => {
    const demoSource = { ...SAMPLE_CYBERSECURITY_REPORT, id: `src-demo-${Date.now()}` };
    setSource(demoSource);
    const demoModel = buildCanonicalModel(demoSource);
    setCanonicalModel(demoModel);

    const demoSettings: GenerationSettings = {
      audience: 'general_public',
      tone: 'professional',
      language: 'en',
      detailLevel: 'standard',
      objective: 'inform',
      style: 'corporate',
      selectedOutputs: [
        'executive_summary',
        'advisory',
        'linkedin',
        'twitter_thread',
        'presentation',
        'infographic',
        'video_package'
      ]
    };
    setSettings(demoSettings);

    await executeGeneration(demoSource, demoSettings);
  };

  const executeGeneration = async (sourceToRun: SourceContent, settingsToRun: GenerationSettings) => {
    setIsGenerating(true);
    setCurrentStepIndex(0);

    const stepDelays = [
      { step: 0, msg: 'Extracting source text and parsing structure...', delay: 350 },
      { step: 1, msg: 'Understanding context, tone, intent & risk level...', delay: 400 },
      { step: 2, msg: 'Extracting key facts, entities, dates & metrics...', delay: 400 },
      { step: 3, msg: 'Synthesizing Canonical Content Model schema...', delay: 450 },
      { step: 4, msg: `Generating ${settingsToRun.selectedOutputs.length} output deliverables...`, delay: 600 },
      { step: 5, msg: 'Validating cross-deliverable factual consistency...', delay: 350 },
    ];

    for (const s of stepDelays) {
      setCurrentStepIndex(s.step);
      setStepMessage(s.msg);
      await new Promise(r => setTimeout(r, s.delay));
    }

    const transformation = await aiService.runFullTransformation(sourceToRun, settingsToRun);
    saveTransformation(transformation);
    setCompletedTransformation(transformation);
    setIsGenerating(false);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.3 }
      });
    } catch {
      // ignore
    }
  };

  const handleGenerateClick = () => {
    if (!source.rawContent.trim()) return;
    executeGeneration(source, settings);
  };

  if (completedTransformation) {
    return (
      <ResultsWorkspace
        transformation={completedTransformation}
        onUpdateTransformation={(updated) => setCompletedTransformation(updated)}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              PIPELINE WORKSPACE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Autonomous Content Engine
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            New Content Transformation
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Provide a single source of truth, customize parameters, and generate tailored deliverables across all communication formats.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunFullDemo}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all shadow-md group shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-amber-300 group-hover:scale-110 transition-transform" />
          <span>Autofill & Run Demo</span>
        </button>
      </div>

      {/* STEP 1: Source Content Input */}
      <SourceInputTabs
        source={source}
        onChange={(newSource) => setSource(newSource)}
      />

      {/* STEP 2: AI Source Analysis & Canonical Model */}
      {source.rawContent.trim().length > 0 && (
        <SourceAnalysisCard canonicalModel={canonicalModel} />
      )}

      {/* STEP 3: Generation Controls */}
      <GenerationControlsCard
        settings={settings}
        onChange={(newSettings) => setSettings(newSettings)}
      />

      {/* STEP 4: Output Deliverables Selection */}
      <OutputSelectionGrid
        selectedOutputs={settings.selectedOutputs}
        onChange={(outputs) => setSettings({ ...settings, selectedOutputs: outputs })}
      />

      {/* Pre-Generation Summary & Generate Action Card */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-2 border-brand-500/50 p-6 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-400">
              READY TO SYNTHESIZE
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              TransformAI Canonical Generation Summary
            </h3>
          </div>
          <div className="text-xs text-slate-300 font-mono">
            Selected Outputs: <span className="text-brand-300 font-bold">{settings.selectedOutputs.length} Formats</span>
          </div>
        </div>

        {/* Configuration Tag Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] font-mono uppercase">Source Topic</span>
            <div className="font-semibold text-white truncate">{canonicalModel.title}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] font-mono uppercase">Target Audience</span>
            <div className="font-semibold text-white capitalize">{settings.audience.replace('_', ' ')}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] font-mono uppercase">Tone & Language</span>
            <div className="font-semibold text-white capitalize">{settings.tone} • {settings.language.toUpperCase()}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] font-mono uppercase">Style & Objective</span>
            <div className="font-semibold text-white capitalize">{settings.style} • {settings.objective}</div>
          </div>
        </div>

        {/* Selected Outputs Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {settings.selectedOutputs.map((type) => {
            const opt = OUTPUT_OPTIONS.find(o => o.id === type);
            return (
              <span
                key={type}
                className="px-2.5 py-1 rounded-lg bg-brand-500/15 text-brand-300 border border-brand-500/30 text-xs font-medium"
              >
                {opt?.title || type}
              </span>
            );
          })}
        </div>

        {/* Big Generate Button */}
        <button
          type="button"
          onClick={handleGenerateClick}
          disabled={!source.rawContent.trim() || settings.selectedOutputs.length === 0 || isGenerating}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-600 hover:from-brand-500 hover:via-indigo-500 hover:to-brand-500 text-white font-bold text-base shadow-xl shadow-brand-600/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-brand-200 group-hover:rotate-12 transition-transform" />
          <span>Generate {settings.selectedOutputs.length} Deliverables Now →</span>
        </button>
      </div>

      {/* Animated Pipeline Progress Modal */}
      <PipelineProgressModal
        isOpen={isGenerating}
        currentStepIndex={currentStepIndex}
        stepMessage={stepMessage}
        totalOutputs={settings.selectedOutputs.length}
      />
    </div>
  );
}
