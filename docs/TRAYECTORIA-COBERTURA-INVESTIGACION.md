# Cobertura de la investigación — Trayectoria

Fecha de revisión: 22 de septiembre de 2026

## Archivo analizado

Se han leído las 13 hojas completas de `docs/archivo_julio_cabos_auditoria_previa.xlsx`:

1. Archivo verificado — 50 registros
2. Arquitectura propuesta — 10 filas de planificación
3. Backlog previo — 10 filas de planificación
4. Modelo de dato — 14 filas de especificación
5. Investigación ampliada — 22 referencias
6. Huecos por investigar — 8 líneas pendientes
7. Pasada Euromodelismo-Andrea — 15 referencias
8. Control de fuentes — 9 reglas/valoraciones de fiabilidad
9. Barrido histórico II — 13 referencias
10. Orígenes 1990-2005 — 8 referencias
11. Cierre tramo antiguo — 8 referencias
12. Cronología consolidada — 10 filas de síntesis
13. PARA JULIO - Cronología — 57 registros editoriales propuestos

El libro contiene 234 filas de datos, sin contar encabezados. 200 corresponden a investigación, cronologías, referencias o huecos; 34 corresponden a arquitectura, backlog, modelo de datos y control editorial. El XLSX no se lee en runtime.

## Resultado editorial

- Dataset final: 71 hitos.
- La base conserva las 22 entradas iniciales y añade registros documentales individuales, especialmente cursos, publicaciones, box arts, obras, premios y testimonios.
- Los cinco box arts de 2013 permanecen como cinco registros, aunque comparten `groupKey` para poder mostrarse de forma compacta.
- La interfaz usa `displayLevel`: 15 `featured`, 37 `standard` y 19 `reference`.

### Categorías finales

- Publicaciones: 21
- Formación: 17
- Premios y reconocimientos: 9
- Etapas profesionales: 4
- Obra: 5
- Legado: 5
- Eventos: 4
- Colaboraciones: 2
- Prensa / entrevistas: 4

## Fuentes y trazabilidad

Se han incorporado 46 URLs únicas de procedencia en el dataset, además de referencias nominales sin URL disponible. El modelo admite `sources[]` para conservar más de una fuente por hito y registra tipo de fuente, prioridad, confianza, relación, notas editoriales y destino futuro.

Se ha respetado especialmente el control de fuentes:

- Ministerio de Defensa, Ejército, AMT y fuentes institucionales: prioridad máxima.
- Entrevista directa de Figure Painter Magazine: fuente primaria para biografía.
- Andrea World / Andrea Press y EuroModelismo: fuentes primarias/editoriales para cursos, publicaciones y créditos.
- Blogs, foros y plataformas: conservados como apoyo, recepción o testimonio, sin elevarlos automáticamente a cargo o biografía definitiva.
- La biografía general de Miniature Art Academy queda excluida; solo se conservan los dos cursos expresamente atribuidos a Julio.

## Consolidaciones y duplicados

- Se evitan dos duplicados técnicos al combinar la base anterior con el archivo ampliado: `dallas-2012` y `amt-honorary-2015`.
- Las repeticiones de Dallas, Andrea/Grex, Hussar, Figure International, premios y box arts entre hojas se tratan como distintas fuentes del mismo acontecimiento cuando el contenido coincide.
- Cuando el registro aporta información diferente —por ejemplo, un curso de un año distinto, un box art distinto o un testimonio independiente— se conserva como hito separado.
- El workshop de Dallas de 2012 conserva dos procedencias relevantes dentro de `sources[]`.

## Registros no publicados como afirmación independiente

- Las hojas de arquitectura, backlog, modelo de dato, control de fuentes y huecos de investigación no se convierten en hitos públicos.
- La biografía incompatible de Miniature Art Academy no se incorpora.
- Las etapas profesionales de Andrea Miniatures y Scale75 se publican como hitos principales a partir de la documentación primaria disponible; las entradas editoriales previas se conservan como referencias secundarias, sin presentarlas como una fuente independiente adicional.
- Los huecos de investigación —Euromodelismo, Figure International completa, box arts históricos de Andrea, Scale75 2014–2022 y cursos anteriores— se conservan como backlog documental, no como hechos inventados.
- No se descargan ni publican imágenes de terceros; los registros de obra mantienen relaciones y procedencia textual.

## Fechas, contradicciones y estados internos

No se ha encontrado una contradicción dura que obligue a escoger arbitrariamente entre dos hechos incompatibles. Sí existen zonas de cautela:

- comienzo profesional y primeras clases: alrededor de 1990;
- fecha comercial de `How to Paint Figures with Acrylics`: 1999, conservada como aproximada;
- etapa Scale75: documentada como etapa profesional y dirección del Departamento de Pintura según la documentación primaria incorporada;
- referencias de fuente secundaria para algunas publicaciones y box arts.

Los estados `verificationStatus`, `confidence` y `editorialNotes` se conservan en el modelo, pero no se muestran como etiquetas de trabajo al visitante. La interfaz utiliza fechas públicas prudentes como “Primeros años”, “Alrededor de 2014” o “Archivo editorial”.

## Relaciones preparadas

Las cuatro etapas profesionales incorporadas como hitos principales son: Acción Press (1989–2001), Andrea Miniatures (2001–2015), Scale75 (2015–2024) y actividad freelance (desde 2024). Las referencias anteriores de Andrea y Scale75 quedan subordinadas visualmente como evidencia editorial.

- Biblioteca: relaciones `relatedPublication` para publicaciones y artículos documentales; los enlaces apuntan por ahora a la Biblioteca general.
- Galería: relaciones `relatedWork` para premios, box arts y obras documentadas; no se ha modificado la Galería.
- Formación: relaciones `relatedTraining` para workshops, cursos, demostraciones y formación online; no se ha modificado Formación.

## Archivos de implementación

- `lib/trajectory-types.ts`: modelo ampliado.
- `lib/trajectory-content.ts`: dataset anterior conservado y normalizado.
- `lib/trajectory-expanded-content.ts`: registros documentales adicionales derivados del archivo maestro.
- `components/TrajectoryPageClient.tsx`: jerarquía featured/standard/reference, agrupaciones y filtros.
- Rutas ES/EN/IT de Trayectoria: integración con `Header` y `Footer` existentes.

Cobertura aproximada: alta para los registros incluidos en las hojas de cronología y archivo verificado; el propio Excel identifica líneas abiertas de investigación que permanecen explícitamente como backlog y no se presentan como completadas.
