'use client';

import React, { Suspense } from 'react';
import MultiStepTransformer from '@/components/transform/MultiStepTransformer';
import { Loader2 } from 'lucide-react';

function TransformerLoading() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-3">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto" />
        <p className="text-xs text-slate-400 font-mono">Loading TransformAI Pipeline Workspace...</p>
      </div>
    </div>
  );
}

export default function TransformPage() {
  return (
    <Suspense fallback={<TransformerLoading />}>
      <MultiStepTransformer />
    </Suspense>
  );
}
