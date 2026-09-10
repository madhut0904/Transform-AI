'use client';

import React, { useState } from 'react';
import {
  Video,
  Play,
  Clock,
  Users,
  Film,
  Music,
  Subtitles,
  FileCode,
  Sparkles,
  Eye
} from 'lucide-react';
import { VideoPackageContent } from '@/types';

interface VideoPackageViewProps {
  content: VideoPackageContent;
}

export default function VideoPackageView({ content }: VideoPackageViewProps) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const activeScene = content.storyboard[activeSceneIndex] || content.storyboard[0];

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{content.title}</div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> {content.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" /> {content.targetAudience}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Video Storyboard & Timeline UI */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-brand-400" />
            <h3 className="text-sm font-bold text-white">Scene-by-Scene Storyboard & Timeline</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {content.storyboard.length} Scenes Total
          </span>
        </div>

        {/* Video Timeline Strip */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase">
            Interactive Timeline (Click Scene)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {content.storyboard.map((scene, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSceneIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeSceneIndex === idx
                    ? 'bg-brand-950/70 border-brand-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-brand-400 font-bold">SCENE {scene.sceneNumber}</span>
                  <span>{scene.durationSeconds}s</span>
                </div>
                <div className="text-xs font-medium truncate text-slate-200">{scene.onScreenText}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Scene Detail Card */}
        <div className="rounded-xl bg-slate-950 p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-mono text-xs font-bold">
                SCENE {activeScene.sceneNumber}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Duration: {activeScene.durationSeconds} Seconds
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Transition: {activeScene.transition}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visual Description */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase text-purple-400 flex items-center gap-1.5">
                <Eye className="w-3 h-3" />
                <span>Visual Description & Motion</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {activeScene.visualDescription}
              </p>
            </div>

            {/* On Screen Text */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase text-brand-400 flex items-center gap-1.5">
                <FileCode className="w-3 h-3" />
                <span>On-Screen Graphic / Banner</span>
              </div>
              <div className="text-xs font-bold text-brand-200 font-mono bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {activeScene.onScreenText}
              </div>
            </div>
          </div>

          {/* Narration Script for this scene */}
          <div className="space-y-1.5 pt-2">
            <div className="text-[11px] font-mono uppercase text-emerald-400 flex items-center gap-1.5">
              <Play className="w-3 h-3 fill-emerald-400" />
              <span>Voiceover Narration Script</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              &ldquo;{activeScene.narrationText}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <Music className="w-3.5 h-3.5 text-slate-500" />
            <span>Audio track: {activeScene.backgroundMusic}</span>
          </div>
        </div>
      </div>

      {/* Subtitles & Production Directives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Timed Subtitles */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Subtitles className="w-3.5 h-3.5 text-blue-400" />
            <span>Synchronized Subtitles (.SRT / .VTT)</span>
          </div>
          <div className="space-y-1 text-xs text-slate-300 font-mono max-h-48 overflow-y-auto">
            {content.subtitles.map((sub, idx) => (
              <div key={idx} className="p-1.5 rounded bg-slate-900/60 border border-slate-800/60 text-[11px]">
                {sub}
              </div>
            ))}
          </div>
        </div>

        {/* Visual Production Directives */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Visual Production & Styling Guidelines</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {content.visualRecommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
