# Guía de verificación manual de GA4 en producción

Esta guía verifica el comportamiento de la implementación de analítica de Fase 1. Comprueba eventos en la propiedad GA4 de producción; que el proyecto compile no demuestra que los hits estén llegando a GA4.

## Requisitos

- URL pública de producción de juliocabos.es.
- Acceso a la propiedad GA4 correcta.
- Acceso a **Informes → Tiempo real**.
- Acceso a **Administrador → DebugView**, si está disponible.
- Un navegador con DevTools.
- Ventana privada o almacenamiento del sitio limpio para repetir las pruebas.

Usar solo datos de prueba. No introducir nombres reales, emails personales, teléfonos ni mensajes sensibles.

## Qué observar

Para cada evento revisar:

- nombre exacto del evento;
- parámetros y valores;
- idioma de la ruta (`es`, `en`, `it`);
- timestamp y página de origen;
- que el evento aparece una sola vez cuando así se especifica.

En GA4, los parámetros personalizados pueden tardar en estar disponibles en informes estándar. Realtime y DebugView son las referencias inmediatas para esta comprobación.

## Revisión técnica opcional en DevTools

1. Abrir DevTools → **Network**.
2. Filtrar por `collect`, `google-analytics` o `gtag`.
3. Antes del consentimiento no debe aparecer un hit de GA4 producido por la web.
4. Después de aceptar, comprobar los requests de Google y revisar que no contienen PII.
5. En **Application → Local Storage**, revisar `julio_cabos_cookie_consent_v1`.
6. En **Console**, si el navegador lo permite, revisar `window.dataLayer` después de aceptar y realizar una acción.

No usar la pestaña Network como única prueba: un request bloqueado por navegador, extensión o red puede no reflejar el estado de la propiedad. Cruzar siempre con Realtime/DebugView.

## Caso 1 — Sin consentimiento

1. Abrir una ventana privada.
2. Borrar cookies y Local Storage de `www.juliocabos.es`.
3. Entrar en la Home ES.
4. No aceptar las cookies analíticas.
5. Navegar por Home, Formación, Galería y el artículo de Veladuras.
6. Comprobar en Realtime/DebugView que no llegan `page_view` ni eventos de esta sesión.
7. En Network, confirmar que no se realizan hits GA4 atribuibles a la navegación.

**Resultado esperado:** no se envían eventos mientras `analytics` no esté aceptado.

## Caso 2 — Aceptar analytics y comprobar page view

1. Repetir con cookies/localStorage limpios.
2. Aceptar las cookies analíticas.
3. Recargar la Home ES.
4. Abrir Realtime y localizar el dispositivo de prueba.
5. Confirmar un `page_view` de la Home.

**Resultado esperado:** GA4 se carga después del consentimiento y aparece el page view. El nombre y la frecuencia exacta dependen de la integración estándar de `@next/third-parties/google`; no debe haber duplicados evidentes.

## Caso 3 — Clic de Miniature Coach

1. Con analytics aceptado, abrir la Home ES.
2. Pulsar una vez el CTA de Miniature Coach.
3. Confirmar que se abre ChatGPT en una pestaña nueva.
4. En Realtime/DebugView localizar `miniature_coach_click`.
5. Comprobar:

```text
resource_name = miniature_coach
source_page = home
source_section = training
link_domain = chatgpt.com
language = es
```

6. Repetir en `/en` y `/it` y comprobar `language = en` e `language = it`.
7. Confirmar que no aparece `miniature_coach_impression`.
8. Confirmar que el evento no está marcado como key event/conversión.

## Caso 4 — Apertura del artículo de Veladuras

1. Con analytics aceptado, abrir:

```text
/biblioteca/cuadernos/el-color-se-construye-por-capas
```

2. Confirmar en Realtime/DebugView un único `article_view`.
3. Comprobar:

```text
article_id = el-color-se-construye-por-capas
language = es
source_page = library | home | ausente si no se puede determinar
```

