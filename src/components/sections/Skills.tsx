import { skillGroups } from '@/data'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SkillGroup } from '@/components/ui/SkillGroup'

/** 专业技能：按类别分组展示，卡片交错入场 */
export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="SKILLS"
            title="专业技能"
            description="以数据分析为主线，覆盖数字营销、办公工具、Python 与前端基础，形成从洞察到呈现的完整链路。"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.06} className="h-full">
              <SkillGroup group={group} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
