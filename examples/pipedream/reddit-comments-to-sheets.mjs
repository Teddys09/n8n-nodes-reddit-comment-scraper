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

export default defineComponent({
  name: "Scrape Reddit comments to Sheets-ready rows",
  description: "Runs the Reddit Comment Scraper Apify Actor and returns clean rows for Google Sheets or CSV exports.",
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
    maxComments: {
      type: "integer",
      label: "Maximum comments",
      default: 10,
      min: 1,
      max: 500,
    },
    includeReplies: {
      type: "boolean",
      label: "Include nested replies",
      default: true,
    },
    sortBy: {
      type: "string",
      label: "Sort comments by",
      default: "top",
      options: ["top", "best", "new", "controversial", "old", "qa"],
    },
  },
  async run() {
    const items = await runRedditActor({
      token: this.apifyToken,
      input: {
        postUrls: [this.redditPostUrl],
        maxComments: this.maxComments,
        includeReplies: this.includeReplies,
        sortBy: this.sortBy,
        maxConcurrency: 1,
        proxy: {
          useApifyProxy: true,
          apifyProxyGroups: ["RESIDENTIAL"],
          apifyProxyCountry: "US",
        },
      },
    });

    return items.map((item) => ({
      postUrl: item.postUrl,
      postTitle: item.postTitle,
      subreddit: item.subreddit,
      commentAuthor: item.commentAuthor,
      commentText: item.commentText,
      commentTimestamp: item.commentTimestamp,
      commentDepth: item.commentDepth,
      isTopLevel: item.isTopLevel,
      replyCount: item.replyCount,
      commentPath: item.commentPath,
      parentPath: item.parentPath,
      scrapedAt: item.scrapedAt,
    }));
  },
});

