'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Layers,
  Download,
  Copy,
  Check,
  Share2,
  RefreshCw,
  FileText,
  Linkedin,
  Twitter,
  ShieldAlert,
  Presentation,
  PieChart,
  Video,
  Newspaper,
  Mail,
  ArrowLeft,
  Wand2,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Deliverable, OutputType, Transformation } from '@/types';
import ConsistencyScoreCard from './ConsistencyScoreCard';
import ExecutiveSummaryView from './ExecutiveSummaryView';
import LinkedInPostView from './LinkedInPostView';
import XThreadView from './XThreadView';
import FormalAdvisoryView from './FormalAdvisoryView';
import PresentationDeckView from './PresentationDeckView';
import InfographicBlueprintView from './InfographicBlueprintView';
import VideoPackageView from './VideoPackageView';
import PressReleaseView from './PressReleaseView';
import EmailCommunicationView from './EmailCommunicationView';
import SocialPackView from './SocialPackView';
import AiEditorSidebar from './AiEditorSidebar';
import { fixDiscrepancyInStorage, saveTransformation } from '@/lib/storage';

interface ResultsWorkspaceProps {
  transformation: Transformation;
  onUpdateTransformation?: (updated: Transformation) => void;
}

export default function ResultsWorkspace({
  transformation: initialTransformation,
  onUpdateTransformation
}: ResultsWorkspaceProps) {
  const [transformation, setTransformation] = useState<Transformation>(initialTransformation);
  const [activeTab, setActiveTab] = useState<OutputType>(
    initialTransformation.deliverables[0]?.type || 'executive_summary'
  );
  const [copiedAll, setCopiedAll] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const activeDeliverable =
    transformation.deliverables.find((d) => d.type === activeTab) ||
    transformation.deliverables[0];

  const handleFixDiscrepancy = (discId: string) => {
    const updated = fixDiscrepancyInStorage(transformation.id, discId);
    if (updated) {
      setTransformation({ ...updated });
      onUpdateTransformation?.(updated);
    }
  };

  const handleApplyAiModification = (instruction: string) => {
    // In demo / live, we can adjust content or regenerate
    const updatedDeliverables = [...transformation.deliverables];
    const index = updatedDeliverables.findIndex(d => d.type === activeTab);
    if (index >= 0) {
      const item = { ...updatedDeliverables[index] };
      item.updatedAt = new Date().toISOString();
      updatedDeliverables[index] = item;
      const updatedTransformation = { ...transformation, deliverables: updatedDeliverables };
      setTransformation(updatedTransformation);
      saveTransformation(updatedTransformation);
      onUpdateTransformation?.(updatedTransformation);
    }
  };

  const handleExportAllMarkdown = () => {
    let fullDoc = `# TRANSFORMAI MULTI-FORMAT EXPORT PACKAGE\n`;
    fullDoc += `Source Topic: ${transformation.canonicalModel.title}\n`;
    fullDoc += `Generated: ${new Date().toLocaleString()}\n`;
    fullDoc += `Canonical Consistency Score: ${transformation.consistencyResult.score}%\n\n`;
    fullDoc += `=======================================================\n\n`;

    transformation.deliverables.forEach((del) => {
      fullDoc += `## [DELIVERABLE: ${del.title.toUpperCase()}]\n\n`;
      fullDoc += `${JSON.stringify(del.content, null, 2)}\n\n`;
      fullDoc += `-------------------------------------------------------\n\n`;
    });

    const blob = new Blob([fullDoc], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${transformation.canonicalModel.title.replace(/\s+/g, '_')}_Deliverables.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTabIcon = (type: OutputType) => {
    switch (type) {
      case 'executive_summary':
        return FileText;
      case 'linkedin':
        return Linkedin;
      case 'twitter_thread':
        return Twitter;
      case 'advisory':
        return ShieldAlert;
      case 'presentation':
        return Presentation;
      case 'infographic':
        return PieChart;
      case 'video_package':
        return Video;
      case 'press_release':
        return Newspaper;
      case 'email':
        return Mail;
      default:
        return Share2;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/transform"
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Back to Configuration"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              TRANSFORMATION COMPLETE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {transformation.deliverables.length} Deliverables Generated
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {transformation.canonicalModel.title}
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl line-clamp-1">
            Audience: <strong className="text-white capitalize">{transformation.settings.audience.replace('_', ' ')}</strong> • 
            Tone: <strong className="text-white capitalize">{transformation.settings.tone}</strong> • 
            Language: <strong className="text-white uppercase">{transformation.settings.language}</strong>
          </p>
        </div>

        {/* Global Action Strip */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportAllMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all shadow-md shadow-brand-600/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export All Deliverables</span>
          </button>

          <Link
            href="/transform"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Transform</span>
          </Link>
        </div>
      </div>

      {/* Consistency Validation Card */}
      <ConsistencyScoreCard
        consistencyResult={transformation.consistencyResult}
        onFixDiscrepancy={handleFixDiscrepancy}
      />

      {/* Main Deliverables Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Columns: Deliverable Workspace */}
        <div className="lg:col-span-3 space-y-4">
          {/* Format Tabs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
            {transformation.deliverables.map((del) => {
              const Icon = getTabIcon(del.type);
              const isActive = activeTab === del.type;

              return (
                <button
                  key={del.id}
                  onClick={() => setActiveTab(del.type)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 select-none ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 font-semibold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{del.title.split(' ')[0]} {del.title.split(' ')[1] || ''}</span>
                </button>
              );
            })}
          </div>

          {/* Active Deliverable Content Container */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl min-h-[500px]">
            {activeDeliverable && (
              <>
                {activeDeliverable.type === 'executive_summary' && (
                  <ExecutiveSummaryView content={activeDeliverable.content as any} />
                )}
                {activeDeliverable.type === 'linkedin' && (
                  <LinkedInPostView content={activeDeliverable.content as any} />
                )}
                {activeDeliverable.type === 'twitter_thread' && (
                  <XThreadView content={activeDeliverable.content as any} />
                )}
                {activeDeliverable.type === 'advisory' && (
                  <FormalAdvisoryView content={activeDeliverable.content as any} />
                )}
                {activeDeliverable.type === 'presentation' && (
                  <PresentationDeckView content={activeDeliverable.content as any} />
                )}
                {activeDeliverable.type === 'infographic' && (
                  <InfographicBlueprintView content={activeDeliverable.content as any} />
                )}
                {activeDeliverable.type === 'video_package' && (
                  <VideoPackageView content={activeDeliverable.content as any} />
                )}
                {activeDeliverable.type === 'press_release' && (
                  <PressReleaseView content={activeDeliverable.content as any} />
                )}
                {activeDeliverable.type === 'email' && (
                  <EmailCommunicationView content={activeDeliverable.content as any} />
                )}
                {activeDeliverable.type === 'social_pack' && (
                  <SocialPackView content={activeDeliverable.content as any} />
                )}
              </>
            )}
          </div>
        </div>

        {/* Right 1 Column: AI Editor Sidekick */}
        <div className="lg:col-span-1">
          {activeDeliverable && (
            <AiEditorSidebar
              deliverable={activeDeliverable}
              onApplyModification={handleApplyAiModification}
            />
          )}
        </div>
      </div>
    </div>
  );
}
