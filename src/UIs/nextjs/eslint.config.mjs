import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "**/scripts/**",
      "audit-api-keys.js",
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "dist/**",
    ],
  },
  ...next,
  ...nextTypescript,
  ...nextCoreWebVitals,
  {
    rules: {
      // Disable strict any checking for lib files (legacy code)
      "@typescript-eslint/no-explicit-any": "off",
      // Allow anonymous default exports for config files
      "import/no-anonymous-default-export": "warn",
      // Allow unescaped entities in JSX (apostrophes)
      "react/no-unescaped-entities": "off",
      // Allow HTML links (some external links need it)
      "@next/next/no-html-link-for-pages": "warn",
      // Disable React Compiler errors (experimental feature)
      "react-hooks/unsupported-syntax": "warn",
      "react-compiler/react-compiler": "off",
    },
  },
];

export default eslintConfig;
