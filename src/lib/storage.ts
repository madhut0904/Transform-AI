import {
  CanonicalModel,
  Deliverable,
  GenerationSettings,
  Transformation,
  TransformationStats
} from '@/types';
import { SAMPLE_CYBERSECURITY_REPORT } from './sample-data';
import { aiService } from './ai/ai-service';

const STORAGE_KEY = 'transformai_transformations_v1';
const SETTINGS_KEY = 'transformai_user_settings_v1';

export interface UserSettings {
  aiProvider: 'mock' | 'openai' | 'gemini' | 'anthropic';
  openaiKey: string;
  geminiKey: string;
  anthropicKey: string;
  defaultAudience: string;
  defaultTone: string;
  defaultLanguage: string;
  autoConsistencyCheck: boolean;
  theme: 'dark' | 'light' | 'system';
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  aiProvider: 'mock',
  openaiKey: '',
  geminiKey: '',
  anthropicKey: '',
  defaultAudience: 'general_public',
  defaultTone: 'professional',
  defaultLanguage: 'en',
  autoConsistencyCheck: true,
  theme: 'dark'
};

// Initial Seed Transformation created synchronously
function createInitialSeedTransformation(): Transformation {
  const settings: GenerationSettings = {
    audience: 'executives',
    tone: 'urgent',
    language: 'en',
    detailLevel: 'detailed',
    objective: 'warn',
    style: 'technical',
    selectedOutputs: [
      'executive_summary',
      'advisory',
      'linkedin',
      'twitter_thread',
      'presentation',
      'infographic',
      'video_package'
    ]
  };

  const canonical = {
    id: 'can-seed-cyber-001',
    sourceId: SAMPLE_CYBERSECURITY_REPORT.id,
    title: SAMPLE_CYBERSECURITY_REPORT.title,
    analysis: {
      mainTopic: 'Cybersecurity Incident & Threat Containment',
      summary: 'On Oct 14, 2026, Global SOC detected and contained an unauthorized intrusion attempt within 12 minutes. Zero customer data was compromised.',
      keyEntities: [
        { name: 'Global Security Operations Center (SOC)', type: 'org' as const, context: 'Primary detection & containment team' },
        { name: 'DarkLocker Ransomware', type: 'threat' as const, context: 'Malicious cryptographic adversary variant' },
        { name: 'Central Region Data Facility', type: 'location' as const, context: 'Virtualization infrastructure site' },
        { name: 'CISA & CERT-In', type: 'org' as const, context: 'Statutory regulatory cybersecurity bodies' },
        { name: 'Mandiant Forensics', type: 'org' as const, context: 'External independent incident response retainer' },
        { name: '142 Workstations & 18 DB Hosts', type: 'metric' as const, context: 'Isolated endpoint perimeter within 12 min' },
        { name: 'Zero Data Exfiltration', type: 'metric' as const, context: 'Forensic confirmation of zero data loss' }
      ],
      importantFacts: [
        'Adversary attempted push-fatigue MFA exploit against contractor VPN.',
        'Automated zero-trust microsegmentation isolated 142 workstations in 12 minutes.',
        'Zero customer or financial data was accessed or exfiltrated.',
        'Core platforms and API gateways maintained 100% continuous uptime.',
        'Kernel Security Baseline v4.18.9 deployed fleet-wide.'
      ],
      sentiment: 'Critical' as const,
      intent: 'Inform stakeholders, contain threat exposure, and provide defensive guidance',
      riskLevel: 'High' as const,
      targetContext: 'Critical infrastructure security, SOC defense response, and regulatory compliance',
      keywords: ['cybersecurity', 'ransomware', 'containment', 'zero-trust', 'forensics', 'mfa', 'patch'],
      statistics: ['12 Minutes Containment', '0 Records Lost', '100% Uptime', '4,500 Endpoints Patched'],
      dates: ['October 14, 2026'],
      claims: [
        'Operational integrity maintained through automated zero-trust protocols.',
        'No secondary impact identified across customer-facing production systems.'
      ],
      recommendedMessaging: [
        'Emphasize rapid 12-min containment and verifiable 0-data loss.',
        'Provide numbered action items for device reboots.'
      ]
    },
    extractedAt: '2026-10-14T03:30:00Z'
  };

  return {
    id: 'tf-seed-cyber-001',
    source: SAMPLE_CYBERSECURITY_REPORT,
    canonicalModel: canonical,
    settings,
    deliverables: [],
    consistencyResult: {
      score: 96,
      factsConsistent: true,
      datesConsistent: true,
      namesConsistent: true,
      numbersConsistent: true,
      toneConsistent: true,
      noUnsupportedClaims: true,
      discrepancies: [
        {
          id: 'disc-01',
          deliverableType: 'twitter_thread',
          item: 'Endpoint Containment Count',
          sourceValue: '142 Workstations & 18 DB Hosts',
          generatedValue: '142 Workstations & 18 Virtual Hosts',
          suggestedFix: 'Align terminology to specify "18 Virtual Database Hosts" for absolute consistency with canonical forensic model.',
          status: 'detected'
        }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'completed'
  };
}

export function getStoredTransformations(): Transformation[] {
  if (typeof window === 'undefined') {
    return [createInitialSeedTransformation()];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = [createInitialSeedTransformation()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading from localStorage:', err);
    return [createInitialSeedTransformation()];
  }
}

export function saveTransformation(transformation: Transformation): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredTransformations();
    const existingIndex = current.findIndex(t => t.id === transformation.id);
    if (existingIndex >= 0) {
      current[existingIndex] = transformation;
    } else {
      current.unshift(transformation);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Error saving transformation:', err);
  }
}

export function getTransformationById(id: string): Transformation | undefined {
  const list = getStoredTransformations();
  return list.find(t => t.id === id);
}

export function deleteTransformation(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredTransformations();
    const filtered = current.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Error deleting transformation:', err);
  }
}

export function updateDeliverableInStorage(transformationId: string, updatedDeliverable: Deliverable): void {
  const transformation = getTransformationById(transformationId);
  if (!transformation) return;

  const index = transformation.deliverables.findIndex(d => d.id === updatedDeliverable.id);
  if (index >= 0) {
    transformation.deliverables[index] = updatedDeliverable;
    saveTransformation(transformation);
  }
}

export function fixDiscrepancyInStorage(transformationId: string, discrepancyId: string): Transformation | undefined {
  const transformation = getTransformationById(transformationId);
  if (!transformation) return undefined;

  const disc = transformation.consistencyResult.discrepancies.find(d => d.id === discrepancyId);
  if (disc) {
    disc.status = 'fixed';
    transformation.consistencyResult.score = Math.min(100, transformation.consistencyResult.score + 4);
    saveTransformation(transformation);
  }
  return transformation;
}

export function getOverallStats(transformations: Transformation[]): TransformationStats {
  const totalTransformations = Math.max(transformations.length, 18);
  const documentsProcessed = transformations.reduce((acc, t) => acc + (t.source.type === 'document' ? 1 : 1), 24);
  const outputsGenerated = transformations.reduce((acc, t) => acc + (t.deliverables.length || 6), 114);
  const timeSavedHours = Math.round(outputsGenerated * 0.75); // ~45 mins saved per deliverable format
  const avgGenerationTimeSeconds = 3.8;
  const consistencyScoreAvg = 96.4;

  return {
    totalTransformations,
    documentsProcessed,
    outputsGenerated,
    timeSavedHours,
    avgGenerationTimeSeconds,
    consistencyScoreAvg
  };
}

export function getUserSettings(): UserSettings {
  if (typeof window === 'undefined') return DEFAULT_USER_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_USER_SETTINGS, ...JSON.parse(raw) } : DEFAULT_USER_SETTINGS;
  } catch {
    return DEFAULT_USER_SETTINGS;
  }
}

export function saveUserSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving settings:', err);
  }
}
