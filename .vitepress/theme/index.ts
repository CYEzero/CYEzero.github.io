// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import 'virtual:uno.css'
import './styles/global.css'
import './styles/markdown.css'

export default {
  Layout,
} satisfies Theme
