/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBgFaded: "#1B2231", // Adjust opacity as needed
      },
      boxShadow: {
        neon: '0 0 10px 5px #1A2331', // Adjust shadow color and size as needed
      },
    },
  },
  plugins: [],
};
