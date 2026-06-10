import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { nombre, apellido, correo, eligible } = await req.json();

  if (eligible) {
    const { error } = await supabase
      .from("donantes")
      .insert({ nombre, apellido, correo });

    if (error) console.error("Supabase insert error:", error.message);
  }

  return NextResponse.json({ ok: true });
}
