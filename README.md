# ✍️ Writing Agent

**Undetectable AI Writing Agent — CLI Tool & Multi-Agent Framework**
*Powered by the Ghost Protocol methodology*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **The best AI-generated content is the content nobody knows is AI-generated. Not because it tricks anyone — because it's actually good.**

Writing Agent is an open-source CLI tool and multi-agent framework that produces human-quality writing calibrated to pass AI detection systems. Built on reverse-engineered intelligence from 50+ academic papers, commercial detector documentation, detection benchmarking studies, and **real-world journalism analysis from 40+ articles across Harvard Business Review, ESPN, CNN, Wall Street Journal, Yahoo Finance, Search Engine Land, and Search Engine Journal**.

**This is NOT a humanizer tool.** Humanizers take AI slop and put lipstick on it. Writing Agent generates authentic, human-quality content from the ground up — informed by exactly what detectors look for, why, and how real journalists actually write.

### What's New in v2.0 (March 2026)

- **Journalism-Informed Intelligence** — Analyzed 40+ articles from HBR, ESPN, CNN, WSJ, Yahoo, SEL, SEJ to extract authentic human writing patterns
- **200+ Phrase Blacklist** — Expanded from 100 to 200+ banned AI-sounding phrases including word variants
- **Post-Processing Engine** — `humanizeContent()` programmatically strips AI conclusion patterns, compound adjectives, hedging pairs, and uniform paragraph structures
- **8-Pattern AI Detection** — New detection signals: AI-style openings, catchphrases, rhetorical Q+A, tricolons, uniform paragraphs, AI conclusions, em-dash overuse
- **Strengthened QA Checks** — Paragraph length variance, tricolon detection, rhetorical Q+A detection, AI opening sentence detection
- **No More Signature Phrases** — Voice profiles no longer have "catchphrases" that get overused
- **Anti-Pattern Rules** — Explicit rules against essay structure, sports analogy threading, lists of three, thesis-conclusion patterns

---

## Table of Contents

