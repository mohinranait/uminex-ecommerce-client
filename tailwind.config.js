/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container : {
        center : true,
      },
      fontFamily : {
        primary : ['Bai Jamjuree', 'sans-serif'],
      },
      colors : {
        primary : "#2B38D1",
        secondary : "#DD3842",
        'text-color' : "#212529",
        "mute" : "#999999",
      }
    },
  },
  plugins: [],
}

