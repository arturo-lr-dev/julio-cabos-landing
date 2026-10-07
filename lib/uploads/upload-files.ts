import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";
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

function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

async function saveFileToCloudinary(
  buffer: Buffer,
  target: UploadTarget,
  filename: string,
  contentType?: string
) {
  configureCloudinary();
  const extension = path.extname(filename);
  const publicId = path.basename(filename, extension);
  const folder = `julio-cabos/${target.folder}/${target.ownerSlug}`;

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "image",
        overwrite: true,
        context: contentType ? { contentType } : undefined,
      },
      (error, response) => {
        if (error || !response?.secure_url) {
          reject(error ?? new Error("Cloudinary no ha devuelto una URL."));
          return;
        }
        resolve({ secure_url: response.secure_url });
      }
    );
    upload.end(buffer);
  });

  return { filename, publicPath: result.secure_url };
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

  if (isCloudinaryConfigured()) {
    return saveFileToCloudinary(buffer, { folder, ownerSlug }, filename, file.type);
  }

  const uploadDirectory = getUploadDirectory({ folder, ownerSlug });
  const destination = path.join(uploadDirectory, filename);
  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(destination, buffer);

  return { filename, publicPath: getPublicUploadPath({ folder, ownerSlug }, filename) };
}

export async function copyPublicUpload({
  fromPublicPath,
  folder,
  ownerSlug,
  filename,
}: CopyPublicUploadInput) {
  if (isCloudinaryConfigured()) {
    const sourceUrl = fromPublicPath.startsWith("http")
      ? fromPublicPath
      : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.juliocabos.es"}${fromPublicPath}`;
    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`No se ha podido leer la imagen original (${sourceResponse.status}).`);
    }

    return saveFileToCloudinary(
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

  return { filename, publicPath: getPublicUploadPath({ folder, ownerSlug }, filename) };
}
