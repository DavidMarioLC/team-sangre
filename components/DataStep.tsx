"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type DataStepValues, dataStepSchema } from "@/lib/schemas";
import { sendEmail } from "@/lib/send-email";

interface DataStepProps {
  onDone: (data: DataStepValues) => void;
}

export default function DataStep({ onDone }: DataStepProps) {
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DataStepValues>({
    resolver: zodResolver(dataStepSchema),
    mode: "onChange",
  });

  async function onSubmit(data: DataStepValues) {
    setSending(true);
    try {
      await sendEmail(data);
    } catch {
      // proceed to result even if email fails
    } finally {
      setSending(false);
      onDone(data);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-4 max-w-sm "
    >
      {/* Heading */}
      <p className="text-white text-sm md:text-base leading-relaxed">
        Finalmente, déjanos tu{" "}
        <strong className="font-bold">
          <span style={{ fontFamily: "var(--font-philly)" }}>M</span>ail
        </strong>{" "}
        para que sepas más sobre el{" "}
        <strong className="font-bold">Team Sangre.</strong>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {/* Nombre + Apellido */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <input
              {...register("nombre")}
              placeholder="Nombre"
              className="bg-transparent border border-white/30 text-white text-sm px-3 py-2.5 rounded focus:outline-none focus:border-white placeholder:text-white/40 min-h-[44px] w-full"
            />
            {errors.nombre && (
              <p className="text-red-400 text-[10px]">
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <input
              {...register("apellido")}
              placeholder="Apellido"
              className="bg-transparent border border-white/30 text-white text-sm px-3 py-2.5 rounded focus:outline-none focus:border-white placeholder:text-white/40 min-h-[44px] w-full"
            />
            {errors.apellido && (
              <p className="text-red-400 text-[10px]">
                {errors.apellido.message}
              </p>
            )}
          </div>
        </div>

        {/* Correo */}
        <div className="flex flex-col gap-1">
          <input
            {...register("correo")}
            type="email"
            placeholder="Correo electrónico"
            className="bg-transparent border border-white/30 text-white text-sm px-3 py-2.5 rounded focus:outline-none focus:border-white placeholder:text-white/40 min-h-[44px] w-full"
          />
          {errors.correo && (
            <p className="text-red-400 text-[10px]">{errors.correo.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || sending}
          className="self-start bg-[#DF0000] text-white text-sm font-medium px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c50000] transition-colors min-h-[44px]"
        >
          {sending ? "Enviando…" : "Enviar"}
        </button>
      </form>
    </motion.div>
  );
}
