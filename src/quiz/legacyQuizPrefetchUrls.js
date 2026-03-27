/**
 * Legacy Quiz žingsnių paveikslėlių URL sąrašas išankstiniam įkėlimui (N+1…N+3).
 * Turi atitikti `Quiz.jsx` naudojamus asset'us.
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
import maleBodyTypeSlim from '../assets/img men slim.webp';
import maleBodyTypeMidSized from '../assets/img men mid-size.webp';
import maleBodyTypePlusSized from '../assets/img men plus-size.webp';
import maleBodyTypeOverweight from '../assets/img men overweight.webp';
import maleDreamThin from '../assets/img men thin.webp';
import maleDreamToned from '../assets/img men toned.webp';
import maleDreamSlim from '../assets/img men slim.webp';
import maleDreamShapely from '../assets/img men shaplely.webp';
import bodyTypeSlim from '../assets/img slim.webp';
import bodyTypeMidSized from '../assets/img mid sizeed.webp';
import bodyTypePlusSized from '../assets/img plus-size.webp';
import bodyTypeOverweight from '../assets/img owerweight.webp';
import dreamBodyThin from '../assets/img Thin.webp';
import dreamBodyToned from '../assets/img Toned.webp';
import dreamBodyCurvy from '../assets/img Curvy.webp';
import dreamBodyHealthy from '../assets/img Healthy.webp';
import focusLegs from '../assets/img legs.webp';
import focusBelly from '../assets/img belly.webp';
import focusArms from '../assets/img Arms.webp';
import focusChest from '../assets/img Chest.webp';
import focusButtocks from '../assets/img Buttocks.webp';
import focusHips from '../assets/img Hips.webp';
import focusFullBody from '../assets/img full body.webp';
import maleFocusLegs from '../assets/img men legs.webp';
import maleFocusBelly from '../assets/img men belly.webp';
import maleFocusArms from '../assets/img men arms.webp';
import maleFocusButtocks from '../assets/img men buttocks.webp';
import maleFocusHips from '../assets/img men hips.webp';
import maleFocusFullBody from '../assets/img men full body.webp';
import maleFocusChest from '../assets/img mens chest.webp';
import menPritupstaiHeroImage from '../assets/img men pritupstai.webp';
import menStabilityBallHeroImage from '../assets/img men su kamuoliu.webp';
import bestShapeHeroImage from '../assets/img mergina mylinom kelnem.webp';
import weightFluctuationsHeroImage from '../assets/img mergina melinom kelnem kelia koja.webp';
import harvardInfoDoctorImage from '../assets/img gydytoja su sypsena.webp';
import harvardInfoMaleDoctorImage from '../assets/img men gydytojas.webp';
import harvardGazetteLogo from '../assets/Harvard gazette.svg';
import stairsOutOfBreath from '../assets/img out of breath.webp';
import stairsSometimesTired from '../assets/img sometimes tired but this ok.webp';
import stairsEasily from '../assets/img Easily.webp';
import stairsMenOutOfBreath from '../assets/img men out of breath.webp';
import stairsMenSometimesTired from '../assets/img men sometimes tired but this ok.webp';
import stairsMenEasily from '../assets/img men easily.webp';
import energyHighIntensityDiagram from '../assets/img deagrama.webp';
import longTermResultsChartSvg from '../assets/degramos atvaizdas.svg';
import sleepInBedHeroImage from '../assets/img mergina lovoje.webp';
import sleepMenInBedHeroImage from '../assets/img men lovje razosi.webp';
import lifestyleBubblesImage from '../assets/img burbuliukai su zmonem.webp';
import lifestyleBubblesMenImage from '../assets/img men burbuliukai.webp';
import taiChiWalkingHeroImage from '../assets/img mergina su kilimeliu 1.webp';
import menDesignedUpgradeHeroImage from '../assets/img men iskeles rankas.webp';
import desiredWalkHeroImage from '../assets/img mergina iskelus rankas.webp';
import menDesiredWalkHeroImage from '../assets/img men daro pratimus.webp';
import testimonialSlide88kg from '../assets/img 88kg.webp';
import testimonialSlide147kg from '../assets/img 147 kg.webp';
import drNikoAmblemaImage from '../assets/img drNiko amblema.webp';
import seniorCoupleHeroImage from '../assets/img senokas su mociute.png';
import firstPageBackgroundImage from '../assets/pirmas puslapis.webp';
import laurelLeftSvg from '../assets/sakele is kaires.svg';
import taiChiPromoMaleHeroImage from '../assets/men ant kilimelio istieses rankas.jpg';

const TAI_CHI_PROMO_UNSPLASH =
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80';
const RACHEL_AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80';

const ALL_AGE_URLS = [
  femaleAge4049,
  femaleAge5059,
  femaleAge6069,
  femaleAge7080,
  maleAge4049,
  maleAge5059,
  maleAge6069,
  maleAge7080,
];

const ALL_BODY_TYPE_URLS = [
  bodyTypeSlim,
  bodyTypeMidSized,
  bodyTypePlusSized,
  bodyTypeOverweight,
  maleBodyTypeSlim,
  maleBodyTypeMidSized,
  maleBodyTypePlusSized,
  maleBodyTypeOverweight,
];

const ALL_DREAM_URLS = [
  dreamBodyThin,
  dreamBodyToned,
  dreamBodyCurvy,
  dreamBodyHealthy,
  maleDreamThin,
  maleDreamToned,
  maleDreamSlim,
  maleDreamShapely,
];

const ALL_FOCUS_URLS = [
  focusLegs,
  focusBelly,
  focusArms,
  focusChest,
  focusButtocks,
  focusHips,
  focusFullBody,
  maleFocusLegs,
  maleFocusBelly,
  maleFocusArms,
  maleFocusChest,
  maleFocusButtocks,
  maleFocusHips,
  maleFocusFullBody,
];

const ALL_STAIRS_URLS = [
  stairsOutOfBreath,
  stairsSometimesTired,
  stairsEasily,
  stairsMenOutOfBreath,
  stairsMenSometimesTired,
  stairsMenEasily,
];

function uniq(urls) {
  return [...new Set(urls.filter((u) => typeof u === 'string' && u.length > 0))];
}

/**
 * @param {number} step – legacy Quiz `step` (1…52)
 * @param {string} gender – `male` arba kita
 * @returns {string[]}
 */
