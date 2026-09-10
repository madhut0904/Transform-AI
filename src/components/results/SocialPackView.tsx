'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { SocialPackContent } from '@/types';

interface SocialPackViewProps {
  content: SocialPackContent;
}

export default function SocialPackView({ content }: SocialPackViewProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Multi-Platform Social Media Pack</div>
            <div className="text-[10px] text-slate-400 font-mono">
              Synchronized cross-platform content for Facebook, Instagram, Telegram & Internal Teams/Slack
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.platformPosts.map((post, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-xs font-bold text-white font-mono">
                  {post.platform}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {post.charCount} chars
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line pt-2">
                {post.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="text-[11px] text-brand-300 font-mono">
                📸 Media: {post.mediaSuggestion}
              </div>
              <button
                onClick={() => handleCopy(post.content, idx)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === idx ? 'Copied' : `Copy ${post.platform} Post`}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
