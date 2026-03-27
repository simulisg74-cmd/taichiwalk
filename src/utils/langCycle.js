import { SUPPORTED_LANGS } from '../constants/i18n';

/** Normalizuoja i18n kalbos kodą (pvz. en-US → en). */
export function normalizeLangCode(lng) {
  return (lng || 'en').split('-')[0].toLowerCase();
}

/** Kita kalba cikle: en → lt → ru → en (pagal SUPPORTED_LANGS eilę). */
export function nextCyclicLang(currentLng) {
  const c = normalizeLangCode(currentLng);
  const i = SUPPORTED_LANGS.indexOf(c);
  const idx = i >= 0 ? i : 0;
  return SUPPORTED_LANGS[(idx + 1) % SUPPORTED_LANGS.length];
}

/** Raktas etiketei „perjungti į {kalba}“ (translation namespace). */
export function switchToLangLabelKey(lang) {
  if (lang === 'en') return 'common.switchToEn';
  if (lang === 'lt') return 'common.switchToLt';
  return 'common.switchToRu';
}
