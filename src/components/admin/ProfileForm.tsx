import type { Profile, SocialIconName } from '@/types'
import {
  ADD_BUTTON_CLASS,
  RemoveButton,
  SelectField,
  TextAreaField,
  TextField,
} from './Field'

const SOCIAL_ICON_OPTIONS: { value: SocialIconName; label: string }[] = [
  { value: 'github', label: 'GitHub' },
  { value: 'mail', label: '邮箱' },
  { value: 'wechat', label: '微信' },
  { value: 'phone', label: '电话' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'link', label: '普通链接' },
]

interface ProfileFormProps {
  value: Profile
  onChange: (next: Profile) => void
}

/** 编辑个人档案：姓名、身份、简介、头像与社交入口 */
export function ProfileForm({ value, onChange }: ProfileFormProps) {
  const update = (patch: Partial<Profile>) => onChange({ ...value, ...patch })

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="姓名"
          value={value.name}
          onChange={(name) => update({ name })}
        />
        <TextField
          label="英文名"
          value={value.englishName ?? ''}
          onChange={(englishName) => update({ englishName })}
        />
      </div>

      <TextField
        label="身份 / 专业"
        value={value.role}
        onChange={(role) => update({ role })}
      />

      <TextField
        label="一句话简介"
        value={value.headline}
        onChange={(headline) => update({ headline })}
      />

      <TextAreaField
        label="关于我（每行一段）"
        value={value.bio.join('\n')}
        rows={6}
        onChange={(text) =>
          update({
            bio: text
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean),
          })
        }
      />

      <TextField
        label="头像图片 URL"
        type="url"
        value={value.avatar}
        placeholder="https://..."
        onChange={(avatar) => update({ avatar })}
      />

      <div>
        <p className="mb-2 text-xs text-faint">社交入口</p>
        <div className="space-y-3">
          {value.socials.map((social, index) => (
            <div
              key={index}
              className="rounded-lg border border-line bg-surface-2/60 p-3"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="名称"
                  value={social.label}
                  onChange={(label) =>
                    update({
                      socials: value.socials.map((item, i) =>
                        i === index ? { ...item, label } : item,
                      ),
                    })
                  }
                />
                <TextField
                  label="链接"
                  type="url"
                  value={social.href}
                  onChange={(href) =>
                    update({
                      socials: value.socials.map((item, i) =>
                        i === index ? { ...item, href } : item,
                      ),
                    })
                  }
                />
              </div>
              <div className="mt-3 flex items-end gap-2">
                <div className="flex-1">
                  <SelectField
                    label="图标"
                    value={social.icon}
                    options={SOCIAL_ICON_OPTIONS}
                    onChange={(icon) =>
                      update({
                        socials: value.socials.map((item, i) =>
                          i === index
                            ? { ...item, icon: icon as SocialIconName }
                            : item,
                        ),
                      })
                    }
                  />
                </div>
                <RemoveButton
                  label={`删除社交入口 ${social.label}`}
                  onClick={() =>
                    update({
                      socials: value.socials.filter((_, i) => i !== index),
                    })
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
              socials: [...value.socials, { label: '新链接', href: '#', icon: 'link' }],
            })
          }
        >
          + 添加社交入口
        </button>
      </div>
    </div>
  )
}
