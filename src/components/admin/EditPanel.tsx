import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { defaultSiteData } from '@/data'
import { useSiteData } from '@/context/siteData'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { EASE } from '@/lib/motion'
import { downloadSiteData, parseSiteData } from '@/lib/storage'
import { cn } from '@/lib/utils'
import type { SiteData } from '@/types'
import { ContactForm } from './ContactForm'
import { ProfileDetails } from './ProfileDetails'
import { ProfileForm } from './ProfileForm'
import { ProjectsForm } from './ProjectsForm'
import { SkillsForm } from './SkillsForm'

type TabKey = 'profile' | 'skills' | 'projects' | 'contact'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'profile', label: '档案' },
  { key: 'skills', label: '技能' },
  { key: 'projects', label: '项目' },
  { key: 'contact', label: '联系方式' },
]

const ACTION_BUTTON_CLASS =
  'inline-flex min-h-11 items-center rounded-full border border-line px-3.5 text-xs text-muted transition hover:border-accent-to/40 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60'

const cloneData = (value: SiteData): SiteData =>
  JSON.parse(JSON.stringify(value)) as SiteData

/** 站内编辑面板：内容保存在浏览器 localStorage，支持导入导出与重置 */
export function EditPanel() {
  const { data, setSiteData, resetSiteData } = useSiteData()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<TabKey>('profile')
  const [draft, setDraft] = useState<SiteData>(data)
  const [message, setMessage] = useState('')
  const launcherRef = useRef<HTMLButtonElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const reduced = Boolean(useReducedMotion())

  useLockBodyScroll(open)

  // Esc 关闭面板并归还焦点
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const openPanel = () => {
    setDraft(cloneData(data))
    setMessage('')
    setOpen(true)
  }

  const closePanel = () => {
    setOpen(false)
    launcherRef.current?.focus()
  }

  const handleSave = () => {
    setSiteData(draft)
    setMessage('已保存到当前浏览器')
  }

  const handleReset = () => {
    resetSiteData()
    setDraft(cloneData(defaultSiteData))
    setMessage('已恢复为默认示例内容')
  }

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const parsed = parseSiteData(await file.text(), defaultSiteData)
    if (!parsed) {
      setMessage('导入失败：请选择本站导出的 JSON 文件')
      return
    }

    setDraft(parsed)
    setMessage(`已载入「${file.name}」，点击保存后生效`)
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={openPanel}
        aria-label="编辑网站内容"
        className="fixed bottom-5 right-5 z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs text-fg shadow-lg shadow-black/40 transition hover:border-accent-to/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60"
      >
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-gradient-to-r from-accent-from to-accent-to"
        />
        编辑内容
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="overlay"
              type="button"
              aria-label="关闭编辑面板"
              onClick={closePanel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 cursor-default bg-ink/70 backdrop-blur-sm"
            />

            <motion.aside
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="编辑网站内容"
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: 32 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: 32 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-xl flex-col border-l border-line bg-ink md:w-[34rem]"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
                <div>
                  <p className="text-sm font-medium text-fg">编辑网站内容</p>
                  <p className="text-[11px] text-faint">修改后点击保存即可生效</p>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  aria-label="关闭编辑面板"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:bg-surface-2 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60"
                >
                  ×
                </button>
              </div>

              <div
                role="tablist"
                aria-label="编辑内容分类"
                className="flex shrink-0 gap-1 overflow-x-auto border-b border-line px-4 py-2"
              >
                {TABS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={tab === item.key}
                    onClick={() => setTab(item.key)}
                    className={cn(
                      'min-h-11 shrink-0 rounded-full px-3.5 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60',
                      tab === item.key
                        ? 'bg-surface-2 text-fg'
                        : 'text-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div
                role="tabpanel"
                className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
              >
                {tab === 'profile' && (
                  <div className="space-y-6">
                    <ProfileForm
                      value={draft.profile}
                      onChange={(profile) => setDraft({ ...draft, profile })}
                    />
                    <div className="border-t border-line pt-5">
                      <ProfileDetails
                        value={draft.profile}
                        onChange={(profile) => setDraft({ ...draft, profile })}
                      />
                    </div>
                  </div>
                )}
                {tab === 'skills' && (
                  <SkillsForm
                    value={draft.skillGroups}
                    onChange={(skillGroups) => setDraft({ ...draft, skillGroups })}
                  />
                )}
                {tab === 'projects' && (
                  <ProjectsForm
                    value={draft.projects}
                    onChange={(projects) => setDraft({ ...draft, projects })}
                  />
                )}
                {tab === 'contact' && (
                  <ContactForm
                    value={draft.contact}
                    onChange={(contact) => setDraft({ ...draft, contact })}
                  />
                )}
              </div>

              <div className="shrink-0 border-t border-line px-4 py-4">
                <p aria-live="polite" className="mb-2 min-h-4 text-xs text-accent-to">
                  {message}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex min-h-11 items-center rounded-full bg-gradient-to-r from-accent-from to-accent-to px-4 text-xs font-medium text-ink transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60"
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={closePanel}
                    className={ACTION_BUTTON_CLASS}
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadSiteData(draft)}
                    className={ACTION_BUTTON_CLASS}
                  >
                    导出 JSON
                  </button>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className={ACTION_BUTTON_CLASS}
                  >
                    导入 JSON
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className={ACTION_BUTTON_CLASS}
                  >
                    恢复默认
                  </button>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-faint">
                  内容保存在当前浏览器的 localStorage；换设备或浏览器时，请先导出 JSON 再导入。
                </p>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                onChange={handleFile}
                className="sr-only"
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
