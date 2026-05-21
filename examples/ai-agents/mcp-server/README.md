# Reddit Comment Scraper MCP Server

This is a local MCP proof of concept for AI agents. It exposes one tool, `scrape_reddit_comments`, which runs the private Apify Actor `Newbs/reddit-comment-scraper`.

## Install

```bash
npm install
```

## Configure

Set your Apify token:

```bash
export APIFY_TOKEN=apify_api_xxx
```

Optional custom actor ID:

```bash
export APIFY_ACTOR_ID=Newbs~reddit-comment-scraper
```

## Run

```bash
npm start
```

or:

```bash
node server.js
```

## Agent Safety Instruction

Add this instruction to any agent using the server:

```text
Before calling scrape_reddit_comments, confirm the Reddit URL and maxComments value with the user because the tool starts a paid Apify Actor run.
```

## Store Link

```text
https://apify.com/Newbs/reddit-comment-scraper?utm_source=ai-agent&utm_medium=mcp&utm_campaign=reddit-research&fpr=nmao3
```

