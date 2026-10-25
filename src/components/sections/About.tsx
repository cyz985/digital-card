import { useSiteData } from '@/context/siteData'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'

/** 关于我：个人介绍、关键信息与量化亮点 */
export function About() {
  const profile = useSiteData().data.profile

  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="ABOUT"
            title="关于我"
            description="一名把经济学思维与数据工具结合使用的数字经济专业学生。"
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {profile.bio.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="mb-5 max-w-2xl text-sm leading-[1.9] text-muted md:text-base">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {profile.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-card border border-line bg-surface p-4"
                  >
                    <dt className="text-xs text-faint">{item.label}</dt>
                    <dd className="mt-2 text-2xl font-semibold text-fg">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-card border border-line bg-surface p-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-faint">
                Profile
              </p>
              <dl className="mt-5 space-y-4">
                {profile.meta.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-sm text-faint">{item.label}</dt>
                    <dd className="text-right text-sm text-fg">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
