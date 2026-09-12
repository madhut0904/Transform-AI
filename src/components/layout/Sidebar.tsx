'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Sparkles,
  History,
  Layers,
  BarChart3,
  Settings,
  Zap,
  ShieldCheck,
  Command
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, keyNum: '1' },
    { name: 'New Transformation', href: '/transform', icon: Sparkles, badge: 'AI', keyNum: '2' },
    { name: 'History', href: '/history', icon: History, keyNum: '3' },
    { name: 'Templates', href: '/templates', icon: Layers, keyNum: '4' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, keyNum: '5' },
    { name: 'Settings', href: '/settings', icon: Settings, keyNum: '6' },
  ];

  // Global hotkeys (Alt+1 through Alt+6)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.altKey || e.metaKey || e.ctrlKey) {
        const item = navItems.find(n => n.keyNum === e.key);
        if (item) {
          e.preventDefault();
          router.push(item.href);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-30 transition-all duration-300 select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              Transform<span className="text-brand-400">AI</span>
            </span>
            <span className="text-[10px] block font-mono text-slate-400 tracking-wider uppercase -mt-0.5">
              Enterprise v2.4
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          <span>Workspace</span>
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 lowercase">
            <Command className="w-2.5 h-2.5" /> Alt+1..6
          </span>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span>{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  ⌥{item.keyNum}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Core Tagline Pill */}
      <div className="px-3 py-3 mx-3 mb-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-brand-400 font-semibold mb-1">
          <Zap className="w-3.5 h-3.5" />
          <span>Core Philosophy</span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          &ldquo;One Source. Every Communication Format.&rdquo;
        </p>
      </div>

      {/* Bottom AI Status & Profile */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 space-y-2">
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium">AI Engine</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono font-semibold">ONLINE</span>
        </div>

        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow">
              OP
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Gov & Comms Ops</div>
              <div className="text-[10px] text-slate-400">Enterprise Admin</div>
            </div>
          </div>
          <ShieldCheck className="w-4 h-4 text-brand-400" />
        </div>
      </div>
    </aside>
  );
}
