import { z } from "zod";

export const dataStepSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  apellido: z.string().min(1, { message: "El apellido es requerido" }),
  correo: z.string().email({ message: "Ingresa un correo válido" }),
});

export type DataStepValues = z.infer<typeof dataStepSchema>;
