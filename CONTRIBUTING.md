# Contributing to Writing Agent

First off — thanks for considering contributing. This project exists because the AI detection space moves fast and no single person can keep up with every new model, detector update, and evasion technique. Contributions make this tool better for everyone.

## How to Contribute

### Reporting Issues
- **Detection bypass failures**: If Ghost Protocol output gets flagged by a specific detector, open an issue with the content type, detector name, and score. This is the most valuable feedback.
- **False QA results**: If a QA check passes when it shouldn't (or fails when it shouldn't), report it with the text sample.
- **Bug reports**: Standard issue template — steps to reproduce, expected vs actual behavior.

### Pull Requests

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/new-adapter`)
3. Make your changes
4. Run tests (`npm test`)
5. Submit a PR with a clear description of what you changed and why

### Areas Where Help is Needed

#### Priority 1: New Platform Adapters
- TikTok caption formatter
- Discord message formatter
- Slack message formatter
- Medium article formatter
- WordPress REST API direct publishing
- Buffer/Hootsuite integration

#### Priority 2: Voice Profile Templates
- Industry-specific profiles (healthcare, legal, fintech, SaaS)
- Regional voice profiles (UK English, Australian English)
- Academic writing profiles (by discipline)

#### Priority 3: QA Check Improvements
- New detection methods as papers are published
- Better proxy metrics for checks that currently use heuristics
- Calibration data for different content types

#### Priority 4: Detector API Integrations
- New detector APIs as they launch
- Improved response parsing for existing integrations
- Rate limiting and caching improvements

#### Priority 5: Language Support
- Non-English voice profiles and phrase blacklists
- Multilingual QA check calibration
- Translation-aware detection checks

### Code Style
- ES modules (import/export)
- JSDoc comments on all exported functions
- Descriptive variable names over comments
- Each file has a header comment explaining its purpose and research basis

### Commit Messages
Format: `type(scope): description`

Examples:
```
feat(adapter): add TikTok caption formatter
fix(qa): adjust burstiness threshold for short-form content
docs(wiki): add voice profile creation tutorial
test(checks): add unit tests for phrase blacklist
```

### Research Citations
If your contribution is based on a specific paper or tool, add the citation to `docs/wiki/09-research-and-citations.md` and reference it in code comments.

## Code of Conduct

Be direct, be helpful, don't be a jerk. We're building tools for writers — write your contributions like you'd want to read them.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
