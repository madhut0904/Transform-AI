import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai/ai-service';
import { CanonicalModel, GenerationSettings, OutputType } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { canonicalModel, outputType, settings, transformationId } = body as {
      canonicalModel: CanonicalModel;
      outputType: OutputType;
      settings: GenerationSettings;
      transformationId: string;
    };

    if (!canonicalModel || !outputType) {
      return NextResponse.json(
        { error: 'canonicalModel and outputType are required' },
        { status: 400 }
      );
    }

    const deliverable = await aiService.generateDeliverable(
      canonicalModel,
      outputType,
      settings,
      transformationId || `tf-${Date.now()}`
    );

    return NextResponse.json({ success: true, deliverable });
  } catch (error: any) {
    console.error('Generate API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Generation failed' },
      { status: 500 }
    );
  }
}
