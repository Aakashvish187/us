/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fff8f1',
        blush: '#ffe3ea',
        lav: '#ebe3ff',
        rose: '#e0597a',
        wine: '#b3263e',
        plum: '#7a4cc0',
        ink: '#3a2a3d',
        mute: '#85707f',
      },
      fontFamily: {
        serif: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        glass: '0 10px 40px -14px rgba(179, 38, 62, 0.28)',
        soft: '0 6px 24px -10px rgba(122, 76, 192, 0.35)',
      },
      keyframes: {
        twinkle: {
          '0%,100%': { opacity: '0.15', transform: 'scale(0.7)' },
          '50%': { opacity: '0.9', transform: 'scale(1.1)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(224,89,122,0.45)' },
          '100%': { boxShadow: '0 0 0 14px rgba(224,89,122,0)' },
        },
        caret: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        pulseRing: 'pulseRing 2s ease-out infinite',
        caret: 'caret 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
}
