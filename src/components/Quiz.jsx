import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import WalkingIcon from './WalkingIcon';
import { withPreservedQueryParams } from '../utils/preserveQueryParams';
import { buildLocalizedOfferPath, swapLangInPath } from '../utils/localizedPath';
import { nextCyclicLang, switchToLangLabelKey } from '../utils/langCycle';
import {
  HelpCircle,
  CheckCircle,
  XCircle as LucideXCircle,
  Briefcase as LucideBriefcase,
  Coffee as LucideCoffee,
  Sun as LucideSun,
  Umbrella as LucideUmbrella,
  Smile,
  Sofa,
  Calendar,
  Trophy as LucideTrophy,
  Dumbbell,
  Meh,
} from 'lucide-react';
import {
  CaretLeft,
  CaretDown,
  List,
  CaretRight,
  Check,
  X,
  Minus,
  PawPrint,
  Baby,
  Stairs,
  House,
  XCircle,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  GenderFemale,
  GenderMale,
  Star,
  HeartBreak,
  Clock,
  CurrencyDollar,
  Lightning,
  Virus,
  Question,
  Person,
  Heartbeat,
  DotsThree,
  Scales,
  WarningCircle,
  Heart,
  Umbrella,
  Trophy,
  Sun,
  Cake,
  Lightbulb,
  Sparkle,
  Users,
  TShirt,
  Suitcase,
  Armchair,
  DeviceMobile,
  Image as ImageLandscapeIcon,
  SmileyWink,
  ThumbsUp,
  Lock,
  Envelope,
} from '@phosphor-icons/react';

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
import walkingProfileHeroImage from '../assets/img walking profile.webp';
import laurelLeftSvg from '../assets/sakele is kaires.svg';
import taiChiPromoMaleHeroImage from '../assets/men ant kilimelio istieses rankas.jpg';
import quizConfig from '../configs/quizConfig.json';
import offerConfig from '../configs/offerConfig.json';
import { writeQuizProgress, restartQuizWithFullReload } from '../utils/quizStorage';
import { useLegacyQuizImagePrefetch } from '../quiz/useLegacyQuizImagePrefetch';

/** Step 28: „They did it“ – karuselė (nuotrauka + svoriai + citata); swipe / intervalas naudoja šį masyvą */
const TRANSFORMATION_TESTIMONIALS = [
  {
    heroImage: testimonialSlide88kg,
    beforeWeight: '88 KG',
    afterWeight: '80 kg',
    nameKey: 'lilyName',
    quoteKey: 'lilyQuote',
  },
  {
    heroImage: testimonialSlide147kg,
    beforeWeight: '147 KG',
    afterWeight: '108 kg',
    nameKey: 'noahName',
    quoteKey: 'noahQuote',
  },
];

/** Amžiaus kortelės – vietinės nuotraukos (baltas fonas), eilė: 40–49 … 70–80 */
const FEMALE_AGE_IMAGES = {
  '40-49': femaleAge4049,
  '50-59': femaleAge5059,
  '60-69': femaleAge6069,
  '70-80': femaleAge7080,
};

/** Amžiaus kortelės vyrams (Step 4 po Step 3) */
const MALE_AGE_IMAGES = {
  '40-49': maleAge4049,
  '50-59': maleAge5059,
  '60-69': maleAge6069,
  '70-80': maleAge7080,
};

const LOADING_DURATION_MS = 10000;
const PROGRESS_UPDATE_INTERVAL_MS = 100;

/** Step 43: plano „rinkimo“ apskritimo progresas (0 % → 100 %) */
const PLAN_BUILD_LOADER_MS = 3200;
const PLAN_BUILD_START_PERCENT = 0;
const PLAN_BUILD_CIRCLE_R = 45;
const PLAN_BUILD_CIRCUMFERENCE = 2 * Math.PI * PLAN_BUILD_CIRCLE_R;

/** Prognozės ekranas: metų laikas pagal tikslo datą (šiaurės pusrutulis, meteorologiniai mėnesiai). */
function getSeasonIdForQuizPrediction(d) {
  const m = d.getMonth();
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 5 && m <= 7) return 'summer';
  if (m >= 8 && m <= 10) return 'autumn';
  return 'winter';
}

const BODY_TYPE_IMAGES = {
  slim: bodyTypeSlim,
  mid_sized: bodyTypeMidSized,
  plus_sized: bodyTypePlusSized,
  overweight: bodyTypeOverweight,
};

/** Step 6: kūno tipas vyrams (po tikslų) */
const MALE_BODY_TYPE_IMAGES = {
  slim: maleBodyTypeSlim,
  mid_sized: maleBodyTypeMidSized,
  plus_sized: maleBodyTypePlusSized,
  overweight: maleBodyTypeOverweight,
};

const DREAM_BODY_IMAGES = {
  thin: dreamBodyThin,
  toned: dreamBodyToned,
  curvy: dreamBodyCurvy,
  healthy: dreamBodyHealthy,
};

/** Step 7: svajonių figūra vyrams (Thin / Toned / Shapely / Healthy) */
const MALE_DREAM_BODY_IMAGES = {
  thin: maleDreamThin,
  toned: maleDreamToned,
  curvy: maleDreamShapely,
  healthy: maleDreamSlim,
};

const FOCUS_AREA_IMAGES = {
  legs: focusLegs,
  belly: focusBelly,
  arms: focusArms,
  chest: focusChest,
  buttocks: focusButtocks,
  hips: focusHips,
  full_body: focusFullBody,
};

/** Step 8: fokuso sritys vyrams */
const MALE_FOCUS_AREA_IMAGES = {
  legs: maleFocusLegs,
  belly: maleFocusBelly,
  arms: maleFocusArms,
  chest: maleFocusChest,
  buttocks: maleFocusButtocks,
  hips: maleFocusHips,
  full_body: maleFocusFullBody,
};

/** Visos fokusavimo sritys (naudojama „Full body“ – pažymėti viską) */
const ALL_FOCUS_AREA_IDS = [
  'legs',
  'belly',
  'arms',
  'chest',
  'buttocks',
  'hips',
  'full_body',
];

const STAIRS_OPTION_IMAGES = {
  out_of_breath: stairsOutOfBreath,
  sometimes_tired: stairsSometimesTired,
  easily: stairsEasily,
};

const MALE_STAIRS_OPTION_IMAGES = {
  out_of_breath: stairsMenOutOfBreath,
  sometimes_tired: stairsMenSometimesTired,
  easily: stairsMenEasily,
};

const TAI_CHI_PROMO_IMAGE = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80';

const TOTAL_QUIZ_STEPS = 49;
/** Didžiausias galimas step numeris (Step 52 – pasiūlymo landingas po „Thank you“) */
const MAX_QUIZ_STEP = 52;

/** Iš quizConfig.json – vyriškos šakos įjungimas (Step 2 ir visi `gender === 'male'` variantai) */
const QUIZ_MALE_BRANCH_ENABLED = quizConfig.features?.maleBranchEnabled ?? true;

/**
 * Progreso juosta pagal tikrąją pirmyn eigą (1 … TOTAL_QUIZ_STEPS).
 * Žingsnių ID nėra chronologiniai (pvz. 17→25→18, 23→16, 49→40, 34→42→35).
 */
const QUIZ_PROGRESS_NUMERATOR_BY_STEP = {
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13,
  14: 14, 15: 14, 16: 19, 17: 20, 18: 22, 19: 23, 20: 15, 21: 16, 22: 17, 23: 18,
  24: 24, 25: 21, 26: 25, 27: 26, 28: 27, 29: 28, 30: 29, 31: 30, 32: 31, 33: 32, 34: 33,
  35: 35, 36: 36, 37: 38, 38: 42, 39: 42.5, 40: 41, 41: 42, 42: 34, 43: 43, 44: 45, 45: 45, 46: 46,
  47: 37, 48: 39, 49: 40, 50: 47, 51: 48, 52: 49,
};

function getQuizProgressNumerator(s) {
  const n = QUIZ_PROGRESS_NUMERATOR_BY_STEP[s];
  if (n !== undefined) return n;
  return Math.min(Math.max(1, s), TOTAL_QUIZ_STEPS);
}

function getQuizProgressPercent(s) {
  return (getQuizProgressNumerator(s) / TOTAL_QUIZ_STEPS) * 100;
}

// Lucide ikonų spalva klausimams ir atsakymams
const QUIZ_ICON_CLASS = 'text-blue-500 shrink-0';

// Step 2 lyties ekranas – terrakota (reference screenshot)
const GENDER_ACCENT_CLASS = 'text-[#c85a3c]';

/** Palaikymo el. paštas – iš offerConfig.json */
const QUIZ_SUPPORT_EMAIL = offerConfig.urls.supportEmail;
const TERMS_OF_USE_URL = offerConfig.urls.terms;
const PRIVACY_POLICY_URL = offerConfig.urls.privacy ?? offerConfig.urls.terms;

