# n8n Workflow Starters

These workflows use the official Apify n8n node:

```text
@apify/n8n-nodes-apify
```

They do not require the rejected dedicated wrapper node. This is the primary n8n path for customers.

## Files

| File | Purpose |
| --- | --- |
| `reddit-comments-clean-export.json` | Scrapes Reddit comments and normalizes clean rows for Sheets, CSV, Airtable, or databases. |
| `reddit-pain-point-keywords.json` | Scores comments with basic pain-point keywords before sending them to a CRM, Slack, Notion, or an AI node. |
| `reddit-thread-metrics.json` | Aggregates comment counts, reply ratio, max depth, and unique author counts per Reddit post. |
| `reddit-ai-research-brief.json` | Builds a compact AI-ready brief from comments for an AI Agent or LLM node. |
| `reddit-brand-monitor-slack.json` | Filters comments for brand/competitor keywords and prepares Slack-ready alert text. |
| `reddit-competitor-research-sheets.json` | Prepares Google Sheets-ready rows for competitor and buying-intent research. |

## Before Running

1. Enable or install the official Apify node in n8n.
2. Add an Apify API or OAuth2 credential in n8n.
3. Import one workflow JSON file.
4. Open the **Run Reddit Comment Scraper** node.
5. Select your Apify credential.
6. Replace the example Reddit URL in the `customBody` JSON.
7. Start with a low `maxComments` value for the first paid test run.

The workflows intentionally stop at clean analysis-ready output. Add Google Sheets, Slack, Notion, Airtable, HubSpot, OpenAI, or AI Agent nodes after the final Code node depending on the customer use case.
