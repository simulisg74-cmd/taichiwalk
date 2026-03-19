import { useState, useEffect, useCallback } from 'react';
import WalkingIcon from './WalkingIcon';
import {
  CaretLeft,
  List,
  CaretRight,
  Check,
  X,
  Minus,
  Briefcase,
  Coffee,
  Moon,
  Umbrella,
  Armchair,
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
} from '@phosphor-icons/react';

import womenGroupImage from '../assets/beganti moeris.jpg';
import menGroupImage from '../assets/begantis vyras.jpg';

// Nuotraukos iš Unsplash (vienas šaltinis)
const BACKGROUND_IMAGE =
  "url('https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920&q=80')";

const FEMALE_AGE_IMAGES = {
  '40-49': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  '50-59': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  '60-69': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  '70-80': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
};

const LOADING_DURATION_MS = 10000;
const PROGRESS_UPDATE_INTERVAL_MS = 100;

const BODY_TYPE_IMAGES = {
  slim: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&q=80',
  mid_sized: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&q=80',
  plus_sized: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=200&q=80',
  overweight: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80',
};

const DREAM_BODY_IMAGES = {
  thin: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=120&q=80',
  toned: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=120&q=80',
  curvy: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=120&q=80',
  healthy: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&q=80',
};

const FOCUS_AREA_IMAGES = {
  legs: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80',
  belly: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&q=80',
  arms: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80',
  chest: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&q=80',
  buttocks: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80',
  hips: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&q=80',
  full_body: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80',
};

const BEST_SHAPE_IMAGE = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80';
const WEIGHT_FLUCTUATIONS_IMAGE = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=350&q=80';
const HARVARD_INFO_IMAGE = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=280&q=80';

const STAIRS_OPTION_IMAGES = {
  out_of_breath: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&q=80',
  sometimes_tired: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&q=80',
  easily: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=80&q=80',
};

const EXERCISE_DEMO_IMAGE = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80';
const TAI_CHI_PROMO_IMAGE = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80';

const TOTAL_QUIZ_STEPS = 19;

// Bendras Continue mygtuko stilius (visi puslapiai išskyrus pirmą)
const CONTINUE_BUTTON_CLASSES =
  'w-full rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-90 enabled:bg-orange-500 enabled:hover:bg-orange-600 enabled:hover:shadow-xl';
const CONTINUE_BUTTON_ALWAYS_ENABLED =
  'w-full rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all active:scale-[0.98] bg-orange-500 hover:bg-orange-600 hover:shadow-xl';

/**
 * Quiz komponentas – kelių žingsnių apklausa (multi-step quiz).
 * Step 1: Pradinis langas su fonine nuotrauka, Start → Loading (10s) → automatinis perėjimas.
 * Step 2: Baltas fonas, header, klausimas „What is your gender?“.
 * Step 3: Dinaminis turinys pagal lytį – moterys/vyrai su nuotrauka ir Continue mygtuku.
 */
