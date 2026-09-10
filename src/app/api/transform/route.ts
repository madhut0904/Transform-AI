import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai/ai-service';
import { GenerationSettings, SourceContent } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source, settings } = body as { source: SourceContent; settings: GenerationSettings };

    if (!source || !source.rawContent) {
      return NextResponse.json(
        { error: 'Source content is required' },
        { status: 400 }
      );
    }

    const transformation = await aiService.runFullTransformation(source, settings);

    return NextResponse.json({ success: true, transformation });
  } catch (error: any) {
    console.error('Transform API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Transformation failed' },
      { status: 500 }
    );
  }
}
