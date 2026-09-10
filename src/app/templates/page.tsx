'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Layers,
  ShieldAlert,
  Briefcase,
  Landmark,
  Rocket,
  GraduationCap,
  Share2,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SAMPLE_TEMPLATES } from '@/lib/sample-data';
import { Template } from '@/types';

export default function TemplatesPage() {
  const router = useRouter();

  const getTemplateIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-indigo-400" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-emerald-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-amber-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-purple-400" />;
      default:
        return <Share2 className="w-5 h-5 text-brand-400" />;
    }
  };

  const handleUseTemplate = (tpl: Template) => {
    // Navigate to transform with template sample
    router.push(`/transform?template=${tpl.id}&demo=true`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              ENTERPRISE BLUEPRINTS
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Pre-Configured Transformation Recipes
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Workflow Templates
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Accelerate your communications workflow with battle-tested presets for cybersecurity, governance, executive memos, and press launches.
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SAMPLE_TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700/60 group-hover:scale-105 transition-transform">
                  {getTemplateIcon(tpl.icon)}
                </div>
                {tpl.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30 text-[10px] font-mono font-bold uppercase">
                    {tpl.badge}
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  {tpl.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                  {tpl.title}
                </h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {tpl.description}
              </p>

              {/* Recommended outputs strip */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-1.5">
                  Generates {tpl.recommendedOutputs.length} deliverables:
                </div>
                <div className="flex flex-wrap gap-1">
                  {tpl.recommendedOutputs.slice(0, 4).map((out, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] font-mono border border-slate-800"
                    >
                      {out.replace('_', ' ')}
                    </span>
                  ))}
                  {tpl.recommendedOutputs.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] font-mono">
                      +{tpl.recommendedOutputs.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleUseTemplate(tpl)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700 hover:border-brand-500 shadow-md group/btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400 group-hover/btn:text-white" />
              <span>Use Template</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
