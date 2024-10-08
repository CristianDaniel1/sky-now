/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0c4a6e',
        secundary: '#fff',
        tertiary: '#f3f4f6',
        'color-slate': '#f8fafc',
      },

      gridTemplateColumns: {
        hourly: 'repeat(8, minmax(10rem, 1fr))',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
