# Architecture

## Patrón general

La aplicación usa Next.js App Router. La home se compone ensamblando secciones reutilizables desde `app/page.tsx`.

```tsx
<Header />
<main>
  <HeroSection />
  <AboutSection />
  <TextBlock />
  <GalleryGrid />
  <TrainingSection />
  <WaitlistSection />
  <ContactSection />
</main>
<Footer />
```

La mayor parte del contenido editable vive en `lib/data.ts`. Los componentes leen de ese archivo y se centran en layout e interacción.

## Rutas

### `/`

Home principal. Archivo:

```text
app/page.tsx
```

Contiene las secciones principales de la landing.

### `/galeria`

Galería completa. Archivo:

```text
app/galeria/page.tsx
```

Características:

- Filtros por categoría.
- Grid tipo masonry con CSS columns.
- Lightbox compartido.
- Lectura de imágenes desde `galleryImages`.

### `/api/waitlist`

Endpoint POST para el formulario de lista de espera. Archivo:

```text
app/api/waitlist/route.ts
```

Valida nombre, email y nivel. Envía un email con Resend.

## Componentes principales

### `HeroSection`

Hero full viewport con imagen de fondo, título y CTA. Lee `siteContent.hero`.

Puntos delicados:

- Usa `next/image` con `fill` y `priority`.
- Tiene animación Ken Burns.
- La imagen debe tener composición limpia porque ocupa el primer impacto.

### `AboutSection`

Presentación biográfica. Lee `siteContent.about`.

Incluye enlace al CV en PDF.

### `TextBlock`

Mensaje editorial central. Lee `siteContent.message`.

Debe mantenerse breve. Es una pausa conceptual, no un bloque explicativo largo.

### `GalleryGrid`

Galería resumida de la home. Lee `galleryImages` y muestra solo las primeras imágenes.

Puntos importantes:

- `INITIAL_COUNT` controla cuántas imágenes aparecen en home.
- Abre `Lightbox`.
- Enlaza a `/galeria`.

### `TrainingSection`

Presenta formación presencial y online. Lee `siteContent.training`.

Actualmente:

- Cursos presenciales apuntan a contacto.
- Cursos online aparecen como próximos.

### `WaitlistSection`

Formulario para avisar sobre cursos online.

Estado local:

- `idle`
- `enviando`
- `exito`
- `error`

Envía datos a `/api/waitlist`.

### `ContactSection`

Contacto directo por email. Lee `siteContent.contact`.

### `Footer`

Identidad y redes. Lee `siteContent.footer`.

### `Lightbox`

Visor de imágenes reutilizado en home y galería completa.

## Datos

Archivo principal:

```text
lib/data.ts
```

Exporta:

- `siteContent`: textos y enlaces globales.
- `galleryImages`: lista de imágenes.
- `categoryLabels`: etiquetas visibles.
- Tipos `GalleryCategory` y `GalleryImage`.

Regla: si un cambio es de contenido, primero mirar `lib/data.ts` antes de tocar componentes.

## SEO y metadata

Archivo:

```text
app/layout.tsx
```

Incluye:

- `metadataBase`.
- `title`.
- `description`.
- `keywords`.
- Open Graph.
- Twitter card.
- JSON-LD desde `lib/schema.ts`.

Rutas técnicas:

- `app/robots.ts`
- `app/sitemap.ts`
- `app/manifest.ts`

## Estilos

Archivo:

```text
app/globals.css
```

Define:

- Variables de color.
- Fuentes.
- Utilidades visuales.
- Animaciones.
- Respeto a `prefers-reduced-motion`.

Tailwind se usa principalmente mediante clases en componentes. Las variables CSS funcionan como tokens de diseño.

## Convenciones

- Mantener las secciones modulares.
- Evitar meter contenido hardcodeado si pertenece a `lib/data.ts`.
- Evitar librerías pesadas para interacciones simples.
- Mantener la home como composición editorial, no como landing corporativa.
- Añadir nuevas páginas como rutas dentro de `app/`.
