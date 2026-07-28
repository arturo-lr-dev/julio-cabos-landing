# Checklist de despliegue

## 1. Decidir la persistencia

Antes de elegir proveedor, resolver este punto:

- El panel escribe en `content/*.json`.
- Los uploads se guardan en `public/uploads`.
- Se usa `node:fs`, por lo que las rutas administrativas requieren runtime Node.js y disco escribible.

Opciones válidas:

1. Servidor/contendor con volumen persistente y copias de seguridad.
2. Migrar JSON a base de datos y uploads a almacenamiento de objetos.

No asumir que un despliegue serverless con filesystem efímero conservará los cambios. Vercel puede servir la parte pública, pero el panel actual requiere una migración de persistencia para operar con garantías.

## 2. Variables de entorno

```text
NEXT_PUBLIC_SITE_URL=https://dominio-real.example
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=
INQUIRIES_NOTIFICATION_EMAIL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=
ADMIN_ALLOWED_EMAILS=email1@example.com,email2@example.com
```

- No reutilizar secretos de desarrollo.
- Generar `AUTH_SECRET` largo y aleatorio.
- Configurar en Google OAuth el callback exacto: `https://dominio/api/auth/google/callback`.
- Limitar `ADMIN_ALLOWED_EMAILS` a administradores reales.
- El ID de Analytics puede omitirse si no se utiliza.

## 3. Contenido

- Hero, autoridad y CTAs confirmados.
- Español e inglés completos.
- Emails y redes definitivos.
- Biografía, cifras, publicaciones y CV verificados.
- Cursos con fechas, plazas, precio y enlace correctos.
- Obras publicadas y selección de home revisadas.
- Estados de venta y precios confirmados.
- Consultas de prueba retiradas o archivadas.

## 4. Imágenes

- Hero correcto en móvil y desktop.
- Trayectoria sin recortes problemáticos.
- Principales y detalles ordenados.
- Carteles legibles al ampliar.
- Sin banners, marcas o archivos enormes.
- Alt text revisado.
- Copia de seguridad de `public/uploads`.
- Open Graph actualizada.
- El PDF completo de *Madre Búho* no está versionado, desplegado ni accesible públicamente.

## 5. SEO e idiomas

Revisar:

- `app/layout.tsx` y metadata inglesa.
- `lib/schema.ts`.
- `app/sitemap.ts`.
- `app/robots.ts`.
- `app/manifest.ts`.
- Canonical y hreflang.
- `NEXT_PUBLIC_SITE_URL` sin slash inconsistente.
- `public/og-image.jpg`, iconos y favicon.
- Exclusión práctica de rutas administrativas de indexación si se añade cobertura SEO específica.

## 6. Formularios y correo

- Registro persistente de una consulta.
- Aparición inmediata en el panel.
- Aviso por Resend al destinatario final.
- Dominio y remitente verificados.
- Estados de éxito/error claros en ES y EN.
- Prueba con Resend desactivado.
- Política y retención de datos revisadas.
- Protección anti-spam antes de tráfico significativo.

## 7. Autenticación y panel

- Login con cada administrador permitido.
- Rechazo de una cuenta no permitida.
- Logout y caducidad de sesión.
- Protección de `/admin` y `/api/admin`.
- Crear, editar, ordenar y borrar una obra de prueba.
- Subir y ampliar una imagen.
- Crear/editar un curso y evento.
- Cambiar estado/notas de una consulta.
- Importar un candidato de Instagram.
- Confirmar que los cambios sobreviven reinicio y redeploy.

## 8. Calidad

```bash
npm run lint
npm run build
```

Después, probar la build de producción con `npm run start`.

Rutas mínimas:

- `/`, `/en`.
- `/galeria`, `/en/galeria`.
- `/biblioteca`, `/en/biblioteca`.
- `/politica-de-cookies`.
- `/admin` y todas sus subsecciones.
- APIs de consultas y administración.

Viewports mínimos: 320 px, móvil grande, tablet, 1440 px y pantalla panorámica.

## 9. Accesibilidad y rendimiento

- Navegación completa con teclado.
- Foco visible y orden lógico.
- H1 único y headings ordenados.
- Labels y mensajes de error asociados.
- Lightbox y modales cerrables con teclado.
- Contraste y movimiento reducido.
- Imágenes razonablemente optimizadas.
- Lighthouse como señal orientativa, no como sustituto de pruebas reales.

## 10. Operación posterior

- Copias automatizadas de JSON y uploads.
- Revisión periódica de consultas y errores.
- Monitorización de almacenamiento.
- Renovación de secretos si se exponen.
- Search Console y analítica, si se aprueban.
- Pruebas después de actualizar Next.js o React.
