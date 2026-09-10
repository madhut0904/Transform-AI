import { NextRequest, NextResponse } from 'next/server';
import { validateConsistency } from '@/lib/ai/mock-engine';
import { CanonicalModel, Deliverable } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { canonicalModel, deliverables } = body as {
      canonicalModel: CanonicalModel;
      deliverables: Deliverable[];
    };

    if (!canonicalModel || !deliverables) {
      return NextResponse.json(
        { error: 'canonicalModel and deliverables are required' },
        { status: 400 }
      );
    }

    const validationResult = validateConsistency(canonicalModel, deliverables);
    return NextResponse.json({ success: true, validationResult });
  } catch (error: any) {
    console.error('Validate API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Validation failed' },
      { status: 500 }
    );
  }
}
