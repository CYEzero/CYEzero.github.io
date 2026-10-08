import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import prettier from 'eslint-config-prettier/flat'

export default defineConfig([
  globalIgnores(['**/node_modules/**', '**/dist/**', '.vitepress/cache/**', '**/*.d.ts']),

  {
    files: ['**/*.{js,mjs,ts,vue}'],
    extends: [js.configs.recommended],
  },

  {
    files: ['**/*.{ts,vue}'],
    extends: [tseslint.configs.recommended],
  },

  {
    files: ['**/*.vue'],
    extends: [pluginVue.configs['flat/recommended']],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': ['error', { ignores: ['Layout'] }],
    },
  },

  {
    files: ['.vitepress/theme/**/*.{ts,vue}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  {
    files: ['*.{js,mjs,ts}', '.vitepress/config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },

  prettier,
])
