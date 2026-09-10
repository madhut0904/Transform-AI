import { SourceContent, Template } from '@/types';

export const SAMPLE_CYBERSECURITY_REPORT: SourceContent = {
  id: 'src-cyber-demo-001',
  type: 'text',
  title: 'Critical Ransomware Incident & Containment Action Report',
  rawContent: `INCIDENT ADVISORY REPORT: PROJECT BLACKSTONE CONTAINMENT
DATE: October 14, 2026 | CLASSIFICATION: TLP:AMBER | INCIDENT ID: INC-2026-8894

EXECUTIVE SUMMARY:
On October 14, 2026 at 02:45 UTC, the Global Security Operations Center (SOC) detected unauthorized lateral movement and suspicious payload deployment across 4 internal virtualization clusters in the Central Region Data Facility. The adversary attempted to execute a new variant of the DarkLocker ransomware.

KEY FINDINGS & TIMELINE:
1. Threat Vector: Initial vector identified as a compromised third-party vendor credential with MFA push fatigue exploitation at 01:15 UTC.
2. Scope & Containment: Automated endpoint detection isolated 142 internal workstations and 18 virtual database hosts within 12 minutes of detection. 
3. Data Security: Comprehensive forensic snapshot comparison confirms NO customer records or proprietary databases were exfiltrated. The cryptographic staging area was intercepted before encryption occurred.
4. Business Continuity: Core customer-facing services (Web Portal, API Gateway, Transaction Settlement) remained fully operational with zero downtime due to zero-trust microsegmentation.
5. Remediations Active: All compromised vendor sessions terminated, elevated credentials revoked, root CA certificates rotated, and patched endpoint intrusion rules pushed across all 4,500 fleet devices.

IMMEDIATE ACTION ITEMS:
- Enterprise employees must reboot endpoints to receive kernel security update v4.18.9.
- Third-party contractors must re-verify hardware biometric keys prior to VPN reconnection.
- Law enforcement (CISA & CERT-In) notified in accordance with statutory compliance frameworks.
- External security audit firm Mandiant retained for 30-day deep forensic verification.`,
  createdAt: new Date().toISOString(),
};

