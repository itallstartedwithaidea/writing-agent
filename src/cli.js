#!/usr/bin/env node

/**
 * Writing Agent CLI
 * Undetectable AI Writing Agent
 * 
 * Usage:
 *   ghost write --type linkedin --topic "Why ROAS is a vanity metric"
 *   ghost check --file article.md
 *   ghost benchmark --file article.md --detectors gptzero,pangram
 *   ghost profile list
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import { GhostProtocol } from './ghost.js';
import { loadConfig } from './utils/config.js';
import { QARunner } from './checks/index.js';
import { TextAnalyzer } from './utils/text-analysis.js';

const VERSION = '1.0.0';

const program = new Command();

// ──────────────────────────────────────────────
// Banner
// ──────────────────────────────────────────────
function showBanner() {
  console.log(chalk.cyan(`
  ██╗    ██╗██████╗ ██╗████████╗██╗███╗   ██╗ ██████╗ 
  ██║    ██║██╔══██╗██║╚══██╔══╝██║████╗  ██║██╔════╝ 
  ██║ █╗ ██║██████╔╝██║   ██║   ██║██╔██╗ ██║██║  ███╗
  ██║███╗██║██╔══██╗██║   ██║   ██║██║╚██╗██║██║   ██║
  ╚███╔███╔╝██║  ██║██║   ██║   ██║██║ ╚████║╚██████╔╝
   ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
               █████╗  ██████╗ ███████╗███╗   ██╗████████╗
              ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝
              ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   
              ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   
              ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   
              ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   
  `));
  console.log(chalk.gray(`  Writing Agent v${VERSION} — Powered by Ghost Protocol`));
  console.log(chalk.gray(`  github.com/itallstartedwithaidea/writing-agent\n`));
}

// ──────────────────────────────────────────────
// WRITE Command
// ──────────────────────────────────────────────
program
  .command('write')
  .description('Generate content through the full 5-stage Ghost Protocol pipeline')
  .requiredOption('--type <type>', 'Content type: blog, linkedin, reddit, reddit-comment, substack, whitepaper, email, instagram, facebook, twitter, website, reply')
  .option('--topic <topic>', 'Topic or brief for the content')
  .option('--context <context>', 'Additional context (parent post for replies, URL, etc.)')
  .option('--tone <tone>', 'Override tone: casual, professional, technical, persuasive')
  .option('--length <words>', 'Target word count', parseInt)
  .option('--voice <profile>', 'Voice profile name', 'john-williams')
  .option('--output <format>', 'Output format: markdown, docx, gdocs, html, txt', 'markdown')
  .option('--output-file <path>', 'Save to file path')
  .option('--no-qa', 'Skip QA checks (not recommended)')
  .option('--no-detect', 'Skip multi-detector validation')
  .option('--verbose', 'Show all QA check results')
  .option('--dry-run', 'Show execution plan without generating')
  .action(async (opts) => {
    showBanner();
    const config = loadConfig();
    const ghost = new GhostProtocol(config);

    if (opts.dryRun) {
      console.log(chalk.yellow('\n📋 Dry Run — Execution Plan:\n'));
      console.log(chalk.white(`  Content Type:  ${opts.type}`));
      console.log(chalk.white(`  Topic:         ${opts.topic || '(interactive)'}`));
      console.log(chalk.white(`  Voice:         ${opts.voice}`));
      console.log(chalk.white(`  Output:        ${opts.output}`));
      console.log(chalk.white(`  QA Enabled:    ${opts.qa !== false}`));
      console.log(chalk.white(`  Detection:     ${opts.detect !== false}`));
      console.log(chalk.gray('\n  Pipeline: Profile → Write → QA → Adapt → Polish'));
      return;
    }

    if (!opts.topic) {
      console.log(chalk.red('Error: --topic is required. What should I write about?'));
      process.exit(1);
    }

    const spinner = ora('Stage 1: Loading content profile...').start();

    try {
      // Stage 1: Profile
      spinner.text = 'Stage 1: Loading content profile & voice...';
      const profile = await ghost.profileAgent.execute({
        type: opts.type,
        topic: opts.topic,
        context: opts.context,
        tone: opts.tone,
        voice: opts.voice,
        length: opts.length
      });
      spinner.succeed('Stage 1: Content profile loaded');

      // Stage 2: Write
      spinner.start('Stage 2: Generating with human pattern injection...');
      let content = await ghost.writerAgent.execute(profile);
      spinner.succeed('Stage 2: Content generated');

      // Stage 3: QA
      if (opts.qa !== false) {
        spinner.start('Stage 3: Running 40-point QA system...');
        let qaResult = await ghost.qaAgent.execute(content, profile);
        let loops = 0;
        const maxLoops = config.qa?.max_revision_loops || 3;

        while (!qaResult.passed && loops < maxLoops) {
          loops++;
          spinner.text = `Stage 3: QA revision loop ${loops}/${maxLoops}...`;
          content = await ghost.writerAgent.revise(content, qaResult.failures);
          qaResult = await ghost.qaAgent.execute(content, profile);
        }

        if (qaResult.passed) {
          spinner.succeed(`Stage 3: QA passed (${qaResult.score}/40 checks) ${loops > 0 ? `after ${loops} revision(s)` : ''}`);
        } else {
          spinner.warn(`Stage 3: QA partially passed (${qaResult.score}/40) — ${qaResult.failures.length} issues remain`);
        }

        if (opts.verbose) {
          console.log(chalk.gray('\n  QA Details:'));
          qaResult.checks.forEach(c => {
            const icon = c.status === 'pass' ? chalk.green('✓') : c.status === 'soft_fail' ? chalk.yellow('~') : chalk.red('✗');
            console.log(`    ${icon} #${c.number}: ${c.name} — ${c.status}`);
          });
          console.log('');
        }
      }

      // Stage 4: Platform Adaptation
      spinner.start('Stage 4: Adapting for platform...');
      const adapted = await ghost.adapterAgent.execute(content, profile, opts.output);
      spinner.succeed(`Stage 4: Adapted for ${opts.type} (${opts.output} format)`);

      // Stage 5: Polish
      spinner.start('Stage 5: Final human pass simulation...');
      const final = await ghost.polishAgent.execute(adapted, profile);
      spinner.succeed('Stage 5: Polish complete');

      // Detection Check
      if (opts.detect !== false && config.detectors?.enabled) {
        spinner.start('Running multi-detector validation...');
        const detection = await ghost.detectCheck(final.text);
        if (detection.allPassed) {
          spinner.succeed(`Detection: All clear — ${detection.results.map(r => `${r.name}: ${r.score}%`).join(', ')}`);
        } else {
          spinner.warn(`Detection: Some flags — ${detection.results.map(r => `${r.name}: ${r.score}%`).join(', ')}`);
        }
      }

      // Output
      console.log(chalk.cyan('\n═══════════════════════════════════════════════'));
      console.log(chalk.cyan.bold('  OUTPUT'));
      console.log(chalk.cyan('═══════════════════════════════════════════════\n'));

      if (opts.outputFile) {
        fs.writeFileSync(opts.outputFile, final.text);
        console.log(chalk.green(`Saved to ${opts.outputFile}`));
      } else {
        console.log(final.text);
      }

      // Stats
      const stats = TextAnalyzer.quickStats(final.text);
      console.log(chalk.gray(`\n  Words: ${stats.wordCount} | Sentences: ${stats.sentenceCount} | Avg sentence length: ${stats.avgSentenceLength} | Sentence length StdDev: ${stats.sentenceLengthStdev}`));

    } catch (err) {
      spinner.fail(`Error: ${err.message}`);
      if (opts.verbose) console.error(err);
      process.exit(1);
    }
  });

// ──────────────────────────────────────────────
// CHECK Command
// ──────────────────────────────────────────────
program
  .command('check')
  .description('Run 40-point QA system against existing text')
  .option('--file <path>', 'Path to text file')
  .option('--text <text>', 'Inline text to check')
  .option('--detectors <list>', 'Comma-separated detector list')
  .option('--report <format>', 'Report format: summary, detailed, json', 'summary')
  .option('--fix', 'Auto-fix issues and output revised version')
  .option('--output-file <path>', 'Save report to file')
  .action(async (opts) => {
    showBanner();

    let text;
    if (opts.file) {
      text = fs.readFileSync(opts.file, 'utf-8');
    } else if (opts.text) {
      text = opts.text;
    } else {
      console.log(chalk.red('Error: Provide --file or --text'));
      process.exit(1);
    }

    const config = loadConfig();
    const qa = new QARunner(config);
    const spinner = ora('Running 40-point QA analysis...').start();

    try {
      const result = await qa.runAll(text);
      spinner.succeed('QA analysis complete');

      console.log(chalk.cyan('\n═══════════════════════════════════════════════'));
      console.log(chalk.cyan.bold('  QA REPORT'));
      console.log(chalk.cyan('═══════════════════════════════════════════════\n'));

      console.log(`  Overall: ${result.passed ? chalk.green.bold('PASS') : chalk.red.bold('FAIL')} (${result.score}/40)`);
      console.log(`  Hard Fails: ${chalk.red(result.hardFails)}`);
      console.log(`  Soft Fails: ${chalk.yellow(result.softFails)}`);
      console.log('');

      result.checks.forEach(c => {
        const icon = c.status === 'pass' ? chalk.green('✓') :
                     c.status === 'soft_fail' ? chalk.yellow('~') :
                     chalk.red('✗');
        const detail = c.detail ? chalk.gray(` — ${c.detail}`) : '';
        console.log(`  ${icon} #${String(c.number).padStart(2, '0')}: ${c.name}${detail}`);
      });

      if (opts.report === 'json') {
        const json = JSON.stringify(result, null, 2);
        if (opts.outputFile) {
          fs.writeFileSync(opts.outputFile, json);
          console.log(chalk.green(`\nReport saved to ${opts.outputFile}`));
        } else {
          console.log('\n' + json);
        }
      }
    } catch (err) {
      spinner.fail(`Error: ${err.message}`);
      process.exit(1);
    }
  });

// ──────────────────────────────────────────────
// BENCHMARK Command
// ──────────────────────────────────────────────
program
  .command('benchmark')
  .description('Run content against multiple detectors and generate comparison report')
  .option('--file <path>', 'Content file to benchmark')
  .option('--dir <path>', 'Directory of files')
  .option('--detectors <list>', 'Detectors to use')
  .option('--output <format>', 'json, csv, markdown', 'markdown')
  .action(async (opts) => {
    showBanner();
    console.log(chalk.yellow('Benchmark mode — testing against detectors...\n'));
    // Implementation connects to detector APIs
    console.log(chalk.gray('Configure detector API keys in config/local.yaml'));
  });

// ──────────────────────────────────────────────
// PROFILE Command
// ──────────────────────────────────────────────
program
  .command('profile')
  .description('Manage voice profiles')
  .argument('[action]', 'list, show, create, import, export', 'list')
  .argument('[name]', 'Profile name')
  .option('--samples <dir>', 'Directory of writing samples for import')
  .option('--file <path>', 'File path for import/export')
  .action(async (action, name, opts) => {
    showBanner();
    const config = loadConfig();

    switch (action) {
      case 'list':
        console.log(chalk.cyan('Available Voice Profiles:\n'));
        const profiles = config.voiceProfiles || {};
        Object.entries(profiles).forEach(([key, p]) => {
          console.log(`  ${chalk.green('●')} ${chalk.bold(key)} — ${p.name || key}`);
          console.log(chalk.gray(`    ${p.background || 'No description'}\n`));
        });
        break;
      case 'show':
        if (!name) { console.log(chalk.red('Provide profile name')); return; }
        const prof = config.voiceProfiles?.[name];
        if (prof) {
          console.log(chalk.cyan(`Profile: ${name}\n`));
          console.log(JSON.stringify(prof, null, 2));
        } else {
          console.log(chalk.red(`Profile "${name}" not found`));
        }
        break;
      default:
        console.log(chalk.yellow(`Action "${action}" — coming soon`));
    }
  });

// ──────────────────────────────────────────────
// VERSION & HELP
// ──────────────────────────────────────────────
program
  .name('ghost')
  .version(VERSION)
  .description('Writing Agent — Powered by Ghost Protocol');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  showBanner();
  program.outputHelp();
}
