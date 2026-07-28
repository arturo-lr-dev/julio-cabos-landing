# Documentación del proyecto

Esta carpeta contiene la documentación operativa vigente de la web de Julio Cabos.

## Orden de lectura recomendado

1. `project-overview.md`: objetivos, alcance y estado real.
2. `design-system.md`: dirección visual y reglas de interfaz.
3. `architecture.md`: rutas, capas, componentes y flujos.
4. `content-guide.md`: textos bilingües, navegación, SEO y contenido público.
5. `admin-and-data.md`: panel, modelos, persistencia y publicación.
6. `library.md`: Biblioteca, publicaciones, créditos y protección del tutorial.
7. `image-guide.md`: fuentes, uploads, optimización y criterios visuales.
8. `forms-and-email.md`: consultas, lista de espera y Resend.
9. `deployment-checklist.md`: configuración, pruebas y despliegue.
10. `roadmap.md`: deuda técnica y siguientes fases.

`main.md` conserva el briefing original. Es una referencia histórica, no una descripción literal del estado actual. Si contradice esta documentación o el código, prevalecen el código vigente y las guías operativas anteriores.

## Fuente de verdad

- Principios de marca y producto: `main.md` y `design-system.md`.
- Textos estáticos y traducciones: `lib/site-content.ts`.
- Contenido administrable: `content/*.json`.
- Comportamiento técnico: código en `app/`, `components/` y `lib/`.
- Variables: `.env.example` y usos reales de `process.env`.

Toda decisión que afecte a marca, contenido, datos, imágenes, despliegue o mantenimiento futuro debe quedar reflejada aquí.
