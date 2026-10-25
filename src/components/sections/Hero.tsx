import { profile } from '@/data'
import { GradientButton } from '@/components/ui/GradientButton'
import { Icon } from '@/components/ui/Icon'
import { LazyImage } from '@/components/ui/LazyImage'
import { Reveal } from '@/components/ui/Reveal'

/** 首屏：身份、简介、行动入口与头像 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 md:pb-24"
    >
      {/* 柔和渐变光晕，仅作背景装饰 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-accent-from),transparent_65%)] opacity-25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[26rem] w-[26rem] translate-x-1/3 rounded-full bg-[radial-gradient(circle,var(--color-accent-to),transparent_65%)] opacity-15 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs text-muted">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent-from to-accent-to"
              />
              {profile.role}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-fg sm:text-5xl md:text-6xl">
              {profile.name}
              {profile.englishName && (
                <span className="mt-3 block text-sm font-normal uppercase tracking-[0.24em] text-faint sm:text-base">
                  {profile.englishName}
                </span>
              )}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {profile.headline}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              {profile.ctas.map((cta) => (
                <GradientButton key={cta.label} cta={cta} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <ul className="mt-8 flex flex-wrap items-center gap-3">
              {profile.socials.map((social) => {
                const external = social.href.startsWith('http')
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      {...(external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent-to/40 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60"
                    >
                      <Icon name={social.icon} className="h-4.5 w-4.5" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-accent-from/25 to-accent-to/25 blur-2xl"
          />
          <div className="relative rounded-[26px] bg-gradient-to-br from-accent-from/60 to-accent-to/60 p-px">
            <LazyImage
              src={profile.avatar}
              alt={`${profile.name}的头像`}
              aspectRatio="1 / 1"
              wrapperClassName="rounded-[25px]"
            />
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-faint transition hover:text-fg md:inline-flex"
      >
        向下探索
        <Icon name="arrow-down" className="h-4 w-4" />
      </a>
    </section>
  )
}
