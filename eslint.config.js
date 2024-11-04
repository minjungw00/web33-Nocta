import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 공통 ignores 설정
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },

  // 클라이언트 소스 파일
  {
    files: ['client/src/**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: resolve(__dirname, './client/tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    // ... 나머지 설정
  },

  // 클라이언트 설정 파일 (vite.config.ts)
  {
    files: ['client/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: [
          resolve(__dirname, './client/tsconfig.json'),
          resolve(__dirname, './client/tsconfig.app.json'),
        ],
        ecmaFeatures: {
          jsx: true,
        },
        tsconfigRootDir: __dirname,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
  },

  // 서버 소스 파일
  {
    files: ['server/src/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: resolve(__dirname, './server/tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        // Jest globals
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
        jest: true,
        // Node.js globals
        process: true,
        module: true,
        require: true,
        __dirname: true,
        __filename: true,
      },
    },
    // ... 나머지 설정
  },

  // 서버 테스트 파일
  {
    files: ['server/test/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: resolve(__dirname, './server/tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        // Jest globals
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
        jest: true,
      },
    },
  },
];
