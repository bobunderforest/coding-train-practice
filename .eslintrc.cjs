const esRules = {
  'no-var': 'error',
  'no-undef': 'error',
  'no-unused-vars': 'error',
  'no-unused-expressions': 'error',
  'no-param-reassign': 'error',
  'no-shadow': 'error',
  'no-else-return': 'error',
  'no-useless-escape': 'error',
  'no-return-await': 'error',
  'default-case': 'error',
  'no-fallthrough': 'error',
  'prettier/prettier': ['error', { usePrettierrc: true }],
  // 'css-modules/no-undef-class': 'warn',
}

// Typescript
const tsRules = {
  'no-undef': 'off',
  'no-shadow': 'off',
  'no-unused-vars': 'off',
  'react/jsx-no-undef': 'off',
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
}

// React
const reactRules = {
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
}

// Import
const importRules = {
  'import/no-unresolved': ['error', { ignore: ['.svg'] }],
  'import/no-dynamic-require': 'error',
  'import/no-self-import': 'error',
  'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
  'import/no-duplicates': 'error',
  'import/extensions': ['off'],
  'import/export': 'error',
  'import/newline-after-import': 'error',
  'import/first': 'error',
  'import/no-mutable-exports': 'error',
  'import/no-cycle': 'error',
  'import/order': 'off',
}

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: '2020',
    sourceType: 'module',
    project: './tsconfig.app.json',
  },
  plugins: ['react', 'react-hooks', 'react-refresh', 'prettier', 'import'],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.app.json',
      },
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    ...esRules,
    ...tsRules,
    ...reactRules,
    ...importRules,
  },
}
