import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import offerConfig from '../configs/offerConfig.json';
import { getOfferVariantKeyFromPathname } from '../utils/offerRoutes';
import { readQuizProgress } from '../utils/quizStorage';
import PlanOfferLanding from './PlanOfferLanding';

/** Vardas iš apklausos + mėn. + metai (pvz. „Gintas mar2026“); kitaip – numatytasis kodas iš config. */
function buildPromoDisplayCode(defaultCode, locale) {
  const saved = readQuizProgress();
  const raw = saved?.answers?.quizUserName;
  const first = typeof raw === 'string' ? raw.trim().split(/\s+/)[0] ?? '' : '';
  if (!first) return defaultCode;
  const d = new Date();
  const mon = d
    .toLocaleDateString(locale || 'en', { month: 'short' })
    .replace(/\./g, '')
    .toLowerCase();
  const yr = d.getFullYear();
  return `${first} ${mon}${yr}`;
}

function parseTargetWeightKgFromSearch(searchParams) {
  const raw = searchParams.get('tw');
  if (raw == null || raw === '') return null;
  const n = Number(String(raw).replace(',', '.'));
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

/**
 * Step 10: offer puslapis pagal maršrutą – rodo atitinkamą nuolaidą (61% / 68% / 75%).
 */
export default function Offer() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const variantKey = useMemo(() => getOfferVariantKeyFromPathname(pathname), [pathname]);
  const variant = offerConfig.variants?.[variantKey];
  const plans = variant?.plans;

  const tw = parseTargetWeightKgFromSearch(searchParams);
  const targetWeightKg = tw ?? offerConfig.defaultTargetWeightKg;

  const promoCode = useMemo(
    () => buildPromoDisplayCode(offerConfig.defaultPromoCode, i18n.language),
    [i18n.language],
  );

  if (!plans || !Array.isArray(plans) || plans.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4 text-center text-gray-600">
        {t('common.offerMissing')}
      </div>
    );
  }

  return (
    <PlanOfferLanding
      plans={plans}
      variantLabel={variant?.name}
      discountDisplay={variant?.displayOff}
      targetWeightKg={targetWeightKg}
      promoCode={promoCode}
    />
  );
}
