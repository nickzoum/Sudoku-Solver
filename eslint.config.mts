import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig({
  extends: [
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
  ],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    quotes: ["warn", "double"],
    "no-console": "warn",
    semi: "warn",
  },
  files: ["**/*.ts"],
  ignores: [
    "/node_modules",
    "/coverage",
    "/build",
  ],
});