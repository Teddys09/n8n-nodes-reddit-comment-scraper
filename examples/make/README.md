# Make.com Scenario Templates

Use these specs to build Make.com scenarios that run the Reddit Comment Scraper Actor through Make's Apify integration.

The JSON file in this folder is a template brief, not a Make export. Final Make template publishing still happens inside Make's UI. Build each scenario once in Make, test it with a small `maxComments` value, then publish or share it from Make.

## Files

| File | Purpose |
| --- | --- |
| `scenario-templates.json` | Step-by-step scenario specs for Make templates. |

## Common Setup

1. Create or open a Make scenario.
2. Add an Apify connection.
3. Use the Apify module that runs an Actor and returns dataset items.
4. Set Actor ID to `Newbs/reddit-comment-scraper`.
5. Paste the sample input from the template spec.
6. Test with `maxComments: 5`.
7. Add the destination module: Google Sheets, Slack, Airtable, Notion, or OpenAI.
8. Publish or share the scenario with the matching title and description.

## Customer-Facing Disclosure

```text
This scenario runs the Reddit Comment Scraper Actor on Apify. You need an Apify account/API connection, and runs use Apify credits or the Actor's Apify pricing.
```

## Actor Link

```text
https://apify.com/Newbs/reddit-comment-scraper?utm_source=make&utm_medium=template&utm_campaign=reddit-research&fpr=nmao3
```

