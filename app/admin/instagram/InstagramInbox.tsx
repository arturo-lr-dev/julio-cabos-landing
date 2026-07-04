"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  MAX_IMAGES_PER_WORK,
  type InstagramPost,
  type WorkCategory,
  type WorkStatus,
  workCategoryLabels,
  workScaleOptions,
} from "@/lib/data";

const inputClass =
  "mt-2 w-full rounded-md border border-rule-strong bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent";

const labelClass = "text-sm font-medium text-foreground";

function getStatusLabel(post: InstagramPost) {
  if (post.status === "imported") return "Importada";
  if (post.status === "ignored") return "Ignorada";
  return "Candidata";
}

function getSuggestedTitle(post: InstagramPost) {
  return post.caption.split("\n")[0]?.trim() || "Obra desde Instagram";
}

export default function InstagramInbox({ posts }: { posts: InstagramPost[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    setFiles(Array.from(fileList).slice(0, MAX_IMAGES_PER_WORK));
  }

  async function createPost() {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const post = {
      permalink: String(formData.get("permalink") ?? "").trim(),
      caption: String(formData.get("caption") ?? "").trim(),
    };
    const requestData = new FormData();
    requestData.set("post", JSON.stringify(post));
    files.forEach((file, index) => {
      requestData.set(`image-${index}`, file);
    });

    const response = await fetch("/api/admin/instagram", {
      method: "POST",
      body: requestData,
    }).catch(() => null);

    if (!response) {
      setError("No se ha podido conectar con el guardado.");
      return;
    }

    const payload = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setError(payload.error ?? "No se ha podido guardar la publicacion.");
      return;
    }

    form.reset();
    setFiles([]);
    setError(null);
    setMessage("Publicacion guardada como candidata.");
    router.refresh();
  }

  async function updatePostStatus(
    id: string,
    action: "ignore" | "restore"
  ) {
    setSavingId(id);
    const response = await fetch("/api/admin/instagram", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, action }),
    }).catch(() => null);
    setSavingId(null);

    if (!response) {
      setError("No se ha podido conectar con Instagram.");
      return;
    }

    const payload = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setError(payload.error ?? "No se ha podido actualizar la publicacion.");
      return;
    }

    setError(null);
    setMessage(action === "ignore" ? "Publicacion ignorada." : "Publicacion restaurada.");
    router.refresh();
  }

  async function deletePost(id: string) {
    setSavingId(id);
    const response = await fetch(
      `/api/admin/instagram?id=${encodeURIComponent(id)}`,
      { method: "DELETE" }
    ).catch(() => null);
    setSavingId(null);

    if (!response) {
      setError("No se ha podido conectar con el borrado.");
      return;
    }

    const payload = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setError(payload.error ?? "No se ha podido eliminar la publicacion.");
      return;
    }

    setError(null);
    setMessage("Publicacion eliminada de la bandeja.");
    router.refresh();
  }

  async function importPost(post: InstagramPost, formData: FormData) {
    const payload = {
      id: post.id,
      action: "import",
      title: String(formData.get("title") ?? "").trim(),
      category: String(formData.get("category") ?? "") as WorkCategory,
      status: String(formData.get("status") ?? "in-progress") as WorkStatus,
      scale: String(formData.get("scale") ?? ""),
      brand: String(formData.get("brand") ?? "").trim(),
      year: String(formData.get("year") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      showOnHome: formData.get("showOnHome") === "on",
    };

    setSavingId(post.id);
    const response = await fetch("/api/admin/instagram", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch(() => null);
    setSavingId(null);

    if (!response) {
      setError("No se ha podido conectar con la importacion.");
      return;
    }

    const result = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setError(result.error ?? "No se ha podido importar la publicacion.");
      return;
    }

    setError(null);
    setMessage("Publicacion importada como obra.");
    router.refresh();
  }

  return (
    <div className="mx-auto mt-6 grid max-w-7xl gap-5 xl:grid-cols-[420px_1fr]">
      <section className="rounded-lg border border-rule-strong bg-surface/70 p-5">
        <h2 className="text-xl font-semibold">Anadir publicacion</h2>
        <p className="mt-1 text-sm text-foreground-muted">
          Prototipo manual: pega el enlace de Instagram y sube las imagenes que
          quieras conservar en la web.
        </p>

        {message ? (
          <div className="mt-5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="mt-5 rounded-lg border border-accent/35 bg-accent/10 p-4 text-sm text-accent">
            {error}
          </div>
        ) : null}

        <form ref={formRef} className="mt-5 grid gap-5">
          <label className={labelClass}>
            Enlace de Instagram
            <input
              className={inputClass}
              name="permalink"
              placeholder="https://www.instagram.com/p/..."
            />
          </label>

          <label className={labelClass}>
            Texto o descripcion
            <textarea
              className={`${inputClass} min-h-28 resize-y`}
              name="caption"
              placeholder="Texto del post o notas para la obra."
            />
          </label>

          <div className="rounded-md border border-rule bg-background/35 p-4">
            <p className="font-medium text-foreground">Imagenes copiadas</p>
            <p className="mt-1 text-sm text-foreground-muted">
              Maximo {MAX_IMAGES_PER_WORK}. La primera sera la principal si se
              importa como obra.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => addFiles(event.target.files)}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
            >
              Seleccionar imagenes
            </button>
            {files.length > 0 ? (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {files.map((file) => (
                  <div
                    key={`${file.name}-${file.size}`}
                    className="relative aspect-square overflow-hidden rounded bg-background"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={createPost}
            className="rounded-md bg-accent px-4 py-3 text-sm font-medium text-background transition hover:bg-accent-hover"
          >
            Guardar candidata
          </button>
        </form>
      </section>

      <section className="space-y-4">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-rule-strong bg-surface/70 p-8">
            <p className="eyebrow text-accent">Bandeja vacia</p>
            <h2 className="mt-3 text-2xl font-semibold">
              Aun no hay publicaciones candidatas
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Cuando guardes una publicacion, aparecera aqui para decidir si se
              convierte en obra.
            </p>
          </div>
        ) : null}

        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-lg border border-rule-strong bg-surface/70 p-5"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="eyebrow text-accent">{getStatusLabel(post)}</p>
                <h2 className="mt-2 text-xl font-semibold">
                  {getSuggestedTitle(post)}
                </h2>
                <Link
                  href={post.permalink}
                  target="_blank"
                  className="mt-2 inline-flex text-sm text-foreground-muted transition hover:text-accent"
                >
                  Ver en Instagram
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.status === "ignored" ? (
                  <button
                    type="button"
                    onClick={() => updatePostStatus(post.id, "restore")}
                    disabled={savingId === post.id}
                    className="rounded-md border border-rule-strong px-3 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
                  >
                    Restaurar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => updatePostStatus(post.id, "ignore")}
                    disabled={savingId === post.id}
                    className="rounded-md border border-rule-strong px-3 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
                  >
                    Ignorar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => deletePost(post.id)}
                  disabled={savingId === post.id}
                  className="rounded-md border border-red-400/30 px-3 py-2 text-sm text-red-100 transition hover:bg-red-400/10"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {post.images.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/5] overflow-hidden rounded-md bg-background"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 160px, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="mt-5 whitespace-pre-line text-sm text-foreground-muted">
              {post.caption || "Sin texto guardado."}
            </p>

            {post.status === "imported" && post.importedWorkSlug ? (
              <Link
                href={`/admin/obras?obra=${post.importedWorkSlug}`}
                className="mt-5 inline-flex rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
              >
                Ver obra importada
              </Link>
            ) : null}

            {post.status !== "imported" ? (
              <form
                action={(formData) => importPost(post, formData)}
                className="mt-6 grid gap-4 border-t border-rule pt-5 lg:grid-cols-2"
              >
                <label className={labelClass}>
                  Titulo de la obra
                  <input
                    className={inputClass}
                    name="title"
                    defaultValue={getSuggestedTitle(post)}
                  />
                </label>

                <label className={labelClass}>
                  Categoria
                  <select className={inputClass} name="category" defaultValue="">
                    <option value="">Seleccionar categoria</option>
                    {Object.entries(workCategoryLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={labelClass}>
                  Estado
                  <select
                    className={inputClass}
                    name="status"
                    defaultValue="in-progress"
                  >
                    <option value="in-progress">En preparacion</option>
                    <option value="draft">Borrador</option>
                    <option value="published">Publicar</option>
                    <option value="hidden">Oculto</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Escala
                  <select className={inputClass} name="scale" defaultValue="">
                    <option value="">Seleccionar escala</option>
                    {workScaleOptions.map((scale) => (
                      <option key={scale} value={scale}>
                        {scale}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={labelClass}>
                  Marca
                  <input
                    className={inputClass}
                    name="brand"
                    placeholder="Pegaso Models, Andrea Miniatures..."
                  />
                </label>

                <label className={labelClass}>
                  Ano
                  <input className={inputClass} name="year" placeholder="2026" />
                </label>

                <label className={`${labelClass} lg:col-span-2`}>
                  Descripcion
                  <textarea
                    className={`${inputClass} min-h-28 resize-y`}
                    name="description"
                    defaultValue={post.caption}
                  />
                </label>

                <label className="flex items-center gap-3 text-sm lg:col-span-2">
                  <input type="checkbox" name="showOnHome" defaultChecked />
                  Mostrar en obras seleccionadas
                </label>

                <button
                  type="submit"
                  disabled={savingId === post.id}
                  className="rounded-md bg-accent px-4 py-3 text-sm font-medium text-background transition hover:bg-accent-hover disabled:opacity-50 lg:col-span-2"
                >
                  Convertir en obra
                </button>
              </form>
            ) : null}
          </article>
        ))}
      </section>
    </div>
  );
}
