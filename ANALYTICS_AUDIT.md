# Auditoría de analítica y medición — juliocabos.es

**Fecha:** 2026-10-08
**Alcance:** auditoría del repositorio y de la arquitectura de medición existente.
**Estado:** documento de diagnóstico y propuesta. No implementa cambios.

## 1. Resumen ejecutivo

La web ya dispone de una base funcional de Google Analytics 4 (GA4): el ID se obtiene de `NEXT_PUBLIC_GA_ID`, el componente `GoogleAnalytics` se carga solamente con consentimiento analítico y existe un helper único para enviar eventos (`lib/analytics.ts`). Hay cobertura útil de navegación, idioma, galería, cursos, biblioteca, formularios y redes sociales.

La principal limitación no es la ausencia total de analítica, sino la falta de una taxonomía estable y de una capa de negocio homogénea. Los nombres de eventos y parámetros están en español, mezclan convenciones y no incluyen de forma consistente página, sección, tipo de contenido o resultado. Esto dificulta comparar idiomas y construir embudos sin transformaciones manuales.

Miniature Coach está correctamente limitado a la Home y utiliza una URL centralizada en `lib/miniature-coach.ts`, pero actualmente no registra el clic de salida. Solo puede medirse el clic desde juliocabos.es; no es posible medir lo que ocurre posteriormente dentro de ChatGPT desde esta web.

### Prioridades

1. **P0 — Mantener y verificar la base:** confirmar en una propiedad GA4 de producción que el tag, los page views, el consentimiento y los eventos llegan correctamente.
2. **P0 — Añadir medición de Miniature Coach:** un único evento de clic de salida con parámetros estables y origen Home.
3. **P1 — Normalizar taxonomía:** pasar progresivamente de nombres españoles y parámetros variables a nombres en inglés, `snake_case`, sin duplicar eventos indefinidamente.
4. **P1 — Configurar conversiones:** marcar envío correcto de consultas y alta en lista de espera como conversiones/key events según el objetivo comercial.
5. **P1 — Cerrar atribución SEO:** verificar Search Console, conservar sitemap/robots y relacionar consultas orgánicas con landing pages y conversiones.
6. **P2 — Mejorar contenidos:** medir filtros de trayectoria, clics de fuentes y lectura de artículos solo cuando exista una decisión de negocio asociada.

## 2. Alcance, método y limitaciones

Se inspeccionaron:

- `package.json` y dependencias de analítica.
- `lib/analytics.ts`, `components/CookieConsent.tsx` y `components/TrackedLink.tsx`.
- layouts y configuración de `NEXT_PUBLIC_GA_ID`.
- Home, Formación, Galería, Biblioteca, Trayectoria, formularios, contacto y footer.
- sitemap, robots, metadatos, canonical y alternates ES/EN/IT.
- datos de cursos, obras, publicaciones y enlaces externos.

Esta es una auditoría estática del código disponible. No se accedió a la cuenta de GA4, Google Tag Manager, Search Console, Vercel Analytics ni a un navegador de producción con DevTools. Por tanto, no se puede confirmar desde el repositorio:

- que el Measurement ID de producción sea el esperado;
- que los eventos estén llegando a la propiedad correcta;
- que los page views se registren correctamente tras navegación SPA;
- que las cookies se creen/eliminan como se espera en todos los navegadores;
- la propiedad, cobertura o errores reales de Search Console;
- la adecuación jurídica de los textos o del mecanismo de consentimiento.

## 3. Arquitectura actual de medición

### 3.1 GA4 y envío de eventos

**Estado: IMPLEMENTADO, pendiente de verificación en producción.**

- Dependencia: `@next/third-parties`.
- ID público configurado mediante `NEXT_PUBLIC_GA_ID`.
- Valor documentado en `.env.example`: `G-J1QKS5XKW4`.
- `app/root-config.ts` expone el valor a los layouts públicos.
- Los layouts ES, EN e IT pasan el ID a `CookieConsent`.
- `CookieConsent` renderiza `GoogleAnalytics` solo en rutas públicas, producción, con ID y con consentimiento analítico explícito.
- `lib/analytics.ts` usa `sendGAEvent("event", ...)` y descarta el envío si no existe consentimiento válido o `window.dataLayer` no está disponible.
- No se detectaron Google Tag Manager, `gtag` manual, Measurement Protocol, un segundo proveedor de analítica ni scripts alternativos.

