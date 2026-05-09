// eslint.config.js
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // TypeScript-specific
      "@typescript-eslint/no-explicit-any": "warn", // nudges you away from defeating TS
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "off", // too noisy to require everywhere
      "@typescript-eslint/no-floating-promises": "error", // catches unawaited async calls

      // General
      "no-console": "warn",
      eqeqeq: "error",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
];
