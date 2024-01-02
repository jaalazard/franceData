/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jost': ['Jost', 'arial'],
      },
      colors: {
        'primary' : '#AF9B46',
        'secondary' : '#F7B05B',
        'light' : '#EEE9D3',
        'dark' : '#1D1A0C',
      }
    },
  },
  plugins: [],
}