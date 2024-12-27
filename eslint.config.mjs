import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: [
      '**/*.ts'
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],

      quotes: ['warn', 'single', {
        avoidEscape: true,
        allowTemplateLiterals: true,
      }],

      semi: ['warn', 'never'],
    },
  }
)