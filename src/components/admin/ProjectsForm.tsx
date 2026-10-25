import { createImageUrl } from '@/lib/image'
import type { Project, ProjectLink } from '@/types'
import {
  ADD_BUTTON_CLASS,
  CheckboxField,
  RemoveButton,
  SelectField,
  TextAreaField,
  TextField,
} from './Field'

const LINK_TYPE_OPTIONS: { value: ProjectLink['type']; label: string }[] = [
  { value: 'github', label: '代码仓库' },
  { value: 'demo', label: '在线演示' },
  { value: 'doc', label: '文档 / 报告' },
  { value: 'other', label: '其他' },
]

function createEmptyProject(): Project {
  return {
    id: `project-${Date.now()}`,
    title: '新项目',
    description: '',
    cover: createImageUrl(
      'Minimal dark data visualization cover, violet and cyan gradient glow, abstract charts, clean composition, high detail',
      'landscape_4_3',
    ),
    coverAlt: '项目封面',
    tags: [],
    year: String(new Date().getFullYear()),
    links: [],
  }
}

interface ProjectsFormProps {
  value: Project[]
  onChange: (next: Project[]) => void
}

/** 编辑课程项目：文案、封面、标签与外部链接 */
export function ProjectsForm({ value, onChange }: ProjectsFormProps) {
  const updateProject = (index: number, patch: Partial<Project>) => {
    onChange(value.map((project, i) => (i === index ? { ...project, ...patch } : project)))
  }

  return (
    <div className="space-y-4">
      {value.map((project, index) => (
        <div key={project.id} className="rounded-card border border-line bg-surface p-4">
          <div className="flex items-end gap-2">
            <div className="grid flex-1 gap-2 sm:grid-cols-[1fr_7rem]">
              <TextField
                label="项目名称"
                value={project.title}
                onChange={(title) => updateProject(index, { title })}
              />
              <TextField
                label="年份"
                value={project.year}
                onChange={(year) => updateProject(index, { year })}
              />
            </div>
            <RemoveButton
              label={`删除项目 ${project.title}`}
              onClick={() => onChange(value.filter((_, i) => i !== index))}
            />
          </div>

          <div className="mt-3">
            <TextAreaField
              label="项目描述"
              value={project.description}
              onChange={(description) => updateProject(index, { description })}
            />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <TextField
              label="封面图片 URL"
              type="url"
              value={project.cover}
              onChange={(cover) => updateProject(index, { cover })}
            />
            <TextField
              label="封面替代文字"
              value={project.coverAlt}
              onChange={(coverAlt) => updateProject(index, { coverAlt })}
            />
          </div>

          <div className="mt-3">
            <TextField
              label="标签（英文逗号分隔）"
              value={project.tags.join(', ')}
              onChange={(text) =>
                updateProject(index, {
                  tags: text
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>

          <div className="mt-1">
            <CheckboxField
              label="设为精选项目"
              checked={Boolean(project.featured)}
              onChange={(featured) => updateProject(index, { featured })}
            />
          </div>

          <div className="mt-3 space-y-2">
            <p className="text-xs text-faint">项目链接</p>
            {project.links.map((link, linkIndex) => (
              <div key={linkIndex} className="flex items-end gap-2">
                <div className="grid flex-1 gap-2 sm:grid-cols-[1fr_1.4fr_7rem]">
                  <TextField
                    label="名称"
                    value={link.label}
                    onChange={(label) =>
                      updateProject(index, {
                        links: project.links.map((item, i) =>
                          i === linkIndex ? { ...item, label } : item,
                        ),
                      })
                    }
                  />
                  <TextField
                    label="链接"
                    value={link.href}
                    onChange={(href) =>
                      updateProject(index, {
                        links: project.links.map((item, i) =>
                          i === linkIndex ? { ...item, href } : item,
                        ),
                      })
                    }
                  />
                  <SelectField
                    label="类型"
                    value={link.type}
                    options={LINK_TYPE_OPTIONS}
                    onChange={(type) =>
                      updateProject(index, {
                        links: project.links.map((item, i) =>
                          i === linkIndex
                            ? { ...item, type: type as ProjectLink['type'] }
                            : item,
                        ),
                      })
                    }
                  />
                </div>
                <RemoveButton
                  label={`删除链接 ${link.label}`}
                  onClick={() =>
                    updateProject(index, {
                      links: project.links.filter((_, i) => i !== linkIndex),
                    })
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className={ADD_BUTTON_CLASS}
              onClick={() =>
                updateProject(index, {
                  links: [
                    ...project.links,
                    { label: '查看代码', href: '#', type: 'github' },
                  ],
                })
              }
            >
              + 添加项目链接
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className={ADD_BUTTON_CLASS}
        onClick={() => onChange([...value, createEmptyProject()])}
      >
        + 添加项目
      </button>
    </div>
  )
}
