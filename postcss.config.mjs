/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {},
    autoprefixer: {},
    // PurgeCSS temporarily disabled to fix Vercel deployment
    // Will re-enable once deployment is stable
    // ...(process.env.NODE_ENV === "production"
    //   ? {
    //       "@fullhuman/postcss-purgecss": {
    //         content: [
    //           "./src/app/**/*.{js,jsx,ts,tsx}",
    //           "./src/components/**/*.{js,jsx,ts,tsx}",
    //           "./src/shared/**/*.{js,jsx,ts,tsx}",
    //         ],
    //         safelist: {
    //           standard: [
    //             /^data-/,
    //             /^aria-/,
    //             /^theme-/,
    //             /^dark$/,
    //             /^light$/,
    //             /swiper/,
    //             /toast/,
    //             /modal/,
    //             /dropdown/,
    //             /accordion/,
    //           ],
    //           deep: [
    //             /swiper/,
    //             /react-datepicker/,
    //             /react-phone-number-input/,
    //             /react-toastify/,
    //           ],
    //           greedy: [/data-theme/, /data-fx-ready/],
    //         },
    //         defaultExtractor: (content) => {
    //           const broadMatches =
    //             content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    //           const innerMatches =
    //             content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    //           return broadMatches.concat(innerMatches);
    //         },
    //       },
    //     }
    //   : {}),
  },
};

export default config;
