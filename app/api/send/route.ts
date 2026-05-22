import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { nombre, apellido, correo } = await req.json();
  console.log(nombre, apellido, correo);
  await resend.emails.send({
    from: "Team Sangre <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    subject: "Nuevo donante potencial — Team Sangre",
    html: `
      <h2>Nuevo registro Team Sangre</h2>
      <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
      <p><strong>Correo:</strong> ${correo}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
