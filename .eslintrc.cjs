/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: false,
        ignoreWhenEmpty: true
      }
    ],
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: true,
        ignoreWhenNoAttributes: true
      }
    ],
    'vue/singleline-vue-comment': [
      'error',
      {
        markers: ['/']
      }
    ],
    'vue/multiline-vue-comment': [
      'error',
      {
        markers: ['/']
      }
    ]
    // Add any other rules you need
  }
}
