import offerConfig from '../configs/offerConfig.json';
import { stripLeadingLocaleFromPathname, buildLocalizedOfferPath } from './localizedPath';

/**
 * Kelias be /en|/lt → varianto raktas (base | second | third).
 * @param {string} pathname – pilnas pathname, pvz. `/lt/offer-68`
 */
export function getOfferVariantKeyFromPathname(pathname) {
  const rest = stripLeadingLocaleFromPathname(pathname);
  const normalized = rest.replace(/\/$/, '') || '/';
  const variants = offerConfig.variants;
  if (!variants || typeof variants !== 'object') return offerConfig.defaultVariantId || 'base';

  for (const key of Object.keys(variants)) {
    const v = variants[key];
    const seg = typeof v?.pathSegment === 'string' ? v.pathSegment.replace(/^\//, '') : '';
    if (!seg) continue;
    const expected = `/${seg}`;
    if (normalized === expected) return key;
  }

  return offerConfig.defaultVariantId || 'base';
}

/**
 * @param {string} lang – `en` | `lt`
 * @returns {string[]} pilni keliai, pvz. `/en/offer`
 */
export function getRegisteredOfferPaths(lang) {
  const variants = offerConfig.variants;
  if (!variants) return [];
  return Object.values(variants)
    .map((v) => (v?.pathSegment ? buildLocalizedOfferPath(lang, v.pathSegment) : null))
    .filter(Boolean);
}
