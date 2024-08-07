/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0c4a6e',
      },
      gridTemplateColumns: {
        hourly: 'repeat(8, minmax(10rem, 1fr))',
      },
    },
  },
  plugins: [],
};
