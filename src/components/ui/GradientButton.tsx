import type { CTA } from '@/types'
import { cn } from '@/lib/utils'

interface GradientButtonProps {
  cta: CTA
  className?: string
}

/** 行动按钮：主按钮使用品牌渐变，次按钮使用描边 */
export function GradientButton({ cta, className }: GradientButtonProps) {
  const isExternal = cta.external ?? cta.href.startsWith('http')

  return (
    <a
      href={cta.href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60',
        cta.variant === 'primary'
          ? 'bg-gradient-to-r from-accent-from to-accent-to text-ink hover:brightness-110'
          : 'border border-line bg-surface text-fg hover:border-accent-to/40 hover:bg-surface-2',
        className,
      )}
    >
      {cta.label}
    </a>
  )
}
