import js from "@eslint/js";
import * as tseslint from "@typescript-eslint/eslint-plugin";
import * as parser from "@typescript-eslint/parser";
import * as vueeslint from "eslint-plugin-vue";
import globals from "globals";

export default [
  {
    ignores: [
      "dist/**",
      "dist-demo/**",
      "node_modules/**",
      "coverage/**",
      "*.config.js",
      "*.config.ts",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...tseslint.configs["recommended"].rules,
    },
  },
  {
    files: ["**/*.vue"],
    plugins: {
      vue: vueeslint,
    },
    processor: vueeslint.processors[".vue"],
    languageOptions: {
      parser: vueeslint.parser,
      parserOptions: {
        parser: parser,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      ...vueeslint.configs["vue3-recommended"].rules,
      "vue/html-indent": ["error", 2],
      "vue/script-indent": ["error", 2, { baseIndent: 0 }],
      "vue/multi-word-component-names": "off",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
];
