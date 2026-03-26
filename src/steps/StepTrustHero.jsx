import { CaretLeft, List } from '@phosphor-icons/react';
import { Trans, useTranslation } from 'react-i18next';
import WalkingIcon from '../components/WalkingIcon';
import { getQuizAsset } from '../quiz/quizAssets';

/**
 * @param {{
 *   step: Record<string, unknown>,
 *   design: typeof import('../configs/designConfig.json'),
 *   gender: string,
 *   progressPercent: number,
 *   onBack: () => void,
 *   onMenu: () => void,
 *   onContinue: () => void,
 * }} props
 */
export function StepTrustHero({ step, design, gender, progressPercent, onBack, onMenu, onContinue }) {
  const { t } = useTranslation();
  const th = design.trustHero;
  const i18nKeys = step.i18n ?? {};
  const assets = step.assets ?? {};
  const isFemale = gender !== 'male';
  const heroKey = isFemale ? assets.heroFemaleKey : assets.heroMaleKey;
  const imageSrc = getQuizAsset(heroKey ?? 'threeWomen');
  const laurelSrc = getQuizAsset(assets.laurelKey ?? 'laurelLeft');
  const headlineKey = isFemale ? i18nKeys.headlineFemaleKey : i18nKeys.headlineMaleKey;
  const sublineKey = i18nKeys.sublineKey ?? '';

  return (
    <div className={th.screen}>
      <header className={th.header}>
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
          aria-label={t('common.back')}
        >
          <CaretLeft size={24} weight="bold" className="text-gray-600" />
        </button>
        <div className="flex justify-center">
          <WalkingIcon showLabel size="md" />
        </div>
        <button
          type="button"
          onClick={onMenu}
          className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
          aria-label={t('common.menu')}
        >
          <List size={24} weight="bold" className="text-gray-600" />
        </button>
      </header>

      <div className={th.progressTrack}>
        <div className={th.progressFill} style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="flex min-h-[calc(100vh-120px)] w-full min-w-0 flex-col items-center justify-center overflow-x-clip px-5 py-8 sm:px-8">
        <div className="flex w-full max-w-3xl flex-col items-center gap-12 sm:max-w-4xl md:max-w-6xl md:flex-row md:items-center md:justify-center md:gap-20">
          <div className="min-w-0 flex-1 text-center md:max-w-[min(100%,40rem)] md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start md:gap-4">
              <img
                src={laurelSrc}
                alt=""
                className="h-[4.5rem] w-auto shrink-0 object-contain sm:h-20"
                width={42}
                height={72}
                aria-hidden
              />
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                {t(headlineKey ?? '')}
              </h2>
              <img
                src={laurelSrc}
                alt=""
                className="h-[4.5rem] w-auto shrink-0 -scale-x-100 object-contain sm:h-20"
                width={42}
                height={72}
                aria-hidden
              />
            </div>
            <p className="mt-4 text-base font-normal leading-snug text-gray-600 sm:text-xl">
              {sublineKey ? (
                <Trans
                  i18nKey={sublineKey}
                  components={{ w: <span className="font-semibold text-gray-800" /> }}
                />
              ) : null}
            </p>
          </div>
          <div className="w-full max-w-[22rem] shrink-0 sm:max-w-[26rem] md:max-w-[29rem]">
            <img
              src={imageSrc}
              alt=""
              className="h-auto w-full object-contain object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center px-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-4">
        <button type="button" onClick={onContinue} className={design.buttons.continue}>
          {t(i18nKeys.continueKey ?? 'quiz.common.continue')}
        </button>
      </div>
    </div>
  );
}
