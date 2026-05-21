const ACTOR_ENDPOINT =
  "https://api.apify.com/v2/acts/Newbs~reddit-comment-scraper/run-sync-get-dataset-items";

async function runRedditActor({ token, input, timeoutSeconds = 300 }) {
  const url = new URL(ACTOR_ENDPOINT);
  url.searchParams.set("clean", "true");
  url.searchParams.set("format", "json");
  url.searchParams.set("timeout", String(timeoutSeconds));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Apify Actor run failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

function parseKeywords(value) {
  return String(value || "")
    .split(",")
    .map((keyword) => keyword.trim().toLowerCase())
    .filter(Boolean);
}

function findMatches(commentText, keywords) {
  const text = String(commentText || "").toLowerCase();
  return keywords.filter((keyword) => text.includes(keyword));
}

export default defineComponent({
  name: "Monitor Reddit comments and alert Slack",
  description: "Runs the Reddit Comment Scraper Apify Actor, filters comments for keywords, and optionally posts Slack alerts.",
  props: {
    apifyToken: {
      type: "string",
      label: "Apify API token",
      secret: true,
    },
    redditPostUrl: {
      type: "string",
      label: "Reddit post URL",
      default:
        "https://www.reddit.com/r/AskReddit/comments/ovihp9/what_city_would_you_never_ever_ever_live_in/",
    },
    keywords: {
      type: "string",
      label: "Comma-separated keywords",
      default: "alternative, pricing, bug, frustrating, recommend",
    },
    maxComments: {
      type: "integer",
      label: "Maximum comments",
      default: 10,
      min: 1,
      max: 500,
    },
    slackWebhookUrl: {
      type: "string",
      label: "Slack incoming webhook URL",
      optional: true,
      secret: true,
    },
  },
  async run() {
    const keywordList = parseKeywords(this.keywords);
    const items = await runRedditActor({
      token: this.apifyToken,
      input: {
        postUrls: [this.redditPostUrl],
        maxComments: this.maxComments,
        includeReplies: true,
        sortBy: "top",
        maxConcurrency: 1,
        proxy: {
          useApifyProxy: true,
          apifyProxyGroups: ["RESIDENTIAL"],
          apifyProxyCountry: "US",
        },
      },
    });

    const matches = items
      .map((item) => ({
        ...item,
        matchedKeywords: findMatches(item.commentText, keywordList),
      }))
      .filter((item) => item.matchedKeywords.length > 0);

    if (this.slackWebhookUrl && matches.length > 0) {
      const text = matches
        .slice(0, 10)
        .map((item) => {
          return [
            `*${item.subreddit || "Reddit"}* - ${item.postTitle || "Untitled post"}`,
            `Matches: ${item.matchedKeywords.join(", ")}`,
            `${item.commentAuthor || "unknown"}: ${String(item.commentText || "").slice(0, 500)}`,
            item.postUrl,
          ].join("\n");
        })
        .join("\n\n---\n\n");

      const response = await fetch(this.slackWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Slack webhook failed: ${response.status} ${await response.text()}`);
      }
    }

    return {
      totalComments: items.length,
      matchedComments: matches.length,
      matches,
    };
  },
});

