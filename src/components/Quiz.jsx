import { useState, useEffect, useCallback } from 'react';
import WalkingIcon from './WalkingIcon';
import PlanOfferLanding from './PlanOfferLanding';
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

/**
 * Vyriška šaka: kol `false` – Step 2 rodomas tik „Female“, visa eiga = moterų assetai / copy.
 * Vyrams sutvarkius – įjunk į `true` (Male mygtukas ir visi `gender === 'male'` šakos veiks kaip dabar).
 */
const QUIZ_MALE_BRANCH_ENABLED = true;

/**
 * Progreso juosta pagal tikrąją pirmyn eigą (1 … TOTAL_QUIZ_STEPS).
 * Žingsnių ID nėra chronologiniai (pvz. 17→25→18, 23→16, 49→40, 34→42→35).
 */
const QUIZ_PROGRESS_NUMERATOR_BY_STEP = {
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13,
  14: 14, 15: 14, 16: 19, 17: 20, 18: 22, 19: 23, 20: 15, 21: 16, 22: 17, 23: 18,
  24: 24, 25: 21, 26: 25, 27: 26, 28: 27, 29: 28, 30: 29, 31: 30, 32: 31, 33: 32, 34: 33,
  35: 35, 36: 36, 37: 38, 38: 42, 39: 42.5, 40: 41, 41: 42, 42: 34, 43: 43, 44: 44, 45: 45, 46: 46,
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

/** Palaikymo el. paštas – meniu „Email“ mygtukas (sutampa su PlanOfferLanding) */
const QUIZ_SUPPORT_EMAIL = 'support@walkingfl.fit';

/** Šoninis meniu – Terms, Privacy, Help (iš dešinės, su backdrop) */
function QuizMenuDrawer({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true" aria-labelledby="quiz-menu-title">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Uždaryti meniu"
      />
      <aside className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-white pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)] shadow-2xl">
        <div className="flex shrink-0 items-start p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Uždaryti meniu"
          >
            <X size={22} weight="bold" />
          </button>
        </div>
        <h2 id="quiz-menu-title" className="sr-only">
          Meniu
        </h2>
        <nav className="flex flex-col gap-8 px-6 pb-10 pt-2">
          <a
            href="#terms"
            className="text-lg font-medium text-slate-800 transition-colors hover:text-orange-600"
            onClick={onClose}
          >
            Terms of Use
          </a>
          <a
            href="#privacy"
            className="text-lg font-medium text-slate-800 transition-colors hover:text-orange-600"
            onClick={onClose}
          >
            Privacy Policy
          </a>
          <div className="flex flex-col items-stretch gap-2">
            <a
              href={`mailto:${QUIZ_SUPPORT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-orange-500 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.99]"
              onClick={onClose}
            >
              <Envelope size={22} weight="fill" className="shrink-0" aria-hidden />
              Email us
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
    </div>
  );
}

// Bendras mygtuko stilius – pilulės forma, oranžinis, centruotas (kaip reference)
const QUIZ_BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-12 py-3.5 text-base font-semibold text-white transition-all active:scale-[0.98]';
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
  'flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-200/90 bg-white px-6 py-[1.125rem] text-left shadow-[0_1px_3px_rgba(0,0,0,0.06)] ' +
  QUIZ_OPTION_INTERACTIVE;

/**
 * Quiz komponentas – kelių žingsnių apklausa (multi-step quiz).
 * Step 1: Pradinis langas su fonine nuotrauka, automatinis užkrovimas (10s) → Step 2.
 * Step 2: Baltas fonas, header, klausimas „What is your gender?“ (vyrams – tik jei QUIZ_MALE_BRANCH_ENABLED).
 * Step 3: Dinaminis turinys pagal lytį – moterys/vyrai su nuotrauka ir Continue mygtuku.
 */
function Quiz() {
  const [step, setStep] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /** Step 1: nuo pat pradžios rodomas automatinis užkrovimas */
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [gender, setGender] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [bodyType, setBodyType] = useState('');
  const [dreamBody, setDreamBody] = useState('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState([]);
  const [celluliteAnswer, setCelluliteAnswer] = useState('');
  const [bestShapeAnswer, setBestShapeAnswer] = useState('');
  const [weightFluctuationsAnswer, setWeightFluctuationsAnswer] = useState('');
  const [stairsAnswer, setStairsAnswer] = useState('');
  const [workScheduleAnswer, setWorkScheduleAnswer] = useState('');
  const [activityLevelAnswer, setActivityLevelAnswer] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [energyLevelAnswer, setEnergyLevelAnswer] = useState('');
  const [sleepAnswer, setSleepAnswer] = useState('');
  const [walkFrequencyAnswer, setWalkFrequencyAnswer] = useState('');
  const [selectedExercisePreference, setSelectedExercisePreference] = useState([]);
  const [desiredWalkFrequency, setDesiredWalkFrequency] = useState('');
  const [dailyStepsAnswer, setDailyStepsAnswer] = useState('');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedWeightGainEvents, setSelectedWeightGainEvents] = useState([]);
  const [motivationAnswer, setMotivationAnswer] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [motivationEventAnswer, setMotivationEventAnswer] = useState('');
  const [emailForPlan, setEmailForPlan] = useState('');
  const [rewardAnswer, setRewardAnswer] = useState('');
  const [seeYourselfAnswer, setSeeYourselfAnswer] = useState('');
  const [emailOptInAnswer, setEmailOptInAnswer] = useState('');
  /** Vardas – Step 50 po marketing opt-in (Step 46) */
  const [quizUserName, setQuizUserName] = useState('');
  /** Pasitikėjimas pasiekti tikslą – Step 48 po prognozės (Step 37) */
  const [reachConfidenceAnswer, setReachConfidenceAnswer] = useState('');
  /** Įvykio data (YYYY-MM-DD) – Step 47 po motyvacijos įvykio */
  const [motivationEventDate, setMotivationEventDate] = useState('');
  /** Tikslus amžius (metais) – po goal weight (Step 34), prieš walking profile (Step 35) */
  const [exactAgeInput, setExactAgeInput] = useState('');
  const [userExactAge, setUserExactAge] = useState(null);
  /** Step 43: animuojamas procentas kuriant planą */
  const [planBuildPercent, setPlanBuildPercent] = useState(PLAN_BUILD_START_PERCENT);

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

  const handleCompletionContinue = useCallback(() => {
    setStep(45);
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

  /** Step 43: progresas 0 % → 100 %, tada automatiškai Step 44 */
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
        timeoutId = window.setTimeout(() => setStep(44), 350);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [step]);

  /** Step 28: automatinė atsiliepimų karuselė (88 kg → 147 kg) */
  useEffect(() => {
    if (step !== 28) return;
    setTestimonialIndex(0);
    const intervalMs = 5000;
    const id = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % 2);
    }, intervalMs);
    return () => clearInterval(id);
  }, [step]);

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

  // Step 52: Plasmic purchase tipo landingas (Tailwind + vietinės nuotraukos)
  if (step === 52) {
    const goalNum = Number(String(goalWeight).replace(',', '.'));
    const targetKg = Number.isFinite(goalNum) && goalNum > 0 ? goalNum : 85;
    return <PlanOfferLanding targetWeightKg={targetKg} promoCode="Gintas mar2026" />;
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
              <span className="block">Take the first step in</span>
              <span className="mt-1 block sm:mt-2">Tai Chi: Transform</span>
              <span className="mt-1 block sm:mt-2">Your WALK!</span>
            </h1>
          </div>

          <div className="w-full shrink-0 space-y-2 pb-6">
            <p className="flex items-center justify-center gap-1 text-sm font-medium text-white/95 drop-shadow">
              Loading the quiz
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
    const { backStep, mainClassName, screenClassName } = options;
    const goBack = () => {
      if (backStep !== undefined) {
        setStep(backStep);
        return;
      }
      setStep((prev) => Math.max(1, prev - 1));
    };
    const shellBg = screenClassName ?? 'bg-white';
    return (
    <>
      <div className={`min-h-screen ${shellBg}`}>
        {/* Header: atgal | logo | hamburger – kaip reference (švarus baltas) */}
        <header
          className={`grid grid-cols-3 items-center border-b border-gray-100 px-4 py-4 ${shellBg}`}
        >
          <button
            type="button"
            onClick={goBack}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-50"
            aria-label="Atgal"
          >
            <CaretLeft size={24} weight="bold" className="text-gray-500" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-50"
            aria-label="Meniu"
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
        </header>

        {/* Plona progreso juosta – terrakota / oranžinis užpildymas */}
        <div className="h-0.5 w-full bg-gray-100">
          <div
            className="h-full bg-[#e07a4f] transition-all duration-300 ease-out"
            style={{ width: `${quizStepProgress}%` }}
          />
        </div>

        {/* Turinys – viršutinė trečdalis, centruota horizontaliai (kaip screenshot) */}
        <main
          className={`relative z-0 flex min-h-[calc(100vh-100px)] flex-col items-center justify-start overflow-visible px-6 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] pt-10 md:pt-14 ${mainClassName ?? ''}`}
        >
          {content}
        </main>
      </div>
      <QuizMenuDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
    );
  };

  // Step 2: Lyties pasirinkimas – 1:1 su reference (be HelpCircle, terrakota, ♀/♂)
  if (step === 2) {
    return renderQuizStepLayout(
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold leading-tight text-gray-900 md:text-[1.75rem]">
            What is your <span className={`font-semibold ${GENDER_ACCENT_CLASS}`}>gender?</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">
            This information will help us create a suitable program for you
          </p>
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
            <span className="pointer-events-none font-bold text-gray-900">Female</span>
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
              <span className="pointer-events-none font-bold text-gray-900">Male</span>
            </button>
          ) : (
            <p className="text-center text-xs leading-relaxed text-gray-400">
              Men&apos;s program — we&apos;re polishing it next; this flow is tailored for women.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Step 3: Dinaminis turinys pagal lytį – kompaktiškas tekstas + nuotrauka (kaip reference)
  if (step === 3) {
    const isFemale = gender !== 'male'; // fallback į female jei gender tuščias
    const titleLine = isFemale ? '10 million women' : '10 million men';
    const imageSrc = isFemale ? threeWomenHeroImage : threeMenHeroImage;

    return (
      <>
      <div className="min-h-screen overflow-x-clip bg-[#f3e9dc]">
        {/* Header: atgal | logo | hamburger */}
        <header className="grid grid-cols-3 items-center border-b border-amber-200/50 bg-white/80 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Atgal"
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Meniu"
            onClick={() => setIsMenuOpen(true)}
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
        </header>

        {/* Progreso juosta */}
        <div className="h-1 w-full bg-amber-200/50">
          <div
            className="h-full bg-orange-500 transition-all duration-300 ease-out"
            style={{ width: `${getQuizProgressPercent(step)}%` }}
          />
        </div>

        {/* Kompaktiškas blokas: kairėje antraštė + ikonos, dešinėje nuotrauka */}
        <div className="flex min-h-[calc(100vh-120px)] w-full min-w-0 flex-col items-center justify-center overflow-x-clip px-5 py-8 sm:px-8">
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
                trust <span className="font-semibold text-gray-800">Walking</span> with their fitness
                goals
              </p>
            </div>
            <div className="w-full max-w-[22rem] shrink-0 sm:max-w-[26rem] md:max-w-[29rem]">
              <img
                src={imageSrc}
                alt={isFemale ? 'Moterys Walking programoje' : 'Vyrai Walking programoje'}
                className="h-auto w-full object-contain object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Continue mygtukas – apačioje, visada matomas */}
        <div className="relative z-10 flex justify-center px-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-4">
          <button
            type="button"
            onClick={handleContinue}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED}
          >
            Continue
          </button>
        </div>
      </div>
      <QuizMenuDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </>
    );
  }

  // Step 4: Amžiaus pasirinkimas (moterys ir vyrai – skirtingos nuotraukos)
  if (step === 4) {
    const ageImages = gender === 'male' ? MALE_AGE_IMAGES : FEMALE_AGE_IMAGES;
    const AGE_OPTIONS = [
      { range: '40-49', label: 'Age: 40-49' },
      { range: '50-59', label: 'Age: 50-59' },
      { range: '60-69', label: 'Age: 60-69' },
      { range: '70-80', label: 'Age: 70-80' },
    ];

    return (
      <>
      <div className="min-h-screen overflow-x-clip bg-white">
        {/* Header */}
        <header className="grid grid-cols-3 items-center border-b border-gray-200 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))]">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Atgal"
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Meniu"
            onClick={() => setIsMenuOpen(true)}
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
        </header>

        {/* Progreso juosta */}
        <div className="h-1 w-full bg-gray-200">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${getQuizProgressPercent(step)}%` }}
          />
        </div>

        {/* Turinys */}
        <main className="flex flex-col items-center px-6 py-8">
          <h2 className="text-center text-lg font-bold uppercase tracking-wide text-gray-900">
            Personalized Tai Chi Walking Plan
          </h2>
          <p className="mt-1 text-center text-sm font-medium uppercase tracking-wide text-gray-500">
            Based on your age
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
                  <span className="truncate">{option.label}</span>
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
            I&apos;m 18-39 &gt;
          </button>
        </main>
      </div>
      <QuizMenuDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
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
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">How old are you?</h2>
          <p className="text-sm text-gray-500">We&apos;ll tailor your experience accordingly</p>
        </div>

        <label className="sr-only" htmlFor="quiz-exact-age">
          Your age in years
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

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleExactAgeContinue}
            disabled={!exactAgeValid}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>,
      { backStep: 34 },
    );
  }

  // Step 5: Tikslų pasirinkimas (multi-select)
  if (step === 5) {
    const GOAL_OPTIONS = [
      { id: 'lose_weight', label: 'Lose weight' },
      { id: 'heart_health', label: 'Improve heart health' },
      { id: 'flexibility', label: 'Develop flexibility' },
      { id: 'self_esteem', label: 'Improve self-esteem and love my body' },
      { id: 'stay_fit', label: 'Stay fit' },
      { id: 'reduce_stress', label: 'Reduce stress' },
      { id: 'firm_toned', label: 'Get firm and toned' },
    ];

    const hasSelectedGoals = selectedGoals.length > 0;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                What do you want to achieve?
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Select as many goals as you want
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {GOAL_OPTIONS.map((option) => {
              const isSelected = selectedGoals.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleGoalToggle(option.id)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span className="font-medium text-gray-900">{option.label}</span>
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
            <span className="text-sm font-medium">Please select at least one goal to continue</span>
          </div>
        )}

        {/* Continue mygtukas apačioje */}
        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleGoalsContinue}
            disabled={!hasSelectedGoals}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>,
      { backStep: 4 },
    );
  }

  // Step 6: Kūno tipo pasirinkimas (moterų / vyrų nuotraukos pagal gender)
  if (step === 6) {
    const bodyTypeImages = gender === 'male' ? MALE_BODY_TYPE_IMAGES : BODY_TYPE_IMAGES;
    const BODY_TYPE_OPTIONS = [
      { id: 'slim', label: 'Slim' },
      { id: 'mid_sized', label: 'Mid-sized' },
      { id: 'plus_sized', label: 'Plus-sized' },
      { id: 'overweight', label: 'Overweight' },
    ];

    const hasSelectedBodyType = bodyType !== '';

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                What image describes your physical build?
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {BODY_TYPE_OPTIONS.map((option) => {
              const isSelected = bodyType === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleBodyTypeSelect(option.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={bodyTypeImages[option.id]}
                      alt={option.label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="flex-1 font-medium text-gray-900">{option.label}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelectedBodyType && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">Please select your body type to continue</span>
          </div>
        )}

        {/* Continue mygtukas apačioje */}
        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleBodyTypeContinue}
            disabled={!hasSelectedBodyType}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 7: Dream body pasirinkimas (vyrams – atskiros nuotraukos, „Shapely“ vietoj „Curvy“)
  if (step === 7) {
    const dreamBodyImages = gender === 'male' ? MALE_DREAM_BODY_IMAGES : DREAM_BODY_IMAGES;
    const DREAM_BODY_OPTIONS =
      gender === 'male'
        ? [
            { id: 'thin', label: 'Thin' },
            { id: 'toned', label: 'Toned' },
            { id: 'curvy', label: 'Shapely' },
            { id: 'healthy', label: 'Healthy' },
          ]
        : [
            { id: 'thin', label: 'Thin' },
            { id: 'toned', label: 'Toned' },
            { id: 'curvy', label: 'Curvy' },
            { id: 'healthy', label: 'Healthy' },
          ];

    const hasSelectedDreamBody = dreamBody !== '';

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                What is your dream body?
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {DREAM_BODY_OPTIONS.map((option) => {
              const isSelected = dreamBody === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleDreamBodySelect(option.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={dreamBodyImages[option.id]}
                      alt={option.label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="flex-1 font-medium text-gray-900">{option.label}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelectedDreamBody && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">Please select your dream body to continue</span>
          </div>
        )}

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleDreamBodyContinue}
            disabled={!hasSelectedDreamBody}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 8: Kurių sričių norite sutelkti dėmesį (vyrams – atskiros nuotraukos; „Full body“ = visi)
  if (step === 8) {
    const focusAreaImages = gender === 'male' ? MALE_FOCUS_AREA_IMAGES : FOCUS_AREA_IMAGES;
    const FOCUS_AREA_OPTIONS = [
      { id: 'legs', label: 'Legs' },
      { id: 'belly', label: 'Belly' },
      { id: 'arms', label: 'Arms' },
      { id: 'chest', label: 'Chest' },
      { id: 'buttocks', label: 'Buttocks' },
      { id: 'hips', label: 'Hips' },
      { id: 'full_body', label: 'Full body' },
    ];

    const hasSelectedAreas = selectedFocusAreas.length > 0;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Which areas do you want to focus on?
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Your walking plan will be focused on these areas
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FOCUS_AREA_OPTIONS.map((option) => {
              const isSelected = selectedFocusAreas.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleFocusAreaToggle(option.id)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={focusAreaImages[option.id]}
                        alt={option.label}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-900">{option.label}</span>
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
            <span className="text-sm font-medium">Please select at least one area to continue</span>
          </div>
        )}

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleFocusAreasContinue}
            disabled={!hasSelectedAreas}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 9: Do you struggle with cellulite?
  if (step === 9) {
    const CELLULITE_OPTIONS = [
      { id: 'yes', label: 'Yes', icon: 'check' },
      { id: 'no', label: 'No', icon: 'x' },
      { id: 'a_little', label: 'A little bit', icon: 'ellipsis' },
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
                Do you struggle with cellulite?
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
                  <span className="flex-1 font-medium text-gray-900">{option.label}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelected && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">Please select an option to continue</span>
          </div>
        )}

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleCelluliteContinue}
            disabled={!hasSelected}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 10: How long ago were you in the best shape?
  if (step === 10) {
    const bestShapeSideHero =
      gender === 'male' ? menPritupstaiHeroImage : bestShapeHeroImage;
    const BEST_SHAPE_OPTIONS = [
      { id: 'less_than_year', label: 'Less than a year ago' },
      { id: '1_to_2_years', label: '1 to 2 years ago' },
      { id: 'more_than_3', label: 'More than 3 years ago' },
      { id: 'never', label: 'Never' },
    ];

    const hasSelected = bestShapeAnswer !== '';

    return renderQuizStepLayout(
      <div className="relative w-full max-w-2xl pb-8 md:pb-12">
        {/* Viso ekrano plotis – nuotrauka išlygiuota prie dešinio krašto, matomas visas siluetas */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 flex w-screen max-w-[100vw] -translate-x-1/2 justify-end pr-3 sm:pr-4 md:pr-6"
          aria-hidden
        >
          <img
            src={bestShapeSideHero}
            alt=""
            className="h-auto max-h-[min(48vh,380px)] w-auto max-w-[min(92vw,560px)] object-contain object-right object-bottom sm:max-h-[min(62vh,560px)] md:max-h-[min(72vh,640px)]"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col pb-24 sm:pb-32 md:pb-28">
          <h2 className="text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
            How long ago were you in the best shape of your life?
          </h2>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10">
            {BEST_SHAPE_OPTIONS.map((option) => {
              const isSelected = bestShapeAnswer === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleBestShapeSelect(option.id)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span className="font-medium text-gray-900">{option.label}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>

          {!hasSelected && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
              <LucideXCircle size={20} className="text-blue-500 shrink-0" />
              <span className="text-sm font-medium">Please select an option to continue</span>
            </div>
          )}

          <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={handleBestShapeContinue}
              disabled={!hasSelected}
              className={CONTINUE_BUTTON_CLASSES}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 11: How would you describe your weight fluctuations?
  if (step === 11) {
    const weightFluctuationsSideHero =
      gender === 'male' ? menStabilityBallHeroImage : weightFluctuationsHeroImage;
    const WEIGHT_FLUCTUATIONS_OPTIONS = [
      { id: 'gain_fast_lose_slow', label: 'I gain weight fast but lose it slowly' },
      { id: 'gain_lose_easily', label: 'I gain and lose weight easily' },
      { id: 'struggle_to_gain', label: 'I struggle to gain weight or muscle' },
    ];

    const hasSelected = weightFluctuationsAnswer !== '';
    const isMaleWeightFluctuations = gender === 'male';

    return renderQuizStepLayout(
      <div className="relative w-full max-w-2xl pb-8 md:pb-12">
        <div
          className={`pointer-events-none absolute bottom-0 left-1/2 z-0 flex w-screen max-w-[100vw] -translate-x-1/2 justify-end ${
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

        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col pb-24 sm:pb-32 md:pb-28">
          <h2 className="text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
            How would you describe your weight fluctuations?
          </h2>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10">
            {WEIGHT_FLUCTUATIONS_OPTIONS.map((option) => {
              const isSelected = weightFluctuationsAnswer === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleWeightFluctuationsSelect(option.id)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3.5 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span className="font-medium text-gray-900">{option.label}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>

          {!hasSelected && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
              <LucideXCircle size={20} className="text-blue-500 shrink-0" />
              <span className="text-sm font-medium">Please select an option to continue</span>
            </div>
          )}

          <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={handleWeightFluctuationsContinue}
              disabled={!hasSelected}
              className={CONTINUE_BUTTON_CLASSES}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 12: Informacinis ekranas – Harvard / Tai Chi nauda (moterims / vyrams)
  if (step === 12) {
    const isMaleHarvardInfo = gender === 'male';
    const shellBg = isMaleHarvardInfo
      ? 'min-h-screen bg-gradient-to-b from-white via-[#fdf8f2] to-[#f5e6d4]'
      : 'min-h-screen bg-[#fdf5e6]';

    return (
      <>
      <div className={`${shellBg} overflow-x-clip`}>
        {/* Header */}
        <header className="grid grid-cols-3 items-center border-b border-amber-200/50 bg-white/80 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setStep(11)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Atgal"
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Meniu"
            onClick={() => setIsMenuOpen(true)}
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
        </header>

        {/* Progreso juosta */}
        <div className="h-1 w-full bg-amber-200/50">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${getQuizProgressPercent(step)}%` }}
          />
        </div>

        {/* Turinys */}
        <div className="relative min-h-[calc(100vh-120px)] overflow-x-clip overflow-y-visible px-6 py-8 pb-32 sm:pb-40">
          {isMaleHarvardInfo ? (
            <div
              className="pointer-events-none absolute bottom-0 right-0 z-0 flex justify-end overflow-visible"
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
              className="pointer-events-none absolute bottom-0 left-1/2 z-0 flex w-screen max-w-[100vw] -translate-x-1/2 justify-end pr-2 sm:pr-4 md:pr-6"
              aria-hidden
            >
              <img
                src={harvardInfoDoctorImage}
                alt=""
                className="h-auto max-h-[min(48vh,420px)] w-auto max-w-[min(88vw,520px)] object-contain object-right object-bottom sm:max-h-[min(56vh,520px)] md:max-h-[min(62vh,600px)]"
              />
            </div>
          )}

          <div className="relative z-10 flex max-w-xl flex-col">
            {/* Harvard Gazette logotipas */}
            <div className="mb-4">
              <img
                src={harvardGazetteLogo}
                alt="The Harvard Gazette"
                className="h-7 w-auto max-w-[200px] sm:h-8"
              />
            </div>

            {/* Antraštė */}
            {isMaleHarvardInfo ? (
              <h2 className="mb-6 text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
                Weight Loss &amp; Health{' '}
                <span className="text-orange-500">Benefits</span>
                {' '}of Tai Chi Walking{' '}
                <span className="text-orange-500">for Men over 50</span>
              </h2>
            ) : (
              <div className="mb-6 flex items-start gap-2">
                <HelpCircle size={28} className={`${QUIZ_ICON_CLASS} mt-1`} />
                <h2 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                  Weight Loss and Health{' '}
                  <span className="text-orange-500">Benefits</span>
                  {' '}of Tai Chi Walking{' '}
                  <span className="text-orange-500">for Women over 50</span>
                </h2>
              </div>
            )}

            {/* Citatos kortelė */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <span className="text-3xl font-serif text-orange-500">&ldquo;</span>
              <p className="mt-2 text-gray-700">
                A study in the Journal of Aging and Physical Activity found that Tai Chi walking led to a{' '}
                <strong>20%</strong> boost in heart health and helped{' '}
                <strong>lose 6-8% of body weight</strong> within 4-12 weeks.
              </p>
            </div>
          </div>
        </div>

        {/* Continue mygtukas */}
        <div className="relative z-10 flex justify-center px-6 pb-8 pt-4">
          <button
            type="button"
            onClick={handleHarvardInfoContinue}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED}
          >
            Continue
          </button>
        </div>
      </div>
      <QuizMenuDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </>
    );
  }

  // Step 13: How do you feel after climbing some stairs?
  if (step === 13) {
    const stairsOptionImages =
      gender === 'male' ? MALE_STAIRS_OPTION_IMAGES : STAIRS_OPTION_IMAGES;
    const STAIRS_OPTIONS = [
      { id: 'out_of_breath', label: 'Out of breath' },
      { id: 'sometimes_tired', label: 'Sometimes tired but this OK' },
      { id: 'easily', label: 'Easily' },
    ];

    const hasSelected = stairsAnswer !== '';

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                How do you feel after climbing some stairs?
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              This will help test your cardiorespiratory function.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {STAIRS_OPTIONS.map((option) => {
              const isSelected = stairsAnswer === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleStairsSelect(option.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={stairsOptionImages[option.id]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="flex-1 font-medium text-gray-900">{option.label}</span>
                  {isSelected && <CheckCircle size={24} className={QUIZ_OPTION_CHECK_ICON} />}
                </button>
              );
            })}
          </div>
        </div>

        {!hasSelected && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <LucideXCircle size={20} className="text-blue-500 shrink-0" />
            <span className="text-sm font-medium">Please select an option to continue</span>
          </div>
        )}

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleStairsContinue}
            disabled={!hasSelected}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
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
            aria-label="Atgal"
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Meniu"
            onClick={() => setIsMenuOpen(true)}
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
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
              Nurture your health with safe and low-impact Tai Chi workouts!
            </h2>
            <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
              Our Tai Chi workouts focus on body awareness and gentle movements. They are a safer alternative to high-impact workouts for those prone to injuries or joint discomfort.
            </p>
          </div>
          <div className="flex justify-center pb-6 pt-2">
            <button
              type="button"
              onClick={handleTaiChiPromoContinue}
              className={CONTINUE_BUTTON_ALWAYS_ENABLED}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <QuizMenuDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
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
            aria-label="Atgal"
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Meniu"
            onClick={() => setIsMenuOpen(true)}
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
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
              Not a problem! We&apos;ll balance your energy levels
            </h2>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700">
              Weekly energy level with walking
            </p>

            <div className="my-8 flex w-full max-w-lg justify-center">
              <img
                src={energyHighIntensityDiagram}
                alt="Energy diagram: intensity curve with high intensity at the peak"
                className="h-auto w-full max-h-[min(52vh,440px)] object-contain object-center drop-shadow-sm"
              />
            </div>

            <p className="max-w-lg text-pretty text-gray-700">
              Our fun and engaging workouts enhance overall body mobility, gently activate your muscles,
              and charge you for the day!
            </p>
            <p className="mt-4 max-w-lg text-pretty text-gray-700">
              Pump up your energy, stamina, and mood to enjoy every moment of your life!
            </p>
          </div>

          <div className="mx-auto w-full max-w-md pb-10 pt-2">
            <button
              type="button"
              onClick={handleEnergyBalanceGotIt}
              className={`${CONTINUE_BUTTON_ALWAYS_ENABLED} w-full`}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
      <QuizMenuDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </>
    );
  }

  // Step 17: How much sleep do you usually get? – po energijos balanso (Step 16)
  if (step === 17) {
    const sleepHeroImage =
      gender === 'male' ? sleepMenInBedHeroImage : sleepInBedHeroImage;
    const sleepHeroAlt =
      gender === 'male'
        ? 'Man stretching in bed after waking up'
        : 'Woman stretching in bed after waking up';
    const SLEEP_OPTIONS = [
      { id: 'less_than_5', label: 'Less than 5 hours' },
      { id: '5_to_6', label: '5-6 hours' },
      { id: '7_to_8', label: '7-8 hours' },
      { id: 'more_than_8', label: 'More than 8 hours' },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col">
        <div className="space-y-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
            How much sleep do you usually get?
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
            <img
              src={sleepHeroImage}
              alt={sleepHeroAlt}
              className="h-auto max-h-[min(48vh,420px)] w-full object-cover object-center"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {SLEEP_OPTIONS.map((option) => {
              const isSelected = sleepAnswer === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSleepSelect(option.id)}
                  className={`rounded-xl px-4 py-4 text-center font-semibold text-gray-900 shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  {option.label}
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
    const WALK_FREQUENCY_OPTIONS = [
      { id: 'almost_daily', label: 'Almost every day' },
      { id: '3_4_week', label: '3-4 times per week' },
      { id: '1_2_week', label: '1-2 times per week' },
      { id: 'once_month', label: 'Once a month or less' },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
            How often do you go for walks?
          </h2>

          <div className="flex flex-col gap-3">
            {WALK_FREQUENCY_OPTIONS.map((option) => {
              const isSelected = walkFrequencyAnswer === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleWalkFrequencySelect(option.id)}
                  className={`rounded-xl px-4 py-4 text-center font-semibold text-gray-900 shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  {option.label}
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
        <div className="mx-auto flex min-h-[calc(100vh-11rem)] w-full max-w-4xl flex-col items-center">
          <div className="flex w-full flex-1 flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-12">
            <div className="min-w-0 w-full max-w-xl space-y-4 text-center md:max-w-md md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Tai Chi Walking: just as effective as high-impact workouts
              </h2>
              <p className="text-pretty text-gray-700">
                People often think walking is less effective than high-impact workouts like running.
                But studies show <strong>Tai Chi walking</strong> — especially at a brisk pace —{' '}
                <strong>can be a powerful way to boost your fitness</strong> and support your overall
                well-being.
              </p>
              <p className="text-sm text-gray-600">
                Source: &apos;Walking for Exercise&apos; Harvard Nutrition Source
              </p>
            </div>

            <div className="flex w-full shrink-0 justify-center md:w-auto">
              <img
                src={menDesignedUpgradeHeroImage}
                alt="Smiling man with arms raised, fitness and well-being"
                className="h-auto max-h-[min(46vh,400px)] w-auto max-w-[min(92vw,300px)] object-contain object-center sm:max-h-[min(52vh,440px)] sm:max-w-[min(88vw,340px)] md:max-h-[min(58vh,500px)] md:max-w-[min(40vw,380px)]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          <div className="mt-auto flex w-full justify-center pt-10 pb-2 md:pt-14 md:pb-4">
            <button
              type="button"
              onClick={handleTaiChiWalkingInfoGotIt}
              className={CONTINUE_BUTTON_ALWAYS_ENABLED}
            >
              Got it
            </button>
          </div>
        </div>,
        {
          backStep: 18,
          mainClassName: 'bg-white',
        },
      );
    }

    return renderQuizStepLayout(
      <div className="mx-auto flex min-h-[calc(100vh-11rem)] w-full max-w-4xl flex-col items-center">
        <div className="flex w-full flex-1 flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-12">
          <div className="min-w-0 w-full max-w-xl space-y-4 text-center md:max-w-md md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Tai Chi Walking: just as effective as high-impact workouts
            </h2>
            <p className="text-pretty text-gray-700">
              People often think walking is less effective than high-impact workouts like running. But
              studies show <strong>Tai Chi walking</strong> — especially at a brisk pace —{' '}
              <strong>can be a powerful way to boost your fitness</strong> and support your overall
              well-being.
            </p>
            <p className="text-sm text-gray-600">
              Source: &apos;Walking for Exercise&apos; Harvard Nutrition Source
            </p>
          </div>

          <div className="flex w-full shrink-0 justify-center md:w-auto">
            <img
              src={taiChiWalkingHeroImage}
              alt="Smiling woman with yoga mat and water bottle"
              className="h-auto max-h-[min(50vh,420px)] w-auto max-w-[min(100%,300px)] object-contain object-center md:max-h-[min(60vh,520px)] md:max-w-[min(42vw,400px)]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>

        <div className="mt-auto flex w-full justify-center pt-10 pb-2 md:pt-14 md:pb-4">
          <button
            type="button"
            onClick={handleTaiChiWalkingInfoGotIt}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED}
          >
            Got it
          </button>
        </div>
      </div>,
      {
        backStep: 18,
        mainClassName: 'bg-[#ffe8d6]',
      },
    );
  }

  // Step 20: What's your work schedule like? – pasirinkus automatiškai perkelia į kitą
  if (step === 20) {
    const WORK_SCHEDULE_OPTIONS = [
      { id: '9_to_5', label: '9 to 5 job', Icon: LucideBriefcase },
      { id: 'flexible', label: 'My hours are flexible', Icon: LucideCoffee },
      { id: 'night_shifts', label: 'Night shifts', Icon: LucideSun },
      { id: 'dont_work', label: "I don't work", Icon: LucideUmbrella },
      { id: 'stay_at_home', label: 'Stay-at-home parent', Icon: Sofa },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
            What&apos;s your work schedule like?
          </h2>

          <div className="flex flex-col gap-3">
            {WORK_SCHEDULE_OPTIONS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleWorkScheduleSelect(id)}
                className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <Icon size={24} className="text-gray-600" strokeWidth={2} />
                </span>
                <span className="font-medium text-gray-900">{label}</span>
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
    const ACTIVITY_LEVEL_OPTIONS = [
      { id: 'sedentary', label: 'Sedentary', sublabel: "I don't exercise or move much" },
      { id: 'somewhat_active', label: 'Somewhat active', sublabel: "I don't exercise, but I move a lot" },
      { id: 'active', label: 'Active', sublabel: 'I exercise a few times per week' },
      { id: 'very_active', label: 'Very active', sublabel: 'I exercise almost every day' },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          {/* Klausimo sritis su šviesiai mėlynu fonu */}
          <div className="rounded-2xl bg-sky-50 px-6 py-5">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                How active is your lifestyle?
              </h2>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500">
              We will take it into consideration when creating your program
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {ACTIVITY_LEVEL_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleActivityLevelSelect(option.id)}
                className={`flex cursor-pointer flex-col items-start gap-1 rounded-xl px-4 py-4 text-left shadow-sm ${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`}
              >
                <span className="font-semibold text-gray-900">{option.label}</span>
                <span className="text-sm text-gray-500">{option.sublabel}</span>
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
      { id: 'walking_pet', label: 'Walking my pet', icon: 'paw' },
      { id: 'active_time_child', label: 'Spending a lot of active time with my child', icon: 'child' },
      { id: 'climbing_stairs', label: 'Climbing stairs frequently', icon: 'stairs' },
      { id: 'household_tasks', label: 'Active household tasks', icon: 'house' },
      { id: 'no', label: 'No', icon: 'x' },
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
                Are any of these activities part of your life?
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Choose all that apply
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
                    <span className="font-medium text-gray-900">{option.label}</span>
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
            <span className="text-sm font-medium">Please select at least one option to continue</span>
          </div>
        )}

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleActivitiesContinue}
            disabled={!hasSelected}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 23: How are your energy levels during the day? – baterijos ikonos
  if (step === 23) {
    const ENERGY_OPTIONS = [
      { id: 'low_tired', label: 'Low, I feel tired all day', bars: 1 },
      { id: 'crash_lunch', label: 'I crash after lunch', bars: 2 },
      { id: 'caffeine', label: 'I rely on caffeine to keep me going', bars: 3 },
      { id: 'high_steady', label: 'High and steady all day', bars: 4 },
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
                How are your energy levels during the day?
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
                <span className="font-medium text-gray-900">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 24: Where do you prefer to exercise? – multi-select
  if (step === 24) {
    const EXERCISE_PREFERENCE_OPTIONS = [
      { id: 'home', label: 'Home' },
      { id: 'outside', label: 'Outside' },
      { id: 'gym', label: 'Gym' },
      { id: 'no_preference', label: 'No preference' },
    ];

    const hasSelected = selectedExercisePreference.length > 0;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Where do you prefer to exercise?
              </h2>
            </div>
            <p className="text-sm text-gray-500">Choose all that apply</p>
          </div>

          <div className="flex flex-col gap-3">
            {EXERCISE_PREFERENCE_OPTIONS.map((option) => {
              const isSelected = selectedExercisePreference.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleExercisePreferenceToggle(option.id)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 text-left shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  <span className="font-medium text-gray-900">{option.label}</span>
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
            <span className="text-sm font-medium">Please select at least one option to continue</span>
          </div>
        )}

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleExercisePreferenceContinue}
            disabled={!hasSelected}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>,
      { backStep: 19 },
    );
  }

  // Step 25: „Designed to upgrade your life“ – po Step 17 (miegas)
  if (step === 25) {
    const bubblesImage =
      gender === 'male' ? lifestyleBubblesMenImage : lifestyleBubblesImage;
    const bubblesAlt =
      gender === 'male'
        ? 'Men and lifestyle moments in circular frames'
        : 'People and lifestyle moments in circular frames';

    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="w-full space-y-6 px-2 py-4">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Designed to upgrade your life
            </h2>
            <p className="text-pretty text-base leading-relaxed text-gray-700">
              We&apos;ll tailor our workouts to your lifestyle to help you move your body, build
              confidence, and have fun.
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
        <div className="mt-8 w-full max-w-md">
          <button
            type="button"
            onClick={handleLifestyleUpgradeGreat}
            className={`${CONTINUE_BUTTON_ALWAYS_ENABLED} w-full`}
          >
            Great!
          </button>
        </div>
      </div>,
      {
        backStep: 17,
        mainClassName: 'bg-[#ffe8d6]',
      },
    );
  }

  // Step 26: How many times per week would you like to walk? – po Step 24 (exercise preference)
  if (step === 26) {
    const walkHeroImage =
      gender === 'male' ? menDesiredWalkHeroImage : desiredWalkHeroImage;
    const walkHeroAlt =
      gender === 'male'
        ? 'Man doing a side stretch, walking and fitness'
        : 'Woman stretching with arms raised';

    const DESIRED_WALK_OPTIONS = [
      { id: '1_2_times', label: '1-2 times' },
      { id: '3_4_times', label: '3-4 times' },
      { id: '5_plus_times', label: '5+ times' },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-5xl flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="flex w-full min-w-0 flex-1 flex-col">
          <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:justify-start md:gap-2">
                <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  How many times per week would you like to walk?
                </h2>
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-md flex-col gap-3 md:mx-0">
              {DESIRED_WALK_OPTIONS.map((option) => {
                const isSelected = desiredWalkFrequency === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleDesiredWalkFrequencySelect(option.id)}
                    className={`rounded-xl px-4 py-4 text-left font-semibold text-gray-900 shadow-sm ${
                      isSelected
                        ? QUIZ_OPTION_CARD_SELECTED
                        : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                    }`}
                  >
                    {option.label}
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
    const DAILY_STEPS_OPTIONS = [
      { id: 'easy', label: 'Easy: <5K steps' },
      { id: 'medium', label: 'Medium: 5-10K steps' },
      { id: 'hard', label: 'Hard: >10K steps' },
      { id: 'not_sure', label: "I'm not sure" },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="rounded-2xl bg-sky-50 px-6 py-5">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                How many steps do you think you need in a day?
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {DAILY_STEPS_OPTIONS.map((option) => {
              const isSelected = dailyStepsAnswer === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleDailyStepsSelect(option.id)}
                  className={`rounded-xl px-4 py-4 text-left font-semibold text-gray-900 shadow-sm ${
                    isSelected
                      ? QUIZ_OPTION_CARD_SELECTED
                      : `${QUIZ_OPTION_CARD_IDLE} ${QUIZ_OPTION_INTERACTIVE}`
                  }`}
                >
                  {option.label}
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
    const TRANSFORMATION_TESTIMONIALS = [
      {
        heroImage: testimonialSlide88kg,
        beforeWeight: '88 KG',
        afterWeight: '80 kg',
        name: 'Lily Morgan',
        quote:
          "This app turned my walks into real progress. I'm seeing the difference on the scale and in my mood!",
      },
      {
        heroImage: testimonialSlide147kg,
        beforeWeight: '147 KG',
        afterWeight: '108 kg',
        name: 'Noah Bennett',
        quote:
          "I've lost weight without even realizing it - just by walking daily with this app. It actually made fitness fun for once.",
      },
    ];

    const t = TRANSFORMATION_TESTIMONIALS[testimonialIndex];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col">
        <div className="space-y-6">
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
            They did it.{' '}
            <span className="text-[#FF7A45]">You can do too!</span> Start your transformation today!
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="mb-4 flex justify-center">
              <img
                key={testimonialIndex}
                src={t.heroImage}
                alt={`${t.name} — before and after`}
                className="max-h-[min(52vh,280px)] w-full max-w-md rounded-xl object-contain object-center transition-opacity duration-300"
              />
            </div>
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-2xl font-bold text-amber-600">
              <span>{t.beforeWeight}</span>
              <span className="text-lg font-semibold text-gray-400">&gt;</span>
              <span>{t.afterWeight}</span>
            </div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-gray-900">{t.name}</span>
              <div className="flex gap-0.5" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={18} weight="fill" className="text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-gray-600 md:text-base">
              &quot;{t.quote}&quot;
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
                  aria-label={`Testimonial ${i + 1} of ${TRANSFORMATION_TESTIMONIALS.length}`}
                  aria-current={i === testimonialIndex ? 'true' : undefined}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleTransformationContinue}
              className={`${CONTINUE_BUTTON_ALWAYS_ENABLED} min-w-[200px] bg-[#FF7A45] hover:bg-[#e86a38]`}
            >
              Let&apos;s Do It!
            </button>
          </div>
        </div>
      </div>,
      { backStep: 27 },
    );
  }

  // Step 29: Have any of the following events led to weight gain? – multi-select
  if (step === 29) {
    const WEIGHT_GAIN_EVENTS = [
      { id: 'work_pressure', label: 'Work pressure', Icon: LucideBriefcase },
      { id: 'busy_family', label: 'Busy family life', Icon: House },
      { id: 'divorce_breakup', label: 'Divorce or breakup', Icon: HeartBreak },
      { id: 'slower_metabolism', label: 'Slower metabolism due to aging', Icon: Clock },
      { id: 'financial', label: 'Financial challenges', Icon: CurrencyDollar },
      { id: 'covid', label: 'Covid-19 pandemic', Icon: Virus },
      { id: 'injury_disability', label: 'Injury or disability', Icon: Lightning },
      { id: 'other_stressful', label: 'Other stressful events', Icon: Question },
      { id: 'none', label: 'None of the above', Icon: XCircle },
    ];

    const hasSelected = selectedWeightGainEvents.length > 0;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Have any of the following events led to weight gain in the last few years?
              </h2>
            </div>
            <p className="text-sm text-gray-500">Choose all that apply</p>
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
                    <span className="font-medium text-gray-900">{option.label}</span>
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
            <span className="text-sm font-medium">Please select at least one option to continue</span>
          </div>
        )}

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleWeightGainEventsContinue}
            disabled={!hasSelected}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 30: What's your biggest motivation? – single-choice
  if (step === 30) {
    const MOTIVATION_OPTIONS = [
      { id: 'confident', label: 'Feel more confident in my body', Icon: Person },
      { id: 'healthier', label: 'Be healthier and more energetic', Icon: Heartbeat },
      { id: 'other', label: 'Other', Icon: DotsThree },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                What&apos;s your biggest motivation?
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
                  <span className="font-medium text-gray-900">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Step 31: We help you achieve long-term results – informacinis ekranas su grafiku
  if (step === 31) {
    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col gap-6">
        <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
          We help you achieve long-term results
        </h2>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
          <p className="mb-4 text-center text-sm font-semibold text-gray-600">YOUR WEIGHT</p>
          <div className="relative">
            <svg
              viewBox="0 0 320 180"
              className="h-48 w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="greenGradientLongTerm" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="40" y1="20" x2="40" y2="150" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="150" x2="300" y2="150" stroke="#e5e7eb" strokeWidth="1" />
              <text x="25" y="95" fontSize="10" fill="#9ca3af">Today</text>
              <text x="245" y="170" fontSize="10" fill="#9ca3af">In a month</text>
              {/* Red line: exhausting workouts - drops then spikes up */}
              <path
                d="M 40 45 Q 140 120 200 95 Q 250 70 280 115"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Green area + line: Tai Chi Walking - smooth downward */}
              <path
                d="M 40 45 Q 120 75 200 95 Q 250 115 280 135 L 280 150 L 40 150 Z"
                fill="url(#greenGradientLongTerm)"
              />
              <path
                d="M 40 45 Q 120 75 200 95 Q 250 115 280 135"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="195" y="55" width="85" height="22" rx="4" fill="#fce7f3" />
              <text x="205" y="70" fontSize="8" fill="#be185d" fontWeight="600">
                With exhausting workouts
              </text>
              <rect x="110" y="118" width="105" height="22" rx="4" fill="#dcfce7" />
              <text x="120" y="133" fontSize="8" fill="#15803d" fontWeight="600">
                With Tai Chi Walking
              </text>
            </svg>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-gray-200">
            <img
              src={drNikoAmblemaImage}
              alt="Stanford University"
              className="h-full w-full object-contain object-center p-0.5"
              decoding="async"
            />
          </div>
          <p className="text-sm text-gray-700">
            <strong>Dr Nick Smeeton from Stanford University</strong> reported that Tai Chi walking
            reduces fatigue, improves emotional state, and is less taxing on the body than
            exhausting gym workouts.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleLongTermResultsContinue}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED}
          >
            Continue
          </button>
        </div>
      </div>
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
              What&apos;s your height?
            </h2>
            <p className="text-sm text-gray-500">
              Your plan is created according to the body mass index (BMI)
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

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleHeightContinue}
            disabled={!hasValidHeight}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
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
              Your current weight
            </h2>
            <p className="text-sm text-gray-500">
              We will use this information to calculate your body mass index (BMI)
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
              KG
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleCurrentWeightContinue}
            disabled={!hasValidWeight}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
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
              Your goal weight
            </h2>
            <p className="text-sm text-gray-500">
              What is the ideal weight you want to reach?
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
              KG
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleGoalWeightContinue}
            disabled={!hasValidGoal}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
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
      if (v < 18.5) return { label: 'UNDERWEIGHT', badgeClass: 'bg-cyan-500' };
      if (v < 25) return { label: 'NORMAL', badgeClass: 'bg-green-600' };
      if (v < 30) return { label: 'OVERWEIGHT', badgeClass: 'bg-amber-500' };
      return { label: 'OBESE', badgeClass: 'bg-red-600' };
    };

    const bmiCategory = bmi ? getBmiCategory(bmi) : null;
    const bmiPosition = bmi
      ? Math.min(100, Math.max(0, ((Number(bmi) - 15) / 25) * 100))
      : 50;

    const DREAM_BODY_LABELS =
      gender === 'male'
        ? {
            thin: 'Thin',
            toned: 'Toned',
            curvy: 'Shapely',
            healthy: 'Healthy',
          }
        : {
            thin: 'Thin',
            toned: 'Toned',
            curvy: 'Curvy',
            healthy: 'Healthy',
          };
    const DREAM_BODY_PHOTOS = gender === 'male' ? MALE_DREAM_BODY_IMAGES : DREAM_BODY_IMAGES;
    const ACTIVITY_LABELS = {
      sedentary: 'Sedentary',
      somewhat_active: 'Somewhat active',
      active: 'Active',
      very_active: 'Very active',
    };

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
          ? 'Male silhouette matching overweight BMI range'
          : 'Female silhouette matching overweight BMI range'
        : '';

    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col gap-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Your walking profile
        </h2>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h3 className="text-base font-bold text-gray-900 md:text-lg">
              Body mass index (BMI)
            </h3>
            {bmiCategory && (
              <span
                className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white ${bmiCategory.badgeClass}`}
              >
                {bmiCategory.label}
              </span>
            )}
          </div>

          {/* Tooltip „You – X.X“ virš juostos */}
          <div className="relative mb-2 h-14 w-full">
            {bmi && (
              <div
                className="absolute bottom-0 z-20 flex flex-col items-center"
                style={{ left: `${bmiPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white shadow-md">
                  You - {bmi}
                </div>
                <div
                  className="h-0 w-0 border-x-[7px] border-t-[8px] border-x-transparent border-t-gray-900"
                  aria-hidden
                />
              </div>
            )}
          </div>

          {/* Spalvota BMI juosta (proporcijos: 15–18.5 / 18.5–25 / 25–30 / 30–40) */}
          <div className="relative h-9 w-full overflow-hidden rounded-full shadow-inner">
            <div className="absolute inset-0 flex">
              <div className="h-full w-[14%] bg-cyan-300" title="Underweight" />
              <div className="h-full w-[26%] bg-green-500" title="Normal" />
              <div className="h-full w-[20%] bg-amber-400" title="Overweight" />
              <div className="h-full w-[40%] bg-red-500" title="Obese" />
            </div>
          </div>

          {/* Skaičiai po juosta */}
          <div className="mt-2 flex w-full justify-between text-[11px] font-medium text-gray-500">
            <span className="w-[14%] text-left">15</span>
            <span className="w-[26%] text-center">18.5</span>
            <span className="w-[20%] text-center">25</span>
            <span className="w-[18%] text-center">30</span>
            <span className="w-[22%] text-right">40</span>
          </div>

          {/* Kategorijų etiketės */}
          <div className="mt-1 flex w-full text-[9px] font-bold uppercase leading-tight tracking-wide text-gray-400">
            <span className="w-[14%] text-left">Underweight</span>
            <span className="w-[26%] text-center">Normal</span>
            <span className="w-[20%] text-center">Overweight</span>
            <span className="w-[40%] text-right">Obese</span>
          </div>

          {bmi && Number(bmi) >= 25 && (
            <div className="mt-5 flex gap-3 rounded-xl border border-red-100 bg-red-50 px-3 py-3">
              <WarningCircle
                size={22}
                weight="fill"
                className="mt-0.5 shrink-0 text-red-500"
                aria-hidden
              />
              <p className="text-sm leading-snug text-red-900">
                <span className="font-semibold">Risks of unhealthy BMI:</span> High blood pressure,
                chronic back and joint pain
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-5 border-t border-gray-100 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div className="flex gap-3">
                <Scales size={22} weight="regular" className="mt-0.5 shrink-0 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Desired weight</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {goalWeight ? `${goalWeight} kg` : '—'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Person size={22} weight="regular" className="mt-0.5 shrink-0 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Body dream</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {dreamBody ? DREAM_BODY_LABELS[dreamBody] || dreamBody : '—'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Heartbeat size={22} weight="regular" className="mt-0.5 shrink-0 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Lifestyle</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {activityLevelAnswer
                      ? ACTIVITY_LABELS[activityLevelAnswer] || activityLevelAnswer
                      : '—'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-[200px] shrink-0 justify-center sm:mx-0 sm:w-[min(42%,220px)]">
              <img
                src={figureSrc}
                alt={figureAlt}
                className="h-auto max-h-[220px] w-full object-contain object-bottom"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleProfileContinue}
            className={`${CONTINUE_BUTTON_ALWAYS_ENABLED} min-w-[200px] px-14`}
          >
            Continue
          </button>
        </div>
      </div>,
      {
        backStep: 42,
        screenClassName: 'bg-[#ffe8d6]',
        mainClassName: 'bg-[#ffe8d6]',
      },
    );
  }

  // Step 36: Is there any specific event motivating you to lose weight right now?
  if (step === 36) {
    const MOTIVATION_EVENT_OPTIONS = [
      { id: 'vacation', label: 'Vacation', Icon: Umbrella },
      { id: 'wedding', label: 'Wedding', Icon: Heart },
      { id: 'sports_event', label: 'Sports event', Icon: Trophy },
      { id: 'summer', label: 'Summer', Icon: Sun },
      { id: 'school_reunion', label: 'School reunion', Icon: Users },
      { id: 'family_gathering', label: 'Family gathering', Icon: House },
      { id: 'birthday_party', label: 'Birthday party', Icon: Cake },
      { id: 'other_occasion', label: 'Other occasion', Icon: Lightbulb },
      { id: 'no_just_ready', label: 'No — just ready to look and feel my best!', Icon: Sparkle },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={28} className={QUIZ_ICON_CLASS} />
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Is there any specific event motivating you to lose weight right now?
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
                  <span className="font-medium text-gray-900">{option.label}</span>
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
            Sounds exciting! When is the event?
          </h2>
          <p className="text-sm text-gray-500">
            We&apos;ll use this information for your personalized plan
          </p>
        </div>

        <div className="relative w-full">
          <label htmlFor="motivation-event-date" className="sr-only">
            Event date
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

        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleEventDateContinue}
            disabled={!motivationEventDate}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleEventDateSkip}
            className="text-sm font-medium text-gray-500 underline-offset-2 transition-colors hover:text-gray-800 hover:underline"
          >
            Skip this question
          </button>
        </div>
      </div>,
      { backStep: 36 },
    );
  }

  // Step 37: You can reach X kg by [date] – svorio prognozės grafikas
  if (step === 37) {
    const startWeight = Number(currentWeight) || 95;
    const targetWeight = Number(goalWeight) || 90;
    const weightDiff = Math.max(0, startWeight - targetWeight);

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + Math.ceil((weightDiff / 0.5) * 7));

    const formatTargetDate = (d) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };

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
      const short = d.toLocaleString('en-US', { month: 'short' });
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

    const tickFontSize = monthTicks.length > 6 ? 9 : 11;

    const MOTIVATION_EVENT_LABELS = {
      vacation: 'Vacation',
      wedding: 'Wedding',
      sports_event: 'Sports event',
      summer: 'Summer',
      school_reunion: 'School reunion',
      family_gathering: 'Family gathering',
      birthday_party: 'Birthday party',
      other_occasion: 'Other occasion',
    };

    let eventPillText = null;
    if (
      motivationEventAnswer &&
      motivationEventAnswer !== 'no_just_ready' &&
      motivationEventDate
    ) {
      const label = MOTIVATION_EVENT_LABELS[motivationEventAnswer];
      const parts = motivationEventDate.split('-');
      if (label && parts.length === 3) {
        const y = Number(parts[0]);
        const mo = Number(parts[1]);
        const da = Number(parts[2]);
        const eventD = new Date(y, mo - 1, da);
        if (!Number.isNaN(eventD.getTime())) {
          const monthName = eventD.toLocaleString('en-US', { month: 'long' });
          const dayStr = String(da).padStart(2, '0');
          eventPillText = `${label} · ${monthName} ${dayStr}`;
        }
      }
    }

    const gradLineId = 'weightLineGradientStep37';
    const gradFillId = 'graphFillGradientStep37';
    /** Reference: šviesus kremas centre (~#FFFBF5), persikas į kraštus */
    const predictionScreenBg =
      'bg-[radial-gradient(circle_at_50%_38%,#FFFBF5_0%,#FFE8CC_55%,#FFD8A8_100%)]';

    return renderQuizStepLayout(
      <div className="flex w-full max-w-lg flex-col gap-6">
        <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
          You can reach{' '}
          <span className="text-orange-500">{targetWeight} kg</span>
          {' '}by{' '}
          <span className="text-orange-500">{formatTargetDate(targetDate)}</span>
        </h2>

        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
          {eventPillText && (
            <div className="absolute right-4 top-4 z-10 max-w-[min(100%,220px)] truncate rounded-full border border-gray-100 bg-white px-3 py-1.5 text-center text-[11px] font-semibold text-gray-800 shadow-md sm:text-xs">
              {eventPillText}
            </div>
          )}
          <svg
            viewBox="0 0 400 188"
            className="h-48 w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id={gradLineId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="33%" stopColor="#f97316" />
                <stop offset="66%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              {/* Horizontalus užpildas: raudona / oranžinė → geltona → žalia (matomas po kreive) */}
              <linearGradient id={gradFillId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.55" />
                <stop offset="28%" stopColor="#fdba74" stopOpacity="0.5" />
                <stop offset="55%" stopColor="#fde047" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#86efac" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="50"
                y1={40 + i * 30}
                x2="350"
                y2={40 + i * 30}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}
            {/* Gradient fill under line */}
            <path
              d="M 50 50 Q 150 70 250 100 Q 320 125 350 130 L 350 160 L 50 160 Z"
              fill={`url(#${gradFillId})`}
            />
            {/* Weight line */}
            <path
              d="M 50 50 Q 150 70 250 100 Q 320 125 350 130"
              fill="none"
              stroke={`url(#${gradLineId})`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Start dot + callout */}
            <circle cx="50" cy="50" r="6" fill="#ef4444" />
            <rect x="20" y="25" width="50" height="22" rx="4" fill="#ef4444" />
            <text x="45" y="41" fontSize="11" fill="white" fontWeight="bold" textAnchor="middle">
              {startWeight} kg
            </text>
            {/* End dot + callout */}
            <circle cx="350" cy="130" r="6" fill="#22c55e" />
            <rect x="295" y="115" width="55" height="22" rx="4" fill="#22c55e" />
            <text x="322" y="131" fontSize="11" fill="white" fontWeight="bold" textAnchor="middle">
              {targetWeight} kg
            </text>
            {/* X-axis: visi mėnesiai nuo šio mėnesio iki tikslo mėnesio */}
            {monthTicks.map((tickDate, i) => (
              <text
                key={`${tickDate.getTime()}-${i}`}
                x={monthTickXs[i]}
                y="182"
                fontSize={tickFontSize}
                fill={i === monthTicks.length - 1 ? '#16a34a' : '#6b7280'}
                fontWeight={i === monthTicks.length - 1 ? '600' : '400'}
                textAnchor="middle"
              >
                {formatGraphXTick(tickDate, i, monthTicks)}
              </text>
            ))}
          </svg>
        </div>

        <p className="text-center text-sm text-gray-500">
          Based on data from Walking members with similar profiles
        </p>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handlePredictionContinue}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED}
          >
            Continue
          </button>
        </div>
      </div>,
      {
        backStep: motivationEventAnswer === 'no_just_ready' ? 36 : 47,
        screenClassName: predictionScreenBg,
        mainClassName: predictionScreenBg,
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

    const formatTargetDate = (d) => {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };

    const REACH_CONFIDENCE_OPTIONS = [
      { id: 'believe', label: 'I believe I can do it!', Icon: LucideTrophy },
      { id: 'uncertain_try', label: "I'm uncertain, but willing to try!", Icon: Dumbbell },
      { id: 'not_sure', label: "I'm not really sure", Icon: Meh },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <h2 className="text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
          How confident are you in reaching{' '}
          <span className="text-orange-500">{targetWeight} kg</span> by{' '}
          <span className="text-orange-500">{formatTargetDate(targetDate)}</span>?
        </h2>

        <div className="flex flex-col gap-3">
          {REACH_CONFIDENCE_OPTIONS.map(({ id, label, Icon }) => {
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
                <span className="font-semibold text-gray-900">{label}</span>
              </button>
            );
          })}
        </div>
      </div>,
      { backStep: 37 },
    );
  }

  // Step 49: Visa ekrano nuotrauka, tekstas apačioje ant jos (po Step 48)
  if (step === 49) {
    return renderQuizStepLayout(
      <div className="relative flex min-h-[calc(100vh-100px)] w-full items-end justify-center overflow-hidden">
        <img
          src={seniorCoupleHeroImage}
          alt="Active older couple smiling after walking, with towels and water bottles"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
          loading="eager"
          decoding="async"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/70"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center gap-5 px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6 text-center md:gap-6 md:pb-12">
          <h2 className="text-balance text-xl font-bold leading-snug text-white drop-shadow-md md:text-2xl">
            Why do people give up on their get-in-shape efforts?
          </h2>
          <p className="text-balance text-[11px] font-bold uppercase leading-snug tracking-wide text-white drop-shadow-sm sm:text-xs md:text-sm">
            The <span className="text-[#ff6b4a] drop-shadow-sm">#1 reason</span> is starting too big
            too quickly.
          </p>
          <p className="text-pretty text-sm leading-relaxed text-white/90 drop-shadow-sm md:text-base">
            That&apos;s why our program aims to help you make sustainable lifestyle changes so you
            can transform your body and enjoy thriving health for life.
          </p>
          <button
            type="button"
            onClick={handleSustainableChangeGotIt}
            className="mt-2 rounded-full bg-[#ff6b4a] px-12 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-[#f05538] active:scale-[0.98]"
          >
            Got it
          </button>
        </div>
      </div>,
      {
        backStep: 48,
        mainClassName:
          '!items-stretch !justify-center !p-0 !px-0 !pb-0 !pt-0 !overflow-hidden',
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
              Get your personalized program
            </h2>
            <p className="text-sm text-gray-500">
              Enter your email to receive your custom Tai Chi Walking plan
            </p>
          </div>

          <div>
            <label
              htmlFor="quiz-email-step-38"
              className="mb-1.5 block text-left text-xs font-medium text-gray-400"
            >
              Email
            </label>
            <input
              id="quiz-email-step-38"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="your@email.com"
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
                Please enter a valid email address.
              </p>
            )}
            {valid && (
              <p
                id="quiz-email-step-38-ok"
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-green-600"
              >
                <CheckCircle size={18} className="shrink-0 text-green-600" strokeWidth={2.5} />
                Email address looks good.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleGetPlanContinue}
            disabled={!valid}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>,
      { backStep: 49 },
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
          Check your inbox!
        </h2>
        <p className="text-gray-600">
          We&apos;ve sent your personalized Tai Chi Walking plan to{' '}
          <strong>{emailForPlan || 'your email'}</strong>. Follow the steps to start
          your transformation today!
        </p>
        <button
          type="button"
          onClick={handleFinalContinue}
          className={CONTINUE_BUTTON_ALWAYS_ENABLED}
        >
          Got it!
        </button>
      </div>
    );
  }

  // Step 40: After reaching your goal weight, how would you reward yourself? (po Step 49)
  if (step === 40) {
    const REWARD_OPTIONS = [
      { id: 'new_clothes', label: 'Buying new clothes', Icon: TShirt },
      { id: 'personal_day', label: 'Take a personal day', Icon: Armchair },
      {
        id: 'social_media',
        label: 'Sharing it on the social media',
        Icon: ImageLandscapeIcon,
      },
      { id: 'pictures', label: 'Taking pictures of myself', Icon: DeviceMobile },
      { id: 'travel', label: 'Traveling somewhere new', Icon: Suitcase },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <h2 className="text-balance text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
          After reaching your goal weight, how would you{' '}
          <span className="text-orange-500">reward yourself</span>?
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
                  {option.label}
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
      { id: 'proud', label: 'Being proud of myself', Icon: Trophy },
      { id: 'feeling_great', label: 'Feeling great', Icon: SmileyWink },
      { id: 'believe', label: 'Believe in myself', Icon: Smile },
      { id: 'empowered', label: 'Feel empowered to make healthy choices', Icon: Lightning },
      { id: 'worry_less', label: 'Worry less about my body overall', Icon: ThumbsUp },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <h2 className="text-balance text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
          How would you <span className="text-orange-500">see yourself</span> after reaching your
          goal weight?
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
                  {option.label}
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
          Creating your personalized Walking Plan
        </p>
        <p className="text-center">
          <span className="text-2xl font-bold text-[#e07a4f]">10 million people</span>
          <span className="text-gray-900"> have chosen Walking</span>
        </p>
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={RACHEL_IMAGE}
              alt="Rachel"
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">Rachel999</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} weight="fill" className="text-amber-400" />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600 italic">
            &quot;Lost 4 lbs in one week. It looks easy, but it is a super calorie burner
            workout. Walking helps me to be more active, healthy, and happy!&quot;
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

  // Step 44: 100 % + social proof + Continue (po Step 43 animacijos)
  if (step === 44) {
    const RACHEL_IMAGE = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80';

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
              strokeDashoffset={0}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-orange-500">
            100%
          </span>
        </div>
        <p className="text-center text-sm text-gray-600">
          Creating your personalized Walking Plan
        </p>
        <p className="text-center">
          <span className="text-2xl font-bold text-[#e07a4f]">10 million people</span>
          <span className="text-gray-900"> have chosen Walking</span>
        </p>
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={RACHEL_IMAGE}
              alt="Rachel"
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">Rachel999</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} weight="fill" className="text-amber-400" />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600 italic">
            &quot;Lost 4 lbs in one week. It looks easy, but it is a super calorie burner
            workout. Walking helps me to be more active, healthy, and happy!&quot;
          </p>
        </div>
        <button
          type="button"
          onClick={handleCompletionContinue}
          className={CONTINUE_BUTTON_ALWAYS_ENABLED}
        >
          Continue
        </button>
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
              Enter email to get your{' '}
              <span className="text-orange-500">Tai Chi Walking Plan</span>
            </h2>
          </div>

          <div>
            <label
              htmlFor="quiz-email-step-45"
              className="mb-1.5 block text-left text-xs font-medium text-gray-400"
            >
              Email
            </label>
            <input
              id="quiz-email-step-45"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Email"
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
                Please enter a valid email address.
              </p>
            )}
            {valid && (
              <p
                id="quiz-email-step-45-ok"
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-green-600"
              >
                <CheckCircle size={18} className="shrink-0 text-green-600" strokeWidth={2.5} />
                Email address looks good.
              </p>
            )}
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-500">
            <Lock size={18} weight="regular" className="mt-0.5 shrink-0 text-gray-400" />
            <p>
              We respect your privacy and are committed to protecting your personal data.
              We&apos;ll email you a copy of your results for convenient access.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleTaiChiPlanEmailContinue}
            disabled={!valid}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>,
      { backStep: 44 },
    );
  }

  // Step 46: Marketing opt-in (po Step 45). „Yes, I do“ → Step 50 (vardas); skip → Step 51 (be vardo).
  if (step === 46) {
    const OPT_IN_CORAL = '#F16E43';
    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col justify-between gap-10 min-h-[min(480px,calc(100vh-12rem))] md:min-h-[min(560px,calc(100vh-11rem))]">
        <h2 className="text-balance text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl">
          Do you want to receive emails with{' '}
          <span style={{ color: OPT_IN_CORAL }}>Weight Loss</span>
          {' '}tips and our app updates?
        </h2>

        <div className="flex flex-col items-center gap-5 pb-2">
          <button
            type="button"
            onClick={() => handleEmailOptInSelect('yes')}
            className="w-full rounded-full px-8 py-4 text-center text-base font-bold text-white shadow-md transition-all hover:brightness-95 active:scale-[0.98]"
            style={{ backgroundColor: OPT_IN_CORAL }}
          >
            Yes, I do
          </button>
          <button
            type="button"
            onClick={() => handleEmailOptInSelect('no')}
            className="max-w-xs text-center text-[10px] font-semibold uppercase leading-relaxed tracking-wide text-gray-400 underline-offset-4 transition-colors hover:text-gray-600 hover:underline"
          >
            I don&apos;t want to receive tips or updates
          </button>
        </div>
      </div>,
      { backStep: 45, mainClassName: '!justify-center md:!pt-8' },
    );
  }

  // Step 50: Vardas (tik po „Yes, I do“ Step 46)
  if (step === 50) {
    const nameOk = quizUserName.trim().length > 0;

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">What&apos;s your name?</h2>
          <p className="text-sm leading-relaxed text-gray-500">
            Let us know your name, so we can address you the way you like
          </p>
        </div>

        <div className="space-y-6">
          <label htmlFor="quiz-user-name" className="sr-only">
            Your name
          </label>
          <input
            id="quiz-user-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Name"
            value={quizUserName}
            onChange={(e) => setQuizUserName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-lg text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />

          <button
            type="button"
            onClick={handleQuizNameContinue}
            disabled={!nameOk}
            className={`${CONTINUE_BUTTON_CLASSES} w-full`}
          >
            Continue
          </button>
        </div>
      </div>,
      { backStep: 46, mainClassName: '!justify-center' },
    );
  }

  // Step 51: Apklausos užbaigimas (po Step 50 arba tiesiai po Step 46 jei skip)
  if (step === 51) {
    const firstName = quizUserName.trim().split(/\s+/)[0] || '';
    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col items-center justify-center text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Thank you{firstName ? `, ${firstName}` : ''}!
        </h2>
        <p className="mb-8 text-gray-600">You have completed the quiz.</p>
        <button
          type="button"
          onClick={() => setStep(52)}
          className={CONTINUE_BUTTON_ALWAYS_ENABLED + ' w-full max-w-sm'}
        >
          Get My Plan
        </button>
      </div>,
      { backStep: emailOptInAnswer === 'yes' ? 50 : 46 },
    );
  }

  return null;
}

export default Quiz;
