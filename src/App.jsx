import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import QuizApp from './quiz/QuizApp';
import Offer from './components/Offer';
import { DEFAULT_LANG, isSupportedLang } from './constants/i18n';
import { syncI18nLanguageFromPath } from './i18n';
import { withPreservedQueryParams } from './utils/preserveQueryParams';

function RootLanguageRedirect() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const raw = navigator.language?.split('-')[0]?.toLowerCase() ?? DEFAULT_LANG;
    const lang = isSupportedLang(raw) ? raw : DEFAULT_LANG;
    navigate(withPreservedQueryParams(`/${lang}/quiz`), { replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-sm text-gray-500">
      {t('common.redirecting')}
    </div>
  );
}

function LangGate() {
  const { lang } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (isSupportedLang(lang)) syncI18nLanguageFromPath(lang);
  }, [lang]);

  if (!isSupportedLang(lang)) {
    const rest = location.pathname.replace(/^\/[^/]+/, '') || '/quiz';
    return <Navigate to={withPreservedQueryParams(`/${DEFAULT_LANG}${rest}`)} replace />;
  }

  return <Outlet />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLanguageRedirect />} />
      <Route path="/:lang" element={<LangGate />}>
        <Route index element={<Navigate to="quiz" replace />} />
        <Route path="quiz" element={<QuizApp />} />
        <Route path="offer" element={<Offer />} />
        <Route path="offer-68" element={<Offer />} />
        <Route path="offer-75" element={<Offer />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