export function getLegacyStepPrefetchUrls(step, _gender) {
  switch (step) {
    case 1:
      return [firstPageBackgroundImage];
    case 3:
      return [threeWomenHeroImage, threeMenHeroImage, laurelLeftSvg];
    case 4:
      return ALL_AGE_URLS;
    case 6:
      return ALL_BODY_TYPE_URLS;
    case 7:
      return ALL_DREAM_URLS;
    case 8:
      return ALL_FOCUS_URLS;
    case 10:
      return [menPritupstaiHeroImage, bestShapeHeroImage];
    case 11:
      return [menStabilityBallHeroImage, weightFluctuationsHeroImage];
    case 12:
      return [harvardInfoDoctorImage, harvardInfoMaleDoctorImage, harvardGazetteLogo];
    case 13:
      return ALL_STAIRS_URLS;
    case 15:
      return [taiChiPromoMaleHeroImage, TAI_CHI_PROMO_UNSPLASH];
    case 16:
      return [energyHighIntensityDiagram];
    case 17:
      return [sleepInBedHeroImage, sleepMenInBedHeroImage];
    case 19:
      return [menDesignedUpgradeHeroImage, taiChiWalkingHeroImage];
    case 25:
      return [lifestyleBubblesImage, lifestyleBubblesMenImage];
    case 26:
      return [desiredWalkHeroImage, menDesiredWalkHeroImage];
    case 28:
      return [testimonialSlide88kg, testimonialSlide147kg];
    case 31:
      return [longTermResultsChartSvg, drNikoAmblemaImage];
    // Step 35: pirmiausia rodomas sintetinis loaderis – masinis prefetch čia užgožia
    // tinklą ir vartotojas mato „per vėlai“ slankią juostą. Profilio paveikslėliai
    // užsikrauna atidarius žingsnį (<img> profilio kortelėje).
    case 35:
      return [];
    case 43:
      return [RACHEL_AVATAR];
    case 49:
      return [seniorCoupleHeroImage];
    default:
      return [];
  }
}
