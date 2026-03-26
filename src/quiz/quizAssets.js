/**
 * JSON konfige naudojami raktai → tikri importuoti asset URL (Vite).
 * Čia vienintelė vieta, kur „hardcoded“ yra keliai į failus – ne tekstai/klausimai.
 */
import threeWomenHeroImage from '../assets/img trys merginos.webp';
import threeMenHeroImage from '../assets/img trys vyrai.webp';
import femaleAge4049 from '../assets/img.webp';
import femaleAge5059 from '../assets/img (1).webp';
import femaleAge6069 from '../assets/img (2).webp';
import femaleAge7080 from '../assets/img (3).webp';
import maleAge4049 from '../assets/img men 40-49.webp';
import maleAge5059 from '../assets/img men 50-59.webp';
import maleAge6069 from '../assets/img men 60-69.webp';
import maleAge7080 from '../assets/img men 70-80.webp';
import laurelLeftSvg from '../assets/sakele is kaires.svg';
import firstPageBackgroundImage from '../assets/pirmas puslapis.webp';

export const QUIZ_ASSET_MAP = {
  threeWomen: threeWomenHeroImage,
  threeMen: threeMenHeroImage,
  laurelLeft: laurelLeftSvg,
  splashBackground: firstPageBackgroundImage,
  femaleAge4049,
  femaleAge5059,
  femaleAge6069,
  femaleAge7080,
  maleAge4049,
  maleAge5059,
  maleAge6069,
  maleAge7080,
};

/**
 * @param {string} key
 * @returns {string | undefined}
 */
export function getQuizAsset(key) {
  return QUIZ_ASSET_MAP[key];
}
