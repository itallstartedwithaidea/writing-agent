# 05 — Voice Profiles

Voice profiles define HOW Ghost Protocol writes. They're the secret weapon — the more accurately your profile captures your natural writing style, the more undetectable the output.

## Profile Structure

```yaml
profile-name:
  name: "Display Name"
  background: "Brief bio context"
  tone_anchors:
    - "Personality trait 1"
    - "Personality trait 2"
  vocabulary:
    domain_terms: ["industry", "specific", "jargon"]
    signature_phrases: ["things you actually say"]
    avoid: ["words you'd never use"]
  structural_habits:
    starts_with_conjunctions: true/false
    uses_fragments: true/false
    parenthetical_asides: "frequent/occasional/rare"
    average_sentence_length: 16
    sentence_length_stdev: 9
```

## Built-In Profiles

- **john-williams** — Default. Paid media veteran, coaching analogies, direct style.
- **agency-professional** — Client-facing, data-driven, diplomatic.
- **coaching-voice** — Motivational, sports metaphors, tough love.
- **technical-docs** — Precise, code-aware, practical.

## Creating Custom Profiles

### Option 1: Manual (edit YAML)
Add a new entry to `config/voice-profiles.yaml`.

### Option 2: Interactive Builder
```bash
ghost profile create "my-voice"
```
Walks you through tone, vocabulary, and structural preferences.

### Option 3: Import from Writing Samples (Recommended)
```bash
ghost profile import --samples ./my-writing/ --name "my-natural-voice"
```
Analyzes your existing writing to extract your natural stylometric fingerprint: sentence length distribution, vocabulary preferences, structural habits, and tone.

## Why Profiles Matter for Detection Evasion

Stanford's research (Liang et al., 2023) showed that detectors score based on perplexity, which correlates with writing sophistication. A well-calibrated voice profile ensures the output matches YOUR natural sophistication level — not the AI's default.

The more specific and personal your profile, the further the output moves from generic AI patterns.
