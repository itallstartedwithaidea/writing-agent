/**
 * Ghost Protocol — QA Check Tests
 * 
 * Run: node --test tests/checks.test.js
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { TextAnalyzer } from '../src/utils/text-analysis.js';
import { findBlacklistedPhrases, PHRASE_BLACKLIST } from '../src/utils/phrase-blacklist.js';
import { normalize, audit } from '../src/utils/normalizer.js';

describe('TextAnalyzer', () => {

  it('should count sentences correctly', () => {
    const analyzer = new TextAnalyzer();
    const stats = analyzer.analyze('First sentence. Second sentence. Third sentence.');
    assert.strictEqual(stats.sentenceCount, 3);
  });

  it('should calculate sentence length variance', () => {
    const analyzer = new TextAnalyzer();
    const text = 'Short. This is a medium length sentence with some words. This is an extremely long sentence that contains many more words and demonstrates significant variance in the length of sentences within a single document.';
    const stats = analyzer.analyze(text);
    assert.ok(stats.sentenceLengthStdev > 5, `StdDev ${stats.sentenceLengthStdev} should be > 5`);
  });

  it('should detect conjunction starters', () => {
    const analyzer = new TextAnalyzer();
    const text = 'And this starts with a conjunction. But so does this one. Normal sentence here. So does this.';
    const stats = analyzer.analyze(text);
    assert.ok(stats.conjunctionStarterRatio >= 0.5, `Ratio ${stats.conjunctionStarterRatio} should be >= 0.5`);
  });

  it('should calculate type-token ratio', () => {
    const analyzer = new TextAnalyzer();
    // High diversity text
    const text = 'The quick brown fox jumps over the lazy sleeping canine near the ancient weathered fence.';
    const stats = analyzer.analyze(text);
    assert.ok(stats.typeTokenRatio > 0.4, `TTR ${stats.typeTokenRatio} should be > 0.4`);
  });

  it('should count questions and exclamations', () => {
    const analyzer = new TextAnalyzer();
    const text = 'Is this a question? Yes it is! And another question? Wow!';
    const stats = analyzer.analyze(text);
    assert.strictEqual(stats.questionCount, 2);
    assert.strictEqual(stats.exclamationCount, 2);
  });

  it('should handle empty text', () => {
    const analyzer = new TextAnalyzer();
    const stats = analyzer.analyze('');
    assert.strictEqual(stats.wordCount, 0);
    assert.strictEqual(stats.sentenceCount, 0);
  });

  it('should calculate paragraph lengths', () => {
    const analyzer = new TextAnalyzer();
    const text = 'First paragraph with some words.\n\nSecond paragraph is longer and has more words in it than the first one.\n\nShort third.';
    const stats = analyzer.analyze(text);
    assert.strictEqual(stats.paragraphCount, 3);
  });
});

describe('Phrase Blacklist', () => {

  it('should have at least 100 phrases', () => {
    assert.ok(PHRASE_BLACKLIST.length >= 100, `Blacklist has ${PHRASE_BLACKLIST.length} phrases, expected >= 100`);
  });

  it('should detect blacklisted phrases', () => {
    const found = findBlacklistedPhrases("In today's digital landscape, we need to delve into this topic.");
    assert.ok(found.length >= 2, `Found ${found.length} phrases, expected >= 2`);
  });

  it('should pass clean text', () => {
    const found = findBlacklistedPhrases("I've been running Google Ads for 15 years and this pattern shows up constantly.");
    assert.strictEqual(found.length, 0, `Found unexpected phrases: ${found.join(', ')}`);
  });

  it('should be case-insensitive', () => {
    const found = findBlacklistedPhrases("IN TODAY'S LANDSCAPE things are changing.");
    assert.ok(found.length > 0, 'Should detect uppercase blacklisted phrases');
  });
});

describe('Normalizer', () => {

  it('should strip zero-width spaces', () => {
    const dirty = 'Hello\u200Bworld';
    assert.strictEqual(normalize(dirty), 'Hello world'.replace(/ /g, '').length < dirty.length ? 'Helloworld' : normalize(dirty));
    // Actually:
    const result = normalize(dirty);
    assert.ok(!result.includes('\u200B'), 'Should not contain zero-width space');
  });

  it('should strip BOM', () => {
    const dirty = '\uFEFFHello';
    const result = normalize(dirty);
    assert.strictEqual(result, 'Hello');
  });

  it('should normalize multiple spaces', () => {
    const result = normalize('Hello    world');
    assert.strictEqual(result, 'Hello world');
  });

  it('should normalize multiple newlines', () => {
    const result = normalize('Hello\n\n\n\nworld');
    assert.strictEqual(result, 'Hello\n\nworld');
  });

  it('should audit for invisibles', () => {
    const result = audit('Clean text');
    assert.strictEqual(result.clean, true);
    
    const dirty = audit('Dirty\u200Btext');
    assert.strictEqual(dirty.clean, false);
    assert.ok(dirty.found.includes('Zero-width space'));
  });
});

describe('QuickStats', () => {

  it('should return basic stats', () => {
    const stats = TextAnalyzer.quickStats('First sentence here. Second one. A third sentence that is longer.');
    assert.strictEqual(stats.sentenceCount, 3);
    assert.ok(stats.wordCount > 0);
    assert.ok(parseFloat(stats.avgSentenceLength) > 0);
  });
});
