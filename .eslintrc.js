module.exports = {
  plugins: ['prettier', 'cypress'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:cypress/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
    mocha: true
  },
  globals: {
    chance: 'readonly'
  },
  rules: {
    'prettier/prettier': 'error'
  }
};
