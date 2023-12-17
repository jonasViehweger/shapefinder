module.exports = {
  content: [
    './app/**/*.tsx', // Note the addition of the `app` directory.
    './components/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")({ noCompatible: true }),
  ],
};
