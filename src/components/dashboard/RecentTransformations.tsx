'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  FileCode,
  Image as ImageIcon,
  Video,
  Globe,
  MessageSquare,
  ArrowUpRight,
  ShieldAlert,
  CheckCircle2,
  Trash2,
  Eye,
  Sparkles
} from 'lucide-react';
import { Transformation } from '@/types';

interface RecentTransformationsProps {
  transformations: Transformation[];
  onDelete?: (id: string) => void;
}

export default function RecentTransformations({
  transformations,
  onDelete
}: RecentTransformationsProps) {
  const router = useRouter();

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Ready
          </span>
        );
      case 'generating':
      case 'analyzing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping"></span>
            Processing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300">
            Draft
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Recent Transformations</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Past multi-format transformation jobs generated from single sources
          </p>
        </div>
        <Link
          href="/history"
          className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1 transition-colors"
        >
          <span>View All History</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-5">Source & Topic</th>
              <th className="py-3 px-4">Input Type</th>
              <th className="py-3 px-4">Outputs</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {transformations.slice(0, 6).map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => router.push(`/transform?id=${item.id}`)}
              >
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700/50">
                      {getInputIcon(item.source.type)}
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-brand-300 transition-colors">
                        {item.canonicalModel?.title || item.source.title || 'Untitled Transformation'}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-sm">
                        {item.canonicalModel?.analysis?.mainTopic || item.source.rawContent.slice(0, 60)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 capitalize">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                    {item.source.type}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 font-semibold font-mono">
                    {item.deliverables?.length || item.settings?.selectedOutputs?.length || 6} Outputs
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="py-3.5 px-4">
                  {getStatusBadge(item.status)}
                </td>
                <td className="py-3.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => router.push(`/transform?id=${item.id}`)}
                      className="p-1.5 rounded-lg bg-brand-600/10 hover:bg-brand-600/20 text-brand-400 hover:text-brand-300 border border-brand-500/30 transition-colors"
                      title="Open Results Workspace"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
