import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Inquiry } from "@/lib/inquiry-types";

const contentPath = path.join(process.cwd(), "content", "inquiries.json");

export async function getInquiriesFromContent() {
  const raw = await readFile(contentPath, "utf8");
  const inquiries = JSON.parse(raw) as Inquiry[];

  return inquiries.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function writeInquiriesToContent(inquiries: Inquiry[]) {
  await writeFile(contentPath, `${JSON.stringify(inquiries, null, 2)}\n`, "utf8");
}

export function getPendingInquiryCount(inquiries: Inquiry[]) {
  return inquiries.filter(
    (inquiry) => !["answered", "archived"].includes(inquiry.status)
  ).length;
}
