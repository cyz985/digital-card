import type { ContactContent, SocialIconName } from '@/types'
import {
  ADD_BUTTON_CLASS,
  CheckboxField,
  RemoveButton,
  SelectField,
  TextAreaField,
  TextField,
} from './Field'

const ICON_OPTIONS: { value: SocialIconName; label: string }[] = [
  { value: 'mail', label: '邮箱' },
  { value: 'github', label: 'GitHub' },
  { value: 'wechat', label: '微信' },
  { value: 'phone', label: '电话' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'link', label: '普通链接' },
]

interface ContactFormProps {
  value: ContactContent
  onChange: (next: ContactContent) => void
}

/** 编辑联系方式标题与条目，可增删并设置是否可复制 */
export function ContactForm({ value, onChange }: ContactFormProps) {
  const update = (patch: Partial<ContactContent>) => onChange({ ...value, ...patch })

  return (
    <div className="space-y-4">
      <TextField
        label="区块标题"
        value={value.title}
        onChange={(title) => update({ title })}
      />
      <TextAreaField
        label="区块说明"
        value={value.description}
        onChange={(description) => update({ description })}
      />

      <div className="space-y-3">
        {value.items.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-line bg-surface-2/60 p-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="名称"
                value={item.label}
                onChange={(label) =>
                  update({
                    items: value.items.map((row, i) =>
                      i === index ? { ...row, label } : row,
                    ),
                  })
                }
              />
              <TextField
                label="展示内容"
                value={item.value}
                onChange={(content) =>
                  update({
                    items: value.items.map((row, i) =>
                      i === index ? { ...row, value: content } : row,
                    ),
                  })
                }
              />
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <TextField
                label="链接（可留空）"
                value={item.href ?? ''}
                placeholder="mailto:you@example.com"
                onChange={(href) =>
                  update({
                    items: value.items.map((row, i) =>
                      i === index
                        ? href
                          ? { ...row, href }
                          : { ...row, href: undefined }
                        : row,
                    ),
                  })
                }
              />
              <SelectField
                label="图标"
                value={item.icon}
                options={ICON_OPTIONS}
                onChange={(icon) =>
                  update({
                    items: value.items.map((row, i) =>
                      i === index
                        ? { ...row, icon: icon as SocialIconName }
                        : row,
                    ),
                  })
                }
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <CheckboxField
                label="允许一键复制"
                checked={Boolean(item.copyable)}
                onChange={(copyable) =>
                  update({
                    items: value.items.map((row, i) =>
                      i === index
                        ? copyable
                          ? { ...row, copyable }
                          : { ...row, copyable: undefined }
                        : row,
                    ),
                  })
                }
              />
              <RemoveButton
                label={`删除联系方式 ${item.label}`}
                onClick={() =>
                  update({ items: value.items.filter((_, i) => i !== index) })
                }
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={ADD_BUTTON_CLASS}
        onClick={() =>
          update({
            items: [
              ...value.items,
              { label: '新联系方式', value: '', icon: 'link' },
            ],
          })
        }
      >
        + 添加联系方式
      </button>
    </div>
  )
}
