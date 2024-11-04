import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
 {
   files: ['src/**/*.ts'],
   plugins: {
     '@typescript-eslint': tseslint,
     import: importPlugin,
   },
   languageOptions: {
     parser: tsparser,
     parserOptions: {
       project: [resolve(__dirname, './tsconfig.json')],
       tsconfigRootDir: __dirname,
       ecmaVersion: 2022,
       sourceType: 'module'
     }
   },
   env: {
     node: true,
     jest: true,
     es2022: true
   },
   settings: {
     'import/resolver': {
       typescript: {}
     }
   },
   rules: {
     ...js.configs.recommended.rules,
     ...tseslint.configs.recommended.rules,
     
     // TypeScript 관련 규칙
     '@typescript-eslint/interface-name-prefix': 'off',
     '@typescript-eslint/explicit-function-return-type': 'off',
     '@typescript-eslint/explicit-module-boundary-types': 'off',
     '@typescript-eslint/no-explicit-any': 'warn',
     '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

     // Import 관련 규칙
     'import/prefer-default-export': 'off',
     'import/extensions': [
       'error',
       'ignorePackages',
       {
         js: 'never',
         ts: 'never',
       }
     ],
     'import/no-extraneous-dependencies': [
       'error',
       {
         devDependencies: [
           'src/main.ts',
           '**/*.spec.ts',
           '**/*.test.ts',
           '**/*.e2e-spec.ts',
         ],
       },
     ],

     'class-methods-use-this': 'off',
     '@typescript-eslint/explicit-member-accessibility': [
       'error',
       {
         overrides: {
           constructors: 'no-public',
         },
       },
     ],

     // 기타 규칙
     'no-console': ['warn', { allow: ['warn', 'error'] }],
     'no-undef': 'error',
     'no-unused-vars': 'off',
     'no-use-before-define': 'off',
     '@typescript-eslint/no-use-before-define': ['error'],
   },
 },
];