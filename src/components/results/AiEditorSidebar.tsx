'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Wand2,
  Minimize2,
  Maximize2,
  Languages,
  Sliders,
  Send,
  Bot,
  Check,
  RefreshCw
} from 'lucide-react';
import { Deliverable } from '@/types';

interface AiEditorSidebarProps {
  deliverable: Deliverable;
  onApplyModification: (instruction: string) => void;
}

export default function AiEditorSidebar({
  deliverable,
  onApplyModification
}: AiEditorSidebarProps) {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const quickActions = [
    { label: 'Make More Executive', instruction: 'Rewrite to emphasize strategic C-Suite business value, ROI, and governance.' },
    { label: 'Shorten & Condense', instruction: 'Condense content by 35% while strictly retaining all facts and metrics.' },
    { label: 'Make More Urgent', instruction: 'Adjust tone to highlight critical time-sensitive operational priority.' },
    { label: 'Translate to Hindi', instruction: 'Translate the narrative into fluent professional Hindi while keeping technical terms intact.' },
    { label: 'Enhance Hook', instruction: 'Make the headline and opening hook significantly more compelling for viral engagement.' },
  ];

  const handleAction = (instruction: string, label: string) => {
    setIsProcessing(true);
    setLastAction(label);
    setTimeout(() => {
      onApplyModification(instruction);
      setIsProcessing(false);
      setTimeout(() => setLastAction(null), 3000);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      onApplyModification(prompt);
      setPrompt('');
      setIsProcessing(false);
      setLastAction('Custom Rewrite Applied');
      setTimeout(() => setLastAction(null), 3000);
    }, 700);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-5 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Ask TransformAI</h3>
            <p className="text-[10px] text-slate-400 font-mono">Live Content Assistant</p>
          </div>
        </div>

        {/* Quick Transformation Action Buttons */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 uppercase font-mono">
            Quick AI Modifications
          </label>
          <div className="space-y-1.5">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isProcessing}
                onClick={() => handleAction(action.instruction, action.label)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800/80 transition-all text-left group disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <Wand2 className="w-3.5 h-3.5 text-brand-400 group-hover:scale-110 transition-transform" />
                  <span>{action.label}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono group-hover:text-slate-300">
                  Run
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Status indicator */}
        {lastAction && (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>{lastAction}</span>
          </div>
        )}
      </div>

      {/* Free-form Input */}
      <form onSubmit={handleCustomSubmit} className="space-y-2 pt-3 border-t border-slate-800">
        <label className="text-[11px] font-semibold text-slate-400 uppercase font-mono">
          Custom Prompt Refinement
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. 'Make this more suitable for senior enterprise executives'..."
            className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 pr-10 resize-none font-sans"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isProcessing}
            className="absolute right-2.5 bottom-3 p-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-40 transition-colors"
          >
            {isProcessing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
