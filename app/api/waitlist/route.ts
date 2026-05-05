import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { nombre, email, nivel } = await request.json();

    if (!nombre || !email || !nivel) {
      return Response.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "El email no es válido" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Lista de Espera <onboarding@resend.dev>",
      to: ["Juliocabosg@gmail.com"],
      subject: `Nuevo inscrito en lista de espera — ${nombre}`,
      html: `
        <h2>Nuevo interesado en cursos online</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nivel:</strong> ${nivel}</p>
        <hr/>
        <p style="color:#666; font-size:12px;">Enviado desde la landing page de Julio Cabos</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Error al enviar el email" },
        { status: 500 }
      );
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Waitlist error:", err);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
