# Administración y modelo de datos

## Acceso

El panel vive en `/admin`. La autenticación usa Google OAuth y solo acepta emails incluidos en `ADMIN_ALLOWED_EMAILS`.

Flujo:

1. `/admin/login` enlaza a `/api/auth/google/start`.
2. Se guarda un `state` temporal en cookie HTTP-only.
3. Google redirige a `/api/auth/google/callback`.
4. Se valida `state`, email verificado y lista permitida.
5. Se crea una cookie de sesión firmada con HMAC-SHA256 durante siete días.
6. `proxy.ts` valida la cookie antes de permitir panel o API administrativa.

En producción, `AUTH_SECRET` es obligatorio en la práctica. El fallback incluido es únicamente de desarrollo.

## Persistencia

| Archivo | Contenido |
| --- | --- |
| `content/works.json` | Obras, imágenes, publicación y venta |
| `content/courses.json` | Cursos, plazas, fechas y carteles |
| `content/calendar-events.json` | Eventos adicionales |
| `content/inquiries.json` | Consultas y seguimiento |
| `content/instagram-posts.json` | Candidatos de Instagram |

Las imágenes subidas se guardan bajo:

```text
public/uploads/works/<slug>/
public/uploads/courses/<slug>/
public/uploads/instagram/<id>/
```

No hay base de datos, almacenamiento remoto ni transacciones. Dos escrituras simultáneas sobre el mismo JSON pueden competir. Conviene limitar la edición a pocos administradores hasta migrar la persistencia.

## Obras

Una obra contiene título, slug, categoría, escala, marca, año, descripción, estado editorial, estado de venta, información comercial, selección de home e imágenes.

Estados editoriales:

- `draft`: borrador.
- `in-progress`: en preparación.
- `published`: visible públicamente.
- `hidden`: oculto.

Estados comerciales:

- `none`: solo galería.
- `for-sale`: disponible.
- `reserved`: reservada.
- `sold`: vendida.

Solo las obras publicadas alimentan la galería. `showOnHome` decide la selección destacada; el orden del JSON/panel influye en el orden público.

## Cursos y calendario

Los cursos admiten estado, ubicación, fechas, precio, plazas, nivel, materiales, descripción, URL de reserva y cartel. Solo `active` aparece en la home.

El calendario administrativo combina cursos con eventos adicionales. Los eventos pueden ser curso, feria, concurso, charla o recordatorio. Actualmente no existe una sección pública de calendario independiente.

## Consultas

Fuentes: encargo, colaboración, formación, curso, lista de espera o general.

Estados: nueva, leída, pendiente, respondida y archivada. Las notas internas no se muestran públicamente.

## Instagram

La integración actual no consulta automáticamente la API de Instagram. El administrador pega un permalink, texto e imágenes. El candidato puede ignorarse, restaurarse o importarse como obra; al importar, las imágenes se copian a la carpeta de obras.

## Límites y validación

Los límites de imágenes y obras están centralizados en `lib/work-options.ts`. Las reglas de negocio viven en `lib/services/`. No duplicar límites en componentes o documentación sin actualizar esa fuente.

## Operación segura

- Hacer copia de `content/` y `public/uploads/` antes de cambios masivos.
- No editar el mismo registro desde dos sesiones simultáneas.
- No borrar archivos manualmente sin revisar referencias JSON.
- Tratar los JSON como datos de producción, no como fixtures descartables.
- Tras una migración de datos, probar panel, home, galería y uploads.
