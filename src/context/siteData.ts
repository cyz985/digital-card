import { createContext, useContext } from 'react'
import type { SiteData } from '@/types'

export interface SiteDataContextValue {
  data: SiteData
  setSiteData: (next: SiteData) => void
  resetSiteData: () => void
}

export const SiteDataContext = createContext<SiteDataContextValue | null>(null)

/** 读取全局内容状态，必须在 SiteDataProvider 内使用 */
export function useSiteData() {
  const context = useContext(SiteDataContext)
  if (!context) {
    throw new Error('useSiteData 必须在 SiteDataProvider 内使用')
  }
  return context
}
