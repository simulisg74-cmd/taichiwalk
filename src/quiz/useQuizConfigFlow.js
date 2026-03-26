import { useState, useCallback, useMemo } from 'react';

/**
 * @typedef {{ gender?: string; ageRange?: string; goals?: string[] }} QuizConfigAnswers
 */

/**
 * @param {import('../configs/quizConfig.json')} config
 * @param {{ index?: number; answers?: QuizConfigAnswers } | null} [resume] – Step 9: atkūrimas iš localStorage
 */
export function useQuizConfigFlow(config, resume = null) {
  const steps = useMemo(() => config.steps.filter((s) => s.type !== 'legacy_handoff'), [config.steps]);

  const [index, setIndex] = useState(() => {
    const len = config.steps.filter((s) => s.type !== 'legacy_handoff').length;
    const idx = resume?.index;
    if (typeof idx !== 'number' || Number.isNaN(idx)) return 0;
    return Math.min(Math.max(0, idx), len);
  });

  const [answers, setAnswers] = useState(
    /** @type {QuizConfigAnswers} */ (
      resume?.answers && typeof resume.answers === 'object' ? { ...resume.answers } : {}
    ),
  );

  const currentStep = steps[index] ?? null;
  const isLastConfigStep = index >= steps.length - 1;
  const doneConfig = index >= steps.length;

  const setAnswer = useCallback((key, value) => {
    setAnswers((prev) => {
      const next = typeof value === 'function' ? value(prev[key]) : value;
      return { ...prev, [key]: next };
    });
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, steps.length));
  }, [steps.length]);

  const goBack = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const resetFlow = useCallback(() => {
    setIndex(0);
    setAnswers({});
  }, []);

  return {
    steps,
    index,
    currentStep,
    isLastConfigStep,
    doneConfig,
    answers,
    setAnswer,
    goNext,
    goBack,
    resetFlow,
    meta: config.meta,
    features: config.features,
  };
}
