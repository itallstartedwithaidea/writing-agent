# 04 — Content Type Playbooks

Detailed playbooks for each of the 12 supported content types. Each playbook defines voice, structure, calibration targets, and platform-specific rules.

See `src/templates/content-types.js` for the programmatic definitions.

---

## Blog Post (`--type blog`)

**Voice:** Expert practitioner speaking from experience. Direct, opinionated, willing to say what others won't.

**Structure:**
```
Hook (story or bold claim)
  → Context (why this matters now)
    → Meat (2-4 sections with specific tactical detail)
      → Unexpected tangent (coaching metaphor, personal observation)
        → Close (CTA or provocative question)
```

**NOT** the standard intro-body-conclusion format.

**Calibration:**
- Perplexity target: 30-45 (medium-high)
- Burstiness target: Very high
- Mix 4-word fragments with 40-word complex sentences
- Paragraph lengths from 1 sentence to 7 sentences

**Special rules:**
- Include at least one coaching/football analogy
- Reference at least one specific metric or campaign result
- Include one contrarian opinion
- Opening must grab attention in the first sentence — no throat-clearing

---

## LinkedIn Post (`--type linkedin`)

**Voice:** Thought leader sharing hard-earned insights. Confident but not arrogant.

**Structure:**
```
Hook line (bold claim or surprising stat)
  → 2-3 short insight paragraphs
    → Specific example with numbers
      → Lesson/takeaway
        → CTA or question for engagement
```

Each "paragraph" is 1-3 sentences max for LinkedIn's scanning format.

**Calibration:**
- Perplexity: 25-35
- Burstiness: High
- Line breaks ARE the punctuation on LinkedIn

**Special rules:**
- Never start with "I'm excited to announce"
- Use specific numbers ("192% YoY growth" not "significant improvement")
- End with a genuine question, not a performative one
- Tag real people/companies when relevant

---

## Reddit Post (`--type reddit`)

**Voice:** Knowledgeable peer, not a thought leader. Casual, direct, occasionally sarcastic.

**Structure:**
```
TL;DR (top or bottom)
  → Core argument (2-3 paragraphs)
    → Specific examples
      → Open question
```

**Special rules:**
- Use platform language (IMO, FWIW, "edit:")
- Be willing to disagree
- Include caveats ("take this with a grain of salt")
- Sound like a person on Reddit, not a brand

---

## Reddit Comment (`--type reddit-comment`)

**Voice:** Casual expert. Match the subreddit's register.

**Structure:** Direct response → Specific addition → Brief personal experience

**Special rules:** Be concise. The best Reddit comments are tight.

---

## White Paper (`--type whitepaper`)

**Voice:** Authoritative expert building a case with evidence.

**Structure:**
```
Executive Summary
  → Problem Statement (with industry context)
    → Analysis (3-5 sections with data)
      → Recommendations (specific, actionable)
        → Methodology/Sources
```

**Special rules:**
- Every claim backed by specific data or named examples
- Include original analysis that doesn't exist anywhere else
- The white paper must contain information detectors' training data has never seen

---

## Email (`--type email`)

**Voice:** Direct, warm, efficient. Match relationship formality.

**Structure:** Short greeting → The point → Context if needed → Action item → Short close

**Special rules:**
- Never start with "I hope this email finds you well"
- Use the person's name
- Be specific about what you need

---

## Instagram (`--type instagram`), Facebook (`--type facebook`), Twitter (`--type twitter`)

See `src/templates/content-types.js` for full definitions. Key principle: each social platform has different conventions, and the adapter agent handles formatting automatically.

---

## Substack (`--type substack`)

**Voice:** Personal newsletter. Like a letter from a friend who happens to be an expert.

**Special rules:** Reference recent events, your week, specific conversations. Serial format.

---

## Website Copy (`--type website`)

**Voice:** Conversion-focused, clear, benefit-led.

**Special rules:** Every section answers "what's in it for the reader."

---

## Reply (`--type reply`)

**Voice:** Context-matched. Read the room.

**Special rules:** Match formality to original. Add specific value. Keep it tight.
