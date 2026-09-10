export type SourceType = 'text' | 'document' | 'image' | 'video' | 'url' | 'prompt';

export type AudienceType =
  | 'general_public'
  | 'executives'
  | 'employees'
  | 'customers'
  | 'government'
  | 'technical_experts'
  | 'investors'
  | 'students';

export type ToneType =
  | 'professional'
  | 'formal'
  | 'friendly'
  | 'urgent'
  | 'persuasive'
  | 'educational'
  | 'neutral';

export type LanguageType =
  | 'en'
  | 'hi'
  | 'kn'
  | 'ta'
  | 'te'
  | 'ml'
  | 'mr';

export type DetailLevel = 'brief' | 'standard' | 'detailed' | 'comprehensive';

export type CommunicationObjective =
  | 'inform'
  | 'educate'
  | 'warn'
  | 'persuade'
  | 'promote'
  | 'summarize'
  | 'explain';

export type ContentStyle =
  | 'corporate'
  | 'news'
  | 'technical'
  | 'social_media'
  | 'government'
  | 'marketing'
  | 'academic';

export type OutputType =
  | 'executive_summary'
  | 'linkedin'
  | 'twitter_thread'
  | 'advisory'
  | 'presentation'
  | 'infographic'
  | 'video_package'
  | 'press_release'
  | 'email'
  | 'social_pack';

export interface SourceContent {
  id: string;
  type: SourceType;
  title: string;
  rawContent: string;
  fileName?: string;
  fileSize?: number;
  url?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface EntityItem {
  name: string;
  type: 'org' | 'person' | 'location' | 'system' | 'date' | 'metric' | 'threat';
  context?: string;
}

export interface ContentAnalysis {
  mainTopic: string;
  summary: string;
  keyEntities: EntityItem[];
  importantFacts: string[];
  sentiment: 'Positive' | 'Neutral' | 'Negative' | 'Critical';
  intent: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  targetContext: string;
  keywords: string[];
  statistics: string[];
  dates: string[];
  claims: string[];
  recommendedMessaging: string[];
}

export interface CanonicalModel {
  id: string;
  sourceId: string;
  title: string;
  analysis: ContentAnalysis;
  extractedAt: string;
}

export interface GenerationSettings {
  audience: AudienceType;
  tone: ToneType;
  language: LanguageType;
  detailLevel: DetailLevel;
  objective: CommunicationObjective;
  style: ContentStyle;
  selectedOutputs: OutputType[];
}

// Deliverables Content Interfaces
export interface ExecutiveSummaryContent {
  overview: string;
  keyFindings: string[];
  businessImpact: string[];
  risks: string[];
  recommendedActions: string[];
}

export interface LinkedInPostContent {
  hook: string;
  mainContent: string;
  keyPoints: string[];
  callToAction: string;
  hashtags: string[];
  characterCount: number;
}

export interface TwitterPostItem {
  postNumber: number;
  totalPosts: number;
  text: string;
  charCount: number;
}

export interface TwitterThreadContent {
  tweets: TwitterPostItem[];
  hashtags: string[];
}

export interface AdvisoryContent {
  title: string;
  advisoryId: string;
  date: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  summary: string;
  background: string;
  whatHappened: string;
  potentialImpact: string;
  recommendedActions: string[];
  indicators: string[];
  contactInfo: string;
}

export interface SlideItem {
  slideNumber: number;
  title: string;
  subtitle?: string;
  bulletPoints: string[];
  visualRecommendation: string;
  speakerNotes: string;
}

export interface PresentationContent {
  deckTitle: string;
  totalSlides: number;
  slides: SlideItem[];
}

export interface InfographicDataPoint {
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

export interface InfographicContent {
  headline: string;
  subtitle: string;
  keyMetric: {
    value: string;
    label: string;
    trend?: string;
  };
  dataPoints: InfographicDataPoint[];
  visualHierarchy: string[];
  chartRecommendation: string;
  footerMessage: string;
}

export interface VideoScene {
  sceneNumber: number;
  durationSeconds: number;
  visualDescription: string;
  narrationText: string;
  onScreenText: string;
  backgroundMusic: string;
  transition: string;
}

export interface VideoPackageContent {
  title: string;
  duration: string;
  targetAudience: string;
  fullScript: string;
  narration: string;
  subtitles: string[];
  storyboard: VideoScene[];
  visualRecommendations: string[];
}

export interface PressReleaseContent {
  headline: string;
  subheadline: string;
  dateline: string;
  leadParagraph: string;
  bodyParagraphs: string[];
  executiveQuote: {
    quote: string;
    author: string;
    title: string;
  };
  boilerplate: string;
  mediaContact: string;
}

export interface EmailContent {
  subject: string;
  preheader: string;
  greeting: string;
  body: string;
  bulletHighlights: string[];
  callToAction: {
    text: string;
    linkText: string;
  };
  signOff: string;
}

export interface SocialPackContent {
  platformPosts: {
    platform: 'Facebook' | 'Instagram' | 'Telegram' | 'Slack / Teams';
    content: string;
    charCount: number;
    mediaSuggestion: string;
  }[];
}

export interface Deliverable {
  id: string;
  transformationId: string;
  type: OutputType;
  title: string;
  status: 'completed' | 'generating' | 'failed';
  content:
    | ExecutiveSummaryContent
    | LinkedInPostContent
    | TwitterThreadContent
    | AdvisoryContent
    | PresentationContent
    | InfographicContent
    | VideoPackageContent
    | PressReleaseContent
    | EmailContent
    | SocialPackContent
    | Record<string, unknown>;
  rawMarkdown?: string;
  updatedAt: string;
}

export interface DiscrepancyItem {
  id: string;
  deliverableType: OutputType;
  item: string;
  sourceValue: string;
  generatedValue: string;
  suggestedFix: string;
  status: 'detected' | 'fixed';
}

export interface ConsistencyCheckResult {
  score: number;
  factsConsistent: boolean;
  datesConsistent: boolean;
  namesConsistent: boolean;
  numbersConsistent: boolean;
  toneConsistent: boolean;
  noUnsupportedClaims: boolean;
  discrepancies: DiscrepancyItem[];
}

export interface Transformation {
  id: string;
  source: SourceContent;
  canonicalModel: CanonicalModel;
  settings: GenerationSettings;
  deliverables: Deliverable[];
  consistencyResult: ConsistencyCheckResult;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'analyzing' | 'generating' | 'completed' | 'failed';
}

export interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  defaultSettings: Partial<GenerationSettings>;
  samplePrompt: string;
  recommendedOutputs: OutputType[];
  badge?: string;
}

export interface TransformationStats {
  totalTransformations: number;
  documentsProcessed: number;
  outputsGenerated: number;
  timeSavedHours: number;
  avgGenerationTimeSeconds: number;
  consistencyScoreAvg: number;
}
