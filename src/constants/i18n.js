/** Palaikomos kalbos (URL prefiksai /en, /lt, /ru). */
export const SUPPORTED_LANGS = ['en', 'lt', 'ru'];

export const DEFAULT_LANG = 'en';

/**
 * @param {string} code
 * @returns {code is 'en' | 'lt' | 'ru'}
 */
export function isSupportedLang(code) {
  return SUPPORTED_LANGS.includes(code);
}
