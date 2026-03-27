/**
 * Iš vieno quizConfig žingsnio surenka quizAssets raktus (Step 8).
 * @param {Record<string, unknown> | null | undefined} step
 * @returns {string[]}
 */
export function collectAssetKeysFromQuizStep(step) {
  if (!step || typeof step !== 'object') return [];

  const keys = [];
  if (step.type === 'splash') keys.push('splashBackground');

  const assets = step.assets;
  if (assets && typeof assets === 'object') {
    if (assets.heroFemaleKey) keys.push(assets.heroFemaleKey);
    if (assets.heroMaleKey) keys.push(assets.heroMaleKey);
    if (assets.laurelKey) keys.push(assets.laurelKey);
    if (assets.femaleImages && typeof assets.femaleImages === 'object') {
      keys.push(...Object.values(assets.femaleImages));
    }
    if (assets.maleImages && typeof assets.maleImages === 'object') {
      keys.push(...Object.values(assets.maleImages));
    }
  }

  return [...new Set(keys.filter(Boolean))];
}

/**
 * Kitų `lookahead` žingsnių (iš eilės) asset raktai.
 * @param {Record<string, unknown>[]} steps
 * @param {number} currentIndex
 * @param {number} [lookahead=3]
 */
export function collectUpcomingQuizConfigImageKeys(steps, currentIndex, lookahead = 3) {
  const keys = new Set();
  for (let i = 1; i <= lookahead; i++) {
    const step = steps[currentIndex + i];
    collectAssetKeysFromQuizStep(step).forEach((k) => keys.add(k));
  }
  return [...keys];
}
