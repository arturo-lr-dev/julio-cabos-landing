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
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-background md:w-64">
              {posterImage ? (
                <Image
                  src={posterImage}
                  alt={selectedCourse.posterAlt || selectedCourse.title || "Cartel del curso"}
                  fill
                  sizes="256px"
                  className="object-cover"
                  unoptimized={posterImage.startsWith("blob:")}
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-foreground-muted">
                  Sin cartel
                </div>
              )}
            </div>
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
    </section>
  );
}
