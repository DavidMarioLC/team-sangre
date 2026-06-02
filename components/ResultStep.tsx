"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface ResultStepProps {
  eligible: boolean;
}

export default function ResultStep({ eligible }: ResultStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col md:flex-row items-center gap-3 flex-wrap"
    >
      {eligible ? (
        <div className="flex flex-col items-center gap-5 text-white text-sm md:text-base">
          <div className="flex gap-2 flex-col md:flex-row items-center">
            <p>Felicidades, puedes ser</p>
            <Image
              src="/images/team-sangre-logo.png"
              alt="Team Sangre"
              width={100}
              height={100}
              style={{ height: "auto" }}
            />
          </div>
          <p>
            Descubre cómo{" "}
            <a
              target="_blank"
              href="https://fmdshcczcfkshfhihvjf.supabase.co/storage/v1/object/public/team-sangre/team-sangre.pdf"
              rel="noopener"
              className="underline underline-offset-4"
            >
              aquí
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="flex flex-col text-sm md:text-base  gap-5 text-center text-white ">
          <p>¡Casi! Aún no, pero pronto podrías ser Team Sangre.</p>
          <p>
            Descubre cómo{" "}
            <a
              target="_blank"
              href="https://fmdshcczcfkshfhihvjf.supabase.co/storage/v1/object/public/team-sangre/team-sangre.pdf"
              rel="noopener"
              className="underline underline-offset-4"
            >
              aquí.
            </a>
          </p>
        </div>
      )}
    </motion.div>
  );
}
