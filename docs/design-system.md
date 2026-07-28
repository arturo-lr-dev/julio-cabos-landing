# Sistema de diseño

## Dirección visual

La web es un portfolio editorial oscuro: sobrio, táctil y espacioso. Debe recordar a un catálogo de arte y a un taller personal, no a un producto SaaS, una academia genérica o una interfaz de ecommerce.

Regla de decisión: si una decisión visual llama más la atención que la miniatura o el trabajo de Julio, está mal calibrada.

## Tokens

Los tokens vigentes viven en `app/globals.css`:

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

El dorado comunica foco y autoridad. No es un relleno decorativo ni debe dominar una pantalla.

## Tipografía

Configurada en `app/layout.tsx` con `next/font`:

- Display: Fraunces.
- Sans: Inter Tight.

Uso:

- `font-display`: titulares, cifras y nombres.
- `font-display-italic`: énfasis editorial controlado.
- Sans: cuerpo, navegación, labels, formularios y datos.
- `.eyebrow`: etiquetas breves en mayúsculas con tracking amplio.
- `.tnum`: índices y cifras tabulares.

Evitar fuentes de fantasía, demasiadas cursivas o titulares largos que pierdan fuerza en móvil.

## Layout

- Contenedor habitual: `max-w-6xl`.
- Secciones: `SectionWrapper`, con padding responsive y regla superior opcional.
- Composición frecuente: grid de 12 columnas.
- Mucho espacio negativo y alineaciones estables.
- Separadores finos antes que sombras o cajas.
- Cards solo para contenido que realmente necesita agrupación.

La home tiene un ritmo editorial. Una sección nueva debe aportar contraste de composición sin romper ese ritmo ni repetir exactamente la sección anterior.

## Componentes base

- `SectionWrapper`: geometría y separación.
- `SectionLabel`: índice y etiqueta tipo catálogo.
- `FadeIn`: entrada al viewport.
- `TrackedLink`: enlace con analítica.
- `Lightbox`: inspección de obra.

Reutilizarlos evita divergencias, pero no convertirlos en una obligación si la semántica de la sección pide otra solución.

## CTAs

- Acción primaria: fondo dorado, usada con moderación.
- Acción secundaria: borde fino o enlace editorial.
- Hover suave y foco visible.
- Área táctil mínima cómoda, normalmente `min-h-11` o `min-h-12`.
- Copy orientado a una acción real: aprender, reservar, consultar, encargar o colaborar.

No usar múltiples acciones primarias competidoras en el mismo bloque.

## Imágenes y tarjetas

Las imágenes pueden ocupar el fondo o protagonizar una columna. Overlays y gradientes solo sirven para asegurar legibilidad. El zoom en hover debe ser ligero.

Las tarjetas son aceptables para caminos, ofertas formativas, formularios y estados. Evitar cards anidadas, carruseles y rejillas corporativas de beneficios.

## Movimiento

Patrones vigentes:

- Fade-in al entrar en viewport.
- Entrada secuenciada del hero.
- Ken Burns lento en portada.
- Zoom ligero de imagen.
- Underline reveal en navegación.

Todo movimiento debe ser sutil, no bloquear interacción y respetar `prefers-reduced-motion`. No introducir sliders automáticos, scroll manipulado ni librerías pesadas para efectos simples.

## Responsive

Móvil es prioritario:

- Revisar desde 320 px.
- Evitar titulares huérfanos o desbordados.
- Convertir grids en una columna cuando sea necesario.
- Mantener acciones tocables y formularios cómodos.
- No depender del hover para información o acciones esenciales.
- Comprobar recortes de imagen en varios ratios.

## Accesibilidad

- Jerarquía de headings correcta y un `h1` por página.
- Contraste suficiente en texto secundario.
- Foco visible en todos los controles.
- Labels asociados a inputs.
- Botón para acciones; enlace para navegación.
- Alt text útil.
- Diálogos con nombre, cierre y navegación por teclado.
- Estados no comunicados solo mediante color.
- Movimiento reducido respetado.

## Evitar

- Gradientes llamativos o exceso de dorado.
- Iconos decorativos innecesarios.
- Bloques corporativos genéricos.
- Sombras y bordes gruesos sin función.
- Texto sobre imágenes sin contraste.
- Demasiadas animaciones.
- Sliders, marquees o scroll horizontal accidental.
