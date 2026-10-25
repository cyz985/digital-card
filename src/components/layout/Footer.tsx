import { profile } from '@/data'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

const CURRENT_YEAR = new Date().getFullYear()

/** 页脚：版权年份自动计算，提供回到顶部入口 */
export function Footer() {
  const year = CURRENT_YEAR

  const handleBackToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <footer className="border-t border-line py-10">
      <Reveal>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-5 text-center text-xs text-faint md:flex-row md:justify-between md:px-8 md:text-left">
        <p>
          © {year} {profile.name} · 个人数字名片
        </p>
        <p>Built with React · TypeScript · Tailwind CSS · Framer Motion</p>
        <button
          type="button"
          onClick={handleBackToTop}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-xs text-muted transition hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60"
        >
          回到顶部
          <Icon name="arrow-up" className="h-4 w-4" />
        </button>
        </div>
      </Reveal>
    </footer>
  )
}
