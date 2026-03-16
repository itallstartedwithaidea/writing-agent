/**
 * Content Type Definitions
 * 
 * Each content type defines:
 *   - Voice and tone targets
 *   - Structure patterns
 *   - Perplexity & burstiness calibration targets
 *   - Platform constraints
 *   - Special instructions for the Writer Agent
 */

export const CONTENT_TYPES = {
  blog: {
    name: 'Blog Post',
    defaultTone: 'expert-practitioner',
    defaultLength: 1200,
    maxLength: null,
    formatting: 'markdown',
    perplexityTarget: '30-45 (medium-high)',
    burstinessTarget: 'very high',
    minSentenceLengthVariance: 9,
    maxAvgSentenceLength: 22,
    structurePattern: 'Hook (story or bold claim) → Context (why this matters) → Meat (2-4 tactical sections) → Unexpected tangent (personal observation, analogy) → Close (CTA or provocative question). NOT intro-body-conclusion.',
    conventions: ['Headers use ##', 'No bullet lists longer than 5 items', 'Include at least one image callout'],
    specialInstructions: 'Include at least one coaching/sports analogy. Reference at least one specific metric or campaign result. Include one contrarian opinion. The opening must grab attention within the first sentence — no throat-clearing.'
  },

  linkedin: {
    name: 'LinkedIn Post',
    defaultTone: 'thought-leader',
    defaultLength: 200,
    maxLength: 3000,
    formatting: 'linkedin',
    perplexityTarget: '25-35',
    burstinessTarget: 'high',
    minSentenceLengthVariance: 7,
    maxAvgSentenceLength: 18,
    structurePattern: 'Hook line (bold claim or stat) → 2-3 short insight paragraphs → Specific example with numbers → Lesson/takeaway → CTA or question. Each paragraph is 1-3 sentences MAX.',
    conventions: ['Heavy line breaks (LinkedIn formatting)', 'No hashtag spam (3-5 max)', 'No emoji overload'],
    specialInstructions: 'Never start with "I\'m excited to announce." Use specific numbers ("192% YoY growth" not "significant improvement"). End with a genuine question. Each line should be scannable — LinkedIn is a scrolling platform.'
  },

  reddit: {
    name: 'Reddit Post',
    defaultTone: 'knowledgeable-peer',
    defaultLength: 400,
    maxLength: 40000,
    formatting: 'reddit-markdown',
    perplexityTarget: '35-50',
    burstinessTarget: 'very high',
    minSentenceLengthVariance: 10,
    maxAvgSentenceLength: 20,
    structurePattern: 'TL;DR (optional, at top or bottom) → Core argument (2-3 paragraphs) → Specific examples → Open question or invitation to discuss.',
    conventions: ['Reddit markdown', 'TL;DR convention', 'No self-promotion tone'],
    specialInstructions: 'Use platform language (IMO, FWIW, "edit:"). Be willing to disagree. Include caveats ("take this with a grain of salt"). Don\'t be preachy. Sound like a person on Reddit, not a brand.'
  },

  'reddit-comment': {
    name: 'Reddit Comment',
    defaultTone: 'casual-expert',
    defaultLength: 150,
    maxLength: 10000,
    formatting: 'reddit-markdown',
    perplexityTarget: '35-50',
    burstinessTarget: 'very high',
    minSentenceLengthVariance: 10,
    maxAvgSentenceLength: 16,
    structurePattern: 'Direct response to parent → Specific addition or disagreement → Brief personal experience. Short and punchy.',
    conventions: ['Respond to the specific point', 'Quote parent if disagreeing', 'No essay-length replies unless warranted'],
    specialInstructions: 'Match the register of the subreddit. Technical subreddits get technical answers. Casual subreddits get casual tone. Be concise — the best Reddit comments are tight.'
  },

  substack: {
    name: 'Substack Article',
    defaultTone: 'personal-newsletter',
    defaultLength: 1500,
    maxLength: null,
    formatting: 'markdown',
    perplexityTarget: '30-45',
    burstinessTarget: 'very high',
    minSentenceLengthVariance: 9,
    maxAvgSentenceLength: 22,
    structurePattern: 'Personal hook or recent observation → "Here\'s what I\'ve been thinking" → 3-4 substantive sections → Practical takeaways → Sign-off with personality.',
    conventions: ['Newsletter voice', 'Can include "subscribe" CTA', 'Feels like a letter from a friend who happens to be an expert'],
    specialInstructions: 'This is your most personal format. Write like you\'re sending a letter to 1,000 people you respect. Reference recent events, your week, specific conversations. Serial format — reference previous issues when relevant.'
  },

  whitepaper: {
    name: 'White Paper',
    defaultTone: 'authoritative-expert',
    defaultLength: 3000,
    maxLength: null,
    formatting: 'markdown',
    perplexityTarget: '20-35',
    burstinessTarget: 'medium',
    minSentenceLengthVariance: 6,
    maxAvgSentenceLength: 24,
    structurePattern: 'Executive Summary → Problem Statement (with industry context) → Analysis (3-5 sections with data) → Recommendations (specific, actionable) → Methodology/Sources.',
    conventions: ['Formal but still opinionated', 'Every claim backed by data', 'Include original analysis'],
    specialInstructions: 'Every claim needs a specific data point or named example. Include original analysis that doesn\'t exist anywhere else. Reference actual client work (anonymized). The white paper must contain information a detector\'s training data has never seen.'
  },

  email: {
    name: 'Email',
    defaultTone: 'direct-warm',
    defaultLength: 150,
    maxLength: null,
    formatting: 'plain',
    perplexityTarget: '30-45',
    burstinessTarget: 'high',
    minSentenceLengthVariance: 8,
    maxAvgSentenceLength: 16,
    structurePattern: 'Short greeting → The point (sentences 1-2) → Context if needed → Action item or next step → Short close.',
    conventions: ['No filler', 'Include subject line suggestion', 'Match relationship formality'],
    specialInstructions: 'Never start with "I hope this email finds you well" or "Just circling back." Use the recipient\'s name. Be specific about what you need. Sign off naturally.'
  },

  instagram: {
    name: 'Instagram Caption',
    defaultTone: 'personality-forward',
    defaultLength: 150,
    maxLength: 2200,
    formatting: 'instagram',
    perplexityTarget: '30-40',
    burstinessTarget: 'high',
    minSentenceLengthVariance: 8,
    maxAvgSentenceLength: 14,
    structurePattern: 'Hook (first line visible in preview) → Story or insight (2-3 short paragraphs) → CTA or question → Hashtags (5-10).',
    conventions: ['Line breaks', 'Emoji used naturally (not excessively)', 'Hashtags at end'],
    specialInstructions: 'Caption must make sense without the image. Use line breaks. Include a behind-the-scenes detail. The first line must stop the scroll.'
  },

  facebook: {
    name: 'Facebook Post',
    defaultTone: 'engaging-community',
    defaultLength: 200,
    maxLength: 63206,
    formatting: 'facebook',
    perplexityTarget: '30-40',
    burstinessTarget: 'high',
    minSentenceLengthVariance: 7,
    maxAvgSentenceLength: 16,
    structurePattern: 'Hook → Personal story or insight → Question for engagement. Conversational and shareable.',
    conventions: ['Tag people/pages', 'Shareable format', 'No hashtag overload (2-3 max)'],
    specialInstructions: 'Facebook rewards conversation starters. Ask genuine questions. Share something personal or surprising. Make people want to comment, not just like.'
  },

  twitter: {
    name: 'X/Twitter Post',
    defaultTone: 'punchy-opinionated',
    defaultLength: 50,
    maxLength: 280,
    formatting: 'twitter',
    perplexityTarget: '35-50',
    burstinessTarget: 'high',
    minSentenceLengthVariance: 5,
    maxAvgSentenceLength: 12,
    structurePattern: 'Single punchy statement, hot take, or thread starter. Every word earns its place.',
    conventions: ['280 character limit', 'Thread format for longer thoughts', 'Quote tweet conventions'],
    specialInstructions: 'Compress the insight into as few words as possible. Strong opinion > explanation. Threads can expand, but the first tweet must stand alone.'
  },

  website: {
    name: 'Website Copy',
    defaultTone: 'conversion-focused',
    defaultLength: 500,
    maxLength: null,
    formatting: 'html',
    perplexityTarget: '25-35',
    burstinessTarget: 'medium-high',
    minSentenceLengthVariance: 7,
    maxAvgSentenceLength: 18,
    structurePattern: 'Headline → Subheadline (benefit) → Problem → Solution → Proof points → CTA. Scannable, benefit-led.',
    conventions: ['Scannable headers', 'Short paragraphs', 'Benefit-led copy'],
    specialInstructions: 'Every section answers "what\'s in it for the reader." Use specific numbers for proof. CTAs are clear and action-oriented. Don\'t sound like a template.'
  },

  reply: {
    name: 'Reply / Response',
    defaultTone: 'context-matched',
    defaultLength: 100,
    maxLength: null,
    formatting: 'plain',
    perplexityTarget: '35-50',
    burstinessTarget: 'high',
    minSentenceLengthVariance: 8,
    maxAvgSentenceLength: 14,
    structurePattern: 'Acknowledge their point → Add specific value → Concise close.',
    conventions: ['Match the tone of what you\'re replying to', 'Be concise', 'Add value, don\'t just agree'],
    specialInstructions: 'Read the room. Match formality to the original message. Add something they didn\'t know or a different perspective. Keep it tight.'
  }
};
