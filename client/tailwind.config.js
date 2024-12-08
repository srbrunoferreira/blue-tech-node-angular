const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      fontFamily: ['"JetBrans Mono"', ...defaultTheme.fontFamily.sans]
    },
  },
  plugins: [require('tailwindcss-font-inter')]
}
