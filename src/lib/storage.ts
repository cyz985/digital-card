import type {
  ContactContent,
  Profile,
  Project,
  SkillGroup,
  SiteData,
} from '@/types'

const STORAGE_KEY = 'digital-card:site-data:v1'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function mergeSiteData(defaults: SiteData, value: unknown): SiteData | null {
  if (!isRecord(value) || !isRecord(value.profile) || !isRecord(value.contact)) {
    return null
  }
  if (!Array.isArray(value.projects) || !Array.isArray(value.skillGroups)) {
    return null
  }

  return {
    profile: { ...defaults.profile, ...(value.profile as Partial<Profile>) },
    contact: { ...defaults.contact, ...(value.contact as Partial<ContactContent>) },
    projects: value.projects as Project[],
    skillGroups: value.skillGroups as SkillGroup[],
  }
}

/** 读取浏览器中已保存的内容，没有或格式异常时回退到默认数据 */
export function loadSiteData(defaults: SiteData): SiteData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    return mergeSiteData(defaults, JSON.parse(raw) as unknown) ?? defaults
  } catch {
    return defaults
  }
}

export function saveSiteData(data: SiteData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* 隐私模式等写入受限场景下静默失败 */
  }
}

export function clearSiteData() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* 同上 */
  }
}

/** 校验导入的 JSON，结构合法才返回数据 */
export function parseSiteData(text: string, defaults: SiteData): SiteData | null {
  try {
    return mergeSiteData(defaults, JSON.parse(text) as unknown)
  } catch {
    return null
  }
}

/** 导出为 JSON 文件，便于备份或迁移到其他设备 */
export function downloadSiteData(data: SiteData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'digital-card-data.json'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
