import { createImageUrl } from '@/lib/image'
import type { Profile } from '@/types'

/**
 * 内容编辑区：个人档案（示例数据）
 * 只需修改本文件即可更新姓名、头像、简介、行动入口与社交链接，无需改动组件
 */
export const profile: Profile = {
  name: '林一舟',
  englishName: 'Yizhou Lin',
  avatar: createImageUrl(
    'Professional editorial portrait of a young Chinese university student, short black hair, wearing a dark minimalist turtleneck, calm and confident expression, dark charcoal background, soft rim light with subtle violet and cyan tones, shallow depth of field, high-end magazine photography, centered head and shoulders',
    'square_hd',
  ),
  role: '数字经济专业 · 本科三年级',
  headline: '用数据解释商业现象，用技术把洞察变成可落地的增长方案。',
  bio: [
    '我就读于数字经济专业，关注数据驱动的商业决策与平台经济增长。日常习惯把课堂上的经济模型拆解成可验证的指标，再用 Python 与 Excel 把结论做成看得懂、讲得清的图表。',
    '过去两年完成了多门课程实训：从校园消费数据可视化，到电商转化漏斗优化，再到区域数字经济指数构建。相比单纯完成作业，我更在意把每一步推导过程记录下来，让结论可复现、可解释。',
    '在专业学习之外，我保持对前端与数字营销的兴趣，能用 React 与 Tailwind 搭建轻量页面，也熟悉内容运营与投放的基本逻辑。希望成为一名兼具业务理解与技术执行力的数据型人才。',
  ],
  meta: [
    { label: '学校', value: '城市财经大学' },
    { label: '专业', value: '数字经济' },
    { label: '年级', value: '大三在读' },
    { label: '所在地', value: '杭州 · 中国' },
  ],
  highlights: [
    { value: '12+', label: '课程项目' },
    { value: '3', label: '综合实训' },
    { value: '8', label: '专业技能' },
    { value: '2', label: '校级竞赛奖项' },
  ],
  ctas: [
    { label: '查看课程项目', href: '#projects', variant: 'primary' },
    { label: '联系我', href: '#contact', variant: 'secondary' },
  ],
  socials: [
    // TODO: 将 href 替换为你的真实 GitHub 主页
    { label: 'GitHub', href: '#', icon: 'github' },
    // TODO: 将邮箱替换为你的真实邮箱
    { label: '邮箱', href: 'mailto:your-email@example.com', icon: 'mail' },
    { label: '微信', href: '#contact', icon: 'wechat' },
  ],
}
