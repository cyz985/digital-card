import { cn } from '@/lib/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionTitleProps) {
  const centered = align === 'center'

  return (
    <div className={cn('max-w-2xl', centered && 'mx-auto text-center')}>
      {eyebrow && (
        <p
          className={cn(
            'mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-accent-to',
            centered && 'justify-center',
          )}
        >
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-r from-accent-from to-accent-to"
          />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
      )}
    </div>
  )
}
