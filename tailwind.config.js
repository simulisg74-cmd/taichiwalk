/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'offer-cta-pulse': {
          '0%, 100%': {
            boxShadow: '0 4px 16px rgba(255, 107, 61, 0.42)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 10px 36px rgba(255, 107, 61, 0.85)',
            transform: 'scale(1.14)',
          },
        },
      },
      animation: {
        'offer-cta-pulse': 'offer-cta-pulse 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
