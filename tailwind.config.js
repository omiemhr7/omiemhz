/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f2b46',
          light: '#1a3a5c',
          dark: '#0a1f33',
          50: '#f0f4f8',
          100: '#dae5f0',
          200: '#b5cce0',
          300: '#8faacb',
          400: '#6b85b0',
          500: '#4a6088',
          600: '#3a4f6f',
          700: '#1a3a5c',
          800: '#0f2b46',
          900: '#0a1f33',
        },
        teal: {
          DEFAULT: '#2a9d8f',
          light: '#5db5a8',
          dark: '#1e7268',
          50: '#edfaf8',
          100: '#d4f3ef',
          200: '#abe7df',
          300: '#82dacf',
          400: '#5db5a8',
          500: '#2a9d8f',
          600: '#1e7268',
          700: '#155048',
          800: '#0d362f',
          900: '#061b17',
        },
        blue: {
          DEFAULT: '#3a6ea5',
          light: '#6b9bc8',
          dark: '#2a5378',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
