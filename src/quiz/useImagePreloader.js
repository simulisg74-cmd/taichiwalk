import { useEffect } from 'react';
import { collectUpcomingQuizConfigImageKeys } from '../utils/collectQuizConfigImageKeys';
import { getQuizAsset } from './quizAssets';

/**
 * Step 8: iš anksto įkelia paveikslėlius kitiems `lookahead` žingsniams (pagal quizConfig eilę).
 * @param {Record<string, unknown>[]} steps – filtruota eilė be legacy_handoff
 * @param {number} currentIndex
 * @param {{ lookahead?: number; enabled?: boolean }} [options]
 */
export function useImagePreloader(steps, currentIndex, options = {}) {
  const { lookahead = 2, enabled = true } = options;

  useEffect(() => {
    if (!enabled || !Array.isArray(steps) || steps.length === 0) return;

    const keys = collectUpcomingQuizConfigImageKeys(steps, currentIndex, lookahead);
    const controllers = [];

    keys.forEach((key) => {
      const url = getQuizAsset(key);
      if (!url || typeof url !== 'string') return;
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
      controllers.push(img);
    });

    return () => {
      controllers.forEach((img) => {
        img.src = '';
      });
    };
  }, [steps, currentIndex, lookahead, enabled]);
}
