# Arquitectura

## Patrón general

La aplicación usa Next.js App Router. Las páginas públicas son Server Components y cargan contenido en servidor. Los componentes interactivos —formularios, filtros, lightbox, consentimiento y editores— son Client Components.

La home se compone en `app/page.tsx` y recibe `locale`. `/en` reutiliza la misma composición mediante `PublicHome`, evitando duplicar layout.

Orden actual:

```text
Header
HeroSection
AuthorityStrip
PathwaysSection
TrainingSection
CommissionsSection
GalleryGrid
TextBlock
LibraryTeaser
WaitlistSection
AboutSection
ContactSection
Footer
```

Las secciones editoriales numeradas usan actualmente `03` a `10`. Biblioteca ocupa `07`. Si se inserta una nueva sección, revisar numeración, navegación, anclas y eventos de analítica.

## Rutas

### Públicas

| Ruta | Responsabilidad |
| --- | --- |
| `/` | Home española |
| `/en` | Home inglesa |
| `/galeria` | Galería completa española |
| `/en/galeria` | Galería completa inglesa |
| `/biblioteca` | Biblioteca y archivo editorial en español |
| `/en/biblioteca` | Biblioteca y archivo editorial en inglés |
| `/politica-de-cookies` | Información y preferencias de cookies |
| `/robots.txt` | Directivas de rastreo |
| `/sitemap.xml` | URLs públicas y alternancias de idioma |
| `/manifest.webmanifest` | Metadatos de aplicación |

### Administración

| Ruta | Responsabilidad |
| --- | --- |
| `/admin/login` | Inicio de autenticación con Google |
| `/admin` | Resumen operativo |
| `/admin/obras` | Edición, publicación, venta y orden de obras |
| `/admin/cursos` | Edición y orden de cursos |
| `/admin/calendario` | Cursos y eventos en una vista conjunta |
| `/admin/consultas` | Bandeja, estados y notas |
| `/admin/instagram` | Candidatos e importación manual |

### API

- `POST /api/inquiries`: valida, guarda y notifica consultas.
- `POST /api/waitlist`: alias compatible del endpoint anterior.
- `/api/auth/google/start`, `/callback` y `/logout`: autenticación.
- `/api/admin/works`: crear/editar, borrar y reordenar obras.
- `/api/admin/courses`: crear/editar, borrar y reordenar cursos.
- `/api/admin/calendar-events`: crear/editar y borrar eventos.
- `/api/admin/inquiries`: actualizar estado y notas.
- `/api/admin/instagram`: guardar candidatos, ignorar, restaurar, importar o borrar.

`proxy.ts` protege `/admin/:path*` y `/api/admin/:path*`. Las APIs públicas no dependen de esa sesión.

## Capas

```text
app / components
        ↓
lib/*-content.ts
        ↓
lib/repositories/*
        ↓
content/*.json
```

Las mutaciones siguen:

```text
API route → service → repository → JSON / public/uploads → revalidación
```

- `lib/site-content.ts`: copy estático localizado.
- `content/library-publications.json`: inventario público de la Biblioteca.
- `lib/library-content.ts`: localización, orden y etiquetas de publicaciones.
- `lib/library-types.ts`: modelo editorial de publicaciones.
- `lib/work-types.ts`: contratos de dominio.
- `lib/work-options.ts`: límites, opciones y etiquetas.
- `lib/*-content.ts`: fachadas de lectura para páginas.
- `lib/services/`: validación, normalización y operaciones de escritura.
- `lib/repositories/`: lectura, transformación y persistencia.
- `lib/uploads/`: guardado y copia de archivos públicos.

## Datos y renderizado

La home y las galerías usan `dynamic = "force-dynamic"` para reflejar el contenido actual. Obras y cursos se consultan en servidor. Los servicios revalidan rutas relevantes tras una mutación.

`lib/data.ts` conserva exportaciones de compatibilidad y deriva `galleryImages`, pero no debe considerarse la única fuente de contenido.

## Internacionalización

No se usa una librería i18n. El locale es `"es" | "en"` y los textos viven en `siteContents`. Las páginas inglesas reutilizan componentes y pasan `locale="en"`. Cualquier sección pública nueva debe:

- incluir copy en ambos idiomas;
- usar enlaces localizados cuando cambie la ruta;
- añadir metadata/alternates si crea páginas;
- mantener `DocumentLanguage` y atributos accesibles coherentes.

## SEO, analítica y cookies

- Metadata raíz: `app/layout.tsx`.
- Metadata inglesa: rutas bajo `app/en`.
- JSON-LD: `lib/schema.ts`.
- Sitemap, robots y manifest: archivos homónimos en `app/`.
- Eventos: `lib/analytics.ts` y `TrackedLink`.
- Consentimiento: `CookieConsent`; Analytics solo debe activarse conforme a la elección del usuario.

## Convenciones para nuevas secciones

- Crear un componente modular.
- Reutilizar `SectionWrapper`, `SectionLabel` y `FadeIn` cuando encajen.
- Añadir el contenido estático a `lib/site-content.ts` en español e inglés.
- Usar repositorio/servicio/API si el contenido debe administrarse.
- No acceder a JSON directamente desde componentes.
- Mantener el componente de servidor salvo que necesite estado, efectos o eventos de navegador.
- Registrar CTAs relevantes con la taxonomía existente.
- Revisar cabecera, footer, IDs, numeración y enlaces profundos.
- Leer la guía local de Next.js en `node_modules/next/dist/docs/` antes de introducir APIs o convenciones nuevas.
