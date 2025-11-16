/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {},
    autoprefixer: {},
    // PurgeCSS to remove unused CSS in production (saves ~12KB)
    ...(process.env.NODE_ENV === "production"
      ? {
          "@fullhuman/postcss-purgecss": {
            content: [
              "./src/app/**/*.{js,jsx,ts,tsx}",
              "./src/components/**/*.{js,jsx,ts,tsx}",
              "./src/shared/**/*.{js,jsx,ts,tsx}",
            ],
            // Safelist for dynamic classes and third-party CSS
            safelist: {
              standard: [
                /^data-/,
                /^aria-/,
                /^theme-/,
                /^dark$/,
                /^light$/,
                /swiper/,
                /toast/,
                /modal/,
                /dropdown/,
                /accordion/,
              ],
              deep: [
                /swiper/,
                /react-datepicker/,
                /react-phone-number-input/,
                /react-toastify/,
              ],
              greedy: [/data-theme/, /data-fx-ready/],
            },
            // Don't purge CSS variables and keyframes
            defaultExtractor: (content) => {
              const broadMatches =
                content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
              const innerMatches =
                content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
              return broadMatches.concat(innerMatches);
            },
          },
        }
      : {}),
  },
};

export default config;
