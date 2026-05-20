# n8n Nodes: Reddit Comment Scraper

Run the private **Reddit Comment Scraper** Apify Actor from n8n and return one n8n item per Reddit comment.

This package is only a public n8n wrapper. It does not contain the Actor scraping implementation, browser automation logic, proxy handling, or any Apify secrets. Users bring their own Apify API token, and the paid Actor runs on Apify.

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

## Credentials

Create an **Apify API** credential in n8n and paste your Apify API token.

Get the token from:

```text
Apify Console > Settings > Integrations > API token
```

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
npm run check
```

`npm run check` builds the TypeScript node and verifies the package contents with `npm pack --dry-run`.

## Publish

Publish through GitHub Actions with npm provenance enabled. The included `.github/workflows/publish.yml` file is ready for the public wrapper repository.
