import { useState, useEffect, useCallback } from 'react';
import { Check, Star, Question, Tag } from '@phosphor-icons/react';
import WalkingIcon from './WalkingIcon';
/** Before/After viename kadre – jūsų asset */
import comparisonHeroImage from '../assets/img body fat bodyslim.webp';
import mobilePhoneHero from '../assets/img mobilus telefonas.webp';
import desiredWalkImg from '../assets/img mergina iskelus rankas.webp';
import walkingProfileImg from '../assets/img walking profile.webp';
import testimonial88 from '../assets/img 88kg.webp';
import testimonial147 from '../assets/img 147 kg.webp';
import laurelLeftSvg from '../assets/sakele is kaires.svg';
import securityInfoBanner from '../assets/security-info.png';

/** Oranžinė – kaip reference (#ff6b3d) */
const ORANGE = '#ff6b3d';
const COUNTDOWN_TOTAL_SECONDS = 10 * 60; // 10 min atgal
const TERMS_URL = 'https://info.walkingfl.fit/terms-of-use';
const SUPPORT_EMAIL = 'support@walkingfl.fit';

function formatCountdown(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return { m: String(m).padStart(2, '0'), s: String(s).padStart(2, '0') };
}

/** 6 segmentų juosta (reference: Before 2 oranžiniai; After 6 oranžiniai) */
const FITNESS_TOTAL = 6;
function FitnessSegments({ filled }) {
  return (
    <div className="flex w-full gap-1" role="img" aria-label={`Fitness ${filled} of ${FITNESS_TOTAL}`}>
      {Array.from({ length: FITNESS_TOTAL }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 min-w-0 flex-1 rounded-full ${i < filled ? '' : 'bg-gray-200'}`}
          style={i < filled ? { backgroundColor: ORANGE } : undefined}
          aria-hidden
        />
      ))}
    </div>
  );
}

function StarRow({ count = 5, className = 'text-amber-400' }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} weight="fill" className="h-3.5 w-3.5" aria-hidden />
      ))}
    </div>
  );
}

const PRIMARY_BTN =
  'w-full rounded-full px-6 py-3.5 text-center text-base font-bold text-white shadow-md transition active:scale-[0.99] hover:brightness-105';
const PRIMARY_BTN_STYLE = { backgroundColor: ORANGE };

/** Promo kortelė kaip „bilietas“: viršus su žyma, perforacija, kodas + laikmatis */
function PromoTicketCard({ promoCode, mm, ss, className = 'mb-6' }) {
  return (
    <div
      className={`relative rounded-3xl border border-cyan-200/55 bg-[#e0f7fa] shadow-sm ${className}`}
    >
      <div className="flex items-center justify-center gap-3 px-4 py-5 sm:px-6">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm"
          aria-hidden
        >
          <Tag className="h-5 w-5" weight="fill" />
        </span>
        <p className="text-center text-sm font-bold leading-snug text-gray-900 sm:text-base">
          Your promo code applied!
        </p>
      </div>

      <div className="relative h-6 shrink-0">
        <div
          className="absolute left-5 right-5 top-1/2 h-px -translate-y-1/2 bg-cyan-300/90"
          aria-hidden
        />
        <div
          className="absolute left-0 top-1/2 z-[1] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1px_rgba(165,243,252,0.5)]"
          aria-hidden
        />
        <div
          className="absolute right-0 top-1/2 z-[1] h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1px_rgba(165,243,252,0.5)]"
          aria-hidden
        />
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 pb-5 pt-3 sm:grid-cols-2 sm:gap-4 sm:px-5">
        <div className="flex min-h-[4.25rem] items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100/90">
          <Check className="h-5 w-5 shrink-0 text-sky-500" weight="bold" />
          <span className="break-all font-mono text-sm font-semibold tracking-tight text-gray-900">
            {promoCode}
          </span>
        </div>
        <div
          className="flex min-h-[4.25rem] flex-col items-center justify-center rounded-2xl px-3 py-3 ring-1 ring-cyan-300/40"
          style={{ backgroundColor: '#b2ebf2' }}
        >
          <div className="flex items-start justify-center gap-2 tabular-nums">
            <div className="flex min-w-[2.5rem] flex-col items-center">
              <span className="text-2xl font-bold leading-none text-sky-600 sm:text-[1.75rem]">
                {mm}
              </span>
              <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                minutes
              </span>
            </div>
            <span className="select-none pt-1 text-xl font-light text-sky-600" aria-hidden>
              :
            </span>
            <div className="flex min-w-[2.5rem] flex-col items-center">
              <span className="text-2xl font-bold leading-none text-sky-600 sm:text-[1.75rem]">
                {ss}
              </span>
              <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                seconds
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Trumpa žalia garantijos eilutė virš „Get My Plan“ (reference: uppercase) */
function MoneyBackShortLine({ className = 'mb-4' }) {
  return (
    <p
      className={`text-center text-[11px] font-extrabold uppercase tracking-[0.08em] text-emerald-600 sm:text-xs ${className}`}
    >
      30-day money-back guarantee
    </p>
  );
}

/**
 * Planų kortelės + radio – naudojama du kartus; vienas pasirinkimas per planId / setPlanId.
 * radioGroupSuffix: skirtingas name, kad nebūtų dublikatų DOM (valdoma per React checked).
 */
function PlanRadiosSection({ plans, planId, setPlanId, radioGroupSuffix = 'a', className = '' }) {
  const groupName = `walking-plan-${radioGroupSuffix}`;
  return (
    <section className={`mb-2 ${className}`} aria-label="Subscriptions">
      <h2 className="sr-only">Choose your plan</h2>
      <div className="space-y-4">
        {plans.map((p) => {
          const selected = planId === p.id;
          return (
            <div key={p.id} className="block">
              <p className="mb-1.5 text-center text-xs font-medium text-gray-500">{p.subtitle}</p>
              <label
                className={`block cursor-pointer overflow-hidden rounded-2xl border-2 transition ${
                  selected
                    ? 'border-[#ff6b3d] bg-[#fff8f3] shadow-md ring-1 ring-[#ff6b3d]/25'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {p.popular ? (
                  <div className="bg-gray-200 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-gray-800">
                    Most popular
                  </div>
                ) : null}
                <div className="flex gap-3 p-3 pt-3">
                  <input
                    type="radio"
                    name={groupName}
                    value={p.id}
                    checked={selected}
                    onChange={() => setPlanId(p.id)}
                    className="mt-1.5 h-4 w-4 shrink-0 accent-[#ff6b3d]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-bold leading-tight text-gray-900">{p.title}</div>
                    <div
                      className={`mt-1 inline-block rounded-md px-2 py-0.5 text-sm font-bold ${
                        selected ? 'bg-[#ff6b3d] text-white' : 'bg-gray-200/90 text-gray-900'
                      }`}
                    >
                      {p.off} OFF
                    </div>
                    <div className="mt-2 flex flex-wrap items-baseline gap-2">
                      <span className="text-sm text-gray-400 line-through">{p.was}</span>
                      <span className="text-lg font-bold text-gray-900">{p.now}</span>
                    </div>
                  </div>
                  <div
                    className={`flex w-[5.75rem] shrink-0 flex-col items-center justify-center rounded-r-2xl rounded-l-md px-2 py-2 text-center ${
                      selected ? 'bg-[#ff6b3d] text-white' : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <span className={`text-base font-bold ${selected ? 'text-white' : 'text-gray-900'}`}>
                      $0{p.perDay}
                    </span>
                    <span
                      className={`mt-0.5 text-[10px] font-medium leading-tight ${
                        selected ? 'text-white/90' : 'text-gray-600'
                      }`}
                    >
                      per day
                    </span>
                  </div>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Pasiūlymo / pirkimo tipo landingas (Plasmic purchase-3 analogas) – Tailwind + vietinės nuotraukos.
 */
function PlanOfferLanding({
  targetWeightKg = 85,
  promoCode = 'Gintas mar2026',
  onGetPlan,
}) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_TOTAL_SECONDS);
  const [planId, setPlanId] = useState('4w');
  const [appSlide, setAppSlide] = useState(0);
  const [storySlide, setStorySlide] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const { m: mm, s: ss } = formatCountdown(secondsLeft);
  const weightLabel =
    typeof targetWeightKg === 'number' && !Number.isNaN(targetWeightKg)
      ? `${targetWeightKg} kg`
      : `${targetWeightKg} kg`;

  const appImages = [mobilePhoneHero, desiredWalkImg, walkingProfileImg];
  const stories = [
    {
      img: testimonial147,
      before: '93 kg',
      after: '69 kg',
      name: 'Sophia Peterson',
      text: 'I used to hate workouts, now I walk every day and feel lighter, both in body and mind',
    },
    {
      img: testimonial88,
      before: '88 kg',
      after: '80 kg',
      name: 'Lily Morgan',
      text: 'This app turned my walks into real progress. I’m seeing the difference on the scale and in my mood',
    },
  ];

  const handleGetPlan = useCallback(() => {
    onGetPlan?.();
  }, [onGetPlan]);

  const plans = [
    {
      id: '1w',
      title: '1-WEEK PLAN',
      subtitle: 'Start your positive change',
      off: '50%',
      was: '$13.98',
      now: '$6.99',
      perDay: '.99',
      popular: false,
    },
    {
      id: '4w',
      title: '4-WEEK PLAN',
      subtitle: 'Get visible results',
      off: '60%',
      was: '$49.99',
      now: '$19.99',
      perDay: '.56',
      popular: true,
    },
    {
      id: '12w',
      title: '12-WEEK PLAN',
      subtitle: 'Become fit and toned',
      off: '57%',
      was: '$69.99',
      now: '$29.99',
      perDay: '.33',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-white pb-[calc(4rem+env(safe-area-inset-bottom,0px))] font-sans text-gray-900">
      {/* Baltas headeris: logo centre, dešinėje laikmatis + oranžinis CTA (be pilno pločio „juostos“) */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white pt-[env(safe-area-inset-top,0px)] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        {/* Tik logotipas centre – be atgal / meniu */}
        <div className="mx-auto flex max-w-lg justify-center px-4 py-3">
          <WalkingIcon showLabel size="md" />
        </div>

        {/* 2 eilutė: laikmatis šalia „Get My Plan“ (viena eilutė), skaičiai oranžiniai, mygtukas su rėmeliu + pulse */}
        <div className="mx-auto flex max-w-lg flex-wrap items-end justify-center gap-3 border-t border-gray-100 px-4 pb-3 pt-3 sm:flex-nowrap sm:justify-between sm:gap-4">
          <div className="flex min-w-0 flex-1 items-end justify-center gap-1 tabular-nums sm:flex-initial sm:justify-start sm:gap-2">
            <div className="text-center">
              <div
                className="text-2xl font-bold leading-none tracking-tight sm:text-[1.75rem]"
                style={{ color: ORANGE }}
              >
                {mm}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-gray-600">
                minutes
              </div>
            </div>
            <span
              className="pb-3 text-lg font-light leading-none sm:pb-3.5 sm:text-xl"
              style={{ color: ORANGE }}
              aria-hidden
            >
              :
            </span>
            <div className="text-center">
              <div
                className="text-2xl font-bold leading-none tracking-tight sm:text-[1.75rem]"
                style={{ color: ORANGE }}
              >
                {ss}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-gray-600">
                seconds
              </div>
            </div>
          </div>
          <div className="shrink-0 rounded-full border-2 border-gray-200 bg-gray-50 p-1 shadow-sm ring-1 ring-black/[0.03]">
            <button
              type="button"
              onClick={handleGetPlan}
              className="block rounded-full px-5 py-2.5 text-center text-sm font-bold text-white shadow-md transition hover:brightness-105 active:scale-[0.98] motion-safe:animate-pulse"
              style={PRIMARY_BTN_STYLE}
            >
              Get My Plan
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4">
        {/* Before / After – owerweight.webp + Toned.webp, ženkleliai ant nuotraukų */}
        <section className="relative py-6 pb-8">
          <div className="relative z-0 overflow-hidden rounded-3xl bg-gray-100 ring-1 ring-gray-200/80">
            <div className="relative w-full overflow-hidden bg-gray-100">
              <img
                src={comparisonHeroImage}
                alt=""
                className="block w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div
            className="relative z-10 -mt-8 overflow-hidden rounded-3xl px-4 py-4 text-sm shadow-md ring-1 ring-gray-200/80 sm:-mt-10"
            style={{ backgroundColor: '#FDF8F1' }}
          >
            <div className="grid grid-cols-2 divide-x divide-gray-300/80">
              <div className="min-w-0 px-2 pr-3">
                <p className="text-center text-xs font-bold text-gray-900">Body fat</p>
                <p className="mt-1 text-center text-base font-normal text-gray-900">&gt; 32%</p>
                <div className="mx-auto my-3 h-px max-w-[88%] bg-gray-300/90" aria-hidden />
                <p className="text-center text-xs font-bold text-gray-900">Fitness level</p>
                <div className="mt-2">
                  <FitnessSegments filled={2} />
                </div>
              </div>
              <div className="min-w-0 px-3 pl-3">
                <p className="text-center text-xs font-bold text-gray-900">Body fat</p>
                <p className="mt-1 text-center text-base font-normal text-gray-900">14–20%</p>
                <div className="mx-auto my-3 h-px max-w-[88%] bg-gray-300/90" aria-hidden />
                <p className="text-center text-xs font-bold text-gray-900">Fitness level</p>
                <div className="mt-2">
                  <FitnessSegments filled={6} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <p className="mb-5 text-center text-xs italic text-gray-500">
          *This is not a guarantee or promise of results.
        </p>

        <div className="mb-6">
          <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            Reach your target weight:
          </p>
          <h1 className="text-center text-[1.65rem] font-extrabold leading-snug tracking-tight text-gray-900 sm:text-[1.75rem]">
            <span style={{ color: ORANGE }}>{weightLabel}</span>{' '}
            <span className="text-gray-900">with our action plan</span>
          </h1>
        </div>

        <PromoTicketCard promoCode={promoCode} mm={mm} ss={ss} className="mb-6" />

        <PlanRadiosSection
          plans={plans}
          planId={planId}
          setPlanId={setPlanId}
          radioGroupSuffix="top"
        />

        <MoneyBackShortLine />
        <button
          type="button"
          className={`${PRIMARY_BTN} mb-4`}
          style={PRIMARY_BTN_STYLE}
          onClick={handleGetPlan}
        >
          Get My Plan
        </button>
        <p className="mb-10 text-center text-xs leading-relaxed text-gray-500">
          You will be automatically charged $19.99 after the payment confirmation. The subscription
          will then be auto-renewed every month after a 1-month intro offer at the full price of
          $49.99. To learn more, visit our{' '}
          <a href={TERMS_URL} className="font-semibold text-[#ff6b3d] underline" target="_blank" rel="noreferrer">
            Terms of Use
          </a>{' '}
          or contact us at{' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-semibold text-[#ff6b3d] underline"
            target="_blank"
            rel="noreferrer"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>

        {/* Mobilios app nuotraukos */}
        <h2 className="mb-3 text-xl font-bold">Use Our Handy Mobile App to Improve Your Results</h2>
        <div className="relative mb-2 w-full overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200/60">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${appSlide * 100}%)` }}
          >
            {appImages.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[343/428] min-w-full shrink-0 bg-white"
              >
                <img
                  src={src}
                  alt=""
                  className={
                    i === 0
                      ? 'absolute left-0 top-1/2 max-h-full max-w-full -translate-y-1/2 object-contain object-left pl-1 sm:pl-2'
                      : 'absolute inset-0 h-full w-full object-cover object-center'
                  }
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-1 flex justify-center gap-2">
          {appImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAppSlide(i)}
              className={`h-2 w-2 rounded-full transition ${i === appSlide ? 'bg-[#ff6b3d]' : 'bg-gray-300'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <p className="mb-8 text-center text-xs text-gray-500">*after finishing you can start a new one</p>

        <div className="mb-10 flex items-center justify-center gap-2 py-4 sm:gap-3">
          <img
            src={laurelLeftSvg}
            alt=""
            className="h-16 w-auto shrink-0 object-contain sm:h-[4.5rem]"
            width={42}
            height={72}
            aria-hidden
          />
          <p className="flex min-w-0 flex-col items-center justify-center text-center">
            <span className="flex items-baseline justify-center gap-0.5 leading-[0.95] text-gray-900">
              <span className="text-2xl font-bold sm:text-3xl">#</span>
              <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">1</span>
            </span>
            <span className="mt-1 text-sm font-bold leading-tight text-gray-900 sm:text-base">
              Walking App
            </span>
          </p>
          <img
            src={laurelLeftSvg}
            alt=""
            className="h-16 w-auto shrink-0 -scale-x-100 object-contain sm:h-[4.5rem]"
            width={42}
            height={72}
            aria-hidden
          />
        </div>

        <h2 className="mb-3 text-center text-2xl font-extrabold leading-tight">
          Start Losing Weight
          <br />
          Right Now
        </h2>
        <button
          type="button"
          className={`${PRIMARY_BTN} mb-12`}
          style={PRIMARY_BTN_STYLE}
          onClick={handleGetPlan}
        >
          Get My Plan
        </button>

        <section className="mb-10 rounded-[2rem] bg-[#fff3e8] px-6 py-8 text-center sm:rounded-[2.5rem] sm:px-10 sm:py-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">Why it works</h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-700 sm:text-base">
            According to your goals and personal data, our algorithm will craft a personalized
            walking plan to yield the best results. The app will set achievable daily activity goals
            and suggest a tailored walking workout program that will smoothly guide you to the
            target activity level for the first 4 weeks.
          </p>
        </section>

        <section className="mb-10 text-center">
          <h2 className="mb-4 text-xl font-bold">What you get</h2>
          <ul className="mx-auto max-w-md space-y-4 text-left text-sm text-gray-700">
            {[
              '300+ workouts & 500+ exercises from certified coaches with detailed video tutorials',
              '10-minute routines to fit into the busiest schedule',
              'Anywhere, anytime, no-equipment-needed training',
              'A variety of walking plans to try a new one every day',
              'Fun. Drive. Health. To enjoy every minute of it!',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: ORANGE }}
                >
                  <Check className="h-3.5 w-3.5" weight="bold" />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`${PRIMARY_BTN} mx-auto mt-6 max-w-sm`}
            style={PRIMARY_BTN_STYLE}
            onClick={handleGetPlan}
          >
            Get My Plan
          </button>
        </section>

        {/* Success stories */}
        <section className="mb-10">
          <h2 className="mb-2 text-xl font-bold">Walking success stories!</h2>
          <p className="mb-4 text-sm text-gray-600">
            They’ve done it, so why can’t you? Here’s a few of our clients’ success stories.
          </p>
          <div className="overflow-hidden rounded-2xl bg-gray-50">
            <img
              src={stories[storySlide].img}
              alt=""
              className="aspect-[686/450] w-full object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <div className="mb-2 flex items-center justify-center gap-2 text-sm font-bold">
                <span>{stories[storySlide].before}</span>
                <span className="text-gray-400">→</span>
                <span className="text-[#ff6b3d]">{stories[storySlide].after}</span>
              </div>
              <div className="mb-2 text-center font-semibold">{stories[storySlide].name}</div>
              <StarRow />
              <p className="mt-2 text-center text-sm text-gray-600">{stories[storySlide].text}</p>
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {stories.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStorySlide(i)}
                className={`h-2 w-2 rounded-full ${i === storySlide ? 'bg-[#ff6b3d]' : 'bg-gray-300'}`}
                aria-label={`Story ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Question className="h-6 w-6 text-[#F16E43]" weight="fill" />
            What people often ask
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="mb-2 font-bold">What is Walking?</h3>
              <p className="leading-relaxed text-gray-600">
                Walking is an app that offers you walking as a routine to keep you fit and lose weight
                if needed. A variety of plans adapted into 5–30 minutes walking workouts will get you
                into the true groove of your body.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-bold">What is a personal program?</h3>
              <p className="leading-relaxed text-gray-600">
                It&apos;s a plan tailored for you based on your goals and preferences. You can choose
                from 5–30 min workouts to fit into your calendar, as well as your level — from
                beginner to pro.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-bold">When will I see the results?</h3>
              <p className="leading-relaxed text-gray-600">
                Although it depends on many factors, you may start to see visible results within the
                first 28 days!
              </p>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Reviews</h2>
          <div className="space-y-6">
            {[
              {
                name: 'George Hoffman',
                text: 'This is the best home workout plan! I can really feel the positive impact on my body, and it helps me release stress.',
              },
              {
                name: 'Cindy Paige',
                text: 'Easy and fun. Nice app for me as beginner. This is my new favorite routine!',
              },
              {
                name: 'Aida Mazza',
                text: 'I truly feel like they have a great impact on my physical body and it releases the stress.',
              },
            ].map((r) => (
              <div key={r.name} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                <div className="mb-1 font-semibold">{r.name}</div>
                <StarRow />
                <p className="mt-2 text-sm text-gray-600">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <h2 className="mb-6 text-center text-xl font-extrabold">Get visible results in 4 weeks!</h2>

        <PromoTicketCard promoCode={promoCode} mm={mm} ss={ss} className="mb-4" />

        <PlanRadiosSection
          plans={plans}
          planId={planId}
          setPlanId={setPlanId}
          radioGroupSuffix="bottom"
        />

        <MoneyBackShortLine />

        <button
          type="button"
          className={`${PRIMARY_BTN} mb-4`}
          style={PRIMARY_BTN_STYLE}
          onClick={handleGetPlan}
        >
          Get My Plan
        </button>

        {/* Po antro CTA: SSL + „Powered by Stripe“ (1:1 su security-info.png) */}
        <div className="mb-8 flex justify-center px-1">
          <img
            src={securityInfoBanner}
            alt="Secure SSL encryption. Powered by Stripe."
            className="mx-auto block h-auto w-full max-w-[280px] object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        <section className="mb-10 rounded-2xl bg-emerald-50/60 p-5 ring-1 ring-emerald-100">
          <h2 className="mb-2 text-lg font-bold">100% Money-Back Guarantee</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            We are confident in the quality of our plan. We are even ready to return your money if you
            don’t see visible results and can demonstrate that you followed your plan. For more
            information, please read our{' '}
            <a href={TERMS_URL} className="font-semibold text-[#ff6b3d] underline" target="_blank" rel="noreferrer">
              Terms of Use
            </a>
            .
          </p>
        </section>

        <section className="space-y-6 border-t border-gray-100 pt-8 text-sm text-gray-600">
          <div>
            <h2 className="mb-2 text-lg font-bold text-gray-900">Your information is safe</h2>
            <p>
              We won’t sell or rent your personal contact information for any marketing purposes
              whatsoever.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-gray-900">Secure checkout</h2>
            <p>All information is encrypted and transmitted without risk using SSL.</p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-gray-900">Need help?</h2>
            <p>
              Send us an email:{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-[#ff6b3d] underline">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PlanOfferLanding;
