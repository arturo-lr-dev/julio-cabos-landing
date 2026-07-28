# Guía de contenido

## Dos tipos de contenido

### Copy estático y bilingüe

Vive en `lib/site-content.ts`, dentro de `siteContents.es` y `siteContents.en`:

- Hero y CTAs.
- Cifras de autoridad.
- Caminos de entrada.
- Formación, encargos y colaboraciones.
- Manifiesto, trayectoria y contacto.
- Navegación, labels, estados de interfaz y formularios.
- Footer y redes.

Antes de hardcodear un texto en un componente, comprobar si pertenece aquí. Cualquier cambio público debe revisarse en ambos idiomas, aunque la traducción inglesa pueda requerir adaptación editorial y no una traducción literal.

### Contenido administrable

Vive en `content/*.json` y se gestiona desde `/admin`:

- Obras.
- Cursos.
- Eventos.
- Consultas.
- Candidatos de Instagram.
- Publicaciones de Biblioteca, mediante `content/library-publications.json`.

Los componentes no deben importar estos JSON directamente. Deben usar las fachadas `lib/*-content.ts`, repositorios y servicios.

## Biblioteca

La Biblioteca distingue la existencia confirmada de una participación y el crédito específico documentado:

- `participationConfirmed`: Julio ha confirmado que participó en la publicación.
- `creditStatus: documented`: conocemos su función concreta.
- `creditStatus: undocumented`: la participación está confirmada, pero no debe inventarse autoría, dirección o función.

Las secciones públicas son capítulos narrativos, no categorías comerciales:

- `on-the-table`: publicación actual destacada.
- `workshop-notebooks`: tutoriales y colecciones didácticas.
- `main-shelf`: autoría o contribución central documentada.
- `editorial-archive`: artículos, trabajos colectivos y colaboraciones históricas.

Los estados internos de documentación no se muestran como advertencias al visitante. La ficha usa un texto general de participación cuando el crédito exacto todavía no está documentado.

## Tono de voz

La web debe sonar clara, sobria, artística, profesional y cercana. La autoridad se expresa desde la experiencia y el criterio.

Conceptos propios:

- Aprender a mirar.
- Pintar con criterio.
- Entender luz, color, volumen y decisiones.
- Obra realizada con dedicación y acabado profesional.

Evitar:

- Lenguaje de academia genérica.
- Promesas exageradas o urgencia artificial.
- Copy corporativo.
- Párrafos largos sin respiración.
- Repetir el mismo argumento en secciones contiguas.

## Jerarquía y longitud

- Un único `h1` por página.
- Titulares breves y expresivos.
- Descripciones de una o dos ideas.
- Labels editoriales cortos.
- CTAs con verbo y destino inequívoco.
- El texto nunca debe competir con una imagen principal.

## Navegación y anclas

La navegación vive en `siteContents.<locale>.ui.nav`. Al añadir o mover una sección:

1. Definir un ID estable y único.
2. Actualizar navegación móvil y desktop mediante el array compartido.
3. Revisar el footer, que deriva enlaces de esa navegación.
4. Comprobar todos los CTAs que apunten a la sección.
5. Revisar `scroll-mt` si el header fijo tapa el destino.
6. Mantener rutas inglesas localizadas (`/en`, `/en/galeria`).

## Obras y galería

La descripción vigente de una obra está en `Work` (`lib/work-types.ts`). Campos principales:

- Identidad: `title`, `slug`, `description`.
- Clasificación: `category`, `scale`, `brand`, `year`.
- Publicación: `status`, `featured`, `showOnHome`.
- Venta: `saleStatus`, `salePrice`, `saleNote`.
- Medios: `images` con principal/detalle, alt y proporción.

La primera imagen principal actúa como portada. La home usa obras publicadas marcadas para home; la galería completa usa todas las publicadas. El orden del panel importa.

El `alt` debe describir pieza y contexto sin rellenar palabras clave. Los datos técnicos visibles deben ser exactos.

## Cursos

Los cursos activos pueden aparecer en la home con fecha, ubicación, nivel, precio, plazas, descripción, cartel y enlace de reserva. No anunciar una fecha, precio o disponibilidad que aún no esté confirmada; usar el estado y los campos preparados para ello.

## SEO

Revisar cuando cambie el posicionamiento:

- `app/layout.tsx`.
- Metadata de rutas inglesas.
- `lib/schema.ts`.
- `app/sitemap.ts`.
- `app/robots.ts`.
- `app/manifest.ts`.
- `public/og-image.jpg`.

Una página nueva necesita title, description, canonical, alternates de idioma cuando proceda y presencia en sitemap si debe indexarse.

## Checklist editorial

- Español e inglés completos.
- Acentos, puntuación y capitalización revisados.
- Enlaces y anclas existentes.
- Emails y redes confirmados.
- CTAs coherentes con el estado real del servicio.
- Alt text útil.
- Cifras y credenciales verificadas.
- Sin desbordes en móvil.
- Sin duplicar contenido administrable en código.
