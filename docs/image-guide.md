# Guía de imágenes

## Principio central

Las imágenes son el activo principal. Deben tener espacio, contraste, nitidez y un recorte intencional. Una imagen mediocre o mal encuadrada perjudica más que un pequeño defecto de layout.

## Ubicaciones

| Ruta | Uso |
| --- | --- |
| `public/images/` | Imágenes curadas y estables de la interfaz |
| `public/images/gallery/` | Galería histórica optimizada |
| `public/uploads/works/` | Obras subidas desde el panel |
| `public/uploads/courses/` | Carteles de cursos |
| `public/uploads/instagram/` | Candidatos manuales de Instagram |
| `public/images/library/covers/` | Portadas públicas normalizadas de Biblioteca |
| `public/images/library/madre-buho/` | Portada y muestras derivadas del tutorial |
| `public/files/` | Originales, CV, PDFs y material fuente |

No todo el material de `public/files` está preparado para servirse directamente.

### Material privado de Biblioteca

El PDF completo de *Madre Búho* es material comercial privado. No debe copiarse a `public/`, enlazarse desde JSON ni incluirse en un despliegue. La web usa únicamente:

- `cover.webp`.
- `tree-detail.webp`.
- `eyes-detail.webp`.
- `final-detail.webp`.

Los recortes muestran la calidad y variedad del contenido sin publicar páginas completas o una secuencia reproducible del tutorial.

## Hero y trayectoria

El hero se define en `siteContent.hero.backgroundImage` y usa `next/image`, `fill`, carga prioritaria, máscaras, gradientes y un Ken Burns sutil. Revisar siempre:

- Móvil estrecho y móvil grande.
- Desktop panorámico.
- Posición del sujeto tras `object-cover`/`object-contain`.
- Legibilidad del texto.
- Peso del archivo y Largest Contentful Paint.

La trayectoria usa varias imágenes editoriales desde `siteContents.<locale>.ui.about.story`. Cada imagen necesita alt localizado y un papel narrativo real.

## Obras

Cada obra admite varias imágenes, limitadas por `MAX_IMAGES_PER_WORK`. Una imagen es `principal` y las demás `detalle`. La principal debe representar la pieza sin depender del lightbox.

Cada entrada guarda:

```ts
{
  src: string;
  alt: string;
  aspectRatio: "4/5" | "3/4" | "1/1" | "3/5";
  kind: "principal" | "detalle";
}
```

Elegir `aspectRatio` según composición; cambiar primero este metadato antes de introducir CSS específico.

## Uploads del panel

Los nombres se normalizan a slugs y los archivos se guardan en una carpeta por propietario. El sistema no transforma automáticamente el contenido a WebP: la extensión de fallback no convierte los bytes. Por tanto, optimizar el archivo antes de subirlo y no asumir que un JPG/PNG se convierte por cambiar el nombre.

Al reemplazar o borrar una entidad, comprobar si quedan archivos huérfanos. El flujo actual no documenta una limpieza automática completa de carpetas.

## Formatos y tamaños orientativos

- WebP o AVIF para activos preparados.
- JPG de alta calidad cuando la fotografía lo requiera.
- PNG solo para transparencia o gráficos que lo necesiten.
- Hero: 1800–2400 px de ancho.
- Obra: 1200–1800 px en el lado largo.
- Cartel: resolución suficiente para ampliar sin subir originales desmesurados.

Next.js negocia WebP/AVIF para imágenes procesadas, según `next.config.ts`, pero el original sigue ocupando almacenamiento y puede servirse directamente en ciertos contextos.

## Naming

Usar minúsculas, guiones y nombres descriptivos:

```text
samurai-heian.webp
samurai-heian-detalle-02.webp
curso-intensivo-madrid.jpg
```

Evitar espacios, nombres de cámara, “final”, “bueno” o sufijos ambiguos.

## Alt text

- Describir la pieza o la acción visible.
- Incluir autoría solo cuando aporte contexto.
- No usar “imagen de”.
- No repetir exactamente un caption adyacente si no aporta información.
- En imágenes puramente decorativas, valorar `alt=""`.

## No usar

- Banners o mensajes promocionales incrustados.
- Logos o marcas de agua agresivas.
- Fondos ruidosos que compitan con la figura.
- Recortes que eliminen partes significativas.
- Compresión visible.
- Imágenes extraídas de terceros sin permiso.

## Checklist

- Ruta válida y archivo versionado o persistido.
- Principal correcta y orden de detalles lógico.
- Alt y proporción revisados.
- Peso razonable.
- Home, galería y lightbox comprobados.
- Móvil y desktop comprobados.
- Sin archivos huérfanos ni referencias rotas.
