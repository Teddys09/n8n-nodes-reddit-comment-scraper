# Pipedream Workflow Components

These files are copy-paste Pipedream components. They call the Apify API directly and return rows that can be sent to Sheets, Slack, Airtable, Notion, or databases.

## Files

| File | Purpose |
| --- | --- |
| `reddit-comments-to-sheets.mjs` | Scrape one Reddit thread and return Google Sheets-ready rows. |
| `reddit-brand-monitor-slack.mjs` | Filter comments for keywords and optionally send alerts to a Slack incoming webhook. |

## Setup

1. Create a Pipedream workflow.
2. Add a Node.js code step.
3. Paste one of the `.mjs` files into the step.
4. Add your Apify token as a secret prop or environment variable.
5. Test with `maxComments` between `1` and `10`.
6. Add destination steps after the code step.

## Actor Link

```text
https://apify.com/Newbs/reddit-comment-scraper?utm_source=pipedream&utm_medium=template&utm_campaign=reddit-research&fpr=nmao3
```

