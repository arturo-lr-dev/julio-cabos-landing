# Roadmap

## Estado actual

La web pública, el portfolio bilingüe y el panel operativo están implementados. El siguiente trabajo no consiste en añadir funciones indiscriminadamente, sino en consolidar persistencia, seguridad, contenido y operación.

## Prioridad 0 — producción fiable

- Elegir hosting compatible con escritura persistente o migrar almacenamiento.
- Automatizar backups de `content/` y `public/uploads/`.
- Configurar dominio, OAuth, `AUTH_SECRET`, Resend y destinatario final.
- Verificar remitente propio de email.
- Completar pruebas responsive, accesibilidad, lint y build.
- Revisar copy y traducción inglesa definitiva.

## Prioridad 1 — seguridad y datos

- Rate limit y anti-spam en consultas.
- Validación mediante esquemas y límites de payload.
- Política de privacidad, retención y borrado de datos.
- Comparación de firmas de sesión resistente a timing attacks.
- Mejor gestión de errores en APIs administrativas.
- Control de concurrencia o almacenamiento transaccional.

## Prioridad 2 — persistencia escalable

Migrar cuando el panel vaya a utilizarse en producción de forma regular:

- Obras, cursos, eventos y consultas a base de datos.
- Imágenes a almacenamiento de objetos/CDN.
- Migración reproducible desde JSON.
- Eliminación segura de archivos huérfanos.
- Backups y restauración probados.

El patrón de repositorios y servicios ya separa buena parte de este cambio de la interfaz.

## Prioridad 3 — portfolio y venta

- Fichas individuales de obra si aportan contexto y SEO.
- Descripciones, técnica, escala, año y marca más curados.
- Flujo claro para disponibilidad, reserva y venta.
- Consulta contextual que incluya automáticamente la obra seleccionada.
- Evitar convertir la galería en un catálogo pesado.

## Prioridad 4 — formación y calendario público

- Página de formación o cursos.
- Programa, metodología, fechas, plazas, precio y FAQ.
- Calendario público solo si ayuda a reservar o asistir.
- Decidir inscripción por email, formulario, Stripe o plataforma externa.
- Formación online únicamente cuando exista producto y soporte definidos.

## Prioridad 5 — contenido y comunidad

- Integración real de Instagram solo si la API y permisos compensan el coste.
- Newsletter con consentimiento explícito.
- Comunidad o Patreon integrado con discreción y propuesta clara.
- CMS únicamente si la frecuencia y equipo editorial lo justifican.

## Ideas asistidas por IA

- Borradores de descripciones y alt text con revisión humana.
- Etiquetado de obras cuando el catálogo crezca.
- Ayuda SEO para fichas y cursos.
- Chatbot solo con contenido suficiente, mantenimiento y límites claros.

## Principio de priorización

Cada iniciativa debe mejorar al menos una de estas áreas:

- Mostrar mejor la obra.
- Facilitar aprender con Julio.
- Facilitar contactar, reservar o contratar.
- Reducir el riesgo operativo del proyecto.

Si no cumple ninguna, probablemente sobra.
