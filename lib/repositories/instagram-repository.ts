import path from "node:path";
import type { InstagramPost } from "@/lib/work-types";
import { readJsonFile, writeJsonFile } from "./json-file";

const instagramPostsPath = path.join(
  process.cwd(),
  "content",
  "instagram-posts.json"
);

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  return readJsonFile<InstagramPost[]>(instagramPostsPath);
}

export async function saveInstagramPosts(posts: InstagramPost[]) {
  await writeJsonFile(instagramPostsPath, posts);
}
