import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { slugify } from "@/lib/services/slug";

export type UploadFolder = "works" | "courses" | "instagram";

interface UploadTarget {
  folder: UploadFolder;
  ownerSlug: string;
}

interface SaveUploadedFileInput extends UploadTarget {
  file: File;
  fallbackExtension?: string;
  fallbackPrefix: string;
}

interface CopyPublicUploadInput extends UploadTarget {
  fromPublicPath: string;
  filename: string;
}

export function getUploadExtension(value: string, fallbackExtension: string) {
  return path.extname(value).toLowerCase() || fallbackExtension;
}

export function sanitizeUploadFilename(
  value: string,
  fallbackPrefix: string,
  fallbackExtension: string
) {
  const extension = getUploadExtension(value, fallbackExtension);
  const basename = path.basename(value, extension);
  return `${slugify(basename, fallbackPrefix)}${extension}`;
}

function getUploadDirectory({ folder, ownerSlug }: UploadTarget) {
  return path.join(process.cwd(), "public", "uploads", folder, ownerSlug);
}

function getPublicUploadPath({ folder, ownerSlug }: UploadTarget, filename: string) {
  return `/uploads/${folder}/${ownerSlug}/${filename}`;
}

function getPublicFilePath(publicPath: string) {
  return path.join(process.cwd(), "public", publicPath.replace(/^\/+/, ""));
}

export async function saveUploadedFile({
  file,
  folder,
  ownerSlug,
  fallbackExtension = ".webp",
  fallbackPrefix,
}: SaveUploadedFileInput) {
  const filename = sanitizeUploadFilename(
    file.name,
    fallbackPrefix,
    fallbackExtension
  );
  const uploadDirectory = getUploadDirectory({ folder, ownerSlug });
  const destination = path.join(uploadDirectory, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(destination, buffer);

  return {
    filename,
    publicPath: getPublicUploadPath({ folder, ownerSlug }, filename),
  };
}

export async function copyPublicUpload({
  fromPublicPath,
  folder,
  ownerSlug,
  filename,
}: CopyPublicUploadInput) {
  const uploadDirectory = getUploadDirectory({ folder, ownerSlug });
  const destination = path.join(uploadDirectory, filename);

  await mkdir(uploadDirectory, { recursive: true });
  await copyFile(getPublicFilePath(fromPublicPath), destination);

  return {
    filename,
    publicPath: getPublicUploadPath({ folder, ownerSlug }, filename),
  };
}