### 3.2 Page views

**Estado: PARCIALMENTE VERIFICABLE.**

La aplicación incluye `GoogleAnalytics` de `@next/third-parties/google`, por lo que el comportamiento estándar de page view depende de esa integración. No hay un `page_view` manual ni un listener propio para cambios de ruta. La presencia del componente está confirmada en código, pero el envío real y la calidad de los datos deben validarse en GA4 DebugView y en una navegación entre rutas ES/EN/IT.

No hay una dimensión personalizada explícita para `page_language`, `page_section` o `content_group`. GA4 dispone de URL, título, idioma del navegador y dimensiones estándar, pero no conviene asumir que cubren exactamente las necesidades editoriales del proyecto.

### 3.3 Consentimiento y cookies

**Estado: IMPLEMENTADO con aspectos a verificar y mejorar.**

El consentimiento se guarda en `localStorage` bajo `julio_cabos_cookie_consent_v1`, con `analytics: true/false`, versión y timestamp. Las cookies necesarias se consideran siempre activas. Al rechazar o retirar consentimiento:

- se activa `ga-disable-{GA_ID}`;
- se intenta eliminar `_ga` y cookies `_ga_*` del dominio actual;
- `GoogleAnalytics` no se vuelve a renderizar si analytics no está aceptado;
- `trackAnalyticsEvent` no envía eventos.

No se ha encontrado una llamada explícita a Google Consent Mode (`gtag('consent', ...)`). Esto no demuestra por sí solo un incumplimiento, pero sí deja una decisión técnica pendiente: confirmar con la asesoría legal y la configuración de la CMP si se necesita Consent Mode para modelado, región o señales de Google.

### 3.4 Errores o huecos actuales

- No hay eventos de error de formularios.
- Los formularios registran inicio y éxito, pero no abandono, validación fallida ni respuesta HTTP fallida.
- Un clic de `mailto:` o de reserva demuestra intención, no que el usuario haya completado el envío en su cliente de correo.
- No se registra la salida a Miniature Coach.
- No hay captura propia de UTM ni persistencia de la primera fuente; GA4 puede atribuir sesiones/campañas, pero esto debe comprobarse en la propiedad.
- No hay eventos para filtros de Trayectoria ni clics en sus fuentes.
- No hay medición de lectura de artículos, profundidad de scroll o CTA de artículos.
- No hay un diccionario/tipado de parámetros que fuerce una convención común.

## 4. Inventario de eventos existentes

Actualmente hay **13 nombres de evento** declarados en `AnalyticsEventName`. Todos se envían mediante el mismo helper y, cuando se usan en componentes públicos, pasan por la protección de consentimiento.

