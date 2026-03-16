#!/usr/bin/env node

/**
 * Writing Agent Calibration Script
 * 
 * Generates sample content for each content type, runs QA analysis,
 * and helps calibrate detection thresholds.
 * 
 * Usage:
 *   node scripts/calibrate.js --type linkedin --samples 20
 *   node scripts/calibrate.js --voice john-williams --samples 10
 */

console.log('👻 Writing Agent Calibration Tool');
console.log('');
console.log('This tool generates sample content and runs QA analysis to help');
console.log('calibrate detection thresholds for your specific use case.');
console.log('');
console.log('Usage:');
console.log('  node scripts/calibrate.js --type <content-type> --samples <n>');
console.log('  node scripts/calibrate.js --voice <profile-name> --samples <n>');
console.log('');
console.log('Requires LLM API key configured in config/local.yaml');
console.log('');
console.log('Coming in v1.1 — use `ghost benchmark` for now.');
