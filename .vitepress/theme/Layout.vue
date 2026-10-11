<script setup lang="ts">
import { useData } from 'vitepress'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import ArticlePage from './Pages/ArticlePage.vue'
import HomePage from './Pages/HomePage.vue'
import type { HomeSectionId } from './data/navigation.ts'
import { homeNavigation } from './data/navigation.ts'
import { onMounted, ref } from 'vue'
import { watch } from 'vue'

onMounted(updateActiveSection) // 确保组件挂载时更新活动部分。

const { frontmatter, page } = useData()

const mainRef = ref<HTMLElement | null>(null)
const activeSectionId = ref<HomeSectionId | null>(null) // 当前活动的部分 ID，用于导航和滚动行为。

// 函数 => 滚动页面到指定部分。
function handleNavigate(id: HomeSectionId) {
  const main = mainRef.value
  if (!main) return

  // 查找目标部分元素。
  const target = main.querySelector<HTMLElement>(`#${id}`)
  if (!target) return

  // 滚动到目标部分，使用平滑滚动效果。
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

// 函数 => 处理滚轮事件，实现滚动到下一部分或上一部分的功能。
function handleWheel(event: WheelEvent) {
  const main = mainRef.value
  if (!main || frontmatter.value.home !== true || event.ctrlKey) return
  if (window.matchMedia('(max-width: 767px)').matches) return

  // 获取当前活动部分的索引。
  const currentIndex = homeNavigation.findIndex((item) => item.id === activeSectionId.value)

  // 根据滚轮方向确定滚动方向：向下滚动为 1，向上滚动为 -1。
  const direction = event.deltaY > 0 ? 1 : -1
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

  // 阻止默认滚动行为，避免页面滚动。
  event.preventDefault()

  // 计算下一部分的索引，并获取下一部分的 ID。
  const nextIndex = currentIndex + direction
  const nextSection = homeNavigation[nextIndex]
  if (!nextSection) return

  handleNavigate(nextSection.id)
}

// 函数 => 更新当前活动部分的 ID，根据滚动位置判断当前显示的部分并高亮。
function updateActiveSection() {
  if (frontmatter.value.home !== true) {
    activeSectionId.value = null
    return
  }

  // 获取 main 元素的边界信息和中间位置。
  const main = mainRef.value
  if (!main) return

  const mainRect = main.getBoundingClientRect()
  const middleY = mainRect.top + main.clientTop + main.clientHeight / 2

  // 遍历所有导航部分，判断中间位置是否在某个部分的范围内。
  for (const item of homeNavigation) {
    const section = main.querySelector<HTMLElement>(`#${item.id}`)
    if (!section) continue

    const sectionRect = section.getBoundingClientRect()

    if (sectionRect.top <= middleY && middleY < sectionRect.bottom) {
      activeSectionId.value = item.id
      return
    }
  }
  activeSectionId.value = null // 如果没有匹配的部分，则将活动部分 ID 设置为 null。
}

// 监听 frontmatter.home 的变化，如果为 true，则更新活动部分。
watch(() => frontmatter.value.home === true, updateActiveSection, { flush: 'post' })

// 监听 page.relativePath 的变化，当页面路径变化时，文章滚动到顶部并将主页面滚回文章区。
watch(
  () => page.value.relativePath,
  () => {
    const main = mainRef.value
    if (!main) return

    main.scrollTop = 0
    handleNavigate('articles')
  },
  { flush: 'post' },
)
</script>

<template>
  <div class="site-layout">
    <SiteHeader :active-section-id="activeSectionId" @navigate="handleNavigate" />

    <main
      ref="mainRef"
      class="site-main"
      tabindex="0"
      aria-label="页面内容"
      @scroll="updateActiveSection"
      @wheel="handleWheel"
    >
      <HomePage v-if="frontmatter.home" />

      <ArticlePage v-else-if="frontmatter.layout === 'article'" />

      <div v-else class="site-container py-12">
        <Content />
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.site-layout {
  position: fixed;
  inset: 0;
  height: 100dvh;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  overflow: hidden;
}

.site-main {
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
}
</style>