| Evento actual | Dónde aparece | Parámetros observados | Valor de negocio | Evaluación |
|---|---|---|---|---|
| `clic_navegacion` | Header, navegación de galería y enlaces controlados | `destino`, `ubicacion`, `idioma` | Entender navegación interna y cambio de sección | Mantener, normalizar |
| `clic_llamada_accion` | Hero, Pathways, Galería y contacto email | `nombre_accion`, `destino`, `idioma`, a veces ubicación | Intención hacia formación, galería o contacto | Mantener como CTA genérico o migrar |
| `filtro_galeria` | Galería Home y completa | `nombre_filtro`, `idioma` | Interés por disponibilidad/categoría | Mantener, añadir contexto |
| `vista_obra` | Lightbox Home y Galería | `id_obra`, `ubicacion_galeria`, `filtro_activo`, `estado_venta`, `idioma` | Interés por una obra concreta | Mantener, normalizar nombres |
| `clic_consulta_obra` | CTA de consulta de obra | `id_obra`, `estado_venta`, `idioma` | Intención comercial sobre obra | Conversión micro |
| `vista_curso` | Apertura de cartel de curso | `id_curso`, `ubicacion`, `idioma` | Interés detallado por curso | Mantener |
| `clic_reserva_curso` | CTA de reserva | `id_curso`, `ubicacion`, `idioma` | Intención de reserva | Conversión micro |
| `inicio_formulario` | Consulta y lista de espera | `nombre_formulario`, `tipo_consulta`, `idioma` | Inicio de intención de contacto | Mantener, separar tipos |
| `envio_formulario` | Éxito de consulta y lista de espera | `nombre_formulario`, `tipo_consulta`, `nivel_experiencia`, `idioma` | Resultado de formulario | Candidato principal a key event |
| `clic_red_social` | Instagram y Facebook del footer | `red_social`, `ubicacion`, `idioma` | Salida a canales sociales | Mantener |
| `cambio_idioma` | Selector de idioma | `idioma_origen`, `idioma_destino`, `ubicacion` | Preferencia internacional | Mantener |
| `vista_publicacion` | Apertura de publicación de Biblioteca | `id_publicacion`, `seccion_biblioteca`, `idioma` | Interés editorial/comercial | Mantener |
| `clic_publicacion` | Compra, solicitud, enlace interno/externo | `id_publicacion`, `tipo_accion`, `idioma` | Interés por publicación o recurso | Mantener, separar acción/resultado |

### Observación de taxonomía

La taxonomía funciona, pero no es homogénea:

- eventos y parámetros están en español, mientras que la recomendación de GA4 para un equipo multilingüe es usar nombres estables independientes del idioma;
- `ubicacion`, `ubicacion_galeria`, `seccion_biblioteca` y `destino` expresan conceptos relacionados con estructuras diferentes;
- algunos valores son IDs estables (`id_obra`, `id_curso`) y otros son etiquetas editoriales cambiantes;
- no hay una dimensión común `page_section`, `source_page` o `component`;
- el clic de CTA agrupa acciones de naturaleza muy distinta.

No recomiendo duplicar cada evento actual con un nombre nuevo de inmediato. Conviene definir un modelo canónico, mantener un mapa temporal de compatibilidad y migrar por superficies.

## 5. Cobertura por área y flujo

### 5.1 Home

Cobertura actual:

- navegación desde Header;
- CTA principal/secundario del Hero;
- Pathways;
- Formación: vista de cartel, reserva, CTA presencial y Miniature Coach sin evento;
- apertura de obras de la galería Home;
- CTA hacia la galería completa;
- formularios de contacto y lista de espera;
- redes sociales en Footer.

Huecos:

- no se mide de forma específica la visibilidad de bloques;
- no se distinguen de forma común todos los CTAs de Home por sección;
- el clic de Miniature Coach no está instrumentado;
- los CTA de artículos de Biblioteca enlazados desde Formación no tienen un evento propio.

### 5.2 Formación

La implementación está en `components/TrainingSection.tsx`. La sección registra apertura del cartel (`vista_curso`), reserva (`clic_reserva_curso`) y CTA presencial (`clic_llamada_accion`). El curso online aparece como oferta no activa y no tiene un CTA operativo que medir.

El envío por `mailto:` debe interpretarse como `course_booking_click`, no como reserva confirmada. La confirmación real requeriría un sistema de reserva o una integración posterior.

### 5.3 Galería

La Galería registra filtros, apertura de obra, consulta de obra y navegación. Se distinguen Home y Galería completa mediante `ubicacion_galeria`. Es una cobertura sólida para un catálogo visual.

Mejoras posibles:

- normalizar categoría/filtro y ubicación;
- añadir `position` solo si se necesita evaluar orden de obras;
- distinguir `available`, `reserved` y `sold` como valores controlados;
- analizar el paso `view_item -> inquiry_click -> inquiry_submit_success` por `work_id`.

### 5.4 Biblioteca

