/**
 * Writer Agent (Stage 2) — "Nemo-class"
 * 
 * The core content generation engine with human pattern injection.
 * 
 * Responsibilities:
 *   - Generate content via LLM using the profile's system prompt
 *   - Inject human writing patterns at structural, sentence, and word levels
 *   - Handle revision loops when QA fails specific checks
 * 
 * Pattern Injection Framework:
 *   STRUCTURAL: Paragraph length variance, non-standard transitions, tangential asides
 *   SENTENCE:   Length variance (5-40 words), conjunction starters, rhetorical questions
 *   WORD:       Register mixing, uncommon vocabulary, inconsistent contractions
 * 
 * References:
 *   - Perplexity/Burstiness: GPTZero (Tian, 2023)
 *   - Stylometric features: StyloAI (Mustapha et al., 2024)
 *   - Token distribution: GLTR (Gehrmann et al., 2019)
 */

import Anthropic from '@anthropic-ai/sdk';

export class WriterAgent {
  constructor(config) {
    this.config = config;
    this.client = this.initClient();
  }

  initClient() {
    const provider = this.config.llm?.provider || 'anthropic';
    if (provider === 'anthropic') {
      return new Anthropic({ apiKey: this.config.llm?.api_key || process.env.ANTHROPIC_API_KEY });
    }
    throw new Error(`Provider "${provider}" not yet implemented. Use "anthropic".`);
  }

  /**
   * Execute Stage 2: Generate content
   * 
   * @param {Object} profile - Content profile from Stage 1
   * @returns {Object} - { text, metadata }
   */
  async execute(profile) {
    const userPrompt = this.buildUserPrompt(profile);
    
    const response = await this.client.messages.create({
      model: this.config.llm?.model || 'claude-sonnet-4-20250514',
      max_tokens: this.config.llm?.max_tokens || 4096,
      temperature: this.config.llm?.temperature || 0.85,
      system: profile.systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    });

    const text = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    return {
      text: text.trim(),
      metadata: {
        model: this.config.llm?.model,
        contentType: profile.type,
        targetLength: profile.targetLength,
        generatedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Revise content based on QA failures
   * 
   * @param {Object} content - Current content { text, metadata }
   * @param {Array} failures - Array of failed QA checks
   * @returns {Object} - Revised content
   */
  async revise(content, failures) {
    const revisionInstructions = failures.map(f => {
      return `- FIX CHECK #${f.number} (${f.name}): ${f.fix}`;
    }).join('\n');

    const response = await this.client.messages.create({
      model: this.config.llm?.model || 'claude-sonnet-4-20250514',
      max_tokens: this.config.llm?.max_tokens || 4096,
      temperature: 0.9, // Slightly higher for revision diversity
      system: `You are the Ghost Protocol revision engine. You receive content that failed specific QA checks and must fix ONLY the failing areas while preserving everything that already works. Make targeted surgical edits, not wholesale rewrites.`,
      messages: [
        {
          role: 'user',
          content: `Here is the content to revise:\n\n---\n${content.text}\n---\n\nThe following QA checks FAILED. Fix each one with targeted edits:\n\n${revisionInstructions}\n\nOutput ONLY the revised content. No explanations.`
        }
      ]
    });

    const text = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    return {
      text: text.trim(),
      metadata: {
        ...content.metadata,
        revised: true,
        revisionCount: (content.metadata.revisionCount || 0) + 1,
        revisedAt: new Date().toISOString()
      }
    };
  }

  buildUserPrompt(profile) {
    let prompt = `Write a ${profile.contentType.name} about: ${profile.topic}`;
    
    if (profile.context) {
      prompt += `\n\nContext: ${profile.context}`;
    }

    prompt += `\n\nTarget length: approximately ${profile.targetLength} words.`;
    prompt += `\n\nStructure: ${profile.contentType.structurePattern}`;
    
    if (profile.contentType.specialInstructions) {
      prompt += `\n\nSpecial instructions: ${profile.contentType.specialInstructions}`;
    }

    prompt += `\n\nRemember: Write this as ${profile.voice.name} would ACTUALLY write it. Not how an AI thinks ${profile.voice.name} would write it. The difference matters.`;

    return prompt;
  }
}
