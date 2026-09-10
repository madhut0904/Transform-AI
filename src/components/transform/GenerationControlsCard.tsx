'use client';

import React from 'react';
import {
  Sliders,
  Users,
  MessageSquareQuote,
  Languages,
  Layers,
  Target,
  Palette
} from 'lucide-react';
import {
  AudienceType,
  CommunicationObjective,
  ContentStyle,
  DetailLevel,
  GenerationSettings,
  LanguageType,
  ToneType
} from '@/types';

interface GenerationControlsCardProps {
  settings: GenerationSettings;
  onChange: (settings: GenerationSettings) => void;
}

export default function GenerationControlsCard({
  settings,
  onChange
}: GenerationControlsCardProps) {
  const audienceOptions: { id: AudienceType; label: string }[] = [
    { id: 'general_public', label: 'General Public' },
    { id: 'executives', label: 'Executives & C-Suite' },
    { id: 'employees', label: 'Enterprise Employees' },
    { id: 'customers', label: 'Customers & Clients' },
    { id: 'government', label: 'Government Officials' },
    { id: 'technical_experts', label: 'Technical Experts / Engineers' },
    { id: 'investors', label: 'Investors & Board' },
    { id: 'students', label: 'Students / Academic' },
  ];

  const toneOptions: { id: ToneType; label: string }[] = [
    { id: 'professional', label: 'Professional' },
    { id: 'formal', label: 'Formal & Official' },
    { id: 'friendly', label: 'Friendly & Approachable' },
    { id: 'urgent', label: 'Urgent & Action-Oriented' },
    { id: 'persuasive', label: 'Persuasive' },
    { id: 'educational', label: 'Educational & Explanatory' },
    { id: 'neutral', label: 'Neutral & Objective' },
  ];

  const languageOptions: { id: LanguageType; label: string; native: string }[] = [
    { id: 'en', label: 'English', native: 'English' },
    { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { id: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { id: 'te', label: 'Telugu', native: 'తెలుగు' },
    { id: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { id: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  const detailOptions: { id: DetailLevel; label: string; desc: string }[] = [
    { id: 'brief', label: 'Brief', desc: 'Concise bullet points' },
    { id: 'standard', label: 'Standard', desc: 'Balanced depth' },
    { id: 'detailed', label: 'Detailed', desc: 'In-depth explanation' },
    { id: 'comprehensive', label: 'Comprehensive', desc: 'Full forensic depth' },
  ];

  const objectiveOptions: { id: CommunicationObjective; label: string }[] = [
    { id: 'inform', label: 'Inform' },
    { id: 'educate', label: 'Educate' },
    { id: 'warn', label: 'Warn / Alert' },
    { id: 'persuade', label: 'Persuade' },
    { id: 'promote', label: 'Promote' },
    { id: 'summarize', label: 'Summarize' },
    { id: 'explain', label: 'Explain' },
  ];

  const styleOptions: { id: ContentStyle; label: string }[] = [
    { id: 'corporate', label: 'Corporate' },
    { id: 'news', label: 'News / Journalistic' },
    { id: 'technical', label: 'Technical' },
    { id: 'social_media', label: 'Social Media' },
    { id: 'government', label: 'Government / Public Sector' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'academic', label: 'Academic' },
  ];

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-6">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
            2
          </span>
          <div>
            <h2 className="text-base font-bold text-white">Customize Generation</h2>
            <p className="text-xs text-slate-400">
              Tune parameters to ensure generated deliverables match stakeholder context
            </p>
          </div>
        </div>
        <Sliders className="w-4 h-4 text-brand-400" />
      </div>

      {/* Grid of Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Target Audience */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-400" />
            <span>Target Audience</span>
          </label>
          <select
            value={settings.audience}
            onChange={(e) => onChange({ ...settings, audience: e.target.value as AudienceType })}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          >
            {audienceOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-slate-900 text-slate-200">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tone</span>
          </label>
          <select
            value={settings.tone}
            onChange={(e) => onChange({ ...settings, tone: e.target.value as ToneType })}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          >
            {toneOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-slate-900 text-slate-200">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-emerald-400" />
            <span>Language</span>
          </label>
          <select
            value={settings.language}
            onChange={(e) => onChange({ ...settings, language: e.target.value as LanguageType })}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-sans"
          >
            {languageOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-slate-900 text-slate-200">
                {opt.label} ({opt.native})
              </option>
            ))}
          </select>
        </div>

        {/* Communication Objective */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>Communication Objective</span>
          </label>
          <select
            value={settings.objective}
            onChange={(e) => onChange({ ...settings, objective: e.target.value as CommunicationObjective })}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          >
            {objectiveOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-slate-900 text-slate-200">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content Style */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span>Content Style</span>
          </label>
          <select
            value={settings.style}
            onChange={(e) => onChange({ ...settings, style: e.target.value as ContentStyle })}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          >
            {styleOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-slate-900 text-slate-200">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Detail Level */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-rose-400" />
            <span>Detail Level</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {detailOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange({ ...settings, detailLevel: opt.id })}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all text-center ${
                  settings.detailLevel === opt.id
                    ? 'bg-brand-600 text-white font-semibold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
