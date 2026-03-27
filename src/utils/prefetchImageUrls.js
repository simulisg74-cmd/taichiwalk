/**
 * Iš anksto įkelia URL į naršyklės cache (Image objektai).
 * @param {string[]} urls
 * @returns {(() => void) | undefined} cleanup – atšaukiant efektą atlaisvina nuorodas
 */
export function prefetchImageUrls(urls) {
  if (!Array.isArray(urls) || urls.length === 0) return undefined;
  const imgs = [];
  for (const url of urls) {
    if (typeof url !== 'string' || url.length === 0) continue;
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    imgs.push(img);
  }
  return () => {
    imgs.forEach((img) => {
      img.src = '';
    });
  };
}
