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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': ['off'],
  },
}
