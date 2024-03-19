module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'no-relative-import-paths',
    'unused-imports'
  ],
  ignorePatterns: ['*.js', '*.json'],
  extends: [
    'plugin:prettier/recommended',
    'next',
    'turbo',
  ],
  rules: {
    'jsx-quotes': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/no-img-element': 'off', // temporarily disable that warning
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-relative-import-paths/no-relative-import-paths': [
      'warn',
      { allowSameFolder: true },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
