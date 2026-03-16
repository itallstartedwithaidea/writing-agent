/**
 * QA Agent (Stage 3) — "Baymax-class"
 * 
 * Wraps the QA Runner for use in the agent pipeline.
 * Runs 40-point QA system and determines pass/fail.
 */

import { QARunner } from '../checks/index.js';

export class QAAgent {
  constructor(config) {
    this.config = config;
    this.runner = new QARunner(config);
  }

  /**
   * Execute QA checks on content
   * @param {Object|string} content - Content object { text } or raw string
   * @param {Object} profile - Content profile from Stage 1
   * @returns {Object} QA result
   */
  async execute(content, profile) {
    const text = typeof content === 'string' ? content : content.text;
    return this.runner.runAll(text);
  }
}
