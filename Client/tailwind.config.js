/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        accent: '#A584FF',           // Main Purple Accent
        'accent-soft': '#CEB6F9',    // Softer Purple
        'accent-yellow': '#E6EE24',  // Kept as backup
        light: '#F0F0F0',
        muted: '#6E6E6E',
        'muted-light': '#A5A5A5',
        border: '#E0E0E0',
        surface: '#F8F9FA',
      },
    },
  },
  plugins: [],
}
