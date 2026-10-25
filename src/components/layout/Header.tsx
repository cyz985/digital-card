import { useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems, profile } from '@/data'
import { Icon } from '@/components/ui/Icon'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'

/** 固定顶部导航：滚动样式切换、当前区块高亮、移动端抽屉菜单 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const scrolled = useScrolled(8)
  const sectionIds = useMemo(() => navItems.map((item) => item.id), [])
  const active = useScrollSpy(sectionIds)

  useLockBodyScroll(menuOpen)

  // Esc 关闭移动端菜单并归还焦点
  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // 视口切换到桌面端时自动收起菜单，避免残留滚动锁定
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const handleChange = () => {
      if (query.matches) setMenuOpen(false)
    }

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    setMenuOpen(false)

    // 等待菜单关闭、滚动锁释放后再滚动到目标区块
    window.setTimeout(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }, 60)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled || menuOpen
          ? 'border-line bg-ink/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, 'home')}
          className="inline-flex items-center gap-2.5 text-sm font-medium tracking-wide text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-from to-accent-to text-xs font-semibold text-ink"
          >
            {profile.name.slice(0, 1)}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav aria-label="主导航" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => handleNavClick(event, item.id)}
              aria-current={active === item.id ? 'true' : undefined}
              className={cn(
                'relative rounded-full px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60',
                active === item.id ? 'text-fg' : 'text-muted hover:text-fg',
              )}
            >
              {item.label}
              {active === item.id && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-accent-from to-accent-to"
                />
              )}
            </a>
          ))}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60 md:hidden"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <nav
              aria-label="移动端导航"
              className="mx-auto w-full max-w-6xl px-5 py-4"
            >
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => handleNavClick(event, item.id)}
                      aria-current={active === item.id ? 'true' : undefined}
                      className={cn(
                        'flex min-h-11 items-center justify-between rounded-lg px-3 text-sm transition',
                        active === item.id
                          ? 'bg-surface text-fg'
                          : 'text-muted hover:text-fg',
                      )}
                    >
                      {item.label}
                      <Icon
                        name="arrow-down"
                        className="h-4 w-4 -rotate-90 text-faint"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
