# Deployment Checklist

## Antes de publicar

### Contenido

- Revisar todos los textos visibles.
- Confirmar email de contacto.
- Confirmar enlaces de Instagram y Facebook.
- Revisar CTA principal.
- Revisar copy de formación presencial y online.
- Revisar biografía.
- Confirmar CV descargable.

### Imágenes

- Hero correcto en desktop.
- Hero correcto en móvil.
- Imagen de About correcta.
- Galería sin imágenes duplicadas innecesarias.
- Imágenes sin banners, overlays o marcas no deseadas.
- Alt text revisado.
- Lightbox probado.

### SEO

Revisar en:

```text
app/layout.tsx
lib/schema.ts
app/sitemap.ts
app/robots.ts
app/manifest.ts
```

Checklist:

- `title` definitivo.
- `description` definitiva.
- `NEXT_PUBLIC_SITE_URL` con dominio real.
- Open Graph image correcta.
- Favicon/iconos correctos.
- JSON-LD válido.
- Sitemap genera URLs correctas.
- Robots permite indexación.

### Formulario

- `RESEND_API_KEY` configurada.
- Dominio verificado en Resend si aplica.
- Destinatario final correcto.
- Remitente correcto.
- Prueba real de envío.
- Mensajes de éxito/error claros.

### Responsive

Probar al menos:

- Móvil estrecho.
- Móvil grande.
- Tablet.
- Desktop.

Rutas:

- `/`
- `/galeria`

### Performance

Comprobar:

- No hay imágenes enormes innecesarias.
- Hero carga rápido.
- Galería no bloquea interacción.
- No se han añadido librerías pesadas sin necesidad.

Objetivo orientativo:

- Lighthouse > 85.

### Accesibilidad básica

- H1 único por página.
- Contraste legible.
- Botones y enlaces con foco visible.
- Inputs con labels.
- Imágenes con alt.
- Navegación posible con teclado.

### Build

Ejecutar:

```bash
npm run lint
npm run build
```

No publicar si el build falla.

## Variables de entorno

Desarrollo:

```text
.env.local
```

Producción:

Configurar en Vercel o proveedor equivalente.

Variables:

```text
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

## Deploy recomendado

Vercel encaja bien con Next.js.

Pasos:

1. Conectar repositorio.
2. Configurar variables de entorno.
3. Deploy preview.
4. Revisar `/` y `/galeria`.
5. Probar formulario.
6. Configurar dominio.
7. Revisar metadata compartiendo URL en redes.

## Después de publicar

- Revisar Search Console si se configura.
- Verificar que el formulario sigue enviando.
- Revisar logs de errores.
- Comprobar que el dominio canónico es correcto.
- Pedir revisión visual en móvil real.