La Biblioteca registra la apertura de publicaciones y las acciones de compra, solicitud, enlace interno y enlace externo. Esto cubre el inventario actual, incluyendo publicaciones comerciales y notas técnicas.

Huecos:

- no hay lectura/scroll del artículo `El color se construye por capas`;
- sus CTA hacia Formación y Contacto no usan una taxonomía propia de artículo;
- no se mide descarga o consumo de un recurso si en el futuro aparece un PDF descargable.

### 5.5 Trayectoria

La página tiene filtros por categoría y enlaces a fuentes externas o a contenidos relacionados. No se encontraron llamadas a `trackAnalyticsEvent` en su componente. Es la principal superficie editorial sin medición específica.

Propuesta P1: medir `trajectory_filter` y, si el análisis de fuentes aporta decisiones, `source_link_click`. No conviene registrar cada elemento visto automáticamente sin una pregunta de negocio clara.

### 5.6 Formularios y contacto

La consulta y la lista de espera registran foco inicial y envío correcto. El envío se realiza a `/api/inquiries`. El formulario de consulta clasifica tipos como encargo, colaboración, formación, curso o general.

Huecos:

- no se registra `form_error` con un mensaje técnico seguro y no sensible;
- no se registra abandono, aunque puede aproximarse con `form_start - form_submit_success`;
- no se mide el tiempo hasta completar;
- no se deben enviar nombres, email, mensajes ni otros datos personales a GA4.

### 5.7 Redes sociales y enlaces externos

En el contenido público inspeccionado se encontraron Instagram y Facebook en el Footer. No se encontraron enlaces públicos actuales a YouTube, Patreon o WhatsApp.

Los enlaces de cursos son principalmente `mailto:`. Estos clics se pueden medir, pero no la entrega del correo posterior. Para cualquier futuro canal externo, usar un evento común de salida con `link_domain`/`link_url` controlados y sin datos personales.

## 6. Miniature Coach

### Estado actual

- Aparece únicamente dentro del bloque de Formación de la Home, a través de `components/MiniatureCoachPromo.tsx`.
- No tiene página interna, ruta SEO, entrada de Biblioteca ni entrada de navegación.
- La URL se centraliza en `lib/miniature-coach.ts` y el componente la obtiene mediante `getMiniatureCoachUrl()`.
- El enlace usa `target="_blank"` y `rel="noopener noreferrer"`.
- No hay evento de analítica asociado al clic.

### Qué se puede medir

Se puede medir con fiabilidad:

- que el visitante hizo clic desde una página de juliocabos.es;
- idioma, página/sección de origen, dispositivo, sesión y campaña de adquisición disponibles en GA4;
- CTR del bloque si se incorpora una impresión controlada.

No se puede medir desde esta web:

- apertura efectiva de ChatGPT después de salir;
- autenticación del visitante;
- mensajes enviados al asistente;
- conversaciones, retención o resultados dentro de ChatGPT;
- atribución completa si el navegador bloquea el envío o el usuario abandona antes del evento.

### Evento recomendado

**Nombre:** `miniature_coach_click`
**Tipo:** outbound resource click.
**Prioridad:** P0.
**Key event:** no por defecto; es un evento estratégico de adopción, no una conversión comercial de Julio.

Parámetros recomendados:

| Parámetro | Valor ejemplo | Motivo |
|---|---|---|
| `resource_name` | `miniature_coach` | Identificador estable |
| `source_page` | `home` | Origen dentro del sitio |
| `source_section` | `training` | Bloque de Formación |
| `link_domain` | `chatgpt.com` | Dominio externo, sin depender de la URL completa |
| `language` | `es`, `en`, `it` | Comparación internacional |

No enviar la URL completa como parámetro si no hace falta: contiene un identificador de recurso que puede cambiar y no aporta más valor que el dominio/nombre estable. El evento debe dispararse tras la interacción del enlace, antes de que la pestaña actual pierda el foco.

La impresión del bloque (`miniature_coach_impression`) es opcional P2. Solo la recomendaría si se quiere calcular CTR real por visibilidad; debe dispararse una vez cuando el bloque entre razonablemente en viewport, no en cada render. Para el lanzamiento inicial es suficiente con clics y usuarios expuestos aproximados por page view.

