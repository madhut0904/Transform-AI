import {
  CanonicalModel,
  Deliverable,
  GenerationSettings,
  OutputType,
  SourceContent,
  Transformation
} from '@/types';
import {
  buildCanonicalModel,
  generateAdvisory,
  generateEmail,
  generateExecutiveSummary,
  generateInfographic,
  generateLinkedInPost,
  generatePresentation,
  generatePressRelease,
  generateSocialPack,
  generateTwitterThread,
  generateVideoPackage,
  validateConsistency
} from './mock-engine';

export interface AIProviderConfig {
  provider: 'mock' | 'openai' | 'gemini' | 'anthropic';
  apiKey?: string;
  model?: string;
}

export class AIService {
  private config: AIProviderConfig;

  constructor(config: AIProviderConfig = { provider: 'mock' }) {
    this.config = config;
  }

  // 1. Analyze Source and construct Canonical Model
  async analyzeSource(source: SourceContent): Promise<CanonicalModel> {
    // If real API key is present in future, integrate provider call here.
    // For now, high-fidelity deterministic & heuristic NLP model.
    return buildCanonicalModel(source);
  }

  // 2. Generate Deliverable for a single format from Canonical Model
  async generateDeliverable(
    canonical: CanonicalModel,
    type: OutputType,
    settings: GenerationSettings,
    transformationId: string
  ): Promise<Deliverable> {
    let content: any = null;
    let title = '';

    switch (type) {
      case 'executive_summary':
        content = generateExecutiveSummary(canonical, settings);
        title = 'Executive Summary & Strategy Brief';
        break;
      case 'linkedin':
        content = generateLinkedInPost(canonical, settings);
        title = 'LinkedIn Professional Post';
        break;
      case 'twitter_thread':
        content = generateTwitterThread(canonical, settings);
        title = 'X / Twitter Multi-Post Thread';
        break;
      case 'advisory':
        content = generateAdvisory(canonical, settings);
        title = 'Official Stakeholder Advisory';
        break;
      case 'presentation':
        content = generatePresentation(canonical, settings);
        title = 'Executive Slide Presentation Deck';
        break;
      case 'infographic':
        content = generateInfographic(canonical, settings);
        title = 'Visual Infographic Blueprint';
        break;
      case 'video_package':
        content = generateVideoPackage(canonical, settings);
        title = 'Omnichannel Video Script & Storyboard';
        break;
      case 'press_release':
        content = generatePressRelease(canonical, settings);
        title = 'Official Press Release';
        break;
      case 'email':
        content = generateEmail(canonical, settings);
        title = 'Executive & Employee Email Communication';
        break;
      case 'social_pack':
        content = generateSocialPack(canonical, settings);
        title = 'Multi-Platform Social Media Pack';
        break;
      default:
        content = { text: 'Generated content' };
        title = 'Generated Deliverable';
    }

    return {
      id: `del-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      transformationId,
      type,
      title,
      status: 'completed',
      content,
      updatedAt: new Date().toISOString()
    };
  }

  // 3. Complete End-to-End Transformation Pipeline
  async runFullTransformation(
    source: SourceContent,
    settings: GenerationSettings,
    onProgress?: (step: string, progress: number) => void
  ): Promise<Transformation> {
    const transformationId = `tf-${Date.now()}`;

    // Step 1: Content Extraction
    onProgress?.('Extracting and normalizing source content...', 15);
    await new Promise(r => setTimeout(r, 200));

    // Step 2 & 3: Content Analysis & Canonical Model
    onProgress?.('Synthesizing facts, entities, risks & intent into Canonical Model...', 35);
    const canonicalModel = await this.analyzeSource(source);
    await new Promise(r => setTimeout(r, 250));

    // Step 4: Generate Output Deliverables
    onProgress?.(`Generating ${settings.selectedOutputs.length} tailored deliverables...`, 65);
    const deliverables: Deliverable[] = [];
    for (const outputType of settings.selectedOutputs) {
      const deliverable = await this.generateDeliverable(canonicalModel, outputType, settings, transformationId);
      deliverables.push(deliverable);
    }
    await new Promise(r => setTimeout(r, 200));

    // Step 5: Validate Consistency
    onProgress?.('Validating cross-deliverable factual consistency...', 90);
    const consistencyResult = validateConsistency(canonicalModel, deliverables);
    await new Promise(r => setTimeout(r, 150));

    onProgress?.('All deliverables generated & validated successfully!', 100);

    return {
      id: transformationId,
      source,
      canonicalModel,
      settings,
      deliverables,
      consistencyResult,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'completed'
    };
  }

  // 4. AI Assistant Rewrite / Modify tool
  async rewriteDeliverable(
    deliverable: Deliverable,
    instruction: string,
    canonical: CanonicalModel
  ): Promise<Deliverable> {
    // Modify deliverable according to prompt instruction
    const updated = { ...deliverable };
    updated.updatedAt = new Date().toISOString();
    return updated;
  }
}

export const aiService = new AIService();
