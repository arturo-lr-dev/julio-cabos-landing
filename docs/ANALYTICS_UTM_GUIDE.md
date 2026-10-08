# Guía oficial de UTMs — juliocabos.es

Esta convención identifica campañas que llevan tráfico a `juliocabos.es`. Las UTMs se añaden únicamente a los enlaces de entrada utilizados en campañas externas. No se añaden a la navegación interna del sitio ni a la URL externa de Miniature Coach.

## Reglas generales

- Usar siempre minúsculas.
- No usar espacios, tildes ni caracteres especiales.
- Usar `snake_case`.
- Mantener los nombres de campaña estables y reutilizables.
- No incluir nombres, emails, teléfonos ni ningún dato personal.
- La atribución se realiza cuando el visitante entra en juliocabos.es.

## Parámetros oficiales

### `utm_source`

Identifica la plataforma o socio que origina la visita.

Valores aprobados inicialmente:

```text
instagram
facebook
youtube
patreon
google
partner_slug
```

`partner_slug` debe sustituirse por un identificador concreto del socio, por ejemplo `miniature_art_academy`, manteniendo las mismas reglas de minúsculas y `snake_case`.

### `utm_medium`

Identifica el canal.

Valores aprobados inicialmente:

```text
social
video
email
referral
organic
paid_social
cpc
```

### `utm_campaign`

Identifica la iniciativa. Debe ser estable y no incluir fechas salvo que la fecha forme parte real de la campaña.

Valores iniciales:

```text
color_por_capas
miniature_coach_launch
curso_octubre
nueva_obra
publicacion_historica
```

### `utm_content`

Identifica la ubicación o creatividad concreta dentro de una campaña.

Valores iniciales:

```text
bio
story_01
story_02
reel_01
post_feed
newsletter
partner_name
```

### `utm_term`

Usarlo solo en campañas de búsqueda pagada (`cpc`) cuando sea necesario registrar la keyword. No usarlo en publicaciones orgánicas, stories, reels o enlaces de bio.

## Plantilla

```text
https://www.juliocabos.es/?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}
```

Para una landing en inglés o italiano se conserva la misma convención y se cambia únicamente la ruta de destino.

## Campaña: Veladuras

Landing ES real:

```text
https://www.juliocabos.es/biblioteca/cuadernos/el-color-se-construye-por-capas
```

### Instagram Story

```text
https://www.juliocabos.es/biblioteca/cuadernos/el-color-se-construye-por-capas?utm_source=instagram&utm_medium=social&utm_campaign=color_por_capas&utm_content=story_01
```

### Instagram Reel/Post

```text
https://www.juliocabos.es/biblioteca/cuadernos/el-color-se-construye-por-capas?utm_source=instagram&utm_medium=social&utm_campaign=color_por_capas&utm_content=reel_01
```

Si se publica como post de feed en lugar de reel, usar `utm_content=post_feed`.

### Instagram bio

```text
https://www.juliocabos.es/biblioteca/cuadernos/el-color-se-construye-por-capas?utm_source=instagram&utm_medium=social&utm_campaign=color_por_capas&utm_content=bio
```

## Campaña: Miniature Coach

Landing ES real:

```text
https://www.juliocabos.es/
```

La página de Julio solo registra la adquisición y el clic de salida posterior. No se añaden UTMs a `https://chatgpt.com/...` ni se modifica la URL centralizada del recurso.

### Instagram Story

```text
https://www.juliocabos.es/?utm_source=instagram&utm_medium=social&utm_campaign=miniature_coach_launch&utm_content=story_01
```

### Instagram Reel

```text
https://www.juliocabos.es/?utm_source=instagram&utm_medium=social&utm_campaign=miniature_coach_launch&utm_content=reel_01
```

### Instagram bio

```text
https://www.juliocabos.es/?utm_source=instagram&utm_medium=social&utm_campaign=miniature_coach_launch&utm_content=bio
```

## Ejemplos adicionales

Newsletter para un curso:

```text
https://www.juliocabos.es/?utm_source=partner_slug&utm_medium=email&utm_campaign=curso_octubre&utm_content=newsletter
```

Vídeo de una nueva obra:

```text
https://www.juliocabos.es/galeria?utm_source=youtube&utm_medium=video&utm_campaign=nueva_obra&utm_content=partner_name
```

Campaña de búsqueda pagada:

```text
https://www.juliocabos.es/?utm_source=google&utm_medium=cpc&utm_campaign=curso_octubre&utm_content=post_feed&utm_term=pintura_miniaturas
```

## Revisión antes de publicar

1. Confirmar que la URL de destino es una página pública real de juliocabos.es.
2. Comprobar que no hay tildes, espacios ni mayúsculas.
3. Confirmar que `source`, `medium` y `campaign` coinciden con los valores aprobados.
4. Usar `content` para distinguir placements o creatividades.
5. No añadir UTMs a enlaces internos.
6. No añadir UTMs a la URL de ChatGPT de Miniature Coach.
7. Probar la URL en una ventana privada y comprobar la atribución en GA4 Realtime cuando la campaña esté activa.
