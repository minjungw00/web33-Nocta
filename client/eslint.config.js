import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: [resolve(__dirname, './tsconfig.json')],
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    // globals 대신 env 사용
    env: {
      browser: true,
      es2022: true,
      node: true,
      jest: true
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {}
      }
    },
    rules: {
      // React 관련 규칙 완화
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['arrow-function', 'function-declaration'],
          unnamedComponents: 'arrow-function',
        },
      ],

      // import 관련 규칙 완화
      'import/prefer-default-export': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never'
        }
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.ts',
            '**/*.test.tsx',
            'vite.config.ts',
            '**/*.stories.tsx',
            'src/main.tsx'
          ],
        },
      ],

      // TypeScript 관련 규칙 완화
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // 기타 규칙 완화
      'no-console': 'warn',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error']
    },
  },
];