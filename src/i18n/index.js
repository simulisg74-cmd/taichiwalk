import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANG, SUPPORTED_LANGS, isSupportedLang } from '../constants/i18n';

import enTranslation from '../locales/en/translation.json';
import enOffer from '../locales/en/offer.json';
import enLegacy from '../locales/en/legacy.json';
import ltTranslation from '../locales/lt/translation.json';
import ltOffer from '../locales/lt/offer.json';
import ltLegacy from '../locales/lt/legacy.json';

function lngFromPathname() {
  if (typeof window === 'undefined') return undefined;
  const m = window.location.pathname.match(/^\/(en|lt)(\/|$)/);
  return m && isSupportedLang(m[1]) ? m[1] : undefined;
}

const pathLng = lngFromPathname();

i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: enTranslation,
        offer: enOffer,
        legacy: enLegacy,
      },
      lt: {
        translation: ltTranslation,
        offer: ltOffer,
        legacy: ltLegacy,
      },
    },
    lng: pathLng || DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: SUPPORTED_LANGS,
    defaultNS: 'translation',
    ns: ['translation', 'offer', 'legacy'],
    interpolation: { escapeValue: false },
  });

/** Sinchronizuoja i18n kalbą su URL segmentu (po /en/ ar /lt/). */
export function syncI18nLanguageFromPath(lang) {
  if (isSupportedLang(lang) && i18n.language !== lang) {
    void i18n.changeLanguage(lang);
  }
}

export default i18n;
