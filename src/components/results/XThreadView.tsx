'use client';

import React, { useState } from 'react';
import {
  Twitter,
  Copy,
  Check,
  Share2,
  Sparkles,
  MessageCircle,
  Repeat2,
  Heart
} from 'lucide-react';
import { TwitterThreadContent } from '@/types';

interface XThreadViewProps {
  content: TwitterThreadContent;
}

export default function XThreadView({ content }: XThreadViewProps) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fullThreadText = content.tweets.map(t => t.text).join('\n\n') + '\n\n' + content.hashtags.join(' ');

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(fullThreadText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopySingle = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      {/* Action Header */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <Twitter className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">X / Twitter Thread Series</div>
            <div className="text-[10px] text-slate-400 font-mono">
              {content.tweets.length} Posts • All within 280 character limit
            </div>
          </div>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-all shadow-sm"
        >
          {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedAll ? 'Thread Copied' : 'Copy Full Thread'}</span>
        </button>
      </div>

      {/* Thread Container */}
      <div className="max-w-xl mx-auto space-y-4">
        {content.tweets.map((tweet, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg relative group transition-all hover:border-slate-700"
          >
            {/* Thread Connector Line */}
            {idx < content.tweets.length - 1 && (
              <div className="absolute left-9 bottom-[-16px] w-0.5 h-4 bg-slate-800" />
            )}

            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-sky-400 border border-slate-700">
                  TA
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>TransformAI Ops</span>
                    <span className="text-sky-400">☑</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">@TransformAI_HQ</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {tweet.text.length}/280
                </span>
                <button
                  onClick={() => handleCopySingle(tweet.text, idx)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Copy single tweet"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed mb-3">
              {tweet.text}
            </p>

            {/* Twitter micro-actions preview */}
            <div className="flex items-center gap-6 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1 hover:text-sky-400 cursor-pointer">
                <MessageCircle className="w-3 h-3" /> 24
              </span>
              <span className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer">
                <Repeat2 className="w-3 h-3" /> 89
              </span>
              <span className="flex items-center gap-1 hover:text-rose-400 cursor-pointer">
                <Heart className="w-3 h-3" /> 312
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
