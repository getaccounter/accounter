const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addVariant, e }) => {
      addVariant('label-checked', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          const eClassName = e(`label-checked${separator}${className}`); // escape class
          const yourSelector = 'input[type="checkbox"]'; // your input selector. Could be any
          return `${yourSelector}:checked ~ .${eClassName}`; // ~ - CSS selector for siblings
        });
      });
    })
  ],
  theme: {
    extend: {
      colors: {
        rose: colors.rose
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['label-checked'],
      borderWidth: ['label-checked']
    }
  }
};
