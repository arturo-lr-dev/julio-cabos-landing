# Auditoría previa — reorganización editorial

Fecha: 22 de septiembre de 2026

## Qué he encontrado

- La aplicación usa Next.js 16.2.3 con App Router, TypeScript, Tailwind CSS 4 y componentes React.
- Las rutas públicas principales son `/`, `/en`, `/it`, `/galeria`, `/biblioteca` y sus variantes de idioma. No existe todavía una ruta independiente de Sobre Julio.
- La página de inicio concentra Sobre Julio, Formación, Colaboraciones, Galería y Biblioteca como secciones de una única página editorial.
- La cabecera y el pie se alimentan de `lib/site-content.ts`; la navegación actual usa principalmente anclas de la home.
- La identidad visual está centralizada en `app/globals.css`, con fondo negro cálido, tipografías Fraunces e Inter Tight, reglas finas, acento dorado y utilidades editoriales.
- Las fuentes se cargan en `app/root-config.ts` con `next/font/google`.
- Galería y cursos ya tienen modelos de datos separados (`lib/work-types.ts`, `lib/course-content.ts`, JSON en `content/`). Biblioteca usa `content/library-publications.json` y `lib/library-content.ts`.
- Biblioteca ya contiene 17 publicaciones; se debe evitar duplicar las que coincidan con el inventario documental.
- ES / EN / IT comparten buena parte de las páginas mediante props `locale`, pero la navegación y algunos textos viven en copias por idioma. La nueva trayectoria se preparará con contenido localizado y la misma ruta semántica por idioma.
- El contenido actual de Sobre Julio es narrativo y está en `lib/site-content.ts`, renderizado por `components/AboutSection.tsx`; su CTA aún apunta al PDF de CV.
- No hay un modelo existente para trayectoria, fuentes documentales, estados de verificación ni relaciones entre hito, publicación, obra y formación.
- Los datos sensibles de fechas/cargos de Andrea Miniatures y Scale75 deben permanecer marcados como pendientes de confirmación; no se publicarán cargos inventados.

## Cambios previstos

### Archivos nuevos

- `lib/trajectory-types.ts`: tipos del modelo editorial.
- `lib/trajectory-content.ts`: dataset inicial localizado, con fuentes, relaciones y pendientes de verificación.
- `components/TrajectoryPageClient.tsx`: filtros y renderizado interactivo de la timeline.
- `app/(es)/sobre-julio/trayectoria/page.tsx`: página española y metadatos.
- `app/en/sobre-julio/trayectoria/page.tsx`: página inglesa.
- `app/it/sobre-julio/trayectoria/page.tsx`: página italiana.

### Archivos existentes que se modificarán

- `lib/site-content.ts`: CTA de Sobre Julio hacia la trayectoria y enlaces de navegación/contexto sin alterar la arquitectura global.
- `components/AboutSection.tsx`: CTA narrativo hacia la nueva trayectoria, manteniendo el PDF como recurso secundario solo si procede.
- `app/sitemap.ts`: incluir las tres nuevas rutas públicas.
- Posiblemente `app/globals.css`: únicamente estilos específicos de timeline/filtros si las utilidades actuales no bastan.

### Componentes que se reutilizarán

- `Header`, `Footer`, `FadeIn`, `SectionLabel`, `SectionWrapper`, `TrackedLink` y el sistema de metadata/SEO existente.
- Las tipografías, colores, reglas y utilidades editoriales existentes; no se plantea un rediseño global.

## Contenido existente potencialmente afectado

- El CTA de Sobre Julio dejará de llevar directamente al PDF y pasará a la trayectoria; el PDF podrá conservarse como enlace secundario.
- Se añadirá un enlace contextual a la trayectoria desde navegación/pie según el idioma, sin convertirla inicialmente en una sección independiente del menú principal.
- No se eliminarán publicaciones, obras, cursos ni rutas actuales.
- La Biblioteca y la Galería no se reescribirán en esta fase; la trayectoria podrá enlazarlas mediante identificadores/URLs cuando exista una referencia estable.

## Criterio de implementación

La primera versión publicará una trayectoria documental prudente: fechas aproximadas cuando la fuente no permite más precisión, cargos pendientes claramente señalados y filtros simples. El contenido quedará fuera de JSX para facilitar correcciones, traducciones, fuentes y futuras relaciones.
