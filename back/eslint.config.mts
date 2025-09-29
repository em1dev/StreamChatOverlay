import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';


export default defineConfig([
  { 
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], 
    plugins: { 
      js,
      '@stylistic': stylistic
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      '@stylistic/indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      '@typescript-eslint/no-empty-object-type': 'off'
    },
  },
  tseslint.configs.recommended,
]);
