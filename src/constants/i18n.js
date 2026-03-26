/** Palaikomos kalbos (Step 11 – URL prefiksai /en, /lt). */
export const SUPPORTED_LANGS = ['en', 'lt'];

export const DEFAULT_LANG = 'en';

/**
 * @param {string} code
 * @returns {code is 'en' | 'lt'}
 */
export function isSupportedLang(code) {
  return SUPPORTED_LANGS.includes(code);
}
