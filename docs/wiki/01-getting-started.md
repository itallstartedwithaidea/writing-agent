# 01 — Getting Started

## Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org/)
- **An LLM API key** — Anthropic (Claude) recommended. OpenAI (GPT-4) also supported.
- **Optional: Detector API keys** — GPTZero, Pangram, and/or Originality.ai for triple-checking

## Installation

```bash
# Clone
git clone https://github.com/itallstartedwithaidea/writing-agent.git
cd writing-agent

# Install dependencies
npm install

# Link CLI globally (so you can run `ghost` from anywhere)
npm link

# Create your local config (gitignored — safe for API keys)
cp config/default.yaml config/local.yaml
```

## Configuration

Edit `config/local.yaml`:

```yaml
llm:
  provider: "anthropic"
  api_key: "sk-ant-your-key-here"
  model: "claude-sonnet-4-20250514"

detectors:
  enabled: true  # Set to true once you have API keys
  providers:
    gptzero:
      api_key: "your-gptzero-key"
    pangram:
      api_key: "your-pangram-key"
```

Or use environment variables:
```bash
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
export GPTZERO_API_KEY="your-gptzero-key"
```

## Your First Run

### Generate a LinkedIn post
```bash
ghost write --type linkedin --topic "Why vanity metrics are killing your ad campaigns"
```

### Check existing text against the 40-point QA system
```bash
ghost check --text "Paste your content here to see how it scores"
```

### Check a file
```bash
ghost check --file my-blog-post.md --verbose
```

### See what voice profiles are available
```bash
ghost profile list
```

## What Happens Under the Hood

When you run `ghost write`, five agents execute in sequence:

1. **Profile Agent** loads the content type rules and your voice profile
2. **Writer Agent** generates content with human pattern injection
3. **QA Agent** runs all 40 checks — if anything fails, the content loops back to the Writer for targeted fixes (up to 3 revision loops)
4. **Adapter Agent** formats for your target platform
5. **Polish Agent** normalizes whitespace and strips any hidden metadata

The result is content that reads like you wrote it, because the system is calibrated to YOUR voice.

## Next Steps

- Read [02 — Architecture Deep Dive](02-architecture-deep-dive.md) to understand the pipeline
- Read [03 — The 40 Checks Explained](03-the-40-checks-explained.md) for the full QA breakdown
- Check [04 — Content Type Playbooks](04-content-type-playbooks.md) for platform-specific guides
- See [08 — Examples & Outputs](08-examples-and-outputs.md) for before/after comparisons
