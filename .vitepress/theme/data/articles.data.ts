import { createContentLoader, type ContentData } from 'vitepress'

export interface ArticleSummary {
  url: string
  title: string
  date: string
  description: string
}

function transformArticles(pages: ContentData[]): ArticleSummary[] {
  return pages
    .filter((page) => page.frontmatter.layout === 'article')
    .map((page) => {
      const { title, date, description } = page.frontmatter

      if (
        typeof title !== 'string' ||
        typeof date !== 'string' ||
        typeof description !== 'string'
      ) {
        throw new Error(`文章 ${page.url} 的 frontmatter 字段缺失或类型错误。`)
      }

      return {
        url: page.url,
        title,
        date,
        description,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date)) // 按日期降序排序
}

export default createContentLoader<ArticleSummary[]>('articles/*.md', {
  transform: transformArticles,
})

declare const data: ArticleSummary[]
export { data }
