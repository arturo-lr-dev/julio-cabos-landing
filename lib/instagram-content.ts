import { readFile } from "node:fs/promises";
import path from "node:path";
import type { InstagramPost } from "@/lib/data";

const instagramPostsPath = path.join(
  process.cwd(),
  "content",
  "instagram-posts.json"
);

export async function getInstagramPostsFromContent() {
  const raw = await readFile(instagramPostsPath, "utf8");
  return JSON.parse(raw) as InstagramPost[];
}
