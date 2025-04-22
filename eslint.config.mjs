import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier/recommended'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ['node_modules', 'dist'],

  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },

  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    reactHooks.configs['recommended-latest'],
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    prettier,
    reactRefresh.configs.vite,
  ],

  plugins: {
    react,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    /**
     * Prettier
     */
    'prettier/prettier': ['error', { usePrettierrc: true }],

    /**
     * ESLint
     */
    'no-var': 'error',
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'no-unused-expressions': 'error',
    'no-param-reassign': 'error',
    'no-shadow': 'error',
    'no-else-return': 'error',
    'no-useless-escape': 'error',
    'no-return-await': 'error',
    'no-fallthrough': 'error',
    'default-case': 'error',

    /**
     * React
     */
    'react/jsx-no-undef': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-children-prop': 'off',
    'react/self-closing-comp': 'error',
    'react/no-unused-prop-types': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      // { additionalHooks: '(useLifecycledEffect|useMyOtherCustomHook)' },
    ],

    /**
     * Typescript
     */
    'no-undef': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'react/jsx-no-undef': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',

    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as' },
    ],
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    // '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/require-await': 'error',

  },
})
