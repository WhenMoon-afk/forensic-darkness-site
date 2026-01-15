/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Case File Noir - Deep documentary aesthetic
        'noir': {
          'void': '#06060a',      // Deepest black
          'base': '#0a0a0c',      // Primary background
          'surface': '#12121a',   // Cards, elevated surfaces
          'elevated': '#1a1a24',  // Modals, dropdowns
          'border': '#2a2a36',    // Subtle borders
        },
        'amber': {
          'muted': '#8b7355',     // Subtle amber
          'DEFAULT': '#c9a227',   // Evidence amber - primary accent
          'bright': '#e4b82d',    // Hover states
          'pale': '#f5e6c4',      // Highlighted text
        },
        'oxide': {
          'deep': '#3d1f1f',      // Darkest red
          'DEFAULT': '#6b2d2d',   // Blood oxide - danger/warnings
          'bright': '#8b3a3a',    // Hover states
        },
        'paper': {
          'aged': '#f5f0e8',      // Primary text - warm white
          'muted': '#a69f91',     // Secondary text
          'dim': '#6b665c',       // Tertiary text
        },
        'steel': {
          'dark': '#2d2d38',      // Dark steel
          'DEFAULT': '#4a4a5c',   // Medium steel
          'light': '#6e6e82',     // Light steel
        },
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'body': ['"Source Serif 4"', 'Georgia', 'serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'sans': ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'vignette': 'radial-gradient(ellipse at center, transparent 0%, rgba(6,6,10,0.4) 100%)',
      },
      boxShadow: {
        'noir': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'noir-lg': '0 10px 40px -4px rgba(0, 0, 0, 0.6)',
        'amber-glow': '0 0 20px -4px rgba(201, 162, 39, 0.3)',
        'inner-dark': 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'typewriter': 'typewriter 2s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'reveal': 'reveal 0.8s ease-out forwards',
        'flicker': 'flicker 0.15s ease-in-out',
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
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
