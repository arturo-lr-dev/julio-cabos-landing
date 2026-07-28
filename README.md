# Julio Cabos — web y portfolio

Web profesional de Julio Cabos: portfolio de pintura de miniaturas, formación, obras por encargo, colaboraciones y canal de contacto. Incluye home y galería bilingües, formularios, analítica consentida y un panel privado para gestionar contenido.

## Stack

- Next.js 16.2 con App Router y Turbopack.
- React 19 y TypeScript.
- Tailwind CSS 4.
- Resend para avisos de nuevas consultas.
- OAuth de Google para el acceso al panel.
- Persistencia actual en archivos JSON y uploads locales.

## Desarrollo local

Requisitos: Node.js LTS y npm.

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`. Si el puerto está ocupado, Next.js elegirá el siguiente disponible.

Comprobaciones:

```bash
npm run lint
npm run build
npm run start
```

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar lo necesario:

```text
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
RESEND_API_KEY=
INQUIRIES_NOTIFICATION_EMAIL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=
ADMIN_ALLOWED_EMAILS=
```

No versionar secretos. `AUTH_SECRET` debe ser largo y aleatorio en producción.

## Rutas principales

- `/` y `/en`: home pública.
- `/galeria` y `/en/galeria`: portfolio completo.
- `/politica-de-cookies`: política de cookies.
- `/admin`: panel privado.
- `/api/inquiries`: registro de consultas y lista de espera.

## Persistencia y despliegue

El panel modifica `content/*.json` y escribe imágenes en `public/uploads`. Por tanto, el despliegue debe ofrecer un sistema de archivos persistente y escribible, o el proyecto debe migrar esos datos a una base de datos y almacenamiento de objetos antes de usar una plataforma con filesystem efímero o de solo lectura.

La guía operativa completa está en [docs/README.md](docs/README.md).
