import { defineConfig, globalIgnores, } from 'eslint/config';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';

import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import reactRefresh from 'eslint-plugin-react-refresh';
import js from '@eslint/js';

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([{
  languageOptions: {
    globals: {
      ...globals.browser,
    },

    parser: tsParser,
  },

  extends: fixupConfigRules(compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  )),

  plugins: {
    'react-refresh': reactRefresh,
  },

  rules: {
    'react-refresh/only-export-components': ['warn', {
      allowConstantExport: true,
    }],

    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    '@typescript-eslint/no-empty-object-type': 'off'
  },
}, globalIgnores(['**/dist', '**/.eslintrc.cjs'])]);
