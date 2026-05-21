#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const ACTOR_ID = process.env.APIFY_ACTOR_ID || "Newbs~reddit-comment-scraper";
const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ENDPOINT = `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items`;

async function runRedditActor(input) {
  if (!APIFY_TOKEN) {
    throw new Error("APIFY_TOKEN is required.");
  }

  const url = new URL(ACTOR_ENDPOINT);
  url.searchParams.set("clean", "true");
  url.searchParams.set("format", "json");
  url.searchParams.set("timeout", "300");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${APIFY_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Apify Actor run failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

const server = new McpServer({
  name: "reddit-comment-scraper",
  version: "0.1.0",
});

server.tool(
  "scrape_reddit_comments",
  "Run the Reddit Comment Scraper Apify Actor and return Reddit comment rows. Confirm with the user first because this can start a paid Apify run.",
  {
    postUrls: z.array(z.string().url()).min(1).describe("Full Reddit post URLs to scrape."),
    maxComments: z.number().int().min(1).max(500).default(10).describe("Maximum comments per post."),
    includeReplies: z.boolean().default(true).describe("Include nested replies."),
    sortBy: z.enum(["top", "best", "new", "controversial", "old", "qa"]).default("top"),
  },
  async ({ postUrls, maxComments, includeReplies, sortBy }) => {
    const items = await runRedditActor({
      postUrls,
      maxComments,
      includeReplies,
      sortBy,
      maxConcurrency: 1,
      proxy: {
        useApifyProxy: true,
        apifyProxyGroups: ["RESIDENTIAL"],
        apifyProxyCountry: "US",
      },
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              totalComments: items.length,
              sample: items.slice(0, 20),
              note: "Only the first 20 comments are shown in the MCP response sample. Use the Apify dataset for full output when needed.",
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);

