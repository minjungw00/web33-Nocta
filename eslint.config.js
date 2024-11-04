import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      'prettier': prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsparser,
      globals: {
        document: true,
        window: true,
        navigator: true,
        localStorage: true,
        setTimeout: true,
        console: true,
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];