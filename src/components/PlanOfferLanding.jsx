import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import offerConfig from '../configs/offerConfig.json';
import { swapLangInPath } from '../utils/localizedPath';
import { withPreservedQueryParams } from '../utils/preserveQueryParams';

/** Iš offerConfig.json (Step 7 – be hardcode kainų / kontaktų) */
const ORANGE = offerConfig.brand.primaryHex;
const COUNTDOWN_TOTAL_SECONDS = offerConfig.countdownSeconds;
const TERMS_URL = offerConfig.urls.terms;
const SUPPORT_EMAIL = offerConfig.urls.supportEmail;

function formatCountdown(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return { m: String(m).padStart(2, '0'), s: String(s).padStart(2, '0') };
}

/** 6 segmentų juosta (reference: Before 2 oranžiniai; After 6 oranžiniai) */
const FITNESS_TOTAL = 6;
function FitnessSegments({ filled }) {
  const { t } = useTranslation('offer');
  return (
    <div
      className="flex w-full gap-1"
      role="img"
      aria-label={t('fitnessOf', { filled, total: FITNESS_TOTAL })}
    >
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
  'w-full max-w-[min(100%,22rem)] rounded-full px-5 py-3.5 text-center text-sm font-bold text-white shadow-md transition active:scale-[0.99] hover:brightness-105 sm:max-w-none sm:px-6 sm:text-base mx-auto sm:mx-0';
const PRIMARY_BTN_STYLE = { backgroundColor: ORANGE };

/** Promo kortelė kaip „bilietas“: viršus su žyma, perforacija, kodas + laikmatis */
function PromoTicketCard({ promoCode, mm, ss, className = 'mb-6' }) {
  const { t } = useTranslation('offer');
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
          {t('promoApplied')}
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
                {t('minutes')}
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
                {t('seconds')}
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
  const { t } = useTranslation('offer');
  return (
    <p
      className={`text-center text-[11px] font-extrabold uppercase tracking-[0.08em] text-emerald-600 sm:text-xs ${className}`}
    >
      {t('moneyBackShort')}
    </p>
  );
}

/**
 * Planų kortelės + radio – naudojama du kartus; vienas pasirinkimas per planId / setPlanId.
 * radioGroupSuffix: skirtingas name, kad nebūtų dublikatų DOM (valdoma per React checked).
 */
function PlanRadiosSection({ plans, planId, setPlanId, radioGroupSuffix = 'a', className = '' }) {
  const { t } = useTranslation('offer');
  const groupName = `walking-plan-${radioGroupSuffix}`;
  return (
    <section className={`mb-2 ${className}`} aria-label={t('subscriptionsAria')}>
      <h2 className="sr-only">{t('choosePlanSr')}</h2>
      <div className="space-y-4">
        {plans.map((p) => {
          const selected = planId === p.id;
          return (
            <div key={p.id} className="block">
              <p className="mb-1.5 text-center text-xs font-medium text-gray-500">
                {p.subtitleKey ? t(p.subtitleKey) : ''}
              </p>
              <label
                className={`block cursor-pointer overflow-hidden rounded-2xl border-2 transition ${
                  selected
                    ? 'border-[#ff6b3d] bg-[#fff8f3] shadow-md ring-1 ring-[#ff6b3d]/25'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {p.popular ? (
                  <div className="bg-gray-200 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-gray-800">
                    {t(p.popularLabelKey || 'plans.popularBadge')}
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
                    <div className="text-base font-bold leading-tight text-gray-900">
                      {p.titleKey ? t(p.titleKey) : ''}
                    </div>
                    <div
                      className={`mt-1 inline-block rounded-md px-2 py-0.5 text-sm font-bold ${
                        selected ? 'bg-[#ff6b3d] text-white' : 'bg-gray-200/90 text-gray-900'
                      }`}
                    >
                      {t('offLabel', { percent: p.off })}
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
                      {t('perDay')}
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
  targetWeightKg = offerConfig.defaultTargetWeightKg,
  promoCode = offerConfig.defaultPromoCode,
  plans: plansProp,
  variantLabel,
  discountDisplay,
  onGetPlan,
}) {
  const { t: tOffer } = useTranslation('offer');
  const { t: tCommon, i18n } = useTranslation();
  const location = useLocation();
  const otherLang = i18n.language?.startsWith('lt') ? 'en' : 'lt';
  const langSwitchHref = withPreservedQueryParams(swapLangInPath(location.pathname, otherLang));
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
  const stories = useMemo(
    () => [
      {
        img: testimonial147,
        before: tOffer('storySophiaBefore'),
        after: tOffer('storySophiaAfter'),
        name: tOffer('storySophiaName'),
        text: tOffer('storySophiaText'),
      },
      {
        img: testimonial88,
        before: tOffer('storyLilyBefore'),
        after: tOffer('storyLilyAfter'),
        name: tOffer('storyLilyName'),
        text: tOffer('storyLilyText'),
      },
    ],
    [tOffer],
  );

  const handleGetPlan = useCallback(() => {
    onGetPlan?.();
  }, [onGetPlan]);

  const defaultVariantId = offerConfig.defaultVariantId || 'base';
  const fallbackPlans = offerConfig.variants?.[defaultVariantId]?.plans;
  const plans =
    plansProp ??
    (Array.isArray(fallbackPlans) && fallbackPlans.length > 0 ? fallbackPlans : []);

  if (!plans.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4 text-center text-gray-600">
        {tCommon('common.noPlans')}
      </div>
    );
  }

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
                {tOffer('minutes')}
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
                {tOffer('seconds')}
              </div>
            </div>
          </div>
          <div className="shrink-0 rounded-full border-2 border-gray-200 bg-gray-50 p-1 shadow-sm ring-1 ring-black/[0.03]">
            <button
              type="button"
              onClick={handleGetPlan}
              className="block max-w-full rounded-full px-3.5 py-2 text-center text-xs font-bold text-white shadow-md transition hover:brightness-105 active:scale-[0.98] motion-safe:animate-pulse sm:px-5 sm:py-2.5 sm:text-sm"
              style={PRIMARY_BTN_STYLE}
            >
              {tOffer('getMyPlan')}
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
                <p className="text-center text-xs font-bold text-gray-900">{tOffer('bodyFat')}</p>
                <p className="mt-1 text-center text-base font-normal text-gray-900">&gt; 32%</p>
                <div className="mx-auto my-3 h-px max-w-[88%] bg-gray-300/90" aria-hidden />
                <p className="text-center text-xs font-bold text-gray-900">{tOffer('fitnessLevel')}</p>
                <div className="mt-2">
                  <FitnessSegments filled={2} />
                </div>
              </div>
              <div className="min-w-0 px-3 pl-3">
                <p className="text-center text-xs font-bold text-gray-900">{tOffer('bodyFat')}</p>
                <p className="mt-1 text-center text-base font-normal text-gray-900">14–20%</p>
                <div className="mx-auto my-3 h-px max-w-[88%] bg-gray-300/90" aria-hidden />
                <p className="text-center text-xs font-bold text-gray-900">{tOffer('fitnessLevel')}</p>
                <div className="mt-2">
                  <FitnessSegments filled={6} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <p className="mb-5 text-center text-xs italic text-gray-500">{tOffer('resultsDisclaimer')}</p>

        <div className="mb-6">
          <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            {tOffer('reachTargetPrefix')}
          </p>
          <h1 className="text-center text-[1.65rem] font-extrabold leading-snug tracking-tight text-gray-900 sm:text-[1.75rem]">
            <span style={{ color: ORANGE }}>{weightLabel}</span>{' '}
            <span className="text-gray-900">{tOffer('withActionPlan')}</span>
          </h1>
          {discountDisplay ? (
            <p
              className="mt-3 text-center text-sm font-bold tracking-tight"
              style={{ color: ORANGE }}
            >
              {tOffer('saveUpToToday', { discount: discountDisplay })}
            </p>
          ) : null}
          {variantLabel ? (
            <p className="sr-only" aria-live="polite">
              {tOffer('offerVariantSr', { name: variantLabel })}
            </p>
          ) : null}
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
          {tOffer('getMyPlan')}
        </button>
        <p className="mb-10 text-center text-xs leading-relaxed text-gray-500">
          {tOffer('legalSubscription')}{' '}
          <a href={TERMS_URL} className="font-semibold text-[#ff6b3d] underline" target="_blank" rel="noreferrer">
            {tOffer('termsOfUse')}
          </a>{' '}
          {tOffer('orContactAt')}{' '}
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
        <h2 className="mb-3 text-xl font-bold">{tOffer('mobileAppHeading')}</h2>
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
              aria-label={tOffer('slideAria', { n: i + 1 })}
            />
          ))}
        </div>
        <p className="mb-8 text-center text-xs text-gray-500">{tOffer('afterFinishNote')}</p>

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
              <span className="text-2xl font-bold sm:text-3xl">{tOffer('numberOneHash')}</span>
              <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">1</span>
            </span>
            <span className="mt-1 text-sm font-bold leading-tight text-gray-900 sm:text-base">
              {tOffer('numberOneWalkingApp')}
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
          {tOffer('startLosingWeight')}
          <br />
          {tOffer('rightNow')}
        </h2>
        <button
          type="button"
          className={`${PRIMARY_BTN} mb-12`}
          style={PRIMARY_BTN_STYLE}
          onClick={handleGetPlan}
        >
          {tOffer('getMyPlan')}
        </button>

        <section className="mb-10 rounded-[2rem] bg-[#fff3e8] px-6 py-8 text-center sm:rounded-[2.5rem] sm:px-10 sm:py-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">{tOffer('whyItWorksTitle')}</h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-700 sm:text-base">
            {tOffer('whyItWorksBody')}
          </p>
        </section>

        <section className="mb-10 text-center">
          <h2 className="mb-4 text-xl font-bold">{tOffer('whatYouGetTitle')}</h2>
          <ul className="mx-auto max-w-md space-y-4 text-left text-sm text-gray-700">
            {[
              'whatYouGetItem1',
              'whatYouGetItem2',
              'whatYouGetItem3',
              'whatYouGetItem4',
              'whatYouGetItem5',
            ].map((lineKey) => (
              <li key={lineKey} className="flex gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: ORANGE }}
                >
                  <Check className="h-3.5 w-3.5" weight="bold" />
                </span>
                <span>{tOffer(lineKey)}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`${PRIMARY_BTN} mx-auto mt-6 max-w-sm`}
            style={PRIMARY_BTN_STYLE}
            onClick={handleGetPlan}
          >
            {tOffer('getMyPlan')}
          </button>
        </section>

        {/* Success stories */}
        <section className="mb-10">
          <h2 className="mb-2 text-xl font-bold">{tOffer('storiesTitle')}</h2>
          <p className="mb-4 text-sm text-gray-600">{tOffer('storiesIntro')}</p>
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
                aria-label={tOffer('storyAria', { n: i + 1 })}
              />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Question className="h-6 w-6 text-[#F16E43]" weight="fill" />
            {tOffer('faqSectionTitle')}
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="mb-2 font-bold">{tOffer('faqWhatIsWalkingQ')}</h3>
              <p className="leading-relaxed text-gray-600">{tOffer('faqWhatIsWalkingA')}</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold">{tOffer('faqPersonalProgramQ')}</h3>
              <p className="leading-relaxed text-gray-600">{tOffer('faqPersonalProgramA')}</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold">{tOffer('faqResultsQ')}</h3>
              <p className="leading-relaxed text-gray-600">{tOffer('faqResultsA')}</p>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">{tOffer('reviewsTitle')}</h2>
          <div className="space-y-6">
            {(
              [
                { nameKey: 'reviewGeorgeName', textKey: 'reviewGeorgeText' },
                { nameKey: 'reviewCindyName', textKey: 'reviewCindyText' },
                { nameKey: 'reviewAidaName', textKey: 'reviewAidaText' },
              ] 
            ).map((r) => (
              <div key={r.nameKey} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                <div className="mb-1 font-semibold">{tOffer(r.nameKey)}</div>
                <StarRow />
                <p className="mt-2 text-sm text-gray-600">{tOffer(r.textKey)}</p>
              </div>
            ))}
          </div>
        </section>

        <h2 className="mb-6 text-center text-xl font-extrabold">{tOffer('visibleResultsHeading')}</h2>

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
          {tOffer('getMyPlan')}
        </button>

        {/* Po antro CTA: SSL + „Powered by Stripe“ (1:1 su security-info.png) */}
        <div className="mb-8 flex justify-center px-1">
          <img
            src={securityInfoBanner}
            alt={tOffer('securityBannerAlt')}
            className="mx-auto block h-auto w-full max-w-[280px] object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        <section className="mb-10 rounded-2xl bg-emerald-50/60 p-5 ring-1 ring-emerald-100">
          <h2 className="mb-2 text-lg font-bold">{tOffer('moneyBackTitle')}</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            {tOffer('moneyBackBody')}{' '}
            <a href={TERMS_URL} className="font-semibold text-[#ff6b3d] underline" target="_blank" rel="noreferrer">
              {tOffer('termsOfUse')}
            </a>
            .
          </p>
        </section>

        <section className="space-y-6 border-t border-gray-100 pt-8 text-sm text-gray-600">
          <div>
            <h2 className="mb-2 text-lg font-bold text-gray-900">{tOffer('infoSafeTitle')}</h2>
            <p>{tOffer('infoSafeBody')}</p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-gray-900">{tOffer('secureCheckoutTitle')}</h2>
            <p>{tOffer('secureCheckoutBody')}</p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-gray-900">{tOffer('needHelpTitle')}</h2>
            <p>
              {tOffer('needHelpBody')}{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-[#ff6b3d] underline">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </section>

        <p className="pb-10 pt-4 text-center text-sm text-gray-500">
          <Link to={langSwitchHref} className="font-medium text-[#ff6b3d] underline underline-offset-2">
            {otherLang === 'lt' ? tCommon('common.switchToLt') : tCommon('common.switchToEn')}
          </Link>
        </p>
      </main>
    </div>
  );
}

export default PlanOfferLanding;
