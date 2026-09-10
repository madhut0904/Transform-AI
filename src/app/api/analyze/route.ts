import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai/ai-service';
import { SourceContent } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source } = body as { source: SourceContent };

    if (!source || !source.rawContent) {
      return NextResponse.json(
        { error: 'Source content is required for analysis' },
        { status: 400 }
      );
    }

    const canonicalModel = await aiService.analyzeSource(source);
    return NextResponse.json({ success: true, canonicalModel });
  } catch (error: any) {
    console.error('Analyze API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Analysis failed' },
      { status: 500 }
    );
  }
}
