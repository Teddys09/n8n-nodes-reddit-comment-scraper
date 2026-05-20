# n8n Distribution Kit

Use this when promoting the Reddit Comment Scraper workflows to n8n users.

## Main Links

- Actor: https://apify.com/Newbs/reddit-comment-scraper
- Official Apify n8n docs: https://docs.apify.com/platform/integrations/n8n
- Workflow JSONs: https://github.com/Teddys09/n8n-nodes-reddit-comment-scraper/tree/main/examples/official-apify-workflows
- Optional self-hosted shortcut node: https://www.npmjs.com/package/n8n-nodes-reddit-comment-scraper

## One-Line Positioning

Scrape Reddit comments into n8n with the official Apify node, then send clean discussion data to Sheets, Slack, Airtable, Notion, or an AI research workflow.

## Short Description

I made a set of ready-to-import n8n workflows for Reddit research. They use the official Apify node to run `Newbs/reddit-comment-scraper`, return one row per Reddit comment, and then format the output for common automation use cases like clean exports, pain-point detection, Slack alerts, competitor research, thread metrics, and AI research briefs.

## Template Submission Notes

n8n docs say workflows can be submitted to the n8n template library through the n8n Creator hub. The n8n community forum is also a normal place to share workflow examples and get visibility before official template acceptance.

Before submitting:

1. Import each workflow into n8n.
2. Confirm the official Apify node is installed or enabled.
3. Select an Apify credential.
4. Run a low-limit test with `maxComments` between `1` and `10`.
5. Add a short description, setup steps, and expected output.

## Suggested n8n Template Titles

- Reddit comments to Google Sheets with Apify
- Reddit pain-point finder for product research
- Reddit brand monitor with Slack alerts
- Reddit competitor research table
- Reddit thread metrics dashboard starter
- Reddit AI research brief from comments

## n8n Community Forum Draft

Title:

```text
Free workflows: Reddit comments to Sheets, Slack alerts, pain-point research, and AI briefs with Apify
```

Body:

```text
I put together a small set of n8n workflows for Reddit research using the official Apify node.

They run the Reddit Comment Scraper Actor, return one row per Reddit comment, and then format the results for common automation use cases:

- clean export rows for Sheets/CSV/Airtable
- pain-point keyword scoring
- thread metrics
- AI-ready research brief
- Slack-ready brand/competitor alerts
- competitor research rows for Google Sheets

The workflows use the official Apify node, not a custom community node.

Workflow JSONs:
https://github.com/Teddys09/n8n-nodes-reddit-comment-scraper/tree/main/examples/official-apify-workflows

Actor:
https://apify.com/Newbs/reddit-comment-scraper

Setup:
1. Enable or install the official Apify node in n8n.
2. Add your Apify credential.
3. Import one workflow JSON.
4. Replace the example Reddit URL.
5. Start with a low maxComments value for the first test run.

Would be useful to hear which destination people want next: Slack, Sheets, Airtable, Notion, HubSpot, or an AI Agent flow.
```

## Reddit r/n8n Draft

Title:

```text
I made free n8n workflows for Reddit research using Apify
```

Body:

```text
I made a few ready-to-import n8n workflows for Reddit comment research.

They use the official Apify node to run a Reddit Comment Scraper Actor, then format the output for:

- Google Sheets/CSV export
- pain-point keyword scoring
- brand or competitor alerts for Slack
- competitor research tables
- thread metrics
- AI-ready research briefs

GitHub:
https://github.com/Teddys09/n8n-nodes-reddit-comment-scraper/tree/main/examples/official-apify-workflows

Actor:
https://apify.com/Newbs/reddit-comment-scraper

Import steps:
1. Enable/install the official Apify node.
2. Add an Apify credential.
3. Import the workflow JSON.
4. Replace the example Reddit URL.
5. Start with a small maxComments value for testing.

Feedback welcome, especially on which destination workflow would be most useful next.
```

## LinkedIn Draft

```text
I moved our Reddit-to-n8n integration to the official Apify node path and published ready-to-import workflow examples.

The workflows scrape Reddit comments and nested replies, then format them for:

- clean export rows
- pain-point research
- Slack-ready brand alerts
- competitor research for Sheets
- thread metrics
- AI research briefs

This avoids a custom n8n wrapper and works with the accepted Apify integration path.

Workflow JSONs:
https://github.com/Teddys09/n8n-nodes-reddit-comment-scraper/tree/main/examples/official-apify-workflows

Actor:
https://apify.com/Newbs/reddit-comment-scraper
```

## X/Twitter Draft

```text
Built ready-to-import n8n workflows for Reddit research using the official Apify node:

- comments to Sheets/CSV
- pain-point scoring
- Slack-ready brand alerts
- competitor research
- thread metrics
- AI research briefs

JSONs: https://github.com/Teddys09/n8n-nodes-reddit-comment-scraper/tree/main/examples/official-apify-workflows
```

## Product Hunt / Indie Hackers Draft

```text
I built a set of n8n workflows for Reddit market research.

They use Apify to scrape comments and nested replies from selected Reddit posts, then turn the data into clean outputs for Sheets, Slack, competitor research, pain-point scoring, thread metrics, and AI summaries.

The goal is to help founders and operators turn Reddit discussions into usable customer research without building scraping or n8n plumbing from scratch.

Workflow JSONs:
https://github.com/Teddys09/n8n-nodes-reddit-comment-scraper/tree/main/examples/official-apify-workflows

Actor:
https://apify.com/Newbs/reddit-comment-scraper
```

## First Follow-Up Comment

```text
Small note: these workflows use the official Apify node in n8n. The custom package in the repo is only an optional self-hosted shortcut. For n8n Cloud or verified-node setups, use the official Apify node workflow examples.
```

## Tracking

Use source-specific links when posting so traffic can be compared in Apify analytics:

```text
https://apify.com/Newbs/reddit-comment-scraper?utm_source=n8n-community&utm_medium=forum&utm_campaign=reddit-workflows
https://apify.com/Newbs/reddit-comment-scraper?utm_source=reddit&utm_medium=social&utm_campaign=reddit-workflows
https://apify.com/Newbs/reddit-comment-scraper?utm_source=linkedin&utm_medium=social&utm_campaign=reddit-workflows
```

## Posting Rule

Do not mass-post the same text everywhere. Adapt the intro to the community, disclose that it is your Actor, and lead with useful workflow JSONs rather than sales copy.
