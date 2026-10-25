import { projects } from '@/data'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'

/** 课程项目：卡片网格，移动端单列 */
export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="PROJECTS"
            title="课程项目"
            description="选取课程实训中完整走完「提出问题 — 处理数据 — 输出结论」流程的代表项目。"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={(index % 3) * 0.08}
              className="h-full"
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
