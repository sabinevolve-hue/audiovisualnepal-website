/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0071E3',
          'blue-hover': '#0077ED',
          black: '#111111',
          'gray-bg': '#F5F5F7',
          'gray-mid': '#E8E8ED',
          'gray-text': '#6E6E73',
        },
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'var(--font-sans)', 'sans-serif'],
        body: ['Inter', 'var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'scroll': 'scrollAnim 2s ease infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scrollAnim: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(0.8) translateY(0)' },
          '50%':       { opacity: '1',   transform: 'scaleY(1.2) translateY(6px)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #000 0%, #0a0a1a 60%, #111827 100%)',
        'cta-gradient': 'linear-gradient(170deg, #0a0a1a 0%, #000520 50%, #000 100%)',
      },
    },
  },
  plugins: [],
}
