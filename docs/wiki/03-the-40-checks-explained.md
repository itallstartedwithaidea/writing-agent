# 03 — The 40 Checks Explained

Every piece of content must pass all 40 checks before shipping. Each check maps directly to a known AI detection vector from the research.

## Scoring

- **PASS** — Check is satisfied
- **SOFT FAIL** — Minor issue, content can ship if ≤3 total soft fails
- **HARD FAIL** — Critical issue, content cannot ship until resolved

**Pass threshold:** 0 hard fails, ≤3 soft fails

---

## Block A: Statistical & Probability Checks (1-7)

These checks target the same signals used by statistical detectors like GPTZero, GLTR, DetectGPT, and Binoculars.

| # | Check | Detection Vector | What Passes | Research |
|---|-------|-----------------|-------------|----------|
| 1 | Perplexity Score | Low perplexity = predictable = AI | Uncommon word ratio >4% | GPTZero (Tian, 2023) |
| 2 | Burstiness Score | Uniform sentence length = AI | Sentence length StdDev >8 | GPTZero (Tian, 2023) |
| 3 | Token Distribution | Most tokens in top-10 predictions = AI | Has both <6 word and >30 word sentences | GLTR (Gehrmann et al., 2019) |
| 4 | Log Probability Curvature | Text at local maxima of log prob = AI | >70% unique sentence starters | DetectGPT (Mitchell et al., 2023) |
| 5 | Cross-Perplexity Ratio | Distinctive ratio between two LLMs = AI | Derivative of checks 1+2 | Binoculars (Hans et al., 2024) |
| 6 | N-gram Novelty | Overused AI n-grams detected | Zero blacklisted phrases | CT2 (Sheth et al., 2023) |
| 7 | Entropy Level | Consistent information density = AI | Paragraph length CoV >0.40 | Shannon entropy analysis |

## Block B: Classifier Resistance (8-12)

These target fine-tuned transformer classifiers (RoBERTa, BERT, DeBERTa) used by commercial detectors.

| # | Check | Detection Vector | What Passes | Research |
|---|-------|-----------------|-------------|----------|
| 8 | Transformer Resistance | Learned embedding patterns | First person + specific numbers present | Fine-tuned classifier research |
| 9 | Training Data Divergence | Resembles known AI outputs | Has conjunction starters + fragments | AuTexTification (2023) |
| 10 | Ensemble Voting | Multiple methods agree = AI | >80% of prior checks passing | Mikros & Koursaris (2023) |
| 11 | Model Freshness | Matches latest model patterns | Zero model-specific patterns detected | Continuous retraining literature |
| 12 | Model Attribution | Fingerprints to specific LLM | Cannot be attributed to any single model | Defactify AAAI 2025 |

## Block C: Linguistic & Stylometric (13-18)

Target stylometric analysis systems that measure 31+ writing features.

| # | Check | Detection Vector | What Passes | Research |
|---|-------|-----------------|-------------|----------|
| 13 | Stylometric Fingerprint | AI stylometric distribution | Type-Token Ratio >0.50 | StyloAI (Mustapha et al., 2024) |
| 14 | Lexical Diversity | Low vocabulary diversity = AI | Hapax ratio >35% | StyloAI |
| 15 | Readability Variance | Narrow readability band = AI | Avg sentence length 12-24 words | Readability score analysis |
| 16 | Syntactic Variety | Repetitive sentence structure = AI | Questions + exclamations + varied starters | StyloAI |
| 17 | AI Phrase Blacklist | Known AI-overused phrases | Zero blacklisted phrases (HARD CHECK) | Commercial detector databases |
| 18 | Emotional Authenticity | Flat sentiment = AI | Opinion/emotion markers present | Sentiment analysis research |

## Block D: Watermark & Metadata (19-20)

Target embedded watermarks and hidden markers.

