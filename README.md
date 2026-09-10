# ⚡ TransformAI — One Source. Every Communication Format.

![TransformAI Banner](https://img.shields.io/badge/TransformAI-Enterprise%20v2.4-6366f1?style=for-the-badge&logo=sparkles&logoColor=white)
![Next.js 14](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

> **"Transform one source of information into every communication format you need."**

TransformAI is an enterprise-grade AI content transformation platform. Organizations receive information in diverse formats (incident reports, news, advisories, research papers, earnings releases, audio/video recordings, image scans, and URLs) and need to rapidly convert them into tailored deliverables across executive, technical, social, and public communication channels without factual drift.

---

## 🚀 Key Features

* **Multi-Modal Source Ingest**:
  * **Text Editor**: Character and word counter, clipboard paste, sample loader.
  * **Document Parser**: Dropzone for PDF, DOCX, and TXT files.
  * **Image OCR**: Scanned memo and infographic OCR preview.
  * **Video / Audio Transcription**: Multi-speaker neural speech-to-text transcript parser.
  * **Web Scraping**: Autonomous URL fetcher and text extractor.
  * **Natural Language Prompts**: Free-form task specifications.

* **6-Stage Neural AI Pipeline**:
  $$\text{Source} \rightarrow \text{Extraction} \rightarrow \text{Analysis} \rightarrow \text{Canonical Model} \rightarrow \text{Generators} \rightarrow \text{Consistency Validation}$$
  * Extracts a single structured **Canonical Content Model** containing key entities, factual claims, risk severity, sentiment, timeline, and metrics to eliminate drift and hallucination.

* **10 Publication-Ready Output Formats**:
  1. 📄 **Executive Summary**: Overview, Key Findings, Business Impact, Risks, and Recommended Actions.
  2. 🛡️ **Official Advisory**: Government/Enterprise security advisory layout with Advisory ID, TLP classification, severity badge, and IoCs.
  3. 💼 **LinkedIn Post**: Hook, main body, key points, call-to-action, and hashtags.
  4. 🐦 **Twitter / X Thread**: 5-post thread with individual 280-char counters and thread copy.
  5. 📊 **Slide Presentation Deck**: 5-slide deck viewer with visual cues, speaker notes, and Markdown deck export.
  6. 🎨 **Infographic Blueprint**: Headline, hero stat callout (`12 MIN - Containment Time`), 4-quadrant visual metric cards, visual hierarchy guide, and chart recommendations.
  7. 🎬 **Omnichannel Video Package**: Scene-by-scene storyboard (4 scenes), voiceover script, interactive timeline UI, and synchronized `.SRT` subtitles.
  8. 📰 **Press Release**: AP Style format with dateline, lead paragraph, executive quote, boilerplate, and media contact info.
  9. ✉️ **Broadcast Email**: Subject line, preheader, greeting, bullet highlights, and CTA button.
  10. 🌐 **Social Media Pack**: Multi-platform variations for Facebook, Instagram, Telegram, and Slack/Teams.

* **AI Consistency Checker & Auto-Fixer**:
  * Real-time cross-deliverable factual verification across facts, dates, entity names, numbers, and tone.
  * Displays **96% Factual Confidence Score** with 1-click **“Fix Automatically”** button.

* **Live AI Editor Sidekick (“Ask TransformAI”)**:
  * In-line assistant with quick actions (*“Make More Executive”*, *“Shorten & Condense”*, *“Make More Urgent”*, *“Translate to Hindi”*) and custom prompt refinements.

* **Multi-Lingual Support**:
  * Supports English, Hindi (हिन्दी), Kannada (ಕನ್ನಡ), Tamil (தமிழ்), Telugu (తెలుగు), Malayalam (മലയാളം), and Marathi (मराठी).

* **Pre-Configured Workflow Templates**:
  * Cybersecurity Incident Advisory, Executive C-Suite Brief, Government Directive, Product Launch & GTM, Scientific Research Digest, and Omnichannel Social Campaign.

* **Interactive 1-Click Demo Mode**:
  * Instant demo launcher for hackathon presentations and evaluator judging.

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Canvas-Confetti.
* **Backend & API**: Next.js API Route Handlers (`/api/transform`, `/api/analyze`, `/api/generate`, `/api/validate`, `/api/upload`, `/api/transcribe`).
* **AI Architecture**: Modular `AIService` abstraction with built-in zero-latency deterministic mock engine and support for OpenAI, Google Gemini, and Anthropic Claude via Settings.
* **Storage**: Persistent client and local storage with audit logging.

---

## 💻 Getting Started

### Prerequisites
* Node.js 18.17+ or higher
* npm or yarn or pnpm

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/madhut0904/Transform-AI.git

# 2. Navigate to project directory
cd Transform-AI

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
SIH/
├── src/
│   ├── app/
│   │   ├── api/             # REST API Endpoints (transform, analyze, generate, etc.)
│   │   ├── analytics/       # Analytics & ROI telemetry page
│   │   ├── history/         # Audit log & past transformations
│   │   ├── settings/        # AI provider & security settings
│   │   ├── templates/       # Pre-configured enterprise templates
│   │   ├── transform/       # Multi-step pipeline workspace
│   │   ├── globals.css      # Custom styling & dark/light theme variables
│   │   ├── layout.tsx       # Root layout with sidebar and header
│   │   └── page.tsx         # Dashboard homepage
│   ├── components/
│   │   ├── dashboard/       # Hero banner, stats overview, recent jobs table
│   │   ├── layout/          # Sidebar and Header components
│   │   ├── results/         # 10 output views, consistency card, AI editor
│   │   └── transform/       # Source tabs, analysis card, controls, output grid
│   ├── lib/
│   │   ├── ai/              # AI Service, Mock Engine & Consistency Checker
│   │   ├── sample-data.ts   # Enterprise sample datasets and templates
│   │   └── storage.ts       # Persistence and state helpers
│   └── types/
│       └── index.ts         # TypeScript models and interfaces
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🔒 Security & Compliance

* Client-side sanitization of generated output.
* Strict zero data retention policy ready for sovereign hosting.
* Safe handling of files and masked API keys stored locally in browser session.

---

## 📄 License

This project is licensed under the MIT License.
