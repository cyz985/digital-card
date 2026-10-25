import type { SkillGroup, SkillLevel } from '@/types'
import {
  ADD_BUTTON_CLASS,
  RemoveButton,
  SelectField,
  TextField,
} from './Field'

const LEVEL_OPTIONS = [1, 2, 3, 4, 5].map((level) => ({
  value: String(level),
  label: `${level} 级`,
}))

interface SkillsFormProps {
  value: SkillGroup[]
  onChange: (next: SkillGroup[]) => void
}

/** 编辑技能分组与熟练度，可增删分组和技能项 */
export function SkillsForm({ value, onChange }: SkillsFormProps) {
  const updateGroup = (index: number, patch: Partial<SkillGroup>) => {
    onChange(value.map((group, i) => (i === index ? { ...group, ...patch } : group)))
  }

  return (
    <div className="space-y-4">
      {value.map((group, index) => (
        <div
          key={index}
          className="rounded-card border border-line bg-surface p-4"
        >
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <TextField
                label="技能分类"
                value={group.category}
                onChange={(category) => updateGroup(index, { category })}
              />
            </div>
            <RemoveButton
              label={`删除技能分类 ${group.category}`}
              onClick={() => onChange(value.filter((_, i) => i !== index))}
            />
          </div>

          <div className="mt-3">
            <TextField
              label="分类说明"
              value={group.description ?? ''}
              onChange={(description) => updateGroup(index, { description })}
            />
          </div>

          <div className="mt-3 space-y-2">
            {group.items.map((skill, itemIndex) => (
              <div key={itemIndex} className="flex items-end gap-2">
                <div className="grid flex-1 gap-2 sm:grid-cols-[1fr_8rem]">
                  <TextField
                    label="技能名称"
                    value={skill.name}
                    onChange={(name) =>
                      updateGroup(index, {
                        items: group.items.map((item, i) =>
                          i === itemIndex ? { ...item, name } : item,
                        ),
                      })
                    }
                  />
                  <SelectField
                    label="熟练度"
                    value={String(skill.level)}
                    options={LEVEL_OPTIONS}
                    onChange={(level) =>
                      updateGroup(index, {
                        items: group.items.map((item, i) =>
                          i === itemIndex
                            ? { ...item, level: Number(level) as SkillLevel }
                            : item,
                        ),
                      })
                    }
                  />
                </div>
                <RemoveButton
                  label={`删除技能 ${skill.name}`}
                  onClick={() =>
                    updateGroup(index, {
                      items: group.items.filter((_, i) => i !== itemIndex),
                    })
                  }
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className={ADD_BUTTON_CLASS}
            onClick={() =>
              updateGroup(index, {
                items: [...group.items, { name: '新技能', level: 3 }],
              })
            }
          >
            + 添加技能项
          </button>
        </div>
      ))}

      <button
        type="button"
        className={ADD_BUTTON_CLASS}
        onClick={() =>
          onChange([
            ...value,
            { category: '新技能分类', description: '', items: [] },
          ])
        }
      >
        + 添加技能分类
      </button>
    </div>
  )
}
