/**
 * Step 10: perduoda visus dabartinius URL query parametrus (utm_*, click_id ir kt.)
 * į kitą kelią – naudoti naviguojant iš quiz į offer ar tarp offer puslapių.
 */

/**
 * @param {string} [search] – numatytai `window.location.search`
 * @returns {URLSearchParams}
 */
export function getSearchParamsFromWindow(search) {
  if (typeof window === 'undefined') return new URLSearchParams();
  const s = search !== undefined ? search : window.location.search;
  return new URLSearchParams(s.startsWith('?') ? s.slice(1) : s);
}

/**
 * Sujungia esamus parametrus su papildomais (papildomi perrašo tokius pačius raktus).
 * @param {string} path – kelias be query (pvz. `/en/offer`)
 * @param {Record<string, string | number | boolean | undefined | null>} [extra]
 * @param {{ sourceSearch?: string }} [opts] – jei norite imti ne iš window (testams)
 */
export function withPreservedQueryParams(path, extra = {}, opts = {}) {
  const params =
    opts.sourceSearch !== undefined
      ? getSearchParamsFromWindow(opts.sourceSearch)
      : getSearchParamsFromWindow();

  Object.entries(extra).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') {
      params.delete(k);
    } else {
      params.set(k, String(v));
    }
  });

  const qs = params.toString();
  if (!qs) return path;
  const sep = path.includes('?') ? '&' : '?';
  return `${path}${sep}${qs}`;
}

/**
 * Grąžina tik query eilutę (su `?` priekyje), paruoštą pridėti prie kelio.
 */
export function getPreservedQuerySuffix(extra = {}, opts = {}) {
  const params =
    opts.sourceSearch !== undefined
      ? getSearchParamsFromWindow(opts.sourceSearch)
      : getSearchParamsFromWindow();

  Object.entries(extra).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') params.delete(k);
    else params.set(k, String(v));
  });

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}
