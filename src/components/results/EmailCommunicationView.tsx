'use client';

import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowRight } from 'lucide-react';
import { EmailContent } from '@/types';

interface EmailCommunicationViewProps {
  content: EmailContent;
}

export default function EmailCommunicationView({ content }: EmailCommunicationViewProps) {
  const [copied, setCopied] = useState(false);

  const fullText = `Subject: ${content.subject}\nPreheader: ${content.preheader}\n\n${content.greeting}\n\n${content.body}\n\nHighlights:\n${content.bulletHighlights.map(h => `• ${h}`).join('\n')}\n\n${content.callToAction.text}: ${content.callToAction.linkText}\n\n${content.signOff}`;

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
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Broadcast Email Communication</div>
            <div className="text-[10px] text-slate-400 font-mono">
              Designed for Outlook, Gmail & Enterprise Newsletter Distribution
            </div>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium transition-all shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
        </button>
      </div>

      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-7 shadow-2xl space-y-5 max-w-3xl mx-auto font-sans">
        {/* Email Meta Envelope */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 font-mono text-xs">
          <div>
            <span className="text-slate-400">Subject: </span>
            <span className="text-white font-semibold font-sans">{content.subject}</span>
          </div>
          <div>
            <span className="text-slate-400">Preheader: </span>
            <span className="text-slate-300 font-sans">{content.preheader}</span>
          </div>
        </div>

        {/* Email Body */}
        <div className="text-xs text-slate-200 leading-relaxed space-y-4 pt-2">
          <p className="font-semibold text-white">{content.greeting}</p>
          <div className="whitespace-pre-line">{content.body}</div>

          {/* Bullet Highlights */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <div className="text-[11px] font-bold text-teal-400 uppercase font-mono">
              Immediate Action Items & Highlights
            </div>
            {content.bulletHighlights.map((hl, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-200">
                <span className="text-teal-400 font-bold">•</span>
                <span>{hl}</span>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="pt-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-md"
            >
              <span>{content.callToAction.text}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Signoff */}
          <div className="pt-4 border-t border-slate-800 whitespace-pre-line text-slate-400 font-medium">
            {content.signOff}
          </div>
        </div>
      </div>
    </div>
  );
}
