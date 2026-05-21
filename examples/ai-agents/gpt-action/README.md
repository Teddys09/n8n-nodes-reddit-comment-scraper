# Custom GPT Action Setup

Use `../openapi/reddit-comment-scraper.actions.openapi.json` to add the Reddit Comment Scraper Actor as a Custom GPT Action or another OpenAPI-based agent tool.

## Setup

1. Create or edit a GPT.
2. Add an Action.
3. Import `../openapi/reddit-comment-scraper.actions.openapi.json`.
4. Configure authentication as an API key or bearer token using the user's Apify API token.
5. Add this instruction to the GPT:

```text
Before calling scrapeRedditComments, tell the user that this starts a paid Apify Actor run and ask them to confirm the Reddit URL and maxComments value. For tests, suggest maxComments 5.
```

## Example User Prompt

```text
Research this Reddit thread and summarize the top pain points, repeated requests, objections, and product ideas. Use maxComments 20.
https://www.reddit.com/r/AskReddit/comments/ovihp9/what_city_would_you_never_ever_ever_live_in/
```

## Store Link

```text
https://apify.com/Newbs/reddit-comment-scraper?utm_source=ai-agent&utm_medium=openapi-action&utm_campaign=reddit-research&fpr=nmao3
```

