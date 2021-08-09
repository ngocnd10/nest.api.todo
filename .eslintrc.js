module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'sort-destructure-keys'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs'],
    curly: ['error', 'all'],
    'object-shorthand': ['warn', 'always'],
    'prefer-destructuring': [
      'warn',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/prefer-optional-chain': ['error'],
    quotes: 'off',
    '@typescript-eslint/quotes': ['warn', 'single', { allowTemplateLiterals: true }],
    'sort-destructure-keys/sort-destructure-keys': [1, { caseSensitive: false }],
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    eqeqeq: "error"
  },
};