## 7. Taxonomía recomendada

### 7.1 Convenciones

- Nombres de eventos en inglés, `snake_case`, minúsculas.
- Parámetros en inglés, `snake_case`.
- Valores enumerados estables y documentados.
- IDs de contenido, no títulos traducidos.
- No enviar PII: nombre, email, teléfono, mensaje, asunto completo ni contenido de formularios.
- Usar `source_page`, `source_section` y `language` cuando el contexto no pueda inferirse de forma fiable.
- Usar `link_domain` y un identificador de destino, no URL con tokens o datos personales.

### 7.2 Modelo canónico propuesto

| Evento canónico | Equivalente actual | Uso |
|---|---|---|
| `navigation_click` | `clic_navegacion` | Navegación interna |
| `cta_click` | `clic_llamada_accion` | CTA editorial o comercial genérico |
| `gallery_filter` | `filtro_galeria` | Filtro de galería |
| `work_view` | `vista_obra` | Apertura de obra |
| `work_inquiry_click` | `clic_consulta_obra` | Intención de consulta |
| `course_view` | `vista_curso` | Vista ampliada de curso |
| `course_booking_click` | `clic_reserva_curso` | Clic de reserva |
| `form_start` | `inicio_formulario` | Primer foco/interacción |
| `form_submit_success` | `envio_formulario` | Envío aceptado por backend |
| `social_click` | `clic_red_social` | Clic a una red social |
| `language_change` | `cambio_idioma` | Cambio de idioma |
| `publication_view` | `vista_publicacion` | Apertura de publicación |
| `publication_action_click` | `clic_publicacion` | Acción sobre publicación |
| `miniature_coach_click` | Nuevo | Salida a Miniature Coach |
| `trajectory_filter` | Nuevo | Filtro de Trayectoria, P1 |
| `source_link_click` | Nuevo | Fuente externa, P2 |
| `form_error` | Nuevo | Error recuperable de formulario, P2 |

La migración debe ser gradual. Durante una ventana de transición se puede mantener el nombre actual en el código mientras se define el diccionario, pero no recomiendo enviar el evento antiguo y el canónico simultáneamente sin una estrategia para evitar duplicados.

## 8. Conversiones, key events y embudos

### Conversiones recomendadas

Recomiendo empezar con **2 key events principales**:

1. `form_submit_success` con `form_type = inquiry`: consulta recibida correctamente. Es la conversión comercial principal.
2. `form_submit_success` con `form_type = waitlist`: alta en lista de espera. Es una conversión de captación; puede mantenerse como key event si la lista de espera tiene valor operativo.

Eventos de intención, no conversiones confirmadas:

- `course_booking_click`;
- `work_inquiry_click`;
- clic en email de contacto;
- `miniature_coach_click` como adopción externa, no como venta.

### Embudo 1 — Encargos y colaboraciones

`work_view` / `gallery_view` → `work_inquiry_click` → `form_start` → `form_submit_success` (`inquiry`).

Dimensiones: `work_id`, `work_status`, `language`, `source_page`, `source/medium/campaign`.

### Embudo 2 — Formación

`training_view` o page view de Home → `course_view` → `course_booking_click` → confirmación externa no medible.

La confirmación solo sería medible si se incorpora posteriormente una plataforma de reserva con callback, thank-you page o integración acordada.

### Embudo 3 — Lista de espera

page view Home → `form_start` (`waitlist`) → `form_submit_success` (`waitlist`).

### Embudo 4 — Miniature Coach

page view Home → bloque visible (opcional `miniature_coach_impression`) → `miniature_coach_click`.

El paso posterior ocurre fuera del control de juliocabos.es y no debe simularse como conversión completada.

## 9. Miniature Coach: medición y atribución

El clic puede analizarse por:

- `language` ES/EN/IT;
- `source_page = home` y `source_section = training`;
- sesión, dispositivo y país disponibles en GA4;
- fuente, medio y campaña de adquisición;
- landing page inicial y página previa si GA4 las conserva en la exploración.

