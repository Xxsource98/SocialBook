module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '425px',
      'sm': '560px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      transitionTimingFunction: {
        'normal': 'cubic-bezier(.26,.1,.26,1)'
      },
      transitionDelay: {
        '0': '0ms',
      }
    },
  },
  plugins: [],
}
