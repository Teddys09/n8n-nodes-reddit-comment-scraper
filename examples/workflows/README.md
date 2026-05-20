# n8n Workflow Starters

These workflows are designed to be imported into n8n after installing:

```text
n8n-nodes-reddit-comment-scraper
```

## Files

| File | Purpose |
| --- | --- |
| `reddit-comments-clean-export.json` | Scrapes Reddit comments and normalizes clean rows for Sheets, CSV, Airtable, or databases. |
| `reddit-pain-point-keywords.json` | Scores comments with basic pain-point keywords before sending them to a CRM, Slack, Notion, or an AI node. |
| `reddit-thread-metrics.json` | Aggregates comment counts, reply ratios, max depth, and unique author counts per Reddit post. |

## Before Running

1. Install the community node package.
2. Add an Apify API credential in n8n.
3. Open the **Scrape Reddit Comments** node.
4. Select your Apify credential.
5. Replace the example Reddit URL.
6. Start with a low `Maximum Comments` value for the first paid test run.

The workflows intentionally stop at clean analysis-ready output. Add Google Sheets, Slack, Notion, Airtable, HubSpot, or OpenAI nodes after the final Code node depending on the customer use case.
