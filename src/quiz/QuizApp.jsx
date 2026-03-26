import { useState, useCallback, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretLeft, List } from '@phosphor-icons/react';
import WalkingIcon from '../components/WalkingIcon';
import Quiz from '../components/Quiz';
import quizConfig from '../configs/quizConfig.json';
import designConfig from '../configs/designConfig.json';
import { readQuizProgress, writeQuizProgress } from '../utils/quizStorage';
import { useQuizConfigFlow } from './useQuizConfigFlow';
import { useImagePreloader } from './useImagePreloader';
import { QuizConfigMenuDrawer } from './QuizConfigMenuDrawer';
import { StepSplash, StepGenderSelect, StepTrustHero, StepAgeGrid, StepGoalsMulti } from '../steps';

/**
 * Konfigūracinė fazė (quizConfig + locales) → legacy Quiz.
 * Step 8: useImagePreloader – kiti 2 žingsniai į priekį.
 * Step 9: read/write quizStorage (3 min nebaigtai, 12 h prie offer).
 */
export default function QuizApp() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [initialSaved] = useState(() => readQuizProgress());

  const startLegacyOnly =
    initialSaved &&
    initialSaved.phase === 'legacy' &&
    initialSaved.legacyStarted === true &&
    typeof initialSaved.legacyStep === 'number';

  const flowResume = useMemo(() => {
    if (startLegacyOnly) return null;
    if (initialSaved?.phase !== 'config') return null;
    return {
      index: typeof initialSaved.configIndex === 'number' ? initialSaved.configIndex : 0,
      answers:
        initialSaved.answers && typeof initialSaved.answers === 'object'
          ? { ...initialSaved.answers }
          : {},
    };
  }, [initialSaved, startLegacyOnly]);

  const flow = useQuizConfigFlow(quizConfig, flowResume);

  const meta = quizConfig.meta;
  const totalSeg = meta.totalProgressSegments ?? 49;
  const legacyStep = meta.legacyHandoffStep ?? 6;

  /** Step 8: preload paveikslėliams +2 žingsnius (tik konfigū fazėje) */
  useImagePreloader(flow.steps, flow.index, {
    enabled: !startLegacyOnly && !flow.doneConfig,
    lookahead: 2,
  });

  /** Step 9: konfigū fazės įrašymas */
  useEffect(() => {
    if (startLegacyOnly) return;
    if (flow.doneConfig) {
      writeQuizProgress(
        {
          phase: 'legacy',
          legacyStarted: true,
          legacyStep,
          answers: flow.answers,
        },
        { offerReached: false },
      );
      return;
    }
    writeQuizProgress(
      {
        phase: 'config',
        configIndex: flow.index,
        answers: flow.answers,
        legacyStarted: false,
      },
      { offerReached: false },
    );
  }, [startLegacyOnly, flow.doneConfig, flow.index, flow.answers, legacyStep]);

  const progressPercent = useCallback(
    (numerator) => Math.min(100, ((numerator ?? 1) / totalSeg) * 100),
    [totalSeg],
  );

  const shell = designConfig.quizShell;

  const advanceFromSplash = useCallback(() => {
    flow.goNext();
  }, [flow.goNext]);

  const onGender = useCallback(
    (g) => {
      const key = flow.currentStep?.answerKey ?? 'gender';
      flow.setAnswer(key, g);
      flow.goNext();
    },
    [flow.currentStep, flow.setAnswer, flow.goNext],
  );

  const onTrustContinue = useCallback(() => {
    flow.goNext();
  }, [flow.goNext]);

  const onAgeSelect = useCallback(
    (value) => {
      const key = flow.currentStep?.answerKey ?? 'ageRange';
      flow.setAnswer(key, value);
      flow.goNext();
    },
    [flow.currentStep, flow.setAnswer, flow.goNext],
  );

  const goalsContinue = useCallback(() => {
    flow.goNext();
  }, [flow.goNext]);

  const handoffGender = flow.answers.gender ?? '';
  const handoffGoals = Array.isArray(flow.answers.goals) ? flow.answers.goals : [];

  const legacyQuiz = useMemo(() => {
    const stepFromStorage = startLegacyOnly ? initialSaved.legacyStep : legacyStep;
    const g = startLegacyOnly
      ? (initialSaved.answers?.gender ?? '')
      : handoffGender;
    const gl = startLegacyOnly
      ? Array.isArray(initialSaved.answers?.goals)
        ? initialSaved.answers.goals
        : []
      : handoffGoals;

    return (
      <Quiz
        initialStep={stepFromStorage ?? legacyStep}
        initialGender={g}
        initialSelectedGoals={gl}
      />
    );
  }, [
    startLegacyOnly,
    initialSaved,
    legacyStep,
    handoffGender,
    handoffGoals,
  ]);

  if (startLegacyOnly) {
    return legacyQuiz;
  }

  if (flow.doneConfig) {
    return legacyQuiz;
  }

  const step = flow.currentStep;
  if (!step) {
    return legacyQuiz;
  }

  const pct = progressPercent(step.progressNumerator);

  if (step.type === 'splash') {
    return (
      <>
        <StepSplash step={step} design={designConfig} onComplete={advanceFromSplash} />
        <QuizConfigMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      </>
    );
  }

  if (step.type === 'gender_select') {
    return (
      <>
        <div className={shell.screen}>
          <header className={shell.header}>
            <button
              type="button"
              onClick={() => flow.goBack()}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-50"
              aria-label={t('common.back')}
            >
              <CaretLeft size={24} weight="bold" className="text-gray-500" />
            </button>
            <div className="flex justify-center">
              <WalkingIcon showLabel size="md" />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-50"
              aria-label={t('common.menu')}
            >
              <List size={24} weight="bold" className="text-gray-600" />
            </button>
          </header>
          <div className={shell.progressTrack}>
            <div className={shell.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <main className={shell.main}>
            <StepGenderSelect
              step={step}
              design={designConfig}
              maleBranchEnabled={quizConfig.features?.maleBranchEnabled ?? true}
              onSelect={onGender}
            />
          </main>
        </div>
        <QuizConfigMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      </>
    );
  }

  if (step.type === 'trust_hero') {
    return (
      <>
        <StepTrustHero
          step={step}
          design={designConfig}
          gender={flow.answers.gender ?? ''}
          progressPercent={pct}
          onBack={flow.goBack}
          onMenu={() => setMenuOpen(true)}
          onContinue={onTrustContinue}
        />
        <QuizConfigMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      </>
    );
  }

  if (step.type === 'age_grid') {
    return (
      <>
        <StepAgeGrid
          step={step}
          design={designConfig}
          gender={flow.answers.gender ?? ''}
          progressPercent={pct}
          selectedValue={flow.answers.ageRange}
          onSelect={onAgeSelect}
          onBack={flow.goBack}
          onMenu={() => setMenuOpen(true)}
        />
        <QuizConfigMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      </>
    );
  }

  if (step.type === 'goals_multi') {
    const goals = Array.isArray(flow.answers.goals) ? flow.answers.goals : [];
    return (
      <>
        <StepGoalsMulti
          step={step}
          design={designConfig}
          progressPercent={pct}
          selected={goals}
          onToggle={(v) => {
            const key = step.answerKey ?? 'goals';
            const next = goals.includes(v) ? goals.filter((x) => x !== v) : [...goals, v];
            flow.setAnswer(key, next);
          }}
          onContinue={goalsContinue}
          onBack={flow.goBack}
          onMenu={() => setMenuOpen(true)}
        />
        <QuizConfigMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      </>
    );
  }

  return legacyQuiz;
}
