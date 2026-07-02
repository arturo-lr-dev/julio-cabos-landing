# Project Overview

## Qué es

`julio-cabos-landing` es una web profesional para Julio Cabos: landing, portfolio y base futura para productos de formación.

La web debe comunicar tres ideas:

- Nivel artístico alto.
- Autoridad y trayectoria profesional.
- Claridad para aprender, contactar o explorar obra.

No es una web corporativa ni una academia genérica. Debe sentirse como portfolio + taller personal.

## Objetivo del MVP

El MVP es una home completa, responsive y visualmente sólida, con:

- Hero con imagen protagonista.
- Mensaje editorial breve.
- Galería seleccionada.
- Bloque de formación presencial y online.
- Sobre Julio.
- Lista de espera para cursos online.
- Contacto.
- Footer con redes.

Además existe una ruta `/galeria` para ver la obra completa con filtros.

## Principios del proyecto

- Las miniaturas son el producto principal.
- El diseño debe acompañar, no competir.
- Menos texto, mejor jerarquía.
- La estructura debe ser fácil de ampliar.
- Las imágenes deben verse limpias, grandes y optimizadas.

## Stack actual

- Next.js con App Router.
- React.
- Tailwind CSS.
- TypeScript.
- Resend para el formulario de lista de espera.
- Datos de contenido centralizados en `lib/data.ts`.

## Mapa rápido

```text
app/
  page.tsx              Home
  layout.tsx            Metadata, fuentes y estructura raíz
  galeria/page.tsx      Galería completa
  api/waitlist/route.ts Endpoint del formulario

components/
  HeroSection.tsx
  TextBlock.tsx
  GalleryGrid.tsx
  TrainingSection.tsx
  WaitlistSection.tsx
  AboutSection.tsx
  ContactSection.tsx
  Footer.tsx
  Lightbox.tsx

lib/
  data.ts               Contenido, imágenes y categorías
  schema.ts             JSON-LD

public/
  images/               Imágenes web optimizadas
  files/                Material fuente, CV y PDFs

docs/
  main.md               Briefing original
```

## Estado actual

El proyecto ya tiene una base avanzada:

- Componentes separados por sección.
- Galería seleccionada en home.
- Galería completa con filtros.
- Lightbox.
- SEO básico.
- Manifest, robots y sitemap.
- Formulario de lista de espera.
- Imágenes WebP generadas en `public/images`.

Los puntos que requieren revisión antes de producción están en `deployment-checklist.md`.
