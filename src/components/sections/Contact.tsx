import { useSiteData } from '@/context/siteData'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

/** 联系方式：支持跳转与一键复制 */
export function Contact() {
  const contact = useSiteData().data.contact
  const { copied, copy } = useCopyToClipboard()

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionTitle
              eyebrow="CONTACT"
              title={contact.title}
              description={contact.description}
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {contact.items.map((item, index) => {
              const external = item.href?.startsWith('http') ?? false
              const isCopied = copied === item.value

              return (
                <Reveal key={item.label} delay={index * 0.06} className="h-full">
                  <div className="flex h-full items-center gap-3 rounded-card border border-line bg-surface p-4 transition duration-300 hover:border-accent-to/25">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-accent-to"
                    >
                      <Icon name={item.icon} className="h-4 w-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-faint">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          {...(external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="block truncate text-sm text-fg transition hover:text-accent-to focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="truncate text-sm text-fg">{item.value}</p>
                      )}
                    </div>

                    {item.copyable && (
                      <button
                        type="button"
                        onClick={() => void copy(item.value)}
                        aria-label={`复制${item.label}`}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-faint transition hover:bg-surface-2 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60"
                      >
                        <Icon
                          name={isCopied ? 'check' : 'copy'}
                          className="h-4 w-4"
                        />
                      </button>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          {copied ? `已复制：${copied}` : ''}
        </p>
      </div>
    </section>
  )
}
