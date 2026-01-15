/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cold Case Archives - Investigative Documentary Aesthetic
        'slate': {
          'void': '#080a0f',        // Deepest darkness
          'base': '#0f1219',        // Primary background - cooler than noir
          'surface': '#1a1f2e',     // Cards, elevated surfaces
          'elevated': '#252b3d',    // Modals, dropdowns
          'border': '#3a4256',      // Subtle borders
        },
        'crimson': {
          'deep': '#4a1520',        // Darkest crimson
          'muted': '#6b2535',       // Subtle crimson
          'DEFAULT': '#9b2335',     // Evidence crimson - primary accent
          'bright': '#c92d43',      // Hover states
        },
        'ice': {
          'dim': '#5a6275',         // Tertiary text
          'muted': '#8b929e',       // Secondary text
          'DEFAULT': '#c4cad6',     // Body text
          'bright': '#f2f4f7',      // Primary text - cool white
        },
        'steel': {
          'dark': '#2d3344',
          'DEFAULT': '#4a5268',
          'light': '#6b7489',
        },
        // Compatibility aliases for existing components
        'noir': {
          'void': '#080a0f',
          'base': '#0f1219',
          'surface': '#1a1f2e',
          'elevated': '#252b3d',
          'border': '#3a4256',
        },
        'amber': {
          'muted': '#6b2535',
          'DEFAULT': '#9b2335',
          'bright': '#c92d43',
          'pale': '#f2f4f7',
        },
        'oxide': {
          'deep': '#4a1520',
          'DEFAULT': '#6b2535',
          'bright': '#9b2335',
        },
        'paper': {
          'aged': '#f2f4f7',
          'muted': '#8b929e',
          'dim': '#5a6275',
        },
        // FD color scheme aliases
        'fd': {
          'bg': '#0f1219',
          'card': '#1a1f2e',
          'dark': '#080a0f',
          'text': '#f2f4f7',
          'muted': '#8b929e',
          'primary': '#9b2335',
          'accent': '#c92d43',
          'warning': '#d97706',    // Amber warning color
        },
      },
      fontFamily: {
        'display': ['"Libre Baskerville"', 'Georgia', 'serif'],
        'body': ['"Lora"', 'Georgia', 'serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
        'sans': ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'vignette': 'radial-gradient(ellipse at center, transparent 0%, rgba(8,10,15,0.5) 100%)',
      },
      boxShadow: {
        'archive': '0 4px 20px -2px rgba(0, 0, 0, 0.6)',
        'archive-lg': '0 10px 40px -4px rgba(0, 0, 0, 0.7)',
        'crimson-glow': '0 0 20px -4px rgba(155, 35, 53, 0.3)',
        'inner-dark': 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
        // Compatibility
        'noir': '0 4px 20px -2px rgba(0, 0, 0, 0.6)',
        'noir-lg': '0 10px 40px -4px rgba(0, 0, 0, 0.7)',
        'amber-glow': '0 0 20px -4px rgba(155, 35, 53, 0.3)',
      },
      animation: {
        'typewriter': 'typewriter 2s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'reveal': 'reveal 0.8s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateX(-10px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        reveal: {
          'from': { clipPath: 'inset(0 100% 0 0)' },
          'to': { clipPath: 'inset(0 0 0 0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
