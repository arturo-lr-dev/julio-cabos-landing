# Image Guide

## Principio central

Las imágenes son el activo principal de la web. La interfaz debe darles espacio, contraste y calma.

Una imagen mediocre o mal recortada afecta más a esta web que un pequeño ajuste de layout.

## Carpetas

### Imágenes optimizadas para la web

```text
public/images/
```

Uso actual:

```text
public/images/hero.webp
public/images/about.webp
public/images/gallery/*.webp
```

Estas son las imágenes que usan los componentes.

### Material fuente

```text
public/files/
```

Contiene imágenes originales, PDFs, CV y material de trabajo. No todo lo que hay aquí debe mostrarse directamente en la web.

## Hero

Archivo actual:

```text
public/images/hero.webp
```

Referencia en:

```ts
siteContent.hero.backgroundImage
```

Requisitos:

- Imagen de alto impacto.
- Buen comportamiento en formato panorámico.
- Sujeto reconocible aunque haya overlay oscuro.
- Sin banners, textos, logos incrustados ni elementos promocionales.

Componente:

```text
components/HeroSection.tsx
```

El hero usa `object-cover`, así que la imagen puede recortarse según pantalla. Revisar siempre desktop y móvil.

## About

Archivo actual:

```text
public/images/about.webp
```

Referencia en:

```ts
siteContent.about.image
```

Debe presentar a Julio con autoridad y cercanía. Evitar imágenes excesivamente casuales o poco nítidas.

## Galería

Carpeta:

```text
public/images/gallery/
```

Datos:

```text
lib/data.ts
```

La galería usa `galleryImages`.

La home muestra las primeras 9 imágenes:

```ts
const INITIAL_COUNT = 9;
```

Por eso el orden de `galleryImages` define qué piezas tienen más visibilidad.

## Naming

Usar nombres simples, en minúsculas y sin espacios:

```text
samurai.webp
samurai-2.webp
templario.webp
templario-2.webp
```

Evitar:

```text
IMG_0698 final bueno.webp
foto nueva (1).webp
```

## Formato recomendado

- WebP para imágenes web.
- JPG/PNG originales pueden conservarse en `public/files/`.
- Evitar imágenes enormes en producción si no aportan detalle real.

Recomendaciones orientativas:

- Hero: 1800-2400 px de ancho.
- Galería: 1200-1800 px en el lado largo.
- Miniaturas muy verticales: cuidar que no pierdan detalle en móvil.

## `aspectRatio`

Cada imagen de galería define proporción:

```ts
aspectRatio: "4/5" | "3/4" | "1/1" | "3/5"
```

Elegir según la composición:

- `4/5`: figura vertical estándar.
- `3/4`: vertical algo más abierta.
- `3/5`: figura muy vertical.
- `1/1`: detalle o composición cuadrada.

Si la imagen queda con demasiado aire o demasiado apretada, probar otra proporción antes de tocar CSS.

## Alt text

El `alt` debe describir la imagen y ayudar al SEO:

```ts
alt: "Samurái - miniatura pintada por Julio Cabos"
```

Buenas prácticas:

- Nombrar la pieza.
- Indicar que es miniatura o figura pintada.
- Evitar frases genéricas como "imagen 1".

## Qué no usar

No subir imágenes con:

- Texto promocional incrustado.
- Banners de Patreon.
- Marcas de agua agresivas.
- Fondos con mucho ruido.
- Recortes que corten partes importantes de la pieza.
- Compresión visible.

## Checklist al cambiar imágenes

- La imagen existe en `public/images`.
- La ruta en `lib/data.ts` es correcta.
- El `alt` tiene sentido.
- El `aspectRatio` funciona.
- La home no pierde fuerza visual.
- `/galeria` carga bien.
- El lightbox muestra la imagen correctamente.
- Móvil y desktop se ven bien.
