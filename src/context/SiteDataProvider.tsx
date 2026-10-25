import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { defaultSiteData } from '@/data'
import { clearSiteData, loadSiteData, saveSiteData } from '@/lib/storage'
import type { SiteData } from '@/types'
import { SiteDataContext } from './siteData'
import type { SiteDataContextValue } from './siteData'

/** 全局内容状态：默认值来自 src/data，浏览器编辑结果优先 */
export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => loadSiteData(defaultSiteData))

  useEffect(() => {
    saveSiteData(data)
  }, [data])

  const value = useMemo<SiteDataContextValue>(
    () => ({
      data,
      setSiteData: setData,
      resetSiteData: () => {
        clearSiteData()
        setData(defaultSiteData)
      },
    }),
    [data],
  )

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  )
}
