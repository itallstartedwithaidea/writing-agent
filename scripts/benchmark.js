#!/usr/bin/env node

/**
 * Writing Agent Benchmark Script
 * 
 * Runs content against the QA system and (optionally) external detectors.
 * 
 * Usage:
 *   node scripts/benchmark.js --file article.md
 *   node scripts/benchmark.js --dir ./content/
 */

import fs from 'fs';
import path from 'path';
import { TextAnalyzer } from '../src/utils/text-analysis.js';
import { QARunner } from '../src/checks/index.js';
import { findBlacklistedPhrases } from '../src/utils/phrase-blacklist.js';
import { loadConfig } from '../src/utils/config.js';

const args = process.argv.slice(2);
const fileIdx = args.indexOf('--file');
const dirIdx = args.indexOf('--dir');

async function benchmarkFile(filepath) {
  const text = fs.readFileSync(filepath, 'utf8');
  const analyzer = new TextAnalyzer();
  const stats = analyzer.analyze(text);
  const config = loadConfig();
  const qa = new QARunner(config);
  const result = await qa.runAll(text);
  const blacklisted = findBlacklistedPhrases(text);

  console.log(`\n📄 ${path.basename(filepath)}`);
  console.log(`   Words: ${stats.wordCount} | Sentences: ${stats.sentenceCount}`);
  console.log(`   Avg sentence length: ${stats.avgSentenceLength.toFixed(1)} | StdDev: ${stats.sentenceLengthStdev.toFixed(1)}`);
  console.log(`   Type-Token Ratio: ${stats.typeTokenRatio.toFixed(3)} | Hapax: ${(stats.hapaxRatio * 100).toFixed(1)}%`);
  console.log(`   Uncommon words: ${(stats.uncommonWordRatio * 100).toFixed(1)}%`);
  console.log(`   Conjunction starters: ${(stats.conjunctionStarterRatio * 100).toFixed(0)}%`);
  console.log(`   Questions: ${stats.questionCount} | Exclamations: ${stats.exclamationCount}`);
  console.log(`   Blacklisted phrases: ${blacklisted.length}${blacklisted.length > 0 ? ' — ' + blacklisted.join(', ') : ''}`);
  console.log(`   QA Score: ${result.score}/40 (${result.passed ? '✅ PASS' : '❌ FAIL'})`);
  console.log(`   Hard fails: ${result.hardFails} | Soft fails: ${result.softFails}`);
  
  if (result.failures.length > 0) {
    console.log(`   Failures:`);
    result.failures.forEach(f => {
      console.log(`     ${f.status === 'hard_fail' ? '🔴' : '🟡'} #${f.number}: ${f.name}`);
    });
  }

  return result;
}

async function main() {
  console.log('👻 Writing Agent Benchmark\n');

  if (fileIdx >= 0 && args[fileIdx + 1]) {
    await benchmarkFile(args[fileIdx + 1]);
  } else if (dirIdx >= 0 && args[dirIdx + 1]) {
    const dir = args[dirIdx + 1];
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.txt'));
    for (const file of files) {
      await benchmarkFile(path.join(dir, file));
    }
  } else {
    console.log('Usage: node scripts/benchmark.js --file <path> | --dir <path>');
  }
}

main().catch(console.error);
