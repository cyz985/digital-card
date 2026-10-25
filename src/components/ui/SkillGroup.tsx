import { cn } from '@/lib/utils'
import type { SkillGroup as SkillGroupData } from '@/types'

interface SkillGroupProps {
  group: SkillGroupData
}

const LEVELS = [1, 2, 3, 4, 5] as const

/** 技能分组卡片：用 5 段等级条表达熟练度 */
export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div className="h-full rounded-card border border-line bg-surface p-6 transition duration-300 hover:border-accent-to/25">
      <h3 className="text-lg font-medium text-fg">{group.category}</h3>
      {group.description && (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {group.description}
        </p>
      )}

      <ul className="mt-5 space-y-4">
        {group.items.map((skill) => (
          <li key={skill.name}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-fg">{skill.name}</span>
              <span className="text-xs text-faint">{skill.level} / 5</span>
            </div>
            <div
              className="mt-2 flex gap-1.5"
              role="img"
              aria-label={`${skill.name} 熟练度 ${skill.level} 分，满分 5 分`}
            >
              {LEVELS.map((level) => (
                <span
                  key={level}
                  className={cn(
                    'h-1.5 flex-1 rounded-full',
                    level <= skill.level
                      ? 'bg-gradient-to-r from-accent-from to-accent-to'
                      : 'bg-faint/25',
                  )}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
