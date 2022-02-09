const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      DEFAULT: "var(--brand-shadow)",
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
    extend: {
      transitionProperty: {
        border: "border",
        "background-color": "background-color",
      },
      colors: {
        orange: "var(--brand-orange)",
        blackish: "var(--brand-blackish)",
        slate: "var(--brand-slate)",
        whale: "var(--brand-whale)",
        haze: "var(--brand-haze)",
        sky: "var(--brand-sky)",
        mist: "var(--brand-mist)",
        error: "var(--form-error)",
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans],
        playfair: ['"Playfair Display"'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
