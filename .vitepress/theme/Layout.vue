<script setup lang="ts">
import { useData } from 'vitepress'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomePage from './components/HomePage.vue'
import type { HomeSectionId } from './navigation.ts'
import { homeNavigation } from './navigation.ts'
import { onMounted, ref } from 'vue'
import { watch } from 'vue'

onMounted(updateActiveSection)

const { frontmatter } = useData()

const mainRef = ref<HTMLElement | null>(null)
const activeSectionId = ref<HomeSectionId | null>(null)

function handleNavigate(id: HomeSectionId) {
  const main = mainRef.value

  if (!main) return

  const target = main.querySelector<HTMLElement>(`#${id}`)

  if (!target) return

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function updateActiveSection() {
  if (frontmatter.value.home !== true) {
    activeSectionId.value = null
    return
  }

  const main = mainRef.value

  if (!main) return

  const mainRect = main.getBoundingClientRect()
  const middleY = mainRect.top + main.clientTop + main.clientHeight / 2

  for (const item of homeNavigation) {
    const section = main.querySelector<HTMLElement>(`#${item.id}`)

    if (!section) continue

    const sectionRect = section.getBoundingClientRect()

    if (sectionRect.top <= middleY && middleY < sectionRect.bottom) {
      activeSectionId.value = item.id
      return
    }
  }
  activeSectionId.value = null
}

watch(() => frontmatter.value.home === true, updateActiveSection, { flush: 'post' })
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
    >
      <HomePage v-if="frontmatter.home" />

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
