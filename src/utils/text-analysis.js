/**
 * Text Analyzer — Core text analysis utilities
 * 
 * Computes stylometric features used by the 40-point QA system:
 *   - Sentence length statistics (mean, stdev, distribution)
 *   - Word-level metrics (type-token ratio, hapax, uncommon words)
 *   - Structural analysis (paragraph lengths, sentence starters)
 *   - Punctuation and formatting analysis
 * 
 * References:
 *   - StyloAI (Mustapha et al., 2024) — 31 stylometric features
 *   - GPTZero — Perplexity proxy via sentence predictability
 *   - GLTR (Gehrmann et al., 2019) — Token distribution analysis
 */

// Common English words (top ~200 most frequent)
const COMMON_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'is', 'are', 'was', 'were', 'been', 'being', 'has', 'had', 'having', 'does',
  'did', 'doing', 'should', 'must', 'shall', 'may', 'might', 'very', 'more', 'much',
  'too', 'each', 'every', 'both', 'few', 'many', 'such', 'own', 'same', 'still',
  'already', 'here', 'through', 'where', 'before', 'between', 'under', 'again',
  'once', 'during', 'while', 'those', 'been', 'since', 'without', 'however',
  'never', 'always', 'often', 'sometimes', 'really', 'quite', 'rather', 'almost'
]);

const CONJUNCTIONS = new Set(['and', 'but', 'so', 'because', 'or', 'yet', 'nor', 'for']);

export class TextAnalyzer {

  /**
   * Full analysis of text
   * @param {string} text
   * @returns {Object} stats
   */
  analyze(text) {
    const sentences = this.splitSentences(text);
    const words = this.extractWords(text);
    const paragraphs = this.splitParagraphs(text);

    const sentenceLengths = sentences.map(s => this.extractWords(s).length);
    const wordFreq = this.wordFrequency(words);
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const hapaxWords = [...wordFreq.entries()].filter(([, count]) => count === 1);

    // Sentence starters
    const sentenceStarters = sentences.map(s => {
      const firstWord = s.trim().split(/\s+/)[0] || '';
      return firstWord.replace(/[^a-zA-Z]/g, '');
    }).filter(Boolean);

    // Conjunction starters
    const conjunctionStarters = sentenceStarters.filter(s =>
      CONJUNCTIONS.has(s.toLowerCase())
    );

    // Uncommon words (not in top 200)
    const uncommonWords = words.filter(w =>
      !COMMON_WORDS.has(w.toLowerCase()) && w.length > 3
    );

    // Questions and exclamations
    const questionCount = sentences.filter(s => s.trim().endsWith('?')).length;
    const exclamationCount = sentences.filter(s => s.trim().endsWith('!')).length;

    // Stats
    const avgSentenceLength = sentenceLengths.length > 0
      ? sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length
      : 0;

    const sentenceLengthStdev = this.stdev(sentenceLengths);
    const typeTokenRatio = words.length > 0 ? uniqueWords.size / words.length : 0;
    const hapaxRatio = words.length > 0 ? hapaxWords.length / words.length : 0;
    const uncommonWordRatio = words.length > 0 ? uncommonWords.length / words.length : 0;

    return {
      // Basic counts
      wordCount: words.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,

      // Sentence metrics
      sentenceLengths,
      avgSentenceLength,
      sentenceLengthStdev,
      sentenceStarters,

      // Paragraph metrics
      paragraphLengths: paragraphs.map(p => this.extractWords(p).length),

      // Word metrics
      typeTokenRatio,
      hapaxRatio,
      uncommonWordRatio,
      uniqueWordCount: uniqueWords.size,

      // Structural metrics
      conjunctionStarterRatio: sentences.length > 0
        ? conjunctionStarters.length / sentences.length
        : 0,
      questionCount,
      exclamationCount,

      // Raw data for advanced checks
      words,
      sentences,
      paragraphs,
    };
  }

  /**
   * Quick stats for display (lighter than full analysis)
   */
  static quickStats(text) {
    const analyzer = new TextAnalyzer();
    const words = analyzer.extractWords(text);
    const sentences = analyzer.splitSentences(text);
    const sentenceLengths = sentences.map(s => analyzer.extractWords(s).length);

    return {
      wordCount: words.length,
      sentenceCount: sentences.length,
      avgSentenceLength: sentenceLengths.length > 0
        ? (sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length).toFixed(1)
        : 0,
      sentenceLengthStdev: analyzer.stdev(sentenceLengths).toFixed(1)
    };
  }

  // ──────────────────────────────────────────────
  //  Utility Methods
  // ──────────────────────────────────────────────

  splitSentences(text) {
    // Split on sentence boundaries, handling abbreviations and decimals
    return text
      .replace(/([.!?])\s+/g, '$1\n')
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  splitParagraphs(text) {
    return text
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }

  extractWords(text) {
    return text
      .replace(/[^\w\s'-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 0);
  }

  wordFrequency(words) {
    const freq = new Map();
    for (const word of words) {
      const lower = word.toLowerCase();
      freq.set(lower, (freq.get(lower) || 0) + 1);
    }
    return freq;
  }

  stdev(arr) {
    if (arr.length < 2) return 0;
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance = arr.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / arr.length;
    return Math.sqrt(variance);
  }
}
