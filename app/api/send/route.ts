import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { nombre, apellido, correo, eligible } = await req.json();

  if (eligible) {
    const { error } = await supabase.from("donantes").insert({ nombre, apellido, correo });
    if (error) console.error("Supabase insert error:", error.message);
  }

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