No se debe intentar enviar eventos a ChatGPT desde la web de Julio ni añadir redirecciones internas para “confirmar” la apertura. Si en el futuro el complemento ofrece una URL propia con analítica autorizada, la URL se cambia únicamente en `lib/miniature-coach.ts` y se revisa el valor de `link_domain` si deja de ser `chatgpt.com`.

## 10. Convención UTM

### Reglas

- Todo en minúsculas.
- Sin tildes, espacios ni caracteres especiales.
- Usar `snake_case` en los valores para que sean legibles y consistentes.
- `utm_source`: plataforma o socio que origina la visita.
- `utm_medium`: canal estable.
- `utm_campaign`: iniciativa o periodo.
- `utm_content`: ubicación, formato o creatividad.
- `utm_term`: solo campañas de búsqueda pagada cuando exista keyword.

### Valores recomendados

| Parámetro | Ejemplos |
|---|---|
| `utm_source` | `instagram`, `facebook`, `youtube`, `patreon`, `google`, `partner_slug` |
| `utm_medium` | `social`, `video`, `email`, `referral`, `organic`, `paid_social`, `cpc` |
| `utm_campaign` | `miniature_coach_launch`, `veladuras`, `curso_octubre`, `nueva_obra`, `publicacion_historica` |
| `utm_content` | `bio`, `story_01`, `reel_01`, `post_feed`, `newsletter`, `partner_name` |

### Ejemplos

```text
https://www.juliocabos.es/?utm_source=instagram&utm_medium=social&utm_campaign=miniature_coach_launch&utm_content=bio
https://www.juliocabos.es/en?utm_source=youtube&utm_medium=video&utm_campaign=miniature_coach_launch&utm_content=description
https://www.juliocabos.es/?utm_source=partner_slug&utm_medium=referral&utm_campaign=curso_octubre&utm_content=sidebar
```

No se deben añadir UTMs a enlaces internos entre páginas. No se deben incorporar UTMs a la URL de destino de Miniature Coach salvo que exista una necesidad de atribución aceptada por el servicio externo; la atribución de adquisición de la visita se mantiene en GA4 en el sitio de Julio.

## 11. SEO, sitemap y Search Console

### Hallazgos

- Existe `app/robots.ts` con `allow: "/"`, host y sitemap.
- Existe `app/sitemap.ts` con Home ES/EN/IT, Galería, Biblioteca, nota técnica, Trayectoria y políticas de cookies.
- Las rutas públicas incluyen canonical y alternates `x-default`, `es`, `en` e `it` en los casos inspeccionados.
- No hay una página interna de Miniature Coach y no debe añadirse al sitemap.
- No se encontró una meta `google-site-verification`, configuración API de Search Console ni cliente de Search Console en el repositorio.
- La búsqueda de “verification” encontrada en contenidos de Trayectoria pertenece a estados editoriales y no a Google Search Console.

### Acción pendiente

Verificar manualmente en Search Console:

1. que la propiedad sea de dominio o URL-prefix correcta;
2. que `https://www.juliocabos.es/sitemap.xml` esté enviado y sin errores;
3. que las tres variantes de idioma estén descubiertas;
4. que canonical e idioma no tengan conflictos;
5. que las consultas orgánicas con intención de formación, encargos y publicaciones lleguen a las páginas adecuadas;
6. que no haya problemas de indexación, Core Web Vitals o páginas excluidas por canonical.

Esto no requiere una integración de Search Console en la aplicación.

## 12. Privacidad y consentimiento

### Lo que el código hace

- No renderiza GA4 en rutas admin.
- No carga GA4 antes del consentimiento analítico explícito según la lógica inspeccionada.
- Evita enviar eventos si el consentimiento no está aceptado.
- Intenta desactivar la medición y eliminar cookies al retirar consentimiento.
- Los eventos inspeccionados no incluyen campos de formulario ni PII.

### Riesgos o verificaciones recomendadas

