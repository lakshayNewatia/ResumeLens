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
        // Your Website Color Scheme
        brand: {
          dark: '#0E0E0E',      // Soft black background
          blue: '#1A6AFF',      // Electric Blue
          lime: '#F6FF35',      // Vibrant Yellow-Green
          purple: '#A584FF',    // Primary Violet
          lavender: '#CEB6F9',  // Light Violet (Hover)
          gray: '#6E6E6E',      // Borders
          light: '#C2C2C2',     // Subtext
        },
        accent: '#1A6AFF',      // Mapping old "accent" to your new Blue
      },
    },
  },
  plugins: [],
}
