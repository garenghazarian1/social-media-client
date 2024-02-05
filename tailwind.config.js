/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',      // adding a new smaller breakpoint
        'sm': '640px',      // default
        'md': '768px',      // default
        'lg': '1024px',     // default
        'xl': '1280px',     // default
        '2xl': '1536px',    // default
        '3xl': '1920px',    // adding a new larger breakpoint
      },
      minWidth: {
        '600': '600px',
      },
    },
  },
  plugins: [],
}

