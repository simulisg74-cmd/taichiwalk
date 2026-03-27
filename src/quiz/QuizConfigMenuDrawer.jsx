import { X, Envelope } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { Link, useLocation, useParams } from 'react-router-dom';
import offerConfig from '../configs/offerConfig.json';
import { swapLangInPath } from '../utils/localizedPath';
import { withPreservedQueryParams } from '../utils/preserveQueryParams';
import { nextCyclicLang, switchToLangLabelKey } from '../utils/langCycle';
import { restartQuizWithFullReload } from '../utils/quizStorage';

const SUPPORT_EMAIL = offerConfig.urls.supportEmail;
const TERMS_OF_USE_URL = offerConfig.urls.terms;
const PRIVACY_POLICY_URL = offerConfig.urls.privacy ?? offerConfig.urls.terms;

export function QuizConfigMenuDrawer({ open, onClose }) {
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
    <div className="fixed inset-0 z-[200] flex" role="dialog" aria-modal="true" aria-labelledby="config-quiz-menu-title">
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
        <h2 id="config-quiz-menu-title" className="sr-only">
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
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-orange-500 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.99]"
              onClick={onClose}
            >
              <Envelope size={22} weight="fill" className="shrink-0" aria-hidden />
              {t('common.emailUs')}
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-center text-sm font-medium text-orange-600 underline underline-offset-2 hover:text-orange-700"
              onClick={onClose}
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
        </nav>
      </aside>
    </div>,
    document.body,
  );
}
