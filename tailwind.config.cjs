/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'fd-dark': '#0f0f23',
        'fd-card': '#1a1a3e',
        'fd-primary': '#3b82f6',
        'fd-accent': '#8b5cf6',
        'fd-text': '#e2e8f0',
        'fd-muted': '#94a3b8',
        'fd-danger': '#ef4444',
        'fd-warning': '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Libre Franklin', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
