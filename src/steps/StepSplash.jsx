import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretDown } from '@phosphor-icons/react';
import WalkingIcon from '../components/WalkingIcon';
import { cn } from '../utils/cn';
import { getQuizAsset } from '../quiz/quizAssets';

/** Konfigūracinis įžangos ekranas (užkrovimo juosta) – tekstai iš i18n, trukmė iš step. */
export function StepSplash({ step, design, onComplete }) {
  const { t } = useTranslation();
  const d = design.splash;
  const bgUrl = getQuizAsset('splashBackground');
  const durationMs = step.durationMs ?? 10000;
  const intervalMs = step.progressIntervalMs ?? 100;
  const [progress, setProgress] = useState(0);
  const i18nKeys = step.i18n ?? {};

  useEffect(() => {
    const totalSteps = durationMs / intervalMs;
    const increment = 100 / totalSteps;
    let current = 0;
    const id = window.setInterval(() => {
      current += increment;
      if (current >= 100) {
        setProgress(100);
        window.clearInterval(id);
        onComplete();
      } else {
        setProgress(Math.round(current));
      }
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [durationMs, intervalMs, onComplete]);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip overflow-y-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className={d.overlay} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-lg flex-col px-6 pb-10 pt-10">
        <header className="flex shrink-0 justify-center pt-4">
          <WalkingIcon showLabel size="md" labelClassName="text-white drop-shadow-md" />
        </header>

        <div className="flex flex-1 flex-col items-center justify-center px-2 text-center">
          <h1 className={d.title}>
            <span className="block sm:inline">{t(i18nKeys.titleLine1Key ?? '')}</span>
            <span className="mt-1 block sm:mt-2">{t(i18nKeys.titleLine2Key ?? '')}</span>
            <span className="mt-1 block sm:mt-2">{t(i18nKeys.titleLine3Key ?? '')}</span>
          </h1>
        </div>

        <div className="w-full shrink-0 space-y-2 pb-6">
          <p className="flex items-center justify-center gap-1 text-sm font-medium text-white/95 drop-shadow">
            {t(i18nKeys.loadingLabelKey ?? '')}
            <CaretDown className="h-4 w-4 shrink-0" weight="bold" aria-hidden />
          </p>
          <div className={d.progressBar}>
            <div
              className={cn(d.progressFill)}
              style={{ width: `${progress}%` }}
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold tabular-nums text-white drop-shadow-md">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
