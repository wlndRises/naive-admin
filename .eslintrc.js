module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-var': 'error',
    'vue/multi-word-component-names': ['off'],
  },
}
