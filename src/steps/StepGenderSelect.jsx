import { GenderFemale, GenderMale } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';

/**
 * @param {{
 *   step: Record<string, unknown>,
 *   design: typeof import('../configs/designConfig.json'),
 *   maleBranchEnabled: boolean,
 *   onSelect: (gender: 'female' | 'male') => void,
 * }} props
 */
export function StepGenderSelect({ step, design, maleBranchEnabled, onSelect }) {
  const { t } = useTranslation();
  const i18nKeys = step.i18n ?? {};
  const g = design.gender;
  const rowBase = cn(g.row, design.options.interactive);

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-3 text-center">
        <h2 className="text-2xl font-semibold leading-tight text-gray-900 md:text-[1.75rem]">
          {t(i18nKeys.titleKey ?? '')}
          <span className={cn('font-semibold', g.accentText)}>
            {t(i18nKeys.titleAccentKey ?? '')}
          </span>
        </h2>
        <p className="text-sm leading-relaxed text-gray-500">
          {t(i18nKeys.subtitleKey ?? '')}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <button type="button" onClick={() => onSelect('female')} className={rowBase}>
          <span className="pointer-events-none flex h-10 w-10 shrink-0 items-center justify-center">
            <GenderFemale size={36} weight="fill" className={g.accentText} />
          </span>
          <span className="pointer-events-none min-w-0 flex-1 break-words text-left font-bold text-gray-900">
            {t(i18nKeys.femaleKey ?? '')}
          </span>
        </button>
        {maleBranchEnabled ? (
          <button type="button" onClick={() => onSelect('male')} className={rowBase}>
            <span className="pointer-events-none flex h-10 w-10 shrink-0 items-center justify-center">
              <GenderMale size={36} weight="fill" className={g.accentText} />
            </span>
            <span className="pointer-events-none min-w-0 flex-1 break-words text-left font-bold text-gray-900">
              {t(i18nKeys.maleKey ?? '')}
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
