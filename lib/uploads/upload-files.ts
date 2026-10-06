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

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  return {
    token,
    owner: process.env.GITHUB_OWNER || "arturo-lr-dev",
    repo: process.env.GITHUB_REPO || "julio-cabos-landing",
    branch: process.env.GITHUB_BRANCH || "master",
  };
}

function getRepositoryUploadPath(
  { folder, ownerSlug }: UploadTarget,
  filename: string
) {
  return `public/uploads/${folder}/${ownerSlug}/${filename}`;
}

function getRepositoryUploadUrl(
  { folder, ownerSlug }: UploadTarget,
  filename: string,
  config: NonNullable<ReturnType<typeof getGitHubConfig>>
) {
  const repositoryPath = getRepositoryUploadPath({ folder, ownerSlug }, filename);
  return `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch}/${repositoryPath}`;
}

async function getGitHubFileSha(
  repositoryPath: string,
  config: NonNullable<ReturnType<typeof getGitHubConfig>>
) {
  const response = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${repositoryPath}?ref=${encodeURIComponent(config.branch)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${config.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    }
  );

  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(`GitHub no ha podido consultar el archivo (${response.status}).`);
  }

  const payload = (await response.json()) as { sha?: string };
  return payload.sha;
}

async function saveFileToGitHub(
  buffer: Buffer,
  target: UploadTarget,
  filename: string,
  config: NonNullable<ReturnType<typeof getGitHubConfig>>
) {
  const repositoryPath = getRepositoryUploadPath(target, filename);
  const sha = await getGitHubFileSha(repositoryPath, config);
  const response = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${repositoryPath}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        message: `admin: actualizar imagen ${target.folder}/${target.ownerSlug}/${filename}`,
        content: buffer.toString("base64"),
        branch: config.branch,
        ...(sha ? { sha } : {}),
      }),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub no ha podido guardar la imagen (${response.status}): ${detail}`);
  }

  return {
    filename,
    publicPath: getRepositoryUploadUrl(target, filename, config),
  };
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
  const buffer = Buffer.from(await file.arrayBuffer());
  const githubConfig = getGitHubConfig();

  if (githubConfig) {
    return saveFileToGitHub(buffer, { folder, ownerSlug }, filename, githubConfig);
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
  const githubConfig = getGitHubConfig();

  if (githubConfig) {
    const sourceUrl = fromPublicPath.startsWith("http")
      ? fromPublicPath
      : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.juliocabos.es"}${fromPublicPath}`;
    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`No se ha podido leer la imagen original (${sourceResponse.status}).`);
    }

    return saveFileToGitHub(
      Buffer.from(await sourceResponse.arrayBuffer()),
      { folder, ownerSlug },
      filename,
      githubConfig
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
