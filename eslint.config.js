import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import { error } from "console";
export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      perfectionist,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React rules
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // ES6+ rules
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],
      quotes: ["error", "double"],

      // Perfectionist rules for sorting
      "perfectionist/sort-jsx-props": "error",
      "perfectionist/sort-imports": "error",
      "perfectionist/sort-named-imports": "error",
      "perfectionist/sort-modules": "error",

      // Code style rules
      camelcase: ["error", { properties: "never" }],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-in-parens": ["error", "never"],
      semi: ["error", "always"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-const-assign": "error",
      "no-duplicate-imports": "error",
      "function-paren-newline": ["error", "consistent"],
      "generator-star-spacing": ["error", { before: false, after: true }],
      "implicit-arrow-linebreak": ["error", "beside"],
      "spaced-comment": [
        "error",
        "always",
        { exceptions: ["-", "+"], markers: ["/"] },
      ],

      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      // Additional rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "multi-line"],
    },
  }
);
