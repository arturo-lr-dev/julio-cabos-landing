import path from "node:path";
import type { Inquiry } from "@/lib/inquiry-types";
import { readJsonFile, writeJsonFile } from "./json-file";

const inquiriesPath = path.join(process.cwd(), "content", "inquiries.json");

export async function getInquiries(): Promise<Inquiry[]> {
  const inquiries = await readJsonFile<Inquiry[]>(inquiriesPath);

  return inquiries.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function saveInquiries(inquiries: Inquiry[]) {
  await writeJsonFile(inquiriesPath, inquiries);
}

export function getPendingInquiryCount(inquiries: Inquiry[]) {
  return inquiries.filter(
    (inquiry) => !["answered", "archived"].includes(inquiry.status)
  ).length;
}
