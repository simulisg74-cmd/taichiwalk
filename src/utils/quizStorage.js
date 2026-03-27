import { DEFAULT_LANG, isSupportedLang } from '../constants/i18n';
import { withPreservedQueryParams } from './preserveQueryParams';

/**
 * Step 9: apklausos progresas localStorage su TTL.
 * - Nebaigta apklausa: 3 min nuo paskutinio įrašymo
 * - Offer puslapis (step 52): 12 val. nuo paskutinio įrašymo
 * Pasibaigus galiojimui – įrašas ištrinamas skaitant.
 */

export const QUIZ_PROGRESS_STORAGE_KEY = 'taichiwalk_quiz_progress_v1';

const THREE_MIN_MS = 3 * 60 * 1000;
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

function safeParse(raw) {
  if (raw == null || raw === '') return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Nuskaito žalią įrašą be galiojimo tikrinimo (vidiniam merge) */
function readRaw() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  return safeParse(window.localStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY));
}

/**
 * @returns {Record<string, unknown> | null}
 */
export function readQuizProgress() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const raw = window.localStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY);
  const data = safeParse(raw);
  if (!data || typeof data !== 'object') {
    if (raw) window.localStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
    return null;
  }
  const exp = data.expiresAt;
  if (typeof exp !== 'number' || Date.now() > exp) {
    window.localStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
    return null;
  }
  return data;
}

/**
 * Sujungia su esamu įrašu ir nustato naują expiresAt pagal offerReached.
 * @param {Record<string, unknown>} patch
 * @param {{ offerReached?: boolean }} [opts]
 */
export function writeQuizProgress(patch, opts = {}) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const { offerReached = false } = opts;

  let base = readRaw();
  if (base && typeof base.expiresAt === 'number' && Date.now() > base.expiresAt) {
    base = {};
  }
  if (!base || typeof base !== 'object') base = {};

  const merged = {
    ...base,
    ...patch,
    v: 1,
    updatedAt: Date.now(),
  };

  if (patch.answers && typeof patch.answers === 'object' && base.answers && typeof base.answers === 'object') {
    merged.answers = { ...base.answers, ...patch.answers };
  }

  const ttlMs = offerReached ? TWELVE_HOURS_MS : THREE_MIN_MS;
  merged.expiresAt = Date.now() + ttlMs;

  try {
    window.localStorage.setItem(QUIZ_PROGRESS_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* kvota / privatus režimas */
  }
}

export function clearQuizProgress() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Išvalo progresą ir pilnai perkrauna `/quiz` (QuizApp perskaito tuščią storage). */
export function restartQuizWithFullReload(langFromRoute) {
  if (typeof window === 'undefined') return;
  clearQuizProgress();
  const l = isSupportedLang(langFromRoute) ? langFromRoute : DEFAULT_LANG;
  window.location.assign(withPreservedQueryParams(`/${l}/quiz`));
}
