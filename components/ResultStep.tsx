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
        <>
          <p className="text-white text-sm md:text-base">Felicidades, puedes ser</p>
          <Image
            src="/images/team-sangre-logo.png"
            alt="Team Sangre"
            width={100}
            height={100}
            style={{ height: "auto" }}
          />
        </>
      ) : (
        <p className="text-white text-sm md:text-base">
          Lo sentimos, no puedes ser Team Sangre
        </p>
      )}
    </motion.div>
  );
}
