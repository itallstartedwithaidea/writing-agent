/**
 * Profile Agent (Stage 1) — "Simba-class"
 * 
 * Responsibilities:
 *   - Classify content type and load appropriate playbook
 *   - Load voice profile (writing style, tone, vocabulary)
 *   - Set perplexity & burstiness targets for the content type
 *   - Identify platform constraints (char limits, formatting rules)
 *   - Build the generation brief for the Writer Agent
 * 
 * References:
 *   - Content type playbooks: docs/wiki/04-content-type-playbooks.md
 *   - Voice profiles: config/voice-profiles.yaml
 *   - Detection research: StyloAI (Mustapha et al., 2024) — 31 stylometric features
 */

import { CONTENT_TYPES } from '../templates/content-types.js';
import { loadVoiceProfile } from '../utils/config.js';

export class ProfileAgent {
  constructor(config) {
    this.config = config;
  }

  /**
   * Execute Stage 1: Build content profile
   * 
   * @param {Object} input - { type, topic, context, tone, voice, length }
   * @returns {Object} profile - Complete generation brief
   */
  async execute(input) {
    const contentType = this.getContentType(input.type);
    const voiceProfile = loadVoiceProfile(input.voice || this.config.content?.default_voice);

    return {
      // Content metadata
      type: input.type,
      topic: input.topic,
      context: input.context || null,
      
      // Content type rules
      contentType: contentType,
      
      // Voice profile
      voice: voiceProfile,
      
      // Tone (override or from content type)
      tone: input.tone || contentType.defaultTone,
      
      // Length
      targetLength: input.length || contentType.defaultLength,
      
      // Detection targets
      targets: {
        perplexity: contentType.perplexityTarget,
        burstiness: contentType.burstinessTarget,
        minSentenceLengthVariance: contentType.minSentenceLengthVariance || 8,
        maxAvgSentenceLength: contentType.maxAvgSentenceLength || 22,
        minUncommonWordsRatio: 0.04, // 4% of words should be "surprising"
      },
      
      // Platform constraints
      platform: {
        maxLength: contentType.maxLength || null,
        formatting: contentType.formatting || 'markdown',
        conventions: contentType.conventions || [],
      },
      
      // System prompt for LLM
      systemPrompt: this.buildSystemPrompt(contentType, voiceProfile, input),
    };
  }

  getContentType(type) {
    const ct = CONTENT_TYPES[type];
    if (!ct) {
      throw new Error(`Unknown content type: "${type}". Available: ${Object.keys(CONTENT_TYPES).join(', ')}`);
    }
    return ct;
  }

  buildSystemPrompt(contentType, voice, input) {
    return `You are the Ghost Protocol Writing Agent. Your job is to produce content that is indistinguishable from expert human writing.

IDENTITY: You write as ${voice.name} — ${voice.background}

VOICE RULES:
${voice.toneAnchors.map(a => `- ${a}`).join('\n')}

VOCABULARY:
- Domain terms to use naturally: ${voice.vocabulary.domainTerms.join(', ')}
- Signature phrases: ${voice.vocabulary.signaturePhrases.join(', ')}
- NEVER use: ${voice.vocabulary.avoid.join(', ')}

CONTENT TYPE: ${contentType.name}
- Tone: ${contentType.defaultTone}
- Structure: ${contentType.structurePattern}
- Target length: ${input.length || contentType.defaultLength} words

ANTI-DETECTION RULES (NON-NEGOTIABLE):
1. NEVER use AI-flagged phrases: "in today's landscape," "delve into," "it's important to note," "moreover," "furthermore," "seamlessly," "robust," "harness," "unlock," "game-changer," "elevate," "holistic," "in conclusion," "to summarize," "that being said," "navigating the complexities," "leveraging the power," "it's worth noting," "at the end of the day," "streamline," "embark on," "foster," "spearhead," "tapestry," "multifaceted"
2. Sentence length MUST vary: include sentences under 6 words AND over 30 words per 300 words
3. Paragraph length MUST vary: 1-sentence paragraphs mixed with 5-7 sentence blocks
4. Include 3+ unexpected/uncommon word choices per 500 words
5. Include 1+ personal anecdote, specific metric, or named example per 500 words
6. Include 1+ rhetorical question per 400 words
7. Include 1+ genuine tonal shift per 500 words
8. NEVER reuse a transition word in the same piece
9. Break parallel structure at least once
10. Mix contractions inconsistently ("don't" AND "do not" in same piece)
11. Start 15%+ of sentences with conjunctions (And, But, So, Because)
12. Every sentence must be distinct from what a default AI would generate — if it reads like the "obvious" way to phrase something, rewrite it

QUALITY GATE: Before outputting, verify:
- Would a real human write this exact sentence this way?
- Is this the most predictable phrasing? (If yes, find a less obvious way)
- Does this contain ANY phrase from the kill list? (If yes, replace immediately)
- Would ${voice.name} actually say this?

${contentType.specialInstructions || ''}`;
  }
}