| # | Check | Detection Vector | What Passes | Research |
|---|-------|-----------------|-------------|----------|
| 19 | Watermark Stripping | SynthID token-level watermarks | Content fully reconstructed (not pass-through) | SynthID (Google DeepMind) |
| 20 | Metadata Hygiene | Invisible Unicode/formatting | Zero invisible characters (HARD CHECK) | SynthID, metadata analysis |

## Block E: Scoring & Output (21-25)

Target the scoring and classification layer of detectors.

| # | Check | Detection Vector | What Passes | Research |
|---|-------|-----------------|-------------|----------|
| 21 | Confidence Score Target | Detector confidence >threshold | >15 prior checks passing | Commercial detector calibration |
| 22 | Sentence-Level Clean | Individual sentences flagged | Sentence length StdDev >6 | GPTZero sentence highlighting |
| 23 | Plagiarism Clear | Matches existing web content | Run external plagiarism scan | Originality.ai, Turnitin |
| 24 | Humanizer Resistance | Humanizer tool artifacts | No archaic/unusual vocabulary artifacts | Winston AI humanizer detection |
| 25 | Language Authenticity | Mismatch with writer's level | Domain terminology present | Liang et al. (2023) |

## Block F: Bias Exploitation (26-28)

Exploit known weaknesses and calibration gaps in detectors.

| # | Check | Detection Vector | What Passes | Research |
|---|-------|-----------------|-------------|----------|
| 26 | Non-Native Bias Exploit | Expert writing rarely flagged | Avg sentence length >12 | Liang et al. (Stanford, 2023) |
| 27 | Domain-Specific Patterns | Specialized domains less covered | Specialized content present | Detector training data gaps |
| 28 | Length Optimization | Short text = unreliable detection | Word count >100 | GPTZero 300-char minimum |

## Block G: Adversarial Robustness (29-31)

Ensure the system itself doesn't become detectable through pattern repetition.

| # | Check | Detection Vector | What Passes | Research |
|---|-------|-----------------|-------------|----------|
| 29 | Adversarial Diversity | Formulaic evasion patterns | Rotating injection techniques | RAID benchmark |
| 30 | Translation-Proof | Back-translation artifacts | Idiomatic English present | SynthID translation limitations |
| 31 | Mixed-Authorship Consistency | Change-point detection | Consistent voice (StdDev <20) | Kumarage et al. (2023) |

## Block H: Infrastructure (32-34)

Operational checks for the publishing pipeline.

| # | Check | Detection Vector | What Passes | Research |
|---|-------|-----------------|-------------|----------|
| 32 | Multi-Detector Ready | Single detector gaps | Content ready for API validation | Multi-tool benchmarking |
| 33 | Plain Text Normalization | Whitespace/encoding artifacts | Clean whitespace patterns | Metadata analysis |
| 34 | Platform-Native Formatting | Cross-platform paste artifacts | Formatted for target platform | Platform convention analysis |

## Block I: Evaluation (35-37)

Quality assurance meta-checks.

| # | Check | Detection Vector | What Passes | Research |
|---|-------|-----------------|-------------|----------|
| 35 | Benchmark Ready | New detector performance | Content structure supports testing | RAID, independent benchmarks |
| 36 | False Positive Exploitation | Detector uncertainty zone | High Type-Token Ratio (>0.45) | Detector calibration studies |
| 37 | AI-Assisted Classification | QuillBot 3-category system | First person present, reads as human-authored | QuillBot (2024) |

## Block J: Governance (38-40)

Legal and provenance compliance.

| # | Check | Detection Vector | What Passes | Research |
|---|-------|-----------------|-------------|----------|
| 38 | Disclosure Compliance | Platform AI disclosure rules | Content reads as human-authored | Platform policies |
| 39 | Audit Trail | Authorship challenge defense | Research notes, outlines maintained | Legal defensibility |
| 40 | Provenance-Proof | C2PA / SynthID provenance chain | Content reconstructed, not pass-through | C2PA, SynthID Detector |
