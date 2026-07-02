# Content Guide

## Dónde se cambia el contenido

El archivo principal para textos, enlaces y datos visibles es:

```text
lib/data.ts
```

Antes de editar un componente, revisar si el texto ya está centralizado ahí.

## `siteContent`

`siteContent` agrupa el contenido de las secciones principales.

### Hero

```ts
siteContent.hero
```

Campos:

- `title`: nombre principal.
- `subtitle`: frase de posicionamiento.
- `description`: descripción breve.
- `cta`: texto del CTA.
- `ctaHref`: destino del CTA.
- `backgroundImage`: imagen de fondo.

Criterio editorial:

- Título corto.
- Subtítulo con autoridad, no promocional.
- Descripción de una o dos líneas.
- CTA orientado a acción clara.

### Mensaje

```ts
siteContent.message.text
```

Es el bloque conceptual de la web. Debe explicar la mirada de Julio sobre la pintura.

Mantenerlo breve. Si se vuelve largo, pierde fuerza.

### Formación

```ts
siteContent.training
```

Campos principales:

- `title`
- `text`
- `primaryCta`
- `primaryHref`
- `secondaryCta`
- `secondaryHref`

Estado actual:

- Presencial: activo.
- Online: próximamente.

Cuando exista una página específica de cursos, cambiar `primaryHref` o `secondaryHref` a la ruta correspondiente.

### Sobre Julio

```ts
siteContent.about
```

Incluye imagen, texto biográfico y enlace al CV.

Criterio:

- Priorizar trayectoria relevante.
- No convertirlo en currículum completo.
- El CV completo debe vivir como archivo descargable.

### Contacto

```ts
siteContent.contact
```

Incluye título, texto, email y CTA.

Email actual:

```text
Juliocabosg@gmail.com
```

Si se cambia el email visible, revisar también:

- `app/api/waitlist/route.ts`
- proveedor de email
- configuración de dominio

### Footer

```ts
siteContent.footer
```

Incluye nombre y redes sociales.

Revisar que los enlaces sean definitivos antes de publicar.

## Galería

La galería se define en:

```ts
galleryImages
```

Cada imagen tiene:

```ts
{
  src: "/images/gallery/samurai.webp",
  alt: "Samurái - miniatura pintada por Julio Cabos",
  category: "box-art",
  aspectRatio: "4/5",
  series: "samurai"
}
```

Campos:

- `src`: ruta pública de la imagen.
- `alt`: texto alternativo y base para caption.
- `category`: filtro de galería.
- `aspectRatio`: proporción visual del contenedor.
- `series`: agrupación opcional por pieza.

Categorías actuales:

- `box-art`
- `encargo`
- `detalle`
- `coleccion`

Etiquetas visibles:

```ts
categoryLabels
```

## Cómo añadir una imagen a la galería

1. Optimizar la imagen y guardarla en `public/images/gallery/`.
2. Añadir una entrada en `galleryImages`.
3. Escribir un `alt` descriptivo.
4. Asignar una categoría existente.
5. Elegir `aspectRatio`.
6. Revisar la home y `/galeria`.

La home muestra solo las primeras imágenes de `galleryImages`, así que el orden importa.

## Textos hardcodeados

Algunos textos siguen viviendo dentro de componentes porque son específicos de layout o estado:

- `TrainingSection.tsx`: descripciones internas de presencial/online.
- `WaitlistSection.tsx`: labels, mensajes del formulario y estados.
- `app/galeria/page.tsx`: copy de cabecera y filtros.

Si esos textos empiezan a cambiar con frecuencia, moverlos a `lib/data.ts`.

## Tono de voz

La web debe sonar:

- Clara.
- Sobria.
- Artística.
- Profesional.
- Cercana, pero no comercial agresiva.

Evitar:

- Frases de academia genérica.
- Promesas exageradas.
- Mucho texto explicativo.
- Copy tipo marketing corporativo.

Mejor:

- "Aprender a ver".
- "Pintar con criterio".
- "Entender luz, volumen y decisiones".

## Revisión antes de publicar contenido

- Comprobar acentos y caracteres especiales.
- Revisar enlaces.
- Confirmar emails.
- Revisar alt text.
- Revisar que los CTAs lleven a secciones existentes.
- Verificar que el contenido no rompe layout en móvil.
