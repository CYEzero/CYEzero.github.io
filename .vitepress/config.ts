import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '青之殿堂',
  description: 'Self Page',

  srcExclude: ['README.md'],

  vite: {
    configFile: false,
    plugins: [UnoCSS()],
  },
})
