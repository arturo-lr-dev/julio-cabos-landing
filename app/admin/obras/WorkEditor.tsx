"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  type Work,
  type WorkCategory,
  type WorkImage,
  MAX_DRAFT_WORKS,
  MAX_IMAGES_PER_WORK,
  MAX_PUBLISHED_WORKS,
  workCategoryLabels,
  workSaleStatusLabels,
  workScaleOptions,
} from "@/lib/data";

const inputClass =
  "mt-2 w-full rounded-md border border-rule-strong bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent";

const labelClass = "text-sm font-medium text-foreground";

type WorkFormData = Omit<Work, "category"> & {
  category: WorkCategory | "";
};

interface EditableImage extends WorkImage {
  file?: File;
  isLocal?: boolean;
}

interface LocalDraft {
  key: string;
  title: string;
  slug: string;
  savedAt?: string;
}

export default function WorkEditor({
  selectedWork,
  isNewWork,
  publishedWorkCount,
  draftWorkCount,
}: {
  selectedWork: WorkFormData;
  isNewWork: boolean;
  publishedWorkCount: number;
  draftWorkCount: number;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<EditableImage[]>(
    selectedWork.images.slice(0, MAX_IMAGES_PER_WORK)
  );
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [limitMessage, setLimitMessage] = useState<string | null>(null);
  const [localDrafts, setLocalDrafts] = useState<LocalDraft[]>([]);

  function normalizeMainImage(nextImages: EditableImage[]) {
    const hasMainImage = nextImages.some((image) => image.kind === "principal");

    if (hasMainImage) {
      return nextImages.map((image, index) => ({
        ...image,
        kind:
          image.kind === "principal" && !nextImages
            .slice(0, index)
            .some((previous) => previous.kind === "principal")
            ? "principal" as const
            : "detalle" as const,
      }));
    }

    return nextImages.map((image, index) => ({
      ...image,
      kind: index === 0 ? "principal" as const : "detalle" as const,
    }));
  }

  function refreshLocalDrafts() {
    const drafts = Object.keys(localStorage)
      .filter((key) => key.startsWith("julio-admin-work:"))
      .flatMap((key) => {
        try {
          const saved = JSON.parse(localStorage.getItem(key) ?? "{}");
          if (saved.status !== "draft") return [];
          return [
            {
              key,
              title: saved.title || "Borrador sin titulo",
              slug: saved.slug || key.replace("julio-admin-work:", ""),
              savedAt: saved.savedAt,
            },
          ];
        } catch {
          return [];
        }
      });

    setLocalDrafts(drafts);
  }

  useEffect(() => {
    const timeout = window.setTimeout(refreshLocalDrafts, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const availableSlots = MAX_IMAGES_PER_WORK - images.length;

    if (availableSlots <= 0) {
      setLimitMessage(`Cada obra puede tener un maximo de ${MAX_IMAGES_PER_WORK} fotos.`);
      return;
    }

    const selectedFiles = Array.from(files).slice(0, availableSlots);
    const nextImages = selectedFiles.map((file, index) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
      aspectRatio: "4/5" as const,
      kind:
        images.length === 0 && index === 0
          ? "principal" as const
          : "detalle" as const,
      file,
      isLocal: true,
    }));

    setImages((current) => normalizeMainImage([...current, ...nextImages]));
    setLimitMessage(
      selectedFiles.length < files.length
        ? `Solo se han anadido ${selectedFiles.length}; el limite es ${MAX_IMAGES_PER_WORK} fotos por obra.`
        : null
    );
  }

  function removeImage(src: string) {
    setImages((current) =>
      normalizeMainImage(current.filter((image) => image.src !== src))
    );
  }

  function setPrimaryImage(src: string) {
    setImages((current) =>
      current.map((image) => ({
        ...image,
        kind: image.src === src ? "principal" as const : "detalle" as const,
      }))
    );
  }

  function removeLocalDraft(key: string) {
    localStorage.removeItem(key);
    refreshLocalDrafts();
    setLimitMessage(null);
    setSaveMessage("Borrador eliminado.");
  }

  function slugify(value: string) {
    return (
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || `obra-${Date.now()}`
    );
  }

  async function saveWorkDraft(status: "draft" | "published") {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const title = String(formData.get("title") ?? "").trim();
    const slug = String(formData.get("slug") ?? "").trim() || slugify(title);
    const category = String(formData.get("category") ?? "");

    if (status === "published" && isNewWork && publishedWorkCount >= MAX_PUBLISHED_WORKS) {
      setLimitMessage(`Ya hay ${MAX_PUBLISHED_WORKS} obras publicadas. Quita una antes de publicar otra.`);
      return;
    }

    if (status === "published" && !category) {
      setLimitMessage("Selecciona una categoria antes de publicar la obra.");
      return;
    }

    if (status === "draft" && isNewWork) {
      const otherLocalDrafts = localDrafts.filter(
        (draft) => draft.slug !== slug
      ).length;

      if (draftWorkCount + otherLocalDrafts >= MAX_DRAFT_WORKS) {
        setLimitMessage("Solo puede haber un borrador. Publica o elimina el borrador actual antes de crear otro.");
        return;
      }
    }

    const draft = {
      title,
      slug,
      category,
      status,
      saleStatus: String(formData.get("saleStatus") ?? "none"),
      salePrice: String(formData.get("salePrice") ?? "").trim(),
      saleNote: String(formData.get("saleNote") ?? "").trim(),
      scale: String(formData.get("scale") ?? ""),
      brand: String(formData.get("brand") ?? "").trim(),
      year: String(formData.get("year") ?? "").trim(),
      featured: formData.get("featured") === "on",
      showOnHome: selectedWork.showOnHome,
      description: String(formData.get("description") ?? "").trim(),
      images: normalizeMainImage(images).map((image, index) => ({
        alt: `${title} - imagen ${index + 1}`,
        src: image.isLocal ? "" : image.src,
        kind: image.kind,
        aspectRatio: image.aspectRatio,
      })),
    };

    const requestData = new FormData();
    requestData.set("work", JSON.stringify(draft));
    images.forEach((image, index) => {
      if (image.file) {
        requestData.set(`image-${index}`, image.file);
      }
    });

    const response = await fetch("/api/admin/works", {
      method: "POST",
      body: requestData,
    }).catch(() => null);

    if (!response) {
      setLimitMessage("No se ha podido conectar con el guardado del proyecto.");
      return;
    }

    const payload = (await response.json()) as {
      error?: string;
      work?: Work;
    };

    if (!response.ok) {
      setLimitMessage(payload.error ?? "No se ha podido guardar la obra.");
      return;
    }

    if (payload.work) {
      setImages(payload.work.images);
    }

    router.refresh();
    setLimitMessage(null);
    setSaveMessage(
      status === "draft"
        ? "Borrador guardado en el proyecto."
        : "Obra publicada. La galeria ya lee esta fuente."
    );

    if (isNewWork && payload.work) {
      router.push(`/admin/obras?obra=${payload.work.slug}`);
    }
  }

  async function deleteWork() {
    if (!selectedWork.slug) return;

    const response = await fetch(
      `/api/admin/works?slug=${encodeURIComponent(selectedWork.slug)}`,
      {
        method: "DELETE",
      }
    ).catch(() => null);

    if (!response) {
      setLimitMessage("No se ha podido conectar con el borrado del proyecto.");
      return;
    }

    const payload = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setLimitMessage(payload.error ?? "No se ha podido eliminar la obra.");
      return;
    }

    setDeleted(true);
    setDeleteConfirmOpen(false);
    router.push("/admin/obras?nueva=1");
    router.refresh();
  }

  if (deleted) {
    return (
      <section className="rounded-lg border border-rule-strong bg-surface/70 p-8">
        <p className="eyebrow text-accent">Obra eliminada</p>
        <h2 className="mt-3 text-2xl font-semibold">{selectedWork.title}</h2>
        <p className="mt-2 max-w-xl text-sm text-foreground-muted">
          La obra se ha retirado del panel y de la galeria publica.
        </p>
        <a
          href="/admin/obras"
          className="mt-6 inline-flex rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
        >
          Volver a obras
        </a>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-rule-strong bg-surface/70 p-5">
      <div className="flex flex-col gap-2 border-b border-rule pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {isNewWork ? "Nueva obra" : "Editar obra"}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            {isNewWork
              ? "Rellena los campos y guardala como borrador antes de publicarla."
              : "Obra real cargada desde el modelo que alimenta la galeria."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {!isNewWork ? (
            <button
              type="button"
              onClick={() => setDeleteConfirmOpen(true)}
              className="rounded-md border border-red-400/30 px-4 py-2 text-sm text-red-100 transition hover:bg-red-400/10"
            >
              Eliminar obra
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => saveWorkDraft("draft")}
            className="rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
          >
            Guardar borrador
          </button>
          <button
            type="button"
            onClick={() => saveWorkDraft("published")}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition hover:bg-accent-hover"
          >
            Publicar
          </button>
        </div>
      </div>

      {saveMessage ? (
        <div className="mt-5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
          {saveMessage}
        </div>
      ) : null}

      {limitMessage ? (
        <div className="mt-5 rounded-lg border border-accent/35 bg-accent/10 p-4 text-sm text-accent">
          {limitMessage}
        </div>
      ) : null}

      {isNewWork && localDrafts.length > 0 ? (
        <div className="mt-5 rounded-lg border border-rule-strong bg-background/35 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-foreground">
                Borrador guardado
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                {localDrafts[0].title}
                {localDrafts[0].savedAt
                  ? ` · ${new Date(localDrafts[0].savedAt).toLocaleString("es-ES")}`
                  : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeLocalDraft(localDrafts[0].key)}
              className="rounded-md border border-red-400/30 px-4 py-2 text-sm text-red-100 transition hover:bg-red-400/10"
            >
              Eliminar borrador
            </button>
          </div>
        </div>
      ) : null}

      {deleteConfirmOpen ? (
        <div className="mt-5 rounded-lg border border-red-400/30 bg-red-400/10 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-red-100">
                Eliminar {selectedWork.title}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                Esta accion quitara la obra completa, con sus datos e imagenes.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={deleteWork}
                className="rounded-md bg-red-400 px-4 py-2 text-sm font-medium text-background transition hover:bg-red-300"
              >
                Si, eliminar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <form ref={formRef} className="mt-5 grid gap-5 lg:grid-cols-2">
        <input type="hidden" name="slug" defaultValue={selectedWork.slug} />

        <label className={labelClass}>
          Titulo
          <input
            className={inputClass}
            name="title"
            defaultValue={selectedWork.title}
            placeholder="Ej. Samurai, Templario, Busto romano..."
          />
        </label>

        <label className={labelClass}>
          Categoria
          <select
            className={inputClass}
            name="category"
            defaultValue={selectedWork.category}
          >
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
            defaultValue={selectedWork.status}
          >
            <option value="draft">Borrador</option>
            <option value="in-progress">En preparacion</option>
            <option value="published">Publicado</option>
            <option value="hidden">Oculto</option>
          </select>
        </label>

        <label className={labelClass}>
          Escala
          <select
            className={inputClass}
            name="scale"
            defaultValue={selectedWork.scale}
          >
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
            defaultValue={selectedWork.brand}
            placeholder="Scale75, Pegaso Models..."
          />
        </label>

        <label className={labelClass}>
          Ano
          <input
            className={inputClass}
            name="year"
            defaultValue={selectedWork.year}
            placeholder="Ano opcional"
          />
        </label>

        <div className="grid gap-3 rounded-md border border-rule bg-background/35 p-4">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={selectedWork.featured}
            />
            Obra destacada
          </label>
          <p className="text-xs leading-relaxed text-foreground-muted">
            Las primeras 10 obras publicadas segun este orden aparecen en portada.
          </p>
        </div>

        <div className="grid gap-4 rounded-md border border-rule bg-background/35 p-4 lg:col-span-2">
          <div>
            <p className="font-medium text-foreground">Disponibilidad comercial</p>
            <p className="mt-1 text-xs text-foreground-muted">
              Activa una obra para que aparezca en el apartado de obras disponibles.
            </p>
          </div>

          <label className={labelClass}>
            Estado comercial
            <select
              className={inputClass}
              name="saleStatus"
              defaultValue={selectedWork.saleStatus ?? "none"}
            >
              {Object.entries(workSaleStatusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              Precio
              <input
                className={inputClass}
                name="salePrice"
                defaultValue={selectedWork.salePrice}
                placeholder="Ej. 650 euros, consultar..."
              />
            </label>

            <label className={labelClass}>
              Nota comercial
              <input
                className={inputClass}
                name="saleNote"
                defaultValue={selectedWork.saleNote}
                placeholder="Incluye peana, envio no incluido..."
              />
            </label>
          </div>
        </div>

        <label className={`${labelClass} lg:col-span-2`}>
          Descripcion
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            name="description"
            defaultValue={selectedWork.description}
          />
        </label>

        <section className="lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold">Imagenes</h3>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={images.length >= MAX_IMAGES_PER_WORK}
              className="rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Anadir fotos
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => addFiles(event.target.files)}
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <p className="text-sm text-foreground-muted sm:col-span-2 lg:col-span-4">
              {images.length} / {MAX_IMAGES_PER_WORK} fotos
            </p>
            {images.length > 0 ? (
              images.map((image, index) => (
                <article
                  key={image.src}
                  className="rounded-md border border-rule bg-background/35 p-3"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded bg-background">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 16vw, 40vw"
                      className="object-cover"
                      unoptimized={image.isLocal}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-foreground-muted">
                    <span>Imagen {index + 1}</span>
                    <span>
                      {image.kind === "principal" ? "Principal" : "Detalle"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPrimaryImage(image.src)}
                    className="mt-3 w-full rounded-md border border-rule-strong px-3 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-45"
                    disabled={image.kind === "principal"}
                  >
                    Marcar como principal
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(image.src)}
                    className="mt-3 w-full rounded-md border border-rule-strong px-3 py-2 text-sm text-foreground-muted transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-100"
                  >
                    Eliminar
                  </button>
                </article>
              ))
            ) : (
              <div className="rounded-md border border-dashed border-rule-strong bg-background/35 p-6 text-sm text-foreground-muted sm:col-span-2 lg:col-span-4">
                Todavia no hay imagenes. Aqui apareceran la foto principal y
                los detalles que Julio arrastre al formulario.
              </div>
            )}
          </div>
        </section>
      </form>
    </section>
  );
}
