import { CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import { CaretLeft, List } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import WalkingIcon from '../components/WalkingIcon';
import { cn } from '../utils/cn';

const QUIZ_ICON_CLASS = 'text-blue-500 shrink-0';

/**
 * @param {{
 *   step: Record<string, unknown>,
 *   design: typeof import('../configs/designConfig.json'),
 *   progressPercent: number,
 *   selected: string[],
 *   onToggle: (value: string) => void,
 *   onContinue: () => void,
 *   onBack: () => void,
 *   onMenu?: () => void,
 * }} props
 */
export function StepGoalsMulti({
  step,
  design,
  progressPercent,
  selected,
  onToggle,
  onContinue,
  onBack,
  onMenu,
}) {
  const { t } = useTranslation();
  const shell = design.quizShell;
  const i18nKeys = step.i18n ?? {};
  const options = step.options ?? [];
  const hasAny = selected.length > 0;

  return (
    <div className={shell.screen}>
      <header className={shell.header}>
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-50"
          aria-label={t('common.back')}
        >
          <CaretLeft size={24} weight="bold" className="text-gray-500" />
        </button>
        <div className="flex justify-center">
          <WalkingIcon showLabel size="md" />
        </div>
        {onMenu ? (
          <button
            type="button"
            onClick={onMenu}
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-50"
            aria-label={t('common.menu')}
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
        ) : (
          <span className="justify-self-end" aria-hidden />
        )}
      </header>

      <div className={shell.progressTrack}>
        <div className={shell.progressFill} style={{ width: `${progressPercent}%` }} />
      </div>

      <main className={cn(shell.main, 'w-full')}>
        <div className="flex w-full max-w-md flex-col pb-4">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {t(i18nKeys.titleKey ?? '')}
                </h2>
              </div>
              <p className="text-sm text-gray-500">{t(i18nKeys.hintKey ?? '')}</p>
            </div>

            <div className="flex flex-col gap-3">
              {options.map((opt) => {
                const value = opt.value;
                const isSelected = selected.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onToggle(value)}
                    className={cn(
                      'flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 text-left shadow-sm',
                      isSelected ? design.options.cardSelected : design.options.cardIdle,
                      design.options.interactive,
                    )}
                  >
                    <span className="min-w-0 flex-1 break-words font-medium text-gray-900">
                      {t(opt.labelKey ?? '')}
                    </span>
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors',
                        isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-white',
                      )}
                    >
                      {isSelected ? (
                        <CheckCircle size={18} className="text-orange-600" strokeWidth={2.5} />
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {!hasAny ? (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
              <XCircle size={20} className="shrink-0 text-blue-500" />
              <span className="text-sm font-medium">{t(i18nKeys.validationKey ?? '')}</span>
            </div>
          ) : null}
        </div>
      </main>

      <div className="flex shrink-0 justify-center border-t border-gray-200 bg-white px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
        <button
          type="button"
          onClick={onContinue}
          disabled={!hasAny}
          className={design.buttons.continueDisabled}
        >
          {t(i18nKeys.continueKey ?? 'quiz.common.continue')}
        </button>
      </div>
    </div>
  );
}
