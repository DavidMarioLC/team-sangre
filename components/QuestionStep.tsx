"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Question } from "@/lib/questions";

interface QuestionStepProps {
  question: Question;
  onAnswer: (answer: "si" | "no") => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

function renderHighlighted(text: string, highlight: string[]) {
  if (highlight.length === 0) return <>{text}</>;

  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const sorted = [...highlight].sort(
    (a, b) => remaining.indexOf(a) - remaining.indexOf(b),
  );

  for (const phrase of sorted) {
    const idx = remaining.indexOf(phrase);
    if (idx === -1) continue;

    if (idx > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
    }

    // First letter in display font, rest bold
    const first = phrase[0];
    const rest = phrase.slice(1);
    parts.push(
      <strong key={key++} className="font-bold">
        <span style={{ fontFamily: "var(--font-philly)" }}>{first}</span>
        {rest}
      </strong>,
    );

    remaining = remaining.slice(idx + phrase.length);
  }

  if (remaining) {
    parts.push(<span key={key++}>{remaining}</span>);
  }

  return <>{parts}</>;
}

export default function QuestionStep({
  question,
  onAnswer,
  onBack,
  currentStep,
  totalSteps,
}: QuestionStepProps) {
  const [selected, setSelected] = useState<"si" | "no" | null>(null);

  function handleSubmit() {
    if (selected) onAnswer(selected);
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      {/* Step indicator */}
      <p className="text-white/40 text-xs tracking-widest uppercase">
        {currentStep} / {totalSteps}
      </p>

      {/* Question text */}
      <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed max-w-sm">
        {renderHighlighted(question.text, question.highlight)}
      </p>

      {/* Radio options */}
      <div className="flex items-center gap-6 mt-1">
        {(["si", "no"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setSelected(opt)}
            className={`flex items-center gap-2 text-sm font-medium min-h-[44px] px-2 transition-colors ${
              selected === opt ? "text-white" : "text-white/60"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                selected === opt
                  ? "border-white"
                  : "border-white/50"
              }`}
            >
              {selected === opt && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </span>
            {opt === "si" ? "Sí" : "No"}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-1">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selected}
          className="bg-[#DF0000] text-white text-sm font-medium px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c50000] transition-colors min-h-[44px]"
        >
          Enviar
        </button>
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="text-white/60 text-sm hover:text-white transition-colors min-h-[44px]"
          >
            Volver
          </button>
        )}
      </div>
    </motion.div>
  );
}
