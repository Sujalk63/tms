/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBgLight: "#2D3C5A",               //graphic design light
        customBg: "#151D2F",                    // bg dark
        customColor: "#2B304D",                 // form light color
        customColorLight : "#3F4365",           // input lightest color
        customSideColor : "#EEAA74",            // signup yellow light
        customSideColorDark : "#D5965B",        //signup yellow dark
      },
      boxShadow: {
        neon: '0 0 10px 5px #1A2331', // Adjust shadow color and size as needed
      },
    },
  },
  plugins: [require('tailwindcss-hero-patterns')],
};