function Quiz() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleStart = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    setProgress(0);
  }, [isLoading]);

  const handleGenderSelect = useCallback((selectedGender) => {
    setGender(selectedGender);
    setStep(3);
  }, []);

  const onFemaleClick = () => handleGenderSelect('female');
  const onMaleClick = () => handleGenderSelect('male');

  const handleContinue = useCallback(() => {
    if (gender === 'female') {
      setStep(4);
    }
    // Vyrams galima pridėti kitą logiką vėliau
  }, [gender]);

  const handleAgeSelect = useCallback((ageRange) => {
    setStep(5);
  }, []);

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
    setSelectedFocusAreas((prev) =>
      prev.includes(areaId) ? prev.filter((id) => id !== areaId) : [...prev, areaId]
    );
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
    setStep(14);
  }, []);

  const handleExerciseDemoContinue = useCallback(() => {
    setStep(15);
  }, []);

  const handleWorkScheduleSelect = useCallback((answer) => {
    setWorkScheduleAnswer(answer);
    setStep(16); // Automatiškai perkelia į kitą puslapį
  }, []);

  const handleActivityLevelSelect = useCallback((answer) => {
    setActivityLevelAnswer(answer);
    setStep(17); // Automatiškai perkelia į kitą puslapį
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
    setStep(18);
  }, []);

  const handleEnergyLevelSelect = useCallback((answer) => {
    setEnergyLevelAnswer(answer);
    setStep(19); // Automatiškai perkelia į kitą puslapį
  }, []);

  const handleTaiChiPromoContinue = useCallback(() => {
    // Galima pridėti rezultatų ekraną arba kitą logiką vėliau
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

  // Step 1: Pradinis langas su fonine nuotrauka
  if (step === 1) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{ backgroundImage: BACKGROUND_IMAGE }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-12">
          {/* Logo viršuje per viduri */}
          <header className="absolute top-0 left-0 right-0 flex justify-center pt-8">
            <WalkingIcon showLabel size="md" labelClassName="text-white drop-shadow-md" />
          </header>

          <div className="flex-1" />

          <h1 className="max-w-2xl text-center text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
            Take the first step in Tai Chi: Transform Your WALK!
          </h1>

          <div className="flex-1" />

          <div className="mt-8 w-full max-w-sm">
            <button
              type="button"
              onClick={handleStart}
              disabled={isLoading}
              className="relative w-full overflow-hidden rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-90"
            >
              {/* Progreso juosta po mygtuku */}
              {isLoading && (
                <span
                  className="absolute inset-0 rounded-full bg-orange-600 transition-[width] duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
              <span className="relative z-10">
                {isLoading ? `Loading... ${progress}%` : 'Start'}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Bendras Quiz step layout (Step 2 ir Step 3)
  const quizStepProgress = (step / TOTAL_QUIZ_STEPS) * 100;

  const renderQuizStepLayout = (content) => (
    <div className="min-h-screen bg-gray-50">
      {/* Header: atgal | logo | hamburger */}
      <header className="grid grid-cols-3 items-center border-b border-gray-200 bg-white px-4 py-4">
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
          aria-label="Atgal"
        >
          <CaretLeft size={24} weight="bold" className="text-gray-600" />
        </button>
        <div className="flex justify-center">
          <WalkingIcon showLabel size="md" labelClassName="text-orange-500" />
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
          aria-label="Meniu"
        >
          <List size={24} weight="bold" className="text-gray-600" />
        </button>
      </header>

      {/* Progreso juosta – rodo apklausos eigą */}
      <div className="h-1 w-full bg-gray-200">
        <div
          className="h-full bg-orange-500 transition-all duration-300 ease-out"
          style={{ width: `${quizStepProgress}%` }}
        />
      </div>

      {/* Turinys */}
      <main className="relative z-0 flex min-h-[calc(100vh-120px)] flex-col items-center justify-center overflow-visible px-6 py-12">
        {content}
      </main>
    </div>
  );

  // Step 2: Lyties pasirinkimas
  if (step === 2) {
    return renderQuizStepLayout(
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            What is your <span className="text-orange-500">gender?</span>
          </h2>
          <p className="text-sm text-gray-500">
            This information will help us create a suitable program for you
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={onFemaleClick}
            className="flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md active:scale-[0.98]"
          >
            <span className="pointer-events-none text-2xl text-orange-500">♀</span>
            <span className="pointer-events-none font-medium text-gray-900">Female</span>
          </button>
          <button
            type="button"
            onClick={onMaleClick}
            className="flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md active:scale-[0.98]"
          >
            <GenderMale size={28} weight="fill" className="pointer-events-none text-gray-600" />
            <span className="pointer-events-none font-medium text-gray-900">Male</span>
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Dinaminis turinys pagal lytį – tekstas + nuotrauka + Continue
  if (step === 3) {
    const isFemale = gender !== 'male'; // fallback į female jei gender tuščias
    const headline = isFemale
      ? '10 million women trust Walking with their fitness goals'
      : '10 million men trust Walking with their fitness goals';
    const imageSrc = isFemale ? womenGroupImage : menGroupImage;

    return (
      <div className="min-h-screen bg-[#f3e9dc]">
        {/* Header: atgal | logo | hamburger */}
        <header className="grid grid-cols-3 items-center border-b border-amber-200/50 bg-white/80 px-4 py-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Atgal"
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" labelClassName="text-orange-500" />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Meniu"
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
        </header>

        {/* Progreso juosta */}
        <div className="h-1 w-full bg-amber-200/50">
          <div
            className="h-full bg-orange-500 transition-all duration-300 ease-out"
            style={{ width: `${(step / TOTAL_QUIZ_STEPS) * 100}%` }}
          />
        </div>

        {/* Turinys: nuotrauka absolute dešinėje apačioje, tekstas kairėje virš jos */}
        <div className="relative min-h-[calc(100vh-120px)]">
          {/* Nuotrauka – absolute, dešinė apatinė, didelė, nupjauta ties juosmeniu */}
          <img
            src={imageSrc}
            alt={isFemale ? 'Moterys Walking programoje' : 'Vyrai Walking programoje'}
            className="absolute bottom-0 right-0 h-[80vh] w-auto min-w-[60%] object-cover object-top"
          />

          {/* Tekstas prie paveikslėlio – kairėje pusėje */}
          <div className="absolute bottom-0 left-0 z-10 flex h-[80vh] items-center px-6 md:left-6 md:max-w-[45%]">
            <h2 className="text-2xl font-semibold leading-tight text-gray-800 md:text-3xl lg:text-4xl">
              {headline}
            </h2>
          </div>
        </div>

        {/* Continue mygtukas – apačioje, visada matomas */}
        <div className="relative z-10 mx-auto w-full max-w-sm px-6 pb-8 pt-4">
          <button
            type="button"
            onClick={handleContinue}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Amžiaus pasirinkimas (tik moterims)
  if (step === 4 && gender === 'female') {
    const AGE_OPTIONS = [
      { range: '40-49', label: 'Age: 40-49' },
      { range: '50-59', label: 'Age: 50-59' },
      { range: '60-69', label: 'Age: 60-69' },
      { range: '70-80', label: 'Age: 70-80' },
    ];

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="grid grid-cols-3 items-center border-b border-gray-200 px-4 py-4">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Atgal"
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" labelClassName="text-orange-500" />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Meniu"
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
        </header>

        {/* Progreso juosta */}
        <div className="h-1 w-full bg-gray-200">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${(step / TOTAL_QUIZ_STEPS) * 100}%` }}
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

          {/* 2x2 amžiaus kortelių tinklelis */}
          <div className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-4">
            {AGE_OPTIONS.map((option) => (
              <button
                key={option.range}
                type="button"
                onClick={() => handleAgeSelect(option.range)}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <img
                    src={FEMALE_AGE_IMAGES[option.range]}
                    alt={`Amžius ${option.range}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 bg-orange-500 px-4 py-3 text-white">
                  <span className="font-medium">{option.label}</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <CaretRight size={14} weight="bold" className="text-white" />
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
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              What do you want to achieve?
            </h2>
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
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
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
                      <Check size={14} weight="bold" className="text-white" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue mygtukas apačioje */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleGoalsContinue}
            disabled={!hasSelectedGoals}
            className={CONTINUE_BUTTON_CLASSES}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 6: Kūno tipo pasirinkimas
  if (step === 6) {
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
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              What image describes your physical build?
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {BODY_TYPE_OPTIONS.map((option) => {
              const isSelected = bodyType === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleBodyTypeSelect(option.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border bg-white px-4 py-3 text-left shadow-sm transition-all hover:shadow-md ${
                    isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                  }`}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={BODY_TYPE_IMAGES[option.id]}
                      alt={option.label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue mygtukas apačioje */}
        <div className="mt-8 border-t border-gray-200 pt-6">
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

  // Step 7: Dream body pasirinkimas
  if (step === 7) {
    const DREAM_BODY_OPTIONS = [
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
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              What is your dream body?
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {DREAM_BODY_OPTIONS.map((option) => {
              const isSelected = dreamBody === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleDreamBodySelect(option.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border bg-white px-4 py-3 text-left shadow-sm transition-all hover:shadow-md ${
                    isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                  }`}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={DREAM_BODY_IMAGES[option.id]}
                      alt={option.label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
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

  // Step 8: Kurių sričių norite sutelkti dėmesį
  if (step === 8) {
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
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Which areas do you want to focus on?
            </h2>
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
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={FOCUS_AREA_IMAGES[option.id]}
                        alt={option.label}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </div>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <Check size={14} weight="bold" className="text-white" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
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
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Do you struggle with cellulite?
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {CELLULITE_OPTIONS.map((option) => {
              const isSelected = celluliteAnswer === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleCelluliteSelect(option.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md ${
                    isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isSelected ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  >
                    {renderIcon(option.icon, isSelected)}
                  </span>
                  <span className="font-medium text-gray-900">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
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
    const BEST_SHAPE_OPTIONS = [
      { id: 'less_than_year', label: 'Less than a year ago' },
      { id: '1_to_2_years', label: '1 to 2 years ago' },
      { id: 'more_than_3', label: 'More than 3 years ago' },
      { id: 'never', label: 'Never' },
    ];

    const hasSelected = bestShapeAnswer !== '';

    return renderQuizStepLayout(
      <div className="relative w-full max-w-2xl">
        {/* Nuotrauka dešinėje apačioje */}
        <img
          src={BEST_SHAPE_IMAGE}
          alt=""
          className="absolute bottom-0 right-0 z-0 h-[50vh] w-auto min-w-[200px] object-contain object-bottom opacity-90"
        />

        <div className="relative z-10 flex flex-col">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                How long ago were you in the best shape of your life?
              </h2>
            </div>

            <div className="flex max-w-md flex-col gap-3">
              {BEST_SHAPE_OPTIONS.map((option) => {
                const isSelected = bestShapeAnswer === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleBestShapeSelect(option.id)}
                    className={`flex cursor-pointer items-center rounded-xl border bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md ${
                      isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
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
    const WEIGHT_FLUCTUATIONS_OPTIONS = [
      { id: 'gain_fast_lose_slow', label: 'I gain weight fast but lose it slowly' },
      { id: 'gain_lose_easily', label: 'I gain and lose weight easily' },
      { id: 'struggle_to_gain', label: 'I struggle to gain weight or muscle' },
    ];

    const hasSelected = weightFluctuationsAnswer !== '';

    return renderQuizStepLayout(
      <div className="relative w-full max-w-2xl">
        {/* Nuotrauka dešinėje */}
        <img
          src={WEIGHT_FLUCTUATIONS_IMAGE}
          alt=""
          className="absolute bottom-0 right-0 z-0 h-[50vh] w-auto min-w-[180px] object-contain object-bottom opacity-90"
        />

        <div className="relative z-10 flex flex-col">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                How would you describe your weight fluctuations?
              </h2>
            </div>

            <div className="flex max-w-md flex-col gap-3">
              {WEIGHT_FLUCTUATIONS_OPTIONS.map((option) => {
                const isSelected = weightFluctuationsAnswer === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleWeightFluctuationsSelect(option.id)}
                    className={`flex cursor-pointer items-center rounded-xl border bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md ${
                      isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
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

  // Step 12: Informacinis ekranas – Tai Chi nauda moterims 50+
  if (step === 12) {
    return (
      <div className="min-h-screen bg-[#fdf5e6]">
        {/* Header */}
        <header className="grid grid-cols-3 items-center border-b border-amber-200/50 bg-white/80 px-4 py-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setStep(11)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Atgal"
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" labelClassName="text-orange-500" />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Meniu"
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
        </header>

        {/* Progreso juosta */}
        <div className="h-1 w-full bg-amber-200/50">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${(step / TOTAL_QUIZ_STEPS) * 100}%` }}
          />
        </div>

        {/* Turinys */}
        <div className="relative min-h-[calc(100vh-120px)] px-6 py-8">
          {/* Nuotrauka dešinėje apačioje */}
          <img
            src={HARVARD_INFO_IMAGE}
            alt=""
            className="absolute bottom-0 right-0 z-0 h-[45vh] w-auto min-w-[200px] object-contain object-bottom opacity-90"
          />

          <div className="relative z-10 flex max-w-xl flex-col">
            {/* Harvard Gazette logo */}
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded bg-red-600 text-xs font-bold text-white">
              HG
            </div>

            {/* Antraštė */}
            <h2 className="mb-6 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
              Weight Loss and Health{' '}
              <span className="text-orange-500">Benefits</span>
              {' '}of Tai Chi Walking{' '}
              <span className="text-orange-500">for Women over 50</span>
            </h2>

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
        <div className="relative z-10 mx-auto w-full max-w-sm px-6 pb-8 pt-4">
          <button
            type="button"
            onClick={handleHarvardInfoContinue}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 13: How do you feel after climbing some stairs?
  if (step === 13) {
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
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              How do you feel after climbing some stairs?
            </h2>
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
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md ${
                    isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                  }`}
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={STAIRS_OPTION_IMAGES[option.id]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
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

  // Step 14: Pratimo demonstracija
  if (step === 14) {
    return renderQuizStepLayout(
      <div className="flex w-full max-w-2xl flex-col">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-md">
          <img
            src={EXERCISE_DEMO_IMAGE}
            alt="Pratimo demonstracija"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={handleExerciseDemoContinue}
            className={CONTINUE_BUTTON_ALWAYS_ENABLED}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 15: What's your work schedule like? – pasirinkus automatiškai perkelia į kitą
  if (step === 15) {
    const WORK_SCHEDULE_OPTIONS = [
      { id: '9_to_5', label: '9 to 5 job', icon: 'briefcase' },
      { id: 'flexible', label: 'My hours are flexible', icon: 'coffee' },
      { id: 'night_shifts', label: 'Night shifts', icon: 'sun' },
      { id: 'dont_work', label: "I don't work", icon: 'umbrella' },
      { id: 'stay_at_home', label: 'Stay-at-home parent', icon: 'sofa' },
    ];

    const renderWorkIcon = (iconType) => {
      const iconClass = 'text-gray-600';
      const size = 24;
      const props = { size, weight: 'regular', className: iconClass };
      if (iconType === 'briefcase') return <Briefcase {...props} />;
      if (iconType === 'coffee') return <Coffee {...props} />;
      if (iconType === 'sun') return <Moon {...props} />;
      if (iconType === 'umbrella') return <Umbrella {...props} />;
      if (iconType === 'sofa') return <Armchair {...props} />;
      return null;
    };

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              What&apos;s your work schedule like?
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {WORK_SCHEDULE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleWorkScheduleSelect(option.id)}
                className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                  {renderWorkIcon(option.icon)}
                </span>
                <span className="font-medium text-gray-900">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 16: How active is your lifestyle? – pasirinkus automatiškai perkelia
  if (step === 16) {
    const ACTIVITY_LEVEL_OPTIONS = [
      { id: 'sedentary', label: 'Sedentary', sublabel: "I don't exercise or move much" },
      { id: 'somewhat_active', label: 'Somewhat active', sublabel: "I don't exercise, but I move a lot" },
      { id: 'active', label: 'Active', sublabel: 'I exercise a few times per week' },
      { id: 'very_active', label: 'Very active', sublabel: 'I exercise almost every day' },
    ];

    return renderQuizStepLayout(
      <div className="flex w-full max-w-md flex-col">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              How active is your lifestyle?
            </h2>
            <p className="text-sm text-gray-500">
              We will take it into consideration when creating your program
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {ACTIVITY_LEVEL_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleActivityLevelSelect(option.id)}
                className="flex cursor-pointer flex-col items-start gap-1 rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
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

  // Step 17: Are any of these activities part of your life? – multi-select
  if (step === 17) {
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
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Are any of these activities part of your life?
            </h2>
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
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
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
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <Check size={14} weight="bold" className="text-white" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
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

  // Step 18: How are your energy levels during the day? – baterijos ikonos, pasirinkus automatiškai perkelia
  if (step === 18) {
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
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              How are your energy levels during the day?
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {ENERGY_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleEnergyLevelSelect(option.id)}
                className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
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

  // Step 19: Paskutinis – Tai Chi promo su nuotrauka viršuje ir mygtuku apačioje
  if (step === 19) {
    return (
      <div className="min-h-screen bg-[#fdf5e6]">
        {/* Header */}
        <header className="grid grid-cols-3 items-center border-b border-amber-200/50 bg-white/80 px-4 py-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setStep(18)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Atgal"
          >
            <CaretLeft size={24} weight="bold" className="text-gray-600" />
          </button>
          <div className="flex justify-center">
            <WalkingIcon showLabel size="md" labelClassName="text-orange-500" />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Meniu"
          >
            <List size={24} weight="bold" className="text-gray-600" />
          </button>
        </header>

        {/* Progreso juosta */}
        <div className="h-1 w-full bg-amber-200/50">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${(step / TOTAL_QUIZ_STEPS) * 100}%` }}
          />
        </div>

        {/* Nuotrauka viršuje su gradientu į cream foną */}
        <div className="relative h-56 w-full overflow-hidden md:h-72">
          <img
            src={TAI_CHI_PROMO_IMAGE}
            alt="Tai Chi"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fdf5e6]"
            aria-hidden
          />
        </div>

        {/* Turinys ir mygtukas apačioje */}
        <div className="flex flex-1 flex-col px-6 py-8">
          <div className="flex flex-1 flex-col items-center text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Nurture your health with safe and low-impact Tai Chi workouts!
            </h2>
            <p className="mb-8 max-w-lg text-gray-600">
              Our Tai Chi workouts focus on body awareness and gentle movements. They are a safer alternative to high-impact workouts for those prone to injuries or joint discomfort.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm pb-8">
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
    );
  }

  return null;
}

export default Quiz;
