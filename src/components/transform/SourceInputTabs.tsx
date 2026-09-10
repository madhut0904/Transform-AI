'use client';

import React, { useState } from 'react';
import {
  FileText,
  FileCode,
  Image as ImageIcon,
  Video,
  Globe,
  MessageSquare,
  Upload,
  Sparkles,
  Clipboard,
  Trash2,
  Check,
  RefreshCw
} from 'lucide-react';
import { SourceContent, SourceType } from '@/types';
import { SAMPLE_CYBERSECURITY_REPORT } from '@/lib/sample-data';

interface SourceInputTabsProps {
  source: SourceContent;
  onChange: (source: SourceContent) => void;
  onAnalyze?: () => void;
  isAnalyzing?: boolean;
}

export default function SourceInputTabs({
  source,
  onChange,
  onAnalyze,
  isAnalyzing
}: SourceInputTabsProps) {
  const [activeTab, setActiveTab] = useState<SourceType>(source.type || 'text');
  const [urlInput, setUrlInput] = useState('');
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState(false);

  const tabs: { id: SourceType; label: string; icon: React.ElementType }[] = [
    { id: 'text', label: 'Text Input', icon: FileText },
    { id: 'document', label: 'Document (PDF/DOCX)', icon: FileCode },
    { id: 'image', label: 'Image OCR', icon: ImageIcon },
    { id: 'video', label: 'Video / Audio', icon: Video },
    { id: 'url', label: 'Web URL', icon: Globe },
    { id: 'prompt', label: 'Custom Prompt', icon: MessageSquare },
  ];

  const handleTextChange = (text: string) => {
    onChange({
      ...source,
      type: activeTab,
      rawContent: text,
      title: source.title || (text.slice(0, 50).trim() + (text.length > 50 ? '...' : ''))
    });
  };

  const handleLoadSample = () => {
    onChange({
      ...SAMPLE_CYBERSECURITY_REPORT,
      id: `src-${Date.now()}`
    });
  };

  const handleClear = () => {
    onChange({
      id: `src-${Date.now()}`,
      type: activeTab,
      title: '',
      rawContent: '',
      createdAt: new Date().toISOString()
    });
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleTextChange(text);
    } catch {
      // Fallback
    }
  };

  const handleSimulatedUpload = (fileType: string, fileName: string, content: string) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onChange({
        id: `src-upload-${Date.now()}`,
        type: activeTab,
        title: fileName.replace(/\.[^/.]+$/, ''),
        rawContent: content,
        fileName,
        fileSize: 245000,
        createdAt: new Date().toISOString()
      });
    }, 800);
  };

  const handleFetchUrl = () => {
    if (!urlInput) return;
    setIsFetchingUrl(true);
    setTimeout(() => {
      setIsFetchingUrl(false);
      const simulatedText = `FETCHED FROM: ${urlInput}
TITLE: Enterprise Global Incident Disclosure & Policy Directive
DATE: ${new Date().toLocaleDateString()}

On October 14, 2026, security telemetry alerted the Operations Command to anomalous activity. Zero-trust isolation quarantined 142 endpoints in 12 minutes. Zero customer records compromised. Platform uptime remained 100%. Mandatory kernel patch v4.18.9 active.`;
      
      onChange({
        id: `src-url-${Date.now()}`,
        type: 'url',
        url: urlInput,
        title: `Intelligence Brief: ${urlInput.replace(/^https?:\/\//, '').split('/')[0]}`,
        rawContent: simulatedText,
        createdAt: new Date().toISOString()
      });
    }, 1000);
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-5">
      {/* Title & Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="text-lg font-bold text-white">Source Content</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Provide the single source of information you wish to transform across all communication channels.
          </p>
        </div>

        {/* Quick Sample Loader */}
        <button
          type="button"
          onClick={handleLoadSample}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all group"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
          <span>Load Cyber Incident Sample</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                onChange({ ...source, type: tab.id });
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      {activeTab === 'text' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">
              Source Text Editor
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePaste}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-brand-300 font-medium px-2 py-1 rounded bg-slate-800/80 transition-colors"
              >
                <Clipboard className="w-3 h-3" />
                <span>Paste</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 font-medium px-2 py-1 rounded bg-slate-800/80 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <textarea
            rows={8}
            value={source.rawContent}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Paste your source content here (incident report, policy document, earnings statement, news brief, research abstract, or memo)..."
            className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-sans leading-relaxed resize-y"
          />

          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <div>
              {source.rawContent.length} characters | {source.rawContent.split(/\s+/).filter(Boolean).length} words
            </div>
            {source.rawContent.length > 0 && (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Source Ready for Canonical Analysis
              </span>
            )}
          </div>
        </div>
      )}

      {activeTab === 'document' && (
        <div className="space-y-4">
          <div
            onClick={() => handleSimulatedUpload('pdf', 'Cybersecurity_Incident_Report_2026.pdf', SAMPLE_CYBERSECURITY_REPORT.rawContent)}
            className="border-2 border-dashed border-slate-700 hover:border-brand-500 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-950/50 hover:bg-slate-900/50 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-brand-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">
              Drop your PDF, DOCX or TXT file here
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Automated parsing extracts structured tables, headers, metadata, and body text. Click to test sample PDF upload.
            </p>
          </div>

          {source.fileName && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCode className="w-5 h-5 text-brand-400" />
                <div>
                  <div className="text-xs font-semibold text-white">{source.fileName}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Extracted 492 words successfully</div>
                </div>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-slate-400 hover:text-rose-400"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'image' && (
        <div className="space-y-4">
          <div
            onClick={() => handleSimulatedUpload('image', 'Security_Advisory_Scan_OCR.png', SAMPLE_CYBERSECURITY_REPORT.rawContent)}
            className="border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-950/50 hover:bg-slate-900/50 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">
              Upload Image for High-Precision OCR
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Supports PNG, JPG, WEBP scans, charts, infographics, and scanned memos. Click to test OCR extraction.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'video' && (
        <div className="space-y-4">
          <div
            onClick={() => handleSimulatedUpload('video', 'Emergency_Briefing_Recording.mp4', SAMPLE_CYBERSECURITY_REPORT.rawContent)}
            className="border-2 border-dashed border-slate-700 hover:border-rose-500 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-950/50 hover:bg-slate-900/50 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">
              Upload Video or Audio for Automated Transcription
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Multi-speaker neural transcription with timestamp alignment. Click to test sample media upload.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'url' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://news.organization.com/security-incident-disclosure-2026"
              className="flex-1 rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
            <button
              type="button"
              onClick={handleFetchUrl}
              disabled={isFetchingUrl}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              {isFetchingUrl ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <Globe className="w-3.5 h-3.5" />
                  <span>Fetch Content</span>
                </>
              )}
            </button>
          </div>
          {source.rawContent && source.url && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <div className="font-semibold text-brand-300 mb-1">Fetched Content Preview:</div>
              <div className="line-clamp-3 text-slate-400 font-mono text-[11px]">{source.rawContent}</div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'prompt' && (
        <div className="space-y-3">
          <textarea
            rows={5}
            value={source.rawContent}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Write a free-form instruction or outline (e.g. 'Draft a comprehensive quarterly security status report highlighting our zero-trust migration, 12-min response time, and next month board presentation...')"
            className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      )}
    </div>
  );
}
