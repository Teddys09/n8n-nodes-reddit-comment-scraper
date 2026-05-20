# Apify Store n8n Section

Paste this section into the Actor description to make the n8n path clear for customers.

## Use Reddit Comment Scraper with n8n

You can run this Actor from n8n with the official Apify node and send Reddit comments to Google Sheets, Slack, Notion, Airtable, HubSpot, or an AI workflow.

![Reddit Comment Scraper n8n workflow](https://raw.githubusercontent.com/Teddys09/n8n-nodes-reddit-comment-scraper/main/docs/assets/reddit-n8n-apify-workflow.svg)

### What you can automate

- Monitor Reddit discussions about a product, brand, or competitor.
- Collect comments from specific Reddit threads into Google Sheets.
- Score comments for pain points, complaints, buying intent, or feature requests.
- Build weekly Reddit research digests with an AI node.
- Feed Reddit comments into an AI Agent as structured research context.

### Setup in n8n

1. Add the official Apify node in n8n.
2. Connect your Apify account with an API token or OAuth2.
3. Choose resource `Actors`.
4. Choose operation `Run actor and get dataset`.
5. Set Actor ID to:

```text
Newbs/reddit-comment-scraper
```

6. Paste input JSON like this:

```json
{
  "postUrls": [
    "https://www.reddit.com/r/AskReddit/comments/ovihp9/what_city_would_you_never_ever_ever_live_in/"
  ],
  "maxComments": 100,
  "includeReplies": true,
  "sortBy": "top",
  "maxConcurrency": 2,
  "proxy": {
    "useApifyProxy": true,
    "apifyProxyGroups": ["RESIDENTIAL"],
    "apifyProxyCountry": "US"
  }
}
```

7. Add the next n8n node for your destination, such as Google Sheets, Slack, Notion, Airtable, or an AI Agent.

Start with a low `maxComments` value for your first paid test run.

### Starter workflow ideas

- Reddit comments to Google Sheets.
- Reddit pain-point finder to Slack.
- Reddit thread metrics to Airtable.
- Reddit comments to AI research brief.
- Competitor mention tracker from selected discussion threads.
- Brand and competitor mention alerts formatted for Slack.
- Competitor research rows prepared for Google Sheets.

Billing happens through this Apify Actor. n8n is only the automation layer.

Public workflow JSON examples:

```text
https://github.com/Teddys09/n8n-nodes-reddit-comment-scraper/tree/main/examples/official-apify-workflows
```

Suggested search phrases for customers:

- reddit to n8n
- reddit comments to Google Sheets
- reddit brand monitoring in n8n
- reddit pain point research
- reddit comments to AI agent
- social listening with n8n and Apify
