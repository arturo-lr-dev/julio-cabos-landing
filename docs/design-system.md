# Design System

## Dirección visual

La web debe sentirse como un portfolio editorial oscuro:

- Fondo profundo.
- Tipografía limpia.
- Mucho aire.
- Imágenes grandes.
- Interacciones sutiles.
- Sensación de taller personal, no academia.

El diseño no debe competir con las miniaturas.

## Tokens principales

Los colores viven en:

```text
app/globals.css
```

Variables actuales:

```css
--background: #0a0a0a;
--background-elevated: #131211;
--surface: #161513;
--foreground: #f0ece4;
--foreground-muted: #8a857d;
--foreground-faint: #4a4842;
--accent: #c9a668;
--accent-hover: #b8945a;
--rule: rgba(240, 236, 228, 0.08);
--rule-strong: rgba(240, 236, 228, 0.16);
```

Regla: el dorado es acento, no color dominante.

## Tipografía

Fuentes configuradas en:

```text
app/layout.tsx
```

Actual:

- Display: `Fraunces`
- Sans: `Inter Tight`

Uso:

- `font-display`: grandes titulares, nombres y frases editoriales.
- `font-display-italic`: énfasis artístico controlado.
- Sans: cuerpo, navegación, labels y formularios.

Evitar fuentes decorativas o fantasía. La miniatura ya aporta carácter visual.

## Layout

Criterios:

- Secciones amplias.
- Márgenes generosos.
- Grids simples.
- Separadores finos.
- Pocas cajas visuales.

`SectionWrapper` debe seguir siendo la base de secciones para mantener consistencia.

## Componentes visuales

### Labels

`SectionLabel` usa numeración y etiqueta corta. Refuerza la sensación editorial.

Mantener labels breves:

- `Galería`
- `Formación`
- `Contacto`

### Botones y enlaces

Los CTAs actuales son discretos, con líneas y hover suave. Mantener esa línea antes que botones grandes tipo SaaS.

Botones sólidos solo cuando la acción lo necesita, como el formulario de lista de espera.

### Cards

Usarlas con moderación. Esta web no debe convertirse en una colección de tarjetas.

Casos aceptables:

- Formulario.
- Bloques de oferta formativa.
- Estados de éxito/error.

## Animación

Animaciones actuales:

- Fade-in en scroll.
- Ken Burns en hero.
- Hover suave en galería.
- Underline reveal en navegación.

Reglas:

- Nada de animaciones pesadas.
- Nada de sliders innecesarios.
- Nada de scroll raro.
- Respetar `prefers-reduced-motion`.

## Galería

La galería debe priorizar inspección visual:

- Fondo sobrio.
- Imagen limpia.
- Hover ligero.
- Sin texto encima por defecto.
- Lightbox para ver detalle.

El overlay en hover debe ayudar, no tapar.

## Responsive

Móvil es prioritario.

Revisar:

- Hero no corta de forma absurda la miniatura.
- Titulares no pisan contenido.
- Botones son tocables.
- Galería pasa a 1 columna.
- Formularios son cómodos.
- Textos no se vuelven demasiado largos.

## Qué evitar

- Bloques corporativos genéricos.
- Iconos decorativos innecesarios.
- Gradientes llamativos.
- Demasiado dorado.
- Demasiadas animaciones.
- Texto largo sin respiración.
- Cards anidadas.
- Sliders automáticos.

## Regla de decisión

Si una decisión visual llama más la atención que la miniatura, probablemente está mal calibrada.
