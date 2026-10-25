import { Icon } from '@/components/ui/Icon'
import { LazyImage } from '@/components/ui/LazyImage'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

/** 课程项目卡片：封面懒加载，链接区统一新标签打开 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent-to/30 hover:shadow-[0_20px_60px_-30px_var(--color-accent-from)]">
      <LazyImage
        src={project.cover}
        alt={project.coverAlt}
        priority={false}
        className="transition duration-500 group-hover:scale-[1.03]"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs text-faint">
          <span>{project.year}</span>
          {project.featured && (
            <span className="rounded-full border border-accent-to/30 bg-accent-to/10 px-2 py-0.5 text-accent-to">
              重点项目
            </span>
          )}
        </div>

        <h3 className="mt-3 text-lg font-medium text-fg">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-4 border-t border-line pt-4 text-sm">
          {project.links.map((link) => {
            const external = link.href.startsWith('http')
            return (
              <a
                key={link.label}
                href={link.href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex items-center gap-1.5 text-muted transition hover:text-accent-to focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-to/60"
              >
                {link.label}
                <Icon name="external" className="h-3.5 w-3.5" />
              </a>
            )
          })}
        </div>
      </div>
    </article>
  )
}
