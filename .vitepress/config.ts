import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CYEzero",
  description: "Self Page",

  srcExclude: ['README.md'],

  vite: {
    configFile: false,
    plugins: [UnoCSS()]
  }
})