/** Šoninis meniu – Terms, Privacy, Help + kalbos jungiklis (query išsaugomas) */
function QuizMenuDrawer({ open, onClose }) {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const nextLang = nextCyclicLang(i18n.language);
  const langSwitchTo = withPreservedQueryParams(swapLangInPath(location.pathname, nextLang));

  const handleRestartQuiz = () => {
    if (!window.confirm(t('common.restartQuizConfirm'))) return;
    restartQuizWithFullReload(lang);
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-menu-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40 touch-manipulation"
        onClick={onClose}
        aria-label={t('common.closeMenu')}
      />
      <aside className="relative z-[1] ml-auto flex h-full max-h-[100dvh] w-full max-w-sm flex-col overflow-y-auto bg-white pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)] shadow-2xl">
        <div className="flex shrink-0 items-start p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label={t('common.closeMenu')}
          >
            <X size={22} weight="bold" />
          </button>
        </div>
        <h2 id="quiz-menu-title" className="sr-only">
          {t('common.menuSr')}
        </h2>
        <nav className="flex flex-col gap-8 px-6 pb-10 pt-2">
          <div className="flex gap-4 border-b border-gray-100 pb-6">
            <Link
              to={langSwitchTo}
              className="text-sm font-semibold text-orange-600 underline-offset-2 hover:underline"
              onClick={onClose}
            >
              {t(switchToLangLabelKey(nextLang))}
            </Link>
          </div>
          <button
            type="button"
            onClick={handleRestartQuiz}
            className="text-left text-lg font-semibold text-orange-600 underline-offset-2 transition-colors hover:text-orange-700 hover:underline"
          >
            {t('common.restartQuiz')}
          </button>
          <a
            href={TERMS_OF_USE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium text-slate-800 transition-colors hover:text-orange-600"
            onClick={onClose}
          >
            {t('common.termsOfUse')}
          </a>
          <a
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium text-slate-800 transition-colors hover:text-orange-600"
            onClick={onClose}
          >
            {t('common.privacyPolicy')}
          </a>
          <div className="flex flex-col items-stretch gap-2">
            <a
              href={`mailto:${QUIZ_SUPPORT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-orange-500 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.99]"
              onClick={onClose}
            >
              <Envelope size={22} weight="fill" className="shrink-0" aria-hidden />
              {t('common.emailUs')}
            </a>
            <a
              href={`mailto:${QUIZ_SUPPORT_EMAIL}`}
              className="text-center text-sm font-medium text-orange-600 underline underline-offset-2 hover:text-orange-700"
              onClick={onClose}
            >
              {QUIZ_SUPPORT_EMAIL}
            </a>
          </div>
        </nav>
      </aside>
    </div>,
    document.body,
  );
}

// Bendras mygtuko stilius – pilulės forma, oranžinis, centruotas (kaip reference)
const QUIZ_BUTTON_BASE =
  'flex w-full max-w-[min(100%,20rem)] items-center justify-center rounded-full px-6 py-3.5 text-base font-semibold text-white transition-all active:scale-[0.98] sm:mx-auto sm:w-auto sm:max-w-none sm:px-10 md:px-12';
const CONTINUE_BUTTON_CLASSES =
  QUIZ_BUTTON_BASE +
  ' disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-90 enabled:bg-orange-500 enabled:hover:bg-orange-600';
const CONTINUE_BUTTON_ALWAYS_ENABLED =
  QUIZ_BUTTON_BASE + ' bg-orange-500 hover:bg-orange-600';

/** Pasirinkimų kortelės – hover / paspaudimas oranžiniu paryškinimu (visas quiz) */
const QUIZ_OPTION_INTERACTIVE =
  'transition-all duration-200 ease-out ' +
  'hover:border-orange-300 hover:bg-orange-50/80 hover:shadow-md ' +
  'active:scale-[0.99] active:border-orange-400 active:bg-orange-100/60';

const QUIZ_OPTION_CARD_SELECTED =
  'border border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-200/90';

const QUIZ_OPTION_CARD_IDLE = 'border border-gray-200 bg-white';

/** El. paštas planui (Step 38 / Step 45) – vienas regex visur */
const PLAN_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isPlanEmailValid = (value) => {
  const t = value.trim();
  return t.length > 0 && PLAN_EMAIL_REGEX.test(t);
};

const QUIZ_OPTION_CHECKBOX_SELECTED = 'border-orange-500 bg-orange-50';
const QUIZ_OPTION_CHECKBOX_IDLE = 'border-gray-300 bg-white';
const QUIZ_OPTION_CHECK_ICON = 'text-orange-600';

/** Step 2 – lyties mygtukai */
const QUIZ_OPTION_GENDER_ROW =
  'flex min-w-0 w-full cursor-pointer items-center gap-3 rounded-2xl border border-gray-200/90 bg-white px-4 py-[1.125rem] text-left shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:gap-4 sm:px-6 ' +
  QUIZ_OPTION_INTERACTIVE;

/** Step 11: bazinis offer su kalbos prefiksu ir išsaugotais query + `tw`. */
function Step52OfferRedirect({ targetWeightKg }) {
  const { lang } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const seg = offerConfig.variants?.base?.pathSegment ?? 'offer';
    const basePath = buildLocalizedOfferPath(lang ?? 'en', seg);
    navigate(withPreservedQueryParams(basePath, { tw: String(targetWeightKg) }), { replace: true });
  }, [navigate, targetWeightKg, lang]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-sm text-gray-500">
      {t('common.redirecting')}
    </div>
  );
}

/**
 * Quiz komponentas – kelių žingsnių apklausa (multi-step quiz).
 * Step 1: Pradinis langas su fonine nuotrauka, automatinis užkrovimas (10s) → Step 2.
 * Step 2: Baltas fonas, header, klausimas „What is your gender?“ (vyrams – tik jei QUIZ_MALE_BRANCH_ENABLED).
 * Step 3: Dinaminis turinys pagal lytį – moterys/vyrai su nuotrauka ir Continue mygtuku.
 *
 * initialLegacyAnswers – iš quizStorage (visi atsakymai), kad perkrovus būtų atkurti laukai (pvz. Step 35).
 */
function Quiz({
  initialStep = 1,
  initialGender = '',
  initialSelectedGoals = [],
  initialLegacyAnswers,
} = {}) {
  const { t, i18n } = useTranslation();
  const { t: tLegacy } = useTranslation('legacy');
  const { t: tOffer } = useTranslation('offer');
  const ia = initialLegacyAnswers && typeof initialLegacyAnswers === 'object' ? initialLegacyAnswers : {};

  /** Step 44 pašalintas – senas localStorage vis dar gali turėti 44 → iškart 45 (el. paštas). */
  const [step, setStep] = useState(() => {
    const s = typeof initialStep === 'number' ? initialStep : 1;
    return s === 44 ? 45 : s;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /** Step 1: nuo pat pradžios rodomas automatinis užkrovimas (tik jei pradedama nuo 1 žingsnio) */
  const [isLoading, setIsLoading] = useState(() => {
    const s = typeof initialStep === 'number' ? initialStep : 1;
    return (s === 44 ? 45 : s) === 1;
  });
  const [progress, setProgress] = useState(0);
  const [gender, setGender] = useState(() => ia.gender ?? initialGender ?? '');
  useLegacyQuizImagePrefetch(step, gender);
  const [selectedGoals, setSelectedGoals] = useState(() =>
    Array.isArray(ia.goals) ? ia.goals : initialSelectedGoals,
  );
  const [bodyType, setBodyType] = useState(() => ia.bodyType ?? '');
  const [dreamBody, setDreamBody] = useState(() => ia.dreamBody ?? '');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState(() =>
    Array.isArray(ia.selectedFocusAreas) ? ia.selectedFocusAreas : [],
  );
  const [celluliteAnswer, setCelluliteAnswer] = useState(() => ia.celluliteAnswer ?? '');
  const [bestShapeAnswer, setBestShapeAnswer] = useState(() => ia.bestShapeAnswer ?? '');
  const [weightFluctuationsAnswer, setWeightFluctuationsAnswer] = useState(
    () => ia.weightFluctuationsAnswer ?? '',
  );
  const [stairsAnswer, setStairsAnswer] = useState(() => ia.stairsAnswer ?? '');
  const [workScheduleAnswer, setWorkScheduleAnswer] = useState(() => ia.workScheduleAnswer ?? '');
  const [activityLevelAnswer, setActivityLevelAnswer] = useState(() => ia.activityLevelAnswer ?? '');
  const [selectedActivities, setSelectedActivities] = useState(() =>
    Array.isArray(ia.selectedActivities) ? ia.selectedActivities : [],
  );
  const [energyLevelAnswer, setEnergyLevelAnswer] = useState(() => ia.energyLevelAnswer ?? '');
  const [sleepAnswer, setSleepAnswer] = useState(() => ia.sleepAnswer ?? '');
  const [walkFrequencyAnswer, setWalkFrequencyAnswer] = useState(() => ia.walkFrequencyAnswer ?? '');
  const [selectedExercisePreference, setSelectedExercisePreference] = useState(() =>
    Array.isArray(ia.selectedExercisePreference) ? ia.selectedExercisePreference : [],
  );
  const [desiredWalkFrequency, setDesiredWalkFrequency] = useState(() => ia.desiredWalkFrequency ?? '');
  const [dailyStepsAnswer, setDailyStepsAnswer] = useState(() => ia.dailyStepsAnswer ?? '');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialSwipeRef = useRef({ x: null, y: null, pointerId: null });
  const [selectedWeightGainEvents, setSelectedWeightGainEvents] = useState(() =>
    Array.isArray(ia.selectedWeightGainEvents) ? ia.selectedWeightGainEvents : [],
  );
  const [motivationAnswer, setMotivationAnswer] = useState(() => ia.motivationAnswer ?? '');
  const [heightValue, setHeightValue] = useState(() =>
    ia.heightValue != null ? String(ia.heightValue) : '',
  );
  const [heightUnit, setHeightUnit] = useState(() =>
    ia.heightUnit === 'ft' || ia.heightUnit === 'cm' ? ia.heightUnit : 'cm',
  );
  const [currentWeight, setCurrentWeight] = useState(() =>
    ia.currentWeight != null ? String(ia.currentWeight) : '',
  );
  const [goalWeight, setGoalWeight] = useState(() =>
    ia.goalWeight != null ? String(ia.goalWeight) : '',
  );
  const [motivationEventAnswer, setMotivationEventAnswer] = useState(() => ia.motivationEventAnswer ?? '');
  const [emailForPlan, setEmailForPlan] = useState(() => ia.emailForPlan ?? '');
  const [rewardAnswer, setRewardAnswer] = useState(() => ia.rewardAnswer ?? '');
  const [seeYourselfAnswer, setSeeYourselfAnswer] = useState(() => ia.seeYourselfAnswer ?? '');
  const [emailOptInAnswer, setEmailOptInAnswer] = useState(() => ia.emailOptInAnswer ?? '');
  /** Vardas – Step 50 po marketing opt-in (Step 46) */
  const [quizUserName, setQuizUserName] = useState(() => ia.quizUserName ?? '');
  /** Pasitikėjimas pasiekti tikslą – Step 48 po prognozės (Step 37) */
  const [reachConfidenceAnswer, setReachConfidenceAnswer] = useState(() => ia.reachConfidenceAnswer ?? '');
  /** Įvykio data (YYYY-MM-DD) – Step 47 po motyvacijos įvykio */
  const [motivationEventDate, setMotivationEventDate] = useState(() => ia.motivationEventDate ?? '');
  /** Tikslus amžius (metais) – po goal weight (Step 34), prieš walking profile (Step 35) */
  const [exactAgeInput, setExactAgeInput] = useState(() =>
    ia.exactAgeInput != null ? String(ia.exactAgeInput) : '',
  );
  const [userExactAge, setUserExactAge] = useState(() =>
    typeof ia.userExactAge === 'number' && !Number.isNaN(ia.userExactAge) ? ia.userExactAge : null,
  );
  /** Step 43: animuojamas procentas kuriant planą */
  const [planBuildPercent, setPlanBuildPercent] = useState(PLAN_BUILD_START_PERCENT);
  /** Step 35: KMI žymeklio pozicija juostoje (0–100 %), animuojama atidarius žingsnį */
  const [profileBmiNeedlePct, setProfileBmiNeedlePct] = useState(0);

  /** Paskutinis „tikras“ apklausos žingsnis prieš peradresavimą į /offer (52 tik techninis). */
  const LEGACY_STEP_BEFORE_OFFER_REDIRECT = 51;

  /** Step 9: legacy + offer progresas į localStorage (3 min / 12 h prie offer); visi atsakymai – Step 35 atkūrimui */
  useEffect(() => {
    const persistedStep = step === 52 ? LEGACY_STEP_BEFORE_OFFER_REDIRECT : step;
    writeQuizProgress(
      {
        phase: 'legacy',
        legacyStarted: true,
        legacyStep: persistedStep,
        answers: {
          gender,
          goals: selectedGoals,
          bodyType,
          dreamBody,
          selectedFocusAreas,
          celluliteAnswer,
          bestShapeAnswer,
          weightFluctuationsAnswer,
          stairsAnswer,
          workScheduleAnswer,
          activityLevelAnswer,
          selectedActivities,
          energyLevelAnswer,
          sleepAnswer,
          walkFrequencyAnswer,
          selectedExercisePreference,
          desiredWalkFrequency,
          dailyStepsAnswer,
          selectedWeightGainEvents,
          motivationAnswer,
          heightValue,
          heightUnit,
          currentWeight,
          goalWeight,
          motivationEventAnswer,
          emailForPlan,
          rewardAnswer,
          seeYourselfAnswer,
          emailOptInAnswer,
          quizUserName,
          reachConfidenceAnswer,
          motivationEventDate,
          exactAgeInput,
          userExactAge,
        },
      },
      { offerReached: step === 52 },
    );
  }, [
    step,
    gender,
    selectedGoals,
    bodyType,
    dreamBody,
    selectedFocusAreas,
    celluliteAnswer,
    bestShapeAnswer,
    weightFluctuationsAnswer,
    stairsAnswer,
    workScheduleAnswer,
    activityLevelAnswer,
    selectedActivities,
    energyLevelAnswer,
    sleepAnswer,
    walkFrequencyAnswer,
    selectedExercisePreference,
    desiredWalkFrequency,
    dailyStepsAnswer,
    selectedWeightGainEvents,
    motivationAnswer,
    heightValue,
    heightUnit,
    currentWeight,
    goalWeight,
    motivationEventAnswer,
    emailForPlan,
    rewardAnswer,
    seeYourselfAnswer,
    emailOptInAnswer,
    quizUserName,
    reachConfidenceAnswer,
    motivationEventDate,
    exactAgeInput,
    userExactAge,
  ]);

  const handleGenderSelect = useCallback((selectedGender) => {
    setGender(selectedGender);
    setStep(3);
  }, []);

  const onFemaleClick = () => handleGenderSelect('female');
  const onMaleClick = () => handleGenderSelect('male');

  const handleContinue = useCallback(() => {
    setStep(4);
  }, []);

  const handleAgeSelect = useCallback((_ageRange) => {
    setExactAgeInput('');
    setStep(5);
  }, []);

  const handleExactAgeContinue = useCallback(() => {
    const n = Number(exactAgeInput.trim());
    if (Number.isNaN(n) || n < 18 || n > 99) return;
    setUserExactAge(n);
    setStep(35);
  }, [exactAgeInput]);

  const handleGoalToggle = useCallback((goalId) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]
    );
  }, []);

  const handleGoalsContinue = useCallback(() => {
    setStep(6);
  }, []);

  const handleBodyTypeSelect = useCallback((type) => {
    setBodyType(type);
  }, []);

  const handleBodyTypeContinue = useCallback(() => {
    setStep(7);
  }, []);

  const handleDreamBodySelect = useCallback((type) => {
    setDreamBody(type);
  }, []);

  const handleDreamBodyContinue = useCallback(() => {
    setStep(8);
  }, []);

  const handleFocusAreaToggle = useCallback((areaId) => {
    setSelectedFocusAreas((prev) => {
      if (areaId === 'full_body') {
        if (prev.includes('full_body')) {
          return prev.filter((id) => id !== 'full_body');
        }
        return [...ALL_FOCUS_AREA_IDS];
      }

      const isRemoving = prev.includes(areaId);
      let next = isRemoving
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId];

      if (prev.includes('full_body') && areaId !== 'full_body') {
        next = next.filter((id) => id !== 'full_body');
      }

      return next;
    });
  }, []);

  const handleFocusAreasContinue = useCallback(() => {
    setStep(9);
  }, []);

  const handleCelluliteSelect = useCallback((answer) => {
    setCelluliteAnswer(answer);
  }, []);

  const handleCelluliteContinue = useCallback(() => {
    setStep(10);
  }, []);

  const handleBestShapeSelect = useCallback((answer) => {
    setBestShapeAnswer(answer);
  }, []);

  const handleBestShapeContinue = useCallback(() => {
    setStep(11);
  }, []);

  const handleWeightFluctuationsSelect = useCallback((answer) => {
    setWeightFluctuationsAnswer(answer);
  }, []);

  const handleWeightFluctuationsContinue = useCallback(() => {
    setStep(12);
  }, []);

  const handleHarvardInfoContinue = useCallback(() => {
    setStep(13);
  }, []);

  const handleStairsSelect = useCallback((answer) => {
    setStairsAnswer(answer);
  }, []);

  const handleStairsContinue = useCallback(() => {
    setStep(15); // Step 14 (pratimo demo) pašalintas – tiesiai į Tai Chi promo
  }, []);

  const handleWorkScheduleSelect = useCallback((answer) => {
    setWorkScheduleAnswer(answer);
    setStep(21); // Automatiškai perkelia į kitą puslapį
  }, []);

  const handleActivityLevelSelect = useCallback((answer) => {
    setActivityLevelAnswer(answer);
    setStep(22); // Automatiškai perkelia į kitą puslapį
  }, []);

  const handleActivityToggle = useCallback((activityId) => {
    setSelectedActivities((prev) => {
      if (activityId === 'no') {
        return prev.includes('no') ? [] : ['no'];
      }
      const withoutNo = prev.filter((id) => id !== 'no');
      return withoutNo.includes(activityId)
        ? withoutNo.filter((id) => id !== activityId)
        : [...withoutNo, activityId];
    });
  }, []);

  const handleActivitiesContinue = useCallback(() => {
    setStep(23);
  }, []);

  const handleEnergyLevelSelect = useCallback((answer) => {
    setEnergyLevelAnswer(answer);
    setStep(16); // Energijos balanso ekranas („Not a problem!…“)
  }, []);

  const handleExercisePreferenceToggle = useCallback((optionId) => {
    setSelectedExercisePreference((prev) => {
      if (optionId === 'no_preference') {
        return prev.includes('no_preference') ? [] : ['no_preference'];
      }
      const withoutNo = prev.filter((id) => id !== 'no_preference');
      return withoutNo.includes(optionId)
        ? withoutNo.filter((id) => id !== optionId)
        : [...withoutNo, optionId];
    });
  }, []);

  const handleExercisePreferenceContinue = useCallback(() => {
    setStep(26); // Po Step 24 (Step 25 – „Designed…“ – jau po miego)
  }, []);

  const handleLifestyleUpgradeGreat = useCallback(() => {
    setStep(18); // „How often do you go for walks?“
  }, []);

  const handleDesiredWalkFrequencySelect = useCallback((answer) => {
    setDesiredWalkFrequency(answer);
    setStep(27); // Perkelia į „How many steps...“
  }, []);

  const handleDailyStepsSelect = useCallback((answer) => {
    setDailyStepsAnswer(answer);
    setStep(28); // Perkelia į transformation ekraną
  }, []);

  const handleTransformationContinue = useCallback(() => {
    setStep(29); // Perkelia į weight gain events
  }, []);

  const handleWeightGainEventToggle = useCallback((eventId) => {
    setSelectedWeightGainEvents((prev) => {
      if (eventId === 'none') {
        return prev.includes('none') ? [] : ['none'];
      }
      const withoutNone = prev.filter((id) => id !== 'none');
      return withoutNone.includes(eventId)
        ? withoutNone.filter((id) => id !== eventId)
        : [...withoutNone, eventId];
    });
  }, []);

  const handleWeightGainEventsContinue = useCallback(() => {
    setStep(30);
  }, []);

  const handleMotivationSelect = useCallback((answer) => {
    setMotivationAnswer(answer);
    setStep(31); // Perkelia į long-term results ekraną
  }, []);

  const handleLongTermResultsContinue = useCallback(() => {
    setStep(32);
  }, []);

  const handleHeightContinue = useCallback(() => {
    setStep(33);
  }, []);

  const handleCurrentWeightContinue = useCallback(() => {
    setStep(34);
  }, []);

  const handleGoalWeightContinue = useCallback(() => {
    setExactAgeInput('');
    setStep(42);
  }, []);

  const handleProfileContinue = useCallback(() => {
    setStep(36);
  }, []);

  const handleMotivationEventSelect = useCallback((answer) => {
    setMotivationEventAnswer(answer);
    if (answer === 'no_just_ready') {
      setStep(37);
    } else {
      setMotivationEventDate('');
      setStep(47);
    }
  }, []);

  const handleEventDateContinue = useCallback(() => {
    if (!motivationEventDate) return;
    setStep(37);
  }, [motivationEventDate]);

  const handleEventDateSkip = useCallback(() => {
    setStep(37);
  }, []);

  const handlePredictionContinue = useCallback(() => {
    setStep(48);
  }, []);

  const handleReachConfidenceSelect = useCallback((answerId) => {
    setReachConfidenceAnswer(answerId);
    setStep(49);
  }, []);

  const handleSustainableChangeGotIt = useCallback(() => {
    setStep(40);
  }, []);

  const handleGetPlanContinue = useCallback(() => {
    setEmailForPlan((v) => v.trim());
    setStep(39);
  }, []);

  const handleFinalContinue = useCallback(() => {
    setStep(40);
  }, []);

  const handleRewardSelect = useCallback((answer) => {
    setRewardAnswer(answer);
    setStep(41);
  }, []);

  const handleSeeYourselfSelect = useCallback((answer) => {
    setSeeYourselfAnswer(answer);
    setStep(43);
  }, []);

  const handleTaiChiPlanEmailContinue = useCallback(() => {
    setEmailForPlan((v) => v.trim());
    setStep(46);
  }, []);

  const handleEmailOptInSelect = useCallback((answer) => {
    setEmailOptInAnswer(answer);
    if (answer === 'yes') {
      setStep(50);
    } else {
      setQuizUserName('');
      setStep(51);
    }
  }, []);

  const handleQuizNameContinue = useCallback(() => {
    setQuizUserName((n) => n.trim());
    setStep(51);
  }, []);

  const handleTaiChiWalkingInfoGotIt = useCallback(() => {
    setStep(24); // „Where do you prefer to exercise?“ (po Tai Chi Walking info)
  }, []);

  const handleSleepSelect = useCallback((answer) => {
    setSleepAnswer(answer);
    setStep(25); // „Designed to upgrade your life“ (burbuliukai)
  }, []);

  const handleWalkFrequencySelect = useCallback((answer) => {
    setWalkFrequencyAnswer(answer);
    setStep(19); // Perkelia į Tai Chi Walking info ekraną
  }, []);

  const handleTaiChiPromoContinue = useCallback(() => {
    setStep(20); // Į „What's your work schedule like?“ (energijos info – po Step 23)
  }, []);

  const handleEnergyBalanceGotIt = useCallback(() => {
    setStep(17); // „How much sleep do you usually get?“
  }, []);

  useEffect(() => {
    if (step > MAX_QUIZ_STEP) {
      setStep(MAX_QUIZ_STEP);
    } else if (step === 14) {
      setStep(15);
    }
  }, [step]);

  /** Step 43: progresas 0 % → 100 %, tada automatiškai Step 45 (el. paštas) */
  useEffect(() => {
    if (step !== 43) return undefined;
    setPlanBuildPercent(PLAN_BUILD_START_PERCENT);
    let rafId = 0;
    let timeoutId = 0;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / PLAN_BUILD_LOADER_MS);
      const p = 100 * t;
      setPlanBuildPercent(Math.min(100, Math.round(p)));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        timeoutId = window.setTimeout(() => setStep(45), 350);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [step]);

  /** Senas Step 44 (100 % + Tęsti) pašalintas – likę state/URL nukreipiami į Step 45 */
  useEffect(() => {
    if (step === 44) setStep(45);
  }, [step]);

  /** Step 35: KMI žymeklis – nuo 0 % iki tikros pozicijos atidarius profilį */
  useEffect(() => {
    if (step !== 35) {
      setProfileBmiNeedlePct(0);
      return undefined;
    }
    const heightCm =
      heightUnit === 'cm' ? Number(heightValue) : Number(heightValue) * 2.54;
    const heightM = heightCm / 100;
    const bmiVal =
      currentWeight && heightM > 0 ? Number(currentWeight) / (heightM * heightM) : null;
    if (bmiVal == null || !Number.isFinite(bmiVal)) {
      setProfileBmiNeedlePct(0);
      return undefined;
    }
    const pos = Math.min(100, Math.max(0, ((bmiVal - 15) / 25) * 100));
    setProfileBmiNeedlePct(0);
    const tid = window.setTimeout(() => {
      setProfileBmiNeedlePct(pos);
    }, 100);
    return () => clearTimeout(tid);
  }, [step, heightUnit, heightValue, currentWeight]);

  /** Step 28: automatinė atsiliepimų karuselė (88 kg → 147 kg) */
  useEffect(() => {
    if (step !== 28) return;
    setTestimonialIndex(0);
    const intervalMs = 5000;
    const id = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TRANSFORMATION_TESTIMONIALS.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [step]);

  /** Step 28: swipe per atsiliepimus – Pointer Events + setPointerCapture (veikia, kai pirštas nuvedamas už kortelės) */
  const handleTransformationTestimonialPointerDown = useCallback((e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const el = e.currentTarget;
    if (el instanceof HTMLElement) {
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* senesnės naršyklės */
      }
    }
    testimonialSwipeRef.current = {
      x: e.clientX,
      y: e.clientY,
      pointerId: e.pointerId,
    };
  }, []);

  const handleTransformationTestimonialPointerUp = useCallback((e) => {
    const start = testimonialSwipeRef.current;
    if (start.x == null || start.y == null) return;
    if (start.pointerId != null && e.pointerId !== start.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    testimonialSwipeRef.current = { x: null, y: null, pointerId: null };
    const minSwipe = 40;
    if (Math.abs(dx) < minSwipe) return;
    if (Math.abs(dx) < Math.abs(dy)) return;
    setTestimonialIndex((prev) => {
      const n = TRANSFORMATION_TESTIMONIALS.length;
      if (dx < 0) return (prev + 1) % n;
      return (prev - 1 + n) % n;
    });
  }, []);

  const handleTransformationTestimonialPointerCancel = useCallback(() => {
    testimonialSwipeRef.current = { x: null, y: null, pointerId: null };
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const totalSteps = LOADING_DURATION_MS / PROGRESS_UPDATE_INTERVAL_MS;
    const increment = 100 / totalSteps;
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setStep(2);
        setIsLoading(false);
        setProgress(0);
      } else {
        setProgress(Math.round(currentProgress));
      }
    }, PROGRESS_UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Step 52: nukreipimas į offer maršrutą (query išsaugomi per withPreservedQueryParams)
  if (step === 52) {
    const goalNum = Number(String(goalWeight).replace(',', '.'));
    const targetKg = Number.isFinite(goalNum) && goalNum > 0 ? goalNum : 85;
    return <Step52OfferRedirect targetWeightKg={targetKg} />;
  }

  // Step 1: Pradinis langas su fonine nuotrauka + automatinis užkrovimas
  if (step === 1) {
    return (
      <div className="relative min-h-screen w-full overflow-x-clip overflow-y-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{ backgroundImage: `url(${firstPageBackgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-lg flex-col px-6 pb-10 pt-10">
          <header className="flex shrink-0 justify-center pt-4">
            <WalkingIcon showLabel size="md" labelClassName="text-white drop-shadow-md" />
          </header>

          <div className="flex min-h-0 flex-1 flex-col justify-end pb-6 pt-6 sm:pb-10 sm:pt-10">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl sm:leading-tight">
              <span className="block">{t('quiz.splash.leadIn')}</span>
              <span className="mt-1 block sm:mt-2">{t('quiz.splash.titleLine2')}</span>
              <span className="mt-1 block sm:mt-2">{t('quiz.splash.titleLine3')}</span>
            </h1>
          </div>

          <div className="w-full shrink-0 space-y-2 pb-6">
            <p className="flex items-center justify-center gap-1 text-sm font-medium text-white/95 drop-shadow">
              {t('quiz.splash.loadingLabel')}
              <CaretDown className="h-4 w-4 shrink-0" weight="bold" aria-hidden />
            </p>
            <div className="relative mx-auto h-14 w-full max-w-md overflow-hidden rounded-full bg-black/50 shadow-inner ring-1 ring-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
                aria-hidden
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold tabular-nums text-white drop-shadow-md">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Bendras Quiz step layout (Step 2 ir Step 3)
  const quizStepProgress = getQuizProgressPercent(step);

  const renderQuizStepLayout = (content, options = {}) => {
    const { backStep, mainClassName, screenClassName, footer } = options;
    const goBack = () => {
      if (backStep !== undefined) {
        setStep(backStep);
        return;
      }
      setStep((prev) => Math.max(1, prev - 1));
    };
    const shellBg = screenClassName ?? 'bg-white';
    const scrollAreaBase =
      'relative z-0 flex min-h-0 w-full flex-1 flex-col items-center justify-start overflow-y-auto overflow-x-visible px-6 pt-10 md:pt-14';
    const scrollPadding = footer
      ? 'pb-6'
      : 'pb-[calc(1rem+env(safe-area-inset-bottom,0px))]';
    return (
    <>
      <div className={`flex h-[100dvh] min-h-0 flex-col overflow-hidden ${shellBg}`}>
        {/* Header: atgal | logo | hamburger – kaip reference (švarus baltas) */}
        <header
          className={`relative z-20 grid shrink-0 grid-cols-3 items-center border-b border-gray-100 px-4 py-4 ${shellBg}`}
        >
          <button
            type="button"
            onClick={goBack}
            className="flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-50"
            aria-label={t('common.back')}
          >
            <CaretLeft size={24} weight="bold" className="text-gray-500" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-50"
              aria-label={t('common.menu')}
            >
              <List size={24} weight="bold" className="text-gray-600" />
            </button>
          ) : (
            <span className="justify-self-end" aria-hidden />
          )}
        </header>

        {/* Plona progreso juosta – terrakota / oranžinis užpildymas */}
        <div className="h-0.5 w-full shrink-0 bg-gray-100">
          <div
            className="h-full bg-[#e07a4f] transition-all duration-300 ease-out"
            style={{ width: `${quizStepProgress}%` }}
          />
        </div>

        {/* Turinys slankosi viduje; optional footer – „Tęsti“ prisegtas prie apačios (mobilus / desktop) */}
        {footer ? (
          <main className="relative z-0 flex min-h-0 w-full flex-1 flex-col overflow-hidden">
            <div className={`${scrollAreaBase} ${scrollPadding} ${mainClassName ?? ''}`}>{content}</div>
            <div
              className={`shrink-0 border-t border-gray-200/90 px-6 pt-4 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur-[2px] ${shellBg}`}
            >
              <div className="mx-auto w-full max-w-md">{footer}</div>
            </div>
          </main>
        ) : (
          <main className={`${scrollAreaBase} ${scrollPadding} ${mainClassName ?? ''}`}>{content}</main>
        )}
      </div>
      {step === 2 ? <QuizMenuDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> : null}
    </>
    );
  };

  // Step 2: Lyties pasirinkimas – 1:1 su reference (be HelpCircle, terrakota, ♀/♂)
  if (step === 2) {
    return renderQuizStepLayout(
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold leading-tight text-gray-900 md:text-[1.75rem]">
            {t('quiz.gender.title')}
            <span className={`font-semibold ${GENDER_ACCENT_CLASS}`}>{t('quiz.gender.titleAccent')}</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">{t('quiz.gender.subtitle')}</p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={onFemaleClick}
            className={QUIZ_OPTION_GENDER_ROW}
          >
            <span className="pointer-events-none flex h-10 w-10 shrink-0 items-center justify-center">
              <GenderFemale size={36} weight="fill" className={GENDER_ACCENT_CLASS} />
            </span>
            <span className="pointer-events-none font-bold text-gray-900">{t('quiz.gender.female')}</span>
          </button>
          {QUIZ_MALE_BRANCH_ENABLED ? (
            <button
              type="button"
              onClick={onMaleClick}
              className={QUIZ_OPTION_GENDER_ROW}
            >
              <span className="pointer-events-none flex h-10 w-10 shrink-0 items-center justify-center">
                <GenderMale size={36} weight="fill" className={GENDER_ACCENT_CLASS} />
              </span>
              <span className="pointer-events-none font-bold text-gray-900">{t('quiz.gender.male')}</span>
            </button>
          ) : (
            <p className="text-center text-xs leading-relaxed text-gray-400">{tLegacy('maleProgramNote')}</p>
          )}
        </div>
      </div>
    );
  }

  // Step 3: Dinaminis turinys pagal lytį – kompaktiškas tekstas + nuotrauka (kaip reference)
  if (step === 3) {
    const isFemale = gender !== 'male'; // fallback į female jei gender tuščias
    const titleLine = isFemale ? t('quiz.trust.headlineFemale') : t('quiz.trust.headlineMale');
    const imageSrc = isFemale ? threeWomenHeroImage : threeMenHeroImage;

    return (
      <>
      <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden overflow-x-clip bg-[#f3e9dc]">
        {/* Header: atgal | logo */}
        <header className="grid shrink-0 grid-cols-3 items-center border-b border-amber-200/50 bg-white/80 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label={t('common.back')}
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <span className="justify-self-end" aria-hidden />
        </header>

        {/* Progreso juosta */}
        <div className="h-1 w-full shrink-0 bg-amber-200/50">
          <div
            className="h-full bg-orange-500 transition-all duration-300 ease-out"
            style={{ width: `${getQuizProgressPercent(step)}%` }}
          />
        </div>

        {/* Kompaktiškas blokas: kairėje antraštė + ikonos, dešinėje nuotrauka */}
        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center overflow-y-auto overflow-x-clip px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex w-full max-w-3xl flex-col items-center gap-12 sm:max-w-4xl md:max-w-6xl md:flex-row md:items-center md:justify-center md:gap-20">
            <div className="min-w-0 flex-1 text-center md:max-w-[min(100%,40rem)] md:text-left">
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start md:gap-4">
                <img
                  src={laurelLeftSvg}
                  alt=""
                  className="h-[4.5rem] w-auto shrink-0 object-contain sm:h-20"
                  width={42}
                  height={72}
                  aria-hidden
                />
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                  {titleLine}
                </h2>
                <img
                  src={laurelLeftSvg}
                  alt=""
                  className="h-[4.5rem] w-auto shrink-0 -scale-x-100 object-contain sm:h-20"
                  width={42}
                  height={72}
                  aria-hidden
                />
              </div>
              <p className="mt-4 text-base font-normal leading-snug text-gray-600 sm:text-xl">
                <Trans
                  i18nKey="quiz.trust.sublineRich"
                  components={{ w: <span className="font-semibold text-gray-800" /> }}
                />
              </p>
            </div>
            <div className="w-full max-w-[22rem] shrink-0 sm:max-w-[26rem] md:max-w-[29rem]">
              <img
                src={imageSrc}
                alt={isFemale ? t('quiz.trust.heroAltFemale') : t('quiz.trust.heroAltMale')}
                className="h-auto w-full object-contain object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Continue mygtukas – fiksuota juosta apačioje (mobilus) */}
        <div className="relative z-10 flex shrink-0 justify-center border-t border-amber-200/50 bg-[#f3e9dc]/95 px-6 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] backdrop-blur-sm">
          <button
            type="button"
            onClick={handleContinue}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED}
          >{t('quiz.common.continue')}
        </button>
        </div>
      </div>
      </>
    );
  }

  // Step 4: Amžiaus pasirinkimas (moterys ir vyrai – skirtingos nuotraukos)
  if (step === 4) {
    const ageImages = gender === 'male' ? MALE_AGE_IMAGES : FEMALE_AGE_IMAGES;
    const AGE_OPTIONS = [
      { range: '40-49', labelKey: 'quiz.age.option4049' },
      { range: '50-59', labelKey: 'quiz.age.option5059' },
      { range: '60-69', labelKey: 'quiz.age.option6069' },
      { range: '70-80', labelKey: 'quiz.age.option7080' },
    ];

    return (
      <>
      <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden overflow-x-clip bg-white">
        {/* Header */}
        <header className="grid shrink-0 grid-cols-3 items-center border-b border-gray-200 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))]">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label={t('common.back')}
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <span className="justify-self-end" aria-hidden />
        </header>

        {/* Progreso juosta */}
        <div className="h-1 w-full shrink-0 bg-gray-200">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${getQuizProgressPercent(step)}%` }}
          />
        </div>

        {/* Turinys */}
        <main className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 py-8 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <h2 className="text-center text-lg font-bold uppercase tracking-wide text-gray-900">
            {t('quiz.age.heading')}
          </h2>
          <p className="mt-1 text-center text-sm font-medium uppercase tracking-wide text-gray-500">
            {t('quiz.age.basedOnAge')}
          </p>

          {/* 2x2 amžiaus kortelės – kompaktiškos (~pusė ankstesnio), portretas baltame fone, oranžinė „piliulė“ */}
          <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-2.5 sm:max-w-md sm:gap-3">
            {AGE_OPTIONS.map((option) => (
              <button
                key={option.range}
                type="button"
                onClick={() => handleAgeSelect(option.range)}
                className="group flex cursor-pointer flex-col overflow-visible rounded-2xl border-0 bg-transparent p-0 text-left shadow-none transition-transform duration-200 active:scale-[0.98] hover:opacity-[0.98]"
              >
                <div className="relative flex min-h-[118px] w-full items-end justify-center overflow-hidden rounded-xl bg-white px-1.5 pt-2 sm:min-h-[132px]">
                  <img
                    src={ageImages[option.range]}
                    alt={`Age ${option.range}`}
                    className="max-h-[118px] w-full object-contain object-top sm:max-h-[132px]"
                  />
                </div>
                <div className="relative z-10 -mt-2.5 mx-1.5 mb-1 flex min-h-[2.25rem] items-center justify-between gap-2 rounded-full bg-orange-500 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-sm sm:px-3 sm:text-xs">
                  <span className="truncate">{t(option.labelKey)}</span>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white sm:h-6 sm:w-6">
                    <CaretRight size={14} weight="bold" className="text-orange-500" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 18-39 nuoroda */}
          <button
            type="button"
            onClick={() => handleAgeSelect('18-39')}
            className="mt-6 text-sm font-semibold text-gray-900 underline-offset-2 hover:underline"
          >
            {tLegacy('ageLink1839')}
          </button>
        </main>
      </div>
      </>
    );
  }

  // Step 42: „How old are you?“ – po goal weight (Step 34), prieš walking profile (Step 35)
  if (step === 42) {
    const exactAgeNum = Number(exactAgeInput.trim());
    const exactAgeValid =
      exactAgeInput.trim() !== '' &&
      !Number.isNaN(exactAgeNum) &&
      exactAgeNum >= 18 &&
      exactAgeNum <= 99;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{t('quiz.exactAge.title')}</h2>
          <p className="text-sm text-gray-500">{t('quiz.exactAge.subtitle')}</p>
        </div>

        <label className="sr-only" htmlFor="quiz-exact-age">
          {tLegacy('exactAgeSr')}
        </label>
        <input
          id="quiz-exact-age"
          type="text"
          inputMode="numeric"
          autoComplete="bday-year"
          placeholder="-"
          maxLength={3}
          value={exactAgeInput}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 3);
            setExactAgeInput(digits);
          }}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-center text-2xl font-semibold tracking-wide text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
        />
      </div>,
      {
        backStep: 34,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleExactAgeContinue}
              disabled={!exactAgeValid}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 5: Tikslų pasirinkimas (multi-select)
  if (step === 5) {
    const GOAL_IDS = [
      'lose_weight',
      'heart_health',
      'flexibility',
      'self_esteem',
      'stay_fit',
      'reduce_stress',
      'firm_toned',
    ];

    const hasSelectedGoals = selectedGoals.length > 0;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.goals.title')}
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              {t('quiz.goals.hint')}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {GOAL_IDS.map((id) => {
              const isSelected = selectedGoals.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleGoalToggle(id)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span className="font-medium text-gray-900">{t(`quiz.goals.${id}`)}</span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isSelected
                        ? QUIZ_OPTION_CHECKBOX_SELECTED
                        : QUIZ_OPTION_CHECKBOX_IDLE
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle size={18} className={QUIZ_OPTION_CHECK_ICON} strokeWidth={2.5} />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Validacijos pranešimas – kai nieko nepasirinkta */}
        {!hasSelectedGoals && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">{t('quiz.goals.validation')}</span>
          </div>
        )}
      </div>,
      {
        backStep: 4,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleGoalsContinue}
              disabled={!hasSelectedGoals}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 6: Kūno tipo pasirinkimas (moterų / vyrų nuotraukos pagal gender)
  if (step === 6) {
    const bodyTypeImages = gender === 'male' ? MALE_BODY_TYPE_IMAGES : BODY_TYPE_IMAGES;
    const BODY_TYPE_IDS = ['slim', 'mid_sized', 'plus_sized', 'overweight'];

    const hasSelectedBodyType = bodyType !== '';

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.bodyType.title')}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {BODY_TYPE_IDS.map((id) => {
              const isSelected = bodyType === id;
              const label = t(`quiz.flow.bodyType.${id}`);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleBodyTypeSelect(id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={bodyTypeImages[id]}
                      alt={label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="flex-1 font-medium text-gray-900">{label}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelectedBodyType && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">{tLegacy('validation.selectBodyType')}</span>
          </div>
        )}
      </div>,
      {
        backStep: 5,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleBodyTypeContinue}
              disabled={!hasSelectedBodyType}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 7: Dream body pasirinkimas (vyrams – atskiros nuotraukos, „Shapely“ vietoj „Curvy“)
  if (step === 7) {
    const dreamBodyImages = gender === 'male' ? MALE_DREAM_BODY_IMAGES : DREAM_BODY_IMAGES;
    const DREAM_BODY_IDS = ['thin', 'toned', 'curvy', 'healthy'];
    const dreamLabelFor = (id) =>
      id === 'curvy'
        ? gender === 'male'
          ? t('quiz.flow.dreamBody.curvyMale')
          : t('quiz.flow.dreamBody.curvyFemale')
        : t(`quiz.flow.dreamBody.${id}`);

    const hasSelectedDreamBody = dreamBody !== '';

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.dreamBody.title')}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {DREAM_BODY_IDS.map((id) => {
              const isSelected = dreamBody === id;
              const label = dreamLabelFor(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleDreamBodySelect(id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={dreamBodyImages[id]}
                      alt={label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="flex-1 font-medium text-gray-900">{label}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelectedDreamBody && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">{tLegacy('validation.selectDreamBody')}</span>
          </div>
        )}
      </div>,
      {
        backStep: 6,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleDreamBodyContinue}
              disabled={!hasSelectedDreamBody}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 8: Kurių sričių norite sutelkti dėmesį (vyrams – atskiros nuotraukos; „Full body“ = visi)
  if (step === 8) {
    const focusAreaImages = gender === 'male' ? MALE_FOCUS_AREA_IMAGES : FOCUS_AREA_IMAGES;
    const FOCUS_AREA_IDS = ['legs', 'belly', 'arms', 'chest', 'buttocks', 'hips', 'full_body'];

    const hasSelectedAreas = selectedFocusAreas.length > 0;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.focus.title')}
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              {t('quiz.flow.focus.subtitle')}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FOCUS_AREA_IDS.map((id) => {
              const isSelected = selectedFocusAreas.includes(id);
              const label = t(`quiz.flow.focus.${id}`);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleFocusAreaToggle(id)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={focusAreaImages[id]}
                        alt={label}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-900">{label}</span>
                  </div>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isSelected
                        ? QUIZ_OPTION_CHECKBOX_SELECTED
                        : QUIZ_OPTION_CHECKBOX_IDLE
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle size={18} className={QUIZ_OPTION_CHECK_ICON} strokeWidth={2.5} />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelectedAreas && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">{tLegacy('validation.selectArea')}</span>
          </div>
        )}
      </div>,
      {
        backStep: 7,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleFocusAreasContinue}
              disabled={!hasSelectedAreas}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 9: Do you struggle with cellulite?
  if (step === 9) {
    const CELLULITE_OPTIONS = [
      { id: 'yes', icon: 'check' },
      { id: 'no', icon: 'x' },
      { id: 'a_little', icon: 'ellipsis' },
    ];

    const hasSelected = celluliteAnswer !== '';

    const renderIcon = (iconType, isSelected) => {
      const iconClass = isSelected ? 'text-white' : 'text-gray-500';
      if (iconType === 'check') {
        return <Check size={20} weight="bold" className={iconClass} />;
      }
      if (iconType === 'x') {
        return <X size={20} weight="bold" className={iconClass} />;
      }
      return <Minus size={20} weight="bold" className={iconClass} />;
    };

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.cellulite.title')}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {CELLULITE_OPTIONS.map((option) => {
              const isSelected = celluliteAnswer === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleCelluliteSelect(option.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isSelected ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  >
                    {renderIcon(option.icon, isSelected)}
                  </span>
                  <span className="flex-1 font-medium text-gray-900">
                    {t(`quiz.flow.cellulite.${option.id}`)}
                  </span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelected && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">{tLegacy('validation.selectOption')}</span>
          </div>
        )}
      </div>,
      {
        backStep: 8,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleCelluliteContinue}
              disabled={!hasSelected}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 10: How long ago were you in the best shape?
  if (step === 10) {
    const bestShapeSideHero =
      gender === 'male' ? menPritupstaiHeroImage : bestShapeHeroImage;
    const BEST_SHAPE_IDS = ['less_than_year', '1_to_2_years', 'more_than_3', 'never'];

    const hasSelected = bestShapeAnswer !== '';

    return renderQuizStepLayout(
      <div className="relative w-full max-w-2xl pb-8 md:pb-12">
        {/* md+: šoninis herojus; mobilus – tas pats vaizdas sraute žemiau */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 hidden w-screen max-w-[100vw] -translate-x-1/2 justify-end pr-3 sm:pr-4 md:flex md:pr-6"
          aria-hidden
        >
          <img
            src={bestShapeSideHero}
            alt=""
            className="h-auto max-h-[min(48vh,380px)] w-auto max-w-[min(92vw,560px)] object-contain object-right object-bottom sm:max-h-[min(62vh,560px)] md:max-h-[min(72vh,640px)]"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col pb-2 md:pb-28">
          <h2 className="text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
            {t('quiz.flow.bestShape.title')}
          </h2>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10">
            {BEST_SHAPE_IDS.map((id) => {
              const isSelected = bestShapeAnswer === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleBestShapeSelect(id)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span className="font-medium text-gray-900">{t(`quiz.flow.bestShape.${id}`)}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>

          {!hasSelected && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
              <LucideXCircle size={20} className="text-blue-500 shrink-0" />
              <span className="text-sm font-medium">{tLegacy('validation.selectOption')}</span>
            </div>
          )}

          <div className="flex w-full justify-center px-1 pt-3 md:hidden" aria-hidden>
            <img
              src={bestShapeSideHero}
              alt=""
              className="h-auto max-h-[min(40vh,260px)] w-auto max-w-[min(100%,20rem)] object-contain object-bottom"
            />
          </div>
        </div>
      </div>,
      {
        backStep: 9,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleBestShapeContinue}
              disabled={!hasSelected}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 11: How would you describe your weight fluctuations?
  if (step === 11) {
    const weightFluctuationsSideHero =
      gender === 'male' ? menStabilityBallHeroImage : weightFluctuationsHeroImage;
    const WEIGHT_FLUCT_IDS = ['gain_fast_lose_slow', 'gain_lose_easily', 'struggle_to_gain'];

    const hasSelected = weightFluctuationsAnswer !== '';
    const isMaleWeightFluctuations = gender === 'male';

    return renderQuizStepLayout(
      <div className="relative w-full max-w-2xl pb-8 md:pb-12">
        <div
          className={`pointer-events-none absolute bottom-0 left-1/2 z-0 hidden w-screen max-w-[100vw] -translate-x-1/2 justify-end md:flex ${
            isMaleWeightFluctuations
              ? 'top-[max(5.5rem,20vh)] items-end pr-1 sm:pr-2 md:pr-4'
              : 'items-start pr-3 sm:pr-4 md:pr-6'
          }`}
          aria-hidden
        >
          <img
            src={weightFluctuationsSideHero}
            alt=""
            className={
              isMaleWeightFluctuations
                ? 'h-auto max-h-[min(52vh,420px)] w-auto max-w-[min(90vw,480px)] translate-x-1 object-contain object-right object-bottom sm:max-h-[min(58vh,520px)] sm:translate-x-2 md:max-h-[min(68vh,600px)] md:max-w-[min(42vw,520px)] md:translate-x-4 lg:translate-x-6'
                : 'h-auto max-h-[min(48vh,380px)] w-auto max-w-[min(92vw,560px)] object-contain object-right object-bottom sm:max-h-[min(62vh,560px)] md:max-h-[min(72vh,640px)]'
            }
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col pb-2 md:pb-28">
          <h2 className="text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
            {t('quiz.flow.weightFluct.title')}
          </h2>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10">
            {WEIGHT_FLUCT_IDS.map((id) => {
              const isSelected = weightFluctuationsAnswer === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleWeightFluctuationsSelect(id)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span className="font-medium text-gray-900">{t(`quiz.flow.weightFluct.${id}`)}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>

          {!hasSelected && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
              <LucideXCircle size={20} className="text-blue-500 shrink-0" />
              <span className="text-sm font-medium">{tLegacy('validation.selectOption')}</span>
            </div>
          )}

          <div className="flex w-full justify-center px-1 pt-3 md:hidden" aria-hidden>
            <img
              src={weightFluctuationsSideHero}
              alt=""
              className={
                isMaleWeightFluctuations
                  ? 'h-auto max-h-[min(42vh,280px)] w-auto max-w-[min(100%,18rem)] translate-x-0.5 object-contain object-bottom'
                  : 'h-auto max-h-[min(40vh,260px)] w-auto max-w-[min(100%,20rem)] object-contain object-bottom'
              }
            />
          </div>
        </div>
      </div>,
      {
        backStep: 10,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleWeightFluctuationsContinue}
              disabled={!hasSelected}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 12: Informacinis ekranas – Harvard / Tai Chi nauda (moterims / vyrams)
  if (step === 12) {
    const isMaleHarvardInfo = gender === 'male';
    const shellBg = isMaleHarvardInfo
      ? 'bg-gradient-to-b from-white via-[#fdf8f2] to-[#f5e6d4]'
      : 'bg-[#fdf5e6]';

    const footerBg = isMaleHarvardInfo ? 'bg-[#f5e6d4]/95' : 'bg-[#fdf5e6]/95';

    return (
      <>
      <div className={`flex h-[100dvh] min-h-0 flex-col overflow-hidden overflow-x-clip ${shellBg}`}>
        {/* Header */}
        <header className="grid shrink-0 grid-cols-3 items-center border-b border-amber-200/50 bg-white/80 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setStep(11)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label={t('common.back')}
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <span className="justify-self-end" aria-hidden />
        </header>

        {/* Progreso juosta */}
        <div className="h-1 w-full shrink-0 bg-amber-200/50">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${getQuizProgressPercent(step)}%` }}
          />
        </div>

        {/* Turinys: slankoma sritis – md+ šoninis herojus; mobilus – gydytojas sraute po citata */}
        <div className="relative min-h-0 flex-1 overflow-y-auto overflow-x-clip px-6 py-5">
          {isMaleHarvardInfo ? (
            <div
              className="pointer-events-none absolute bottom-0 right-0 z-0 hidden justify-end overflow-visible md:flex"
              aria-hidden
            >
              <img
                src={harvardInfoMaleDoctorImage}
                alt=""
                className="h-auto max-h-[min(56vh,500px)] w-auto max-w-[min(78vw,420px)] translate-x-3 object-contain object-right object-bottom sm:max-h-[min(64vh,580px)] sm:max-w-[min(70vw,480px)] sm:translate-x-5 md:max-h-[min(72vh,640px)] md:max-w-[min(58vw,520px)] md:translate-x-8 lg:translate-x-12"
              />
            </div>
          ) : (
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 z-0 hidden w-screen max-w-[100vw] -translate-x-1/2 justify-end pr-2 sm:pr-4 md:flex md:pr-6"
              aria-hidden
            >
              <img
                src={harvardInfoDoctorImage}
                alt=""
                className="h-auto max-h-[min(48vh,420px)] w-auto max-w-[min(88vw,520px)] object-contain object-right object-bottom sm:max-h-[min(56vh,520px)] md:max-h-[min(62vh,600px)]"
              />
            </div>
          )}

          <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col">
            {/* Harvard Gazette logotipas */}
            <div className="mb-4">
              <img
                src={harvardGazetteLogo}
                alt={t('quiz.flow.harvard.gazetteAlt')}
                className="h-7 w-auto max-w-[200px] sm:h-8"
              />
            </div>

            {/* Antraštė */}
            {isMaleHarvardInfo ? (
              <h2 className="mb-6 text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
                {t('quiz.flow.harvard.maleTitleBefore')}{' '}
                <span className="text-orange-500">{t('quiz.flow.harvard.maleBenefits')}</span>
                {' '}
                {t('quiz.flow.harvard.maleTitleMid')}{' '}
                <span className="text-orange-500">{t('quiz.flow.harvard.maleAge')}</span>
              </h2>
            ) : (
              <div className="mb-6 flex items-start gap-2">
                <HelpCircle size={28} className={`${QUIZ_ICON_CLASS} mt-1`} />
                <h2 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                  {t('quiz.flow.harvard.femaleHelp')}{' '}
                  <span className="text-orange-500">{t('quiz.flow.harvard.femaleBenefits')}</span>
                  {' '}
                  {t('quiz.flow.harvard.femaleTitleMid')}{' '}
                  <span className="text-orange-500">{t('quiz.flow.harvard.femaleAge')}</span>
                </h2>
              </div>
            )}

            {/* Citatos kortelė */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <span className="text-3xl font-serif text-orange-500">&ldquo;</span>
              <p className="mt-2 text-gray-700">
                {t('quiz.flow.harvard.quotePart1')}{' '}
                <strong>{t('quiz.flow.harvard.quoteBold1')}</strong>{' '}
                {t('quiz.flow.harvard.quotePart2')}{' '}
                <strong>{t('quiz.flow.harvard.quoteBold2')}</strong>{' '}
                {t('quiz.flow.harvard.quotePart3')}
              </p>
            </div>

            {/* Mobilus: gydytojas po citata – matomas kartu slankant; nebespaudžia turinio į ekrano dugną */}
            <div className="mt-5 flex w-full justify-center pb-2 md:hidden" aria-hidden>
              <img
                src={isMaleHarvardInfo ? harvardInfoMaleDoctorImage : harvardInfoDoctorImage}
                alt=""
                className={
                  isMaleHarvardInfo
                    ? 'h-auto max-h-[min(38vh,260px)] w-auto max-w-[min(100%,18rem)] object-contain object-bottom'
                    : 'h-auto max-h-[min(36vh,240px)] w-auto max-w-[min(100%,20rem)] object-contain object-bottom'
                }
              />
            </div>
          </div>
        </div>

        {/* Continue – fiksuota juosta apačioje */}
        <div
          className={`relative z-20 flex shrink-0 justify-center border-t border-amber-200/50 px-6 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur-sm ${footerBg}`}
        >
          <button
            type="button"
            onClick={handleHarvardInfoContinue}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED}
          >{t('quiz.common.continue')}
        </button>
        </div>
      </div>
      </>
    );
  }

  // Step 13: How do you feel after climbing some stairs?
  if (step === 13) {
    const stairsOptionImages =
      gender === 'male' ? MALE_STAIRS_OPTION_IMAGES : STAIRS_OPTION_IMAGES;
    const STAIRS_IDS = ['out_of_breath', 'sometimes_tired', 'easily'];

    const hasSelected = stairsAnswer !== '';

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.stairs.title')}
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              {t('quiz.flow.stairs.subtitle')}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {STAIRS_IDS.map((id) => {
              const isSelected = stairsAnswer === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleStairsSelect(id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={stairsOptionImages[id]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="flex-1 font-medium text-gray-900">{t(`quiz.flow.stairs.${id}`)}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelected && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">{tLegacy('validation.selectOption')}</span>
          </div>
        )}
      </div>,
      {
        backStep: 12,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleStairsContinue}
              disabled={!hasSelected}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 15: Tai Chi promo – Continue perkelia į darbo grafiko klausimus
  if (step === 15) {
    const isMaleTaiChiPromo = gender === 'male';
    const promoHeroSrc = isMaleTaiChiPromo ? taiChiPromoMaleHeroImage : TAI_CHI_PROMO_IMAGE;
    const pageBg = isMaleTaiChiPromo ? 'bg-[#faf6f0]' : 'bg-[#fdf5e6]';
    const fadeTo = isMaleTaiChiPromo ? 'to-[#faf6f0]' : 'to-[#fdf5e6]';

    return (
      <>
      <div className={`flex min-h-screen flex-col overflow-x-clip ${pageBg}`}>
        <header className="grid shrink-0 grid-cols-3 items-center border-b border-amber-200/50 bg-white/80 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setStep(13)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label={t('common.back')}
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <span className="justify-self-end" aria-hidden />
        </header>
        <div className="h-1 w-full shrink-0 bg-amber-200/50">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${getQuizProgressPercent(step)}%` }}
          />
        </div>
        <div
          className={
            isMaleTaiChiPromo
              ? 'relative min-h-[min(58vh,480px)] w-full shrink-0 overflow-hidden sm:min-h-[min(64vh,560px)] md:min-h-[min(70vh,640px)]'
              : 'relative h-56 w-full shrink-0 overflow-hidden md:h-72'
          }
        >
          <img
            src={promoHeroSrc}
            alt=""
            className={
              isMaleTaiChiPromo
                ? 'absolute inset-0 h-full w-full object-cover object-[center_22%] md:object-[center_28%]'
                : 'h-full w-full object-cover'
            }
            loading="lazy"
            decoding="async"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent via-white/25 ${fadeTo}`}
            aria-hidden
          />
        </div>
        <div className="flex flex-1 flex-col px-6 pb-10 pt-6 sm:px-8">
          <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-end text-center sm:max-w-xl">
            <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
              {t('quiz.flow.taiChiPromo.title')}
            </h2>
            <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
              {t('quiz.flow.taiChiPromo.body')}
            </p>
          </div>
          <div className="flex justify-center pb-6 pt-2">
            <button
              type="button"
              onClick={handleTaiChiPromoContinue}
              className={CONTINUE_BUTTON_ALWAYS_ENABLED}
            >{t('quiz.common.continue')}
          </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Step 16: Energijos balanso informacinis ekranas – „Not a problem! We'll balance your energy levels"
  if (step === 16) {
    return (
      <>
      <div
        className="flex min-h-screen flex-col overflow-x-clip bg-gradient-to-b from-[#fffefb] via-[#fff8f0] to-[#ffe8d4]"
      >
        <header className="grid shrink-0 grid-cols-3 items-center border-b border-amber-200/40 bg-white/70 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setStep(23)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label={t('common.back')}
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <span className="justify-self-end" aria-hidden />
        </header>
        <div className="h-1 w-full bg-amber-200/50">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${getQuizProgressPercent(step)}%` }}
          />
        </div>

        <div className="flex flex-1 flex-col px-6">
          <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center py-8 text-center">
            <h2 className="text-balance text-2xl font-bold text-gray-900 md:text-3xl">
              {t('quiz.flow.energyBalance.title')}
            </h2>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700">
              {t('quiz.flow.energyBalance.subtitle')}
            </p>

            <div className="my-8 flex w-full max-w-lg justify-center">
              <img
                src={energyHighIntensityDiagram}
                alt={t('quiz.flow.energyBalance.diagramAlt')}
                className="h-auto w-full max-h-[min(52vh,440px)] object-contain object-center drop-shadow-sm"
              />
            </div>

            <p className="max-w-lg text-pretty text-gray-700">
              {t('quiz.flow.energyBalance.body1')}
            </p>
            <p className="mt-4 max-w-lg text-pretty text-gray-700">
              {t('quiz.flow.energyBalance.body2')}
            </p>
          </div>

          <div className="mx-auto w-full max-w-md pb-10 pt-2">
            <button
              type="button"
              onClick={handleEnergyBalanceGotIt}
              className={`${CONTINUE_BUTTON_ALWAYS_ENABLED} w-full`}
            >
              {t('quiz.flow.common.gotIt')}
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Step 17: How much sleep do you usually get? – po energijos balanso (Step 16)
  if (step === 17) {
    const sleepHeroImage =
      gender === 'male' ? sleepMenInBedHeroImage : sleepInBedHeroImage;
    const sleepHeroAlt =
      gender === 'male'
        ? t('quiz.flow.sleep.maleAlt')
        : t('quiz.flow.sleep.femaleAlt');
    const SLEEP_IDS = ['less_than_5', '5_to_6', '7_to_8', 'more_than_8'];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col">
        <div className="space-y-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
            {t('quiz.flow.sleep.title')}
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
            <img
              src={sleepHeroImage}
              alt={sleepHeroAlt}
              className="h-auto max-h-[min(48vh,420px)] w-full object-cover object-center"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {SLEEP_IDS.map((id) => {
              const isSelected = sleepAnswer === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSleepSelect(id)}
                  className={`rounded-xl px-4 py-4 text-center font-semibold text-gray-900 shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  {t(`quiz.flow.sleep.${id}`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Step 18: How often do you go for walks? – po Step 25 („Designed to upgrade your life“)
  if (step === 18) {
    const WALK_FREQ_IDS = ['almost_daily', '3_4_week', '1_2_week', 'once_month'];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
            {t('quiz.flow.walkFreq.title')}
          </h2>

          <div className="flex flex-col gap-3">
            {WALK_FREQ_IDS.map((id) => {
              const isSelected = walkFrequencyAnswer === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleWalkFrequencySelect(id)}
                  className={`rounded-xl px-4 py-4 text-center font-semibold text-gray-900 shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  {t(`quiz.flow.walkFreq.${id}`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>,
      {
        backStep: 25,
        mainClassName: 'bg-[#ffe8d6]',
      },
    );
  }

  // Step 19: po „How often do you go for walks?“ – Tai Chi info; vyrams tas pats tekstas + vyras dešinėje
  if (step === 19) {
    if (gender === 'male') {
      return renderQuizStepLayout(
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
          <div className="flex w-full flex-col-reverse items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-12">
            <div className="min-w-0 w-full max-w-xl space-y-4 text-center md:max-w-md md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.taiChiInfo.title')}
              </h2>
              <p className="text-pretty text-gray-700">
                {t('quiz.flow.taiChiInfo.p1a')}{' '}
                {t('quiz.flow.taiChiInfo.p1b')}{' '}
                <strong>{t('quiz.flow.taiChiInfo.p1c')}</strong>
                {' — '}
                {t('quiz.flow.taiChiInfo.p1d')}
                {' — '}
                <strong>{t('quiz.flow.taiChiInfo.p1e')}</strong>{' '}
                {t('quiz.flow.taiChiInfo.p1f')}
              </p>
              <p className="text-sm text-gray-600">
                {t('quiz.flow.taiChiInfo.source')}
              </p>
            </div>

            <div className="flex w-full shrink-0 justify-center md:w-auto">
              <img
                src={menDesignedUpgradeHeroImage}
                alt={t('quiz.flow.taiChiInfo.maleImgAlt')}
                className="h-auto max-h-[min(46vh,400px)] w-auto max-w-[min(92vw,300px)] object-contain object-center sm:max-h-[min(52vh,440px)] sm:max-w-[min(88vw,340px)] md:max-h-[min(58vh,500px)] md:max-w-[min(40vw,380px)]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>,
        {
          backStep: 18,
          mainClassName: 'bg-white',
          footer: (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleTaiChiWalkingInfoGotIt}
                className={CONTINUE_BUTTON_ALWAYS_ENABLED}
              >
                {t('quiz.flow.common.gotIt')}
              </button>
            </div>
          ),
        },
      );
    }

    return renderQuizStepLayout(
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <div className="flex w-full flex-col-reverse items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-12">
          <div className="min-w-0 w-full max-w-xl space-y-4 text-center md:max-w-md md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {t('quiz.flow.taiChiInfo.title')}
            </h2>
            <p className="text-pretty text-gray-700">
              {t('quiz.flow.taiChiInfo.p1a')}{' '}
              {t('quiz.flow.taiChiInfo.p1b')}{' '}
              <strong>{t('quiz.flow.taiChiInfo.p1c')}</strong>
              {' — '}
              {t('quiz.flow.taiChiInfo.p1d')}
              {' — '}
              <strong>{t('quiz.flow.taiChiInfo.p1e')}</strong>{' '}
              {t('quiz.flow.taiChiInfo.p1f')}
            </p>
            <p className="text-sm text-gray-600">
              {t('quiz.flow.taiChiInfo.source')}
            </p>
          </div>

          <div className="flex w-full shrink-0 justify-center md:w-auto">
            <img
              src={taiChiWalkingHeroImage}
              alt={t('quiz.flow.taiChiInfo.femaleImgAlt')}
              className="h-auto max-h-[min(50vh,420px)] w-auto max-w-[min(100%,300px)] object-contain object-center md:max-h-[min(60vh,520px)] md:max-w-[min(42vw,400px)]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>,
      {
        backStep: 18,
        mainClassName: 'bg-[#ffe8d6]',
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleTaiChiWalkingInfoGotIt}
              className={CONTINUE_BUTTON_ALWAYS_ENABLED}
            >
              {t('quiz.flow.common.gotIt')}
            </button>
          </div>
        ),
      },
    );
  }

  // Step 20: What's your work schedule like? – pasirinkus automatiškai perkelia į kitą
  if (step === 20) {
    const WORK_SCHEDULE_OPTIONS = [
      { id: '9_to_5', Icon: LucideBriefcase },
      { id: 'flexible', Icon: LucideCoffee },
      { id: 'night_shifts', Icon: LucideSun },
      { id: 'dont_work', Icon: LucideUmbrella },
      { id: 'stay_at_home', Icon: Sofa },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
            {t('quiz.flow.workSchedule.title')}
          </h2>

          <div className="flex flex-col gap-3">
            {WORK_SCHEDULE_OPTIONS.map(({ id, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleWorkScheduleSelect(id)}
                className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <Icon size={24} className="text-gray-600" strokeWidth={2} />
                </span>
                <span className="font-medium text-gray-900">{t(`quiz.flow.workSchedule.${id}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>,
      { backStep: 15 },
    );
  }

  // Step 21: How active is your lifestyle? – pasirinkus automatiškai perkelia
  if (step === 21) {
    const ACTIVITY_LEVEL_IDS = ['sedentary', 'somewhat_active', 'active', 'very_active'];
    const lifestyleSubKey = (id) =>
      id === 'sedentary'
        ? 'sedentarySub'
        : id === 'somewhat_active'
          ? 'somewhat_activeSub'
          : id === 'active'
            ? 'activeSub'
            : 'very_activeSub';

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          {/* Klausimo sritis su šviesiai mėlynu fonu */}
          <div className="rounded-2xl bg-sky-50 px-6 py-5">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.lifestyle.title')}
              </h2>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500">
              {t('quiz.flow.lifestyle.subtitle')}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {ACTIVITY_LEVEL_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleActivityLevelSelect(id)}
                className={`flex cursor-pointer flex-col items-start gap-1 rounded-xl px-4 py-4 text-left shadow-sm ${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`}
              >
                <span className="font-semibold text-gray-900">{t(`quiz.flow.lifestyle.${id}`)}</span>
                <span className="text-sm text-gray-500">
                  {t(`quiz.flow.lifestyle.${lifestyleSubKey(id)}`)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 22: Are any of these activities part of your life? – multi-select
  if (step === 22) {
    const LIFESTYLE_ACTIVITIES = [
      { id: 'walking_pet', icon: 'paw' },
      { id: 'active_time_child', icon: 'child' },
      { id: 'climbing_stairs', icon: 'stairs' },
      { id: 'household_tasks', icon: 'house' },
      { id: 'no', icon: 'x' },
    ];

    const hasSelected = selectedActivities.length > 0;

    const renderActivityIcon = (iconType) => {
      const iconClass = 'text-gray-600';
      const size = 24;
      const props = { size, weight: 'regular', className: iconClass };
      if (iconType === 'paw') return <PawPrint {...props} />;
      if (iconType === 'child') return <Baby {...props} />;
      if (iconType === 'stairs') return <Stairs {...props} />;
      if (iconType === 'house') return <House {...props} />;
      if (iconType === 'x') return <XCircle {...props} />;
      return null;
    };

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.activities.title')}
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              {t('quiz.flow.common.chooseAllApply')}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {LIFESTYLE_ACTIVITIES.map((option) => {
              const isSelected = selectedActivities.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleActivityToggle(option.id)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                      {renderActivityIcon(option.icon)}
                    </span>
                    <span className="font-medium text-gray-900">
                      {t(`quiz.flow.activities.${option.id}`)}
                    </span>
                  </div>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isSelected
                        ? QUIZ_OPTION_CHECKBOX_SELECTED
                        : QUIZ_OPTION_CHECKBOX_IDLE
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle size={18} className={QUIZ_OPTION_CHECK_ICON} strokeWidth={2.5} />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelected && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">{tLegacy('validation.selectAtLeastOne')}</span>
          </div>
        )}
      </div>,
      {
        backStep: 21,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleActivitiesContinue}
              disabled={!hasSelected}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 23: How are your energy levels during the day? – baterijos ikonos
  if (step === 23) {
    const ENERGY_OPTIONS = [
      { id: 'low_tired', bars: 1 },
      { id: 'crash_lunch', bars: 2 },
      { id: 'caffeine', bars: 3 },
      { id: 'high_steady', bars: 4 },
    ];

    const EnergyBatteryIcon = ({ bars }) => {
      const iconClass = 'text-gray-600';
      const size = 24;
      if (bars === 1) return <BatteryLow size={size} weight="regular" className={iconClass} />;
      if (bars === 2) return <BatteryMedium size={size} weight="regular" className={iconClass} />;
      if (bars === 3) return <BatteryHigh size={size} weight="regular" className={iconClass} />;
      return <BatteryFull size={size} weight="regular" className={iconClass} />;
    };

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.energyLevels.title')}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {ENERGY_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleEnergyLevelSelect(option.id)}
                className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <EnergyBatteryIcon bars={option.bars} />
                </span>
                <span className="font-medium text-gray-900">
                  {t(`quiz.flow.energyLevels.${option.id}`)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 24: Where do you prefer to exercise? – multi-select
  if (step === 24) {
    const EXERCISE_IDS = ['home', 'outside', 'gym', 'no_preference'];

    const hasSelected = selectedExercisePreference.length > 0;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.exercisePlace.title')}
              </h2>
            </div>
            <p className="text-sm text-gray-500">{t('quiz.flow.common.chooseAllApply')}</p>
          </div>

          <div className="flex flex-col gap-3">
            {EXERCISE_IDS.map((id) => {
              const isSelected = selectedExercisePreference.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleExercisePreferenceToggle(id)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span className="font-medium text-gray-900">{t(`quiz.flow.exercisePlace.${id}`)}</span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <Check size={16} weight="bold" className="text-white" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelected && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">{tLegacy('validation.selectAtLeastOne')}</span>
          </div>
        )}
      </div>,
      {
        backStep: 19,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleExercisePreferenceContinue}
              disabled={!hasSelected}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 25: „Designed to upgrade your life“ – po Step 17 (miegas)
  if (step === 25) {
    const bubblesImage =
      gender === 'male' ? lifestyleBubblesMenImage : lifestyleBubblesImage;
    const bubblesAlt =
      gender === 'male'
        ? t('quiz.flow.lifestyleUpgrade.bubblesAltMale')
        : t('quiz.flow.lifestyleUpgrade.bubblesAltFemale');

    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="w-full space-y-6 px-2 py-4">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {t('quiz.flow.lifestyleUpgrade.title')}
            </h2>
            <p className="text-pretty text-base leading-relaxed text-gray-700">
              {t('quiz.flow.lifestyleUpgrade.body')}
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={bubblesImage}
              alt={bubblesAlt}
              className="h-auto w-full max-w-md object-contain"
            />
          </div>
        </div>
      </div>,
      {
        backStep: 17,
        mainClassName: 'bg-[#ffe8d6]',
        footer: (
          <button
            type="button"
            onClick={handleLifestyleUpgradeGreat}
            className={`${CONTINUE_BUTTON_ALWAYS_ENABLED} w-full`}
          >
            {t('quiz.flow.common.great')}
          </button>
        ),
      },
    );
  }

  // Step 26: How many times per week would you like to walk? – po Step 24 (exercise preference)
  if (step === 26) {
    const walkHeroImage =
      gender === 'male' ? menDesiredWalkHeroImage : desiredWalkHeroImage;
    const walkHeroAlt =
      gender === 'male'
        ? t('quiz.flow.walkPerWeek.maleWalkAlt')
        : t('quiz.flow.walkPerWeek.femaleWalkAlt');

    const DESIRED_WALK_IDS = ['1_2_times', '3_4_times', '5_plus_times'];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-5xl flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="flex w-full min-w-0 flex-1 flex-col">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-center">
                <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {t('quiz.flow.walkPerWeek.title')}
                </h2>
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-md flex-col gap-3">
              {DESIRED_WALK_IDS.map((id) => {
                const isSelected = desiredWalkFrequency === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleDesiredWalkFrequencySelect(id)}
                    className={`rounded-xl px-4 py-4 text-left font-semibold text-gray-900 shadow-sm ${
                      isSelected
                        ? QUIZ_OPTION_CARD_SELECTED
                        : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                    }`}
                  >
                    {t(`quiz.flow.walkPerWeek.${id}`)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={`flex w-full shrink-0 justify-center md:w-auto md:justify-end ${
            gender === 'male'
              ? 'md:max-w-[min(48%,500px)] lg:max-w-[min(46%,540px)]'
              : 'md:max-w-[min(52%,520px)]'
          }`}
        >
          <img
            src={walkHeroImage}
            alt={walkHeroAlt}
            className={
              gender === 'male'
                ? 'h-auto max-h-[min(48vh,400px)] w-auto max-w-[min(92vw,300px)] object-contain object-right object-bottom sm:max-h-[min(54vh,480px)] md:max-h-[min(72vh,620px)] md:max-w-[min(44vw,440px)] md:translate-x-1 lg:translate-x-3'
                : 'h-auto max-h-[min(50vh,420px)] w-auto max-w-[min(100%,280px)] object-contain object-bottom md:max-h-[min(68vh,560px)] md:max-w-[min(46vw,420px)]'
            }
            loading="eager"
            decoding="async"
          />
        </div>
      </div>,
      { backStep: 24 },
    );
  }

  // Step 27: How many steps do you think you need in a day?
  if (step === 27) {
    const DAILY_STEPS_IDS = ['easy', 'medium', 'hard', 'not_sure'];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="rounded-2xl bg-sky-50 px-6 py-5">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.dailySteps.title')}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {DAILY_STEPS_IDS.map((id) => {
              const isSelected = dailyStepsAnswer === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleDailyStepsSelect(id)}
                  className={`rounded-xl px-4 py-4 text-left font-semibold text-gray-900 shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  {t(`quiz.flow.dailySteps.${id}`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>,
      { backStep: 26 },
    );
  }

  // Step 28: They did it. You can do too! – transformation / social proof (karuselė: 88 kg → 147 kg)
  if (step === 28) {
    const slide = TRANSFORMATION_TESTIMONIALS[testimonialIndex];
    const slideName = t(`quiz.flow.transformation.${slide.nameKey}`);
    const slideQuote = t(`quiz.flow.transformation.${slide.quoteKey}`);

    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col">
        <div className="space-y-6">
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
            {t('quiz.flow.transformation.titleThey')}{' '}
            <span className="text-[#FF7A45]">{t('quiz.flow.transformation.titleYou')}</span>{' '}
            {t('quiz.flow.transformation.titleCta')}
          </h2>

          <div
            className="touch-manipulation overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
            onPointerDown={handleTransformationTestimonialPointerDown}
            onPointerUp={handleTransformationTestimonialPointerUp}
            onPointerCancel={handleTransformationTestimonialPointerCancel}
          >
            <div className="mb-4 flex justify-center">
              <img
                key={testimonialIndex}
                src={slide.heroImage}
                alt={`${slideName} — before and after`}
                className="max-h-[min(52vh,280px)] w-full max-w-md rounded-xl object-contain object-center transition-opacity duration-300"
              />
            </div>
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-2xl font-bold text-amber-600">
              <span>{slide.beforeWeight}</span>
              <span className="text-lg font-semibold text-gray-400">&gt;</span>
              <span>{slide.afterWeight}</span>
            </div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-gray-900">{slideName}</span>
              <div className="flex gap-0.5" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={18} weight="fill" className="text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-gray-600 md:text-base">
              &quot;{slideQuote}&quot;
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {TRANSFORMATION_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTestimonialIndex(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === testimonialIndex ? 'bg-[#FF7A45]' : 'bg-gray-300'
                  }`}
                  aria-label={t('quiz.flow.transformation.testimonialAria', {
                    n: i + 1,
                    total: TRANSFORMATION_TESTIMONIALS.length,
                  })}
                  aria-current={i === testimonialIndex ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>,
      {
        backStep: 27,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleTransformationContinue}
              className={`${CONTINUE_BUTTON_ALWAYS_ENABLED} bg-[#FF7A45] hover:bg-[#e86a38]`}
            >
              {t('quiz.flow.common.letsDoIt')}
            </button>
          </div>
        ),
      },
    );
  }

  // Step 29: Have any of the following events led to weight gain? – multi-select
  if (step === 29) {
    const WEIGHT_GAIN_EVENTS = [
      { id: 'work_pressure', Icon: LucideBriefcase },
      { id: 'busy_family', Icon: House },
      { id: 'divorce_breakup', Icon: HeartBreak },
      { id: 'slower_metabolism', Icon: Clock },
      { id: 'financial', Icon: CurrencyDollar },
      { id: 'covid', Icon: Virus },
      { id: 'injury_disability', Icon: Lightning },
      { id: 'other_stressful', Icon: Question },
      { id: 'none', Icon: XCircle },
    ];

    const hasSelected = selectedWeightGainEvents.length > 0;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.weightGain.titleQuiz')}
              </h2>
            </div>
            <p className="text-sm text-gray-500">{t('quiz.flow.common.chooseAllApply')}</p>
          </div>

          <div className="flex flex-col gap-3">
            {WEIGHT_GAIN_EVENTS.map((option) => {
              const isSelected = selectedWeightGainEvents.includes(option.id);
              const IconComponent = option.Icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleWeightGainEventToggle(option.id)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                      {option.Icon === LucideBriefcase ? (
                        <IconComponent size={24} className="text-gray-600" strokeWidth={2} />
                      ) : (
                        <IconComponent size={24} weight="regular" className="text-gray-600" />
                      )}
                    </span>
                    <span className="font-medium text-gray-900">
                      {t(`quiz.flow.weightGain.${option.id}`)}
                    </span>
                  </div>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check size={16} weight="bold" className="text-white" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelected && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">{tLegacy('validation.selectAtLeastOne')}</span>
          </div>
        )}
      </div>,
      {
        backStep: 28,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleWeightGainEventsContinue}
              disabled={!hasSelected}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 30: What's your biggest motivation? – single-choice
  if (step === 30) {
    const MOTIVATION_OPTIONS = [
      { id: 'confident', Icon: Person },
      { id: 'healthier', Icon: Heartbeat },
      { id: 'other', Icon: DotsThree },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.motivation.biggestMotivationTitle')}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {MOTIVATION_OPTIONS.map((option) => {
              const isSelected = motivationAnswer === option.id;
              const IconComponent = option.Icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleMotivationSelect(option.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <IconComponent size={24} weight="regular" className="text-gray-600" />
                  </span>
                  <span className="font-medium text-gray-900">
                    {t(`quiz.flow.motivation.${option.id}`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Step 31: We help you achieve long-term results – informacinis ekranas su SVG grafiku
  if (step === 31) {
    const longTermScreenBg =
      'bg-gradient-to-b from-[#fffefb] via-[#fff8f0] to-[#ffe8d4]';
    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col gap-6 pb-2">
        <h2 className="text-balance text-center text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
          {t('quiz.flow.longTerm.title')}
        </h2>

        <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-4 shadow-md sm:p-6">
          <p className="mb-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 sm:mb-4 sm:text-xs">
            {t('quiz.flow.longTerm.chartYourWeight')}
          </p>
          <div className="relative w-full">
            <img
              src={longTermResultsChartSvg}
              alt=""
              className="h-auto w-full max-h-[min(46vh,220px)] object-contain object-center sm:max-h-[min(52vh,260px)]"
              decoding="async"
              fetchPriority="high"
            />
            <div
              className="pointer-events-none absolute inset-0 select-none"
              aria-hidden
            >
              <div
                className="absolute right-[0%] top-[4%] max-w-[min(52%,11rem)] rounded-md bg-pink-100/95 px-2 py-1 text-center text-[9px] font-semibold leading-tight text-pink-900 shadow-sm ring-1 ring-pink-200/80 sm:right-[1%] sm:top-[6%] sm:max-w-[48%] sm:px-2.5 sm:py-1.5 sm:text-[10px] md:text-xs"
              >
                {t('quiz.flow.longTerm.chartExhausting')}
              </div>
              <div
                className="absolute bottom-[14%] right-[1%] max-w-[min(56%,12rem)] rounded-xl bg-[#3dcc6e] px-2 py-1.5 text-center text-[9px] font-semibold leading-tight text-white shadow-md sm:bottom-[16%] sm:right-[2%] sm:px-2.5 sm:py-2 sm:text-[10px] md:text-xs"
              >
                {t('quiz.flow.longTerm.chartTaiChi')}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-end justify-between gap-2 border-t border-gray-100 pt-3 text-xs font-medium text-gray-500 sm:text-sm">
            <span>{t('quiz.flow.longTerm.chartToday')}</span>
            <span className="text-right">{t('quiz.flow.longTerm.chartMonth')}</span>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-gray-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-[2px] sm:gap-4 sm:p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-gray-200 sm:h-14 sm:w-14">
            <img
              src={drNikoAmblemaImage}
              alt={t('quiz.flow.longTerm.stanfordAlt')}
              className="h-full w-full object-contain object-center p-0.5"
              decoding="async"
            />
          </div>
          <p className="text-left text-sm leading-relaxed text-gray-700 sm:text-[15px]">
            <strong className="text-gray-900">{t('quiz.flow.longTerm.drQuote')}</strong>{' '}
            {t('quiz.flow.longTerm.drQuoteBody')}
          </p>
        </div>
      </div>,
      {
        backStep: 30,
        screenClassName: longTermScreenBg,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleLongTermResultsContinue}
              className={CONTINUE_BUTTON_ALWAYS_ENABLED}
            >{t('quiz.common.continue')}
            </button>
          </div>
        ),
      },
    );
  }

  // Step 32: What's your height?
  if (step === 32) {
    const hasValidHeight =
      heightValue.length > 0 &&
      !Number.isNaN(Number(heightValue)) &&
      Number(heightValue) > 0 &&
      (heightUnit === 'cm' ? Number(heightValue) <= 250 : Number(heightValue) <= 120);

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {t('quiz.flow.height.title')}
            </h2>
            <p className="text-sm text-gray-500">
              {t('quiz.flow.height.subtitle')}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setHeightUnit('ft')}
              className={`flex-1 rounded-xl px-4 py-3 font-semibold ${
                heightUnit === 'ft'
                  ? 'border border-orange-500 bg-orange-500 text-white shadow-sm'
                  : `text-gray-600 ${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
              }`}
            >
              FT
            </button>
            <button
              type="button"
              onClick={() => setHeightUnit('cm')}
              className={`flex-1 rounded-xl px-4 py-3 font-semibold ${
                heightUnit === 'cm'
                  ? 'border border-orange-500 bg-orange-500 text-white shadow-sm'
                  : `text-gray-600 ${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
              }`}
            >
              CM
            </button>
          </div>

          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              placeholder={heightUnit === 'cm' ? '160' : '64'}
              value={heightValue}
              onChange={(e) => setHeightValue(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-center text-xl font-semibold text-gray-900 shadow-sm transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
              min={heightUnit === 'cm' ? 100 : 40}
              max={heightUnit === 'cm' ? 250 : 120}
            />
          </div>
        </div>
      </div>,
      {
        backStep: 31,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleHeightContinue}
              disabled={!hasValidHeight}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 33: Your current weight
  if (step === 33) {
    const hasValidWeight =
      currentWeight.length > 0 &&
      !Number.isNaN(Number(currentWeight)) &&
      Number(currentWeight) > 20 &&
      Number(currentWeight) < 300;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {t('quiz.flow.currentWeight.title')}
            </h2>
            <p className="text-sm text-gray-500">
              {t('quiz.flow.currentWeight.subtitle')}
            </p>
          </div>

          <div className="relative flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              placeholder="95"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-4 text-center text-xl font-semibold text-gray-900 shadow-sm transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
              min={20}
              max={300}
            />
            <span className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-bold text-white">
              {t('quiz.flow.common.kg')}
            </span>
          </div>
        </div>
      </div>,
      {
        backStep: 32,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleCurrentWeightContinue}
              disabled={!hasValidWeight}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 34: Your goal weight
  if (step === 34) {
    const goalNum = Number(goalWeight);
    const hasValidGoal =
      goalWeight.length > 0 &&
      !Number.isNaN(goalNum) &&
      goalNum > 20 &&
      goalNum < 300;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {t('quiz.flow.goalWeight.title')}
            </h2>
            <p className="text-sm text-gray-500">
              {t('quiz.flow.goalWeight.subtitle')}
            </p>
          </div>

          <div className="relative flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              placeholder="90"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-4 text-center text-xl font-semibold text-gray-900 shadow-sm transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
              min={20}
              max={300}
            />
            <span className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-bold text-white">
              {t('quiz.flow.common.kg')}
            </span>
          </div>
        </div>
      </div>,
      {
        backStep: 33,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleGoalWeightContinue}
              disabled={!hasValidGoal}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 35: Your walking profile – 1:1 su maketu (BMI juosta, rizikos, stats + figūra)
  if (step === 35) {
    const heightCm =
      heightUnit === 'cm' ? Number(heightValue) : Number(heightValue) * 2.54;
    const heightM = heightCm / 100;
    const bmiValue =
      currentWeight && heightM > 0 ? Number(currentWeight) / (heightM * heightM) : null;
    const bmi = bmiValue != null && Number.isFinite(bmiValue) ? bmiValue.toFixed(1) : null;

    const getBmiCategory = (val) => {
      const v = Number(val);
      if (Number.isNaN(v)) return null;
      if (v < 18.5) return { bmiKey: 'bmiUnderweight', badgeClass: 'bg-cyan-500' };
      if (v < 25) return { bmiKey: 'bmiNormal', badgeClass: 'bg-green-600' };
      if (v < 30) return { bmiKey: 'bmiOverweight', badgeClass: 'bg-amber-500' };
      return { bmiKey: 'bmiObese', badgeClass: 'bg-red-600' };
    };

    const bmiCategory = bmi ? getBmiCategory(bmi) : null;
    const bmiNeedleTransition = 'left 1.15s cubic-bezier(0.22, 1, 0.36, 1)';

    const dreamBodyLabelFor = (id) =>
      id === 'curvy'
        ? gender === 'male'
          ? t('quiz.flow.dreamBody.curvyMale')
          : t('quiz.flow.dreamBody.curvyFemale')
        : t(`quiz.flow.dreamBody.${id}`);
    const DREAM_BODY_PHOTOS = gender === 'male' ? MALE_DREAM_BODY_IMAGES : DREAM_BODY_IMAGES;

    /** Kai BMI pakeltas – rodomas realistiškesnis siluetas (ne „dream body“). */
    const highBmiFigureSrc =
      bmiValue != null && Number.isFinite(bmiValue) && bmiValue >= 25
        ? (() => {
            const imgs = gender === 'male' ? MALE_BODY_TYPE_IMAGES : BODY_TYPE_IMAGES;
            if (bmiValue >= 30) return imgs.plus_sized;
            return imgs.overweight;
          })()
        : null;

    const figureSrc =
      highBmiFigureSrc ??
      (dreamBody && DREAM_BODY_PHOTOS[dreamBody]
        ? DREAM_BODY_PHOTOS[dreamBody]
        : DREAM_BODY_PHOTOS.healthy);

    const figureAlt =
      highBmiFigureSrc != null
        ? gender === 'male'
          ? t('quiz.flow.profile.figureAltMale')
          : t('quiz.flow.profile.figureAltFemale')
        : '';

    /** Moterų profilio iliustracija – kaip rinkodaros maketas (walking profile) */
    const profileCardImageSrc =
      gender === 'male' ? figureSrc : walkingProfileHeroImage;
    const profileCardImageAlt =
      gender === 'male'
        ? figureAlt
        : t('quiz.flow.profile.walkingProfilePhotoAlt');

    const BMI_SCALE_TICKS = [15, 18.5, 25, 30, 40];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col gap-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1a2b3c] md:text-3xl">
          {t('quiz.flow.profile.title')}
        </h2>

        <div className="overflow-hidden rounded-[2.5rem] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-[#1a2b3c] md:text-lg">
                  {t('quiz.flow.profile.bmiHeading')}
                </h3>
                {bmiCategory && (
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white ${bmiCategory.badgeClass}`}
                  >
                    {t(`quiz.flow.profile.${bmiCategory.bmiKey}`)}
                  </span>
                )}
              </div>

              {/* Skaičiai ir žymės virš juostos (maketas 1:1) */}
              <div className="relative mb-3 h-5 w-full">
                {BMI_SCALE_TICKS.map((tick) => (
                  <div
                    key={tick}
                    className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
                    style={{ left: `${((tick - 15) / 25) * 100}%` }}
                  >
                    <span className="text-[11px] font-medium tabular-nums text-gray-400">{tick}</span>
                    <div className="mt-0.5 h-2 w-px bg-gray-300" aria-hidden />
                  </div>
                ))}
              </div>

              {/* Įrankinė virš juostos, žymeklis ant gradiento */}
              <div className="relative mt-1">
                {bmi && (
                  <div
                    className="absolute bottom-full left-0 z-20 mb-1 flex w-0 flex-col items-center"
                    style={{
                      left: `${profileBmiNeedlePct}%`,
                      transform: 'translateX(-50%)',
                      transition: bmiNeedleTransition,
                    }}
                  >
                    <div className="whitespace-nowrap rounded-xl bg-[#343a40] px-3 py-1.5 text-sm font-bold text-white shadow-sm">
                      {t('quiz.flow.profile.youTooltip', { bmi })}
                    </div>
                    <div className="h-2 w-px shrink-0 bg-[#343a40]" aria-hidden />
                  </div>
                )}
                <div
                  className="relative h-3.5 w-full rounded-full bg-gradient-to-r from-sky-300 via-emerald-400 via-amber-200 via-orange-400 to-red-500 shadow-inner"
                  role="img"
                  aria-label={t('quiz.flow.profile.bmiHeading')}
                />
                {bmi && (
                  <div
                    className="pointer-events-none absolute left-0 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                    style={{
                      left: `${profileBmiNeedlePct}%`,
                      transition: bmiNeedleTransition,
                    }}
                  >
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-white shadow-[0_0_0_2px_#343a40]">
                      <div className="h-2 w-2 rounded-full bg-[#343a40]" aria-hidden />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-2 flex w-full justify-between text-[9px] font-bold uppercase leading-tight tracking-wide text-gray-400 sm:text-[10px]">
                <span className="w-[14%] max-w-[3.5rem] break-words text-left text-gray-400">
                  {t('quiz.flow.profile.bandUnderweight')}
                </span>
                <span className="w-[26%] text-center text-gray-400">
                  {t('quiz.flow.profile.bandNormal')}
                </span>
                <span className="w-[20%] text-center text-gray-400">
                  {t('quiz.flow.profile.bandOverweight')}
                </span>
                <span className="w-[40%] text-right text-gray-400">{t('quiz.flow.profile.bandObese')}</span>
              </div>

              {bmi && Number(bmi) >= 25 && (
                <div className="mt-6 flex gap-3 rounded-2xl bg-[#fef2f2] px-4 py-3">
                  <WarningCircle
                    size={28}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-red-500"
                    aria-hidden
                  />
                  <p className="text-sm leading-snug text-[#1a2b3c]">
                    <span className="font-bold">{t('quiz.flow.profile.riskTitle')}</span>{' '}
                    {t('quiz.flow.profile.riskBody')}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-6 border-t border-gray-100 pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <div className="flex min-w-0 flex-1 flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
                      <Scales size={22} weight="regular" className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{t('quiz.flow.profile.desiredWeight')}</p>
                      <p className="text-base font-bold text-[#1a2b3c]">
                        {goalWeight ? `${goalWeight} kg` : '—'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
                      <Person size={22} weight="regular" className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{t('quiz.flow.profile.bodyDream')}</p>
                      <p className="text-base font-bold text-[#1a2b3c]">
                        {dreamBody ? dreamBodyLabelFor(dreamBody) : '—'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
                      <Heartbeat size={22} weight="regular" className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{t('quiz.flow.profile.lifestyle')}</p>
                      <p className="text-base font-bold text-[#1a2b3c]">
                        {activityLevelAnswer
                          ? t(`quiz.flow.lifestyle.${activityLevelAnswer}`)
                          : '—'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mx-auto flex w-full max-w-[220px] shrink-0 justify-center sm:mx-0 sm:max-w-[260px]">
                  <img
                    src={profileCardImageSrc}
                    alt={profileCardImageAlt}
                    className="h-auto max-h-[min(52vh,280px)] w-full object-contain object-bottom"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
      </div>,
      {
        backStep: 42,
        screenClassName: 'bg-[#f4f5f7]',
        mainClassName: 'bg-[#f4f5f7]',
        footer: (
          <div className="flex justify-center px-1">
            <button
              type="button"
              onClick={handleProfileContinue}
              className={CONTINUE_BUTTON_ALWAYS_ENABLED}
            >
              {t('quiz.common.continue')}
            </button>
          </div>
        ),
      },
    );
  }

  // Step 36: Is there any specific event motivating you to lose weight right now?
  if (step === 36) {
    const MOTIVATION_EVENT_OPTIONS = [
      { id: 'vacation', Icon: Umbrella },
      { id: 'wedding', Icon: Heart },
      { id: 'sports_event', Icon: Trophy },
      { id: 'summer', Icon: Sun },
      { id: 'school_reunion', Icon: Users },
      { id: 'family_gathering', Icon: House },
      { id: 'birthday_party', Icon: Cake },
      { id: 'other_occasion', Icon: Lightbulb },
      { id: 'no_just_ready', Icon: Sparkle },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {t('quiz.flow.motivationEvent.title')}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {MOTIVATION_EVENT_OPTIONS.map((option) => {
              const isSelected = motivationEventAnswer === option.id;
              const IconComponent = option.Icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleMotivationEventSelect(option.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <IconComponent size={24} weight="regular" className="text-gray-600" />
                  </span>
                  <span className="font-medium text-gray-900">
                    {t(`quiz.flow.motivationEvent.${option.id}`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Step 47: Įvykio data – po Step 36 (kai pasirinktas konkretus įvykis)
  if (step === 47) {
    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {t('quiz.flow.eventDate.title')}
          </h2>
          <p className="text-sm text-gray-500">
            {t('quiz.flow.eventDate.subtitle')}
          </p>
        </div>

        <div className="relative w-full">
          <label htmlFor="motivation-event-date" className="sr-only">
            {t('quiz.flow.eventDate.eventDateSr')}
          </label>
          <input
            id="motivation-event-date"
            type="date"
            value={motivationEventDate}
            onChange={(e) => setMotivationEventDate(e.target.value)}
            className="w-full appearance-none rounded-full border border-gray-200 bg-white py-4 pl-5 pr-14 text-base font-medium text-gray-900 shadow-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-200 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-12"
          />
          <Calendar
            size={22}
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-red-500"
            aria-hidden
          />
        </div>
      </div>,
      {
        backStep: 36,
        footer: (
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleEventDateContinue}
              disabled={!motivationEventDate}
              className={CONTINUE_BUTTON_CLASSES}
            >
              {t('quiz.common.continue')}
            </button>
            <button
              type="button"
              onClick={handleEventDateSkip}
              className="text-sm font-medium text-gray-500 underline-offset-2 transition-colors hover:text-gray-800 hover:underline"
            >
              {t('quiz.flow.common.skipQuestion')}
            </button>
          </div>
        ),
      },
    );
  }

  // Step 37: You can reach X kg by [date] – svorio prognozės grafikas
  if (step === 37) {
    const startWeight = Number(currentWeight) || 95;
    const targetWeight = Number(goalWeight) || 90;
    const weightDiff = Math.max(0, startWeight - targetWeight);

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + Math.ceil((weightDiff / 0.5) * 7));

    const locale = i18n.language || undefined;
    const formatTargetDate = (d) =>
      d.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' });

    const today = new Date();

    const graphMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const graphMonthEnd = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);

    let monthTicks = [];
    const monthWalker = new Date(graphMonthStart);
    while (monthWalker <= graphMonthEnd) {
      monthTicks.push(new Date(monthWalker));
      monthWalker.setMonth(monthWalker.getMonth() + 1);
    }

    const MAX_MONTH_TICKS = 9;
    if (monthTicks.length > MAX_MONTH_TICKS) {
      const src = monthTicks;
      const n = src.length;
      const idxSet = new Set([0, n - 1]);
      const innerSlots = MAX_MONTH_TICKS - 2;
      if (innerSlots > 0) {
        const step = (n - 1) / (MAX_MONTH_TICKS - 1);
        for (let k = 1; k < MAX_MONTH_TICKS - 1; k++) {
          idxSet.add(Math.min(n - 1, Math.round(k * step)));
        }
      }
      monthTicks = [...idxSet].sort((a, b) => a - b).map((j) => new Date(src[j]));
    }

    if (monthTicks.length < 2) {
      monthTicks = [new Date(today.getFullYear(), today.getMonth(), 1), new Date(targetDate)];
    }

    const chartXMin = 50;
    const chartXMax = 350;
    const monthTickXs = monthTicks.map((_, i) =>
      monthTicks.length === 1
        ? (chartXMin + chartXMax) / 2
        : chartXMin + ((chartXMax - chartXMin) * i) / (monthTicks.length - 1),
    );

    const formatGraphXTick = (d, i, arr) => {
      const isLast = i === arr.length - 1;
      const short = d.toLocaleDateString(locale, { month: 'short' });
      if (isLast) {
        const sameMonthYearAsFirst =
          arr.length >= 2 &&
          d.getMonth() === arr[0].getMonth() &&
          d.getFullYear() === arr[0].getFullYear();
        if (sameMonthYearAsFirst) {
          return `${short} ${d.getDate()}`;
        }
        return `${short} ${d.getFullYear()}`;
      }
      return short;
    };

    const tickFontSize = monthTicks.length > 6 ? 12 : 14;

    let eventPillText = null;
    if (
      motivationEventAnswer &&
      motivationEventAnswer !== 'no_just_ready' &&
      motivationEventDate
    ) {
      const label = t(`quiz.flow.motivationEvent.${motivationEventAnswer}`);
      const parts = motivationEventDate.split('-');
      if (label && parts.length === 3) {
        const y = Number(parts[0]);
        const mo = Number(parts[1]);
        const da = Number(parts[2]);
        const eventD = new Date(y, mo - 1, da);
        if (!Number.isNaN(eventD.getTime())) {
          const monthName = eventD.toLocaleDateString(locale, { month: 'long' });
          const dayStr = String(da).padStart(2, '0');
          eventPillText = `${label} · ${monthName} ${dayStr}`;
        }
      }
    }

    const gradLineId = 'predictionChartLineGrad';
    const gradFillId = 'predictionChartFillGrad';

    /** Reference: šviesus kremas centre (~#FFFBF5), persikas į kraštus */
    const predictionScreenBg =
      'bg-[radial-gradient(circle_at_50%_38%,#FFFBF5_0%,#FFE8CC_55%,#FFD8A8_100%)]';

    const startDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const targetDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const daysToGoal = Math.max(1, Math.round((targetDay - startDay) / 86400000));
    const weeklyLossKg = weightDiff > 0 ? (weightDiff / daysToGoal) * 7 : 0;
    const rateStr = weeklyLossKg.toLocaleString(locale || undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    const seasonId = getSeasonIdForQuizPrediction(targetDate);

    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
            {t('quiz.flow.prediction.titleYouCan')}{' '}
            <span className="text-orange-500">{targetWeight} kg</span>
            {' '}
            {t('quiz.flow.prediction.titleBy')}{' '}
            <span className="text-orange-500">{formatTargetDate(targetDate)}</span>
          </h2>
          {weightDiff > 0 && weeklyLossKg > 0 && (
            <div className="mx-auto w-full max-w-md rounded-full border border-gray-100 bg-white px-4 py-2.5 text-center text-sm leading-snug text-gray-900 shadow-sm">
              <Trans
                i18nKey="quiz.flow.prediction.subPillRich"
                values={{
                  rate: rateStr,
                  seasonName: t(`quiz.flow.prediction.season.${seasonId}`),
                }}
                components={{ season: <strong className="font-bold text-gray-900" /> }}
              />
            </div>
          )}
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
          {eventPillText && (
            <div className="absolute right-4 top-4 z-10 max-w-[min(100%,220px)] truncate rounded-full border border-gray-100 bg-white px-3 py-1.5 text-center text-[11px] font-semibold text-gray-800 shadow-md sm:text-xs">
              {eventPillText}
            </div>
          )}
          <svg
            viewBox="0 0 400 218"
            className="h-auto w-full max-h-[min(56vh,280px)] min-h-[200px]"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={t('quiz.flow.prediction.chartAria', {
              from: startWeight,
              to: targetWeight,
            })}
          >
            <defs>
              <linearGradient id={gradLineId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="33%" stopColor="#f97316" />
                <stop offset="66%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <linearGradient id={gradFillId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.5" />
                <stop offset="28%" stopColor="#fdba74" stopOpacity="0.45" />
                <stop offset="55%" stopColor="#fde047" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#86efac" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="50"
                y1={48 + i * 30}
                x2="350"
                y2={48 + i * 30}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}
            <path
              d="M 50 52 Q 150 72 250 102 Q 320 127 350 132 L 350 168 L 50 168 Z"
              fill={`url(#${gradFillId})`}
            />
            <path
              d="M 50 52 Q 150 72 250 102 Q 320 127 350 132"
              fill="none"
              stroke={`url(#${gradLineId})`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pradžia: burbuliukas + taškas (taškas ant kreivės 50,52) */}
            <g>
              <rect x="8" y="8" width="74" height="34" rx="9" fill="#ef4444" />
              <polygon points="38,42 62,42 50,52" fill="#ef4444" />
              <text
                x="45"
                y="25"
                fontSize="15"
                fill="white"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {startWeight} kg
              </text>
              <circle cx="50" cy="52" r="7" fill="#ef4444" />
            </g>
            {/* Pabaiga: burbuliukas + taškas (taškas ant kreivės 350,132) */}
            <g>
              <rect x="286" y="86" width="88" height="34" rx="9" fill="#22c55e" />
              <polygon points="328,120 372,120 350,132" fill="#22c55e" />
              <text
                x="330"
                y="103"
                fontSize="15"
                fill="white"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {targetWeight} kg
              </text>
              <circle cx="350" cy="132" r="7" fill="#22c55e" />
            </g>
            {monthTicks.map((tickDate, i) => (
              <text
                key={`${tickDate.getTime()}-${i}`}
                x={monthTickXs[i]}
                y="206"
                fontSize={tickFontSize}
                fill={i === monthTicks.length - 1 ? '#16a34a' : '#6b7280'}
                fontWeight={i === monthTicks.length - 1 ? '600' : '500'}
                textAnchor="middle"
              >
                {formatGraphXTick(tickDate, i, monthTicks)}
              </text>
            ))}
          </svg>
          <p className="mt-3 text-center text-xs text-gray-600 sm:text-sm">
            <span className="font-semibold tabular-nums text-gray-800">{startWeight} kg</span>
            <span className="mx-1.5 text-gray-400" aria-hidden>
              →
            </span>
            <span className="font-semibold tabular-nums text-green-700">{targetWeight} kg</span>
            {weightDiff > 0 ? (
              <span className="ml-2 text-gray-500">
                ({t('quiz.flow.prediction.weightLossTotal', { kg: weightDiff })})
              </span>
            ) : null}
          </p>
        </div>

        <p className="text-center text-sm text-gray-500">
          {t('quiz.flow.prediction.basedOn')}
        </p>
      </div>,
      {
        backStep: motivationEventAnswer === 'no_just_ready' ? 36 : 47,
        screenClassName: predictionScreenBg,
        mainClassName: predictionScreenBg,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handlePredictionContinue}
              className={CONTINUE_BUTTON_ALWAYS_ENABLED}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 48: Pasitikėjimas pasiekti tikslinį svorį iki prognozuotos datos (po Step 37)
  if (step === 48) {
    const startWeight = Number(currentWeight) || 95;
    const targetWeight = Number(goalWeight) || 90;
    const weightDiff = Math.max(0, startWeight - targetWeight);
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + Math.ceil((weightDiff / 0.5) * 7));

    const locale = i18n.language || undefined;
    const formatTargetDate = (d) =>
      d.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' });

    const REACH_CONFIDENCE_OPTIONS = [
      { id: 'believe', Icon: LucideTrophy },
      { id: 'uncertain_try', Icon: Dumbbell },
      { id: 'not_sure', Icon: Meh },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <h2 className="text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
          {t('quiz.flow.reachConfidence.titleBefore')}{' '}
          <span className="text-orange-500">{targetWeight} kg</span>{' '}
          {t('quiz.flow.reachConfidence.titleMid')}{' '}
          <span className="text-orange-500">{formatTargetDate(targetDate)}</span>
          {t('quiz.flow.reachConfidence.titleAfter')}
        </h2>

        <div className="flex flex-col gap-3">
          {REACH_CONFIDENCE_OPTIONS.map(({ id, Icon }) => {
            const isSelected = reachConfidenceAnswer === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleReachConfidenceSelect(id)}
                className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                  isSelected
                    ? QUIZ_OPTION_CARD_SELECTED
                    : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <Icon size={22} className="text-gray-700" strokeWidth={2} />
                </span>
                <span className="font-semibold text-gray-900">
                  {t(`quiz.flow.reachConfidence.${id}`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>,
      { backStep: 37 },
    );
  }

  // Step 49: Kompaktiškas hero + baltas tekstas (tel.) – visa nuotrauka nebeužima beveik viso aukščio
  if (step === 49) {
    return renderQuizStepLayout(
      <div className="flex min-h-0 w-full flex-1 flex-col bg-white">
        <div className="relative h-[min(26dvh,11.5rem)] w-full shrink-0 overflow-hidden sm:h-[min(30dvh,13.5rem)] md:h-[min(34dvh,15rem)]">
          <img
            src={seniorCoupleHeroImage}
            alt={t('quiz.flow.seniorCoupleAlt')}
            className="h-full w-full object-cover object-[center_28%]"
            loading="eager"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent via-white/55 to-white sm:h-12"
            aria-hidden
          />
        </div>

        <div className="mx-auto flex w-full max-w-lg min-w-0 flex-1 flex-col items-center gap-3 px-5 pb-2 pt-3 text-center sm:gap-4 sm:px-6 sm:pb-3 sm:pt-4 md:gap-5">
          <h2 className="text-balance text-lg font-bold leading-snug text-gray-900 sm:text-xl md:text-2xl">
            {t('quiz.flow.giveUp.title')}
          </h2>
          <p className="text-balance text-[10px] font-bold uppercase leading-snug tracking-wide text-gray-900 sm:text-xs md:text-sm">
            {t('quiz.flow.giveUp.line1')}{' '}
            <span className="text-[#ff6b4a]">{t('quiz.flow.giveUp.reasonHash')}</span>{' '}
            {t('quiz.flow.giveUp.line2')}
          </p>
          <p className="text-pretty text-sm leading-relaxed text-gray-600 sm:text-base">
            {t('quiz.flow.giveUp.body')}
          </p>
        </div>
      </div>,
      {
        backStep: 48,
        mainClassName: '!items-stretch !justify-start !p-0 !px-0 !pb-0 !pt-0',
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSustainableChangeGotIt}
              className="w-full max-w-[min(100%,20rem)] rounded-full bg-[#ff6b4a] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-[#f05538] active:scale-[0.98] sm:mx-auto sm:w-auto sm:max-w-none sm:px-10 md:px-12"
            >
              {t('quiz.flow.common.gotIt')}
            </button>
          </div>
        ),
      },
    );
  }

  // Step 38: Get your personalized program – el. pašto įvedimas
  if (step === 38) {
    const valid = isPlanEmailValid(emailForPlan);
    const showEmailError = emailForPlan.trim().length > 0 && !valid;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {t('quiz.flow.emailStep.title38')}
            </h2>
            <p className="text-sm text-gray-500">
              {t('quiz.flow.emailStep.subtitle38')}
            </p>
          </div>

          <div>
            <label
              htmlFor="quiz-email-step-38"
              className="mb-1.5 block text-left text-xs font-medium text-gray-400"
            >
              {t('quiz.flow.common.email')}
            </label>
            <input
              id="quiz-email-step-38"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={t('quiz.flow.emailStep.placeholder38')}
              value={emailForPlan}
              onChange={(e) => setEmailForPlan(e.target.value)}
              aria-invalid={showEmailError}
              aria-describedby={
                showEmailError ? 'quiz-email-step-38-error' : valid ? 'quiz-email-step-38-ok' : undefined
              }
              className={`w-full rounded-xl border-2 bg-white px-4 py-3.5 text-left text-lg text-gray-900 shadow-sm outline-none transition-all focus:ring-2 ${
                valid
                  ? 'border-green-500 focus:border-green-600 focus:ring-green-200'
                  : showEmailError
                    ? 'border-orange-500 focus:border-orange-600 focus:ring-orange-200'
                    : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
              }`}
            />
            {showEmailError && (
              <p
                id="quiz-email-step-38-error"
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-orange-600"
                role="alert"
              >
                <WarningCircle size={18} weight="fill" className="shrink-0 text-orange-500" />
                {t('quiz.flow.emailStep.invalidEmail')}
              </p>
            )}
            {valid && (
              <p
                id="quiz-email-step-38-ok"
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-green-600"
              >
                <CheckCircle size={18} className="shrink-0 text-green-600" strokeWidth={2.5} />
                {t('quiz.flow.emailStep.emailOk')}
              </p>
            )}
          </div>
        </div>
      </div>,
      {
        backStep: 49,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleGetPlanContinue}
              disabled={!valid}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 39: Check your inbox – patvirtinimas
  if (step === 39) {
    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle size={48} className="text-green-600" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {t('quiz.flow.inbox.title')}
        </h2>
        <p className="text-gray-600">
          {t('quiz.flow.inbox.body')}{' '}
          <strong>{emailForPlan || t('quiz.flow.common.yourEmailFallback')}</strong>.{' '}
          {t('quiz.flow.inbox.bodyEnd')}
        </p>
      </div>,
      {
        backStep: 38,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleFinalContinue}
              className={CONTINUE_BUTTON_ALWAYS_ENABLED}
            >
              {t('quiz.flow.common.gotItExclaim')}
            </button>
          </div>
        ),
      },
    );
  }

  // Step 40: After reaching your goal weight, how would you reward yourself? (po Step 49)
  if (step === 40) {
    const REWARD_OPTIONS = [
      { id: 'new_clothes', Icon: TShirt },
      { id: 'personal_day', Icon: Armchair },
      {
        id: 'social_media',
        Icon: ImageLandscapeIcon,
      },
      { id: 'pictures', Icon: DeviceMobile },
      { id: 'travel', Icon: Suitcase },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <h2 className="text-balance text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
          {t('quiz.flow.reward.titleBefore')}{' '}
          <span className="text-orange-500">{t('quiz.flow.reward.titleAccent')}</span>
          {t('quiz.flow.reward.titleAfter')}
        </h2>

        <div className="flex flex-col gap-3">
          {REWARD_OPTIONS.map((option) => {
            const isSelected = rewardAnswer === option.id;
            const IconComponent = option.Icon;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleRewardSelect(option.id)}
                className={`flex w-full cursor-pointer items-center rounded-xl py-4 pl-4 pr-4 shadow-sm ${
                  isSelected
                    ? QUIZ_OPTION_CARD_SELECTED
                    : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <IconComponent size={24} weight="regular" className="text-gray-600" />
                </span>
                <span className="min-w-0 flex-1 text-center font-semibold text-gray-900">
                  {t(`quiz.flow.reward.${option.id}`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>,
      { backStep: 49, mainClassName: '!justify-center' },
    );
  }

  // Step 41: How would you see yourself after reaching your goal weight?
  if (step === 41) {
    const SEE_YOURSELF_OPTIONS = [
      { id: 'proud', Icon: Trophy },
      { id: 'feeling_great', Icon: SmileyWink },
      { id: 'believe', Icon: Smile },
      { id: 'empowered', Icon: Lightning },
      { id: 'worry_less', Icon: ThumbsUp },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <h2 className="text-balance text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
          {t('quiz.flow.seeYourself.titleBefore')}{' '}
          <span className="text-orange-500">{t('quiz.flow.seeYourself.titleAccent')}</span>{' '}
          {t('quiz.flow.seeYourself.titleAfter')}
        </h2>

        <div className="flex flex-col gap-3">
          {SEE_YOURSELF_OPTIONS.map((option) => {
            const isSelected = seeYourselfAnswer === option.id;
            const IconComponent = option.Icon;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSeeYourselfSelect(option.id)}
                className={`flex w-full cursor-pointer items-center rounded-xl py-4 pl-4 pr-4 shadow-sm ${
                  isSelected
                    ? QUIZ_OPTION_CARD_SELECTED
                    : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <IconComponent size={24} weight="regular" className="text-gray-600" />
                </span>
                <span className="min-w-0 flex-1 text-center font-semibold text-gray-900">
                  {t(`quiz.flow.seeYourself.${option.id}`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>,
      { backStep: 40, mainClassName: '!justify-center' },
    );
  }

  // Step 43: kuriamas planas – animuojamas apskritimas 0 % → 100 % (po Step 41)
  if (step === 43) {
    const RACHEL_IMAGE = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80';
    const dashOffset =
      PLAN_BUILD_CIRCUMFERENCE * (1 - Math.min(100, planBuildPercent) / 100);

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="relative">
          <svg className="h-32 w-32" viewBox="0 0 100 100" aria-hidden>
            <circle
              cx="50"
              cy="50"
              r={PLAN_BUILD_CIRCLE_R}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r={PLAN_BUILD_CIRCLE_R}
              fill="none"
              stroke="#f97316"
              strokeWidth="8"
              strokeDasharray={PLAN_BUILD_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="transition-[stroke-dashoffset] duration-75 ease-out"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900">
            {planBuildPercent}%
          </span>
        </div>
        <p className="text-center text-sm text-gray-600">
          {t('quiz.flow.planBuild.creating')}
        </p>
        <p className="text-center">
          <span className="text-2xl font-bold text-[#e07a4f]">{t('quiz.flow.planBuild.million')}</span>
          <span className="text-gray-900">{t('quiz.flow.planBuild.chosen')}</span>
        </p>
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={RACHEL_IMAGE}
              alt={t('quiz.flow.planBuild.rachelAlt')}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">{t('quiz.flow.planBuild.rachelUser')}</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} weight="fill" className="text-amber-400" />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600 italic">
            &quot;{t('quiz.flow.planBuild.rachelQuote')}&quot;
          </p>
        </div>
      </div>,
      {
        backStep: 41,
        mainClassName: '!justify-center !pt-6',
        screenClassName: 'bg-[#f9f8f6]',
      },
    );
  }

  // Step 45: Enter email to get your Tai Chi Walking Plan
  if (step === 45) {
    const valid = isPlanEmailValid(emailForPlan);
    const showEmailError = emailForPlan.trim().length > 0 && !valid;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {t('quiz.flow.emailStep.title45a')}{' '}
              <span className="text-orange-500">{t('quiz.flow.emailStep.title45b')}</span>
            </h2>
          </div>

          <div>
            <label
              htmlFor="quiz-email-step-45"
              className="mb-1.5 block text-left text-xs font-medium text-gray-400"
            >
              {t('quiz.flow.common.email')}
            </label>
            <input
              id="quiz-email-step-45"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={t('quiz.flow.emailStep.placeholder45')}
              value={emailForPlan}
              onChange={(e) => setEmailForPlan(e.target.value)}
              aria-invalid={showEmailError}
              aria-describedby={
                showEmailError ? 'quiz-email-step-45-error' : valid ? 'quiz-email-step-45-ok' : undefined
              }
              className={`w-full rounded-xl border-2 bg-white px-4 py-3.5 text-lg text-gray-900 shadow-sm outline-none transition-all focus:ring-2 ${
                valid
                  ? 'border-green-500 focus:border-green-600 focus:ring-green-200'
                  : showEmailError
                    ? 'border-orange-500 focus:border-orange-600 focus:ring-orange-200'
                    : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
              }`}
            />
            {showEmailError && (
              <p
                id="quiz-email-step-45-error"
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-orange-600"
                role="alert"
              >
                <WarningCircle size={18} weight="fill" className="shrink-0 text-orange-500" />
                {t('quiz.flow.emailStep.invalidEmail')}
              </p>
            )}
            {valid && (
              <p
                id="quiz-email-step-45-ok"
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-green-600"
              >
                <CheckCircle size={18} className="shrink-0 text-green-600" strokeWidth={2.5} />
                {t('quiz.flow.emailStep.emailOk')}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-500">
            <Lock size={18} weight="regular" className="mt-0.5 shrink-0 text-gray-400" />
            <p>{t('quiz.flow.emailStep.privacy')}</p>
          </div>
        </div>
      </div>,
      {
        backStep: 41,
        footer: (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleTaiChiPlanEmailContinue}
              disabled={!valid}
              className={CONTINUE_BUTTON_CLASSES}
            >{t('quiz.common.continue')}
          </button>
          </div>
        ),
      },
    );
  }

  // Step 46: Marketing opt-in (po Step 45). „Yes, I do“ → Step 50 (vardas); skip → Step 51 (be vardo).
  if (step === 46) {
    const OPT_IN_CORAL = '#F16E43';
    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <h2 className="text-balance text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
          {t('quiz.flow.optIn.titleBefore')}{' '}
          <span style={{ color: OPT_IN_CORAL }}>{t('quiz.flow.optIn.titleAccent')}</span>
          {t('quiz.flow.optIn.titleAfter')}
        </h2>
      </div>,
      {
        backStep: 45,
        mainClassName: '!justify-center md:!pt-8',
        footer: (
          <div className="flex flex-col items-center gap-5">
            <button
              type="button"
              onClick={() => handleEmailOptInSelect('yes')}
              className="w-full rounded-full px-8 py-4 text-center text-base font-bold text-white shadow-md transition-all hover:brightness-95 active:scale-[0.98]"
              style={{ backgroundColor: OPT_IN_CORAL }}
            >
              {t('quiz.flow.optIn.yes')}
            </button>
            <button
              type="button"
              onClick={() => handleEmailOptInSelect('no')}
              className="max-w-xs text-center text-[10px] font-semibold uppercase leading-relaxed tracking-wide text-gray-400 underline-offset-4 transition-colors hover:text-gray-600 hover:underline"
            >
              {t('quiz.flow.optIn.no')}
            </button>
          </div>
        ),
      },
    );
  }

  // Step 50: Vardas (tik po „Yes, I do“ Step 46)
  if (step === 50) {
    const nameOk = quizUserName.trim().length > 0;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{t('quiz.flow.nameStep.title')}</h2>
          <p className="text-sm leading-relaxed text-gray-500">
            {t('quiz.flow.nameStep.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          <label htmlFor="quiz-user-name" className="sr-only">
            {t('quiz.flow.nameStep.nameSr')}
          </label>
          <input
            id="quiz-user-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder={t('quiz.flow.nameStep.placeholder')}
            value={quizUserName}
            onChange={(e) => setQuizUserName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-lg text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>
      </div>,
      {
        backStep: 46,
        mainClassName: '!justify-center',
        footer: (
          <button
            type="button"
            onClick={handleQuizNameContinue}
            disabled={!nameOk}
            className={`${CONTINUE_BUTTON_CLASSES} w-full`}
          >{t('quiz.common.continue')}
        </button>
        ),
      },
    );
  }

  // Step 51: Apklausos užbaigimas (po Step 50 arba tiesiai po Step 46 jei skip)
  if (step === 51) {
    const firstName = quizUserName.trim().split(/\s+/)[0] || '';
    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col items-center justify-center text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          {firstName ? tLegacy('thankYouNamed', { firstName }) : tLegacy('thankYouPlain')}
        </h2>
        <p className="mb-8 text-gray-600">{tLegacy('quizComplete')}</p>
      </div>,
      {
        backStep: emailOptInAnswer === 'yes' ? 50 : 46,
        footer: (
          <button
            type="button"
            onClick={() => setStep(52)}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED + ' w-full max-w-sm'}
          >
            {tOffer('getMyPlan')}
          </button>
        ),
      },
    );
  }

  /* Nepažįstamas žingsnis (pvz. senas būsena) – nerodyti tuščio balto ekrano */
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-white px-6 text-center">
      <p className="text-sm text-gray-600">{t('common.redirecting')}</p>
    </div>
  );
}

export default Quiz;
