'use client';

import React, { useState } from 'react';
import {
  Linkedin,
  Copy,
  Check,
  Share2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { LinkedInPostContent } from '@/types';

interface LinkedInPostViewProps {
  content: LinkedInPostContent;
  isEditing?: boolean;
}

export default function LinkedInPostView({ content }: LinkedInPostViewProps) {
  const [copied, setCopied] = useState(false);

  const fullText = `${content.hook}\n\n${content.mainContent}\n\nKey Takeaways:\n${content.keyPoints.map(p => `• ${p}`).join('\n')}\n\n${content.callToAction}\n\n${content.hashtags.join(' ')}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      {/* Action Header */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Linkedin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">LinkedIn Publication Post</div>
            <div className="text-[10px] text-slate-400 font-mono">
              {fullText.length} / 3000 characters | Optimized engagement hook
            </div>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Post' : 'Copy Post'}</span>
        </button>
      </div>

      {/* Simulated LinkedIn Post Card */}
      <div className="max-w-2xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        {/* Author Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow">
            TA
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1">
              <span>TransformAI Enterprise Communications</span>
              <span className="text-blue-400">● 1st</span>
            </div>
            <div className="text-[11px] text-slate-400">Executive Security & Intelligence Disclosures</div>
            <div className="text-[10px] text-slate-500 font-mono">Just now • 🌐</div>
          </div>
        </div>

        {/* Hook */}
        <div className="text-sm font-semibold text-white leading-relaxed border-l-2 border-brand-500 pl-3 py-1">
          {content.hook}
        </div>

        {/* Main Body */}
        <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
          {content.mainContent}
        </div>

        {/* Key Points */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase font-mono">
            Key Highlights:
          </div>
          <div className="space-y-1">
            {content.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                <span className="text-brand-400 font-bold">✓</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-xs text-brand-300 font-medium">
          {content.callToAction}
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
          {content.hashtags.map((tag, idx) => (
            <span key={idx} className="text-xs text-blue-400 hover:underline cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
