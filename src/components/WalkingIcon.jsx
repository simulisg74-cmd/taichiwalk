import { useTranslation } from 'react-i18next';
import walkingIconImage from '../assets/img ikona vaiksto mergina.webp';

/**
 * Walking ikona – projekto vietinė .webp (visuose quiz žingsniuose).
 */
function WalkingIcon({ showLabel = true, size = 'md', labelClassName = 'text-black' }) {
  const { t } = useTranslation();
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:justify-start sm:gap-3">
      <div
        className={`${sizeClasses[size]} flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5`}
      >
        <img
          src={walkingIconImage}
          alt=""
          aria-hidden
          className="h-full w-full object-contain object-center"
          decoding="async"
        />
      </div>

      {showLabel && (
        <span
          className={`min-w-0 max-w-full text-balance break-words text-center font-sans text-sm font-bold tracking-tight sm:text-left sm:text-base ${labelClassName}`}
        >
          {t('brand.walking')}
        </span>
      )}
    </div>
  );
}

export default WalkingIcon;
