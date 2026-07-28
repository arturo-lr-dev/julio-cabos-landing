# Visión general

## Qué es

`julio-cabos-landing` es la web profesional de Julio Cabos. Combina portfolio editorial, presentación de servicios, formación y captación de consultas. Debe sentirse como el taller personal de un artista con trayectoria, no como una academia genérica ni una landing corporativa.

La propuesta se articula alrededor de tres acciones:

- Aprender con Julio.
- Encargar o consultar una obra.
- Proponer una colaboración profesional.

## Principios de producto

- La obra y las imágenes son el activo principal.
- El diseño acompaña y ordena; no compite.
- La autoridad se comunica con hechos, no con promesas exageradas.
- El contenido debe ser breve, claro, artístico y profesional.
- Cada nueva función debe mostrar mejor la obra, facilitar aprender o facilitar contactar/contratar.
- La experiencia móvil y la accesibilidad son requisitos, no mejoras opcionales.

## Alcance actual

### Sitio público

- Home completa en español e inglés.
- Hero, autoridad, caminos de entrada, formación, encargos, colaboraciones, galería seleccionada, manifiesto, lista de espera, trayectoria y contacto.
- Galería completa bilingüe, con filtros por categoría y disponibilidad comercial.
- Biblioteca bilingüe con archivo editorial, fichas de publicaciones y tutorial digital por solicitud.
- Lightbox por obra con varias imágenes.
- Cursos activos mostrados en la home.
- Formularios unificados de consultas y lista de espera.
- SEO técnico, sitemap, robots, manifest y datos estructurados.
- Google Analytics condicionado al consentimiento de cookies.

### Operación privada

- Acceso a `/admin` mediante Google OAuth y lista permitida de emails.
- Gestión y orden de obras.
- Estados de publicación y venta de piezas.
- Gestión y orden de cursos, plazas y carteles.
- Calendario combinado de cursos y eventos.
- Bandeja de consultas con estados y notas.
- Entrada manual de publicaciones de Instagram e importación como obra.

### Biblioteca

- Teaser editorial en la home.
- Rutas `/biblioteca` y `/en/biblioteca`.
- 17 publicaciones organizadas como Sobre la mesa, Cuadernos de taller, Estantería principal y Archivo editorial.
- Inventario estructurado en `content/library-publications.json`.
- *Madre Búho* se presenta mediante portada y recortes seguros; el PDF completo no forma parte de los activos públicos.

## Stack actual

- Next.js 16.2, App Router y React Server Components.
- React 19, TypeScript y Tailwind CSS 4.
- `next/image` y `next/font`.
- Resend para notificaciones.
- OAuth 2.0 de Google para administración.
- Archivos JSON y filesystem local como persistencia actual.

## Estado y limitaciones

El producto está funcional y cuenta con una base modular. La limitación técnica más importante es la persistencia: las mutaciones del panel escriben en `content/*.json` y `public/uploads`. Un despliegue con filesystem efímero o de solo lectura perderá cambios o impedirá guardarlos. Antes de producción debe elegirse un servidor con disco persistente o migrar a base de datos y almacenamiento de objetos.

La documentación antigua que describía `lib/data.ts` como único origen o `/api/waitlist` como endpoint independiente ya no representa el flujo completo.