- [How It Works](#how-it-works)
- [Architecture](#architecture)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [CLI Reference](#cli-reference)
- [Content Types](#content-types)
- [The 40-Point QA System](#the-40-point-qa-system)
- [Platform Adapters](#platform-adapters)
- [Voice Profiles](#voice-profiles)
- [Integration with Existing Repos](#integration-with-existing-repos)
- [Configuration](#configuration)
- [Wiki & Examples](#wiki--examples)
- [Research & Citations](#research--citations)
- [Contributing](#contributing)
- [License](#license)

---

## How It Works

Ghost Protocol v2 operates on four core laws:

1. **Journalism-Informed Patterns** — Every piece follows writing patterns extracted from real HBR, ESPN, CNN, WSJ, and SEL articles. Real writers start with a scene or fact, use metaphors once and abandon them, vary paragraph length wildly, and end on specifics — not summaries.
2. **No AI Costume** — Instead of adding "personality" through catchphrases, the system removes AI-sounding patterns programmatically. 200+ blacklisted phrases, 8 structural AI-pattern detectors, and a post-processing engine that strips corporate filler.
3. **Voice Without Catchphrases** — Voice profiles define structural habits (sentence length distribution, paragraph patterns, conjunction usage), not signature phrases. Real writers don't have catchphrases.
4. **Invisible Architecture** — Detection evasion is baked into generation AND post-processing. The writing passes because of HOW it's constructed at every level.

### The 5-Stage Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                      GHOST PROTOCOL PIPELINE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──┐ │
│  │ STAGE 1  │──▶│ STAGE 2  │──▶│ STAGE 3  │──▶│ STAGE 4  │──▶│5 │ │
│  │ Profile  │   │ Pattern  │   │  40-Pt   │   │ Platform │   │  │ │
│  │ Intake   │   │ Inject   │   │   QA     │   │ Adapt    │   │  │ │
│  └──────────┘   └──────────┘   └────┬─────┘   └──────────┘   └──┘ │
│                                     │                               │
│                              FAIL? ◀┘                               │
│                                │                                    │
│                         ┌──────▼──────┐                             │
│                         │  Targeted   │                             │
│                         │  Revision   │──── Loop back to Stage 2    │
│                         └─────────────┘                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Architecture

### System Overview

```
writing-agent/
├── src/
│   ├── cli.js                  # CLI entry point
│   ├── ghost.js                # Main orchestrator
│   ├── agents/
│   │   ├── profile-agent.js    # Stage 1: Content profiling & voice loading
│   │   ├── writer-agent.js     # Stage 2: Human pattern injection engine
│   │   ├── qa-agent.js         # Stage 3: 40-point QA scoring
│   │   ├── adapter-agent.js    # Stage 4: Platform adaptation
│   │   └── polish-agent.js     # Stage 5: Final human pass simulation
│   ├── checks/
│   │   ├── index.js            # Check runner & aggregator
│   │   ├── statistical.js      # Checks 1-7: Perplexity, burstiness, entropy
│   │   ├── classifier.js       # Checks 8-12: Transformer & ensemble resistance
│   │   ├── linguistic.js       # Checks 13-18: Stylometry, lexical diversity
│   │   ├── watermark.js        # Checks 19-20: Watermark & metadata stripping
│   │   ├── scoring.js          # Checks 21-25: Confidence & sentence-level
│   │   ├── bias.js             # Checks 26-28: Bias exploitation
│   │   ├── adversarial.js      # Checks 29-31: Pattern diversity & evasion
│   │   ├── infrastructure.js   # Checks 32-34: Multi-detector & normalization
│   │   ├── evaluation.js       # Checks 35-37: Benchmarking & classification
│   │   └── governance.js       # Checks 38-40: Disclosure & provenance
│   ├── adapters/
│   │   ├── google-docs.js      # Google Docs integration (via API)
│   │   ├── word.js             # Microsoft Word / .docx output
│   │   ├── linkedin.js         # LinkedIn post formatter
│   │   ├── reddit.js           # Reddit post/comment formatter
│   │   ├── substack.js         # Substack article formatter
│   │   ├── instagram.js        # Instagram caption formatter
│   │   ├── facebook.js         # Facebook post formatter
│   │   ├── twitter.js          # X/Twitter formatter
│   │   ├── email.js            # Email formatter
│   │   └── markdown.js         # Generic markdown output
│   ├── utils/
│   │   ├── text-analysis.js    # Perplexity, burstiness, entropy calculations
│   │   ├── phrase-blacklist.js # AI phrase kill list
│   │   ├── normalizer.js       # Unicode/whitespace normalization
│   │   ├── sentence-tools.js   # Sentence splitting, length analysis
│   │   └── detector-api.js     # Multi-detector API client
│   └── templates/
│       ├── system-prompts/     # Per-content-type system prompts
│       └── voice-profiles/     # Voice profile configurations
├── config/
│   ├── default.yaml            # Default configuration
│   ├── voice-profiles.yaml     # Voice profile definitions
│   ├── phrase-blacklist.yaml   # AI phrase kill list (200+ phrases)
│   └── detector-config.yaml    # Detector API keys & thresholds
├── docs/
│   └── wiki/                   # Full wiki documentation
│       ├── 01-getting-started.md
│       ├── 02-architecture-deep-dive.md
│       ├── 03-the-40-checks-explained.md
│       ├── 04-content-type-playbooks.md
│       ├── 05-voice-profiles.md
│       ├── 06-platform-adapters.md
│       ├── 07-integration-guide.md
│       ├── 08-examples-and-outputs.md
│       ├── 09-research-and-citations.md
│       └── 10-troubleshooting.md
├── examples/
│   ├── outputs/                # Before/after examples for each content type
│   └── prompts/                # Example prompt configurations
├── tests/
│   ├── checks.test.js          # QA check unit tests
│   ├── adapters.test.js        # Platform adapter tests
│   └── integration.test.js     # End-to-end pipeline tests
├── scripts/
│   ├── benchmark.js            # Run content against multiple detectors
│   └── calibrate.js            # Calibrate thresholds per content type
├── .github/
│   └── workflows/
│       └── ci.yml              # CI pipeline
├── package.json
├── LICENSE
├── CONTRIBUTING.md
└── CHANGELOG.md
```

### Agent Architecture

Ghost Protocol uses a **5-agent pipeline** where each agent has a specific responsibility:

```
┌─────────────────────────────────────────────────────────────────┐
│                    AGENT ORCHESTRATION                           │
│                                                                 │
│  ┌─────────────────┐                                           │
│  │  PROFILE AGENT   │  Classifies content type, loads voice    │
│  │  (Simba-class)   │  profile, sets perplexity/burstiness     │
│  └────────┬────────┘  targets, identifies platform constraints │
│           │                                                     │
│  ┌────────▼────────┐                                           │
│  │  WRITER AGENT    │  Generates content with human pattern    │
│  │  (Nemo-class)    │  injection at structural, sentence,      │
│  └────────┬────────┘  and word levels                          │
│           │                                                     │
│  ┌────────▼────────┐      ┌─────────────┐                     │
│  │   QA AGENT       │─────▶│  REVISION   │                     │
│  │  (Baymax-class)  │ FAIL │  LOOP       │──▶ Back to Writer   │
│  └────────┬────────┘      └─────────────┘                     │
│           │ PASS                                                │
│  ┌────────▼────────┐                                           │
│  │ ADAPTER AGENT    │  Formats for target platform             │
│  │  (Elsa-class)    │  (LinkedIn, Reddit, Docs, Word, etc.)   │
│  └────────┬────────┘                                           │
│           │                                                     │
│  ┌────────▼────────┐                                           │
│  │  POLISH AGENT    │  Final human pass simulation —           │
│  │  (Mowgli-class)  │  2-3 small "random" edits               │
│  └─────────────────┘                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

> **Note:** Agent class names reference the Disney-named agent taxonomy from [googleadsagent.ai](https://googleadsagent.ai) for consistency with the existing 25+ agent ecosystem.

### How It Connects to Your Existing Repos

```
┌──────────────────────────────────────────────────────────────────┐
│                 IT ALL STARTED WITH A IDEA                        │
│                    ECOSYSTEM MAP                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │  writing-agent   │    │ advertising-hub   │                   │
│  │  (THIS REPO)      │◄──▶│ (14 platforms)    │                   │
│  │                   │    │ 25+ agents        │                   │
│  │  • Writing Agent  │    │ • Simba (Search)  │                   │
│  │  • QA Engine      │    │ • Nemo (Display)  │                   │
│  │  • Platform       │    │ • Elsa (Social)   │                   │
│  │    Adapters       │    │ • Baymax (Audit)  │                   │
│  └───────┬──────────┘    └────────┬─────────┘                   │
│          │                        │                              │
│          │    ┌───────────────────┘                              │
│          │    │                                                   │
│  ┌───────▼────▼─────┐    ┌──────────────────┐                   │
│  │ google-ads-mcp    │    │  ContextOS        │                   │
│  │ (23 MCP tools)    │    │  (Unified MCP     │                   │
│  │                   │    │   Context Layer)   │                   │
│  │ • Campaign data   │    │                   │                   │
│  │ • Ad copy context │    │ • Session memory  │                   │
│  │ • Performance     │    │ • Voice profiles  │                   │
│  │   metrics         │    │ • Content history │                   │
│  └──────────────────┘    └──────────────────┘                   │
│                                                                  │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │ intel-harvester   │    │ google-ads-audit  │                   │
│  │ v2.1              │    │ engine (250-pt)   │                   │
│  │                   │    │                   │                   │
│  │ • Competitor      │    │ • Audit data for  │                   │
│  │   content intel   │    │   case studies    │                   │
│  │ • Topic discovery │    │ • Performance     │                   │
│  │ • Trend signals   │    │   proof points    │                   │
│  └──────────────────┘    └──────────────────┘                   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Integration Points:**

| Repo | Integration | Purpose |
|------|-------------|---------|
| `advertising-hub` | Writing Agent registers as a content agent alongside existing 25+ agents | Content creation within the ad management workflow |
| `google-ads-mcp` | Writing Agent pulls campaign performance data via MCP tools | Real metrics and case study data for authentic content |
| `ContextOS` | Voice profiles, session memory, and content history stored in ContextOS | Persistent voice calibration across sessions |
| `intel-harvester` | Competitor content intelligence feeds into topic discovery | Original angles that don't exist in AI training data |
| `google-ads-audit-engine` | Audit findings become proof points in content | Specific, verifiable data that detectors can't flag |

---

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- An Anthropic API key (for Claude) OR OpenAI API key (for GPT-4)

### Install

```bash
# Clone the repository
git clone https://github.com/itallstartedwithaidea/writing-agent.git
cd writing-agent

# Install dependencies
npm install

# Link CLI globally
npm link

# Copy and configure
cp config/default.yaml config/local.yaml
# Edit config/local.yaml with your API keys
```

### API Keys (Optional but Recommended)

For the multi-detector QA pipeline, you'll want API keys for:

```yaml
# config/local.yaml
detectors:
  gptzero:
    api_key: "your-gptzero-api-key"
    threshold: 30  # Max acceptable AI probability %
  pangram:
    api_key: "your-pangram-api-key"
    threshold: 30
  originality:
    api_key: "your-originality-api-key"
    threshold: 30

llm:
  provider: "anthropic"  # or "openai"
  api_key: "your-api-key"
  model: "claude-sonnet-4-20250514"  # or "gpt-4o"
```

---

## Quick Start

### Write a LinkedIn Post

```bash
ghost write --type linkedin --topic "Why most Google Ads accounts waste 40% of budget on branded search they'd get organically"
```

### Write a Blog Post

```bash
ghost write --type blog --topic "The ROAS trap: why your client thinks they're winning while actually losing" --length 1500
```

### Write a Reddit Comment

```bash
ghost write --type reddit-comment --context "Someone asked: What's the biggest Google Ads mistake you see?" --tone casual
```

### Write an Email

```bash
ghost write --type email --to "client" --topic "Q1 performance summary and recommended budget reallocation"
```

### Run Detection QA on Existing Text

```bash
ghost check --file my-article.md
ghost check --text "paste your text here"
ghost check --file my-article.md --detectors gptzero,pangram,originality
```

### Export to Different Formats

```bash
ghost write --type blog --topic "..." --output docx
ghost write --type blog --topic "..." --output gdocs
ghost write --type blog --topic "..." --output markdown
ghost write --type blog --topic "..." --output html
```

---

## CLI Reference

### `ghost write`

Generate content through the full 5-stage pipeline.

```
Usage: ghost write [options]

Options:
  --type <type>          Content type (required)
                         blog, linkedin, reddit, reddit-comment, substack,
                         whitepaper, email, instagram, facebook, twitter,
                         website, reply
  --topic <topic>        Topic or brief for the content
  --context <context>    Additional context (parent post for replies, etc.)
  --tone <tone>          Override voice tone (casual, professional, technical, persuasive)
  --length <words>       Target word count (default varies by type)
  --voice <profile>      Voice profile to use (default: "john-williams")
  --output <format>      Output format: markdown, docx, gdocs, html, txt (default: markdown)
  --output-file <path>   Save to specific file path
  --no-qa                Skip QA checks (not recommended)
  --no-detect            Skip multi-detector validation
  --verbose              Show all QA check results
  --dry-run              Show plan without generating content
```

### `ghost check`

Run the 40-point QA system against existing text.

```
Usage: ghost check [options]

Options:
  --file <path>          Path to text file to check
  --text <text>          Inline text to check
  --detectors <list>     Comma-separated detector list (default: all configured)
  --report <format>      Report format: summary, detailed, json (default: summary)
  --fix                  Auto-fix detected issues and output revised version
  --output-file <path>   Save report to file
```

### `ghost benchmark`

Run content against multiple detectors and generate a comparison report.

```
Usage: ghost benchmark [options]

Options:
  --file <path>          Content file to benchmark
  --dir <path>           Directory of files to benchmark
  --detectors <list>     Detectors to use (default: all)
  --output <format>      json, csv, markdown (default: markdown)
```

### `ghost calibrate`

Calibrate detection thresholds for a specific content type or voice.

```
Usage: ghost calibrate [options]

Options:
  --type <type>          Content type to calibrate
  --voice <profile>      Voice profile to calibrate
  --samples <n>          Number of samples to generate (default: 20)
```

### `ghost profile`

Manage voice profiles.

```
Usage: ghost profile [command]

Commands:
  list                   List all voice profiles
  show <name>            Show profile details
  create <name>          Create new profile (interactive)
  import <file>          Import profile from writing samples
  export <name> <file>   Export profile to file
```

---

## Content Types

| Type | CLI Flag | Description | Default Length |
|------|----------|-------------|---------------|
| Blog Post | `blog` | Long-form expert content for websites/Substack | 1200 words |
| LinkedIn Post | `linkedin` | Professional thought leadership, scroll-stopping | 200 words |
| Reddit Post | `reddit` | Peer-level knowledge sharing, community voice | 400 words |
| Reddit Comment | `reddit-comment` | Direct response, casual, specific | 150 words |
| Substack Article | `substack` | Newsletter-style, personal, serial | 1500 words |
| White Paper | `whitepaper` | Data-backed, authoritative, structured | 3000 words |
| Email | `email` | Direct, no filler, action-oriented | 150 words |
| Instagram Caption | `instagram` | Visual-first, personality-forward | 150 words |
| Facebook Post | `facebook` | Engaging, shareable, community | 200 words |
| X/Twitter | `twitter` | Punchy, opinionated, thread-ready | 280 chars |
| Website Copy | `website` | Conversion-focused, clear, benefit-led | 500 words |
| Reply/Response | `reply` | Context-matched, value-adding | 100 words |

Each content type has a dedicated playbook in `docs/wiki/04-content-type-playbooks.md` with voice targets, structure templates, and perplexity/burstiness calibration.

---

## The 40-Point QA System

Every piece of content passes through 40 checks mapped to known detection vectors. Content must score **PASS** on all hard checks and no more than 3 soft fails to ship.

### Check Blocks

| Block | Checks | What It Targets |
|-------|--------|-----------------|
| **A: Statistical** | #1-7 | Perplexity, burstiness, token distribution, log probability curvature, cross-perplexity, n-gram novelty, entropy |
| **B: Classifier** | #8-12 | Conjunction starters, fragment usage, parenthetical asides, **paragraph length variance** (v2), **tricolon control** (v2) |
| **C: Linguistic** | #13-18 | 200+ phrase blacklist, lexical diversity, readability variance, syntactic variety, **rhetorical Q+A detection** (v2), **AI opening detection** (v2) |
| **D: Watermark** | #19-20 | Digital watermark stripping, metadata hygiene |
| **E: Scoring** | #21-25 | Confidence score targeting, sentence-level clean, plagiarism, humanizer resistance, language authenticity |
| **F: Bias** | #26-28 | Non-native bias exploitation, domain-specific patterns, length optimization |
| **G: Adversarial** | #29-31 | Pattern diversity, translation-proof, mixed-authorship consistency |
| **H: Infrastructure** | #32-34 | Multi-detector validation, plain text normalization, platform-native formatting |
| **I: Evaluation** | #35-37 | Third-party benchmarking, FPR exploitation, AI-assisted vs. AI-generated |
| **J: Governance** | #38-40 | Disclosure compliance, audit trail, provenance-proof construction |

Full documentation: `docs/wiki/03-the-40-checks-explained.md`

---

## Platform Adapters

Adapters format output for each publishing destination:

### Google Docs

```bash
ghost write --type blog --output gdocs --gdocs-id "your-doc-id"
```

Requires Google Docs API credentials in config. Creates or appends to a Google Doc with proper formatting (headers, bold, links).

### Microsoft Word

```bash
ghost write --type whitepaper --output docx --output-file report.docx
```

Generates a formatted .docx file with headers, styles, table of contents, and professional layout.

### Social Platforms

```bash
# LinkedIn — auto-formats with line breaks, no hashtag spam
ghost write --type linkedin --topic "..." 

# Reddit — markdown formatted, includes TL;DR for long posts
ghost write --type reddit --topic "..."

# Instagram — caption with strategic hashtags at end
ghost write --type instagram --topic "..."
```

### Direct Publishing (Coming Soon)

Planned adapters for direct publishing via platform APIs:
- LinkedIn API (post directly)
- Reddit API (post/comment directly)
- WordPress REST API
- Substack API
- Buffer/Hootsuite integration

---

## Voice Profiles

Voice profiles define HOW the agent writes. They're stored in `config/voice-profiles.yaml`.

### Default Profile: John Williams

```yaml
john-williams:
  name: "John Williams"
  background: "15+ year paid media veteran, Google Ads specialist, football coach"
  tone_anchors:
    - direct and opinionated
    - speaks from specific experience
    - uses coaching/football analogies
    - comfortable with profanity when it fits
    - mixes technical depth with accessibility
  vocabulary:
    domain_terms: ["ROAS", "PMax", "SQOS", "brand vs non-brand", "impression share"]
    signature_phrases: ["here's the thing", "I've seen this blow up at"]
    avoid: ["synergy", "leverage", "holistic", "paradigm"]
  structural_habits:
    starts_with_conjunctions: true
    uses_fragments: true
    parenthetical_asides: frequent
    average_sentence_length: 16
    sentence_length_stdev: 9
  perplexity_target: 30-45
  burstiness_target: "high"
```

### Creating Custom Profiles

```bash
# Interactive profile builder
ghost profile create "agency-voice"

# Import from writing samples (analyzes your existing writing)
ghost profile import --samples ./my-writing-samples/ --name "my-natural-voice"
```

The profile importer analyzes your existing writing to extract your natural stylometric fingerprint: sentence length distribution, vocabulary preferences, structural habits, and tone patterns.

---

## Configuration

### `config/default.yaml`

```yaml
# Ghost Protocol Configuration
version: "2.0.0"

# LLM Provider
llm:
  provider: "anthropic"           # anthropic | openai
  model: "claude-sonnet-4-20250514"
  max_tokens: 4096
  temperature: 0.85               # Slightly elevated for natural variation

# QA System
qa:
  enabled: true
  max_revision_loops: 3           # Max times content loops back for fixes
  hard_fail_threshold: 0          # Max hard fails allowed (0 = zero tolerance)
  soft_fail_threshold: 3          # Max soft fails allowed
  
# Detection Testing
detectors:
  enabled: true
  require_all_pass: true          # All detectors must score below threshold
  max_ai_probability: 30          # Global threshold (override per detector)
  providers:
    gptzero:
      enabled: true
      threshold: 30
    pangram:
      enabled: true
      threshold: 30
    originality:
      enabled: false              # Requires paid API
      threshold: 30

# Content Defaults
content:
  default_voice: "john-williams"
  default_output: "markdown"
  
# AI Phrase Kill List
phrases:
  blacklist_file: "config/phrase-blacklist.yaml"
  zero_tolerance: true            # Any blacklisted phrase = hard fail
```

---

## Wiki & Examples

### Wiki Pages

The full wiki is in `docs/wiki/`:

| Page | Contents |
|------|----------|
| [01 - Getting Started](docs/wiki/01-getting-started.md) | Installation, first run, basic configuration |
| [02 - Architecture Deep Dive](docs/wiki/02-architecture-deep-dive.md) | 5-stage pipeline, agent roles, data flow |
| [03 - The 40 Checks Explained](docs/wiki/03-the-40-checks-explained.md) | Every check with detection vector, counter-move, and code |
| [04 - Content Type Playbooks](docs/wiki/04-content-type-playbooks.md) | Per-type voice, structure, and calibration targets |
| [05 - Voice Profiles](docs/wiki/05-voice-profiles.md) | Creating, importing, and tuning voice profiles |
| [06 - Platform Adapters](docs/wiki/06-platform-adapters.md) | Google Docs, Word, social platform integration |
| [07 - Integration Guide](docs/wiki/07-integration-guide.md) | Connecting to advertising-hub, ContextOS, MCP servers |
| [08 - Examples & Outputs](docs/wiki/08-examples-and-outputs.md) | Before/after for every content type with detector scores |
| [09 - Research & Citations](docs/wiki/09-research-and-citations.md) | All 50+ sources with full academic citations |
| [10 - Troubleshooting](docs/wiki/10-troubleshooting.md) | Common issues, detector updates, calibration |

### Example Outputs

The `examples/outputs/` directory contains before/after examples for every content type:

```
examples/outputs/
├── blog-post-before.md           # Raw AI output
├── blog-post-after.md            # Ghost Protocol output
├── blog-post-qa-report.json      # Full QA report
├── linkedin-post-before.md
├── linkedin-post-after.md
├── reddit-comment-before.md
├── reddit-comment-after.md
├── whitepaper-before.md
├── whitepaper-after.md
├── email-before.md
├── email-after.md
└── detection-benchmark.md        # All examples scored against 3 detectors
```

---

## Journalism Research (v2.0)

Ghost Protocol v2 is informed by analysis of 40+ real articles from major publications. Key findings that shaped the v2 engine:

### What Real Writers Do (That AI Doesn't)

| Pattern | Real Writing | AI Writing |
|---|---|---|
| **Paragraph length** | 1-2 sentences (news), varies wildly (features) | 3-5 sentences, suspiciously uniform |
| **Sentence length** | 7-52 word range within one article | 15-25 words consistently |
| **Opening** | Scene, specific fact, or news lede | "In today's rapidly evolving..." |
| **Transitions** | Abrupt jumps, section breaks, "But." | "That said," "So what does this mean?" |
| **Data** | 15.2%, $36.8M, 0-for-5 in 23 possessions | "significant increase," "the data shows" |
| **Metaphors** | One and done. Never referenced again. | One metaphor threaded through entire piece |
| **Voice** | 2-3 specific personality moments per 800 words | Personality markers in every paragraph |
| **Endings** | Quote, specific fact, or just stops | Summary list or "What's the takeaway?" |
| **Concessions** | Includes info that complicates the thesis | Every point reinforces the thesis |
| **Attribution** | Named experts with titles and roles | "Experts say," "Industry leaders agree" |

### Sources Analyzed

- **Harvard Business Review** — Opening patterns, tension-before-resolution, one-word pivot sentences
- **Harvard Gazette** — Source-driven voice, academic framing without jargon, colon-before-surprise
- **ESPN (Bill Barnwell)** — Radical sentence length oscillation, evidence-first-conclusion-second, inline charting methodology
- **CNN Business** — Wire service lede structure, appositive-heavy context loading, honest attribution of uncertainty
- **Yahoo Finance / Motley Fool** — Setup-surprise structure, precise financial data as narrative
- **Search Engine Land** — Action-oriented blurbs, specific product names, balanced positive/negative findings
- **Search Engine Journal** — Functional headlines, practitioner voice, specific metrics inline

---

## Research & Citations

Ghost Protocol is built on research from 50+ sources plus the v2 journalism corpus. Full academic citations are in `docs/wiki/09-research-and-citations.md`.

### Key Academic Papers

1. **Mitchell, E., Lee, Y., Khazatsky, A., Manning, C.D., & Finn, C.** (2023). DetectGPT: Zero-Shot Machine-Generated Text Detection using Probability Curvature. *ICML 2023*. [arXiv:2301.11305](https://arxiv.org/abs/2301.11305)

2. **Bao, G., Zhao, Y., Teng, Z., Yang, L., & Zhang, Y.** (2023). Fast-DetectGPT: Efficient Zero-Shot Detection of Machine-Generated Text via Conditional Probability Curvature. *ICLR 2024*. [arXiv:2310.05130](https://arxiv.org/abs/2310.05130)

3. **Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., & Zou, J.** (2023). GPT Detectors are Biased Against Non-Native English Writers. *Patterns, 4(7)*. [arXiv:2304.02819](https://arxiv.org/abs/2304.02819)

4. **Hans, A., Schwarzschild, A., Cheber, V., et al.** (2024). Spotting LLMs With Binoculars: Zero-Shot Detection of Machine-Generated Text. *ICML 2024*. [arXiv:2401.12070](https://arxiv.org/abs/2401.12070)

5. **Mustapha, I.K., Osakue, A., & Odiakaose, K.** (2024). StyloAI: Distinguishing AI-Generated Content with Stylometric Analysis. *arXiv*. [arXiv:2405.10129](https://arxiv.org/abs/2405.10129)

6. **Aaronson, S. & Kirchner, T.** (2023). SynthID Text: Watermarking and Identifying Text Generated by Large Language Models. *Nature*. [Google DeepMind](https://deepmind.google/models/synthid/)

7. **Gehrmann, S., Strobelt, H., & Rush, A.M.** (2019). GLTR: Statistical Detection and Visualization of Generated Text. *ACL 2019 System Demonstrations*.

8. **Sheth, A.P., et al.** (2023). Counter Turing Test (CT2): AI-Generated Text Detection is Not as Easy as You May Think. *EMNLP 2023*. [arXiv:2310.05030](https://arxiv.org/abs/2310.05030)

9. **Mikros, G. & Koursaris, S.** (2023). AI-Writing Detection Using an Ensemble of Transformers and Stylometric Features. *CEUR Workshop Proceedings, Vol. 3496*.

10. **Kumarage, T., et al.** (2023). Stylometric Detection of AI-Generated Text in Twitter Timelines. *arXiv*. [arXiv:2303.03697](https://arxiv.org/abs/2303.03697)

### Commercial Tool References

- GPTZero — [gptzero.me](https://gptzero.me) — Perplexity/burstiness methodology
- Pangram Labs — [pangram.com](https://pangram.com) — Deep learning detection
- Grammarly AI Detector — [grammarly.com/ai-detector](https://grammarly.com/ai-detector) — RAID #1 benchmark
- Winston AI — [gowinston.ai](https://gowinston.ai) — Multi-language detection
- Originality.ai — [originality.ai](https://originality.ai) — Combined AI + plagiarism detection
- QuillBot AI Detector — [quillbot.com](https://quillbot.com) — AI-generated vs AI-enhanced distinction
- Google SynthID — [ai.google.dev/responsible/docs/safeguards/synthid](https://ai.google.dev/responsible/docs/safeguards/synthid) — Open-source text watermarking

### Bias & Ethics Studies

- Stanford HAI — "AI-Detectors Biased Against Non-Native English Writers" (2023)
- Proofademic — "Understanding False Positives in AI Detection" (2025)
- University of San Diego Legal Research Center — "Problems with AI Detectors" (2024)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Key areas where contributions are welcome:

- **New platform adapters** (TikTok, Discord, Slack, etc.)
- **Voice profile templates** for different industries
- **Additional QA checks** as new detection methods emerge
- **Detector API integrations** for new detection tools
- **Language support** beyond English
- **Benchmark datasets** for testing

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Disclaimer

Writing Agent is designed to help writers produce authentic, high-quality content. It is not designed to facilitate academic dishonesty, fraud, or deception. The tool's purpose is to ensure AI-assisted writing maintains the quality, voice, and authenticity that readers expect and deserve. Use responsibly.

---

<p align="center">
  <strong>Built by <a href="https://itallstartedwithaidea.com">It All Started With A Idea</a></strong><br>
  <em>Part of the <a href="https://googleadsagent.ai">googleadsagent.ai</a> ecosystem</em>
</p>
