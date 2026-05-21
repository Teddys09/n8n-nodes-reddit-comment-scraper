# Zapier Template Specs

Use these specs to build Zapier templates around the official Apify app or, when the app actions are not enough, Zapier's Webhooks by Zapier action.

Do not submit a new actor-specific Zapier app unless there is a clear reason. The safer distribution path is to publish Zaps that use Apify.

## Files

| File                             | Purpose                                  |
| -------------------------------- | ---------------------------------------- |
| `zap-templates.json`             | Template specs for Zapier workflows.     |
| `webhooks-by-zapier-fallback.md` | Direct Apify API steps for Zapier users. |

## Common Setup

1. Create a Zap.
2. Pick the trigger: Schedule, Webhook, New Spreadsheet Row, or Form Submission.
3. Add Apify as the action app if available in the user's Zapier workspace.
4. Pick the Apify action event `Run Actor`.
5. Connect the user's Apify account when Zapier asks for it.
6. Run Actor ID `Newbs/reddit-comment-scraper`.
7. Use a low test value such as `maxComments: 5`.
8. Send output rows to Google Sheets, Slack, Airtable, Notion, HubSpot, or Email.

## Verified Draft Setup

A Zapier draft was tested with:

1. `Schedule by Zapier` trigger.
2. Trigger event `Every Day`.
3. Time of day `9:00 AM`.
4. Trigger test passed with a sample record pulled on May 21, 2026.
5. Apify action app selected.
6. Action event `Run Actor` selected.

The draft stops at `Connect Apify`, because that creates persistent Apify access inside Zapier. Zapier also showed the workspace on a Professional trial, so publish or paid-feature usage should be confirmed before turning the Zap on.

## Actor Link

```text
https://apify.com/Newbs/reddit-comment-scraper?utm_source=zapier&utm_medium=template&utm_campaign=reddit-research&fpr=nmao3
```
