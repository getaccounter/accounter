const colors = require("tailwindcss/colors");
module.exports = {
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {
      border: ['last'],
    }
  },
};
