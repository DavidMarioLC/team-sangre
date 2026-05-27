"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import DataStep from "@/components/DataStep";
import QuestionStep from "@/components/QuestionStep";
import ResultStep from "@/components/ResultStep";
import { questions } from "@/lib/questions";
import type { DataStepValues } from "@/lib/schemas";

type StepperState = {
  currentStep: number;
  answers: Record<number, "si" | "no">;
  userData: DataStepValues | null;
};

export default function Stepper() {
  const [state, setState] = useState<StepperState>({
    currentStep: 0,
    answers: {},
    userData: null,
  });

  function start() {
    setState((s) => ({ ...s, currentStep: 1 }));
  }

  function handleAnswer(answer: "si" | "no") {
    setState((s) => ({
      ...s,
      answers: { ...s.answers, [s.currentStep]: answer },
      currentStep: s.currentStep + 1,
    }));
  }

  function handleBack() {
    setState((s) => ({ ...s, currentStep: s.currentStep - 1 }));
  }

  function handleData(data: DataStepValues) {
    setState((s) => ({ ...s, userData: data, currentStep: 7 }));
  }

  function isEligible(): boolean {
    return questions.every((q) => state.answers[q.id] === q.eligibleAnswer);
  }

  const { currentStep } = state;

  return (
    <div className="px-4">
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="hero-cta"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <p className="text-white/80 text-sm md:text-base max-w-xs">
              Descubre si tú también puedes ser Team Sangre respondiendo este
              cuestionario.
            </p>
            <button
              type="button"
              onClick={start}
              className="bg-[#DF0000] text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#c50000] transition-colors min-h-[44px]"
            >
              Comienza aquí
            </button>
          </motion.div>
        )}

        {currentStep >= 1 && currentStep <= 5 && (
          <QuestionStep
            key={`q-${currentStep}`}
            question={questions[currentStep - 1]}
            onAnswer={handleAnswer}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={5}
          />
        )}

        {currentStep === 6 && <DataStep key="data" onDone={handleData} eligible={isEligible()} />}

        {currentStep === 7 && <ResultStep key="result" eligible={isEligible()} />}
      </AnimatePresence>
    </div>
  );
}
