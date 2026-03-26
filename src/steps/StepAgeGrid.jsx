import { CaretLeft, List, CaretRight } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import WalkingIcon from '../components/WalkingIcon';
import { cn } from '../utils/cn';
import { getQuizAsset } from '../quiz/quizAssets';

/**
 * @param {{
 *   step: Record<string, unknown>,
 *   design: typeof import('../configs/designConfig.json'),
 *   gender: string,
 *   progressPercent: number,
 *   selectedValue: string | undefined,
 *   onSelect: (value: string) => void,
 *   onBack: () => void,
 *   onMenu: () => void,
 * }} props
 */
export function StepAgeGrid({
  step,
  design,
  gender,
  progressPercent,
  selectedValue: _selectedValue,
  onSelect,
  onBack,
  onMenu,
}) {
  const { t } = useTranslation();
  const shell = design.quizShell;
  const i18nKeys = step.i18n ?? {};
  const assets = step.assets ?? {};
  const isMale = gender === 'male';
  const femaleMap = assets.femaleImages ?? {};
  const maleMap = assets.maleImages ?? {};
  const options = Array.isArray(step.options) ? step.options : [];

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
        <button
          type="button"
          onClick={onMenu}
          className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-50"
          aria-label={t('common.menu')}
        >
          <List size={24} weight="bold" className="text-gray-600" />
        </button>
      </header>

      <div className={shell.progressTrack}>
        <div className={shell.progressFill} style={{ width: `${progressPercent}%` }} />
      </div>

      <main className={cn(shell.main, 'w-full')}>
        <h2 className="text-center text-lg font-bold uppercase tracking-wide text-gray-900">
          {t(i18nKeys.headingKey ?? '')}
        </h2>
        <p className="mt-1 text-center text-sm font-medium uppercase tracking-wide text-gray-500">
          {t(i18nKeys.subheadingKey ?? '')}
        </p>

        <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-2.5 sm:max-w-md sm:gap-3">
          {options.map((opt) => {
            const value = opt.value;
            const labelKey = opt.labelKey;
            const label = labelKey ? t(labelKey) : String(value);
            const assetKey = isMale ? maleMap[value] : femaleMap[value];
            const imgSrc = assetKey ? getQuizAsset(assetKey) : '';

            return (
              <button
                key={value}
                type="button"
                onClick={() => onSelect(value)}
                className="group flex cursor-pointer flex-col overflow-visible rounded-2xl border-0 bg-transparent p-0 text-left shadow-none transition-transform duration-200 active:scale-[0.98] hover:opacity-[0.98]"
              >
                <div className="relative flex min-h-[118px] w-full items-end justify-center overflow-hidden rounded-xl bg-white px-1.5 pt-2 sm:min-h-[132px]">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={label}
                      className="max-h-[118px] w-full object-contain object-top sm:max-h-[132px]"
                    />
                  ) : null}
                </div>
                <div className="relative z-10 -mt-2.5 mx-1.5 mb-1 flex min-h-[2.25rem] items-center justify-between gap-2 rounded-full bg-orange-500 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-sm sm:px-3 sm:text-xs">
                  <span className="truncate">{label}</span>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white sm:h-6 sm:w-6">
                    <CaretRight size={14} weight="bold" className="text-orange-500" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
