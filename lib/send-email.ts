export async function sendEmail(data: {
  nombre: string;
  apellido: string;
  correo: string;
  eligible: boolean;
}) {
  const res = await fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al enviar el correo");
}
