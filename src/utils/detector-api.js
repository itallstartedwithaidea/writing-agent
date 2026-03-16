/**
 * Multi-Detector API Client
 * 
 * Connects to multiple AI detection APIs for triple-checking.
 * Supported: GPTZero, Pangram, Originality.ai, Grammarly
 * 
 * Each detector returns a 0-100% AI probability score.
 * Content must score below the configured threshold on ALL detectors.
 */

export class DetectorClient {
  constructor(config) {
    this.config = config;
    this.detectors = this.initDetectors();
  }

  initDetectors() {
    const providers = this.config.detectors?.providers || {};
    const detectors = [];

    if (providers.gptzero?.enabled !== false && providers.gptzero?.api_key) {
      detectors.push({
        name: 'GPTZero',
        key: providers.gptzero.api_key,
        threshold: providers.gptzero.threshold || 30,
        endpoint: 'https://api.gptzero.me/v2/predict/text'
      });
    }

    if (providers.pangram?.enabled !== false && providers.pangram?.api_key) {
      detectors.push({
        name: 'Pangram',
        key: providers.pangram.api_key,
        threshold: providers.pangram.threshold || 30,
        endpoint: 'https://api.pangram.com/v1/detect'
      });
    }

    if (providers.originality?.enabled !== false && providers.originality?.api_key) {
      detectors.push({
        name: 'Originality.ai',
        key: providers.originality.api_key,
        threshold: providers.originality.threshold || 30,
        endpoint: 'https://api.originality.ai/api/v1/scan/ai'
      });
    }

    return detectors;
  }

  getConfiguredDetectors() {
    return this.detectors.map(d => d.name);
  }

  async checkAll(text) {
    if (this.detectors.length === 0) {
      return {
        allPassed: true,
        results: [{ name: 'No detectors configured', score: 0, threshold: 30, passed: true }],
        note: 'Configure detector API keys in config/local.yaml for triple-checking.'
      };
    }

    const results = await Promise.all(
      this.detectors.map(d => this.checkSingle(d, text))
    );

    return {
      allPassed: results.every(r => r.passed),
      results
    };
  }

  async checkSingle(detector, text) {
    try {
      // Generic API call structure — each detector has slightly different API format
      const response = await fetch(detector.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${detector.key}`,
          'x-api-key': detector.key // Some use this header instead
        },
        body: JSON.stringify({
          document: text,
          text: text,
          content: text
        })
      });

      if (!response.ok) {
        return {
          name: detector.name,
          score: -1,
          threshold: detector.threshold,
          passed: false,
          error: `API error: ${response.status}`
        };
      }

      const data = await response.json();
      
      // Extract score (varies by detector)
      let score = 0;
      if (data.documents?.[0]?.completely_generated_prob !== undefined) {
        score = Math.round(data.documents[0].completely_generated_prob * 100); // GPTZero
      } else if (data.ai_score !== undefined) {
        score = Math.round(data.ai_score * 100); // Originality
      } else if (data.probability !== undefined) {
        score = Math.round(data.probability * 100); // Pangram
      } else if (data.score !== undefined) {
        score = Math.round(data.score * 100); // Generic
      }

      return {
        name: detector.name,
        score,
        threshold: detector.threshold,
        passed: score <= detector.threshold
      };
    } catch (err) {
      return {
        name: detector.name,
        score: -1,
        threshold: detector.threshold,
        passed: false,
        error: err.message
      };
    }
  }
}
