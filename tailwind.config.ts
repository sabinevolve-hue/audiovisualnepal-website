import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT:    '#0071E3',
          blue:       '#0071E3',
          'blue-hover': '#0077ED',
          light:      '#60A5FA',
          black:      '#111111',
          'gray-bg':  '#F5F5F7',
          'gray-mid': '#E8E8ED',
          'gray-text':'#6E6E73',
        },
        // Glassmorphism surfaces (maps to CSS vars)
        surface: {
          0: 'rgba(255,255,255,0.02)',
          1: 'rgba(255,255,255,0.04)',
          2: 'rgba(255,255,255,0.07)',
          3: 'rgba(255,255,255,0.10)',
        },
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'var(--font-sans)', 'sans-serif'],
        body:    ['Inter', 'var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(42px, 7vw, 88px)',  { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'section': ['clamp(32px, 4.5vw, 52px)',{ lineHeight: '1.1',  letterSpacing: '-0.03em' }],
        'card':    ['clamp(18px, 2vw, 22px)',  { lineHeight: '1.3',  letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '4px',
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'scroll':     'scrollAnim 2s ease infinite',
        'shimmer':    'shimmer 1.5s infinite',
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':  'spin 8s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
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
          '50%':      { opacity: '1',   transform: 'scaleY(1.2) translateY(6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,113,227,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(0,113,227,0.5)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #06060A 0%, #06060A 100%)',
        'cta-gradient':  'linear-gradient(170deg, #06060A 0%, #06060A 100%)',
        'blue-glow':     'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(0,113,227,0.18) 0%, transparent 70%)',
        'mesh-gradient': `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,113,227,0.12) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 85% 50%, rgba(96,165,250,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 10% 80%, rgba(0,113,227,0.06) 0%, transparent 60%)
        `,
        'card-glow':     'radial-gradient(circle at 50% 0%, rgba(0,113,227,0.1) 0%, transparent 60%)',
        'brand-gradient':'linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #0071E3 100%)',
      },
      boxShadow: {
        'brand-sm': '0 0 20px rgba(0,113,227,0.15)',
        'brand':    '0 0 40px rgba(0,113,227,0.25)',
        'brand-lg': '0 0 60px rgba(0,113,227,0.35)',
        'glass':    '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glass-lg': '0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card':     '0 4px 32px rgba(0,0,0,0.4)',
        'card-hover':'0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
      },
      transitionTimingFunction: {
        'apple':     'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring':    'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo':'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
    },
  },
  plugins: [],
}

export default config
