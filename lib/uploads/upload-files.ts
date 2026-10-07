import { randomUUID } from "node:crypto";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getAdminStorageBucket } from "@/lib/firebase-admin";
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

function isFirebaseStorageConfigured() {
  return Boolean(
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      (process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_CLIENT_EMAIL &&
        process.env.FIREBASE_PRIVATE_KEY)
  );
}

async function saveFileToFirebase(
  buffer: Buffer,
  target: UploadTarget,
  filename: string,
  contentType?: string
) {
  const storagePath = `uploads/${target.folder}/${target.ownerSlug}/${filename}`;
  const downloadToken = randomUUID();
  const bucket = getAdminStorageBucket();
  const file = bucket.file(storagePath);

  await file.save(buffer, {
    resumable: false,
    metadata: {
      contentType: contentType || "application/octet-stream",
      cacheControl: "public,max-age=31536000,immutable",
      metadata: { firebaseStorageDownloadTokens: downloadToken },
    },
  });

  return {
    filename,
    publicPath: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(storagePath)}?alt=media&token=${downloadToken}`,
  };
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
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isFirebaseStorageConfigured()) {
    return saveFileToFirebase(buffer, { folder, ownerSlug }, filename, file.type);
  }

  const uploadDirectory = getUploadDirectory({ folder, ownerSlug });
  const destination = path.join(uploadDirectory, filename);
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
  if (isFirebaseStorageConfigured()) {
    const sourceUrl = fromPublicPath.startsWith("http")
      ? fromPublicPath
      : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.juliocabos.es"}${fromPublicPath}`;
    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`No se ha podido leer la imagen original (${sourceResponse.status}).`);
    }

    return saveFileToFirebase(
      Buffer.from(await sourceResponse.arrayBuffer()),
      { folder, ownerSlug },
      filename,
      sourceResponse.headers.get("content-type") || undefined
    );
  }

  const uploadDirectory = getUploadDirectory({ folder, ownerSlug });
  const destination = path.join(uploadDirectory, filename);
  await mkdir(uploadDirectory, { recursive: true });
  await copyFile(getPublicFilePath(fromPublicPath), destination);

  return {
    filename,
    publicPath: getPublicUploadPath({ folder, ownerSlug }, filename),
  };
}
