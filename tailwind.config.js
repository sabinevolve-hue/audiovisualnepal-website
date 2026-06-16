/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Layout
    'flex','inline-flex','grid','block','inline-block','hidden',
    'flex-col','flex-row','flex-wrap','items-center','items-start','items-end',
    'justify-center','justify-between','justify-start','justify-end',
    'gap-1','gap-2','gap-3','gap-4','gap-5','gap-6','gap-7','gap-8',
    // Position
    'fixed','relative','absolute','sticky',
    'top-0','left-0','right-0','bottom-0','inset-0',
    'z-50','z-40','z-30','z-10',
    // Sizing
    'w-full','w-px','h-full','h-screen','h-px','min-h-screen',
    'max-w-full',
    // Spacing
    'p-0','p-1','p-2','p-3','p-4','p-5','p-6','px-6','py-4','px-8','py-8',
    'mt-0','mt-1','mt-2','mb-0','mb-1','mb-2','mb-4','mb-6','mb-8','mb-12',
    'mx-auto',
    // Typography
    'text-white','text-black','text-center','text-left','text-right',
    'font-bold','font-semibold','font-medium','font-extrabold',
    'text-sm','text-base','text-lg','text-xl','text-2xl',
    'leading-relaxed','tracking-tight','uppercase',
    'opacity-0','opacity-100',
    // Colors
    'bg-white','bg-black','bg-transparent',
    'border','border-t','border-b','border-white','border-black',
    'border-white/20','border-black/[0.06]','border-black/[0.08]',
    // Display + Responsive
    'lg:flex','lg:hidden','sm:block','hidden',
    // Transitions
    'transition-all','duration-200','duration-300',
    'hover:scale-[1.02]','active:scale-[0.98]',
    'translate-x-1/2','-translate-x-1/2',
    // Backdrop
    'backdrop-blur-md',
    // Rounded
    'rounded-full','rounded-xl','rounded-2xl',
    // Shadow
    'shadow-sm','shadow-2xl',
    // Overflow
    'overflow-hidden',
    // List
    'list-none',
    // Shrink
    'shrink-0',
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
