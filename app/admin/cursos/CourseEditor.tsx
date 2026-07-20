"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { courseLevelOptions, type Course } from "@/lib/data";

const inputClass =
  "mt-2 w-full rounded-md border border-rule-strong bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent";

const labelClass = "text-sm font-medium text-foreground";

function slugify(value: string) {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `curso-${Date.now()}`
  );
}

export default function CourseEditor({
  selectedCourse,
  isNewCourse,
}: {
  selectedCourse: Course;
  isNewCourse: boolean;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [posterImage, setPosterImage] = useState(selectedCourse.posterImage ?? "");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterRemoved, setPosterRemoved] = useState(false);
  const [posterPreviewOpen, setPosterPreviewOpen] = useState(false);

  function addPoster(file: File | null) {
    if (!file) return;
    setPosterFile(file);
    setPosterImage(URL.createObjectURL(file));
    setPosterRemoved(false);
  }

  function removePoster() {
    setPosterFile(null);
    setPosterImage("");
    setPosterRemoved(true);
    setPosterPreviewOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function saveCourse(status: Course["status"]) {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const title = String(formData.get("title") ?? "").trim();
    const slug = String(formData.get("slug") ?? "").trim() || slugify(title);
    const seatsTotal = Number(formData.get("seatsTotal") ?? 0);
    const seatsAvailable = Number(formData.get("seatsAvailable") ?? 0);

    const course: Course = {
      title,
      slug,
      status,
      location: String(formData.get("location") ?? "").trim(),
      startDate: String(formData.get("startDate") ?? ""),
      endDate: String(formData.get("endDate") ?? ""),
      price: String(formData.get("price") ?? "").trim(),
      seatsTotal,
      seatsAvailable,
      level: String(formData.get("level") ?? "Todos los niveles") as Course["level"],
      materials: String(formData.get("materials") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      bookingUrl: String(formData.get("bookingUrl") ?? "").trim(),
      posterImage: posterFile ? "" : posterImage,
      posterAlt: title ? `Cartel de ${title}` : "",
    };

    const requestData = new FormData();
    requestData.set("course", JSON.stringify(course));
    if (posterFile) {
      requestData.set("poster", posterFile);
    }
    if (posterRemoved) {
      requestData.set("removePoster", "1");
    }

    const response = await fetch("/api/admin/courses", {
      method: "POST",
      body: requestData,
    }).catch(() => null);

    if (!response) {
      setErrorMessage("No se ha podido conectar con el guardado del proyecto.");
      return;
    }

    const payload = (await response.json()) as {
      error?: string;
      course?: Course;
    };

    if (!response.ok) {
      setErrorMessage(payload.error ?? "No se ha podido guardar el curso.");
      return;
    }

    if (payload.course?.posterImage) {
      setPosterImage(payload.course.posterImage);
      setPosterFile(null);
      setPosterRemoved(false);
    }

    router.refresh();
    setErrorMessage(null);
    setSaveMessage(
      status === "active"
        ? "Curso activado. La web publica ya lee esta fuente."
        : status === "hidden"
          ? "Curso ocultado."
          : "Borrador guardado."
    );

    if (isNewCourse && payload.course) {
      router.push(`/admin/cursos?curso=${payload.course.slug}`);
    }
  }

  async function deleteCourse() {
    if (!selectedCourse.slug) return;

    const response = await fetch(
      `/api/admin/courses?slug=${encodeURIComponent(selectedCourse.slug)}`,
      {
        method: "DELETE",
      }
    ).catch(() => null);

    if (!response) {
      setErrorMessage("No se ha podido conectar con el borrado del proyecto.");
      return;
    }

    const payload = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setErrorMessage(payload.error ?? "No se ha podido eliminar el curso.");
      return;
    }

    setDeleted(true);
    setDeleteConfirmOpen(false);
    router.push("/admin/cursos?nuevo=1");
    router.refresh();
  }

  if (deleted) {
    return (
      <section className="rounded-lg border border-rule-strong bg-surface/70 p-8">
        <p className="eyebrow text-accent">Curso eliminado</p>
        <h2 className="mt-3 text-2xl font-semibold">{selectedCourse.title}</h2>
        <p className="mt-2 max-w-xl text-sm text-foreground-muted">
          El curso se ha retirado del panel y de la web publica.
        </p>
        <a
          href="/admin/cursos"
          className="mt-6 inline-flex rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
        >
          Volver a cursos
        </a>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-rule-strong bg-surface/70 p-5">
      <div className="flex flex-col gap-2 border-b border-rule pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {isNewCourse ? "Nuevo curso" : "Editar curso"}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            {isNewCourse
              ? "Rellena los campos y guardalo como borrador o activalo en la web."
              : "Curso cargado desde el contenido que alimenta formacion."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {!isNewCourse ? (
            <button
              type="button"
              onClick={() => setDeleteConfirmOpen(true)}
              className="rounded-md border border-red-400/30 px-4 py-2 text-sm text-red-100 transition hover:bg-red-400/10"
            >
              Eliminar curso
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => saveCourse("draft")}
            className="rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
          >
            Guardar borrador
          </button>
          {!isNewCourse ? (
            <button
              type="button"
              onClick={() => saveCourse("hidden")}
              className="rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
            >
              Ocultar
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => saveCourse("active")}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition hover:bg-accent-hover"
          >
            Activar en web
          </button>
        </div>
      </div>

      {saveMessage ? (
        <div className="mt-5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
          {saveMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-5 rounded-lg border border-accent/35 bg-accent/10 p-4 text-sm text-accent">
          {errorMessage}
        </div>
      ) : null}

      {deleteConfirmOpen ? (
        <div className="mt-5 rounded-lg border border-red-400/30 bg-red-400/10 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-red-100">
                Eliminar {selectedCourse.title}
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                Esta accion quitara el curso completo del panel.
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
                onClick={deleteCourse}
                className="rounded-md bg-red-400 px-4 py-2 text-sm font-medium text-background transition hover:bg-red-300"
              >
                Si, eliminar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <form ref={formRef} className="mt-5 grid gap-5 lg:grid-cols-2">
        <input type="hidden" name="slug" defaultValue={selectedCourse.slug} />

        <div className="lg:col-span-2 rounded-md border border-rule bg-background/35 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <button
              type="button"
              onClick={() => posterImage && setPosterPreviewOpen(true)}
              disabled={!posterImage}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-md border border-rule bg-background transition hover:border-accent/50 disabled:cursor-default md:w-96 lg:w-[28rem]"
              aria-label="Ampliar cartel del curso"
            >
              {posterImage ? (
                <>
                  <Image
                    src={posterImage}
                    alt={selectedCourse.posterAlt || selectedCourse.title || "Cartel del curso"}
                    fill
                    sizes="(max-width: 768px) 100vw, 448px"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                    unoptimized={posterImage.startsWith("blob:")}
                  />
                  <span className="absolute bottom-3 right-3 rounded-md bg-background/85 px-3 py-1 text-xs text-accent opacity-0 backdrop-blur transition group-hover:opacity-100">
                    Ampliar
                  </span>
                </>
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-foreground-muted">
                  Sin cartel
                </div>
              )}
            </button>
            <div className="flex-1">
              <p className="font-medium text-foreground">Cartel del curso</p>
              <p className="mt-1 text-sm text-foreground-muted">
                Esta imagen acompanara al curso en la seccion de formacion.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => addPoster(event.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
                >
                  Anadir cartel
                </button>
                {posterImage ? (
                  <button
                    type="button"
                    onClick={removePoster}
                    className="rounded-md border border-red-400/30 px-4 py-2 text-sm text-red-100 transition hover:bg-red-400/10"
                  >
                    Quitar cartel
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <label className={labelClass}>
          Titulo
          <input
            className={inputClass}
            name="title"
            defaultValue={selectedCourse.title}
            placeholder="Ej. Curso intensivo Madrid"
          />
        </label>

        <label className={labelClass}>
          Ciudad
          <input
            className={inputClass}
            name="location"
            defaultValue={selectedCourse.location}
            placeholder="Madrid, Barcelona, Torrent..."
          />
        </label>

        <label className={labelClass}>
          Fecha inicio
          <input
            className={inputClass}
            name="startDate"
            type="date"
            defaultValue={selectedCourse.startDate}
          />
        </label>

        <label className={labelClass}>
          Fecha fin
          <input
            className={inputClass}
            name="endDate"
            type="date"
            defaultValue={selectedCourse.endDate}
          />
        </label>

        <label className={labelClass}>
          Precio
          <input
            className={inputClass}
            name="price"
            defaultValue={selectedCourse.price}
            placeholder="240 euros, pendiente, consultar..."
          />
        </label>

        <label className={labelClass}>
          Nivel
          <select
            className={inputClass}
            name="level"
            defaultValue={selectedCourse.level}
          >
            {courseLevelOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          Plazas totales
          <input
            className={inputClass}
            name="seatsTotal"
            type="number"
            min="0"
            defaultValue={selectedCourse.seatsTotal}
          />
        </label>

        <label className={labelClass}>
          Plazas disponibles
          <input
            className={inputClass}
            name="seatsAvailable"
            type="number"
            min="0"
            defaultValue={selectedCourse.seatsAvailable}
          />
        </label>

        <label className={`${labelClass} lg:col-span-2`}>
          Material necesario
          <input
            className={inputClass}
            name="materials"
            defaultValue={selectedCourse.materials}
            placeholder="Pinceles, paleta, miniatura imprimada..."
          />
        </label>

        <label className={`${labelClass} lg:col-span-2`}>
          Boton Reservar
          <input
            className={inputClass}
            name="bookingUrl"
            defaultValue={selectedCourse.bookingUrl}
            placeholder="mailto:, WhatsApp, formulario o enlace externo"
          />
        </label>

        <label className={`${labelClass} lg:col-span-2`}>
          Descripcion
          <textarea
            className={`${inputClass} min-h-36 resize-y`}
            name="description"
            defaultValue={selectedCourse.description}
            placeholder="Que se trabaja, para quien es y que se lleva el alumno."
          />
        </label>
      </form>

      {posterPreviewOpen && posterImage ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Cartel del curso ampliado"
        >
          <button
            type="button"
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={() => setPosterPreviewOpen(false)}
            aria-label="Cerrar cartel"
          />
          <button
            type="button"
            onClick={() => setPosterPreviewOpen(false)}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center text-foreground-muted transition hover:text-accent"
            aria-label="Cerrar cartel"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="pointer-events-none relative z-10 flex h-full w-full items-center justify-center p-6 pt-20 md:p-12">
            <Image
              src={posterImage}
              alt={selectedCourse.posterAlt || selectedCourse.title || "Cartel del curso"}
              width={1400}
              height={1400}
              className="h-auto max-h-[calc(100vh-7rem)] w-auto max-w-full rounded-md object-contain"
              sizes="100vw"
              unoptimized={posterImage.startsWith("blob:")}
              priority
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
