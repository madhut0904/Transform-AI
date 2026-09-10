'use client';

import React, { useState } from 'react';
import { Newspaper, Copy, Check, Quote, Building } from 'lucide-react';
import { PressReleaseContent } from '@/types';

interface PressReleaseViewProps {
  content: PressReleaseContent;
}

export default function PressReleaseView({ content }: PressReleaseViewProps) {
  const [copied, setCopied] = useState(false);

  const fullText = `FOR IMMEDIATE RELEASE\n\n${content.headline.toUpperCase()}\n${content.subheadline}\n\n${content.dateline} — ${content.leadParagraph}\n\n${content.bodyParagraphs.join('\n\n')}\n\n"${content.executiveQuote.quote}" said ${content.executiveQuote.author}, ${content.executiveQuote.title}.\n\nAbout the Organization:\n${content.boilerplate}\n\nMedia Contact:\n${content.mediaContact}`;

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
    <div className="space-y-6">
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Newspaper className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Official Journalistic Press Release</div>
            <div className="text-[10px] text-slate-400 font-mono">
              AP Style Standard • Ready for Wire Distribution (PR Newswire / Business Wire)
            </div>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium transition-all shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Release' : 'Copy Press Release'}</span>
        </button>
      </div>

      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-8 shadow-2xl space-y-6 max-w-4xl mx-auto font-sans">
        <div className="border-b border-slate-800 pb-4 space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
            FOR IMMEDIATE RELEASE
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
            {content.headline}
          </h1>
          <p className="text-sm text-slate-300 font-medium">
            {content.subheadline}
          </p>
        </div>

        <div className="text-xs text-slate-200 leading-relaxed space-y-4">
          <p>
            <strong className="font-mono text-white">{content.dateline}</strong> — {content.leadParagraph}
          </p>

          {content.bodyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          {/* Executive Quote */}
          <div className="p-4 rounded-xl bg-slate-900/80 border-l-4 border-brand-500 space-y-2">
            <p className="text-xs italic text-slate-200">
              &ldquo;{content.executiveQuote.quote}&rdquo;
            </p>
            <div className="text-[11px] text-brand-300 font-semibold font-mono">
              — {content.executiveQuote.author}, {content.executiveQuote.title}
            </div>
          </div>

          {/* Boilerplate */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-white uppercase font-mono">About the Organization</h3>
            <p className="text-slate-400 text-[11px]">{content.boilerplate}</p>
          </div>

          {/* Media Contact */}
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 font-mono text-[11px] text-slate-300">
            <strong className="text-white">Media Contact: </strong> {content.mediaContact}
          </div>
        </div>
      </div>
    </div>
  );
}
