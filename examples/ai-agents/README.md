# AI Agent Assets

These assets let an AI assistant or agent run the Reddit Comment Scraper Actor through Apify.

## Files

| Path | Purpose |
| --- | --- |
| `openapi/reddit-comment-scraper.actions.openapi.json` | OpenAPI schema for GPT Actions or other OpenAPI-based agents. |
| `gpt-action/README.md` | Custom GPT setup guide. |
| `mcp-server` | Local MCP server proof of concept. |

## Important Cost Rule

Any agent using these assets should ask the user to confirm before running the Actor, because the action can start a paid Apify run.

Recommended first-run input:

```json
{
  "postUrls": [
    "https://www.reddit.com/r/AskReddit/comments/ovihp9/what_city_would_you_never_ever_ever_live_in/"
  ],
  "maxComments": 5,
  "includeReplies": true,
  "sortBy": "top",
  "maxConcurrency": 1
}
```

