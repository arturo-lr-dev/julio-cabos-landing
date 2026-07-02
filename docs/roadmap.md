# Roadmap

## Fase actual: MVP

Objetivo:

- Home completa.
- Galería funcional.
- Contacto.
- Lista de espera.
- Base técnica limpia.

Estado:

- Implementado en gran parte.
- Pendiente de revisión visual final y checklist de producción.

## Fase 1: Publicación

Prioridad alta:

- Confirmar dominio.
- Configurar `NEXT_PUBLIC_SITE_URL`.
- Configurar Resend.
- Cambiar destinatario final de waitlist.
- Revisar Open Graph.
- Ejecutar `npm run lint`.
- Ejecutar `npm run build`.
- Revisar responsive real.

Resultado esperado:

- Web pública estable.
- Contacto y formulario funcionando.

## Fase 2: Contenido y portfolio

Objetivo:

- Convertir la galería en un portfolio más curado.

Posibles mejoras:

- Fichas por pieza.
- Agrupar por series.
- Añadir año, escala, marca o técnica.
- Mejorar captions.
- Seleccionar menos imágenes pero más potentes en home.
- Añadir publicaciones o premios si aportan autoridad.

Precaución:

- No convertir la galería en un catálogo pesado.

## Fase 3: Formación

Objetivo:

- Pasar de sección informativa a producto formativo.

Posibles rutas:

```text
/formacion
/cursos
```

Contenido posible:

- Cursos presenciales.
- Programa online.
- Niveles.
- Metodología.
- Fechas.
- Plazas.
- Precio.
- Preguntas frecuentes.

Decisión pendiente:

- Si la inscripción se gestionará por email, formulario, Stripe o plataforma externa.

## Fase 4: Comunidad / Patreon

Objetivo:

- Integrar una comunidad o producto recurrente si existe.

Posibles rutas:

```text
/patreon
/comunidad
```

Precaución:

- No añadir Patreon como banner invasivo.
- Mantener el tono de taller/portfolio.
- Integrarlo solo cuando haya propuesta clara.

## Fase 5: CMS

El briefing original menciona Sanity, Contentful o Strapi.

Ahora mismo no hay CMS. El contenido vive en código, principalmente en `lib/data.ts`.

Cuándo merece la pena añadir CMS:

- Julio o el equipo necesitan editar contenido sin tocar código.
- La galería crece mucho.
- Hay posts, cursos o eventos frecuentes.
- Se necesita publicar contenido con calendario.

Cuándo no merece la pena:

- La web cambia poco.
- Solo hay una landing y una galería.
- El coste de mantenimiento del CMS supera el beneficio.

## Fase 6: Pagos y cursos

Opciones:

- Stripe Checkout.
- Plataforma externa de cursos.
- Área privada propia.
- Descargas digitales.

Decisiones necesarias:

- Tipo de producto.
- Precio.
- Acceso.
- Soporte.
- Facturación.
- Política de reembolsos.

No implementar pagos hasta tener claro el flujo de negocio.

## Ideas futuras con IA

El briefing menciona:

- Auto-tagging de imágenes.
- Descripciones automáticas.
- SEO automático.
- Chatbot básico.

Prioridad recomendada:

1. Descripciones asistidas para galería.
2. SEO para piezas y cursos.
3. Auto-tagging si la galería crece mucho.
4. Chatbot solo si hay suficiente contenido y preguntas frecuentes.

## Principio para futuras fases

Cada nueva función debe reforzar una de estas tres cosas:

- Mostrar mejor la obra.
- Facilitar aprender con Julio.
- Facilitar contactar o contratar.

Si no cumple ninguna, probablemente sobra.
