# Forms And Email

## Formulario actual

El proyecto incluye un formulario de lista de espera para cursos online.

Componente:

```text
components/WaitlistSection.tsx
```

Endpoint:

```text
app/api/waitlist/route.ts
```

Proveedor:

```text
Resend
```

## Campos

El formulario pide:

- `nombre`
- `email`
- `nivel`

Niveles actuales:

- Principiante
- Intermedio
- Avanzado

## Flujo

1. El usuario rellena el formulario.
2. `WaitlistSection` hace POST a `/api/waitlist`.
3. El endpoint valida campos obligatorios.
4. El endpoint valida formato de email.
5. Resend envía un email interno con los datos.
6. La UI muestra éxito o error.

## Variables de entorno

El endpoint necesita:

```text
RESEND_API_KEY
```

Debe estar en `.env.local` para desarrollo y configurada en el proveedor de deploy para producción.

El proyecto también usa:

```text
NEXT_PUBLIC_SITE_URL
```

Se usa para metadata y JSON-LD. En producción debe apuntar al dominio real.

## `.env.example`

Mantener `.env.example` actualizado con las variables necesarias, sin valores secretos.

Ejemplo:

```text
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

## Estado actual del destinatario

En `app/api/waitlist/route.ts` el destinatario actual es:

```text
manuelmoralesg2@gmail.com
```

Hay un TODO para cambiarlo a:

```text
Juliocabosg@gmail.com
```

Esto debe revisarse antes de producción.

## Dominio de envío

Actualmente el `from` usa:

```text
Lista de Espera <onboarding@resend.dev>
```

Para producción lo ideal es:

1. Verificar dominio en Resend.
2. Configurar DNS.
3. Cambiar `from` a una dirección del dominio real.
4. Probar recepción.

No usar una dirección definitiva hasta que el dominio esté verificado.

## Seguridad y validación

Validación actual:

- Campos obligatorios.
- Regex básica de email.

Pendientes recomendables si el formulario recibe tráfico real:

- Honeypot anti-spam.
- Rate limit por IP.
- Mensaje de privacidad más completo.
- Registro persistente en base de datos o herramienta externa.
- Consentimiento explícito si se usa para comunicaciones comerciales.

## Posible evolución

Opciones futuras:

- Guardar leads en Airtable, Notion, Google Sheets o base de datos.
- Enviar email de confirmación al usuario.
- Integrar newsletter.
- Añadir etiquetas por nivel.
- Añadir origen de campaña.

## Checklist de prueba

Antes de publicar:

- `.env.local` contiene `RESEND_API_KEY`.
- El endpoint responde sin errores.
- El email llega al destinatario correcto.
- El remitente está permitido por Resend.
- El formulario muestra error si falta un campo.
- El formulario muestra error si el email es inválido.
- El formulario muestra éxito al enviar.
- No aparece la API key en cliente ni en logs públicos.
