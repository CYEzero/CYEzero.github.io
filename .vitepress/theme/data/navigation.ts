export type HomeSectionId = 'home' | 'about' | 'skills' | 'articles'

export interface NavigationItem {
  id: HomeSectionId
  label: string
}

export const homeNavigation: NavigationItem[] = [
  { id: 'home', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'skills', label: '技能' },
  { id: 'articles', label: '文章' },
]
