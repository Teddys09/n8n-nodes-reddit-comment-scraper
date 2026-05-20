# n8n Nodes: Reddit Comment Scraper

[![npm version](https://img.shields.io/npm/v/n8n-nodes-reddit-comment-scraper.svg)](https://www.npmjs.com/package/n8n-nodes-reddit-comment-scraper)
[![GitHub release](https://img.shields.io/github/v/release/Teddys09/n8n-nodes-reddit-comment-scraper)](https://github.com/Teddys09/n8n-nodes-reddit-comment-scraper/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Run the private **Reddit Comment Scraper** Apify Actor from n8n and return one n8n item per Reddit comment.

## Status

This package is an optional shortcut for self-hosted n8n users. It is not the recommended n8n Cloud path.

![Reddit Comment Scraper n8n workflow](https://raw.githubusercontent.com/Teddys09/n8n-nodes-reddit-comment-scraper/main/docs/assets/reddit-n8n-apify-workflow.svg)

n8n declined verified listing for this package because it wraps an Apify Actor and n8n already has an Apify node. For n8n Cloud and verified-node workflows, use the official Apify node package instead:

```text
@apify/n8n-nodes-apify
```

The recommended workflow is: official Apify node -> `Run actor and get dataset` -> Actor ID `Newbs/reddit-comment-scraper`.

This package is only a public n8n wrapper. It does not contain the Actor scraping implementation, browser automation logic, proxy handling, or any Apify secrets. Users bring their own Apify API token, and the paid Actor runs on Apify.

## Links

- n8n package: https://www.npmjs.com/package/n8n-nodes-reddit-comment-scraper
- GitHub repository: https://github.com/Teddys09/n8n-nodes-reddit-comment-scraper
- Apify Actor: https://apify.com/Newbs/reddit-comment-scraper
- Apify n8n docs: https://docs.apify.com/platform/integrations/n8n

## What It Does

- Starts `Newbs/reddit-comment-scraper` on Apify.
- Sends Reddit post URLs and collection settings to the Actor.
- Waits for the run to finish.
- Fetches the default dataset.
- Returns clean rows for Sheets, Slack, Notion, Airtable, AI agents, or custom n8n Code nodes.

Each result item includes the Actor output fields plus:

- `apifyActorId`
- `apifyRunId`
- `apifyDatasetId`

## Install

### n8n Community Node

Install from the n8n community node UI:

```text
n8n-nodes-reddit-comment-scraper
```

For self-hosted n8n:

```bash
npm install n8n-nodes-reddit-comment-scraper
```

Restart n8n after installing the package.

### n8n Cloud

Use the official Apify node instead of this package:

```text
@apify/n8n-nodes-apify
```

Then run Actor ID `Newbs/reddit-comment-scraper` with the **Run actor and get dataset** operation.

## Credentials

Create an **Apify API** credential in n8n and paste your Apify API token.

Get the token from:

```text
Apify Console > Settings > Integrations > API token
```

The token is stored in n8n credentials. It is never included in this package and is never sent anywhere except Apify API requests.

## Inputs

| Field | Description |
| --- | --- |
| `Actor ID` | Defaults to `Newbs/reddit-comment-scraper`. |
| `Reddit Post URLs` | One or more full Reddit post URLs, separated by new lines or commas. |
| `Maximum Comments` | Limit per Reddit post. |
| `Include Nested Replies` | Keeps full conversation context when enabled. |
| `Sort Comments By` | `top`, `best`, `new`, `controversial`, `old`, or `qa`. |
| `Use Apify Proxy` | Enables proxy settings passed to the Actor. |
| `Dataset Item Limit` | Maximum output rows fetched into n8n. |

## Operations

### Run and Get Comments

Starts the Actor, polls until the run finishes, fetches the dataset, and emits one n8n item per comment.

Use this for most automations.

### Start Run Only

Starts the Actor and returns the Apify run metadata immediately.

Use this for very large jobs or workflows that want to monitor the run later.

## Output

The node returns one n8n item per Reddit comment. Typical fields include:

| Field | Description |
| --- | --- |
| `postUrl` | Original Reddit post URL |
| `postTitle` | Reddit post title |
| `subreddit` | Subreddit name |
| `commentAuthor` | Reddit comment author |
| `commentText` | Full comment text |
| `commentTimestamp` | Comment timestamp |
| `commentDepth` | Nesting depth, where `0` is top-level |
| `commentPath` | Thread path, for example `0/1` |
| `parentPath` | Parent thread path |
| `isTopLevel` | Whether this comment is top-level |
| `replyCount` | Direct reply count |
| `apifyRunId` | Apify Actor run ID |
| `apifyDatasetId` | Apify dataset ID |

## Workflow Starters

Recommended workflows that use the official Apify node are included in [`examples/official-apify-workflows`](examples/official-apify-workflows):

| Workflow | Purpose |
| --- | --- |
| `reddit-comments-clean-export.json` | Normalize comments for Sheets, CSV, Airtable, or databases. |
| `reddit-pain-point-keywords.json` | Find comments with pain-point language for product research. |
| `reddit-thread-metrics.json` | Aggregate reply ratio, max depth, and author counts by Reddit post. |
| `reddit-ai-research-brief.json` | Build a compact AI-ready research brief from comments. |
| `reddit-brand-monitor-slack.json` | Filter brand/competitor mentions and prepare Slack-ready alert text. |
| `reddit-competitor-research-sheets.json` | Prepare Google Sheets-ready competitor research rows. |

These templates use `@apify/n8n-nodes-apify` and are the best option for n8n Cloud or verified-node workflows.

Promotion copy and posting drafts are included in [`docs/N8N_DISTRIBUTION_KIT.md`](docs/N8N_DISTRIBUTION_KIT.md).

Self-hosted shortcut examples for this package are included in [`examples/workflows`](examples/workflows):

| Workflow | Purpose |
| --- | --- |
| `reddit-comments-clean-export.json` | Normalize comments for Sheets, CSV, Airtable, or databases. |
| `reddit-pain-point-keywords.json` | Find comments with pain-point language for product research. |
| `reddit-thread-metrics.json` | Aggregate reply ratio, max depth, and author counts by Reddit post. |

To use the self-hosted shortcut examples:

1. Install this community node.
2. Import one workflow JSON file into n8n.
3. Add your Apify API credential to the **Scrape Reddit Comments** node.
4. Replace the example Reddit URL.
5. Start with a low `Maximum Comments` value for the first paid test run.

## Monetization

This node does not charge users directly. It routes usage to the Apify Actor, where pay-per-event billing is configured. When n8n users run the node with their Apify API token, the Actor run is billed through Apify and creator revenue is handled by Apify Store monetization.

## Example Use Cases

- Reddit comments to Google Sheets.
- Reddit sentiment monitoring to Slack.
- Product pain-point extraction from Reddit discussions.
- Market research pipelines into Notion or Airtable.
- AI agent workflows that use Reddit comments as source material.

## Development

```bash
npm install
npm run lint
npm run check
npx @n8n/scan-community-package n8n-nodes-reddit-comment-scraper
```

`npm run check` builds the TypeScript node and verifies the package contents with `npm pack --dry-run`.

## Publish

Publish through GitHub Actions with npm provenance enabled. The included `.github/workflows/publish.yml` file is ready for the public wrapper repository.

The package was published with npm provenance so n8n can verify that it was built from this GitHub repository.
