import { DEFAULT_LANG, isSupportedLang } from '../constants/i18n';

/**
 * Pašalina kalbos prefiksą iš kelio, pvz. `/en/offer` → `/offer`, `/lt` → `/`.
 * @param {string} pathname
 */
export function stripLeadingLocaleFromPathname(pathname) {
  const n = pathname.replace(/\/$/, '') || '/';
  const m = n.match(/^\/(en|lt)(\/.*)?$/);
  if (!m) return n;
  if (!m[2] || m[2] === '/') return '/';
  return m[2];
}

/**
 * Pakeičia kalbą URL, išlaikant tą pačią „loginių“ maršrutų dalį (quiz, offer, …).
 * @param {string} pathname – pilnas pathname, pvz. `/en/quiz`
 * @param {string} newLang – `en` | `lt`
 */
export function swapLangInPath(pathname, newLang) {
  if (!isSupportedLang(newLang)) return pathname;
  const rest = stripLeadingLocaleFromPathname(pathname);
  const suffix = rest === '/' ? '/quiz' : rest;
  return `/${newLang}${suffix}`;
}

/**
 * Lokalizuotas offer kelias (Step 11).
 * @param {string} lang
 * @param {string} pathSegment – pvz. `offer`, `offer-68`
 */
export function buildLocalizedOfferPath(lang, pathSegment) {
  const l = isSupportedLang(lang) ? lang : DEFAULT_LANG;
  const seg = String(pathSegment ?? 'offer').replace(/^\//, '');
  return `/${l}/${seg}`;
}