4. Recargar y confirmar que la nueva carga produce su propio `article_view`, pero no duplicados por re-render del componente.
5. Repetir en:

```text
/en/biblioteca/cuadernos/el-color-se-construye-por-capas
/it/biblioteca/cuadernos/el-color-se-construye-por-capas
```

## Caso 5 — Lectura significativa al 75%

1. Abrir el artículo desde el principio con analytics aceptado.
2. Confirmar que al cargar no aparece `article_read` solo porque el contenido sea corto o el marcador sea inicialmente visible.
3. Desplazarse por el contenido principal hasta aproximadamente el 75%, incluyendo el cuerpo y las imágenes.
4. Confirmar un único evento:

```text
article_read
article_id = el-color-se-construye-por-capas
language = es
read_threshold = 75
```

5. Continuar hasta el final y comprobar que no se vuelve a enviar.
6. Volver arriba y bajar de nuevo: debe seguir existiendo como máximo un evento en esa visualización.
7. Repetir en desktop, tablet y móvil.

La implementación usa un `IntersectionObserver` sobre un marcador situado después del contenido principal y exige que haya comenzado el scroll. El observer se desconecta tras el primer envío y se limpia al desmontar el componente.

## Caso 6 — CTA desde el artículo

El artículo tiene dos CTA reales.

### Formación

1. Abrir el artículo.
2. Pulsar **Ver próximos cursos / View upcoming courses / Vedi i prossimi corsi**.
3. Confirmar `article_cta_click` con:

```text
article_id = el-color-se-construye-por-capas
cta_destination = training
source_section = article
language = es | en | it
```

### Contacto

1. Volver a abrir el artículo.
2. Pulsar **Consultar formación con Julio / Ask Julio about training / Chiedi a Julio informazioni sulla formazione**.
3. Confirmar `article_cta_click` con `cta_destination = contact` y el resto de parámetros anteriores.

No deben existir eventos para botones o enlaces que no estén presentes en el artículo.

## Caso 7 — Consulta (`inquiry`) correcta

1. Abrir el formulario de contacto.
2. Introducir datos sintéticos válidos.
3. Seleccionar cualquier tipo de consulta permitido.
4. Enviar.
5. Esperar una respuesta HTTP correcta del endpoint `/api/inquiries` y el estado de éxito de la interfaz.
6. Confirmar un único evento:

```text
envio_formulario
nombre_formulario = consulta
tipo_consulta = commission | collaboration | training | course | general
idioma = es | en | it
```

La condición que se utilizará posteriormente en GA4 para el key event es:

```text
event_name = envio_formulario
AND nombre_formulario = consulta
```

El evento se ejecuta después de `response.ok` en `InquiryForm`; no se envía al pulsar el botón.

## Caso 8 — Lista de espera (`waitlist`) correcta

1. Abrir la sección de lista de espera.
2. Introducir datos sintéticos válidos.
3. Enviar.
4. Esperar la respuesta correcta del endpoint y el estado de éxito.
5. Confirmar un único evento:

```text
envio_formulario
nombre_formulario = lista_espera
nivel_experiencia = valor_controlado_o_no_seleccionado
idioma = es | en | it
```

La condición que se utilizará posteriormente en GA4 para el key event es:

```text
event_name = envio_formulario
AND nombre_formulario = lista_espera
```

El evento se ejecuta después de `res.ok` en `WaitlistSection`; no se envía al pulsar el botón.

## Caso 9 — Error de formulario

1. Con DevTools, simular una respuesta HTTP de error o usar datos que fallen una validación real.
2. Enviar el formulario.
3. Confirmar que la interfaz muestra error y no éxito.
4. Confirmar en Realtime/DebugView que no aparece `envio_formulario`.
5. Si el navegador conserva el request, comprobar que el hit GA4 no contiene nombre, email, teléfono, mensaje ni ningún otro dato personal.

No se implementa `form_error` en esta fase; solo se verifica que un error no se contabiliza como envío correcto.

