# Changelog

All notable changes to Writing Agent will be documented in this file.

## [1.0.0] — 2026-03-16

### Added
- Initial release
- 5-agent pipeline architecture (Profile, Writer, QA, Adapter, Polish)
- 40-point QA system mapped to known AI detection vectors
- 12 content type playbooks (blog, LinkedIn, Reddit, Substack, whitepaper, email, Instagram, Facebook, Twitter, website copy, reply, Reddit comment)
- 4 voice profiles (john-williams, agency-professional, coaching-voice, technical-docs)
- AI phrase blacklist with 120+ flagged phrases
- Text analysis engine (perplexity proxy, burstiness, type-token ratio, hapax ratio, syntactic analysis)
- Multi-detector API client (GPTZero, Pangram, Originality.ai)
- CLI tool with `write`, `check`, `benchmark`, `calibrate`, and `profile` commands
- Output formats: markdown, DOCX, HTML, Google Docs, plain text
- Full wiki documentation (10 pages)
- Before/after examples for LinkedIn, blog, Reddit, and email
- Research citations from 50+ academic and commercial sources
- Integration architecture for advertising-hub, google-ads-mcp, ContextOS, intel-harvester

### Research Basis
- DetectGPT (Mitchell et al., 2023) — Log probability curvature
- Binoculars (Hans et al., 2024) — Cross-perplexity detection
- StyloAI (Mustapha et al., 2024) — 31 stylometric features
- SynthID (Google DeepMind) — Text watermarking
- Liang et al. (2023) — Non-native English speaker bias
- GLTR (Gehrmann et al., 2019) — Token distribution analysis
- CT2 (Sheth et al., 2023) — AI Detectability Index
