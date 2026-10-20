import { rm } from "node:fs/promises";
import path from "node:path";

const cacheDirectories = [
  path.join(process.cwd(), ".next", "cache", "webpack", "client-production"),
  path.join(process.cwd(), ".netlify", ".next", "cache", "webpack", "client-production"),
];

await Promise.all(
  cacheDirectories.map((directory) => rm(directory, { recursive: true, force: true })),
);
