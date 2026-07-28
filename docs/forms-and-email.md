# Formularios, consultas y email

## Flujo actual

Los formularios públicos convergen en `POST /api/inquiries`:

1. El cliente envía nombre, email, mensaje y contexto opcional.
2. La API normaliza la fuente y valida los campos obligatorios.
3. Se crea una consulta con estado `new` en `content/inquiries.json`.
4. Si existe `RESEND_API_KEY`, se intenta enviar un aviso interno.
5. La respuesta incluye el resultado del registro y de la notificación.
6. El panel permite cambiar estado y añadir notas internas.

`POST /api/waitlist` reexporta el mismo handler por compatibilidad. `WaitlistSection` ya usa `/api/inquiries` con origen `waitlist`.

## Formularios públicos

- `InquiryForm`: encargos, colaboraciones, formación y consultas generales.
- `WaitlistSection`: cursos, plazas y proyectos.

Ambos registran eventos de inicio y envío en la capa de analítica.

## Datos

Campos base:

- `name`.
- `email`.
- `message`.

Opcionales:

- `phone`.
- `source`.
- `subject`.
- `level`.
- `course`.

La API añade ID, estado, notas vacías y timestamps. Las fuentes y estados admitidos están en `lib/inquiry-types.ts`.

## Variables

```text
RESEND_API_KEY=
INQUIRIES_NOTIFICATION_EMAIL=
```

También se admite `CONTACT_EMAIL` como fallback no incluido en `.env.example`. Si no se configura destino, el código usa actualmente `manuelmoralesg2@gmail.com`; debe definirse expresamente en producción.

## Resend

El remitente actual es `Julio Cabos <onboarding@resend.dev>`. Antes de producción:

1. Verificar el dominio en Resend.
2. Configurar DNS.
3. Cambiar el remitente a una dirección del dominio.
4. Definir el destinatario por variable.
5. Probar entrega y carpeta de spam.

La consulta se guarda aunque Resend no esté configurado o el aviso falle. Esto evita perder el lead, pero requiere revisar el panel.

## Seguridad y privacidad

Validación vigente: campos obligatorios y regex básica de email. Pendientes recomendados:

- Rate limit.
- Honeypot o protección anti-bot.
- Límites explícitos de longitud.
- Validación de teléfono y payload con esquema.
- Política de privacidad completa y base legal.
- Retención y eliminación de consultas.
- Evitar incluir datos sensibles en logs.
- Confirmación al usuario si se adopta una lista comercial.

## Checklist de prueba

- Envío válido desde ambos idiomas.
- Error visible con campos incompletos o email inválido.
- Registro en `content/inquiries.json`.
- Aparición en `/admin/consultas`.
- Cambio de estado y notas.
- Aviso recibido en el destinatario correcto.
- Funcionamiento controlado sin `RESEND_API_KEY`.
- Eventos de analítica solo con consentimiento aplicable.
- Navegación por teclado y labels correctos.
