/**
 * Configuration Loader
 * 
 * Loads configuration from:
 *   1. config/default.yaml (base)
 *   2. config/local.yaml (overrides, gitignored)
 *   3. Environment variables (highest priority)
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');

export function loadConfig() {
  let config = {};

  // Load default config
  const defaultPath = path.join(ROOT, 'config', 'default.yaml');
  if (fs.existsSync(defaultPath)) {
    config = yaml.load(fs.readFileSync(defaultPath, 'utf8')) || {};
  }

  // Load local overrides
  const localPath = path.join(ROOT, 'config', 'local.yaml');
  if (fs.existsSync(localPath)) {
    const local = yaml.load(fs.readFileSync(localPath, 'utf8')) || {};
    config = deepMerge(config, local);
  }

  // Environment variable overrides
  if (process.env.ANTHROPIC_API_KEY) {
    config.llm = config.llm || {};
    config.llm.api_key = process.env.ANTHROPIC_API_KEY;
  }
  if (process.env.OPENAI_API_KEY && config.llm?.provider === 'openai') {
    config.llm.api_key = process.env.OPENAI_API_KEY;
  }
  if (process.env.GPTZERO_API_KEY) {
    config.detectors = config.detectors || {};
    config.detectors.providers = config.detectors.providers || {};
    config.detectors.providers.gptzero = config.detectors.providers.gptzero || {};
    config.detectors.providers.gptzero.api_key = process.env.GPTZERO_API_KEY;
  }

  // Load voice profiles
  const voicePath = path.join(ROOT, 'config', 'voice-profiles.yaml');
  if (fs.existsSync(voicePath)) {
    config.voiceProfiles = yaml.load(fs.readFileSync(voicePath, 'utf8')) || {};
  }

  return config;
}

export function loadVoiceProfile(name) {
  const config = loadConfig();
  const profile = config.voiceProfiles?.[name];
  
  if (!profile) {
    // Return default profile
    return {
      name: name || 'Default',
      background: 'Professional writer',
      toneAnchors: ['clear and direct', 'professional', 'knowledgeable'],
      vocabulary: {
        domainTerms: [],
        signaturePhrases: [],
        avoid: []
      },
      structuralHabits: {
        startsWithConjunctions: true,
        usesFragments: true,
        parentheticalAsides: 'occasional',
        averageSentenceLength: 16,
        sentenceLengthStdev: 9
      }
    };
  }

  // Normalize YAML keys to camelCase
  return {
    name: profile.name || name,
    background: profile.background || '',
    toneAnchors: profile.tone_anchors || profile.toneAnchors || [],
    vocabulary: {
      domainTerms: profile.vocabulary?.domain_terms || profile.vocabulary?.domainTerms || [],
      signaturePhrases: profile.vocabulary?.signature_phrases || profile.vocabulary?.signaturePhrases || [],
      avoid: profile.vocabulary?.avoid || []
    },
    structuralHabits: profile.structural_habits || profile.structuralHabits || {}
  };
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
