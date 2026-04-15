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
        brand: {
          dark: '#000000',      // pure black (from your palette)
          blue: '#A584FF',      // use your violet as primary accent
          lime: '#F6FF35',      // neon yellow-green
          purple: '#CEB6F9',    // soft lavender
          lavender: '#EFE7FD',  // very light lavender bg
          gray: '#6E6E6E',      // borders
          light: '#C2C2C2',     // subtext
        },
        accent: '#A584FF',      // match primary accent
      },
    },
  },
  plugins: [],
}
