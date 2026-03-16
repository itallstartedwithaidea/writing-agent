# 02 — Architecture Deep Dive

## System Overview

Writing Agent is a **5-agent pipeline** where each agent handles one stage of the content creation process. The architecture is designed to be modular — agents can be upgraded independently as detection methods evolve.

```
INPUT (topic, type, voice)
    │
    ▼
┌──────────────┐
│ PROFILE AGENT │  ← Loads content type playbook + voice profile
│ (Simba-class) │  ← Sets perplexity/burstiness targets
└──────┬───────┘  ← Builds system prompt for Writer
       │
       ▼
┌──────────────┐
│ WRITER AGENT  │  ← Generates content via LLM
│ (Nemo-class)  │  ← Human pattern injection (structural, sentence, word)
└──────┬───────┘  ← Handles revision loops on QA failure
       │
       ▼
┌──────────────┐     ┌──────────────┐
│   QA AGENT    │────▶│   REVISION   │──── Back to Writer Agent
│(Baymax-class) │FAIL │    LOOP      │     (max 3 iterations)
└──────┬───────┘     └──────────────┘
       │ PASS
       ▼
┌──────────────┐
│ADAPTER AGENT  │  ← Formats for target platform
│ (Elsa-class)  │  ← Markdown, DOCX, HTML, LinkedIn, Reddit, etc.
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ POLISH AGENT  │  ← Unicode normalization
│(Mowgli-class) │  ← Whitespace cleanup
└──────┬───────┘  ← Hidden marker stripping
       │
       ▼
┌──────────────┐
│  DETECTORS   │  ← Optional: GPTZero, Pangram, Originality APIs
│  (Triple-    │  ← All must score <30% AI probability
│   Check)     │  ← If any fail, content is flagged for review
└──────┬───────┘
       │
       ▼
OUTPUT (text, QA report, detection scores)
```

## Agent Details

### Profile Agent (Stage 1) — "Simba-class"

**Purpose:** Classifies the content request and assembles the generation brief.

**Inputs:** Content type, topic, context, voice profile name, target length
**Outputs:** Complete profile object with system prompt, targets, and platform rules

**What it does:**
- Looks up the content type definition (12 types supported)
- Loads the named voice profile from `config/voice-profiles.yaml`
- Sets perplexity and burstiness targets appropriate to the content type
- Identifies platform constraints (character limits, formatting conventions)
- Builds the system prompt that includes voice rules, anti-detection rules, and the AI phrase kill list

**Research basis:** The profile system is built on StyloAI's finding (Mustapha et al., 2024) that different text domains require different detection calibration. A white paper has fundamentally different stylometric baselines than a Reddit comment.

---

### Writer Agent (Stage 2) — "Nemo-class"

**Purpose:** The core content generation engine.

**What it does:**
- Sends the profile's system prompt + user prompt to the configured LLM
- The system prompt enforces human pattern injection rules:
  - **Structural:** Paragraph length variance, non-standard transitions, tangential asides
  - **Sentence:** Length variance (5-40 words), conjunction starters (15%+), rhetorical questions, fragments
  - **Word:** Register mixing, uncommon vocabulary (4%+), inconsistent contractions, domain jargon
- Handles revision loops: receives specific QA failures and makes targeted surgical edits

**Research basis:** Every injection rule maps to a specific detection signal:
- Sentence length variance → defeats burstiness analysis (GPTZero, Tian 2023)
- Uncommon vocabulary → raises perplexity above AI range (GLTR, Gehrmann et al. 2019)
- Conjunction starters + fragments → breaks syntactic uniformity (StyloAI, Mustapha et al. 2024)
- First person + specific details → diverges from classifier training data (multiple sources)

---

### QA Agent (Stage 3) — "Baymax-class"

**Purpose:** The 40-point quality gate.

**What it does:**
- Runs all 40 checks against the generated text
- Each check returns: `pass`, `soft_fail`, or `hard_fail`
- Aggregates results: content passes if 0 hard fails and ≤3 soft fails
- If content fails, identifies specific failures with fix instructions
- Failed content loops back to the Writer Agent for targeted revision (max 3 loops)

**Research basis:** Each of the 40 checks maps to a specific detection vector from the research compilation. See [03 — The 40 Checks Explained](03-the-40-checks-explained.md) for the full mapping.

---

### Adapter Agent (Stage 4) — "Elsa-class"

**Purpose:** Formats content for the target publishing platform.

**Supported outputs:**
- **Markdown** — Standard markdown formatting
- **DOCX** — Microsoft Word document with styles, headers, TOC
- **HTML** — Clean HTML with semantic markup
- **Google Docs** — Via Google Docs API (requires credentials)
- **LinkedIn** — Platform-specific line break formatting
- **Reddit** — Reddit markdown with TL;DR conventions
- **Instagram** — Caption with hashtag block
- **Plain text** — Stripped formatting for emails and responses

---

### Polish Agent (Stage 5) — "Mowgli-class"

**Purpose:** Final normalization pass simulating a human's last edit.

**What it does:**
- Strips invisible Unicode characters (zero-width spaces, BOM, soft hyphens)
- Normalizes whitespace (double spaces, triple newlines)
- Removes any formatting artifacts from the LLM output
- This is the "metadata hygiene" step — QA Check #20

---

## Integration Architecture

Ghost Protocol is designed to plug into the `itallstartedwithaidea` ecosystem:

| Repo | Integration Point | Data Flow |
|------|-------------------|-----------|
| `advertising-hub` | Ghost Protocol registers as agent #26+ | Content creation within ad management workflows |
| `google-ads-mcp` | 23 MCP tools provide campaign context | Real metrics for authentic content (specific ROAS numbers, campaign names) |
| `ContextOS` | Unified context layer | Voice profiles persist across sessions; content history prevents repetition |
| `intel-harvester` | Business discovery pipeline | Competitor content analysis feeds unique angles into topic discovery |
| `google-ads-audit-engine` | 250-point audit data | Audit findings become proof points in white papers and blog posts |

### How Context Flows

```
intel-harvester ──▶ Topic/angle suggestions
                         │
google-ads-mcp  ──▶ Real campaign metrics
                         │
                    ┌────▼────┐
                    │  Ghost   │
                    │ Protocol │
                    └────┬────┘
                         │
ContextOS ◀──── Voice profile + content history
                         │
advertising-hub ◀── Published content tracking
```

The key insight: **the more real data flows into Ghost Protocol, the more undetectable the output becomes.** Real metrics, real campaign names, real competitive context — this is information that no AI training dataset contains, which makes it inherently resistant to classifier-based detection.
