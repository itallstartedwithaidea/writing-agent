# 10 — Troubleshooting

## Common Issues

### "API key not configured"
Set your API key in `config/local.yaml` or via environment variable:
```bash
export ANTHROPIC_API_KEY="sk-ant-your-key"
```

### Content still scores high on detectors
1. Run `ghost check --file content.md --verbose` to see which QA checks are failing
2. Most common issues: blacklisted phrases sneaking through, low burstiness, missing personal voice
3. Try adding more specific details, personal anecdotes, and domain terminology
4. Increase the voice profile's `sentence_length_stdev` target

### QA keeps looping without converging
The max revision loop default is 3. If content can't pass after 3 revisions:
1. Check if the topic itself is inherently "AI-sounding" (very generic, no specific angle)
2. Add more context to the `--topic` flag
3. Try a different `--tone` override
4. Consider rewriting the topic to be more specific and opinionated

### Detector API errors
- Check API key validity
- GPTZero: Free tier has rate limits (10 requests/day)
- Pangram: Requires account verification
- Originality.ai: Paid API only (0.01¢ per 100 words)

### Content sounds "off" for the platform
Make sure you're using the right `--type` flag. A `--type blog` voice sounds very different from `--type reddit-comment`. The profile agent loads completely different rules for each.

## Updating for New Detectors

Detectors update constantly. To stay current:

1. Run monthly audits: `ghost benchmark --dir ./published-content/`
2. If scores creep up, check if your phrase blacklist needs updating
3. Watch for new detection papers and add new QA checks
4. Update the LLM model in config as new versions release

## Getting Help

- Open an issue on GitHub
- Include: content type, QA report, detector scores, and the text (or a representative sample)
