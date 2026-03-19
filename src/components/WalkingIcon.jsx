/**
 * Walking ikona – baltas siluetas oranžiniame užapvalintame fone.
 * Atitinka „Walking“ logo stilių: gradientas, švelnus šešėlis.
 */
function WalkingIcon({ showLabel = true, size = 'md', labelClassName = 'text-black' }) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32,
  };

  const s = iconSizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Oranžinis užapvalintas fonas su gradientu */}
      <div
        className={`${sizeClasses[size]} flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-orange-400 to-orange-600 shadow-md`}
      >
        {/* Vaikštančio žmogaus siluetas – baltas, minimalistinis, profilis į dešinę */}
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
          style={{ transform: 'scaleX(-1)' }}
          aria-hidden
        >
          {/* Material Design directions_walk – veidas į dešinę */}
          <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-2.2 0-4.1-1.2-5.2-2.9l-.8-1.2c-.2-.3-.5-.5-.9-.5H9c-.6 0-1.1.4-1.1 1v4.9h2V9.9z" />
        </svg>
      </div>

      {showLabel && (
        <span className={`font-serif ${labelClassName}`}>Walking</span>
      )}
    </div>
  );
}

export default WalkingIcon;
