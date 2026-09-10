'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Key,
  ShieldCheck,
  Cpu,
  Save,
  Check,
  Globe,
  Bell,
  Lock,
  Sparkles,
  Sliders
} from 'lucide-react';
import { DEFAULT_USER_SETTINGS, getUserSettings, saveUserSettings, UserSettings } from '@/lib/storage';

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_USER_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getUserSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              CONFIGURATION
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Enterprise AI & Security Policies
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Platform Settings
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Manage AI inference providers, API credentials, default audience postures, and compliance rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all shadow-md shrink-0"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Saved Changes' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* AI Provider Configuration */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Cpu className="w-4 h-4 text-brand-400" />
            <div>
              <h2 className="text-sm font-bold text-white">AI Inference Engine</h2>
              <p className="text-xs text-slate-400">Select active AI synthesis model and provider fallback</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[
              { id: 'mock', label: 'TransformAI Engine (Built-In)', sub: 'Zero latency • Offline capable' },
              { id: 'openai', label: 'OpenAI (GPT-4o)', sub: 'Cloud API Key required' },
              { id: 'gemini', label: 'Google Gemini Pro', sub: 'Multimodal analysis' },
              { id: 'anthropic', label: 'Anthropic Claude 3.5', sub: 'Long context synthesis' },
            ].map((prov) => (
              <button
                key={prov.id}
                type="button"
                onClick={() => setSettings({ ...settings, aiProvider: prov.id as any })}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  settings.aiProvider === prov.id
                    ? 'bg-brand-950/70 border-brand-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-white mb-0.5">{prov.label}</div>
                <div className="text-[10px] text-slate-400">{prov.sub}</div>
              </button>
            ))}
          </div>

          {/* API Keys inputs */}
          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-400" />
                <span>OpenAI API Key (Optional)</span>
              </label>
              <input
                type="password"
                value={settings.openaiKey}
                onChange={(e) => setSettings({ ...settings, openaiKey: e.target.value })}
                placeholder="sk-proj-..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-400" />
                <span>Google Gemini API Key (Optional)</span>
              </label>
              <input
                type="password"
                value={settings.geminiKey}
                onChange={(e) => setSettings({ ...settings, geminiKey: e.target.value })}
                placeholder="AIzaSy..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Default Communication Presets */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold text-white">Default Generation Presets</h2>
              <p className="text-xs text-slate-400">Pre-populate transformation controls across your workspace</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Default Audience</label>
              <select
                value={settings.defaultAudience}
                onChange={(e) => setSettings({ ...settings, defaultAudience: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                <option value="general_public">General Public</option>
                <option value="executives">Executives & C-Suite</option>
                <option value="government">Government Officials</option>
                <option value="technical_experts">Technical Experts</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Default Tone</label>
              <select
                value={settings.defaultTone}
                onChange={(e) => setSettings({ ...settings, defaultTone: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                <option value="professional">Professional</option>
                <option value="formal">Formal & Official</option>
                <option value="urgent">Urgent & Action-Oriented</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Default Language</label>
              <select
                value={settings.defaultLanguage}
                onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                <option value="en">English</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="kn">Kannada (ಕನ್ನಡ)</option>
                <option value="ta">Tamil (தமிழ்)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security, Governance & Verification */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Lock className="w-4 h-4 text-purple-400" />
            <div>
              <h2 className="text-sm font-bold text-white">Enterprise Security & Compliance</h2>
              <p className="text-xs text-slate-400">Strict zero-retention policies and factual consistency enforcement</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <div>
                <div className="text-xs font-semibold text-white">Automated Consistency Verification</div>
                <div className="text-[11px] text-slate-400">
                  Run factual alignment check on all generated deliverables before publication
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoConsistencyCheck}
                onChange={(e) => setSettings({ ...settings, autoConsistencyCheck: e.target.checked })}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 bg-slate-900 border-slate-700"
              />
            </label>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Data Training & Sovereign Data Isolation</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