## Caso 10 — Idiomas ES → EN → IT

1. Aceptar analytics en una sesión limpia.
2. En ES, abrir Miniature Coach y el artículo; anotar `language = es`.
3. Cambiar a EN y repetir; confirmar `language = en`.
4. Cambiar a IT y repetir; confirmar `language = it`.
5. Comprobar también el `article_cta_click` en los tres idiomas.

## Comprobación de consentimiento al retirar permiso

1. Con analytics aceptado, realizar una acción y confirmar que se registra.
2. Abrir el panel de preferencias de cookies.
3. Desactivar analytics y guardar.
4. Navegar y pulsar Miniature Coach o un CTA del artículo.
5. Confirmar que no aparecen nuevos eventos.
6. Revisar que la aplicación conserva el consentimiento con `analytics: false` y que intenta eliminar cookies `_ga`/`_ga_*`.

## Qué está implementado frente a qué está verificado

### Implementado en código

- `miniature_coach_click` con los cinco parámetros requeridos.
- `article_view` con identificador estable y soporte ES/EN/IT.
- `article_read` una vez por visualización, mediante `IntersectionObserver` y marcador posterior al contenido principal.
- `article_cta_click` para los destinos reales `training` y `contact`.
- Los dos `envio_formulario` actuales se ejecutan después de una respuesta HTTP correcta y distinguen consulta de lista de espera.
- Todos los eventos nuevos pasan por `trackAnalyticsEvent`.

### Solo verificable en GA4 de producción

- Que el Measurement ID de producción sea la propiedad esperada.
- Que los hits lleguen a la propiedad correcta.
- Que page views no estén duplicados.
- Que Realtime y DebugView muestren exactamente los parámetros.
- Que el bloqueo de consentimiento funcione también frente a extensiones, navegadores y configuraciones regionales reales.
- Que la atribución UTM aparezca con source/medium/campaign esperados.

## Limitaciones conocidas

- `article_read` mide llegada al marcador después del contenido y scroll iniciado; no demuestra que cada párrafo haya sido leído.
- `source_page` de `article_view` solo se envía cuando el referrer interno permite clasificarlo como `home` o `library`; en otros casos se omite.
- Un clic en `mailto:` o una apertura de ChatGPT no confirma que el usuario haya completado la acción externa.
- Los nombres actuales `envio_formulario`, `nombre_formulario` y `tipo_consulta` se mantienen por compatibilidad; la migración general queda fuera de esta fase.

## Instrumentar un nuevo artículo en el futuro

La medición editorial está encapsulada en `hooks/useArticleAnalytics.ts`. Un nuevo artículo no debe copiar efectos ni llamadas directas a `trackAnalyticsEvent`.

1. Crear el registro del artículo en `content/library-publications.json` con un `id` estable, independiente del idioma y del título visible. Ese `id` es el valor de `article_id`.
2. En la ruta de cada idioma, obtener el registro de Biblioteca y pasar su `id` a `JulioNoteDetail` o al componente editorial equivalente, junto con `locale`.
3. Obtener `articleReadMarkerRef` del hook `useArticleAnalytics({ articleId, locale })`.
4. Colocar `ref={articleReadMarkerRef}` en un marcador editorial situado aproximadamente tras el 75 % del contenido principal. El porcentaje es una convención aproximada, no un cálculo matemático del documento.
5. Para cada CTA real del artículo, llamar a `trackArticleCta("destino_estable")` en su `onClick`. Usar únicamente destinos que existan en ese artículo, por ejemplo `training` o `contact`.

El hook obtiene automáticamente `article_view` al visualizar el artículo y `article_read` una vez al alcanzar el marcador después de iniciar el scroll. También conserva el consentimiento actual, limpia el `IntersectionObserver` y evita duplicados por artículo e idioma. Los CTA se registran como `article_cta_click` con el `articleId` y el destino proporcionados por el artículo.
