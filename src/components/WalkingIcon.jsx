import walkingIconImage from '../assets/img ikona vaiksto mergina.webp';

/**
 * Walking ikona – projekto vietinė .webp (visuose quiz žingsniuose).
 */
function WalkingIcon({ showLabel = true, size = 'md', labelClassName = 'text-black' }) {
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex items-center gap-3">
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
        <span className={`font-sans text-base font-bold tracking-tight ${labelClassName}`}>
          Walking
        </span>
      )}
    </div>
  );
}

export default WalkingIcon;
