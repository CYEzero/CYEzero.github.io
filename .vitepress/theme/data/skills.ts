export type SkillsId = 'Python' | 'Web' | 'StayTuned'

export interface SkillsItem {
  id: SkillsId
  label: string
  technologies: string[] | null
  description: string
}

export const skills: SkillsItem[] = [
  {
    id: 'Python',
    label: 'Python',
    technologies: ['Flask', 'Django', 'Numpy', 'Matplotlib'],
    description:
      '做过功能较为完整的个人博客，但只恨财力不足，已经删库跑路了。最近没有什么开发点子，数据分析，算法，都写点。',
  },
  {
    id: 'Web',
    label: 'Web',
    technologies: ['Vite', 'Vue3', 'HTML', 'Javascript', 'Typescript', 'CSS'],
    description:
      '交互逻辑倒还好，但页面视觉设计和繁琐的样式是真的要命。好在已经被AI大人一脚踢死了。当然本页面是我自己写的，最后一舞罢了。',
  },
  {
    id: 'StayTuned',
    label: '敬请期待……',
    technologies: null,
    description: '正在学C和CAD设计……爱好很多，谈不上技能，敬请期待新的上线——',
  },
]
