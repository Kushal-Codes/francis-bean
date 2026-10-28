/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF7EA',
          paper: '#FFF7EA',
          warm: '#FFFCF5',
          deep: '#F8EEDF',
        },
        peach: {
          DEFAULT: '#F1C5A8',
          light: '#FCEEE6',
          soft: '#F6D5C0',
          dark: '#E0A885',
        },
        cocoa: {
          DEFAULT: '#49352D',
          dark: '#35241D',
          light: '#6E5246',
          muted: '#8C6F62',
        },
        terracotta: {
          DEFAULT: '#BB795F',
          dark: '#9F5F47',
          light: '#CE937D',
        },
        butter: {
          DEFAULT: '#F1CF82',
          light: '#F8E1A6',
          dark: '#D8B359',
        },
        seafoam: {
          DEFAULT: '#BDD6C7',
          light: '#E2EFE7',
          dark: '#98BAA4',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        hand: ['Kalam', 'Caveat', 'cursive'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'doodle': '3px 4px 0px 0px #49352D',
        'doodle-lg': '5px 6px 0px 0px #49352D',
        'doodle-hover': '1px 2px 0px 0px #49352D',
        'ticket': '0 4px 20px -2px rgba(73, 53, 45, 0.12)',
      },
      borderRadius: {
        'doodle': '255px 15px 225px 15px/15px 225px 15px 255px',
        'doodle-sm': '120px 8px 110px 8px/8px 110px 8px 120px',
      },
      animation: {
        'steam': 'steam 4s ease-in-out infinite',
        'wiggle': 'wiggle 2.5s ease-in-out infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        steam: {
          '0%, 100%': { transform: 'translateY(0) scaleX(1)', opacity: '0.4' },
          '50%': { transform: 'translateY(-8px) scaleX(1.15)', opacity: '0.85' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
      },
    },
  },
  plugins: [],
}
