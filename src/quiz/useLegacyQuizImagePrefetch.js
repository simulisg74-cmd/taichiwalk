import { useEffect } from 'react';
import { prefetchImageUrls } from '../utils/prefetchImageUrls';
import { getLegacyStepPrefetchUrls } from './legacyQuizPrefetchUrls';

const LOOKAHEAD = 3;
const MAX_LEGACY_STEP = 52;

/**
 * Legacy Quiz: pasiekus žingsnį N, fone įkelia paveikslėlius N+1…N+3 (cache).
 * @param {number} step
 * @param {string} gender
 */
export function useLegacyQuizImagePrefetch(step, gender) {
  useEffect(() => {
    const urlSet = new Set();
    for (let k = 1; k <= LOOKAHEAD; k++) {
      const nextStep = step + k;
      if (nextStep > MAX_LEGACY_STEP) break;
      getLegacyStepPrefetchUrls(nextStep, gender).forEach((u) => urlSet.add(u));
    }
    return prefetchImageUrls([...urlSet]);
  }, [step, gender]);
}
