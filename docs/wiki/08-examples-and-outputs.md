# 08 — Examples & Outputs

## Before/After Comparisons

See the `examples/outputs/` directory for full before/after examples:

- `linkedin-post-before-after.md` — LinkedIn thought leadership
- `blog-post-before-after.md` — Technical blog post
- `reddit-comment-before-after.md` — Reddit response
- `email-before-after.md` — Professional email
- `whitepaper-before-after.md` — White paper excerpt

## What Changes Between "Before" and "After"

The key transformations Ghost Protocol applies:

1. **Kills AI phrases** — Every blacklisted phrase is replaced
2. **Injects burstiness** — Sentence lengths go from uniform to varied (StdDev 4 → 10+)
3. **Raises perplexity** — Predictable words replaced with domain-specific, unexpected choices
4. **Adds personal voice** — First person, specific metrics, opinions, tonal shifts
5. **Breaks patterns** — No two sentences start the same way, parallel structure broken
6. **Domain specificity** — Technical jargon, named campaigns, real numbers

## Typical Detection Score Improvement

| Metric | Raw AI | Ghost Protocol |
|--------|--------|---------------|
| GPTZero | 85-98% | 5-25% |
| Pangram | 80-95% | 3-20% |
| Sentence StdDev | 3-5 | 8-12 |
| Type-Token Ratio | 0.35-0.42 | 0.50-0.65 |
| Blacklisted phrases | 5-15 | 0 |

## Running Your Own Benchmarks

```bash
# Benchmark a single file
ghost benchmark --file my-article.md

# Benchmark a directory
ghost benchmark --dir ./content/ --output markdown
```
