import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
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
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "perfectionist/sort-imports": "error",
      quotes: ["error", "double"],
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "perfectionist/sort-jsx-props": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          ignoreCase: true,
          specialCharacters: "keep",
          ignorePattern: [],
          partitionByNewLine: false,
          newlinesBetween: "ignore",
          groups: [],
          customGroups: {},
        },
      ],
    },
    "perfectionist/sort-interfaces": [
      "error",
      {
        type: "alphabetical",
        order: "asc",
        ignoreCase: true,
        specialCharacters: "keep",
        ignorePattern: [],
        partitionByComment: false,
        partitionByNewLine: false,
        newlinesBetween: "ignore",
        groupKind: "mixed",
        groups: [],
        customGroups: [],
      },
    ],
  }
);
