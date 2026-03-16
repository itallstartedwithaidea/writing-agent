# 07 — Integration Guide

## Connecting to the `itallstartedwithaidea` Ecosystem

Ghost Protocol is designed to plug into the existing agent infrastructure.

### advertising-hub Integration

Ghost Protocol registers as a content creation agent alongside the existing Disney-named agents (Simba, Nemo, Elsa, Baymax, etc.).

```javascript
// In advertising-hub agent registry
import { GhostProtocol } from 'writing-agent';

const ghost = new GhostProtocol(config);
agentRegistry.register('ghost', ghost);
```

### google-ads-mcp Integration

Pull real campaign data into content via MCP tools:

```javascript
// Ghost Protocol can request campaign context
const campaignData = await mcpClient.call('get_campaign_performance', {
  account_id: '123-456-7890',
  date_range: 'LAST_30_DAYS'
});

// Feed real metrics into content generation
ghost.write({
  type: 'linkedin',
  topic: 'Q1 performance insights',
  context: `Real metrics: ${JSON.stringify(campaignData)}`
});
```

### ContextOS Integration

Voice profiles and content history persist across sessions:

```javascript
// Load voice profile from ContextOS
const voice = await contextOS.get('voice-profiles', 'john-williams');

// Store content history to prevent repetition
await contextOS.set('content-history', contentId, {
  text: result.text,
  type: 'linkedin',
  timestamp: Date.now()
});
```

## Standalone Usage

Ghost Protocol works perfectly as a standalone CLI tool without any ecosystem integration. The integrations above are optional enhancements.
