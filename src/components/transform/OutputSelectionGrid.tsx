'use client';

import React from 'react';
import {
  Linkedin,
  Twitter,
  ShieldAlert,
  FileText,
  PieChart,
  Presentation,
  Video,
  Newspaper,
  Mail,
  Share2,
  CheckSquare,
  Square,
  Sparkles
} from 'lucide-react';
import { OutputType } from '@/types';

interface OutputSelectionGridProps {
  selectedOutputs: OutputType[];
  onChange: (outputs: OutputType[]) => void;
}

export interface OutputOptionItem {
  id: OutputType;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  category: 'Executive' | 'Public & Social' | 'Security & Ops' | 'Visual & Media';
}

export const OUTPUT_OPTIONS: OutputOptionItem[] = [
  {
    id: 'executive_summary',
    title: 'Executive Summary',
    description: 'Concise, high-impact C-suite briefing with key findings, business impact, risks, and recommended actions.',
    icon: FileText,
    badge: 'Core',
    category: 'Executive'
  },
  {
    id: 'advisory',
    title: 'Official Advisory',
    description: 'Structured formal advisory with severity classification, background, mitigation steps, and technical indicators.',
    icon: ShieldAlert,
    badge: 'Official',
    category: 'Security & Ops'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Post',
    description: 'Publication-ready professional post complete with attention-grabbing hook, bullet points, CTA, and hashtags.',
    icon: Linkedin,
    badge: 'Social',
    category: 'Public & Social'
  },
  {
    id: 'twitter_thread',
    title: 'Twitter / X Thread',
    description: 'Platform-optimized multi-tweet breakdown formatted with character limits, numbered posts, and hashtags.',
    icon: Twitter,
    category: 'Public & Social'
  },
  {
    id: 'presentation',
    title: 'Slide Presentation',
    description: 'Complete slide deck blueprint with situation overview, findings, impact slides, visual cues, and speaker notes.',
    icon: Presentation,
    category: 'Executive'
  },
  {
    id: 'infographic',
    title: 'Infographic Blueprint',
    description: 'Visual layout blueprint with headline, hero statistics, 4-quadrant key facts, chart advice, and footer seal.',
    icon: PieChart,
    badge: 'Visual',
    category: 'Visual & Media'
  },
  {
    id: 'video_package',
    title: 'Omnichannel Video Package',
    description: 'Complete video package: scene-by-scene storyboard, narration script, subtitle timestamps, and visual directions.',
    icon: Video,
    badge: 'Rich Media',
    category: 'Visual & Media'
  },
  {
    id: 'press_release',
    title: 'Press Release',
    description: 'Standard journalistic format with dateline, lead paragraph, executive quote, and media contact information.',
    icon: Newspaper,
    category: 'Public & Social'
  },
  {
    id: 'email',
    title: 'Email Communication',
    description: 'Targeted broadcast email with clear subject line, preheader, executive greeting, and call to action.',
    icon: Mail,
    category: 'Executive'
  },
  {
    id: 'social_pack',
    title: 'Social Media Pack',
    description: 'Multi-platform synchronized copies tailored for Facebook, Instagram, Telegram, and internal Slack/Teams.',
    icon: Share2,
    category: 'Public & Social'
  },
];

export default function OutputSelectionGrid({
  selectedOutputs,
  onChange
}: OutputSelectionGridProps) {
  const toggleOutput = (id: OutputType) => {
    if (selectedOutputs.includes(id)) {
      if (selectedOutputs.length === 1) return; // Keep at least one
      onChange(selectedOutputs.filter((o) => o !== id));
    } else {
      onChange([...selectedOutputs, id]);
    }
  };

  const handleSelectAll = () => {
    onChange(OUTPUT_OPTIONS.map((o) => o.id));
  };

  const handleSelectStandardPack = () => {
    onChange(['executive_summary', 'advisory', 'linkedin', 'twitter_thread', 'presentation', 'infographic', 'video_package']);
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
            3
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Select Output Deliverables</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/15 text-brand-300 border border-brand-500/30">
                {selectedOutputs.length} selected
              </span>
            </div>
            <p className="text-xs text-slate-400">
              TransformAI will synthesize every selected format from the same canonical understanding
            </p>
          </div>
        </div>

        {/* Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSelectStandardPack}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Recommended Pack (7)
          </button>
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-xs px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-colors"
          >
            Select All (10)
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {OUTPUT_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedOutputs.includes(option.id);

          return (
            <div
              key={option.id}
              onClick={() => toggleOutput(option.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between group ${
                isSelected
                  ? 'bg-brand-950/40 border-brand-500/70 shadow-md shadow-brand-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="font-semibold text-xs text-white group-hover:text-brand-300 transition-colors">
                      {option.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {option.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase bg-slate-800 text-slate-400 border border-slate-700">
                        {option.badge}
                      </span>
                    )}
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-brand-600 border-brand-500 text-white'
                          : 'border-slate-600 bg-slate-900 text-transparent'
                      }`}
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {option.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{option.category}</span>
                <span className={isSelected ? 'text-brand-400 font-medium' : 'text-slate-400'}>
                  {isSelected ? 'Included in run' : 'Click to enable'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