- Probar con cookies/localStorage limpios en ES, EN e IT: aceptar, rechazar, cambiar decisión y recargar.
- Confirmar en DevTools que no hay requests a Google antes de aceptar.
- Confirmar que al retirar consentimiento no se generan nuevos hits y que las cookies se eliminan con el dominio/path adecuados.
- Confirmar si el responsable legal requiere Consent Mode, bloqueo regional u otra CMP.
- Revisar que la política de cookies refleje exactamente el comportamiento desplegado y el proveedor configurado.
- No enviar nunca datos introducidos en formularios a eventos, URLs, títulos o parámetros.

Este documento no constituye una certificación legal de cumplimiento RGPD/ePrivacy.

## 13. Plan de implementación recomendado

### P0 — Medición mínima y fiable

- Añadir `miniature_coach_click` al helper ya existente, sin cambiar el enlace ni la URL centralizada.
- Probar el evento con consentimiento aceptado y rechazarlo sin consentimiento.
- Verificar page views y eventos en GA4 DebugView y Realtime.
- Marcar únicamente los dos key events de formularios tras validar que representan resultados reales.

### P1 — Normalización y negocio

- Crear un diccionario de eventos y parámetros versionado junto al código.
- Introducir nombres canónicos por superficie, evitando duplicados.
- Añadir `source_page`, `source_section`, `language` y destino estable donde falten.
- Añadir `trajectory_filter` y, si se necesita, `source_link_click`.
- Añadir `form_error` sin incluir mensajes ni valores personales.

### P2 — Profundidad editorial

- Medir lectura de artículos o scroll solo con umbrales útiles para decisiones editoriales.
- Valorar impresión de Miniature Coach si se necesita CTR por visibilidad.
- Revisar búsquedas internas si el sitio incorpora un buscador real.

## 14. Propuesta de dashboard

Recomendación: GA4 conectado a Looker Studio, con Search Console como fuente separada o combinada solo donde tenga sentido.

### Página 1 — Resumen

- usuarios y sesiones;
- usuarios nuevos/recurrentes;
- adquisición por source/medium/campaign;
- idiomas;
- sesiones con interacción;
- los dos key events y su tasa.

### Página 2 — Contenido y recorrido

- páginas de entrada y salida;
- Home → Formación/Galería/Biblioteca/Trayectoria;
- vistas de obra por estado y categoría;
- publicaciones abiertas y acciones;
- cursos vistos y clics de reserva.

### Página 3 — Negocio

- consultas enviadas por tipo;
- lista de espera;
- inicio vs éxito de formularios;
- intención por obra y curso;
- canal de adquisición que produce consultas.

### Página 4 — Miniature Coach

- clics totales y usuarios;
- clics por idioma;
- clics por source/medium/campaign;
- CTR si posteriormente se implementa impresión;
- comparación con visitas a Home y Formación.

### Página 5 — SEO

- clics e impresiones por consulta;
- CTR y posición media;
- landing pages orgánicas;
- consultas de marca frente a intención formativa, artística o comercial;
- cobertura e indexación revisadas desde Search Console.

## 15. Tabla maestra de medición

