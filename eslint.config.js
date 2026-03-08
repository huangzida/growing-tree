// @ts-check
import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['*.ts', '*.vue', 'src/**/*.ts', 'src/**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/html-indent': 'off',
      'vue/html-self-closing': 'off',
      'vue/attributes-order': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    ignores: ['dist', 'node_modules', 'CHANGELOG.md'],
  }
]
