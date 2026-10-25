import type { Profile } from '@/types'
import { ADD_BUTTON_CLASS, RemoveButton, TextField } from './Field'

interface ProfileDetailsProps {
  value: Profile
  onChange: (next: Profile) => void
}

/** 编辑关于我区块的关键信息与数据亮点 */
export function ProfileDetails({ value, onChange }: ProfileDetailsProps) {
  const update = (patch: Partial<Profile>) => onChange({ ...value, ...patch })

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs text-faint">关键信息（学校、专业、所在地等）</p>
        <div className="space-y-2">
          {value.meta.map((item, index) => (
            <div key={index} className="flex items-end gap-2">
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <TextField
                  label="标签"
                  value={item.label}
                  onChange={(label) =>
                    update({
                      meta: value.meta.map((row, i) =>
                        i === index ? { ...row, label } : row,
                      ),
                    })
                  }
                />
                <TextField
                  label="内容"
                  value={item.value}
                  onChange={(content) =>
                    update({
                      meta: value.meta.map((row, i) =>
                        i === index ? { ...row, value: content } : row,
                      ),
                    })
                  }
                />
              </div>
              <RemoveButton
                label={`删除关键信息 ${item.label}`}
                onClick={() =>
                  update({ meta: value.meta.filter((_, i) => i !== index) })
                }
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className={ADD_BUTTON_CLASS}
          onClick={() => update({ meta: [...value.meta, { label: '标签', value: '' }] })}
        >
          + 添加关键信息
        </button>
      </div>

      <div>
        <p className="mb-2 text-xs text-faint">数据亮点</p>
        <div className="space-y-2">
          {value.highlights.map((item, index) => (
            <div key={index} className="flex items-end gap-2">
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <TextField
                  label="数值"
                  value={item.value}
                  onChange={(content) =>
                    update({
                      highlights: value.highlights.map((row, i) =>
                        i === index ? { ...row, value: content } : row,
                      ),
                    })
                  }
                />
                <TextField
                  label="说明"
                  value={item.label}
                  onChange={(label) =>
                    update({
                      highlights: value.highlights.map((row, i) =>
                        i === index ? { ...row, label } : row,
                      ),
                    })
                  }
                />
              </div>
              <RemoveButton
                label={`删除数据亮点 ${item.label}`}
                onClick={() =>
                  update({
                    highlights: value.highlights.filter((_, i) => i !== index),
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
            update({ highlights: [...value.highlights, { value: '0', label: '新亮点' }] })
          }
        >
          + 添加数据亮点
        </button>
      </div>
    </div>
  )
}
