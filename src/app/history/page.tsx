'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  History,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  Sparkles,
  FileCode,
  FileText,
  Image as ImageIcon,
  Video,
  Globe,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Transformation } from '@/types';
import { deleteTransformation, getStoredTransformations } from '@/lib/storage';

export default function HistoryPage() {
  const router = useRouter();
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    setTransformations(getStoredTransformations());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTransformation(id);
    setTransformations(transformations.filter((t) => t.id !== id));
  };

  const filtered = transformations.filter((t) => {
    const titleMatch = (t.canonicalModel?.title || t.source.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = t.source.rawContent.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedType === 'all' || t.source.type === selectedType;
    return (titleMatch || contentMatch) && typeMatch;
  });

  const getInputIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileCode className="w-4 h-4 text-blue-400" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-purple-400" />;
      case 'video':
        return <Video className="w-4 h-4 text-rose-400" />;
      case 'url':
        return <Globe className="w-4 h-4 text-emerald-400" />;
      default:
        return <FileText className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              AUDIT & LOGS
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {transformations.length} Transformations Recorded
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Transformation History</h1>
          <p className="text-xs text-slate-300">
            Search, inspect, or resume previous multi-format enterprise transformation jobs.
          </p>
        </div>

        <button
          onClick={() => router.push('/transform')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all shadow-md shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Transformation</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by topic, entity, keyword, or source content..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Source Types</option>
            <option value="text">Text Input</option>
            <option value="document">PDF / DOCX</option>
            <option value="image">Image OCR</option>
            <option value="video">Video / Audio</option>
            <option value="url">Web URL</option>
          </select>
        </div>
      </div>

      {/* Transformations Grid / List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/transform?id=${item.id}`)}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700/60 mt-0.5">
                {getInputIcon(item.source.type)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                    {item.canonicalModel?.title || item.source.title || 'Untitled Transformation'}
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                    {item.source.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                  {item.canonicalModel?.analysis?.summary || item.source.rawContent.slice(0, 100)}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span>•</span>
                  <span>Audience: {item.settings.audience.replace('_', ' ')}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">
                    {item.consistencyResult.score}% Consistency
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
              <span className="px-3 py-1 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30 text-xs font-mono font-semibold">
                {item.deliverables?.length || item.settings?.selectedOutputs?.length || 6} Outputs
              </span>

              <button
                onClick={() => router.push(`/transform?id=${item.id}`)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium transition-colors"
              >
                <span>Open Workspace</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={(e) => handleDelete(item.id, e)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors border border-slate-700"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <History className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="text-sm font-semibold text-white">No Transformations Found</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No previous transformations match your filter criteria. Try searching for a different keyword or create a new transformation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
