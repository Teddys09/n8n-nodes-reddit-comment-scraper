import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const jsonFiles = [
  "examples/make/scenario-templates.json",
  "examples/zapier/zap-templates.json",
  "examples/ai-agents/openapi/reddit-comment-scraper.actions.openapi.json",
  "examples/ai-agents/mcp-server/package.json",
];

for (const file of jsonFiles) {
  const fullPath = join(root, file);
  JSON.parse(readFileSync(fullPath, "utf8"));
  console.log(`valid json: ${file}`);
}

const openapi = JSON.parse(
  readFileSync(join(root, "examples/ai-agents/openapi/reddit-comment-scraper.actions.openapi.json"), "utf8"),
);

if (!openapi.paths?.["/acts/Newbs~reddit-comment-scraper/run-sync-get-dataset-items"]) {
  throw new Error("OpenAPI schema is missing the Apify sync dataset endpoint.");
}

if (openapi.components?.securitySchemes?.ApifyBearerAuth?.scheme !== "bearer") {
  throw new Error("OpenAPI schema must use Apify bearer authentication.");
}

const jsFiles = [
  "examples/pipedream/reddit-comments-to-sheets.mjs",
  "examples/pipedream/reddit-brand-monitor-slack.mjs",
  "examples/ai-agents/mcp-server/server.js",
];

for (const file of jsFiles) {
  execFileSync(process.execPath, ["--check", join(root, file)], { stdio: "inherit" });
  console.log(`valid js syntax: ${file}`);
}

console.log("distribution assets validated");

