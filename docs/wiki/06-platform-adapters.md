# 06 — Platform Adapters

Platform adapters handle the last-mile formatting for each publishing destination.

## Supported Formats

| Format | Flag | What It Does |
|--------|------|-------------|
| Markdown | `--output markdown` | Standard markdown (default) |
| DOCX | `--output docx` | Word document with headers, styles |
| HTML | `--output html` | Semantic HTML with paragraphs, headers |
| Google Docs | `--output gdocs` | Direct to Google Docs via API |
| Plain text | `--output txt` | Stripped formatting |

## Platform-Specific Formatting

LinkedIn, Reddit, Instagram, and other platforms have their own conventions that the adapter handles automatically based on `--type`:

- **LinkedIn:** Aggressive line breaks, no hashtag spam
- **Reddit:** Reddit markdown, TL;DR convention
- **Instagram:** Caption + hashtag block at end
- **Twitter:** 280 character enforcement, thread support

## Google Docs Integration

Requires Google Docs API credentials in `config/local.yaml`:

```yaml
google_docs:
  credentials_file: "./credentials.json"
  token_file: "./token.json"
```

Usage: `ghost write --type blog --output gdocs --gdocs-id "document-id"`

## Word Document Export

Generates professional DOCX with:
- Heading styles (H1-H3)
- Table of contents (for white papers)
- Page numbers
- Custom fonts and spacing

Usage: `ghost write --type whitepaper --output docx --output-file report.docx`
