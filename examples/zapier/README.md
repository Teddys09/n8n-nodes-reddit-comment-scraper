# Zapier Template Specs

Use these specs to build Zapier templates around the official Apify app or, when the app actions are not enough, Zapier's Webhooks by Zapier action.

Do not submit a new actor-specific Zapier app unless there is a clear reason. The safer distribution path is to publish Zaps that use Apify.

## Files

| File | Purpose |
| --- | --- |
| `zap-templates.json` | Template specs for Zapier workflows. |
| `webhooks-by-zapier-fallback.md` | Direct Apify API steps for Zapier users. |

## Common Setup

1. Create a Zap.
2. Pick the trigger: Schedule, Webhook, New Spreadsheet Row, or Form Submission.
3. Add Apify as the action app if available in the user's Zapier workspace.
4. Run Actor ID `Newbs/reddit-comment-scraper`.
5. Use a low test value such as `maxComments: 5`.
6. Send output rows to Google Sheets, Slack, Airtable, Notion, HubSpot, or Email.

## Actor Link

```text
https://apify.com/Newbs/reddit-comment-scraper?utm_source=zapier&utm_medium=template&utm_campaign=reddit-research&fpr=nmao3
```

