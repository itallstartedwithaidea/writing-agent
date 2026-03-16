/**
 * Adapter Agent (Stage 4) — "Elsa-class"
 * Formats content for the target platform
 */
export class AdapterAgent {
  constructor(config) { this.config = config; }

  async execute(content, profile, outputFormat) {
    const text = content.text || content;
    const type = profile.type;

    switch (outputFormat) {
      case 'markdown': return { text: this.toMarkdown(text, profile), format: 'markdown' };
      case 'docx':     return { text, format: 'docx', metadata: { needsDocxExport: true } };
      case 'html':     return { text: this.toHTML(text, profile), format: 'html' };
      case 'gdocs':    return { text, format: 'gdocs', metadata: { needsGDocsExport: true } };
      default:         return { text, format: outputFormat || 'markdown' };
    }
  }

  toMarkdown(text, profile) {
    // Platform-specific markdown adaptations
    if (profile.type === 'linkedin') {
      // LinkedIn: ensure line breaks are preserved
      return text.replace(/\n/g, '\n\n');
    }
    if (profile.type === 'reddit' || profile.type === 'reddit-comment') {
      // Reddit: ensure markdown formatting
      return text;
    }
    return text;
  }

  toHTML(text, profile) {
    const paragraphs = text.split(/\n\n+/).filter(Boolean);
    const htmlParagraphs = paragraphs.map(p => {
      if (p.startsWith('# '))    return `<h1>${p.slice(2)}</h1>`;
      if (p.startsWith('## '))   return `<h2>${p.slice(3)}</h2>`;
      if (p.startsWith('### '))  return `<h3>${p.slice(4)}</h3>`;
      return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    });
    return htmlParagraphs.join('\n');
  }
}
