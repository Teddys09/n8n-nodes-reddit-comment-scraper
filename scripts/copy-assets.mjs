import { copyFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const sourceRoot = ".";
const targetRoot = "dist";
const assetExtensions = new Set([".svg", ".png"]);

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const sourcePath = join(directory, entry);
    const stats = statSync(sourcePath);

    if (stats.isDirectory() && (entry === "dist" || entry === "node_modules")) {
      continue;
    }

    if (stats.isDirectory()) {
      walk(sourcePath);
      continue;
    }

    const shouldCopy = [...assetExtensions].some((extension) => sourcePath.endsWith(extension));
    if (!shouldCopy) continue;

    const targetPath = join(targetRoot, relative(sourceRoot, sourcePath));
    mkdirSync(dirname(targetPath), { recursive: true });
    copyFileSync(sourcePath, targetPath);
  }
}

walk(sourceRoot);