export const SAMPLE_TEMPLATES: Template[] = [
  {
    id: 'tpl-cyber-advisory',
    title: 'Cybersecurity Incident Advisory',
    category: 'Security & IT',
    description: 'Transform technical forensic findings into executive briefs, public advisories, employee guidance, and social warnings.',
    icon: 'ShieldAlert',
    badge: 'Popular',
    defaultSettings: {
      audience: 'executives',
      tone: 'urgent',
      language: 'en',
      detailLevel: 'detailed',
      objective: 'warn',
      style: 'technical',
      selectedOutputs: ['advisory', 'executive_summary', 'linkedin', 'twitter_thread', 'presentation', 'infographic', 'video_package']
    },
    samplePrompt: SAMPLE_CYBERSECURITY_REPORT.rawContent,
    recommendedOutputs: ['advisory', 'executive_summary', 'linkedin', 'twitter_thread', 'presentation', 'infographic', 'video_package']
  },
  {
    id: 'tpl-exec-brief',
    title: 'Executive C-Suite Briefing',
    category: 'Corporate Strategy',
    description: 'Convert dense industry reports, earnings data, or research into concise strategic decision memos and slide decks.',
    icon: 'Briefcase',
    badge: 'Enterprise',
    defaultSettings: {
      audience: 'executives',
      tone: 'formal',
      language: 'en',
      detailLevel: 'brief',
      objective: 'summarize',
      style: 'corporate',
      selectedOutputs: ['executive_summary', 'presentation', 'email', 'infographic']
    },
    samplePrompt: `Q3 FINANCIAL & OPERATIONAL PERFORMANCE SUMMARY
Total revenue grew 28% YoY to $142.6M, driven by 45% expansion in Enterprise Cloud Solutions. Operating margin improved by 340 bps to 22.8%. Gross customer retention reached 98.4%. Key risk: Supply chain lead times extended from 6 to 9 weeks in APAC. Strategic imperative: Accelerate AI-native platform migration to capture untapped $2.4B market opportunity before Q2 next fiscal year.`,
    recommendedOutputs: ['executive_summary', 'presentation', 'email', 'infographic']
  },
  {
    id: 'tpl-gov-announcement',
    title: 'Government & Public Policy Advisory',
    category: 'Public Sector',
    description: 'Distill legislative bills, public health directives, or civic advisories for general citizens, local press, and department heads.',
    icon: 'Landmark',
    badge: 'Official',
    defaultSettings: {
      audience: 'general_public',
      tone: 'formal',
      language: 'en',
      detailLevel: 'standard',
      objective: 'inform',
      style: 'government',
      selectedOutputs: ['advisory', 'press_release', 'social_pack', 'infographic', 'video_package']
    },
    samplePrompt: `MINISTRY PUBLIC HEALTH DIRECTIVE #2026-44: CLEAN WATER & MONSOON PREPAREDNESS
Municipal authorities across 14 coastal districts are instructed to initiate immediate water reservoir purification protocols starting Nov 1. Citizens are advised to boil drinking water and report local pipeline disruptions to toll-free helpline 1800-440-2026. Subsidized medical aid clinics are now open in 42 zonal primary centers.`,
    recommendedOutputs: ['advisory', 'press_release', 'social_pack', 'infographic', 'video_package']
  },
  {
    id: 'tpl-product-launch',
    title: 'Product Launch & Go-To-Market',
    category: 'Product & Marketing',
    description: 'Turn engineering feature specs or PRDs into compelling product launch press releases, LinkedIn posts, viral threads, and demo videos.',
    icon: 'Rocket',
    badge: 'Marketing',
    defaultSettings: {
      audience: 'customers',
      tone: 'persuasive',
      language: 'en',
      detailLevel: 'standard',
      objective: 'promote',
      style: 'marketing',
      selectedOutputs: ['linkedin', 'twitter_thread', 'press_release', 'video_package', 'social_pack']
    },
    samplePrompt: `PRODUCT LAUNCH BRIEF: NEXUSAURA GEN-3 EMBEDDED AI CHIPSET
Today we announce NexusAura Gen-3: the world's first sub-1W neural processing chip capable of running 7B parameter multimodal models directly on edge devices with 4.2x faster inference latency and zero cloud dependency. Pricing starts at $19/unit for OEM partners. General availability begins worldwide December 15.`,
    recommendedOutputs: ['linkedin', 'twitter_thread', 'press_release', 'video_package', 'social_pack']
  },
  {
    id: 'tpl-research-paper',
    title: 'Scientific Research Digest',
    category: 'Academic & Science',
    description: 'Synthesize complex scientific breakthroughs, clinical trials, or whitepapers into easily digestible infographics and multi-tier summaries.',
    icon: 'GraduationCap',
    defaultSettings: {
      audience: 'technical_experts',
      tone: 'educational',
      language: 'en',
      detailLevel: 'comprehensive',
      objective: 'explain',
      style: 'academic',
      selectedOutputs: ['executive_summary', 'infographic', 'presentation', 'linkedin']
    },
    samplePrompt: `RESEARCH PAPER DIGEST: QUANTUM TOPOLOGICAL PHONONIC MEMORY AT ROOM TEMPERATURE
Authors demonstrate coherent storage of acoustic topological phonons in a silicon-nitride acoustic waveguide at 295 Kelvin with a coherence time tau = 14.8 milliseconds. This represents an 80-fold increase over previous cryogenic benchmarks, enabling room-temperature quantum acoustic coprocessors.`,
    recommendedOutputs: ['executive_summary', 'infographic', 'presentation', 'linkedin']
  },
  {
    id: 'tpl-social-campaign',
    title: 'Omnichannel Social Campaign',
    category: 'Social Media',
    description: 'Broadcast single news or campaign updates simultaneously across LinkedIn, X/Twitter, Instagram, Facebook, and internal Slack/Teams.',
    icon: 'Share2',
    defaultSettings: {
      audience: 'general_public',
      tone: 'friendly',
      language: 'en',
      detailLevel: 'brief',
      objective: 'promote',
      style: 'social_media',
      selectedOutputs: ['linkedin', 'twitter_thread', 'social_pack', 'video_package']
    },
    samplePrompt: `COMPANY MILESTONE: REACHING 1,000,000 ACTIVE DEVELOPERS
TransformAI platform has officially surpassed 1 Million active developers worldwide across 140 countries. Over 500M deliverables have been generated to date, saving an estimated 12.5M human working hours. Special thank you virtual keynote scheduled for this Friday at 10 AM PST.`,
    recommendedOutputs: ['linkedin', 'twitter_thread', 'social_pack', 'video_package']
  }
];
