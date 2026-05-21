# Webhooks by Zapier Fallback

Use this when Zapier's Apify app does not expose the exact run-and-return-dataset flow you need.

## Step 1: Trigger

Use one of:

- Schedule by Zapier
- Webhooks by Zapier - Catch Hook
- Google Sheets - New Spreadsheet Row
- Typeform/Tally/Fillout - New Submission

## Step 2: Webhooks by Zapier - Custom Request

Method:

```text
POST
```

URL:

```text
https://api.apify.com/v2/acts/Newbs~reddit-comment-scraper/run-sync-get-dataset-items?clean=true&format=json&timeout=300
```

Headers:

```text
Authorization: Bearer YOUR_APIFY_TOKEN
Content-Type: application/json
```

Body:

```json
{
  "postUrls": [
    "https://www.reddit.com/r/AskReddit/comments/ovihp9/what_city_would_you_never_ever_ever_live_in/"
  ],
  "maxComments": 5,
  "includeReplies": true,
  "sortBy": "top",
  "maxConcurrency": 1,
  "proxy": {
    "useApifyProxy": true,
    "apifyProxyGroups": ["RESIDENTIAL"],
    "apifyProxyCountry": "US"
  }
}
```

## Step 3: Looping by Zapier

Loop over the returned array and map one comment at a time into your destination app.

## Step 4: Destination

Recommended destinations:

- Google Sheets - Create Spreadsheet Row
- Airtable - Create Record
- Slack - Send Channel Message
- Notion - Create Database Item
- HubSpot - Create Note or Task

## Cost Note

This calls a paid Apify Actor. Start with `maxComments: 5` during setup, then raise the limit after the Zap works.

