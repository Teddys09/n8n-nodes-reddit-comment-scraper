# Pipedream Workflow Components

These files are copy-paste Pipedream components. They call the Apify API directly and return rows that can be sent to Sheets, Slack, Airtable, Notion, or databases.

## Files

| File                             | Purpose                                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------------------- |
| `reddit-comments-to-sheets.mjs`  | Scrape one Reddit thread from a webhook body or fallback input and return Google Sheets-ready rows. |
| `reddit-brand-monitor-slack.mjs` | Filter comments for keywords and optionally send alerts to a Slack incoming webhook.                |

## Tested Setup

1. Create a Pipedream project and workflow.
2. Add an HTTP/Webhook trigger.
3. Generate a test event with this body:

```json
{
  "postUrl": "https://www.reddit.com/r/AskReddit/comments/ovihp9/what_city_would_you_never_ever_ever_live_in/",
  "maxComments": 5,
  "includeReplies": true,
  "sortBy": "top"
}
```

4. Add a Node.js code step.
5. Paste `reddit-comments-to-sheets.mjs` into the step.
6. Set the `Apify API token` prop as a secret.
7. Test with `maxComments` between `1` and `10`.
8. Add destination steps after the code step, such as Google Sheets, Slack, Airtable, Notion, or a database.

The code also supports `postUrls` as an array in the webhook body. If no URL is sent in the trigger body, it uses the fallback Reddit post URL field.

## Cost Note

This workflow runs the paid Apify Actor through the Apify API. Keep the first test small, then raise `maxComments` after the workflow succeeds.

## Actor Link

```text
https://apify.com/Newbs/reddit-comment-scraper?utm_source=pipedream&utm_medium=template&utm_campaign=reddit-research&fpr=nmao3
```
