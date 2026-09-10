'use client';

import React, { useState } from 'react';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  MessageSquare,
  Sparkles,
  Layout
} from 'lucide-react';
import { PresentationContent } from '@/types';

interface PresentationDeckViewProps {
  content: PresentationContent;
}

export default function PresentationDeckView({ content }: PresentationDeckViewProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = content.slides[activeSlideIndex] || content.slides[0];

  const handleDownload = () => {
    const markdownDeck = `# ${content.deckTitle}\n\n` +
      content.slides.map(s => 
        `---\n\n## Slide ${s.slideNumber}: ${s.title}\n*${s.subtitle || ''}*\n\n` +
        s.bulletPoints.map(b => `- ${b}`).join('\n') +
        `\n\n**Visual Direction**: ${s.visualRecommendation}\n\n**Speaker Notes**: ${s.speakerNotes}\n`
      ).join('\n');

    const blob = new Blob([markdownDeck], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${content.deckTitle.replace(/\s+/g, '_')}_Deck.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Presentation className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{content.deckTitle}</div>
            <div className="text-[10px] text-slate-400 font-mono">
              {content.totalSlides} Slides Generated with Speaker Notes & Visual Directives
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium transition-all shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Deck</span>
        </button>
      </div>

      {/* Slide Navigation Thumbnails */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {content.slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlideIndex(idx)}
            className={`px-3 py-2 rounded-xl text-left border transition-all shrink-0 w-36 ${
              activeSlideIndex === idx
                ? 'bg-brand-950/60 border-brand-500 text-white shadow-md'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <div className="text-[10px] font-mono text-brand-400 font-semibold mb-0.5">
              SLIDE {slide.slideNumber}
            </div>
            <div className="text-xs font-medium truncate">{slide.title}</div>
          </button>
        ))}
      </div>

      {/* Main Slide Canvas */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 shadow-2xl space-y-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
        <div className="space-y-4">
          {/* Slide Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-400">
                TRANSFORMAI EXECUTIVE BRIEFING • SLIDE {activeSlide.slideNumber} OF {content.totalSlides}
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                {activeSlide.title}
              </h2>
              {activeSlide.subtitle && (
                <p className="text-xs text-slate-400 mt-1">{activeSlide.subtitle}</p>
              )}
            </div>
            <Layout className="w-6 h-6 text-brand-500/40" />
          </div>

          {/* Slide Bullet Points */}
          <div className="space-y-3 pt-2">
            {activeSlide.bulletPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0 mt-2" />
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Controls & Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setActiveSlideIndex(Math.max(0, activeSlideIndex - 1))}
            disabled={activeSlideIndex === 0}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white disabled:opacity-40 px-2.5 py-1 rounded bg-slate-800"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>

          <span className="text-xs font-mono text-slate-400">
            {activeSlideIndex + 1} / {content.totalSlides}
          </span>

          <button
            onClick={() => setActiveSlideIndex(Math.min(content.totalSlides - 1, activeSlideIndex + 1))}
            disabled={activeSlideIndex === content.totalSlides - 1}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white disabled:opacity-40 px-2.5 py-1 rounded bg-slate-800"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Direction & Speaker Notes Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visual Recommendation */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
            <Eye className="w-3.5 h-3.5" />
            <span>Visual & Graphics Direction</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {activeSlide.visualRecommendation}
          </p>
        </div>

        {/* Speaker Notes */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Speaker Notes (Teleprompter)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            &ldquo;{activeSlide.speakerNotes}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
