import { WORK_ITEMS, PROJECTS } from "../src/utils/constants";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PREVIEWS_DIR = join(import.meta.dirname, "../public/images/previews");
const MICROLINK_BASE = "https://api.microlink.io";

const items = [...WORK_ITEMS.filter((item) => !item.image), ...PROJECTS];

async function fetchScreenshot(url: string): Promise<Buffer | null> {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
  });

  const res = await fetch(`${MICROLINK_BASE}/?${params}`);

  if (!res.ok) {
    console.error(`failed to fetch screenshot for ${url}: ${res.status}`);
    return null;
  }

  return Buffer.from(await res.arrayBuffer());
}

if (!existsSync(PREVIEWS_DIR)) {
  mkdirSync(PREVIEWS_DIR, { recursive: true });
}

const results = await Promise.allSettled(
  items.map(async (item) => {
    const outPath = join(PREVIEWS_DIR, `${item.slug}.png`);

    if (existsSync(outPath)) {
      console.log(`skipping ${item.slug} (already exists)`);
      return;
    }

    console.log(`fetching screenshot for ${item.slug}...`);
    const buf = await fetchScreenshot(item.url);

    if (!buf) return;

    writeFileSync(outPath, buf);
    console.log(`saved ${item.slug}.png`);
  }),
);

const failed = results.filter((r) => r.status === "rejected");

if (failed.length > 0) {
  console.error(`${failed.length} screenshots failed`);
}