| Superficie | Acción | Evento actual | Evento recomendado | Parámetros mínimos | Estado | Prioridad |
|---|---|---|---|---|---|---|
| Navegación | Abrir sección | `clic_navegacion` | `navigation_click` | `destination`, `location`, `language` | Implementado | P1 |
| Idioma | Cambiar idioma | `cambio_idioma` | `language_change` | `from_language`, `to_language`, `location` | Implementado | P1 |
| Hero/CTA | Pulsar CTA | `clic_llamada_accion` | `cta_click` | `cta_name`, `destination`, `source_section`, `language` | Implementado | P1 |
| Formación | Ver curso | `vista_curso` | `course_view` | `course_id`, `source_section`, `language` | Implementado | P1 |
| Formación | Intentar reservar | `clic_reserva_curso` | `course_booking_click` | `course_id`, `language` | Implementado | P1 |
| Formación | Abrir Miniature Coach | — | `miniature_coach_click` | `resource_name`, `source_page`, `source_section`, `link_domain`, `language` | Falta | P0 |
| Galería | Aplicar filtro | `filtro_galeria` | `gallery_filter` | `filter`, `location`, `language` | Implementado | P1 |
| Galería | Abrir obra | `vista_obra` | `work_view` | `work_id`, `work_status`, `location`, `language` | Implementado | P1 |
| Galería | Consultar obra | `clic_consulta_obra` | `work_inquiry_click` | `work_id`, `work_status`, `language` | Implementado | P0 |
| Biblioteca | Abrir publicación | `vista_publicacion` | `publication_view` | `publication_id`, `section`, `language` | Implementado | P1 |
| Biblioteca | Comprar/solicitar/abrir | `clic_publicacion` | `publication_action_click` | `publication_id`, `action`, `language` | Implementado | P1 |
| Trayectoria | Filtrar | — | `trajectory_filter` | `filter`, `language` | Falta | P1 |
| Trayectoria | Abrir fuente | — | `source_link_click` | `source_type`, `link_domain`, `language` | Falta | P2 |
| Artículo | Iniciar lectura | — | `article_view` o medición de engagement | `article_id`, `language` | Falta | P2 |
| Formularios | Primer foco | `inicio_formulario` | `form_start` | `form_type`, `inquiry_type`, `language` | Implementado | P1 |
| Formularios | Envío aceptado | `envio_formulario` | `form_submit_success` | `form_type`, `inquiry_type`, `language` | Implementado | P0 |
| Formularios | Error recuperable | — | `form_error` | `form_type`, `error_type`, `language` | Falta | P2 |
| Footer | Red social | `clic_red_social` | `social_click` | `network`, `location`, `language` | Implementado | P2 |

## 16. Decisiones técnicas

- **No se recomienda una nueva herramienta de analítica:** ya existe una integración GA4 funcional y con consentimiento.
- **No se recomienda GTM por ahora:** añadir otra capa aumentaría complejidad sin resolver los huecos prioritarios.
- **No se recomienda una redirección interna para Miniature Coach:** el enlace externo ya está centralizado y abre directamente el destino.
- **No se recomienda medir PII ni datos de formularios:** no aporta valor analítico proporcional al riesgo.
- **No se recomienda crear una página SEO de Miniature Coach:** es un recurso externo y la web debe medir el clic desde Home.
- **No se recomienda tratar `mailto:` como conversión confirmada:** debe clasificarse como intención.
- **No se recomienda duplicar todos los eventos actuales inmediatamente:** primero hay que acordar el diccionario y migrar por bloques.

## 17. Validación de este informe

- Se revisó el estado Git antes de crear este documento y no había cambios pendientes.
- No se modificaron componentes, rutas, estilos, traducciones, dependencias, `.env`, sitemap ni configuración de GA4.
- No se ejecutó lint ni build porque esta tarea es una auditoría documental y no introduce cambios de producción; ejecutarlos no aportaría una validación adicional del diagnóstico.
- El único archivo creado por esta auditoría es `ANALYTICS_AUDIT.md`.

## 18. Resultado final

- **GA4:** presente y condicionado por consentimiento; pendiente de verificación runtime en la propiedad correcta.
- **Eventos actuales:** 13 nombres declarados, con buena cobertura funcional pero taxonomía inconsistente.
- **Conversiones iniciales recomendadas:** 2 key events de formularios y varios microeventos de intención.
- **Miniature Coach:** falta únicamente un evento de clic de salida; no es medible su uso interno en ChatGPT desde juliocabos.es.
- **UTMs:** no hay un sistema implementado en código; se propone convención estable y ejemplos.
- **Search Console:** no hay verificación ni integración detectable en el repositorio; requiere comprobación en la cuenta.
- **Privacidad:** hay bloqueo por consentimiento y limpieza básica de cookies; falta validar comportamiento real y requisitos legales aplicables.
- **Implementación realizada:** ninguna. Este archivo es el entregable de auditoría.
