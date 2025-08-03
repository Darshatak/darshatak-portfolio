/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0e12',
        'bg-secondary': '#0f1419',
        'bg-tertiary': '#162026',
        'bg-elevated': '#1a252f',
        'bg-glass': 'rgba(22, 32, 38, 0.8)',
        'text-primary': '#ccd6f6',
        'text-secondary': '#8892b0',
        'text-muted': '#495670',
        'accent-primary': '#64ffda',
        'accent-secondary': '#7c3aed',
        'accent-tertiary': '#f59e0b',
        'border-color': '#233544',
        'border-hover': '#64ffda',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'accent': '0 0 20px rgba(100, 255, 218, 0.1)',
      },
    },
  },
  plugins: [],
};