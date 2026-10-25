import type { SiteData } from '@/types'
import { profile } from './profile'
import { skillGroups } from './skills'
import { projects } from './projects'
import { contact } from './contact'

export { profile } from './profile'
export { skillGroups } from './skills'
export { projects } from './projects'
export { contact } from './contact'
export { navItems } from './navigation'

/** 站点默认内容：用户未在浏览器中编辑时使用 */
export const defaultSiteData: SiteData = { profile, skillGroups, projects, contact }
