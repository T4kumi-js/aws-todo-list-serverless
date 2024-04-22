module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: [
    '**.js'
  ],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    }],
  }
};
