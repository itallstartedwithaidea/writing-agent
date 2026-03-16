/**
 * Writing Agent — Main Orchestrator (Ghost Protocol Pipeline)
 * 
 * Coordinates the 5-stage pipeline:
 *   1. Profile Agent   → Content profiling & voice loading
 *   2. Writer Agent    → Human pattern injection engine
 *   3. QA Agent        → 40-point quality assurance
 *   4. Adapter Agent   → Platform-specific formatting
 *   5. Polish Agent    → Final human pass simulation
 * 
 * @see docs/wiki/02-architecture-deep-dive.md
 */

import { ProfileAgent } from './agents/profile-agent.js';
import { WriterAgent } from './agents/writer-agent.js';
import { QAAgent } from './agents/qa-agent.js';
import { AdapterAgent } from './agents/adapter-agent.js';
import { PolishAgent } from './agents/polish-agent.js';
import { DetectorClient } from './utils/detector-api.js';

export class GhostProtocol {
  constructor(config) {
    this.config = config;
    
    // Initialize 5-agent pipeline
    this.profileAgent  = new ProfileAgent(config);
    this.writerAgent   = new WriterAgent(config);
    this.qaAgent       = new QAAgent(config);
    this.adapterAgent  = new AdapterAgent(config);
    this.polishAgent   = new PolishAgent(config);
    
    // Detection client
    this.detectorClient = new DetectorClient(config);
  }

  /**
   * Run the full pipeline end-to-end
   * 
   * @param {Object} input - { type, topic, context, tone, voice, length, output }
   * @returns {Object} - { text, format, qaReport, detectionReport, stats }
   */
  async run(input) {
    const results = {
      text: null,
      format: input.output || 'markdown',
      qaReport: null,
      detectionReport: null,
      stats: null,
      revisionCount: 0
    };

    // Stage 1: Profile
    const profile = await this.profileAgent.execute(input);

    // Stage 2: Write
    let content = await this.writerAgent.execute(profile);

    // Stage 3: QA (with revision loops)
    if (this.config.qa?.enabled !== false) {
      let qaResult = await this.qaAgent.execute(content, profile);
      const maxLoops = this.config.qa?.max_revision_loops || 3;

      while (!qaResult.passed && results.revisionCount < maxLoops) {
        results.revisionCount++;
        content = await this.writerAgent.revise(content, qaResult.failures);
        qaResult = await this.qaAgent.execute(content, profile);
      }

      results.qaReport = qaResult;
    }

    // Stage 4: Platform Adaptation
    const adapted = await this.adapterAgent.execute(content, profile, results.format);

    // Stage 5: Polish
    const final = await this.polishAgent.execute(adapted, profile);
    results.text = final.text;

    // Optional: Detection Check
    if (this.config.detectors?.enabled) {
      results.detectionReport = await this.detectCheck(results.text);
    }

    return results;
  }

  /**
   * Run text against configured detectors
   * 
   * @param {string} text - Text to check
   * @returns {Object} - { allPassed, results: [{ name, score, threshold, passed }] }
   */
  async detectCheck(text) {
    return this.detectorClient.checkAll(text);
  }

  /**
   * Get system status and configuration summary
   */
  getStatus() {
    return {
      version: '1.0.0',
      agents: {
        profile:  'ready',
        writer:   'ready',
        qa:       'ready',
        adapter:  'ready',
        polish:   'ready'
      },
      detectors: this.detectorClient.getConfiguredDetectors(),
      config: {
        llmProvider: this.config.llm?.provider,
        llmModel: this.config.llm?.model,
        qaEnabled: this.config.qa?.enabled !== false,
        maxRevisionLoops: this.config.qa?.max_revision_loops || 3,
        defaultVoice: this.config.content?.default_voice || 'john-williams'
      }
    };
  }
}
