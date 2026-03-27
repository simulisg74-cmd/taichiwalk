import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANG, SUPPORTED_LANGS, isSupportedLang } from '../constants/i18n';

import enTranslation from '../locales/en/translation.json';
import enOffer from '../locales/en/offer.json';
import enLegacy from '../locales/en/legacy.json';
import enQuizFlow from '../locales/en/quiz.flow.json';
import ltTranslation from '../locales/lt/translation.json';
import ltOffer from '../locales/lt/offer.json';
import ltLegacy from '../locales/lt/legacy.json';
import ltQuizFlow from '../locales/lt/quiz.flow.json';
import ruTranslation from '../locales/ru/translation.json';
import ruOffer from '../locales/ru/offer.json';
import ruLegacy from '../locales/ru/legacy.json';
import ruQuizFlow from '../locales/ru/quiz.flow.json';

/** Sujungia bazinį vertimą su apklausos srauto (`quiz.flow`) objektu. */
function mergeQuizFlow(baseTranslation, flow) {
  return {
    ...baseTranslation,
    quiz: {
      ...baseTranslation.quiz,
      flow,
    },
  };
}

function lngFromPathname() {
  if (typeof window === 'undefined') return undefined;
  const m = window.location.pathname.match(/^\/(en|lt|ru)(\/|$)/);
  return m && isSupportedLang(m[1]) ? m[1] : undefined;
}

const pathLng = lngFromPathname();

const enResources = mergeQuizFlow(enTranslation, enQuizFlow);
const ltResources = mergeQuizFlow(ltTranslation, ltQuizFlow);
const ruResources = mergeQuizFlow(ruTranslation, ruQuizFlow);

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enResources,
      offer: enOffer,
      legacy: enLegacy,
    },
    lt: {
      translation: ltResources,
      offer: ltOffer,
      legacy: ltLegacy,
    },
    ru: {
      translation: ruResources,
      offer: ruOffer,
      legacy: ruLegacy,
    },
  },
  lng: pathLng || DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  supportedLngs: SUPPORTED_LANGS,
  defaultNS: 'translation',
  ns: ['translation', 'offer', 'legacy'],
  interpolation: { escapeValue: false },
  /** Be „Suspense“ – kitaip `useTranslation()` gali palikti baltą ekraną be kylančio kraštinio komponento. */
  react: { useSuspense: false },
});

/** Sinchronizuoja i18n kalbą su URL segmentu (po /en/, /lt/ ar /ru/). */
export function syncI18nLanguageFromPath(lang) {
  if (isSupportedLang(lang) && i18n.language !== lang) {
    void i18n.changeLanguage(lang);
  }
}

export default i18n;
