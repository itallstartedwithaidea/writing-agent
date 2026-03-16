/**
 * Sentence Tools — Sentence-level analysis utilities
 * 
 * Additional sentence processing tools used by the QA system.
 */

/**
 * Split text into sentences with better handling of abbreviations
 * @param {string} text
 * @returns {string[]}
 */
export function splitSentences(text) {
  // Handle common abbreviations that shouldn't split
  const protected_text = text
    .replace(/Mr\./g, 'Mr\u0000')
    .replace(/Mrs\./g, 'Mrs\u0000')
    .replace(/Dr\./g, 'Dr\u0000')
    .replace(/vs\./g, 'vs\u0000')
    .replace(/etc\./g, 'etc\u0000')
    .replace(/e\.g\./g, 'eg\u0000')
    .replace(/i\.e\./g, 'ie\u0000')
    .replace(/U\.S\./g, 'US\u0000');

  const sentences = protected_text
    .replace(/([.!?])\s+/g, '$1\n')
    .split('\n')
    .map(s => s.replace(/\u0000/g, '.').trim())
    .filter(s => s.length > 0);

  return sentences;
}

/**
 * Get the first word of each sentence
 * @param {string[]} sentences
 * @returns {string[]}
 */
export function getSentenceStarters(sentences) {
  return sentences.map(s => {
    const match = s.match(/^([A-Za-z]+)/);
    return match ? match[1] : '';
  }).filter(Boolean);
}

/**
 * Calculate sentence length distribution
 * @param {string[]} sentences
 * @returns {Object} { lengths, mean, stdev, min, max, range }
 */
export function sentenceLengthDistribution(sentences) {
  const lengths = sentences.map(s => s.split(/\s+/).filter(w => w.length > 0).length);
  
  if (lengths.length === 0) return { lengths: [], mean: 0, stdev: 0, min: 0, max: 0, range: 0 };

  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((s, l) => s + Math.pow(l - mean, 2), 0) / lengths.length;
  const stdev = Math.sqrt(variance);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);

  return { lengths, mean, stdev, min, max, range: max - min };
}
