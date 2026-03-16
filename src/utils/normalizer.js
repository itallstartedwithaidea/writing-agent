/**
 * Text Normalizer — Metadata Hygiene
 * 
 * Strips invisible characters, normalizes whitespace, and ensures
 * clean UTF-8 output. This addresses QA Check #20 (Metadata Hygiene)
 * and QA Check #33 (Plain Text Normalization).
 * 
 * References:
 *   - SynthID metadata markers (Google DeepMind)
 *   - Invisible Unicode exploitation in AI tools
 */

/**
 * Full normalization pipeline
 * @param {string} text
 * @returns {string} Cleaned text
 */
export function normalize(text) {
  let result = text;

  // Strip zero-width characters
  result = result.replace(/[\u200B\u200C\u200D\u200E\u200F]/g, '');
  
  // Strip BOM
  result = result.replace(/\uFEFF/g, '');
  
  // Strip soft hyphens
  result = result.replace(/\u00AD/g, '');
  
  // Strip invisible formatters
  result = result.replace(/[\u2060\u2061\u2062\u2063\u2064]/g, '');
  
  // Strip other invisibles
  result = result.replace(/[\u180E\u2028\u2029\u202A-\u202E\u2066-\u2069]/g, '');
  
  // Normalize whitespace
  result = result.replace(/\t/g, '  ');           // Tabs to spaces
  result = result.replace(/ {2,}/g, ' ');          // Multiple spaces to single
  result = result.replace(/\r\n/g, '\n');          // CRLF to LF
  result = result.replace(/\r/g, '\n');            // CR to LF
  result = result.replace(/\n{3,}/g, '\n\n');      // Triple+ newlines to double
  
  // Normalize quotes (consistent style)
  result = result.replace(/[\u201C\u201D]/g, '"'); // Smart double quotes to standard
  result = result.replace(/[\u2018\u2019]/g, "'"); // Smart single quotes to standard
  
  // Normalize dashes
  result = result.replace(/\u2013/g, '–');         // En dash
  result = result.replace(/\u2014/g, '—');         // Em dash
  
  // Trim
  result = result.trim();

  return result;
}

/**
 * Check for invisible characters (without removing them)
 * @param {string} text
 * @returns {Object} { clean: boolean, found: string[] }
 */
export function audit(text) {
  const invisibles = {
    'Zero-width space': /\u200B/,
    'Zero-width non-joiner': /\u200C/,
    'Zero-width joiner': /\u200D/,
    'BOM': /\uFEFF/,
    'Soft hyphen': /\u00AD/,
    'Word joiner': /\u2060/,
    'Invisible times': /\u2062/,
    'LTR mark': /\u200E/,
    'RTL mark': /\u200F/,
  };

  const found = [];
  for (const [name, pattern] of Object.entries(invisibles)) {
    if (pattern.test(text)) {
      found.push(name);
    }
  }

  return { clean: found.length === 0, found };
}
