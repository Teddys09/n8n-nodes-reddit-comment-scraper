# Multi-Platform Distribution Plan

This repository distributes workflow assets for the private Apify Actor `Newbs/reddit-comment-scraper`.

The Actor scraping code stays on Apify. Public assets in this repository are templates, setup guides, OpenAPI schemas, and thin examples that call the Actor through Apify APIs or official platform integrations.

## Primary Offer

Scrape Reddit comments and nested replies into automation workflows for:

- product and market research
- brand and competitor monitoring
- pain-point extraction
- AI research briefs
- clean exports to Sheets, Airtable, Notion, Slack, or databases

Primary Actor link:

```text
https://apify.com/Newbs/reddit-comment-scraper?fpr=nmao3
```

## Recommended Channel Order

| Priority | Channel           | What to publish                                                     | Why it matters                                                               |
| -------- | ----------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1        | Make.com          | Scenario templates based on `examples/make/scenario-templates.json` | Strong no-code audience and official Apify integration.                      |
| 2        | Pipedream         | Copy-paste workflow components in `examples/pipedream`              | Technical users can run the Actor quickly and adapt the code.                |
| 3        | Zapier            | Zap specs and Webhooks fallback in `examples/zapier`                | Large automation audience; use Apify official app or direct Apify API calls. |
| 4        | AI agents         | OpenAPI action schema and MCP server in `examples/ai-agents`        | Lets users ask an agent to research Reddit threads with the Actor.           |
| 5        | Community/content | Reddit, Indie Hackers, Product Hunt, Dev.to, YouTube, LinkedIn      | Higher discovery than small connector marketplaces when content is useful.   |

## Monetization Flow

1. User finds a template or agent action.
2. User creates or uses their own Apify account and API token.
3. Template runs `Newbs/reddit-comment-scraper` on Apify.
4. Apify bills the run through the Actor pricing model.
5. Revenue attribution stays with the Actor and Apify Store setup.

Use tracked links in docs and posts:

```text
https://apify.com/Newbs/reddit-comment-scraper?utm_source=make&utm_medium=template&utm_campaign=reddit-research&fpr=nmao3
https://apify.com/Newbs/reddit-comment-scraper?utm_source=zapier&utm_medium=template&utm_campaign=reddit-research&fpr=nmao3
https://apify.com/Newbs/reddit-comment-scraper?utm_source=pipedream&utm_medium=template&utm_campaign=reddit-research&fpr=nmao3
https://apify.com/Newbs/reddit-comment-scraper?utm_source=ai-agent&utm_medium=openapi-mcp&utm_campaign=reddit-research&fpr=nmao3
```

## Publishing Rules

- Do not market these as official platform apps unless the platform approves them.
- Do not submit actor-specific wrapper apps where the platform already has an official Apify app. Publish templates that use the official Apify path instead.
- Keep the first-run example small: `maxComments` between `1` and `10`.
- Disclose that running the Actor uses Apify credits or the Actor pricing.
- Lead with useful workflows and sample output, not a sales pitch.

## Asset Map

| Folder                              | Purpose                                                           |
| ----------------------------------- | ----------------------------------------------------------------- |
| `examples/official-apify-workflows` | n8n workflows using the official Apify node.                      |
| `examples/make`                     | Make.com scenario template specs and publishing guide.            |
| `examples/zapier`                   | Zapier template specs and direct Apify API fallback steps.        |
| `examples/pipedream`                | Pipedream code components for Sheets-ready rows and Slack alerts. |
| `examples/ai-agents`                | GPT Action OpenAPI schema and local MCP server proof of concept.  |

## Submission Checklist

For each platform:

1. Build the template in the platform UI from the matching spec.
2. Use the Actor ID `Newbs/reddit-comment-scraper`.
3. Use a low-cost demo input.
4. Verify the workflow returns one row per Reddit comment.
5. Add expected output fields to the description.
6. Include the tracked Actor link for that platform.
7. Save screenshots or a short video for review.

Make-specific tested setup:

1. Use Apify > Run an Actor with Run synchronously set to Yes.
2. Add Apify > Get Dataset Items as the next module.
3. Use `{{1.defaultDatasetId}}` for Dataset ID, Clean transformation, JSON format, and a small test limit such as `5`.
4. Confirm the Get Dataset Items output emits one bundle per Reddit comment.

Pipedream-specific tested setup:

1. Create a project and workflow with an HTTP/Webhook trigger.
2. Test the trigger with a Reddit post URL, `maxComments: 5`, `includeReplies: true`, and `sortBy: "top"`.
3. Add the Node.js component from `examples/pipedream/reddit-comments-to-sheets.mjs`.
4. Store the Apify API token in Pipedream as the secret `Apify API token`.
5. Keep the workflow in draft until the token is configured and destination steps are added.

Zapier-specific tested setup:

1. Use `Schedule by Zapier` with trigger event `Every Day`.
2. Set Time of Day to `9:00 AM`; the trigger test returned a sample day record on May 21, 2026.
3. Add the official `Apify` app as step 2 and choose `Run Actor`.
4. Stop at `Connect Apify` until the user confirms persistent Apify access inside Zapier.
5. Confirm paid-feature or post-trial cost before publishing or turning on the Zap.

## Best Public Positioning

Use this positioning in communities and marketplaces:

```text
Ready-to-use Reddit comment research workflows. They run the Reddit Comment Scraper Actor on Apify and turn Reddit discussions into clean rows, Slack alerts, Sheets exports, competitor research, pain-point lists, or AI research briefs.
```
