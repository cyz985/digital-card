/** 社交与联系方式可用的图标名 */
export type SocialIconName =
  | 'github'
  | 'mail'
  | 'wechat'
  | 'phone'
  | 'linkedin'
  | 'link'

/** 全站图标集合 */
export type IconName =
  | SocialIconName
  | 'arrow-down'
  | 'arrow-up'
  | 'menu'
  | 'close'
  | 'copy'
  | 'check'
  | 'external'

/** 导航项，id 同时作为区块锚点 */
export interface NavItem {
  id: string
  label: string
}

/** 社交 / 外部链接 */
export interface SocialLink {
  label: string
  href: string
  icon: SocialIconName
}

/** 行动按钮 */
export interface CTA {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  external?: boolean
}

export interface ProfileMetaItem {
  label: string
  value: string
}

export interface Highlight {
  value: string
  label: string
}

/** 个人档案（Hero 与 About 共用） */
export interface Profile {
  name: string
  englishName?: string
  avatar: string
  role: string
  headline: string
  bio: string[]
  meta: ProfileMetaItem[]
  highlights: Highlight[]
  ctas: CTA[]
  socials: SocialLink[]
}

/** 技能等级：仅允许 1–5 */
export type SkillLevel = 1 | 2 | 3 | 4 | 5

export interface Skill {
  name: string
  level: SkillLevel
  note?: string
}

export interface SkillGroup {
  category: string
  description?: string
  items: Skill[]
}

export interface ProjectLink {
  label: string
  href: string
  type: 'github' | 'demo' | 'doc' | 'other'
}

/** 课程项目 */
export interface Project {
  id: string
  title: string
  description: string
  cover: string
  coverAlt: string
  tags: string[]
  year: string
  links: ProjectLink[]
  featured?: boolean
}

export interface ContactItem {
  label: string
  value: string
  href?: string
  copyable?: boolean
  icon: SocialIconName
}

export interface ContactContent {
  title: string
  description: string
  items: ContactItem[]
}

export interface SiteMeta {
  title: string
  description: string
  url: string
  locale: string
}
