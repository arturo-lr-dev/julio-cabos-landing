# Biblioteca

## Concepto

Biblioteca no es una tienda ni un catálogo de venta. Es el archivo editorial del estudio de Julio Cabos: un recorrido por más de dos décadas compartiendo oficio y conocimiento mediante libros, manuales, guías, artículos y colaboraciones.

La home abre una puerta mediante un teaser visual. La experiencia completa vive en:

```text
/biblioteca
/en/biblioteca
```

## Capítulos

1. **Sobre la mesa**: publicación actual destacada. Ahora contiene *Colores Artísticos Densos*.
2. **Cuadernos de taller**: materiales didácticos propios o colecciones técnicas. Incluye *Madre Búho* y MiniPedia.
3. **Estantería principal**: publicaciones con autoría o contribución central documentada.
4. **Archivo editorial**: trabajos colectivos, artículos y participaciones históricas cuyo crédito específico puede seguir documentándose.

## Datos

Fuente:

```text
content/library-publications.json
```

Tipos y helpers:

```text
lib/library-types.ts
lib/library-content.ts
```

Campos importantes:

- `displaySection`: capítulo narrativo.
- `julioRole`: rol concreto cuando está documentado.
- `contribution`: explicación pública de la participación.
- `participationConfirmed`: confirmación de Julio.
- `creditStatus`: diferencia crédito documentado y función aún no precisada.
- `purchaseMode`: sin acción, enlace externo o solicitud directa.
- `sortOrder`: orden editorial estable.

No usar `featured` como sustituto de `displaySection` o `sortOrder`.

## Fichas

Cada portada abre una ficha accesible con:

- Portada.
- Título y subtítulo.
- Editorial.
- Tipo, año e idioma.
- Descripción.
- Participación de Julio.
- Temas.
- Enlace externo únicamente cuando existe.

La ausencia de enlace no implica que la publicación esté a la venta o agotada; la Biblioteca documenta trayectoria.

## Colores Artísticos Densos

Se enlaza a la página oficial de AK Interactive. El registro usa `externalUrls.es` y `externalUrls.en` para dirigir cada idioma a su edición correspondiente. No se replica el precio porque puede cambiar y la web de Julio no actúa como vendedor de esa publicación.

## Madre Búho

Datos públicos:

- Tutorial digital en PDF.
- Español.
- 32 páginas impresas distribuidas en 18 páginas PDF/pliegos.
- 15 €.
- Solicitud directa a Julio.

El CTA lleva al formulario de la home con tipo de consulta y mensaje preparados.

### Protección del contenido

- El PDF completo es una fuente privada.
- Su ruta está ignorada expresamente en `.gitignore`.
- Nunca debe copiarse a `public/`.
- El JSON no contiene una URL al PDF.
- No hay visor, descarga ni listado de páginas.
- Solo se publican portada y tres recortes de resolución moderada.

Si se cambian las muestras, elegir fragmentos no consecutivos y evitar instrucciones completas legibles.

## Analítica

Eventos añadidos:

- `vista_publicacion` al abrir una ficha.
- `clic_publicacion` para AK, solicitud directa y acciones desde ficha.

Como el resto de la analítica, solo se envían cuando existe consentimiento válido.

## Checklist al añadir una publicación

- Participación confirmada por Julio.
- Título, editorial e idioma revisados.
- Rol exacto solo si está documentado.
- Descripción en español e inglés.
- Portada optimizada en `public/images/library/covers/`.
- Alt derivado de título y editorial.
- Capítulo y `sortOrder` elegidos editorialmente.
- Acción externa únicamente si existe una fuente oficial.
- Modal comprobado en teclado y móvil.
