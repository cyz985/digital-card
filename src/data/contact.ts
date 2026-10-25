import type { ContactContent } from '@/types'

/**
 * 内容编辑区：联系方式（示例数据）
 * 只需修改本文件即可更新联系方式，无需改动组件
 * TODO: 将邮箱、GitHub、微信、电话替换为你自己的真实信息
 */
export const contact: ContactContent = {
  title: '聊聊数据、增长，或者一次课程合作',
  description:
    '如果你正在寻找实习伙伴、课程项目搭档，或想交流数据分析与数字营销的实践，欢迎通过以下方式联系我。通常会在 24 小时内回复。',
  items: [
    {
      label: '邮箱',
      value: 'your-email@example.com',
      href: 'mailto:your-email@example.com',
      copyable: true,
      icon: 'mail',
    },
    {
      label: 'GitHub',
      value: 'github.com/your-name',
      href: '#',
      icon: 'github',
    },
    {
      label: '微信',
      value: 'your-wechat-id',
      copyable: true,
      icon: 'wechat',
    },
    {
      label: '电话',
      value: '138 0000 0000',
      href: '#',
      icon: 'phone',
    },
  ],
}
