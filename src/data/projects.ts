import { createImageUrl } from '@/lib/image'
import type { Project } from '@/types'

/**
 * 内容编辑区：课程实训项目（示例数据）
 * 只需修改本文件即可更新项目内容；links 目前用 # 占位
 * TODO: 将下方各项目 links 的 href 替换为真实的代码仓库或演示地址
 */
export const projects: Project[] = [
  {
    id: 'campus-consumption',
    title: '校园消费数据可视化分析',
    description:
      '基于校园一卡通脱敏数据，拆解学生消费时段与品类结构，输出可视化看板与运营建议。',
    cover: createImageUrl(
      'Dark-themed analytics dashboard on a laptop screen showing campus consumption charts and heatmaps, violet and cyan glow, minimalist wooden desk, cinematic top-down photography, high detail',
      'landscape_4_3',
    ),
    coverAlt: '校园消费数据可视化看板',
    tags: ['Python', 'pandas', 'Matplotlib', '数据清洗'],
    year: '2025 秋',
    featured: true,
    links: [{ label: '查看代码', href: '#', type: 'github' }],
  },
  {
    id: 'ecommerce-funnel',
    title: '电商用户转化漏斗优化',
    description:
      '梳理从曝光到复购的五级漏斗，定位流失环节，结合 A/B 测试思路提出页面与权益优化方案。',
    cover: createImageUrl(
      'E-commerce conversion funnel visualization on a dark monitor, glowing analytics charts and funnel diagram, purple and cyan accent lighting, modern office at night, photorealistic',
      'landscape_4_3',
    ),
    coverAlt: '电商转化漏斗分析界面',
    tags: ['Excel', '漏斗分析', 'A/B 测试', '用户增长'],
    year: '2025 秋',
    featured: true,
    links: [{ label: '查看报告', href: '#', type: 'doc' }],
  },
  {
    id: 'digital-economy-index',
    title: '区域数字经济指数构建',
    description:
      '选取数字基础设施、产业数字化与数字产业化三类指标，用熵值法完成区域发展水平评价。',
    cover: createImageUrl(
      'Spreadsheet and regional economic index charts on a dark desk, calculator, notebook and printed reports, moody violet and cyan lighting, photorealistic still life',
      'landscape_4_3',
    ),
    coverAlt: '区域数字经济指数测算表格',
    tags: ['熵值法', '指标体系', 'Excel', '统计年鉴'],
    year: '2025 春',
    links: [{ label: '查看代码', href: '#', type: 'github' }],
  },
  {
    id: 'brand-content-ops',
    title: '品牌社交媒体内容运营实训',
    description:
      '为校园咖啡品牌搭建两周内容矩阵，完成选题、脚本、发布节奏与数据复盘，账号互动率提升 32%。',
    cover: createImageUrl(
      'Smartphone displaying a social media content calendar, content marketing workspace, dark desk with ring light and notebook, violet and cyan ambient light, modern lifestyle photography',
      'landscape_4_3',
    ),
    coverAlt: '社交媒体内容运营工作台',
    tags: ['内容运营', '小红书', '数据复盘', '用户洞察'],
    year: '2025 春',
    links: [{ label: '查看方案', href: '#', type: 'doc' }],
  },
  {
    id: 'cross-border-pricing',
    title: '跨境电商选品与定价模拟',
    description:
      '基于平台公开数据完成品类筛选、竞品价格带分析与利润测算，输出选品与定价建议。',
    cover: createImageUrl(
      'Cross-border e-commerce product research on a laptop with price charts and product grid, dark modern workspace, cyan and purple lighting, photorealistic, shallow depth of field',
      'landscape_4_3',
    ),
    coverAlt: '跨境电商选品与定价分析',
    tags: ['选品分析', '价格带', 'Power BI', '利润测算'],
    year: '2024 秋',
    links: [{ label: '查看代码', href: '#', type: 'github' }],
  },
  {
    id: 'digital-card-site',
    title: '个人数字名片网站开发',
    description:
      '使用 React 与 Tailwind 搭建响应式个人名片，抽取数据层、统一动效参数，并部署到 Vercel。',
    cover: createImageUrl(
      'Minimal dark portfolio website displayed on a laptop screen, elegant typography, violet and cyan gradient accents, designer desk with plant, photorealistic, soft ambient light',
      'landscape_4_3',
    ),
    coverAlt: '深色主题个人名片网站界面',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    year: '2025 秋',
    links: [
      { label: '在线预览', href: '#', type: 'demo' },
      { label: '查看代码', href: '#', type: 'github' },
    ],
  },
]
