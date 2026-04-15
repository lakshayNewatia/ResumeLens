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
          // 🔥 Core UI
          bg: '#0E0E0E',          // main background
          surface: '#161616',     // cards (optional but recommended)
          border: '#6E6E6E',

          // 📝 Text hierarchy
          text: '#FFFFFF',
          subtext: '#C2C2C2',
          muted: '#A5A5A5',

          // 🎨 Primary accents
          primary: '#A584FF',     // violet (main brand)
          primaryHover: '#CEB6F9',

          secondary: '#1A6AFF',   // blue
          highlight: '#F6FF35',   // neon lime

          // 🌿 soft backgrounds
          soft: '#EFEFEF',
          soft2: '#F3F8F0',
          lavenderBg: '#EFE7FD',
        },
      },
    },
  },
  plugins: [],
}
